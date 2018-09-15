import withStyles from "@material-ui/core/styles/withStyles";
import { fade } from '@material-ui/core/styles/colorManipulator'
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import {updateSearch, updateSearchContents} from '../constants/actions';
const styles = theme => ({
  
    searchIcon: {
      color: 'white'
    },
    searchInput: {
      color: 'white',
    },
    searchInputFocused: {
      width: "50%",
    },
    root: {
      marginLeft: 'auto',
      marginRight: 1,
      background: fade(theme.palette.common.white, 0.15),
      '&:hover' : {
        background: fade(theme.palette.common.white, 0.25)
      },
      "& $inputInput": {
        transition: theme.transitions.create('width'),
        width: 120,
        '&:focus': {
          width: 170
        }
      }
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
        .spacing.unit * 9}px`,
    },
    tooltip: {
        maxWidth: 150
    }
  
})

const tooltipText = `Include description in search`;
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        search: (searchString) => dispatch(updateSearch(searchString)),
        shouldSearchContents: (includeDescription) => dispatch(updateSearchContents(includeDescription))
    }
}

const mapStateToProps = (state, props) => {
    return {
        searchString: state.search.searchString,
        includeDescription: state.search.shouldSearchContents
    }
}

class SearchBox extends React.Component {
    state= {}
    
    updateSearch = (event) => {
        this.setState({
            searchString: event.target.value
        })
    }
    updateContentSearch = (event, checked) => {
        this.props.shouldSearchContents(checked);
    }
    onKeyPress = (ev) => {
        if(ev.key === 'Enter') {
            const {searchString = ""} = this.state;
            this.props.search(searchString);
        }
    }
    componentWillMount() {
        this.props.search("");
        this.props.shouldSearchContents(false);
    }
    render() {
        const {classes, includeDescription} = this.props;
        
        return (
        <div className={classes.root} style={{display: "block"}}>
            <Input
            onKeyPress={this.onKeyPress}
            onChange={this.updateSearch}
            startAdornment={(
                <InputAdornment>
                <SearchIcon style={{color: 'white', marginLeft: 5}} />
                </InputAdornment>
            )}
            endAdornment={
                <Tooltip classes={{tooltip: classes.tooltip}} title={tooltipText}>
                <InputAdornment>
                    <Checkbox onChange={this.updateContentSearch} checked={includeDescription}/>
                </InputAdornment>
                </Tooltip>

            }
            disableUnderline={true}
            placeholder={"Search...    \u23CE"}
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput
            }}
            inputRef={ref => {
                this.inputRef = ref
            }}
            />
        </div>
        );
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBox));