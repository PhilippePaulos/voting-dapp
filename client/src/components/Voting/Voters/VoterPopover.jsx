import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Popover, Typography } from '@mui/material';
import AddressAvatar from '../../AddressAvatar';
import { theme } from '../../theme/theme';

function VoterPopover(props) {

    const { open, voter, anchorEl, handleClose } = props;

    return (
        <Popover
            id="voter-popover"
            sx={{
                pointerEvents: 'none'
              }}
            onClose={handleClose}
            disableRestoreFocus
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
            <Box p={3} sx={{
                backgroundColor: theme.palette.primary.main,
                border: "1px solid",
                borderColor: theme.palette.border.main,
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                    pb: "10px"
                }}>

                    <AddressAvatar address={voter.address}>
                        <PersonOutlineIcon />
                    </AddressAvatar>
                    <Typography variant="p">
                        {voter.address}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px"
                }}>
                    {
                        voter.hasVoted ?
                            <>
                                <CheckIcon color="success" /><Typography variant="p">Voted for <strong>{voter.proposalDescription}</strong></Typography>
                            </>
                            :
                            <>
                                <ClearIcon color="error" /><Typography variant="p">Not voted yet</Typography>
                            </>
                    }
                </Box>
            </Box>

        </Popover>
    )
}

export default VoterPopover;