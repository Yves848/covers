import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import blueGrey from '@material-ui/core/colors/blueGrey';
import indigo from '@material-ui/core/colors/indigo';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 8,
    marginTop: theme.spacing.unit * 8,
    border: '2px',
    borderStyle: 'solid',
    borderColor: blueGrey[100],
    borderRadius: '15px 50px',
    flexGrow: 1,
  },
  image: {
    width: '200px',
    height: '200px',
  },
  content: {
    flexGrow: 1,
  },
  progress: {
    height: '30px',
  },
  inline: {
    display: 'inline',
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: indigo[500],
  },
});

class FillProgress extends Component {
  render() {
    const { classes } = this.props;
    const { iProgress, folder } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress
          className={classes.progress}
          variant="determinate"
          value={iProgress}
        />
        <Grid container direction="row" justify="center" alignContent="center">
          <Grid item lg xl md>
            <div className={classes.paper}>
              <Typography variant="h3" className={classes.inline}>
                {folder}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignContent="center">
          <Grid item lg xl md>
            <div className={classes.paper}>
              <Typography variant="h2" className={classes.inline}>
                Remplissage
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(FillProgress);
