import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, CardContent, Typography, CardActions, Button, Card, Paper} from '@material-ui/core';
import {useStyles} from '../home/styles';
import {getCar} from '../../actions/CarAction';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Navbar from '../dashboard/Navbar';

const ViewCar = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    const classes = useStyles();
    const currentId = props.match.params.id;
    const car = useSelector((state) => state.cars);
    // console.log(currentId)
    // console.log(car)

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCar(currentId))
      },[currentId,dispatch])


    return (
           <>
           <Navbar />
           <Paper className={classes.cardGrid} elevation={0}>
           {(car) ? (
       
          <Grid container className={classes.cardGrid2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card key={car._id} className={classes.card}>
                <img className={classes.img} src={car.image} alt={car.name} />
                  
                  {/* *********** */}
                  <CardActions disableSpacing>
        <Typography>
        <b>{car.name}</b>
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
            <b>Mark:</b> {car.mark}
          </Typography>
          <Typography paragraph align='left'>
            <b>Color:</b> {car.color}
          </Typography>
          <Typography paragraph align='left'>
            <b>Price:</b> {car.price}
          </Typography>
          <Typography align='left'>
            <b>Fuel:</b> {car.fuel}
          </Typography>
        </CardContent>
      </Collapse>
                  {/* *********** */}
                  <CardActions className={classes.btn}>
                    <Button variant="contained" size="small" color="primary">
                      Buy
                    </Button>
                    <Button variant="contained" size="small" color="primary">
                      Make offer
                    </Button>
                    <Button variant="contained" size="small" color="primary">
                      Try
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
            ): <p>Véhicule not found!</p>}
            
         </Paper> 
          </>
    )
}

export default ViewCar