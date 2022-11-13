import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import { SESSIONS } from "./constants";
import RoundedGrid from "./RoundedGrid";


function Session() {
    const { state: { contract, accounts }, userSettings: { isOwner, currentSession, fetchCurrentSession } } = useContext(VotingContext);

    const nextSession = async () => {
        switch (currentSession) {
            case "0":
                await contract.methods.startProposalsRegistering().send({ from: accounts[0] })
                break
            case "1":
                await contract.methods.endProposalsRegistering().send({ from: accounts[0] })
                break
            case "2":
                await contract.methods.startVotingSession().send({ from: accounts[0] })
                break
            case "3":
                await contract.methods.endVotingSession().send({ from: accounts[0] })
                break;
            case "4":
                await contract.methods.tallyVotes().send({ from: accounts[0] })
                break;
            default:
                console.error("Session not recognized: ", currentSession)

        }
        fetchCurrentSession();
    };

    const nextSessionIcon =
        <ArrowCircleRightOutlinedIcon color="action" fontSize="large" onClick={nextSession} />

    return (
        <RoundedGrid>
            <Box className="boxHeader">
                <Typography variant="h4">Informations</Typography>
                {
                    !isOwner || currentSession === "5" ? null : nextSessionIcon
                }
            </Box>
            <Box>
                <Typography variant="b">Current session</Typography>
                <Typography variant="p">{SESSIONS[currentSession]}</Typography>
            </Box>
        </RoundedGrid>
    )
}

export default Session;
