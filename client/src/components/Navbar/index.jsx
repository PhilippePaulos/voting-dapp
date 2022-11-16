import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import Popover from '@mui/material/Popover';
import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import AddressAvatar from "../AddressAvatar";
import { AddressBox, TypographyPointer } from "../styles";

function Navbar() {

    const { state: { contract, accounts } } = useContext(VotingContext);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        setIsConnected(contract != null)
    }, [contract])

    const [anchorEl, setAnchorEl] = useState(null);

    const handleAddressClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDisconnectClick = (event) => {
        setIsConnected(false);
        handleClose();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <AppBar position="sticky" style={{ borderBottom: "solid 1px #4b4b4b" }}>
            <Toolbar>
                <Grid container
                    justifyContent="space-between"
                    sx={{ mx: "auto", maxWidth: "1000px" }}
                >
                    <Typography variant="h4" fontSize={24}>voting</Typography>
                    {
                        isConnected ?
                            <AddressBox aria-describedby={id} onClick={handleAddressClick}>
                                <AddressAvatar address={accounts[0]}>
                                    <PersonOutlineIcon />
                                </AddressAvatar>
                                <TypographyPointer variant='p' fontSize={14} fontWeight="bold">
                                    {accounts[0].substring(0, 6) + "..." + accounts[0].substring(38, accounts[0].length)}
                                </TypographyPointer>

                            </AddressBox>
                            : null
                    }
                </Grid>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar;