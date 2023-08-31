"use strict";
var initComplete = false
const version = {
	current:"𝕍1.3.23",
	nextUpdateHint:"Explore",
}
/*
	e event message
	s file url
	l line number
	c column number
	o error object
*/
var gameHalted = false
var showFormulas = false
const discordInvite = "https://discord.gg/aK6Bvwr2fw"
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
	popup({text:"Error: "+text+".<br>Please tell alemaninc about this.<br>A copy of your savefile has also been attached.<br><a href=\""+discordInvite+"\">Discord</a>",input:btoa(localStorage.getItem("save")),buttons:[]})
	error = function(){/* if multiple errors are thrown in a chain, only the first appears */}
}
const debug = {
	stats: function(){for(let i of statOrder){try{updateStat(i)}catch{console.log(i)}}},
	nextSecretAchievementRarity:function(){
		function countByRarity(x){return Object.values(secretAchievementList).filter(i=>i.rarity==x).length}
		let diffs = countTo(5).map(x=>countByRarity(x+1)/countByRarity(x+2))
		return diffs.indexOf(diffs.reduce((x,y)=>Math.max(x,y)))+3
	}
}
var savecounter=0;

function toggle(x) {
	g[x]=!g[x];
}
function multitoggle(variable,options) {
	g[variable]=options[(options.indexOf(g[variable])+1)%options.length];
}
/*
List of popup data attributes:
text				 the text that appears
input				an input field if this is applicable including a base value
buttons			an array of buttons
*/
function popup(data) {
	d.display("div_fancyPopupScreen","inline-block")
	d.innerHTML("span_fancyPopupText",data.text)
	if (data.input !== undefined) d.element("span_fancyPopupText").innerHTML += "<br><textarea id=\"span_fancyPopupInput\" style=\"width:90%;height:40%\">"+data.input+"</textarea>"
	d.innerHTML("span_fancyPopupButtons","")
	for (let i of (data.buttons??[["Close",""]])) d.element("span_fancyPopupButtons").innerHTML += "<button onClick=\"hidePopup();"+i[1]+"\" class=\"genericbutton\">"+i[0]+"</button>"
}
function hidePopup() {d.display('div_fancyPopupScreen','none')}
function popupInput() {return d.element("span_fancyPopupInput").value}
function functionError(functionName,argumentList) {error("Cannot access "+functionName+"("+Object.values(argumentList).map(x=>JSON.stringify(x)).join(",")+")")}
function textFormat(text,className){return "<span class=\"big "+className+"\">"+text+"</span>"}
function BEformat(value,precision=0) {return gformat(value,precision,g.notation).replaceAll(" ","&nbsp;");}
const c = deepFreeze({		 // c = "constant"
	...constant,
	dm16			: Decimal.FC_NN(-1,0,16),
	dm5				: Decimal.FC_NN(-1,0,5),
	dm2				: Decimal.FC_NN(-1,0,2),
	dm1				: Decimal.FC_NN(-1,0,1),
	dm0_5			: Decimal.FC_NN(-1,0,0.5),
	dm0_1			: Decimal.FC_NN(-1,0,0.1),
	dm0_03		: Decimal.FC_NN(-1,0,0.03),
	eme6			: Decimal.FC_NN(1,1,-1e6),
	em40			: Decimal.FC_NN(1,1,-40),
	em16			: Decimal.FC_NN(1,1,-16),
	em8				: Decimal.FC_NN(1,0,1e-8),
	em4				: Decimal.FC_NN(1,0,1e-4),
	d0_0004		: Decimal.FC_NN(1,0,4e-4),
	d7em4 		: Decimal.FC_NN(1,0,7e-4),
	d0_0009		: Decimal.FC_NN(1,0,9e-4),
	em3				: Decimal.FC_NN(1,0,1e-3),
	d0_001		: Decimal.FC_NN(1,0,1e-3),
	d0_003		: Decimal.FC_NN(1,0,3e-3),
	d0_005		: Decimal.FC_NN(1,0,5e-3),
	d0_009		: Decimal.FC_NN(1,0,9e-3),
	d0_01			: Decimal.FC_NN(1,0,0.01),
	d0_0175		: Decimal.FC_NN(1,0,0.0175),
	d0_02			: Decimal.FC_NN(1,0,0.02),
	d0_025		: Decimal.FC_NN(1,0,0.025),
	d0_03			: Decimal.FC_NN(1,0,0.03),
	d0_035		: Decimal.FC_NN(1,0,0.035),
	d0_04			: Decimal.FC_NN(1,0,0.04),
	d0_045		: Decimal.FC_NN(1,0,0.045),
	d0_05			: Decimal.FC_NN(1,0,0.05),
	d0_059		: Decimal.FC_NN(1,0,0.059),
	d0_07			: Decimal.FC_NN(1,0,0.07),
	d0_075		: Decimal.FC_NN(1,0,0.075),
	d0_0816		: Decimal.FC_NN(1,0,0.0816),
	d0_085		: Decimal.FC_NN(1,0,0.085),
	d0_1			: Decimal.FC_NN(1,0,0.1),
	d0_12			: Decimal.FC_NN(1,0,0.12),
	d0_15			: Decimal.FC_NN(1,0,0.15),
	d0_16			: Decimal.FC_NN(1,0,0.16),
	d0_18			: Decimal.FC_NN(1,0,0.18),
	d0_2			: Decimal.FC_NN(1,0,0.2),
	d0_24			: Decimal.FC_NN(1,0,0.24),
	d0_25			: Decimal.FC_NN(1,0,0.25),
	d0_3			: Decimal.FC_NN(1,0,0.3),
	sqrt0_1		: Decimal.FC_NN(1,0,0.31622776601683794),
	d0_33			: Decimal.FC_NN(1,0,0.33),
	d1div3		: Decimal.FC_NN(1,0,1/3),
	d0_4			: Decimal.FC_NN(1,0,0.4),
	d0_42			: Decimal.FC_NN(1,0,0.42),
	d0_45			: Decimal.FC_NN(1,0,0.45),
	d0_5			: Decimal.FC_NN(1,0,0.5),
	d0_6			: Decimal.FC_NN(1,0,0.6),
	d2div3		: Decimal.FC_NN(1,0,2/3),
	d0_7			: Decimal.FC_NN(1,0,0.7),
	d0_7248191884897692:Decimal.FC_NN(1,0,0.7248191884897692),
	d0_75			: Decimal.FC_NN(1,0,0.75),
	d0_8			: Decimal.FC_NN(1,0,0.8),
	d5div6		: Decimal.FC_NN(1,0,5/6),
	d0_9			: Decimal.FC_NN(1,0,0.9),
	d0_95			: Decimal.FC_NN(1,0,0.95),
	d0_99			: Decimal.FC_NN(1,0,0.99),
	d0_995		: Decimal.FC_NN(1,0,0.995),
	d0_999		: Decimal.FC_NN(1,0,0.999),
	d1_001		: Decimal.FC_NN(1,0,1.001),
	d1_002		: Decimal.FC_NN(1,0,1.002),
	d1_003		: Decimal.FC_NN(1,0,1.003),
	d1_004		: Decimal.FC_NN(1,0,1.004),
	d1_009		: Decimal.FC_NN(1,0,1.009),
	d1_01			: Decimal.FC_NN(1,0,1.01),
	d1_02			: Decimal.FC_NN(1,0,1.02),
	d1_025		: Decimal.FC_NN(1,0,1.025),
	d1_03			: Decimal.FC_NN(1,0,1.03),
	d1_04			: Decimal.FC_NN(1,0,1.04),
	d1_05			: Decimal.FC_NN(1,0,1.05),
	d1_06			: Decimal.FC_NN(1,0,1.06),
	d1_08			: Decimal.FC_NN(1,0,1.08),
	d1_1			: Decimal.FC_NN(1,0,1.1),
	d1_125		: Decimal.FC_NN(1,0,1.125),
	d1_15			: Decimal.FC_NN(1,0,1.15),
	d1_1907		: Decimal.FC_NN(1,0,1.1907),
	d1_2			: Decimal.FC_NN(1,0,1.2),
	d1_202		: Decimal.FC_NN(1,0,1.202),
	d1_25			: Decimal.FC_NN(1,0,1.25),
	d1_26			: Decimal.FC_NN(1,0,1.26),
	d1_3			: Decimal.FC_NN(1,0,1.3),
	d1_308		: Decimal.FC_NN(1,0,1.308),
	d1_337		: Decimal.FC_NN(1,0,1.337),
	d1_379654224:Decimal.FC_NN(1,0,1.379654224),
	d1_5			: Decimal.FC_NN(1,0,1.5),
	d1_75			: Decimal.FC_NN(1,0,1.75),
	d2_3			: Decimal.FC_NN(1,0,2.3),
	ln10			: Decimal.FC_NN(1,0,2.302585092994046),
	d2_5			: Decimal.FC_NN(1,0,2.5),
	d2_8			: Decimal.FC_NN(1,0,2.8),
	pi				: Decimal.FC_NN(1,0,3.1415926535897932),
	d3_3			: Decimal.FC_NN(1,0,3.3),
	d10div3		: Decimal.FC_NN(1,0,10/3),
	d4				: Decimal.FC_NN(1,0,4),
	d5				: Decimal.FC_NN(1,0,5),
	d5_5			: Decimal.FC_NN(1,0,5.5),
	d6				: Decimal.FC_NN(1,0,6),
	d7				: Decimal.FC_NN(1,0,7),
	d7_5			: Decimal.FC_NN(1,0,7.5),
	d8				: Decimal.FC_NN(1,0,8),
	d8_5			: Decimal.FC_NN(1,0,8.5),
	d9				: Decimal.FC_NN(1,0,9),
	d11				: Decimal.FC_NN(1,0,11),
	d12				: Decimal.FC_NN(1,0,12),
	d13				: Decimal.FC_NN(1,0,13),
	d14				: Decimal.FC_NN(1,0,14),
	d15				: Decimal.FC_NN(1,0,15),
	d16				: Decimal.FC_NN(1,0,16),
	d18				: Decimal.FC_NN(1,0,18),
	d20				: Decimal.FC_NN(1,0,20),
	d21				: Decimal.FC_NN(1,0,21),
	d22				: Decimal.FC_NN(1,0,22),
	d22_5			: Decimal.FC_NN(1,0,22.5),
	d25				: Decimal.FC_NN(1,0,25),
	d26				: Decimal.FC_NN(1,0,26),
	d27				: Decimal.FC_NN(1,0,27),
	d30				: Decimal.FC_NN(1,0,30),
	d32				: Decimal.FC_NN(1,0,32),
	d35				: Decimal.FC_NN(1,0,35),
	d36				: Decimal.FC_NN(1,0,36),
	d40				: Decimal.FC_NN(1,0,40),
	d45				: Decimal.FC_NN(1,0,45),
	d48				: Decimal.FC_NN(1,0,48),
	d49				: Decimal.FC_NN(1,0,49),
	d50				: Decimal.FC_NN(1,0,50),
	d52				: Decimal.FC_NN(1,0,52),
	d64				: Decimal.FC_NN(1,0,64),
	d70				: Decimal.FC_NN(1,0,70),
	d75				: Decimal.FC_NN(1,0,75),
	d80				: Decimal.FC_NN(1,0,80),
	d90				: Decimal.FC_NN(1,0,90),
	d99				: Decimal.FC_NN(1,0,99),
	d100			: Decimal.FC_NN(1,0,100),
	e2				: Decimal.FC_NN(1,0,100),
	d110			: Decimal.FC_NN(1,0,110),
	d120			: Decimal.FC_NN(1,0,120),
	d122			: Decimal.FC_NN(1,0,122),
	d125			: Decimal.FC_NN(1,0,125),
	d140			: Decimal.FC_NN(1,0,140),
	d150			: Decimal.FC_NN(1,0,150),
	d160			: Decimal.FC_NN(1,0,160),
	d180			: Decimal.FC_NN(1,0,180),
	d199			: Decimal.FC_NN(1,0,199),
	d200			: Decimal.FC_NN(1,0,200),
	d225			: Decimal.FC_NN(1,0,225),
	d250			: Decimal.FC_NN(1,0,250),
	d256			: Decimal.FC_NN(1,0,256),
	d275			: Decimal.FC_NN(1,0,275),
	d300			: Decimal.FC_NN(1,0,300),
	inflog		: Decimal.FC_NN(1,0,308.25471555991675),
	d320			: Decimal.FC_NN(1,0,320),
	d325			: Decimal.FC_NN(1,0,325),
	d350			: Decimal.FC_NN(1,0,350),
	d360			: Decimal.FC_NN(1,0,360),
	d400			: Decimal.FC_NN(1,0,400),
	d450			: Decimal.FC_NN(1,0,450),
	d480			: Decimal.FC_NN(1,0,480),
	d500			: Decimal.FC_NN(1,0,500),
	d512			: Decimal.FC_NN(1,0,512),
	d550			: Decimal.FC_NN(1,0,550),
	d600			: Decimal.FC_NN(1,0,600),
	d700			: Decimal.FC_NN(1,0,700),
	d750			: Decimal.FC_NN(1,0,750),
	d800			: Decimal.FC_NN(1,0,800),
	d900			: Decimal.FC_NN(1,0,900),
	d950			: Decimal.FC_NN(1,0,950),
	d1100			: Decimal.FC_NN(1,0,1100),
	d1500			: Decimal.FC_NN(1,0,1500),
	d1609_344	: Decimal.FC_NN(1,0,1609.344),
	d1800			: Decimal.FC_NN(1,0,1800),
	d2e3			: Decimal.FC_NN(1,0,2e3),
	d2350			: Decimal.FC_NN(1,0,2350),
	d4800			: Decimal.FC_NN(1,0,4800),
	d7e3			: Decimal.FC_NN(1,0,7e3),
	d8e3			: Decimal.FC_NN(1,0,8e3),
	d18000		: Decimal.FC_NN(1,0,18000),
	d44444		: Decimal.FC_NN(1,0,44444),
	d5e4			: Decimal.FC_NN(1,0,5e4),
	e5				: Decimal.FC_NN(1,0,1e5),
	d696342		: Decimal.FC_NN(1,0,696342),
	d1_5e6		: Decimal.FC_NN(1,0,1.5e6),
	e7				: Decimal.FC_NN(1,0,1e7),
	d2e7			: Decimal.FC_NN(1,0,2e7),
	d5e7			: Decimal.FC_NN(1,0,5e7),
	e8				: Decimal.FC_NN(1,0,1e8),
	d2e8			: Decimal.FC_NN(1,0,2e8),
	d2pow31		: Decimal.FC_NN(1,0,2147483648),
	d3155692599:Decimal.FC_NN(1,0,3155692599),
	d3_3333e9	: Decimal.FC_NN(1,0,3.3333e9),
	d4_5e10		: Decimal.FC_NN(1,0,4.5e10),
	e11				: Decimal.FC_NN(1,0,1e11),
	d5e11			: Decimal.FC_NN(1,0,5e11),
	e12				: Decimal.FC_NN(1,0,1e12),
	e14				: Decimal.FC_NN(1,0,1e14),
	e15				: Decimal.FC_NN(1,0,1e15),
	d9e15			: Decimal.FC_NN(1,1,15.954242509439325),
	e16				: Decimal.FC_NN(1,1,16),
	d1_5e16		: Decimal.FC_NN(1,1,16.17609125905568),
	e18				: Decimal.FC_NN(1,1,18),
	d5e18			: Decimal.FC_NN(1,1,18.69897000433602),
	e20				: Decimal.FC_NN(1,1,20),
	e24				: Decimal.FC_NN(1,1,24),
	e25				: Decimal.FC_NN(1,1,25),
	e30				: Decimal.FC_NN(1,1,30),
	e43				: Decimal.FC_NN(1,1,43),
	e45				: Decimal.FC_NN(1,1,45),
	e50				: Decimal.FC_NN(1,1,50),
	e60				: Decimal.FC_NN(1,1,60),
	d1_5e61		: Decimal.FC_NN(1,1,61.17609125905568),
	e64				: Decimal.FC_NN(1,1,64),
	d2_1e67		: Decimal.FC_NN(1,1,67.32221929473391),
	e75				: Decimal.FC_NN(1,1,75),
	e80				: Decimal.FC_NN(1,1,80),
	e96				: Decimal.FC_NN(1,1,96),
	d9_999e99	: Decimal.FC_NN(1,1,99.9999565683802),
	e100			: Decimal.FC_NN(1,1,100),
	e115			: Decimal.FC_NN(1,1,115),
	e130			: Decimal.FC_NN(1,1,130),
	e140			: Decimal.FC_NN(1,1,140),
	e175			: Decimal.FC_NN(1,1,175),
	e180			: Decimal.FC_NN(1,1,180),
	d2_2222e222:Decimal.FC_NN(1,1,222.34678314325814),
	e270			: Decimal.FC_NN(1,1,270),
	inf				: Decimal.FC_NN(1,1,308.25471555991675), // 1.8e308
	ee3				: Decimal.FC_NN(1,1,1e3),
	e44031		: Decimal.FC_NN(1,1,44031),
	e2e5			: Decimal.FC_NN(1,1,2e5),
	e5e5			: Decimal.FC_NN(1,1,5e5),
	ee6				: Decimal.FC_NN(1,1,1e6),
	e1_5e6		: Decimal.FC_NN(1,1,1.5e6),
	ee7				: Decimal.FC_NN(1,1,1e7),
	ee8				: Decimal.FC_NN(1,1,1e8),
	ee9				: Decimal.FC_NN(1,1,1e9),
	ee10			: Decimal.FC_NN(1,1,1e10),
	ee12			: Decimal.FC_NN(1,1,1e12),
	ee15			: Decimal.FC_NN(1,1,1e15),
	ee16			: Decimal.FC_NN(1,2,16),
	ee100			: Decimal.FC_NN(1,2,100),
});
function percentOrMult(num,precision=2,classname) {
	let number,sign
	if (num.lte(c.d0_1)) {
		number=num.recip().noLeadFormat(precision)
		sign="÷"
	} else if (num.gte(c.d10)) {
		number=num.noLeadFormat(precision)
		sign="×"
	} else {
		number=(num.gte(c.d1)?"+":"")+num.sub(c.d1).mul(c.e2).noLeadFormat(precision)
		sign="%"
	}
	if (typeof classname == "string") return "<span class\""+classname+"\">"+number+"</span>"+sign
	return number+sign
}
function formulaFormat(str) {return unbreak("<i>"+str+"</i>")}
formulaFormat.bracketize = function(str) {
	let out = (str.search(" ")==-1)?str:("("+str+")")
	while (out.substring(0,2)=="(("&&out.substring(out.length-2)=="))") out = out.substring(1,out.length-1)
	return out
}
formulaFormat.add = function(v,p=3) {return v.gt(c.d0)?(" + "+v.noLeadFormat(p)):v.lt(c.d0)?(" - "+v.neg().noLeadFormat(p)):""}
formulaFormat.mult = function(v,p=3) {return v.gt(c.d1)?(" × "+v.noLeadFormat(p)):v.lt(c.d1)?(" ÷ "+v.recip().noLeadFormat(p)):""}
formulaFormat.exp = function(v,analog=false,p=3) {return v.eq(c.d1)?"":analog?(" ^ "+v.noLeadFormat(p)):("<sup>"+v.noLeadFormat(p)+"</sup>")}
formulaFormat.linSoftcap = function(value,start,power,condition,analog) {
	if (!condition) return value
	return formulaFormat.bracketize("("+formulaFormat.bracketize(value)+formulaFormat.mult(power.add(c.d1).div(start))+formulaFormat.add(power.neg())+")"+formulaFormat.exp(power.add(c.d1).recip(),analog)+formulaFormat.mult(start))
}
formulaFormat.logSoftcap = function(value,start,power,condition,analog) {   // string of value, start, power, condition for softcap (cannot check automatically due to v being the calculation)
	if (!condition) return value
	return formulaFormat.bracketize("(ln("+formulaFormat.bracketize(value)+formulaFormat.mult(start.recip())+")"+formulaFormat.mult(power)+" + 1)"+formulaFormat.exp(power.recip(),analog)+formulaFormat.mult(start))
}
formulaFormat.convSoftcap = function(value,start,limit,condition,analog) {
	if (!condition) return value
	return formulaFormat.bracketize(limit.noLeadFormat(3)+" - "+limit.sub(start).pow(c.d2).noLeadFormat(3)+" ÷ "+formulaFormat.bracketize(value+formulaFormat.add(limit.sub(start.mul(c.d2)))))
}
formulaFormat.expScaling = function(value,start,power,condition,analog) {
	if (!condition) return value
	return formulaFormat.bracketize("e<sup>("+formulaFormat.bracketize(formulaFormat.bracketize(value)+formulaFormat.mult(start.recip()))+formulaFormat.exp(power,analog)+" - 1)"+formulaFormat.mult(power.recip())+"</sup>"+formulaFormat.mult(start))
}