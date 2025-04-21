'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import {
    Box,
    Button,
    Pagination,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Stack
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import BookModal from "./BookModal";
import Error from './Error';
import Loading from './Loading';
import { CREATE_BOOK, DELETE_BOOK, EDIT_BOOK, GET_BOOKS } from './GqlQueries';
import { LocalizationProvider } from '@mui/x-date-pickers';


export default function BookList() {
    const [pageSize, setPageSize] = useState(1);
    const [pageNumber, editPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [booksFilter, setBooksFilter] = useState({
        title: "",
        authorId: null,
        description: "",
        publishedBefore: null,
        publishedAfter: null,
        limit: null,
        offset: null,
    });

    const [displayData, setDisplayData] = useState([]);
    const [publishedAfter, setPublishedAfter] = useState(null);
    const [publishedBefore, setPublishedBefore] = useState(null);


    const {
        loading: getBooksLoading,
        error: getBooksError,
        data: getBooksData,
        refetch: getBooksRefetch
    } = useQuery(GET_BOOKS, {
        variables: booksFilter,
        onCompleted: (data) => {
            applyPagination(data);
        },
        onError: (err) => {
            console.error("Query error:", err);
        }
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [editBook, setEditBook] = useState(null);

    const applyPagination = async (data) => {
        setTotalPages(Math.ceil(data.books.length / pageSize));
        let [begin, end] = [(pageNumber - 1) * pageSize, (pageNumber * pageSize)];
        end = end > data.books.length * pageSize ? data.books.length * pageSize : end;
        const tempData = data.books.slice(begin, end);
        setDisplayData(tempData);
    };

    useEffect(() => {
        if (!getBooksLoading && getBooksData) {
            let updatedTotalPages = Math.ceil(getBooksData.books.length / pageSize);
            setTotalPages(updatedTotalPages);
            if (pageNumber > updatedTotalPages)
                editPageNumber(updatedTotalPages);
            applyPagination(getBooksData);
        }
    }, [pageNumber, getBooksLoading, getBooksData])

    useEffect(() => {
        getBooksRefetch(booksFilter)
    }, [booksFilter])

    const handleFilterChange = (event) => {
        let newFilter = {
            ...booksFilter,
            [event.target.name]: event.target.value
        }
        setBooksFilter(newFilter)
    };

    const [editBookMutation, { data: editBookData, loading: editBookLoading, error: editBookError }] = useMutation(EDIT_BOOK);
    const [createBookMutation, { data: createBookData, loading: createBookLoading, error: createBookError }] = useMutation(CREATE_BOOK);
    const [deleteBookMutation, { data: deleteBookData, loading: deleteBookLoading, error: deleteBookError }] = useMutation(DELETE_BOOK);

    const handleOpenCreate = () => {
        setEditBook(null); // no initialData for new book
        setModalOpen(true);
    };

    const handleOpenEdit = (book) => {
        setEditBook(book); // pass book as initialData
        setModalOpen(true);
        return;
    };

    const handleSave = async (book) => {
        if (editBook) {
            await editBookMutation({
                variables: {
                    id: book.id,
                    title: book.title,
                    description: book.description,
                    published_date: book.published_date
                }
            })
            if (editBookError)
                throw new Error(`Error while editing book: ${book}`)
            console.log("Updated book:", book);
        } else {
            await createBookMutation({
                variables: {
                    title: book.title,
                    description: book.description,
                    published_date: book.published_date,
                    author_id: book.author_id
                }
            });
            if (createBookError)
                throw new Error(`Error while creating book: ${book}`);
            console.log("Created book:", book);
        }
        await getBooksRefetch();
        return;
    };

    const handleDelete = async (id) => {
        await deleteBookMutation({
            variables: {
                id: id
            }
        });
        if (deleteBookError)
            throw new Error(`Error while deleting bookId: ${id}`);
        await getBooksRefetch();
        return;
    };

    if (getBooksError)
        return <Error error={getBooksError} />;
    return <div className="flex flex-col justify-center">
        <div className="flex flex-col md:flex-row justify-center">
            <div className="flex w-full flex-col md:flex-row justify-start gap-2">
                <TextField
                    label="Title"
                    margin="dense"
                    name="title"
                    value={booksFilter?.title}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="Description"
                    margin="dense"
                    name="description"
                    value={booksFilter?.description}
                    onChange={handleFilterChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}
                >
                    <div className="flex flex-col justify-center pt-1.5">
                        <DatePicker
                            label="Published After"
                            value={booksFilter.publishedAfter}
                            name="publishedAfter"
                            onChange={(newValue) => {
                                let [publishedBefore, publishedAfter] = [booksFilter.publishedBefore, booksFilter.publishedAfter];
                                publishedAfter = newValue;
                                if (booksFilter.publishedBefore && newValue && newValue > booksFilter.publishedBefore) {
                                    publishedBefore = null;
                                }
                                let newFilter = {
                                    ...booksFilter,
                                    publishedAfter: publishedAfter,
                                    publishedBefore: publishedBefore
                                }
                                setBooksFilter(newFilter)
                            }}
                            maxDate={publishedBefore}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    <div className="flex justify-center flex-col pt-1.5">
                        <DatePicker
                            label="Published Before"
                            name="publishedBefore"
                            value={booksFilter.publishedBefore}
                            onChange={(newValue) => {
                                let newFilter = {
                                    ...booksFilter,
                                    publishedBefore: newValue
                                }
                                setBooksFilter(newFilter)
                            }}
                            minDate={publishedAfter}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                </LocalizationProvider>
            </div>
        </div>
        <div className="flex w-full ">
            <div className="flex w-full justify-end p-2">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '10%', px: 2 }}>
                    <Button
                        sx={{ display: 'flex', width: '100%', overflow: 'hidden', boxSizing: 'border-box', }}
                        variant="outlined"
                        onClick={() => handleOpenCreate()}
                    >Create</Button>
                </Box>
            </div>
        </div>
        {!getBooksLoading && <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Published Date</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayData.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.description}</TableCell>
                            <TableCell>{book.published_date ? dayjs(book.published_date).format("MMM D, YYYY") : "-"}</TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" onClick={() => handleOpenEdit(book)}>
                                    Edit
                                </Button>
                                <Button color="error" variant="outlined" onClick={() => handleDelete(book.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>}
        <Pagination
            count={totalPages} // total number of pages
            page={pageNumber}  // controlled current page
            onChange={(e, value) => editPageNumber(value)}
            color="primary"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 2,  // Optional: adds some spacing at the top
            }}
        />
        <BookModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            bookData={editBook}
        />
    </div>

}