import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Note from '../pages/note/note'
import Home from '../pages/home'
import Nav from '../layout/nav'

function App() {
    console.log(process.env)

    return (
        <div className="App">
            <div className="container is-fluid">
                <Nav />
                <Route exact path="/ttb_frontend/" component={Home} />
                <Route exact path="/ttb_frontend/note" component={Note} />
            </div>
        </div>
    )
}

export default App
