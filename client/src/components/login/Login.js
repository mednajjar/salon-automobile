import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Input from './input/Input';
import { Link } from 'react-router-dom';
import {getLogin} from '../../redux/slices/authSlice'


const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' })
  const {loginError} = useSelector(state => state.authentification)
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const classes = useStyles();
  const history = useHistory();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    dispatch(getLogin(formData))
    history.push('/dashboard');
  }

  return (

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper} >
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">sign in</Typography>
            <form className={classes.form} onSubmit={onsubmit}>
              {loginError && <p>{loginError}</p>}
              <Grid container spacing={2}>
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                sign in
                </Button>
              <Grid item >
                <Link variant="inherit" to="/register">
                  Don't have an account? Sign Up
                    </Link>
              </Grid>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>

  )
}

export default Login
