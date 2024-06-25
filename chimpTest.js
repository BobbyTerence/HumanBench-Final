//For the array, I used chatGPT to generate 150 unique words in order to not come up with 300 unique words on my own
const wordBank = [
  "Apple", "Banana", "Cherry", "Daisy", "Eagle", "Frog", "Giraffe", "Hippo", "Igloo", "Jungle",
  "Kiwi", "Lemon", "Mango", "Nectar", "Olive", "Peach", "Quartz", "Rainy", "Soccer", "Tulip",
  "Umbrella", "Valley", "Water", "Xylophone", "Yellow", "Zebra",
  "Apple", "Banana", "Cherry", "Daisy", "Eagle", "Frog", "Giraffe", "Hippo", "Igloo", "Jungle",
  "Kiwi", "Lemon", "Mango", "Nectar", "Olive", "Peach", "Quartz", "Rainy", "Soccer", "Tulip",
  "Umbrella", "Valley", "Water", "Xylophone", "Yellow", "Zebra",
  "Apple", "Banana", "Cherry", "Daisy", "Eagle", "Frog", "Giraffe", "Hippo", "Igloo", "Jungle",
  "Kiwi", "Lemon", "Mango", "Nectar", "Olive", "Peach", "Quartz", "Rainy", "Soccer", "Tulip",
  "Umbrella", "Valley", "Water", "Xylophone", "Yellow", "Zebra",
  "Apple", "Banana", "Cherry", "Daisy", "Eagle", "Frog", "Giraffe", "Hippo", "Igloo", "Jungle",
  "Kiwi", "Lemon", "Mango", "Nectar", "Olive", "Peach", "Quartz", "Rainy", "Soccer", "Tulip",
  "Umbrella", "Valley", "Water", "Xylophone", "Yellow", "Zebra",
  "Apple", "Banana", "Cherry", "Daisy", "Eagle", "Frog", "Giraffe", "Hippo", "Igloo", "Jungle",
  "Kiwi", "Lemon", "Mango", "Nectar", "Olive", "Peach", "Quartz", "Rainy", "Soccer", "Tulip",
  "Umbrella", "Valley", "Water", "Xylophone", "Yellow", "Zebra"
];

//Array to be used to keeep track of which indexes have beeen shown, only requiring a number comparison and not a string comparison
const seenIndex = new Array(1);

//Global constants to keep track of life
const TOTALLIVES = 3;
let livesLost = 0

//Score Counter
let score = 0;

//Record Counter
let record = 0;

//Global variable to store the index number for the array
let indexNum = 0;

//Create header elements to keeep track of high score and current score
let scoreHead = document.createElement('h2');
let recordHead = document.createElement('h2');
let livesMarker = document.createElement('h3');

/**
 *  Creates all the pertinent game elements such as buttons and life counters
 */
function generateGame() {
  //Create a variiable to lessen typing document.getElementById()
  const divEdit = document.getElementById('btn-pad');
  const scoreEdit = document.getElementById('score-display');
  const livesEdit = document.getElementById('lives-left');

  livesMarker.innerText = "Lives Left: " + TOTALLIVES;
  livesEdit.appendChild(livesMarker);

  //Clear seenIndex array
  clearArray();

  //Create button elements
  const seenBtn = document.createElement('button');
  const newBtn = document.createElement('button');

  //Content for Score
  score = 0;
  scoreHead.innerText = "Score: " + score;
  recordHead.innerText = "Highest Score: " + record;

  //Content for seenBtn element
  seenBtn.innerText = "Seen";
  seenBtn.id = "seen";
  seenBtn.classList.add("btn");
  seenBtn.classList.add("btn-secondary");
  seenBtn.addEventListener("click", compare);

  //Content for newBtn
  newBtn.innerText = "New";
  newBtn.id = "new";
  newBtn.classList.add("btn");
  newBtn.classList.add("btn-secondary");
  newBtn.addEventListener('click', compare);

  //Append Score and Record elements to necessary Div
  scoreEdit.innerHTML = "";
  scoreEdit.appendChild(scoreHead);
  scoreEdit.appendChild(recordHead);

  //Add those Game to the btn-pad div
  divEdit.innerHTML = "";
  divEdit.appendChild(seenBtn);
  divEdit.appendChild(newBtn);
}

