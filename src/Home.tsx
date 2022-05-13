import BackgroundVideo from "./assets/BackgroundVideo.mp4";
import CherryBG from "./assets/CherryBG.mp4";
import ShoreBG from "./assets/ShoreBG.mp4";
import SpaceCowboyBG from "./assets/SpaceCowboyBG.mp4";
import JapaneseLake from "./assets/JapaneseLake.mp4";
import RamenStall from "./assets/RamenStall.mp4";
import Ocean from "./assets/Ocean.webm";
import aurora from "./assets/aurora.mp4";
import WaterSceneAzuma from "./assets/WaterSceneAzuma.mp4";
import LakeHouse from "./assets/LakeHouse.mp4";
import { useState, useEffect } from "react";
import { addMinutes, isWithinInterval, format } from "date-fns";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [alarmTime, setAlarmTime] = useState("");
  const [pendingAlarmTime, setPendingAlarmTime] = useState("");

  const backgroundVideos = [
    BackgroundVideo,
    CherryBG,
    ShoreBG,
    SpaceCowboyBG,
    JapaneseLake,
    RamenStall,
    Ocean,
    aurora,
    WaterSceneAzuma,
    LakeHouse,
  ];

  const getRandomRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getBackgroundVideo = () => {
    const randomExcludedIndex = (
      min: number,
      max: number,
      excluded: number
    ) => {
      let n = getRandomRange(min, max);
      if (n >= excluded) n++;
      return n;
    };

    const currentVideoIndex = backgroundVideos.findIndex(
      (backgroundVideo) => backgroundVideo === backgroundSource
    );

    return backgroundVideos[
      randomExcludedIndex(0, backgroundVideos.length - 1, currentVideoIndex)
    ];
  };

  const [backgroundSource, setBackgroundSource] = useState(
    backgroundVideos[getRandomRange(0, backgroundVideos.length - 1)]
  );

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

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <video
        key={backgroundSource}
        className="BGVideo"
        autoPlay
        muted
        id="backgroundVideo"
        onEnded={() => {
          setBackgroundSource(getBackgroundVideo());
        }}
      >
        <source src={backgroundSource} type="video/mp4" />
      </video>
      {isAlarmTime()}
      <div className="time">{time}</div>
      <p>Tell Me, What Are The Words That Changed Your Life?</p>
      <Link to="/alarms" className="alarmsLink">
        Enter Alarms
      </Link>
      <div className="alarmWrapper">
        <label>
          <input
            className="timeInput"
            onChange={(e) => setPendingAlarmTime(e.target.value)}
            type="datetime-local"
            min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
          />
        </label>
        <button
          className="submit-button"
          onClick={() => setAlarmTime(pendingAlarmTime)}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default Home;
