"use strict";
const mainStatistics = [
	{
		name:"Time played",
		value:function(){return timeFormat(g.timePlayed);},
		condition:function(){return true;}
	},{
		name:"Time played accounting for tickspeed",
		value:function(){return timeFormat(g.truetimePlayed);},
		condition:function(){return Decimal.neq(g.timePlayed,g.truetimePlayed);}
	},{
		name:"Total exotic matter produced",
		value:function(){return g.totalexoticmatter.format(0);},
		condition:function(){return true;}
	},{
		name:"Total stardust produced",
		value:function(){return g.totalstardust.format(0);},
		condition:function(){return unlocked("Stardust")}
	},{
		name:"Total Hawking radiation produced",
		value:function(){return g.totalhawkingradiation.format(0);},
		condition:function(){return unlocked("Hawking Radiation")}
	},{
		name:"Time in this Stardust reset",
		value:function(){return timeFormat(g.timeThisStardustReset);},
		condition:function(){return unlocked("Stardust");}
	},{
		name:"Time this Stardust reset accounting for tickspeed",
		value:function(){return timeFormat(g.truetimeThisStardustReset);},
		condition:function(){return Decimal.neq(g.timeThisStardustReset,g.truetimeThisStardustReset)&&unlocked("Stardust");}
	},{
		name:"Exotic matter produced in this Stardust reset",
		value:function(){return g.exoticmatterThisStardustReset.format(0);},
		condition:function(){return unlocked("Stardust");}
	},{
		name:"Fastest Stardust reset",
		value:function(){return timeFormat(g.fastestStardustReset);},
		condition:function(){return g.fastestStardustReset.neq(c.d9e15);}
	},{
		name:"Time in this Wormhole reset",
		value:function(){return timeFormat(g.timeThisWormholeReset);},
		condition:function(){return unlocked("Hawking Radiation");}
	},{
		name:"Time this Wormhole reset accounting for tickspeed",
		value:function(){return timeFormat(g.truetimeThisWormholeReset);},
		condition:function(){return Decimal.neq(g.timeThisWormholeReset,g.truetimeThisWormholeReset)&&unlocked("Hawking Radiation");}
	},{
		name:"Exotic matter produced in this Wormhole reset",
		value:function(){return g.exoticmatterThisWormholeReset.format(0);},
		condition:function(){return unlocked("Hawking Radiation");}
	},{
		name:"Stardust produced in this Wormhole reset",
		value:function(){return g.stardustThisWormholeReset.format(0);},
		condition:function(){return unlocked("Hawking Radiation")}
	},{
		name:"Fastest Wormhole reset",
		value:function(){return timeFormat(g.fastestWormholeReset);},
		condition:function(){return g.fastestWormholeReset.neq(c.d9e15);}
	},{
		name:"Achievements earned",
		value:function(){return totalAchievements+(totalSecretAchievements===0?"":(" (+ "+totalSecretAchievements+" secret)"));},
		condition:function(){return totalAchievements+totalSecretAchievements>0;}
	}
];

const hiddenStatistics = [
	{
		name:"Axis Autobuyer Upgrades",
		value:function(){return g.axisAutobuyerUpgrades+" / "+autobuyerMeta.cap("axis")},
		condition:function(){return g.axisAutobuyerUpgrades>0;}
	},{
		name:"Dark Axis Autobuyer Upgrades",
		value:function(){return g.darkAxisAutobuyerUpgrades+" / "+autobuyerMeta.cap("darkAxis")},
		condition:function(){return g.darkAxisAutobuyerUpgrades>0;}
	},{
		name:"Stardust Upgrade Autobuyer Upgrades",
		value:function(){return g.stardustUpgradeAutobuyerUpgrades+" / "+autobuyerMeta.cap("stardustUpgrade")},
		condition:function(){return g.stardustUpgradeAutobuyerUpgrades>0;}
	},{
		name:"Star Autobuyer Upgrades",
		value:function(){return g.starAutobuyerUpgrades+" / "+autobuyerMeta.cap("star")},
		condition:function(){return g.starAutobuyerUpgrades>0;}
	},{
		name:"Delta Time",
		value:function(){return "Production loop: "+(deltatime*1e3)+"ms<br>Fine grained HTML loop: "+fineGrainDelta+"ms";},
		condition:function(){return true;}
	},{
		name:"Stardust Resets",
		value:function(){return BEformat(N(g.TotalStardustResets))+" total, "+BEformat(N(g.StardustResets))+" with reward";},
		condition:function(){return unlocked("Stardust");}
	},{
		name:"Wormhole Resets",
		value:function(){return BEformat(N(g.TotalWormholeResets))+" total, "+BEformat(N(g.WormholeResets))+" with reward";},
		condition:function(){return unlocked("Hawking Radiation");}
	},{
		name:"Total Normal Axis",
		value:function(){return stat.totalNormalAxis.format();},
		condition:function(){return true;}
	},{
		name:"Total Dark Axis",
		value:function(){return stat.totalDarkAxis.format();},
		condition:function(){return unlocked("Dark Matter");}
	},{
		name:"Total Anti-Axis",
		value:function(){return stat.totalAntiAxis.format();},
		condition:function(){return unlocked("Antimatter");}
	},{
		name:"Total Axis (all types)",
		value:function(){return stat.totalAxis.format();},
		condition:function(){return unlocked("Dark Matter");}
	},{
		name:"Normal Axis Scaling",
		value:function(){return "start "+stat.axisScalingStart.noLeadFormat(2)+", power "+stat.axisScalingPower.mul(c.e2).noLeadFormat(4)+"%"},
		condition:function(){return axisCodes.map(x=>g[x+"Axis"]).reduce((x,y)=>x.max(y)).gt(stat.axisScalingStart)}
	},{
		name:"Normal Axis Superscaling",
		value:function(){return "start "+stat.axisSuperscalingStart.noLeadFormat(2)+", power "+stat.axisSuperscalingPower.mul(c.e2).noLeadFormat(4)+"%"},
		condition:function(){return axisCodes.map(x=>g[x+"Axis"]).reduce((x,y)=>x.max(y)).gt(stat.axisSuperscalingStart)}
	},{
		name:"Dark Axis Scaling",
		value:function(){return "start "+stat.darkAxisScalingStart.noLeadFormat(2)+", power "+stat.darkAxisScalingPower.mul(c.e2).noLeadFormat(4)+"%"},
		condition:function(){return axisCodes.map(x=>g["dark"+x+"Axis"]).reduce((x,y)=>x.max(y)).gt(stat.darkAxisScalingStart)}
	},{
		name:"Dark Axis Superscaling",
		value:function(){return "start "+stat.darkAxisSuperscalingStart.noLeadFormat(2)+", power "+stat.darkAxisSuperscalingPower.mul(c.e2).noLeadFormat(4)+"%"},
		condition:function(){return axisCodes.map(x=>g["dark"+x+"Axis"]).reduce((x,y)=>x.max(y)).gt(stat.darkAxisSuperscalingStart)}
	},{
		name:"Anti-Axis Scaling",
		value:function(){return "start "+stat.antiAxisScalingStart.noLeadFormat(2)+", power "+stat.antiAxisScalingPower.mul(c.e2).noLeadFormat(4)+"%"},
		condition:function(){return axisCodes.map(x=>g["anti"+x+"Axis"]).reduce((x,y)=>x.max(y)).gt(stat.antiAxisScalingStart)}
	},{
		name:"Anti-Axis Superscaling",
		value:function(){return "start "+stat.antiAxisSuperscalingStart.noLeadFormat(2)+", power "+stat.antiAxisSuperscalingPower.mul(c.e2).noLeadFormat(4)+"%"},
		condition:function(){return axisCodes.map(x=>g["anti"+x+"Axis"]).reduce((x,y)=>x.max(y)).gt(stat.antiAxisSuperscalingStart)}
	},{
		name:"Free Axis Softcap Boundaries",
		value:function(){return "start "+stat.freeAxisSoftcapStart.mul(c.e2).noLeadFormat(3)+"%, limit "+stat.freeAxisSoftcapLimit.mul(c.e2).noLeadFormat(3)+"%";},
		condition:function(){return axisCodes.map(x => stat["free"+x+"Axis"].gt(g[x+"Axis"])||stat["freedark"+x+"Axis"].gt(g["dark"+x+"Axis"])).reduce((x,y)=>x||y);}
	},{
		name:"Zip Points",
		value:function(){return N(g.zipPoints).noLeadFormat(2)},
		condition:function(){return g.zipPoints>0}
	},{
		name:"Zip Point gain multiplier",
		value:function(){return N(g.zipPointMulti).noLeadFormat(2)+"×"},
		condition:function(){return g.zipPointMulti>1}
	}
].sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

