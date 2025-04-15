import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions
  } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState, useEffect } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function BookModal({ bookData, open, onClose, onSave }) {

    const [book, setBook] = useState({ 
        title: "", 
        description: "",
        published_date: Date.now()
     });

    useEffect(() => {
        setBook(bookData || { title: "", author: "" });
    }, [bookData]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(book); // Return book to parent
        onClose();    // Close modal
    };

    return <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit User</DialogTitle>
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
      <LocalizationProvider className="flex" dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Published Date"
        value={dayjs(book.published_date)}
        onChange={(newDate) =>
            setBook({ ...book, published_date: newDate.toISOString() })
        }
        />
        </LocalizationProvider>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </DialogActions>
  </Dialog>
}

