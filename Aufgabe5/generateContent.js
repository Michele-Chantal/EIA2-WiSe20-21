"use strict";
var L05_Hexenkessel_Client;
(function (L05_Hexenkessel_Client) {
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
            switch (category) {
                case "Ingredienzen":
                    group = createMultiple(items, category);
                    break;
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
        function createMultiple(_items, _category) {
            let group = document.createElement("div");
            for (let item of _items) {
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.setAttribute("price", item.price.toFixed(2));
                checkbox.name = _category;
                checkbox.id = item.name;
                checkbox.value = item.name;
                let label = document.createElement("label");
                label.textContent = item.name;
                label.htmlFor = item.name;
                group.appendChild(checkbox);
                group.appendChild(label);
                let itemAmount = document.createElement("input");
                itemAmount.type = "number";
                itemAmount.name = item.name + "Menge";
                itemAmount.id = item.name + "Menge";
                itemAmount.value = "1";
                itemAmount.min = "1";
            }
            return group;
        }
    }
    L05_Hexenkessel_Client.generateContent = generateContent;
})(L05_Hexenkessel_Client || (L05_Hexenkessel_Client = {}));
//# sourceMappingURL=generateContent.js.map