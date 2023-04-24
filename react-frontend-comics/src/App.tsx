import React from "react";
import "./App.css";
import { ComicsShowAll } from "./components/comics/ComicsShowAll";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppMenu } from "./components/AppMenu";
import { AppHome } from "./components/AppHome";
import { ComicDetails } from "./components/comics/ComicDetails";
import { ComicDelete } from "./components/comics/ComicDelete";
import { ComicAdd } from "./components/comics/ComicAdd";
import { ComicEdit } from "./components/comics/ComicEdit";
import { ComicFilterChooseNumber } from "./components/comics/ComicFilterChooseNumber";
import { ComicFilter } from "./components/comics/ComicFilter";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AppMenu />
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/comics" element={<ComicsShowAll />} />
          <Route path="/comics/:comicId/details" element={<ComicDetails />} />
          <Route path="/comics/:comicId/edit" element={<ComicEdit />} />
          <Route path="/comics/:comicId/delete" element={<ComicDelete />} />
          <Route path="/comics/add" element={<ComicAdd />} />
          <Route
            path="/comics/filter/chooseNumber"
            element={<ComicFilterChooseNumber />}
          />
          <Route path="/comics/filter/:nr" element={<ComicFilter />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
