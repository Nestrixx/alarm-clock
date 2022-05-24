import { format } from "date-fns";
import { useContext, useState } from "react";
import "./AlarmPage.scss";
import { TimeContext } from "../TimeContext.js";
import { Link } from "react-router-dom";
import { Alarm, AlarmContext } from "../types/AlarmContext";
import AlarmList from "./AlarmList.tsx";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const AlarmPage = () => {
  const [pendingAlarmTime, setPendingAlarmTime] = useState("");
  const [pendingAlarmName, setPendingAlarmName] = useState("");
  const [pendingIsRepeated, setPendingIsRepeated] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setAlarms }: AlarmContext = useContext(TimeContext);

  const addAlarm = (alarm: Alarm) => {
    setAlarms((oldAlarms) => [...oldAlarms, alarm]);
  };

  const submitButtonHandler = () => {
    const hasExceededMaxCharacterLength = pendingAlarmName.length > 26;
    if (
      pendingAlarmName !== "" &&
      pendingAlarmTime !== "" &&
      !hasExceededMaxCharacterLength
    ) {
      window.localStorage.setItem(
        pendingAlarmName,
        `${pendingAlarmTime},${pendingIsRepeated}`
      );
      addAlarm({
        alarm: pendingAlarmTime,
        name: pendingAlarmName,
        isReoccurring: pendingIsRepeated,
      });

      return;
    }
    setShowError(true);
  };

  return (
    <div className="alarm-page-wrapper">
      <div className="monica">
        <div className="time-button-wrapper">
          <div className="alarmName-input">
            <input
              maxLength={26}
              type="text"
              placeholder="Enter Alarm Name"
              onChange={(e) => setPendingAlarmName(e.target.value)}
            ></input>
          </div>
          <div className="dateTime-input">
            <input
              required
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
            <button className="submit-button" onClick={submitButtonHandler}>
              Set Alarms
            </button>
            <Link to="/">
              <button className="home-page-button">home page</button>
            </Link>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <AlarmList />
      <Dialog
        open={showError}
        onClose={() => setShowError(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Empty Alarm Time/Alarm Date
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please Enter a Value for Alarm Name and Alarm Time.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlarmPage;
