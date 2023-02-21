"use strict"
const mainStatistics = [
	{
		name:"Time played",
		value:function(){return timeFormat(g.timePlayed)},
		condition:function(){return true}
	},{
		name:"Time played accounting for tickspeed",
		value:function(){return timeFormat(g.truetimePlayed)},
		condition:function(){return Decimal.neq(g.timePlayed,g.truetimePlayed)}
	},{
		name:"Total exotic matter produced",
		value:function(){return g.totalexoticmatter.format(0)},
		condition:function(){return true}
	},{
		name:"Time in this Stardust reset",
		value:function(){return timeFormat(g.timeThisStardustReset)},
		condition:function(){return unlocked("Stardust")}
	},{
		name:"Time this Stardust reset accounting for tickspeed",
		value:function(){return timeFormat(g.truetimeThisStardustReset)},
		condition:function(){return Decimal.neq(g.timeThisStardustReset,g.truetimeThisStardustReset)&&unlocked("Stardust")}
	},{
		name:"Exotic matter produced in this Stardust reset",
		value:function(){return g.exoticmatterThisStardustReset.format(0)},
		condition:function(){return unlocked("Stardust")}
	},{
		name:"Fastest Stardust reset",
		value:function(){return timeFormat(g.fastestStardustReset)},
		condition:function(){return g.fastestStardustReset.neq(9e15)}
	},{
		name:"Time in this Wormhole reset",
		value:function(){return timeFormat(g.timeThisWormholeReset)},
		condition:function(){return unlocked("Hawking Radiation")}
	},{
		name:"Time this Wormhole reset accounting for tickspeed",
		value:function(){return timeFormat(g.truetimeThisWormholeReset)},
		condition:function(){return Decimal.neq(g.timeThisWormholeReset,g.truetimeThisWormholeReset)&&unlocked("Hawking Radiation")}
	},{
		name:"Fastest Wormhole reset",
		value:function(){return timeFormat(g.fastestWormholeReset)},
		condition:function(){return g.fastestWormholeReset.neq(9e15)}
	},{
		name:"Exotic matter produced in this Wormhole reset",
		value:function(){return g.exoticmatterThisWormholeReset.format(0)},
		condition:function(){return unlocked("Hawking Radiation")}
	},{
		name:"Achievements earned",
		value:function(){return achievement.owned()+(achievement.ownedInTier("s")==0?"":(" (+ "+achievement.ownedInTier("s")+" secret)"))},
		condition:function(){return g.ownedAchievements.length>0}
	}
]
function mainStats() {
  let out = ""
  let shown = mainStatistics.filter(x => x.condition())
  for (let i=0;i<shown.length;i++) out+="<tr><td class=\"tablecell\" style=\"width:40vw\">"+shown[i].name+"</td><td class=\"tablecell\" style=\"width:40vw\">"+shown[i].value()+"</td></tr>"
  d.innerHTML("mainstattable",out)
}

const hiddenStatistics = [
  {
    name:"Axis Autobuyer Upgrades",
    value:function(){return g.axisAutobuyerUpgrades},
    condition:function(){return g.axisAutobuyerUpgrades>0}
  },{
    name:"Dark Axis Autobuyer Upgrades",
    value:function(){return g.darkAxisAutobuyerUpgrades},
    condition:function(){return g.darkAxisAutobuyerUpgrades>0}
  },{
		name:"Stardust Upgrade Autobuyer Upgrades",
		value:function(){return g.stardustUpgradeAutobuyerUpgrades},
		condition:function(){return g.stardustUpgradeAutobuyerUpgrades>0}
	},{
		name:"Star Autobuyer Upgrades",
		value:function(){return g.starAutobuyerUpgrades},
		condition:function(){return g.starAutobuyerUpgrades>0}
	},{
    name:"Delta Time",
    value:function(){return (deltatime*1e3)+"ms"},
    condition:function(){return true}
  },{
    name:"Stardust Resets",
    value:function(){return BEformat(g.StardustResets)},
    condition:function(){return unlocked("Stardust")}
  },{
    name:"Wormhole Resets",
    value:function(){return BEformat(g.WormholeResets)},
    condition:function(){return unlocked("Hawking Radiation")}
  },{
    name:"Total Axis",
    value:function(){return totalAxis("normal").format(2)},
    condition:function(){return true}
  },{
    name:"Total Dark Axis",
    value:function(){return totalAxis("dark").format(2)},
    condition:function(){return unlocked("Dark Matter")}
  },{
		name:"Free Axis Softcap Boundaries",
		value:function(){return "start "+axisSoftcapStart().mul(100).format(1)+"%, limit "+axisSoftcapLimit().mul(100).format(1)+"%"},
		condition:function(){return axisCodes.map(x => stat("free"+x+"Axis").gt(g[x+"Axis"])||stat("freedark"+x+"Axis").gt(g["dark"+x+"Axis"])).reduce((x,y)=>x||y)}
	}
].sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
function hiddenStats() {
  let out = ""
  let shown = hiddenStatistics.filter(x => x.condition())
  for (let i=0;i<shown.length;i++) out+="<tr><td class=\"tablecell\" style=\"width:40vw\">"+shown[i].name+"</td><td class=\"tablecell\" style=\"width:40vw\">"+shown[i].value()+"</td></tr>"
  d.innerHTML("hiddenstattable",out)
}

