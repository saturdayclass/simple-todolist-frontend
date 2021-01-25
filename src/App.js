import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
