import React from "react";
import { Link } from "react-router-dom"

const Navigation = () => (
  <div>
    <ul className="nav">
      <li><a><Link to="/">Home</Link></a></li>
      <li><a><Link to="/tacreview">Tac Review</Link></a></li>
      <li><a><Link to="/Statistics">Statistics</Link></a></li>
      <li><a><Link to="/documentation">Documentation</Link></a></li>
      <li><a><Link to="/admin">Admin</Link></a></li>
    </ul>
  </div>

  )

export default Navigation;
