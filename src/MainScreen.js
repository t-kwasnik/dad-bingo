import React from "react";
import griswold from "./griswold.jpeg";



import { DadBingoNavBar } from './NavBar'
import _ from "underscore";


class MainScreen extends React.Component {

  render() {
    return (
          <div className="dadBingoContainer">
          
          <div id="griswold">
          <img  src={griswold} alt="griswold"  />
          </div>
          <DadBingoNavBar logged_in={false} _id={"DadBingoNavBarMainPage"}/>
          </div>
      );
  }
}
    
export default MainScreen;