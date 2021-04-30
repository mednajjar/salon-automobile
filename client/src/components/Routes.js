import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Login from './login/Login';
import Register from './login/Register';
import Car from './owner/Car';
import Home from './home/Cards';
import View from './viewCar/ViewCar';
import Cars from './owner/Cars'


const Routes = () => {
    const { isAuthenticated, role } = useSelector(state => state.authentification)
    console.log({ isAuthenticated, role })
    // console.log({ role, isAuthenticated })
    return (


        <Switch>
            <AuthRoute exact path="/" role={role} auth={isAuthenticated} component={Login} />
            <AuthRoute exact path="/register" role={role} auth={isAuthenticated} component={Register} />
            <AdminRoute path="/car/add" role={role} auth={isAuthenticated} component={Car} />
            <AdminRoute path="/cars" role={role} auth={isAuthenticated} component={Cars} />
            <ClientRoute path="/home" role={role} auth={isAuthenticated} component={Home} />
            <ClientRoute path='/:id' role={role} auth={isAuthenticated} component={View} />
        </Switch>

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
const ClientRoute = ({ path, component: Component, role, auth, ...rest }) => {
    console.log(auth, role, Component)
    return (
        (
            <Route
                {...rest}
                render={() => (auth && role === 'client' ? <Component /> : <Redirect to="/" />)}
            />
        )
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

// const test = (auth, role, Component) => {
//     if (auth && role === 'client') {
//         return (<Component />)
//     } else {
//         <Redirect to="/" />
//     }
// }


// const ViewRoute = ({ path, component: Component, role, auth, ...rest }) => (
//     <Route
//         {...rest}
//         render={() => (auth && role === 'client' ? <Component /> : <Redirect to="/" />)}
//     />
// )

export default Routes