const largeNumberVisualizationVariables = [
	{label:"exotic matter",class:"_exoticmatter",value:function(){return g.exoticmatter}},
	{label:"mastery power",class:"_mastery",value:function(){return g.masteryPower}},
	{label:"stardust",class:"_stardust",value:function(){return g.stardust}},
	{label:"dark matter",class:"_darkmatter",value:function(){return g.darkmatter}},
	{label:"dark energy",class:"_energy",value:function(){return g.darkEnergy}},
	{label:"Hawking radiation",class:"_wormhole",value:function(){return g.hawkingradiation}},
	{label:"knowledge",class:"_research",value:function(){return g.knowledge}}
]
const largeNumberVisualizationNumbers = [
	{value:c.e10,name:"Dialogue"},
	{value:c.d3.pow(c.d27),name:"3↑↑3"},
	{value:N(2**27*3**14*125*49*11),name:"the number of Rubik's cube combinations"},
	{value:N(6.02214076e23),name:"Avogadro's number"},
	{value:N(1.989e33),name:"solar mass / g"},
	{value:N(7.401196841564901e45),name:"the number of 4<sup>3</sup> Rubik's cube combinations"},
	{value:N(17*2**259),name:"the Eddington number"},
	{value:c.e100,name:"Googol"},
	{value:N(2**512),name:"4↑↑3"},
	{value:N(8.4506e184),name:"volume of observable universe / l<span class=\"xscript\"><sup>3</sup><sub>P</sub></span>"},
	{value:c.inf,name:"Double floating-point Infinity"},
	{value:c.ee3,name:"\"When will it be enough?\" achievement requirement",visible:function(){return g.achievement[311]}},
	{value:N(10).pow(3003),name:"Millillion"},
	{value:N(2).pow(16384),name:"Quadruple floating-point Infinity"},
	{value:N(2).pow(65536),name:"2↑↑5"},
	{value:c.e44031,name:"\"OMCCDV\" achievement requirement",visible:function(){return g.achievement[413]}},
	{value:N(2).pow(276709),name:"the Hitchhiker's number"},
	{value:c.ee6,name:"\"Millionaire\" achievement requirement",visible:function(){return g.achievement[529]}},
	{value:N(10).pow(3000003),name:"Micrillion"},
	{value:[c.e,c.pi,c.e,c.pi].decimalPowerTower().mul(794843294078147843293.7+1/30),name:"Ballium's number"},
	{value:N(2).pow(82589933),name:"largest known prime number as of February 2023"},
	{value:N(10).pow(3e9+3),name:"Nanillion"},
	{value:N(10).pow(1e10),name:"Trialogue"},
	{value:N(10).pow(3e12+3),name:"Picillion"},
	{value:N(10).pow(3e15+3),name:"Femtillion"},
	{value:N(10).pow(3e18),name:"Attillion"},
	{value:N(10).pow(3e21),name:"Zeptillion"},
	{value:N(10).pow(3e24),name:"Yoctillion"},
	{value:N(10).pow(3e27),name:"Rontillion"},
	{value:N(10).pow(3e30),name:"Quectillion"},
]
function largeNumberVisualizationShown(num) {
	let out
	for (let i of largeNumberVisualizationNumbers) {
		if (i.value.lte(num) && (i.visible===undefined?true:i.visible())) out = i
	}
	return out
}
function visualiseLargeNumber(x) {
	x=N(x)
	let comparison = largeNumberVisualizationShown(x)
	if (x.gt(c.inf)) return unbreak("("+comparison.name+")<sup>"+Decimal.div(x.log10(),comparison.value.log10()).format(3)+"</sup>")
	return unbreak("("+comparison.name+") × "+x.div(comparison.value).format(3))
}
function SSBsmall(x,y,hyper) {
	let symbol=(hyper===2)?" × ":(hyper===3)?" ^ ":" ? ";
	return ("<span class=\"small\">"+unbreak("("+x+" "+symbol+" "+y+")")+"</span>").replaceAll("<span&nbsp;class=\"small\">","<span class=\"small\">");
}
function masteryDependencies(i){
	if (typeof i === "array") return Array.removeDuplicates(i.map(x=>masteryDependencies(x)))
	let out = ["knowledgeEffect"]
	if (Math.floor(i/10)===1) out.push("SAxisEffect","realSAxis")
	if (Math.floor(i/10)===2) out.push("spatialEnergyEffect")
	if (Math.floor(i/10)===4) out.push("totalNormalAxis")
	if (Math.floor(i/10)===10) out.push("stardustBoost11")
	// masteries boosting other masteries
	if (i<40) out.push(masteryDependencies(40+i%10))
	if (Math.floor(i/10)===8) out.push(masteryDependencies([91,92]))
	if (i===104) out.push(masteryDependencies(112))
	return Array.removeDuplicates(out.flat())
}
const statTemplates = {
	base:function(text,val,show){
		return {
			label:"Base",
			func:function(){return halfFunction(val);},
			text:function(){return halfFunction(text);},
			show:function(){return halfFunction(show);}
		};
	},
	masteryAdd:function(id){
		return {
			label:"Mastery "+id,
			func:function(prev){return MasteryE(id)?prev.add(masteryEffect(id)):prev;},
			text:function(){return "+ "+masteryEffect(id).format(2);},
			dependencies:masteryDependencies(id),
			show:function(){return MasteryE(id)}
		};
	},
	masteryMul:function(id){
		return {
			label:"Mastery "+id,
			func:function(prev){return MasteryE(id)?prev.mul(masteryEffect(id)):prev;},
			text:function(){return "× "+masteryEffect(id).format(2);},
			dependencies:masteryDependencies(id),
			show:function(){return MasteryE(id)}
		};
	},
	masteryPow:function(id){
		return {
			label:"Mastery "+id,
			func:function(prev){return MasteryE(id)?prev.pow(masteryEffect(id)):prev},
			text:function(){return "^ "+masteryEffect(id).format(3);},
			dependencies:masteryDependencies(id),
			show:function(){return MasteryE(id)}
		};
	},
	achievementMul:function(id,dependencies=[]){
		return {
			label:achievement.label(id),
			func:function(prev){return g.achievement[id]?prev.mul(achievement(id).effect()):prev},
			text:function(){return "× "+achievement(id).effect().format(2)},
			dependencies:dependencies,
			show:function(){return g.achievement[id]&&achievement(id).effect().neq(c.d1)},
		}
	},
	axisSoftcap:function(type,color){
		return {
			label:"Softcap",
			func:function(prev){return Decimal.convergentSoftcap(prev,g[type+"Axis"].mul(stat.freeAxisSoftcapStart),g[type+"Axis"].mul(stat.freeAxisSoftcapLimit));},
			text:function(){return formulaFormat.convSoftcap("<i>x</i>",g[type+"Axis"].mul(stat.freeAxisSoftcapStart),g[type+"Axis"].mul(stat.freeAxisSoftcapLimit),true)},
			dependencies:["freeAxisSoftcapStart","freeAxisSoftcapLimit"],
			show:function(){return Decimal.div(stat["free"+type+"Axis"],g[type+"Axis"]).gt(stat.freeAxisSoftcapStart)}, // circular references are legal in show()
			color:color
		};
	},
	funcOnly:function(callback){return { // for modifiers which are never shown
		label:"",
		func:callback,
		text:function(){return ""},
		show:function(){return false}
	}},
	prestigeExponent:function(array){return [statTemplates.base("10",c.d10,false),...array,statTemplates.funcOnly(x=>x.log10())]},
	row2Star:function(id){return {
		label:"Star "+id,
		func:function(prev){return g.star[id]?prev.add(c.d3):prev;},
		text:function(){return "+ 3"},
		show:function(){return g.star[id]}
	}},
	row6Star:function(id){return {
		label:"Star "+id,
		func:function(prev){return g.star[id]?prev.add(starEffect(id===64?64:60)):prev;},
		text:function(){return "+ "+starEffect(id===64?64:60).format(2);},
		show:function(){return g.star[id]}
	}},
	darkMatterFreeAxis:function(type){
		return {
			label:"Dark "+type+" Axis",
			func:function(prev){return prev.add(stat.darkMatterFreeAxis.mul(g["dark"+type+"Axis"]));},
			text:function(){return "+ "+stat.darkMatterFreeAxis.mul(g["dark"+type+"Axis"]).format(2)+" "+SSBsmall(g["dark"+type+"Axis"].format(),stat.darkMatterFreeAxis.format(3),2);},
			dependencies:["realdark"+type+"Axis","darkMatterFreeAxis"],
			show:function(){return g["dark"+type+"Axis"].neq(c.d0)&&stat.darkMatterFreeAxis.neq(c.d0)}
		};
	},
	darkStarEffect2:function(axis){
		let hyper = (axis==="V")?2:3
		return {
			label:"Dark Stars",
			mod:function(){return darkStarEffect2Level(axis).div(c.d10).add(c.d1);},
			func:(axis==="V")?function(prev){return prev.mul(this.mod());}:function(prev){return prev.pow(this.mod())},
			text:function(){return [null,null,"×","^"][hyper]+" "+this.mod().noLeadFormat(3);},
			dependencies:["realDarkStars"],
			show:function(){return this.mod().neq(c.d1)}
		};
	},
	tickspeed:function(exp,label="Tickspeed",dependencies=[]){
		if (exp===undefined) return {
			label:"Tickspeed",
			func:function(prev){return prev.mul(stat.tickspeed);},
			text:function(){return "× "+stat.tickspeed.format(3);},
			dependencies:["tickspeed"],
			show:function(){return stat.tickspeed.neq(c.d1)},
			color:"var(--time)"
		}
		else return {
			label:label,
			mod:function(){return stat.tickspeed.gt(c.d1)?stat.tickspeed.pow(exp()):stat.tickspeed},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(3)+(stat.tickspeed.gt(c.d1)&&exp().neq(c.d1)?(" "+SSBsmall(stat.tickspeed.noLeadFormat(3),exp().noLeadFormat(4),3)):"");},
			dependencies:["tickspeed",dependencies].flat(),
			show:function(){return stat.tickspeed.neq(c.d1)&&exp().neq(c.d0)},
			color:(label==="Tickspeed"?"var(--time)":"inherit")
		}
	},
	ach209Reward:{
		label:achievement.label(209),
		mod:function(){return g.achievement[209]?stat.totalNormalAxis.mul(achievement(209).effect()):c.d0;},
		func:function(prev){return prev.add(this.mod());},
		text:function(){return "+ "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.totalNormalAxis.format(),achievement(209).effectFormat(achievement(209).effect()),2);},
		dependencies:["totalNormalAxis"],
		show:function(){return this.mod().neq(c.d0)}
	},
	ach210Reward:function(type){
		return {
			label:achievement.label(210),
			mod:function(){
				if (!g.achievement[210]) return c.d0
				let out = g[type+"Axis"].div(achievement(210).effect())
				if (out.gt(c.d80)) out=out.mul(c.d80).pow(c.d0_5)
				return out
			},
			func:function(prev){return prev.add(this.mod());},
			text:function(){
				let out = SSBsmall(g[type+"Axis"].format(),achievement(210).effect().recip().noLeadFormat(3),2)
				if (this.mod().gte(c.d80)) out = SSBsmall(SSBsmall(out,80,2),0.5,3)
				return "+ "+this.mod().format(2)+" "+out;
			},
			show:function(){return this.mod().neq(c.d0)}
		};
	},
	res1_8:{
		label:"Research 1-8",
		func:function(prev){return g.research.r1_8?prev.mul(researchEffect(1,8)):prev},
		text:function(){return "× "+researchEffect(1,8).noLeadFormat(2);},
		show:function(){return g.research.r1_8&&researchEffect(1,8).neq(c.d1)}
	},
	ach501Reward:{
		label:achievement.label(501),
		func:function(prev){return g.achievement[501]?prev.mul(achievement(501).realEffect()):prev;},
		text:function(){return "× "+achievement(501).realEffect().format(2);},
		dependencies:masteryDependencies(101),
		show:function(){return g.achievement[501]}
	},
	ach525_526Reward:[
		{
			label:achievement.label(525),
			func:function(prev){return g.achievement[525]?prev.add(c.em4):prev},
			text:function(){return "+ 0.0001";},
			show:function(){return g.achievement[525]}
		},
		{
			label:achievement.label(526),
			func:function(prev){return g.achievement[526]?prev.add(achievement(526).effect()):prev;},
			text:function(){return "+ "+achievement(526).effect().format(3);},
			dependencies:["totalNormalAxis"],
			show:function(){return g.achievement[526]&&stat.totalNormalAxis.neq(c.d0)}
		}
	],
	ach528Reward:function(type){
		return {
			label:achievement.label(528),
			mod:function(){return g.achievement[528]?Decimal.linearSoftcap(g[type+"Axis"].mul(achievement(528).effect()),c.d100,c.d2,1):c.d0;},
			func:function(prev){return prev.add(this.mod());},
			text:function(){return "+ "+this.mod().format(2)+" <span class=\"small\">("+(this.mod().gte(c.e2)?("10 ^ "+formulaFormat.linSoftcap("log("+g[type+"Axis"].format()+" ÷ "+achievement(528).effect().recip().noLeadFormat(3)+")",c.d2,c.d2,this.mod().gte(c.e2),true)):(g[type+"Axis"].format()+" ÷ "+achievement(528).effect().recip().noLeadFormat(3))+")")+"</span>";},
			show:function(){return this.mod().neq(c.d0)}
		};
	},
	timeResearch:function(row,col){
		return {
			label:"Research "+row+"-"+col,
			mod:function(){
				let out = researchEffect(row,col).mul(g.truetimeThisWormholeReset).add(c.d1)
				if (g.research.r17_8) {out = out.pow(researchEffect(17,8))}
				return out
			},
			func:function(prev){return g.research["r"+row+"_"+col]?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().format(2)},
			show:function(){return g.research["r"+row+"_"+col]}
		}
	},
	study7:{
		label:"Study VII",
		func:function(prev){return StudyE(7)?prev.pow(studies[7].luckEffect()):prev},
		text:function(){return "^ "+studies[7].luckEffect().noLeadFormat(3)},
		show:function(){return StudyE(7)},
		color:"#cc0000"
	},
	study9:{
		label:"Study IX",
		func:function(prev){return StudyE(9)&&prev.gt(c.d10)?prev.dilate(studies[9].experientiaEffect()):prev},
		text:function(){return "dilate "+studies[9].experientiaEffect().noLeadFormat(4)},
		show:function(){return StudyE(9)},
		color:"#cc0000"
	},
	antiYAxis:{
		label:"Anti-Y Axis",
		mod:function(){return stat.antiYAxisEffect.pow(stat.realantiYAxis)},
		func:function(prev){return prev.mul(this.mod())},
		text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.antiYAxisEffect.noLeadFormat(3),stat.realantiYAxis.noLeadFormat(3),3)},
		dependencies:["antiYAxisEffect","realantiYAxis"],
		show:function(){return stat.antiYAxisEffect.neq(c.d1)&&stat.realantiYAxis.neq(c.d0)}
	}
}
function statFormat(formulaShown,formulaHidden,className) {
	return "<span class=\""+className+"\">"+(showFormulas?formulaFormat(formulaShown):formulaHidden)+"</span>"
}
var miscStats = {};
miscStats.exoticmatterPerSec={
	type:"breakdown",
	label:"Exotic Matter gain",
	visible:function(){return true;},
	category:"Exotic Matter gain",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:"X Axis",
			mod:function(){return stat.XAxisEffect.pow(stat.realXAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.XAxisEffect.noLeadFormat(2),stat.realXAxis.noLeadFormat(2),3);},
			dependencies:["XAxisEffect","realXAxis"],
			show:function(){return stat.XAxisEffect.neq(c.d1)&&stat.realXAxis.neq(c.d0)}
		},
		{
			label:"Z Axis",
			mod:function(){return stat.ZAxisEffect.pow(stat.realZAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.ZAxisEffect.noLeadFormat(2),stat.realZAxis.noLeadFormat(2),3);},
			dependencies:["ZAxisEffect","realZAxis"],
			show:function(){return stat.ZAxisEffect.neq(c.d1)&&stat.realZAxis.neq(c.d0)}
		},
		{
			label:"W Axis",
			mod:function(){return stat.WAxisEffect.pow(stat.realWAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.WAxisEffect.noLeadFormat(2),stat.realWAxis.noLeadFormat(2),3);},
			dependencies:["WAxisEffect","realWAxis"],
			show:function(){return stat.WAxisEffect.neq(c.d1)&&stat.realWAxis.neq(c.d0)}
		},
		{
			label:"T Axis",
			mod:function(){return stat.TAxisEffect.pow(stat.realTAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.TAxisEffect.noLeadFormat(2),stat.realTAxis.noLeadFormat(2),3);},
			dependencies:["TAxisEffect","realTAxis"],
			show:function(){return stat.TAxisEffect.neq(c.d1)&&stat.realTAxis.neq(c.d0)}
		},
		{
			label:achievement.label(101,3),
			mod:function(){
				let out = c.d1
				for (let i=101;i<104;i++){if(g.achievement[i]){out=out.mul(i/100)}}
				return out
			},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().noLeadFormat(3)},
			show:function(){return g.achievement[101]}
		},
		{
			label:achievement.label(114),
			func:function(prev){return g.achievement[114]?prev.mul(achievement(114).effect()):prev},
			text:function(){return "× "+achievement(114).effect().format(2);},
			show:function(){return g.achievement[114]}
		},
		statTemplates.masteryMul(11),
		{
			label:"Stardust Boost 1",
			func:function(prev){return prev.mul(stat.stardustBoost1);},
			text:function(){return "× "+stat.stardustBoost1.format(2);},
			dependencies:["stardustBoost1"],
			show:function(){return stat.stardustBoost1.neq(c.d0)}
		},
		...(()=>{
			let out = []
			for (let i=11;i<15;i++) out.push({
				label:"Star "+i,
				func:function(prev){return g.star[i]?prev.mul(starEffect(i)):prev;},
				text:function(){return "× "+starEffect(i).format(2);},
				show:function(){return g.star[i]}
			})
			return out
		})(),
		{
			label:"Star 42",
			func:function(prev){return g.star[42]?prev.mul(c.e18):prev},
			text:function(){return "× "+BEformat(c.e18);},
			show:function(){return g.star[42]}
		},
		{
			label:achievement.label(309),
			func:function(prev){return g.achievement[309]?prev.mul(g.masteryPower.add(c.d1).pow(achievement(309).effect())):prev;},
			text:function(){return "× "+g.masteryPower.add(c.d1).pow(achievement(309).effect()).format(2)+" "+SSBsmall(g.masteryPower.add(c.d1).format(2),achievement(309).effect().format(4),3);},
			show:function(){return g.achievement[309]&&g.masteryPower.neq(c.d0)&&achievement(309).effect().neq(c.d0)}
		},
		{
			label:achievement.label(311),
			func:function(prev){return g.achievement[311]?prev.mul(achievement(311).effect()):prev},
			text:function(){return "× "+achievement(311).effect().format(2);},
			show:function(){return g.achievement[311]}
		},
		statTemplates.ach501Reward,
		{
			label:"Research 1-3",
			func:function(prev){return g.research.r1_3?prev.mul(Decimal.pow(researchEffect(1,3),stat.totalNormalAxis)):prev;},
			text:function(){return "× "+Decimal.pow(researchEffect(1,3),stat.totalNormalAxis).format(2)+" "+SSBsmall(researchEffect(1,3).noLeadFormat(2),stat.totalNormalAxis.format(0),3);},
			dependencies:["totalNormalAxis"],
			show:function(){return g.research.r1_3&&researchEffect(1,3).neq(c.d1)&&stat.totalNormalAxis.neq(c.d0)}
		},
		{
			label:achievement.label(518),
			func:function(prev){return g.achievement[518]?prev.mul(achievement(518).effect()):prev},
			text:function(){return "× "+achievement(518).effect().format(2);},
			show:function(){return g.achievement[518]&&achievement(518).effect().neq(c.d1)}
		},
		{
			label:"S Axis",
			func:function(prev){return prev.pow(stat.SAxisEffect.pow(stat.realSAxis));},
			text:function(){return "^ "+stat.SAxisEffect.pow(stat.realSAxis).format(4)+" "+SSBsmall(stat.SAxisEffect.noLeadFormat(4),stat.realSAxis.noLeadFormat(2),3);},
			dependencies:["SAxisEffect","realSAxis"],
			show:function(){return stat.SAxisEffect.neq(c.d1)&&stat.realSAxis.neq(c.d0)}
		},
		{
			label:"Star 41",
			func:function(prev){return g.star[41]?prev.pow(c.d1_05):prev},
			text:function(){return "^ 1.05";},
			show:function(){return g.star[41]}
		},
		{
			label:"Dark Energy",
			func:function(prev){return prev.pow(stat.darkEnergyEffect);},
			text:function(){return "^ "+stat.darkEnergyEffect.format(4);},
			dependencies:["darkEnergyEffect"],
			show:function(){return stat.darkEnergyEffect.neq(c.d1)}
		},
		{
			label:achievement.label(401),
			func:function(prev){return g.achievement[401]?prev.pow(c.d1_05):prev},
			text:function(){return "^ 1.05";},
			show:function(){return g.achievement[401]}
		},
		statTemplates.study7,
		statTemplates.study9,
		statTemplates.tickspeed()
	]
};
miscStats.pendingstardust={
	type:"breakdown",
	label:"Stardust gain",
	visible:function(){return masteryData[42].req()&&g.exoticmatter.gt(stat.stardustExoticMatterReq.div(c.d10));},
	category:"Stardust gain",
	precision:2,
	modifiers:[
		{
			label:"Base Gain",
			func:function(){return g.exoticmatter.lt(stat.stardustExoticMatterReq)?c.d0:g.exoticmatter.div(stat.stardustExoticMatterReq.div(c.d10)).dilate(studies[4].reward(1));},
			text:function(){return "10 ^ log("+statFormat("EM",g.exoticmatter.format(),"_exoticmatter")+" ÷ "+stat.stardustExoticMatterReq.div(c.d10).format()+") ^ "+studies[4].reward(1).toFixed(3);},
			dependencies:["stardustExoticMatterReq"],
			show:function(){return true}
		},
		{
			label:"Stardust gain multipliers",
			func:function(prev){return prev.mul(stat.stardustMultiplier)},
			text:function(){return "× "+stat.stardustMultiplier.noLeadFormat(2)},
			dependencies:["stardustMultiplier"],
			show:function(){return stat.stardustMultiplier.neq(c.d1)}
		},
		{
			label:"Stardust gain exponents",
			func:function(prev){return prev.pow(stat.stardustExponent)},
			text:function(){return "^ "+stat.stardustExponent.noLeadFormat(4)},
			dependencies:["stardustExponent"],
			show:function(){return stat.stardustExponent.neq(c.d1)}
		}
	],
};
miscStats.stardustMultiplier={
	type:"breakdown",
	label:"Stardust gain multipliers",
	visible:function(){return stat.stardustMultiplier.neq(c.d1);},
	category:"Stardust gain",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		statTemplates.masteryMul(42),
		...(()=>{
			let out = []
			for (let i=0;i<4;i++){
				let constant = N(1.004-i/1e3)
				out.push({
					label:achievement.label(202+i),
					func:function(prev){return g.achievement[202+i]?prev.mul(constant.pow(g[axisCodes[3-i]+"Axis"])):prev},
					text:function(){return "× "+constant.pow(g[axisCodes[3-i]+"Axis"]).format(3)+" "+SSBsmall("1.00"+(4-i),g[axisCodes[3-i]+"Axis"].format(),3)},
					show:function(){return g.achievement[202+i]}
				})
			}
			return out
		})(),
		{
			label:achievement.label(208),
			mod:function(){return achievement(208).effect().pow(stat.totalNormalAxis);},
			func:function(prev){return g.achievement[208]?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().format(3)+" "+SSBsmall(achievement(208).effect().noLeadFormat(4),stat.totalNormalAxis.format(0),3);},
			dependencies:["totalNormalAxis"],
			show:function(){return g.achievement[208]&&stat.totalNormalAxis.neq(c.d0)}
		},
		{
			label:"U Axis",
			mod:function(){return stat.UAxisEffect.pow(stat.realUAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(stat.UAxisEffect.format(2),stat.realUAxis.noLeadFormat(2),3);},
			dependencies:["UAxisEffect","realUAxis"],
			show:function(){return stat.UAxisEffect.neq(c.d1)&&stat.realUAxis.neq(c.d0)}
		},
		{
			label:achievement.label(217),
			func:function(prev){return g.achievement[217]?prev.mul(c.d1_337):prev},
			text:function(){return "× 1.337";},
			show:function(){return g.achievement[217]}
		},
		{
			label:achievement.label(301),
			func:function(prev){return g.achievement[301]?prev.mul(achievement(301).effect()):prev},
			text:function(){return "× "+achievement(301).effect().format(2);},
			show:function(){return g.achievement[301]}
		},
		{
			label:"Stardust Boost 4",
			mod:function(){return g.masteryPower.add(c.d1).pow(stat.stardustBoost4);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(g.masteryPower.add(c.d1).format(2),stat.stardustBoost4.format(4),3);},
			dependencies:["stardustBoost4"],
			show:function(){return g.masteryPower.neq(c.d0)&&stat.stardustBoost4.neq(c.d0)}
		},
		{
			label:"Star 44",
			func:function(prev){return g.star[44]?prev.mul(c.e2):prev},
			text:function(){return "× 100";},
			show:function(){return g.star[44]}
		},
		{
			label:achievement.label(412),
			func:function(prev){return g.achievement[412]?prev.mul(achievement(412).effect()):prev;},
			text:function(){return "× "+achievement(412).effect().format(2);},
			show:function(){return g.achievement[412]&&g.darkstars},
		},
		statTemplates.ach501Reward,
		{
			label:"Research 2-10",
			mod:function(){return g.hawkingradiation.max(c.d1).pow(researchEffect(2,10))},
			func:function(prev){return g.research.r2_10?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(g.hawkingradiation.format(),researchEffect(2,10).noLeadFormat(3),3)},
			show:function(){return g.research.r2_10&&g.hawkingradiation.gt(c.d1)}
		}
	]
};
miscStats.stardustExponent={
	type:"breakdown",
	label:"Stardust gain exponents",
	visible:function(){return stat.stardustExponent.neq(c.d1);},
	category:"Stardust gain",
	precision:4,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:"Star 43",
			func:function(prev){return g.star[43]?prev.mul(c.d1_05):prev},
			text:function(){return "× 1.05";},
			show:function(){return g.star[43]}
		},
		{
			label:"Stelliferous Energy",
			func:function(prev){return prev.mul(stat.stelliferousEnergyEffect);},
			text:function(){return "× "+stat.stelliferousEnergyEffect.format(4);},
			dependencies:["stelliferousEnergyEffect"],
			show:function(){return stat.stelliferousEnergyEffect.neq(c.d1)}
		},
		{
			label:"Study IV",
			func:function(prev){return StudyE(4)?prev.mul(c.d0_5.pow(g.TotalStardustResets)):prev},
			text:function(){return "× "+c.d0_5.pow(g.TotalStardustResets).noLeadFormat(3)+" "+SSBsmall("0.5",g.TotalStardustResets,3)},
			show:function(){return StudyE(4)&&(g.TotalStardustResets!==0)},
			color:"#cc0000"
		},
		{
			label:"Galaxy Penalty 2",
			func:function(prev){return (g.stars<40)?prev.mul(galaxyEffects[2].penalty.value().pow(40-g.stars)):prev},
			text:function(){return "× "+galaxyEffects[2].penalty.value().pow(40-g.stars).noLeadFormat(3)+" "+SSBsmall(galaxyEffects[2].penalty.value().noLeadFormat(3),"(40 - "+g.stars+")",3)},
			show:function(){return galaxyEffects[2].penalty.value().neq(c.d1)&&(g.stars<40)}
		},
		statTemplates.study7
	]
};
miscStats.darkmatterPerSec={
	type:"breakdown",
	label:"Dark Matter gain",
	visible:function(){return unlocked("Dark Matter");},
	category:"Dark Matter",
	precision:2,
	modifiers:[
		{
			label:"Base Gain",
			func:function(){return g.stardust.gt(c.e12)?g.stardust.div(c.e11).dilate(c.d0_5).div(c.d10):g.stardust.div(c.e12);},
			text:function(){return g.stardust.gt(c.e12)?(unbreak("("+statFormat("S",g.stardust.format(),"_stardust")+" ÷ "+BEformat(c.e11)+")")+" "+unbreak("dilate 0.5 ÷ 10")):(statFormat("S",g.stardust.noLeadFormat(2),"_stardust")+" ÷ "+BEformat(c.e12));},
			show:function(){return true}
		},
		{
			label:"Dark Stars",
			func:function(prev){return prev.aps(darkStarEffect1())},
			text:function(){return "(<i>x</i> + 1) ^ "+darkStarEffect1().noLeadFormat(3)+" - 1"},
			dependencies:["realDarkStars"],
			show:function(){return stat.realDarkStars.neq(c.d0)}
		},
		{
			label:"Study XI",
			func:function(prev){return StudyE(11)?prev.min(c.d1):prev},
			text:function(){return "min(<i>x</i>, 1)"},
			show:function(){return StudyE(11)},
			color:"#cc0000"
		},
		{
			label:"Dark X Axis",
			mod:function(){return stat.darkXAxisEffect.pow(stat.realdarkXAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.darkXAxisEffect.noLeadFormat(2),stat.realdarkXAxis.noLeadFormat(2),3);},
			dependencies:["darkXAxisEffect","realdarkXAxis"],
			show:function(){return stat.darkXAxisEffect.neq(c.d1)&&stat.realdarkXAxis.neq(c.d0)}
		},
		{
			label:"Dark Z Axis",
			mod:function(){return stat.darkZAxisEffect.pow(stat.realdarkZAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.darkZAxisEffect.noLeadFormat(2),stat.realdarkZAxis.noLeadFormat(2),3);},
			dependencies:["darkZAxisEffect","realdarkZAxis"],
			show:function(){return stat.darkZAxisEffect.neq(c.d1)&&stat.realdarkZAxis.neq(c.d0)}
		},
		{
			label:"Dark U Axis",
			mod:function(){return stat.darkUAxisEffect.pow(Decimal.mul(stat.realdarkUAxis,stat.totalDarkAxis));},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.darkUAxisEffect.noLeadFormat(3),SSBsmall(stat.realdarkUAxis.noLeadFormat(2),stat.totalDarkAxis.format(0),2),3);},
			dependencies:["darkUAxisEffect","realdarkUAxis","totalDarkAxis"],
			show:function(){return stat.darkUAxisEffect.neq(c.d1)&&stat.realdarkUAxis.neq(c.d0)&&stat.totalDarkAxis.neq(c.d0)}
		},
		{
			label:"Dark T Axis",
			mod:function(){return stat.darkTAxisEffect.pow(stat.realdarkTAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(stat.darkTAxisEffect.format(2),stat.realdarkTAxis.noLeadFormat(2),3);},
			dependencies:["darkTAxisEffect","realdarkTAxis"],
			show:function(){return stat.darkTAxisEffect.neq(c.d1)&&stat.realdarkTAxis.neq(c.d0)}
		},
		{
			label:achievement.label(302),
			func:function(prev){return g.achievement[302]?prev.mul(c.d1_308.pow(unspentStars())):prev;},
			text:function(){return "× "+c.d1_308.pow(unspentStars()).format(2)+" "+SSBsmall(1.308,unspentStars(),3);},
			show:function(){return g.achievement[302]&&(unspentStars()>0)}
		},
		statTemplates.ach501Reward,
		{
			label:achievement.label(513,3),
			base:function(){return [513,514,515].map(x => g.achievement[x]?2:1).reduce((x,y)=>x*y);},
			mod:function(){return Decimal.pow(this.base(),g.darkstars);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format()+" "+SSBsmall(this.base(),g.darkstars.format(0),3);},
			show:function(){return g.achievement[513]&&g.darkstars.gt(c.d0)}
		},
		{
			label:"Research 1-13",
			mod:function(){return Decimal.pow(researchEffect(1,13),stat.totalDarkAxis);},
			func:function(prev){return g.research.r1_13?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(researchEffect(1,13).noLeadFormat(2),stat.totalDarkAxis.format(0),3);},
			dependencies:["totalDarkAxis"],
			show:function(){return g.research.r1_13&&researchEffect(1,13).neq(c.d1)&&stat.totalDarkAxis.neq(c.d0)}
		},
		{
			label:achievement.label(706),
			mod:function(){return achievement(706).effect().pow(stat.realdarkWAxis)},
			func:function(prev){return g.achievement[706]?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(achievement(706).effect().noLeadFormat(2),stat.realdarkWAxis.format(0),3);},
			dependencies:["realdarkWAxis"],
			show:function(){return g.achievement[706]&&stat.realdarkWAxis.neq(c.d0)}
		},
		{
			label:"Dark S Axis",
			mod:function(){return stat.darkSAxisEffect.pow(stat.realdarkSAxis);},
			func:function(prev){return prev.pow(this.mod());},
			text:function(){return "^ "+this.mod().format(4)+" "+SSBsmall(stat.darkSAxisEffect.noLeadFormat(4),stat.realdarkSAxis.noLeadFormat(2),3);},
			dependencies:["darkSAxisEffect","realdarkSAxis"],
			show:function(){return stat.darkSAxisEffect.neq(c.d1)&&stat.realdarkSAxis.neq(c.d0)}
		},
		{
			label:"Gravitational Energy",
			func:function(prev){return prev.pow(stat.gravitationalEnergyEffect);},
			text:function(){return "^ "+stat.gravitationalEnergyEffect.format(4);},
			dependencies:["gravitationalEnergyEffect"],
			show:function(){return stat.gravitationalEnergyEffect.neq(c.d1)}
		},
		statTemplates.study7,
		statTemplates.study9,
		{
			label:"Study XII",
			func:function(prev){return (StudyE(12)&&prev.gt(c.d1))?c.d1:prev},
			text:function(){return "min(<i>x</i>, 1)"},
			show:function(){return StudyE(12)}
		},
		statTemplates.tickspeed(),
	]
};
miscStats.darkMatterFreeAxis={
	type:"breakdown",
	label:"Dark-to-normal axis conversion",
	visible:function(){return unlocked("Dark Matter")},
	category:"Dark Matter",
	precision:4,
	modifiers:[
		statTemplates.base("0.33",N(0.33),true),
		{
			label:"Tier 3 achievements",
			func:function(prev){return prev.mul(achievement.perAchievementReward[3].currentVal)},
			text:function(){return "× "+achievement.perAchievementReward[3].currentVal.noLeadFormat(2)},
			show:function(){return achievement.ownedInTier(3)>0}
		},
		{
			label:"Dark Stars",
			func:function(prev){return prev.mul(stat.darkStarEffect3.div(c.e2).add(c.d1))},
			text:function(){return "× "+stat.darkStarEffect3.div(c.e2).add(c.d1).noLeadFormat(4)},
			show:function(){return stat.darkStarEffect3.sign!==0},
			dependencies:["darkStarEffect3"]
		},
		{
			label:"Research 2-6",
			func:function(prev){return g.research.r2_6?prev.mul(researchEffect(2,6)):prev},
			text:function(){return "× "+researchEffect(2,6).noLeadFormat(4)},
			show:function(){return g.research.r2_6}
		}
	]
}
miscStats.masteryPowerPerSec={
	type:"breakdown",
	label:"Mastery Power gain",
	visible:function(){return unlocked("Masteries");},
	category:"Mastery Power",
	precision:2,
	modifiers:[
		{
			label:"Base Gain",
			func:function(){return Decimal.pow(stat.masteryTimer,stat.baseMasteryPowerExponent);},
			text:function(){return statFormat("mastery timer",stat.masteryTimer.format(2),"_time")+" ^ "+statFormat("base gain exponent",stat.baseMasteryPowerExponent.format(4),"_mastery");},
			dependencies:["masteryTimer","baseMasteryPowerExponent"],
			show:function(){return true}
		},
		{
			label:achievement.label(104),
			func:function(prev){return g.achievement[104]?prev.mul(c.d1_04):prev;},
			text:function(){return "× 1.04";},
			show:function(){return g.achievement[104]}
		},
		{
			label:"Dark W Axis",
			mod:function(){return stat.darkWAxisEffect.pow(stat.realdarkWAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(stat.darkWAxisEffect.format(3),stat.realdarkWAxis.noLeadFormat(2),3);},
			dependencies:["darkWAxisEffect","realdarkWAxis"],
			show:function(){return stat.darkWAxisEffect.neq(c.d1)&&stat.realdarkWAxis.neq(c.d0)}
		},
		{
			label:"Stardust Boost 7",
			func:function(prev){return prev.mul(stat.stardustBoost7.pow(stardustBoost7Exp()));},
			text:function(){return "× "+stat.stardustBoost7.pow(stardustBoost7Exp()).format(2)+" "+SSBsmall(stat.stardustBoost7.format(4),formulaFormat.logSoftcap(g.truetimeThisStardustReset.format(2)+" ^ 0.5",c.e3,c.d4,g.truetimeThisStardustReset.gt(c.e6),true),3);},
			dependencies:["stardustBoost7"],
			show:function(){return stat.stardustBoost7.neq(c.d1)}
		},
		...[81,82,83,84].map(x=>statTemplates.masteryMul(x)),
		{
			label:achievement.label(413),
			mod:function(){return Decimal.mul(c.d1_1907.pow(g.SAxis),c.d1_202.pow(g.darkSAxis));},
			func:function(prev){return g.achievement[413]?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(SSBsmall(1.1907,g.SAxis.format(0),3),SSBsmall(1.202,g.darkSAxis.format(0),3),2);},
			show:function(){return g.achievement[413]&&(g.SAxis.neq(c.d0)||g.darkSAxis.neq(c.d0))}
		},
		statTemplates.ach501Reward,
		{
			label:"Neural Energy",
			func:function(prev){return prev.pow(stat.neuralEnergyEffect);},
			text:function(){return "^ "+stat.neuralEnergyEffect.format(4);},
			dependencies:["neuralEnergyEffect"],
			show:function(){return stat.neuralEnergyEffect.neq(c.d1)}
		},
		statTemplates.study7,
		statTemplates.tickspeed()
	]
};
miscStats.baseMasteryPowerExponent={
	type:"breakdown",
	label:"Mastery Power base gain exponent",
	visible:function(){return unlocked("Masteries");},
	category:"Mastery Power",
	precision:4,
	modifiers:[
		{
			label:"Base",
			exp:function(){return N(c.d1_2);},
			func:function(){return g.exoticmatter.pow(c.d0_1).add(c.d10).log10().log10().add(c.d1).pow(this.exp());},
			text:function(){return unbreak("(log<sup>[2]</sup>("+statFormat("EM",g.exoticmatter.format(),"_exoticmatter")+" ^ 0.1 + 10) + 1)")+" ^ "+this.exp().format(2);},
			show:function(){return true}
		},
		{
			label:achievement.label(529),
			func:function(prev){return g.achievement[529]?prev.mul(achievement(529).effect()):prev},
			text:function(){return "× "+achievement(529).effect().format(4);},
			show:function(){return g.achievement[529]&&g.hawkingradiation.neq(c.d0)}
		},
		{
			label:achievement.label(106),
			func:function(prev){return g.achievement[106]?prev.add(c.d0_001):prev},
			text:function(){return "+ 0.001";},
			show:function(){return g.achievement[106]}
		},
		statTemplates.masteryAdd(85),
		{
			label:"Magenta Light",
			func:function(prev){return prev.add(lightCache.currentEffect[4])},
			text:function(){return "+ "+lightEffect[4].format(lightCache.currentEffect[4])},
			show:function(){return lightCache.currentEffect[4].neq(c.d0)}
		},
		{
			label:achievement.label(707),
			func:function(prev){return g.achievement[707]?prev.add(achievement(707).effect()):prev},
			text:function(){return "+ "+achievement(707).effect().format(3);},
			show:function(){return g.achievement[707]},
			dependencies:["masteryTimer"]
		},
		{
			label:"Research 19-7",
			func:function(prev){return g.research.r19_7?prev.add(researchEffect(19,7)):prev},
			text:function(){return "+ "+researchEffect(19,7).noLeadFormat(3)},
			show:function(){return g.research.r19_7}
		},
		{
			label:"<span onMouseover=\"addSecretAchievement(9)\">Secret Achievements</span>",
			mod:function(){return secretAchievementPoints/1e16},
			func:function(prev){return prev}, // the reward is a lie! how cruel of alemaninc.
			text:function(){return "<span onClick=\"addSecretAchievement(9)\">+ "+this.mod().toFixed(16)+"</span>";},
			show:function(){return secretAchievementPoints>0;},
			color:"#808080"
		}
	]
};
miscStats.masteryTimer={
	type:"breakdown",
	label:"Mastery timer",
	visible:function(){return stat.masteryTimer.neq(g.baseMasteryPowerGain)},
	category:"Mastery Power",
	precision:2,
	modifiers:[
		{
			label:"Time since mastery swap",
			func:function(){return g.baseMasteryPowerGain},
			text:function(){return "+ "+g.baseMasteryPowerGain.format(2)},
			show:function(){return true}
		},
		{
			get label(){return visibleStudies().includes(8)?"Study VIII reward 3":achievement.label(310)},
			func:function(prev){return studies[8].reward(3).mul(deltaBaseMasteryPowerGain()).add(prev)},
			text:function(){return "+ "+studies[8].reward(3).mul(deltaBaseMasteryPowerGain()).format(2)+" "+SSBsmall(studies[8].reward(3).noLeadFormat(2),deltaBaseMasteryPowerGain().noLeadFormat(2),2)},
			show:function(){return studies[8].reward(3).neq(c.d0)},
			dependencies:["tickspeed"]
		}
	]
}
miscStats.XAxisEffect={
	type:"breakdown",
	label:"X Axis effect",
	visible:function(){return stat.axisUnlocked>=1;},
	category:"Axis effects",
	precision:2,
	modifiers:[
		statTemplates.base("2",c.d2,true),
		{
			label:"Y Axis",
			mod:function(){return Decimal.mul(stat.YAxisEffect,stat.unempoweredYAxis);},
			func:function(prev){return prev.add(this.mod());},
			text:function(){return "+ "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.YAxisEffect.noLeadFormat(2),stat.unempoweredYAxis.noLeadFormat(2),2)},
			dependencies:["YAxisEffect","unempoweredYAxis"],
			show:function(){return stat.YAxisEffect.neq(c.d0)&&stat.unempoweredYAxis.neq(c.d0)}
		},
		{
			label:"Tier 1 achievements",
			func:function(prev){return prev.add(achievement.perAchievementReward[1].currentVal);},
			text:function(){return "+ "+N(achievement.perAchievementReward[1].currentVal).noLeadFormat(2);},
			show:function(){return achievement.ownedInTier(1)>0}
		},
		statTemplates.ach209Reward,
		{
			label:"Empowered Y Axis",
			mod:function(){return stat.YAxisEffect.pow(stat.empoweredYAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(stat.YAxisEffect.format(2),stat.empoweredYAxis.format(2),3)},
			dependencies:["YAxisEffect","empoweredYAxis"],
			show:function(){return stat.YAxisEffect.gt(c.d1)&&stat.empoweredYAxis.neq(c.d0)}
		},
		statTemplates.masteryMul(21),
		statTemplates.res1_8,
		{
			label:"Research 2-2",
			mod:function(){return researchEffect(2,2).mul(g.XAxis).div(c.e2).add(c.d1);},
			func:function(prev){return g.research.r2_2?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,2).div(c.e2).noLeadFormat(2)+" × "+g.XAxis.format(0)+" + 1)")+"</span>";},
			show:function(){return g.research.r2_2&&researchEffect(2,2).neq(c.d0)&&g.XAxis.neq(c.d0)}
		},
		{
			label:"Research 2-4",
			mod:function(){return researchEffect(2,4).mul(g.truetimeThisWormholeReset).div(c.e2).add(c.d1);},
			func:function(prev){return g.research.r2_4?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,4).div(c.e2).noLeadFormat(2)+" × "+g.truetimeThisWormholeReset.format(2)+" + 1)")+"</span>";},
			show:function(){return g.research.r2_4&&researchEffect(2,4).neq(c.d0)&&g.truetimeThisWormholeReset.neq(c.d0)}
		},
		{
			label:"Research 2-7",
			mod:function(){return researchEffect(2,7).mul(g.spatialEnergy.log10()).div(c.e2).add(c.d1);},
			func:function(prev){return g.research.r2_7?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,7).div(c.e2).noLeadFormat(2)+" × "+g.spatialEnergy.log10().format(2)+" + 1)")+"</span>";},
			show:function(){return g.research.r2_7&&researchEffect(2,7).neq(c.d0)&&g.spatialEnergy.neq(c.d1)}
		},
		{
			label:"Research 2-9",
			mod:function(){return researchEffect(2,9).mul(g.darkXAxis).div(c.e2).add(c.d1);},
			func:function(prev){return g.research.r2_9?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,9).div(c.e2).noLeadFormat(2)+" × "+g.darkXAxis.format(0)+" + 1)")+"</span>";},
			show:function(){return g.research.r2_9&&researchEffect(2,9).neq(c.d0)&&g.darkXAxis.neq(c.d0)}
		},
		{
			label:"Research 2-12",
			mod:function(){return researchEffect(2,12).mul(g.totalDiscoveries).div(c.e2).add(c.d1);},
			func:function(prev){return g.research.r2_12?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,12).div(c.e2).noLeadFormat(2)+" × "+g.totalDiscoveries.format(0)+" + 1)")+"</span>"},
			show:function(){return g.research.r2_12&&researchEffect(2,12).neq(c.d0)&&g.totalDiscoveries.neq(c.d0)}
		},
		{
			label:"Research 2-14",
			func:function(prev){return g.research.r2_14?prev.pow(researchEffect(2,14)):prev;},
			text:function(){return "^ "+researchEffect(2,14).noLeadFormat(4);},
			dependencies:["realXAxis"],
			show:function(){return g.research.r2_14&&researchEffect(2,14).neq(c.d0)&&g.XAxis.neq(c.d0)}
		}
	]
};
miscStats.YAxisEffect={
	type:"breakdown",
	label:"Y Axis effect",
	visible:function(){return stat.axisUnlocked>=2;},
	category:"Axis effects",
	precision:2,
	modifiers:[
		statTemplates.base("0.1",c.d0_1,true),
		{
			label:achievement.label(113),
			func:function(prev){return g.achievement[113]?prev.add(g.YAxis.mul(c.d0_0004)):prev},
			text:function(){return "+ "+g.YAxis.mul(c.d0_0004).noLeadFormat(2);},
			show:function(){return g.achievement[113]&&g.YAxis.neq(c.d0)}
		},
		statTemplates.ach209Reward,
		{
			label:"Stardust Boost 2",
			func:function(prev){return prev.mul(stat.stardustBoost2);},
			text:function(){return "× "+stat.stardustBoost2.format(2);},
			dependencies:["stardustBoost2"],
			show:function(){return stat.stardustBoost2.neq(c.d1)}
		},
		statTemplates.masteryMul(22),
		statTemplates.res1_8,
		{
			label:achievement.label(804),
			mod:function(){return N(1.123).pow(stat.realDarkStars.div(7))},
			func:function(prev){return g.achievement[804]?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall("1.123","floor("+stat.realDarkStars.noLeadFormat(3)+" ÷ 7)",3)},
			dependencies:["realDarkStars"],
			show:function(){return g.achievement[804]}
		}
	]
};
miscStats.ZAxisEffect={
	type:"breakdown",
	label:"Z Axis effect",
	visible:function(){return stat.axisUnlocked>=3;},
	category:"Axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			exp:function(){
				let out = N(1.5);
				if (g.achievement[211]) out = out.add(c.d0_01);
				out = out.add(stat.stardustBoost10);
				return out;
			},
			constant:function(){return g.exoticmatter.max(c.d1).mul(c.e10).log10().log10().log10().add(c.d1);},
			func:function(){return [c.d10,this.constant(),this.constant(),this.exp()].decimalPowerTower().mul(c.d0_15);},
			consttext:function(){return unbreak("(log<sup>[3]</sup>("+statFormat("EM",g.exoticmatter.format(2),"_exoticmatter")+" × "+BEformat(c.e10)+") + 1)");},
			text:function(){return "10 ^ "+this.consttext()+" ^ "+this.consttext()+" ^ "+this.exp().noLeadFormat(3)+" × 0.15";},
			dependencies:["stardustBoost10"],
			show:function(){return true}
		},
		statTemplates.ach209Reward,
		statTemplates.res1_8,
		{
			label:"Research 6-1",
			func:function(prev){return g.research.r6_1?[prev,stat.darkEnergyEffect,researchEffect(6,1)].decimalPowerTower():prev;},
			text:function(){return "^ "+stat.darkEnergyEffect.pow(researchEffect(6,1)).format(4)+" "+(researchEffect(6,1).eq(c.d1)?"":SSBsmall(stat.darkEnergyEffect.format(4),researchEffect(6,1).noLeadFormat(4),3));},
			dependencies:["darkEnergyEffect"],
			show:function(){return g.research.r6_1&&stat.darkEnergyEffect.neq(c.d1)&&researchEffect(6,1).neq(c.d0)}
		},
		{
			label:"Research 16-4",
			mod:function(){return stat.SAxisEffect.pow(Decimal.mul(researchEffect(16,4),stat.realSAxis))},
			func:function(prev){return g.research.r16_4?prev.pow(this.mod()):prev},
			text:function(){return "^ "+this.mod().format(4)+" "+SSBsmall(stat.SAxisEffect.format(4),researchEffect(16,4).eq(c.d1)?stat.realSAxis.noLeadFormat(2):SSBsmall(stat.realSAxis.noLeadFormat(2),researchEffect(16,4).noLeadFormat(2),2),3)},
			dependencies:["SAxisEffect","realSAxis"],
			show:function(){return g.research.r16_4&&stat.SAxisEffect.neq(c.d1)&&stat.realSAxis.neq(c.d0)}
		}
	]
};
miscStats.WAxisEffect={
	type:"breakdown",
	label:"W Axis effect",
	visible:function(){return stat.axisUnlocked>=4;},
	category:"Axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			time:function(){
				let out = g.truetimeThisStardustReset;
				if (g.achievement[109]) out = out.add(stat.realWAxis.pow(achievement(109).effect()).mul(c.d30));
				return out;
			},
			func:function(){return this.time().pow(c.d0_75).add(c.e2).log10().quad_tetr(c.d1_15);},
			text:function(){return unbreak("log("+statFormat("t",this.time().format(0),"_time")+" ^ 0.75 + 100)")+" ^^ 1.15";},
			dependencies:["realWAxis"],
			show:function(){return true}
		},
		statTemplates.ach209Reward,
		statTemplates.timeResearch(16,10),
		statTemplates.res1_8,
		{
			label:"Stardust Boost 3",
			func:function(prev){return prev.pow(stat.stardustBoost3);},
			text:function(){return "^ "+stat.stardustBoost3.format(4);},
			dependencies:["stardustBoost3"],
			show:function(){return stat.stardustBoost3.neq(c.d1)}
		}
	]
};
miscStats.VAxisEffect={
	type:"breakdown",
	label:"V Axis effect",
	visible:function(){return stat.axisUnlocked>=5;},
	category:"Axis effects",
	precision:2,
	modifiers:[
		statTemplates.base("3",c.d3,true),
		statTemplates.ach209Reward,
		statTemplates.res1_8,
		{
			label:"Stardust Boost 8",
			func:function(prev){return prev.pow(stat.stardustBoost8);},
			text:function(){return "^ "+stat.stardustBoost8.format(4);},
			dependencies:["stardustBoost8"],
			show:function(){return stat.stardustBoost8.neq(c.d1)}
		},
		{
			label:"Star 82",
			func:function(prev){return g.star[82]?prev.pow(c.d3):prev},
			text:function(){return "^ 3";},
			show:function(){return g.star[82]}
		},
		{
			label:"Dark V Axis",
			mod:function(){return [stat.darkVAxisEffect,stat.realdarkVAxis,c.d0_01].productDecimals().add(c.d1);},
			func:function(prev){return prev.pow(this.mod());},
			text:function(){return "^ "+this.mod().noLeadFormat(3)+" <span class=\"small\">"+unbreak("("+stat.darkVAxisEffect.div(c.e2).noLeadFormat(2)+" × "+stat.realdarkVAxis.noLeadFormat(2)+" + 1)")+"</span>";},
			dependencies:["darkVAxisEffect","realdarkVAxis"],
			show:function(){return stat.darkVAxisEffect.neq(c.d0)&&stat.realdarkVAxis.neq(c.d0)}
		},
		{
			label:"Research 6-13",
			func:function(prev){return g.research.r6_13?[prev,stat.spatialEnergyEffect,researchEffect(6,13)].decimalPowerTower():prev},
			text:function(){return "^ "+stat.spatialEnergyEffect.pow(researchEffect(6,13)).format(4)+" "+(researchEffect(6,13).eq(c.d1)?"":SSBsmall(stat.spatialEnergyEffect.format(4),researchEffect(6,13).noLeadFormat(4),3));},
			dependencies:["spatialEnergyEffect"],
			show:function(){return g.research.r6_13&&stat.spatialEnergyEffect.neq(c.d1)&&researchEffect(6,13).neq(c.d0)}
		}
	]
};
miscStats.UAxisEffect={
	type:"breakdown",
	label:"U Axis effect",
	visible:function(){return stat.axisUnlocked>=6;},
	category:"Axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return g.stardust.add(c.e10).log10().log10().pow(c.d2).div(c.d10).pow10();}, 
			text:function(){return "10 ^ "+unbreak("(log<sup>[2]</sup>("+statFormat("S",g.stardust.format(0),"_stardust")+" + "+BEformat(c.e10)+") ^ 2 ÷ 10)");},
			show:function(){return true}
		},
		statTemplates.ach209Reward,
		statTemplates.res1_8,
		{
			label:"Galaxy Boost 3",
			mod:function(){return galaxyEffects[3].boost.value().pow(g.stars)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(galaxyEffects[3].boost.value().noLeadFormat(2),g.stars,3)},
			show:function(){return g.galaxies>=galaxyEffects[3].req}
		},
		{
			label:"Study of Studies reward 1",
			mod:function(){return studies[10].reward(1).pow(totalAchievements)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().noLeadFormat(3)+" "+SSBsmall(studies[10].reward(1).noLeadFormat(4),String(totalAchievements),3)},
			show:function(){return g.studyCompletions[10]>0}
		},
		{
			label:achievement.label(511),
			func:function(prev){return g.achievement[511]?prev.pow(c.d1_009):prev},
			text:function(){return "^ 1.009";},
			show:function(){return g.achievement[511]}
		},
		{
			label:"Research 5-2",
			func:function(prev){return g.research.r5_2?[prev,stat.stelliferousEnergyEffect,researchEffect(5,2)].decimalPowerTower():prev},
			text:function(){return "^ "+stat.stelliferousEnergyEffect.pow(researchEffect(5,2)).format(4)+" "+(researchEffect(5,2).eq(c.d1)?"":SSBsmall(stat.stelliferousEnergyEffect.format(4),researchEffect(5,2).noLeadFormat(4),3));},
			dependencies:["stelliferousEnergyEffect"],
			show:function(){return g.research.r5_2&&stat.stelliferousEnergyEffect.neq(c.d1)&&researchEffect(5,2).neq(c.d0)}
		}
	]
};
miscStats.TAxisEffect={
	type:"breakdown",
	label:"T Axis effect",
	visible:function(){return stat.axisUnlocked>=7;},
	category:"Axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return stat.totalNormalAxis.add(c.d10).log10().tetrate(2).div(c.d2).pow10();},
			text:function(){return "10 ^ "+unbreak("(log("+statFormat("ΣA",stat.totalNormalAxis.format(0),"_exoticmatter")+" + 10) ^^ 2 ÷ 2)");},
			dependencies:["totalNormalAxis"],
			show:function(){return true}
		},
		statTemplates.ach209Reward,
		statTemplates.res1_8,
		{
			label:"Green Light",
			func:function(prev){return prev.mul(lightCache.currentEffect[1].pow(g.SAxis))},
			text:function(){return "× "+lightCache.currentEffect[1].pow(g.SAxis).format(2)+" "+SSBsmall(lightCache.currentEffect[1].noLeadFormat(2),g.SAxis.format(),3)},
			show:function(){return lightCache.currentEffect[1].neq(c.d1)&&g.SAxis.neq(c.d0)}
		},
		{
			label:"Research 5-1",
			func:function(prev){return g.research.r5_1?[prev,stat.darkEnergyEffect,researchEffect(5,1)].decimalPowerTower():prev},
			text:function(){return "^ "+stat.darkEnergyEffect.pow(researchEffect(5,1)).format(4)+" "+(researchEffect(5,1).eq(c.d1)?"":SSBsmall(stat.darkEnergyEffect.format(4),researchEffect(5,1).noLeadFormat(4),3));},
			dependencies:["darkEnergyEffect"],
			show:function(){return g.research.r5_1&&stat.darkEnergyEffect.neq(c.d1)&&researchEffect(5,1).neq(c.d0)}
		}
	]
};
miscStats.SAxisEffect={
	type:"breakdown",
	label:"S Axis effect",
	visible:function(){return stat.axisUnlocked>=8;},
	category:"Axis effects",
	precision:4,
	modifiers:[
		statTemplates.base("1.025",c.d1_025,true),
		...statTemplates.ach525_526Reward,
		{
			label:achievement.label(505),
			func:function(prev){return g.achievement[505]?prev.pow(achievement(505).effect()):prev},
			text:function(){return "^ "+achievement(505).effect().noLeadFormat(3);},
			show:function(){return g.achievement[505]}
		}
	]
};
for (let i=0;i<axisCodes.length;i++) {
	let type = axisCodes[i]
	let out = [statTemplates.base("0",c.d0,false)]
	// additive effects
	out.push(statTemplates.darkMatterFreeAxis(type))
	if (i===0) out.push(
		{
			label:achievement.label(108),
			func:function(prev){return g.achievement[108]?prev.add(g.ZAxis.mul(achievement(108).effect())):prev;},
			text:function(){return "+ "+g.ZAxis.mul(achievement(108).effect()).noLeadFormat(2);},
			show:function(){return g.achievement[108]&&g.ZAxis.neq(c.d0)}
		},
		statTemplates.masteryAdd(51)
	)
	if (i===1) out.push(
		{
			label:achievement.label(107),
			func:function(prev){return g.achievement[107]?prev.add(c.d1):prev},
			text:function(){return "+ 1";},
			show:function(){return g.achievement[107]}
		},
		{
			label:achievement.label(206),
			func:function(prev){return g.achievement[206]?prev.add(achievement(206).effect()):prev;},
			text:function(){return "+ "+achievement(206).effect().format(2);},
			show:function(){return g.achievement[206]&&g.masteryPower.neq(c.d1)}
		}
	)
	if ([2,3].includes(i)) out.push(statTemplates.masteryAdd(i+29))
	if ([4,5,6].includes(i)) out.push({
		label:achievement.label(302+i),
		func:function(prev){return g.achievement[302+i]?prev.add(c.d1):prev},
		text:function(){return "+ 1";},
		show:function(){return g.achievement[302+i]}
	})
	if (i<4) {out.push(statTemplates.row2Star(i+21))} else {out.push(statTemplates.row6Star(i+57))}
	if (i<7) out.push(statTemplates.ach210Reward(axisCodes[i+1]))
	if (i===7) out.push({
		label:"Research 3-2",
		func:function(prev){return g.research.r3_2?prev.add(researchEffect(3,2)):prev},
		text:function(){return "+ "+researchEffect(3,2).noLeadFormat(2);},
		show:function(){return g.research.r3_2&&researchEffect(3,2).neq(c.d0)}
	})
	if (i<7) out.push({
		label:"Cinquefolium "+luckUpgrades.cinquefolium.axis.name,
		func:function(prev){return prev.add(g[type+"Axis"].pow(c.d0_5).mul(luckUpgrades.cinquefolium.axis.eff()))},
		text:function(){return "+ "+g[type+"Axis"].pow(c.d0_5).mul(luckUpgrades.cinquefolium.axis.eff()).format(3)+" "+SSBsmall(SSBsmall(g[type+"Axis"].format(),"0.5",3),luckUpgrades.cinquefolium.axis.eff().noLeadFormat(3),2)},
		show:function(){return effLuckUpgradeLevel("cinquefolium","axis").neq(c.d0)&&g[type+"Axis"].neq(c.d0)}
	})
	// multiplicative effects
	if (i===0) out.push({
		label:"Spatial Energy",
		func:function(prev){return prev.mul(stat.spatialEnergyEffect);},
		text:function(){return "× "+stat.spatialEnergyEffect.format(4);},
		dependencies:["spatialEnergyEffect"],
		show:function(){return stat.spatialEnergyEffect.neq(c.d1)}
	})
	// softcap
	out.push(statTemplates.axisSoftcap(type,"var(--exoticmatter)"))
	// initialize
	miscStats["free"+type+"Axis"] = {
		type:"breakdown",
		label:"Free "+type+" Axis",
		visible:function(){return stat["free"+type+"Axis"].neq(c.d0)},
		category:"Free axis",
		precision:2,
		modifiers:out
	}
}
for (let group of ["","dark","anti"]) {
	let groupName = ((group==="")?"":(group==="dark")?"Dark ":"Anti-")
	for (let i=0;i<axisCodes.length;i++) {
		let type = axisCodes[i]
		let out = [
			{
				label:"Purchased "+groupName+type+" Axis",
				func:function(){return g[group+type+"Axis"]},
				text:function(){return g[group+type+"Axis"].format()},
				show:function(){return true}
			},
			{
				label:"Free "+groupName+type+" Axis",
				func:function(prev){return prev.add(stat["free"+group+type+"Axis"])},
				text:function(){return "+ "+stat["free"+group+type+"Axis"].noLeadFormat(2)},
				dependencies:["free"+group+type+"Axis"],
				show:function(){return stat["free"+group+type+"Axis"].neq(c.d0)},
			}
		]
		if (["","dark"].includes(group)) out.push({
			label:"Anti-"+type+" Axis",
			func:function(prev){return prev.mul(antiAxisDimBoost(type))},
			text:function(){return "× "+antiAxisDimBoost(type).noLeadFormat(4)},
			show:function(){return antiAxisDimBoost(type).neq(c.d1)}
		})
		out.push({
			label:"Study XI",
			func:function(prev){return (StudyE(11)&&(studies[11].active()!==type))?c.d0:prev},
			text:function(){return "0"},
			show:function(){return StudyE(11)&&(studies[11].active!==type)},
			color:"#cc0000"
		},{
			label:"Not unlocked",
			func:dictionary(group,[
				["",function(prev){return (stat.axisUnlocked>i)?prev:c.d0}],
				["dark",function(prev){return (g.stardustUpgrades[0]+4>i)?prev:c.d0}],
				["anti",function(prev){return antiAxisUnlocked(type)?prev:c.d0}]
			]),
			text:function(){return "0"},
			dependencies:["axisUnlocked"],
			show:function(){return g[group+type+"Axis"].sign!==stat["real"+group+type+"Axis"].sign}
		})
		miscStats["real"+group+type+"Axis"] = {
			type:"breakdown",
			label:"Effective "+groupName+type+" Axis",
			visible:function(){return unlocked("Antimatter")&&Decimal.neq(g[group+type+"Axis"],stat["real"+group+type+"Axis"])},
			newRow:(group!=="")&&(type==="X"),
			category:"Effective axis",
			precision:2,
			modifiers:out
		}
	}
}
miscStats.darkXAxisEffect={
	type:"breakdown",
	label:"Dark X Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0;},
	category:"Axis effects",
	newRow:true,
	precision:2,
	modifiers:[
		statTemplates.base("3",c.d3,true),
		{
			label:achievement.label(802),
			mod:function(){return g.observations[3].div(c.e2).add(c.d1)},
			func:function(prev){return g.achievement[802]?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().noLeadFormat(2)},
			show:function(){return g.achievement[802]}
		},
		statTemplates.timeResearch(16,9),
		statTemplates.darkStarEffect2("X"), 
		statTemplates.masteryPow(61)
	]
};
miscStats.darkYAxisEffect={
	type:"breakdown",
	label:"Dark Y Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0;},
	category:"Axis effects",
	precision:2,
	modifiers:[
		statTemplates.base("4",c.d4,true),
		{
			label:achievement.label(704),
			func:function(prev){return g.achievement[704]?prev.add(5/9):prev},
			text:function(){return "+ 0.5555"},
			show:function(){return g.achievement[704]}
		},
		statTemplates.darkStarEffect2("Y"),
		{
			label:"Star 84",
			func:function(prev){return g.star[84]?prev.pow(c.d3):prev},
			text:function(){return "^ 3";},
			show:function(){return g.star[84]}
		},
		{
			label:"Research 14-10",
			func:function(prev){return g.research.r14_10?prev.pow(researchEffect(14,10)):prev},
			text:function(){return "^ "+researchEffect(14,10).format(4)},
			show:function(){return g.research.r14_10}
		},
		{
			label:"Anti-V Axis",
			mod:function(){return [stat.antiVAxisEffect,stat.realantiVAxis,c.d0_01].productDecimals().add(c.d1);},
			func:function(prev){return prev.pow(this.mod());},
			text:function(){return "^ "+this.mod().noLeadFormat(3)+" <span class=\"small\">"+unbreak("("+stat.antiVAxisEffect.div(c.e2).noLeadFormat(2)+" × "+stat.realantiVAxis.noLeadFormat(2)+" + 1)")+"</span>";},
			dependencies:["antiVAxisEffect","realantiVAxis"],
			show:function(){return stat.antiVAxisEffect.neq(c.d0)&&stat.realantiVAxis.neq(c.d0)}
		},
	]
};
miscStats.darkZAxisEffect={
	type:"breakdown",
	label:"Dark Z Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0;},
	category:"Axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return g.exoticmatter.pow(c.d0_005).div(c.d10).add(c.d1).dilate(c.d0_2).pow(c.d0_2);},
			text:function(){return "10 ^ "+unbreak("(log("+statFormat("EM",g.exoticmatter.format(0),"_exoticmatter")+" ^ 0.005 ÷ 10 + 1) ^ 0.2)")+" ^ 0.2";},
			show:function(){return true}
		},
		statTemplates.darkStarEffect2("Z"),
		{
			label:"Stardust Boost 6",
			func:function(prev){return prev.pow(stat.stardustBoost6);},
			text:function(){return "^ "+stat.stardustBoost6.format(4);},
			dependencies:["stardustBoost6"],
			show:function(){return stat.stardustBoost6.neq(c.d1)}
		}
	]
};
miscStats.darkWAxisEffect={
	type:"breakdown",
	label:"Dark W Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0;},
	category:"Axis effects",
	precision:3,
	modifiers:[
		statTemplates.base("1.15",c.d1_15,true),
		statTemplates.darkStarEffect2("W"),
		{
			label:"Research 6-14",
			func:function(prev){return g.research.r6_14?[prev,stat.neuralEnergyEffect,researchEffect(6,14)].decimalPowerTower():prev;},
			text:function(){return "^ "+stat.neuralEnergyEffect.pow(researchEffect(6,14)).format(4)+" "+(researchEffect(6,14).eq(c.d1)?"":SSBsmall(stat.neuralEnergyEffect.format(4),researchEffect(6,14).noLeadFormat(4),3));},
			dependencies:["neuralEnergyEffect"],
			show:function(){return g.research.r6_14&&stat.neuralEnergyEffect.neq(c.d1)&&researchEffect(6,14).neq(c.d0)}
		},
		{
			label:achievement.label(808),
			func:function(prev){return g.achievement[808]?prev.pow(achievement(808).effect()):prev},
			text:function(){return "^ "+achievement(808).effect().toFixed(4)},
			show:function(){return g.achievement[808]}
		}
	]
};
miscStats.darkVAxisEffect={
	type:"breakdown",
	label:"Dark V Axis effect",
	visible:function(){return (g.stardustUpgrades[0]>0)&&(g.stardustUpgrades[4]>0);},
	category:"Axis effects",
	precision:2,
	modifiers:[
		statTemplates.base("10",c.d10,true),
		statTemplates.darkStarEffect2("V")
	]
};
miscStats.darkUAxisEffect={
	type:"breakdown",
	label:"Dark U Axis effect",
	visible:function(){return (g.stardustUpgrades[0]>1)&&(g.stardustUpgrades[4]>0);},
	category:"Axis effects",
	precision:3,
	modifiers:[
		statTemplates.base("1.02",c.d1_02,true),
		statTemplates.darkStarEffect2("U"),
		{
			label:"Research 5-3",
			func:function(prev){return g.research.r5_3?[prev,stat.gravitationalEnergyEffect,researchEffect(5,3)].decimalPowerTower():prev},
			text:function(){return "^ "+stat.gravitationalEnergyEffect.pow(researchEffect(5,3)).format(4)+" "+(researchEffect(5,3).eq(c.d1)?"":SSBsmall(stat.gravitationalEnergyEffect.format(4),researchEffect(5,3).noLeadFormat(4),3));},
			dependencies:["gravitationalEnergyEffect"],
			show:function(){return g.research.r5_3&&stat.gravitationalEnergyEffect.neq(c.d1)&&researchEffect(5,3).neq(c.d0)}
		}
	]
};
miscStats.darkTAxisEffect={
	type:"breakdown",
	label:"Dark T Axis effect",
	visible:function(){return (g.stardustUpgrades[0]>2)&&(g.stardustUpgrades[4]>0);},
	category:"Axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			time:function(){
				let out = g.truetimeThisStardustReset;
				if (achievement.ownedInTier(5)>=18) out = out.add(wormholeMilestone18Effect());
				return out;
			},
			func:function(){return this.time().div(c.e3).add(c.d1).dilate(c.d0_5);},
			text:function(){return unbreak("10 ^ log("+statFormat("t",this.time().format(0),"_time")+" ÷ 1,000 + 1)")+" ^ 0.5";},
			show:function(){return true}
		},
		statTemplates.darkStarEffect2("T")
	]
};
miscStats.darkSAxisEffect={
	type:"breakdown",
	label:"Dark S Axis effect",
	visible:function(){return (g.stardustUpgrades[0]>3)&&(g.stardustUpgrades[4]>0);},
	category:"Axis effects",
	precision:4,
	modifiers:[
		statTemplates.base("1.01",c.d1_01,true),
		...statTemplates.ach525_526Reward,
		statTemplates.darkStarEffect2("S")
	]
};
miscStats.axisCostDivisor={
	type:"breakdown",
	label:"Normal Axis Cost Divisor",
	visible:function(){return stat.axisCostDivisor.neq(c.d1);},
	category:"Axis costs",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		statTemplates.masteryMul(12),
		{
			label:"V Axis",
			mod:function(){return stat.VAxisEffect.pow(stat.realVAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.VAxisEffect.noLeadFormat(2),stat.realVAxis.noLeadFormat(2),3);},
			dependencies:["VAxisEffect","realVAxis"],
			show:function(){return stat.VAxisEffect.neq(c.d1)&&stat.realVAxis.neq(c.d0)}
		},
		{
			label:achievement.label(207),
			mod:function(){return achievement(207).effect().pow(stat.totalNormalAxis);},
			func:function(prev){return g.achievement[207]?prev.div(this.mod()):prev;},
			text:function(){return "÷ "+this.mod().format(2)+" "+SSBsmall(achievement(207).effect().noLeadFormat(3),stat.totalNormalAxis.format(0),3);},
			dependencies:["totalNormalAxis"],
			show:function(){return g.achievement[207]&&stat.totalNormalAxis.neq(c.d0)}
		},
		statTemplates.study9
	]
};
miscStats.axisCostExponent={
	type:"breakdown",
	label:"Normal Axis Cost Exponent",
	visible:function(){return stat.axisCostExponent.neq(c.d1);},
	category:"Axis costs",
	precision:4,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:"Star 81",
			func:function(prev){return g.star[81]?prev.mul(c.d0_8):prev},
			text:function(){return "× 0.8";},
			show:function(){return g.star[81]}
		},
		{
			label:achievement.label(517),
			func:function(prev){return g.achievement[517]?prev.mul(c.d0_95):prev},
			text:function(){return "× 0.95";},
			show:function(){return g.achievement[517]}
		},
		{
			label:"Dimensional Energy",
			func:function(prev){return prev.mul(stat.dimensionalEnergyEffect)},
			text:function(){return "× "+stat.dimensionalEnergyEffect.format(4)},
			dependencies:["dimensionalEnergyEffect"],
			show:function(){return stat.dimensionalEnergyEffect.neq(c.d1)}
		},
		{
			label:achievement.label(801),
			func:function(prev){return MasteryE(62)?prev.mul(masteryEffect(62).pow(c.d0_1)):prev},
			text:function(){return "× "+masteryEffect(62).pow(c.d0_1).format(4)+" "+SSBsmall(masteryEffect(62).format(4),"0.1",3)},
			dependencies:masteryDependencies(62),
			show:function(){return g.achievement[801]&&MasteryE(62)}
		},
		{
			label:"Trifolium "+luckUpgrades.trifolium.normalAxis.name,
			func:function(prev){return prev.mul(luckUpgrades.trifolium.normalAxis.eff())},
			text:function(){return "× "+luckUpgrades.trifolium.normalAxis.eff().format(3)},
			show:function(){return effLuckUpgradeLevel("trifolium","normalAxis").neq(c.d0)}
		}
	]
};
miscStats.darkAxisCostDivisor={
	type:"breakdown",
	label:"Dark Axis Cost Divisor",
	visible:function(){return stat.darkAxisCostDivisor.neq(c.d1);},
	category:"Axis costs",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:"Dark Y Axis",
			mod:function(){return stat.darkYAxisEffect.pow(stat.realdarkYAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.darkYAxisEffect.noLeadFormat(2),stat.realdarkYAxis.noLeadFormat(2),3);},
			dependencies:["darkYAxisEffect","realdarkYAxis"],
			show:function(){return stat.darkYAxisEffect.neq(c.d1)&&stat.realdarkYAxis.neq(c.d0)}
		},
		{
			label:achievement.label(709),
			func:function(prev){return g.achievement[709]?prev.mul(achievement(501).realEffect()):prev},
			text:function(){return "× "+achievement(501).realEffect().format(2)},
			show:function(){return g.achievement[709]}
		},
		statTemplates.study9,
	]
};
miscStats.darkAxisCostExponent={
	type:"breakdown",
	label:"Dark Axis Cost Exponent",
	visible:function(){return stat.darkAxisCostExponent.neq(c.d1);},
	category:"Axis costs",
	precision:4,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		statTemplates.masteryMul(62),
		{
			label:"Star 83",
			func:function(prev){return g.star[83]?prev.mul(c.d0_8):prev},
			text:function(){return "× 0.8";},
			show:function(){return g.star[83]}
		},
		{
			label:"Dimensional Energy",
			func:function(prev){return prev.mul(stat.dimensionalEnergyEffect)},
			text:function(){return "× "+stat.dimensionalEnergyEffect.format(4)},
			dependencies:["dimensionalEnergyEffect"],
			show:function(){return stat.dimensionalEnergyEffect.neq(c.d1)}
		},
		{
			label:"Trifolium "+luckUpgrades.trifolium.darkAxis.name,
			func:function(prev){return prev.mul(luckUpgrades.trifolium.darkAxis.eff())},
			text:function(){return "× "+luckUpgrades.trifolium.darkAxis.eff().format(3)},
			show:function(){return effLuckUpgradeLevel("trifolium","darkAxis").neq(c.d0)}
		},
		{
			label:achievement.label(806),
			func:function(prev){return g.achievement[806]?prev.mul(c.d0_95):prev},
			text:function(){return "× 0.95";},
			show:function(){return g.achievement[806]}
		}
	]
};
miscStats.antiAxisCostDivisor={
	type:"breakdown",
	label:"Anti-axis cost divisor",
	visible:function(){return (g.studyCompletions[9]>0)&&stat.antiAxisCostDivisor.neq(c.d1)},
	category:"Axis costs",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:"Anti-W Axis",
			mod:function(){return stat.antiWAxisEffect.pow(stat.realantiWAxis)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.antiWAxisEffect.noLeadFormat(2),stat.realantiWAxis.noLeadFormat(3),3)},
			dependencies:["antiWAxisEffect","realantiWAxis"],
			show:function(){return stat.antiWAxisEffect.neq(c.d1)&&stat.realantiWAxis.neq(c.d0)}
		}
	]
}
miscStats.antiAxisCostExponent={
	type:"breakdown",
	label:"Anti-axis cost exponent",
	visible:function(){return (g.studyCompletions[9]>0)&&stat.antiAxisCostExponent.neq(c.d1)},
	category:"Axis costs",
	precision:4,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:"Dimensional Energy",
			func:function(prev){return prev.mul(stat.dimensionalEnergyEffect)},
			text:function(){return "× "+stat.dimensionalEnergyEffect.format(4)},
			dependencies:["dimensionalEnergyEffect"],
			show:function(){return stat.dimensionalEnergyEffect.neq(c.d1)}
		},
		{
			label:"Trifolium "+luckUpgrades.trifolium.antiAxis.name,
			func:function(prev){return prev.mul(luckUpgrades.trifolium.antiAxis.eff())},
			text:function(){return "× "+luckUpgrades.trifolium.antiAxis.eff().format(3)},
			show:function(){return effLuckUpgradeLevel("trifolium","antiAxis").neq(c.d0)}
		},
	]
}
miscStats.energyGainSpeed={
	type:"breakdown",
	label:"Energy gain",
	visible:function(){return stat.energyGainSpeed.neq(c.d1)&&(energyTypesUnlocked()>0);},
	category:"Energy",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		statTemplates.masteryMul(71),
		{
			label:"Tier 4 achievements 2-7",
			mod:function(){
				let out = c.d1
				for (let i=402;i<408;i++){if(g.achievement[i]){out=out.mul(i/100-2.99)}}
				return out
			},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().noLeadFormat(3)},
			show:function(){return g.achievement[402]}
		},
		{
			label:"Meta Energy",
			func:function(prev){return prev.mul(stat.metaEnergyEffect);},
			text:function(){return "× "+stat.metaEnergyEffect.format(4);},
			dependencies:["metaEnergyEffect"],
			show:function(){return stat.metaEnergyEffect.neq(c.d1)}
		},
		{
			label:"Research 8-5",
			mod:function(){return researchEffect(8,5).mul(totalAchievements).add(c.d1)},
			func:function(prev){return g.research.r8_5?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().noLeadFormat(2)},
			show:function(){return g.research.r8_5&&researchEffect(8,5).neq(c.d0)&&totalAchievements>0}
		},
		{
			label:"Research 9-13",
			func:function(prev){return g.research.r9_13?prev.mul(researchEffect(9,13)):prev},
			text:function(){return "× "+researchEffect(9,13).format(2)},
			show:function(){return g.research.r9_13}
		},
		{
			label:achievement.label(606),
			func:function(prev){return g.achievement[606]?prev.mul(achievement(606).effect()):prev},
			text:function(){return "× "+achievement(606).effect().format(2)},
			show:function(){return g.achievement[606]&&achievement(606).effect().neq(c.d1)}
		},
		{
			label:"Research 15-7",
			func:function(prev){return g.research.r15_7?prev.mul(researchEffect(15,7)):prev},
			text:function(){return "× "+researchEffect(15,7).format(2)},
			show:function(){return g.research.r15_7}
		},
		statTemplates.tickspeed(()=>[
			g.achievement[408]?achievement(408).effect():c.d1,
			studies[10].reward(3)
		].sumDecimals())
	]
};
miscStats.energyEffectBoost={
	type:"breakdown",
	label:"Energy effect boost",
	visible:function(){return stat.energyEffectBoost.neq(c.d1)&&(energyTypesUnlocked()>0);},
	category:"Energy",
	precision:4,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		statTemplates.masteryMul(72),
		{
			label:"Tier 4 achievements",
			func:function(prev){return prev.mul(achievement.perAchievementReward[4].currentVal);},
			text:function(){return "× "+achievement.perAchievementReward[4].currentVal.toFixed(3);},
			show:function(){return achievement.ownedInTier(4)>0}
		},
		{
			label:"Research 10-2",
			func:function(prev){return g.research.r10_2?prev.mul(researchEffect(10,2)):prev},
			text:function(){return "× "+researchEffect(10,2).noLeadFormat(4)},
			show:function(){return g.research.r10_2}
		}
	]
};
miscStats.tickspeed={
	type:"breakdown",
	label:"Tickspeed",
	visible:function(){return stat.tickspeed.neq(c.d1);},
	category:"Tickspeed",
	precision:3,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:"Dilation Upgrade 4",
			func:function(prev){return prev.mul(dilationUpgrades[4].effect())},
			text:function(){return "× "+dilationUpgrades[4].effect().toFixed(2)},
			show:function(){return g.dilationUpgrades[4]>0}
		},
		{
			label:achievement.label(212,4),
			mod:function(){return 1.004**[212,213,214,215].map(x => g.achievement[x]?1:0).sum()},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+BEformat(this.mod(),3);},
			show:function(){return g.achievement[212]}
		},
		{
			label:achievement.label(409,3),
			mod:function(){return [409,410,411].map(x => g.achievement[x]?achievement(x).effect().div(c.e2).add(c.d1):c.d1).reduce((x,y)=>x.mul(y));},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(3);},
			show:function(){return g.achievement[409]}
		},
		...(function(){
			let out = []
			for (let i=71;i<75;i++) out.push({
				label:"Star "+i,
				mod:function(){return starEffect(i).div(c.e2).add(c.d1);},
				func:function(prev){return g.star[i]?prev.mul(this.mod()):prev;},
				text:function(){return "× "+this.mod().format(3);},
				show:function(){return g.star[i]}
			})
			return out
		})(),
		statTemplates.achievementMul(510),
		{
			label:"Research 5-15",
			func:function(prev){return g.research.r5_15?prev.mul(stat.metaEnergyEffect.pow(researchEffect(5,15))):prev},
			text:function(){return "× "+stat.metaEnergyEffect.pow(researchEffect(5,15)).format(4)+" "+(researchEffect(5,15).eq(c.d1)?"":SSBsmall(stat.metaEnergyEffect.format(4),researchEffect(5,15).noLeadFormat(4),3));},
			dependencies:["metaEnergyEffect"],
			show:function(){return g.research.r5_15&&stat.metaEnergyEffect.neq(c.d1)&&researchEffect(5,15).neq(c.d0)}
		},
		{
			label:"Research 6-6",
			mod:function(){return researchEffect(6,6).mul(totalAchievements).add(c.d1);},
			func:function(prev){return g.research.r6_6?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(3);},
			show:function(){return g.research.r6_6&&researchEffect(6,6).neq(c.d0)&&totalAchievements>0}
		},
		{
			label:"Wormhole Milestone 13",
			mod:function(){return totalAchievements/400+1;},
			func:function(prev){return (achievement.ownedInTier(5)>12)?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().toFixed(4);},
			show:function(){return achievement.ownedInTier(5)>12}
		},
		{
			label:achievement.label(614),
			mod:function(){return achievement(614).effect().div(c.e2).add(c.d1)},
			func:function(prev){return g.achievement[614]?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().noLeadFormat(2)},
			show:function(){return g.achievement[614]}
		},
		{
			label:"Research 14-6",
			func:function(prev){return g.research.r14_6?prev.mul(researchEffect(14,6)):prev;},
			text:function(){return "× "+researchEffect(14,6).format(3);},
			show:function(){return g.research.r14_6}
		},
		{
			label:"Study VI",
			func:function(prev){return StudyE(6)?prev.div(studies[6].effect()):prev},
			text:function(){return "÷ "+studies[6].effect().format()},
			show:function(){return StudyE(6)},
			color:"#cc0000"
		},
		{
			label:"Temporal Energy",
			func:function(prev){return prev.mul(stat.temporalEnergyEffect)},
			text:function(){return "× "+stat.temporalEnergyEffect.format(4)},
			dependencies:["temporalEnergyEffect"],
			show:function(){return stat.temporalEnergyEffect.neq(c.d1)}
		},
		{
			label:"Galaxy Penalty 5",
			func:function(prev){return (unspentStars()<20)?prev.div(galaxyEffects[5].penalty.value().pow(20-unspentStars())):prev},
			text:function(){return "÷ "+galaxyEffects[5].penalty.value().pow(20-unspentStars()).noLeadFormat(3)+" "+SSBsmall(galaxyEffects[5].penalty.value().noLeadFormat(3),"(20 - "+unspentStars()+")",3)},
			show:function(){return galaxyEffects[5].penalty.value().neq(c.d1)&&(unspentStars()<20)}
		},
		{
			label:"Temporal Paradox",
			func:function(prev){return prev.max(c.d0);},
			text:function(){return "No negative numbers allowed";},
			show:function(){return stat.tickspeed.sign===-1},
			color:"var(--time2)"
		}
	]
};
miscStats.pendinghr={
	type:"breakdown",
	label:"Hawking radiation gain",
	visible:function(){return unlocked("Hawking Radiation")||stat.totalDarkAxis.gte(c.e3);},
	category:"Hawking radiation gain",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return stat.totalDarkAxis.lt(stat.wormholeDarkAxisReq)?c.d0:[c.d2,stat.totalDarkAxis.div(c.d1500),stat.HRBaseApexExp].decimalPowerTower();},
			text:function(){return stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)?("2 ^ "+unbreak("("+statFormat("ΣA",stat.totalDarkAxis.format(0),"_darkmatter")+" ÷ 1,500)")+" ^ "+stat.HRBaseApexExp.noLeadFormat(4)):("Need at least "+stat.wormholeDarkAxisReq.format()+" total dark axis");},
			dependencies:["totalDarkAxis","wormholeDarkAxisReq","HRBaseApexExp"],
			show:function(){return true}
		},
		{
			label:"HR base gain exponents",
			func:function(prev){return prev.pow(stat.HRBaseExponent)},
			text:function(){return "^ "+stat.HRBaseExponent.noLeadFormat(4)},
			dependencies:["HRBaseExponent"],
			show:function(){return stat.HRBaseExponent.neq(c.d1)}
		},
		{
			label:"HR gain multipliers",
			func:function(prev){return prev.mul(stat.HRMultiplier)},
			text:function(){return "× "+stat.HRMultiplier.noLeadFormat(2)},
			dependencies:["HRMultiplier"],
			show:function(){return stat.HRMultiplier.neq(c.d1)}
		},
		{
			label:"Hawking radiation gain exponents",
			func:function(prev){return prev.pow(stat.HRExponent)},
			text:function(){return "^ "+stat.HRExponent.noLeadFormat(4)},
			dependencies:["HRExponent"],
			show:function(){return stat.HRExponent.neq(c.d1)}
		},
	],
};
miscStats.HRBaseApexExp={
	type:"breakdown",
	label:"HR base gain apex exponent",
	visible:function(){return stat.HRBaseApexExp.neq(c.d2)},
	category:"Hawking radiation gain",
	precision:4,
	modifiers:[
		statTemplates.base("2",c.d2,true),
		{
			label:"Stardust Boost 12",
			func:function(prev){return prev.add(stat.stardustBoost12)},
			text:function(){return "+ "+stat.stardustBoost12.format(4)},
			dependencies:["stardustBoost12"],
			show:function(){return g.stardustUpgrades[2]>9}
		}
	]
};
miscStats.HRBaseExponent={
	type:"breakdown",
	label:"HR base gain exponents",
	visible:function(){return stat.HRBaseExponent.neq(c.d1)},
	category:"Hawking radiation gain",
	precision:4,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:"Blue Light",
			func:function(prev){return prev.mul(lightCache.currentEffect[2])},
			text:function(){return "× "+lightEffect[2].format(lightCache.currentEffect[2])},
			show:function(){return lightCache.currentEffect[2].neq(c.d1)}
		}
	]
}
miscStats.HRMultiplier={
	type:"breakdown",
	label:"HR gain multipliers",
	visible:function(){return stat.HRMultiplier.neq(c.d1);},
	category:"Hawking radiation gain",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		statTemplates.masteryMul(102),
		{
			label:"Research 6-8",
			mod:function(){return [researchEffect(6,8),totalAchievements,g.stars].productDecimals().add(c.d1);},
			func:function(prev){return g.research.r6_8?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(2);},
			show:function(){return g.research.r6_8&&researchEffect(6,8).neq(c.d0)&&totalAchievements>0&&g.stars>0}
		},
		{
			label:"Research 6-15",
			mod:function(){return stat.metaEnergyEffect.pow(researchEffect(6,15));},
			func:function(prev){return g.research.r6_15?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().format(4)+" "+(researchEffect(6,15).eq(c.d1)?"":SSBsmall(stat.metaEnergyEffect.format(4),researchEffect(6,15).noLeadFormat(4),3));},
			dependencies:["metaEnergyEffect"],
			show:function(){return g.research.r6_15&&stat.metaEnergyEffect.neq(c.d1)&&researchEffect(6,15).neq(c.d0)}
		},
		{
			label:"Research 8-2",
			mod:function(){return stat.tickspeed.pow(researchEffect(8,2));},
			func:function(prev){return g.research.r8_2?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(stat.tickspeed.format(2),researchEffect(8,2).noLeadFormat(4),3);},
			dependencies:["tickspeed"],
			show:function(){return g.research.r8_2&&stat.tickspeed.neq(c.d1)&&researchEffect(8,2).neq(c.d0)}
		},
		{
			label:"Research 10-13",
			func:function(prev){return g.research.r10_13?prev.mul(researchEffect(10,13)):prev},
			text:function(){return "× "+researchEffect(10,13).format(2)},
			show:function(){return g.research.r10_13}
		},
		{
			label:"Study I reward 3",
			func:function(prev){return prev.mul(studies[1].reward(3));},
			text:function(){return "× "+studies[1].reward(3).noLeadFormat(2);},
			show:function(){return g.studyCompletions[1]>0}
		},
		...[601,610].map(x=>statTemplates.achievementMul(x)),
		{
			label:"Research 15-9",
			func:function(prev){return g.research.r15_9?prev.mul(researchEffect(15,9)):prev},
			text:function(){return "× "+researchEffect(15,9).format(2)},
			show:function(){return g.research.r15_9}
		},
		statTemplates.timeResearch(16,7),
		{
			label:"Cinquefolium "+luckUpgrades.cinquefolium.radiation.name,
			func:function(prev){return prev.mul(luckUpgrades.cinquefolium.radiation.eff())},
			text:function(){return "× "+luckUpgrades.cinquefolium.radiation.eff().format()},
			show:function(){return effLuckUpgradeLevel("cinquefolium","radiation").neq(c.d0)}
		}
	]
};
miscStats.HRExponent={
	type:"breakdown",
	label:"HR gain exponents",
	visible:function(){return stat.HRExponent.neq(c.d1);},
	category:"Hawking radiation gain",
	precision:4,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:achievement.label(506),
			func:function(prev){return g.achievement[506]?prev.mul(c.d1_1):prev;},
			text:function(){return "× 1.1";},
			show:function(){return g.achievement[506]}
		},
		{
			label:"Vacuum Energy",
			func:function(prev){return prev.mul(stat.vacuumEnergyEffect)},
			text:function(){return "× "+stat.vacuumEnergyEffect.format(4)},
			dependencies:["vacuumEnergyEffect"],
			show:function(){return stat.vacuumEnergyEffect.neq(c.d1)}
		}
	]
};
for (let i=0;i<axisCodes.length;i++) {
	let type = axisCodes[i]
	let out = [statTemplates.base("0",c.d0,false)]
	// additive effects
	out.push(statTemplates.ach528Reward(type))
	if (i===0) out.push(
		{
			label:"Research 3-6",
			func:function(prev){return g.research.r3_6?prev.add(researchEffect(3,6).mul(g.darkSAxis)):prev;},
			text:function(){return "+ "+researchEffect(3,6).mul(g.darkSAxis).noLeadFormat(2)+" "+SSBsmall(g.darkSAxis.format(),researchEffect(3,6).noLeadFormat(2),2);},
			show:function(){return g.research.r3_6&&researchEffect(3,6).neq(c.d0)&&g.darkSAxis.neq(c.d0)}
		},
		{
			label:"Research 3-10",
			func:function(prev){return g.research.r3_10?prev.add(researchEffect(3,10).mul(g.darkstars)):prev;},
			text:function(){return "+ "+researchEffect(3,10).mul(g.darkstars).noLeadFormat(2)+" "+SSBsmall(g.darkstars.format(),researchEffect(3,10).noLeadFormat(2),2);},
			show:function(){return g.research.r3_10&&researchEffect(3,10).neq(c.d0)&&g.darkstars.neq(c.d0)}
		}
	)
	if (i<3) out.push({
		label:achievement.label(303+i,3-i),
		effectors:[303,304,305].filter(x=>x-i>302),
		mod:function(){return this.effectors.map(x=>g.achievement[x]?1:0).sum()},
		func:function(prev){return prev.add(this.mod())},
		text:function(){return "+ "+this.mod()},
		show:function(){return this.effectors.map(x=>g.achievement[x]).includes(true)}
	})
	if (i===7) out.push({
		label:"Research 3-14",
		func:function(prev){return g.research.r3_14?prev.add(researchEffect(3,14)):prev;},
		text:function(){return "+ "+researchEffect(3,14).noLeadFormat(2);},
		show:function(){return g.research.r3_14&&researchEffect(3,14).neq(c.d0)}
	})
	if (i===1) out.push({
		label:"Luck Shards",
		func:function(prev){return prev.add(luckShardEffect1())},
		text:function(){return "+ "+luckShardEffect1().format(2)},
		show:function(){return unlocked("Luck")}
	})
	if (i<7) out.push({
		label:"Cinquefolium "+luckUpgrades.cinquefolium.axis.name,
		func:function(prev){return prev.add(g["dark"+type+"Axis"].pow(c.d0_5).mul(luckUpgrades.cinquefolium.axis.eff()))},
		text:function(){return "+ "+g["dark"+type+"Axis"].pow(c.d0_5).mul(luckUpgrades.cinquefolium.axis.eff()).format(3)+" "+SSBsmall(SSBsmall(g["dark"+type+"Axis"].format(),"0.5",3),luckUpgrades.cinquefolium.axis.eff().noLeadFormat(3),2)},
		show:function(){return effLuckUpgradeLevel("cinquefolium","axis").neq(c.d0)&&g[type+"Axis"].neq(c.d0)}
	})
	// multiplicative effects
	// softcap
	out.push(statTemplates.axisSoftcap("dark"+type,"var(--darkmatter)"))
	// initialize
	miscStats["freedark"+type+"Axis"] = {
		type:"breakdown",
		label:"Free dark "+type+" Axis",
		visible:function(){return stat["freedark"+type+"Axis"].neq(c.d0)},
		category:"Free axis",
		newRow:i===0,
		precision:2,
		modifiers:out
	}
}
miscStats.knowledgePerSec={
	type:"breakdown",
	label:"Knowledge gain",
	visible:function(){return unlocked("Hawking Radiation");},
	category:"Knowledge",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return g.masteryPower.add(c.d1).log(c.inf);},
			text:function(){return unbreak("log("+statFormat("MP",g.masteryPower.format(2),"_mastery")+" + 1)")+" ÷ log("+c.inf.format(0)+")";},
			show:function(){return true}
		},
		{
			label:"Tier 5 achievements",
			func:function(prev){return prev.mul(achievement.perAchievementReward[5].currentVal);},
			text:function(){return "× "+achievement.ownedInTier(5);},
			show:function(){return true}
		},
		{
			label:"Research 7-5 (Cyan Light)",
			mod:function(){return researchEffect(7,5).mul(totalAchievements).add(c.d1).pow(lightCache.currentEffect[3]);},
			func:function(prev){return g.research.r7_5?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().format(3)+" "+SSBsmall(researchEffect(7,5).mul(totalAchievements).add(c.d1).format(3),lightCache.currentEffect[3].noLeadFormat(3),3);},
			show:function(){return g.research.r7_5&&researchEffect(7,5).neq(c.d0)&&totalAchievements>0&&lightCache.currentEffect[3].neq(c.d0)}
		},
		statTemplates.tickspeed(()=>studies[6].reward(2),"Study VI reward 2"),
		{
			label:"Observations",
			func:function(prev){return prev.aps(stat.observationEffect);},
			text:function(){return unbreak("(<i>x</i> + 1)")+" ^ "+stat.observationEffect.noLeadFormat(3)+" - 1"},
			dependencies:["observationEffect"],
			show:function(){return stat.observationEffect.neq(c.d1)},
			color:"var(--research)"
		},
		{
			label:"Research 7-5",
			mod:function(){return researchEffect(7,5).mul(totalAchievements).add(c.d1)},
			func:function(prev){return g.research.r7_5?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(2);},
			show:function(){return g.research.r7_5&&researchEffect(7,5).neq(c.d0)&&totalAchievements>0}
		},
		statTemplates.masteryMul(103),
		{
			label:achievement.label(719),
			func:function(prev){return g.achievement[719]?prev.mul(achievement(719).effect()):prev},
			text:function(){return "× "+achievement(719).effect().format(2)+" "+SSBsmall("(1.202 + 0.0816 × "+N(g.galaxies).format()+")",g.observations.sumDecimals().format(),3)},
			show:function(){return g.achievement[719]&&g.observations.sumDecimals().gt(c.d0)}
		},
		{
			label:"Mental Energy",
			func:function(prev){return prev.pow(stat.mentalEnergyEffect)},
			text:function(){return "^ "+stat.mentalEnergyEffect.format(4)},
			dependencies:["mentalEnergyEffect"],
			show:function(){return stat.mentalEnergyEffect.neq(c.d1)}
		},
		statTemplates.tickspeed()
	]
};
miscStats.observationEffect={
	type:"breakdown",
	label:"Observation effect",
	visible:function(){return stat.observationEffect.neq(c.d1)},
	category:"Knowledge",
	precision:3,
	modifiers:[
		statTemplates.base("1",c.d1,true),
		...(()=>{
			let out = []
			for (let i=0;i<4;i++) out.push({
				label:["Exotic Matter","Nebula","Dark Matter","Black Hole"][i]+" observations",
				base:function(){return g.observations[i].mul(i===3?c.d0_2:c.d0_1).add(c.d1)},
				mod:function(){return this.base().gt(c.d10)?this.base().mul(c.e2).pow(c.d1div3):this.base()},
				func:function(prev){return prev.mul(this.mod())},
				text:function(){
					out = this.base().gt(c.d10)?SSBsmall("("+statFormat("O<sub>"+(i+1)+"</sub>",g.observations[i].format(),"_research")+" × "+(i===3?"20":"10")+" + 100)","(1 ÷ 3)",3):("("+statFormat("O<sub>"+(i+1)+"</sub>",g.observations[i].format(),"_research")+" × "+(i===3?"0.2":"0.1")+" + 1)")
					return "× "+this.mod().noLeadFormat(3)+" <span class=\"small\">"+out+"</span>"
				},
				show:function(){return g.observations[i].gt(c.d0)}
			})
			return out
		})(),
		{
			label:"Anti-T Axis",
			mod:function(){return stat.antiTAxisEffect.mul(stat.realantiTAxis)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.antiTAxisEffect.noLeadFormat(2),stat.realantiTAxis.noLeadFormat(3),2)},
			dependencies:["antiTAxisEffect","realantiTAxis"],
			show:function(){return stat.antiTAxisEffect.neq(c.d1)&&stat.realantiTAxis.neq(c.d0)}
		},
	]
}
miscStats.chromaPerSec={
	type:"breakdown",
	label:"Chroma gain",
	visible:function(){return unlocked("Light")},
	category:"Chroma gain",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return stat.chromaGainBase.pow(g.stars-starCap())},
			text:function(){return stat.chromaGainBase.noLeadFormat(2)+" ^ "+unbreak("("+statFormat("★",g.stars,"_stars")+" - "+BEformat(starCap())+")")},
			dependencies:["chromaGainBase"],
			show:function(){return true}
		},
		...(()=>{
			let out = []
			for (let i of ["r9_7","r9_8","r9_9","r10_7","r10_8","r10_9","r13_8"]) out.push({
				label:"Research "+researchOut(i),
				func:function(prev){return g.research[i]?prev.mul(researchEffect(researchRow(i),researchCol(i))):prev},
				text:function(){return "× "+researchEffect(researchRow(i),researchCol(i)).noLeadFormat(2)},
				show:function(){return g.research[i]&&researchEffect(researchRow(i),researchCol(i)).neq(c.d1)}
			})
			return out
		})(),
		statTemplates.achievementMul(603),
		{
			label:achievement.label(611),
			mod:function(){return N(1.0025).pow(g.darkstars)},
			func:function(prev){return g.achievement[611]?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(1.0025,g.darkstars.format(),3)},
			show:function(){return g.achievement[611]&&g.darkstars.neq(c.d0)}
		},
		statTemplates.masteryMul(104),
		{
			label:"Research 9-15",
			func:function(prev){return g.research.r9_15?prev.mul(researchEffect(9,15)):prev},
			text:function(){return "× "+researchEffect(9,15).format(2)},
			show:function(){return g.research.r9_15}
		},
		statTemplates.timeResearch(16,6),
		{
			label:"Galaxy Boost 2",
			func:function(prev){return prev.mul(galaxyEffects[2].boost.value().pow(g.stars))},
			text:function(){return "× "+galaxyEffects[2].boost.value().pow(g.stars).format(2)+" "+SSBsmall(galaxyEffects[2].boost.value().noLeadFormat(3),g.stars,3)},
			show:function(){return g.galaxies>=galaxyEffects[2].req&&g.stars>0}
		},
		{
			label:"Empowered Dark W Axis",
			mod:function(){return stat.darkWAxisEffect.pow(stat.empoweredDarkWAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(stat.darkWAxisEffect.format(2),stat.empoweredDarkWAxis.format(2),3)},
			dependencies:["darkWAxisEffect","empoweredDarkWAxis"],
			show:function(){return stat.darkWAxisEffect.neq(c.d1)&&stat.empoweredDarkWAxis.neq(c.d0)}
		},
		{
			label:"Cinquefolium "+luckUpgrades.cinquefolium.chroma.name,
			func:function(prev){return prev.mul(luckUpgrades.cinquefolium.chroma.eff())},
			text:function(){return "× "+luckUpgrades.cinquefolium.chroma.eff().format(2)},
			show:function(){return luckUpgrades.cinquefolium.chroma.eff().neq(c.d1)}
		},
		{
			label:"Gray Light",
			func:function(prev){return prev.mul(lightCache.currentEffect[8])},
			text:function(){return "× "+lightCache.currentEffect[8].format()},
			show:function(){return g.lumens[8].neq(c.d0)}
		},
		{
			label:prismaticUpgradeName("chromaSpeed"),
			func:function(prev){return prev.mul(prismaticUpgrades.chromaSpeed.eff())},
			text:function(){return "× "+prismaticUpgrades.chromaSpeed.eff().noLeadFormat(2)},
			show:function(){return g.prismaticUpgrades.chromaSpeed.neq(c.d0)}
		},
		{
			label:prismaticUpgradeName("chromaOverdrive"),
			func:function(prev){return prev.mul(prismaticUpgrades.chromaOverdrive.eff.x())},
			text:function(){return "× "+prismaticUpgrades.chromaOverdrive.eff.x().noLeadFormat(2)},
			show:function(){return g.prismaticUpgrades.chromaOverdrive.neq(c.d0)}
		},
		{
			label:achievement.label(815),
			mod:function(){return c.d1.sub(stat.chromaCostMultiplier).max(c.d0)},
			func:function(prev){return (g.achievement[815]&&g.ach815RewardActive)?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().noLeadFormat(4)},
			dependencies:["chromaCostMultiplier"],
			show:function(){return g.achievement[815]&&g.ach815RewardActive}
		},
		statTemplates.tickspeed(()=>studies[6].reward(1))
	]
}
miscStats.chromaCostMultiplier={
	type:"breakdown",
	label:"Chroma cost multiplier",
	visible:function(){return lightTiersUnlocked()>1},
	category:"Chroma gain",
	precision:3,
	modifiers:[
		statTemplates.base("1",c.d1,false),
		{
			label:"Black Light",
			func:function(prev){return prev.mul(lightCache.currentEffect[7])},
			text:function(){return "÷ "+lightCache.currentEffect[7].recip().noLeadFormat(3)},
			show:function(){return g.lumens[7].neq(c.d0)}
		},
		{
			label:"Research 13-9",
			func:function(prev){return g.research.r13_9?prev.div(researchEffect(13,9)):prev},
			text:function(){return "÷ "+researchEffect(13,9).noLeadFormat(3)},
			show:function(){return g.research.r13_9}
		},
		{
			label:prismaticUpgradeName("chromaOverdrive"),
			func:function(prev){return prev.mul(prismaticUpgrades.chromaOverdrive.eff.y())},
			text:function(){return "× "+prismaticUpgrades.chromaOverdrive.eff.y().noLeadFormat(3)},
			show:function(){return g.prismaticUpgrades.chromaOverdrive.neq(c.d0)}
		}
	]
}
miscStats.luckShardsPerSec={
	type:"breakdown",
	label:"Luck shard gain",
	visible:function(){return unlocked("Luck")},
	category:"Luck shard gain",
	precision:2,
	modifiers:[
		{
			label:"Base (Study VII reward 3)",
			func:function(){return studies[7].reward(3)},
			text:function(){return studies[7].reward(3).format(3)},
			show:function(){return true}
		},
		statTemplates.achievementMul(807),
		...(()=>{
			let out = []
			for (let res of study7ResearchList) out.push({
				label:"Research "+researchOut(res),
				func:function(prev){return g.research[res]?prev.mul(researchEffect(researchRow(res),researchCol(res))):prev},
				text:function(){return "× "+researchEffect(researchRow(res),researchCol(res)).format(2)},
				show:function(){return g.research[res]}
			})
			return out
		})(),
		{
			label:prismaticUpgradeName("prismRune"),
			func:function(prev){return prev.mul(prismaticUpgrades.prismRune.eff.x())},
			text:function(){return "× "+prismaticUpgrades.prismRune.format.x()},
			show:function(){return g.prismaticUpgrades.prismRune.neq(c.d0)}
		},
		statTemplates.antiYAxis,
		{
			label:"Research 27-1",
			mod:function(){return researchEffect(27,1).pow(effLuckUpgradeLevel("cinquefolium","luck"))},
			func:function(prev){return g.research.r27_1?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(researchEffect(27,1).noLeadFormat(3),effLuckUpgradeLevel("cinquefolium","luck").noLeadFormat(3),3)},
			show:function(){return g.research.r27_1&&effLuckUpgradeLevel("cinquefolium","luck").neq(c.d0)}
		},
		{
			label:"Cinquefolium "+luckUpgrades.cinquefolium.luck.name,
			func:function(prev){return prev.pow(luckUpgrades.cinquefolium.luck.eff())},
			text:function(){return "^ "+luckUpgrades.cinquefolium.luck.eff().noLeadFormat(4)},
			show:function(){return effLuckUpgradeLevel("cinquefolium","luck").neq(c.d0)}
		},
		statTemplates.tickspeed()
	]
}
miscStats.prismaticPerSec={
	type:"breakdown",
	label:"Prismatic gain",
	visible:function(){return unlocked("Prismatic")},
	category:"Prismatic gain",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return g.lumens.productDecimals().div(c.e24)},
			text:function(){return "Π<span class=\"xscript\"><sup>9</sup><sub>1</sub></span>L<sub>n</sub> ÷ "+c.e24.format()},
			show:function(){return true}
		},
		{
			label:"Galaxy Boost 4",
			func:function(prev){return prev.aps(galaxyEffects[4].boost.value())},
			text:function(){return "(<i>x</i> + 1) ^ "+galaxyEffects[4].boost.value().noLeadFormat(4)+" - 1"},
			show:function(){return g.galaxies>=galaxyEffects[4].req}
		},
		{
			label:prismaticUpgradeName("prismaticSpeed"),
			func:function(prev){return prev.mul(prismaticUpgrades.prismaticSpeed.eff())},
			text:function(){return "× "+prismaticUpgrades.prismaticSpeed.eff().noLeadFormat(2)},
			show:function(){return g.prismaticUpgrades.prismaticSpeed.neq(c.d0)}
		},
		...(()=>{
			let out = []
			for (let r=22;r<25;r++) for (let c=7;c<10;c++) out.push({
				label:"Research "+r+"-"+c,
				func:function(prev){return g.research["r"+r+"_"+c]?prev.mul(researchEffect(r,c)):prev},
				text:function(){return "× "+researchEffect(r,c).format(3)},
				show:function(){return g.research["r"+r+"_"+c]}
			})
			return out
		})(),
		statTemplates.antiYAxis,
		{
			label:"Mastery 111",
			mod:function(){return Decimal.pow(masteryEffect(104),masteryEffect(111))},
			func:function(prev){return (MasteryE(104)&&MasteryE(111))?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(masteryEffect(104).format(2),masteryEffect(111).noLeadFormat(2),3)},
			dependencies:Array.removeDuplicates([masteryDependencies(104),masteryDependencies(111)].flat()),
			show:function(){return MasteryE(104)&&MasteryE(111)}
		},
		statTemplates.tickspeed()
	]
}
miscStats.antimatterPerSec={
	type:"breakdown",
	label:"Antimatter gain",
	visible:function(){return unlocked("Antimatter")},
	category:"Antimatter gain",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1,true),
		{
			label:"Anti-X Axis",
			mod:function(){return stat.antiXAxisEffect.pow(stat.realantiXAxis)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.antiXAxisEffect.noLeadFormat(2),stat.realantiXAxis.noLeadFormat(3),3)},
			dependencies:["antiXAxisEffect","realantiXAxis"],
			show:function(){return stat.antiXAxisEffect.neq(c.d1)&&stat.realantiXAxis.neq(c.d0)}
		},
		statTemplates.antiYAxis,
		{
			label:"Research 25-15",
			func:function(prev){return g.research.r25_15?prev.mul(researchEffect(25,15)):prev},
			text:function(){return "× "+researchEffect(25,15).format(2)},
			show:function(){return g.research.r25_15}
		},
		{
			label:"Research 28-15",
			mod:function(){return stat.antiTAxisEffect.pow(Decimal.mul(stat.realantiTAxis,researchEffect(28,15)))},
			func:function(prev){return g.research.r28_15?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(stat.antiTAxisEffect.format(2),researchEffect(28,15).eq(c.d1)?SSBsmall(stat.realantiTAxis.noLeadFormat(3),researchEffect(28,15).noLeadFormat(3),2):stat.realantiTAxis.noLeadFormat(3))},
			dependencies:["antiTAxisEffect","realantiTAxis"],
			show:function(){return g.research.r28_15}
		},
		{
			label:"Anti-S Axis",
			mod:function(){return stat.antiSAxisEffect.pow(stat.realantiSAxis);},
			func:function(prev){return prev.pow(this.mod());},
			text:function(){return "^ "+this.mod().format(4)+" "+SSBsmall(stat.antiSAxisEffect.noLeadFormat(4),stat.realantiSAxis.noLeadFormat(2),3);},
			dependencies:["antiSAxisEffect","freeantiSAxis"],
			show:function(){return stat.antiSAxisEffect.neq(c.d1)&&stat.realantiSAxis.neq(c.d0)}
		},
		{
			label:"Study IX reward 1",
			func:function(prev){return (g.studyCompletions[9]===4)?prev:prev.layerf(x=>Math.max(x-studies[9].reward(1),-1))},
			text:function(){return "log<sup>["+studies[9].reward(1).toFixed(2)+"]</sup>(<i>x</i>)"},
			show:function(){return g.studyCompletions[9]!==4}
		},
		statTemplates.tickspeed()
	]
}
miscStats.antiXAxisEffect={
	type:"breakdown",
	label:"Anti-X axis effect",
	visible:function(){return antiAxisUnlocked("X")},
	category:"Axis effects",
	newRow:true,
	precision:2,
	modifiers:[
		statTemplates.base("5",c.d5,true),
		{
			label:"Anti-Z Axis",
			mod:function(){return stat.antiZAxisEffect.pow(stat.realantiZAxis)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().noLeadFormat(3)+" "+SSBsmall(stat.antiZAxisEffect.noLeadFormat(2),stat.realantiZAxis.noLeadFormat(3),3)},
			dependencies:["antiZAxisEffect","realantiZAxis"],
			show:function(){return stat.antiZAxisEffect.neq(c.d1)&&stat.realantiZAxis.neq(c.d0)}
		}
	]
}
miscStats.antiYAxisEffect={
	type:"breakdown",
	label:"Anti-Y axis effect",
	visible:function(){return antiAxisUnlocked("Y")},
	category:"Axis effects",
	precision:3,
	modifiers:[
		statTemplates.base("1.3",c.d1_3,true),
		{
			label:"Research 24-12",
			func:function(prev){return g.research.r24_12?prev.mul(researchEffect(24,12)):prev},
			text:function(){return "× "+researchEffect(24,12).noLeadFormat(2)},
			show:function(){return g.research.r24_12}
		}
	]
}
miscStats.antiZAxisEffect={
	type:"breakdown",
	label:"Anti-Z axis effect",
	visible:function(){return antiAxisUnlocked("Z")},
	category:"Axis effects",
	precision:3,
	modifiers:[
		statTemplates.base("1.3",c.d1_3,true),
		{
			label:"Anti-U Axis",
			mod:function(){return stat.antiUAxisEffect.pow(Decimal.mul(stat.realantiUAxis,stat.totalAntiAxis));},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(3)+" "+SSBsmall(stat.antiUAxisEffect.noLeadFormat(5),SSBsmall(stat.realantiUAxis.noLeadFormat(2),stat.totalAntiAxis.format(0),2),3);},
			dependencies:["antiUAxisEffect","realantiUAxis","totalAntiAxis"],
			show:function(){return stat.antiUAxisEffect.neq(c.d1)&&stat.realantiUAxis.neq(c.d0)&&stat.totalAntiAxis.neq(c.d0)}
		},
		{
			label:"Research 27-15",
			func:function(prev){return g.research.r27_15?prev.mul(researchEffect(27,15)):prev},
			text:function(){return "× "+researchEffect(27,15).noLeadFormat(4)},
			show:function(){return g.research.r27_15}
		},
	]
}
miscStats.antiWAxisEffect={
	type:"breakdown",
	label:"Anti-W axis effect",
	visible:function(){return antiAxisUnlocked("W")},
	category:"Axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			softcap:function(){return c.e100},
			func:function(){return Decimal.mul(g.antimatter.add(c.d10).min(this.softcap()).log10().pow(c.d0_3),g.antimatter.add(c.d10).log10().log10().pow(c.d2)).pow10()},
			text:function(){let am=statFormat("AM",g.antimatter.format(),"_antimatter");return "10 ^ (log(min("+am+", "+this.softcap().format()+") + 10) ^ 0.3 × log<sup>[2]</sup>("+am+" + 10) ^ 2)"},
			show:function(){return true}
		},
		{
			label:"Research 24-14",
			mod:function(){return stat.antiUAxisEffect.pow([stat.realantiUAxis,stat.totalAntiAxis,researchPower(24,14)].productDecimals());},
			func:function(prev){return g.research.r24_14?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.antiUAxisEffect.noLeadFormat(5),"("+[stat.realantiUAxis.noLeadFormat(2),stat.totalAntiAxis.format(0),researchPower(24,14).noLeadFormat(2)].join(" × ")+")",3);},
			dependencies:["antiUAxisEffect","realantiUAxis","totalAntiAxis"],
			show:function(){return g.research.r24_14&&stat.antiUAxisEffect.neq(c.d1)&&stat.realantiUAxis.neq(c.d0)&&stat.totalAntiAxis.neq(c.d0)}
		},
	]
}
miscStats.antiVAxisEffect={
	type:"breakdown",
	label:"Anti-V axis effect",
	visible:function(){return antiAxisUnlocked("V")},
	category:"Axis effects",
	precision:2,
	modifiers:[
		statTemplates.base("15",c.d15,true)
	]
}
miscStats.antiUAxisEffect={
	type:"breakdown",
	label:"Anti-U axis effect",
	visible:function(){return antiAxisUnlocked("U")},
	category:"Axis effects",
	precision:5,
	modifiers:[
		statTemplates.base("1.0001",N(1.0001),true)
	]
}
miscStats.antiTAxisEffect={
	type:"breakdown",
	label:"Anti-T axis effect",
	visible:function(){return antiAxisUnlocked("T")},
	category:"Axis effects",
	precision:2,
	modifiers:[
		statTemplates.base(()=>c.d150.format(),c.d150,true),
		{
			label:"Empowered Anti-V Axis",
			mod:function(){return [stat.antiVAxisEffect,stat.empoweredAntiVAxis,c.d0_01].productDecimals().add(c.d1);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(3)+" <span class=\"small\">"+unbreak("("+stat.antiVAxisEffect.div(c.e2).noLeadFormat(2)+" × "+stat.realantiVAxis.noLeadFormat(2)+" + 1)")+"</span>";},
			dependencies:["antiVAxisEffect","empoweredAntiVAxis"],
			show:function(){return stat.antiVAxisEffect.neq(c.d0)&&stat.empoweredAntiVAxis.neq(c.d0)}
		},
		{
			label:"Study of Studies reward 2",
			func:function(prev){return prev.mul(studies[10].reward(2))},
			text:function(){return "× "+studies[10].reward(2).noLeadFormat(2)},
			show:function(){return g.studyCompletions[10]>1}
		},
	]
}
miscStats.antiSAxisEffect={
	type:"breakdown",
	label:"Anti-S axis effect",
	visible:function(){return antiAxisUnlocked("S")},
	category:"Axis effects",
	precision:2,
	modifiers:[
		statTemplates.base("1.015",N(1.015),true)
	]
}
for (let i=0;i<axisCodes.length;i++) {
	let type = axisCodes[i]
	let out = [statTemplates.base("0",c.d0,false)]
	// additive effects
	if (i<7) out.push({
		label:prismaticUpgradeName("prismCondenser"),
		func:function(prev){return (i<prismaticUpgrades.prismCondenser.eff.y())?prev.add(prismaticUpgrades.prismCondenser.eff.x()):prev},
		text:function(){return "+ "+prismaticUpgrades.prismCondenser.format.x()},
		show:function(){return g.prismaticUpgrades.prismCondenser.neq(c.d0)}
	})
	if (i===0) out.push(
		{
			label:achievement.label(818),
			func:function(prev){return g.achievement[818]?prev.add(g.antiUAxis):prev},
			text:function(){return "+ "+g.antiUAxis.format()},
			show:function(){return g.achievement[818]&&g.antiUAxis.neq(c.d0)}
		},
		{
			label:"Research 26-15",
			mod:function(){return g.antiSAxis.pow(c.d2).mul(researchEffect(26,15))},
			func:function(prev){return g.research.r26_15?prev.add(this.mod()):prev},
			text:function(){return "+ "+this.mod().noLeadFormat(2)+" "+SSBsmall(SSBsmall(g.antiSAxis.format(),"2",3),researchEffect(26,15).noLeadFormat(2),2)},
			show:function(){return g.research.r26_15&&g.antiSAxis.neq(c.d0)}
		}
	)
	if ([1,3,4,6].includes(i)) {
		let res = antimatterResearchList[axisCodes[i]+2]
		out.push({
			label:"Research "+researchOut(res),
			func:function(prev){return g.research[res]?prev.add(researchEffect(researchRow(res),researchCol(res))):prev},
			text:function(){return "+ "+researchEffect(researchRow(res),researchCol(res)).format(2)},
			show:function(){return g.research[res]}
		})
	}
	// multiplicative effects
	// softcap
	out.push(statTemplates.axisSoftcap("anti"+type,"var(--antimatter)"))
	// initialize
	miscStats["freeanti"+type+"Axis"] = {
		type:"breakdown",
		label:"Free anti-"+type+" Axis",
		visible:function(){return stat["freeanti"+type+"Axis"].neq(c.d0)},
		category:"Free axis",
		newRow:i===0,
		precision:2,
		modifiers:out
	}
}

