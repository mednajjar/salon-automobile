import './App.css';
import Car from './components/owner/Car';
import Home from './components/home/Cards';
import View from './components/viewCar/ViewCar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={Car} />
          <Route path='/view/:id' component={View} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
