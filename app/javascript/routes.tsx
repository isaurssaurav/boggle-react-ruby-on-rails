import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from './scenes/Game';
import MainMenu from './scenes/MainMenu';
import HowToPlay from './scenes/HowToPlay';


export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/game" exact component={Game} />
                <Route path="/" exact component={MainMenu} />
                <Route path="/how-to-play" exact component={HowToPlay} />

            </Switch>
        </Router>
    )
} 