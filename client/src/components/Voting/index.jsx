import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import Proposals from "./Proposals/Proposals";
import Informations from "./Informations"
import Voters from "./Voters"
import NoticeWrongNetwork from "../Notices/NoticeWrongNetwork";
import NoticeNoArtifact from "../Notices/NoticeNoArtifact";

function Voting() {

  const { state: { contract, artifact }, userSettings: { currentSession } } = useContext(VotingContext);

  const voting =
    <>
      <Grid item xs={12} p={5}>
        <Typography variant="h3" fontSize={36} fontWeight={600}>Who's the best guitarist of all time ?</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={7}>
          <Grid item xs={9} pb={5}>
            <Voters />
          </Grid>
          <Grid item xs={9}>
            {currentSession >= "1" ? <Proposals /> : null}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Box pb={4}>
            <Informations />
          </Box>
        </Grid>
      </Grid>
    </>

  return (
    <Grid container sx={{ mx: "auto", maxWidth: "1200px" }}>
      {
        !artifact ? <NoticeNoArtifact /> :
          !contract ? <NoticeWrongNetwork /> :
            voting
      }
    </Grid>
  )
}

export default Voting;
