import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { githubApi } from "./API/api";
import { getUserRepo } from "./API/requests";
import Search from "./components/Search";
import { useSelectorApp } from "./Redux/redux-store";
import { getUserRepoAction } from "./Redux/RepoReducer";
import Repositories from "./components/Repositories";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SearchRepo } from "./components/types";
import CurrentRepo from "./components/currentRepo";

function App() {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <div className="container">
        <h1>Лев Кочетков</h1>
        <HashRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <>
                  <Search setFocus={setFocus} />
                  {!window.localStorage.search&&<Repositories focus={focus} />}
                </>
              }
            />
            <Route path="/current-repo/:id" element={<CurrentRepo />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
