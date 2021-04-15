import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Avatar, Button, CssBaseline, Paper, Grid, Typography, Container} from '@material-ui/core';
import AntSwitch from '@material-ui/core/Switch'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import {useHistory} from 'react-router-dom';
import Input from './input/Input';
import {Link} from 'react-router-dom';
import {registerClient} from '../../actions/ClientAction';
import {registerOwner} from '../../actions/OwnerAction';


const initialState = { first_name: '', last_name: '',cin:'', email: '',phone:'', password: ''};
const ownerState = { first_name: '', last_name: '',cin:'', email: '',phone:'',rib:'', password: ''};

const Register = () => {
    const [form, setForm] = useState(initialState);
    const[owner, setOwner]= useState(ownerState);
    // const [isSignup, setIsSignup] = useState(false);
    const [checked, setChecked] = useState({checkedA:false})
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
        setForm({ ...form, [e.target.name]: e.target.value });
        setOwner({ ...owner, [e.target.name]: e.target.value });
      }

      const onsubmit = (e) =>{
          e.preventDefault();
        if(checked.checkedA === false){
       
          console.log(form)
          return dispatch(registerClient(form, history))
          
        }else{
          console.log(owner)
          return dispatch(registerOwner(owner, history))
          
        } 
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
              <Typography component="h1" variant="h5">Sign Up</Typography>
              <form className={classes.form} onSubmit={onsubmit}>
                <Grid container spacing={2}>
                <Input name="first_name" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="last_name" label="Last Name" handleChange={handleChange} half />
                <Input name="cin" label="CIN" handleChange={handleChange} type="text" />
                <Input name="phone" label="Phone" handleChange={handleChange} type="text" />
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" /> 
                {checked.checkedA === true &&
                <Input name="rib" label="Rib number" handleChange={handleChange} type="text" />  
                } 
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> 
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  { checked.checkedA === true ? 'Sign Up as Owner' : 'Sign Up as Client' }  
                </Button> 
                <Grid container >   
                  <Grid item >
                    <Link variant="inherit" to="/">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Client</Grid>
                    <Grid item>
                      <AntSwitch checked={checked.ckeckedA} onChange={(e)=>setChecked({...checked, [e.target.name]: e.target.checked})} name="checkedA" />
                    </Grid>
                    <Grid item>Owner</Grid>
                  </Grid>
                </Grid>
              </form>
              </div>
            </Container>
          </Grid>
        </Grid>
    )
}

export default Register
