function Proposal({ props }) {
    const { description, voteCount } = props;

    return (
        <>
            <div>
                <p>Description</p>
                <p>{description}</p>
            </div>
            <div>
                <p>Total votes</p>
                <span className="highlight"><p> {voteCount}</p></span>
            </div>
        </>
    );
}

export default Proposal;