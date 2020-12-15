import React from "react";
import Table from 'react-bootstrap/Table';

class ActionsList extends React.Component {

  
  sayings = this.props.actions
  
  render() {
      return (
        <div>
        <div style={{overflow:'scroll', height:'150px', width:"90%"}} >
        <Table size="sm" striped bordered hover className="w-100 table table-responsive">
        <thead>
        </thead>
        <tbody>
        {this.props.actions.map( (action,idx) => {
          return <tr><td><small>{action}</small></td></tr> })}
        </tbody>
        </Table>
        </div>
        </div>
          )
  }  
};

export default ActionsList;