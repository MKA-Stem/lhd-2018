import React from 'react';

class Lobby extends React.Component {
  render(){
    return(
      <div>
        <header>
          <div className="banner">
            <h1>Cards Against <span>{this.props.titleText}</span></h1>
          </div>
        </header>
        <div>
        </div>
      </div>
    )
  }
}

export default Lobby;