namespace L05_Hexenkessel_Client {
    window.addEventListener("load", handleLoad);
    let price: number = 0;

    function handleLoad(_event: Event): void {
        generateContent(data);

        let anweisungen: HTMLDivElement = <HTMLDivElement>document.querySelector("div#anweisungen");
        let button1: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#button1");
        let btnIngredients: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnIngredients");
        let btnTemp: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnTemp");
        let btnStir: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnStir");

        button1.addEventListener("click", displayInfos);
        btnIngredients.addEventListener("click", displayIngredients);
        btnTemp.addEventListener("click", displayTemp);
        btnStir.addEventListener("click", displayStir);
        anweisungen.addEventListener("change", handleChange);
    }

    function handleChange(_event: Event): void {
        displayInfos();
    }

    function displayInfos(): void {
        console.log("show info");
        let effect: boolean = false;
        let outputInfos: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInfos");
        outputInfos.innerHTML = "";

        let formData: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));

        for (let entry of formData) {
            switch (entry[0]) {
                case "Name":
                    if (entry[1] != "") {
                        outputInfos.innerHTML += "Name des Tranks: " + entry[1] + "<br>";
                        console.log("case1");
                    }
                    break;

                case "Beschreibung":
                    if (entry[1] != "") {
                        outputInfos.innerHTML += "Beschreibung: " + entry[1] + "<br>";
                        console.log("case2");
                    }
                    break;

                case "Trankwirkung":
                    if (entry[1] != "-") {
                        outputInfos.innerHTML += "Trankwirkung: " + entry[1] + "<br>";
                        effect = true;
                        console.log("case3");
                    }
                    break;

                case "Dauer":
                    if (entry[1] != "0" && effect) {
                        outputInfos.innerHTML += "Dauer: " + entry[1] + "<br>";
                        console.log("case4");
                        break;
                    }

                default:
                }

            
            }
        }

    

    function displayIngredients(): void {
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let totalPrice: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#totalPrice");
        outputInstructions.innerHTML = "";
        totalPrice.innerHTML = "";

        let formData2: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));

        for (let entry of formData2) {
            if (entry[0] == "Ingredienzen") {
                let selector: string = "[value='" + entry[1] + "']";
                let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);

                let chosenAmount: string = entry[1] + "Menge";
                let amount: number = Number(formData2.get(chosenAmount));

                let priceItem: number = Number(item.getAttribute("price"));
                price += amount * priceItem;

                outputInstructions.innerHTML += amount + " " + entry[1] + " hinzugeben." + "<br>";
            }
        }
        outputInstructions.innerHTML += "<br>";
        let chosenprice: string = currencyConverted(price); 
        totalPrice.innerHTML = "<p><strong>Preis: " + chosenprice;
    }

    function displayTemp (): void {
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let formData2: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));

        for (let entry of formData2) {
            switch (entry[0]) {
                case "Temperatur":
                    outputInstructions.innerHTML += "Grad: " + entry[1];
                    break;

                case "TempKonsistenz":
                    outputInstructions.innerHTML += "Bis der Trank " + entry[1] + " ist.";
                    break;

                case "TempFarbe":
                    outputInstructions.innerHTML += "Bis der Trank die Farbe " + entry[1] + " hat.";
                    break;
                
                default:
            }
        }
        outputInstructions.innerHTML += "<br>";
    }

    function displayStir(): void {
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let formData2: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));

        for (let entry of formData2) {
            switch (entry[0]) {
                case "Rühren":
                    outputInstructions.innerHTML += entry[1] + "-Mal rühren.";
                    break;

                case "RührKonsistenz":
                    outputInstructions.innerHTML += "Bis der Trank " + entry[1] + " ist.";
                    break;

                case "RührFarbe":
                    outputInstructions.innerHTML += "Bis der Trank die Farbe " + entry[1] + " hat.";
                    break;

                default:
            }
        }
        outputInstructions.innerHTML += "<br>";
    }
    
    function currencyConverted(_price: number): string {
        let galleonen: string;
        let sickel: string;
        let knut: string;
        let rest: number;

        galleonen = (Math.floor(_price / 493)).toString();
        rest = _price % 493;
        sickel = (Math.floor(_price / 29)).toString();
        rest = _price % 29;
        knut = rest.toString();

        if (_price < 29) {
            return sickel;
        } else if (_price < 493) {
            if (knut == "0 Knut")
                return sickel;
            else    
                return sickel + knut;
        } else {
            return galleonen + sickel + knut;
        }

    }

}