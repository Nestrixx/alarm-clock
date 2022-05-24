import { TimeContext } from "../TimeContext.js";
import { useContext } from "react";
import { AlarmContext } from "../types/AlarmContext.js";
import "./AlarmList.scss";
import format from "date-fns/format";
const AlarmList = () => {
  const { alarms }: AlarmContext = useContext(TimeContext);
  if (alarms.length > 0) {
    return (
      <div className="total-list-wrapper">
        <ul className="ulist-wrapper">
          {alarms.map((alarm) => (
            <li key={alarm.name} id="alarm-list">
              {alarm.name} {format(new Date(alarm.alarm), "Pp")}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default AlarmList;
