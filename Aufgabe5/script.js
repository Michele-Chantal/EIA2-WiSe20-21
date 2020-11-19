"use strict";
var L05_Hexenkessel_Client;
(function (L05_Hexenkessel_Client) {
    window.addEventListener("load", handleLoad);
    let price = 0;
    let formDataSendInstructions = new FormData();
    let formDataSendGeneral = new FormData();
    async function handleLoad(_event) {
        let response = await fetch("newData.json");
        let item = await response.text();
        let data = JSON.parse(item);
        L05_Hexenkessel_Client.generateContent(data);
        let send = document.querySelector("#btnSend");
        send.addEventListener("click", sendRecipe);
        let button1 = document.querySelector("#button1");
        let btnIngredients = document.querySelector("#btnIngredients");
        let btnTemp = document.querySelector("#btnTemp");
        let btnStir = document.querySelector("#btnStir");
        let btnDelete = document.querySelector("#delete");
        button1.addEventListener("click", displayInfos);
        btnIngredients.addEventListener("click", displayIngredients);
        btnTemp.addEventListener("click", displayTemp);
        btnStir.addEventListener("click", displayStir);
        btnDelete.addEventListener("click", askBeforeDelete);
    }
    async function sendRecipe() {
        let outputGeneral = document.querySelector("div#outputGeneral");
        let outputInstructions = document.querySelector("div#outputInstructions");
        if (outputGeneral.innerHTML && outputInstructions.innerHTML == "") {
            alert("Professor Snape wird sich nicht freuen, wenn du eine leere Seite abgibst...");
        }
        else {
            console.log("Send Recipe");
            let querySendGeneral = new URLSearchParams(formDataSendGeneral);
            let querySendInstructions = new URLSearchParams(formDataSendInstructions);
            await fetch("index.html?" + querySendGeneral.toString());
            await fetch("index.html?" + querySendInstructions.toString());
            //When recipe has been sent by user, delete all contents of output and all keys, values of formDataSends
            deleteAll();
            alert("Rezept gesendet!");
        }
    }
    function askBeforeDelete() {
        let outputGeneral = document.querySelector("div#outputGeneral");
        let outputInstructions = document.querySelector("div#outputInstructions");
        if (outputGeneral.innerHTML && outputInstructions.innerHTML != "" && confirm("Bist du sicher, dass du alles löschen möchtest?")) {
            deleteAll();
        }
    }
    function deleteAll() {
        let outputGeneral = document.querySelector("div#outputGeneral");
        let outputInstructions = document.querySelector("div#outputInstructions");
        let totalSpan = document.querySelector("#totalSpan");
        outputGeneral.innerHTML = "...";
        outputInstructions.innerHTML = "";
        totalSpan.innerHTML = "";
        formDataSendGeneral = new FormData();
        formDataSendInstructions = new FormData();
    }
    function displayInfos() {
        console.log("show info");
        let effect = false;
        let outputInfos = document.querySelector("div#outputInfos");
        outputInfos.innerHTML = "";
        let formDataGeneral = new FormData(document.querySelector("form"));
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
    function displayIngredients() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let totalPrice = document.querySelector("#totalPrice");
        outputInstructions.innerHTML = "";
        totalPrice.innerHTML = "";
        let formDataInstructions = new FormData(document.querySelector("formInstructions"));
        for (let entry of formDataInstructions) {
            if (entry[0] == "Ingredienzen") {
                let selector = "[value='" + entry[1] + "']";
                let item = document.querySelector(selector);
                let chosenAmount = entry[1] + "Menge";
                let amount = Number(formDataInstructions.get(chosenAmount));
                let priceItem = Number(item.getAttribute("price"));
                price += amount * priceItem;
                outputInstructions.innerHTML += amount + " " + entry[1] + " hinzugeben." + "<br>";
                formDataSendInstructions.append(entry[0], entry[1]);
                formDataSendInstructions.append(chosenAmount, amount.toString());
            }
        }
        outputInstructions.innerHTML += "<br>";
        let chosenprice = currencyConverted(price);
        totalPrice.innerHTML = "<p><strong>Preis: " + chosenprice;
    }
    function displayTemp() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let formDataInstructions = new FormData(document.querySelector("formInstructions"));
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