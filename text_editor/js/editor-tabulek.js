let table; // udrzuje tabulku
let tabXSize = 5;
let tabYSize = 3;

function vytvorVychoziTabulku() {
    table = document.createElement("table");
    document.body.appendChild(table);
    for (let r = 0; r < tabYSize; r++) {
        let tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        for (let c = 0; c < tabXSize; c++) {
            tableRow.appendChild(vytvorBunku());
        }
    }
    let btn = document.getElementById("createDefaultTable");
    btn.style.color = "grey";
    btn.onclick = null;
}

let aktivniBunka; // pristup k prave aktivni bunce "input"

function vytvorBunku() {
    let td = document.createElement("td");

    let tdInput = document.createElement("input");

    tdInput.type = "text";
    tdInput.onfocus = function () {
        aktivniBunka = this; // v this je reference na objekt, ktery vyvoval udalost
    };
/*    tdInput.onmouseleave = function(){
        tdInput.style.backgroundColor = "black"; // vymalovava pri prejizdeni td-inputy (bunky)
    };*/
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
    vytvorTlacitkoAVlozHo("Přidat řádek dolů", document.body).onclick = function (){pridatRadekDolu();};
    vytvorTlacitkoAVlozHo("Přidat řádek nahoru", document.body).onclick = function () {pridatRadekNahoru();};
    vytvorTlacitkoAVlozHo("Přidat sloupec vlevo", document.body).onclick = function () {pridatSloupecVlevo();};
    vytvorTlacitkoAVlozHo("Přidat sloupec vpravo", document.body).onclick = function () {pridatSloupecVpravo();};
    vytvorTlacitkoAVlozHo("Odstranit řádek", document.body);
    vytvorTlacitkoAVlozHo("Odstranit sloupec", document.body);

    vytvorTlacitkoAVlozHo("Přidej řádek nad vybranou buňku", document.body).onclick = function () {pridejRadekNadAktivniBunku();};
    vytvorTlacitkoAVlozHo("Přidej řádek pod vybranou buňku", document.body).onclick = function () {pridejRadekPodAktivniBunku();};
}

function pridatRadekDolu() {
    let tableRow = document.createElement("tr");

    table.appendChild(tableRow);
    tabYSize++;

    for (let i = 0; i < tabXSize; i++){
        let cell = vytvorBunku();
        cell.style.borderColor = "blue";
        tableRow.appendChild(cell);
    }
}
function pridatRadekNahoru() {
    let tableRow = document.createElement("tr");

    table.insertBefore(tableRow, table.firstChild);
    tabYSize++;

    for (let i = 0; i < tabXSize; i++){
        let cell = vytvorBunku();
        cell.style.borderColor = "red";
        tableRow.appendChild(cell);
    }
}

function indexRadkuAktivniBunky() {
    let cilHledani = table.childNodes;
    let hledanyPrvek = aktivniBunka.parentElement.parentElement;
    return Array.prototype.indexOf.call(cilHledani, hledanyPrvek);
}

function indexSloupceAktivniBunky() {
    let bunkyVRadku = aktivniBunka.parentElement.parentElement.childNodes;
    let td = aktivniBunka.parentElement;
    return Array.prototype.indexOf.call(bunkyVRadku, td);
}

function pridejRadekNadAktivniBunku() {
    let r = indexRadkuAktivniBunky();
    let row = document.createElement("tr");
    for(let i = 0; i < tabXSize; i++){
        let cell = vytvorBunku();
        cell.style.borderColor = "lightgreen";
        row.appendChild(cell);
    }
    table.insertBefore(row, table.childNodes[r]);
    tabYSize++;
}

function pridejRadekPodAktivniBunku() {
    let r = indexRadkuAktivniBunky();
    let row = document.createElement("tr");
    for(let i = 0; i < tabXSize; i++){
        let cell = vytvorBunku();
        cell.style.borderColor = "purple";
        row.appendChild(cell);
    }
/*    if(r+1> table.childNodes.length){
        table.appendChild(row);
    }*/
    if (table.lastChild === table.childNodes[r]){
        table.appendChild(row);
    }
    else{
        table.insertBefore(row, table.childNodes[r+1]);
    }
    tabYSize++;
}

function pridatSloupecVlevo() {
    let s = indexSloupceAktivniBunky();

    for(let i = 0; i < tabYSize; i++){
        table.childNodes[i].insertBefore(vytvorBunku(), table.childNodes[i].childNodes[s]);
    }
    tabXSize++;
}

function pridatSloupecVpravo() {
    let s = indexSloupceAktivniBunky();

    for(let i = 0; i < tabYSize; i++){
        if(table.childNodes[i].childNodes[s] == table.childNodes[i].lastChild){
            table.childNodes[i].appendChild(vytvorBunku());
        }
        else{
            table.childNodes[i].insertBefore(vytvorBunku(), table.childNodes[i].childNodes[s+1]);
        }
    }
    tabXSize++; //todo odstranit
}