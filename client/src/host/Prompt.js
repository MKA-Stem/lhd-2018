import React from "react";
import Card from "common/Card.js";
import "./Prompt.css";

const Prompt = ({ prompt, undecided }) => {
  return (
    <div className="Prompt">
      <div className="Prompt_inner">
        <Card big black text={prompt.text} />
        <h1>Undecided: {undecided}</h1>
      </div>
    </div>
  );
};

export default Prompt;
