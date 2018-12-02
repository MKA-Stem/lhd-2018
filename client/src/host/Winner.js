import React from "react";
import Card from "common/Card";
import "./Winner.css";

const Winner = ({ prompt, best }) => {
  return (
    <div className="Winner">
      <h1>{best.name} wins!</h1>
      <div className="Winner_container">
        <Card big black text={prompt.text} />
        <Card big text={best.card.text} />
      </div>
    </div>
  );
};

export default Winner;
