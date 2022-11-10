import { useContext } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import { SESSIONS } from "./constants";


function Session() {
    const { state: { contract, accounts }, userSettings: { isOwner, currentSession, fetchCurrentSession } } = useContext(VotingContext);

    const NEXT_SESSION_FUNC = {
        "0": contract.methods.startProposalsRegistering,
        "1": contract.methods.endProposalsRegistering,
        "2": contract.methods.startVotingSession,
        "3": contract.methods.endVotingSession,
        "4": contract.methods.tallyVotes,
    };

    const nextSession = async () => {
        await NEXT_SESSION_FUNC[currentSession]().send({ from: accounts[0] });
        fetchCurrentSession();
    };

    return (
        <>
            <h1>Global information</h1>
            <div className="box-content">
                <div>
                    <p>Current session</p>
                    <p>{SESSIONS[currentSession]}</p>
                </div>
                {
                currentSession !== '5' && isOwner ? <button onClick={nextSession}>Next session</button> : null
                }
            </div>
          
        </>
    );
}

export default Session;
