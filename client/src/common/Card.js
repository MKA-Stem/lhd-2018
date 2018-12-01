import React from 'react';

class Card extends React.Component {
  render(){
    return(
      <div style={{
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        width: "225px",
        height: "350px",
        borderRadius: "10px",
        border: "1px solid #000",
        backgroundColor: this.props.black ? "#000" : "#fff",
        display: 'inline-block',
        margin: '0px 10px'
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