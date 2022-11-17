import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import VotingContext from "../../../contexts/VotingContext/VotingContext";
import { CenteredModal } from "../../styles";

function VoteProposalModal(props) {
    const { open, setOpen, proposal, fetchProposals} = props
    const { state: { contract, accounts } } = useContext(VotingContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Vote for proposalId: ${proposal.proposalId}`)
        await contract.methods.setVote(proposal.proposalId).send({ from: accounts[0] });
        fetchProposals();
        setOpen(false);
    }

    return (
        <CenteredModal
            open={open}
            onClose={e => setOpen(false)}>
            <Box
                width={300}
                minHeight={100}
                bgcolor={"white"}
                borderRadius={2}>
                <form noValidate onSubmit={handleSubmit}>
                    <Box pt={2} pb={2} sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <Typography color="primary" textAlign="center" fontWeight="bold" variant="h7">Vote for {proposal.description} ? </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-evenly", gap: "10px" }}>
                            <Button onClick={handleSubmit} color="action" variant="contained">Yes</Button>
                            <Button onClick={e => setOpen(false)} color="action" variant="contained">No</Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </CenteredModal>
    )
}

export default VoteProposalModal;