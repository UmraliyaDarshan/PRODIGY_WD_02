import React, { useState, useRef, useEffect } from 'react';
import '../assets/Stopwatch.css'
const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(2);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    setStartTime(Date.now() - currentTime);
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTime);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setCurrentTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    const newLap = formatTime(currentTime);
    setLaps([...laps, newLap]);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="stopwatch">
      <div className="display">
        <h1>{formatTime(currentTime)}</h1>
        <div className="controls">
          {!isRunning ? (
            <button className="btn btn-success m-3" onClick={startTimer}>Start</button>
          ) : (
            <>
              <button className="btn btn-danger m-3" onClick={stopTimer}>Stop</button>
              <button className="btn btn-secondary m-3" onClick={recordLap}>Lap</button>
            </> 
          )}
          <button className="btn btn-primary m-3" onClick={resetTimer}>Reset</button>
        </div>
      </div>
      <div className="lap-times">
        <h2>Lap Times</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
