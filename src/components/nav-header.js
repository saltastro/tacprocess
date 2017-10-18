import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

export const NavHeader = ({user}) => (
        <div className="ui huge top attached fluid secondary menu">
            <h1 className="header large"
                style={{ marginTop: '10px' }}>
                SALT TAC Pages
            </h1>
            <NavLink className="item"
                     to="/about">
                About
            </NavLink>
            {user /*&& user.partner*/ ? (
                    <NavLink className="item"
                             to="/statistics">
                        Statistics
                    </NavLink>
            ) : (null)}
            <div className="right menu">
                {user ? (
                        <Link className="item"
                              to="/logout">
                            Logout
                        </Link>
                ) : (
                        <Link className="item"
                              to="/login">
                            Login
                        </Link>
                )}
            </div>
        </div>
);

const mapStateToProps = (state) => (
        {
            user: state.user ? state.user.user : null
        }
);

export default withRouter(connect(mapStateToProps)(NavHeader));
