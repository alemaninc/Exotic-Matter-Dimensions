"use strict";
var debugActive
try{debugActive=alemanicHash(window.location.href.substring(0,23),16)==="9N6fJbOtGsMg5k65"}catch{debugActive=false}
var betaActive=debugActive
/*
Everything that is represented in "g" as an object generated from a list of keys is stored here and executed directly before main.js.
*/
const axisCodes = "XYZWVUTSRQPO".split("");
const fullAxisCodes = axisCodes.map(x=>[x,"dark"+x,"anti"+x]).flat()

const starList = countTo(10).map(x=>countTo(4).map(y=>x*10+y)).flat()

const energyTypes = ["dark","stelliferous","gravitational","spatial","neural","meta","vacuum","mental","dimensional","temporal"];
const energyResources = ["Exotic matter gain","Stardust gain","Dark matter gain","Free X axis","Mastery power gain","Energy gain","Hawking radiation gain","Knowledge gain","All axis costs","Tickspeed"];
const energyDeterminers = ["exotic matter","stardust","dark matter","X axis","mastery power","all energies","Hawking radiation","knowledge","all axis","tickspeed"];
const energyHyper = [3,3,3,2,3,3,3,3,3,2];

const studies = [
	{    // 0 is used for utilities
		exactFrames:["All frames are exactly 50ms long in this Study; any excess time is converted to dilated time.",()=>true],
		roman:function(x){return (x===10)?"of Studies":roman(x)}
	}
]
studies[1] = {
	name:"Autonomy",
	unlockReq:function(){return c.e3.mul(studyPower(1)+1)},
	description:function() {return ["You can't enter the Stardust or Automation tabs, or any subtabs in Main except Offline Time. However, everything inside these tabs still works normally.","All hotkeys are disabled."]},
	research:"r5_7",
	goal:function(comp=studyPower(1)) {return [N(1000),N(2000),N(3000),N(4000)][comp]},
	reward:function(num,comp=g.studyCompletions[1]) {
		if (num===1) return [c.d0,c.d0_2,c.d0_33,c.d0_42,c.d0_5][comp];
		if (num===2) {
			if (comp===0) return 0
			let achievementFactor = Math.log2((totalAchievements>80)?(totalAchievements/64):(1+totalAchievements**5/1.31072e10))+1
			return 10*(comp-countTo(comp).map(x=>achievementFactor**(x-5)).sum())*studyRewardBoost(1,2).toNumber()
		}
		if (num===3) return [c.d1,c.d4,c.d20,c.d125,c.e3][comp].pow(studyRewardBoost(1,3));
		functionError("studies[1].reward",arguments)
	},
	reward_desc:function() {return [
		"Empower "+studyRewardHTML(1,1,1)+"% of your Y axis",
		"Increase the effect of stardust upgrade #2 by "+studyRewardHTML(1,2,2)+" percentage points (based on achievements)",
		"Multiply Hawking radiation gain by "+studyRewardHTML(1,3,2)
	]},
	rewardFormulas:{
		2:(comp=g.studyCompletions[1],ach=totalAchievements)=>studyRewardBoost(1,2).mul(c.d10).noLeadFormat(3)+" × Σ<span class=\"xscript\"><sup>"+comp+"</sup><sub>1</sub></span>(1 - ("+(ach>=80?"A ÷ 64":("1 + A<sup>5</sup> ÷ "+BEformat(1.31072e10)))+")<sup>n-5</sup>)"
	}
},
studies[2] = {
	name:"Big Bang Theory",
	unlockReq:function(){return N(["e7e3","e1e4","e12500","e4e4"][studyPower(2)])},
	binding2Info:function(){
		let normal = Object.fromEntries(countTo(10).map(x=>[x,[]]))
		let bound = Object.fromEntries(countTo(10).map(x=>[x,[]]))
		for (let i=1;i<41;i++) {normal[starRow(i,false)].push(i);bound[starRow(i,true)].push(i)}
		function table(obj,heading) {
			let out = "<table><tr><th colspan=\"6\">"+heading+":</th></tr><tr><td rowspan=\"2\" colspan=\"2\"></td><td colspan=\"4\">Stars needed to afford <i>X</i> from this row:</td></tr><tr>"+countTo(4).map(x=>"<td>"+x+"</td>").join("")+"</tr>"+countTo(10).map(x=>"<tr>"+((x===1)?"<td rowspan=\"10\">Row</td>":"")+"<td>"+x+"</td>"+countTo(4,true).map(y=>"<td>"+obj[x][y]+"</td>").join("")+"</tr>").join("")+"</table>"
			return out.replaceAll("<th","<th class=\"tablecell\"").replaceAll("<td","<td class=\"tablecell\"")
		}
		popup({text:table(normal,"Normal")+table(bound,"In Study"),buttons:[["Close",""]]})
	},
	description:function() {return ["Star costs increase much faster.","Stars must be purchased in a different order.<button class=\"information\" style=\"border-color:inherit;color:inherit;\" onMouseDown=\"studies[2].binding2Info()\">?</button>","Each unspent star acts as a free dark star."]},
	research:"r5_9",
	goal:function(comp=studyPower(2)) {return [c.d800,c.d950,c.d1100,N(2100)][comp];},
	reward:function(num,comp=g.studyCompletions[2]) {
		if (num===1) return [c.d0,c.d9,c.d16,c.d21,c.d25][comp];
		if (num===2) return [c.d0,c.d0_07,c.d0_12,c.d0_16,c.d0_2][comp].mul(studyRewardBoost(2,2)).add(c.d1);
		if (num===3) return [c.d0,c.d0_25,c.d0_45,c.d0_6,c.d0_75][comp].mul(studyRewardBoost(2,3)).mul(c.d0_5);
		functionError("studies[2].reward",arguments)
	},
	reward_desc:function() {return [
		"Star Scaling is "+studyRewardHTML(2,1,0)+"% weaker",
		"Row 9 star effects are raised to the power of "+studyRewardHTML(2,2,4),
		"Each unspent star acts as "+studyRewardHTML(2,3,2)+" free dark stars. Allocated stars count as "+((g.highestGalaxies>=galaxyEffects[5].req)?(galaxyEffects[5].boost.value().mul(c.e2).format()+"%"):"half")+" of this value. Does not work in Study II."
	]}
},
studies[3] = {
	name:"Analgesia",
	unlockReq:function(){return [N("e7.5e7"),c.ee10,N("ee11"),N("e1e12")][studyPower(3)]},
	energyGainConstant:function(){return [N(1000),N(2000),N(3000),N(4000)][studyPower(3)]},
	energyPowerConstant:function(){return [c.dm1,c.dm2,c.dm5,N(-20)][studyPower(3)]},
	description:function(){return ["Energy increases "+this.energyGainConstant().format(0)+"× faster, but all other Energy speed and effect multipliers are disabled.","Energies severely reduce production instead of boosting it (<i>x</i> → <i>x</i><sup>"+this.energyPowerConstant().format()+"</sup>).","You start with all Energies unlocked."]},
	disclaimers:[
		studies[0].exactFrames,
		["Row 5 and 6 Energy research are always 100% powered in Study III, unaffected by any boosts or nerfs.",()=>unlocked("Study XIII")]
	],
	research:"r9_2",
	goal:function(comp=studyPower(3)){return [c.d2e3,N(2222),N(2500),N(2666)][comp];},
	reward:function(num,comp=g.studyCompletions[3]){
		if (num===1) return comp
		if (num===2) return [c.d0,c.d0_2,c.d0_35,c.d0_45,c.d0_5][comp].mul(studyRewardBoost(3,2))
		if (num===3) {
			let out = c.d1
			for (let i=0;i<comp;i++) out = out.add(g.truetimeThisWormholeReset.div(c.d10.pow(i)).pow(i===0?0.5:i))
			return out.pow(studyRewardBoost(3,3))
		}
		functionError("studies[3].reward",arguments)
	},
	reward_desc:function(){return [
		"Increase the cap of Stardust Upgrade #5 by "+studyRewardHTML(3,1,0),
		"Keep ^"+studyRewardHTML(3,2,3)+" of each of the first six Energies on Stardust reset (does not work in Study III)",
		"Meta energy increases "+studyRewardHTML(3,3,2)+"× faster (based on game-time in this Wormhole)"
	]},
	rewardFormulas:{
		3:function(comp=g.studyCompletions[3]){
			let out = "1 + Σ<span class=\"xscript\"><sup>"+(comp-1)+"</sup><sub>0</sub></span>(t ÷ 10<sup>n</sup>)<sup>max(n, 0.5)</sup>"
			if (studyRewardBoost(3,3).eq(c.d1)) return out
			return "("+out+")<sup>"+studyRewardBoost(3,3).noLeadFormat(3)+"</sup>"
		}
	}
},
studies[4] = {
	name:"Vacuum Decay",
	unlockReq:function() {return Decimal.FC_NN(1,1,Math.log10(2)*(studyPower(4)+1)*512)},
	description:function(){return ["Every Stardust reset you do raises stardust gain to the power of 0.5 for the rest of the Study."]},
	research:"r9_14",
	goal:function(comp=studyPower(4)){return [N(3200),N(3600),N(4250),N(5400)][comp]},
	reward:function(num,comp=g.studyCompletions[4]){
		if (num===1) return N([0.5,0.514,0.527,0.539,0.55][comp])
		if (num===2) return N([1,1.6,2.3,3.1,4][comp]).pow(studyRewardBoost(4,2))
		if (num===3) return [c.d1,c.d2_5,c.d5,c.d10,c.d20][comp].pow(studyRewardBoost(4,3).mul(c.d0_3))
		functionError("studies[4].reward",arguments)
	},
	reward_desc:function(){return [
		"Base stardust gain formula exponent is "+studyRewardHTML(4,1,2),
		"The effect of Mastery 42 is "+studyRewardHTML(4,2,2)+"× stronger",
		"The first effect of dark stars is "+studyRewardHTML(4,3,2)+"× stronger"
	]}
},
studies[5] = {
	name:"Scientific Illiteracy",
	unlockReq:function(){return [N("e5000"),N("e5875"),N("e30825"),N("e281775")][studyPower(5)]},
	difficultyConstant:function(){return [c.d32,N(64),N(256),c.e4][studyPower(5)]},
	description:function(){return ["Entering this Study will immediately respec your Research, and all research costs will be multiplied by "+studies[5].difficultyConstant().format()+"."]},
	research:"r2_8",
	goal:function(comp=studyPower(5)){return [N(4000),N(4000),N(7000),N(10666)][comp]},
	reward:function(num,comp=g.studyCompletions[5]){
		if (num===1) return [c.d0,c.d80,c.d90,N(96),c.e2][comp]
		if (num===2) return c.d1.sub([c.d0,c.d0_01,N(29/1500),N(41/1500),N(1/30)][comp].mul(studyRewardBoost(5,2)))
		if (num===3) return [c.d0,c.d2_5,c.d10,c.d30,c.d60][comp].mul(studyRewardBoost(5,3))
		functionError("studies[5].reward",arguments)
	},
	reward_desc:function(){return [
		researchGroupList.study5a.label+" and "+researchGroupList.study5b.label+" Research work at "+studyRewardHTML(5,1,0)+"% efficiency",
		"Observation costs are raised to the power of "+studyRewardHTML(5,2,4),
		"Subtract "+studyRewardHTML(5,3,2)+" from the cost of all research (cannot go below 0)"
	]}
},
studies[6] = {
	name:"Event Horizon",
	unlockReq:function(){return [N(500),N(1000),N(4000),N(11111)][studyPower(6)]},
	effect:function(p=stat.totalDarkAxis.div(stat.wormholeDarkAxisReq).min(c.d1)){return (((g.activeStudy===10)&&(studyPower(10)===2))?N(936).log10():[c.d27,c.d30,N(1.11e111).log10(),N("9.99e999").log10()][studyPower(6)]).pow(c.d1.sub(p)).pow10()},
	description:function(){return ["The game runs "+this.effect(c.d0).format()+"× slower. However, as you get closer to the goal of the Study this penalty gradually reduces up to a minimum of 10×."]},
	research:"r16_8",
	goal:function(comp=studyPower(6)){return [N(4500),N(4800),N(9999),N(22222)][comp]},
	reward:function(num,comp=g.studyCompletions[6]){
		if (num===1) return [c.d1,c.d1_25,N(1.75),N(2.5),c.d4][comp]
		if (num===2) return studyRewardBoost(6,2).mul(comp/20)
		if (num===3) return studyRewardBoost(6,3).mul(0.0075*comp)
		functionError("studies[6].reward",arguments)
	},
	reward_desc:function(){return [
		"The effect of tickspeed on chroma gain is raised to the power of "+studyRewardHTML(6,1,4),
		"Tickspeed<sup>"+studyRewardHTML(6,2,3)+"</sup> affects the base gain of knowledge",
		"Research 8-2 is additively "+studyRewardHTML(6,3,2)+"% stronger per dark axis owned (currently: "+percentOrMult(studies[6].reward(3).mul(stat.totalDarkAxis).div(c.e2).add(c.d1))+")"
	]},
},
studies[7] = {
	name:"Luck Be In The Air Tonight",
	unlockReq:function(){return [N("5.55e577777777"),N("8.88e888888888"),N("e1.5e9"),N("6.66e2666666666")][studyPower(7)]},
	description:function(){return ["Each stardust reset gives luck essence based on the amount of stardust gained. The gain of exotic matter, mastery power, stardust and dark matter is raised to a power between "+N(studies[7].luckMinPenalty()).noLeadFormat(4)+" and "+N(studies[7].luckMaxPenalty()).noLeadFormat(4)+" based on how close luck essence is to a multiple of 1,000."]},
	luckEssenceGain:function(x=stat.pendingstardust.sub(g.stardust)){return (x.lt(c.d1)?c.d0:x.add(c.d10).log10().log10().mul([444444,555555,666666,777777][studyPower(7)]).floor()).add(g.luckEssence).min(c.e15).sub(g.luckEssence).toNumber()},
	luckMinPenalty:function(){
		let out = 0
		if ((g.activeStudy===10)&&(studyPower(10)===0)) {out *= 0.741}
		return out
	},
	luckMaxPenalty:function(){
		let out = 1
		if ((g.activeStudy===10)&&(studyPower(10)===0)) {out *= 0.741}
		return out
	},
	luckEffect:function(x=g.luckEssence){
		if (x===1e15) return N(this.luckMinPenalty())   // to avoid randomness at high values always give the maximum penalty at 1e15 :D
		return N(this.luckMinPenalty() + (1+Math.cos(x*Math.PI/500)) * (this.luckMaxPenalty()-this.luckMinPenalty()) / 2)
	},
	research:"r23_5",
	goal:function(comp=studyPower(7)){return [N(6227),N(8888),N(11111),N(17777)][comp]},
	reward:function(num,comp=g.studyCompletions[7]){
		if (num===1) return [c.d0,N(50),N(75),N(90),N(100)][comp]
		if (num===2) return [c.d0,c.d75,c.d90,N(98),c.d100][comp].mul(studyRewardBoost(7,2))
		if (num===3) return [g.hawkingradiation.add(c.e10).log10().log10().pow(comp).sub(c.d1),c.em3,studyRewardBoost(7,3)].productDecimals().pow10().sub(c.d1)
		functionError("studies[7].reward",arguments)
	},
	reward_desc:function(){return [
		"Empower "+studyRewardHTML(7,1,3)+"% of your dark W axis",
		researchGroupList.study7.label+" Research works at "+studyRewardHTML(7,2,3)+"% efficiency",
		(unlocked("Luck")||unlocked("Matrix"))?("Gain "+studyRewardHTML(7,3,2)+" luck shards per second (based on Hawking radiation)"):"? ? ? (Complete to reveal)"
	]},
	rewardFormulas:{
		3:(comp=g.studyCompletions[7])=>"10<sup>(log<sup>[2]</sup>(HR + "+c.e10.format()+")"+formulaFormat.exp(N(comp))+" - 1)"+formulaFormat.mult(studyRewardBoost(7,3).div(c.e3))+"</sup> - 1"
	}
},
studies[8] = {
	name:"Masterful",
	unlockReq:function(){return [N("3.33e333"),N("7.77e777"),N("9.99e2999"),N("4.44e4444")][studyPower(8)]},
	darkAxisMaxCostExp:function(){
		let out = N(88)
		if ((g.activeStudy===10)&&(studyPower(10)===1)) {out = out.mul(Decimal.add(g.truetimeThisWormholeReset.add1Log(c.d10).add1Log(c.d10),g.truetimeThisWormholeReset.add1Log(c.d10).add1Log(c.d10).pow(c.d2)))}
		return out
	},
	darkAxisMaxCost:function(){return g.masteryPower.add1PowSub1(this.darkAxisMaxCostExp())},
	description:function(){return ["All effects which allow you to activate more than 1 Mastery from each row are disabled.","Dark axis cannot be purchased if their cost is greater than <i>(MP + 1)<sup>"+studies[8].darkAxisMaxCostExp().noLeadFormat(4)+"</sup> - 1</i>"]},
	research:"r18_8",
	goal:function(comp=studyPower(8)){return [N(5888),N(7888),N(15288),N(16888)][comp]},
	reward:function(num,comp=g.studyCompletions[8]) {
		if (num===1) return [c.d50,N(52.5),N(55),N(57.5),N(60)][comp]
		if (num===2) return [c.d0,c.d9,c.d16,c.d21,c.d24][comp].mul(studyRewardBoost(8,2))
		if (num===3) {return (comp>0)?[N(3240),N(8100),N(16200),N(25920)][comp-1].mul(studyRewardBoost(8,3)):g.achievement[310]?c.d900:c.d0}
		functionError("studies[8].reward",arguments)
	},
	reward_desc:function(){return [
		"Increase the knowledge effect limit to "+studyRewardHTML(8,1,2)+"%",
		"Mastery 85 is "+studyRewardHTML(8,2,2)+"% stronger per Tier 8 achievement (additive; currently: "+studies[8].reward(2).mul(achievement.ownedInTier(8)).noLeadFormat(2)+"%)",
		"Add "+studyRewardHTML(8,3,x=>timeFormat(x))+" of real time to the mastery power gain timer"
	]}
},
studies[9] = {
	name:"Scientia est Experientia",
	unlockReq:function(){return [N(9.99e149),N(9.99e229),N("9.99e469"),N("9.99e1399")][studyPower(9)]},
	description:function(){return ["Exotic matter gain, dark matter gain and all global divisors to normal and dark axis costs are reduced to 10<sup>log(base gain)<sup>"+this.experientiaEffect(c.d0).noLeadFormat(3)+"</sup></sup>.","If not finished within 9 seconds, the Study will reset itself, and you will gain or lose experientia based on your number of dark stars, mitigating or enhancing the previous Binding."]},
	disclaimers:[
		studies[0].exactFrames
	],
	research:"r23_11",
	goal:function(){return N(999)},
	reward:function(num,comp=g.studyCompletions[9]){
		if (num===1) return [Infinity,0.09,0.06,0.03,0][comp]
		if (num===2) return c.d0_5.pow(N(comp/3).mul(studyRewardBoost(9,2)))
		if (num===3) return [c.d0,c.d1,N(1.9),N(2.6),c.d3][comp].mul(studyRewardBoost(9,3))
		functionError("studies[9].reward",arguments)
	},
	reward_desc:function(){return [
		(unlocked("Antimatter")||unlocked("Matrix"))?("Antimatter gain is reduced to log<sup>["+studyRewardHTML(9,1,x=>(x===Infinity)?"Infinity":N(x).noLeadFormat(3))+"]</sup>(gain)"):"? ? ? (Complete to reveal)",
		"Galaxy Penalty 3 is "+studyRewardHTML(9,2,x=>c.d1.sub(x).mul(c.e2).noLeadFormat(3))+"% weaker",
		"All Spatial Synergism research is "+studyRewardHTML(9,3,2)+"% more effective"
	]},
	experientiaEffect:function(x=g.study9.xp,pow=studyPower(9)){
		let base = N((15-pow)/30)
		let exp = x.gt(c.d0)?x.div([c.e2,c.d125,c.d250,c.e3][pow]).add(c.d1).recip():c.d1.sub(x.div(c.e2))
		if ((g.activeStudy===10)&&(studyPower(10)===2)) {exp = exp.mul(0.963)}
		return base.pow(exp)
	},
	timeLeft:function(){return 9-g.timeThisWormholeReset},
	deltaXP:function(x=g.darkstars,comp=studyPower(9)){
		let out = x.sub(g.study9.xp.div(c.d10).add([111,116,131,156][comp]+g.study9.resets))
		if (out.sign===-1) out = out.mul(c.d10)
		return out.floor()
	},
	formatChange:function(x=this.deltaXP()){return ["","±","+"][this.deltaXP().sign+1]+this.deltaXP().format()},
	reset:function(){
		notify("Study IX has reset! "+this.formatChange()+" experientia","var(--exp)","#000000")
		let xp = g.study9.xp.add(this.deltaXP())
		let fracxp = g.study9.fracxp
		let resets = g.study9.resets+1
		let ontological = g.study10Options
		if ((g.activeStudy===0)||Decimal.gt(stat.totalDarkAxis,stat.wormholeDarkAxisReq)) {wormholeReset()} else {enterStudy(g.activeStudy)} // Study X proofing
		g.study9.xp = xp
		g.study9.fracxp = fracxp
		g.study9.resets = resets
		g.study10Options = ontological
	}
},
studies[10] = {
	name:"Study of Studies",
	// no unlock requirement property due to 4 separate research
	description:function(){
		let pow = studyPower(10)
		if (pow===0) {return [
			"The Binding of Study I is applied, and subtabs in Wormhole other than Studies cannot be opened.",
			"The Binding of Study IV is applied, and stardust gain is additionally raised to the power of 0.9.",
			"The Binding of Study VII is applied, and the luck essence effect is multiplied by 0.9."
		]} else if (pow===1) {return [
			"The Binding of Study II is applied, and Star Scaling is 2× stronger.",
			"The Binding of Study V is applied, but all Research are 0.005% cheaper per digit in your mastery power (additive to a maximum of 50%; current total: "+(numberOfDigits(g.masteryPower).gte(c.e4)?"50":numberOfDigits(g.masteryPower).div(c.d200).toFixed(3))+"%).",
			"The Binding of Study VIII is applied; Masterful limit is raised to the power of "+(showFormulas?formulaFormat("log(log(t + 1) + 1) + log(log(t + 1) + 1)<sup>2</sup>"):Decimal.add(g.truetimeThisWormholeReset.add1Log(c.d10).add1Log(c.d10),g.truetimeThisWormholeReset.add1Log(c.d10).add1Log(c.d10).pow(c.d2)).noLeadFormat(4))+" (based on time in the current Wormhole)."
		]} else if (pow===2) {return [
			"The Binding of Study III is applied, but Row 5 and 6 Energy research have no effect.",
			"The Binding of Study VI is applied, but its maximum penalty is reduced to 936×.",
			"The Binding of Study IX is applied, but the experientia effect is raised to the power of 0.963"
		]} else {return ["Select any three previous Studies of your choice, the Bindings of which will all be applied simultaneously.<br>No additional conditions are imposed like in previous Triads."]}
	},
	disclaimers:[
		["When trapped in a Study, its effects are always applied at level 4, even if you do not have 3 completions yet.",()=>{for (let i of [[1,4,7],[2,5,8],[3,6,9],countTo(9)][studyPower(10)]) {if (g.studyCompletions[i]<3) {return true}}; return false}],
		{get 0(){return (g.studyCompletions[10]===4)?"":("You are repeating a Triad which is already completed. Buy research "+researchOut(studies[10].researchList[g.studyCompletions[10]])+" to access the next level")},1:()=>((studyPower(10)<Math.min(g.studyCompletions[10],3))&&(g.studyCompletions[10]<4))}
	],
	researchList:["r26_5","r25_8","r26_11","r27_8"],
	get research(){return studies[10].researchList[studyPower(10)]},
	goal:function(comp=studyPower(10)){return [N(17444),N(8285),N(936),N(36000)][comp]},
	rewardStep:function(x,comp=g.studyCompletions[10]){return (comp===4)?2:(comp>=x)?1:0},
	reward:function(num,comp=g.studyCompletions[10]){
		let step = this.rewardStep(num,comp)
		if (num===1) return g.luckShards.add(c.d1).log10().mul([c.d0,N(1.25e-4),N(2e-4)][step]).add(c.d1)
		if (num===2) return (step===0)?c.d1:N(g.stars+g.galaxies*6).pow([c.d2,c.d3][step-1]).div([N(6250),N(4e5)][step-1]).max(c.d1).pow(studyRewardBoost(10,2))
		if (num===3) return [g.antimatter.add(c.e10).layerplus(-3),[c.d0,c.d0_3,c.d0_4][step],studyRewardBoost(10,3)].productDecimals()
		if (num===4) return [c.d1,N(1.12),N(1.21),N(1.28),c.d4div3][comp]
		functionError("studies[10].reward",arguments)
	},
	reward_desc:function(){return [
		"Multiply the U axis effect by "+studyRewardHTML(10,1,x=>x.formatFrom1(3))+" per achievement, based on luck shards (translated to "+studies[10].reward(1).pow(totalAchievements).noLeadFormat(3)+"× U axis effect)",
		"Anti-T axis is "+studyRewardHTML(10,2,x=>x.sub(c.d1).mul(c.e2).noLeadFormat(3))+"% stronger (based on stars and galaxies)",
		"Tickspeed-to-energy conversion exponent is increased by "+studyRewardHTML(10,3,3)+", based on antimatter (translated to "+stat.tickspeed.pow(studies[10].reward(3)).noLeadFormat(2)+"× faster energy gain)",
		"The second reward of every other Study is "+studyRewardHTML(10,4,x=>x.sub(c.d1).mul(c.e2).noLeadFormat(3))+"% more effective"
	]},
	rewardFormulas:{
		1:function(comp=g.studyCompletions[10]){return "log(S + 1) × "+["0","0.000125","0.0002"][studies[10].rewardStep(1,comp)]+" + 1"},
		2:function(comp=g.studyCompletions[10]){let step = studies[10].rewardStep(2,comp);return (step===0)?"0":("max((★ + G × 6)"+formulaFormat.exp(((step===2)?c.d3:c.d2).mul(studyRewardBoost(10,2)))+formulaFormat.mult(c.e2.div([N(6250),N(4e5)][step-1].pow(studyRewardBoost(10,2))))+" - 100, 0)")},
		3:function(comp=g.studyCompletions[10]){return "log<sup>[3]</sup>(AM + "+c.e10.format()+") "+formulaFormat.mult([c.d0,c.d0_3,c.d0_4][studies[10].rewardStep(3,comp)].mul(studyRewardBoost(10,3)))}
	},
},
studies[11] = {
	name:"Lunar Clock",
	unlockReq:function(){return [N(1e5),N(112345),N(126196),N(141421)][studyPower(11)]},
	active:function(){
		let num = Math.floor(g.timeThisWormholeReset/0.75)%12
		return (num<8)?axisCodes[num]:["R","Q","P","O"][num-8]
	},
	lunarMinutes:function(){return Math.floor((g.timeThisWormholeReset*80)%60)},
	description:function(){return ["Only one type of axis is active at a time, starting at X and changing every 750 milliseconds.","Row 1 Masteries, row 1 stars and Stardust Boosts 1 and 4 are disabled and the base gain of dark matter are capped at 1."]},
	research:"r33_3",
	goal:function(comp=studyPower(11)){return [N(11800),N(12617),N(13579),N(14142)][comp]},
	reward:function(num,comp=g.studyCompletions[11]){
		if (num===1) return [c.d256,N(270),N(282),N(292),c.d300][comp]
		if (num===2) return [c.d1,c.d2,N(3.5),N(5.5),c.d8][comp].pow(studyRewardBoost(11,2))
		if (num===3) return [c.d0,c.d2,N(3.2),c.d4,N(4.8)][comp].mul(studyRewardBoost(11,3))
		functionError("studies[11].reward",arguments)
	},
	reward_desc:function(){return [
		"Normal axis cost superscaling starts at "+studyRewardHTML(11,1,0),
		"The effective amount of luck shards for their second effect is raised to the power of "+studyRewardHTML(11,2,4),
		"Anti-axis cost superscaling starts "+studyRewardHTML(11,3,3)+" later (normally at 64)"
	]}
}
studies[12] = {
	name:"Titanium Will",
	unlockReq:function(){return [147,152,157,162][studyPower(12)]},
	description:function(){return ["Non-permanent research have no effect.","Stardust resets are disabled.","All dark axis cost divisors are disabled.","Dark matter gain is capped at 1, but gain access to Titanium Empowerments in the Dark Matter tab which weaken this cap to a softcap."]},
	research:"r33_13",
	goal:function(comp=studyPower(12)){return [c.d40,c.d50,c.e2,c.d150][comp]},
	sc:function(x=calcStatUpTo("darkmatterPerSec","Fortitude"),p=g.study12.fortitude){
		return p.eq(c.d0)?x.min(c.d1):Decimal.logarithmicSoftcap(x,c.d1,p.recip())
	},
	empowerment:{
		base:function(){
			let out = study13.rewards.forge.eff().b
			return out
		},
		scale:function(){
			let out = study13.rewards.forge.eff().s
			return out
		},
		req:function(x=g.study12.empowerments){return [this.base(),this.scale(),x].decimalPowerTower()},
		affordable:function(x=g.exoticmatter){return x.lt(this.base())?g.study12.empowerments:x.log(this.base()).log(this.scale()).floor().add(c.d1)},
		gain:function(){g.study12.empowerments = this.affordable()}
	},
	fortitude:{
		max:function(x=g.study12.empowerments){
			let out = x
			if ((!StudyE(12))&&study13.bound(275)) {out = out.mul(study13.bindingEff(275))}
			return out
		},
		gain:function(x=g.study12.empowerments){
			let out = [x,c.em4,stat.tickspeed].productDecimals()
			if ((!StudyE(12))&&study13.bound(275)) {out = out.mul(study13.bindingEff(275))}
			return out
		},
		lim:function(x,max=this.max()){
			if (max.eq(c.d0)) {return c.d0}
			return Decimal.pow(max.add(c.d1),Decimal.sub(c.d1,Decimal.log(x.add(c.d1),max.add(c.d1)).add(c.d1).recip())).sub(c.d1)
		},
		invlim:function(x,max=this.max()){
			if (x.gte(max)) {return c.maxvalue}
			return Decimal.pow(max.add(c.d1),Decimal.sub(c.d1,Decimal.log(x.add(c.d1),max.add(c.d1))).recip().sub(c.d1)).sub(c.d1)
		}
	},
	reward:function(num,comp=g.studyCompletions[12]){
		if (num===1) return comp/400
		if (num===2) return [c.d0,c.d16,c.d24,c.d28,c.d32][comp].mul(studyRewardBoost(12,2))
		if (num===3) return [c.d0,N(0.09),N(0.17),c.d0_24,c.d0_3][comp].mul(studyRewardBoost(12,3))
		functionError("studies[12].reward",arguments)
	},
	reward_desc:function(){return [
		"The rewards of "+achievement.label(502,4)+" are increased by "+studyRewardHTML(12,1,x=>N(x*100).noLeadFormat(2))+" percentage point"+((studies[12].reward(1)===0.01)?"":"s")+" each",
		achievement.label(527)+" can now be boosted by yellow lumens (effect cap at "+studyRewardHTML(12,2,x=>x.add(c.d4).noLeadFormat(3))+")",
		achievement.label(betaActive?525:526)+" reward is "+studyRewardHTML(12,3,x=>x.mul(c.e2).noLeadFormat(3))+"% stronger and affects anti-S axis with "+studyRewardHTML(12,3,x=>x.mul(c.e2).noLeadFormat(3))+"% effect"
	]}
}
studies[13] = { // we store only 'research' for ach604 and 'goal' for stat.wormholeDarkAxisReq, everything else is in study13.js
	research:"r44_8",
	goal:function(){return achievement.perAchievementReward[9].currentVal}
}
const fullStudyNames = [null,...countTo(12).map(x=>(x===10)?studies[x].name:("Study "+roman(x)+" \""+studies[x].name+"\""))]

