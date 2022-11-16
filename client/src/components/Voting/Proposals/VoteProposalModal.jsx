import { Box, Button, Typography } from '@mui/material';
import { useContext } from "react";
import VotingContext from "../../../contexts/VotingContext/VotingContext";
import { CenteredModal } from "../../styles";

function VoteProposalModal(props) {
    const { open, setOpen, proposal } = props
    const { state: { contract, accounts } } = useContext(VotingContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Vote for proposalId: ${proposal.proposalId}`)
        await contract.methods.setVote(proposal.proposalId).send({ from: accounts[0] });
        setOpen(false);
    }

    return (
        <CenteredModal
            open={open}
            onClose={e => setOpen(false)}>
            <Box
                width={300}
                minHeight={100}
                bgcolor="white"
                borderRadius={2}>
                <Typography
                    variant='h4'
                    color='primary'
                    fontWeight="bold"
                    textAlign='center'
                    p={1}>Vote
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <Box p={2} pt={0} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Typography color="primary" textAlign="center" fontWeight="bold" variant="h7">Vote for {proposal.description} ? </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-evenly", gap: "10px" }}>
                            <Button onClick={handleSubmit} color="action" variant="contained" sx={{ fontWeight: "bold" }}>Yes</Button>
                            <Button onClick={e => setOpen(false)} color="action" variant="contained" sx={{ fontWeight: "bold" }}>No</Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </CenteredModal>
    )
}

export default VoteProposalModal;