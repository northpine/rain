import React, {Component} from 'react';
import FaTrash from 'react-icons/lib/fa/trash-o';
import { connect } from 'react-redux';
import { addCount, deleteServer } from '../constants/actions'
// import Service from './Service';
// import Folder from './Folder';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import theme from './theme';

import LayerList from './LayerList'
const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    block: {
        display: 'block',
        width: '100%'
    },
    trashCan: {
        display: 'block',
        margin: '5px'
    },
    table: {
        minWidth: 500,
    },
    rowText: {
        fontSize: 14
    },
    tableRow: {
        height: "15px"
    }
  });



class Server extends Component {

    render() {
        const {deleteMe, url, classes, markedForDelete, stillTraversing} = this.props;
        const color = (markedForDelete) ? 'red' : 'black'
        return (
            <ExpansionPanel className={classes.root} CollapseProps={{ unmountOnExit: true }} disabled={stillTraversing}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>{url}</Typography>
                    <FaTrash className={classes.trashCan} onClick={deleteMe} color={color}/>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.heading}>
                    <LayerList url={url}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

const mapStateToProps = (state, props) => {
    const {url, stillTraversing} = props;
    const {servers} = state;
    if(stillTraversing) {
        return {}
    }
    if(servers[url]) {
        return {
            url: url,
            markedForDelete: servers[url].markedForDelete,
        }
    } else {
        return {
            url: url
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {url, markedForDelete} = ownProps;
    return {
        deleteMe: (e) => {
            e.stopPropagation();
            if(markedForDelete) {
                dispatch(deleteServer(url));
            } else {
                dispatch(addCount(url));
            }
        }
    }
}
const styled = withStyles(styles)(Server);
export default connect(mapStateToProps, mapDispatchToProps)(styled);