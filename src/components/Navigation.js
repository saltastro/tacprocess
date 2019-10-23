import React from 'react'
import propTypes from 'prop-types'
import { NavLink, withRouter, Link } from 'react-router-dom' // TODO: use NavLink and make sure that NavLink work
import { connect } from 'react-redux'
import {
  STATISTICS_PAGE,
  DOCUMENTATION_PAGE,
  TECHNICAL_PAGE,
  TAC_PAGE,
  ADMIN_PAGE,
  PARTNER_STAT_PAGE,
  PAGE_NOT_FOUND
} from '../types'
import {canViewPage} from '../util'
import {loadedPage} from '../util/filters'
import Filters from './Filters'

class Navigation extends React.Component {

  render () {
    const { user, logout, location } = this.props
    const userRoles = user.roles
    const { isAuthenticated } = user
    if (loadedPage(location.pathname) === PAGE_NOT_FOUND) {
      return (
        <div style={ {textAlign:'center'} }>
          <h2 style={ {color: 'red'} }>Page does not Exist</h2><br/>
          <div id='emoticons'>
            <div className='emoti' data-emoti='sad'/>
          </div>
        </div>
      )
    }
    if( !canViewPage(userRoles, loadedPage(location.pathname) )) {
      return (
        <div  style={ {textAlign:'center'} }>
          <h2 style={ {color: 'red'} }>Not allowed to view this page</h2><br/>
          <div id='emoticons'>
            <div className='emoti' data-emoti='sad'/>
          </div>
          <br/>
          <button><Link to='/'>Go Home</Link></button>
        </div>
      )
    }

    return(
      <div>
        <div>
          <ul className='nav'>
            {
              isAuthenticated && <li><NavLink exact to='/'>HOME</NavLink></li>
            }
            {
              (canViewPage(userRoles, TECHNICAL_PAGE) && isAuthenticated) &&
              <li>
                <NavLink to='/techreview'>TECH REVIEW</NavLink>
              </li>
            }
            {
              (canViewPage(userRoles, TECHNICAL_PAGE) && isAuthenticated) &&
              <li>
                <NavLink to='/liaison'>PROPOSAL LIAISON</NavLink>
              </li>
            }
            {
              (canViewPage(userRoles, STATISTICS_PAGE) && isAuthenticated) &&
              <li>
                <NavLink to='/statistics'>STATISTICS</NavLink>
              </li>
            }
            {
              (canViewPage(userRoles, PARTNER_STAT_PAGE) && isAuthenticated) &&
              <li>
                <NavLink to='/partnerstat'>COMPLETION STATS</NavLink>
              </li>
            }
            {
              (canViewPage(userRoles, TAC_PAGE) && isAuthenticated) &&
              <li>
                <NavLink to='/timeallocation'>TIME ALLOCATION</NavLink>
              </li>
            }
            {
              (canViewPage(userRoles, DOCUMENTATION_PAGE) && isAuthenticated) &&
              <li>
                <NavLink to='/documentation'>DOCUMENTATION</NavLink>
              </li>
            }
            {
              (canViewPage(userRoles, ADMIN_PAGE) && isAuthenticated) &&
              <li>
                <NavLink to='/admin'>ADMIN</NavLink>
              </li>
            }
            {
              isAuthenticated && <li className='logoutbtn' onClick={ logout }>Logout</li>
            }
            {
              isAuthenticated && <li>Hello { user.firstName } { user.lastName }</li>
            }
          </ul>
          <ul className='bigNav'>
            <h1>{ loadedPage(location.pathname) }</h1>
          </ul>
        </div>
        {isAuthenticated && <Filters /> }
      </div>
    )
  }
}

Navigation.propTypes = {
  user: propTypes.object.isRequired,
  location: propTypes.object.isRequired,
  logout: propTypes.func.isRequired
}

export default withRouter(connect(
  store => ({
    user: store.user.user,
    filters: store.filters,
  }), null
)(Navigation))
