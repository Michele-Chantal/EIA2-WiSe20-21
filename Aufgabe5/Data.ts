namespace L05_Hexenkessel_Client {

    export interface Item {
        name: string;
        price: number;
    }

    export interface Data {
        [category: string]: Item[];
    }

    export let data: Data = {
        Ingredienzen: [
            { name: "Spinnenbeine", price: 15.00 },
            { name: "Feenstaub", price: 40.00 },
            { name: "Blut einer Jungfrau", price: 91.00 },
            { name: "Schlangengift", price: 68.00 },
            { name: "Greifenklaue", price: 100.00 },
            { name: "Goblinknochen", price: 20.00 },
            { name: "Drachenschuppe", price: 150.00 },
            { name: "Dornenblume", price: 40.00 }

        ]
    };
}