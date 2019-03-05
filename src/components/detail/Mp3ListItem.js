import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import lightBlue from '@material-ui/core/colors/lightBlue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Mp3Detail from '../detail/Mp3Detail';

const styles = theme => ({
  root: {
    width: '100%',
    //backgroundColor: theme.palette.background.paper,
    border: '2px',
    borderStyle: 'solid',
    borderColor: blueGrey[100],
    borderRadius: '15px 5px 50px 5px',
    marginBottom: theme.spacing.unit,
  },
  details: {
    flexGrow: 1,
  },
  inline: {
    display: 'inline',
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
  },
  label: {
    display: 'inline',
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    backgroundColor: lightBlue[200],
    borderRadius: '3px',
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
});

class Mp3ListItem extends Component {
  constructor(props) {
    super(props);
    this.state={
      isDetailOpen: false
    }
  }

  handleDetailClose = () => {
    this.setState({
      isDetailOpen: false
    })
  }

  render() {
    const { mp3, classes } = this.props;
    const {isDetailOpen} = this.state;
    return (
      <div>
        <Mp3Detail
          isOpen={isDetailOpen}
          handleClose={() => {
            this.handleDetailClose();
          }}
          mp3={mp3}
        />
      
      <ListItem
        key={mp3.index}
        alignItems="flex-start"
        role={undefined}
        button
        disableRipple
        className={classes.root}
      >
        <ListItemAvatar>
          <Avatar
            className={classes.bigAvatar}
            alt="cover"
            src={mp3.imageUrl}
            onClick={() => {
              alert(`avatar : ${mp3.fileName}`);
            }}
          />
        </ListItemAvatar>

        <div className={classes.details}>
          <Grid container alignItems="center">
            <Grid item xs={12} lg={12}>
              <Typography component="span" className={classes.inline} color="textPrimary">
                {mp3.fileName}
              </Typography>
            </Grid>
            <Grid container style={{ margin: '5px' }}>
              <Grid item xs={6} lg={6}>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <Typography className={classes.label}>Artist</Typography> :{' '}
                  {mp3.tags.artist}
                </Typography>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <Typography className={classes.label}>Title</Typography> :{' '}
                  {mp3.tags.title}
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{marginTop: '5px'}}>
              <Grid item xs xl lg md>
                <Button
                  className= {classes.inline}
                  variant="contained"
                  size="small"
                  onClick={() => {
                    this.setState({
                      isDetailOpen: true
                    });
                  }}
                >
                  Détail
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(Mp3ListItem);
