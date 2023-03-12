import React, { useEffect, useState } from "react";
import { useSelectorApp } from "../Redux/redux-store";
import { SearchRepo } from "./types";
import { Link } from "react-router-dom";
import { githubApi } from "../API/api";
import { getUserRepo, searchRepo } from "../API/requests";
import { getUserRepoAction, setCurrentPageAction } from "../Redux/RepoReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Repo from "./Repo";

type RepositoriesType = {
  focus: boolean;
};

const Repositories: React.FC<RepositoriesType> = ({ focus }) => {
  const { repositories, pages, totalRepo } = useSelectorApp(
    (state) => state.repo
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash === "#/" || window.location.hash === "") {
      navigate(`/${1}`);
    }
  }, []);
  const dispatch = useDispatch();
  const arr = [];
  for (let i = 1; i <= pages; i++) {
    arr.push(i);
  }

  useEffect(() => {
    let count = Number(window.location.hash.slice(2, 4));
    if (count === 1) {
      githubApi.getAllRepo(getUserRepo("KLL00-1", 10)).then((r) => {
        dispatch(getUserRepoAction(r.nodes, r.totalCount));
      });
    } else {
      githubApi.getAllRepo(getUserRepo("KLL00-1", 10)).then((r) => {
        githubApi.getAllRepo(getUserRepo("KLL00-1", r.totalCount)).then((r) => {
          dispatch(
            getUserRepoAction(
              r.nodes.filter(
                (repo: SearchRepo, index: number) =>
                  index >= count * 10 - 10 && index < count * 10
              ),
              r.totalCount
            )
          );
        });
      });
    }
  }, [window.localStorage.token]);

  let pushRepo = (count: number) => {
    if (count === 1) {
      githubApi.getAllRepo(getUserRepo("KLL00-1", 10)).then((r) => {
        dispatch(getUserRepoAction(r.nodes, r.totalCount));
      });
    } else {
      githubApi.getAllRepo(getUserRepo("KLL00-1", totalRepo)).then((r) => {
        dispatch(
          getUserRepoAction(
            r.nodes.filter(
              (repo: SearchRepo, index: number) =>
                index >= count * 10 - 10 && index < count * 10
            ),
            r.totalCount
          )
        );
      });
    }
  };
  return (
    <>
      {!focus && (
        <>
          {repositories?.map((r: SearchRepo, index: number) => {
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
          <div className="paginator">
            {arr?.map((i: number) => {
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
                    pushRepo(i);
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
        </>
      )}
    </>
  );
};

export default Repositories;
