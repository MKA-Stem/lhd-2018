import React from "react";

const Prompt = ({ prompt, undecided }) => {
  return (
    <div>
      <h2>{prompt.text}</h2>
      <p>Undecided: {undecided}</p>
    </div>
  );
};

export default Prompt;
