import BackgroundVideo from "./assets/BackgroundVideo.mp4";
import CherryBG from "./assets/CherryBG.mp4";
import ShoreBG from "./assets/ShoreBG.mp4";
import SpaceCowboyBG from "./assets/SpaceCowboyBG.mp4";
import JapaneseLake from "./assets/JapaneseLake.mp4";
import RamenStall from "./assets/RamenStall.mp4";
// import Ocean from "./assets/Ocean.webm";
// import aurora from "./assets/aurora.mp4";
// import WaterSceneAzuma from "./assets/WaterSceneAzuma.mp4";
// import LakeHouse from "./assets/LakeHouse.mp4";
import { useState, useEffect, useContext } from "react";
import { addMinutes, isWithinInterval } from "date-fns";
import "./Home.css";
import { Link } from "react-router-dom";
import { TimeContext } from "./TimeContext.js";
import { AlarmContext } from "./types/AlarmContext";

const Home = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const { alarms }: AlarmContext = useContext(TimeContext);

  const backgroundVideos = [
    BackgroundVideo,
    CherryBG,
    ShoreBG,
    SpaceCowboyBG,
    JapaneseLake,
    RamenStall,
    // Ocean,
    // aurora,
    // WaterSceneAzuma,
    // LakeHouse,
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
    const alarmTimeDate = new Date(alarms[0].alarm);
    const alarmEndTime = addMinutes(alarmTimeDate, 30);

    const currentDate = new Date();

    if (
      alarms[0].alarm !== "" &&
      isWithinInterval(currentDate, {
        start: alarmTimeDate,
        end: alarmEndTime,
      })
    ) {
      return (
        // future lesson to use useRef to remove logo from youtube video cause yt sucks ass
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
      {alarms.length !== 0 ? isAlarmTime() : null}
      <div className="time">{time}</div>
      <p>Tell Me, What Are The Words That Changed Your Life?</p>
      <Link to="/alarms" className="alarmsLink">
        Enter Alarms
      </Link>
    </div>
  );
};

export default Home;
