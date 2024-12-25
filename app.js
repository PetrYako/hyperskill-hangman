const { exit } = require("process");
const input = require("sync-input");

const words = ["python", "java", "swift", "javascript"];

let wonAmount = 0;
let lostAmount = 0;

let exitCommand = () => {
    exit(0);
}

let resultsCommand = () => {
    if (wonAmount == 2) {
        wonAmount--;
        lostAmount++;
    }
    console.log(`You won: ${wonAmount} times`);
    console.log(`You lost: ${lostAmount} times`);
}

let playCommand = (attempts) => {
    const guessWord = words[Math.floor(Math.random() * words.length)];
    let maskedWord = "-".repeat(guessWord.length);
    let usedLetters = [];

    let isWin = false;
    while (attempts > 0) {
        console.log();
        console.log(maskedWord);
        const letter = input("Input a letter: ");
        if (letter.length != 1) {
            console.log("Please, input a single letter.");
            continue;
        } else if (!/[a-z]/.test(letter)) {
            console.log("Please, enter a lowercase letter from the English alphabet.");
            continue;
        }
        let index = guessWord.indexOf(letter);
        if (maskedWord.includes(letter) || usedLetters.includes(letter)) {
            console.log("You've already guessed this letter.");
            attempts--;
        } else if (index === -1) {
            console.log("That letter doesn't appear in the word.");
            attempts--;
        } else {
            while (index !== -1) {
                maskedWord = maskedWord.substring(0, index) + letter + maskedWord.substring(index + 1);
                index = guessWord.indexOf(letter, index + 1);
            }
        }
        if (!maskedWord.includes("-")) {
            console.log();
            console.log(maskedWord);
            console.log(`You guessed the word ${maskedWord}!`);
            console.log("You survived!");
            isWin = true;
            wonAmount++;
            break;
        }
        usedLetters.push(letter);
    }

    if (!isWin) {
        lostAmount++;
        console.log();
        console.log("You lost!");
    }
}

console.log("H A N G M A N");
let attempts = 8;
while (true) {
    const command = input('Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: ');
    switch (command) {
        case "play":
            playCommand(attempts);
            break;
        case "results":
            resultsCommand();
            break;
        case "exit":
            exitCommand();        
    }
}

