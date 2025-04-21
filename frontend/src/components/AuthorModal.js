'use client';

import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function AuthorModal({ authorData, open, onClose, onSave }) {

    const [author, setAuthor] = useState({
        name: "",
        biography: "",
        born_date: Date.now()
    });

    useEffect(() => {
        setAuthor(authorData || {
            name: "",
            biography: "",
        });
    }, [authorData]);

    // https://react.dev/link/controlled-components
    const handleChange = (e) => {
        setAuthor({ ...author, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(author);
        onClose();
    };

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Author</DialogTitle>
        <DialogContent>
            <TextField
                margin="dense"
                label="Name"
                name="name"
                fullWidth
                value={author?.name || ""}
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                label="Biography"
                name="biography"
                fullWidth
                value={author?.biography || ""}
                onChange={handleChange}
            />
            <FormControl fullWidth>
                <LocalizationProvider className="flex" dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Born Date"
                        value={dayjs(author.born_date)}
                        format="MMM D, YYYY"
                        onChange={(newDate) =>
                            setAuthor({ ...author, born_date: newDate.startOf("day").toISOString() })
                        }
                    />

                </LocalizationProvider>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
    </Dialog>
}

