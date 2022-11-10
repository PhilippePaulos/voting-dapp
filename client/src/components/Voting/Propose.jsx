import { useState, useContext } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";

function Propose() {
    const { state: { contract, accounts } } = useContext(VotingContext);
    const [proposal, setProposal] = useState('');

    const onInputChange = (event) => {
        setProposal(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await contract.methods.addProposal(proposal).send({ from: accounts[0] });
    }

    return (
        <div>
            <h3>Submit proposals</h3>
            <form onSubmit={handleSubmit}>
                <p>
                    <input id="proposal" type="text" onChange={onInputChange} />
                    <button type="submit">Propose</button>
                </p>
            </form>
        </div>
    );
}

export default Propose;
