import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";


const Navbar = () => {
    return (
        <AppBar position="sticky" style={{borderBottom: "solid 1px #4b4b4b"}}>
            <Toolbar >
                <Grid container
                    justifyContent="space-between"
                    sx={{ mx: "auto", maxWidth: "1000px" }}>
                    <Typography variant="h4" fontSize={24}>voting</Typography>
                    <Button color="action" variant="contained" sx={{fontWeight: "bold"}}>Connexion</Button>
                </Grid>
            </Toolbar>
        </AppBar>

    )
}

export default Navbar;