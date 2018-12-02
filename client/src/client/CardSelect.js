import React from "react";
import Card from '../common/Card';

const CardSelect = ({ cards, onSelect }) => {
  return (
    <div style={{maxHeight: '100vh'}}>
      <h1>Pick a card</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'scroll',
        height: '400px',
        whiteSpace: 'nowrap'
      }}>
      {cards.map(e => (
        <Card style={{
          flex: '0 0 auto',
          width: "225px",
          height: "350px",
        }} key={e.id} text={e.text} onClick={()=>onSelect(e)}/>
      ))}
      </div>
    </div>
  );
};

export default CardSelect;
