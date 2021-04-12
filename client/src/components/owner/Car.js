import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Container, InputLabel, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';
import {useHistory } from 'react-router-dom';

import Navbar from '../dashboard/Navbar';
import useStyles from './styles';
import { addCar } from '../../actions/CarAction';
import {getPlaces} from '../../actions/PlaceAction';
// import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const Car = () => {

  const classes = useStyles();
  const [carData, setCarData] = useState({ registration_number: '', image:'', name:'', mark:'',place_number:'', color:'', price:'', fuel:''});

  const place = useSelector((state) => state.place );
  console.log(place)

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    
    dispatch(getPlaces())
  
  }, [dispatch]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('registration_number', carData.registration_number);
    formData.append('name', carData.name);
    formData.append('image', carData.image);
    formData.append('mark', carData.mark);
    formData.append('color', carData.color);
    formData.append('price', carData.price);
    formData.append('fuel', carData.fuel);
    formData.append('place_number', carData.place_number);
    
    dispatch(addCar(formData, history));
    
  };
 



    return (
        <div>
            <Navbar />
              <Container>
            <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <TextField name="registration_number" variant="outlined" label="registration number" fullWidth value={carData.registration_number} onChange={(e) => setCarData({ ...carData, registration_number: e.target.value })} />
                <TextField name="name" variant="outlined" label="Name" fullWidth value={carData.name} onChange={(e) => setCarData({ ...carData, name: e.target.value })} />
                <div className={classes.fileInput}><input type="file" multiple={false} onChange={(e) => setCarData({ ...carData, image: e.target.files[0] })} /></div>
                <TextField name="mark" variant="outlined" label="Mark" fullWidth value={carData.mark} onChange={(e) => setCarData({ ...carData, mark: e.target.value })} />
                <TextField name="color" variant="outlined" label="Color" fullWidth value={carData.color} onChange={(e) => setCarData({ ...carData, color: e.target.value })} />
                <TextField name="price" variant="outlined" label="Price" fullWidth value={carData.price} onChange={(e) => setCarData({ ...carData, price: e.target.value })} />
                {/* ********************************* */}
                <FormControl className={classes.fileInput}>
                  <InputLabel id="place">Aviable place</InputLabel>
                  <Select
                    name="place_number"
                    labelId="place"
                    id="av-place"
                    value={carData.place_number}
                    onChange={(e)=>setCarData({...carData, place_number: e.target.value})}
                  >
                    {place.map(res=>(
                      <MenuItem key={res._id} value={res.place_number}>{res.place_number}</MenuItem>
                    ))}
                    
                   
                  </Select>
                </FormControl>
                {/* ******************* */}
                <TextField name="fuel" variant="outlined" label="Fuel" fullWidth value={carData.fuel} onChange={(e) => setCarData({ ...carData, fuel: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            
            </form>
            </Paper>
            </Container>
          
            
        </div>
    )
}

export default Car
