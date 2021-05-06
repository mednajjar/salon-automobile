import React, { useEffect, useState } from 'react';
import { Grid, CardContent, Typography, CardActions, Card, Paper} from '@material-ui/core';
import {Link} from 'react-router-dom'
import { useStyles } from '../home/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { useParams, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getOneCar, deleteCar, editCar} from '../../redux/slices/carSlice';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField  }from '@material-ui/core';

const View = () => {

  const classes = useStyles();
  const { id } = useParams();

// ************ toggle button ***** 
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch();
  const { oneCar } = useSelector((state)=>state.allCar)

//**********fetch car by id*** */ 
  useEffect(() => {
    dispatch(getOneCar(id) )
  }, [dispatch, id])
// ********* pop up *************
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const initialState = {
  registration_number: '', 
  fuel: '', 
  price:'',
  color:'',
  mark:'',
  name:''
}
  const [carData, setCarData] = useState(initialState)

  const handleEdit = () =>{
    setEdit(true)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false)
  };

const history = useHistory()

const handleDelete = (e) =>{
  e.preventDefault()
    dispatch(deleteCar(id))
    history.push(`/cars`)
}

const onChange = (e)=>{
  
  setCarData({...carData, [e.target.name]: e.target.value }) 

}
const handleEditCar = (e) =>{
    e.preventDefault()
    const formData = new FormData();
    for (const [key, value] of Object.entries(carData))
      {
        formData.append(key, value);
      }
    dispatch(editCar({formData,id}))
    history.push(`/cars`)
  
}


    return (
        <>

        <Paper className={classes.cardGrid} elevation={0}>
          {oneCar && (
  
            <Grid container className={classes.cardGrid2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card key={oneCar._id} className={classes.card}>
                  <img className={classes.img} src={__dirname + oneCar.image} alt={oneCar.name} />
                  <CardActions disableSpacing>
                    <Typography>
                      <b>{oneCar.name}</b>
                    </Typography>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Details:</Typography>
                      <Typography paragraph align='left'>
                        <b>Mark:</b> {oneCar.mark}
                      </Typography>
                      <Typography paragraph align='left'>
                        <b>Color:</b> {oneCar.color}
                      </Typography>
                      <Typography paragraph align='left'>
                        <b>Price:</b> {oneCar.price}
                      </Typography>
                      <Typography align='left'>
                        <b>Fuel:</b> {oneCar.fuel}
                      </Typography>
                    </CardContent>
                  </Collapse>
                  <CardActions className={classes.btn}>
                    <Link to="/cars" >
                      <button className="btn btn-primary" variant="contained" size="small" >
                        retour
                      </button>
                    </Link>
                    <button className="btn btn-secondary" variant="contained" size="small"  onClick={handleEdit}>
                      Edit
                    </button>
                    <button className="btn btn-danger" variant="contained" size="small"  onClick={handleClickOpen}>
                      Delete
                    </button>
                    <Dialog
                      open={open || edit}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                     
                    <DialogTitle id="alert-dialog-title"> {open ? `Delete ${oneCar.name} from list` : `Edit ${oneCar.name}`}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          {open ? 'Are you sure you want to delete this car from list?' : (
                            
                            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleEditCar} >
                            <TextField name="registration_number" variant="outlined" label="registration number" fullWidth defaultValue={oneCar.registration_number} onChange={onChange} />
                            <TextField name="name" variant="outlined" label="Name" fullWidth defaultValue={oneCar.name} onChange={onChange} />
                            <div className={classes.fileInput}><input type="file" multiple={false} onChange={(e) => setCarData({ ...carData, image: e.target.files[0] })} /></div>
                            <TextField name="mark" variant="outlined" label="Mark" fullWidth defaultValue={oneCar.mark} onChange={onChange} />
                            <TextField name="color" variant="outlined" label="Color" fullWidth defaultValue={oneCar.color} onChange={onChange} />
                            <TextField name="price" variant="outlined" label="Price" fullWidth defaultValue={oneCar.price} onChange={onChange} />
                            <TextField name="fuel" variant="outlined" label="Fuel" fullWidth defaultValue={oneCar.fuel} onChange={onChange} />
                            <DialogContent className="text-end" >
                            <Button className={`${classes.buttonSubmit} ${classes.buttonSubmitB}`} variant="contained" color="primary" size="small" onClick={handleClose}>Cancel</Button>
                            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" >Submit</Button>
                            </DialogContent>
                          </form>
                        
                          )} 
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        {open && (
                          <>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleDelete} color="primary" autoFocus>
                          Delete
                        </Button>
                        </>
                        )
                        }
                      </DialogActions>
                    </Dialog>
         
                  </CardActions>
                 
                </Card>
              </Grid>
            </Grid>
          ) 
          }
  
        </Paper>
       
      </>
    )
}

export default View
