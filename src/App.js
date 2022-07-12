import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/users/:userId" component={User}/>
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
