import React from "react";

import SayingsList from './SayingsList';
import ActionsList from './ActionsList';
import Leaderboard from './Leaderboard';
import PlayerStatus from './PlayerStatus';
import BingoBoard from './BingoBoard.js'


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import { DadBingoNavBar, NewSayingModal } from './NavBar'
import _ from "underscore";


class UserHome extends React.Component {

  componentWillMount(props){
    this.setState({user_id:1,
                          sayings: [],
                          actions: [],
                          current_boards: {1:{dadisms:[]}},
                          user_wins: [],
                          active_dadisms: [],
                          showSayings: false,
                          showActions: false,
                          addSaying: '',
                          addAction: '',
                          game_loaded: false
                        });
  }

  componentDidMount(){
    const url = 'https://dadbingo.herokuapp.com/game/' + this.props.match.params.user_id
        const requestOptions = {
          method: 'GET',
      };
        fetch( url ,requestOptions) 
              .then(response => response.json())
              .then((response) =>{
                var active_dadisms = response.active_dadisms
                active_dadisms.push("FreeSpace")
                var sayings = []
                var actions = []
                var user_id = this.props.match.params.user_id
                var game_id = response.game_id
                this.setState({game_loaded: game_id===undefined})
                _(response.dadisms).each(function(dadism, i){
                  if (dadism.type === 'saying'){
                    sayings.push(dadism.content)
                  } 
                  if (dadism.type === 'action'){
                    actions.push(dadism.content)
                  }
                });
                var other_current_boards = []
                var current_board = ''
                _(response.user_boards).each(function(user_board){
                  let newBoard = []
                  let player_id = user_board.user_id
                  _(user_board.board).each(function(square_id, idx){
                    
                    if (idx===12) {
                      newBoard.push({'_id':"FreeSpace",'content':"Free Space.. we know, nothing is 'free'..."})
                    }
                    let dadism = _.find(response.dadisms, 
                            function (dadism) { 
                                return dadism._id=== square_id; 
                            }); 
                    newBoard.push(dadism)
                  })
                  let user_name = _.where(response.players, {user_id: player_id})[0].name
                  if (user_id==user_board.user_id) {
                    current_board = {user_name: user_name, board: newBoard}
                  } else {
                    other_current_boards.push({user_name: user_name, board: newBoard})  
                  }
                  
                })
                var user_name = _.where(response.players, {user_id: user_id})[0].name
                var board_resets = _.where(response.player_resets, {user_id: user_id})[0].resets
                var leaderboard = response.leaderboard
                var players = response.players
                this.setState({
                          board_resets: board_resets,
                          user_name: user_name,
                          user_id: user_id,
                          game_id: game_id,
                          sayings: sayings,
                          actions: actions,
                          other_current_boards: other_current_boards,
                          current_board: current_board,
                          active_dadisms: active_dadisms,
                          leaderboard: leaderboard,
                          players: players
                        })
              })
  }

  handleOnSubmitSaying(e) {
      e.preventDefault();
      const url = 'https://dadbingo.herokuapp.com/dadisms';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: this.state.addSaying, type: "saying" })
      };
      fetch( url ,requestOptions) 
            .then(response => this.setState({showSayings: false}))
            .catch((error) => {
              this.setState({showSayings: false})
            })
    } 

  handleOnSubmitAction(e) {
      e.preventDefault();
      const url = 'https://dadbingo.herokuapp.com/dadisms';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: this.state.addAction, type: "action" })
      };
      
      fetch( url ,requestOptions) 
            .then(response => this.setState({showActions: false}))
            .catch((error) => {
              this.setState({showActions: false})
            })
    } 

  handleCloseSayings(){
    this.setState({showSayings: false})
  }
  handleShowSayings(){
    this.setState({showSayings: true})
  }

  handleAddSaying(event){
    
    this.setState({addSaying: event.target.value})
  }

  handleCloseActions(){
    this.setState({showActions: false})
  }
  handleShowActions(){
    this.setState({showActions: true})
  }

  handleAddAction(event){
    this.setState({addAction: event.target.value})
  }

  render() {
    return (
          <div className="dadBingoContainer">
          <DadBingoNavBar logged_in={true} user_id={this.state.user_id} user_name={this.state.user_name} board_resets={this.state.board_resets}/>
          <Container fluid>
          <Row>
            <Col  xs={3} className="border-right">
            <div >
              <Row>
              <span><br/></span>
              </Row>
              <Row>
              <Col>
              <h4 className="app_title_font">Leaderboard</h4>
              </Col>
              </Row>
              <Row>
              <Col>
              <Leaderboard user_wins= {this.state.leaderboard}/>
              </Col>
              </Row>
              <Row>
              <span><br/></span>
              </Row>
              <Row>
              <Col>
              <h4 className="app_title_font no_new_line">Do As I Say</h4>
              <span>&nbsp;&nbsp;&nbsp;</span><FontAwesomeIcon icon={faPlusSquare} onClick={this.handleShowSayings.bind(this)}/>
              <div id="new_saying_form">
                <Modal show={this.state.showSayings} onHide={this.handleCloseSayings.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form >
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>What else did he say?</Form.Label>
                    <Form.Control type="saying" placeholder=""  onChange={this.handleAddSaying.bind(this)}/>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={this.handleOnSubmitSaying.bind(this)}>
                    Submit
                  </Button>
                </Form>
                </Modal.Body>
                </Modal>
              </div>
              <SayingsList sayings= {this.state.sayings}/>
              </Col>
              </Row>
              <Row>
              <Col>
              <span><br/></span>
              <h4 className="app_title_font no_new_line">Do As I Do</h4>
              <span>&nbsp;&nbsp;&nbsp;</span><FontAwesomeIcon icon={faPlusSquare} onClick={this.handleShowActions.bind(this)}/>
              <div id="new_action_form">
                <Modal show={this.state.showActions} onHide={this.handleCloseActions.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form >
                  <Form.Group>
                    <Form.Label>What did he do now?</Form.Label>
                    <Form.Control type="action" placeholder=""  onChange={this.handleAddAction.bind(this)}/>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={this.handleOnSubmitAction.bind(this)}>
                    Submit
                  </Button>
                </Form>
                </Modal.Body>
                </Modal>
              </div>
              <ActionsList actions = {this.state.actions}/>
              </Col>
              </Row>
            </div>
            </Col>
            <Col xs={7} className="border-right">
            <div >
              <BingoBoard dadisms={this.state.current_board} 
                          active_dadisms={this.state.active_dadisms}  
                          game_id={this.state.game_id}/>
            </div>
            </Col>
            <Col xs={2}>
            <Row>
              <span><br/></span>
              </Row>
            <Row>
              <Col>
              <h4 className="app_title_font">Players</h4>
              </Col>
              </Row>
            <Row>
              <Col>
              <PlayerStatus active_dadisms={this.state.active_dadisms} 
                            other_current_boards={this.state.other_current_boards} 
                            user_={this.state.user_id}/>
              </Col>
              </Row>
            </Col>
          </Row>
          </Container>
          </div>
      )
  }
}
    
export default UserHome;