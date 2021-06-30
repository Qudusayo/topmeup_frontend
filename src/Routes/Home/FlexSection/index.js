import React from "react";
import styles from "./style.module.scss";

function Index(props) {
  return (
    <div className={[styles.flex, styles[props.styles]].join(" ")}>
      <div>
        <h1>{props.title}</h1>
        <p>{props.info}</p>
        {props.children}
      </div>
      {props.src ? <img alt="rep" src={props.src} /> : null}
    </div>
  );
}

export default Index;
