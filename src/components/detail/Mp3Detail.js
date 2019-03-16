import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Grey from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
  },
  libelle: {
    textAlign: 'right',
    backgroundColor: '#aed6f7',
    width: '100%',
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
  aDialog: {
    width: '75vw'
  }
});

class Mp3Detail extends Component {
  render() {
    const { classes, isOpen, handleClose, mp3 } = this.props;
    return (
      <Dialog open={isOpen} onClose={handleClose} className={classes.aDialog} >
        <DialogTitle id="form-dialog-title">{mp3.fileName}</DialogTitle>
        <DialogContent>
          <Grid container direction="row">
            <Grid item xs={4}>
              <img className={classes.img} src={mp3.imageUrl} />
            </Grid>
            <Grid item xs={8}>
              <Grid container direction="row" alignItems="center" >
                <Grid item  xs={4} xl={4} lg={4} className={classes.paper}>
                  <p className={classes.libelle}>Artiste</p>
                </Grid>
                <Grid item xs={8} xl={8} lg={8}>
                  {mp3.tags.artist}
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4} xl={4} lg={4} className={classes.paper}>
                  <p className={classes.libelle}>Titre</p>
                </Grid>
                <Grid item xs={8} xl={8} lg={8}>
                  {mp3.tags.title}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Mp3Detail);
