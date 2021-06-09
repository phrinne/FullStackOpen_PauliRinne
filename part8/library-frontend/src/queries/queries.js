import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query findBooks($author: String, $genre: String){
    allBooks(author: $author, genre: $genre) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`

/*export const ALL_BOOKS_BY_GENRE = gql`
  query {
    allBooks($genre: String!) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`*/

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    author {
      name
    }
    genres
    id
  }
}
`

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthYear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year)  {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`