import React from 'react';
import './DesktopHome.css';

class DesktopHome extends React.Component{
  render(){
    return(
      <div className="home" style={{
        width: '100%',
        height: '100vh',
        color: '#fff',
        margin: '0',
        padding: '0',
        backgroundColor: '#000'
      }}>
        <h1 style={{fontSize: '50px', padding: '0'}} className="title">
          Cards Against, Together
        </h1>
        <div className="gameCode">
          <h2 style={{margin: '0'}}>Your Game Code Is:</h2>
          <h1 style={{margin: '0', fontSize: '40px'}}>0000{this.props.joinCode}</h1>
        </div>
        <div className="palyerPool">

        </div>
      </div>
    )
  }
}

export default DesktopHome;