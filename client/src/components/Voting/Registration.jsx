import { useState, useContext } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import { addressPattern } from "./constants";

function Registration() {
    const { state: { contract, accounts } } = useContext(VotingContext);
    const [registerVoter, setRegisterVoter] = useState('');

    const onInputChange = (event) => {
        setRegisterVoter(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (addressPattern.test(registerVoter)) {
            await contract.methods.addVoter(registerVoter).send({ from: accounts[0] });
        } else {
            // TODO handle error message
            alert("Please provide a correct wallet address.")
        }
    }

    return (
        <div>
            <h3>Registration</h3>
            <form noValidate onSubmit={handleSubmit}>
                <p>
                    <input id="voterRegister" type="text" onChange={onInputChange} />
                    <button type="submit">Register</button>
                </p>
            </form>
        </div>
    );
}

export default Registration;
