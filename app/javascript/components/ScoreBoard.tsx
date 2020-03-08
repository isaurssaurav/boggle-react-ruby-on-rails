import React from 'react';
import { IScore } from '../scenes/Game';

interface IScoreBoardProps {
    scores: Array<IScore>;
}
export default class ScoreBoard extends React.PureComponent<IScoreBoardProps>{
    render() {
        const { scores } = this.props;
        let totalScore: number = 0;
        return (<div className="scorediv">
            <h2>Score</h2>
            <ul>
                {
                    scores.length > 0 && scores.map((score: IScore, idx: number) => {
                        totalScore += score.score
                        return <li key={`score-${idx}`}><span>{score.word}</span> <span> {score.score}</span></li>
                    })
                }
                <li className="total-score">{totalScore}</li>
            </ul></div>)
    }
}