const lightNames = ["red","green","blue","cyan","magenta","yellow","white","black","gray"]

const luckRunes = {
	unifolium:{baseCost:c.inf,scale:c.inf,upgBaseCost:c.d1,upgScale:c.d1_1},
	duofolium:{baseCost:N(1e100),scale:c.e5,upgBaseCost:c.d2,upgScale:N(2**(1/3))},
	trifolium:{baseCost:c.e4,scale:c.d1_01,upgBaseCost:c.d10,upgScale:c.d1_25},
	quatrefolium:{baseCost:c.e6,scale:c.d1_1,upgBaseCost:c.d4,upgScale:c.d1_5},
	cinquefolium:{baseCost:c.e14,scale:c.d3,upgBaseCost:c.d1,upgScale:c.d2}
}
const luckRuneTypes = Object.keys(luckRunes)
// luck upgrades use geometric scaling as a cost formula, but rounded down - calculate amount of upgrades at which rounding no longer matters
for (let i of luckRuneTypes) luckRunes[i].noRoundThreshold = c.e16.div(luckRunes[i].upgBaseCost).log(luckRunes[i].upgScale).ceil()
const luckUpgrades = {
	unifolium:{
		cascade:{
			name:"Cascade",
			desc:"Each (effective) Luck Upgrade level adds {} levels to the two directly below",
			eff:function(x=stat.luckUpgLevel_unifolium_cascade){
				let out = x.add1Log(c.d2).div(c.e2)
				if (out.gt(c.d0_5)) {out = out.mul(2e10).log10().log10().div(c.d2)}
				return out
			},
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:function(){
				let out = "log<sub>2</sub>(λ + 1) ÷ 100"
				if (this.eff().gt(c.d0_5)) {out = "log<sup>[2]</sup>("+out+" × "+BEformat(2e10)+") ÷ 2"}
				return out
			},
			cascade:[]
		}
	},
	duofolium:{
		space:{
			name:"of All Matters",
			desc:"All axis costs are raised to the power of {}",
			eff:(x=stat.luckUpgLevel_duofolium_space)=>x.div(c.e2).add(c.d1).pow(c.dm0_5),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"(1 + λ × 0.01)<sup>-0.5</sup>",
			cascade:["cascade"]
		},
		star:{
			name:"in All Galaxies",
			desc:"Galaxy Penalty 3 is raised to the power of {}",
			eff:(x=stat.luckUpgLevel_duofolium_star)=>N(0.94).pow(x),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"0.94<sup>λ</sup>",
			cascade:["cascade"]
		}
	},
	trifolium:{
		normalAxis:{
			name:"Exotic Matter",
			desc:"Normal axis costs are raised to the power of {}",
			eff:(x=stat.luckUpgLevel_trifolium_normalAxis)=>c.d99.div(c.d99.add(x)),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"99 ÷ (99 + λ)",
			cascade:["space"]
		},
		darkAxis:{
			name:"Dark Matter",
			desc:"Dark axis costs are raised to the power of {}",
			eff:(x=stat.luckUpgLevel_trifolium_darkAxis)=>c.d99.div(c.d99.add(x)),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"99 ÷ (99 + λ)",
			cascade:["space","star"]
		},
		antiAxis:{
			name:"Antimatter",
			desc:"Anti-axis costs are raised to the power of {}",
			eff:(x=stat.luckUpgLevel_trifolium_antiAxis)=>c.d99.div(c.d99.add(x).sub(x.div(c.d10).add(c.d1).ln().mul(c.d10))),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"<span style=\"font-size:80%;\">99 ÷ (99 + λ - 10 × ln(1 + λ ÷ 10))</span>",
			cascade:["star"],
			unlocked:function(){return g.research.r26_3}
		}
	},
	quatrefolium:{
		star:{
			name:"Stars",
			desc:"Star costs are raised to the power of {}",
			base:function(){
				let out = c.d0_95
				return out
			},
			eff:function(x=stat.luckUpgLevel_quatrefolium_star){return this.base().pow(x)},
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:function(){return this.base().noLeadFormat(3)+"<sup>λ</sup>"},
			cascade:["normalAxis"]
		},
		darkstar:{
			name:"Dark Stars",
			desc:"Dark star costs are divided by {}",
			eff:(x=stat.luckUpgLevel_quatrefolium_darkstar)=>x.gt(c.d20)?x.add(c.d5).pow(c.d0_5).sub(c.d5).div(c.d4).exp().mul(c.d2):x.div(c.d20).add(c.d1),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>stat.luckUpgLevel_quatrefolium_darkstar.gte(c.d20)?"e<sup>(λ + 5)<sup>0.5</sup> - 5) ÷ 4</sup> × 2":"1 + λ ÷ 20",
			cascade:["normalAxis","darkAxis"]
		},
		synergism:{
			name:"Synergism",
			desc:"Spatial Synergism research is {}% more effective",
			eff:(x=stat.luckUpgLevel_quatrefolium_synergism)=>x.gt(c.d50)?x.div(c.d10).sub(c.d4).ln().div(c.d20).add(c.d1_25):x.div(c.d200).add(c.d1),
			format:(x=this.eff())=>x.sub(c.d1).mul(c.e2).noLeadFormat(3),
			formula:()=>stat.luckUpgLevel_quatrefolium_synergism.gte(c.d50)?"25 + ln(λ ÷ 10 - 4) × 5":"λ ÷ 2",
			cascade:["darkAxis","antiAxis"]
		},
		prismatic:{
			name:"Quadrahedron",
			get desc(){return "Increase the base of "+prismaticUpgradeName("prismaticSpeed")+" by {}"},
			power:function(){
				let out = c.d32_5
				if (g.achievement[819]) out = out.mul(c.d2)
				return out
			},
			eff:function(x=stat.luckUpgLevel_quatrefolium_prismatic){return x.add(c.d1).mul(c.e10).layerplus(-3).pow(c.d2).mul(this.power())},
			format:(x=this.eff())=>x.noLeadFormat(4),
			formula:function(){return "<span style=\"font-size:90%;\">"+this.power().noLeadFormat(3)+" × log<sup>[3]</sup>((λ + 1) × "+c.e10.format()+")<sup>2</sup></span>"},
			cascade:["antiAxis"],
			unlocked:function(){return g.research.r26_3}
		}
	},
	cinquefolium:{
		observation:{
			name:"Science",
			desc:"Observation costs are raised to the power of {}",
			eff:(x=stat.luckUpgLevel_cinquefolium_observation)=>c.d400.div(x.gt(c.e2)?x.div(c.d25).sub(c.d3).ln().mul(c.d25).add(c.d500):x.add(c.d400)),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"400 ÷ ("+(stat.luckUpgLevel_cinquefolium_observation.gte(c.e2)?"25 × ln(λ ÷ 25 - 3) + 500":"λ + 400")+")",
			cascade:["star"]
		},
		chroma:{
			name:"Chroma",
			desc:"Chroma gain is multiplied by {} (based on total lumens)",
			eff:(x=stat.luckUpgLevel_cinquefolium_chroma)=>g.lumens.map(i=>i.add(c.d7).log(c.d7).pow(x.max(c.d1).ln().add(c.d1))).sumDecimals().mul(x.min(c.d1)).div(c.d7).pow10(),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"<span style=\"font-size:60%;\">10<sup>Σ<span class=\"xscript\"><sup>9</sup><sub>1</sub></span>(log<sub>7</sub>(L<sub>n</sub> + 7)<sup>ln(max(λ, 1)) + 1</sup>) × min(λ, 1) ÷ 7</sup></span>",
			cascade:["star","darkstar"]
		},
		axis:{
			name:"Space",
			desc:"Gain free normal and dark axis of the first seven types equal to <i>[purchased amount]<sup>0.5</sup></i> × {}",
			eff:(x=stat.luckUpgLevel_cinquefolium_axis)=>x.gt(c.d20)?x.sub(c.d10).log10().pow(c.d1_15).mul(c.d10):x.div(c.d2),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>stat.luckUpgLevel_cinquefolium_axis.gte(c.d20)?"10 × log(λ - 10)<sup>1.15</sup>":"λ ÷ 2",
			cascade:["darkstar","synergism"]
		},
		radiation:{
			name:"Radiation",
			desc:"Hawking radiation gain is multiplied by {}",
			eff:(x=stat.luckUpgLevel_cinquefolium_radiation)=>c.d1_5.pow(x).sub(c.d1).mul(c.d20).pow10(),
			format:(x=this.eff())=>x.noLeadFormat(2),
			formula:()=>"10<sup>20 × (1.5<sup>λ</sup> - 1)</sup>",
			cascade:["synergism","prismatic"]
		},
		luck:{
			name:"Quadratic",
			desc:"Luck shard gain is raised to the power of {}",
			eff:(x=stat.luckUpgLevel_cinquefolium_luck)=>x.pow(x.add(c.d8).log10()).div(c.e2).add(c.d1),
			format:(x=this.eff())=>x.noLeadFormat(4),
			formula:()=>"1 + λ<sup>log(λ + 8)</sup> ÷ 100",
			cascade:["prismatic"],
			unlocked:function(){return g.research.r26_3}
		}
	}
}
const luckUpgradeList = Object.fromEntries(luckRuneTypes.map(x=>[x,Object.keys(luckUpgrades[x])]))

