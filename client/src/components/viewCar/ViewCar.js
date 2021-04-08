// import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import CardActions from '@material-ui/core/CardActions';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import {useStyles} from '../home/styles';
// import {fetchCars} from '../../actions/OwnerAction';

const ViewCar = (props) => {
    // const classes = useStyles();
    const currentId = props.match.params.id;
    // const car = useSelector((state) => currentId ? state.cars.find((car)=>car._id === currentId) : null);
    console.log(currentId)
    // console.log(car)
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(fetchCars())
    //   },[dispatch])


    return (
       <div>{currentId}</div>
        // <Container className={classes.cardGrid} maxWidth="md">
        //   <Grid container spacing={4}>
        //   {car.map((data)=>(

        //       <Grid item xs={12} sm={6} md={4}>
        //         <Card key={data._id} className={classes.card}>
        //         <img className={classes.img} src={data.image} alt={data.name} />

        //           <CardContent className={classes.cardContent}>
        //             <Typography gutterBottom variant="h5" component="h2">
        //             test
        //             </Typography>
        //             <Typography>
        //              <b>Price:</b> {data.price} DH
        //             </Typography>
        //           </CardContent>
        //           <CardActions className={classes.btn}>
        //             <Button variant="contained" size="small" color="primary">
        //               Buy
        //             </Button>
        //             <Button variant="contained" size="small" color="primary">
        //               Make offer
        //             </Button>
        //             <Button variant="contained" size="small" color="primary">
        //               Try
        //             </Button>
        //           </CardActions>
        //         </Card>
        //       </Grid>
        //   ))}
         
        //   </Grid>
        //  </Container>
     
    )
}

export default ViewCar