miscStats.empoweredYAxis={
	type:"combined",
	value:function(){
		if (stat.YAxisEffect.lte(c.d1)) return c.d0
		return stat.realYAxis.mul(studies[1].reward(1).div(c.e2))
	},
	dependencies:["YAxisEffect","realYAxis"]
}
for (let i of empowerableAxis) {
	miscStats["unempowered"+i+"Axis"]={
		type:"combined",
		value:function(){return stat["real"+i+"Axis"].sub(stat["empowered"+i+"Axis"])},
		dependencies:["real"+i+"Axis","empowered"+i+"Axis"]
	}
}
miscStats.empoweredDarkWAxis={
	type:"combined",
	value:function(){
		return stat.realdarkWAxis.mul(studies[7].reward(1).div(c.e2))
	},
	dependencies:["realdarkWAxis"]
}
for (let i of empowerableDarkAxis) {
	miscStats["unempoweredDark"+i+"Axis"]={
		type:"combined",
		value:function(){return stat["realdark"+i+"Axis"].sub(stat["empoweredDark"+i+"Axis"])},
		dependencies:["realdark"+i+"Axis","empoweredDark"+i+"Axis"]
	}
}
miscStats.empoweredAntiVAxis={
	type:"combined",
	value:function(){
		let out = c.d0
		if (g.research.r25_14) out = out.add(researchEffect(25,14))
		return out.min(stat.realantiVAxis)
	},
	dependencies:["antiXAxisEffect","realantiVAxis"]
}
for (let i of empowerableAntiAxis) {
	miscStats["unempoweredAnti"+i+"Axis"]={
		type:"combined",
		value:function(){return stat["realanti"+i+"Axis"].sub(stat["empoweredAnti"+i+"Axis"])},
		dependencies:["realanti"+i+"Axis","empoweredAnti"+i+"Axis"]
	}
}
miscStats.axisScalingStart={
	type:"combined",
	value:function(){return c.d8}
},
miscStats.axisScalingPower={
	type:"combined",
	value:function(){
		let out=c.d1
		if (g.achievement[502]) out = out.mul(0.95-studies[12].reward(1));
		if (g.achievement[717]) out = out.mul(c.d1.sub(achievement(717).effect().div(c.e2)))
		return out
	}
}
miscStats.axisSuperscalingStart={
	type:"combined",
	value:function(){return studies[11].reward(1)}
}
miscStats.axisSuperscalingPower={
	type:"combined",
	value:function(){
		let out=luckShardEffect2()
		return out
	}
}
miscStats.darkAxisScalingStart={
	type:"combined",
	value:function(){return c.d8}
},
miscStats.darkAxisScalingPower={
	type:"combined",
	value:function(){
		let out=c.d1
		if (g.achievement[503]) out = out.mul(0.95-studies[12].reward(1));
		if (g.achievement[530]) out = out.mul(c.d0_99);
		if (g.achievement[717]) out = out.mul(c.d1.sub(achievement(717).effect().div(c.e2)))
		return out
	}
}
miscStats.darkAxisSuperscalingStart={
	type:"combined",
	value:function(){return c.d256}
}
miscStats.darkAxisSuperscalingPower={
	type:"combined",
	value:function(){
		let out=luckShardEffect2()
		return out
	}
}
miscStats.antiAxisScalingStart={
	type:"combined",
	value:function(){return c.d8}
},
miscStats.antiAxisScalingPower={
	type:"combined",
	value:function(){return c.d1}
}
miscStats.antiAxisSuperscalingStart={
	type:"combined",
	value:function(){return c.d64.add(studies[11].reward(3))}
}
miscStats.antiAxisSuperscalingPower={
	type:"combined",
	value:function(){return c.d1}
}
for (let i of axisCodes) {
	let normalCostDependencies = ["axisCostDivisor","axisCostExponent","axisScalingStart","axisScalingPower","axisSuperscalingStart","axisSuperscalingPower","spatialSynergismPower"]
	if (i==="X") normalCostDependencies.push("stardustBoost5")
	miscStats[i+"AxisCost"]={
		type:"combined",
		value:function(){return axisCost(i)},
		dependencies:normalCostDependencies,
	}
	miscStats["dark"+i+"AxisCost"]={
		type:"combined",
		value:function(){return darkAxisCost(i)},
		dependencies:["darkAxisCostDivisor","darkAxisCostExponent","darkAxisScalingStart","darkAxisScalingPower","darkAxisSuperscalingStart","darkAxisSuperscalingPower","spatialSynergismPower"]
	}
	miscStats["anti"+i+"AxisCost"]={
		type:"combined",
		value:function(){return antiAxisCost(i)},
		dependencies:["antiAxisCostDivisor","antiAxisCostExponent","antiAxisScalingStart","antiAxisScalingPower","antiAxisSuperscalingStart","antiAxisSuperscalingPower"]
	}
}
miscStats.freeAxisSoftcapStart={
	type:"combined",
	value:function(){
		let out = c.d1
		if (g.achievement[809]) out = out.add(c.d0_05)
		return Decimal.convergentSoftcap(out,stat.freeAxisSoftcapLimit.mul(c.d0_75),stat.freeAxisSoftcapLimit)
	},
	dependencies:["freeAxisSoftcapLimit"]
}
miscStats.freeAxisSoftcapLimit={
	type:"combined",
	value:function(){
		let out = c.d2
		if (g.achievement[809]) out = out.add(c.d0_05)
		return out
	}
}
miscStats.axisUnlocked={
	type:"combined",
	value:function(){return Math.min(axisCodes.map(i=>g[i+"Axis"].gt(c.d0)?1:0).sum()+1,4+g.stardustUpgrades[0])}
}
miscStats.totalNormalAxis={
	type:"combined",
	value:function(){return axisCodes.map(i=>g[i+"Axis"]).sumDecimals()}
}
miscStats.totalDarkAxis={
	type:"combined",
	value:function(){return axisCodes.map(i=>g["dark"+i+"Axis"]).sumDecimals()}
}
miscStats.totalAntiAxis={
	type:"combined",
	value:function(){return axisCodes.map(i=>g["anti"+i+"Axis"]).sumDecimals()}
}
miscStats.totalAxis={
	type:"combined",
	value:function(){return ["Normal","Dark","Anti"].map(x=>stat["total"+x+"Axis"]).sumDecimals()},
	dependencies:["totalNormalAxis","totalDarkAxis","totalAntiAxis"]
}
miscStats.masteryRow1Unlocked={
	type:"combined",
	value:function(){return g.XAxis.gt(c.d0)||(g.StardustResets>0)||(g.WormholeResets>0)}
}
miscStats.masteryRow2Unlocked={
	type:"combined",
	value:function(){return g.ZAxis.gt(c.d0)||(g.StardustResets>0)||(g.WormholeResets>0)}
}
miscStats.masteryRow3Unlocked={
	type:"combined",
	value:function(){return stat.totalNormalAxis.gte(c.d40)||(g.StardustResets>0)||(g.WormholeResets>0)},
	dependencies:["totalNormalAxis"]
}
miscStats.masteryRow4Unlocked={
	type:"combined",
	value:function(){return stat.totalNormalAxis.gte(c.d50)||(g.StardustResets>0)||(g.WormholeResets>0)},
	dependencies:["stardustExoticMatterReq","totalNormalAxis"]
}
for (let i=5;i<10;i++) {
	miscStats["masteryRow"+i+"Unlocked"]={
		type:"combined",
		value:function(){return g.stardustUpgrades[3]>Math.min(i-4,4)}
	}
}
miscStats.masteryRow10Unlocked={
	type:"combined",
	value:function(){return g.achievement[524]}
}
miscStats.masteryRow11Unlocked={
	type:"combined",
	value:function(){return g.research.r23_6||g.research.r23_10}
}
miscStats.baseOverclockSpeedup={
	type:"combined",
	value:function(){return Math.min(dilationUpgrades[1].effect(),2**g.dilationPower)},
}
miscStats.overclockSoftcap={
	type:"combined",
	value:function(){
		let out = 64
		out += dilationUpgrades[2].effect()
		return out
	}
}
miscStats.overclockCost={
	type:"combined",
	value:function(){
		if (stat.baseOverclockSpeedup<=stat.overclockSoftcap) return stat.baseOverclockSpeedup-1
		return stat.overclockSoftcap**(Math.log(stat.baseOverclockSpeedup)/Math.log(stat.overclockSoftcap))**(1+2*dilationUpgrades[3].effect())-1
	},
	dependencies:["overclockSoftcap","baseOverclockSpeedup"]
}
miscStats.stardustExoticMatterReq={type:"combined",value:function(){return c.e25}}
miscStats.stardustBoost1={
	type:"combined",
	value:function(){
		if (!unlocked("Stardust")) return c.d1
		return Decimal.mul(g.stardust.div(c.d10).add(c.d1).pow(c.d0_5),g.stardust.add(c.d1).dilate(c.d1_5).pow(c.d0_1)).pow(stardustBoostBoost(1))
	}
}
miscStats.stardustBoost2={
	type:"combined",
	value:function(){
		if (!unlocked("Stardust")) return c.d1
		return g.stardust.add(c.d1).log10().mul(c.d0_075).add(c.d1).pow(stardustBoostBoost(2))
	}
}
miscStats.stardustBoost3={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<1) return c.d1
		return Decimal.linearSoftcap(g.stardust.div(c.e7).add(c.d1).log10().pow(c.d0_7).div(c.d2),c.d10,c.d1).add(c.d1).pow(stardustBoostBoost(3))
	}
}
miscStats.stardustBoost4={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<2) return c.d0
		return g.stardust.pow(c.d0_05).add(c.d10).log10().root(c.d3).sub(c.d1).mul(stardustBoostBoost(4))
	}
}
miscStats.stardustBoost5={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<3) return c.d1
		return Decimal.linearSoftcap(g.stardust.mul(c.e24).add(c.e64).log10().root(c.d1_5).sub(c.d16).pow10(),c.inf,c.d1).pow(stardustBoostBoost(5))
	}
}
miscStats.stardustBoost6={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<4) return c.d1
		return g.stardust.pow(c.d0_15).add(c.e10).log10().log10().pow(stardustBoostBoost(6))
	}
}
miscStats.stardustBoost7={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<5) return c.d1
		return g.stardust.add(c.d10).log10().pow(stardustBoostBoost(7).div(c.e2))
	},
	dependencies:["neuralEnergyEffect"]
}
miscStats.stardustBoost8={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<6) return c.d1
		return g.stardust.add(c.e100).log10().log10().div(c.d2).pow(stardustBoostBoost(8).mul(c.d5))
	}
}
miscStats.stardustBoost9={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<7) return c.d1
		return g.stardust.add(c.e100).log10().div(c.e2).pow(stardustBoostBoost(9).mul(c.d0_4))
	}
}
miscStats.stardustBoost10={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<8) return c.d0
		return Decimal.convergentSoftcap(g.stardust.add(c.ee3).log10().log10().sub(c.d3).mul(stardustBoostBoost(10)).div(c.d10),c.d0_5,c.d1)
	}
}
miscStats.stardustBoost11={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<9) return c.d1
		return Decimal.convergentSoftcap(g.stardust.add(c.ee4).log10().log10().sub(c.d4).mul(stardustBoostBoost(11)).div(c.d10),c.d1_5,c.d2).add(c.d1)
	}
}
miscStats.stardustBoost12={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<10) return c.d0
		return Decimal.convergentSoftcap(g.stardust.add(c.ee5).log10().log10().sub(c.d5).mul(stardustBoostBoost(12)),c.d0,c.d1)
	}
}
miscStats.stardustUpgrade1Cap={type:"combined",value:function(){return 4}}
miscStats.stardustUpgrade2Cap={type:"combined",value:function(){return 5+g.stardustUpgrades[0]}}
miscStats.stardustUpgrade3Cap={type:"combined",value:function(){return achievement.ownedInTier(5)>=11?10:6}}
miscStats.stardustUpgrade4Cap={type:"combined",value:function(){return 5}}
miscStats.stardustUpgrade5Cap={type:"combined",value:function(){return StudyE(3)?1:(7+studies[3].reward(1))}}
for (let i=1;i<6;i++) miscStats["stardustUpgrade"+i+"Cost"]={type:"combined",value:function(){return stardustUpgradeCost(i)},dependencies:["stardustUpgrade"+i+"Cap"]}
miscStats.stardustUpgrade2AxisRetentionFactor={
	type:"combined",
	value:function(){
		let out = 0.1;
		out += studies[1].reward(2)/100;
		return out>0.75?(1-0.5/(out-0.5)):out;
	}
}
miscStats.unspentStars={type:"combined",value:function(){return g.stars-totalStars}}
miscStats.realDarkStars={type:"combined",value:function(){return realDarkStars()}}
miscStats.darkStarEffect3={type:"combined",value:function(){return darkStarEffect3()},dependencies:["realDarkStars"]}
miscStats.darkStarScalingStart={
	type:"combined",
	value:function(){
		let out = c.d48
		if (g.achievement[527]) out = out.add(c.d4)
		return out
	}
}
miscStats.darkStarScalingPower={type:"combined",value:function(){
	let out = c.d1
	if (g.achievement[813]) out = out.mul(c.d0_95)
	return out
}}
miscStats.darkStarReq={type:"combined",value:function(){return darkStarReq()},dependencies:[masteryDependencies(63),"darkStarScalingStart","darkStarScalingPower","stardustBoost9","gravitationalEnergyEffect"].flat()}
miscStats.maxAffordableDarkStars={type:"combined",value:function(){return maxAffordableDarkStars()},dependencies:miscStats.darkStarReq.dependencies}
for (let i=0;i<energyTypes.length;i++) {
	miscStats[energyTypes[i]+"EnergyPerSec"]={type:"combined",value:function(){return energyPerSec(i)},dependencies:["energyGainSpeed"]}
	miscStats[energyTypes[i]+"EnergyEffect"]={type:"combined",value:function(){return energyEffect(i)},dependencies:["energyEffectBoost"]}
}
miscStats.wormholeDarkAxisReq={type:"combined",value:function(){
	if (g.activeStudy===0) return c.e3;
	return N(studies[g.activeStudy].goal());
}}
miscStats.ironWill={type:"combined",value:function(){return g.StardustResets===0&&g.TotalStardustResets===0&&totalResearch.temporary===0}}
miscStats.wormholeMilestone9Effect={type:"combined",value:function(){return wormholeMilestone9Effect()}}
miscStats.knowledgeEffect={type:"combined",value:function(){return Decimal.convergentSoftcap(g.knowledge.add(c.d10).log10().log10().mul(c.d10),stat.knowledgeEffectCap.mul(c.d0_75),stat.knowledgeEffectCap)},dependencies:["knowledgeEffectCap"]}
miscStats.knowledgeEffectCap={type:"combined",value:function(){return studies[8].reward(1)}}
miscStats.extraDiscoveries_add={type:"combined",value:function(){
	let out = c.d0
	if (g.achievement[604]) out = out.add(achievement(604).effValue())
	if (g.achievement[714]) out = out.add(achievement(714).effect())
	return out
}},
miscStats.extraDiscoveries_mul={type:"combined",value:function(){
	let out = c.d1
	if (g.achievement[504]) out = out.mul(1.05+studies[12].reward(1))
	return out
}}
miscStats.chromaGainBase={type:"combined",value:function(){return g.achievement[607]?achievement(607).effect():c.d3}}
miscStats.spatialSynergismPower={
	type:"combined",
	value:function(){return [
		luckUpgrades.quatrefolium.synergism.eff(),
		studies[9].reward(3).div(c.e2).add(c.d1)
	].productDecimals()}
}

