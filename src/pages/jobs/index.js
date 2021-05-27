import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import {getJobsList} from '../../actions/jobActions'

import TextField from '@material-ui/core/TextField';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import * as _ from 'lodash';

const dispatchToProps = (dispatch) => {
    return {
        getJobsList: (token, currentPage, pageSize, searchQuery, fromDate, todate) => dispatch(getJobsList(token, currentPage, pageSize, searchQuery, fromDate, todate))
    }
}

const stateToProps = (state) => {
    return {
        token: state.user.token,
        error: state.job.error,
        jobList: state.job.jobList,
        recordsFiltered: state.job.recordsFiltered
    };
}

const columns = [
    { 
        id: 'jobNumber',
        label: 'Job Number',
        minWidth: 100,
    },
    {
        id: 'customerName',
        label: 'Customer Name',
        minWidth: 100,
    },
    {
        id: 'billingName',
        label: 'Billing Name',
        minWidth: 100,
    },
    {
        id: 'jobDate',
        label: 'Job Date',
        minWidth: 170,
    },
    {
        id: 'jobTimeSpecific',
        label: 'Job Time Specific',
        minWidth: 70,
    },
    {
        id: 'jobTimeFrom',
        label: 'Job Time From',
        minWidth: 70,
    },
    {
        id: 'jobTimeTo',
        label: 'Job Time To',
        minWidth: 70,
    },
    {
        id: 'actualJobTimeSpecific',
        label: 'Actual Job Time Specific',
        minWidth: 70,
    },
    {
        id: 'inProgressTime',
        label: 'In Progress Time',
        minWidth: 70,
    },
    {
        id: 'jobAttemptCompletedDate',
        label: 'Job Attempt Completed Date',
        minWidth: 70,
    },
    {
        id: 'jobTemplateName',
        label: 'Job Template Name',
        minWidth: 70,
    },
    {
        id: 'driverName',
        label: 'Driver Name',
        minWidth: 70,
    },
    {
        id: 'vehicleName',
        label: 'Vehicle Name',
        minWidth: 70,
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '80vh',

    },
    datePickerDive: {
        margin: '10px',
        marginTop: '0 !important'
    },
    datePicker: {
        marginTop: '8px',
        float: 'right'
    },
    searchDiv: {
        float: 'right'
    },
    tableDiv: {
        boxShadow: 'rgb(0 0 0 / 35%) 0px 5px 15px'
    }
});

function JobsList(props) {
    const classes = useStyles();
    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [rows, setRow] = React.useState([]);
    const [totalRecord, setTotalRecord] = React.useState(props.recordsFiltered);
    const [dateValue, setDateValue] = React.useState([null, null]);
    const [search, setSearch] = React.useState('');
    const [sortTableField, setSortTableField] = React.useState('');
    const [orderBy, setOrderBy] = React.useState('asc');

    const callAPI = () => {
        let fromDate = '';
        let toDate = '';
        if (dateValue[0] && dateValue[1]) {
            fromDate = dateValue[0].getFullYear() + '-' + (dateValue[0].getMonth() < 10 ? ('0' + dateValue[0].getMonth()) : dateValue[0].getMonth()) + '-' + dateValue[0].getDate();
            toDate = dateValue[1].getFullYear() + '-' + (dateValue[1].getMonth() < 10 ? ('0' + dateValue[1].getMonth()) : dateValue[1].getMonth()) + '-' + dateValue[1].getDate();
        }
        props.getJobsList(props.token, page, rowsPerPage, search, fromDate, toDate);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleMouseDownSearch = (event) => {
        event.preventDefault();
    };

    const handleClickShowSearch = () => {
        callAPI();
    };
    
    const datePicked = () => {
        callAPI();
    }

    const formatData = () => {
        const data = [...props.jobList];
        data.forEach(element => {
            let date = new Date(element.jobDate);
            element.jobDate = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

            date = new Date(element.jobTimeSpecific);
            element.jobTimeSpecific = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            date = new Date(element.jobTimeFrom);
            element.jobTimeFrom = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

            date = new Date(element.jobTimeTo);
            element.jobTimeTo = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

            date = new Date(element.actualJobTimeSpecific);
            element.actualJobTimeSpecific = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            date = new Date(element.inProgressTime);
            element.inProgressTime = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

            date = new Date(element.jobAttemptCompletedDate);
            element.jobAttemptCompletedDate = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        });
        if (sortTableField) {
            setRow(_.orderBy(props.jobList, [sortTableField], [orderBy]))
        } else {
            setRow(data);   
        }
    }

    const createSortHandler = (column) => {
        let order = orderBy;
        if (column !== sortTableField) {
            setSortTableField(column);
        } else {
            order = orderBy === 'asc' ? 'desc' : 'asc';
            setOrderBy(order)
        }
    }

    React.useEffect(() => {
        formatData();
    }, [props.jobList]);

    React.useEffect(() => {
        formatData();
    }, [orderBy, sortTableField]);

    React.useEffect(() => {
        setTotalRecord(props.recordsFiltered);
    }, [props.recordsFiltered]);

    React.useEffect(() => {
        callAPI();
    }, [page]);

    React.useEffect(() => {
        callAPI();
    }, [rowsPerPage]);

    React.useEffect(() => {
        if (props.token) {
            callAPI();
        } else {
            history.push("/login");
        }
    }, [props.token]);

    React.useEffect(() => {
        if (props.token) {
            callAPI();
        } else {
            history.push("/login");
        }
    }, []);

    return (
        <Paper className={classes.root}>
            <Grid container spacing={3} className={classes.datePickerDive}>
                <Grid item xs={12} sm={9}>
                    <div className={classes.datePicker}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDateRangePicker
                                startText="From Date"
                                endText="To Date"
                                value={dateValue}
                                onChange={(newValue) => {
                                    setDateValue(newValue);
                                }}
                                onClose={datePicked}
                                renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField {...startProps} />
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps} />
                                    </React.Fragment>
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div className={classes.searchDiv}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-search"
                                value={search}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Search"
                                            onClick={handleClickShowSearch}
                                            onMouseDown={handleMouseDownSearch}
                                            edge="end"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Search"
                            />
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.tableDiv}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <TableSortLabel
                                            active={sortTableField === column.id}
                                            direction={orderBy}
                                            onClick={() => {createSortHandler(column.id)}}
                                        >
                                            {column.label}
                                            {orderBy === column.id ? (
                                                <span className={classes.visuallyHidden}>
                                                    {orderBy === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </span>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.jobNumber}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[50, 100, 300, 500]}
                    component="div"
                    count={totalRecord}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </Paper>
    );
}

export default connect(stateToProps, dispatchToProps)(JobsList);
