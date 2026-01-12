const units = {
    length: ["cm", "m", "km"],
    weight: ["g", "kg"],
    temperature: ["C", "F"]
};

function updateUnits() {
    const type = document.getElementById("type").value;
    const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");

    from.innerHTML = "";
    to.innerHTML = "";

    units[type].forEach(unit => {
        from.innerHTML += `<option value="${unit}">${unit}</option>`;
        to.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

updateUnits();

function convert() {
    const value = parseFloat(document.getElementById("inputValue").value);
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;
    const type = document.getElementById("type").value;

    if (isNaN(value)) {
        alert("Please enter a number");
        return;
    }

    let result = value;

    if (type === "length") {
        if (from === "cm" && to === "m") result = value / 100;
        if (from === "m" && to === "km") result = value / 1000;
        if (from === "km" && to === "m") result = value * 1000;
    }

    if (type === "weight") {
        if (from === "g" && to === "kg") result = value / 1000;
        if (from === "kg" && to === "g") result = value * 1000;
    }

    if (type === "temperature") {
        if (from === "C" && to === "F") result = (value * 9/5) + 32;
        if (from === "F" && to === "C") result = (value - 32) * 5/9;
    }

    document.getElementById("result").innerText =
        `${value} ${from} = ${result.toFixed(2)} ${to}`;

    addHistory(value, from, result, to);
}

function addHistory(value, from, result, to) {
    const history = document.getElementById("history");
    const li = document.createElement("li");
    li.textContent = `${value} ${from} → ${result.toFixed(2)} ${to}`;
    history.appendChild(li);
}
