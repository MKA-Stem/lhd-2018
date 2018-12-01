const fs = require("fs");
const path = require("path");
const shuffle = require("shuffle-array");

module.exports.makeDecks = () => {
  const promptsText = fs.readFileSync(
    path.join(__dirname, "../../content/prompts.txt"),
    { encoding: "utf-8" }
  );
  const responsesText = fs.readFileSync(
    path.join(__dirname, "../../content/responses.txt"),
    { encoding: "utf-8" }
  );

  const prompts = [];
  promptsText.split("\n").forEach((elm, index) => {
    prompts.push({
      id: index + 1,
      text: elm
    });
  });

  const responses = [];
  responsesText.split("\n").forEach((elm, index) => {
    responses.push({
      id: index + 1,
      text: elm
    });
  });

  return {
    prompts,
    responses
  };
};

module.exports.allCards = module.exports.makeDecks();

module.exports.Deck = class Deck {
  constructor() {
    this.prompts = shuffle([...module.exports.allCards.prompts]);
    this.responses = shuffle([...module.exports.allCards.responses]);
  }

  getNextCard(type) {
    const card = this[type].pop();
    if (this[type].length == 0) {
      this[type] = shuffle([...module.exports.allCards[type]]);
    }
    return card;
  }
};
