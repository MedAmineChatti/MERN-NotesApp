import React from 'react'
import Header from './notes/Nav';
import Home from './notes/Home';
import CreateNotes from './notes/CreateNotes';
import EditeNotes from './notes/EditeNotes';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Fotter from './notes/Fotter';



export default function Notes({setIsLogin}) {
    return (
        <Router>
            <div className="notes-page">
                <Header setIsLogin={setIsLogin}/>
                <section>
                    <Route path="/" component={Home} exact/>
                    <Route path="/create" component={CreateNotes} exact/>
                    <Route path="/edit/:id" component={EditeNotes} exact/>
                </section>
                <Fotter/>
            </div>   
        </Router>
    )
}
