import React from "react";
import "./LeaderBoard.css";

const LeaderBoardLine = ({ place, name, score }) => (
  <div className="LeaderBoardLine">
    <div className="num">{place}</div>
    <div className="name">{name}</div>
    <div className="score">{score}</div>
  </div>
);

class LeaderBoard extends React.Component {
  render() {
    let pos = 0;
    return (
      <div className="LeaderBoard">
        <h1>Players</h1>
        <div className="container">
        {this.props.players
          .sort((a, b) => b.score - a.score)
          .map(player => (
            <LeaderBoardLine
              key={player.id}
              place={++pos}
              name={player.name}
              score={player.score}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default LeaderBoard;
