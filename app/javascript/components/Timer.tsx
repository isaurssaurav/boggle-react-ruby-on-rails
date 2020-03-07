import React from 'react';
import { secondsToMs } from '../utils/helper'
interface ITimerProps {
    time: number
}
function Timer(props: ITimerProps) {
    let time = secondsToMs(props.time);
    let width = (1 / 120) * props.time * 100;
    return (
        <>
            <div className="timer" > <div className="time">{time.min} : {time.sec}</div>
                <div className="timer-loader" style={
                    {
                        width: width + "%",
                        background: width > 20 ? "#40c331" : "red"
                    }}>

                </div>
            </div>
        </>
    )
}

export default Timer;