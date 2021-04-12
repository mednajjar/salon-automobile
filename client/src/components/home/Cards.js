import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {fetchCars} from '../../actions/CarAction';
import {Container, Grid, CardContent, Typography, CardActions, Button, Card} from '@material-ui/core';
import Navbar from '../dashboard/Navbar';


import {useStyles} from './styles'

const Cards = () => {
    const classes = useStyles();
    const car = useSelector((state) => state.cars );
    const dispatch = useDispatch();
    console.log(car)

      useEffect(()=>{
        dispatch(fetchCars())
      },[dispatch])

    return (
        <>
        <Navbar />
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {car.map((data) => (
              <Grid item key={data._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <img className={classes.img} src={data.image} alt={data.name} />

                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {data.name}
                    </Typography>
                    <Typography>
                     <b>Price:</b> {data.price} DH
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.btn}>
                    <Button href={`/${data._id}`} variant="contained" size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </>
    )
}

export default Cards
