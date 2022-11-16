import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        background: {
            default: "#211f24"
        },
        text: {
            primary: "#ffffff",
        },
        primary: {
            main: "#211f24",
        },
        secondary: {
            main: "#a2a8ae",
        },
        action: {
            main: "#384aff"
        },
        border: {
            main: "#6f6f6f"
        },
        cell: {
            main: "#211f24",
            secondary: "#384aff91",
            hover: "#393939"
        }
    },
    typography: {
        fontFamily: "Calibre,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
        allVariants: {
            color: "white",
        },
        h6: {
            fontWeight: "bold"
        },
        html: {
            background: "#000000",
        },
        b: {
            fontWeight: "bold",
            fontSize: "17px"
        },
        p: {
            fontSize: "17px"
        }
    },
    multilineColor:{
        color:'yellow'
    }
})