const breakdownTemplates = {
	base:function(value){
		return {
			label:"Base",
			func:function(){return N(value)},
			text:function(){return value}
		}
	},
	masteryAdd:function(id){
		return {
			label:"Mastery "+id,
			func:function(prev){return prev.add(MasteryE(id)?masteryEffect(id):N(0))},
			text:function(){return "+ "+masteryEffect(id).format(2)}
		}
	},
	masteryMul:function(id){
		return {
			label:"Mastery "+id,
			func:function(prev){return prev.mul(MasteryE(id)?masteryEffect(id):N(1))},
			text:function(){return "× "+masteryEffect(id).format(2)}
		}
	},
	masteryPow:function(id){
		return {
			label:"Mastery "+id,
			func:function(prev){return prev.pow(MasteryE(id)?masteryEffect(id):N(1))},
			text:function(){return "^ "+masteryEffect(id).format(2)}
		}
	},
	axisSoftcap:function(type){
		return {
			label:"Softcap",
			func:function(prev){return Decimal.convergentSoftcap(prev,g[type+"Axis"].mul(axisSoftcapStart()),g[type+"Axis"].mul(axisSoftcapLimit()))},
			text:function(){return "convergent, start "+g[type+"Axis"].mul(axisSoftcapStart()).format(2)+", limit "+g[type+"Axis"].mul(axisSoftcapLimit()).format(2)}
		}
	},
	darkMatterFreeAxis:function(type){
		return {
			label:"Dark "+type+" Axis",
			func:function(prev){return prev.add(darkMatterFreeAxis(type))},
			text:function(){return "+ "+darkMatterFreeAxis(type).format(2)+SSBsmall(g["dark"+type+"Axis"].format(2),darkMatterFreeAxis(1).format(3),2)}
		}
	},
	darkStarEffect2:function(axis){
		if (axis=="V") {
			return {
				label:"Dark Stars",
				mod:function(){return darkStarEffect2Level(axis).div(10).add(1)},
				func:function(prev){return prev.mul(this.mod())},
				text:function(){return "× "+this.mod().format(3)}
			}
		} else {
			return {
				label:"Dark Stars",
				mod:function(){return darkStarEffect2Level(axis).div(10).add(1)},
				func:function(prev){return prev.pow(this.mod())},
				text:function(){return "^ "+this.mod().format(3)}
			}
		}
	},
	tickspeed:function(){
		return {
			label:"Tickspeed",
			func:function(prev){return prev.mul(stat("tickspeed"))},
			text:function(){return "× "+stat("tickspeed").format(3)}
		}
	},
	ach210Reward:function(type){
		return {
			label:achievement.label(210),
			mod:function(){return AchievementE(210)?(g[type+"Axis"].gt(6400)?g[type+"Axis"].sqrt():g[type+"Axis"].div(80)):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)+(g[type+"Axis"].gt(6400)?SSBsmall(g[type+"Axis"].format(0),0.5,3):SSBsmall(g[type+"Axis"].format(0),0.0125,2))}
		}
	},
	ach528Reward:function(type){
		return {
			label:achievement.label(528),
			mod:function(){return AchievementE(528)?Decimal.linearSoftcap(g[type+"Axis"].div(125),100,2,1):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+g[type+"Axis"].div(125).format(2)+(this.mod().gt(100)?("<span class=\"small\">(softcapped to "+this.mod().format(2)+"</span>"):"")}
		}
	}
}
var breakdownStats = {}
breakdownStats.exoticmatterPerSec={
	label:"Exotic Matter gain",
	visible:function(){return true},
	precision:2,
	modifiers:[
		breakdownTemplates.base("1"),
		{
			label:"X Axis",
			mod:function(){return stat("XAxisEffect").pow(realAxis("X"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("XAxisEffect").format(2),realAxis("X").format(2),3)}
		},
		{
			label:"Z Axis",
			mod:function(){return stat("ZAxisEffect").pow(realAxis("Z"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("ZAxisEffect").format(2),realAxis("Z").format(2),3)}
		},
		{
			label:"W Axis",
			mod:function(){return stat("WAxisEffect").pow(realAxis("W"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("WAxisEffect").format(2),realAxis("W").format(2),3)}
		},
		{
			label:"T Axis",
			mod:function(){return stat("TAxisEffect").pow(realAxis("T"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("TAxisEffect").format(2),realAxis("T").format(2),3)}
		},
		{
			label:achievement.label(101),
			func:function(prev){return prev.mul(AchievementE(101)?1.01:1)},
			text:function(){return "× 1.01"}
		},
		{
			label:achievement.label(102),
			func:function(prev){return prev.mul(AchievementE(102)?1.02:1)},
			text:function(){return "× 1.02"}
		},
		{
			label:achievement.label(103),
			func:function(prev){return prev.mul(AchievementE(103)?1.03:1)},
			text:function(){return "× 1.03"}
		},
		{
			label:achievement.label(114),
			mod:function(){return AchievementE(114)?achievement.get(114).effect().div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		breakdownTemplates.masteryMul(11),
		{
			label:"Stardust Boost 1",
			func:function(prev){return prev.mul(stardustBoost(1))},
			text:function(){return "× "+stardustBoost(1).format(2)}
		},
		{
			label:"Star 11",
			mod:function(){return StarE(11)?starEffect(11):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Star 12",
			mod:function(){return StarE(12)?starEffect(12):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Star 13",
			mod:function(){return StarE(13)?starEffect(13):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Star 14",
			mod:function(){return StarE(14)?starEffect(14):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Star 42",
			func:function(prev){return prev.mul(StarE(42)?1e18:1)},
			text:function(){return "× "+BEformat(1e18)}
		},
		{
			label:achievement.label(309),
			mod:function(){return AchievementE(309)?g.masteryPower.add(1).pow(achievement.get(309).effect()):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(g.masteryPower.add(1).format(2),achievement.get(309).effect().format(4),3)}
		},
		{
			label:achievement.label(311),
			mod:function(){return AchievementE(311)?achievement.get(311).effect():N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:achievement.label(501),
			mod:function(){return AchievementE(501)?ach501Effect():N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Research 1-3",
			mod:function(){return ResearchE("r1_3")?Decimal.pow(researchEffect(1,3),totalAxis("normal")):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(researchEffect(1,3).format(2),totalAxis("normal").format(0),3)}
		},
		{
			label:achievement.label(518),
			mod:function(){return AchievementE(518)?achievement.get(518).effect():N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"S Axis",
			mod:function(){return stat("SAxisEffect").pow(realAxis("S"))},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)+SSBsmall(stat("SAxisEffect").format(4),realAxis("S").format(2),3)}
		},
		{
			label:"Star 41",
			func:function(prev){return prev.pow(StarE(41)?1.05:1)},
			text:function(){return "^ 1.05"}
		},
		{
			label:"Dark Energy",
			func:function(prev){return prev.pow(energyEffect(0))},
			text:function(){return "^ "+energyEffect(0).format(4)}
		},
		{
			label:achievement.label(401),
			func:function(prev){return prev.pow(AchievementE(401)?1.05:1)},
			text:function(){return "^ 1.05"},
		},
		breakdownTemplates.tickspeed()
	]
}
breakdownStats.stardustMultiplier={
	label:"Stardust gain multipliers",
	visible:function(){return false},
	precision:2,
	modifiers:[
		breakdownTemplates.base(1),
		breakdownTemplates.masteryMul(42),
		{
			label:achievement.label(202),
			mod:function(){return AchievementE(202)?N(1.004).pow(g.WAxis):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(1.004,g.WAxis.format(0),3)}
		},
		{
			label:achievement.label(203),
			mod:function(){return AchievementE(203)?N(1.003).pow(g.ZAxis):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(1.003,g.ZAxis.format(0),3)}
		},
		{
			label:achievement.label(204),
			mod:function(){return AchievementE(204)?N(1.002).pow(g.YAxis):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(1.002,g.YAxis.format(0),3)}
		},
		{
			label:achievement.label(205),
			mod:function(){return AchievementE(205)?N(1.001).pow(g.XAxis):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(1.001,g.XAxis.format(0),3)}
		},
		{
			label:achievement.label(208),
			mod:function(){return AchievementE(208)?N(1.001).pow(totalAxis("normal")):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(1.001,totalAxis("normal").format(0),3)}
		},
		{
			label:"U Axis",
			mod:function(){return stat("UAxisEffect").pow(realAxis("U"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("UAxisEffect").format(2),realAxis("U").format(2),3)}
		},
		{
			label:achievement.label(217),
			func:function(prev){return prev.mul(AchievementE(217)?1.337:1)},
			text:function(){return "× 1.337"}
		},
		{
			label:"Stardust Boost 4",
			mod:function(){return g.masteryPower.add(1).pow(stardustBoost(4))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(g.masteryPower.add(1).format(2),stardustBoost(4).format(4),3)}
		},
		{
			label:"Star 44",
			func:function(prev){return prev.mul(StarE(44)?100:1)},
			text:function(){return "× 100"}
		},
		{
			label:achievement.label(412),
			mod:function(){return AchievementE(412)?achievement.get(412).effect():N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:achievement.label(501),
			mod:function(){return AchievementE(501)?ach501Effect():N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		}
	]
}
breakdownStats.stardustExponent={
	label:"Stardust gain exponents",
	visible:function(){return false},
	precision:4,
	modifiers:[
		breakdownTemplates.base("10"),
		{
			label:"Star 43",
			func:function(prev){return prev.pow(StarE(43)?1.05:1)},
			text:function(){return "^ 1.05"}
		},
		{
			label:"Stelliferous Energy",
			func:function(prev){return prev.pow(energyEffect(1))},
			text:function(){return "^ "+energyEffect(1).format(4)}
		},
		{func:function(prev){return prev.log10()}}
	]
}
breakdownStats.pendingstardust={
	label:"Stardust",
	visible:function(){return masteryRowsUnlocked(4)==2&&g.exoticmatter.gt(stardustExoticMatterReq.div(10))},
	precision:2,
	modifiers:[
		{
			label:"Base Gain",
			func:function(){return g.exoticmatter.lt(stardustExoticMatterReq)?N(0):g.exoticmatter.div(stardustExoticMatterReq.div(10)).dilate(0.5)},
			text:function(){return "("+g.exoticmatter.format(2)+" ÷ "+stardustExoticMatterReq.div(10).format(2)+") dilate 0.5"}
		},
		breakdownStats.stardustMultiplier.modifiers.slice(1),
		breakdownStats.stardustExponent.modifiers.slice(1,breakdownStats.stardustExponent.modifiers.length-1),
		{
			label:"Existing Stardust",
			func:function(prev){return prev.sub(g.stardust).max(0).floor()},
			text:function(){return "- "+g.stardust.format(0)}
		}
	].flat()
}
breakdownStats.darkmatterPerSec={
	label:"Dark Matter gain",
	visible:function(){return unlocked("Dark Matter")},
	precision:2,
	modifiers:[
		{
			label:"Base Gain",
			func:function(){return g.stardust.gt(1e12)?g.stardust.div(1e11).dilate(0.5).div(10):g.stardust.div(1e12)},
			text:function(){return g.stardust.gt(1e12)?("("+g.stardust.format(2)+" ÷ "+BEformat(1e11)+") dilate 0.5 ÷ 10"):(g.stardust.format(2)+" ÷ "+BEformat(1e12))}
		},
		{
			label:"Dark Stars",
			func:function(prev){return prev.gt(1)?prev.pow(realDarkStars().div(20).add(1)):prev},
			text:function(){return "^ "+realDarkStars().div(20).add(1).format(3)}
		},
		{
			label:"Dark X Axis",
			mod:function(){return stat("darkXAxisEffect").pow(realAxis("darkX"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("darkXAxisEffect").format(2),realAxis("darkX").format(2),3)}
		},
		{
			label:"Dark Z Axis",
			mod:function(){return stat("darkZAxisEffect").pow(realAxis("darkZ"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("darkZAxisEffect").format(2),realAxis("darkZ").format(2),3)}
		},
		{
			label:"Dark U Axis",
			mod:function(){return stat("darkUAxisEffect").pow(Decimal.mul(realAxis("darkU"),totalAxis("dark")))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("darkUAxisEffect").format(3),SSBsmall(realAxis("darkU").format(2),totalAxis("dark").format(0),2),3)}
		},
		{
			label:"Dark T Axis",
			mod:function(){return stat("darkTAxisEffect").pow(realAxis("darkT"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("darkTAxisEffect").format(2),realAxis("darkT").format(2),3)}
		},
		{
			label:achievement.label(302),
			mod:function(){return AchievementE(302)?N(1.308).pow(unspentStars()):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(1.308,unspentStars(),3)}
		},
		{
			label:achievement.label(501),
			mod:function(){return AchievementE(501)?ach501Effect():N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:achievement.label(513,1),
			base:function(){return [513,514,515].map(x => AchievementE(x)?2:1).reduce((x,y)=>x*y)},
			mod:function(){return Decimal.pow(this.base(),g.darkstars)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(this.base(),g.darkstars.format(0),3)}
		},
		{
			label:"Research 1-13",
			mod:function(){return ResearchE("r1_13")?Decimal.pow(researchEffect(1,13),totalAxis("dark")):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(researchEffect(1,13).format(2),totalAxis("dark").format(0),3)}
		},
		{
			label:"Dark S Axis",
			mod:function(){return stat("darkSAxisEffect").pow(realAxis("darkS"))},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)+SSBsmall(stat("darkSAxisEffect").format(4),realAxis("darkS").format(2),3)}
		},
		{
			label:"Gravitational Energy",
			func:function(prev){return prev.pow(energyEffect(2))},
			text:function(){return "^ "+energyEffect(2).format(4)}
		},
		breakdownTemplates.tickspeed()
	]
}
breakdownStats.masteryPowerPerSec={
	label:"Mastery Power gain",
	visible:function(){return unlocked("Masteries")},
	precision:2,
	modifiers:[
		{
			label:"Base Gain",
			func:function(){return Decimal.pow(g.baseMasteryPowerGain,stat("baseMasteryPowerExponent"))},
			text:function(){return g.baseMasteryPowerGain.format(2)+" ^ "+stat("baseMasteryPowerExponent").format(4)}
		},
		{
			label:achievement.label(104),
			func:function(prev){return prev.mul(AchievementE(104)?1.04:1)},
			text:function(){return "× 1.04"}
		},
		{
			label:"Dark W Axis",
			mod:function(){return stat("darkWAxisEffect").pow(realAxis("darkW"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("darkWAxisEffect").format(3),realAxis("darkW").format(2),3)}
		},
		{
			label:"Stardust Boost 7",
			exp:function(){return Decimal.logarithmicSoftcap(g.truetimeThisStardustReset.sqrt(),1e3,4,1)},
			func:function(prev){return prev.mul(stardustBoost(7).pow(this.exp()))},
			text:function(){return "× "+stardustBoost(7).pow(this.exp()).format(2)+SSBsmall(stardustBoost(7).format(4),this.exp().format(2),3)}
		},
		breakdownTemplates.masteryMul(81),
		breakdownTemplates.masteryMul(82),
		breakdownTemplates.masteryMul(83),
		breakdownTemplates.masteryMul(84),
		{
			label:achievement.label(413),
			mod:function(){return AchievementE(413)?Decimal.mul(N(1.1907).pow(g.SAxis),N(1.2020).pow(g.darkSAxis)):1},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(SSBsmall(1.1907,g.SAxis.format(0),3),SSBsmall(1.202,g.darkSAxis.format(0),3),2)}
		},
		{
			label:achievement.label(501),
			mod:function(){return AchievementE(501)?ach501Effect():N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Neural Energy",
			func:function(prev){return prev.pow(energyEffect(4))},
			text:function(){return "^ "+energyEffect(4).format(4)}
		},
		breakdownTemplates.tickspeed()
	]
}
breakdownStats.baseMasteryPowerExponent={
	label:"Mastery Power base gain exponent",
	visible:function(){return unlocked("Masteries")},
	precision:4,
	modifiers:[
		{
			label:"Base",
			exp:function(){return N(1.2)},
			func:function(){return g.exoticmatter.pow(0.1).add(10).log10().log10().add(1).pow(this.exp())},
			text:function(){return "(log(log("+g.exoticmatter.format(2)+" ^ 0.1 + 10)) + 1) ^ "+this.exp().format(2)}
		},
		{
			label:achievement.label(529),
			mod:function(){return AchievementE(529)?achievement.get(529).effect():N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(4)}
		},
		{
			label:achievement.label(106),
			func:function(prev){return prev.add(AchievementE(106)?0.001:0)},
			text:function(){return "+ 0.001"}
		},
		breakdownTemplates.masteryAdd(85),
		{
			label:"<span onMouseover=\"addAchievement('s09')\">Secret Achievements</span>",
			func:function(prev){return prev.add(achievement.ownedInTier("s")/1e16)},
			text:function(){return "<span onClick=\"addAchievement('s09')\">+ "+(achievement.ownedInTier("s")/1e16).toFixed(16)+"</span>"},
			alwaysShow:function(){return achievement.ownedInTier("s")>0}
		}
	]
}
breakdownStats.XAxisEffect={
	label:"X Axis effect",
	visible:function(){return axisUnlocked()>=1},
	precision:2,
	modifiers:[
		breakdownTemplates.base("2"),
		{
			label:"Y Axis",
			mod:function(){return Decimal.mul(stat("YAxisEffect"),unempoweredAxis("Y"))},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)+SSBsmall(stat("YAxisEffect").format(2),unempoweredAxis("Y").format(2),2)}
		},
		{
			label:"Tier 1 achievements",
			mod:function(){return achievement.ownedInTier(1)/50},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+BEformat(this.mod(),2)}
		},
		{
			label:achievement.label(209),
			mod:function(){return AchievementE(209)?totalAxis("normal").div(1e4):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		{
			label:"Empowered Y Axis",
			mod:function(){return stat("YAxisEffect").pow(axisEmpowerment("Y"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("YAxisEffect").format(2),axisEmpowerment("Y").format(2),3)}
		},
		breakdownTemplates.masteryMul(21),
		{
			label:"Research 1-8",
			mod:function(){return ResearchE("r1_8")?researchEffect(1,8):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Research 2-2",
			mod:function(){return ResearchE("r2_2")?researchEffect(2,2).mul(g.XAxis).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+" <span class=\"small\">("+researchEffect(2,2).div(100).format(2)+" × "+g.XAxis.format(0)+" + 1)</span>"}
		},
		{
			label:"Research 2-4",
			mod:function(){return ResearchE("r2_4")?researchEffect(2,4).mul(g.truetimeThisWormholeReset).div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+" <span class=\"small\">("+researchEffect(2,4).div(100).format(2)+" × "+g.truetimeThisWormholeReset.format(2)+" + 1)</span>"}
		},
		{
			label:"Research 2-7",
			mod:function(){return ResearchE("r2_7")?researchEffect(2,7).mul(g.spatialEnergy.log10()).div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+" <span class=\"small\">("+researchEffect(2,7).div(100).format(2)+" × "+g.spatialEnergy.log10().format(2)+" + 1)</span>"}
		},
		{
			label:"Research 2-9",
			mod:function(){return ResearchE("r2_9")?researchEffect(2,9).mul(g.darkXAxis).div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+" <span class=\"small\">("+researchEffect(2,9).div(100).format(2)+" × "+g.darkXAxis.format(0)+" + 1)</span>"}
		},
		{
			label:"Research 2-12",
			mod:function(){return ResearchE("r2_12")?researchEffect(2,12).mul(g.totalDiscoveries).div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+" <span class=\"small\">("+researchEffect(2,12).div(100).format(2)+" × "+g.totalDiscoveries.format(0)+" + 1)</span>"}
		},
		{
			label:"Research 2-14",
			mod:function(){return ResearchE("r2_14")?researchEffect(2,14):N(1)},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)}
		}
	]
}
breakdownStats.YAxisEffect={
	label:"Y Axis effect",
	visible:function(){return axisUnlocked()>=2},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0.1"),
		{
			label:achievement.label(113),
			mod:function(){return AchievementE(113)?g.YAxis.mul(0.0004):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		{
			label:achievement.label(209),
			mod:function(){return AchievementE(209)?totalAxis("normal").div(1e4):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		{
			label:"Stardust Boost 2",
			func:function(prev){return prev.mul(stardustBoost(2))},
			text:function(){return "× "+stardustBoost(2).format(2)}
		},
		breakdownTemplates.masteryMul(22),
		{
			label:"Research 1-8",
			mod:function(){return ResearchE("r1_8")?researchEffect(1,8):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		}
	]
}
breakdownStats.ZAxisEffect={
	label:"Z Axis effect",
	visible:function(){return axisUnlocked()>=3},
	precision:2,
	modifiers:[
		{
			label:"Base",
			exp:function(){
				let out = N(1.5)
				if (AchievementE(211)) out = out.add(0.01)
				out = out.add(stardustBoost(10))
				return out
			},
			constant:function(){return g.exoticmatter.add(1).mul(1e10).log10().log10().log10().add(1)},
			func:function(){return Decimal.powerTower(10,this.constant(),this.constant(),this.exp()).mul(0.15)},
			consttext:function(){return "(log(log(log("+g.exoticmatter.add(1).format(2)+" × "+BEformat(1e10)+"))) + 1)"},
			text:function(){return "10 ^ "+this.consttext()+" ^ "+this.consttext()+" ^ "+this.exp().format(3)+" × 0.15"}
		},
		{
			label:achievement.label(209),
			mod:function(){return AchievementE(209)?totalAxis("normal").div(1e4):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		{
			label:"Research 1-8",
			mod:function(){return ResearchE("r1_8")?researchEffect(1,8):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Research 6-1",
			mod:function(){return ResearchE("r6_1")?energyEffect(0).pow(researchEffect(6,1)):N(1)},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)+SSBsmall(energyEffect(0).format(4),researchEffect(6,1).format(4),3)}
		}
	]
}
breakdownStats.WAxisEffect={
	label:"W Axis effect",
	visible:function(){return axisUnlocked()>=4},
	precision:2,
	modifiers:[
		{
			label:"Base",
			time:function(){
				let out = g.truetimeThisStardustReset
				if (AchievementE(109)) out = out.add(realAxis("W").mul(30))
				return out 
			},
			func:function(){return this.time().pow(2/3).add(100).log10().quad_tetr(1.15)},
			text:function(){return "log("+this.time().format(0)+" ^ 0.67 + 100) ^^ 1.15"}
		},
		{
			label:achievement.label(209),
			mod:function(){return AchievementE(209)?totalAxis("normal").div(1e4):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		{
			label:"Research 1-8",
			mod:function(){return ResearchE("r1_8")?researchEffect(1,8):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Stardust Boost 3",
			func:function(prev){return prev.pow(stardustBoost(3))},
			text:function(){return "^ "+stardustBoost(3).format(4)}
		}
	]
}
breakdownStats.VAxisEffect={
	label:"V Axis effect",
	visible:function(){return axisUnlocked()>=5},
	precision:2,
	modifiers:[
		breakdownTemplates.base("3"),
		{
			label:achievement.label(209),
			mod:function(){return AchievementE(209)?totalAxis("normal").div(1e4):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		{
			label:"Research 1-8",
			mod:function(){return ResearchE("r1_8")?researchEffect(1,8):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Stardust Boost 8",
			func:function(prev){return prev.pow(stardustBoost(8))},
			text:function(){return "^ "+stardustBoost(8).format(4)}
		},
		{
			label:"Star 82",
			func:function(prev){return prev.pow(StarE(82)?4:1)},
			text:function(){return "^ 4"}
		},
		{
			label:"Dark V Axis",
			mod:function(){return Decimal.product(stat("darkVAxisEffect"),realAxis("darkV"),0.01).add(1)},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(3)+" <span class=\"small\">("+stat("darkVAxisEffect").div(100).format(2)+" × "+realAxis("darkV").format(2)+" + 1)</span>"}
		},
		{
			label:"Research 6-13",
			mod:function(){return ResearchE("r6_13")?energyEffect(3).pow(researchEffect(6,13)):N(1)},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)+SSBsmall(energyEffect(3).format(4),researchEffect(6,13).format(4),3)}
		}
	]
}
breakdownStats.UAxisEffect={
	label:"U Axis effect",
	visible:function(){return axisUnlocked()>=6},
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return g.stardust.add(1e10).log10().log10().pow(2).div(10).pow10()}, 
			text:function(){return "10 ^ (log(log("+g.stardust.format(0)+" + "+BEformat(1e10)+")) ^ 2 ÷ 10)"}
		},
		{
			label:achievement.label(209),
			mod:function(){return AchievementE(209)?totalAxis("normal").div(1e4):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		{
			label:"Research 1-8",
			mod:function(){return ResearchE("r1_8")?researchEffect(1,8):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:achievement.label(511),
			func:function(prev){return prev.pow(AchievementE(511)?1.009:1)},
			text:function(){return "^ 1.009"}
		},
		{
			label:"Research 5-2",
			mod:function(){return ResearchE("r5_2")?energyEffect(1).pow(researchEffect(5,2)):N(1)},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)+SSBsmall(energyEffect(1).format(4),researchEffect(5,2).format(4),3)}
		}
	]
}
breakdownStats.TAxisEffect={
	label:"T Axis effect",
	visible:function(){return axisUnlocked()>=7},
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return totalAxis("normal").add(10).log10().tetrate(2).div(2).pow10()},
			text:function(){return "10 ^ (log("+totalAxis("normal").format(0)+" + 10) ^^ 2 ÷ 2)"}
		},
		{
			label:achievement.label(209),
			mod:function(){return AchievementE(209)?totalAxis("normal").div(1e4):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		{
			label:"Research 1-8",
			mod:function(){return ResearchE("r1_8")?researchEffect(1,8):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Research 5-1",
			mod:function(){return ResearchE("r5_1")?energyEffect(0).pow(researchEffect(5,1)):N(1)},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)+SSBsmall(energyEffect(0).format(4),researchEffect(5,1).format(4),3)}
		}
	]
}
breakdownStats.SAxisEffect={
	label:"S Axis effect",
	visible:function(){return axisUnlocked()>=8},
	precision:2,
	modifiers:[
		breakdownTemplates.base("1.025"),
		{
			label:achievement.label(525),
			func:function(prev){return prev.add(AchievementE(525)?0.0001:0)},
			text:function(){return "+ 0.0001"}
		},
		{
			label:achievement.label(526),
			mod:function(){return AchievementE(526)?achievement.get(526).effect():N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(3)}
		},
		{
			label:achievement.label(505),
			mod:function(){return AchievementE(505)?achievement.get(505).effect().div(100).add(1):N(1)},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)}
		}
	]
}
breakdownStats.freeXAxis={
	label:"Free X axis",
	visible:function(){return stat("freeXAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		{
			label:achievement.label(108),
			mod:function(){return AchievementE(108)?g.ZAxis.div(25):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)} 
		},
		breakdownTemplates.ach210Reward("Y"),
		breakdownTemplates.masteryAdd(51),
		{
			label:"Star 21",
			func:function(prev){return prev.add(StarE(21)?3:0)},
			text:function(){return "+ 3"}
		},
		breakdownTemplates.darkMatterFreeAxis("X"),
		{
			label:"Spatial Energy",
			func:function(prev){return prev.mul(energyEffect(3))},
			text:function(){return "× "+energyEffect(3).format(4)}
		},
		breakdownTemplates.axisSoftcap("X")
	]
}
breakdownStats.freeYAxis={
	label:"Free Y axis",
	visible:function(){return stat("freeYAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		{
			label:achievement.label(107),
			func:function(prev){return prev.add(AchievementE(107)?1:0)},
			text:function(){return "+ 1"}
		},
		{
			label:achievement.label(206),
			mod:function(){return AchievementE(206)?achievement.get(206).effect():N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		breakdownTemplates.ach210Reward("Z"),
		{
			label:"Star 22",
			func:function(prev){return prev.add(StarE(22)?3:0)},
			text:function(){return "+ 3"}
		},
		breakdownTemplates.darkMatterFreeAxis("Y"),
		breakdownTemplates.axisSoftcap("Y")
	]
}
breakdownStats.freeZAxis={
	label:"Free Z axis",
	visible:function(){return stat("freeZAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		breakdownTemplates.ach210Reward("W"),
		breakdownTemplates.masteryAdd(31),
		{
			label:"Star 23",
			func:function(prev){return prev.add(StarE(23)?3:0)},
			text:function(){return "+ 3"}
		},
		breakdownTemplates.darkMatterFreeAxis("Z"),
		breakdownTemplates.axisSoftcap("Z")
	]
}
breakdownStats.freeWAxis={
	label:"Free W axis",
	visible:function(){return stat("freeWAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		breakdownTemplates.ach210Reward("V"),
		breakdownTemplates.masteryAdd(32),
		{
			label:"Star 24",
			func:function(prev){return prev.add(StarE(24)?3:0)},
			text:function(){return "+ 3"}
		},
		breakdownTemplates.darkMatterFreeAxis("W"),
		breakdownTemplates.axisSoftcap("W")
	]
}
breakdownStats.freeVAxis={
	label:"Free V axis",
	visible:function(){return stat("freeVAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		breakdownTemplates.ach210Reward("U"),
		{
			label:achievement.label(306),
			func:function(prev){return prev.add(AchievementE(306)?1:0)},
			text:function(){return "+ 1"}
		},
		{
			label:"Star 61",
			mod:function(){return StarE(61)?starEffect(60):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		breakdownTemplates.darkMatterFreeAxis("V"),
		breakdownTemplates.axisSoftcap("V")
	]
}
breakdownStats.freeUAxis={
	label:"Free U axis",
	visible:function(){return stat("freeUAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		breakdownTemplates.ach210Reward("T"),
		{
			label:achievement.label(307),
			func:function(prev){return prev.add(AchievementE(307)?1:0)},
			text:function(){return "+ 1"}
		},
		{
			label:"Star 62",
			mod:function(){return StarE(62)?starEffect(60):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		breakdownTemplates.darkMatterFreeAxis("U"),
		breakdownTemplates.axisSoftcap("U")
	]
}
breakdownStats.freeTAxis={
	label:"Free T axis",
	visible:function(){return stat("freeTAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		breakdownTemplates.ach210Reward("S"),
		{
			label:achievement.label(308),
			func:function(prev){return prev.add(AchievementE(308)?1:0)},
			text:function(){return "+ 1"}
		},
		{
			label:"Star 63",
			mod:function(){return StarE(63)?starEffect(60):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		breakdownTemplates.darkMatterFreeAxis("T"),
		breakdownTemplates.axisSoftcap("T")
	]
}
breakdownStats.freeSAxis={
	label:"Free S axis",
	visible:function(){return stat("freeSAxis").neq(0)},
	precision:3,
	modifiers:[
		breakdownTemplates.base("0"),
		{
			label:"Star 64",
			func:function(prev){return prev.add(StarE(64)?starEffect(64):0)},
			text:function(){return "+ "+starEffect(64).format(3)}
		},
		breakdownTemplates.darkMatterFreeAxis("S"),
		{
			label:"Research 3-2",
			mod:function(){return ResearchE("r3_2")?researchEffect(3,2):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)}
		},
		breakdownTemplates.axisSoftcap("S")
	]
}
breakdownStats.darkXAxisEffect={
	label:"Dark X Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0},
	precision:2,
	modifiers:[
		breakdownTemplates.base("3"),
		breakdownTemplates.darkStarEffect2("X"), 
		breakdownTemplates.masteryPow(61)
	]
}
breakdownStats.darkYAxisEffect={
	label:"Dark Y Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0},
	precision:2,
	modifiers:[
		breakdownTemplates.base("4"),
		breakdownTemplates.darkStarEffect2("Y"),
		{
			label:"Star 84",
			func:function(prev){return prev.pow(StarE(84)?4:1)},
			text:function(){return "^ 4"}
		}
	]
}
breakdownStats.darkZAxisEffect={
	label:"Dark Z Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0},
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return g.exoticmatter.pow(0.005).div(10).add(1).dilate(0.2).pow(0.2)},
			text:function(){return "(("+g.exoticmatter.format(0)+" ^ 0.005 ÷ 10 + 1) dilate 0.2) ^ 0.2"}
		},
		breakdownTemplates.darkStarEffect2("Z"),
		{
			label:"Stardust Boost 6",
			func:function(prev){return prev.pow(stardustBoost(6))},
			text:function(){return "^ "+stardustBoost(6).format(4)}
		}
	]
}
breakdownStats.darkWAxisEffect={
	label:"Dark W Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0},
	precision:3,
	modifiers:[
		breakdownTemplates.base("1.15"),
		breakdownTemplates.darkStarEffect2("W"),
		{
			label:"Research 6-14",
			mod:function(){return ResearchE("r6_14")?energyEffect(4).pow(researchEffect(6,14)):N(1)},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)+SSBsmall(energyEffect(4).format(4),researchEffect(6,14).format(4),3)}
		}
	]
}
breakdownStats.darkVAxisEffect={
	label:"Dark V Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0},
	precision:2,
	modifiers:[
		breakdownTemplates.base("10"),
		breakdownTemplates.darkStarEffect2("V")
	]
}
breakdownStats.darkUAxisEffect={
	label:"Dark U Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0},
	precision:3,
	modifiers:[
		breakdownTemplates.base("1.02"),
		breakdownTemplates.darkStarEffect2("U"),
		{
			label:"Research 5-3",
			mod:function(){return ResearchE("r5_3")?energyEffect(2).pow(researchEffect(5,3)):N(1)},
			func:function(prev){return prev.pow(this.mod())},
			text:function(){return "^ "+this.mod().format(4)+SSBsmall(energyEffect(2).format(4),researchEffect(5,3).format(4),3)}
		}
	]
}
breakdownStats.darkTAxisEffect={
	label:"Dark T Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0},
	precision:2,
	modifiers:[
		{
			label:"Base",
			time:function(){
				let out = g.truetimeThisStardustReset
				if (achievement.ownedInTier(5)>=18) out = out.add(wormholeMilestone18Effect())
				return out
			},
			func:function(){return this.time().div(1e3).add(1).dilate(0.5)},
			text:function(){return "("+this.time().format(0)+" ÷ 1,000 + 1) dilate 0.5"}
		},
		breakdownTemplates.darkStarEffect2("T")
	]
}
breakdownStats.darkSAxisEffect={
	label:"Dark S Axis effect",
	visible:function(){return g.stardustUpgrades[4]>0},
	precision:4,
	modifiers:[
		breakdownTemplates.base("1.01"),
		{
			label:achievement.label(525),
			func:function(prev){return prev.add(AchievementE(525)?0.0001:0)},
			text:function(){return "+ 0.0001"}
		},
		{
			label:achievement.label(526),
			mod:function(){return AchievementE(526)?achievement.get(526).effect():N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(3)}
		},
		breakdownTemplates.darkStarEffect2("S")
	]
}
breakdownStats.axisCostDivisor={
	label:"Axis Cost Divisor",
	visible:function(){return stat("axisCostDivisor").neq(1)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("1"),
		breakdownTemplates.masteryMul(12),
		{
			label:"V Axis",
			mod:function(){return stat("VAxisEffect").pow(realAxis("V"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("VAxisEffect").format(2),realAxis("V").format(2),3)}
		},
		{
			label:achievement.label(207),
			mod:function(){return AchievementE(207)?N(0.99).pow(totalAxis("normal")):N(1)},
			func:function(prev){return prev.div(this.mod())},
			text:function(){return "÷ "+this.mod().format(2)+SSBsmall(0.99,totalAxis("normal").format(0),3)}
		}
	]
}
breakdownStats.axisCostExponent={
	label:"Axis Cost Exponent",
	visible:function(){return stat("axisCostExponent").neq(1)},
	precision:4,
	modifiers:[
		breakdownTemplates.base("1"),
		{
			label:"Star 81",
			func:function(prev){return prev.mul(StarE(81)?0.8:1)},
			text:function(){return "× 0.8"}
		},
		{
			label:achievement.label(517),
			func:function(prev){return prev.mul(AchievementE(517)?0.95:1)},
			text:function(){return "× 0.95"}
		}
	]
}
breakdownStats.darkAxisCostDivisor={
	label:"Dark Axis Cost Divisor",
	visible:function(){return stat("darkAxisCostDivisor").neq(1)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("1"),
		{
			label:"Dark Y Axis",
			mod:function(){return stat("darkYAxisEffect").pow(realAxis("darkY"))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("darkYAxisEffect").format(2),realAxis("darkY").format(2),3)}
		}
	]
}
breakdownStats.darkAxisCostExponent={
	label:"Dark Axis Cost Exponent",
	visible:function(){return stat("darkAxisCostExponent").neq(1)},
	precision:4,
	modifiers:[
		breakdownTemplates.base("1"),
		breakdownTemplates.masteryMul(62),
		{
			label:"Star 83",
			func:function(prev){return prev.mul(StarE(83)?0.8:1)},
			text:function(){return "× 0.8"}
		}
	]
}
breakdownStats.energyGainSpeed={
	label:"Energy gain",
	visible:function(){return stat("energyGainSpeed").neq(1)&&g.stardustUpgrades[4]>1},
	precision:2,
	modifiers:[
		breakdownTemplates.base("1"),
		breakdownTemplates.masteryMul(71),
		{
			label:achievement.label(402),
			func:function(prev){return prev.mul(AchievementE(402)?1.03:1)},
			text:function(){return "× 1.03"}
		},
		{
			label:achievement.label(403),
			func:function(prev){return prev.mul(AchievementE(403)?1.04:1)},
			text:function(){return "× 1.04"}
		},
		{
			label:achievement.label(404),
			func:function(prev){return prev.mul(AchievementE(404)?1.05:1)},
			text:function(){return "× 1.05"}
		},
		{
			label:achievement.label(405),
			func:function(prev){return prev.mul(AchievementE(405)?1.06:1)},
			text:function(){return "× 1.06"}
		},
		{
			label:achievement.label(406),
			func:function(prev){return prev.mul(AchievementE(406)?1.07:1)},
			text:function(){return "× 1.07"}
		},
		{
			label:achievement.label(407),
			func:function(prev){return prev.mul(AchievementE(407)?1.08:1)},
			text:function(){return "× 1.08"}
		},
		{
			label:"Meta Energy",
			func:function(prev){return prev.mul(energyEffect(5))},
			text:function(){return "× "+energyEffect(5).format(4)}
		},
		breakdownTemplates.tickspeed()
	]
}
breakdownStats.energyEffectBoost={
	label:"Energy effect boost",
	visible:function(){return stat("energyEffectBoost").neq(1)&&g.stardustUpgrades[4]>1},
	precision:4,
	modifiers:[
		breakdownTemplates.base(1),
		breakdownTemplates.masteryMul(72),
		{
			label:"Tier 4 achievements",
			mod:function(){return 1+achievement.ownedInTier(4)/1000},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+BEformat(this.mod(),3)}
		}
	]
}
breakdownStats.tickspeed={
	label:"Tickspeed",
	visible:function(){return stat("tickspeed").neq(1)},
	precision:3,
	modifiers:[
		breakdownTemplates.base("1"),
		{
			label:achievement.label(212,true),
			mod:function(){return [212,213,214,215].map(x => AchievementE(x)?1.004:1).reduce((x,y)=>x*y)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+BEformat(this.mod(),3)}
		},
		{
			label:achievement.label(409,true),
			mod:function(){return [409,410,411].map(x => AchievementE(x)?achievement.get(x).effect().div(100).add(1):N(1)).reduce((x,y)=>x.mul(y))},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(3)}
		},
		{
			label:"Star 71",
			mod:function(){return StarE(71)?starEffect(71).div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(3)}
		},
		{
			label:"Star 72",
			mod:function(){return StarE(72)?starEffect(72).div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(3)}
		},
		{
			label:"Star 73",
			mod:function(){return StarE(73)?starEffect(73).div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(3)}
		},
		{
			label:"Star 74",
			mod:function(){return StarE(74)?starEffect(74).div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(3)}
		},
		{
			label:achievement.label(510),
			mod:function(){return g.totalDiscoveries.min(250).div(1000).add(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(3)}
		},
		{
			label:"Research 5-15",
			mod:function(){return ResearchE("r5_15")?energyEffect(5).pow(researchEffect(5,15)):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(4)+SSBsmall(energyEffect(5).format(4),researchEffect(5,15).format(4),3)}
		},
		{
			label:"Research 6-6",
			mod:function(){return ResearchE("r6_6")?researchEffect(6,6).mul(achievement.owned()).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(3)}
		},
		{
			label:"Wormhole Milestone 13",
			mod:function(){
				if (achievement.ownedInTier(5)<13) return 1
				return achievement.owned()/400+1
			},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().toFixed(4)}
		},
		{
			label:"Time Paradox",
			func:function(prev){return prev.max(0)},
			text:function(){return "No negative numbers allowed"}
		}
	]
}
breakdownStats.HRMultiplier={
	label:"Hawking Radiation gain multipliers",
	visible:function(){return false},
	precision:2,
	modifiers:[
		breakdownTemplates.base("1"),
		breakdownTemplates.masteryMul(102),
		{
			label:"Research 6-8",
			mod:function(){return ResearchE("r6_8")?Decimal.product(researchEffect(6,8),achievement.owned(),g.stars).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		{
			label:"Research 6-15",
			mod:function(){return ResearchE("r6_15")?energyEffect(5).pow(researchEffect(6,15)):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(4)+SSBsmall(energyEffect(5).format(4),researchEffect(6,15).format(4),3)}
		},
		{
			label:"Research 8-2",
			mod:function(){return ResearchE("r8_2")?stat("tickspeed").pow(researchEffect(8,2)):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)+SSBsmall(stat("tickspeed").format(2),researchEffect(8,2).format(4),3)}
		},
		{
			label:"Study I reward 3",
			func:function(prev){return prev.mul(studies[1].reward(3))},
			text:function(){return "× "+studies[1].reward(3).format(0)}
		}
	]
}
breakdownStats.HRExponent={
	label:"Hawking Radiation gain exponents",
	visible:function(){return false},
	precision:4,
	modifiers:[
		breakdownTemplates.base("10"),
		{
			label:achievement.label(506),
			func:function(prev){return prev.pow(AchievementE(506)?1.1:1)},
			text:function(){return "^ 1.1"}
		},
		{func:function(prev){return prev.log10()}}
	]
}
breakdownStats.pendinghr={
	label:"Hawking radiation gain",
	visible:function(){return unlocked("Hawking Radiation")||totalAxis("dark").gt(1000)},
	precision:2,
	modifiers:[
		{
			label:"Base",
			exp:function(){
				let out = N(2)
				out = out.add(stardustBoost(12))
				return out
			},
			func:function(){return Decimal.powerTower(2,totalAxis("dark").div(1500),this.exp())},
			text:function(){return "2 ^ ("+totalAxis("dark").format(0)+" ÷ 1,500) ^ "+this.exp().format(3)}
		},
		{
			label:"Below "+HRDarkAxisReq().format(0)+" dark axis",
			func:function(prev){return totalAxis("dark").lt(HRDarkAxisReq())?N(0):prev},
			text:function(){return "× 0"}
		},
		breakdownStats.HRMultiplier.modifiers.slice(1),
		breakdownStats.HRExponent.modifiers.slice(1,breakdownStats.HRExponent.modifiers.length-1)
	].flat()
}
breakdownStats.freedarkXAxis={
	label:"Free Dark X axis",
	visible:function(){return stat("freedarkXAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		{
			label:achievement.label(303,true),
			mod:function(){return [303,304,305].map(x => AchievementE(x)?1:0).reduce((x,y)=>x+y)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod()}
		},
		{
			label:"Research 3-6",
			mod:function(){return ResearchE("r3_6")?researchEffect(3,6).mul(g.darkSAxis):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)+SSBsmall(g.darkSAxis.format(2),researchEffect(3,6).format(2),2)}
		},
		{
			label:"Research 3-10",
			mod:function(){return ResearchE("r3_10")?researchEffect(3,10).mul(g.darkstars):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod().format(2)+SSBsmall(g.darkstars.format(2),researchEffect(3,10).format(2),2)}
		},
		breakdownTemplates.ach528Reward("X"),
		breakdownTemplates.axisSoftcap("darkX")
	]
}
breakdownStats.freedarkYAxis={
	label:"Free Dark Y axis",
	visible:function(){return stat("freedarkYAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		{
			label:achievement.label(303,true),
			mod:function(){return [304,305].map(x => AchievementE(x)?1:0).reduce((x,y)=>x+y)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod()}
		},
		breakdownTemplates.ach528Reward("Y"),
		breakdownTemplates.axisSoftcap("darkY")
	]
}
breakdownStats.freedarkZAxis={
	label:"Free Dark Z axis",
	visible:function(){return stat("freedarkZAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		{
			label:achievement.label(303,true),
			mod:function(){return AchievementE(305)?1:0},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+this.mod()}
		},
		breakdownTemplates.ach528Reward("Z"),
		breakdownTemplates.axisSoftcap("darkZ")
	]
}
breakdownStats.freedarkWAxis={
	label:"Free Dark W axis",
	visible:function(){return stat("freedarkWAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		breakdownTemplates.ach528Reward("W"),
		breakdownTemplates.axisSoftcap("darkW")
	]
}
breakdownStats.freedarkVAxis={
	label:"Free Dark V axis",
	visible:function(){return stat("freedarkVAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		breakdownTemplates.ach528Reward("V"),
		breakdownTemplates.axisSoftcap("darkV")
	]
}
breakdownStats.freedarkUAxis={
	label:"Free Dark U axis",
	visible:function(){return stat("freedarkUAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		breakdownTemplates.ach528Reward("U"),
		breakdownTemplates.axisSoftcap("darkU")
	]
}
breakdownStats.freedarkTAxis={
	label:"Free Dark T axis",
	visible:function(){return stat("freedarkTAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		{
			label:achievement.label(528),
			mod:function(){return AchievementE(528)?Decimal.linearSoftcap(g.TAxis.div(125),100,2,1):N(0)},
			func:function(prev){return prev.add(this.mod())},
			text:function(){return "+ "+g.TAxis.div(125).format(2)+(this.mod().gt(100)?("<span class=\"small\">(softcapped to "+this.mod().format(2)+"</span>"):"")}
		},
		breakdownTemplates.ach528Reward("T"),
		breakdownTemplates.axisSoftcap("darkT")
	]
}
breakdownStats.freedarkSAxis={
	label:"Free Dark S axis",
	visible:function(){return stat("freedarkSAxis").neq(0)},
	precision:2,
	modifiers:[
		breakdownTemplates.base("0"),
		{
			label:"Research 3-14",
			func:function(prev){return prev.add(ResearchE("r3_14")?researchEffect(3,14):N(0))},
			text:function(){return "+ "+researchEffect(3,14).format(2)}
		},
		breakdownTemplates.ach528Reward("S"),
		breakdownTemplates.axisSoftcap("darkS")
	]
}
breakdownStats.knowledgePerSec={
	label:"Knowledge gain",
	visible:function(){return unlocked("Hawking Radiation")},
	precision:2,
	modifiers:[
		{
			label:"Base",
			func:function(){return g.masteryPower.add(1).log(c.inf)},
			text:function(){return "log("+g.masteryPower.format(2)+" + 1) / log("+c.inf.format(0)+")"}
		},
		{
			label:"Tier 5 achievements",
			func:function(prev){return prev.mul(achievement.ownedInTier(5))},
			text:function(){return "× "+achievement.ownedInTier(5)}
		},
		{
			label:"Observations",
			func:function(prev){return prev.add(1).pow(observationEffect()).sub(1)},
			text:function(){return "(<i>x</i> + 1) ^ "+observationEffect().format(3)+" - 1<br><span class=\"small\">(Exponent: "+[0,1,2,3].map(x => observationEffect(x).format(2)).join(" × ")+")</span>"}
		},
		{
			label:"Research 7-5",
			mod:function(){return ResearchE("r7_5")?researchEffect(7,5).mul(achievement.owned()).div(100).add(1):N(1)},
			func:function(prev){return prev.mul(this.mod())},
			text:function(){return "× "+this.mod().format(2)}
		},
		breakdownTemplates.masteryMul(103),
		breakdownTemplates.tickspeed()
	]
}
function stat(name) {
  let data = breakdownStats[name].modifiers
  let value = data[0].func()
	if (data.length==1) return value
  for (let i=1;i<data.length;i++) value=data[i].func(value)
  return value
}
function breakdownTable(name) {
  let out = "<table><tr><th class=\"tablecell\" style=\"width:32vw\">Source</th><th class=\"tablecell\" style=\"width:32vw\">Modifier</th><th class=\"tablecell\" style=\"width:32vw\">Total</th></tr>"
  let data = breakdownStats[name]
  let value = "null"
  for (let i=0;i<data.modifiers.length;i++) {
    let next = data.modifiers[i]
    let oldvalue = value
    value = next.func(value)
		let alwaysShow = (next.alwaysShow==undefined)?false:next.alwaysShow()
    if (value.eq(oldvalue)&&!alwaysShow) continue
		if (i==0&&(value.eq(0)||value.eq(1))) continue
    out+="<tr><td class=\"tablecell\" style=\"width:32vw\">"+next.label+"</td><td class=\"tablecell\" style=\"width:32vw\">"+next.text()+"</td><td class=\"tablecell\" style=\"width:32vw\">"+BEformat(value,data.precision)+"</td></tr>"
  }
  out+="</table>"
  return out
}
var activeBreakdownTab = "exoticmatterPerSec"
function toggleActiveBreakdownTab(x){
	activeBreakdownTab=breakdownTabList[x]
}
var breakdownTabList = Object.entries(breakdownStats).sort(function(a,b){return a[1].label>b[1].label}).map(x => x[0])
for (let i=0;i<breakdownTabList.length;i++) d.element("SSBnavigation").innerHTML += "<button style=\"width:150px;font-size:9px;display:none\" onClick=\"toggleActiveBreakdownTab("+i+")\" id=\"SSB-"+breakdownTabList[i]+"\">"+breakdownStats[breakdownTabList[i]].label+"</button>"