import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Box, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import VotingContext from "../../../contexts/VotingContext/VotingContext";
import { RoundedGrid } from "../../styles";
import { SESSIONS } from "../constants";
import SessionModal from '../SessionsModal';


const Informations = () => {
    const { state: { contract, accounts },
        userSettings: { isOwner, currentSession, fetchCurrentSession } } = useContext(VotingContext);
    const [open, setOpen] = useState(false);
    const [winner, setWinner] = useState({});

    const fetchWinner = useCallback(async () => {
        const winner = await contract.methods.winningProposalID().call();
        const proposal = await contract.methods.getOneProposal(winner).call({ from: accounts[0] });
        setWinner({ description: proposal.description, voteCount: proposal.voteCount });
    }, [contract, accounts]);

    const handleSubmit = () => {
        nextSession()
    }

    useEffect(() => {
        if (contract != null) {
            fetchWinner();
        }
    }, [contract, fetchWinner]);

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
        <ArrowCircleRightOutlinedIcon color="text" fontSize="large" onClick={e => setOpen(true)} />

    return (
        <>
            <RoundedGrid>
                <Box className="boxHeader">
                    <Typography variant="h6">Informations</Typography>
                    {
                        !isOwner || currentSession === "5" ? null : nextSessionIcon
                    }
                </Box>
                <Box className="content">
                    <Box className="line">
                        <Typography variant="b">Current session</Typography>
                        <Typography variant="p">{SESSIONS[currentSession]}</Typography>
                    </Box>
                    {currentSession === "5" ?
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
