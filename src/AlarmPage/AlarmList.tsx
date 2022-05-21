import { TimeContext } from "../TimeContext.js";
import { useContext } from "react";
import { AlarmContext } from "../types/AlarmContext.js";
import "./AlarmList.scss";

const AlarmList = () => {
  const { alarms }: AlarmContext = useContext(TimeContext);

  if (alarms.length > 0) {
    return (
      <ul className="list-wrapper">
        {alarms.map((alarm) => (
          <li key={alarm.name} id="alarm-list">
            {alarm.name}
            {' '}
            {alarm.alarm}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default AlarmList;
