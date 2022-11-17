import { useCallback, useEffect, useState } from "react";
import { SessionCodes } from "../../components/Voting/common";
import useEth from "../EthContext/useEth";
import VotingContext from "./VotingContext";

function VotingProvider({ children }) {
    const { state, state: { contract, accounts }, dispatch } = useEth();
    
    const [isOwner, setIsOwner] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [currentSession, setCurrentSession] = useState(null);

    const fetchOwner = useCallback(async () => {
        try {
            const owner = await contract.methods.owner().call();
            setIsOwner(owner === accounts[0]);
        } catch (e) {
            console.log("Error fetching owner: ", e);
        }
    }, [contract, accounts]);

    const fetchVoter = useCallback(async () => {
        try {
            const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
            if (voter.isRegistered) {
                setIsRegistered(true);
            }
            if (voter.hasVoted) {
                setHasVoted(true);
            }
        } catch (e) {
            setIsRegistered(false);
            setHasVoted(false);
        }
    }, [accounts, contract]);

    useEffect(() => {
        if (contract !== null) {
            fetchOwner();
            fetchVoter();
        }
    }, [contract, accounts, fetchOwner, fetchVoter]);

    const fetchCurrentSession = useCallback(async () => {
        const session = await contract.methods.workflowStatus().call();
        setCurrentSession(SessionCodes[session]);
    }, [contract]);

    useEffect(() => {
        if (contract !== null) {
            fetchCurrentSession();
        }
    }, [contract, accounts, fetchCurrentSession]);

    const wrapperHasVoted = useCallback((voted) => {
        setHasVoted(voted);
    }, [setHasVoted]);

    const userSettings = {
        isOwner,
        isRegistered,
        currentSession,
        fetchCurrentSession,
        hasVoted,
        setHasVoted,
        wrapperHasVoted
    };

    return (
        <VotingContext.Provider value={{
            state,
            dispatch,
            userSettings
        }}>
            {children}
        </VotingContext.Provider>
    );
}

export default VotingProvider;
