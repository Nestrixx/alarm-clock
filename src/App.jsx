import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Alarm from "./Alarm";

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
