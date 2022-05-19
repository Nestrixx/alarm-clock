import { TimeContext } from "../TimeContext.js";
import { useContext } from "react";
import { AlarmContext } from "../types/AlarmContext.js";

const AlarmList = () => {
  const { alarms }: AlarmContext = useContext(TimeContext);

  if (alarms.length > 0) {
    return (
      <ul>
        {alarms.map((alarm) => (
          <li key={alarm.name}>
            {alarm.name}
            {alarm.alarm}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default AlarmList;
