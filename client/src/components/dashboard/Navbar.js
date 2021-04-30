import React from "react";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import {getLogout} from '../../redux/slices/authSlice';


const Navbar = () => {
    const history = useHistory()
    const {role} = useSelector(state => state.authentification)
    console.log(role)
    const dispatch = useDispatch()
    const logout = async (e) =>{
        e.preventDefault()
        dispatch(getLogout())
        history.push('/')
    }
      
    return (
        <>
        {
            role && (
                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Tomorrow Cars</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav col-6">
                            {
                                role === 'client' && (
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" aria-current="page" >Home</Link>
                            </li>

                                )
                            }
                            {
                                role === 'owner' && (
                                    <>
                            <li className="nav-item">
                                <Link to="/car/add" className="nav-link active" aria-current="page" >Add</Link>
                            </li>
                               
                            <li className="nav-item">
                                <Link to="/cars" className="nav-link active" aria-current="page" >Cars</Link>
                            </li>
                            </>

                                )
                            }
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
        
        </>
    )
}

export default Navbar
