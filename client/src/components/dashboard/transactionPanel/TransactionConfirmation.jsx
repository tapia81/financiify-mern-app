import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button } from "@mui/material";

export const TransactionConfirmation = ({
  isConfirmationVisible,
  handleClose,
  quantityOfShares,
  transactionType,
}) => {
  return (
    <Box>
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
            Are sure you want to {transactionType} {quantityOfShares} shares
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button value="yes" onClick={(e) => handleClose(e)}>
            Yes
          </Button>
          <Button value="no" autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
