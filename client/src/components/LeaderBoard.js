import React from 'react';

class LeaderBoard extends React.Component{
  render(){
    let rank = 0;
    let items = this.props.players.sort((a, b) => (b.score - a.score)).map((player) => 
    <li key={`place_${++rank}`} style={{
      borderBottom: '1px solid black',
      // padding: '5px'
    }}>
      {`${rank} ${player.name} `}<div style={{
        height: '30px',
        width: '30px',
        backgroundColor: '#bbb',
        borderRadius: '50%',
        display: 'inline-block',
        textAlign: 'center',
        fontSize: '14px'
      }}>{player.score}</div>
    </li>
    )
    return(
      <div style={{
        height: "100vh",
        backgroundColor: "#fff",
        color: "#000"
      }}>
        <ul style={{
          padding: '0',
          listStyleType: "none"
        }}>
          {items}
        </ul>
      </div>
    )
  }
}

export default LeaderBoard;