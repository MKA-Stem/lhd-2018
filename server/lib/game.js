const { allCards } = require("./deck.js");
const shuffle = require("shuffle-array");

class Game {
  constructor(hostSocket) {
    this.host = hostSocket; // from io.on('connection')
    this.id = Math.floor(Math.random() * 100000); // text room id
    this.room = null;
    this.state = "lobby";

    // [{name:"", socket:<io sock>, hand:[card]}]
    this.players = [];
    this.czarInd = 0; // a player obj

    // deck of cards. Cards removed when dealt.
    this.prompts = shuffle([...allCards.prompts]);
    this.responses = shuffle([...allCards.responses]);
    this.promptCard = null;

    // send the host the game id
    this.host.emit("gameid", this.id);

    // Bind host socket methods
    this.host.on("host/start", this._ho_start.bind(this));
  }

  addPlayer({ name, socket }) {
    const player = {
      name,
      id: socket.id,
      socket,
      score: 0,
      hand: []
    };
    this.players.push(player);
    socket.join(this.id); //put the client into the right room on the server

    socket.emit("debug", "joined game.");

    this.host.emit("joined", { id: player.id, name: player.name });

    // Bind local methods to socket
    socket.on("client/pick", args => this._cl_pick(player, args));
    socket.on("client/judgement", args => this._cl_judgement(player, args));
  }

  _dealOneCard(p) {
    const card = this.responses.pop();
    p.hand.push(card);
    p.socket.emit("deal", card);
  }

  _updateLeaderboard() {
    const players = this.players.map(e => ({
      id: e.id,
      name: e.name,
      score: e.score
    }));
    this.room.emit("scoreboard", { players });
  }

  _enter_selecting() {
    // we're selecting now
    this.room.emit("game_selecting");

    // Update the leaderboard
    console.log("update leaderboard");
    this._updateLeaderboard();

    // Select the next czar
    console.log("pick czar");
    this.czarInd = (this.czarInd + 1) % this.players.length;

    // clear current cards
    console.log("pick cards");
    this.players.forEach(player => (player.choice = null));

    // Select the prompt card
    console.log("prompt card");
    this.promptCard = this.prompts.pop();

    // tell people about everything
    console.log("get czar");
    const czar = this.players[this.czarInd];
    console.log("emit czar");
    this.room.emit("czar", { id: czar.id, name: czar.name });
    console.log("emit prompt");
    this.room.emit("prompt", this.promptCard);

    // Deal each player one card
    console.log("deal one card");
    for (let p of this.players) {
      this._dealOneCard(p);
    }
  }

  _enter_judging() {
    // we're judging now
    console.log("game_judging");
    this.room.emit("game_judging");

    // send all the choices
    console.log("send choices");
    this.room.emit("choices", {
      choices: this.players.map(p => ({
        id: p.id,
        name: p.name,
        choice: p.choice
      }))
    });
  }

  //----- client events -----
  _cl_pick(player, card) {
    // boot cheeky clients
    if (player.id === this.players[this.czarInd].id) {
      player.socket.close();
      return;
    }

    player.choice = card;

    // count unsubmited players
    const undecided = this.players.filter(e => e.choice == null).length - 1; // subtract 1 for czar
    console.log("undecided", undecided);
    this.host.emit("undecided", { count: undecided });

    if (undecided == 0) {
      console.log("we all picked, enter judging");
      this._enter_judging();
    }
  }

  _cl_judgement(player, card) {
    // boot cheeky clients
    if (player.id != this.players[this.czarInd].id) {
      console.log("booting cheeky client");
      player.socket.close();
      return;
    }

    const winner = this.players.filter(
      e => e.choice && e.choice.id === card.id
    )[0];
    console.log("pick winner", winner.id, winner.name);

    // Increment the winner's score
    winner.score++;
    console.log("send best score", winner.score);
    winner.socket.emit("best", { score: winner.score });

    // Move to selecting
    console.log("enter selecting");
    this._enter_selecting();
  }

  //----- host events -----
  _ho_start() {
    console.log("ho enter select");
    this._enter_selecting();

    // Deal each player a semi-complete
    for (let p of this.players) {
      console.log("deal main hand player", p.id, p.name);
      for (let i = 0; i < 6; i++) {
        this._dealOneCard(p);
      }
    }
  }
}

module.exports.Game = Game;
