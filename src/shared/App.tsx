import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import About from '../pages/post'
import Home from '../pages/home'
import Nav from '../layout/nav'

function App() {
    return (
        <div className="App">
            <div className="container">
                <Nav />
                <Route exact path="/ttb_frontend/" component={Home} />
                <Route exact path="/ttb_frontend/about" component={About} />
            </div>
        </div>
    )
}

export default App
