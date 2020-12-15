import React from "react";
import Table from 'react-bootstrap/Table';

class PlayerStatus extends React.Component {

  
  sayings = this.props.stats
  
  render() {
      return (
        <div>
        <div style={{overflow:'scroll', height:'100px', width:'90%'}} >
        <Table size="sm" striped bordered hover >
        <thead>
        </thead>
        <tbody>
        {this.props.stats.map( (user,idx) => {
          return <tr><td>{user.name}</td><td>{user.total_wins}</td></tr> })}
        </tbody>
        </Table>
        </div>
        </div>
          )
  }  
};

export default PlayerStatus;