import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions/auth'

const HomePage = ({ isAuthenticated }) => (
  <div>

    {isAuthenticated ? (
      <div>
        <div className='homepage'>
          <h1>Welcome to SALT time allocation committee</h1>
        </div>
      </div>

    ) : (
      <div>
        <h1 style={ {textAlign: 'left'} }>Please Login</h1>
        <Link to='/login'> <button className='loginbtn'>Login</button> </Link>
      </div>

    )}
  </div>
)

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps() { /* state in params */
  return{
    isAuthenticated: !!localStorage.tacPageJWT
  }
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage)
