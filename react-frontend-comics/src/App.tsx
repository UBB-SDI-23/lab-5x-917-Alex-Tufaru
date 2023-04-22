import React from "react";
import "./App.css";
import { ComicsShowAll } from "./components/comics/ComicsShowAll";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/comics" element={<ComicsShowAll />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
