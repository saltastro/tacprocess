import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavHeader = () => (
        <div className="ui huge top attached fluid secondary menu">
            <h1 className="header large"
                style={{ marginTop: '10px' }}>
                SALT TAC Pages
            </h1>
            <NavLink className="item"
                     to="/about">
                About
            </NavLink>
            <NavLink className="item"
                     to="/statistics">
                Statistics
            </NavLink>
            <div className="right menu">
                <Link className="item"
                      to="/login">
                    Login
                </Link>
            </div>
        </div>
);

export default NavHeader;
