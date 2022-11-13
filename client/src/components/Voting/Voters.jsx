import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useContext, useEffect, useState } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";

const columns = [
    { id: 'address', label: 'Address', minWidth: 170 },
];

function Voters() {
    const { state: { contract, accounts } } = useContext(VotingContext);
    const [voterAddresses, setVoterAddresses] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const options = {
        fromBlock: 0,
        toBlock: 'latest'
    };

    useEffect(() => {
        if (contract !== null) {
            let addresses = [];
            contract.getPastEvents('VoterRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            }).then(function(events){
                events.map(async (event) => {
                    const voterAddress = event.returnValues.voterAddress;
                    console.log("registered voter", voterAddress);
                    addresses.push({address: voterAddress, id: voterAddress});
                })
            })
            setVoterAddresses(addresses);
        }
    }, [contract]);

    return (
        <>
            <h3>Registered Voters</h3>
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {voterAddresses
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={voterAddresses.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default Voters;