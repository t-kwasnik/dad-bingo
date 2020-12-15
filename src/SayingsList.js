import React from "react";
import Table from 'react-bootstrap/Table';

class SayingsList extends React.Component {

  
  sayings = this.props.sayings
  
  render() {
      return (
        <div>
        <div style={{overflow:'scroll', height:'150px', width:"90%"}} >
        <Table striped bordered hover size="sm" className="w-100 table table-responsive">
        <thead>
        </thead>
        <tbody>
        {this.props.sayings.map( (saying,idx) => {
          return <tr><td><small>{saying}</small></td></tr> })}
        </tbody>
        </Table>
        </div>
        </div>
          )
  }  
};

export default SayingsList;

