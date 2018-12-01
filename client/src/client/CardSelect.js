import React from "react";

const CardSelect = ({ cards, onSelect }) => {
  return (
    <div>
      <h1>Pick a card</h1>
      {cards.map(e => (
        <div key={e.id}>
          <button
            onClick={() => {
              onSelect(e);
            }}
          >
            {e.text}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardSelect;
