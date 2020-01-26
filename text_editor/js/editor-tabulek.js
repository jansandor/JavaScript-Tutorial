let table; // udrzuje tabulku
let tabXSize = 5;
let tabYSize = 3;

function vytvorVychoziTabulku() {
    table = document.createElement("table");
    document.body.appendChild(table);
    let tableRow; // deklarace na miste az?

    for (let r = 0; r < tabYSize; r++) {
        tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        for (let c = 0; c < tabXSize; c++) {
            tableRow.appendChild(vytvorBunku());
        }
    }
}

let aktivniBunka; // pristup k prave aktivni bunce "input"

function vytvorBunku() {
    let td = document.createElement("td");

    let tdInput = document.createElement("input");

    tdInput.type = "text";
    tdInput.onfocus = function () {
        aktivniBunka = this; // v this je reference na objekt, ktery vyvoval udalost
    };
    td.appendChild(tdInput);

    return td;
}
/*function vytvorBunku() {
    let td = document.createElement("td");

    let p = document.createElement("p");
    p.textContent = "x";

    td.appendChild(p);
    return td;
}*/

window.onload = function () {
    let createDefaultTableBtn = document.getElementById("createDefaultTable");
    createDefaultTableBtn.onclick = function (){
        vytvorVychoziTabulku();
    };

    vytvorTlacitka();
};

function vytvorTlacitkoAVlozHo(popisek, rodic){
    let tlacitko = document.createElement("button");
    tlacitko.textContent = popisek;
    //tlacitko.innerText = popisek; // pro IE8 ?
    //tlacitko.innerHTML = popisek; // jen, pokud chci vkladat html, ne pro plain text
    rodic.appendChild(tlacitko);
    return tlacitko;
}

function vytvorTlacitka() {
    vytvorTlacitkoAVlozHo("Přidat řádek dolů", document.body);
    vytvorTlacitkoAVlozHo("Přidat řádek nahoru", document.body);
    vytvorTlacitkoAVlozHo("Přidat sloupec vlevo", document.body);
    vytvorTlacitkoAVlozHo("Přidat sloupec vpravo", document.body);
    vytvorTlacitkoAVlozHo("Odstranit řádek", document.body);
    vytvorTlacitkoAVlozHo("Odstranit sloupec", document.body);
}

