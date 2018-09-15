import React from 'react';
import {connect} from 'react-redux';
import LayerItem from './LayerItem';
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {withStyles} from '@material-ui/core/styles';
import filterLayer from '../utils/filterLayer';

const styles = theme => {
    return {
        paginationRoot: {
            marginLeft: '0px'
          },
        root: {
            width: '100%',
            marginTop: theme.spacing.unit * 3,
        },
        table: {
            minWidth: 450,
        },
        tableWrapper: {
            overflowX: 'auto',
        },
        tableRow: {
            height: "15px"
        }
        
    }
    
}

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    }
    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    }
    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    }
    handleLastpageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1) 
        );
    }
    isOnLastPage = () => {
        return this.props.page >= Math.ceil(this.props.count / this.props.rowsPerPage) - 1
    }
    render() {
        const {classes, page} = this.props;
        return (
            <div className={classes.root}>
            <IconButton 
                onClick={this.handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                <FirstPageIcon /> 
            </IconButton>
            <IconButton 
                onClick={this.handleBackButtonClick}
                disabled={page === 0}
                aria-label="Previous Page"
            > 
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton 
                onClick={this.handleNextButtonClick}
                disabled={this.isOnLastPage()}
                aria-label="Next Page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={this.handleLastpageButtonClick}
                disabled={this.isOnLastPage()}
                aria-label="Last Page"
            >
                <LastPageIcon />
            </IconButton>
            </div>
        )
    }
}

const WrappedTablePaginationActions = withStyles(styles)(TablePaginationActions);

const mapStateToProps = (state, props) => {
    const {url} = props;
    const {servers} = state;
    return {
        folders: Object.keys(servers[url].folders),
        layers: servers[url].layers,
        url: url,
        services: Object.keys(servers[url].services),
        markedForDelete: servers[url].markedForDelete,
        searchString: state.search.searchString,
        shouldSearchContents: state.search.shouldSearchContents
    }
}


class LayerList extends React.Component {
    state = {
        rowsPerPage: 10,
        page: 0
    }
    handleChangePage = (event, page) => {
        this.setState({ page: page});
    };
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    

    render() {
        const {layers, classes, searchString, url, shouldSearchContents} = this.props;
        const {rowsPerPage, page} = this.state;
        let filteredLayers = Object.keys(layers)
            .sort()
            .map(key => layers[key])
            .filter(filterLayer(searchString, shouldSearchContents));
        let numRows = filteredLayers.length;
        return (
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TablePagination
                                colSpan={1}
                                count={numRows}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredLayers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(layer => {
                            console.log(layer.url);
                            return (
                                <TableRow className={classes.tableRow}>
                                    <TableCell>
                                        <LayerItem serverUrl={url} url={layer.url}/>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default connect(mapStateToProps)(withStyles(styles)(LayerList));