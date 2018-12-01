const {allCards} = require('./deck.js');

class Game {
  // hostSocket: from io.on('connection')
  // room: set to io.to(this.id) in server.js
  // roomID: text room ID
  // players: [{name:"", socket:<io sock>, hand:[card]}]

  constructor(hostSocket) {
    this.hostSocket = hostSocket;
    this.id = Math.floor(Math.random() * 100000);

    this.players = [];
    this.cards = [...allCards];

    // debug
    setInterval(() => {
      this.room.emit('debug', {id: this.id, playerNames: this.players.map(e => e.name)});
    }, 3000);
  }

  _blast() {
    this.hostSocket.emit.apply(this.hostSocket, arguments);
    for (let player of this.players) {
      player.socket.emit.apply(player.socket, arguments);
    }
  }

  addPlayer({name, socket}) {
    this.players.push({
      name,
      socket,
      hand: []
    });
    socket.join(this.id); //put the client into the right room on the server

    socket.emit('debug', 'joined game.');
  }
}

module.exports.Game = Game;
