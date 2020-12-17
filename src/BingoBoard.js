import React from "react";
import Square from './Square.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class BingoBoard extends React.Component {

  
  
  render() {
      if (this.props.dadisms !== undefined){
        if (this.props.dadisms.board.length > 0){
        return (
          <div>
          <Row>
          <Col></Col>
          <Col md={2}><span className="title_row">B</span></Col>
          <Col md={2}><span className="title_row">I</span></Col>
          <Col md={2}><span className="title_row">N</span></Col>
          <Col md={2}><span className="title_row">G</span></Col>
          <Col md={2}><span className="title_row">O</span></Col>
          <Col></Col>
          </Row>
          <Row>
          <Col></Col>
          {this.props.dadisms.board.slice(0,5).map( (dadism,idx) => {
            return <Col md={2} id={"square_" + idx} ><Square dadism={dadism} active_dadisms={this.props.active_dadisms} game_id={this.props.game_id}/></Col> })}
          <Col></Col>
          </Row>
          
          <Row>
          <Col></Col>
          {this.props.dadisms.board.slice(5,10).map( (dadism,idx) => {
            return <Col md={2} id={"square_" + idx} className="square_col"><Square dadism={dadism} active_dadisms={this.props.active_dadisms} game_id={this.props.game_id}/></Col> })}
          <Col></Col>
          </Row>
        
          <Row>
          <Col></Col>
          {this.props.dadisms.board.slice(10,15).map( (dadism,idx) => {
            return <Col md={2} id={"square_" + idx} className="square_col"><Square dadism={dadism} active_dadisms={this.props.active_dadisms}  game_id={this.props.game_id}/></Col> })}
          <Col></Col>
          </Row>
        
          <Row>
          <Col></Col>
          {this.props.dadisms.board.slice(15,20).map( (dadism,idx) => {
            return <Col md={2} id={"square_" + idx} className="square_col"><Square dadism={dadism} active_dadisms={this.props.active_dadisms} game_id={this.props.game_id}/></Col> })}
          <Col></Col>
          </Row>
        
          <Row>
          <Col></Col>
          {this.props.dadisms.board.slice(20,25).map( (dadism,idx) => {
            return <Col md={2} id={"square_" + idx}className="square_col"><Square dadism={dadism} active_dadisms={this.props.active_dadisms} game_id={this.props.game_id}/></Col> })}
          <Col></Col>
          </Row>
          
          </div>
            )
      }}
        return null
      
    
  }  
};

export default BingoBoard;