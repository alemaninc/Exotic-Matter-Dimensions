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
		name:"Total hawking radiation produced",
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
		value:function(){return totalAchievements+(totalSecretAchievements==0?"":(" (+ "+totalSecretAchievements+" secret)"));},
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
		value:function(){return BEformat(g.TotalStardustResets)+" total, "+BEformat(g.StardustResets)+" with reward";},
		condition:function(){return unlocked("Stardust");}
	},{
		name:"Wormhole Resets",
		value:function(){return BEformat(g.TotalWormholeResets)+" total, "+BEformat(g.WormholeResets)+" with reward";},
		condition:function(){return unlocked("Hawking Radiation");}
	},{
		name:"Total Axis",
		value:function(){return stat.totalAxis.format();},
		condition:function(){return true;}
	},{
		name:"Total Dark Axis",
		value:function(){return stat.totalDarkAxis.format();},
		condition:function(){return unlocked("Dark Matter");}
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
		value:function(){return N(g.zipPointMulti).noLeadForamt(2)+"×"},
		condition:function(){return g.zipPointMulti>1}
	}
].sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

const largeNumberVisualizationVariables = [
	{label:"exotic matter",class:"_exoticmatter",value:function(){return g.exoticmatter}},
	{label:"mastery power",class:"_mastery",value:function(){return g.masteryPower}},
	{label:"stardust",class:"_stardust",value:function(){return g.stardust}},
	{label:"dark matter",class:"_darkmatter",value:function(){return g.darkmatter}},
	{label:"dark energy",class:"_energy",value:function(){return g.darkEnergy}},
	{label:"hawking radiation",class:"_wormhole",value:function(){return g.hawkingradiation}},
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
	{value:N(8.4506e184),name:"volume of observable universe / l<xscript><sup>3</sup><sub>P</sub></xscript>"},
	{value:N(2e223/9),name:"2.22×10<sup>222</sup>"},
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
		if (i.value.lte(num) && (i.visible==undefined?true:i.visible())) out = i
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
	let symbol=(hyper==2)?" × ":(hyper==3)?" ^ ":" ? ";
	return ("<span class=\"small\">"+unbreak("("+x+" "+symbol+" "+y+")")+"</span>").replaceAll("<span&nbsp;class=\"small\">","<span class=\"small\">");
}
function masteryDependencies(i){
	let out = ["knowledgeEffect"]
	if (Math.floor(i/10)==1) out.push("SAxisEffect","realSAxis")
	if (Math.floor(i/10)==2) out.push("spatialEnergyEffect")
	if (Math.floor(i/10)==4) out.push("totalAxis")
	if (Math.floor(i/10)==10) out.push("stardustBoost11")
	return out
}
const statTemplates = {
	base:function(text,val,show){
		return {
			label:"Base",
			func:function(){return val;},
			text:function(){return text;},
			show:function(){return show}
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
	achievementMul:function(id){
		return {
			label:achievement.label(id),
			func:function(prev){return g.achievement[id]?prev.mul(achievement(id).effect()):prev},
			text:function(){return "× "+achievement(id).effect().format(2)},
			show:function(){return g.achievement[id]&&achievement(id).effect().neq(c.d1)},
		}
	},
	axisSoftcap:function(type){
		return {
			label:"Softcap",
			func:function(prev){return Decimal.convergentSoftcap(prev,g[type+"Axis"].mul(stat.freeAxisSoftcapStart),g[type+"Axis"].mul(stat.freeAxisSoftcapLimit));},
			text:function(){return "convergent, start&nbsp;"+g[type+"Axis"].mul(stat.freeAxisSoftcapStart).noLeadFormat(2)+", limit&nbsp;"+g[type+"Axis"].mul(stat.freeAxisSoftcapLimit).noLeadFormat(2);},
			dependencies:["freeAxisSoftcapStart","freeAxisSoftcapLimit"],
			show:function(){return Decimal.div(stat["free"+type+"Axis"],g[type+"Axis"]).gt(stat.freeAxisSoftcapStart)} // circular references are legal in show()
		};
	},
	funcOnly:function(callback){return { // for modifiers which are never shown
		label:"",
		func:callback,
		text:function(){return ""},
		show:function(){return false}
	}},
	prestigeExponent:function(array){return [statTemplates.base("10",c.d10,false),...array,statTemplates.funcOnly(x=>x.log10())]},
	row6Star:function(id){return {
		label:"Star "+id,
		func:function(prev){return g.star[id]?prev.add(starEffect(60)):prev;},
		text:function(){return "+ "+starEffect(60).format(2);},
		show:function(){return g.star[id]}
	}},
	darkMatterFreeAxis:function(type){
		return {
			label:"Dark "+type+" Axis",
			func:function(prev){return prev.add(stat.darkMatterFreeAxis.mul(g["dark"+type+"Axis"]));},
			text:function(){return "+ "+stat.darkMatterFreeAxis.mul(g["dark"+type+"Axis"]).format(2)+" "+SSBsmall(g["dark"+type+"Axis"].format(),stat.darkMatterFreeAxis.format(3),2);},
			dependencies:["darkMatterFreeAxis"],
			show:function(){return g["dark"+type+"Axis"].neq(c.d0)&&stat.darkMatterFreeAxis.neq(c.d0)}
		};
	},
	darkStarEffect2:function(axis){
		let hyper = (axis=="V")?2:3
		return {
			label:"Dark Stars",
			mod:function(){return darkStarEffect2Level(axis).div(c.d10).add(c.d1);},
			func:(axis=="V")?function(prev){return prev.mul(this.mod());}:function(prev){return prev.pow(this.mod())},
			text:function(){return [null,null,"×","^"][hyper]+" "+this.mod().noLeadFormat(3);},
			dependencies:["realDarkStars"],
			show:function(){return this.mod().neq(c.d1)}
		};
	},
	tickspeed:{
		label:"Tickspeed",
		func:function(prev){return prev.mul(stat.tickspeed);},
		text:function(){return "× "+stat.tickspeed.format(3);},
		dependencies:["tickspeed"],
		show:function(){return stat.tickspeed.neq(c.d1)}
	},
	ach209Reward:{
		label:achievement.label(209),
		mod:function(){return g.achievement[209]?stat.totalAxis.mul(achievement(209).effect()):c.d0;},
		func:function(prev){return prev.add(this.mod());},
		text:function(){return "+ "+this.mod().noLeadFormat(2)+" "+SSBsmall(stat.totalAxis.format(),achievement(209).effectFormat(achievement(209).effect()),2);},
		dependencies:["totalAxis"],
		show:function(){return this.mod().neq(c.d0)}
	},
	ach210Reward:function(type){
		return {
			label:achievement.label(210),
			mod:function(){
				if (!g.achievement[210]) return c.d0
				let out = g[type+"Axis"].div(achievement(210).effect())
				if (out.gt(c.d80)) out=out.mul(c.d80).sqrt()
				return out
			},
			func:function(prev){return prev.add(this.mod());},
			text:function(){
				let out = SSBsmall(g[type+"Axis"].format(),achievement(210).effect().recip().noLeadFormat(3),2)
				if (this.mod().gt(c.d80)) out = SSBsmall(SSBsmall(out,80,2),0.5,3)
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
		mod:function(){return g.achievement[501]?ach501Effect():N(1);},
		func:function(prev){return prev.mul(this.mod());},
		text:function(){return "× "+this.mod().format(2);},
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
			dependencies:["totalAxis"],
			show:function(){return g.achievement[526]&&stat.totalAxis.neq(c.d0)}
		}
	],
	ach528Reward:function(type){
		return {
			label:achievement.label(528),
			mod:function(){return g.achievement[528]?Decimal.linearSoftcap(g[type+"Axis"].div(c.d125),c.d100,c.d2,1):c.d0;},
			func:function(prev){return prev.add(this.mod());},
			text:function(){return "+ "+g[type+"Axis"].div(c.d125).format(2)+(this.mod().gt(c.e2)?("<span class=\"small\">"+unbreak("(softcapped to "+this.mod().format(2)+")")+"</span>"):"");},
			show:function(){return this.mod().neq(c.d0)}
		};
	},
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
			label:"Tier 1 achievements 1-3",
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
				mod:function(){return g.star[i]?starEffect(i):N(1);},
				func:function(prev){return prev.mul(this.mod());},
				text:function(){return "× "+this.mod().format(2);},
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
			func:function(prev){return g.research.r1_3?prev.mul(Decimal.pow(researchEffect(1,3),stat.totalAxis)):prev;},
			text:function(){return "× "+Decimal.pow(researchEffect(1,3),stat.totalAxis).format(2)+" "+SSBsmall(researchEffect(1,3).noLeadFormat(2),stat.totalAxis.format(0),3);},
			dependencies:["totalAxis"],
			show:function(){return g.research.r1_3&&researchEffect(1,3).neq(c.d1)&&stat.totalAxis.neq(c.d0)}
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
		statTemplates.tickspeed
	]
};
miscStats.stardustMultiplier={
	type:"breakdown",
	label:"Stardust gain multipliers",
	visible:function(){return false;},
	category:"invisible",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1),
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
			mod:function(){return g.achievement[208]?achievement(208).effect().pow(stat.totalAxis):N(1);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(3)+" "+SSBsmall(achievement(208).effect().noLeadFormat(4),stat.totalAxis.format(0),3);},
			dependencies:["totalAxis"],
			show:function(){return g.achievement[208]&&stat.totalAxis.neq(c.d0)}
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
		statTemplates.ach501Reward
	]
};
miscStats.stardustExponent={
	type:"breakdown",
	label:"Stardust gain exponents",
	visible:function(){return false;},
	category:"invisible",
	precision:4,
	modifiers:statTemplates.prestigeExponent([
		{
			label:"Star 43",
			func:function(prev){return g.star[43]?prev.pow(c.d1_05):prev},
			text:function(){return "^ 1.05";},
			show:function(){return g.star[43]}
		},
		{
			label:"Stelliferous Energy",
			func:function(prev){return prev.pow(stat.stelliferousEnergyEffect);},
			text:function(){return "^ "+stat.stelliferousEnergyEffect.format(4);},
			dependencies:["stelliferousEnergyEffect"],
			show:function(){return stat.stelliferousEnergyEffect.neq(c.d1)}
		},
		{
			label:"Study IV",
			func:function(prev){return StudyE(4)?[prev,c.d0_5,g.TotalStardustResets].decimalPowerTower():prev},
			text:function(){return "^ "+c.d0_5.pow(g.TotalStardustResets).noLeadFormat(3)+" "+SSBsmall("0.5",g.TotalStardustResets,3)},
			show:function(){return StudyE(4)&&(g.TotalStardustResets!==0)}
		}
	])
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
			text:function(){return unbreak("("+g.exoticmatter.format()+" ÷ "+stat.stardustExoticMatterReq.div(c.d10).format()+")")+" "+unbreak("dilate "+studies[4].reward(1).toFixed(3));},
			dependencies:["stardustExoticMatterReq"],
			show:function(){return true}
		},
		...miscStats.stardustMultiplier.modifiers.slice(1),
		...miscStats.stardustExponent.modifiers.slice(1,miscStats.stardustExponent.modifiers.length-1)
	],
	dependencies:["stardustMultiplier","stardustExponent"]
};
miscStats.darkmatterPerSec={
	type:"breakdown",
	label:"Dark Matter gain",
	visible:function(){return unlocked("Dark Matter");},
	category:"Dark Matter gain",
	precision:2,
	modifiers:[
		{
			label:"Base Gain",
			func:function(){return g.stardust.gt(c.e12)?g.stardust.div(c.e11).dilate(c.d0_5).div(c.d10):g.stardust.div(c.e12);},
			text:function(){return g.stardust.gt(c.e12)?(unbreak("("+g.stardust.format()+" ÷ "+BEformat(c.e11)+")")+" "+unbreak("dilate 0.5 ÷ 10")):(g.stardust.format(2)+" ÷ "+BEformat(c.e12));},
			show:function(){return true}
		},
		{
			label:"Dark Stars",
			func:function(prev){return prev.gt(1)?prev.pow(darkStarEffect1().div(c.e2).add(c.d1)):prev;},
			text:function(){return "^ "+darkStarEffect1().div(c.e2).add(c.d1).noLeadFormat(3);},
			dependencies:["realDarkStars"],
			show:function(){return stat.realDarkStars.neq(c.d0)&&g.stardust.gt(c.e12)}
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
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(1.308,unspentStars(),3);},
			show:function(){return g.achievement[302]&&(unspentStars()<0)}
		},
		statTemplates.ach501Reward,
		{
			label:achievement.label(513,true),
			base:function(){return [513,514,515].map(x => g.achievement[x]?2:1).reduce((x,y)=>x*y);},
			mod:function(){return Decimal.pow(this.base(),g.darkstars);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format()+" "+SSBsmall(this.base(),g.darkstars.format(0),3);},
			show:function(){return g.achievement[513]&&g.darkstars.gt(c.d0)}
		},
		{
			label:"Research 1-13",
			mod:function(){return g.research.r1_13?Decimal.pow(researchEffect(1,13),stat.totalDarkAxis):N(1);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(researchEffect(1,13).noLeadFormat(2),stat.totalDarkAxis.format(0),3);},
			dependencies:["totalDarkAxis"],
			show:function(){return g.research.r1_13&&researchEffect(1,13).neq(c.d1)&&stat.totalDarkAxis.neq(c.d0)}
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
		statTemplates.tickspeed
	]
};
miscStats.masteryPowerPerSec={
	type:"breakdown",
	label:"Mastery Power gain",
	visible:function(){return unlocked("Masteries");},
	category:"Mastery Power",
	precision:2,
	modifiers:[
		{
			label:"Base Gain",
			func:function(){return Decimal.pow(g.baseMasteryPowerGain,stat.baseMasteryPowerExponent);},
			text:function(){return g.baseMasteryPowerGain.format(2)+" ^ "+stat.baseMasteryPowerExponent.format(4);},
			dependencies:["baseMasteryPowerExponent"],
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
			text:function(){return "× "+stat.stardustBoost7.pow(stardustBoost7Exp()).format(2)+" "+SSBsmall(stat.stardustBoost7.format(4),SSBsmall(g.truetimeThisStardustReset.format(2),stardustBoost7IsSoftcapped()?"0.5":Decimal.div(stardustBoost7Exp().log10(),g.truetimeThisStardustReset.log10()).format(4),3),3);},
			dependencies:["stardustBoost7"],
			show:function(){return stat.stardustBoost7.neq(c.d1)}
		},
		...[81,82,83,84].map(x=>statTemplates.masteryMul(x)),
		{
			label:achievement.label(413),
			mod:function(){return g.achievement[413]?Decimal.mul(c.d1_1907.pow(g.SAxis),c.d1_202.pow(g.darkSAxis)):1;},
			func:function(prev){return prev.mul(this.mod());},
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
		statTemplates.tickspeed
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
			text:function(){return unbreak("(log(log("+g.exoticmatter.format()+" ^ 0.1 + 10)) + 1)")+" ^ "+this.exp().format(2);},
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
			label:"<span onMouseover=\"addSecretAchievement(9)\">Secret Achievements</span>",
			mod:function(){return secretAchievementPoints/1e16},
			func:function(prev){return prev}, // the reward is a lie! how cruel of alemaninc.
			text:function(){return "<span onClick=\"addSecretAchievement(9)\">+ "+this.mod().toFixed(16)+"</span>";},
			show:function(){return secretAchievementPoints>0;}
		}
	]
};
miscStats.XAxisEffect={
	type:"breakdown",
	label:"X Axis effect",
	visible:function(){return stat.axisUnlocked>=1;},
	category:"Normal axis effects",
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
			mod:function(){return achievement.ownedInTier(1)/50;},
			func:function(prev){return prev.add(this.mod());},
			text:function(){return "+ "+N(this.mod()).noLeadFormat(2);},
			show:function(){return achievement.ownedInTier(1)>0}
		},
		statTemplates.ach209Reward,
		{
			label:"Empowered Y Axis",
			mod:function(){return stat.YAxisEffect.pow(stat.empoweredYAxis);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().format(2)+" "+SSBsmall(stat.YAxisEffect.format(2),stat.empoweredYAxis.format(2),3)},
			dependencies:["YAxisEffect","empoweredYAxis"],
			show:function(){return stat.YAxisEffect}
		},
		statTemplates.masteryMul(21),
		statTemplates.res1_8,
		{
			label:"Research 2-2",
			mod:function(){return g.research.r2_2?researchEffect(2,2).mul(g.XAxis).div(c.e2).add(c.d1):N(1);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,2).div(c.e2).noLeadFormat(2)+" × "+g.XAxis.format(0)+" + 1)")+"</span>";},
			show:function(){return g.research.r2_2&&researchEffect(2,2).neq(c.d0)&&g.XAxis.neq(c.d0)}
		},
		{
			label:"Research 2-4",
			mod:function(){return g.research.r2_4?researchEffect(2,4).mul(g.truetimeThisWormholeReset).div(c.e2).add(c.d1):N(1);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,4).div(c.e2).noLeadFormat(2)+" × "+g.truetimeThisWormholeReset.format(2)+" + 1)")+"</span>";},
			show:function(){return g.research.r2_4&&researchEffect(2,4).neq(c.d0)&&g.truetimeThisWormholeReset.neq(c.d0)}
		},
		{
			label:"Research 2-7",
			mod:function(){return g.research.r2_7?researchEffect(2,7).mul(g.spatialEnergy.log10()).div(c.e2).add(c.d1):N(1);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,7).div(c.e2).noLeadFormat(2)+" × "+g.spatialEnergy.log10().format(2)+" + 1)")+"</span>";},
			show:function(){return g.research.r2_7&&researchEffect(2,7).neq(c.d0)&&g.spatialEnergy.neq(c.d1)}
		},
		{
			label:"Research 2-9",
			mod:function(){return g.research.r2_9?researchEffect(2,9).mul(g.darkXAxis).div(c.e2).add(c.d1):N(1);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,9).div(c.e2).noLeadFormat(2)+" × "+g.darkXAxis.format(0)+" + 1)")+"</span>";},
			show:function(){return g.research.r2_9&&researchEffect(2,9).neq(c.d0)&&g.darkXAxis.neq(c.d0)}
		},
		{
			label:"Research 2-12",
			mod:function(){return g.research.r2_12?researchEffect(2,12).mul(g.totalDiscoveries).div(c.e2).add(c.d1):N(1);},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().noLeadFormat(2)+" <span class=\"small\">"+unbreak("("+researchEffect(2,12).div(c.e2).noLeadFormat(2)+" × "+g.totalDiscoveries.format(0)+" + 1)")+"</span>"},
			show:function(){return g.research.r2_12&&researchEffect(2,12).neq(c.d0)&&g.totalDiscoveries.neq(c.d0)}
		},
		{
			label:"Research 2-14",
			mod:function(){return g.research.r2_14?researchEffect(2,14):N(1);},
			func:function(prev){return prev.pow(this.mod());},
			text:function(){return "^ "+this.mod().noLeadFormat(4);},
			dependencies:["totalAxis"],
			show:function(){return g.research.r2_14&&researchEffect(2,2).neq(c.d0)&&g.XAxis.neq(c.d0)}
		}
	]
};
miscStats.YAxisEffect={
	type:"breakdown",
	label:"Y Axis effect",
	visible:function(){return stat.axisUnlocked>=2;},
	category:"Normal axis effects",
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
		statTemplates.res1_8
	]
};
miscStats.ZAxisEffect={
	type:"breakdown",
	label:"Z Axis effect",
	visible:function(){return stat.axisUnlocked>=3;},
	category:"Normal axis effects",
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
			constant:function(){return g.exoticmatter.add(c.d1).mul(c.e10).log10().log10().log10().add(c.d1);},
			func:function(){return [c.d10,this.constant(),this.constant(),this.exp()].decimalPowerTower().mul(c.d0_15);},
			consttext:function(){return unbreak("(log(log(log("+g.exoticmatter.add(c.d1).format(2)+" × "+BEformat(c.e10)+"))) + 1)");},
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
		}
	]
};
miscStats.WAxisEffect={
	type:"breakdown",
	label:"W Axis effect",
	visible:function(){return stat.axisUnlocked>=4;},
	category:"Normal axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			time:function(){
				let out = g.truetimeThisStardustReset;
				if (g.achievement[109]) out = out.add(stat.realWAxis.mul(c.d30));
				return out; 
			},
			func:function(){return this.time().pow(c.d0_75).add(c.e2).log10().quad_tetr(c.d1_15);},
			text:function(){return unbreak("log("+this.time().format(0)+" ^ 0.75 + 100)")+" ^^ 1.15";},
			dependencies:["realWAxis"],
			show:function(){return true}
		},
		statTemplates.ach209Reward,
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
	category:"Normal axis effects",
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
	category:"Normal axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return g.stardust.add(c.e10).log10().log10().pow(c.d2).div(c.d10).pow10();}, 
			text:function(){return "10 ^ "+unbreak("(log(log("+g.stardust.format(0)+" + "+BEformat(c.e10)+")) ^ 2 ÷ 10)");},
			show:function(){return true}
		},
		statTemplates.ach209Reward,
		statTemplates.res1_8,
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
	category:"Normal axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return stat.totalAxis.add(c.d10).log10().tetrate(2).div(c.d2).pow10();},
			text:function(){return "10 ^ "+unbreak("(log("+stat.totalAxis.format(0)+" + 10) ^^ 2 ÷ 2)");},
			dependencies:["totalAxis"],
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
	category:"Normal axis effects",
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
miscStats.freeXAxis={
	type:"breakdown",
	label:"Free X axis",
	visible:function(){return stat.freeXAxis.neq(c.d0);},
	category:"Free normal axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		{
			label:achievement.label(108),
			func:function(prev){return g.achievement[108]?prev.add(g.ZAxis.mul(achievement(108).effect())):prev;},
			text:function(){return "+ "+g.ZAxis.div(achievement(108).effect()).noLeadFormat(2);},
			show:function(){return g.achievement[108]&&g.ZAxis.neq(c.d0)}
		},
		statTemplates.ach210Reward("Y"),
		statTemplates.masteryAdd(51),
		{
			label:"Star 21",
			func:function(prev){return g.star[21]?prev.add(c.d3):prev},
			text:function(){return "+ 3";},
			show:function(){return g.star[21]}
		},
		statTemplates.darkMatterFreeAxis("X"),
		{
			label:"Spatial Energy",
			func:function(prev){return prev.mul(stat.spatialEnergyEffect);},
			text:function(){return "× "+stat.spatialEnergyEffect.format(4);},
			dependencies:["spatialEnergyEffect"],
			show:function(){return stat.spatialEnergyEffect.neq(c.d1)}
		},
		statTemplates.axisSoftcap("X")
	]
};
miscStats.freeYAxis={
	type:"breakdown",
	label:"Free Y axis",
	visible:function(){return stat.freeYAxis.neq(c.d0);},
	category:"Free normal axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
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
		},
		statTemplates.ach210Reward("Z"),
		{
			label:"Star 22",
			func:function(prev){return g.star[22]?prev.add(c.d3):prev},
			text:function(){return "+ 3";},
			show:function(){return g.star[22]}
		},
		statTemplates.darkMatterFreeAxis("Y"),
		statTemplates.axisSoftcap("Y")
	]
};
miscStats.freeZAxis={
	type:"breakdown",
	label:"Free Z axis",
	visible:function(){return stat.freeZAxis.neq(c.d0);},
	category:"Free normal axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		statTemplates.ach210Reward("W"),
		statTemplates.masteryAdd(31),
		{
			label:"Star 23",
			func:function(prev){return g.star[23]?prev.add(c.d3):prev},
			text:function(){return "+ 3";},
			show:function(){return g.star[23]}
		},
		statTemplates.darkMatterFreeAxis("Z"),
		statTemplates.axisSoftcap("Z")
	]
};
miscStats.freeWAxis={
	type:"breakdown",
	label:"Free W axis",
	visible:function(){return stat.freeWAxis.neq(c.d0);},
	category:"Free normal axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		statTemplates.ach210Reward("V"),
		statTemplates.masteryAdd(32),
		{
			label:"Star 24",
			func:function(prev){return g.star[24]?prev.add(c.d3):prev},
			text:function(){return "+ 3";},
			show:function(){return g.star[24]}
		},
		statTemplates.darkMatterFreeAxis("W"),
		statTemplates.axisSoftcap("W")
	]
};
miscStats.freeVAxis={
	type:"breakdown",
	label:"Free V axis",
	visible:function(){return stat.freeVAxis.neq(c.d0);},
	category:"Free normal axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		statTemplates.ach210Reward("U"),
		{
			label:achievement.label(306),
			func:function(prev){return g.achievement[306]?prev.add(c.d1):prev},
			text:function(){return "+ 1";},
			show:function(){return g.achievement[306]}
		},
		statTemplates.row6Star(61),
		statTemplates.darkMatterFreeAxis("V"),
		statTemplates.axisSoftcap("V")
	]
};
miscStats.freeUAxis={
	type:"breakdown",
	label:"Free U axis",
	visible:function(){return stat.freeUAxis.neq(c.d0);},
	category:"Free normal axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		statTemplates.ach210Reward("T"),
		{
			label:achievement.label(307),
			func:function(prev){return g.achievement[307]?prev.add(c.d1):prev},
			text:function(){return "+ 1";},
			show:function(){return g.achievement[307]}
		},
		statTemplates.row6Star(62),
		statTemplates.darkMatterFreeAxis("U"),
		statTemplates.axisSoftcap("U")
	]
};
miscStats.freeTAxis={
	type:"breakdown",
	label:"Free T axis",
	visible:function(){return stat.freeTAxis.neq(c.d0);},
	category:"Free normal axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		statTemplates.ach210Reward("S"),
		{
			label:achievement.label(308),
			func:function(prev){return g.achievement[308]?prev.add(c.d1):prev},
			text:function(){return "+ 1";},
			show:function(){return g.achievement[308]}
		},
		statTemplates.row6Star(63),
		statTemplates.darkMatterFreeAxis("T"),
		statTemplates.axisSoftcap("T")
	]
};
miscStats.freeSAxis={
	type:"breakdown",
	label:"Free S axis",
	visible:function(){return stat.freeSAxis.neq(c.d0);},
	category:"Free normal axis",
	precision:3,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		{
			label:"Star 64",
			func:function(prev){return g.star[64]?prev.add(starEffect(64)):prev;},
			text:function(){return "+ "+starEffect(64).format(3);},
			show:function(){return g.star[64]}
		},
		statTemplates.darkMatterFreeAxis("S"),
		{
			label:"Research 3-2",
			func:function(prev){return g.research.r3_2?prev.add(researchEffect(3,2)):prev},
			text:function(){return "+ "+researchEffect(3,2).noLeadFormat(2);},
			show:function(){return g.research.r3_2&&researchEffect(3,2).neq(c.d0)}
		},
		statTemplates.axisSoftcap("S")
	]
};
miscStats.darkXAxisEffect={
	type:"breakdown",
	label:"Dark X Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0;},
	category:"Dark axis effects",
	precision:2,
	modifiers:[
		statTemplates.base("3",c.d3,true),
		statTemplates.darkStarEffect2("X"), 
		statTemplates.masteryPow(61)
	]
};
miscStats.darkYAxisEffect={
	type:"breakdown",
	label:"Dark Y Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0;},
	category:"Dark axis effects",
	precision:2,
	modifiers:[
		statTemplates.base("4",c.d4,true),
		statTemplates.darkStarEffect2("Y"),
		{
			label:"Star 84",
			func:function(prev){return g.star[84]?prev.pow(c.d3):prev},
			text:function(){return "^ 3";},
			show:function(){return g.star[84]}
		}
	]
};
miscStats.darkZAxisEffect={
	type:"breakdown",
	label:"Dark Z Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0;},
	category:"Dark axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return g.exoticmatter.pow(c.d0_005).div(c.d10).add(c.d1).dilate(c.d0_2).pow(c.d0_2);},
			text:function(){return unbreak("(("+g.exoticmatter.format(0)+" ^ 0.005 ÷ 10 + 1) dilate 0.2)")+" ^ 0.2";},
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
	category:"Dark axis effects",
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
		}
	]
};
miscStats.darkVAxisEffect={
	type:"breakdown",
	label:"Dark V Axis effect",
	visible:function(){return (g.stardustUpgrades[0]>0)&&(g.stardustUpgrades[4]>0);},
	category:"Dark axis effects",
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
	category:"Dark axis effects",
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
	category:"Dark axis effects",
	precision:2,
	modifiers:[
		{
			label:"Base",
			time:function(){
				let out = g.truetimeThisStardustReset;
				if (achievement.ownedInTier(5)>=18) out = out.add(wormholeMilestone18Effect());
				return out;
			},
			func:function(){return this.time().div(c.e3).add(c.d1).dilate(0.5);},
			text:function(){return unbreak("("+this.time().format(0)+" ÷ 1,000 + 1)")+" dilate 0.5";},
			show:function(){return true}
		},
		statTemplates.darkStarEffect2("T")
	]
};
miscStats.darkSAxisEffect={
	type:"breakdown",
	label:"Dark S Axis effect",
	visible:function(){return (g.stardustUpgrades[0]>3)&&(g.stardustUpgrades[4]>0);},
	category:"Dark axis effects",
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
			mod:function(){return achievement(207).effect().pow(stat.totalAxis);},
			func:function(prev){return g.achievement[207]?prev.div(this.mod()):prev;},
			text:function(){return "÷ "+this.mod().format(2)+" "+SSBsmall(achievement(207).effect().noLeadFormat(3),stat.totalAxis.format(0),3);},
			dependencies:["totalAxis"],
			show:function(){return g.achievement[207]&&stat.totalAxis.neq(c.d0)}
		}
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
		}
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
		}
	]
};
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
			mod:function(){return g.research.r8_5?researchEffect(8,5).mul(totalAchievements).add(c.d1):c.d1},
			func:function(prev){return prev.mul(this.mod())},
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
			label:"Tickspeed",
			exponent:function(){return (g.achievement[408]&&stat.tickspeed.gt(c.d1))?achievement(408).effect():c.d1},
			func:function(prev){return prev.mul(stat.tickspeed.pow(this.exponent()))},
			dependencies:["tickspeed"],
			text:function(){return "× "+stat.tickspeed.pow(this.exponent()).format(3)+" "+(this.exponent().eq(c.d1)?"":SSBsmall(stat.tickspeed.format(3),this.exponent().noLeadFormat(4),3))},
			show:function(){return stat.tickspeed.neq(c.d1)}
		}
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
			mod:function(){return 1+achievement.ownedInTier(4)/1000;},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().toFixed(3);},
			show:function(){return achievement.ownedInTier(4)>0}
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
			label:achievement.label(212,true),
			mod:function(){return 1.004**[212,213,214,215].map(x => g.achievement[x]?1:0).sum()},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+BEformat(this.mod(),3);},
			show:function(){return g.achievement[212]}
		},
		{
			label:achievement.label(409,true),
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
		{
			label:achievement.label(510),
			mod:function(){return g.totalDiscoveries.min(c.d250).div(c.e3).add(c.d1)},
			func:function(prev){return g.achievement[510]?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(3);},
			show:function(){return g.achievement[510]&&g.totalDiscoveries.neq(c.d1)}
		},
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
			mod:function(){
				if (achievement.ownedInTier(5)<13) return c.d1;
				return totalAchievements/400+1;
			},
			func:function(prev){return prev.mul(this.mod());},
			text:function(){return "× "+this.mod().toFixed(4);},
			show:function(){return achievement.ownedInTier(5)>12}
		},
		{
			label:"Temporal Energy",
			func:function(prev){return prev.mul(stat.temporalEnergyEffect)},
			text:function(){return "× "+stat.temporalEnergyEffect.format(4)},
			dependencies:["temporalEnergyEffect"],
			show:function(){return stat.temporalEnergyEffect.neq(c.d1)}
		},
		{
			label:"Time Paradox",
			func:function(prev){return prev.max(0);},
			text:function(){return "No negative numbers allowed";},
			show:function(){return stat.tickspeed.sign==-1}
		}
	]
};
miscStats.HRMultiplier={
	type:"breakdown",
	label:"Hawking Radiation gain multipliers",
	visible:function(){return false;},
	category:"invisible",
	precision:2,
	modifiers:[
		statTemplates.base("1",c.d1),
		statTemplates.masteryMul(102),
		{
			label:"Research 6-8",
			mod:function(){return g.research.r6_8?[researchEffect(6,8),totalAchievements,g.stars].productDecimals().add(c.d1):N(1);},
			func:function(prev){return prev.mul(this.mod());},
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
		{
			label:achievement.label(601),
			func:function(prev){return g.achievement[601]?prev.mul(achievement(601).effect()):prev},
			text:function(){return "× "+achievement(601).effect().format(2)},
			show:function(){return g.achievement[601]}
		},
		{
			label:achievement.label(610),
			func:function(prev){return g.achievement[610]?prev.mul(achievement(610).effect()):prev},
			text:function(){return "× "+achievement(610).effect().format(2)},
			show:function(){return g.achievement[610]}
		}
	]
};
miscStats.HRExponent={
	type:"breakdown",
	label:"Hawking Radiation gain exponents",
	visible:function(){return false;},
	category:"invisible",
	precision:4,
	modifiers:statTemplates.prestigeExponent([
		{
			label:achievement.label(506),
			func:function(prev){return g.achievement[506]?prev.pow(c.d1_1):prev;},
			text:function(){return "^ 1.1";},
			show:function(){return g.achievement[506]}
		},
		{
			label:"Vacuum Energy",
			func:function(prev){return prev.pow(stat.vacuumEnergyEffect)},
			text:function(){return "^ "+stat.vacuumEnergyEffect.format(4)},
			dependencies:["vacuumEnergyEffect"],
			show:function(){return stat.vacuumEnergyEffect.neq(c.d1)}
		}
	])
};
miscStats.HRBaseExponent={
	type:"breakdown",
	label:"",
	visible:function(){return false;},
	category:"invisible",
	precision:4,
	modifiers:statTemplates.prestigeExponent([
		{
			label:"Blue Light",
			func:function(prev){return prev.pow(lightCache.currentEffect[2])},
			text:function(){return "^ "+lightEffect[2].format(lightCache.currentEffect[2])},
			show:function(){return lightCache.currentEffect[2].neq(c.d1)}
		}
	])
}
miscStats.pendinghr={
	type:"breakdown",
	label:"Hawking radiation gain",
	visible:function(){return unlocked("Hawking Radiation")||stat.totalDarkAxis.gt(c.e3);},
	category:"Hawking radiation gain",
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return stat.totalDarkAxis.lt(stat.wormholeDarkAxisReq)?c.d0:[c.d2,stat.totalDarkAxis.div(c.d1500),stat.HRBaseApexExp].decimalPowerTower();},
			text:function(){return stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)?("2 ^ "+unbreak("("+stat.totalDarkAxis.format(0)+" ÷ 1,500)")+" ^ "+stat.HRBaseApexExp.noLeadFormat(3)):("Need at least "+stat.wormholeDarkAxisReq.format()+" total dark axis");},
			dependencies:["totalDarkAxis","wormholeDarkAxisReq","HRBaseApexExp"],
			show:function(){return true}
		},
		...miscStats.HRBaseExponent.modifiers.slice(1,miscStats.HRBaseExponent.modifiers.length-1),
		...miscStats.HRMultiplier.modifiers.slice(1),
		...miscStats.HRExponent.modifiers.slice(1,miscStats.HRExponent.modifiers.length-1)
	],
	dependencies:["HRBaseExponent","HRMultiplier","HRExponent"]
};
miscStats.HRBaseApexExp={
	type:"breakdown",
	label:"Hawking Radiation base gain exponent",
	visible:function(){return stat.HRBaseApexExp.neq(c.d2)},
	category:"Hawking radiation gain",
	precision:4,
	modifiers:[
		statTemplates.base("2",c.d2,true)
	]
};
miscStats.freedarkXAxis={
	type:"breakdown",
	label:"Free Dark X axis",
	visible:function(){return stat.freedarkXAxis.neq(c.d0);},
	category:"Free dark axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		{
			label:achievement.label(303,true),
			mod:function(){return [303,304,305].map(x => g.achievement[x]?1:0).sum();},
			func:function(prev){return prev.add(this.mod());},
			text:function(){return "+ "+this.mod();},
			show:function(){return [303,304,305].map(x=>g.achievement[x]).includes(true)}
		},
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
		},
		statTemplates.ach528Reward("X"),
		statTemplates.axisSoftcap("darkX")
	]
};
miscStats.freedarkYAxis={
	type:"breakdown",
	label:"Free Dark Y axis",
	visible:function(){return stat.freedarkYAxis.neq(c.d0);},
	category:"Free dark axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		{
			label:achievement.label(303,true),
			mod:function(){return [304,305].map(x => g.achievement[x]?1:0).sum();},
			func:function(prev){return prev.add(this.mod());},
			text:function(){return "+ "+this.mod();},
			show:function(){return g.achievement[304]||g.achievement[305]}
		},
		statTemplates.ach528Reward("Y"),
		statTemplates.axisSoftcap("darkY")
	]
};
miscStats.freedarkZAxis={
	type:"breakdown",
	label:"Free Dark Z axis",
	visible:function(){return stat.freedarkZAxis.neq(c.d0);},
	category:"Free dark axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		{
			label:achievement.label(305),
			func:function(prev){return g.achievement[305]?prev.add(c.d1):prev},
			text:function(){return "+ 1"},
			show:function(){return g.achievement[305]}
		},
		statTemplates.ach528Reward("Z"),
		statTemplates.axisSoftcap("darkZ")
	]
};
miscStats.freedarkWAxis={
	type:"breakdown",
	label:"Free Dark W axis",
	visible:function(){return stat.freedarkWAxis.neq(c.d0);},
	category:"Free dark axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		statTemplates.ach528Reward("W"),
		statTemplates.axisSoftcap("darkW")
	]
};
miscStats.freedarkVAxis={
	type:"breakdown",
	label:"Free Dark V axis",
	visible:function(){return stat.freedarkVAxis.neq(c.d0);},
	category:"Free dark axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		statTemplates.ach528Reward("V"),
		statTemplates.axisSoftcap("darkV")
	]
};
miscStats.freedarkUAxis={
	type:"breakdown",
	label:"Free Dark U axis",
	visible:function(){return stat.freedarkUAxis.neq(c.d0);},
	category:"Free dark axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		statTemplates.ach528Reward("U"),
		statTemplates.axisSoftcap("darkU")
	]
};
miscStats.freedarkTAxis={
	type:"breakdown",
	label:"Free Dark T axis",
	visible:function(){return stat.freedarkTAxis.neq(c.d0);},
	category:"Free dark axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		statTemplates.ach528Reward("T"),
		statTemplates.axisSoftcap("darkT")
	]
};
miscStats.freedarkSAxis={
	type:"breakdown",
	label:"Free Dark S axis",
	visible:function(){return stat.freedarkSAxis.neq(c.d0);},
	category:"Free dark axis",
	precision:2,
	modifiers:[
		statTemplates.base("0",c.d0,false),
		{
			label:"Research 3-14",
			func:function(prev){return g.research.r3_14?prev.add(researchEffect(3,14)):prev;},
			text:function(){return "+ "+researchEffect(3,14).noLeadFormat(2);},
			show:function(){return g.research.r3_14&&researchEffect(3,14).neq(c.d0)}
		},
		statTemplates.ach528Reward("S"),
		statTemplates.axisSoftcap("darkS")
	]
};
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
			text:function(){return unbreak("log("+g.masteryPower.format(2)+" + 1)")+" ÷ log("+c.inf.format(0)+")";},
			show:function(){return true}
		},
		{
			label:"Tier 5 achievements",
			func:function(prev){return prev.mul(achievement.ownedInTier(5));},
			text:function(){return "× "+achievement.ownedInTier(5);},
			show:function(){return true}
		},
		{
			label:"Research 7-5 (Cyan Light)",
			mod:function(){return researchEffect(7,5).mul(totalAchievements).add(c.d1).pow(lightCache.currentEffect[3]);},
			func:function(prev){return g.research.r7_5?prev.mul(this.mod()):prev},
			text:function(){return "× "+this.mod().format(3);},
			show:function(){return g.research.r7_5&&researchEffect(7,5).neq(c.d0)&&totalAchievements>0&&lightCache.currentEffect[3].neq(c.d0)}
		},
		{
			label:"Observations",
			func:function(prev){return prev.add(c.d1).pow(stat.observationEffect).sub(c.d1);},
			text:function(){return unbreak("(<i>x</i> + 1)")+" ^ "+stat.observationEffect.noLeadFormat(3)+" - 1"},
			dependencies:["observationEffect"],
			show:function(){return stat.observationEffect.neq(c.d1)}
		},
		{
			label:"Research 7-5",
			mod:function(){return researchEffect(7,5).mul(totalAchievements).add(c.d1)},
			func:function(prev){return g.research.r7_5?prev.mul(this.mod()):prev;},
			text:function(){return "× "+this.mod().noLeadFormat(2);},
			show:function(){return g.research.r7_5&&researchEffect(7,5).neq(c.d0)&&totalAchievements>0}
		},
		{
			label:"Mental Energy",
			func:function(prev){return prev.pow(stat.mentalEnergyEffect)},
			text:function(){return "^ "+stat.mentalEnergyEffect.format(4)},
			dependencies:["mentalEnergyEffect"],
			show:function(){return stat.mentalEnergyEffect.neq(c.d1)}
		},
		statTemplates.masteryMul(103),
		statTemplates.tickspeed
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
				base:function(){return g.observations[i].mul(i==3?c.d0_2:c.d0_1).add(c.d1)},
				mod:function(){return this.base().gt(c.d10)?this.base().mul(c.e2).pow(c.d1div3):this.base()},
				func:function(prev){return prev.mul(this.mod())},
				text:function(){
					let out = "("+g.observations[i].format()+" × "+(i==3?"0.2":"0.1")+" + 1)"
					out = this.base().gt(c.d10)?SSBsmall(SSBsmall(out,"100",2),"(1 ÷ 3)",3):("<span class=\"small\">"+out+"</span>")
					return "× "+this.mod().noLeadFormat(3)+" "+out
				},
				show:function(){return g.observations[i].gt(c.d0)}
			})
			return out
		})()
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
			func:function(){return c.d3.pow(g.stars-60)},
			text:function(){return"3 ^ "+unbreak("("+g.stars+" - 60)")},
			show:function(){return true}
		},
		...(()=>{
			let out = []
			for (let i of ["r9_7","r9_8","r9_9","r10_7","r10_8","r10_9"]) out.push({
				label:"Research "+researchOut(i),
				func:function(prev){return g.research[i]?prev.mul(researchEffect(researchRow(i),researchCol(i))):prev},
				text:function(){return "× "+researchEffect(researchRow(i),researchCol(i)).noLeadFormat(2)},
				show:function(){return g.research[i]&&researchEffect(researchRow(i),researchCol(i)).neq(c.d1)}
			})
			return out
		})(),
		...[603,607].map(x=>statTemplates.achievementMul(x)),
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
		statTemplates.tickspeed
	]
}

