"use strict";
const version = {
	current:"𝕍1.2.9",
	nextUpdateHint:"Hevipelle should trademark"
}
var gameHalted = false
function halt() { // Terminates the game loop, used for debugging
	clearInterval(gameloop);
	clearInterval(fineGrainLoop);
	gameHalted = true
}
function notify(text,backgroundColor="#"+Math.floor(Math.random()*16777216).toString(16).padStart(6,"0"),textColor=blackOrWhiteContrast(backgroundColor)) {
	document.getElementById("notifyDiv").innerHTML = "<button style=\"background-color:"+backgroundColor+";color:"+textColor+";left:700px;cursor:pointer\" class=\"notification\" data-in=\""+Date.now()+"\" data-out=\""+(Date.now()+6000)+"\" onClick=\"this.dataset.out=Math.min(Date.now(),this.dataset.out)\">"+text+"</button><br>"+document.getElementById("notifyDiv").innerHTML
}
function error(text) {
	halt()
	popup({text:"Error: "+text+".<br>Please tell alemaninc about this.<br>A copy of your savefile has also been attached.",input:btoa(localStorage.getItem("save")),buttons:[]})
}
const debug = {
	stats: function(){for(let i of statOrder){try{updateStat(i)}catch{console.log(i)}}}
}
var savecounter=0;

function toggle(x) {
	g[x]=!g[x];
}
function multitoggle(variable,options) {
	g[variable]=options[(options.indexOf(g[variable])+1)%options.length];
}