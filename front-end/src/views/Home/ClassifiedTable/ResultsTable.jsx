import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {database} from "../../../firebase/index";


function createData(array) {
    const data = [];
    let i;
    for (i=0;i<array.length;i++){
        data.push(getRow(array[i][0],array[i][1], null));
    }
    return data;
}

let counter = -1;
function getRow(name, count, image) {
    counter += 1;
    return { id: counter, name, count, image};
}

const columnData = [
    { id: 'name', disablePadding: true, label: 'Image Name' },
    { id: 'count', disablePadding: false, label: 'Elephant Count' },
    { id: 'image', disablePadding: false, label: 'Image' }

];

class EnhancedTableHead extends React.Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                {column.id === 'image' ? null : <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                                }
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

class EnhancedTableToolbar extends React.Component{

    onReportClicked(e){
        database.addReport(this.props.path + '/' + this.props.img);
    };

    render(){
        const { numSelected, classes } = this.props;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="title" id="tableTitle">
                            Results
                        </Typography>
                    )}
                </div>
                <div className={classes.spacer}/>
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Report">
                            <IconButton aria-label="Report">
                                <FilterListIcon onClick={(e) => this.onReportClicked(e)}/>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <div></div>
                    )}
                </div>
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'name',
            selected: [],
            data:
                createData(this.props.results).sort((a, b) => (a.image < b.image ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
            imageName:null,
            countOn:this.props.countOn
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {

        const { selected } = this.state;

        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [id];
        }

        for(var i = this.state.page; i<this.state.rowsPerPage; i++){
            if(this.state.data[i].id===id){
                this.setState({imageName: this.state.data[i].name});
                break;
            }
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    onViewImageClicked = (event, id) => {

        for(var i = this.state.page; i<this.state.rowsPerPage; i++){
            if(this.state.data[i].id===id){
                this.props.updateImageSelected(this.state.data[i].name);
                break;
            }
        }
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar  path={this.props.path} img={this.state.imageName} numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    &nbsp;
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            countOn={this.state.countOn}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                const isSelected = this.isSelected(n.id);
                                if(this.state.countOn){
                                    return (
                                        <TableRow
                                            hover
                                            // onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox disabled checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.name}
                                            </TableCell>
                                            <TableCell >{n.count}</TableCell>
                                            <TableCell ><button onClick={(event) => this.onViewImageClicked(event, n.id)}>View Image</button></TableCell>
                                        </TableRow>
                                    );
                                }
                                else {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.name}
                                            </TableCell>
                                            <TableCell >{n.count}</TableCell>
                                            <TableCell ><button onClick={(event) => this.onViewImageClicked(event, n.id)}>View Image</button></TableCell>
                                        </TableRow>
                                    );
                                }

                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    &nbsp;
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);