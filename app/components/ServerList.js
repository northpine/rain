import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';
import Server from './Server';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {BeatLoader} from 'react-spinners';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const styles = theme => {
    return {
        root: {
            padding: 15
        },
        url: {
            fontSize: 15,
        },
        beatLoader: {
            color: theme.primary
        },
        heading: {
            display: 'inline-block'
        },
    }
}

class ServerList extends Component {
    state = {
        expanded: null
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    }
    render() {
        const {servers, traversals, classes, theme} = this.props;
        const {expanded} = this.state;
        console.log(theme.palette.secondary.main);
        return (
            <div>
            {Object.keys(servers).map((serverUrl) => {
                return (
                    <Server key={serverUrl} url={serverUrl} 
                        expanded={expanded === serverUrl} 
                        onChange={this.handleChange(serverUrl)} />
                )
            })}
            {traversals.map((url) => {
                return (
                    <Paper className={classes.root}>
                        <Grid container>
                            <Grid item>
                                <Typography className={classes.heading}>{url}</Typography>
                            </Grid>
                            <Grid item>
                                <BeatLoader size={12} color='#FF9800'/>
                            </Grid>
                        </Grid>
                    </Paper>
                )
            })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        servers: state.servers,
        traversals: state.traversals
    }
}

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(ServerList));