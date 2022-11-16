import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, List, ListItem, styled, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fontWeight } from '@mui/system';
import { useCallback, useContext, useEffect, useState } from "react";
import VotingContext from "../../../contexts/VotingContext/VotingContext";
import { RoundedGrid } from "../../styles";
import { theme } from '../../theme/theme';
import AddProposalModal from './AddProposalModal';
import VoteProposalModal from './VoteProposalModal';

const TableBodyStyled = styled(TableBody)({
    "tr:last-child td": {
        border: "none"
    }
});

function VoteTableCell(props) {

    const { children, column, handleClick, condition, row } = props;
    const conditionalOnClick = condition ? handleClick : () => undefined;
    return (
        <TableCell
            style={
                {
                    minWidth: column.minWidth,
                    cursor: condition ? "pointer" : "default",
                    borderColor: theme.palette.border.main,
                    fontSize: "14px"
                }}
            key={column.id}
            align={column.align}
            onClick={e => conditionalOnClick(row.proposalId, row.description)}>
            {children}
        </TableCell>
    )
}

function Proposals() {
    const { state: { contract, accounts }, userSettings: { isOwner, currentSession, hasVoted } } = useContext(VotingContext);
    const [proposals, setProposals] = useState([]);
    const [openProposalModal, setOpenProposalModal] = useState(false);
    const [openVoteModal, setOpenVoteModal] = useState(false);
    const [proposalVote, setProposalVote] = useState({});

    const columns = [
        { id: 'description', label: 'Description', minWidth: 170 },
        { id: 'voteCount', label: 'Total votes', minWidth: 100 }
    ];

    const handleProposalClick = useCallback((id, description) => {
        setProposalVote({ proposalId: id, description: description });
        setOpenVoteModal(true);
    }, [])

    const fetchProposals = useCallback(async () => {
        const events = await contract.getPastEvents('ProposalRegistered', {
            fromBlock: 0,
            toBlock: 'latest'
        });

        const retrievedProposal = (event) => {
            const proposalId = event.returnValues.proposalId;
            console.log("new proposalsId:", proposalId);
            return contract.methods.getOneProposal(proposalId).call({ from: accounts[0] })
                .then((proposal) => {
                    return Object.assign({}, proposal, { proposalId: proposalId })
                });
        }

        const promises = events.map((event) => retrievedProposal(event));
        const proposals = await Promise.all(promises)

        const proposalObjects = proposals.map((proposal) => {
            return { proposalId: proposal.proposalId, description: proposal.description, voteCount: proposal.voteCount }
        });

        // display the proposals with the highest count first
        proposals.sort((p1, p2) => p2.voteCount - p1.voteCount);
        setProposals(proposalObjects);

    }, [contract, accounts]);

    useEffect(() => {
        if (contract != null) {
            fetchProposals()
        }
    }, [contract, fetchProposals]);


    const addProposalIcon =
        <AddCircleIcon color="text" fontSize="large" onClick={e => setOpenProposalModal(true)} />

    return (
        <>

            <RoundedGrid>
                <Box className="boxHeader">
                    <Typography variant="h6">Proposals</Typography>
                    {
                        !isOwner || currentSession !== "1" ? null : addProposalIcon
                    }
                </Box>
                <Paper sx={{ width: '100%', backgroundColor: theme.palette.primary.main, marginBottom: "10px", boxShadow: "none" }}>
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth, fontSize: "16px",
                                                borderColor: theme.palette.border.main,
                                                color: theme.palette.secondary.main,
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBodyStyled>
                                {proposals
                                    .map((row) => {
                                        return (

                                            <TableRow
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.proposalId}
                                                sx={{ '&:hover': { background: currentSession === "3" ? theme.palette.cell.hover : "inherit" } }}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <VoteTableCell
                                                            key={column.id}
                                                            column={column}
                                                            handleClick={handleProposalClick}
                                                            condition={!hasVoted && currentSession === "3"}
                                                            row={row}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </VoteTableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBodyStyled>
                        </Table>
                    </TableContainer>
                </Paper>

            </RoundedGrid>
            <AddProposalModal
                open={openProposalModal}
                setOpen={setOpenProposalModal}
                fetchProposals={fetchProposals} />
            <VoteProposalModal
                open={openVoteModal}
                setOpen={setOpenVoteModal}
                proposal={proposalVote} />
        </>
    )
}

export default Proposals;