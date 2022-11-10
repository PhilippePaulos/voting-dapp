import { useEffect, useState, useContext, useCallback } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import Proposal from "./Proposal";

function Vote() {
    const { state: { contract, accounts } } = useContext(VotingContext);
    const [proposal, setProposal] = useState([]);

    const fetchProposal = useCallback(async () => {
        try {
            const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
            const proposal = await contract.methods.getOneProposal(voter.votedProposalId).call({ from: accounts[0] });
            setProposal({description: proposal.description, voteCount: proposal.voteCount});
        } catch (e) {
            console.log("Could not fetch proposal")
        }
    }, [contract, accounts]);

    useEffect(() => {
        if (contract !== null) {
            fetchProposal();
        }
    }, [contract, fetchProposal]);

    return (
        <>
              <h1>Your vote</h1>
              <div className="box-content">
                <Proposal props={proposal} />
              </div>
        </>

    );
}

export default Vote;