/*
- name, desc, eff, format and formula are universal to all prismatic upgrades
- each upgrade is also either:
	- unlimited: can be bought unlimited times and has geometric cost scaling optimized for bulk purchases. properties: baseCost, scale
  - limited: has a finite maximum level and unique cost formulas: when bulk bought, costs are summed one at a time. properties: cost, max
- upgrades which have adverse effects also have the 'refundable' property set to true
*/
const prismaticUpgrades = {
	prismaticSpeed:{
		name:"Prismatic Amplifier",
		desc:"Prismatic gain is multiplied by {x}",
		base:function(){
			let out = c.d1_5.add(luckUpgrades.quatrefolium.prismatic.eff())
			if (g.research.r22_6) out = out.add(researchEffect(22,6))
			if (g.research.r22_10) out = out.add(researchEffect(22,10))
			return out
		},
		softcap:function(){return c.e2},
		eff:function(x=g.prismaticUpgrades.prismaticSpeed){
			let ss = prismaticUpgrades.prismaticSpeed.softcap()
			return prismaticUpgrades.prismaticSpeed.base().pow(Decimal.div(x,x.max(ss).log(ss)))
		},
		format:{x:(x=prismaticUpgrades.prismaticSpeed.eff())=>x.noLeadFormat(2)},
		formula:{x:function(){
			let ss = prismaticUpgrades.prismaticSpeed.softcap()
			return prismaticUpgrades.prismaticSpeed.base().noLeadFormat(4)+"<sup>"+(g.prismaticUpgrades.prismaticSpeed.gte(c.e2)?"λ ÷ log<sub>"+ss.format()+"</sub>(λ)":"λ")+"</sup>"
		}},
		variables:"x",
		baseCost:c.e2,
		scale:c.d2
	},
	chromaSpeed:{
		name:"Chromatic Amplifier",
		desc:"Chroma gain is multiplied by {x}",
		eff:(x=g.prismaticUpgrades.chromaSpeed)=>Decimal.sub(x.add(c.d99).log10(),N(66).div(N(98).add(x))).pow(x),
		format:{x:(x=prismaticUpgrades.chromaSpeed.eff())=>x.noLeadFormat(2)},
		formula:{x:()=>"(log(λ + 99) - 66 ÷ (λ + 98))<sup>λ</sup>"},
		variables:"x",
		baseCost:c.e2,
		scale:c.d2
	},
	chromaOverdrive:{
		name:"Chromatic Overdrive",
		desc:"Chroma gain is multiplied by {x}, but chroma generation is {y}× more expensive.{t}",
		eff:{
			x:(x=g.prismaticUpgrades.chromaOverdrive)=>c.d8.pow(x),
			y:(x=g.prismaticUpgrades.chromaOverdrive)=>study13.rewards.nitro.eff().pow(x)
		},
		format:{
			x:(x=prismaticUpgrades.chromaOverdrive.eff.x())=>x.format(),
			y:(x=prismaticUpgrades.chromaOverdrive.eff.y())=>x.noLeadFormat(2),
			t:()=>(g.achievement[815]&&g.ach815RewardActive)?"":" Having at least 1 level of this makes red, green and blue chroma cost gray chroma."
		},
		formula:{
			x:()=>"8<sup>λ</sup>",
			y:()=>(study13.rewardLevels.nitro===18)?"2<sup>λ ÷ 9</sup>":(study13.rewardLevels.nitro===0)?"2<sup>λ ÷ 3</sup>":(study13.rewards.nitro.eff().noLeadFormat(2)+"<sup>λ</sup>")
		},
		variables:"xyt",
		baseCost:c.e5,
		scale:c.d8,
		refundable:true,
		loseLevelGlow:function(){return stat.chromaCostMultiplier.gt(c.d1)}
	},
	lumenThresholdReduction1:{
		name:"Illumenati I",
		desc:"The gray lumen threshold increase is reduced to {x}×",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>x.eq(c.e5)?c.d10:x.eq(c.d0)?c.e10:x.gt(c.d10)?c.d40.sub(x.log10().add(c.d1).pow(c.d2)).div(c.d4).pow10():x.gt(c.d2)?c.e10.div(x):c.e10.sub(x.mul(c.d2_5e9)),
		format:{x:(x=prismaticUpgrades.lumenThresholdReduction1.eff())=>x.noLeadFormat(3)},
		formula:{x:()=>g.prismaticUpgrades.lumenThresholdReduction1.gte(c.d10)?"10<sup>(40 - (log(λ) + 1)<sup>2</sup>) ÷ 4</sup>":(BEformat(3e10)+" ÷ max(3 × λ, 3 + λ)")},
		variables:"x",
		cost:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>(x.gt(c.d10)?x.div(c.d20).add(c.d1):c.d1_5).pow(x.gt(c.e4)?x.dilate(c.d2_5).div(c.e24):x.gt(c.e3)?x.pow(c.d4).div(c.e8):x.gt(c.e2)?x.pow(c.d2).div(c.e2):x).mul(c.e12),
		costFormula:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>(x.gte(c.d10)?"(1 + λ ÷ 20)":"1.5")+"<sup>"+(x.gte(c.e4)?("10<sup>log(λ)<sup>2.5</sup></sup> ÷ 10<sup>24</sup>"):x.gte(c.e3)?"λ<sup>4</sup> ÷ 10<sup>8</sup>":x.gte(c.e2)?"λ<sup>2</sup> ÷ 100":"λ")+"</sup> × 10<sup>12</sup>",
		max:c.e5
	},
	lumenThresholdReduction2:{
		name:"Illumenati II",
		desc:"The black and white lumen threshold increases are reduced to {x}×",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction2)=>x.eq(c.e2)?c.d5:x.eq(c.d0)?c.d10:c.d10.sub(x.div(c.d20)),
		format:{x:(x=prismaticUpgrades.lumenThresholdReduction2.eff())=>x.noLeadFormat(3)},
		formula:{x:()=>"10 - λ ÷ 20"},
		variables:"x",
		cost:function(x=g.prismaticUpgrades.lumenThresholdReduction2){
			let base = x.gte(c.d20)?x:c.d12
			let exp = x
			if (x.gte(c.d40)) exp = exp.mul(exp.div(c.e2).add(c.d1).pow(x.div(c.d20).sub(c.d1).floor()))
			return base.pow(exp).mul(c.e9)
		},
		costFormula:(x=g.prismaticUpgrades.lumenThresholdReduction2)=>(x.gte(c.d20)?"λ":"12")+"<sup>"+(x.gte(c.d40)?("λ × (1 + λ ÷ 100)"+formulaFormat.exp(x.div(c.d20).sub(c.d1).floor())):"λ")+"</sup> × 10<sup>9</sup>",
		max:c.e2
	},
	lumenThresholdReduction3:{
		name:"Illumenati III",
		desc:"The threshold increases of the first six lumens are reduced by {x}% <div class=\"information\" style=\"border-color:#000000;color:#000000;\" onMousedown=\"prismaticUpgrades.lumenThresholdReduction3.info()\">?</div>",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction3)=>x.gt(c.e10)?c.d0_1.div(x.quad_slog(c.d10).log(c.d2).pow(c.d2)):x.gt(c.e2)?x.log10().recip():x.gt(c.d25)?c.d250.sub(x).div(c.d300):c.d1.sub(x.div(c.e2)),
		format:{x:(x=prismaticUpgrades.lumenThresholdReduction3.eff())=>c.d1.sub(x).mul(c.e2)[x.lt(c.d0_1)?"format":"noLeadFormat"](Math.floor(3-Math.log10(x.toNumber())))},
		formula:{x:(x=g.prismaticUpgrades.lumenThresholdReduction3)=>x.gte(c.e10)?"100 - 10 ÷ log<sub>2</sub>(slog(λ))<sup>2</sup>":x.gte(c.e2)?"100 × (1 - 1 ÷ log(λ))":x.gte(c.d25)?"(λ + 50) ÷ 3":"λ"},
		variables:"x",
		baseCost:c.e6,
		scale:c.e2,
		info:function(){
			let out = "Difference between initial multiplier per lumen and 1 is linearly reduced by the percentage stated.<br>At the current value of "+this.format.x()+"% this translates to:<br><br><table><tr><th style=\"width:15vw;\" class=\"tablecell\">Color</th><th style=\"width:20vw;\" class=\"tablecell\">Initial value</th><th style=\"width:20vw;\" class=\"tablecell\">Adjusted value</th></tr>"
			for (let i=0;i<6;i++) {out += "<tr><td style=\"width:15vw;\" class=\"tablecell\">"+capitalize(lightNames[i])+"</td><td style=\"width:20vw;\" class=\"tablecell\">"+lightData[i].baseScale.noLeadFormat(4)+"×</td><td style=\"width:20vw;\" class=\"tablecell\">"+lightData[i].baseScale.sub(c.d1).mul(this.eff()).add(c.d1).formatFrom1(4)+"×</td></tr>"}
			popup({text:out+"</table>"})
		}
	},
	prismRune:{
		name:"Prism Rune",
		desc:"Luck shard gain is multiplied by {x} and their first effect is {y}% stronger",
		eff1Exp:function(){
			let out = c.d7
			if (g.research.r26_1) out = out.mul(researchEffect(26,1))
			return out
		},
		eff:{
			x:(x=g.prismaticUpgrades.prismRune)=>x.div(c.d7).add(c.d1).pow(prismaticUpgrades.prismRune.eff1Exp()),
			y:(x=g.prismaticUpgrades.prismRune)=>x.gt(142)?x.mul(c.d0_66744718112597245).sub(c.d46_34959730371034).log(c.d7):x.mul(c.d7em3).add(c.d1)
		},
		format:{
			x:(x=prismaticUpgrades.prismRune.eff.x())=>x.noLeadFormat(2),
			y:(x=prismaticUpgrades.prismRune.eff.y())=>x.sub(c.d1).mul(c.e2).noLeadFormat(4)
		},
		formula:{
			x:()=>"(1 + λ ÷ 7)"+formulaFormat.exp(prismaticUpgrades.prismRune.eff1Exp(),false,4),
			y:()=>g.prismaticUpgrades.prismRune.gt(142)?"<span style=\"font-size:80%;\">100 × log<sub>7</sub>(0.0953496 × λ - 6.621371)</span>":"0.7 × λ"
		},
		variables:"xy",
		baseCost:N(7.77e19),
		scale:c.d7,
		unlockReq:function(){return g.research.r21_7}
	},
	prismLab:{
		name:"Prism Lab",
		desc:"You can buy up to {x} Prismal research",
		eff:(x=g.prismaticUpgrades.prismLab)=>x.mag+1,
		format:{x:(x=prismaticUpgrades.prismLab.eff())=>x.toString()},
		formula:{x:()=>"λ + 1"},
		variables:"x",
		cost:function(x=g.prismaticUpgrades.prismLab){return Decimal.fromComponents(1,1,Math.floor(88.8*10**(x/7))+0.948412965778601)},
		costFormula:()=>"8.88 × 10<sup>⌊88.8 × 10<sup>λ ÷ 7</sup>⌋</sup>",
		max:c.d8,
		unlockReq:function(){return g.research.r21_8}
	},
	prismCondenser:{
		name:"Prism Condenser",
		desc:"Gain {x} free anti-axis of the first {y} types {f}<br><span class=\"small\">(Condenser power: {p}%)",
		eff:{
			x:(x=g.prismaticUpgrades.prismCondenser)=>Decimal.linearSoftcap(x,c.d99,c.d8,true),
			y:()=>Math.floor(stat.condenserPower),
			p:()=>stat.condenserPower*100
		},
		format:{
			x:(x=prismaticUpgrades.prismCondenser.eff.x())=>x.noLeadFormat(4),
			y:(x=prismaticUpgrades.prismCondenser.eff.y())=>numword(x),
			f:()=>(stat.condenserPower%1===0)?"":("and "+N((stat.condenserPower%1)*100).noLeadFormat(4)+"% of this amount as anti-"+axisCodes[Math.floor(stat.condenserPower)]+" axis"),
			p:(x=prismaticUpgrades.prismCondenser.eff.p())=>N(x).noLeadFormat(4)
		},
		formula:{x:()=>g.prismaticUpgrades.prismCondenser.gte(c.d99)?"(λ ÷ 11 - 8)<sup>1 ÷ 9</sup> × 99":"λ"},
		variables:"xyfp",
		cost:function(x=g.prismaticUpgrades.prismCondenser){return [N(9.99e25),N(999).pow(x),[c.d9,x,x.max(c.e2).log10()].decimalPowerTower()].productDecimals()},
		costFormula:()=>BEformat(9.99e25)+" × 999<sup>λ</sup> × 9<sup>λ<sup>"+(g.prismaticUpgrades.prismCondenser.gte(c.e2)?"log(λ)":"2")+"</sup></sup>",
		max:N(999),
		unlockReq:function(){return g.research.r21_9}
	},
	prismLab2:{
		name:"Lab Amplifier",
		desc:"Prismal research are stronger<br><table>"+countTo(3).map(x=>"<tr><td style=\"width:60px;text-align:left\">Row "+(x+21)+":</td><td style=\"width:120px;text-align:right\">{"+String.fromCharCode(119+x)+"}%</td></tr>").join("")+"</table>",
		eff:{
			x:(x=g.prismaticUpgrades.prismLab2)=>x.div(c.e2).add(c.d1),
			y:(x=g.prismaticUpgrades.prismLab2)=>x.div(c.d150).add(c.d1),
			z:(x=g.prismaticUpgrades.prismLab2)=>x.div(c.d225).add(c.d1)
		},
		format:{
			x:(x=prismaticUpgrades.prismLab2.eff.x())=>x.sub(c.d1).mul(c.e2).noLeadFormat(3),
			y:(x=prismaticUpgrades.prismLab2.eff.y())=>x.sub(c.d1).mul(c.e2).noLeadFormat(3),
			z:(x=prismaticUpgrades.prismLab2.eff.z())=>x.sub(c.d1).mul(c.e2).noLeadFormat(3)
		},
		formula:{
			x:()=>"λ",
			y:()=>"λ ÷ 1.5",
			z:()=>"λ ÷ 2.25"
		},
		variables:"xyz",
		cost:(x=g.prismaticUpgrades.prismLab2)=>c.d1_004.pow(x).mul(c.d225).pow10(),
		costFormula:()=>"10<sup>225 × 1.004<sup>λ</sup></sup>",
		max:N(900),
		unlockReq:function(){return g.studyCompletions[13]>23}
	},
	masterSpark:{
		name:"Master Spark",
		desc:"You can activate both Row 11 Masteries at once, but they are {x}% weaker",
		eff:(x=g.prismaticUpgrades.masterSpark)=>x.eq(c.d0)?c.d1:x.div(c.e2),
		format:{x:(x=prismaticUpgrades.masterSpark.eff())=>c.d1.sub(x).mul(c.e2).format()},
		formula:{x:()=>"(100 - λ) mod 100"},
		variables:"x",
		cost:function(x=g.prismaticUpgrades.masterSpark){return [x.add(c.d1).div(c.d50),x.sub(c.d49).max(c.d0).pow(c.d2).div(1250)].sumDecimals().pow10().pow10()},
		costFormula:()=>"Ξ<sup>[2]</sup>(λ ÷ 50 + max(λ - 49, 0)<sup>2</sup> ÷ 1,250)",
		max:c.e2,
		refundable:true,
		loseLevelGlow:function(){return g.prismaticUpgrades.masterSpark.mod(c.d100).neq(c.d0)},
		unlockReq:function(){return g.studyCompletions[13]>23}
	},