const statGenerations = {}
const stat = {}
for (let i of Object.keys(miscStats)) {
	statGenerations[i] = null
	stat[i] = null
}
function statGeneration(name) {
	try {
		if (typeof statGenerations[name] === "number") return statGenerations[name]
		let data = miscStats[name]
		let dependencies = (data.type==="breakdown")?[data,...data.modifiers].map(x=>(x.dependencies===undefined)?[]:x.dependencies).flat().filter(x=>x!==undefined):(data.dependencies===undefined?[]:data.dependencies)
		let out = (dependencies.length===0)?0:(dependencies.map(x=>statGeneration(x)).reduce((x,y)=>Math.max(x,y))+1)
		statGenerations[name] = out
		return out
	} catch {functionError("statGeneration",arguments)}
}
var statOrder
function updateStat(id) {
	try {
		let data = miscStats[id]
		if (data.type==="combined") {
			stat[id] = data.value()
		} else if (data.type==="breakdown") {
			let value = data.modifiers[0].func()
			for (let i of data.modifiers) value = i.func(value)
			stat[id] = value	
		} else {
			error("miscStats["+id+"] has an invalid type")
		}
	} catch {functionError("updateStat",arguments)}
}
function updateStats() {
	if (debugActive) {
		for (let i of statOrder) updateStat(i)
		let before = Object.assign({},stat)
		for (let i of statOrder) updateStat(i)
		let after = Object.assign({},stat)
		let out = []
		for (let i of statOrder) {let b=String(before[i]),a=String(after[i]);if (b!==a) out.push([i,b,a])}
		if (out.length>0) error("The following stats are mapped incorrectly:"+out.map(x=>"<br>"+x[0]+" (before: "+x[1]+", after: "+x[2]+")").join(""))
	} else {
		for (let i of statOrder) updateStat(i)
	}
}
var breakdownCategories = {}
/* generate the breakdown categories variable */
function statBreakdownCategories() {
	let categories = Array.removeDuplicates(Object.values(miscStats).filter(x=>x.type==="breakdown").map(x => x.category));
	let out = {}
	for (let i of categories) {
		let contents = Array.removeDuplicates(Object.keys(miscStats).filter(x => miscStats[x].category===i))
		out[i]={contents:contents,active:contents[0]}
	}
	breakdownCategories = out
	d.innerHTML("SSBnav1",categories.sort().map(x => "<button id=\"button_SSBnav1_"+x+"\" class=\"tabtier3\" style=\"filter:brightness("+(x==="Exotic Matter gain"?100:75)+"%)\" onClick=\"toggleActiveBreakdownSection('"+x+"');updateHTML()\">"+x+"</button>").join(""))
	d.innerHTML("SSBtable","<tr><th class=\"tablecell\" style=\"width:25vw\">Source</th><th class=\"tablecell\" style=\"width:45vw\">Modifier</th><th class=\"tablecell\" style=\"width:25vw\">Subtotal</th></tr>"+Array(maximumSSBModifierLength).fill(0).map((x,i)=>"<tr id=\"SSBtable_row"+i+"\"><td class=\"tablecell\" style=\"width:25vw\" id=\"SSBtable_label"+i+"\"></td><td class=\"tablecell\" style=\"width:45vw\" id=\"SSBtable_text"+i+"\"></td><td class=\"tablecell\" style=\"width:25vw\" id=\"SSBtable_total"+i+"\"></td></tr>").join(""))
}
var activeBreakdownSection = "Exotic Matter gain";
var activeBreakdownTab = "exoticmatterPerSec";
var activeBreakdownTabModifierLength = miscStats[activeBreakdownTab].modifiers.length
const maximumSSBModifierLength = Object.values(miscStats).filter(x=>x.type==="breakdown").map(x => x.modifiers.length).reduce((x,y)=>Math.max(x,y))
function toggleActiveBreakdownSection(x) {
	activeBreakdownSection = x
	let categories = Object.keys(breakdownCategories)
	for (let i of categories) {
		d.element("button_SSBnav1_"+i).style.filter = "brightness("+(i===x?100:75)+"%)"
	}
	d.innerHTML("SSBnav2",(breakdownCategories[x].contents.length===1)?"":(breakdownCategories[x].contents.map(x => (miscStats[x].newRow?"<br class=\"SSBnav2_br\">":"")+"<button id=\"button_SSBnav2_"+x+"\" class=\"tabtier4\" style=\"filter:brightness("+(x===activeBreakdownTab?100:75)+"%);display:"+(miscStats[x].visible()?"inline-block":"none")+"\" onClick=\"toggleActiveBreakdownTab('"+x+"');updateHTML()\">"+miscStats[x].label+"</button>").join("")))
	toggleActiveBreakdownTab(breakdownCategories[x].active)
}
function toggleActiveBreakdownTab(x){
	activeBreakdownTab=x;
	breakdownCategories[activeBreakdownSection].active=x;
	activeBreakdownTabModifierLength = miscStats[x].modifiers.length
	let categories = breakdownCategories[activeBreakdownSection].contents
	if (categories.length>1) for (let i of categories) d.element("button_SSBnav2_"+i).style.filter = "brightness("+(i===x?100:75)+"%)"
}
var breakdownTabList = Object.entries(miscStats).sort(function(a,b){return a[1].label>b[1].label;}).map(x => x[0]);

function calcStatUpTo(id,label) {
	let data = miscStats[id]
	if (data.type==="breakdown") {
		let value = data.modifiers[0].func()
		for (let i of data.modifiers) {
			if (i.label===label) return value
			value = i.func(value)
		}
	}
	functionError("callStatUpTo")
}