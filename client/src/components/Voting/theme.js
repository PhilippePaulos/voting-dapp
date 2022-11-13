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
            main: "#8b949e",
        },
        action: {
            main: "#384aff"
        }
    },
    typography: {
        fontFamily: "Calibre,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
        allVariants: {
            color: "white"
        },
        html: {
            background: "#000000",
        },
        b: {
            // color: "#8b949e",
            fontSize: "17px"
        },
        p: {
            fontSize: "17px"
        }
    }
})