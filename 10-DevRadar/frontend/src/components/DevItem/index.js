import React from "react";

import "./styles.css";

export default function DevItem({ dev, btnDelete }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <div>
        <a href={`http://github.com/${dev.github_username}`}>
          Acessar perfil no Github
        </a>
        <button onClick={() => btnDelete(dev._id)}>X</button>
      </div>
    </li>
  );
}
