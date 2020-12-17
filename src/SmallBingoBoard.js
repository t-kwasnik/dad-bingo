import React from "react";
import SmallSquare from './SmallSquare'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SmallBingoBoard extends React.Component {
    
  render() {
        if (this.props.user_board_info.board.length > 0) {
          return (
            <div>
            <small><b>{this.props.user_board_info.user_name}</b></small>
            <Col >
            
            <Row>
            
            {this.props.user_board_info.board.slice(0,5).map( (dadism,idx) => {
              return <Col id={"small_square_" + idx} className="small_square"><SmallSquare dadism={dadism} active_dadisms={this.props.user_board_info.active_dadisms} game_id={this.props.game_id}/></Col> })}
            
            </Row>
            
            <Row>
            
            {this.props.user_board_info.board.slice(5,10).map( (dadism,idx) => {
              return <Col id={"small_square_" + idx} className="small_square"><SmallSquare dadism={dadism} active_dadisms={this.props.user_board_info.active_dadisms} game_id={this.props.game_id}/></Col> })}
            
            </Row>
          
            <Row>
            
            {this.props.user_board_info.board.slice(10,15).map( (dadism,idx) => {
              return <Col id={"small_square_" + idx} className="small_square"><SmallSquare dadism={dadism} active_dadisms={this.props.user_board_info.active_dadisms}  game_id={this.props.game_id}/></Col> })}
            
            </Row>
          
            <Row>
            
            {this.props.user_board_info.board.slice(15,20).map( (dadism,idx) => {
              return <Col id={"small_square_" + idx} className="small_square"><SmallSquare dadism={dadism} active_dadisms={this.props.user_board_info.active_dadisms} game_id={this.props.game_id}/></Col> })}
            
            </Row>
          
            <Row>
            
            {this.props.user_board_info.board.slice(20,25).map( (dadism,idx) => {
              return <Col id={"small_square_" + idx}className="small_square"><SmallSquare dadism={dadism} active_dadisms={this.props.user_board_info.active_dadisms} game_id={this.props.game_id}/></Col> })}
            
            </Row>
            
            
            </Col >
            </div>
              )
          } else {
            return (<div></div>)
          }
      
      
    
  }  
};

export default SmallBingoBoard;