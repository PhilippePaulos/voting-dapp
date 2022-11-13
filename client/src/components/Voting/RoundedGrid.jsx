import { theme } from "./theme";
import { Grid, styled } from "@mui/material";

// "& .test": {}
const RoundedGrid = styled(Grid)({
   border: "solid 1px",
   borderColor: "#4b4b4b",
   borderRadius: ".75rem",
   "& .boxHeader": {
      borderBottom: "solid 1px",
      borderColor: "#4b4b4b",
      padding: "20px"
   },
   "& .MuiBox-root": {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px"
   },
   "& .MuiTypography-b": {
      color: theme.palette.secondary.main
   },
   "& .MuiSvgIcon-root:hover": {
      cursor: "pointer"
   }
})

export default RoundedGrid;