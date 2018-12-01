const { allCards } = require("./deck.js");
const shuffle = require("shuffle-array");

class Game {
  constructor(hostSocket, maxScore = null) {
    this.host = hostSocket; // from io.on('connection')
    this.id = Math.floor(Math.random() * 100000); // text room id
    this.room = null;
    this.state = "lobby";
    this.maxScore = maxScore; // If given, game ends once someone reaches maxScore. If null, game is endless.

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
    if (this.state !== "lobby") {
      socket.error("cannot join started game");
      socket.close();
      return;
    }

    const player = {
      name,
      id: socket.id,
      socket,
      score: 0,
      hand: [],
      choice: null
    };
    this.players.push(player);
    socket.join(this.id); //put the client into the right room on the server

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
    if (this.state !== "judging" || this.state !== "lobby") {
      console.error(
        "ERROR: _enter_selecting attempted during " + state + " state"
      );
      return;
    }
    this.room.emit("game_selecting");
    this.state = "selecting";

    // Update the leaderboard
    this._updateLeaderboard();

    // Select the next czar
    this.czarInd = (this.czarInd + 1) % this.players.length;

    // clear current cards
    this.players.forEach(player => (player.choice = null));

    // Select the prompt card
    this.promptCard = this.prompts.pop();

    // tell people about everything
    const czar = this.players[this.czarInd];
    this.room.emit("czar", { id: czar.id, name: czar.name });
    this.room.emit("prompt", this.promptCard);

    // Deal each player one card
    for (let p of this.players) {
      this._dealOneCard(p);
    }
  }

  _enter_judging() {
    if (this.state !== "selecting") {
      console.error(
        "ERROR: _enter_judging attempted during " + state + " state"
      );
      return;
    }
    // we're judging now
    this.room.emit("game_judging");
    this.state = "judging";

    // send all the choices
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
    if (
      this.state !== "selecting" ||
      player.id === this.players[this.czarInd].id
    ) {
      player.socket.close();
      return;
    }

    player.choice = card;

    // count unsubmited players
    const undecided = this.players.filter(e => e.choice == null).length - 1; // subtract 1 for czar
    this.host.emit("undecided", { count: undecided });

    if (undecided == 0) {
      this._enter_judging();
    }
  }

  _cl_judgement(player, card) {
    // boot cheeky clients
    if (
      this.state !== "judging" ||
      player.id != this.players[this.czarInd].id
    ) {
      player.socket.close();
      return;
    }

    const winner = this.players.filter(
      e => e.choice && e.choice.id === card.id
    )[0];

    // Increment the winner's score
    winner.score++;
    winner.socket.emit("best", { score: winner.score });

    if (this.maxScore && winner.score >= this.maxScore) {
      // Winning Occurs here
      console.log(
        "Game " + this.id + " over. Max score reached by " + winner.name
      );
      return; // no clue what happens when this is executed
    }

    // Move to selecting
    this._enter_selecting();
  }

  //----- host events -----
  _ho_start() {
    if (this.state !== "lobby") {
      console.error("ERROR: _ho_start attempted during " + state + " state");
      return;
    }

    this._enter_selecting();

    // Deal each player a semi-complete
    for (let p of this.players) {
      for (let i = 0; i < 6; i++) {
        this._dealOneCard(p);
      }
    }
  }
}

module.exports.Game = Game;
