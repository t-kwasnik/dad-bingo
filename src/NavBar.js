import { useState } from 'react';
import {
  Link, 
  useHistory
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';

import fetch from 'cross-fetch' 

import griswold from "./griswold.jpeg";

function NavLoginOptions(props) {
  const loggedIn = props.loggedIn;
  if (loggedIn) {
    return (null)
  } else {
    return (
      <div>
      <Link to="/continue"><Nav.Link href="/continue">Continue</Nav.Link></Link>
      </div>
      )
  }
}

function NavNewUserOptions(props) {
  const loggedIn = props.loggedIn;
  if (loggedIn) {
    return (null)
  } else {
    return (
      <div>
      <Link to="/join"><Nav.Link href="/join" >Join</Nav.Link></Link>
      </div>
      )
  }
}

function DadBingoNavBar(props){
  const history = useHistory();
  const logged_in = props.logged_in;
  const _id = props._id;
  const user_id = props.user_id;
  const user_name = props.user_name;
  const board_resets = props.board_resets;

  function getDropdown(){
      if (logged_in===true) {
        return (
        <Nav >
          <NavDropdown id={"alignRight"} title={user_name} id="nav-dropdown">
          
          <NavDropdown.Item    href="" onClick={getNewBoard}>
            New Board <Badge variant="info">{5 - board_resets}</Badge>
          </NavDropdown.Item>
          
          </NavDropdown></Nav>)
      } else {
        return (<div></div>)
      }      
  }
            
  function getNewBoard(){
    const url = "https://dadbingo.herokuapp.com/newboard/" + user_id
    fetch( url ) 
      .then(response => window.location.reload(false))
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
  }

  return(
      <div id={_id}>
        <Navbar inverse  bg="dark" variant="dark" >
          <Navbar.Brand href="/main" className="app_title_font">DAD BINGO</Navbar.Brand>
          <Nav >
            <NavLoginOptions loggedIn={logged_in}/>
            <NavNewUserOptions loggedIn={logged_in}/>
          </Nav>
            {getDropdown()}
          
        </Navbar>
      </div>
  )
}

function LoginMenu(props) {
  
  const history = useHistory();
  const [show, setShow] = useState(false);
  
  const state = {}

  function handleNameChange(event) {
      state.name = event.target.value
    }

  function handlePasswordChange(event) {
      state.password = event.target.value
    }

  function onSubmit(e) {
      e.preventDefault();
      const url = 'https://dadbingo.herokuapp.com/login?password='+state.password+'&user_name='+state.name;
      fetch( url ) 
            .then(response => response.json())
            .then((jsonData) => {
              
              // jsonData is parsed json object received from url
              if (jsonData._id===undefined){
                history.push('/')
              } else {
                history.push('/home/' + jsonData._id)  
              }
            })
            .catch((error) => {
              // handle your errors here
              console.error(error)
            })
    } 
  const handleClose = () => history.push('/');
  const handleShow = () => setShow(true);

  return (     
    <div>
    <div>
    <div id="griswold">
    <img  src={griswold} alt="griswold"  />    
    </div>
    <div id="login_form">
      <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder=""  onChange={handleNameChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={handlePasswordChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onSubmit}>
          Continue Game
        </Button>
      </Form>
      </Modal.Body>
      </Modal>
    </div>
    
    
    </div>

    <DadBingoNavBar logged_in={false} _id={"DadBingoNavBarMainPage"}/>
    
    </div>
  )
}


function JoinMenu(props) {
  
  const history = useHistory();
  const [show, setShow] = useState(false);
  const state = {}

  function handleNameChange(event) {
      state.name = event.target.value
    }

  function handlePasswordChange(event) {
      state.password = event.target.value
    }

  function onSubmit(e) {
      e.preventDefault();
      const url = 'https://dadbingo.herokuapp.com/user';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: state.name, password: state.password })
    };
      fetch( url ,requestOptions) 
            .then(response => response.json())
            .then((jsonData) => {
              // jsonData is parsed json object received from url
              if (jsonData._id===undefined){
                history.push('/')
              } else {
                history.push('/home/' + jsonData._id);
              }
              
            })
            .catch((error) => {
              
              // handle your errors here
              console.error(error)
            })
    } 
  const handleClose = () => history.push('/');
  const handleShow = () => setShow(true);

  return (     
    <div>
    <div id="griswold">
    <img  src={griswold} alt="griswold"  />
    </div>
    <DadBingoNavBar logged_in={false} _id={"DadBingoNavBarMainPage"}/>
    <div id="login_form">
      <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder=""  onChange={handleNameChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={handlePasswordChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onSubmit}>
          Join the Game
        </Button>
      </Form>
      </Modal.Body>
      </Modal>
      </div>
    </div>
  )
}

export {DadBingoNavBar, JoinMenu, LoginMenu};
