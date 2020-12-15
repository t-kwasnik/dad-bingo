import React from "react";
import Square from './Square.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class BingoBoard extends React.Component {

  
  
  render() {
      if (this.props.dadisms !== undefined){
        if (this.props.dadisms.length > 0){
        return (
          <div>
          <Row>
          <Col><span className="title_row">B</span></Col>
          <Col><span className="title_row">I</span></Col>
          <Col><span className="title_row">N</span></Col>
          <Col><span className="title_row">G</span></Col>
          <Col><span className="title_row">O</span></Col>
          </Row>
          <Row>

          {this.props.dadisms.slice(0,5).map( (dadism,idx) => {
            return <Col id={"square_" + idx} ><Square dadism={dadism} active_dadisms={this.props.active_dadisms} game_id={this.props.game_id}/></Col> })}
          </Row>
          
          <Row>
          {this.props.dadisms.slice(5,10).map( (dadism,idx) => {
            return <Col id={"square_" + idx} className="square_col"><Square dadism={dadism} active_dadisms={this.props.active_dadisms} game_id={this.props.game_id}/></Col> })}
          </Row>
        
          <Row>
          {this.props.dadisms.slice(10,15).map( (dadism,idx) => {
            return <Col id={"square_" + idx} className="square_col"><Square dadism={dadism} active_dadisms={this.props.active_dadisms}  game_id={this.props.game_id}/></Col> })}
          </Row>
        
          <Row>
          {this.props.dadisms.slice(15,20).map( (dadism,idx) => {
            return <Col id={"square_" + idx} className="square_col"><Square dadism={dadism} active_dadisms={this.props.active_dadisms} game_id={this.props.game_id}/></Col> })}
          </Row>
        
          <Row>
          {this.props.dadisms.slice(20,25).map( (dadism,idx) => {
            return <Col id={"square_" + idx}className="square_col"><Square dadism={dadism} active_dadisms={this.props.active_dadisms} game_id={this.props.game_id}/></Col> })}
          </Row>
          </div>
            )
      }}
        return null
      
    
  }  
};

export default BingoBoard;