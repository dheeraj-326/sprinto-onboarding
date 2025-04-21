import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

  type Book {
    id: ID!
    title: String!
    description: String
    published_date: DateTime!
    author: Author
  }

  type Author {
    id: ID!
    name: String!
    biography: String
    born_date: DateTime
    books: [Book!]
  }

  input AuthorCreateInput {
    name: String!
    biography: String
    born_date: DateTime!
  }

  input AuthorEditInput {
    id: String!
    name: String!
    biography: String
    born_date: DateTime
  }

  input BookCreateInput {
    title: String!
    description: String
    published_date: DateTime!
    author_id: String!
  }

  input BookEditInput {
    id: String!
    title: String!
    description: String
    published_date: DateTime!
  }

  type Query {
    hello: String
    books(
      title: String,
      authorId: String,
      description: String,
      publishedBefore: DateTime,
      publishedAfter: DateTime,
      limit: Int,
      offset: Int
    ): [Book!]!
    book(id: ID!): Book
    authors(
      name: String,
      biography: String,
      bornBefore: DateTime,
      bornAfter: DateTime,
      limit: Int,
      offset: Int
    ): [Author!]!
    author(id: ID!): Author
  }

  type Mutation {
    createBook(book: BookCreateInput!): Book!
    editBook(book: BookEditInput!): Book!
    deleteBook(id: String!): Boolean!
    createAuthor(author: AuthorCreateInput!): Author!
    editAuthor(author: AuthorEditInput!): Author!
    deleteAuthor(id: String!): Boolean!
  }
`;