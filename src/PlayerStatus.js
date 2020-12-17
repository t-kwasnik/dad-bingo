import React from "react";
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SmallBingoBoard from "./SmallBingoBoard"
import _ from "underscore";

class PlayerStatus extends React.Component {
  constructor(props) {
        super(props);
        var boards = []
        this.state = {
            boards: boards,
        };
    }

   getBoards(){
      const user_name = this.props.user_name
      const boards = []
      const current_boards = this.props.other_current_boards
      const active_dadisms = this.props.active_dadisms
      _.each(current_boards, function (b) {            
              boards.push({board: b.board, user_name: b.user_name, active_dadisms: active_dadisms})
          })
      return boards
   }
  

  render() {
        return (
          <div>
          <Row>
          <Col>
          <div style={{overflow:'scroll', height:'500px', width:'90%'}} >
          {this.getBoards().map( x => 
              <div>
              <SmallBingoBoard user_board_info={x} />
              <span><br/></span>
              </div>
          )}
          
          </div>
          </Col>
          </Row>
          </div>
            )
      }
    } 
       
export default PlayerStatus;