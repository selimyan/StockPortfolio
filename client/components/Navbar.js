import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  <div>
    <Link to='/portfolio'>Portfolio</Link>
    <Link to='/transactions'>Transactions</Link>
    <Link to='#' onClick={props.logout}>Logout</Link>
  </div>
}

export default Navbar