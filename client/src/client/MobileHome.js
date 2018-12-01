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
      <div className="home" style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#000'
      }}>
        <header>
          <h1 style={{
            color: '#fff',
            marginBottom: '10px'
          }}>Cards Against, Together</h1>
        </header>
          <form>
            <input type="text" placeholder="Name" 
            value={this.state.name} onChange={e => {this.setState({name: e.target.value})}}
            style={{
              width: '75%',
              height: '30px',
              border: 'none',
              fontSize: '20px',
              margin: '5px',
              borderRadius: '10px',
              padding: '10px'
            }}/>
            <input type="number" placeholder="Game Code"
            value={this.state.code} onChange={e => {this.setState({code: e.target.value})}}
            style={{
              width: '75%',
              height: '30px',
              border: 'none',
              fontSize: '20px',
              margin: '5px',
              borderRadius: '10px',
              padding: '10px'
            }}/>
            <button onClick={this.props.onClick} style={{
              width: '50%',
              height: '50px',
              borderRadius: '10px',
              borderColor: '#fff',
              fontSize: '20px',
              margin: '5px',
              backgroundColor: '#fff'
            }}>Let's Go!</button>
          </form>
      </div>
    )
  }
}

export default MobileHome;