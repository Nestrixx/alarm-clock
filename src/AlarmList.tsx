import { format } from "date-fns";
import { useContext, useState } from "react";
import "./AlarmList.css";
import { TimeContext } from "./TimeContext.js";
import { Link } from "react-router-dom";
import { Alarm, AlarmContext } from "./types/AlarmContext";

const AlarmList = () => {
  const [pendingAlarmTime, setPendingAlarmTime] = useState("");
  const { setAlarms }: AlarmContext = useContext(TimeContext);

const addAlarm = (alarm: Alarm) => {
setAlarms(oldAlarms => [...oldAlarms, alarm]);
};

  return (
    <div className="monica">
      <div className="time-button-wrapper">
        <div className="dateTime-input">
          <input
            className="timeInput"
            type="datetime-local"
            min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setPendingAlarmTime(e.target.value)}
          />
        </div>
        <div className="alarms-submit-button">
          <Link to="/">
            <button
              className="submit-button"
              onClick={() => addAlarm( {
                alarm: pendingAlarmTime,
                name: "brye test",
                isReoccurring: false
              })}
            >
              Set Alarms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlarmList;
