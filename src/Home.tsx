import BackgroundVideo from "./assets/BackgroundVideo.mp4";
import CherryBG from "./assets/CherryBG.mp4";
import ShoreBG from "./assets/ShoreBG.mp4";
import VinlandBG from "./assets/VinlandBG.mp4";
import SpaceCowboyBG from "./assets/SpaceCowboyBG.mp4";
import JapaneseLake from "./assets/JapaneseLake.mp4";
import RamenStall from "./assets/RamenStall.mp4";
import { useState } from "react";
import { addMinutes, isWithinInterval, format } from "date-fns";
import "./Home.css";

const Home = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [alarmTime, setAlarmTime] = useState("");
  const [pendingAlarmTime, setPendingAlarmTime] = useState("");

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

  const isAlarmTime = () => {
    const alarmTimeDate = new Date(alarmTime);
    const alarmEndTime = addMinutes(alarmTimeDate, 30);

    const currentDate = new Date();

    if (
      alarmTime !== "" &&
      isWithinInterval(currentDate, {
        start: alarmTimeDate,
        end: alarmEndTime,
      })
    ) {
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
      );
    }
    return null;
  };

  // const alarmInputHandler = () => {
  //   // this only is here cause the button has a onClick function call to it but if it didn't we wouldn't need this function
  // };

  setInterval(updateTime, 1000);
  return (
    <div className="App">
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
      {isAlarmTime()}
      <div className="time">{time}</div>
      <p>What Are The Words That Changed Your Life?</p>
      <label>
        Enter Alarm
        <input
          className="timeInput"
          onChange={(e) => setPendingAlarmTime(e.target.value)}
          type="datetime-local"
          min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
        ></input>
      </label>
      <button onClick={() => setAlarmTime(pendingAlarmTime)}>submit</button>
    </div>
  );
};

export default Home;
