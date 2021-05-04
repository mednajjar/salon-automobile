import React, { useEffect, useState } from 'react';
import { Container, Grid, CardContent, Typography, CardActions, Button, Card } from '@material-ui/core';
import { useStyles } from './styles'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Cards = () => {
  const classes = useStyles();


  const [car, setCar] = useState([])

  const getCars = async () => {
    const { data } = await axios.get('http://localhost:4600/api/cars');
    if (data) setCar(data)

  }
  console.log(car)


  useEffect(() => {
    getCars()
  }, [])

  return (
    <>

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {car.length >0 && car.map((data) => (
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
                  <Link to={`/home/${data._id}`}>
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
    </>
  )
}

export default Cards
