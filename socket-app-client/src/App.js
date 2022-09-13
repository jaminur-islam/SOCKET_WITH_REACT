import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
import { Create } from "./Create";

function App() {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const socket = io.connect("/");
    socket.on("msg", (msg) => {
      setMsg(msg);
    });
    console.log("hi useEffect");
  }, []);
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home msg={msg} />} />
            <Route path="/create" element={<Create msg={msg} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