/**
 * Creates the button that starts the game
 * This is called later to generate the esame button without refreshing the page
 */
function onLoad() {
  const playFour = document.createElement('button');

  playFour.innerText = "Play Game";
  playFour.classList.add("btn");
  playFour.classList.add("btn-secondary");
  playFour.addEventListener("click", generateGame);
  playFour.addEventListener("click", randWord);

  document.getElementById('btn-pad').appendChild(playFour);
}

/**
 * Generates a random number to select a word at the random index
 */
function randWord() {
  indexNum = Math.floor(Math.random() * wordBank.length);

  word = document.createElement('p');
  word.innerText = wordBank[indexNum];

  document.getElementById('word-bank').innerHTML = "";
  document.getElementById('word-bank').appendChild(word);
}
  
/**
 * This function Compare's the word you are comparing to the array of words that you have already seen
 * determinging whether or not you were correct.
 */
function compare() {
  //This first block of the if statement is checking against words already seen in the array when you select new
  if (this.id == 'new') {
    for(let i = 0; i <= seenIndex.length; i++) {
      if(wordBank[indexNum] == seenIndex[i]) {
        livesLost += 1;
      }
      else {
        if(i == seenIndex.length) {
          score += 1;
          seenIndex.push(wordBank[indexNum]);
          break;
        }        
      }
    }
    gameCondition();
  }
  //This second block is comparing the words to validate that you have seen the word before
  else if (this.id == 'seen') {
    let i = 0;
    do {
      if(wordBank[indexNum] == seenIndex[i]) {
        score += 1;
        break;
      }
      i++;
    } while(i < seenIndex.length);

    if(i == seenIndex.length) {
      livesLost += 1;
      seenIndex.push(wordBank[indexNum]);
    }
    gameCondition();
  }
}

/**
 * This function checks the game condition and updates the score and Lives left Counter as well as determines if the game is lost
 */
function gameCondition() {
  const livesEdit = document.getElementById('lives-left');

  let lifeMarker = TOTALLIVES - livesLost;

  //This block updates life marker and updates the div accordingly
  if(livesLost < 3) {
    livesMarker.innerHTML = "Lives Left: " + lifeMarker;
    scoreHead.innerText = "Score: " + score;
    if(score > record) {
      record = score
      recordHead.innerText = "High Score: " + record;
    }
    randWord();
  }
  //This block runs only if they have lost the game
  else if (livesLost == 3) {
    gameLost();
  }
}

/**
 * Creates elements and appends them to the document
 */
function gameLost() {
  gameEnd = document.createElement('p');
  recordComp = document.createElement('p');

  gameEnd.innerText = "You're score was " + score + " points.";
  if(score < record) {
    recordComp.innerText = "You were " + (record - score) + " points off from beating your previous record"; 
  }
  else if(score == record){
    recordComp.innerText = "You tied your record!";
  }
  else {
    recordComp.innerText = "You beat your previous record!";
  }

  //Clear and reset needed elements and values
  clearGame();

  document.getElementById('word-bank').appendChild(gameEnd);
  document.getElementById('word-bank').appendChild(recordComp);

  //Calling onLoad is a convenient way to generate the buttons needed to start the game up and get things displayed properly
  onLoad();
}

/**
 * Clears all elements being used by the game and resets life totals
 */
function clearGame() {
  document.getElementById('score-display').innerHTML = "";
  document.getElementById('lives-left').innerHTML = "";
  document.getElementById('word-bank').innerHTML = "";
  document.getElementById('btn-pad').innerHTML = "";

  livesLost = 0;
}

/**
 * Clears the array in order to repeat the game without refreshing the browser
 */
function clearArray() {
  while(seenIndex.length != 0) {
    seenIndex.pop();
  }
  seenIndex.push("");
}
  