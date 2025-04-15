'use client';

import React, { useState } from "react";
import {gql, useMutation, useQuery} from '@apollo/client';
import Loading from './Loading';
import Error from './Error';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions
  } from "@mui/material";
import BookModal from "./BookModal";


const GET_BOOKS = gql`
query Books {
    books {
        id
        title
        description
        published_date
    }
}`;

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

export default function BookList() {
    const {loading, error, data} = useQuery(GET_BOOKS);
    const [modalOpen, setModalOpen] = useState(false);
    const [editBook, setEditBook] = useState(null);

    const [editBookMutation] = useMutation(EDIT_BOOK);

    const handleOpenCreate = () => {
        setEditBook(null); // no initialData for new book
        setModalOpen(true);
    };

    const handleOpenEdit = (book) => {
        setEditBook(book); // pass book as initialData
        setModalOpen(true);
    };

    const handleSave = (book) => {
        if (editBook) {
            editBookMutation( {
                variables: {
                    id: book.id,
                    title: book.title,
                    description: book.description,
                    published_date: book.published_date
                }
            })
            console.log("Update book:", book);
        } else {
            console.log("Create book:", book);
        }
    };

    if (loading)
        return <Loading/>;
    if (error) 
        return <Error error={error} />;
    console.log(`Books data length: ${data.books.length}`);
    return <div className="flex flex-col">
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Published Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>{book.published_date}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => handleOpenEdit(book)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        bookData={editBook}
      />
      </div>
    
}