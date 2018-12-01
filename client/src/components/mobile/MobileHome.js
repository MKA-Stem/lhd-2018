import React from 'react';
import './MobileHome.css'

class MobileHome extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      code: ''
    }
  }
  render(){
    return(
      <div style={{
        backgroundColor: '#000'
      }}>
        <header>
          <h1 style={{
            color: '#fff'
          }}>{`Cards Against ${this.props.titleText}`}</h1>
        </header>
        <div>
          <form>
            <input type="text" placeholder="What should we call you?" 
            value={this.state.name} onChange={e => {this.setState({name: e.target.value})}}
            style={{
              width: '50%',
              height: '30px',
              border: 'none',
              fontSize: '20px',
              margin: '5px',
              padding: '10px'
            }}/>
            <input type="number" placeholder="Game Code"
            value={this.state.code} onChange={e => {this.setState({code: e.target.value})}}
            style={{
              width: '50%',
              height: '30px',
              border: 'none',
              fontSize: '20px',
              margin: '5px',
              padding: '10px'
            }}/>
            <button onClick={this.props.onClick} style={{
              width: '20%',
              height: '50px',
              border: 'none',
              fontSize: '20px',
              backgroundColor: '#fff'
            }}>Let's Go!</button>
          </form>
        </div>
      </div>
    )
  }
}

export default MobileHome;