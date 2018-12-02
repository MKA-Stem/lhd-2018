import React from "react";
import "./LeaderBoard.css";

const LeaderBoardLine = ({ name, score }) => (
  <div className="LeaderBoardLine">
    <div className="name">{name}</div>
    <div className="score">{score}</div>
  </div>
);

class LeaderBoard extends React.Component {
  render() {
    return (
      <div className="LeaderBoard">
        <h1>Players</h1>
        {this.props.players
          .sort((a, b) => b.score - a.score)
          .map(player => (
            <LeaderBoardLine
              key={player.id}
              name={player.name}
              score={player.score}
            />
          ))}
      </div>
    );
  }
}

export default LeaderBoard;
