import './App.css';
import UserHome from './UserHome';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {
  LoginMenu,
  JoinMenu
} from "./NavBar";


function App() {
     return (
     <div className="DadBingo">
        <div>
          <Router>
          <Switch>
              <Route path="/login">
                <LoginMenu/>
              </Route>
              <Route path="/new">
                <JoinMenu/>
              </Route>
              
              <Route path="/home/:user_id" render={(props) => <UserHome {...props} /> } />
              <Route  path="/" >
              </Route>
            </Switch>
          </Router>
         </div>
        
      </div>
     )
  }  

export default App;
