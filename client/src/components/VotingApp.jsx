
import Voting from "../components/Voting";
import Navbar from "../components/Navbar/index"
import NoticeNotRegistered from "./Notices/NoticeNotRegistered"
import VotingContext from "../contexts/VotingContext/VotingContext";
import { useContext } from "react";

function VotingApp() {
    const { userSettings: { isRegistered } } = useContext(VotingContext);

    return (

        <>
            <Navbar />
            <Voting />
        </>
    )
}

export default VotingApp;