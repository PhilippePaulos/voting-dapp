import { useState, useContext } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import OptionalComponent from "./OptionalComponent";
import Proposal from "./Proposal"

function SearchProposal() {
    const { state: { contract, accounts } } = useContext(VotingContext);

    const [proposal, setProposal] = useState('');
    const [foundProposal, setFoundProposal] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await contract.methods.getOneProposal(proposal).call({ from: accounts[0] });
            setFoundProposal({description: result.description, voteCount: result.voteCount});
        } catch (e) {
            console.error("Could not find provided proposal index: ", e);
        }
    }

    const onInputChange = (event) => {
        setProposal(event.target.value);
    };

    return (
        <>
            <div>
                <h3>Find a proposal</h3>
                <form onSubmit={handleSubmit}>
                    <p>
                        <input id="proposal" type="text" onChange={onInputChange} />
                        <button type="submit">Search</button>
                    </p>
                </form>
            </div>
            <OptionalComponent condition={Object.keys(foundProposal).length !== 0} disableHr={true}>
                <Proposal props={foundProposal} />
            </OptionalComponent>
        </>
    );
}

export default SearchProposal;
