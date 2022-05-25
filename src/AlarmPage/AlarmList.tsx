import { TimeContext } from "../TimeContext.js";
import { useContext } from "react";
import { AlarmContext } from "../types/AlarmContext.js";
import "./AlarmList.scss";
import format from "date-fns/format";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const AlarmList = () => {
  const { alarms, setAlarms }: AlarmContext = useContext(TimeContext);
  const deleteButtonHandler = (alarmIndex: number, alarmName: string) => {
    window.localStorage.removeItem(alarmName);
    setAlarms((oldAlarms) => {
      const newAlarms = oldAlarms.filter((alarm, index) => {
        console.log(alarm.name);
        return index !== alarmIndex;
      });
      return newAlarms;
    });
  };

  if (alarms.length === 0) {
    return null;
  }

  return (
    <div className="total-list-wrapper">
      <ul className="ulist-wrapper">
        {alarms.map((alarm, index) => (
          <li key={alarm.name} className="alarm-list">
            <div>
              {alarm.name} {format(new Date(alarm.alarm), "Pp")}
              <IconButton
                onClick={() => deleteButtonHandler(index, alarm.name)}
                aria-label="delete"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlarmList;
