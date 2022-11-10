import { useCallback, useContext, useEffect, useState } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import Proposal from "./Proposal";


function WinnerProposal() {
    const { state: { contract, accounts } } = useContext(VotingContext);
    const [winner, setWinner] = useState({});

    const fetchWinner = useCallback(async () => {
        const winner = await contract.methods.winningProposalID().call();
        const proposal = await contract.methods.getOneProposal(winner).call({ from: accounts[0] });
        setWinner({ description: proposal.description, voteCount: proposal.voteCount });
    }, [contract, accounts]);

    useEffect(() => {
        if (contract != null) {
            fetchWinner();
        }
    }, [contract, fetchWinner]);

    return (
        <>
            <h1>Winner proposal</h1>
            <div className="box-content">
                <Proposal props={winner} />
            </div>
        </>
    );
}

export default WinnerProposal;
