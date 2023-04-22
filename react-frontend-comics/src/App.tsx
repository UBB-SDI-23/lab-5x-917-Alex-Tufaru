import { useState } from "react";
import "./App.css";
import { ShowAllComics } from "./components/comics/ComicsShowAll";
import React from "react";

function App() {
  const [count, setCount] = useState(0);

  return <ShowAllComics />;
}

export default App;
