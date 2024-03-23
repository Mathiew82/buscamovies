/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="logo"
            viewBox="0 0 949.4 173.39"
          >
            <path
              d="M189.78,139.42l26.53-86.55H260q7.41,0,10.6,4.1t1,10.87l-5.68,18q-1.46,4.74-7.2,7.46a49.76,49.76,0,0,1-11.22,3q1.87.52,4.57,1.39a13.8,13.8,0,0,1,4.3,1.85,12.31,12.31,0,0,1,3,3.58q.83,2-.42,5.26L253,127q-1.18,3.76-2.22,6.3a9.58,9.58,0,0,1-3.33,3.7,11.06,11.06,0,0,1-5.33,2.08,42.21,42.21,0,0,1-8.66.35ZM226.5,105l-5.4,17.29h7.48L234.12,105Zm10.6-34.75L231.83,87.5H239l5.54-17.29Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M344.65,53l-26.25,86.43H278.63q-10.74,0-13.09-4.1t0-12.14L286.39,53H312.3l-21.2,69.14h7.55L318.39,53Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M351.75,65.88a20.71,20.71,0,0,1,5.13-9.77Q360,52.93,368.51,53h30a27.41,27.41,0,0,1,8.59.87A7,7,0,0,1,410.7,57a6.24,6.24,0,0,1,.55,3.7q-.56,2.37-1.11,4.22l-3.88,13.93H381.33l2.49-8.67H375L370.1,87.5h33.6l-11.43,40.06q-1.8,6.24-4.85,9.13-3.6,2.72-11.71,2.72H346.2q-6.58,0-10.18-3.76-3.26-3.35-2.15-9L338,113.51h24.66L360,122.13h9.07l4.85-17.23h-33.6Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M402.28,129l19.54-65.68A30.27,30.27,0,0,1,424,58.53a6.59,6.59,0,0,1,2.42-3.18A8.37,8.37,0,0,1,431,53.62a54.37,54.37,0,0,1,7.69-.69h26.53q9.77,0,13.37,3.58,3.33,3.41,1,11l-5.89,20H448.21L453,70.27h-6.86L430.2,122.48h6.86L442.67,105h25.7l-7.62,24.11q-1.73,5.9-4.57,8.27-3,2.26-10,2.08H415.79q-5.2.17-8,0a10.25,10.25,0,0,1-4.92-1.39,3.9,3.9,0,0,1-1.46-3.24A19.66,19.66,0,0,1,402.28,129Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M467.85,139.42,490.92,64.6a25.92,25.92,0,0,1,5-8.73q2.91-3,11.78-3h27.64a40.92,40.92,0,0,1,8.24.64,8.36,8.36,0,0,1,4.71,2.37,9,9,0,0,1,1.18,5.67,46.71,46.71,0,0,1-2.29,8.67l-20.71,69.38H500.27L511.14,105H504l-10.25,34.57ZM510,87.5h6.3l5.13-17.29h-6.93Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M570.75,139.59,591.4,70.33h-8.73L562.3,139.59H537.36L562.65,53.1h73.22q9.14.12,13,3.7,3.39,3.53.55,13.53l-19.6,69.26H604.7l20.57-69.26h-9.35l-20.3,69.26Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M653.92,139.53q-6.23.17-8.8-3.06a7.79,7.79,0,0,1-1.39-7.8l19.33-62.84a21.16,21.16,0,0,1,5.47-9q4-3.76,10.74-3.87h29.65q6.44.12,10.18,3.87t1.73,10L703,126.29a22.27,22.27,0,0,1-5.75,10.18q-3.4,3.24-11,3.06Zm33.74-69.32-15.52,52h6.37l15.79-52Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M793.68,53l-25.91,86.43H717.61L737.08,53h24.38l-13,69.49L768.11,53Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M778.88,139.59l26-86.6h26l-26.26,86.6Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M813.62,139.53l26.46-86.72h50.22l-5.89,17.34H860.59l-5.06,17.29h23.55L874,104.9H850.13l-5.54,17.34h24.18l-5.06,17.29Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M895.12,65.88a20.72,20.72,0,0,1,5.13-9.77q3.12-3.18,11.64-3.06h30a27.41,27.41,0,0,1,8.59.87,7,7,0,0,1,3.6,3.06,6.24,6.24,0,0,1,.55,3.7q-.56,2.37-1.11,4.22l-3.88,13.93H924.7l2.49-8.67h-8.87L913.48,87.5h33.6l-11.43,40.06q-1.8,6.24-4.85,9.13-3.6,2.72-11.71,2.72H889.58q-6.58,0-10.18-3.76-3.26-3.35-2.15-9l4.09-13.18H906l-2.63,8.61h9.08l4.85-17.23h-33.6Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
            <path
              d="M176.29,170.3l-31.88-31.88a77.8,77.8,0,1,0-13.09,13.16l31.85,31.85a9.28,9.28,0,1,0,13.12-13.12ZM83.67,151.58a61,61,0,1,1,61-61A61,61,0,0,1,83.67,151.58Z"
              transform="translate(-5.3 -12.74)"
              fill="#5ec3ff"
            />
          </svg>
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
          <Link to={'/'} className="navbar-item">
            Principal
          </Link>
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
