import React from 'react';

class LeaderBoard extends React.Component{
  render(){
    let rank = 0;
    const items = this.props.players.map((player) => 
    <li rank={`place_${++rank}`}>
      {`${rank} ${player}`}
    </li>
    )
    return(
      <div style={{
        height: "100vh",
        backgroundColor: "#fff",
        color: "#000"
      }}>
        <ul style={{
          listStyleType: "none"
        }}>
          {items}
        </ul>
      </div>
    )
  }
}

export default LeaderBoard;