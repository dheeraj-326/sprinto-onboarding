'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import {
    Box,
    Button,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import Error from './Error';
import AuthorModal from './AuthorModal';
import { CREATE_AUTHOR, EDIT_AUTHOR, GET_AUTHORS } from './GqlQueries';




export default function AuthorList() {
    const {
        loading: getAuthorsLoading,
        error: getAuthorsError,
        data: getAuthorsData,
        refetch: getAuthorsRefetch
    } = useQuery(GET_AUTHORS);
    const [modalOpen, setModalOpen] = useState(false);
    const [editAuthor, setEditAuthor] = useState(null);

    const [editAuthorMutation, { data: editAuthorData, loading: editAuthorLoading, error: editAuthorError }] = useMutation(EDIT_AUTHOR);
    const [createAuthorMutation, { data: createAuthorData, loading: createAuthorLoading, error: createAuthorError }] = useMutation(CREATE_AUTHOR);

    const handleOpenCreate = () => {
        setEditAuthor(null); // no initialData for new book
        setModalOpen(true);
    };

    const handleOpenEdit = (author) => {
        setEditAuthor(author); // pass book as initialData
        setModalOpen(true);
    };

    const handleSave = async (author) => {
        if (editAuthor) {
            await editAuthorMutation({
                variables: {
                    id: author.id,
                    name: author.name,
                    biography: author.biography,
                    born_date: author.born_date,
                }
            })
            if (editAuthorError)
                throw new Error(`Error while editing author: ${author}`)
            console.log("Updated author:", author);
        } else {
            await createAuthorMutation({
                variables: {
                    name: author.name,
                    biography: author.biography,
                    born_date: author.born_date,
                }
            });
            if (createAuthorError)
                throw new Error(`Error while creating author: ${author}`);
            console.log("Created author:", author);
        }
        // await getAuthorsRefetch();
    };

    return <div className="flex flex-col">
        <div className="flex w-full ">
            <div className="flex w-full justify-end p-2">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '10%', px: 2 }}>
                <Button
                    sx={{ display: 'flex', width: '100%', overflow: 'hidden', boxSizing: 'border-box', }}
                    variant="outlined"
                    onClick={() => handleOpenEdit(null)}
                >Create</Button>
            </Box>
            </div>
        </div>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Biography</TableCell>
                        <TableCell>Born Date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getAuthorsData.authors.map((author) => (
                        <TableRow key={author.id}>
                            <TableCell>{author.name}</TableCell>
                            <TableCell>{author.biography}</TableCell>
                            <TableCell>{author.born_date ? dayjs(author.born_date).format("MMM D, YYYY") : "-"}</TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" onClick={() => handleOpenEdit(author)}>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <AuthorModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            authorData={editAuthor}
        />
    </div>

}