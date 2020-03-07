import React from 'react';
import { compareTwoArray } from '../utils/helper';


interface ITimerProps {
    board: any;
    canBeVisitedCubes: any;
    historyPositions: any;
    isMouseInsideBoard: any;
    isFirstMove: any;
    handleClick: any
}

function Board(props: ITimerProps) {
    let { board, canBeVisitedCubes, historyPositions, isMouseInsideBoard, isFirstMove, handleClick } = props;
    return (
        board.map((row, r) => {
            const blockRow = row.map((col, c) => {
                return <span className={`${compareTwoArray(historyPositions, [r, c]).contains ? 'block green-color' : 'block'}
            ${ compareTwoArray(canBeVisitedCubes, [r, c]).contains && isMouseInsideBoard ? 'can' : ''}`}
                    onClick={() => {
                        if (isFirstMove ||
                            compareTwoArray(canBeVisitedCubes, [r, c]).contains ||
                            compareTwoArray(historyPositions, [r, c]).contains
                        ) {
                            handleClick(r, c)
                        }
                    }}
                > {col}</span>
            })
            return <>{blockRow}</>
        })
    )
}

export default Board;