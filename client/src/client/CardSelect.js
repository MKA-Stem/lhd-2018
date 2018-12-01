import React from "react";
import Card from '../common/Card';

const CardSelect = ({ cards, onSelect }) => {
  return (
    <div style={{maxHeight: '100vh'}}>
      <h1>Pick a card</h1>
      <div style={{
        overflowX: 'scroll',
        height: '400px',
        whiteSpace: 'nowrap'
      }}>
      {cards.map(e => (
        <Card text={e.text}/>
      ))}
      </div>
    </div>
  );
};

export default CardSelect;
