const { makeDecks } = require("Deck.js");

class Game {
  constructor(roomID, hostSocket) {
    this.hostSocket = hostSocket;
    this.roomID = roomID;

    this.players = [];
    this.cards = makeDecks();
  }

  join({ name, socket }) {
    this.players.push({
      name: name,
      socket: socket,
      hand: []
    });
  }

  leave(socket) {} // probably not implemented
}
