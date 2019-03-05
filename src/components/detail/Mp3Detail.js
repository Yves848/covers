import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
class Mp3Detail extends Component {

  
  render() {
    const { isOpen, handleClose, mp3 } = this.props;
    return (
      <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <DialogTitle id="form-dialog-title" >{mp3.fileName}</DialogTitle>
      <DialogContent>
        {mp3.tags.artist}
      </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default Mp3Detail;