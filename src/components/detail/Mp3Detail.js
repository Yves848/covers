import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ButtonBase from '@material-ui/core/ButtonBase'
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

class Mp3Detail extends Component {


  render() {
    const { classes, isOpen, handleClose, mp3 } = this.props;
    return (
      <Dialog open={isOpen} onClose={handleClose} fullWidth>
        <DialogTitle id="form-dialog-title" >{mp3.fileName}</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={mp3.imageUrl} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={16}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {mp3.tags.artist}
                      </Typography>
                      <Typography gutterBottom>{mp3.tags.title}</Typography>
                      
                    </Grid>
                    
                  </Grid>

                </Grid>
              </Grid>

            </Paper>
          </div>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(Mp3Detail);