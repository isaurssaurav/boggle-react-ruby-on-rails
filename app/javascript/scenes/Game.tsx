import React, { useState, useEffect } from "react";
import { compareTwoArray, visitEveryPossibleDirectionFromPoint, ifArraysObjectKeyContains } from "../utils/helper";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
import { initializeBoard, rotateBoard, submitWord, initializeGame } from "../service/game";
import { showError, showSuccess } from "../utils/notify";
import Board from "../components/Board";
import { SUCCESS_MESSAGE } from '../constant'
import { useHistory, Link } from "react-router-dom";
import { useEventListener } from '../utils/hooks'

export interface IScore {
    word: string;
    score: number
}
export interface GameInfo {
    directions: Array<Array<number>>,
    time: number
}

const Home = () => {

    const routeHistory = useHistory();
    // Boggle game board state
    const [board, setBoard] = useState<Array<Array<string>>>(new Array(2));

    /**
    * 'canBeVisitedCubes', When user click a certain cube, cube that can be visited is calculated and stored in this state.
    * If cube's position are not in 'canBeVisitedCubes' user cannot click the cube
    **/
    const [canBeVisitedCubes, setCanBeVisitedCubes] = useState<Array<Array<number>>>([]);

    /**
     * All visitedCube's position are saved at 'historyPositions' state.
     * Also helps in time travel, go back to previous move/state of board.
     */
    const [historyPositions, setHistoryPositions] = useState<Array<Array<number>>>([]);

    /**
     * 'canBeVisitedCubes', empty at first so user cannot click any cube, so in order to avoid that, 'isFirstMove' is defined
     */
    const [isFirstMove, setIsFirstMove] = useState<boolean>(true);

    const [word, setWord] = useState<string>('');

    const [isMouseInsideBoard, setIsMouseInsideBoard] = useState<boolean>(false)

    const [scores, setScores] = useState<Array<IScore>>([]);


    /**
     * Directions and Time for game is called from backend 'initializeGame' API
     */
    const [gameInfo, setGameInfo] = useState<GameInfo>({
        directions: [[]],
        time: 0
    })

    const [time, setTime] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true)

    let timerInterval;


    useEffect(() => {

        (async () => {
            await _initializeBoard();
            await _initializeGame();
            await setLoading(false);

            let boardElement: HTMLElement | null = document.getElementById("board") ? document.getElementById("board") : null
            if (boardElement) {
                boardElement.addEventListener("mouseenter", function () {
                    setIsMouseInsideBoard(true);
                });
                boardElement.addEventListener("mouseleave", function () {
                    setIsMouseInsideBoard(false)
                });
            }
        })();

        // Return callback to run on un-mount.
        return () => {

            window.clearInterval(timerInterval);
        };
    }, [])


    function handleClick(row: number, col: number) {
        let newHistoryPositions: Array<Array<number>> = [...historyPositions];
        let possibleDirections;
        let wordFormed;

        setIsFirstMove(false);

        // If user click on selected cube, unselect the cube and all the moves before that cube
        if (compareTwoArray(historyPositions, [row, col]).contains) {
            let indexPositionInHistoryPositions = compareTwoArray(historyPositions, [row, col]).index;

            newHistoryPositions = [...historyPositions].slice(0, indexPositionInHistoryPositions);
            let lenOfHistoryPositions = newHistoryPositions.length

            if (lenOfHistoryPositions === 0) { _resetGameState(); return; }

            possibleDirections = visitEveryPossibleDirectionFromPoint(newHistoryPositions[lenOfHistoryPositions - 1][0], newHistoryPositions[lenOfHistoryPositions - 1][1], gameInfo.directions);
            wordFormed = word.split('').slice(0, indexPositionInHistoryPositions).join('');
        } else {
            // else just push word and position to state
            possibleDirections = visitEveryPossibleDirectionFromPoint(row, col, gameInfo.directions);
            newHistoryPositions.push([row, col]);
            wordFormed = word + board[row][col]
        }

        setCanBeVisitedCubes(possibleDirections);
        setHistoryPositions(newHistoryPositions); // save to state
        setWord(wordFormed)
    }
    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setWord(e.target.value);
        setIsFirstMove(true);
        setCanBeVisitedCubes([]);
        setHistoryPositions([]);
    }

    function _resetGameState() {
        setIsFirstMove(true);
        setCanBeVisitedCubes([]);
        setHistoryPositions([]);
        setWord('');
    }

    const _initializeBoard = async () => {
        try {
            let initializedBoard = await initializeBoard();
            setBoard(initializedBoard);
        } catch (e) {
            e.response && e.response.data && showError(e.response.data.message)
        }
    }
    const _rotateBoard = async () => {
        try {
            let rotatedBoard = await rotateBoard(board);
            setBoard(rotatedBoard);
            _resetGameState();
        } catch (e) {
            e.response && e.response.data && showError(e.response.data.message)
        }
    }
    async function _initializeGame() {
        try {
            let gameInfo = await initializeGame();
            setGameInfo(gameInfo);
            setTime(gameInfo.time);
            //start your game time
            timerInterval = window.setInterval(() => {
                setTime(time => time > 0 ? time - 1 : 0)
            }, 1000);
        } catch (e) {
            e.response && e.response.data && showError(e.response.data.message)
        }
    }

    const _exit = () => {
        if (confirm('Are you sure, you want to exit?')) {
            routeHistory.push('/')
        }
    }
    const _handleKeyup = (event) => {

        if (event.code === "Enter" || event.code === "NumpadEnter") {
            _handleSubmit()
        }
        if (event.code === "Escape") {
            _resetGameState()
        }



    }
    useEventListener('keydown', _handleKeyup);

    const _handleSubmit = async () => {

        if (word) {

            try {

                if (word.length >= 3) {
                    if (ifArraysObjectKeyContains(word, scores)) {
                        showError(`👻 ${word} is already scored`)
                        return
                    }
                    let submittedWord = await submitWord(board, word);
                    let newScore = [...scores]
                    newScore.push(submittedWord)
                    setScores(newScore);
                    showSuccess(SUCCESS_MESSAGE[Math.floor(Math.random() * SUCCESS_MESSAGE.length)])
                } else {
                    showError('👻 word too short')
                }
            } catch (e) {
                e.response && e.response.data && showError(e.response.data.message)
            } finally {
                _resetGameState()
            }
        }
    }

    if (loading) {
        return (<>LOADING...</>)
    }

    return (
        <>
            <div className="game-container">
                {
                    time > 0 ?
                        <>
                            <div className="null-container">
                                <div className="main-menu">
                                    <ul style={{ textAlign: "left", margin: "0", lineHeight: "normal" }}>
                                        <li><a onClick={_exit}>EXIT</a></li>
                                        <li style={{
                                            fontSize: "10px"
                                        }}><a >TIPS</a></li>
                                        <li style={{
                                            fontSize: "10px"
                                        }}><a >Press Enter to submit</a></li>
                                        <li style={{
                                            fontSize: "10px"
                                        }}><a >Press ESC to cancel selected word</a></li>
                                        <li style={{
                                            fontSize: "10px"
                                        }}><a >Click Rotate button 🔄 to rotate board</a></li>
                                        <li style={{
                                            fontSize: "10px"
                                        }}><a >Click the selected cube to unselect the cube</a></li>

                                    </ul>
                                </div>

                            </div>
                            <div className="board-container">
                                < div className="board" id="board">
                                    <Board
                                        board={board}
                                        canBeVisitedCubes={canBeVisitedCubes}
                                        historyPositions={historyPositions}
                                        isMouseInsideBoard={isMouseInsideBoard}
                                        isFirstMove={isFirstMove}
                                        handleClick={handleClick}

                                    />
                                </div>
                                <button onClick={_rotateBoard} className="rotate-button" title="Rotate Board">🔄</button>

                                <div className="submit-container">
                                    <input onChange={handleChangeInput} className="word-box" value={word} placeholder="WORD"></input>
                                </div>
                                <Timer
                                    time={time}
                                />
                            </div></> : ""
                }
                <div className="score-container">
                    <ScoreBoard
                        scores={scores}
                    />
                    {
                        time === 0 ? <div className="main-menu">
                            <ul>
                                <li> <Link to="/">GO TO MAIN MENU</Link></li>
                                <li><a href="javascript:void(0)" onClick={() => window.location.reload(false)} >PLAY AGAIN</a></li>
                            </ul>
                        </div> : ""
                    }
                </div>
            </div>
        </>
    )
}

export default Home;