const fs = require("fs");
const path = require("path");

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
