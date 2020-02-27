//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [lionScore, setLionScore] = useState(0);
  const [tigerScore, setTigerScore] = useState(0);
  const [timer, setTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [quarter, setQuarter] = useState(1);
  const [down, setDown] = useState(1);
  const [ballOn, setBallOn] = useState(50);
  const [toGo, setToGo] = useState(10);

  const enterBallOn = () => {
    let given = prompt("Enter Ball On"); 
    while (given > 50 || given < 1 || given % 1 !== 0) {
      given = prompt('Please enter a whole number 1 - 50');
    }
    setBallOn(given);
  }

 const enterToGo = () => {
    let givenToGo = prompt('Enter To Go');
    while (givenToGo === '') {
      givenToGo = prompt('Enter To Go');
    }
    if (givenToGo <= 0) {
      givenToGo = 10;
      enterBallOn();
      setDown(1);
    }
    setToGo(givenToGo);
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds === 0 && minutes > 0 && timer) {
        setMinutes(minutes - 1)
        setSeconds(59);
      } else if (seconds > 0 && timer) {
        setSeconds(seconds - 1);
      } else if (minutes === 0 && seconds === 0 && timer) {
        setQuarter(quarter + 1);
        setMinutes(15);
        setTimer(false);
      }
    }, 1000)
    return () => clearInterval(myInterval);
    }, [seconds, minutes, timer, quarter])

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Home</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{lionScore}</div>
          </div>
          <div className="timer">{ minutes }:{seconds < 10 ? `0${seconds}` : seconds}</div>
          <div className="away">
            <h2 className="away__name">Away</h2>
            <div className="away__score">{tigerScore}</div>
          </div>
        </div>
        <div className="bottomRow">
          <div className="down">
            <h3 className="down__title">Down</h3>
            <div className="down__value">{ down }</div>
          </div>
          <div className="toGo">
            <h3 className="toGo__title">To Go</h3>
            <div className="toGo__value">{ toGo }</div>
          </div>
          <div className="ballOn">
            <h3 className="ballOn__title">Ball on</h3>
            <div className="ballOn__value">{ ballOn }</div>
          </div>
          <div className="quarter">
            <h3 className="quarter__title">Quarter</h3>
            <div className="quarter__value">{ quarter }</div>
          </div>
        </div>
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button onClick={() => { setLionScore(lionScore + 7)}} className="homeButtons__touchdown">Home Touchdown</button>
          <button onClick={() => { setLionScore(lionScore + 3)}} className="homeButtons__fieldGoal">Home Field Goal</button>
          <button onClick={() => { setLionScore(lionScore - lionScore)}} className="reset__button">Reset Home</button>
        </div>
        <div className="homeButtons">
          <button onClick={() => { setDown(down === 3 ? 1 : down + 1); setTimer(false); enterToGo(); enterBallOn(); }} className="reset__button">Add Down</button>
          <button onClick={() => { setDown(1); setTimer(false); enterBallOn(); }} className="reset__button">Reset Down</button>
        </div>
        <div className="homeButtons">
          <button onClick={() => { setTimer(timer === false ? true : false) }} className="reset__button">Start/Stop</button>
          <button onClick={() => { setQuarter(1); setTimer(false); }} className="reset__button">Reset Quarter</button>
        </div>
        <div className="awayButtons">
          <button onClick={() => { setTigerScore(tigerScore + 7)}} className="awayButtons__touchdown">Away Touchdown</button>
          <button onClick={() => { setTigerScore(tigerScore + 3)}} className="awayButtons__fieldGoal">Away Field Goal</button>
          <button onClick={() => { setTigerScore(tigerScore - tigerScore)}} className="reset__button">Reset Away</button>
        </div>
      </section>
    </div>
    
  );
}

export default App;