for (let i of fullAxisCodes) {
	miscStats["real"+i+"Axis"]={
		type:"combined",
		value:function(){return (((i.length==1)?stat.axisUnlocked:(4+g.stardustUpgrades[0]))>axisCodes.indexOf(i))?g[i+"Axis"].add(stat["free"+i+"Axis"]):c.d0},
		dependencies:(i.length==1)?["axisUnlocked","free"+i+"Axis"]:["free"+i+"Axis"]
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
miscStats.axisScalingStart={
	type:"combined",
	value:function(){return c.d8}
},
miscStats.axisScalingPower={
	type:"combined",
	value:function(){
		let out=c.d1
		if (g.achievement[502]) out = out.mul(c.d0_95);
		return out
	}
}
miscStats.axisSuperscalingStart={
	type:"combined",
	value:function(){return c.d256}
}
miscStats.axisSuperscalingPower={
	type:"combined",
	value:function(){return c.d1}
}
miscStats.darkAxisScalingStart={
	type:"combined",
	value:function(){return c.d8}
},
miscStats.darkAxisScalingPower={
	type:"combined",
	value:function(){
		let out=c.d1
		if (g.achievement[503]) out = out.mul(c.d0_95);
		if (g.achievement[530]) out = out.mul(c.d0_99);
		return out
	}
}
miscStats.darkAxisSuperscalingStart={
	type:"combined",
	value:function(){return c.d256}
}
miscStats.darkAxisSuperscalingPower={
	type:"combined",
	value:function(){return c.d1}
}
for (let i of axisCodes) {
	miscStats[i+"AxisCost"]={
		type:"combined",
		value:function(){return axisCost(i)},
		dependencies:["axisCostDivisor","axisCostExponent","axisScalingStart","axisScalingPower","axisSuperscalingStart","axisSuperscalingPower","stardustBoost5"]
	}
	miscStats["dark"+i+"AxisCost"]={
		type:"combined",
		value:function(){return darkAxisCost(i)},
		dependencies:["darkAxisCostDivisor","darkAxisCostExponent","darkAxisScalingStart","darkAxisScalingPower","darkAxisSuperscalingStart","darkAxisSuperscalingPower"]
	}
}
miscStats.freeAxisSoftcapStart={
	type:"combined",
	value:function(){
		let out = N(1)
		return Decimal.convergentSoftcap(out,stat.freeAxisSoftcapLimit.mul(c.d0_75),stat.freeAxisSoftcapLimit)
	},
	dependencies:["freeAxisSoftcapLimit"]
}
miscStats.freeAxisSoftcapLimit={
	type:"combined",
	value:function(){return N(2)}
}
miscStats.axisUnlocked={
	type:"combined",
	value:function(){return Math.min(axisCodes.map(i=>g[i+"Axis"].gt(0)?1:0).sum()+1,4+g.stardustUpgrades[0])}
}
miscStats.totalAxis={
	type:"combined",
	value:function(){return axisCodes.map(i=>g[i+"Axis"]).sumDecimals()}
}
miscStats.totalDarkAxis={
	type:"combined",
	value:function(){return axisCodes.map(i=>g["dark"+i+"Axis"]).sumDecimals()}
}
miscStats.masteryRow1Unlocked={
	type:"combined",
	value:function(){return g.XAxis.gt(0)||(g.StardustResets>0)||(g.WormholeResets>0)}
}
miscStats.masteryRow2Unlocked={
	type:"combined",
	value:function(){return g.ZAxis.gt(0)||(g.StardustResets>0)||(g.WormholeResets>0)}
}
miscStats.masteryRow3Unlocked={
	type:"combined",
	value:function(){return stat.totalAxis.gte(40)||(g.StardustResets>0)||(g.WormholeResets>0)},
	dependencies:["totalAxis"]
}
miscStats.masteryRow4Unlocked={
	type:"combined",
	value:function(){return stat.totalAxis.gte(50)||(g.StardustResets>0)||(g.WormholeResets>0)},
	dependencies:["stardustExoticMatterReq","totalAxis"]
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
		return Decimal.convergentSoftcap(Decimal.mul(g.stardust.div(c.d10).add(c.d1).sqrt(),Decimal.convergentSoftcap(g.stardust.add(c.d1).dilate(c.d1_5).pow(c.d0_1),c.ee9,c.ee12,2)).pow(stardustBoostBoost(1)),c.ee12,c.ee15,2)
	}
}
miscStats.stardustBoost2={
	type:"combined",
	value:function(){
		if (!unlocked("Stardust")) return c.d1
		return [g.stardust.add(c.d1).log10(),c.d0_075,stardustBoostBoost(2)].productDecimals().add(c.d1)
	}
}
miscStats.stardustBoost3={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<1) return c.d1
		return Decimal.linearSoftcap(g.stardust.div(c.e7).add(c.d1).log10().pow(c.d0_7).div(c.d2).mul(stardustBoostBoost(3)),c.d10,c.d1).add(c.d1)
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
		return g.stardust.pow(c.d0_15).add(c.e10).log10().log10().sub(c.d1).mul(stardustBoostBoost(6)).add(c.d1)
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
		return g.stardust.pow(c.d0_01).log10().pow(stardustBoostBoost(9).mul(c.d0_4))
	}
}
miscStats.stardustBoost10={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<8) return c.d0
		return Decimal.convergentSoftcap(g.stardust.pow(c.em3).add(c.d10).log10().log10().mul(stardustBoostBoost(10)).div(c.d10),c.d0_5,c.d1)
	}
}
miscStats.stardustBoost11={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<9) return c.d0
		return Decimal.convergentSoftcap(g.stardust.pow(c.em4).add(c.d10).log10().log10().mul(stardustBoostBoost(11)).mul(c.d10),c.d150,c.d200)
	}
}
miscStats.stardustBoost12={
	type:"combined",
	value:function(){
		if (g.stardustUpgrades[2]<10) return c.d0
		return Decimal.convergentSoftcap([g.stardust.pow(c.em5).add(c.d10).log10().log10(),c.d0_01,stardustBoostBoost(12)].productDecimals(),c.d0,c.d0_1)
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
miscStats.darkMatterFreeAxis={type:"combined",value:function(){
	let m=N(0.33);
	m=m.mul(1+achievement.ownedInTier(3)/100);
	m=m.mul(stat.darkStarEffect3.div(c.e2).add(c.d1));
	return m;
},dependencies:["darkStarEffect3"]}
miscStats.darkStarScalingStart={
	type:"combined",
	value:function(){
		let out = c.d48
		if (g.achievement[527]) out = out.add(c.d4)
		return out
	}
}
miscStats.darkStarScalingPower={type:"combined",value:function(){return c.d1}}
miscStats.darkStarReq={type:"combined",value:function(){return darkStarReq()},dependencies:[masteryDependencies(63),"darkStarScalingStart","darkStarScalingPower","gravitationalEnergyEffect"]}
miscStats.maxAffordableDarkStars={type:"combined",value:function(){return maxAffordableDarkStars()},dependencies:miscStats.darkStarReq.dependencies}
for (let i=0;i<energyTypes.length;i++) {
	miscStats[energyTypes[i]+"EnergyPerSec"]={type:"combined",value:function(){return energyPerSec(i)},dependencies:["energyGainSpeed"]}
	miscStats[energyTypes[i]+"EnergyEffect"]={type:"combined",value:function(){return energyEffect(i)},dependencies:["energyEffectBoost"]}
}
miscStats.wormholeDarkAxisReq={type:"combined",value:function(){
	if (g.activeStudy==0) return c.e3;
	return N(studies[g.activeStudy].goal());
}}
miscStats.ironWill={type:"combined",value:function(){return g.StardustResets==0&&g.TotalStardustResets==0&&totalResearch.temporary==0}}
miscStats.wormholeMilestone9Effect={type:"combined",value:function(){return wormholeMilestone9Effect()}}
miscStats.knowledgeEffect={type:"combined",value:function(){return Decimal.convergentSoftcap(g.knowledge.add(c.d10).log10().log10().mul(c.d10),stat.knowledgeEffectCap.mul(c.d0_75),stat.knowledgeEffectCap)},dependencies:["knowledgeEffectCap"]}
miscStats.knowledgeEffectCap={type:"combined",value:function(){return c.d50}}
miscStats.extraDiscoveries_add={type:"combined",value:function(){
	let out = c.d0
	if (g.achievement[604]) out = out.add(achievement(604).effValue())
	return out
}},
miscStats.extraDiscoveries_mul={type:"combined",value:function(){
	let out = c.d1
	if (g.achievement[504]) out = out.mul(c.d1_05)
	return out
}}

const statGenerations = {}
const stat = {}
for (let i of Object.keys(miscStats)) {
	statGenerations[i] = null
	stat[i] = null
}
function statGeneration(name) {
	if (typeof statGenerations[name] == "number") return statGenerations[name]
	let data = miscStats[name]
	let dependencies = (data.type=="breakdown")?[data,...data.modifiers].map(x=>(x.dependencies==undefined)?[]:x.dependencies).flat().filter(x=>x!==undefined):(data.dependencies==undefined?[]:data.dependencies)
	let out = (dependencies.length==0)?0:(dependencies.map(x=>statGeneration(x)).reduce((x,y)=>Math.max(x,y))+1)
	statGenerations[name] = out
	return out
}
var statOrder
function updateStat(id) {
	let data = miscStats[id]
	if (data.type=="combined") {
		stat[id] = data.value()
	} else if (data.type=="breakdown") {
		let value = data.modifiers[0].func()
		for (let i of data.modifiers) value = i.func(value)
		stat[id] = value	
	} else {
		error("miscStats["+id+"] has an invalid type")
	}
}
function updateStats() {
	if (debugActive) {
		for (let i of statOrder) updateStat(i)
		let before = Object.assign({},stat)
		for (let i of statOrder) updateStat(i)
		let after = Object.assign({},stat)
		let out = []
		for (let i of statOrder) if (String(before[i])!==String(after[i])) out.push(i)
		if (out.length>0) error("The following stats are mapped incorrectly: "+out.join(", "))
	} else {
		for (let i of statOrder) updateStat(i)
	}
}
var breakdownCategories = {}
/* generate the breakdown categories variable */
function statBreakdownCategories() {
	let categories = Array.removeDuplicates(Object.values(miscStats).filter(x=>x.type=="breakdown").map(x => x.category));
	let out = {}
	for (let i of categories) {
		let contents = Array.removeDuplicates(Object.keys(miscStats).filter(x => miscStats[x].category==i))
		out[i]={contents:contents,active:contents[0]}
	}
	breakdownCategories = out
	d.innerHTML("SSBnav1",categories.sort().map(x => "<button id=\"button_SSBnav1_"+x+"\" class=\"tabtier3\" style=\"filter:brightness("+(x=="Exotic Matter gain"?100:75)+"%)\" onClick=\"toggleActiveBreakdownSection('"+x+"')\">"+x+"</button>").join(""))
	d.innerHTML("SSBtable",Array(maximumSSBModifierLength).fill(0).map((x,i)=>"<tr id=\"SSBtable_row"+i+"\"><td class=\"tablecell\" style=\"width:32vw\" id=\"SSBtable_label"+i+"\"></td><td class=\"tablecell\" style=\"width:32vw\" id=\"SSBtable_text"+i+"\"></td><td class=\"tablecell\" style=\"width:32vw\" id=\"SSBtable_total"+i+"\"></td></tr>").join(""))
}
var activeBreakdownSection = "Exotic Matter gain";
var activeBreakdownTab = "exoticmatterPerSec";
var activeBreakdownTabModifierLength = miscStats[activeBreakdownTab].modifiers.length
const maximumSSBModifierLength = Object.values(miscStats).filter(x=>x.type=="breakdown").map(x => x.modifiers.length).reduce((x,y)=>Math.max(x,y))
function toggleActiveBreakdownSection(x) {
	activeBreakdownSection = x
	let categories = Object.keys(breakdownCategories)
	for (let i of categories) {
		d.element("button_SSBnav1_"+i).style.filter = "brightness("+(i==x?100:75)+"%)"
	}
	d.innerHTML("SSBnav2",(breakdownCategories[x].contents.length==1)?"":(breakdownCategories[x].contents.map(x => "<button id=\"button_SSBnav2_"+x+"\" class=\"tabtier4\" style=\"filter:brightness("+(x==activeBreakdownTab?100:75)+"%);display:"+(miscStats[x].visible()?"inline-block":"none")+"\" onClick=\"toggleActiveBreakdownTab('"+x+"')\">"+miscStats[x].label+"</button>").join("")))
	toggleActiveBreakdownTab(breakdownCategories[x].active)
}
function toggleActiveBreakdownTab(x){
	activeBreakdownTab=x;
	breakdownCategories[activeBreakdownSection].active=x;
	activeBreakdownTabModifierLength = miscStats[x].modifiers.length
	let categories = breakdownCategories[activeBreakdownSection].contents
	if (categories.length>1) for (let i of categories) d.element("button_SSBnav2_"+i).style.filter = "brightness("+(i==x?100:75)+"%)"
}
var breakdownTabList = Object.entries(miscStats).sort(function(a,b){return a[1].label>b[1].label;}).map(x => x[0]);