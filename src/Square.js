import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { faToggleOn } from '@fortawesome/free-solid-svg-icons'



class Square extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            active_big_box: false,
        };
    }

  handleDoubleClick(){
    const currentState = this.state.active_big_box;
    this.setState({ active_big_box: !currentState });

  }

  handleClick(){	
	if (this.props.active_dadisms.includes(this.props.dadism._id)===false) {
		const url = 'https://dadbingo.herokuapp.com/activate_dadism/'+ this.props.game_id + '/' + this.props.dadism._id;
	      const requestOptions = {
	        method: 'PUT',
	        headers: { 'Content-Type': 'application/json' }
	    };
	      fetch( url ,requestOptions) 
	            .then(response => response.json())
	} else {
		const url = 'https://dadbingo.herokuapp.com/deactivate_dadism/'+ this.props.game_id + '/' + this.props.dadism._id;
	    const requestOptions = {
	        method: 'PUT',
	        headers: { 'Content-Type': 'application/json' }
	    };
	      fetch( url ,requestOptions) 
	            .then(response => response.json())
	}

    window.location.reload(false);
  }

  render() {
      return (
        <div className={this.props.active_dadisms.includes(this.props.dadism._id) ? 'active_square': 'inactive_square'}>
        <div className={this.state.active_big_box ? 'big_square': 'square'}  onDoubleClick = {this.handleDoubleClick.bind(this)} >
        {(this.props.dadism._id !== "FreeSpace") ? (
          <div className="square_check_box" onClick={this.handleClick.bind(this)}><FontAwesomeIcon icon={this.props.active_dadisms.includes(this.props.dadism._id)===false ? faToggleOff: faToggleOn} /></div>
        ) : (<div></div>)}
          <div  className={this.state.active_big_box ? 'big_square_text': 'square_text'}>{this.props.dadism.content}</div>
        </div>
        </div>)
  }  
};

export default Square;