/*	mailbreaker:{
		name:"Polychromatic Star for Melting a Binding",
		desc:"Study XIII Binding 377 are {x}% weaker",
		eff:(x=g.prismaticUpgrades.mailbreaker)=>[c.d1,N(0.5),N(0.84),N(0.81),N(0.8)][x.toNumber()],
		format:{x:(x=prismaticUpgrades.mailbreaker.eff())=>c.d1.sub(x).mul(c.e2).format()},
		formula:{x:()=>"λ × (9 - λ) ÷ 2"},
		variables:"x",
		cost:(x=g.prismaticUpgrades.mailbreaker)=>Decimal.FC_NN(1,1,10*Math.floor(2000*3**(x-3))),
		costFormula:()=>"10<sup>10 × ⌊2,000 × 3<sup>λ - 3</sup>⌋</sup>",
		max:c.d4,
		unlockReq:function(){return g.achievement[918]}
	}, */
}
const prismaticUpgradeList = Object.keys(prismaticUpgrades)
const nonRefundablePrismaticUpgrades = prismaticUpgradeList.filter(upg=>!prismaticUpgrades[upg].refundable)
const refundablePrismaticUpgrades = prismaticUpgradeList.filter(upg=>prismaticUpgrades[upg].refundable)
function prismaticUpgradeName(upg) {return "Prismatic Upgrade "+((prismaticUpgrades[upg].refundable)?("R"+(refundablePrismaticUpgrades.indexOf(upg)+1)):(nonRefundablePrismaticUpgrades.indexOf(upg)+1))+" \""+prismaticUpgrades[upg].name+"\""}
for (let upg of prismaticUpgradeList) prismaticUpgrades[upg].variables = prismaticUpgrades[upg].variables.split("")

