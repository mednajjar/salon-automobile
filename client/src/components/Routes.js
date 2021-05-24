import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Login from './login/Login';
import Register from './login/Register';
import AddCar from './owner/Car';
import Home from './home/Cards';
import View from './viewCar/ViewCar';
import Cars from './owner/Cars'
import ViewSingleCar from './owner/View'


const Routes = () => {
    const { isAuthenticated, role } = useSelector(state => state.authentification)
    console.log({ isAuthenticated, role })
    // console.log({ role, isAuthenticated })
    return (


        <Switch>
            <AuthRoute path="/" exact role={role} auth={isAuthenticated} component={Login} />
            <AuthRoute path="/register" role={role} auth={isAuthenticated} component={Register} />
            <AdminRoute path="/cars" exact role={role} auth={isAuthenticated} component={Cars} />
            <AdminRoute path="/car/add" role={role} auth={isAuthenticated} component={AddCar} />
            <AdminRoute path="/cars/:id" role={role} auth={isAuthenticated} component={ViewSingleCar} />
            <ClientRoute path="/home" exact role={role} auth={isAuthenticated} component={Home} />
            <ClientRoute path='/home/:id' role={role} auth={isAuthenticated} component={View} />
        </Switch>

    )
}


const AdminRoute = ({ path, component: Component, role, auth, ...rest }) => {
    return (
        (
            <Route
                {...rest}
                render={() => (auth && role === 'owner' ? <Component /> : <Redirect to="/" />)}
            />
        )
    )
}

const ClientRoute = ({ path, component: Component, role, auth, ...rest }) => {
    // console.log(auth, role, Component)
    return (
        (
            <Route
                {...rest}
                render={() => (auth && role === 'client' ? <Component /> : <Redirect to="/" />)}
            />
        )
    )
}


const AuthRoute = ({ path, component: Component, role, auth, ...rest }) => (
    <Route
        {...rest}
        render={() => (!auth
            ? (<Component />)
            : (role === 'owner')
                ? (<Redirect to="/cars" />)
                : (<Redirect to="/home" />))}
    />
)



export default Routes
