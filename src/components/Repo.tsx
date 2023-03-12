import React from "react";
import { SearchRepo } from "./types";
import vector from "./image/Vector.png";
import { Link } from "react-router-dom";

const Repo: React.FC<SearchRepo> = ({
  name,
  updatedAt,
  url,
  pushedAt,
  stargazerCount,
  id,
  owner,
}) => {
  const date = new Date(pushedAt);
  return (
    <>
      <div className="repo-style">
        <h2>{name}</h2>
        <div>
          <img src={vector} alt="star" />
          <span>{stargazerCount}</span>
        </div>
        <h3>{String(date).slice(4, 25)}</h3>
        <a href={`${url}`}>{url}</a>
        <Link className="more" to={`/current-repo/${id}`}>
          More
        </Link>
      </div>
    </>
  );
};

export default Repo;
