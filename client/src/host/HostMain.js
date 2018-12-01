import React from "react";
import io from "socket.io-client";
import Landing from "./Landing.js";
import { socketUrl } from "common/socketUrl.js";
import Cover from "common/Cover.js";

class HostMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "landing",
      id: 0,
      players: []
    };
  }

  componentDidMount() {
    console.log("Connecting to socket");
    this.socket = io(socketUrl, { transports: ["websocket"] });

    this.socket.on("connect", () => {
      window.socket = this.socket;
      console.log("connected, window.socket for debugging");
      this.socket.emit("join_host"); // get a game
    });

    window.socket = this.socket; // for debugging

    const bindFn = name => {
      this.socket.on(name, args => this[`_handle_${name}`](args));
    };

    bindFn("gameid");
    bindFn("game_judging");
    bindFn("game_selecting");
    bindFn("leaderboard");
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

  _handle_gameid(id) {
    this.setState({ id });
  }

  _handle_leaderboard({ players }) {
    this.setState({ players });
  }

  render() {
    const { state, players, id } = this.state;
    console.log("host render", this.state);

    if (state === "landing") {
      return (
        <Landing
          id={id}
          players={players}
          onStart={() => {
            this.socket.emit("host/start");
          }}
        />
      );
    }

    return <Cover spinner />;
  }
}

export default HostMain;
