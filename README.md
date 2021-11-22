# TechDegree-Project-5

This program take an array of different phrases and displays one of them on the screen when the user clicks the btn to 
start the game. The phrase is split up into individual characters and the contents are hidden. Once the user clicks
a btn on the onscreen keyboard that btn is disabled and the program checks if the letter corresponding with the btn
is in the phrase and if so the letter is highlighted in the phrase. The user gets 5 lives and everytime a btn is clicked
that does not have a letter in the phrase the user loses a life. This is displayed with 5 hearts on the screen and 
a heart being deleted everything there is a wrong guess. The user wins the game when all of the letters in the phrase are
highlighted, indicated that the entire phrase has been guessed. The user losed when they lose all 5 lives. The user can play
again without reloading by clicked the 'Play Again?' btn on the overlay screen once they have either won or lost the game. A
lose is indicated with a green overlay screen and the lose has a red overlay screen.


POSSIBLE ERRORS:
There is no programing errors with the code but there are currently only 6 phrases in the array so it is possible to get
the same phrase a few times in a row.


FUTURE PLANS:

The hope is that version 2 will include:

1) a btn before starting the game to choose difficulty between 'normal' and 'hard'. Clicking the hard btn would
	make it so there is no spaces indicated in the phrase

2) a timer for how long the the user has to complete the game(this could be as part of 'hard' diffculty)



LONG TERM PLANS:

1) multiple customization settings that allows a user to chose differently difficulty options
	ex: chosing time limit, spaces/no spaces, minimum length of phrase, number of lives
