const nouns = ["cat", "pizza", "robot", "sun", "car", "book", "unicorn", "tree"];
const verbs = ["eats", "jumps", "runs", "paints", "builds", "reads", "drinks"];
const adjectives = ["funny", "blue", "giant", "silly", "brave", "tiny", "shiny"];
const adverbs = ["quickly", "happily", "sadly", "gracefully", "loudly", "angrily"];
const prepositions = ["on", "under", "over", "beside", "with", "without"];
const articles = ["the", "a"];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCustomSentence(wordCount=4){
    let sentence = [];

  while (sentence.length < wordCount) {
    if (sentence.length === 0) {
      sentence.push(getRandom(articles));
    } else if (sentence.length % 4 === 1) {
      sentence.push(getRandom(adjectives));
    } else if (sentence.length % 4 === 2) {
      sentence.push(getRandom(nouns));
    } else if (sentence.length % 4 === 3) {
      sentence.push(getRandom(verbs));
    } else {
      sentence.push(getRandom(adverbs));
    }
  }

  return sentence.slice(0, wordCount).join(" ");
}
