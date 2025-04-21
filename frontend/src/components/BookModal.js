'use client';

import { gql, useQuery } from '@apollo/client';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { GET_AUTHORS } from './GqlQueries';


export default function BookModal({ bookData, open, onClose, onSave }) {

    const {
            loading: getAuthorsLoading, 
            error: getAuthorsError, 
            data: getAuthorsData,
            refetch: getAuthorsRefetch
        } = useQuery(GET_AUTHORS);

    const [book, setBook] = useState({ 
        title: "", 
        description: "",
        published_date: Date.now()
     });

     useEffect(() => {
        setBook(bookData || { title: "", author_id: "" });
    }, [bookData]);

     if (getAuthorsLoading)
        return <Loading/>;
     if (getAuthorsError)
        throw new Error(`Error while fetching authors: ${getAuthorsError}`);
     
    const dropdownItems = getAuthorsData.authors.map((author) => {
        return {
                authorId: author.id,
                authorName: author.name
            };
    });
// https://react.dev/link/controlled-components
    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(book); // Return book to parent
        onClose();    // Close modal
    };

    return <Dialog open={open} onClose={onClose}>
    <DialogTitle>User</DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        label="Title"
        name="title"
        fullWidth
        value={book?.title || ""}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Description"
        name="description"
        fullWidth
        value={book?.description || ""}
        onChange={handleChange}
      />
      <FormControl fullWidth>
      <LocalizationProvider className="flex" dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Published Date"
        value={book.published_date ? dayjs(book.published_date) : null}
        format="MMM D, YYYY"
        onChange={(newDate) =>
            setBook({ ...book, published_date: newDate.startOf("day").toISOString() })
        }
        />
        
        </LocalizationProvider>
        </FormControl>
        <FormControl fullWidth>
        <Select
            labelId="authorid-selector"
            value={book.author_id || ""}
            label="Author"
            onChange={(e) => setBook({ ...book, author_id: e.target.value})}>
                {dropdownItems.map((item) => (
                <MenuItem key={item.authorId} value={item.authorId}>
                    {item.authorName}
                </MenuItem>
                ))}
        </Select>
        </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </DialogActions>
  </Dialog>
}

