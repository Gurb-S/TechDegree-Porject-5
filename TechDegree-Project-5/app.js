/************************************************
Gurbakhash Sandhu
Project 5 - Word Guessing Game

v1 - 11-18-21

v2 - ???
*************************************************/
const overlay = document.getElementById('overlay');
const mainDiv = overlay.parentNode;

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('#phrase ul');
const li = ul.children;
const scoreboard = document.querySelector('#scoreboard ol');
const heart = scoreboard.children;
let missed = 0;
const again = document.getElementsByClassName('btn__reset')[1];

/**
 * `log` arrow function
 * tired of typing console.log(); everytime I want to test something so now
 * all I have to type in log(); and pass as the arguement whatever I want to display
 * @param {all} item - takes in any arguement that console.log(); would take 
 */
const log = item => console.log(item);

const startGame = document.getElementsByClassName('btn__reset')[0];

let phraseArray;
let phraseDisplayed;
/**
* when the Start Game button is clicked remove the overlay on the screen
* If the text content of the 'Start Game' btn is equal to 'Play Again?'
*   reset class for the keyboard, and enable all btns
*   then remove left over hearts and readd all new hearts and reset missed counter
*   then remove the old phrase and display a new one
*   finally remove the overlay and allow user to play again
*  
**/
startGame.addEventListener('click',()=>{
   
    if(startGame.textContent === 'Start Game'){
        log('Game started');
    }
    else if(startGame.textContent === 'Play Again?'){
        log('User playing again');
        const btns = document.getElementsByTagName('button');
        for(const btn of btns){
            btn.className = '';
            btn.disabled = false;
        }

        for(let i = 0; i < 5; i++){
            heart[0].remove();
            reAddHearts('live');
        }
        missed = 0;
        for(let i = 0; i < phraseArray.length; i ++){
            li[0].remove();
        }
        phraseArray = getRandomPhraseAsArray(phrases);
        phraseDisplayed = addPhraseToDisplay(phraseArray); 
    }
    overlay.remove();
    
});
/**
* an array[] of 6 phrases
**/
const phrases = [
    'the cat jumped over the moon',
    'life is all about challenges',
    'fate favors the brave',
    'i have a black waterbottle',
    'my favorite color is blue',
    'grind all day everyday'
];

/**
 * Test array
 */
//const phrases = ['qwert','asd','fghjkl','mn','zxcvbnghm','pooiuytreqa'];

/**
 * `getRandomPhrasesAsArray` function
 * takes an array as an arguement and takes a random string from the array and splits it up by each letter
 * @param {array} arr - the array called phrases[]
 * @returns array - a string for the array[] arguement split up into by each letter
 */
function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    return randomPhrase.split('',randomPhrase.length);
}

phraseArray = getRandomPhraseAsArray(phrases);

/**
 * `addPhrasesToDisplay` function
 * Takes in an array or a function that returns an array and creates an li 
 *  element for every index of the array and stores it in a li element for 
 *  every index and then prints out the li elements on the screen
 * If the text content of an li element is not a space, it is given the 
 *  class '.letter'
 * If the text content is a space it is given the class '.space'
 * @param {array} arr - the array that stores getRandomPhrasesAsArray(phrases)
 */
function addPhraseToDisplay(arr){
    for(let i =0;i < arr.length; i++){
        const li = document.createElement('li');
        li.textContent = arr[i];
        if(arr[i] !== ' '){
            li.className = 'letter';
        }
        else{
            li.className = 'space';
        }
        ul.appendChild(li);
    }
}


phraseDisplayed = addPhraseToDisplay(phraseArray); 

/**
 *  `checkLetter` function 
 * Checks if the letter clicked is a letter in the phrase
 *  and if so gives it the class show
 * @param {event} element  - a click event from qwerty eventlistener
 * @param {array} arr - the array that holds the phrase displayed 
 * @returns 
 */
function checkLetter(element,arr){
    let letter = null;
    for(let i = 0;i < arr.length; i++){
        if(element.textContent === arr[i]){
            letter = arr[i]
            li[i].className = 'letter show';
        }
        else if(element.tagName === 'DIV'){
            letter = 'DIV was clicked';
        }
    }
    return letter;
}

/**
 * activates when there is a click in the container for id '#qwerty'
 * if the element clicked is a btn give it the class '.chosen' and 
 *  disable it. Then call the function checkLetter(); and pass
 *  btnClicked and phraseArray as the arguements
 *  then call the function loseLife(); and pass letterFound as the arguement
 *  then call function checkWin(); with a 650ms delay to check if user won 
 */
qwerty.addEventListener('click',(e)=>{
    const btnClicked = e.target;
    if(btnClicked.tagName === 'BUTTON'){
        btnClicked.className = 'chosen';
        btnClicked.disabled = true;
    }
    const letterFound = checkLetter(btnClicked,phraseArray);    
    loseLife(letterFound);
    setTimeout(checkWin,650);
});

/**
 * `loseLife` function 
 * Checks if the value of the btn clicked is equal to 'null' and 
 * if so remove a heart, add a placeholder for the lost heart and update 
 * missed counter
 * 
 * @param {string} element - the value of that btn that was clicked 
 */
function loseLife(element){
    if(element === null){
        heart[0].remove();
        reAddHearts('lost');
        missed ++;
    }
}

/**
 * `checkWin` function 
 * If the number of elements with the classes '.show' and '.letter' equal
 *  and if so changes the text content of 'Start Game' btn to 'Play Again?'
 *  added the overlay to the html and gives it the class '.win'
 * If the number of class '.show' and class '.letter' is not equal and 
 * the number of misses they have is 5, change the text content of 'Start Game' btn to 'Play Again?'
 *  added the overlay to the html and gives it the class '.lose'
 *
 */
function checkWin(){
    const show = document.getElementsByClassName('show');
    const letter = document.getElementsByClassName('letter');
    if(show.length === letter.length){
        startGame.textContent = 'Play Again?';
        mainDiv.prepend(overlay);
        overlay.className = 'win';
    }
    else if(show.length !== letter.length && missed === 5){
        startGame.textContent = 'Play Again?';
        mainDiv.prepend(overlay);
        overlay.className = 'lose';
    }

}

/**
 * `reAddHearts` function
 * creates an img element and all atributes the orginal heart imgs have
 * and adds it to the id '#scoreboard'
 * @param {string} element - either 'live' or 'lose' defending on if you want
 *                           to add a heart or add a heart placeholder 
 */
function reAddHearts(element){
    const img = document.createElement('img');
    img.src = `images/${element}Heart.png`;
    img.style.height = '35px';
    img.style.width = '30px';
    const heart = document.createElement('li');
    heart.className = 'tries';
    heart.style.marginRight = '4px';
    heart.appendChild(img);
    scoreboard.appendChild(heart);
}





