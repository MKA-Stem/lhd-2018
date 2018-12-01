import React from "react";

const Judgement = ({ prompt, choices, onSelect }) => {
  return (
    <div>
      <h1>Pick a pairing</h1>
      {choices
        .filter(e => e.choice !== null)
        .map(e => (
          <div key={e.id}>
            <button onClick={() => onSelect(e)}>
              {prompt.text.replace(/_+/g, e.choice.text)}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Judgement;
