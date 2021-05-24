import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLogout } from '../../redux/slices/authSlice';


const Navbar = () => {
    const history = useHistory()
    const { role } = useSelector(state => state.authentification)
    // console.log(role)
    const dispatch = useDispatch()
    const logout = async () => {
        dispatch(getLogout())
        history.push('/')
    }

    return (
        <>
            {
                role && (

                    <nav className="navbar navbar-expand-lg navbar-light bg-primary text-white">
                        <div className="container">
                            <Link to="" className="navbar-brand text-white">Tomorrow Cars</Link>
                            <button className="navbar-toggler bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon "></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav col-6">
                                    {
                                        role === 'client' && (
                                            <li className="nav-item">
                                                <Link to="/home" className="nav-link active text-white" aria-current="page" >Home</Link>
                                            </li>

                                        )
                                    }
                                    {
                                        role === 'owner' && (
                                            <>
                                                <li className="nav-item">
                                                    <Link to="/car/add" className="nav-link active text-white" aria-current="page" >Add</Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link to="/cars" className="nav-link active text-white" aria-current="page" >Cars</Link>
                                                </li>
                                            </>

                                        )
                                    }
                                </ul>
                                <ul className="navbar-nav col-6 justify-content-end ">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link" onClick={logout}>
                                            <button className="btn btn-warning">

                                                Logout
                                            </button>
                                        </Link>
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
