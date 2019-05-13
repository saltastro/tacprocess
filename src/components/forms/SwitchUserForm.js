import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class SwitchUserForm extends React.Component {
  constructor() {
    super()

    this.state = {
      username: ''
    }
  }

	onUsernameChange = (e) => {
	  const{ target }= e
	  this.setState((state) => (
	    {
	      ...state,
	      username: target.value
	    }
	  ))
	};

	switchUser = (e) => {
	  e.preventDefault()
	  this.props.onSwitchUser(this.state.username)
	};

	render() {
	  return (
	    <div>
	      <input type='text'
					   value={ this.state.username }
					   onChange={ this.onUsernameChange }
					   placeholder='Username'/>
	      <Link to='/'><button onClick={ this.switchUser }>Switch User</button></Link>
	      {this.props.error && <span className='error'>{this.props.error}</span>}
	    </div>
	  )
	}
}

SwitchUserForm.defaultProps = {
  error: undefined
}

SwitchUserForm.propTypes = {
  onSwitchUser: PropTypes.func.isRequired,
  error: PropTypes.string
}
