import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import landingPage from './components/landingPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {landingPage}/>
        <Route path = '/home' component = {Home}/>
        <Route path = "/recipes" component = {RecipeCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
