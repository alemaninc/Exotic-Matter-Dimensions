"use strict";
// Returns an array with the integers from 1 to x: for example, countTo(4) = [1,2,3,4]
function countTo(x,from0=false) {
	return Array(x).fill(0).map((x,i)=>from0?i:(i+1))
}
function ranint(x,y,geo=false) {
	if (geo) return Math.round(x*(y/x)**Math.random())
	else return Math.round(x+(y-x)*Math.random())
}
const base64 = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"]
function alemanicHash(message,length=512) {
	message=String(message)
	let out = Array(length).fill(0)
	for (let i=0;i<message.length;i++) {
		let code = message.charCodeAt(i)
		for (let j=0;j<length;j++) {
			out[j]+=Math.PI*code*(Math.sqrt(i)+Math.sqrt(j))
		}
	}
	for (let i=0;i<length;i++) {
		out[i]+=Math.sin(i)*length
		out[i]*=Math.cos(i)
		for (let j=1;j<length;j*=2) {
			if (i%(j*2)>=j) out[i]+=out[i-j]
			else out[i]-=out[i+j]
		}
	}
	return out.map(x => base64[Math.floor(Math.abs(x))%64]).join("")
}
function unbreak(str) {
	let inTag = false // prevent targeting inside HTML tags
	let out = ""
	for (let i of str.split("")) {
		if (i==="<") {inTag=true}
		else if (i===">") {inTag=false}
		if (i===" "&&(!inTag)) {out+="&nbsp;"}
		else {out+=i}
	}
	return "<span style=\"white-space:nowrap\">"+out+"</span>"
}
function arrowJoin(a,b) {return a+"&nbsp;→&nbsp;"+b}
Object.defineProperty(Array.prototype,"remove",{
  value:function remove(item){
		if (!this.includes(item)) {return this}
    let out = this
    out.splice(this.indexOf(item),1)
    return out
  }
})
Object.defineProperty(Array,"random",{value:function random(array){return array[Math.floor(Math.random()*array.length)]}})
Object.defineProperty(Array,"weightedRandom",{value:function weightedRandom(array) {
	let max = array.map(x=>x[1]).reduce((x,y)=>Math.max(x,y))
	let out = []
	for (let i of array) if (Math.random()*max<i[1]) out.push(i[0])
	return Array.random(out)
}})
Object.defineProperty(Array,"equal",{
	value:function equal(a,b) {
		return a.every(item => b.includes(item)) && b.every(item => a.includes(item));
	}
});
Object.defineProperty(Array.prototype,"joinWithAnd",{
	value: function joinWithAnd(delimiter=", ") {
		if (this.length<3) return this.join(" and ");
		let arr = structuredClone(this)
		let out = arr.splice(0,1);
		while (arr.length>1) out+=delimiter+arr.splice(0,1);
		out+=" and "+arr[0];
		return out;
	}
})
Object.defineProperty(Array.prototype,"shuffle",{
	value:function shuffle() {
		let numbers = countTo(this.length,true)
		let out = []
		while (numbers.length>0) {out.push(this[numbers.splice(Math.floor(Math.random()*numbers.length),1)])}
		return out
	}
})
Object.defineProperty(Array.prototype,"random",{
	value:function random(){
		return this[Math.floor(Math.random()*this.length)]
	}
})
Object.defineProperty(Array.prototype,"select",{
	value:function select(num=1){
		let numbers = countTo(this.length,true)
		let out = []
		for (let i=0;i<Math.min(this.length,num);i++) {out.push(this[numbers.splice(Math.floor(Math.random()*numbers.length),1)])}
		return out
	}
})
Object.defineProperty(Array.prototype,"sum",{value:function sum() {
	return this.reduce((x,y)=>x+y,0)
}})
Object.defineProperty(Array.prototype,"product",{value:function product() {
	return this.reduce((x,y)=>x*y,1)
}})
Object.defineProperty(Array,"removeDuplicates",{value:function removeDuplicates(x) {
	return Array.from(new Set(x))
}})
Object.defineProperty(JSON,"valid",{
	value:function isJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
});
function deHTML(str) {
	if (typeof str !== "string")
			throw "Cannot access deHTML("+JSON.stringify(str)+")"
	else
			str = str.toString();
				
	// Regular expression to identify HTML tags in
	// the input string. Replacing the identified
	// HTML tag with a null string.
	return str.replace( /(<([^>]+)>)/ig, '');
}
function roman(number) { // generates a roman numeral. Monospace fonts are recommended for implementations involving numbers greater than 4999.
	if (number>=5e9) throw "roman() does not support inputs greater than 5,000,000,000";
	if (number<=0) throw "roman() does not support 0 or negative inputs";
	if (number%1!==0) throw "roman() does not support fractional inputs";
	let symbols = [
		["","I","II","III","IV","V","VI","VII","VIII","IX"],	 // e0 unit
		["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],	 // e1 unit
		["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],	 // e2 unit
		["","M","MM","MMM","MMMM","V̅","V̅I̅","V̅I̅I̅","V̅I̅I̅I̅","I̅X̅"], // e3 unit
		["","X̅","X̅X̅","X̅X̅X̅","X̅L̅","L̅","L̅X̅","L̅X̅X̅","L̅X̅X̅X̅","X̅C̅"],	 // e4 unit
		["","C̅","C̅C̅","C̅C̅C̅","C̅D̅","D̅","D̅C̅","D̅C̅C̅","D̅C̅C̅C̅","C̅M̅"],	 // e5 unit
		["","M̅","M̅M̅","M̅M̅M̅","M̅M̅M̅M̅","V̅̅","V̅̅I̅̅","V̅̅I̅̅I̅̅","V̅̅I̅̅I̅̅I̅̅","I̅̅X̅̅"], // e6 unit
		["","X̅̅","X̅̅X̅̅","X̅̅X̅̅X̅̅","X̅̅L̅̅","L̅̅","L̅̅X̅̅","L̅̅X̅̅X̅̅","L̅̅X̅̅X̅̅X̅̅","X̅̅C̅̅"],	 // e7 unit
		["","C̅̅","C̅̅C̅̅","C̅̅C̅̅C̅̅","C̅̅D̅̅","D̅̅","D̅̅C̅̅","D̅̅C̅̅C̅̅","D̅̅C̅̅C̅̅C̅̅","C̅̅M̅̅"],	 // e8 unit
		["","M̅̅","M̅̅M̅̅","M̅̅M̅̅M̅̅","M̅̅M̅̅M̅̅M̅̅"]														 // e9 unit
	];
	let out = "";
	for (let i=Math.floor(Math.log10(number));i>=0;i--) {
		out+=symbols[i][Math.floor(number/10**i)];
		number-=10**i*Math.floor(number/10**i);
	}
	return out;
}
function dictionary(key,dict) {
	if ((typeof dict) !== "object") {functionCrash("dictionary",arguments)}
	return dict[key]
}
function halfFunction(x) {
	return (typeof x === "function")?x():x;
}
function numword(num,precision=3) {
	if (num===0) return "zero"
	let out = (num>0?"":"minus ")
	num=Math.abs(num)
	let illionOut = []
	for (let illion=101;illion>-2;illion--) {
		let illionValue = 1e3**(illion+1)
		let amount = Math.floor(num/illionValue)
		if (amount>0) {
			illionOut.push(numword.smallInteger(amount)+(illion===-1?"":(" "+numword.illionsDictionary[illion])))
			num -= amount*illionValue
		}
	}
	out += (illionOut[illionOut.length-1].includes("and"))?illionOut.join(", "):illionOut.joinWithAnd()
	if (num%1!==0&&precision>0) {
		let decimals = String(num.toFixed(precision)).slice(2).split("")
		while (decimals[decimals.length-1]==="0") decimals.splice(decimals.length-1)
		out+=" point "+decimals.map(x=>["zero","one","two","three","four","five","six","seven","eight","nine"][x]).join(" ")
	}
	return out
}
numword.illionsDictionary = ["thousand",...["m","b","tr","quadr","quint","sext","sept","oct","non"].map(x=>x+"illion"),...(()=>{
	let out = []
	for (let i=0;i<92;i++) out.push(["","un","duo","tre","quattuor","quin","sex","septem","octo","novem"][i%10]+["dec","vigint","trigint","quadragint","quinquagint","sexagint","septuagint","octogint","nonagint","cent"][Math.floor(i/10)]+"illion")
	return out
})()]
numword.smallInteger = function(x) { // for 1-99
	let smallIntOutput = ""
	if (x>99) {
		smallIntOutput = ["one","two","three","four","five","six","seven","eight","nine"][Math.floor(x/100-1)]+" hundred"+(x%100===0?"":" and ")
		x=x%100
	}
	if (x>19) {
		smallIntOutput += ["twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"][Math.floor(x/10)-2]
		if (x%10>0) smallIntOutput += "-"+["one","two","three","four","five","six","seven","eight","nine"][x%10-1]
	} else if (x>0) {
		smallIntOutput += ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"][x-1]
	}
	return smallIntOutput
}
function pluralize(num,word,plural=word+"s") {
	if (num===1) return "one "+word
	return numword(num)+" "+plural
}
function lookupGetter(x,y){
	return String(Object.getOwnPropertyDescriptor(x,y).get)
}
function capitalize(str) {return str.charAt(0).toUpperCase()+str.substring(1)}
function toTitleCase(str) {return str.split(" ").map(x=>capitalize(x)).join(" ")}
function ordinal(num){return num+(((num%10===1)&&(num%100!==11))?"st":((num%10===2)&&(num%100!==12))?"nd":((num%10===3)&&(num%100!==13))?"rd":"th")}
const d = {		// d for "document"
	element(elem) {
		if (typeof elem === "object") return elem;		// if input is already an element
		return document.getElementById(elem);				// if input is an id. Both retrieve an element, this is error detection.
	},
	innerHTML(element,value) {
		d.element(element).innerHTML = value;						// sets the innerHTML of an element
	},
	display(element, value) {
		d.element(element).style.display = value;				// sets the display mode of an element
	},
	/*
	1 element: class name
	2 elements: id, value
	*/
	class() {
		if (arguments.length===1) return document.getElementsByClassName(arguments[0]);	 // gets elements by class name
		if (arguments.length===2) d.element(arguments[0]).className = arguments[1];			 // sets the class of an element
	},
	tr(id,state) {
		if (state) d.element(id).removeAttribute("hidden");				// shows and hides table rows
		else d.element(id).setAttribute("hidden","hidden");
	}
};
function hexToRGB(color) {return "rgb("+[parseInt(color.substring(1,3),16),parseInt(color.substring(3,5),16),parseInt(color.substring(5,7),16)].join(",")+")"}
function blackOrWhiteContrast(color) {
	let rgb = color.replaceAll(/[^0-9|,|.]/g,"").split(",").map(x=>Number(x))
	let sum = Math.round((rgb[0] * 0.299) + (rgb[1] * 0.587) + (rgb[2] * 0.114));
	return (sum >= 128)?"#000000":"#ffffff";
}
function viewportHeight(){return window.innerHeight}
function viewportWidth(){return window.innerWidth}
const viewportDiagonalLength = Math.sqrt(viewportHeight()**2+viewportWidth()**2)
function tableGenerator(array,tableStyle="",trStyle=tableStyle,tdStyle=trStyle,headers=true) {return "<table style=\""+tableStyle+"\">"+array.map((row,rowNum)=>"<tr style=\""+trStyle+"\">"+row.map(col=>"<t"+((headers&&(rowNum===0))?"h":"d")+" style=\""+tdStyle+"\">"+col+"</td>").join("")+"</tr>").join("")+"</table>"}
function checkTypo(str1,str2){
	let diff = 0
	let f1 = checkTypo.wordFreq(str1)
	let f2 = checkTypo.wordFreq(str2)
	for (let i of Array.removeDuplicates([Object.keys(f1),Object.keys(f2)].flat())) diff += Math.abs((f1[i]??0)-(f2[i]??0))
	return diff
}
checkTypo.wordFreq = function(str){
	let out = {}
	for (let i of stringSimplify(str).split("")) {
		if (out[i]===undefined) out[i]=0
		out[i]++
	}
	return out
}
function primeFactors(num) {
	num = BigInt(num)
	let primes=[]
	let divisor=2n	// Divisor starts at 2, otherwise the program would divide by 1 repeatedly
	while ((num > 1n) && (divisor * divisor <= num)) {
		if (num % divisor === 0n) {
			num /= divisor
			primes.push(divisor)
		} else {
			divisor++
		}
	}
	if (num>1n) {  // This is so that 1 isn't listed as a factor
		primes.push(num)
	}
	return primes
}
var body = document.body
var html = document.documentElement
function pageHeight() {return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)}
function pageWidth() {return Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)}
function scrollX() {return Math.max(body.scrollLeft,html.scrollLeft)}
function scrollY() {return Math.max(body.scrollTop,html.scrollTop)}
const wordShift = {
	predictableRandom:function(x) {
		let start = Math.pow(x % 97, 4.3) * 232344573;
		const a = 15485863;
		const b = 521791;
		start = (start * a) % b;
		for (let i = 0; i < (x * x) % 90 + 90; i++) {start = (start * a) % b;}
		return start / b;
	},
	randomSymbol:function(){return String.fromCharCode(ranint(161,255))},
	wordCycle(list, noBuffer = false) {
    const len = list.length;
    const tick = Math.floor(Date.now() / 250) % (len * 5);
    const mod5 = ((Date.now() / 250) % (len * 5)) % 5;
    const largeTick = Math.floor(tick / 5);
    let v = list[largeTick];
    // Blend with adjacent words, in such a way that mod5 being 0 or 5 corresponds with a 0.5 blend parameter
    if (mod5 < 0.6) {v = this.blendWords(list[(largeTick + list.length - 1) % list.length], list[largeTick], (mod5 + 0.6) / 1.2);}
		else if (mod5 > 4.4) {v = this.blendWords(list[largeTick], list[(largeTick + 1) % list.length], (mod5 - 4.4) / 1.2);}
    v = this.randomCrossWords(v, 0.1 * Math.pow(mod5 - 2.5, 4) - 0.6);
    if (noBuffer) return v;
    const maxWordLen = Math.max(...list.map(x => x.length));
    const bufferSpace = (maxWordLen - v.length) / 2;
    // Buffer the result with ALT+255 on either side to prevent the ui from twitching.
    // Spaces do not work due to being automatically collapsed, and css fixing this causes other issues.
    return " ".repeat(Math.ceil(bufferSpace)) + v + " ".repeat(Math.floor(bufferSpace));
  },
  // Note that while frac may appear to specify the proportion of letters randomized, it may end up being slightly less
  // depending on the specific string length and random output sometimes giving outputs which aren't coprime
  randomCrossWords(str, frac = 0.7) {
    if (frac <= 0) return str;
    const x = str.split("");
    for (let i = 0; i < x.length * frac; i++) {
      const randomIndex = Math.floor(this.predictableRandom(Math.floor(Date.now() / 500) % 964372 + 1.618 * i) * x.length);
      x[randomIndex] = this.randomSymbol();
    }
    return x.join("");
  },
  // This should only be used on words which will end up being completely randomized, because the unscrambled appearance
  // of the output may look bad. Blends two strings together to produce a string of intermediate length, taking a
  // specifed fraction (param, 0 to 1) from the first word and the rest (1 - param) from the second
  blendWords(first, second, param) {
    if (param <= 0) return first;
    if (param >= 1) return second;
    return first.substring(0, first.length * (1 - param)) + second.substring(second.length * (1 - param), second.length);
  }
}
function gradientText(text,gradient) {return "<span style=\"background:"+gradient+";-webkit-background-clip:text;-webkit-text-fill-color:transparent;\">"+text+"</span>"}
function reverseChildren(parent){parent.append(...Array.from(parent.childNodes).reverse())}
function alignTooltip(tooltip,parent) {
	let rect = d.element(parent).getBoundingClientRect()
	if ((rect.top===0)&&(rect.left===0)) { // the element has become invisible
		d.element(tooltip).visibility = "hidden"
		return
	}
	let elemX = (rect.left+rect.right)/2
	let elemY = (rect.top+rect.bottom)/2
	let rightAlign = (viewportWidth()<elemX*2)
	let bottomAlign = (viewportHeight()<elemY*2)
	let position = {top:"",bottom:"",left:"",right:""}
	position[rightAlign?"right":"left"] = (rightAlign?(viewportWidth()-rect.left+4):(rect.right+4))+"px"
	position[bottomAlign?"bottom":"top"] = (bottomAlign?(viewportHeight()-rect.top+4):(rect.bottom+4))+"px"
	let info = d.element(tooltip).style
	for (let i of Object.keys(position)) info[i] = position[i]
}