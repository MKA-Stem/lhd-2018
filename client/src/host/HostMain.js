import React from "react";
import io from "socket.io-client";
import Landing from "./Landing.js";
import { socketUrl } from "common/socketUrl.js";
import Cover from "common/Cover.js";
import Prompt from "host/Prompt.js";
import Choices from "host/Choices.js";

class HostMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "landing",
      waiting: false,
      id: 0,
      prompt: { id: 0, text: "" },
      players: [],
      choices: [],
      undecided: 0
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
    bindFn("prompt");
    bindFn("undecided");
    bindFn("choices");
    bindFn("czar");
  }

  _handle_game_judging() {
    this.setState({
      state: "judging",
      waiting: false,
      undecided: 0
    });
  }

  _handle_game_selecting() {
    this.setState({
      state: "selecting"
    });
  }

  _handle_gameid(id) {
    this.setState({ id });
  }

  _handle_leaderboard({ players }) {
    this.setState({ players });
  }

  _handle_prompt(prompt) {
    this.setState({ prompt });
  }

  _handle_undecided({ count }) {
    this.setState({ undecided: count });
  }

  _handle_choices({ choices }) {
    this.setState({ choices });
  }

  _handle_czar(czar) {
    this.setState({ czar });
  }

  render() {
    const {
      waiting,
      state,
      players,
      choices,
      prompt,
      undecided,
      czar,
      id
    } = this.state;
    console.log("host render", this.state);

    if (waiting) {
      return <Cover spinner text={waiting} />;
    }

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

    if (state === "selecting") {
      return <Prompt prompt={prompt} undecided={undecided} />;
    }

    if (state === "judging") {
      return <Choices choices={choices} czar={czar} prompt={prompt} />;
    }

    return <Cover spinner />;
  }
}

export default HostMain;
