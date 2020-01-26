/*
window.onload = function() {
	let tlacitko = document.getElementById("tlacitko");
	let cislo1 = document.getElementById("cislo1");
	let cislo2 = document.getElementById("cislo2");
			
	tlacitko.onclick = function() {
		alert(parseInt(cislo1.value) + parseInt(cislo2.value));
	};
}*/
// funcke (callback?? event??)
// zavola se pri stisku tlacitka. Odecte z formularovych poli <input> text, prevede jej na cislo a provede soucet
// proc to nefunguje?
function onComputeClick(){
	let a = document.getElementById("cislo1");
	let b = document.getElementById("cislo2");

	alert(parseInt(a.value) + parseInt(b.value));
}

window.onload = function() {
	let btn = document.getElementById("tlacitko");

	btn.onclick = function () {
		onComputeClick();
	}
};