const wormholeUpgrades = {
	1:{
		name:"More Upgrades α",
		text:function(){return "Gain {}× more Hawking radiation (based on Wormhole Upgrades)"},
		cost:Decimal.FC_NN(1,1,3000),
		eff:function(){return Decimal.FC_NN(1,1,[20,25,32,40,50,64,80,100,125][countTo(9).map(x=>g.wormholeUpgrades[x]).sum()-g.wormholeUpgrades[1]]*(x=>Math.max(x/20+1,x/10,x/5-4))([10,11,12].map(x=>g.wormholeUpgrades[x]).sum()))},
		format:x=>x.format(),
		formula:()=>"10<sup>dB(U<sub>NR</sub> + 12) × max("+countTo(3).map(x=>"U<sub>R</sub>"+formulaFormat.mult(N(2**x/40))+formulaFormat.add(N(2**(x-1)*(2-x)))).join(", ")+")"
	},
	2:{
		name:"More Upgrades β",
		text:function(){return "Gain ^{} more Hawking radiation (based on Wormhole Upgrades)"},
		cost:Decimal.FC_NN(1,1,3300),
		eff:function(){return Decimal.FC_NN(1,0,1+Math.log10(1+((countTo(9).map(x=>g.wormholeUpgrades[x]).sum()-g.wormholeUpgrades[2])/2)+([10,11,12].map(x=>g.wormholeUpgrades[x]).sum())/12)/100)},
		format:x=>x.noLeadFormat(4),
		formula:()=>"1 + log(0.5 + U<sub>NR</sub> ÷ 2 + U<sub>R</sub> ÷ 12) ÷ 100"
	},
	3:{
		name:"More Galaxies α",
		text:function(){return "Galaxy Boosts 2 and 4 use better formulas"},
		cost:Decimal.FC_NN(1,1,22000)
	},
	4:{
		name:"More Wormhole α",
		text:function(){return "The "+achievement.label(716)+" reward timer increases 100× faster"},
		cost:Decimal.FC_NN(1,1,3600)
	},
	5:{
		name:"More Achievement",
		text:function(){return "The Mastery 101 effect softcaps at {} instead of 75 (based on total achievements)"},
		cost:Decimal.FC_NN(1,1,4000),
		eff:function(){return Decimal.FC_NN(1,0,(totalAchievements>=200)?(totalAchievements/2):(75+totalAchievements**4/64e6))},
		format:x=>x.noLeadFormat(3),
		formula:()=>(totalAchievements>=200)?"A ÷ 2":("75 + A<sup>4</sup> ÷ "+BEformat(64e6))
	},
	6:{
		name:"More Studies",
		text:function(){return "Multiply the anti-Y axis effect by {} (based on total Study completions)"},
		cost:Decimal.FC_NN(1,1,4500),
		eff:function(){return Decimal.FC_NN(1,0,1+g.studyCompletions.slice(1,13).sum()*0.002+g.studyCompletions[13]/1000)},
		format:x=>x.noLeadFormat(4),
		formula:()=>"1 + (Σ<span class=\"xscript\"><sup>12</sup><sub>1</sub></span>S<sub>n</sub>) × 0.002 + S<sub>13</sub> × 0.001"
	},
	7:{
		name:"More Wormhole β",
		text:function(){return "The gray lumen effect base is increased by {}"+(this.eff().gte(c.d10)?"×":"%")+" (based on Hawking radiation)"},
		cost:Decimal.FC_NN(1,1,5250),
		eff:function(){return g.hawkingradiation.add(c.d1).log10().div(c.e5).add(c.d1)},
		format:x=>(g.hawkingradiation.gt("e900000")?x.noLeadFormat(4):x.sub(c.d1).mul(c.e2).noLeadFormat(3)),
		formula:()=>(g.hawkingradiation.gt("e900000")?"1 + log(HR + 1) ÷ 100,000":"log(HR + 1) ÷ 1,000")
	},
	8:{
		name:"More Maxima",
		text:function(){return "Each level of Quatrefolium "+luckUpgrades.quatrefolium.star.name+" raises Stardust Upgrade costs to the power of {}, based on highest galaxies (total: ^"+this.eff().pow(stat.luckUpgLevel_quatrefolium_star).noLeadFormat(3)+")"},
		cost:Decimal.FC_NN(1,1,6750),
		eff:function(){return N(g.highestGalaxies/500+1).recip()},
		format:x=>x.noLeadFormat(3),
		formula:()=>"(1 + G ÷ 500)<sup>-1</sup>"
	},
	9:{
		name:"More Capitalism",
		text:function(){return "Autobuyer interval caps are halved"},
		cost:Decimal.FC_NN(1,1,Math.log10(1.23)+45678)
	},
	10:{
		name:"More Space",
		text:function(){return "All axis costs are raised to the power of {}"},
		get cost(){return repeatableWormholeUpgradeCost(N(4000),N(1e7),15,g.wormholeUpgrades[10])},
		eff:function(x=g.wormholeUpgrades[10]){return Decimal.FC_NN(1,0,1-x/100)},
		format:x=>x.noLeadFormat(2),
		formula:()=>"1 + λ ÷ 100",
		max:15
	},
	11:{
		name:"More Galaxies β",
		text:function(){return "Star costs are raised to the power of {}"},
		get cost(){return repeatableWormholeUpgradeCost(N(4500),N(2e6),25,g.wormholeUpgrades[11])},
		eff:function(x=g.wormholeUpgrades[11]){return (x===25)?c.d0_1:Decimal.mul(Decimal.pow(c.d0_9,x),Decimal.pow(N(1.001105369799546),N(x-1).simplex(2)))},
		format:x=>x.noLeadFormat(3),
		formula:()=>"0.9<sup>λ</sup> × (0.1 ÷ 0.9<sup>25</sup>)<sup>(λ<sup>2</sup> - λ) ÷ 600</sup>",
		max:25
	},
	12:{
		name:"More Upgrades γ",
		text:function(){return "Generate an additional <span style=\"white-space:nowrap\">log(<i>[pending stardust]</i> + 10)<sup>{}</sup></span> stardust per second"},
		get cost(){return repeatableWormholeUpgradeCost(N(4500),N(5e6),20,g.wormholeUpgrades[12])},
		eff:function(x=g.wormholeUpgrades[12]){return (x===0)?c.mmaxvalue:(x===1)?c.d0:N(x/20)},
		format:x=>x.noLeadFormat(1),
		formula:()=>"min(log(λ), (λ - 1) ÷ 10, λ ÷ 20)",
		max:20
	}
}
// placeholder handler
for (let i=1;i<13;i++) {
	if (wormholeUpgrades[i]===undefined) {wormholeUpgrades[i] = {
		name:"More Placeholders",
		text:function(){return "This does absolutely nothing as of yet"},
		cost:c.maxvalue
	}}
}
for (let i=1;i<10;i++) {wormholeUpgrades[i].max=1}

