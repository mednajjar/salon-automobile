import './App.css';
import Routes from './components/Routes';
import Navbar from './components/dashboard/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { ifLoged } from './redux/slices/authSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ifLoged())
  }, [dispatch])
  return (
    <Router>
      <Navbar />
       <Routes />
    </Router>
  );
}

export default App;
