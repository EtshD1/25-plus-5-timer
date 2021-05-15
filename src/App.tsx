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
    <div className="App">

      <TimerComponent name="session" time={sessionTime} increment={incrementSession} decrement={decrementSession} />
      <TimerComponent name="break" time={breakTime} increment={incrementBreak} decrement={decrementBreak} />
      <div id='reset' onClick={reset}>
        Reset
      </div>

      <div>
        <div id="timer-label">
          {isBreak ? "Break" : "Session"}
        </div>
      </div>

      <div>
        <div id="time-left">
          {timeLeft()}
        </div>
        <div id='start_stop' onClick={toggleTimer}>
          {active ? "Stop" : "Start"}
        </div>
      </div>
      <audio ref={alarmAudio} id="beep" src="audio/alarm.mp3"></audio>
    </div>
  );
}

type timerComponentProps = {
  time: number,
  name: string,
  increment: Function,
  decrement: Function
}

const TimerComponent = ({ time, name, increment, decrement }: timerComponentProps) => {
  const dispatch = useDispatch();

  const incrementValue = () => dispatch(decrement());
  const decrementValue = () => dispatch(increment());

  return (<div>
    <div id={`${name}-label`}>
      {`${name[0].toLocaleUpperCase()}${name.slice(1)}`} Length:
      <div id={`${name}-length`}>
        {time / 60}
      </div>
    </div>
    <div id={`${name}-decrement`} onClick={incrementValue}>-</div>
    <div id={`${name}-increment`} onClick={decrementValue}>+</div>
  </div>
  );
}

export default App;
