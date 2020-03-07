import React from 'react';
import { Link } from 'react-router-dom';
import { showError } from '../utils/notify';=

export default function MainMenu() {

    const TITLE = [['B', 'O', 'G', 'G', 'L', 'E']];
    return (
        <div className="game-container main-menu">
            <div className="null-container">

            </div>
            <div className="board-container">
                < div className="board" id="board" style={{ width: "600px" }}>
                    {
                        TITLE.map((row) => {
                            const blockRow = row.map((col) => {
                                return <span className={'block-title'}
                                    onClick={() => {
                                        showError('Click play to start')
                                    }}
                                > {col}</span>
                            })
                            return <>{blockRow}</>
                        })
                    }
                </div>
                <h2 className="subtitle">The Game</h2>
                <ul>
                    <li><Link to="/game">PLAY</Link></li>
                    <li><Link to='/how-to-play'>HOW TO PLAY</Link></li>
                </ul>
            </div>
            <div className="null-container">

            </div>
        </div>
    )
}