import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Box, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import VotingContext from "../../../contexts/VotingContext/VotingContext";
import { RoundedGrid } from "../../styles";
import { Sessions } from "../common";
import SessionModal from '../SessionsModal';


const Informations = () => {
    const { state: { contract, accounts },
        userSettings: { isOwner, isRegistered, currentSession, fetchCurrentSession } } = useContext(VotingContext);
    const [open, setOpen] = useState(false);
    const [winner, setWinner] = useState({});

    const fetchWinner = useCallback(async () => {
        const winner = await contract.methods.winningProposalID().call();
        console.log(winner)
        const proposal = await contract.methods.getOneProposal(winner).call({ from: accounts[0] });
        setWinner({ description: proposal.description, voteCount: proposal.voteCount });
    }, [contract, accounts]);

    const handleSubmit = () => {
        nextSession()
    }

    useEffect(() => {
        if (contract != null) {
            if(currentSession === Sessions.VotesTallied && isRegistered){
                fetchWinner();
            }
        }
    }, [contract, currentSession, isRegistered, fetchWinner]);

    const nextSession = async () => {
        switch (currentSession) {
            case "0":
                await contract.methods.startProposalsRegistering().send({ from: accounts[0] })
                setOpen(false)
                break
            case "1":
                await contract.methods.endProposalsRegistering().send({ from: accounts[0] })
                setOpen(false)
                break
            case "2":
                await contract.methods.startVotingSession().send({ from: accounts[0] })
                setOpen(false)
                break
            case "3":
                await contract.methods.endVotingSession().send({ from: accounts[0] })
                setOpen(false)
                break;
            case "4":
                await contract.methods.tallyVotes().send({ from: accounts[0] })
                setOpen(false)
                break;
            default:
                console.error("Session not recognized: ", currentSession)

        }
        fetchCurrentSession();
    };

    const nextSessionIcon =
        <ArrowCircleRightOutlinedIcon color="text" fontSize="medium" onClick={e => setOpen(true)} />

    return (
        <>
            <RoundedGrid>
                <Box className="boxHeader">
                    <Typography variant="h6">Informations</Typography>
                    {
                        !isOwner || currentSession === Sessions.VotesTallied ? null : nextSessionIcon
                    }
                </Box>
                <Box className="content">
                    <Box className="line">
                        <Typography variant="b">Current session</Typography>
                        <Typography variant="p">{currentSession}</Typography>
                    </Box>
                    {currentSession === Sessions.VotesTallied ?
                        <Box className="line">
                            <Typography variant="b">Winning proposal</Typography>
                            <Typography variant="p">{winner.description}</Typography>
                        </Box> : null}

                </Box>
            </RoundedGrid>
            <SessionModal
                open={open}
                setOpen={setOpen}
                handleSubmit={handleSubmit} />
        </>
    )
}

export default Informations;
