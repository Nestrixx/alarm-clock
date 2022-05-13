import { format } from "date-fns";
import { useContext } from "react";
import "./AlarmList.css";
import { TimeContext } from "./TimeContext.js";

const AlarmList = () => {
  const { alarms, setAlarms } = useContext(TimeContext);
  return (
    <div className="monica">
      <div className="time-button-wrapper">
        <div className="dateTime-input">
          <input type="datetime-local"></input>
        </div>
        <div className="alarms-submit-button">
          <button className="submit-button">Set Alarms</button>
        </div>
      </div>
    </div>
  );
};

export default AlarmList;
