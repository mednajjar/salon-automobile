import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Avatar, Button, CssBaseline, Paper, Grid, Typography, Container} from '@material-ui/core';
// import AntSwitch from '@material-ui/core/Switch'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import {useHistory} from 'react-router-dom';
import Input from './input/Input';
import {Link} from 'react-router-dom';
// import {registerClient} from '../../actions/ClientAction';
// import {registerOwner} from '../../actions/OwnerAction';
import {loginPage} from '../../actions/auth'




// const loginForm = {email: '',password: ''}
const Login = () => {
    // const [form, setForm] = useState(initialState);
    // const[owner, setOwner]= useState(ownerState);
    const [formData, setFormData] = useState({email: '',password: ''})
    // const [isSignup, setIsSignup] = useState(false);
    // const [checked, setChecked] = useState({checkedA:false})
    const dispatch = useDispatch();
    
   
  
  
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
  
    // const switchMode = () => {
    //   setForm(initialState);
    //   setOwner(ownerState)
    //   setIsSignup((prevIsSignup) => !prevIsSignup);
    //   setShowPassword(false);
    // };
      const classes = useStyles();
      const history = useHistory();
      const handleChange = (e) =>{
        // setForm({ ...form, [e.target.name]: e.target.value });
        // setOwner({ ...owner, [e.target.name]: e.target.value });
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }

      const onsubmit = (e) =>{
        // if(!isSignup){
          e.preventDefault();
          console.log(formData)
          return dispatch(loginPage(formData, history))
        // }

        // if(checked.checkedA === false){
       
        //   console.log(form)
        //   return dispatch(registerClient(form, history))
          
        // }else{
        //   console.log(owner)
        //   return dispatch(registerOwner(owner, history))
          
        // }
       

        
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
                <Grid container spacing={2}>
                  {/* { isSignup && (
                  <>
                    <Input name="first_name" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="last_name" label="Last Name" handleChange={handleChange} half />
                    <Input name="cin" label="CIN" handleChange={handleChange} type="text" />
                    <Input name="phone" label="Phone" handleChange={handleChange} type="text" />
                  </>
                  )} */}
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email" /> 
                  {/* {isSignup &&
                  checked.checkedA === true &&
                  <Input name="rib" label="Rib number" handleChange={handleChange} type="text" />
                  
                  } */}
                 
                  
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                  {/* { isSignup &&
                   <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                  } */}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  {/* { isSignup ? 'Sign Up' : 'Sign In' } */}
                  sign in
                </Button>
                <Grid item >
                    <Link variant="inherit" to="/register">
                      Don't have an account? Sign Up
                    </Link>
                </Grid>
                {/* <Grid container >   
                  <Grid item >
                    <Link onClick={switchMode} variant="inherit" to="">
                      { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Link>
                  </Grid>
                  {isSignup && 
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Client</Grid>
                    <Grid item>
                      <AntSwitch checked={checked.ckeckedA} onChange={(e)=>setChecked({...checked, [e.target.name]: e.target.checked})} name="checkedA" />
                    </Grid>
                    <Grid item>Owner</Grid>
                  </Grid>
                  }
                </Grid> */}
              </form>
              </div>
            </Container>
          </Grid>
        </Grid>
    )
}

export default Login
