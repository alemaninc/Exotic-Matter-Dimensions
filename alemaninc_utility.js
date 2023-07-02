"use strict";
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
function unbreak(str) {return str.replaceAll(" ","&nbsp;")}
function arrowJoin(a,b) {return a+"&nbsp;→&nbsp;"+b}
Object.defineProperty(Array.prototype,"remove",{
  value:function remove(item){
    let out = this
    out.splice(this.indexOf(item),1)
    return out
  }
})
Object.defineProperty(Array,"random",{
	value: function random(array) {
		return array[Math.floor(Math.random()*array.length)];
	}
});
Object.defineProperty(Array,"equal",{
	value: function equal(a,b) {
		return a.every(item => b.includes(item)) && b.every(item => a.includes(item));
	}
});
Object.defineProperty(Array.prototype,"joinWithAnd",{
	value: function joinWithAnd(delimiter=",") {
		if (this.length<3) return this.join(" and ");
		let arr = structuredClone(this)
		let out = arr.splice(0,1);
		while (arr.length>1) out+=delimiter+" "+arr.splice(0,1);
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
		return this.shuffle().slice(0,num)
	}
})
Object.defineProperty(Array.prototype,"sum",{value:function sum() {
	return this.reduce((x,y)=>x+y)
}})
Object.defineProperty(Array.prototype,"product",{value:function product() {
	return this.reduce((x,y)=>x*y)
}})
Object.defineProperty(Array,"removeDuplicates",{value:function removeDuplicates(x) {
	return Array.from(new Set(x))
}})
Object.defineProperty(JSON,"valid",{
	value: function isJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
});
function deHTML(str) {
	if ((str===null) || (str===''))
			return false;
	else
			str = str.toString();
				
	// Regular expression to identify HTML tags in
	// the input string. Replacing the identified
	// HTML tag with a null string.
	return str.replace( /(<([^>]+)>)/ig, '');
}