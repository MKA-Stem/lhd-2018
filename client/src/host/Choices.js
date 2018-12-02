import React from "react";
import Card from "common/Card.js";
import "./Choices.css";

const Choices = ({ prompt, choices, czar }) => {
  return (
    <div className="Choices">
      <h1>{czar.name} is the Judge.</h1>
      <div className="Choices_container">
        <Card black text={prompt.text} />
        {choices
          .filter(e => e.choice !== null)
          .map(e => (
            <Card key={e.id} text={e.choice.text} />
          ))}
      </div>
    </div>
  );
};

export default Choices;
