const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
//const { v1: uuid } = require('uuid')

const MONGODB_URI = 'mongodb+srv://databasemasterblaster:Fullstackopen2021@cluster0.5rq8c.mongodb.net/library?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connection to MongoDB:', error.message))

const typeDefs = gql`
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
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => Book.find({ author: root.id }).countDocuments()
  },
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
    allAuthors: () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
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
        return book
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if(!author) {
        throw new UserInputError('Author with the given name not found', { invalidArgs: args })
      }
      author.born = args.setBornTo
      await author.save()
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})