import { useContext, useState } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import { addressPattern } from "./constants";
import OptionalComponent from "./OptionalComponent";
import Voter from "./Voter";

function SearchVoter() {
    const { state: { contract, accounts }} = useContext(VotingContext);
    const [voterAddress, setVoterAddress] = useState('');
    const [foundVoter, setFoundVoter] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (addressPattern.test(voterAddress)) {
            try {
                const result = await contract.methods.getVoter(voterAddress).call({ from: accounts[0] });
                setFoundVoter({...result, address: voterAddress });
            } catch (e) {
                console.error("Could not find voter address: ", e);
            }
        }
        else {
            // TODO handle error message
            alert("Please provide a correct wallet address.")
        }
    }

    const onInputChange = (event) => {
        setVoterAddress(event.target.value);
    };


    return (
        <>
            <div>
                <h3>Find a voter</h3>
                <form onSubmit={handleSubmit}>
                    <p>
                        <input id="voterAddress" type="text" onChange={onInputChange} />
                        <button type="submit">Search</button>
                    </p>
                </form>
            </div>
            <OptionalComponent condition={foundVoter.length !== 0} disableHr={true}>
                <Voter props={foundVoter} />
            </OptionalComponent>
        </>
    );
}

export default SearchVoter;
