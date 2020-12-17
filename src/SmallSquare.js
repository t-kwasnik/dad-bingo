import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { faToggleOn } from '@fortawesome/free-solid-svg-icons'



class SmallSquare extends React.Component {

  
  render() {
      return (
        <div className={this.props.active_dadisms.includes(this.props.dadism._id) ? 'active_small_square small_square': 'inactive_small_square small_square'}>          
          <div  className='small_square_text'></div>
        </div>)
  }  
};

export default SmallSquare;