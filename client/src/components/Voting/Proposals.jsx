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
    { id: 'description', label: 'Description', minWidth: 170 },
    { id: 'voteCount', label: 'Vote count', minWidth: 100 }
];

function Proposals() {
    const { state: { contract, accounts } } = useContext(VotingContext);
    const [proposals, setProposals] = useState([]);
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
            let proposals = [];
            const props = [{ description: "toto", voteCount: 3 }, { description: "titi", voteCount: 3 }];
            contract.getPastEvents('ProposalRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            }).then(function(events){
                events.map(async (event) => {
                    const proposalId = event.returnValues.proposalId;
                    console.log("new proposalsId:", proposalId);
                    const proposal = await contract.methods.getOneProposal(proposalId).call({ from: accounts[0] });
                    proposals.push({id: proposalId, description: proposal.description, voteCount: proposal.voteCount})
                })
            })
            console.log(proposals)
            setProposals(proposals);
        }
    }, [contract]);

    return (
        <>
            <h3>Proposals</h3>
            <Paper sx={{ width: '100%'}}>
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
                            {proposals
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
                    count={proposals.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default Proposals;