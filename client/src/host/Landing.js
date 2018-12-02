import React from "react";
import "./Landing.css";

class Landing extends React.Component {
  render() {
    const { id, players, onStart } = this.props;
    return (
      <div
        className="home"
        style={{
          width: "100%",
          height: "100vh",
          color: "#fff",
          margin: "0",
          padding: "0",
          backgroundColor: "#000"
        }}
      >
        <h1
          style={{ fontSize: "50px", marginBottom: "0", padding: "0" }}
          className="title"
        >
          Cards Against, Together
        </h1>
        <div className="gameCode card">
          <h2 style={{ margin: "0" }}>Your Game Code Is:</h2>
          <h1 style={{ margin: "0", fontSize: "40px" }}>{id}</h1>
        </div>
        <div className="card credits">
          <h2>
            Made with
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            for Local Hack Day!
          </h2>
        </div>
        <button onClick={onStart} className="go">
          Let's Get This Party Started!
        </button>
        {players.length !== 0 && (
          <h3 className="people">
            In Game:
            <br />
            {players.map(e => e.name).join(",  ")}
          </h3>
        )}
      </div>
    );
  }
}

export default Landing;
