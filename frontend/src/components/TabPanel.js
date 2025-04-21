import { Box } from "@mui/material";

export default function TabPanel({ children, value, index, ...other }) {
    return <div
        hidden={value !== index}
        id={`tabpanel-${index}`}
        {...other}
    >
        {value === index && (
            <Box>
                {children}
            </Box>
        )}
    </div>
}