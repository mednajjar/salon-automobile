import React, { useState } from 'react';
import { TextField, Button, Paper, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import axios from 'axios'


const Car = () => {
 
  const classes = useStyles();
  const [carData, setCarData] = useState({ registration_number: '', image: '', name: '', mark: '', color: '', price: '', fuel: '' });

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('registration_number', carData.registration_number);
    formData.append('name', carData.name);
    formData.append('image', carData.image);
    formData.append('mark', carData.mark);
    formData.append('color', carData.color);
    formData.append('price', carData.price);
    formData.append('fuel', carData.fuel);
    await axios.post('http://localhost:4600/api/addcar', formData);
    return history.push('/cars')
  };




  return (
    <div className="container mt-5">

      <Container>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <TextField name="registration_number" variant="outlined" label="registration number" fullWidth value={carData.registration_number} onChange={(e) => setCarData({ ...carData, registration_number: e.target.value })} />
            <TextField name="name" variant="outlined" label="Name" fullWidth value={carData.name} onChange={(e) => setCarData({ ...carData, name: e.target.value })} />
            <div className={classes.fileInput}><input type="file" multiple={false} onChange={(e) => setCarData({ ...carData, image: e.target.files[0] })} /></div>
            <TextField name="mark" variant="outlined" label="Mark" fullWidth value={carData.mark} onChange={(e) => setCarData({ ...carData, mark: e.target.value })} />
            <TextField name="color" variant="outlined" label="Color" fullWidth value={carData.color} onChange={(e) => setCarData({ ...carData, color: e.target.value })} />
            <TextField name="price" variant="outlined" label="Price" fullWidth value={carData.price} onChange={(e) => setCarData({ ...carData, price: e.target.value })} />
            <TextField name="fuel" variant="outlined" label="Fuel" fullWidth value={carData.fuel} onChange={(e) => setCarData({ ...carData, fuel: e.target.value })} />
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

          </form>
        </Paper>
      </Container>


    </div>
  )
}

export default Car
