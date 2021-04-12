import './App.css';
import Login from './components/login/Login';
import Car from './components/owner/Car';
import Home from './components/home/Cards';
import View from './components/viewCar/ViewCar';
import Navbar from './components/dashboard/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={Login} />
          <Switch>
          <Route path="/dashboard" component={Navbar} />
          <Route path="/home" component={Home} />
          <Route path="/add" component={Car} />
          <Route path='/:id' component={View} />
        
          </Switch>
      </Router>
    </div>
  );
}

export default App;
