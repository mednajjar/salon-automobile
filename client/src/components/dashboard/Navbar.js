import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import decode from 'jwt-decode';
import * as actionTypes from '../../actions/actionTypes'

const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {

        dispatch({ type: actionTypes.LOGOUT });
        history.push('/');
      };
    

      
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Tomorrow Cars</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav col-6">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/add" className="nav-link active" aria-current="page" >Add</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav col-6 justify-content-end ">     
                            <li className="nav-item">
                                <Link to="/" className="nav-link" onClick={logout}>Logout</Link>
                            </li>  
                        </ul>
                    </div>
                </div>
            </nav>
        
    )
}

export default Navbar
