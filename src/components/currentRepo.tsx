import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { githubApi } from "../API/api";
import { currentRepo } from "../API/requests";
import { useSelectorApp } from "../Redux/redux-store";
import vector from "./image/Vector.png";

const CurrentRepo: React.FC = ({}) => {
  const { currentPage } = useSelectorApp((state) => state.repo);
  const [repo, setRepo] = useState({
    name: "",
    updatedAt: "",
    url: "",
    pushedAt: "",
    stargazerCount: 0,
    owner: { avatarUrl: "", login: "", url: "" },
    languages: { nodes: [{ name: "", color: "" }] },
    description: "",
  });
  //@ts-ignore
  window.repo = repo;

  const params = useParams();

  useEffect(() => {
    githubApi.getCurrentRepo(currentRepo(`${params.id}`)).then((r) => {
      setRepo(r);
    });
  }, []);

  return (
    <>
      <Link to={`/${currentPage}`}>← back</Link>
      <div className="current-repo">
        <div className="current-repo-header">
          <section>
            <h2>{repo.name}</h2>
            <div>
              <img src={vector} alt="" />
              <span>{repo.stargazerCount}</span>
            </div>
            <h3>{String(new Date(repo.pushedAt)).slice(4, 25)}</h3>
          </section>
          <div>
            <a href={repo.owner.url}>{repo.owner.login}</a>
            <img src={repo.owner.avatarUrl} alt="" />
          </div>
        </div>
        <div className="description">
          <h4>Description:</h4>
          <p>
            {repo.description
              ? repo.description
              : "The project has no description"}
          </p>
        </div>
        <div className="languages">
          <h4>Languages:</h4>
          {repo.languages.nodes.map(
            (lang: { name: string; color: string }, index: number) => {
              return (
                <span style={{ color: `${lang.color}` }} key={index}>
                  {lang.name}
                </span>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default CurrentRepo;
