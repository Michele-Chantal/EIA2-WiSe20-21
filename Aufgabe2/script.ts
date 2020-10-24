namespace L02_MiniUno {

    //Dieser Code funtkioniert nicht bzw. ist nicht vollständig!!

    //Main (Deklarationen)

    let computerCards: HTMLDivElement = <HTMLDivElement>document.querySelector("#computerCards");
    let playerCards: HTMLDivElement = <HTMLDivElement>document.querySelector("#playerCards");  
    let middleCards: HTMLDivElement = <HTMLDivElement>document.querySelector("#middleCards"); 
    const possibleColors: string [] = ["yellow", "blue", "green", "red"];
    const possibleNumbers: number [] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let discardPile: HTMLDivElement = <HTMLDivElement>document.querySelector("#discardPile"); //vorher Span Element
    let randomColorValue: string;
    let randomNumberValue: string;
    let computerTurn: boolean = false;
    let passAllowed: boolean = false;

    let userPrompt: string | null = prompt("Enter how many cards you want to play with", "");
    let cardNumber: number = parseInt(<string>userPrompt);

    function generatePlayerCards (): void { 
        let i: number = 0;
        while (i < cardNumber) {
            generateRandomValues();
            let card: HTMLSpanElement = document.createElement("span");
            playerCards.appendChild(card);
            card.textContent = randomNumberValue;
            card.className = randomColorValue;
            i++;
        }
    }

    generatePlayerCards ();
    

    function generateComputerCards (): void {
        let i: number = 0;
        while (i < cardNumber) {
            generateRandomValues();
            let card: HTMLSpanElement = document.createElement("span");
            computerCards.appendChild(card);
            card.textContent = randomNumberValue;
            card.className = randomColorValue;
            i++;
            card.style.color = "grey";
            card.style.backgroundColor = "grey";
        }
    }

    generateComputerCards ();

    function generateDiscardPile (): void {
        generateRandomValues();
        let card: HTMLSpanElement = document.createElement("span");
        middleCards.appendChild(card);
        card.textContent = randomNumberValue;
        card.className = randomColorValue;
    }

    generateDiscardPile();


    function generateRandomValues(): void {
        randomColorValue = possibleColors[Math.floor(Math.random() * possibleColors.length)];
        let x: number = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
        randomNumberValue = x.toString();
    }

    //-> Main klappt!!

    //playCard -> klappt halb?? Karte kann ausgewählt werden    

    playerCards.addEventListener("click", playCard); //Event-Listener, damit man auf Karte klicken kann


    //Das replacen klappt nicht!!!
    function playCard (_event: MouseEvent): void {
        let chosenCard: HTMLSpanElement = <HTMLSpanElement>_event.target;
        if (chosenCard.textContent === middleCards.textContent || chosenCard.className === middleCards.className){
            middleCards.textContent = chosenCard.textContent;
            middleCards.className = chosenCard.className;
            playerCards.removeChild(chosenCard);
            computerTurn = true;
            handleComputerTurn();
        }
    }

    //drawCard -> klappt gar nicht!!

    function drawCard (): void {
        let card: HTMLSpanElement = document.createElement("span");
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

    function handleComputerTurn (): void {
        if (computerTurn == true) {
            computerPlay();
            computerDraw();
        }
    }    

    function computerDraw(): void {
        let card: HTMLSpanElement = document.createElement("span");
        computerCards.appendChild(card);
        generateRandomValues(); 
        card.textContent = "randomNumberValue";
        card.className = "randomColorValue";
        computerTurn = false;
    }

    function computerPlay(): void {
        let allCardsPc = computerCards.children;
        for (let i: number = 0; i < allCardslength; i++) { //der Punkt vor allCards lässt den ganzen Code funktionsuntüchtig werden
            if (allCardsPc[i].textContent == discardPile.textContent || allCardsPc[i].className == discardPile.className) {
                discardPile.textContent = allCardsPc[i].textContent;
                discardPile.className = allCardsPc[i].className;
                computerTurn = false;
                break;
            }
        }
    }


}
