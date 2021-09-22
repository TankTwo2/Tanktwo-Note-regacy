import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="navbar">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/ttb_frontend">
                        Home
                    </Link>
                    <Link className="navbar-item" to="/ttb_frontend/note">
                        Note
                    </Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <a
                                    className="bd-navbar-icon navbar-item"
                                    href="https://github.com/TankTwo2/ttb_frontend"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span
                                        className="icon"
                                        // style={{ color: 'var(--github)' }}
                                    >
                                        <i className="fab fa-lg fa-github-alt" />
                                    </span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
