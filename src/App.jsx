import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home.tsx";
import AlarmList from "./AlarmList.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/alarms" element={<AlarmList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
