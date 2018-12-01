import React from "react";
import "./Login.css";

class MobileHome extends React.Component {
  render() {
    const { name, id, onNameChange, onIdChange, onSubmit } = this.props;
    return (
      <div
        className="home"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#000"
        }}
      >
        <header>
          <h1
            style={{
              color: "#fff",
              marginBottom: "10px"
            }}
          >
            Cards Against, Together
          </h1>
        </header>
        <form>
          <input
            type="text"
            placeholder="Name"
            value={name || ""}
            onChange={e => {
              onNameChange(e.target.value);
            }}
            style={{
              width: "75%",
              height: "30px",
              border: "none",
              fontSize: "20px",
              margin: "5px",
              borderRadius: "10px",
              padding: "10px"
            }}
          />
          <input
            type="number"
            placeholder="Game Code"
            value={id || ""}
            onChange={e => {
              onIdChange(e.target.value);
            }}
            style={{
              width: "75%",
              height: "30px",
              border: "none",
              fontSize: "20px",
              margin: "5px",
              borderRadius: "10px",
              padding: "10px"
            }}
          />
          <button
            style={{
              width: "50%",
              height: "50px",
              borderRadius: "10px",
              borderColor: "#fff",
              fontSize: "20px",
              margin: "5px",
              backgroundColor: "#fff"
            }}
            onClick={onSubmit}
          >
            Let's Go!
          </button>
        </form>
      </div>
    );
  }
}

export default MobileHome;
