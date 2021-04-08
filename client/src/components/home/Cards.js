import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {fetchCars} from '../../actions/OwnerAction';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
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
                    <Button href={`/view/${data._id}`} variant="contained" size="small" color="primary">
                      View
                    </Button>
                    {/* <Button variant="contained" size="small" color="primary">
                      Try
                    </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        
    )
}

export default Cards
