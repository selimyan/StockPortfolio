import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => (
  <nav className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top justify-content-end'>
    <span className='navbar-text'> Welcome, {props.name} | </span>
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link to='/portfolio' className='nav-link'>Portfolio</Link>
      </li>
      <li className='nav-item'>
        <Link to='/transactions' className='nav-link'>Transactions</Link>
      </li>
      <li className='nav-item'>
        <Link to='#' className='nav-link' onClick={props.logout}>| Logout</Link>
      </li>
    </ul>
  </nav>
)

export default Navbar