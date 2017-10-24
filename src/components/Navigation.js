import React from "react";
import { Link } from "react-router-dom"

const Navigation = () => (
  <div>
    <ul className="nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/tacreview">Tac Review</Link></li>
      <li><Link to="/Statistics">Statistics</Link></li>
      <li><Link to="/documentation">Documentation</Link></li>
      <li className="active"><Link to="/admin">Admin</Link></li>
    </ul>
  </div>

  )

export default Navigation;
