import React from "react";
import io from "socket.io-client";
import DesktopHome from "./DesktopHome";
import { socketUrl } from "common/socketUrl.js";

class HostMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: 0 };
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
  }

  _handle_gameid(id) {
    this.setState({ id });
  }

  render() {
    const { id } = this.state;
    return (
      <DesktopHome
        id={id}
        onStart={() => {
          this.socket.emit("host/start");
        }}
      />
    );
  }
}

export default HostMain;
