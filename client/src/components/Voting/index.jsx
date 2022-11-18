import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import VotingContext from "../../contexts/VotingContext/VotingContext";
import NoticeWrongNetwork from "../Notices/NoticeWrongNetwork";
import { Sessions } from "./common/constants";
import Informations from "./Informations";
import Proposals from "./Proposals/Proposals";
import Voters from "./Voters";

function Voting() {

  const { state: { contract, artifact }, userSettings: { currentSession } } = useContext(VotingContext);

  const voting =
    <>
      <Grid item xs={12} p={5}>
        <Typography variant="h5">Who's the best guitarist of all time ?</Typography>
      </Grid>
      <Grid container item xs={12} >
        <Grid item xs={6}>
          <Box pb={4}>
            <Informations />
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} gap={12} >
        {
        currentSession === Sessions.RegisteringVoters ? null :
          <Grid item xs={6} pb={5}>
            <Proposals />
          </Grid>
          }
        <Grid item xs={4} >
          <Voters />
        </Grid>
      </Grid>
    </>

  return (
    <Grid container sx={{ mx: "auto", maxWidth: "1200px" }}>
      {
        !artifact ? <NoticeWrongNetwork /> :
          !contract ? <NoticeWrongNetwork /> :
            voting
      }
    </Grid>
  )
}

export default Voting;
