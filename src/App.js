import HomePage from './Components/HomePage/HomePage';
import { Switch, Route } from "react-router-dom"
import MyNavbar from './Components/MyNavbar/MyNavbar';
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


function App() {

  return (
    <div className="App">
      <MyNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </div>
  );
}

export default App;
