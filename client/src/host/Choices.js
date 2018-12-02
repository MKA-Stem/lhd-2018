import React from "react";

const Choices = ({ prompt, choices, czar }) => {
  return (
    <div>
      {choices
        .filter(e => e.choice !== null)
        .map(e => (
          <h2 key={e.id}>{prompt.text.replace(/_+/g, e.choice.text)}</h2>
        ))}
      <div>{czar.name} is the czar</div>
    </div>
  );
};

export default Choices;
