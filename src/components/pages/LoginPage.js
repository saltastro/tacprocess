import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoginForm from '../forms/LoginForm'
import { login } from '../../actions'

class LoginPage extends  React.Component{

	submit = data =>
	  this.props.login(data).then(() =>{
	    if (this.props.user.user.isAuthenticated) {
	      this.props.history.push('/')
	    }
	  }
	  );

	render(){
	  const { user } = this.props
	  return(
	    <div>
	      {(!!user.error && !user.isAuthenticated) && <div className='massage'>
	        <h1>Fail to login</h1>
	        <span style={ {color: 'red'} }>{user.error}</span>
	      </div>}
	      <LoginForm submit={ this.submit } />
	    </div>
	  )
	}
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(store => ({
  user: store.user
}), { login })(LoginPage)
