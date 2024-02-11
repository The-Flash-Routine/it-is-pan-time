import { Dialog } from "@mui/material";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


function PanDialog({dialogOpen, setDialogOpen}){

    const handleClose = () => {
        setDialogOpen(false);
      };

    return(
        <div className="PanDialog">
            <Dialog open={dialogOpen}>
                <DialogContent>
                    <DialogContentText>
                        I here by accept that all the surnames starting with "Pan" are the best surnames ever.
                        <br/>
                        Specially <b>Panday</b>, <b>PanEve</b> and <b>PanNight</b>.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PanDialog;