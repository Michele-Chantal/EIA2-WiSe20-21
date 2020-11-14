namespace L05_Hexenkessel_Client {

    export function generateContent(_data: Data): void {

        for (let category in _data) {
            let items: Item[] = _data[category];

            let group: HTMLElement | null = null;
            switch (category) {
                case "Ingredienzen":
                    group = createMultiple(items, category);
                    break;
                
                default:
                    break;
        }

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
    }

        function createMultiple(_items: Item[], _category: string): HTMLElement | null {
            let group: HTMLDivElement = document.createElement("div");
            for (let item of _items) {
                let checkbox: HTMLInputElement = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.setAttribute("price", item.price.toFixed(2));
                checkbox.name = _category;
                checkbox.id = item.name;
                checkbox.value = item.name;
                

                let label: HTMLLabelElement = document.createElement("label");
                label.textContent = item.name;
                label.htmlFor = item.name;

                group.appendChild(checkbox);
                group.appendChild(label);

                let itemAmount: HTMLInputElement = document.createElement("input");
                itemAmount.type = "number";
                itemAmount.name = item.name + "Menge";
                itemAmount.id = item.name + "Menge";
                itemAmount.value = "1";
                itemAmount.min = "1";
            }
            return group;
        }
    
}