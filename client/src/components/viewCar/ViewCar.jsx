import React, { useEffect, useState } from 'react';
import { Grid, CardContent, Typography, CardActions, Button, Card, Paper } from '@material-ui/core';
import { useStyles } from '../home/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import axios from 'axios';
import { useParams } from 'react-router-dom'
// import { tryCar } from '../../../../backend/app/controllers/clientController';


const ViewCar = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();
  const { id } = useParams();
  const [car, setCar] = useState('')


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const viewCar = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4600/api/${id}`);
      if (data) setCar(data)
    } catch (err) {
      if (err) console.log(err.response.data)
    }
  }

  console.log(car)

  useEffect(() => {
    viewCar()
  }, [viewCar])


  return (
    <>

      <Paper className={classes.cardGrid} elevation={0}>
        {(car) ? (

          <Grid container className={classes.cardGrid2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card key={car._id} className={classes.card}>
                <img className={classes.img} src={__dirname + car.image} alt={car.name} />

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
        ) : <p>Véhicule not found!</p>}

      </Paper>
    </>
  )
}

export default ViewCar
