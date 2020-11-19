namespace L05_Hexenkessel_Client {
    window.addEventListener("load", handleLoad);
    let price: number = 0;
    let formDataSendInstructions: FormData = new FormData();
    let formDataSendGeneral: FormData = new FormData();

    async function handleLoad(_event: Event): Promise<void> {
        let response: Response = await fetch("newData.json");
        let item: string = await response.text();
        let data: Data = JSON.parse(item);
        
        generateContent(data);

        let send: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnSend");
        send.addEventListener("click", sendRecipe);

        let button1: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#button1");
        let btnIngredients: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnIngredients");
        let btnTemp: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnTemp");
        let btnStir: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnStir");
        let btnDelete: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#delete");

        button1.addEventListener("click", displayInfos);
        btnIngredients.addEventListener("click", displayIngredients);
        btnTemp.addEventListener("click", displayTemp);
        btnStir.addEventListener("click", displayStir);
        btnDelete.addEventListener("click", askBeforeDelete);
        
    }

    async function sendRecipe(): Promise<void> {
        let outputGeneral: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputGeneral");
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        
        if (outputGeneral.innerHTML && outputInstructions.innerHTML == "") {
            alert("Professor Snape wird sich nicht freuen, wenn du eine leere Seite abgibst...");
        } else {
            console.log("Send Recipe");
            let querySendGeneral: URLSearchParams = new URLSearchParams(<any>formDataSendGeneral);
            let querySendInstructions: URLSearchParams = new URLSearchParams(<any>formDataSendInstructions);
            await fetch("index.html?" + querySendGeneral.toString());
            await fetch("index.html?" + querySendInstructions.toString());

            //When recipe has been sent by user, delete all contents of output and all keys, values of formDataSends
            deleteAll();
            alert("Rezept gesendet!");
        }
    }

    function askBeforeDelete(): void {
        let outputGeneral: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputGeneral");
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        if (outputGeneral.innerHTML && outputInstructions.innerHTML != "" && confirm("Bist du sicher, dass du alles löschen möchtest?")) {
            deleteAll();
        }
    }

    function deleteAll(): void {
        let outputGeneral: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputGeneral");
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let totalSpan: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#totalSpan");
        outputGeneral.innerHTML = "...";
        outputInstructions.innerHTML = "";
        totalSpan.innerHTML = "";

        formDataSendGeneral = new FormData();
        formDataSendInstructions = new FormData();
    }

    

    function displayInfos(): void {
        console.log("show info");
        let effect: boolean = false;
        let outputInfos: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInfos");
        outputInfos.innerHTML = "";

        let formDataGeneral: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));

        for (let entry of formDataGeneral) {
            switch (entry[0]) {
                case "Name":
                    if (entry[1] != "") {
                        outputInfos.innerHTML += "Name des Tranks: " + entry[1] + "<br>";
                        formDataSendGeneral.append(entry[0], entry[1]);
                        console.log("case1");
                    }
                    break;

                case "Beschreibung":
                    if (entry[1] != "") {
                        outputInfos.innerHTML += "Beschreibung: " + entry[1] + "<br>";
                        formDataSendGeneral.append(entry[0], entry[1]);
                        console.log("case2");
                    }
                    break;

                case "Trankwirkung":
                    if (entry[1] != "-") {
                        outputInfos.innerHTML += "Trankwirkung: " + entry[1] + "<br>";
                        effect = true;
                        formDataSendGeneral.append(entry[0], entry[1]);
                        console.log("case3");
                    }
                    break;

                case "Dauer":
                    if (entry[1] != "0" && effect) {
                        outputInfos.innerHTML += "Dauer: " + entry[1] + "<br>";
                        console.log("case4");
                        formDataSendGeneral.append(entry[0], entry[1]);
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

        let formDataInstructions: FormData = new FormData(<HTMLFormElement>document.querySelector("formInstructions"));

        for (let entry of formDataInstructions) {
            if (entry[0] == "Ingredienzen") {
                let selector: string = "[value='" + entry[1] + "']";
                let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);

                let chosenAmount: string = entry[1] + "Menge";
                let amount: number = Number(formDataInstructions.get(chosenAmount));

                let priceItem: number = Number(item.getAttribute("price"));
                price += amount * priceItem;

                outputInstructions.innerHTML += amount + " " + entry[1] + " hinzugeben." + "<br>";
            
                formDataSendInstructions.append(entry[0], entry[1]);
                formDataSendInstructions.append(chosenAmount, amount.toString());
            }
        }
        outputInstructions.innerHTML += "<br>";
        let chosenprice: string = currencyConverted(price); 
        totalPrice.innerHTML = "<p><strong>Preis: " + chosenprice;
    }

    function displayTemp (): void {
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        
        let formDataInstructions: FormData = new FormData(<HTMLFormElement>document.querySelector("formInstructions"));

        for (let entry of formDataInstructions) {
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