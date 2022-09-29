import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import {Home} from './components/Home/Home.jsx'
import Detail from './components/Detail/Detail.jsx'
import ActivityCreate from './components/ActivityCreate/ActivityCreate.jsx'
import NavBar from './components/NavBar/NavBar.jsx'

/* Switch de mas especifica a menos especifica */

function App() {
  return (
   <BrowserRouter>
   <div className="App">
    <NavBar />
    <Switch> 
    <Route exact path='/' component = {LandingPage} />
    <Route exact path = '/countries' component = {Home} />
    <Route path = '/countries/:id' component = {Detail} />
    <Route path = '/activity' component = {ActivityCreate} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
