import React from "react";
import Card from '../common/Card';

const Judgement = ({ prompt, choices, onSelect }) => {
  return (
    <div>
      <h1>Pick a pairing</h1>
      <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'scroll',
            overflowY: 'none',
            height: '400px',
            whiteSpace: 'nowrap'
          }}>
      {choices
        .filter(e => e.choice !== null)
        .map(e => (
          
            <Card style={{whiteSpace: 'normal'}} key={e.id} text={prompt.text.replace(/_+/g, e.choice.text)} onClick={()=>onSelect(e)}/>
        ))}
    </div>
    </div>
  );
};

export default Judgement;
