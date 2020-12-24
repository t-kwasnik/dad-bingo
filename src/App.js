import './App.css';
import UserHome from './UserHome';
import MainScreen from './MainScreen';


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
              <Route path="/continue">
                <LoginMenu/>
              </Route>
              <Route path="/join">
                <JoinMenu/>
              </Route>
              
              <Route path="/home/:user_id" render={(props) => <UserHome {...props} /> } />
              <Route  path="/" >
                <MainScreen/>
              </Route>
            </Switch>
          </Router>
         </div>
        
      </div>
     )
  }  

export default App;
