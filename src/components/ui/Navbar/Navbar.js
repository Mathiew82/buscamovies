/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

function Navbar() {
  const [isActive, setIsActive] = useState(false)

  return (
    <nav
      className="navbar is-fullwidth"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to={'/'} className="navbar-item pl0">
          <img src="./logo.png" alt="BuscaMovies App" class="logo" />
        </Link>

        <a
          onClick={() => {
            setIsActive(!isActive)
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
      >
        <div className="navbar-start">
          <Link to={'/populares'} className="navbar-item">
            Populares
          </Link>
          <Link to={'/favoritos'} className="navbar-item">
            Favoritos
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
