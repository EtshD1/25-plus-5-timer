import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './redux/reducers';
import { decrementBreak, decrementSession, incrementBreak, incrementSession } from "./redux/actions";

const App = () => {

  const breakTime = useSelector((state: RootState) => state.breakTime);
  const sessionTime = useSelector((state: RootState) => state.sessionTime);

  const [isBreak, setIsBreak] = useState(false);

  const timeLeft = () => {
    if (isBreak) {
      return `${Math.floor(breakTime / 60)}:${breakTime % 60 > 10 ? "" : 0}${breakTime % 60}`;
    }
    return `${Math.floor(sessionTime / 60)}:${sessionTime % 60 > 10 ? "" : 0}${sessionTime % 60}`;
  }

  return (
    <div className="App">

      <TimerComponent name="session" time={sessionTime} increment={incrementSession} decrement={decrementSession} />
      <TimerComponent name="break" time={breakTime} increment={incrementBreak} decrement={decrementBreak} />

      <div>
        <div id="timer-label">
          {isBreak ? "Break" : "Session"}
        </div>
      </div>

      <div>
        <div id="time-left">
          {timeLeft()}
        </div>
      </div>
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

  return (<div>
    <div id={`${name}-label`}>
      {`${name[0].toLocaleUpperCase()}${name.slice(1)}`} Length:
      <div id={`${name}-length`}>
        {time / 60}
      </div>
    </div>
    <div id={"session-decrement"} onClick={() => dispatch(decrement())}>-</div>
    <div id={"session-increment"} onClick={() => dispatch(increment())}>+</div>
  </div>
  );
}

export default App;
