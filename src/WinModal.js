import React from "react";
import Modal from 'react-bootstrap/Modal';
import bingo_logo from './bingo.gif';




class WinModal extends React.Component {

  constructor(props) {
        super(props);
    }

  componentWillMount(props){
    this.setState({
                    show: true,
                  });
  }
  handleClose(){
    this.setState({show: false})
  }

  render() {
    if (this.props.isWinner===true){
      return (
        <div>
        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <img src={bingo_logo} alt="loading..." />
          <h3>Strong work, you won!</h3>
          <span><br/>Play again?</span>
          </Modal.Body>
          </Modal>
        </div>
        )
    } else if (this.props.isWinner===false) {
      return (
        <div>
        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h2>This an embarrassment...</h2><h1><b>{this.props.winnerName}</b> won.</h1>
          </Modal.Body>
          </Modal>
        </div>
        )
    } else {
      return (<div></div>)
    }
    
    }
  }  


export default WinModal;