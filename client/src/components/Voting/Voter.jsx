function Voter({ props }) {
    const { address, isRegistered, hasVoted, votedProposalId } = props;

    return (
        <div>
            <p>Address: {address}</p>
            <p>Registered: {isRegistered.toString()}</p>
            <p>Voted: {hasVoted.toString()}</p>
            <p>Voted proposalId: {votedProposalId}</p>
        </div>
    )
}

export default Voter;