import React from 'react';

class Card extends React.Component {
  render(){
    return(
      <div style={{
        width: "225px",
        height: "350px",
        borderRadius: "10px",
        backgroundColor: this.props.black ? "#000" : "#fff"
      }}>
        <div style={{
          padding: "20px",
          color: this.props.black ? "#fff" : "#000"
        }}>{this.props.text}</div>
      </div>
    )
  }
}

export default Card;