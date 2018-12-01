import React from "react";
import io from "socket.io-client";
import Login from "./Login.js";
import CardSelect from "./CardSelect.js";
import Judgement from "./Judgement.js";

const socketUrl =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";

console.log("sock url", socketUrl);

class ClientMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "login",
      waiting: false,

      // lobby state
      name: "",
      gameId: "",

      // general state
      score: 0,
      czar: null, // player object {id,name}
      hand: [], // card object {id,text}
      prompt: null, // prompt card

      // selecting state
      undecided: null,

      // judging state
      choices: []
    };
  }

  componentDidMount() {
    console.log("Connecting to socket");
    this.socket = io(socketUrl, { transports: ["websocket"] });

    this.socket.on("connect", () => {
      window.socket = this.socket;
      console.log("connected, window.socket for debugging");
    });

    this.socket.on("error", err => {
      alert("There was a server error.");
      window.location.reload();
    });

    window.socket = this.socket; // for debugging

    const bindFn = name => {
      this.socket.on(name, args => this[`_handle_${name}`](args));
    };

    bindFn("game_judging");
    bindFn("game_selecting");
    bindFn("czar");
    bindFn("deal");
    bindFn("prompt");
    bindFn("undecided");
    bindFn("best");
    bindFn("choices");
  }

  _handle_game_judging() {
    this.setState({
      state: "judging",
      waiting: false,
      undecided: null
    });
  }

  _handle_game_selecting() {
    this.setState({
      state: "selecting",
      waiting: false,
      choices: []
    });
  }

  _handle_czar(czar) {
    this.setState({
      czar
    });
  }
  _handle_deal(card) {
    this.setState(state => ({ hand: [...state.hand, card] }));
  }
  _handle_prompt(card) {
    this.setState({ prompt: card });
  }
  _handle_undecided(args) {
    console.log("_handle_undecided: ", args);
    this.setState({ undecided: args.count });
  }
  _handle_best() {
    this.setState(state => ({ score: state.score + 1 }));
    alert("You win!");
  }
  _handle_choices({ choices }) {
    this.setState({ choices });
  }

  render() {
    const {
      prompt,
      state,
      waiting,
      czar,
      name,
      id,
      hand,
      choices
    } = this.state;

    if (waiting) {
      return <h1>Waiting</h1>;
    }

    if (state === "login") {
      return (
        <Login
          name={name}
          id={id}
          onNameChange={x => this.setState({ name: x })}
          onIdChange={x => this.setState({ id: x })}
          onSubmit={() => {
            this.socket.emit("join_game", {
              id: this.state.id,
              name: this.state.name
            });
            this.setState({ state: "lobby", waiting: true });
          }}
        />
      );
    }

    if (state === "selecting" && czar && czar.id !== this.socket.id) {
      return (
        <CardSelect
          czarName={czar ? czar.name : ""}
          cards={hand}
          onSelect={card => {
            this.socket.emit("client/pick", card);

            // remove it from hand
            this.setState(state => ({
              hand: state.hand.filter(e => e.id !== card.id)
            }));

            // wait for change
            this.setState(state => ({ waiting: true }));
          }}
        />
      );
    }

    if (state === "selecting" && czar && czar.id === this.socket.id) {
      return <h1>You are the Czar</h1>;
    }

    if (state === "judging" && czar.id !== this.socket.id) {
      return <h1>You aren't the czar</h1>;
    }

    if (state === "judging" && czar.id === this.socket.id) {
      return (
        <Judgement
          choices={choices}
          prompt={prompt}
          onSelect={bestPick => {
            this.socket.emit("client/judgement", bestPick.choice);
          }}
        />
      );
    }

    return <pre>{JSON.stringify(this.state, null, 2)}</pre>;
  }
}

export default ClientMain;
