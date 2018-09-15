import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import openInNewTab from "../utils/openInNewTab";
const styles = theme => ({
  root: {
    width: '100%',
    padding: '0px',
    margin: '0px',
    fontSize: 14
  }
})
const serverTypes = ["ImageServer", "MapServer", "FeatureServer"];
const shouldKeepInPath = (pathElement) => {
  return pathElement 
    && pathElement.length > 0
    && !serverTypes.includes(pathElement);
}

const getDisplayName = ({serverUrl, url, name}) => {
  let display = url.replace(serverUrl, "");
  let split = display.split("/");
  split[split.length - 1] = name;
  return split.filter(shouldKeepInPath).join(" / ");
}

class LayerItem extends Component {
    
    componentWillMount() {
      this.setState({
        displayName: getDisplayName(this.props)
      });
    }

    render() {
      const {url, classes} = this.props;
      const displayName = getDisplayName(this.props);
      return (
        <Typography className={classes.root}>
          <a href={url} onClick={openInNewTab(url)}>{displayName}</a>
        </Typography>
      );
    }
}

const mapStateToProps = (state, props) => {
  const {serverUrl, url} = props;
  const layer = state.servers[serverUrl].layers[url];
  return layer;
}
const LayerItemWithStyles = withStyles(styles)(LayerItem);
export default connect(mapStateToProps)(LayerItemWithStyles);