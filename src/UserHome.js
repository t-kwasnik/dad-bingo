import React from "react";

import SayingsList from './SayingsList';
import ActionsList from './ActionsList';
import Leaderboard from './Leaderboard';
import PlayerStatus from './PlayerStatus';
import BingoBoard from './BingoBoard.js'


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DadBingoNavBar } from './NavBar'
import _ from "underscore";


class UserHome extends React.Component {

  componentWillMount(props){
    this.setState({user_id:1,
                          sayings: [],
                          actions: [],
                          current_boards: {1:{dadisms:[]}},
                          user_wins: [],
                          active_dadisms: []
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
                let sayings = []
                let actions = []
                let user_id = this.props.match.params.user_id
                let game_id = response.game_id
                _(response.dadisms).each(function(dadism, i){
                  if (dadism.type === 'saying'){
                    sayings.push(dadism.content)
                  } 
                  if (dadism.type === 'action'){
                    actions.push(dadism.content)
                  }
                });
                var current_boards = {}
                _(response.user_boards).each(function(user_board){
                  current_boards[user_id] = []
                  _(user_board.board).each(function(square_id, idx){
                    if (idx===12) {
                      current_boards[user_id].push({'_id':"FreeSpace",'content':"Free Space.. we know, nothing is 'free'..."})
                    }
                    let dadism = _.find(response.dadisms, 
                            function (dadism) { 
                                return dadism._id=== square_id; 
                            }); 
                    current_boards[user_id].push(dadism)
                  })
                })
                var user_wins = [{'name':'Harrison Family', 'total_wins':2}]
                var leaderboard = response.leaderboard
                
                this.setState({user_id: user_id,
                          game_id: game_id,
                          sayings: sayings,
                          actions: actions,
                          current_boards: current_boards,
                          user_wins: user_wins,
                          active_dadisms: active_dadisms,
                          leaderboard: leaderboard
                        })
              })
  }

  render() {
    return (
          <div className="dadBingoContainer">
          <DadBingoNavBar logged_in={true}/>
          <Container fluid>
          <Row>
            <Col  xs={2}>
            <div className="border-right">
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
              <Col>
              <h4 className="app_title_font">Do As I Say</h4>
              <SayingsList sayings= {this.state.sayings}/>
              </Col>
              </Row>
              <Row>
              <Col>
              <span><br/></span>
              <h4 className="app_title_font">Do As I Do</h4>
              <ActionsList actions = {this.state.actions}/>
              </Col>
              </Row>
            </div>
            </Col>
            <Col xs={8}>
            <div className="border-right">
              <BingoBoard dadisms={this.state.current_boards[this.state.user_id]} active_dadisms={this.state.active_dadisms}  game_id={this.state.game_id}/>
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
              <PlayerStatus stats={[]}/>
              </Col>
              </Row>
            </Col>
          </Row>
          </Container>
          </div>
      );
  }
}
    
export default UserHome;