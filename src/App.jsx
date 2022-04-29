import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Alarm from "./Alarm";
import Home from "./Home.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/alarm" element={<Alarm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
