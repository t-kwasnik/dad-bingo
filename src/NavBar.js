import {
  Link, 
  useHistory
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NavLoginOptions(props) {
  const loggedIn = props.loggedIn;
  if (loggedIn) {
    return (<div></div>)
  } else {
    return (
      <div>
      <Link to="/login"><Nav.Link href="/login">Login</Nav.Link></Link>
      </div>
      )
  }
}

function NavNewUserOptions(props) {
  const loggedIn = props.loggedIn;
  if (loggedIn) {
    return (<div></div>)
  } else {
    return (
      <div>
      <Link to="/new"><Nav.Link href="/new" >Join</Nav.Link></Link>
      </div>
      )
  }
}

function DadBingoNavBar(props){
  const logged_in = props.logged_in;
  return(
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/main" className="app_title_font">DAD BINGO</Navbar.Brand>
          <Nav className="mr-auto">
            <NavLoginOptions loggedIn={logged_in}/>
            <NavNewUserOptions loggedIn={logged_in}/>
            
          </Nav>
        </Navbar>
  )
}

function LoginMenu(props) {
  
  const history = useHistory();
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
  
  return (     
    <div>
    <DadBingoNavBar logged_in={false}/>
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
        Continue Game
      </Button>
    </Form>
    </div>
  )
}

function JoinMenu(props) {
  
  const history = useHistory();
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
                history.push('/home/' + jsonData._id)  
              }
              
            })
            .catch((error) => {
              
              // handle your errors here
              console.error(error)
            })
    } 
  
  return (     
    <div>
    <DadBingoNavBar logged_in={false}/>
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
    </div>
  )
}

export {DadBingoNavBar, JoinMenu, LoginMenu};
