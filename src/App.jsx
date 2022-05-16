import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home.tsx";
import AlarmList from "./AlarmList.tsx";
import { useState } from "react";
import { TimeContext } from "./TimeContext.js";
function App() {
  const [alarms, setAlarms] = useState([]);
  return (
    <Router>
      <TimeContext.Provider value={{ alarms, setAlarms }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/alarms" element={<AlarmList />}></Route>
        </Routes>
      </TimeContext.Provider>
    </Router>
  );
}

export default App;
