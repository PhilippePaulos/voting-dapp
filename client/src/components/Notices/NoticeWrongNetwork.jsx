import { Typography } from "@mui/material";

function NoticeWrongNetwork() {
  return (
    <Typography p={10} variant="h4">
      ⚠️ Your are not connected to the goerli network. Please switch to goerli.
    </Typography>
  );
}

export default NoticeWrongNetwork;
