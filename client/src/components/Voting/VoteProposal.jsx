import { useContext, useState } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";

function VoteProposal() {
    const { state: {contract, accounts}, userSettings: { setHasVoted } } = useContext(VotingContext);
    const [proposal, setProposal] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await contract.methods.setVote(proposal).send({ from: accounts[0] });
            setHasVoted(true);
        } catch (e) {
            console.error("Could not vote for provided proposal index: " + e);
        }
    }

    const onInputChange = (event) => {
        setProposal(event.target.value);
    };

    return (
        <>
            <div>
                <h3>Vote for a proposal</h3>
                <form onSubmit={handleSubmit}>
                    <p>
                        <input id="proposal" type="text" onChange={onInputChange} />
                        <button type="submit">Vote</button>
                    </p>
                </form>
            </div>
        </>
    );
}

export default VoteProposal;
