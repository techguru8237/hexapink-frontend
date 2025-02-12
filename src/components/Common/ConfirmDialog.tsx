import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";


interface ConfirmDialogProps {
  title: string;
  description: string;
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleConfirmChange: () => void;
}

export default function ConfirmDialog({
  title,
  description,
  openDialog,
  handleCloseDialog,
  handleConfirmChange,
}: ConfirmDialogProps) {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleConfirmChange}
          color="primary"
          variant="contained"
        >
          Confirm
        </Button>
        <Button onClick={handleCloseDialog} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
