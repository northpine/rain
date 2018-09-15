import React, { Component } from 'react';
import LayerItem from './LayerItem';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles'
import { 
  ExpansionPanel, 
  ExpansionPanelSummary, 
  ExpansionPanelDetails, 
  Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {ExpandMore} from '@material-ui/icons';

const styles = (theme) => ({
  root: {
      width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    padding: '0px'
  }
});


class Service extends Component {
    render() {
      const {layers, name, serverUrl, classes} = this.props;
        return (
          <ExpansionPanel className={classes.root} CollapseProps={{ unmountOnExit: true }}>
            <ExpansionPanelSummary expandIcon={<ExpandMore /> }>
              <Typography>
                {name}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.heading}>
              <Table>
                <TableBody>
                  {layers.map((url) => 
                    <TableRow key={url}>
                      <TableCell>
                        <LayerItem key={url} url={url} serverUrl={serverUrl} />
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
    layers: state.servers[serverUrl].services[name].layers
  }
}
const ServiceWithStyles = withStyles(styles)(Service);
export default connect(mapStateToProps)(ServiceWithStyles);