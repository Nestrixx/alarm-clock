import BackgroundVideo from "./Assets/BackgroundVideo.mp4";
import WakeUp from "./WakeUp.mp4";
import { useState } from "react";
import { addMinutes, isWithinInterval } from "date-fns";
import { differenceInMinutes } from "date-fns";

const Home = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [alarmTime, setAlarmTime] = useState("");

  const updateTime = () => {
    const localeTime = new Date().toLocaleTimeString();

    setTime(localeTime);
  };

  const alarmClock = () => {
    if (time === "2:47:0") {
      return (
        <video autoPlay loop id="wakeUp">
          <source src={WakeUp} type="video/mp4" />
        </video>
      );
    }
    return (
      <video className="BGVideo" autoPlay muted loop id="backgroundVideo">
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
    );
  };

  const isAlarmTime = () => {
    //these two lines give us our current time date to check in the if statement
    const currentDate = new Date();
    //these three lines of code give us the end time of our alarm for the if statement
    const currentAlarmTime = new Date();
    const alarmTimeFullDate = new Date(
      currentAlarmTime.toDateString() + " " + alarmTime
    );
    const alarmEndTime = addMinutes(alarmTimeFullDate, 30);
    console.log(differenceInMinutes(alarmEndTime, currentDate));

    if (
      alarmTime !== "" &&
      isWithinInterval(currentDate, {
        start: alarmTimeFullDate,
        end: alarmEndTime,
      })
    ) {
      console.log("it is time");
      return (
        <video muted autoPlay loop id="wakeUp">
          <source src={WakeUp} type="video/mp4" />
        </video>
      );
    }
    return null;
  };

  const alarmInputHandler = () => {
    //these two lines give us our current time date to check in the if statement
    const currentTime = new Date();
    const currentTimeFullDate = new Date(
      currentTime.toDateString() + " " + time
    );

    //these three lines of code give us the end time of our alarm for the if statement
    const currentAlarmTime = new Date();
    const alarmTimeFullDate = new Date(
      currentAlarmTime.toDateString() + " " + alarmTime
    );
    const alarmEndTime = addMinutes(alarmTimeFullDate, 30);

    console.log(alarmTimeFullDate);
    console.log(currentAlarmTime);
    console.log(alarmEndTime);
  };

  setInterval(updateTime, 1000);
  return (
    <div className="App">
      {alarmClock()}
      {isAlarmTime()}
      <div className="time">{time}</div>
      <p>What Are The Words That Changed Your Life?</p>
      <label>
        Enter Alarm
        <input
          onChange={(e) => setAlarmTime(e.target.value)}
          type="time"
        ></input>
      </label>
      <button onClick={alarmInputHandler}>submit</button>
    </div>
  );
};

export default Home;
