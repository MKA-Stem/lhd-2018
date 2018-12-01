import React from 'react';

class Card extends React.Component {
  render(){
    return(
      <div style={{
        width: "225px",
        height: "350px",
        borderRadius: "10px",
        backgroundColor: "#fff"
      }}>
        <span>{this.props.text}</span>
      </div>
    )
  }
}

export default Card;