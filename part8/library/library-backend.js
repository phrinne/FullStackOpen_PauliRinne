const { ApolloServer, UserInputError, AuthenticationError, PubSub, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
//const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

const JWT_SECRET = 'ULTIMATE_SECRET'

const MONGODB_URI = 'mongodb+srv://databasemasterblaster:Fullstackopen2021@cluster0.5rq8c.mongodb.net/library?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connection to MongoDB:', error.message))

mongoose.set('debug', true)

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }  

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  } 
`

const resolvers = {
  /*Author: {
    bookCount: (root) => {
      console.log('bookCount called')
      return root.populate('books').books.length
      //return Book.find({ author: root.id }).countDocuments()
    }
  },*/
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let ret = null
      if (!args.author && !args.genre) {
        ret = await Book.find({}).populate('author')
      }
      else if(!args.author) {
        ret = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      else if(!args.genre) {
        const author = await Author.findOne({ name: args.author })
        ret = await Book.find({ author: author.id }).populate('author')
      }
      else {
        const author = await Author.findOne({ name: args.author })
        ret = await Book.find({ author: author.id }).find({ genres: { $in: [args.genre] } }).populate('author')
      }
      return ret
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      let author = await Author.findOne({ name: args.author })
      if(!author) {
        try {
          author = new Author({ name: args.author })
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      try {
        const book = new Book({ ...args, author })
        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        author.bookCount = author.bookCount+1
        await author.save()
        return book
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      const author = await Author.findOne({ name: args.name })
      if(!author) {
        throw new UserInputError('Author with the given name not found', { invalidArgs: args })
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, { invalidArgs: args })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})