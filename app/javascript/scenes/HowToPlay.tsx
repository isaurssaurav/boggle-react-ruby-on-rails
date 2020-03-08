import React from 'react';
import { Link } from 'react-router-dom';


export default function HowToPlay() {

    return (
        <div className="game-container main-menu">
            <div className="null-container">

            </div>
            <div className="board-container">
                < div className="board description" id="board" style={{ width: "600px" }}>
                    <p>Select letter cube with <code>Mouse Click</code> to make the word and words are created by using adjoining letters - the letter must touch each other - and must be able to connect to each other in the proper sequence
                    to spell the word correctly</p>
                    <p>OR simply type the word on input box that you think is correct</p>
                    <p><code>PRESS ENTER- to submit word</code></p>
                </div>
                <ul>
                    <li><Link to="/">Go Back</Link></li>
                </ul>

            </div>
            <div className="null-container">

            </div>
        </div>
    )
}