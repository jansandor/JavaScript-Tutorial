let table; // udrzuje tabulku
let tabColumnsCount = 5;
let tabRowsCount = 3;

let aktivniBunka; // pristup k prave aktivni bunce "input"

window.onload = function () {
    let createDefaultTableBtn = document.getElementById("createDefaultTable");
    createDefaultTableBtn.onclick = function (){
        vytvorVychoziTabulku();
    };
    vytvorTlacitka();
};

function vytvorBunku() {
    let td = document.createElement("td");
    let tdInput = document.createElement("input");

    tdInput.type = "text";
    tdInput.onfocus = function () {
        aktivniBunka = this; // v this je reference na objekt, ktery vyvoval udalost
        // zvyrazneni aktivni bunky
        aktivniBunka.parentElement.style.border = "2px solid";
        aktivniBunka.parentElement.style.borderColor = "#FF00FF";
    };
    tdInput.onblur = function(){
        // zNEvyrazneni aktivni bunky
        aktivniBunka.parentElement.style.border = "1px solid";
        aktivniBunka.parentElement.style.borderColor = "black";
    };
    /*    tdInput.onmouseleave = function(){
            tdInput.style.backgroundColor = "black"; // vymalovava pri prejizdeni td-inputy (bunky)
        };*/
    td.appendChild(tdInput);
    return td;
}

function vytvorVychoziTabulku() {
    table = document.createElement("table");
    document.body.appendChild(table);
    for (let r = 0; r < tabRowsCount; r++) {
        let tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        for (let c = 0; c < tabColumnsCount; c++) {
            tableRow.appendChild(vytvorBunku());
        }
    }
    let btn = document.getElementById("createDefaultTable");
    btn.style.color = "grey";
    btn.onclick = null;
}

function vytvorTlacitkoAVlozHo(popisek, rodic){
    let tlacitko = document.createElement("button");
    tlacitko.textContent = popisek;
    rodic.appendChild(tlacitko);
    return tlacitko;
}

function vytvorTlacitka() {
    vytvorTlacitkoAVlozHo("Přidat řádek dolů", document.body).onclick = pridatRadekDolu;
    vytvorTlacitkoAVlozHo("Přidat řádek nahoru", document.body).onclick = pridatRadekNahoru;
    vytvorTlacitkoAVlozHo("Přidat sloupec vlevo", document.body).onclick = pridatSloupecVlevo;
    vytvorTlacitkoAVlozHo("Přidat sloupec vpravo", document.body).onclick = pridatSloupecVpravo;
    vytvorTlacitkoAVlozHo("Odstranit řádek", document.body).onclick = odstranitVybranyRadek;
    vytvorTlacitkoAVlozHo("Odstranit sloupec", document.body).onclick = odstranitVybranySloupec;

    vytvorTlacitkoAVlozHo("Přidej řádek nad vybranou buňku", document.body).onclick = pridejRadekNadAktivniBunku;
    vytvorTlacitkoAVlozHo("Přidej řádek pod vybranou buňku", document.body).onclick = pridejRadekPodAktivniBunku;
}

function vytvorRadek(borderColor) {
    let tableRow = document.createElement("tr");

    let pocetSloupcuVRadku = table.firstElementChild.childNodes.length;

    for (let i = 0; i < pocetSloupcuVRadku; i++){
        let cell = vytvorBunku();
        cell.style.borderColor = borderColor;
        tableRow.appendChild(cell);
    }
    return tableRow;
}

function pridatRadekDolu() {
    table.appendChild(vytvorRadek("blue"));
}

function pridatRadekNahoru() {
    table.insertBefore(vytvorRadek("red"), table.firstChild);
}

function indexRadkuAktivniBunky() {
    let seznamRadkuKProhledani = table.childNodes;
    let hledanyPrvek = aktivniBunka.parentElement.parentElement;
    return Array.prototype.indexOf.call(seznamRadkuKProhledani, hledanyPrvek);
}

function indexSloupceAktivniBunky() {
    let bunkyVRadku = aktivniBunka.parentElement.parentElement.childNodes;
    let td = aktivniBunka.parentElement;
    return Array.prototype.indexOf.call(bunkyVRadku, td);
}

function pridejRadekNadAktivniBunku() {
    let r = indexRadkuAktivniBunky();
    table.insertBefore(vytvorRadek("lightgreen"), table.childNodes[r]);
}

function pridejRadekPodAktivniBunku() {
    let r = indexRadkuAktivniBunky();
    let row = vytvorRadek("purple");

    if (table.lastChild === table.childNodes[r]){
        table.appendChild(row);
    }
    else{
        table.insertBefore(row, table.childNodes[r+1]);
    }
}

function pridatSloupecVlevo() {
    let s = indexSloupceAktivniBunky();
    let pocetRadku = table.childNodes.length;
    let makeCell = vytvorBunku;
    for(let i = 0; i < pocetRadku; i++){
        table.childNodes[i].insertBefore(makeCell(), table.childNodes[i].childNodes[s]);
    }
}

function pridatSloupecVpravo() {
    let s = indexSloupceAktivniBunky();
    let pocetRadku = table.childNodes.length;
    //let newCell = vytvorBunku(); // nemuzu pouzivat newCell, protoze pak v cyklu vsude pripinam jednu instanci bunky...
    // a to jaksi nefunguje, potrebuju vzdy vytvorit instanci novou.
    let newCell = function () {
        return vytvorBunku(); // takto uz to jde. V podstate tim docilim jen toho, ze resim tvorbu bunky z jednoho mista...
    };

    for(let i = 0; i < pocetRadku; i++){
        if(table.childNodes[i].childNodes[s] === table.childNodes[i].lastChild){
            table.childNodes[i].appendChild(newCell());
        }
        else{
            table.childNodes[i].insertBefore(newCell(), table.childNodes[i].childNodes[s+1]);
        }
    }
}

function odstranitVybranyRadek() {
    if (table.childNodes.length <= 1) {
        return; // v tabulce zustane nejmene jeden radek, jinak tabulka nevratne zanikne
    }
    let r = indexRadkuAktivniBunky();
    table.childNodes[r].remove();
    //table.removeChild(table.childNodes[r]); // alternativa?
}

function odstranitVybranySloupec() {
    let pocetSloupcu = table.firstChild.childNodes.length; // table.prvniRadek.poleSloupcu.pocetSloupcu
    if (pocetSloupcu <= 1) {
        return; // v tabulce zustane nejmene jeden sloupec, jinak tabulka nevratne zanikne
    }
    let s = indexSloupceAktivniBunky();
    let pocetRadku = table.childNodes.length;
    for (let i = 0; i < pocetRadku; i++) {
        table.childNodes[i].childNodes[s].remove();
    }
}