'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import {
    Box,
    Button,
    Pagination,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Error from './Error';
import AuthorModal from './AuthorModal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CREATE_AUTHOR, EDIT_AUTHOR, GET_AUTHORS } from './GqlQueries';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Loading from './Loading';

export default function AuthorList() {
    const [isReady, setIsReady] = useState(false);
    const [pageSize, setPageSize] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [modalOpen, setModalOpen] = useState(false);
    const [editAuthor, setEditAuthor] = useState(null);

    const [nameFilter, setNameFilter] = useState("");
    const [bioFilter, setBioFilter] = useState("");
    const [bornAfterFilter, setBornAfterFilter] = useState(null);
    const [bornBeforeFilter, setBornBeforeFilter] = useState(null);

    const [authorsData, setAuthorsData] = useState([]);

    const [editAuthorMutation, { data: editAuthorData, loading: editAuthorLoading, error: editAuthorError }] = useMutation(EDIT_AUTHOR);
    const [createAuthorMutation, { data: createAuthorData, loading: createAuthorLoading, error: createAuthorError }] = useMutation(CREATE_AUTHOR);

    const {
        loading: getAuthorsLoading,
        error: getAuthorsError,
        data: getAuthorsQueryData,
        refetch: getAuthorsRefetch
    } = useQuery(GET_AUTHORS
    );

    useEffect(() => {
        if (!getAuthorsLoading && getAuthorsQueryData) {
            let data = getAuthorsQueryData.authors;
            data = applyFilters(data);
            let updatedTotalPages = Math.ceil(data.length / pageSize);
            setTotalPages(updatedTotalPages);
            if (pageNumber > updatedTotalPages)
                setPageNumber(updatedTotalPages);
            data = applyPagination(data);
            setAuthorsData(data);
            // setIsReady(true);
        }
    }, [getAuthorsQueryData, getAuthorsLoading, pageNumber, nameFilter, bioFilter, bornAfterFilter, bornBeforeFilter]);

    const applyPagination = (data) => {
        let [begin, end] = [(pageNumber - 1) * pageSize, (pageNumber * pageSize)];
        end = end > data.length * pageSize ? data.length * pageSize : end;
        data = data.slice(begin, end);
        return data;
    };

    const applyFilters = (data) => {
        if (nameFilter)
            data = data.filter(row => row.name.toLowerCase().includes(nameFilter.toLowerCase()));
        if (bioFilter)
            data = data.filter(row => row.biography.toLowerCase().includes(bioFilter.toLowerCase()));
        if (bornAfterFilter)
            data = data.filter(row => {
                let filter = new Date(bornAfterFilter);
                let bornDate = new Date(row.bornDate);
                return bornDate > filter;
        })
        if (bornBeforeFilter)
            data = data.filter(row => {
                let filter = new Date(bornBeforeFilter);
                let bornDate = new Date(row.bornDate);
                return bornDate < filter;
        })
        
        return data;
    }

    

    

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
                throw new Error(`Error while editing author: ${author}`);
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
        }
        // await getAuthorsRefetch();
    };
    // if (!isReady)
    //     return <Loading/>
    return <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-center">
            <div className="flex w-full flex-col md:flex-row justify-start gap-2">
                <TextField
                    label="Name"
                    margin="dense"
                    name="nameFilter"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <TextField
                    label="Biography"
                    margin="dense"
                    name="bioFilter"
                    value={bioFilter}
                    onChange={(e) => setBioFilter(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}
                >
                    <div className="flex flex-col justify-center pt-1.5">
                        <DatePicker
                            label="Born After"
                            value={bornAfterFilter}
                            name="bornAfterFilter"
                            onChange={(newValue) => {
                                if (bornBeforeFilter && newValue && newValue > bornBeforeFilter) {
                                    setBornBeforeFilter(null);
                                }
                                setBornAfterFilter(newValue);
                            }}
                            maxDate={bornBeforeFilter}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    <div className="flex justify-center flex-col pt-1.5">
                        <DatePicker
                            label="Born Before"
                            name="bornBeforeFilter"
                            value={bornBeforeFilter}
                            onChange={(newValue) => {
                                setBornBeforeFilter(newValue);
                            }}
                            minDate={bornAfterFilter}
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
                    {authorsData.map((author) => (
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
        <Pagination
                    count={totalPages} // total number of pages
                    page={pageNumber}  // controlled current page
                    onChange={(e, value) => setPageNumber(value)}
                    color="primary"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 2,  // Optional: adds some spacing at the top
                    }}
                />
        <AuthorModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            authorData={editAuthor}
        />
    </div>

}