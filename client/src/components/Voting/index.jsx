import { useContext } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import OptionalComponent from "./OptionalComponent";
import Propose from "./Propose";
import Registration from "./Registration";
import SearchProposal from "./SearchProposal";
import SearchVoter from "./SearchVoter";
import Session from "./Session";
import VoteProposal from "./VoteProposal";
import Vote from "./Vote"
import WinnerProposal from "./WinnerProposal";

function Voting() {
  const { state: { artifact, contract }, userSettings: { currentSession, isOwner, isRegistered, hasVoted } } = useContext(VotingContext);
  const voting =
    <div id="voting">
      <div id="summary" className="row">
        <div className="col s4 box">
          <Session />
        </div>
        <div className="col s4 box">
          <OptionalComponent condition={hasVoted}>
            <Vote />
          </OptionalComponent>
        </div>
        <div className="col s4 box">
          <OptionalComponent condition={currentSession === "5" && isRegistered}>
            <WinnerProposal />
          </OptionalComponent>
        </div>
      </div>
      <OptionalComponent condition={currentSession === "0" && isOwner}>
        <Registration />
      </OptionalComponent>
      <OptionalComponent condition={currentSession === "1" && isRegistered}>
        <Propose />
      </OptionalComponent>
      <OptionalComponent condition={currentSession >= "1" && isRegistered}>
        <SearchProposal />
      </OptionalComponent>
      <OptionalComponent condition={isRegistered}>
        <SearchVoter />
      </OptionalComponent>
      <OptionalComponent condition={currentSession === "3" && isRegistered && !hasVoted}>
        <VoteProposal />
      </OptionalComponent>
    </div>;

  return (
    <>
      <div className="demo">
        {
          !artifact ? <NoticeNoArtifact /> :
            !contract ? <NoticeWrongNetwork /> :
              voting
        }
      </div>
    </>
  );
}

export default Voting;
