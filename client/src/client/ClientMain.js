import React from "react";
import io from "socket.io-client";
import MobileHome from "./MobileHome";

const socketUrl =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";

console.log("sock url", socketUrl);

class ClientMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "lobby",

      // lobby state
      name: "",
      gameId: "",

      // general state
      score: 0,
      czar: null, // player object {id,name}
      hand: [], // card object {id,text}

      // selecting state
      undecided: null
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
  }

  _handle_game_judging() {
    this.setState({
      state: "judging",
      undecided: null
    });
  }

  _handle_game_selecting() {
    this.setState({
      state: "selecting"
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
  }

  render() {
    return <pre>{JSON.stringify(this.state, null, 2)}</pre>;
  }
}

export default ClientMain;
