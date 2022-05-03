import BackgroundVideo from "./assets/BackgroundVideo.mp4";
import CherryBG from "./assets/CherryBG.mp4";
import ShoreBG from "./assets/ShoreBG.mp4";
import VinlandBG from "./assets/VinlandBG.mp4";
import SpaceCowboyBG from "./assets/SpaceCowboyBG.mp4";
import JapaneseLake from "./assets/JapaneseLake.mp4";
import RamenStall from "./assets/RamenStall.mp4";
import { useState } from "react";
import { addMinutes, isWithinInterval } from "date-fns";
import { differenceInMinutes } from "date-fns";
import "./Home.css";

const Home = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [alarmTime, setAlarmTime] = useState("");

  const backgroundVideos = [
    BackgroundVideo,
    CherryBG,
    ShoreBG,
    VinlandBG,
    SpaceCowboyBG,
    JapaneseLake,
    RamenStall,
  ];

  const updateTime = () => {
    const localeTime = new Date().toLocaleTimeString();

    setTime(localeTime);
  };

  // this needs to be deleted and moved to the return code.
  const alarmClock = () => {
    return (
      <video className="BGVideo" autoPlay muted loop id="backgroundVideo">
        <source
          src={
            backgroundVideos[
              Math.floor(Math.random() * backgroundVideos.length)
            ]
          }
          type="video/mp4"
        />
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
        <div>
          <iframe
            className="lofiVideo"
            src="https://www.youtube.com/embed/DWcJFNfaw9c?autoplay=1&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        // <video muted autoPlay loop id="wakeUp">
        //   <source src={WakeUp} type="video/mp4" />
        // </video>
      );
    }
    return null;
  };

  const alarmInputHandler = () => {
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
          className="timeInput"
          onChange={(e) => setAlarmTime(e.target.value)}
          type="time"
        ></input>
      </label>
      <button onClick={alarmInputHandler}>submit</button>
    </div>
  );
};

export default Home;
