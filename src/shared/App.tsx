import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import About from '../pages/about'
import Home from '../pages/home'
import Nav from '../layout/nav'


function App() {

    return (
        <div className="App">
            <Nav/>
            <Route exact path="/ttb_frontend/" component={Home}/>
            <Route exact path="/ttb_frontend/about" component={About}/>
        </div>
    )
}

export default App
