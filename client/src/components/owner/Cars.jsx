import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useDispatch,useSelector} from 'react-redux';
import {getCar} from '../../redux/slices/carSlice';

const columns = [
  { id: 'registration_number', label: 'Registration number', minWidth: 170 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'mark',
    label: 'Mark',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'color',
    label: 'Color',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'fuel',
    label: 'Fuel',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'is_saled',
    label: 'Is saled',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
];


const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '6rem auto',
  },
  container: {
    maxHeight: 440,
  },
});

const Cars = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {car} = useSelector(state => state.allCar)
    console.log('all cars',car)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCar())
    }, [dispatch])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper className={classes.root}>
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
                  {column.label}
                </TableCell>
              
               
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {car.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                 
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                   
                    return (
                      
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof (value === 'number'|| value === 'boolean') ? column.format(value) : value}
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={car.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    )
}

export default Cars
