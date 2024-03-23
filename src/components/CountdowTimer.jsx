import React, { useState, useEffect } from "react";
import "../style/Countdown.css";

export const Countdown = () => {
  const [inputState, setInput] = useState(false);
  const [second, setSecond] = useState("00");
  const [minutes, setMinute] = useState("00");
  const [hours, setHours] = useState("00");
  const [days, setDays] = useState("00");
  const [timerInterval, setTimerInterval] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    if (!isRunning) {
      const sec = parseInt(second);
      const min = parseInt(minutes);
      const hrs = parseInt(hours);
      const d = parseInt(days);
      const totalMilliseconds =
        sec * 1000 +
        min * 60 * 1000 +
        hrs * 60 * 60 * 1000 +
        d * 24 * 60 * 60 * 1000;
      const endDate = new Date(Date.now() + totalMilliseconds);
      const interval = setInterval(() => {
        const now = new Date();
        const distance = endDate - now;
        if (distance < 0) {
          clearInterval(interval);
          setSecond("00");
          setMinute("00");
          setHours("00");
          setDays("00");
          setInput(false);
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setDays(formatTime(days));
          setHours(formatTime(hours));
          setMinute(formatTime(minutes));
          setSecond(formatTime(seconds));
        }
      }, 1000);
      setTimerInterval(interval);
      setIsRunning(true);
    } else {
      clearInterval(timerInterval);
      setIsRunning(false);
    }
  };

  const formatTime = (time) => {
    return time < 10 ? "0" + time : time;
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setSecond("00");
    setMinute("00");
    setHours("00");
    setDays("00");
    setInput(false);
    setIsRunning(false);
  };

  return (
    <div style={{ marginTop: "4rem" }}>
      <div
        style={{ display: "flex", gap: "4px", alignItems: "center" }}
        onClick={() => setInput(true)}
      >
        <div>
          {inputState ? (
            <input
              style={{
                background: "transparent",
                border: "none",
                textAlign: "center",
                width: "32px",
                fontSize: "20px",
                fontWeight: "bold",
                outline: "none",
              }}
              value={days}
              onChange={(e) => {
                const value = e.target.value;
                setDays(value.substring(value.length - 2));
              }}
            />
          ) : (
            <h1>{days}</h1>
          )}
        </div>
        <p>:</p>
        <div>
          {inputState ? (
            <input
              style={{
                background: "transparent",
                border: "none",
                textAlign: "center",
                width: "32px",
                fontSize: "20px",
                fontWeight: "bold",
                outline: "none",
              }}
              value={hours}
              onChange={(e) => {
                const value = e.target.value;
                setHours(value.substring(value.length - 2));
              }}
            />
          ) : (
            <h1>{hours}</h1>
          )}
        </div>
        <p>:</p>
        <div>
          {inputState ? (
            <input
              style={{
                background: "transparent",
                border: "none",
                textAlign: "center",
                width: "32px",
                fontSize: "20px",
                fontWeight: "bold",
                outline: "none",
              }}
              value={minutes}
              onChange={(e) => {
                const value = e.target.value;
                setMinute(value.substring(value.length - 2));
              }}
            />
          ) : (
            <h1>{minutes}</h1>
          )}
        </div>
        <p>:</p>
        <div>
          {inputState ? (
            <input
              style={{
                background: "transparent",
                border: "none",
                textAlign: "center",
                width: "32px",
                fontSize: "20px",
                fontWeight: "bold",
                outline: "none",
              }}
              value={second}
              onChange={(e) => {
                const value = e.target.value;
                setSecond(value.substring(value.length - 2));
              }}
            />
          ) : (
            <h1>{second}</h1>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "2rem",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            padding: "10px",
            background: isRunning ? "red" : "green",
            border: "none",
          }}
          onClick={startTimer}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          style={{ padding: "10px", background: "lightblue", border: "none" }}
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
