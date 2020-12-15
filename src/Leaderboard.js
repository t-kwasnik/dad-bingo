import React from "react";
import Table from 'react-bootstrap/Table';

class Leaderboard extends React.Component {

  
  sayings = this.props.user_wins
  
  render() {
      if (this.props.user_wins !== undefined) {
        return (
          <div>
          <div style={{overflow:'scroll', height:'100px', width:'90%'}} >
          <Table size="sm" striped bordered hover >
          <thead>
          </thead>
          <tbody>
          {this.props.user_wins.map( (user,idx) => {
            return <tr><td>{user.name}</td><td>{user.wins}</td></tr> })}
          </tbody>
          </Table>
          </div>
          </div>
            )
        } else {
          return (<div></div>)
        }
  }  
};

export default Leaderboard;