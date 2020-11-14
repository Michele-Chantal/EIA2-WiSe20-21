"use strict";
var L05_Hexenkessel_Client;
(function (L05_Hexenkessel_Client) {
    window.addEventListener("load", handleLoad);
    let price = 0;
    function handleLoad(_event) {
        L05_Hexenkessel_Client.generateContent(L05_Hexenkessel_Client.data);
        let anweisungen = document.querySelector("div#anweisungen");
        let button1 = document.querySelector("#button1");
        let btnIngredients = document.querySelector("#btnIngredients");
        let btnTemp = document.querySelector("#btnTemp");
        let btnStir = document.querySelector("#btnStir");
        button1.addEventListener("click", displayInfos);
        btnIngredients.addEventListener("click", displayIngredients);
        btnTemp.addEventListener("click", displayTemp);
        btnStir.addEventListener("click", displayStir);
        anweisungen.addEventListener("change", handleChange);
    }
    function handleChange(_event) {
        displayInfos();
    }
    function displayInfos() {
        console.log("show info");
        let effect = false;
        let outputInfos = document.querySelector("div#outputInfos");
        outputInfos.innerHTML = "";
        let formData = new FormData(document.querySelector("form"));
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
    function displayIngredients() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let totalPrice = document.querySelector("#totalPrice");
        outputInstructions.innerHTML = "";
        totalPrice.innerHTML = "";
        let formData2 = new FormData(document.querySelector("form"));
        for (let entry of formData2) {
            if (entry[0] == "Ingredienzen") {
                let selector = "[value='" + entry[1] + "']";
                let item = document.querySelector(selector);
                let chosenAmount = entry[1] + "Menge";
                let amount = Number(formData2.get(chosenAmount));
                let priceItem = Number(item.getAttribute("price"));
                price += amount * priceItem;
                outputInstructions.innerHTML += amount + " " + entry[1] + " hinzugeben." + "<br>";
            }
        }
        outputInstructions.innerHTML += "<br>";
        let chosenprice = currencyConverted(price);
        totalPrice.innerHTML = "<p><strong>Preis: " + chosenprice;
    }
    function displayTemp() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let formData2 = new FormData(document.querySelector("form"));
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
    function displayStir() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let formData2 = new FormData(document.querySelector("form"));
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
    function currencyConverted(_price) {
        let galleonen;
        let sickel;
        let knut;
        let rest;
        galleonen = (Math.floor(_price / 493)).toString();
        rest = _price % 493;
        sickel = (Math.floor(_price / 29)).toString();
        rest = _price % 29;
        knut = rest.toString();
        if (_price < 29) {
            return sickel;
        }
        else if (_price < 493) {
            if (knut == "0 Knut")
                return sickel;
            else
                return sickel + knut;
        }
        else {
            return galleonen + sickel + knut;
        }
    }
})(L05_Hexenkessel_Client || (L05_Hexenkessel_Client = {}));
//# sourceMappingURL=script.js.map