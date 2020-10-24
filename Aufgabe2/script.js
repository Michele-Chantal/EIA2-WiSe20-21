"use strict";
var L02_MiniUno;
(function (L02_MiniUno) {
    //Dieser Code funtkioniert nicht bzw. ist nicht vollständig!!
    //Main (Deklarationen)
    let computerCards = document.querySelector("#computerCards");
    let playerCards = document.querySelector("#playerCards");
    let middleCards = document.querySelector("#middleCards");
    const possibleColors = ["yellow", "blue", "green", "red"];
    const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let discardPile = document.querySelector("#discardPile"); //vorher Span Element
    let randomColorValue;
    let randomNumberValue;
    let computerTurn = false;
    let passAllowed = false;
    let userPrompt = prompt("Enter how many cards you want to play with", "");
    let cardNumber = parseInt(userPrompt);
    function generatePlayerCards() {
        let i = 0;
        while (i < cardNumber) {
            generateRandomValues();
            let card = document.createElement("span");
            playerCards.appendChild(card);
            card.textContent = randomNumberValue;
            card.className = randomColorValue;
            i++;
        }
    }
    generatePlayerCards();
    function generateComputerCards() {
        let i = 0;
        while (i < cardNumber) {
            generateRandomValues();
            let card = document.createElement("span");
            computerCards.appendChild(card);
            card.textContent = randomNumberValue;
            card.className = randomColorValue;
            i++;
            card.style.color = "grey";
            card.style.backgroundColor = "grey";
        }
    }
    generateComputerCards();
    function generateDiscardPile() {
        generateRandomValues();
        let card = document.createElement("span");
        middleCards.appendChild(card);
        card.textContent = randomNumberValue;
        card.className = randomColorValue;
    }
    generateDiscardPile();
    function generateRandomValues() {
        randomColorValue = possibleColors[Math.floor(Math.random() * possibleColors.length)];
        let x = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
        randomNumberValue = x.toString();
    }
    //-> Main klappt!!
    //playCard -> klappt halb?? Karte kann ausgewählt werden    
    playerCards.addEventListener("click", playCard); //Event-Listener, damit man auf Karte klicken kann
    //Das replacen klappt nicht!!!
    function playCard(_event) {
        let chosenCard = _event.target;
        if (chosenCard.textContent === middleCards.textContent || chosenCard.className === middleCards.className) {
            middleCards.textContent = chosenCard.textContent;
            middleCards.className = chosenCard.className;
            playerCards.removeChild(chosenCard);
            computerTurn = true;
            handleComputerTurn();
        }
    }
    //drawCard -> klappt gar nicht!!
    function drawCard() {
        let card = document.createElement("span");
        playerCards.appendChild(card);
        generateRandomValues(); //Diese Funktion generiert ein randomNumberValue und randomColorValue. Am Ende gibt sie randomNumberValue und randomColorValue zurück (return)
        card.textContent = "randomNumberValue";
        card.className = "randomColorValue";
        passAllowed = true;
    }
    //replace discard pile (old)
    //function replaceMiddleCards(): void {
    //middleCards.textContent = chosenCard.textContent;
    //middleCards.className = chosenCard.className;
    //computerTurn = true;
    //}
    //Pass round -> klappt nicht!!!
    if (passAllowed == true) {
        computerTurn = true;
    }
    //Computer Round
    function handleComputerTurn() {
        if (computerTurn == true) {
            computerPlay();
            computerDraw();
        }
    }
    function computerDraw() {
        let card = document.createElement("span");
        computerCards.appendChild(card);
        generateRandomValues();
        card.textContent = "randomNumberValue";
        card.className = "randomColorValue";
        computerTurn = false;
    }
    function computerPlay() {
        let allCardsPc = computerCards.children;
        for (let i = 0; i < allCardslength; i++) { //der Punkt vor allCards lässt den ganzen Code funktionsuntüchtig werden
            if (allCardsPc[i].textContent == discardPile.textContent || allCardsPc[i].className == discardPile.className) {
                discardPile.textContent = allCardsPc[i].textContent;
                discardPile.className = allCardsPc[i].className;
                computerTurn = false;
                break;
            }
        }
    }
})(L02_MiniUno || (L02_MiniUno = {}));
//# sourceMappingURL=script.js.map