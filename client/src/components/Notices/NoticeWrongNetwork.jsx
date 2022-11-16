import { Typography } from "@mui/material";

function NoticeWrongNetwork() {
  return (
    <Typography p={10} variant="h4">
      ⚠️ Your are not connected to the same network as the one you deployed to. Please switch the network.
    </Typography>
  );
}

export default NoticeWrongNetwork;
