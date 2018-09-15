import React, { Component } from 'react';
import Service from './Service';
import { connect } from 'react-redux';
import { 
    ExpansionPanel, 
    ExpansionPanelSummary, 
    Typography, 
    ExpansionPanelDetails,
    List,
    ListItem
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
});
class Folder extends Component {
    render() {
        const {services, name, serverUrl, classes} = this.props;
        return (
            <ExpansionPanel className={classes.root} CollapseProps={{ unmountOnExit: true }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        {name}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.heading}>
                    <Table>
                        <TableBody>
                            {services.map((service) => 
                                <TableRow key={service}>
                                    <TableCell>
                                        <Service serverUrl={serverUrl} name={service}/>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ExpansionPanelDetails>
            </ExpansionPanel>
                
        )
    }
}
const mapStateToProps = (state, props) => {
    const {serverUrl, name} = props;
    return {
        services: state.servers[serverUrl].folders[name].services
    }
}

const folderWithStyles = withStyles(styles)(Folder);
export default connect(mapStateToProps)(folderWithStyles);