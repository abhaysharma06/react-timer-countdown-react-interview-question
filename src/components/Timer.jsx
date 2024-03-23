import React, { useState, useEffect } from "react";

const Timer = ({ date }) => {
  const [time, setTime] = useState(null);

  function formatDate(date) {
    let dateObj = date;
    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;

    function showRemaining() {
      var now = new Date();
      var distance = dateObj - now;
      if (distance < 0) {
        setTime("Expired");
        return;
      } else {
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
        setTime(
          `${days == 0 ? "" : days + "d"} ${hours == 0 ? "" : hours + "h"} ${
            minutes == 0 ? "" : minutes + "m"
          } ${seconds}s`
        );
      }
    }

    return setInterval(showRemaining, 1000);
  }
  useEffect(() => {
    const interval = formatDate(date);
    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return <div className="timer">{time}</div>;
};

export default Timer;
