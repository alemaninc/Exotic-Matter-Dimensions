"use strict";
/*
Everything that is represented in "g" as an object generated from a list of keys is stored here and executed directly before main.js.
*/
const axisCodes = "XYZWVUTS".split("");
const fullAxisCodes = axisCodes.map(x=>[x,"dark"+x,"anti"+x]).flat()

const starList = countTo(10).map(x=>countTo(4).map(y=>x*10+y)).flat()

const studies = [
	{    // 0 is used for utilities
		exactFrames:" All frames are exactly 50 milliseconds long, and any excess time is converted to dilated time.",
		effectiveMaxCompletions:{}
	},
	{
		name:"Autonomy",
		unlockReq:function(){return c.e3.mul(studyPower(1)+1)},
		description:function() {return "You can't enter the Stardust or Automation tabs, or any subtabs in Main except Offline Time. However, everything inside these tabs still works normally. Also, all hotkeys are disabled."},
		research:"r5_7",
		goal:function(comp=studyPower(1)) {return [N(1000),N(2000),N(3000),N(4000)][comp]},
		reward:function(num,comp=g.studyCompletions[1]) {
			if (num==1) return [c.d0,c.d0_2,c.d0_33,c.d0_42,c.d0_5][comp];
			if (num==2) {
				if (comp==0) return 0
				let achievementFactor = Math.log2((totalAchievements>80)?(totalAchievements/64):(1+totalAchievements**5/1.31072e10))+1
				return 10*(comp-countTo(comp).map(x=>achievementFactor**(x-5)).sum())*studyRewardBoost(1,2).toNumber()
			}
			if (num==3) return [c.d1,c.d4,c.d20,c.d125,c.e3][comp].pow(studyRewardBoost(1,3));
			functionError("studies[1].reward",arguments)
		},
		reward_desc:function() {return [
			"Empower "+studyRewardHTML(1,1,1)+"% of your Y axis",
		 	"Increase the effect of stardust upgrade #2 by "+studyRewardHTML(1,2,2)+"% (based on achievements)",
			"Multiply hawking radiation gain by "+studyRewardHTML(1,3,0)
		]},
		rewardFormulas:{
			2:(comp=g.studyCompletions[1],ach=totalAchievements)=>studyRewardBoost(1,2).mul(c.d10).noLeadFormat(3)+" × Σ<span class=\"xscript\"><sup>"+comp+"</sup><sub>1</sub></span>(1 - ("+(ach>=80?"A ÷ 64":("1 + A<sup>5</sup> ÷ "+BEformat(1.31072e10)))+")<sup>n-5</sup>)"
		}
	},
	{
		name:"Big Bang Theory",
		unlockReq:function(){return N(["e7e3","e1e4","e12500","e4e4"][studyPower(2)])},
		description:function() {return "Star costs increase much faster and stars must be purchased in a different order, but each unspent star acts as a free dark star.";},
		research:"r5_9",
		goal:function(comp=studyPower(2)) {return [c.d800,c.d950,c.d1100,N(2100)][comp];},
		reward:function(num,comp=g.studyCompletions[2]) {
			if (num==1) return [c.d0,c.d9,c.d16,c.d21,c.d25][comp];
			if (num==2) return [c.d0,c.d0_07,c.d0_12,c.d0_16,c.d0_2][comp].mul(studyRewardBoost(2,2)).add(c.d1);
			if (num==3) return [c.d0,c.d0_25,c.d0_45,c.d0_6,c.d0_75][comp].mul(studyRewardBoost(2,3));
			functionError("studies[2].reward",arguments)
		},
		reward_desc:function() {return [
			"The post-25 star cost scaling is "+studyRewardHTML(2,1,0)+"% weaker",
			"Row 9 star effects are raised to the power of "+studyRewardHTML(2,2,2),
			"Each unspent star acts as "+studyRewardHTML(2,3,2)+" free dark stars. Allocated stars count as half of this value. Does not work in Study II."
		]}
	},
	{
		name:"Analgesia",
		unlockReq:function(){return [c.ee8,c.ee9,N("e5e9"),N("e1e12")][studyPower(3)]},
		energyGainConstant:function(){return [N(1000),N(2000),N(3000),N(4000)][studyPower(3)]},
		energyPowerConstant:function(){return [c.dm1,c.dm2,c.dm5,N(-20)][studyPower(3)]},
		description:function(){return "Energy increases "+this.energyGainConstant().format(0)+"× faster, but all other Energy speed and effect multipliers are disabled. Energies severely reduce production instead of boosting it (x<sup>"+this.energyPowerConstant().format()+"</sup>), and you start with all Energies unlocked."+studies[0].exactFrames},
		research:"r9_2",
		goal:function(comp=studyPower(3)){return [c.d2e3,N(2200),N(2400),N(2700)][comp];},
		reward:function(num,comp=g.studyCompletions[3]){
			if (num==1) return comp
			if (num==2) return [c.d0,N(0.2),N(0.35),N(0.45),N(0.5)][comp].mul(studyRewardBoost(3,2))
			if (num==3) {
				let out = c.d1
				for (let i=0;i<comp;i++) out = out.add(g.truetimeThisWormholeReset.div(c.d10.pow(i)).pow(i==0?0.5:i))
				return out.pow(studyRewardBoost(3,3))
			}
			functionError("studies[3].reward",arguments)
		},
		reward_desc:function(){return [
			"Increase the cap of Stardust Upgrade #5 by "+studyRewardHTML(3,1,0),
			"Keep ^"+studyRewardHTML(3,2,studyRewardBoost(3,2).eq(c.d1)?1:3)+" of each of the first six Energies on Stardust reset",
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
	{
		name:"Vacuum Decay",
		unlockReq:function() {return [N(1e144),c.inf,N("4.44e444"),c.inf.pow(c.d2)][studyPower(4)]},
		description:function(){return "Every Stardust reset you do raises stardust gain to the power of 0.5 for the rest of the Study."},
		research:"r9_14",
		goal:function(comp=studyPower(4)){return [N(3000),N(3700),N(4500),N(5400)][comp]},
		reward:function(num,comp=g.studyCompletions[4]){
			if (num==1) return N([0.5,0.514,0.527,0.539,0.55][comp])
			if (num==2) return N([1,1.6,2.3,3.1,4][comp]).pow(studyRewardBoost(4,2))
			if (num==3) return [c.d1,c.d2_5,c.d5,c.d10,c.d20][comp].pow(studyRewardBoost(4,3).mul(c.d0_3))
			functionError("studies[4].reward",arguments)
		},
		reward_desc:function(){return [
			"Base stardust gain formula exponent is "+studyRewardHTML(4,1,2),
			"The effect of Mastery 42 is "+studyRewardHTML(4,2,2)+"× stronger",
			"The first effect of dark stars is "+studyRewardHTML(4,3,2)+"× stronger"
		]}
	},
	{
		name:"Scientific Illiteracy",
		unlockReq:function(){return [N("e4000"),N("e5880"),betaActive?N("e15625"):c.ee100,c.ee100][studyPower(5)]},
		difficultyConstant:function(){return [c.d32,N(64),N(128),N(256)][studyPower(5)]},
		description:function(){return "Entering this Study will immediately respec your Research, and all research costs will be multiplied by "+studies[5].difficultyConstant().format()+"."},
		research:"r2_8",
		goal:function(comp=studyPower(5)){return [N(4000),N(4000),betaActive?N(6200):c.e100,c.e100][comp]},
		reward:function(num,comp=g.studyCompletions[5]){
			if (num==1) return [c.d0,c.d80,c.d90,N(96),c.e2][comp]
			if (num==2) return c.d1.sub([c.d0,c.d0_01,N(29/1500),N(41/1500),N(1/30)][comp].mul(studyRewardBoost(5,2)))
			if (num==3) return [c.d0,N(2.5),N(10),N(30),N(60)][comp].mul(studyRewardBoost(5,3))
			functionError("studies[5].reward",arguments)
		},
		reward_desc:function(){return [
			"Research unlocked by Study V works at "+studyRewardHTML(5,1,0)+"% efficiency",
			"Observation costs are raised to the power of "+studyRewardHTML(5,2,4),
			"Subtract "+studyRewardHTML(5,3,2)+" from the cost of all research (cannot go below 0)"
		]}
	},
	{
		name:"Event Horizon",
		unlockReq:function(){return [N(500),N(1000),c.e100,c.e100][studyPower(6)]},
		effect:function(p=stat.totalDarkAxis.div(studies[6].goal()).min(c.d1)){return N(27+3*studyPower(6)).pow(c.d1.sub(p)).pow10()},
		description:function(){return "The game runs "+this.effect(c.d0).format()+"× slower. However, as you get closer to the goal of the Study this penalty gradually reduces up to a minimum of 10×."},
		research:"r16_8",
		goal:function(comp=studyPower(6)){return [N(4500),N(4800),c.e100,c.e100][comp]},
		reward:function(num,comp=g.studyCompletions[6]){
			if (num==1) return N(1+comp/4)
			if (num==2) return N(comp/20).mul(studyRewardBoost(6,2))
			if (num==3) return N(0.0075*comp).mul(studyRewardBoost(6,3))
			functionError("studies[6].reward",arguments)
		},
		reward_desc:function(){return [
			"The effect of tickspeed on chroma gain is raised to the power of "+studyRewardHTML(6,1,4),
			"Tickspeed<sup>"+studyRewardHTML(6,2,3)+"</sup> affects the base gain of knowledge",
			"Research 8-2 is "+studyRewardHTML(6,3,2)+"% stronger per dark axis owned (currently: "+percentOrMult(studies[6].reward(3).mul(stat.totalDarkAxis).div(c.e2).add(c.d1))+")"
		]},
	},
	{
		name:"Luck Be In The Air Tonight",
		unlockReq:function(){return [N("6.66e666666666"),c.ee100,c.ee100,c.ee100][studyPower(7)]},
		description:function(){return "Each stardust reset gives luck essence based on the amount of stardust gained. The gain of exotic matter, mastery power, stardust and dark matter is raised to a power between "+N(1-studies[7].luckMaxReduction()).noLeadFormat(3)+" and 1 based on how close luck essence is to a multiple of 1,000."},
		luckEssenceGain:function(x=stat.pendingstardust.sub(g.stardust)){return (x.lt(c.d1)?c.d0:x.log10().log10().mul([444444,555555,666666,777777][studyPower(7)]).floor()).add(g.luckEssence).min(c.e15).sub(g.luckEssence).toNumber()},
		luckMaxReduction:function(){return 1},
		luckEffect:function(x=g.luckEssence){
			if (x==1e15) return N(1 - this.luckMaxReduction())   // to avoid randomness at high values always give the maximum penalty at 1e15 :D
			return N(1 - ((1-Math.cos(x*Math.PI/500))/2) * this.luckMaxReduction())
		},
		research:"r23_5",
		goal:function(comp=studyPower(7)){return [N(6666),N(7777),N(9177),N(10777)][comp]},
		reward:function(num,comp=g.studyCompletions[7]){
			if (num==1) return [c.d0,N(50),N(70),N(85),N(100)][comp]
			if (num==2) return [c.d0,c.d75,c.d90,N(98),c.d100][comp].mul(studyRewardBoost(7,2))
			if (num==3) return [g.hawkingradiation.add(c.e10).log10().log10().pow(comp).sub(c.d1),c.d0_001,studyRewardBoost(7,3)].productDecimals().pow10().sub(c.d1)
			functionError("studies[7].reward",arguments)
		},
		reward_desc:function(){return [
			"Empower "+studyRewardHTML(7,1,3)+"% of your dark W axis",
			"Research unlocked by Study VII works at "+studyRewardHTML(7,2,0)+"% efficiency",
			unlocked("Luck")?("Gain "+studyRewardHTML(7,3,2)+" luck shards per second (based on hawking radiation)"):"? ? ? (Complete to reveal)"
		]},
		rewardFormulas:{
			3:(comp=g.studyCompletions[7])=>"10<sup>(log<sup>[2]</sup>(HR + "+c.e10.format()+")"+formulaFormat.exp(N(comp))+" - 1)"+formulaFormat.mult(studyRewardBoost(7,2).div(c.e3))+"</sup> - 1"
		}
	},
	{
		name:"Masterful",
		unlockReq:function(){return [c.inf,c.ee100,c.ee100,c.ee100][studyPower(8)]},
		description:function(){return "All effects which allow you to activate more than 1 Mastery from each row are disabled, and dark matter gain is severely reduced if it exceeds your mastery power."},
		research:"r18_8",
		goal:function(comp=studyPower(8)){return [N(3555),c.e100,c.e100,c.e100][comp]},
		reward:function(num,comp=g.studyCompletions[8]) {
			if (num==1) return [c.d50,N(52.5),N(55),N(57.5),N(60)][comp]
			if (num==2) return [c.d0,c.d9,c.d16,c.d21,c.d24][comp].mul(studyRewardBoost(8,2))
			if (num==3) {return (comp>0)?[N(3240),N(8100),N(16200),N(25920)][comp-1].mul(studyRewardBoost(8,3)):g.achievement[310]?c.d900:c.d0}
			functionError("studies[8].reward",arguments)
		},
		reward_desc:function(){return [
			"Increase the knowledge effect limit to "+studyRewardHTML(8,1,2)+"%",
			"Mastery 85 is "+studyRewardHTML(8,2,2)+"% stronger per Tier 8 achievement (currently: "+studies[8].reward(2).mul(achievement.ownedInTier(8)).noLeadFormat(2)+"%)",
			"Add "+studyRewardHTML(8,3,x=>timeFormat(x))+" of real time to the mastery power gain timer"
		]}
	},
	{
		name:"Scientia est Experientia",
		unlockReq:function(){return [c.ee100,c.ee100,c.ee100,c.ee100][studyPower(9)]},
		timePerMilestone:function(){return [45,35,25,15][studyPower(9)]},
		experientiaEffect:function(x=g.study9.xp){return c.d2.pow(c.d0_5.pow(x.div(c.e4)))},
		milestoneReq:function(type,x=g.study9.milestoneDifficulty[type]){
			let difficulty = x + [830,530,560][type]
			return Decimal.decibel(Math.floor(difficulty/10)).mul(1+(difficulty%10)/40).pow10()
		},
		milestoneTimeLeft:function(type){return (this.timePerMilestone()+g.study9.milestoneStartTimes[type]-Date.now())/1000},
		xpReward:function(timeSinceStart,x=g.knowledge){return [x.add(c.e10).log10().log10().log10(),c.e3,N(1-timeSinceStart/this.timePerMilestone())].productDecimals().floor()},
		xpPenalty:function(x=g.study9.xp,comp=studyPower(9)){
			let out = [N(4000),N(6000),N(8000),N(10000)][comp]
			if (x.lt(c.d0)) out = out.div(c.d10.sub(x).log10())
			return out.ceil()
		},
		completeMilestone:function(type,success){
			if (success) {
				let reward = this.xpReward((Date.now()-g.study9.milestoneStartTimes[type])/1e3)
				notify("Milestone "+(type+1)+" completed! +"+reward.format()+" experientia")
				g.study9.xp = g.study9.xp.add(reward)
			} else {
				let penalty = this.xpPenalty()
				notify("Milestone "+(type+1)+" failed! -"+penalty.format()+" experientia")
				g.study9.xp = g.study9.xp.sub(penalty)
			}
			g.study9.milestoneStartTimes[type] = Date.now()
			g.study9.milestoneDifficulty[type] += (success?5:-1)
		},
		description:function(){return "Stardust upgrade, star, dark star and normal and dark axis costs are raised to the power of "+this.experientiaEffect(c.d0).noLeadFormat(3)+". Throughout the Study you can complete milestones by reaching quotas of certain resources: each milestone completed gives experientia based on how fast it was completed and your knowledge (max: "+(showFormulas?formulaFormat("floor(log<sup>[3]</sup>(K + "+c.e10.format()+") × 1,000)"):BEformat(this.xpReward(0)))+"), but each milestone not completed after "+timeFormat(this.timePerMilestone())+" subtracts "+this.xpPenalty().format()+" experientia. Depending on your experientia this Study's penalty is either weakened or enhanced."+studies[0].exactFrames},
		research:"r23_11",
		goal:function(comp=g.studyPower(9)){return [N(6699),N(7799),N(8899),N(9999)][comp]},
		reward:function(num,comp=g.studyCompletions[9]){
			if (num==1) return [c.d0,c.e3,c.e30,c.inf,c.maxvalue][comp]
			if (num==2) return c.d1.sub([c.d0,N(1/15),N(11/90),N(1/6),c.d0_2][comp].mul(studyRewardBoost(9,2)))
			if (num==3) return [c.d0,c.d1,N(1.9),N(2.6),N(3)][comp].mul(studyRewardBoost(9,3))
		},
		reward_desc:function(){return [
			unlocked("Antimatter")?("Antimatter gain softcaps at "+studyRewardHTML(9,1,0)):"? ? ? (Complete to reveal)",
			"Galaxy Penalty 3 is "+studyRewardHTML(9,2,x=>c.d1.sub(x).mul(c.e2).noLeadFormat(3))+"% weaker",
			"All Spatial Synergism research is "+studyRewardHTML(9,3,2)+"% more effective"
		]}
	}
];
const fullStudyNames = [null,...countTo(studies.length-1).map(x=>"Study "+roman(x)+": "+studies[x].name)]

const lightNames = ["red","green","blue","cyan","magenta","yellow","white","black","gray"]

const luckRunes = {
	trifolium:{baseCost:c.e4,scale:c.d1_01,upgBaseCost:c.d10,upgScale:c.d1_25},
	quatrefolium:{baseCost:c.e10,scale:c.d1_1,upgBaseCost:c.d4,upgScale:c.d1_5},
	cinquefolium:{baseCost:c.e100,scale:c.d3,upgBaseCost:c.d1,upgScale:c.d2}
}
const luckRuneTypes = Object.keys(luckRunes)
// luck upgrades use geometric scaling as a cost formula, but rounded down - calculate amount of upgrades at which rounding no longer matters
for (let i of luckRuneTypes) luckRunes[i].noRoundThreshold = c.e16.div(luckRunes[i].upgBaseCost).log(luckRunes[i].upgScale).ceil()
const luckUpgrades = {
	trifolium:{
		normalAxis:{
			name:"Exotic Matter",
			desc:"Normal axis costs are raised to the power of {}",
			eff:(x=g.luckUpgrades.trifolium.normalAxis)=>c.d99.div(c.d99.add(x)),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"99 ÷ (99 + λ)"
		},
		darkAxis:{
			name:"Dark Matter",
			desc:"Dark axis costs are raised to the power of {}",
			eff:(x=g.luckUpgrades.trifolium.darkAxis)=>c.d99.div(c.d99.add(x)),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"99 ÷ (99 + λ)"
		},
		// anti-axis
	},
	quatrefolium:{
		star:{
			name:"Stars",
			desc:"Star costs are raised to the power of {}",
			eff:(x=g.luckUpgrades.quatrefolium.star)=>[c.d0_95,x,N(0.8786509132956299)].decimalPowerTower(),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"0.95<sup>λ<sup>0.87865</sup></sup>"
		},
		darkstar:{
			name:"Dark Stars",
			desc:"Dark star costs are divided by {}",
			eff:(x=g.luckUpgrades.quatrefolium.darkstar)=>x.gt(c.d20)?x.add(c.d5).sqrt().sub(c.d5).div(c.d4).exp().mul(c.d2):x.div(c.d20).add(c.d1),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>g.luckUpgrades.quatrefolium.darkstar.gte(c.d20)?"e<sup>(λ + 5)<sup>0.5</sup> - 5) ÷ 4</sup> × 2":"1 + λ ÷ 20"
		},
		synergism:{
			name:"Synergism",
			desc:"Spatial Synergism research is {}% more effective",
			eff:(x=g.luckUpgrades.quatrefolium.synergism)=>x.gt(c.d50)?x.div(c.d10).sub(c.d4).ln().div(c.d20).add(c.d1_25):x.div(c.d200).add(c.d1),
			format:(x=this.eff())=>x.sub(c.d1).mul(c.e2).noLeadFormat(3),
			formula:()=>g.luckUpgrades.quatrefolium.synergism.gte(c.d50)?"25 + ln(λ ÷ 10 - 4) × 5":"λ ÷ 2"
		}
		// prismatic
	},
	cinquefolium:{
		observation:{
			name:"Science",
			desc:"Observation costs are raised to the power of {}",
			eff:(x=g.luckUpgrades.cinquefolium.observation)=>c.d400.div(x.gt(c.e2)?x.div(c.d25).sub(c.d3).ln().mul(c.d25).add(c.d500):x.add(c.d400)),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"400 ÷ ("+(g.luckUpgrades.cinquefolium.observation.gte(c.d2)?"25 × ln(λ ÷ 25 - 3) + 500":"λ + 400")+")"
		},
		chroma:{
			name:"Chroma",
			desc:"Chroma gain is multiplied by {} (based on total lumens)",
			eff:(x=g.luckUpgrades.cinquefolium.chroma)=>x.eq(c.d0)?c.d1:g.lumens.map(i=>i.add(c.d10).log10().pow(x.ln().add(c.d1))).sumDecimals().div(c.e2).pow10(),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>"10<sup>Σ<span class=\"xscript\"><sup>9</sup><sub>1</sub></span>(log(L<sub>n</sub> + 10)<sup>ln(λ) + 1</sup>) ÷ 100"
		},
		axis:{
			name:"Space",
			desc:"Gain free normal and dark axis of the first seven types equal to sqrt(purchased axis) × {}",
			eff:(x=g.luckUpgrades.cinquefolium.axis)=>x.gt(c.d20)?x.sub(c.d10).log10().pow(c.d1_15).mul(c.d10):x.div(c.d2),
			format:(x=this.eff())=>x.noLeadFormat(3),
			formula:()=>g.luckUpgrades.cinquefolium.axis.gte(c.d20)?"10 × log(λ - 10)<sup>1.15</sup>":"λ ÷ 2"
		},
		radiation:{
			name:"Radiation",
			desc:"Multiply hawking radiation gain by {}",
			eff:(x=g.luckUpgrades.cinquefolium.radiation)=>c.d256.pow(x),
			format:(x=this.eff())=>x.format(),
			formula:()=>"256<sup>λ</sup>"
		}
		// luck
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
		eff:(x=g.prismaticUpgrades.prismaticSpeed)=>Decimal.linearSoftcap(N(0.17609125905568124).mul(x),c.d50,c.d0_25).pow10(),
		format:{x:(x=this.eff())=>x.noLeadFormat(2)},
		formula:{x:()=>this.eff().gt(c.e20)?("10<sup>"+formulaFormat.linSoftcap("λ × 0.17609",c.d50,c.d0_25,true)):"1.5<sup>λ</sup>"},
		baseCost:c.d10,
		scale:c.d2
	},
	chromaSpeed:{
		name:"Chromatic Amplifier",
		desc:"Chroma gain is multiplied by {x}",
		eff:(x=g.prismaticUpgrades.chromaSpeed)=>c.d2.sub(N(66).div(N(98).add(x))).pow(x),
		format:{x:(x=this.eff())=>x.noLeadFormat(2)},
		formula:{x:()=>"(2 - 66 ÷ (λ + 98))<sup>λ</sup>"},
		baseCost:c.d10,
		scale:c.d2
	},
	chromaOverdrive:{
		name:"Chromatic Overdrive",
		desc:"Chroma gain is multiplied by {x}, but chroma generation is {y}× more expensive. Having at least 1 level of this makes red, green and blue chroma cost gray chroma.",
		eff:{
			x:(x=g.prismaticUpgrades.chromaOverdrive)=>c.d8.pow(x),
			y:(x=g.prismaticUpgrades.chromaOverdrive)=>c.d1_26.pow(x)
		},
		format:{
			x:(x=this.eff.x())=>x.format(),
			y:(x=this.eff.y())=>y.noLeadFormat(2)
		},
		formula:{
			x:()=>"8<sup>λ</sup>",
			y:()=>"1.26<sup>λ</sup>"
		},
		baseCost:c.e2,
		scale:c.d10,
		refundable:true
	},
	lumenThresholdReduction1:{
		name:"Lumen Increaser I",
		desc:"The gray lumen threshold increase is reduced to {x}×",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>x.eq(c.e5)?c.d10:x.eq(c.d0)?c.e10:x.gt(c.d10)?c.d40.sub(x.log10().add(c.d1).pow(c.d2)).div(c.d4).pow10():x.gt(c.d2)?c.e10.div(x):c.e10.sub(x.mul(2.5e9)),
		format:{x:(x=this.eff())=>x.noLeadFormat(3)},
		formula:()=>g.prismaticUpgrades.lumenThresholdReduction1.gte(c.d10)?"10<sup>(40 - (log(λ) + 1)<sup>2</sup>) ÷ 4</sup>":(BEformat(3e10)+" ÷ max(3 × λ, 3 + λ)"),
		cost:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>(x.gt(c.d10)?x.div(c.d20).add(c.d1):c.d1_5).pow(x.gt(c.e2)?x.pow(c.d2).div(c.e2):x).mul(c.d500),
		costFormula:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>(x.gte(c.d10)?"(1 + λ ÷ 20)":"1.5")+"<sup>"+(x.gte(c.e2)?"λ<sup>2</sup> ÷ 100":"λ")+"</sup> × 500",
		max:c.e5
	},
	lumenThresholdReduction2:{
		name:"Lumen Increaser II",
		desc:"The black and white lumen threshold increases are reduced to {x}×",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction2)=>x.eq(c.e2)?c.d5:x.eq(c.d0)?c.d10:c.d10.sub(x.div(c.d20)),
		format:{x:(x=this.eff())=>x.noLeadFormat(3)},
		formula:()=>"10 - λ ÷ 20",
		cost:function(x=g.prismaticUpgrades.lumenThresholdReduction2){
			let base = x.gte(c.d20)?x:c.d12
			let exp = x
			if (x.gte(c.d40)) exp = exp.mul(exp.div(c.e2).add(c.d1).pow(x.div(c.d20).sub(c.d1).floor()))
			return base.pow(exp).mul(c.d750)
		},
		costFormula:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>(x.gte(c.d20)?"λ":"12")+"<sup>"+(x.gte(c.d40)?("λ × (1 + λ ÷ 100)"+formulaFormat.exp(x.div(c.d20).sub(c.d1).floor())):"λ")+"</sup> × 750",
		max:c.e2
	},
	lumenThresholdReduction3:{
		name:"Lumen Increaser III",
		desc:"The threshold increases of the first six lumens are reduced by {x}%",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction3)=>x.gt(c.e2)?x.log10().recip():x.gt(c.d25)?c.d250.sub(x).div(c.d300):c.d1.sub(x.div(c.e2)),
		format:{x:(x=this.eff())=>c.d1.sub(x).mul(c.e2).format()},
		formula:(x=g.prismaticUpgrades.lumenThresholdReduction3)=>x.gte(c.e2)?"λ":x.gte(c.d25)?"(λ + 50) ÷ 3":"λ",
		baseCost:c.e3,
		scale:c.e2
	}
}