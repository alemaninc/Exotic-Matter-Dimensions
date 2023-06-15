"use strict";
var gameHalted = false
function halt() { // Terminates the game loop, used for debugging
	clearInterval(gameloop);
	clearInterval(fineGrainLoop);
	gameHalted = true
}
function notify(text,backgroundColor,textColor) {
	document.getElementById("notifyDiv").innerHTML = "<button style=\"background-color:"+backgroundColor+";color:"+textColor+";left:700px;cursor:pointer\" class=\"notification\" data-in=\""+Date.now()+"\" data-out=\""+(Date.now()+6000)+"\" onClick=\"this.dataset.out=Math.min(Date.now(),this.dataset.out)\">"+text+"</button><br>"+document.getElementById("notifyDiv").innerHTML
}
function error(text) {
	halt()
	popup({text:"Error: "+text+".<br>Please tell alemaninc about this.<br>A copy of your savefile has also been attached.",input:btoa(localStorage.getItem("save")),buttons:[]})
}
function countTo(x,from0=false) {
	return Array(x).fill(0).map((x,i)=>from0?i:(i+1))
}
function ranint(x,y,geo=false) {
	if (geo) return Math.floor(x*(y/x)**Math.random())
	else return Math.round(x+(y-x)*Math.random())
}
const base64 = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"]
function alemanicHash(message) {
	message=String(message)
	let out = Array(512).fill(0)
	for (let i=0;i<message.length;i++) {
		let code = message.charCodeAt(i)
		for (let j=0;j<512;j++) {
			out[j]+=Math.PI*code*(Math.sqrt(i)+Math.sqrt(j))
		}
	}
	for (let i=0;i<512;i++) {
		out[i]+=Math.sin(i)*512
		out[i]*=Math.cos(i)
		for (let j=1;j<512;j*=2) {
			if (i%(j*2)>=j) out[i]+=out[i-j]
			else out[i]-=out[i+j]
		}
	}
	return out.map(x => base64[Math.floor(Math.abs(x))%64]).join("")
}
const debug = {
	stats: function(){for(let i of statOrder){try{updateStat(i)}catch{console.log(i)}}}
}
function unbreak(str) {return str.replaceAll(" ","&nbsp;")}
function arrowJoin(a,b) {return a+"&nbsp;→&nbsp;"+b}