const corruption = {
	list:{
		axis:{
			name:"Axis Corruption",
			description:"Base axis costs increase faster beyond this point",
			start:function(){
				let out = c.ee15
				out = out.pow(study13.rewards.purifier.eff().e)
				return out
			},
			power:function(){return c.d1},
			effPower:function(){return c.d256.pow(this.power())},
			formula:"{s} ^ (log({x}) ÷ log({s})) ^ {p}",
			func:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower()].decimalPowerTower()},
			invertFunc:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower().recip()].decimalPowerTower()},
			isCorrupted:function(type){return axisCost(type).mul(realAxisCostDivisor(type)).root(realAxisCostExponent(type)).gt(this.start())},
			unlock:function(){
				for (let i of axisCodes.slice(0,8+study13.rewardLevels.slabdrill)) if (this.isCorrupted(i)) return true
				return false
			}
		},
		darkAxis:{
			name:"Dark Axis Corruption",
			description:"Base dark axis costs increase faster beyond this point",
			start:function(){
				let out = c.ee12
				out = out.pow(study13.rewards.purifier.eff().d)
				return out
			},
			power:function(){return c.d1},
			effPower:function(){return c.d64.pow(this.power())},
			formula:"{s} ^ (log({x}) ÷ log({s})) ^ {p}",
			func:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower()].decimalPowerTower()},
			invertFunc:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower().recip()].decimalPowerTower()},
			isCorrupted:function(type){return darkAxisCost(type,g["dark"+type+"Axis"],true).mul(realDarkAxisCostDivisor(type)).root(realDarkAxisCostExponent(type)).gt(this.start())},
			unlock:function(){
				for (let i of axisCodes.slice(0,8+study13.rewardLevels.slabdrill)) if (this.isCorrupted(i)) return true
				return false
			}
		},
		antiAxis:{
			name:"Anti-Axis Corruption",
			description:"Base anti-axis costs increase faster beyond this point",
			start:function(){return c.ee9},
			power:function(){return c.d1},
			effPower:function(){return c.d64.pow(this.power())},
			formula:"{s} ^ (log({x}) ÷ log({s})) ^ {p}",
			func:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower()].decimalPowerTower()},
			invertFunc:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower().recip()].decimalPowerTower()},
			isCorrupted:function(type){return antiAxisCost(type).mul(realAntiAxisCostDivisor(type)).root(realAntiAxisCostExponent(type)).gt(this.start())},
			unlock:function(){
				for (let i of axisCodes.slice(0,8+study13.rewardLevels.slabdrill)) if (this.isCorrupted(i)) return true
				return false
			}
		},
		darkstar:{
			name:"Dark Star Corruption",
			description:"Base dark star costs increase faster beyond this point",
			start:function(){return c.e9},
			power:function(){return c.d1},
			effPower:function(){return c.d16.pow(this.power())},
			formula:"{s} ^ (log({x}) ÷ log({s})) ^ {p}",
			func:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower()].decimalPowerTower()},
			invertFunc:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower().recip()].decimalPowerTower()},
			isCorrupted:function(){return darkStarReq().add(darkStarPriceMod("sub")).mul(darkStarPriceMod("div")).pow(darkStarPriceMod("pow").recip()).gt(this.start())},
			unlock:function(){return this.isCorrupted()}
		}
	},
	value:function(name,val){
		let data = corruption.list[name]
		return val.gt(data.start())?data.func(val):val
	},
	invertValue:function(name,val){
		let data = corruption.list[name]
		return val.gt(data.start())?data.invertFunc(val):val
	},
	formula:function(name){
		let data = corruption.list[name]
		return data.formula.replaceAll("{s}",data.start().format()).replaceAll("{x}","<i>x</i>").replaceAll("{p}",data.effPower().noLeadFormat(4))
	},
	unlocked:function(name){
		return (g.corruptionsUnlocked & (2 ** corruption.all.indexOf(name))) !== 0
	}
}
corruption.all = Object.keys(corruption.list)