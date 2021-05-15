import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './redux/reducers';
import { decrementBreak, decrementSession, incrementBreak, incrementSession, resetValue } from "./redux/actions";

const App = () => {

  const alarmAudio = useRef<HTMLAudioElement>(null);

  const dispatch = useDispatch();

  const breakTime = useSelector((state: RootState) => state.breakTime);
  const sessionTime = useSelector((state: RootState) => state.sessionTime);

  const [isBreak, setIsBreak] = useState(false);
  const [timer, setTimer] = useState(sessionTime);
  const [active, setActive] = useState(false);

  const reset = () => {
    dispatch(resetValue());
    alarmAudio.current?.pause();
    if (alarmAudio.current) {
      alarmAudio.current.currentTime = 0;
    }
    setActive(false);
    setIsBreak(false)
    setTimer(sessionTime);
  }

  const toggleTimer = () => setActive(ps => !ps);

  useEffect(() => {
    setTimer(sessionTime);
  }, [sessionTime, breakTime]);

  useEffect(() => {
    const timerProcess = () => {
      if (active) {
        if (timer === 1) {
          setTimeout(() => {
            if (isBreak) {
              setTimer(sessionTime);
            } else {
              setTimer(breakTime);
            }
            setIsBreak(ps => !ps);
            alarmAudio.current?.play();
          }, 1000);
        }
        setTimer((ps) => ps - 1);
      }
    };
    const timerInterval = setInterval(timerProcess, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, active, breakTime, isBreak, sessionTime]);

  const timeLeft = () => {
    return `${timer / 60 > 10 ? "" : 0}${Math.floor(timer / 60)}:${timer % 60 > 10 ? "" : 0}${timer % 60}`;
  }

  return (
    <div id="App" className={isBreak ? "breakTime" : ""}>

      <div>
        <div id="timer-label">
          {isBreak ? "Break" : "Session"}
        </div>
        <div id="time-left">
          {timeLeft()}
        </div>
      </div>

      <div className="controls">
        <TimerComponent active={active} name="session" time={sessionTime} increment={incrementSession} decrement={decrementSession} />
        <div className="actions">
          <div>
            <div id='start_stop' onClick={toggleTimer}>
              <img src={`./images/${active ? "Pause" : "Play"}.svg`} alt={active ? "Pause" : "Play"} />
            </div>
          </div>
          <div id='reset' onClick={reset}>
            <img src="./images/Reset.svg" alt={active ? "Pause" : "Play"} />
          </div>
        </div>
        <TimerComponent active={active} name="break" time={breakTime} increment={incrementBreak} decrement={decrementBreak} />
      </div>

      <div className="creator">
        Made by
        <h4><a href="https://github.com/EtshD1/25-plus-5-timer">EtshD1</a></h4>
      </div>
      <audio ref={alarmAudio} id="beep" src="audio/alarm.wav"></audio>
    </div>
  );
}

type timerComponentProps = {
  time: number,
  name: string,
  increment: Function,
  decrement: Function,
  active: boolean
}

const TimerComponent = ({ time, name, increment, decrement, active }: timerComponentProps) => {
  const dispatch = useDispatch();

  const incrementValue = () => dispatch(decrement());
  const decrementValue = () => dispatch(increment());

  return (<div className="timer-component">
    <div id={`${name}-label`}>
      {`${name[0].toLocaleUpperCase()}${name.slice(1)}`} Length
    </div>
    <div className="timer-details">
      <button id={`${name}-decrement`} onClick={incrementValue} className="edit-value" disabled={active}>-</button>
      <div id={`${name}-length`}>
        {time / 60}
      </div>
      <button id={`${name}-increment`} onClick={decrementValue} className="edit-value" disabled={active}>+</button>
    </div>
  </div>
  );
}

export default App;
