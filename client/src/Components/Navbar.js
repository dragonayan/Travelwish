import React from 'react'
import { Link } from 'react-router-dom'





const user = JSON.parse(localStorage.getItem('currentUser'))
const Navbar = () => {

  const  logout=()=> {
    localStorage.removeItem('currentUser')
    window.location.href = '/login'
  }
  return (

    <nav className="navbar navbar-expand-lg navbar-light ">

      <a className="navbar-brand" href="/">VINTAGE</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto ">
          {/* checking if user is looged in */}
          {/* if logged in then show user name */}
          {user ? (<>

            <div className="btn-group">
              <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                hi {user.name}
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="profile">Profile</a></li>
                <li><a className="dropdown-item" href="/login" onClick={logout}>Log out</a></li>

              </ul>
            </div>


          </>) : (<>
            {/* else show login and register button */}
            <li className="nav-item active">
              <a className="nav-link" href="/register">Register </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
          </>)}


        </ul>
      </div>
    </nav>

  )
}

export default Navbar
