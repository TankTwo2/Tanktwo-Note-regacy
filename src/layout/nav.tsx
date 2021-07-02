import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="navbar is-transparent">
            <div className="navbar-brand">
                <div
                    className="navbar-burger"
                    data-target="navbarExampleTransparentExample"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/ttb_frontend">
                        Home
                    </Link>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link">Docs</div>
                        <div className="navbar-dropdown is-boxed">
                            <Link
                                className="navbar-item"
                                to="/ttb_frontend/about"
                            >
                                About
                            </Link>
                            <a
                                className="navbar-item"
                                href="https://bulma.io/documentation/overview/modifiers/"
                            >
                                Modifiers
                            </a>
                            <a
                                className="navbar-item"
                                href="https://bulma.io/documentation/columns/basics/"
                            >
                                Columns
                            </a>
                            <a
                                className="navbar-item"
                                href="https://bulma.io/documentation/layout/container/"
                            >
                                Layout
                            </a>
                            <a
                                className="navbar-item"
                                href="https://bulma.io/documentation/form/general/"
                            >
                                Form
                            </a>
                            <hr className="navbar-divider" />
                            <a
                                className="navbar-item"
                                href="https://bulma.io/documentation/elements/box/"
                            >
                                Elements
                            </a>
                            <a
                                className="navbar-item is-active"
                                href="https://bulma.io/documentation/components/breadcrumb/"
                            >
                                Components
                            </a>
                        </div>
                    </div>
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
