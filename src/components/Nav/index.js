import React from "react";
import ClickAlert from "../ClickAlert";
import "./style.css";

function Nav(props) {
  return (
    <nav className="navbar">
      <h1>
        <ul>
          <li className="brand">
            <a href="/nmikeytruong.github.io/clicky-game/">Clicky PokeGame/Restart</a>
          </li>
          <ClickAlert score={props.score} topScore={props.topScore} />
          <li>
            Score: {props.score} | Top Score: {props.topScore}
          </li>
        </ul>
      </h1>
    </nav>
  );
}

export default Nav;
