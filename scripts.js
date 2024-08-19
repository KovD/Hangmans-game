
let guess = 0;
const maxGuesses = 9;
let wordLetters;
let currentWord;
let currentHint;
let difficulty_rate = 3
let score = 0;
let usedLetters = [];
const displayPicture = document.querySelector(".pictures");
const display = document.querySelector(".display");
const usedLettersDisplay = document.getElementById("used");
const restartButton = document.querySelector(".shade");
const displayHint = document.getElementById("hint")
const displayScore = document.getElementById("score")
const displayLost = document.getElementById("lost")
const finalScore = document.getElementById("final-score")
const input = document.getElementById('name-input')
const cover = document.querySelector(".cover");
let playerData;
const adress = 'ws://hm-game.glitch.me/';
//const adress = 'ws://localhost:5000';
let client;

const sendScore = () => {
    if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(playerData));
    }
};

const reset = () => {

    playerData.score = score
    // console.log('PlayerData: '+ playerData.score + '\n' + playerData.name)
    sendScore()
    displayLost.innerText = "";
    displayScore.innerText = score;
    restartButton.style.display = 'none';
    usedLetters = [];
    updateUsedLetters(usedLetters);
    display.innerHTML = currentWord.split("").map(() => `<li class="letter">_</li>`).join("");
    wordLetters = currentWord.split('');
    removeSpaces(wordLetters);
    guess = 0;
    displayHint.innerText = "";
    displayPicture.src = "pictures/" + guess + ".svg";

};

const removeSpaces = (letters) => {
    const letterElements = document.querySelectorAll(".letter");

    letters.forEach((letter, i) => {

        switch (letter) {
            case " ":
                letterElements[i].innerText = " ";
                break;
            case "'":
                letterElements[i].innerText = "'";
                break;
            case "-":
                letterElements[i].innerText = "-";
                break;
        
            default:
                break;
        }
    });
};

const startGame = () => {

    fetch(selectWordDifficulty())
    .then((response) => response.json())
    .then((data) => {
        word_list = data; 
        const random_index = Math.floor(Math.random() * word_list.length);
        const selected_word = word_list[random_index];
        currentWord = selected_word.word.toUpperCase();
        currentHint = selected_word.hint      
        reset();
        listening(true);
    })
    .catch((error) => {
        console.error('Hiba a JSON betöltése során:', error);
    });
};

const listening = (input) => {
    if (input) {
        document.addEventListener('keydown', handleKeydown);
    } else {
        document.removeEventListener('keydown', handleKeydown);
    }
};

function handleKeydown(event) {
    let alreadyUsed = false;

    usedLetters.forEach(element => {
        if (event.key === element) {
            alreadyUsed = true;
        }
    });

    if ((event.key.length === 1 && event.key.match(/[a-zA-Z]/)) && !alreadyUsed) {
        letterChecker(event.key);
    }
}

const letterChecker = (char) => {
    let finished = true
    let good = false;
    let counter = 0;
    const letterElements = document.querySelectorAll(".letter");
    while (wordLetters.length > counter) {
        if (wordLetters[counter] == char.toUpperCase()) {
            letterElements[counter].innerText = char.toUpperCase();
            good = true;
        }
        counter++;

    }

    letterElements.forEach(element => {
        if(element.innerText == "_")
            {
                finished = false
            }
    });

    if (!good) {
        updateHangman();
    }

    if(good && finished)
    {
        victory()
    }

    updateUsedLetters(char);
};

const updateUsedLetters = (char) => {
    usedLetters.push(char);
    usedLettersDisplay.innerText = usedLetters.join(' ');
};

const updateHangman = () => {
    guess++;
    displayPicture.src = "pictures/" + guess + ".svg";

    if(guess == 6)
    {
        displayHint.innerText = currentHint
    }

    if (guess >= maxGuesses) {
        gameOver();
    }
};

const gameOver = () => {
    restartButton.style.display = 'flex'
    displayLost.innerText = "The correct word was: " + currentWord;
    finalScore.innerText = score
    listening(false);
    score = 0;
    playerData = createNewPlayer(playerName)
};

const victory = () => {
    score ++;
    startGame()
};

const selectWordDifficulty = () => {
    const thresholds = [25, 50, 75];
    const files = ['words/easy.json', 'words/normal.json', 'words/hard.json', 'words/super_hard.json'];

    let number = getRandomNumberBetween(1 + score * difficulty_rate, 25 + score * difficulty_rate);

    for (let i = 0; i < thresholds.length; i++) {
        if (number <= thresholds[i]) {
            return files[i];
        }
    }
    
    return files[files.length - 1];
}

const getRandomNumberBetween = (min, max)  => 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const login = () => {
    const playerName = input.value;
    if (playerName) {
        playerData = createNewPlayer(playerName);
        connectServer();
        startGame();
        cover.style.display = 'none';
    }
};


const createNewPlayer = (name)=>
{
    return player = {
        id: generateUUID(),
        name: name,
        score: 0
    };
}

function generateUUID() {
    //lopott StacOvewrflow
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}