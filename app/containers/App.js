import React, { Component } from 'react';
import ServerList from '../components/ServerList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../components/theme';
import {withStyles} from '@material-ui/core/styles';
import SearchBox from '../components/SearchBox';
import { connect } from 'react-redux';
const styles = theme => ({
  root: {
    padding: 10
  },
  noServers: {
    fontColor: "grey",
    fontSize: 20
  }
})

const mapStateToProps = (state, props) => {
  return {
    noServers: Object.keys(state.servers).length === 0 && state.traversals.length === 0
  }
}

export default connect(mapStateToProps)(withStyles(styles)(class App extends Component {

  clickedOn = () => {
    this.setState({searchClicked: true})
  }
  clickOff = () => {
    this.setState({searchClicked: true});
  }
  render() {
    const {noServers, classes} = this.props;
    return (
      <div>
      <MuiThemeProvider theme={theme}>
      <AppBar position="sticky" color='primary'>
        <Toolbar>
          <Typography style={{color: 'white', fontSize: 20}}>
            Pine
          </Typography>
          <SearchBox />
        </Toolbar>
      </AppBar>
      </MuiThemeProvider>
      {(noServers) ? 
        <Paper className={classes.root}>
        <Typography color='textSecondary' className={classes.noServers}>No data sources discovered</Typography>
        </Paper>
        : <ServerList />
      }
      </div>
    );
  }
}));
