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

  input AuthorInput {
    name: String!
    biography: String
    born_date: DateTime
  }

  input BookCreateInput {
    title: String!
    description: String
    published_date: DateTime!
    author: AuthorInput!
  }

  input BookEditInput {
    id: String
    title: String!
    description: String
    published_date: DateTime!
  }

  type Query {
    hello: String
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createBook(book: BookCreateInput!): Book!
    editBook(book: BookEditInput!): Book!
  }
`;