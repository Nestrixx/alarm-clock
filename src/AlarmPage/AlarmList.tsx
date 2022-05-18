import { TimeContext } from "../TimeContext.js";
import { useContext } from "react";
import { AlarmContext } from "../types/AlarmContext.js";

const AlarmList = () => {
  const { alarms }: AlarmContext = useContext(TimeContext);

  return (
    <ul>
      <li>
        hi
        {/* needs logic go to render and not index a empty array */}
        {/* {alarms[0].alarm}
        {alarms[0].name} */}
      </li>
    </ul>
  );
};

export default AlarmList;
