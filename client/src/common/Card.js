import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div
        style={{
          boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.3)',
          width: this.props.big ? "360px" : "225px",
          height: this.props.big ? "560px" : "350px",
          borderRadius: this.props.big ? "20px" : "10px",
          // border: "1px solid #000",
          backgroundColor: this.props.black ? "#000" : "#fff",
          display: "inline-block",
          margin: this.props.big ? "20px 40px" : "0px 10px"
        }}
        onClick={this.props.onClick}
      >
        <div
          style={{
            padding: "20px",
            width: this.props.big ? "360px" : "225px",
            height: this.props.big ? "560px" : "350px",
            whiteSpace: "normal",
            fontSize: this.props.big ? "40px" : "20px",
            color: this.props.black ? "#fff" : "#000"
          }}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Card;
