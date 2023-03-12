import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { githubApi } from "../API/api";
import { searchRepo } from "../API/requests";
import { useSelectorApp } from "../Redux/redux-store";
import { setCurrentPageAction, setSearchAction } from "../Redux/RepoReducer";
import Repo from "./Repo";
import { SearchRepo } from "./types";
import loading from "./image/2.gif";
import { Link, useNavigate } from "react-router-dom";

type SearchType = {
  setFocus: Function;
};

const Search: React.FC<SearchType> = ({ setFocus }) => {
  const { search, currentPage, pages } = useSelectorApp((state) => state.repo);
  const [repoList, setRepoList] = useState(Array<SearchRepo>);
  const [preload, setPreload] = useState(false);
  const dispatch = useDispatch();
  const [array, setArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const arr: any = [];
    let count = Number(window.location.hash.slice(2, 4));
    setPreload(true);
    githubApi.searchRepo(searchRepo(window.localStorage.search)).then((r) => {
      for (let i = 1; i <= r.length / 10; i++) {
        arr.push(i);
      }
      setArray(arr);
      setRepoList(
        r.filter((repo: SearchRepo, index: number) => {
          return index < count * 10 && index >= (count - 1) * 10;
        })
      );
      setPreload(false);
    });
  }, [search, currentPage]);

  const typeValue = (e: { currentTarget: { value: string } }) => {
    window.localStorage.setItem("search", e.currentTarget.value);
    dispatch(setSearchAction(e.currentTarget.value));
  };

  return (
    <>
      <input
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          if (search) {
            setFocus(true);
          } else {
            setFocus(false);
            setRepoList([]);
          }
          if (!window.localStorage.search) {
            navigate(`/${1}`);
          }
        }}
        placeholder="Search repository"
        type="text"
        name="repo"
        value={window.localStorage.search}
        onChange={typeValue}
      />

      <div className="header-block">
        <h2>Name</h2>
        <h2>GitHub Rating</h2>
        <h2>Last commit’s date</h2>
        <h2>GitHub Link</h2>
      </div>
      {preload && (
        <img
          style={{ width: "60px", margin: "20px auto" }}
          src={loading}
          alt=""
        />
      )}
      {repoList?.map((r, index) => {
        return (
          <Repo
            key={index}
            name={r.name}
            updatedAt={r.updatedAt}
            url={r.url}
            pushedAt={r.pushedAt}
            stargazerCount={r.stargazerCount}
            id={r.id}
            owner={r.owner}
          />
        );
      })}
      {window.localStorage.search && (
        <div className="paginator">
          {array?.map((i: number) => {
            return (
              <Link
                style={
                  i === Number(window.location.hash.slice(2, 4))
                    ? {
                        color: "white",
                        fontWeight: "bold",
                        border: "1px solid white",
                        padding: "0 5px",
                        borderRadius: "5px",
                      }
                    : { color: "white" }
                }
                onClick={() => {
                  // pushRepo(i);
                  dispatch(setCurrentPageAction(i));
                }}
                key={i}
                to={`${i}`}
              >
                {i}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Search;
