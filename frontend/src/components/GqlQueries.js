import { gql } from "@apollo/client"; 

const GET_BOOKS = gql`
query Books(
    $title: String
    $authorId: String
    $description: String
    $publishedBefore: DateTime
    $publishedAfter: DateTime
    $limit: Int
    $offset: Int
) {
    books(
        title: $title
        authorId: $authorId
        description: $description
        publishedBefore: $publishedBefore
        publishedAfter: $publishedAfter
        limit: $limit
        offset: $offset
    ) {
        id
        title
        description
        published_date
    }
}`;

const CREATE_BOOK = gql`
mutation CreateBook($title: String!, $description: String, $published_date: DateTime!, $author_id: String!) {
    createBook(
        book: {
            title: $title
            description: $description
            published_date: $published_date
            author_id: $author_id
        }
    ) {
        id
        title
        description
        published_date
        author {
            id
            name
            biography
            born_date
        }
    }
}
`

const EDIT_BOOK = gql`
mutation EditBook($id: String!, $title: String!, $description: String, $published_date: DateTime!) {
    editBook(
        book: {
            id: $id
            title: $title
            description: $description
            published_date: $published_date
        }
    ) {
        id
        title
        description
        published_date
    }
}
`

const DELETE_BOOK = gql`
mutation DeleteBook($id: String!) {
    deleteBook(id: $id)
}
`

const GET_AUTHORS = gql`
query Authors {
    authors {
        id
        name
        biography
        born_date
    }
}`;

const EDIT_AUTHOR = gql`
mutation EditAuthor($id: String!, $name: String!, $biography: String, $born_date: DateTime!) {
    editAuthor(
        author: {
            id: $id,
            name: $name, 
            biography: $biography, 
            born_date: $born_date
        }
    ) {
        id
        name
        biography
        born_date
    }
}
`


const CREATE_AUTHOR = gql`
mutation CreateAuthor($name: String!, $biography: String, $born_date: DateTime!) {
    createAuthor(
        author: { 
            name: $name, 
            biography: $biography, 
            born_date: $born_date
            }
    ) {
        id
        name
        biography
        born_date
    }
}
`

export { GET_BOOKS, CREATE_AUTHOR, CREATE_BOOK, DELETE_BOOK, EDIT_AUTHOR, EDIT_BOOK, GET_AUTHORS }