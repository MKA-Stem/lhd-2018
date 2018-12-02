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
        <div className="BoardTitle">
          <LeaderBoardLine name="Player" score="Score" />
        </div>
        {this.props.players
          .sort((a, b) => b.score - a.score)
          .map(player => (
            <LeaderBoardLine
              name={player.name}
              score={player.score + " Points"}
            />
          ))}
      </div>
    );
  }
}

export default LeaderBoard;
