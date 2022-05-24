import "./App.scss";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home.tsx";
import AlarmPage from "./AlarmPage/AlarmPage.tsx";
import { useState } from "react";
import { TimeContext } from "./TimeContext.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const savedAlarms = { ...window.localStorage };

const getDefaultAlarms = () => {
  const hasStoredAlarms = Object.values(savedAlarms).length > 0;

  if (hasStoredAlarms) {
    const localStorageAlarms = [];
    for (const alarmName in savedAlarms) {
      const [alarmDate, alarmIsReoccurring] = savedAlarms[alarmName].split(",");
      const alarm = {
        alarm: alarmDate,
        name: alarmName,
        isReoccurring: alarmIsReoccurring === "true",
      };
      localStorageAlarms.push(alarm);
    }
    return localStorageAlarms;
  }
  return [];
};

function App() {
  const [alarms, setAlarms] = useState(getDefaultAlarms());

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <TimeContext.Provider value={{ alarms, setAlarms }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/alarms" element={<AlarmPage />}></Route>
          </Routes>
        </TimeContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
