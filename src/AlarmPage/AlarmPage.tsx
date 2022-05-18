import { format } from "date-fns";
import { useContext, useState } from "react";
import "./AlarmPage.scss";
import { TimeContext } from "../TimeContext.js";
import { Link } from "react-router-dom";
import { Alarm, AlarmContext } from "../types/AlarmContext";
import AlarmList from "./AlarmList.tsx";

const AlarmPage = () => {
  const [pendingAlarmTime, setPendingAlarmTime] = useState("");
  const [pendingAlarmName, setPendingAlarmName] = useState("");
  const [pendingIsRepeated, setPendingIsRepeated] = useState(false);
  const { setAlarms }: AlarmContext = useContext(TimeContext);

  const addAlarm = (alarm: Alarm) => {
    setAlarms((oldAlarms) => [...oldAlarms, alarm]);
  };

  return (
    <div className="monica">
      <div className="time-button-wrapper">
        <div className="alarmName-input">
          <input
            type="text"
            placeholder="Enter Alarm Name"
            onChange={(e) => setPendingAlarmName(e.target.value)}
          ></input>
        </div>
        <div className="dateTime-input">
          <input
            className="timeInput"
            type="datetime-local"
            min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setPendingAlarmTime(e.target.value)}
          />
        </div>
        <div className="alarm-checkbox">
          <input
            type="checkbox"
            onChange={(e) => setPendingIsRepeated(e.target.checked)}
            id="repeat-checkbox"
          ></input>
          <label htmlFor="repeat-checkbox"> repeat this alarm?</label>
        </div>
        <div className="alarms-submit-button">
          {/* <Link to="/"> */}
          <button
            className="submit-button"
            onClick={() =>
              addAlarm({
                alarm: pendingAlarmTime,
                name: pendingAlarmName,
                isReoccurring: pendingIsRepeated,
              })
            }
          >
            Set Alarms
          </button>
          {/* </Link> */}
        </div>
      </div>
      <AlarmList />
    </div>
  );
};

export default AlarmPage;
