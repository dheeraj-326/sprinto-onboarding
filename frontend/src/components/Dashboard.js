'use client';

import { Box, Tab, Tabs, } from "@mui/material";
import { useState } from "react";
import BookList from "./BookList";
import TabPanel from "./TabPanel";
import AuthorList from "./AuthorList";

export default function Dashboard() {
    const [tabIndex, setTabIndex] = useState(0);

    function handleTabChange(event, newValue) {
        setTabIndex(newValue);
    }

    return <Box sx={{ width: '100%' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Books" />
            <Tab label="Authors" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
            <BookList/>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
            <AuthorList/>
        </TabPanel>
    </Box>
}