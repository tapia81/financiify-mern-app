import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const TransactionConfirmation = ({
  isConfirmationVisible,
  setConfirmationVisible,
  handleClickOpen,
  handleClose,
  stockAmount,
  transactionType,
}) => {
  return (
    <div>
      <Dialog
        open={isConfirmationVisible}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are sure you want to {transactionType} {stockAmount}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button value="no" autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button value="yes" onClick={(e) => handleClose(e)}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
