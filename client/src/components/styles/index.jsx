import { Box, Grid, Modal, styled, TableRow, Typography } from "@mui/material";
import { theme } from "../theme/theme";

const RoundedGrid = styled(Grid)({
    border: "solid 1px",
    borderColor: theme.palette.border.main,
    borderRadius: ".75rem",
    "& .MuiTypography-h4": {
        fontWeight: "bold"
    },
    "& .boxHeader": {
        borderBottom: "solid 1px",
        borderColor: theme.palette.border.main,
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
    },
    "& .content .line": {
        display: "flex",
        justifyContent: "space-between",
        padding: "3px 10px 10px 10px",
        borderColor: theme.palette.border.main,
    },
    "& .MuiTypography-b": {
        color: theme.palette.secondary.main
    },
    "& .MuiSvgIcon-root:hover": {
        cursor: "pointer"
    }
})

const AddressBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "5px",
});

const TypographyPointer = styled(Typography)({
    '&:hover': {
        cursor: "pointer"
    }
})

const CenteredModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})

export { RoundedGrid, AddressBox, TypographyPointer, CenteredModal };
