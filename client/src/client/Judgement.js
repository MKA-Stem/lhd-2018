import React from "react";
import Card from '../common/Card';
import './CardSelect.css'

const Judgement = ({ prompt, choices, onSelect }) => {
  return (
    <div className='outer'>
      <h1>Pick a pairing</h1>
      <div className='scroll-wrapper'>
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
