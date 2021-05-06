import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getCar} from '../../redux/slices/carSlice';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { Container, Grid, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import {useStyles} from '../home/styles'



const Cars = () => {
    const classes = useStyles();
    const {car} = useSelector((state) => state.allCar)
    
    // console.log('all cars',car)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCar())
    }, [dispatch])
    

   
   
    return (
   
        <Container className={classes.cardGrid} maxWidth="md">
          <h3 className="text-center">All cars</h3>
        <Grid container spacing={4}>
          {(car.length > 0) && car.map((data) => (
            <Grid item key={data._id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <img className={classes.img} src={data.image} alt={data.name} />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.name}
                  </Typography>
                  <Typography>
                    <b>Price:</b> {data.price} DH
                    <b>Saled:</b> {data.is_saled} 
                    </Typography>
                </CardContent>
                <CardActions className={classes.btn}>                 
                  <Link to={`/cars/${data._id}`}>
                    <Button variant="contained" size="small" color="primary">
                     View
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    )
}

export default Cars
