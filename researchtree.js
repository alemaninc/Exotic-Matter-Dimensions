"use strict";
/*
normal-type research is refunded on Research respec
permanent-type research is not refunded on Research respec
study-type research allows the player to enter a study and is refunded on Research respec, unless the player is entering a study
*/
/*
description					the effect of the research, accounting for boosts
adjacent_req				 adjacent research. at least one research in this array must be purchased in order to purchase the research. row 1 research is always purchasable
condition						a condition that must be fulfilled to purchase the research
visibility					 a condition that must be fulfilled for the research to appear (besides having purchased a research from the previous row at least once)
type								 whether the research is normal, permanent or a study
basecost						 the base cost
icon								 the text inside the research box
group								the group of the research
*/
const research = (function(){
	function studyReq(i,num) {return {check:function(){return g.studyCompletions[i]>=num},text:function(){return g.studyCompletions[i]+" / "+num+" Study "+roman(i)+" completions"}}}
	function totalStudyReq(num) {return {check:function(){return g.studyCompletions.sum()>=num},text:function(){return g.studyCompletions.sum()+" / "+num+" total Study completions"}}}
	function unconnectedResearchReq(id) {return {check:function(){return g.research[id]},text:function(){return "Research "+researchOut(id)+" owned"}}}
	function lumenReq(index,num) {return {check:function(){return g.lumens[index].gte(num)},text:function(){return g.lumens[index].format()+" / "+num.format()+" "+lightNames[index]+" lumens"}}}
	function lightAugmentReq(i) {
		return {
			req:function(){let x = ownedResearchInGroup("lightaugment").length;return Decimal.affordGeometricSeries(Decimal.fromComponents(1,1,21+x**3/3+x**2/2+x/6),lightData[i].baseReq,lightData[i].baseScale,0)},
			check:function(){return g.lumens[i].gte(this.req())},
			text:function(){return g.lumens[i].format()+" / "+this.req().format()+" "+lightNames[i]+" lumens"}
		}
	}
	let betaReq = {check:function(){return betaActive},text:function(){return "Play in Version 𝕍1.3 or higher"}}
	function studyVResearch(pos,comp,resInt,resOut,amount) {
		return {
			description:function(){let eff=researchEffect(researchRow(pos),researchCol(pos));return "All research is "+(eff.gt(c.d0_1)?(c.d1.sub(eff).mul(c.e2).noLeadFormat(2)+"%"):(eff.recip().noLeadFormat(2)+"×"))+" cheaper"},
			adjacent_req:[],
			condition:[studyReq(5,comp),{text:function(){return g[resInt].format()+" / "+amount.format()+" "+resOut},check:function(){return g[resInt].gte(amount)}}],
			visibility:function(){return g.studyCompletions[5]>=comp},
			type:"normal",
			basecost:c.d0,
			icon:icon[resInt]+icon.arr+classes.research("R$"),
			effect:function(power){return c.d1.sub(studies[5].reward(1).div(c.e3)).pow(power)}
		}
	}
	function expFormat(exponent,precision) {
		return exponent.eq(c.d1)?"":("<sup>"+exponent.noLeadFormat(precision)+"</sup>")
	}
	function numOrFormula(id) {return showFormulas?("<i>"+research[id].formulaDesc()+"</i>"):research[id].numDesc()}
	function timeResearchDesc(row,col,res){return function(){return "+"+(researchEffect(row,col).gte(c.d0_01)?(researchEffect(row,col).mul(c.e2).noLeadFormat(2)+"% "+res+" per second"):("1% "+res+" per "+researchEffect(row,col).mul(c.e2).recip().noLeadFormat(2)+" seconds"))+" in the current Wormhole (currently: "+percentOrMult(researchEffect(row,col).mul(g.truetimeThisWormholeReset).add(c.d1),2)+")"}}
	let classes = {
		sup:x=>"<sup>"+x+"</sup>",
		sub:x=>"<sub>"+x+"</sub>",
		xscript:(t,d)=>"<span class=\"xscript\"><sup>"+t+"</sup><sub>"+d+"</sub></span>",
	}
	let basicclasslist = ["exoticmatter","time","achievements","mastery","stardust","stars","darkmatter","energy","wormhole","research","galaxies"]
	for (let i of basicclasslist) classes[i] = function(x){return "<span class=\"_"+i+"\">"+x+"</span>"}
	let icon = {
		arr:"→",
		arrl:"←",
		plus:classes.sup("+"),
		minus:classes.sup("-"),
		normalaxis:classes.exoticmatter("A"),
		exoticmatter:classes.exoticmatter("EM"),
		...Object.fromEntries(axisCodes.map(x=>[x+"Axis",classes.exoticmatter(x)])),
		time:classes.time("t"),
		tickspeed:classes.time("Δt"),
		achievements:classes.achievements("A"),
		mastery:function(x=""){return classes.mastery("M"+classes.sub(x))},
		masterypower:classes.mastery("MP"),
		stardust:classes.stardust("S"),
		star:function(x=""){return classes.stars("★"+classes.sub(x))},
		darkaxis:classes.darkmatter("A"),
		...Object.fromEntries(axisCodes.map(x=>["dark"+x+"Axis",classes.darkmatter(x)])),
		darkstar:classes.darkmatter("★"),
		darkmatter:classes.darkmatter("DM"),
		energy:classes.energy("E"),
		energynum:x=>classes.energy("E<sub>"+x+"</sub>"),
		row4energy:x=>classes.energy("E")+classes.xscript("+",classes.energy(x)),
		hr:classes.wormhole("HR"),
		research:classes.research("R"),
		knowledge:classes.research("K"),
		discovery:classes.research("D"),
		study:arr=>arr.map(x=>"<div class=\"studyDot\" style=\"height:"+x[2]+"px;width:"+x[2]+"px;left:calc("+x[0]+"% - "+(x[2]/2)+"px);top:calc("+x[1]+"% - "+(x[2]/2)+"px)\"></div>").join(""),
		chroma:x=>("<span class=\""+lightNames[x]+"\">C</span>"),
		lumen:x=>("<span class=\""+lightNames[x]+"\">L</span>"),
		galaxy:classes.galaxies("G")
	}
	function gradientText(text,gradient) {
		return "<span style=\"background:"+gradient+";-webkit-background-clip:text;-webkit-text-fill-color:transparent;\">"+text+"</span>"
	}
	return {
		r1_3: {
			description:function(){return "Gain "+researchEffect(1,3).noLeadFormat(2)+"× more exotic matter per normal axis owned (current total: "+researchEffect(1,3).pow(stat.totalAxis).format(2)+"×)";},
			adjacent_req:[],
			condition:[], 
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d1,
			icon:icon.normalaxis+icon.arr+icon.exoticmatter,
			effect:function(power){return c.d1_5.pow(power);}
		},
		r1_5:studyVResearch("r1_5",1,"exoticmatter","exotic matter",c.ee8),
		r1_6:studyVResearch("r1_6",3,"darkmatter","dark matter",c.ee5),
		r1_8: {
			description:function(){return "Multiply the effects of the first seven normal axis by "+researchEffect(1,8).noLeadFormat(2);},
			adjacent_req:[],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d1,
			icon:icon.normalaxis+icon.plus,
			effect:function(power){return c.d1_5.pow(power);}
		},
		r1_10:studyVResearch("r1_10",4,"masteryPower","mastery power",c.ee3),
		r1_11:studyVResearch("r1_11",2,"stardust","stardust",c.ee5),
		r1_13: {
			description:function(){return "Gain "+researchEffect(1,13).noLeadFormat(2)+"× more dark matter per dark axis owned (current total: "+researchEffect(1,13).pow(stat.totalDarkAxis).format(2)+"×)";},
			adjacent_req:[],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d1,
			icon:icon.darkaxis+icon.arr+icon.darkmatter,
			effect:function(power){return c.d1_2.pow(power);}
		},
		r2_2: {
			description:function(){return "Increase the X Axis effect by "+researchEffect(2,2).noLeadFormat(2)+"% per X Axis owned (current total: "+researchEffect(2,2).mul(g.XAxis).noLeadFormat(2)+"%)";},
			adjacent_req:["r1_3"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d2,
			icon:icon.XAxis+icon.arr+icon.XAxis,
			effect:function(power){return power;}
		},
		r2_4: {
			description:function(){return "Increase the X Axis effect by "+researchEffect(2,4).noLeadFormat(1)+"% per second in this Wormhole (current total: "+researchEffect(2,4).mul(g.truetimeThisWormholeReset).format(2)+"%)";},
			adjacent_req:["r1_3"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d2,
			icon:icon.time+icon.arr+icon.XAxis,
			effect:function(power){return power.div(c.d10);}
		},
		r2_7: {
			description:function(){return "Increase the X Axis effect by "+researchEffect(2,7).noLeadFormat(2)+"% per OoM of spatial energy (current total: "+researchEffect(2,7).mul(g.spatialEnergy.log10()).format(1)+"%)";},
			adjacent_req:["r1_8"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d2,
			icon:icon.energynum(4)+icon.arr+icon.XAxis,
			effect:function(power){return power;}
		},
		r2_8: {
			adjacent_req:["r1_8"],
			condition:[{check:function(){return g.knowledge.gt(studies[5].unlockReq())},text:function(){return g.knowledge.format(2)+" / "+studies[5].unlockReq().format(2)+" knowledge"}},unconnectedResearchReq("r11_8")],
			visibility:function(){return g.research.r11_8;},
			type:"study",
			basecost:N(4000),
			icon:icon.study([[50,10,4],[23,37,4],[50,37,4],[77,37,4],[50,90,4]])
		},
		r2_9: {
			description:function(){return "Increase the X Axis effect by "+researchEffect(2,9).noLeadFormat(2)+"% per dark X Axis owned (current total: "+researchEffect(2,9).mul(g.darkXAxis).noLeadFormat(2)+"%)";},
			adjacent_req:["r1_8"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d2,
			icon:icon.darkXAxis+icon.arr+icon.XAxis,
			effect:function(power){return power.mul(c.d10);}
		},
		r2_12: {
			description:function(){return "Increase the X Axis effect by "+researchEffect(2,12).noLeadFormat(2)+"% per total Discovery (current total: "+researchEffect(2,12).mul(g.totalDiscoveries).noLeadFormat(2)+"%)";},
			adjacent_req:["r1_13"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d2,
			icon:icon.discovery+icon.arr+icon.XAxis,
			effect:function(power){return power.mul(c.d80);}
		},
		r2_14: {
			numDesc:function(){return researchEffect(2,14).noLeadFormat(4)},
			formulaDesc:function(){return "(X ÷ 100 + 1)<sup>0.1</sup>"+formulaFormat.mult(researchPower(2,14).div(c.d4))+" + 1"},
			description:function(){return "Raise the X Axis effect to the power of "+numOrFormula("r2_14")+" (decreases based on X Axis owned)";},
			adjacent_req:["r1_13"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d2,
			icon:icon.XAxis+icon.plus,
			effect:function(power){return power.div(stat.realXAxis.div(c.e2).add(c.d1).pow(c.d0_1).mul(c.d4)).add(c.d1);}
		},
		r3_2: {
			description:function(){return "Gain "+researchEffect(3,2).noLeadFormat(2)+" free S Axis";},
			adjacent_req:["r2_2"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d3,
			icon:icon.SAxis+icon.plus,
			effect:function(power){return power;}
		},
		r3_5: {
			description:function(){return "Raise the S Axis cost to the power of "+researchEffect(3,5).noLeadFormat(3);},
			adjacent_req:["r2_4"],
			condition:[],
			visibility:function(){return true;}, 
			type:"normal",
			basecost:c.d3,
			icon:classes.exoticmatter("S$")+icon.minus,
			effect:function(power){return power.div(c.d2);}
		},
		r3_6: {
			description:function(){return "Gain "+researchEffect(3,6).noLeadFormat(2)+" free dark X Axis per dark S Axis owned (current total: "+researchEffect(3,6).mul(g.darkSAxis).noLeadFormat(2)+")";},
			adjacent_req:["r2_7"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d3,
			icon:icon.darkSAxis+icon.arr+icon.darkXAxis,
			effect:function(power){return power;}
		},
		r3_10: {
			description:function(){return "Gain "+researchEffect(3,10).noLeadFormat(2)+" free dark X axis per dark star owned (current total: "+researchEffect(3,10).mul(g.darkstars).noLeadFormat(2)+")";},
			adjacent_req:["r2_9"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d3,
			icon:icon.darkstar+icon.arr+icon.darkXAxis,
			effect:function(power){return power.mul(c.d0_25);}
		},
		r3_11: {
			description:function(){return "Raise the dark S Axis cost to the power of "+researchEffect(3,11).noLeadFormat(3);},
			adjacent_req:["r2_12"],
			condition:[],
			visibility:function(){return true;}, 
			type:"normal",
			basecost:c.d3,
			icon:classes.darkmatter("S$")+icon.minus,
			effect:function(power){return power.div(c.d2);}
		},
		r3_14: {
			description:function(){return "Gain "+researchEffect(3,14).noLeadFormat(2)+" free dark S Axis";},
			adjacent_req:["r2_14"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d3,
			icon:icon.darkSAxis+icon.plus,
			effect:function(power){return power;}
		},
		r4_1: {
			description:function(){return "Dark energy increases "+researchEffect(4,1).noLeadFormat(2)+"× faster";},
			adjacent_req:["r3_2"],
			condition:[{check:function(){return achievement.ownedInTier(5)>=15},text:function(){return achievement.ownedInTier(5)+" / 15 Tier 5 achievements"}}],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d3,
			icon:icon.row4energy(1),
			effect:function(power){return c.d15.pow(power);}
		},
		r4_2: {
			description:function(){return "Stelliferous energy increases "+researchEffect(4,2).noLeadFormat(2)+"× faster";},
			adjacent_req:["r3_2"],
			condition:[{check:function(){return achievement.ownedInTier(5)>=15},text:function(){return achievement.ownedInTier(5)+" / 15 Tier 5 achievements"}}],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d3,
			icon:icon.row4energy(2),
			effect:function(power){return c.d15.pow(power);}
		},
		r4_3: {
			description:function(){return "Gravitational energy increases "+researchEffect(4,3).noLeadFormat(2)+"× faster";},
			adjacent_req:["r3_2"],
			condition:[{check:function(){return achievement.ownedInTier(5)>=15},text:function(){return achievement.ownedInTier(5)+" / 15 Tier 5 achievements"}}],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d3,
			icon:icon.row4energy(3),
			effect:function(power){return c.d15.pow(power);}
		},
		r4_6: {
			description:function(){return "S Axis effect"+expFormat(researchPower(4,6),3)+" affects Mastery 11 (current total: ^"+researchEffect(4,6).format(4)+")";},
			adjacent_req:["r3_5","r3_6"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d3,
			icon:icon.SAxis+icon.arr+icon.mastery(11),
			effect:function(power){return stat.SAxisEffect.pow(stat.realSAxis.mul(power));}
		},
		r4_10: {
			description:function(){return "S Axis effect"+expFormat(researchPower(4,10),3)+" affects Mastery 12 (current total: ^"+researchEffect(4,10).format(4)+")";},
			adjacent_req:["r3_10","r3_11"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d3,
			icon:icon.SAxis+icon.arr+icon.mastery(12),
			effect:function(power){return stat.SAxisEffect.pow(stat.realSAxis.mul(power));}
		},
		r4_13: {
			description:function(){return "Spatial energy increases "+researchEffect(4,13).noLeadFormat(2)+"× faster";},
			adjacent_req:["r3_14"],
			condition:[{check:function(){return achievement.ownedInTier(5)>=15},text:function(){return achievement.ownedInTier(5)+" / 15 Tier 5 achievements"}}],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d3,
			icon:icon.row4energy(4),
			effect:function(power){return c.d15.pow(power);}
		},
		r4_14: {
			description:function(){return "Neural energy increases "+researchEffect(4,14).noLeadFormat(2)+"× faster";},
			adjacent_req:["r3_14"],
			condition:[{check:function(){return achievement.ownedInTier(5)>=15},text:function(){return achievement.ownedInTier(5)+" / 15 Tier 5 achievements"}}],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d3,
			icon:icon.row4energy(5),
			effect:function(power){return c.d15.pow(power);}
		},
		r4_15: {
			description:function(){return "Meta energy increases "+researchEffect(4,15).noLeadFormat(2)+"× faster";},
			adjacent_req:["r3_14"],
			condition:[{check:function(){return achievement.ownedInTier(5)>=15},text:function(){return achievement.ownedInTier(5)+" / 15 Tier 5 achievements"}}],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d3,
			icon:icon.row4energy(6),
			effect:function(power){return c.d15.pow(power);}
		},
		r5_1: {
			description:function(){return "The dark energy effect"+expFormat(researchEffect(5,1),3)+" boosts T axis effect (currently: ^"+stat.darkEnergyEffect.pow(researchEffect(5,1)).format(4)+")";},
			adjacent_req:["r4_1","r4_2","r4_3"],
			condition:[],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum(1)+icon.arr+icon.TAxis,
			effect:function(power){return power;}
		},
		r5_2: {
			description:function(){return "The stelliferous energy effect"+expFormat(researchEffect(5,2),3)+" boosts U axis effect (currently: ^"+stat.stelliferousEnergyEffect.pow(researchEffect(5,2)).format(4)+")";},
			adjacent_req:["r4_1","r4_2","r4_3"],
			condition:[],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum(2)+icon.arr+icon.UAxis,
			effect:function(power){return power;}
		},
		r5_3: {
			description:function(){return "The gravitational energy effect"+expFormat(researchEffect(5,3),3)+" boosts dark U axis effect (currently: ^"+stat.gravitationalEnergyEffect.pow(researchEffect(5,3)).format(4)+")";},
			adjacent_req:["r4_1","r4_2","r4_3"],
			condition:[],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum(3)+icon.arr+icon.darkUAxis,
			effect:function(power){return power;}
		},
		r5_7: {
			adjacent_req:["r4_6"],
			condition:[{check:function(){return stat.totalDarkAxis.gte(studies[1].unlockReq())},text:function(){return stat.totalDarkAxis.format(0)+" / "+studies[1].unlockReq().format()+" total dark axis"}}],
			visibility:function(){return true;},
			type:"study",
			basecost:c.d12,
			icon:icon.study([[50,50,6]])
		},
		r5_9: {
			adjacent_req:["r4_10"],
			condition:[{check:function(){return g.stardust.gte(studies[2].unlockReq())},text:function(){return g.stardust.format()+" / "+studies[2].unlockReq().format()+" stardust"}}],
			visibility:function(){return true;},
			type:"study",
			basecost:c.d12,
			icon:icon.study([[25,75,6],[75,25,6]])
		},
		r5_13: {
			description:function(){return "The spatial energy effect"+expFormat(researchEffect(5,13),3)+" boosts Row 2 Masteries (currently: ^"+stat.spatialEnergyEffect.pow(researchEffect(5,13)).format(4)+")";},
			adjacent_req:["r4_13","r4_14","r4_15"],
			condition:[],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum(4)+icon.arr+icon.mastery("2x"),
			effect:function(power){return power;}
		},
		r5_14: {
			description:function(){return "The neural energy effect"+expFormat(researchEffect(5,14),3)+" boosts Stardust Boost 7 (currently: ^"+stat.neuralEnergyEffect.pow(researchEffect(5,14)).format(4)+")";},
			adjacent_req:["r4_13","r4_14","r4_15"],
			condition:[],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum(5)+icon.arr+classes.stardust("b7"),
			effect:function(power){return power;}
		},
		r5_15: {
			description:function(){return "The meta energy effect"+expFormat(researchEffect(5,15),3)+" multiplies tickspeed (currently: ×"+stat.metaEnergyEffect.pow(researchEffect(5,15)).format(4)+")";},
			adjacent_req:["r4_13","r4_14","r4_15"],
			condition:[],
			visibility:function(){return achievement.ownedInTier(5)>=15;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum(6)+icon.arr+icon.tickspeed,
			effect:function(power){return power;}
		},
		r6_1: {
			description:function(){return "The dark energy effect"+expFormat(researchEffect(6,1),3)+" boosts Z Axis effect (currently: ^"+stat.darkEnergyEffect.pow(researchEffect(6,1)).format(4)+")";},
			adjacent_req:["r5_1","r5_2","r5_3"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d8,
			icon:icon.energynum(1)+icon.arr+icon.ZAxis,
			effect:function(power){return power;}
		},
		r6_2: {
			description:function(){return "The stelliferous energy effect"+expFormat(researchEffect(6,2),3)+" reduces the star cost (currently: ^"+stat.stelliferousEnergyEffect.pow(researchEffect(6,2).mul(c.dm1)).format(3)+")";},
			adjacent_req:["r5_1","r5_2","r5_3"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d8,
			icon:icon.energynum(2)+icon.arr+icon.star()+classes.stars("$"),
			effect:function(power){return power;}
		},
		r6_3: {
			description:function(){return "The gravitational energy effect"+expFormat(researchEffect(6,3),3)+" divides the dark star cost (currently: ÷"+stat.gravitationalEnergyEffect.pow(researchEffect(6,3)).format(4)+")";},
			adjacent_req:["r5_1","r5_2","r5_3"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d8,
			icon:icon.energynum(3)+icon.arr+icon.darkstar+classes.darkmatter("$"),
			effect:function(power){return power;}
		},
		r6_5: {
			description:function(){return "Mastery power gain accelerates "+researchEffect(6,5).mul(c.e2).noLeadFormat(1)+"% faster per achievement completed (current total: "+[researchEffect(6,5),totalAchievements,c.e2].productDecimals().noLeadFormat(2)+"%)";},
			adjacent_req:["r6_6"],
			condition:[studyReq(1,2)],
			visibility:function(){return g.studyCompletions[1]>=2;},
			type:"normal",
			basecost:c.d3,
			icon:icon.achievements+icon.arr+icon.masterypower, 
			effect:function(power){return power.mul(c.d0_02);}
		},
		r6_6: {
			description:function(){return "Tickspeed is "+researchEffect(6,6).mul(c.e2).noLeadFormat(1)+"% higher per achievement completed (current total: "+[researchEffect(6,6),totalAchievements,c.e2].productDecimals().noLeadFormat(2)+"%)";},
			adjacent_req:["r5_7"],
			condition:[studyReq(1,1)],
			visibility:function(){return g.studyCompletions[1]>=1;},
			type:"normal",
			basecost:c.d2,
			icon:icon.achievements+icon.arr+icon.tickspeed,
			effect:function(power){return power.div(c.e2);}
		},
		r6_8: {
			description:function(){return "Hawking radiation gain is "+researchEffect(6,8).mul(c.e2).noLeadFormat(1)+"% higher per achievement completed, per purchased star (current total: "+percentOrMult([researchEffect(6,8),totalAchievements,g.stars].productDecimals().add(c.d1))+")";},
			adjacent_req:["r5_7","r5_9"],
			condition:[studyReq(1,1),studyReq(2,1)],
			visibility:function(){return g.studyCompletions[1]>=1&&g.studyCompletions[2]>=1;},
			type:"normal",
			basecost:c.d3,
			icon:icon.achievements+icon.arr+icon.hr+icon.arrl+icon.star(),
			effect:function(power){return power.div(c.e2);}
		},
		r6_9: {
			description:function(){return "Unlock a secret achievement";},
			adjacent_req:[],
			condition:[],
			visibility:function(){return g.studyCompletions[1]+g.studyCompletions[2]>0;},
			type:"normal",
			basecost:c.d0,
			icon:"ツ"
		},
		r6_10: {
			description:function(){return "Row 7 stars are "+researchEffect(6,10).noLeadFormat(3)+"% stronger";},
			adjacent_req:["r5_9"],
			condition:[studyReq(2,1)],
			visibility:function(){return g.studyCompletions[2]>=1;},
			type:"normal",
			basecost:c.d2,
			icon:icon.star()+classes.xscript("+",classes.stars("7x")),
			effect:function(power){return power.mul(c.d20);}
		},
		r6_11: {
			description:function(){return "Each allocated star makes the Masteries in that row "+researchEffect(6,11).noLeadFormat(2)+"% stronger";},
			adjacent_req:["r6_10"],
			condition:[studyReq(2,2)],
			visibility:function(){return g.studyCompletions[2]>=2;},
			type:"normal",
			basecost:c.d3,
			icon:icon.star("xy")+icon.arr+icon.mastery("xy"),
			effect:function(power){return power.mul(c.d1_25);}
		},
		r6_13: {
			description:function(){return "The spatial energy effect"+expFormat(researchEffect(6,13),3)+" boosts V Axis effect (currently: ^"+stat.spatialEnergyEffect.pow(researchEffect(6,13)).format(4)+")";},
			adjacent_req:["r5_13","r5_14","r5_15"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d8,
			icon:icon.energynum(4)+icon.arr+icon.VAxis,
			effect:function(power){return power;}
		},
		r6_14: {
			description:function(){return "The neural energy effect"+expFormat(researchEffect(6,14),3)+" boosts dark W Axis effect (currently: ^"+stat.neuralEnergyEffect.pow(researchEffect(6,14)).format(4)+")";},
			adjacent_req:["r5_13","r5_14","r5_15"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d8,
			icon:icon.energynum(5)+icon.arr+icon.darkWAxis,
			effect:function(power){return power;}
		},
		r6_15: {
			description:function(){return "The meta energy effect"+expFormat(researchEffect(6,15),3)+" boosts hawking radiation (currently: ×"+stat.metaEnergyEffect.pow(researchEffect(6,15)).format(4)+")";},
			adjacent_req:["r5_13","r5_14","r5_15"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d8,
			icon:icon.energynum(6)+icon.arr+icon.hr,
			effect:function(power){return power;}
		},
		r7_1: {
			description:function(){return "The dark energy effect"+expFormat(researchEffect(7,1),2)+" affects stelliferous and meta energy gain (currently: ^"+stat.darkEnergyEffect.pow(researchEffect(7,1)).format(2)+")";},
			adjacent_req:["r6_1","r6_2","r6_3"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum("1")+icon.arr+icon.energynum("2,6"),
			effect:function(power){return power.mul(c.d7);}
		},
		r7_2: {
			description:function(){return "The stelliferous energy effect"+expFormat(researchEffect(7,2),2)+" affects spatial and neural energy gain (currently: ^"+stat.stelliferousEnergyEffect.pow(researchEffect(7,2)).format(2)+")";},
			adjacent_req:["r6_1","r6_2","r6_3"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum("2")+icon.arr+icon.energynum("4,5"),
			effect:function(power){return power.mul(c.d7);}
		},
		r7_3: {
			description:function(){return "The gravitational energy effect"+expFormat(researchEffect(7,3),2)+" affects spatial and meta energy gain (currently: ^"+stat.gravitationalEnergyEffect.pow(researchEffect(7,3)).format(2)+")";},
			adjacent_req:["r6_1","r6_2","r6_3"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum("3")+icon.arr+icon.energynum("4,6"),
			effect:function(power){return power.mul(c.d7);}
		},
		r7_5: {
			description:function(){return "Knowledge increases "+researchEffect(7,5).mul(c.e2).noLeadFormat(2)+"% faster per achievement completed (current total: "+[researchEffect(7,5),totalAchievements,100].productDecimals().format(1)+"%)";},
			adjacent_req:["r6_5"],
			condition:[studyReq(1,3)],
			visibility:function(){return g.studyCompletions[1]>=3;},
			type:"normal",
			basecost:c.d4,
			icon:icon.achievements+icon.arr+icon.knowledge,
			effect:function(power){return power.mul(c.d0_03);}
		},
		r7_8: {
			numDesc:function(){return c.d1.sub(researchEffect(7,8)).mul(c.e2).format(2)},
			formulaDesc:function(){return "100 × (1 - ("+(totalAchievements>60?"A":("50 + A<sup>6</sup> ÷ "+N(4.6656e9).format()))+" ÷ 50)"+expFormat(researchPower(7,8).mul(c.dm0_5))+")"},
			description:function(){return "The star cost scaling is "+numOrFormula("r7_8")+"% slower (based on owned achievements)";},
			adjacent_req:["r6_8"],
			condition:[studyReq(1,2),studyReq(2,2)],
			visibility:function(){return g.studyCompletions[1]>=2&&g.studyCompletions[2]>=2;},
			type:"normal",
			basecost:c.d4,
			icon:icon.achievements+icon.arr+icon.star()+classes.stars("$"),
			effect:function(power){return N((totalAchievements>60?totalAchievements:(50+totalAchievements**6/4.6656e9))/50).max(c.d1).pow(power.mul(c.dm0_5));}
		},
		r7_11: {
			description:function(){return "Each purchased dark star raises the normal star cost to the power of "+researchEffect(7,11).noLeadFormat(3)+" (current total: ^"+researchEffect(7,11).pow(g.darkstars).format(4)+")";},
			adjacent_req:["r6_11"],
			condition:[studyReq(2,3)],
			visibility:function(){return g.studyCompletions[2]>=3;},
			type:"normal",
			basecost:c.d4,
			icon:icon.darkstar+icon.arr+icon.star()+classes.stars("$"),
			effect:function(power){return c.d0_99.pow(power);}
		},
		r7_13: {
			description:function(){return "The spatial energy effect"+expFormat(researchEffect(7,13),2)+" affects dark and gravitational energy gain (currently: ^"+stat.spatialEnergyEffect.pow(researchEffect(7,13)).format(2)+")";},
			adjacent_req:["r6_13","r6_14","r6_15"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum("4")+icon.arr+icon.energynum("1,3"),
			effect:function(power){return power;}
		},
		r7_14: {
			description:function(){return "The neural energy effect"+expFormat(researchEffect(7,14),2)+" affects stelliferous and gravitational energy gain (currently: ^"+stat.neuralEnergyEffect.pow(researchEffect(7,14)).format(2)+")";},
			adjacent_req:["r6_13","r6_14","r6_15"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum("5")+icon.arr+icon.energynum("2,3"),
			effect:function(power){return power.mul(c.d7);}
		},
		r7_15: {
			description:function(){return "The meta energy effect"+expFormat(researchEffect(7,15),2)+" affects dark and neural energy gain (currently: ^"+stat.metaEnergyEffect.pow(researchEffect(7,15)).format(2)+")";},
			adjacent_req:["r6_13","r6_14","r6_15"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d6,
			icon:icon.energynum("6")+icon.arr+icon.energynum("1,5"),
			effect:function(power){return power;}
		},
		r8_2: {
			description:function(){return "Multiply hawking radiation by tickspeed"+expFormat(researchEffect(8,2),3)+" (currently: ×"+stat.tickspeed.pow(researchEffect(8,2)).format(2)+")";},
			adjacent_req:["r7_1","r7_2","r7_3"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d10,
			icon:icon.tickspeed+icon.arr+icon.hr,
			effect:function(power){return power.div(c.d2);}
		},
		r8_5: {
			description:function(){return "Energy increases "+researchEffect(8,5).mul(c.e2).noLeadFormat(2)+"% faster per achievement completed (current total: "+[researchEffect(8,5),totalAchievements,100].productDecimals().noLeadFormat(2)+"%)";},
			adjacent_req:["r7_5"],
			condition:[studyReq(1,4)],
			visibility:function(){return g.studyCompletions[1]>=4;},
			type:"normal",
			basecost:c.d60,
			icon:icon.achievements+icon.arr+icon.energy,
			effect:function(power){return power.mul(c.d0_04);}
		},
		r8_8: {
			description:function(){return "Unlock Light"},
			adjacent_req:["r7_8"],
			condition:[totalStudyReq(6)],
			visibility:function(){return totalStudyReq(6).check()},
			type:"permanent",
			basecost:c.d480,
			icon:"<div style=\"position:absolute;top:0px;left:0px;height:100%;width:100%;background-image:conic-gradient(rgba(255,0,0,0.5),rgba(0,0,0,0),rgba(0,255,0,0.5),rgba(0,0,0,0),rgba(0,0,255,0.5),rgba(0,0,0,0),rgba(255,0,0,0.5))\"></div>"
		},
		r8_11: {
			description:function(){return "Row 1 research is "+researchEffect(8,11).noLeadFormat(2)+"% stronger per purchased star (current total: "+researchEffect(8,11).mul(g.stars).noLeadFormat(2)+"%)";},
			adjacent_req:["r7_11"],
			condition:[studyReq(2,4)],
			visibility:function(){return g.studyCompletions[2]>=4;},
			type:"normal",
			basecost:c.d60,
			icon:icon.star()+icon.arr+icon.research+classes.research(classes.sub(c.d1)),
			effect:function(power){return power.mul(c.d10);}
		},
		r8_14: {
			description:function(){return "Offset the star cost by "+researchEffect(8,14).noLeadFormat(2)+" stars";},
			adjacent_req:["r7_13","r7_14","r7_15"],
			condition:[],
			visibility:function(){return true;},
			type:"normal",
			basecost:c.d10,
			icon:icon.star()+icon.plus,
			effect:function(power){return power.mul(c.d4);}
		},
		r9_1: {
			description:function(){return "Mental energy increases "+researchEffect(9,1).noLeadFormat(2)+"× faster";},
			adjacent_req:["r9_2"],
			condition:[studyReq(3,2)],
			visibility:function(){return g.studyCompletions[3]>=2;},
			type:"normal",
			basecost:c.d40,
			icon:icon.row4energy(8),
			effect:function(power){return c.d30.pow(power);},
			group:"energy"
		},
		r9_2: {
			adjacent_req:["r8_2"],
			condition:[{check:function(){return energyPerSec(0).gt(studies[3].unlockReq())},text:function(){return energyPerSec(0).format(2)+" / "+BEformat(studies[3].unlockReq())+" dark energy per second"}},totalStudyReq(6)],
			visibility:function(){return g.studyCompletions.sum()>5;},
			type:"study",
			basecost:c.d400,
			icon:icon.study([[50,80,5],[15.4,20,5],[84.6,20,5]])
		},
		r9_3: {
			description:function(){return "Vacuum energy increases "+researchEffect(9,3).noLeadFormat(2)+"× faster";},
			adjacent_req:["r9_2"],
			condition:[studyReq(3,1)],
			visibility:function(){return g.studyCompletions[3]>=1;},
			type:"normal",
			basecost:c.d40,
			icon:icon.row4energy(7),
			effect:function(power){return c.d30.pow(power);},
			group:"energy"
		},
		...(()=>{
			let out = []
			for (let i=0;i<3;i++) out.push(["r9_"+(i+7),{
				numDesc:function(){return researchEffect(9,i+7).noLeadFormat(2)},
				formulaDesc:function(){return "(1 + L × (L + 1) ÷ 2)"+expFormat(researchPower(9,i+7))},
				description:function(){return "Chroma increases "+numOrFormula("r9_"+(i+7))+"× faster (based on "+lightNames[i]+" lumens)"},
				adjacent_req:["r8_8"],
				condition:[lumenReq(i,c.d1)],
				visibility:function(){return true},
				type:"normal",
				basecost:c.d360,
				icon:icon.lumen(i)+icon.arr+icon.chroma(6),
				effect:function(power){return g.lumens[i].simplex(2).add(c.d1).pow(power)},
				group:"light"
			}])
			return Object.fromEntries(out)
		})(),
		r9_13:{
			numDesc:function(){return researchEffect(9,13).noLeadFormat(2)},
			formulaDesc:function(){return "10<sup>(log(S + 10)<sup>0.2</sup> - 1) × "+researchPower(9,13).mul(0.08).noLeadFormat(3)+"</sup>"},
			description:function(){return "Stardust boosts energy gain (currently: "+numOrFormula("r9_13")+"×)"},
			adjacent_req:["r9_14"],
			condition:[studyReq(4,1)],
			visibility:function(){return g.studyCompletions[4]>0},
			type:"normal",
			basecost:N(200),
			icon:icon.stardust+icon.arr+icon.energy,
			effect:function(power){return [g.stardust.add(c.d10).log10().pow(0.2).sub(c.d1),N(0.08),power].productDecimals().pow10()},
			group:"stardust"
		},
		r9_14: {
			adjacent_req:["r8_14"],
			condition:[{check:function(){return g.stardust.gt(studies[4].unlockReq())},text:function(){return g.stardust.format()+" / "+studies[4].unlockReq().format()+" stardust"}},{check:function(){return g.stardustUpgrades.sum()<7},text:function(){return "with no more than "+g.stardustUpgrades.sum()+" / 6 Stardust upgrades"},joinWithPrevious:true},totalStudyReq(6)],
			visibility:function(){return g.studyCompletions.sum()>5;},
			type:"study",
			basecost:N(1200),
			icon:icon.study([[50,85,5],[85,50,5],[50,15,5],[15,50,5]])
		},
		r9_15:{
			numDesc:function(){return researchEffect(9,15).noLeadFormat(2)},
			formulaDesc:function(){return "10<sup>(log(S + 10)<sup>0.2</sup> - 1) × "+researchPower(9,15).mul(0.05).noLeadFormat(3)+"</sup>"},
			description:function(){return "Stardust boosts chroma gain (currently: "+numOrFormula("r9_15")+"×)"},
			adjacent_req:["r9_14"],
			condition:[studyReq(4,1)],
			visibility:function(){return g.studyCompletions[4]>0},
			type:"normal",
			basecost:N(200),
			icon:icon.stardust+icon.arr+icon.chroma(6),
			effect:function(power){return [g.stardust.add(c.d10).log10().pow(0.2).sub(c.d1),N(0.05),power].productDecimals().pow10()},
			group:"stardust"
		},
		r10_1: {
			description:function(){return "Temporal energy increases "+researchEffect(10,1).noLeadFormat(2)+"× faster";},
			adjacent_req:["r9_2"],
			condition:[studyReq(3,4)],
			visibility:function(){return g.studyCompletions[3]>=4;},
			type:"normal",
			basecost:c.d40,
			icon:icon.row4energy(10),
			effect:function(power){return c.d30.pow(power);},
			group:"energy"
		},
		r10_3: {
			description:function(){return "Dimensional energy increases "+researchEffect(10,3).noLeadFormat(2)+"× faster";},
			adjacent_req:["r9_2"],
			condition:[studyReq(3,3)],
			visibility:function(){return g.studyCompletions[3]>=3;},
			type:"normal",
			basecost:c.d40,
			icon:icon.row4energy(9),
			effect:function(power){return c.d30.pow(power);},
			group:"energy"
		},
		r10_5: {
			description:function(){return "Unlock three additional colors of Light"},
			adjacent_req:["r9_7"],
			condition:[{check:function(){return stat.chromaPerSec.gt(75)},text:function(){return stat.chromaPerSec.format(2)+" / 75 chroma per second"}}],
			visibility:function(){return true},
			type:"permanent",
			basecost:N(600),
			icon:"<div style=\"position:absolute;top:0px;left:0px;height:100%;width:100%;background-image:conic-gradient(rgba(0,0,0,0),rgba(255,255,0,0.5),rgba(0,0,0,0),rgba(0,255,255,0.5),rgba(255,0,255,0),rgba(255,0,255,0.5),rgba(0,0,0,0))\"></div>"
		},
		...(()=>{
			let out = []
			for (let i=0;i<3;i++) out.push(["r10_"+(i+7),{
				numDesc:function(){return researchEffect(10,i+7).format(2)},
				formulaDesc:function(){return "(((log(C ÷ 1,000 + 1)<sup>3</sup>) ÷ ((log<sub>"+lightData[i].baseScale.toString()+"</sub>(C ÷ 1,000 + 1) + 0.5)<sup>2</sup> ÷ 2 + 0.875)) + 1)"+expFormat(researchPower(10,i+7).mul(c.d2))},
				description:function(){return "Chroma increases "+numOrFormula("r10_"+(i+7))+"× faster (based on "+lightNames[i+3]+" chroma)"},
				adjacent_req:["r9_"+(i+7)],
				condition:[{check:function(){return g.chroma[i+3].gt(c.e9)},text:function(){return g.chroma[i+3].format()+" / "+BEformat(c.e9)+" "+lightNames[i+3]+" chroma"}},unconnectedResearchReq("r10_5")],
				visibility:function(){return g.research.r10_5},
				type:"normal",
				basecost:c.d360,
				icon:icon.chroma(i+3)+icon.arr+icon.chroma(6),
				effect:function(power){
					let out = Decimal.div(g.chroma[i+3].div(c.e3).add(c.d1).log10().pow(3),g.chroma[i+3].div(c.e3).add(c.d1).log(lightData[i].baseScale).add(c.d0_5).pow(c.d2).div(c.d2).add(7/8)).add(c.d1).pow(power.mul(c.d2))
					if (g.achievement[613]) out = out.add(c.d3)
					return out
				},
				group:"light"
			}])
			return Object.fromEntries(out)
		})(),
		r10_11: {
			description:function(){return "Unlock Mastery 104"},
			adjacent_req:["r9_9"],
			condition:[{check:function(){return g.masteryPower.gt("e1000")},text:function(){return g.masteryPower.format()+" / "+BEformat(c.ee3)+" mastery power"}}],
			visibility:function(){return true},
			type:"permanent",
			basecost:N(600),
			icon:"<div style=\"position:absolute;top:0px;left:0px;height:100%;width:100%;background-image:repeating-conic-gradient(var(--mastery),rgba(0,0,0,0) 3.125%,var(--mastery) 6.25%),repeating-radial-gradient(var(--mastery),rgba(0,0,0,0) 10%,var(--mastery) 20%);opacity:0.5\"></div>"
		},
		r10_13:{
			numDesc:function(){return researchEffect(10,13).noLeadFormat(2)},
			formulaDesc:function(){return "10<sup>(log(S + 10)<sup>0.2</sup> - 1) × "+researchPower(10,13).mul(0.07).noLeadFormat(3)+"</sup>"},
			description:function(){return "Stardust boosts hawking radiation gain (currently: "+numOrFormula("r10_13")+"×)"},
			adjacent_req:["r9_14"],
			condition:[studyReq(4,1)],
			visibility:function(){return g.studyCompletions[4]>0},
			type:"normal",
			basecost:N(200),
			icon:icon.stardust+icon.arr+icon.hr,
			effect:function(power){return [g.stardust.add(c.d10).log10().pow(0.2).sub(c.d1),N(0.07),power].productDecimals().pow10()},
			group:"stardust"
		},
		r10_15:{
			numDesc:function(){return researchEffect(10,15).noLeadFormat(2)},
			formulaDesc:function(){return "(log(log(S + 1) + 10,000) - 4) × "+researchPower(10,15).mul(c.d2_5).noLeadFormat(2)},
			description:function(){return "Gain free dark stars based on stardust (currently: "+numOrFormula("r10_15")+")"},
			adjacent_req:["r9_14"],
			condition:[studyReq(4,1)],
			visibility:function(){return g.studyCompletions[4]>0},
			type:"normal",
			basecost:N(200),
			icon:icon.stardust+icon.arr+icon.darkstar,
			effect:function(power){return [g.stardust.add(c.d1).log10().add(c.e4).log10().sub(c.d4),c.d2_5,power].productDecimals()},
			group:"stardust"
		},
		r11_8: {
			description:function(){return "Unlock two additional colors of Light"},
			adjacent_req:["r10_7","r10_8","r10_9"],
			condition:[totalStudyReq(12)],
			visibility:function(){return true},
			type:"permanent",
			basecost:N(2160),
			icon:"<div style=\"position:absolute;top:0px;left:0px;height:100%;width:100%;background-image:conic-gradient(rgba(255,255,255,0.5),rgba(0,0,0,0),rgba(0,0,0,0.5),rgba(0,0,0,0),rgba(255,255,255,0.5))\"></div>"
		},
		r12_8:{
			description:function(){return "Unlock Galaxies"},
			adjacent_req:["r11_8"],
			condition:[{check:function(){return g.stars>=60},text:function(){return g.stars+" / 60 stars"}},{check:function(){return g.ach519possible},text:function(){return "without allocating any of them in the current universe"},joinWithPrevious:true}],
			visibility:function(){return g.achievement[612]},
			type:"permanent",
			basecost:N(5250),
			icon:"<span style=\"font-size:40px\" class=\"_galaxies\">𖦹</span>"
		},
		r13_5:{
			numDesc:function(){return researchEffect(13,5).noLeadFormat(3)},
			formulaDesc:function(){return "(log(L + 1)<sup>2</sup> ÷ 100 + 1)"+expFormat(researchPower(13,5).neg())},
			description:function(){return "Yellow light weakens the second galaxy penalty (currently: ^"+numOrFormula("r13_5")+")"},
			adjacent_req:["r13_7"],
			condition:[lightAugmentReq(5)],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1440),
			icon:icon.lumen(5)+icon.arr+icon.galaxy+classes.xscript("-","<span class=\"_galaxypenalties\">2</span>"),
			effect:function(power){return g.lumens[5].add(c.d1).log10().pow(c.d2).div(c.e2).add(c.d1).pow(power.neg())},
			group:"lightaugment"
		},
		r13_7:{
			numDesc:function(){return researchEffect(13,7).noLeadFormat(3)},
			formulaDesc:function(){return "log(max(L, 10))"+expFormat(researchPower(13,7).neg())},
			description:function(){return "White lumens reduce star costs even further (currently: ^"+numOrFormula("r13_7")+")"},
			adjacent_req:["r12_8"],
			condition:[lightAugmentReq(6)],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1440),
			effect:function(power){return g.lumens[6].max(c.d10).log10().pow(power.neg())},
			icon:icon.lumen(6)+icon.arr+classes.stars(icon.star()+"$"),
			group:"lightaugment"
		},
		r13_8:{
			numDesc:function(){return researchEffect(13,8).noLeadFormat(2)},
			formulaDesc:function(){return c.d2.pow(researchPower(13,8)).noLeadFormat(3)+"<sup>(L<sub>6</sub> × L<sub>7</sub>)<sup>1 ÷ 3</sup></sup>"},
			description:function(){return "Multiply chroma gain by "+numOrFormula("r13_8")+"× (based on black and white lumens)"},
			adjacent_req:["r12_8"],
			condition:[],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1760),
			effect:function(power){return c.d2.pow(Decimal.mul(g.lumens[6],g.lumens[7]).pow(c.d1div3).mul(power))},
			icon:gradientText("L","-webkit-linear-gradient(90deg,#000000,#ffffff)")+icon.arr+icon.chroma(6)
		},
		r13_9:{
			numDesc:function(){return researchEffect(13,9).noLeadFormat(3)},
			formulaDesc:function(){return "log(max(L, 10))"+expFormat(researchPower(13,9))},
			description:function(){return "Black lumens reduce chroma costs even further (currently: ÷"+numOrFormula("r13_9")+")"},
			adjacent_req:["r12_8"],
			condition:[lightAugmentReq(7)],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1440),
			effect:function(power){return g.lumens[7].max(c.d10).log10().pow(power)},
			icon:icon.lumen(7)+icon.arr+classes.stars(icon.chroma(6)+"$"),
			group:"lightaugment"
		},
		r13_11:{
			numDesc:function(){return researchEffect(13,11).sub(c.d1).mul(c.e2).noLeadFormat(2)},
			formulaDesc:function(){return "20 - 20 ÷ (log(log(L + 10)) × "+researchPower(13,11).mul(c.d2).noLeadFormat(3)+" + 1)"},
			description:function(){return "Red lumens boost Stardust Boosts divisible by 3 (currently: "+numOrFormula("r13_11")+"%)"},
			adjacent_req:["r13_9"],
			condition:[lightAugmentReq(0)],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1440),
			icon:icon.lumen(0)+icon.arr+classes.stardust("SB"),
			effect:function(power){return Decimal.convergentSoftcap(g.lumens[0].add(c.d10).log10().log10().mul(c.d2).mul(power),c.d0,c.d1).div(c.d5).add(c.d1)},
			group:"lightaugment"
		},
		r14_6:{
			numDesc:function(){return percentOrMult(researchEffect(14,6),2)},
			formulaDesc:function(){
				let out = "(log(L + 1)<sup>2</sup> ÷ 32 + 1)"+expFormat(researchPower(14,6))
				return researchEffect(14,6).gte(c.d10)?(out+"×"):researchPower(14,6).eq(c.d1)?"log(L + 1)<sup>2</sup> × 3.125%":("100 × ("+out+" - 1)%")
			},
			description:function(){return "Green lumens boost tickspeed (currently: "+numOrFormula("r14_6")+")"},
			adjacent_req:["r13_7"],
			condition:[lightAugmentReq(1)],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1440),
			icon:icon.lumen(1)+icon.arr+icon.tickspeed,
			effect:function(power){return g.lumens[1].add(c.d1).log10().pow(c.d2).div(c.d32).add(c.d1).pow(power)},
			group:"lightaugment"
		},
		r14_10:{
			numDesc:function(){return researchEffect(14,10).format(4)},
			formulaDesc:function(){return "10<sup>log(L + 1)<sup>0.5</sup> × "+researchPower(14,10).div(c.d2).noLeadFormat(3)+"</sup>"},
			description:function(){return "Magenta lumens boost dark Y axis (currently: ^"+numOrFormula("r14_10")+")"},
			adjacent_req:["r13_9"],
			condition:[lightAugmentReq(4)],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1440),
			icon:icon.lumen(4)+icon.arr+icon.darkYAxis,
			effect:function(power){return g.lumens[4].add(c.d1).log10().sqrt().div(c.d2).mul(power).pow10()},
			group:"lightaugment"
		},
		...(()=>{
			let out = {}
			for (let i of [5,11]) out["r15_"+i] = {
				numDesc:function(){return researchEffect(15,i).mul(c.e2).noLeadFormat(2)},
				formulaDesc:function(){return "log(log(L + 10)) × "+researchPower(15,i).mul(c.e2).noLeadFormat(3)},
				description:function(){return (i==11?"Black":"White")+" lumens boost research 13-8 even further (currently: "+numOrFormula("r15_"+i)+"% stronger, additive with 15-"+(i==11?"5":"11")+")"},
				adjacent_req:(i==11)?["r13_11","r14_10","r15_9"]:["r13_5","r14_6","r15_7"],
				condition:[{check:function(){return achievement.ownedInTier(7)>=7},text:function(){return achievement.ownedInTier(7)+" / 7 Tier 7 achievements"}}],
				visibility:function(){return true},
				type:"normal",
				basecost:N(1760),
				icon:icon.lumen(i==11?7:6)+icon.arr+icon.chroma(6),
				effect:function(power){return g.lumens[i==11?7:6].add(c.d10).log10().log10().mul(power)}
			}
			return out
		})(),
		r15_7:{
			numDesc:function(){return researchEffect(15,7).format(2)},
			formulaDesc:function(){return "10<sup>log(L + 1)<sup>0.5</sup> × "+researchPower(15,7).mul(c.d2div3).noLeadFormat(3)+"</sup>"},
			description:function(){return "Cyan lumens boost energy gain (currently: "+numOrFormula("r15_7")+"×)"},
			adjacent_req:["r13_7"],
			condition:[lightAugmentReq(3)],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1440),
			icon:icon.lumen(3)+icon.arr+icon.energy,
			effect:function(power){return g.lumens[3].add(c.d1).log10().sqrt().mul(c.d2div3).mul(power).pow10()},
			group:"lightaugment"
		},
		r15_9:{
			numDesc:function(){return researchEffect(15,9).format(2)},
			formulaDesc:function(){return "(2<sup>L<sup>1 ÷ 3</sup></sup> - 1)"+expFormat(researchPower(15,9))},
			description:function(){return "Blue lumens boost hawking radiation gain (currently: "+numFormat("r15_9")+"×)"},
			adjacent_req:["r13_9"],
			condition:[lightAugmentReq(2)],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1440),
			icon:icon.lumen(2)+icon.arr+icon.hr,
			effect:function(power){return c.d2.pow(g.lumens[2].cbrt()).sub(c.d1).pow(power)},
			group:"lightaugment"
		},
		...(()=>{
			let out = {}
			function pos(num,dark) {
				let row = Math.min(Math.max(17-num,8+num),16)
				let col = (num==0)?4:(num<5)?2:1
				if (dark) col = 16-col
				return "r"+row+"_"+col
			}
			for (let i=0;i<8;i++) {
				let common = {
					condition:[],
					visibility:function(){return true},
					type:"normal",
					basecost:N(300+i*(25+i*5)),
					effect:function(power){return c.d0_8.pow(power)}
				}
				out[pos(i+1,false)] = {
					description:function(){return "The "+axisCodes[i]+" axis cost is raised to the power of "+researchEffect(researchRow(pos(i+1,false)),researchCol(pos(i+1,false))).noLeadFormat(3)},
					adjacent_req:[pos(i,false)],
					icon:icon[axisCodes[i]+"Axis"]+classes.exoticmatter("$")+icon.minus,
					...common
				}
				out[pos(i+1,true)] = {
					description:function(){return "The dark "+axisCodes[i]+" axis cost is raised to the power of "+researchEffect(researchRow(pos(i+1,true)),researchCol(pos(i+1,true))).noLeadFormat(3)},
					adjacent_req:[pos(i,true)],
					icon:icon["dark"+axisCodes[i]+"Axis"]+classes.darkmatter("$")+icon.minus,
					...common
				}
			}
			return out
		})(),
		r16_4:{
			description:function(){return "The S axis effect"+expFormat(researchEffect(16,4))+" affects the Z axis effect"},
			adjacent_req:["r15_5"],
			condition:[],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1500),
			icon:icon.SAxis+icon.arr+icon.ZAxis,
			effect:function(power){return power}
		},
		r16_6:{
			description:timeResearchDesc(16,6,"chroma"),
			adjacent_req:["r16_7"],
			condition:[studyReq(6,2)],
			visibility:function(){return g.studyCompletions[6]>=2},
			type:"normal",
			basecost:N(1440),
			icon:icon.time+icon.arr+icon.chroma(6),
			effect:function(power){return power.div(8.64e6)},
			group:"time"
		},
		r16_7:{
			description:timeResearchDesc(16,7,"hawking radiation"),
			adjacent_req:["r16_8"],
			condition:[studyReq(6,1)],
			visibility:function(){return g.studyCompletions[6]>=1},
			type:"normal",
			basecost:N(720),
			icon:icon.time+icon.arr+icon.hr,
			effect:function(power){return power.div(3.6e5)},
			group:"time"
		},
		r16_8: {
			adjacent_req:["r13_8"],
			condition:[{check:function(){return stat.tickspeed.gt(studies[6].unlockReq())},text:function(){return stat.tickspeed.format(3)+" / "+studies[6].unlockReq().format()+"× tickspeed"}}],
			visibility:function(){return true;},
			type:"study",
			basecost:N(1550),
			icon:icon.study([[10,15,4],[35,30,5],[50,50,6],[65,30,5],[90,15,4],[50,80,7]])
		},
		r16_9:{
			description:timeResearchDesc(16,9,"dark X axis effect"),
			adjacent_req:["r16_8"],
			condition:[studyReq(6,1)],
			visibility:function(){return g.studyCompletions[6]>=1},
			type:"normal",
			basecost:N(720),
			icon:icon.time+icon.arr+icon.darkXAxis,
			effect:function(power){return power.div(3.6e5)},
			group:"time"
		},
		r16_10:{
			description:timeResearchDesc(16,10,"W axis effect"),
			adjacent_req:["r16_9"],
			condition:[studyReq(6,2)],
			visibility:function(){return g.studyCompletions[6]>=2},
			type:"normal",
			basecost:N(1440),
			icon:icon.time+icon.arr+icon.WAxis,
			effect:function(power){return power.div(8.64e6)},
			group:"time"
		},
		r16_12:{
			description:function(){return "Dark stars are "+researchEffect(16,12).noLeadFormat(2)+"× cheaper"},
			adjacent_req:["r15_11"],
			condition:[],
			visibility:function(){return true},
			type:"normal",
			basecost:N(1500),
			icon:icon.darkstar+classes.darkmatter("$")+icon.minus,
			effect:function(power){return c.d2.pow(power)}
		},
		...(()=>{
			let out = {}
			for (let r=1;r<8;r++) for (let c=1;c<=r;c++) for (let d of [true,false]) {
				let row = 17+r-c
				let col = d?(16-c):c
				let adj = []
				if (row>17||c==1) adj.push("r"+(row-1)+"_"+col)
				if (c>1) adj.push("r"+row+"_"+(col+(d?1:-1)))
				let a1 = axisCodes[r]    // the axis based on which costs are reduced
				let a2 = axisCodes[c-1]  // the axis which has its costs reduced
				out["r"+row+"_"+col] = {
					description:function(){let eff=researchEffect(row,col);return "The "+(d?"dark ":"")+a2+" axis cost is lowered to the (1 + ["+(d?"dark ":"")+a1+" axis]"+(eff.eq(1)?"":eff.gt(1)?(" × "+eff.noLeadFormat(3)):(" ÷ "+eff.recip().noLeadFormat(3)))+")th root (currently: "+this.value().noLeadFormat(4)+"th)"},
					adjacent_req:adj.sort(),
					condition:[],
					visibility:function(){return betaActive},
					type:"normal",
					basecost:N(250+25*(r+c)),
					icon:icon[(d?"dark":"")+a1+"Axis"]+icon.arr+icon[(d?"dark":"")+a2+"Axis"]+classes[(d?"dark":"exotic")+"matter"]("$"),
					effect:function(power){return power.div((d?[5e3,6e3,2e3,4e3,800,5e3,80]:[12500,2e4,8e3,8e4,3e4,2e5/3,200])[r-1])},
					value:function(){return researchEffect(row,col).mul(stat["real"+(d?"dark":"")+a1+"Axis"]).add(1)},
					a1:a1,a2:a2,
					group:"spatialsynergism"+(d?"dark":"light")
				}
			}
			return out
		})()
	}
})();
const researchList = Object.keys(research).filter(x=>x!=="r6_9")
const nonPermanentResearchList = researchList.filter(x=>research[x].type!=="permanent")
const permanentResearchList = researchList.filter(x=>research[x].type=="permanent")
function validateResearch(x) {
	function out(txt){error("Research "+x+" has an invalid <samp>"+txt+"</samp> property")}
	let res=research[x]
	if(!["normal","permanent","study"].includes(res.type)){out("type")}
	if(res.type=="study"){if(res.description!==undefined)out("description")}
	else{if(typeof res.description!=="function")out("description")}
	if(typeof res.adjacent_req!=="object"){out("adjacent_req")}
	if(typeof res.condition!=="object"){out("condition")}
	for(let i=0;i<res.condition.length;i++){
		let j=res.condition[i]
		if(typeof j!=="object"){out("condition["+i+"]")}
		if(typeof j.check!=="function"){out("condition["+i+"].check")}
		if(typeof j.text!=="function"){out("condition["+i+"].text")}
	}
	if(typeof res.visibility!=="function"){out("visibility")}
	if(typeof res.visibility()!=="boolean"){out("visibility")}
	if(!(res.basecost instanceof Decimal)){out("basecost")}
	if(typeof res.icon!=="string"){out("icon")}
}
const researchGroupList = {
	energy:{label:"Energy",description:"Each Energy research owned doubles the cost of all other Energy research.",color:"var(--energy)",icon:"E"},
	light:{label:"Light",get description(){return "Each Light research owned multiplies the cost of all other Light research in the same row by "+(g.achievement[713]?achievement(713).effectFormat(achievement(713).effect()):"4")+"."},color:"#ffff00",icon:"L"},
	stardust:{label:"Stardust",get description(){return "Each Stardust research owned doubles the cost of all other Stardust research."+((g.studyCompletions[4]==4)?"":(" If your number of Stardust research is greater than or equal to your Study IV completions ("+g.studyCompletions[4]+") their cost is increased even further."))},color:"#ff9900",icon:"S"},
	lightaugment:{label:"Light Augmentation",description:"Each Light Augmentation multiplies the cost of all other Light Augmentation research by the number already owned, and increases the lumen requirements to buy them.",color:"#cccc00",icon:"LA"},
	time:{label:"Time",get description(){return "You can buy a maximum of "+g.studyCompletions[6]+" Time research (equal to Study VI completions)"},color:"var(--time)",icon:"t"},
	spatialsynergismlight:{label:"Spatial Synergism (Light)",get description(){return "You can buy a maximum of "+achievement.perAchievementReward[8].currentVal+" research from this group"},color:"var(--exoticmatter)",icon:"A",effectors:Object.fromEntries(axisCodes.map(x=>[x,nonPermanentResearchList.filter(y=>research[y].group=="spatialsynergismlight"&&research[y].a2==x)]))},
	spatialsynergismdark:{label:"Spatial Synergism (Dark)",get description(){return "You can buy a maximum of "+achievement.perAchievementReward[8].currentVal+" research from this group"},color:"var(--darkmatter)",icon:"A",effectors:Object.fromEntries(axisCodes.map(x=>[x,nonPermanentResearchList.filter(y=>research[y].group=="spatialsynergismlight"&&research[y].a2==x)]))}
}
function resizeResearch(x){
	let size = 15
	let elem = d.element("button_research_"+x+"_visible")
	while (true) {
		d.element("foo").innerHTML = elem.innerHTML
		d.element("foo").style["font-size"] = elem.style["font-size"]
		if (d.element("foo").offsetWidth > 54) {
			size--
			elem.style["font-size"] = size+"px"
			if (size==0) break
		} else {
			break
		}
	}
}
function ownedResearchInGroup(x) {
	return researchGroupList[x].contents.filter(x=>g.research[x])
}
function researchPower(row,col) {
	let out = c.d1;
	if (row==1&&[3,8,13].includes(col)) { // prevent targeting study V research
		if (achievement.ownedInTier(5)>=21) out = out.mul(totalAchievements/1000+1)
		if (g.research.r8_11) out = out.mul(researchEffect(8,11).mul(g.stars).div(c.e2).add(c.d1))
	}
	if (achievement.ownedInTier(5)>=24&&row==2) out = out.mul(totalAchievements/500+1);
	if (row==8&&col==2) {
		if (g.achievement[605]) out = out.mul(c.d1_1)
		if (g.studyCompletions[6]>0) out = out.mul(studies[6].reward(3).mul(stat.totalDarkAxis).div(c.e2).add(c.d1))
	}
	if (row==7&&col==5&&g.achievement[616]) out = out.mul(1+totalResearch.overall/300)
	if (row==13&&col==8) {
		let mult = c.d1
		if (g.research.r15_5) mult = mult.add(researchEffect(15,5))
		if (g.research.r15_11) mult = mult.add(researchEffect(15,11))
		out = out.mul(mult)
	}
	return out;
}
function researchEffect(row,col) {
	return research["r"+row+"_"+col].effect(researchPower(row,col));
}
function researchCost(x) {
	// locking
	if (research[x].group=="time") if (ownedResearchInGroup("time").length>=g.studyCompletions[6]) return c.maxvalue
	if (["spatialsynergismlight","spatialsynergismdark"].includes(research[x].group)) if (ownedResearchInGroup(research[x].group).length>=achievement.perAchievementReward[8].currentVal) return c.maxvalue
	// base
	let output = research[x]["basecost"];
	// class modifiers
	if (research[x].group=="energy") {
		output=output.mul(c.d2.pow(ownedResearchInGroup("energy").length))
	} else if (research[x].group=="stardust") {
		let base = (x=>x<0?c.d2:[c.d4,c.d7,c.d11,c.d16,c.d24][x])(ownedResearchInGroup("stardust").length-g.studyCompletions[4])
		output=output.mul(base.pow(ownedResearchInGroup("stardust").length))
	} else if (research[x].group=="light") {
		let mult = g.achievement[713]?achievement(713).effect():c.d4
		output=output.mul(mult.pow(ownedResearchInGroup("light").filter(i=>researchRow(i)==researchRow(x)).length))
	} else if (research[x].group=="lightaugment") {
		let mult = 1
		for (let i=2;i<=ownedResearchInGroup("lightaugment").length;i++) mult*=i
		output=output.mul(mult)
	}
	// hyper 2
	if ((researchRow(x)>7)&&(researchRow(x)<13)) output = output.mul(achievement.perAchievementReward[6].currentVal)
	if (x=="r9_2") output = output.mul(2**studyPower(3))
	if (x=="r9_14") output = output.mul(1.5**studyPower(4))
	if (StudyE(5)&&research[x].type=="normal") output = output.mul(studies[5].difficultyConstant())
	for (let i of ["r1_5","r1_6","r1_10","r1_11"]) if (g.research[i]) output = output.mul(researchEffect(1,researchCol(i)))
	// hyper 1
	output = output.sub(studies[5].reward(3))
	if (research[x].group=="lightaugment"&&g.achievement[712]) output = output.sub(ownedResearchInGroup("lightaugment").length*35)
	return output.max(c.d0).ceil();
}
const researchRows = Object.keys(research).map(x => researchRow(x)).reduce((x,y)=>Math.max(x,y));
function toggleResearchCell(row,col,mode) {
	let root = "button_research_r"+row+"_"+col+"_";
	d.display(root+"visible",mode=="visible"?"inline-block":"none");
	d.display(root+"unknown",mode=="unknown"?"inline-block":"none");
}
function researchRowsUnlocked() {
	return unknownResearch().map(x => researchRow(x)).reduce((x,y)=>Math.max(x,y))
}
var buyableResearchWithCondition = []
var buyablePermanentResearch = []
const researchCanvas = d.element("researchCanvas");
const researchContext = researchCanvas.getContext("2d");
function updateResearchTree() {
	buyableResearchWithCondition = Object.keys(research).filter(x=>(research[x].condition.length>0)&&visibleResearch().includes(x)&&(!g.research[x]))
	buyablePermanentResearch = Object.keys(research).filter(x=>(research[x].type=="permanent")&&researchAdjacentTest(x)&&(!g.research[x]))
	d.element("researchContainer").style.height = (74*researchRowsUnlocked())+"px"
	let visible = visibleResearch()
	let unknown = unknownResearch()
	for (let row=1;row<=researchRows;row++) {
		if (row>researchRowsUnlocked()) {
			d.tr("researchRow"+row,false);
		} else {
			d.tr("researchRow"+row,true);
			for (let col=1;col<16;col++) {
				let id="r"+row+"_"+col;
				if (research[id]==undefined) {
					continue;
				} else if (!unknown.includes(id)) {
					toggleResearchCell(row,col,"none");
				} else if (!visible.includes(id)) {
					toggleResearchCell(row,col,"unknown");
				} else {
					toggleResearchCell(row,col,"visible");
					if (g.research[id]) {
						d.element("button_research_"+id+"_visible").style["background-color"] = "#005500";
					} else {
						d.element("button_research_"+id+"_visible").style.removeProperty("background-color");
					}
					d.element("button_research_"+id+"_visible").style.opacity = ((id=="r6_9")&&(!g.research.r6_9))?0:1;
					d.element("button_research_"+id+"_visible").style.filter = "brightness("+(darkenResearch(id,visible)?50:100)+"%)";
				}
			}
		}
	}
}
function generateResearchCanvas() {
	researchCanvas.style.height = (researchRowsUnlocked()*74)+"px";
	researchCanvas.height = researchRowsUnlocked()*74;
	researchContext.clearRect(0, 0, researchCanvas.width, researchCanvas.height);
	let count = 0;
	for (let res of visibleResearch()) {
		if (res=="r6_9") continue;
		for (let res2 of research[res].adjacent_req) if (visibleResearch().includes(res2)) {
			if (res2=="r6_9") continue;
			researchContext.moveTo(researchCol(res)*74-37,researchRow(res)*74-37);
			researchContext.lineTo(researchCol(res2)*74-37,researchRow(res2)*74-37);
			count++;
		}
	}
	researchContext.strokeStyle = "#FFFFFF";
	researchContext.lineWidth = 2;
	researchContext.stroke();
}
const rootResearch = Object.keys(research).filter(x=>research[x].adjacent_req.length==0)
function visibleResearch() {
	let out = new Set(); 
	let res = g.researchVisibility;
	for (let next of Object.entries(research)) {
		if (!next[1].visibility()) continue;
		if (res.includes(next[0])) out.add(next[0]);
		for (let j of next[1].adjacent_req) if (res.includes(j)) out.add(next[0]);
	}
	for (let i of rootResearch) if (research[i].visibility()) out.add(i)
	return Array.from(out);
}
function unknownResearch() {
	let out = new Set();
	let res = visibleResearch();
	for (let next of Object.entries(research)) {
		if (!next[1].visibility()) continue;
		if (res.includes(next[0])) out.add(next[0]);
		for (let j of next[1].adjacent_req) if (res.includes(j)) out.add(next[0]);
	}
	return Array.from(out);
}
function researchConditionMet(id,num) {
	let arr = research[id].condition
	if (typeof arr[num] == "undefined") {error("Cannot access researchConditionMet("+id+","+num+")")}
	if ((arr[num].joinWithPrevious==true)&&(!researchConditionMet(id,num-1))) {return false}
	return arr[num].check()
}
function researchConditionsMet(id) {
	return !research[id].condition.map(x=>x.check()).includes(false)
}
function darkenResearch(id,visible=visibleResearch()) {
	return (!g.research[id])&&(researchCost(id).gt((research[id].type=="permanent")?g.totalDiscoveries:unspentDiscoveries())||(!researchConditionsMet(id))||(!availableResearch(researchRow(id),researchCol(id))))
}
function showResearchInfo(row,col) {
	let id="r"+row+"_"+col
	let res=research[id];
	if (row==6&&col==9&&(!g.research.r6_9)) return;
	let out1 = [];
	let out2 = [];
	let researchName = "Research "+row+"-"+col
	if (res.group!==undefined) {
		out1.push("<span style=\"font-size:10px;color:"+researchGroupList[res.group].color+"\">"+researchGroupList[res.group].label+" "+researchName+"</span>")
	} else if (res.type=="normal") {
		out1.push("<span style=\"font-size:10px;color:#00ff00\">"+researchName+"</span>");
	} else if (res.type=="permanent") {
		out1.push("<span style=\"font-size:10px;color:#ffffff\">Permanent "+researchName+"<br>This research will not be refunded upon respec.</span>");
	} else if (res.type=="study") {
		out1.push("<span style=\"font-size:10px;color:#ff0000\">Study "+researchName+"<br>Purchasing this will unlock a Study. If you can do a Wormhole reset under special restrictions, you will gain a permanent reward.</span>");
	}
	if (res.group !== undefined) out1.push("<span style=\"font-size:10px;color:"+researchGroupList[res.group].color+"\">"+researchGroupList[res.group].description+"</span>")
	out1.push(res.type=="study"?fullStudyNames[studies.filter(x=>x!==null).map(x=>x.research).indexOf(id)+1]:res.description());
	if (res.type == "permanent") {out2.push("Need "+researchCost(id).format()+" total Discover"+(researchCost(id).eq(c.d1)?"y":"ies"))}
	else {out2.push("Cost: "+researchCost(id).format()+" Discover"+(researchCost(id).eq(c.d1)?"y":"ies"))}
	if (res.condition.length>0) {
		let out = "<span style=\"font-size:12px\"><span style=\"color:"+(researchConditionsMet(id)?"#00cc00":"#cc0000")+"\">Need</span> "
		for (let i=0;i<res.condition.length;i++) {
			if (i>0) {out+=(res.condition[i].joinWithPrevious??false)?" ":("<span style=\"color:"+((res.condition[i].check()&&res.condition[i-1].check())?"#00cc00":"#cc0000")+"\">; </span>")}
			out+="<span style=\"color:"+(researchConditionMet(id,i)?"#00cc00":"#cc0000")+"\">"+res.condition[i].text()+"</span>"
		}
		out2.push(out+"</span>");
	}
	out2.push(g.research[id]?"<span style=\"color:#66ff66\">(Owned)</span>":"<span style=\"color:#ff6666\">(Unowned)</span>");
	d.innerHTML("researchInfo","<table style=\"table-layout:fixed\"><tr><td style=\"width:49vw;height:60px\">"+out1.join("<br>")+"</td><td style=\"width:49vw;height:60px\">"+out2.join("<br>")+"</td></tr></table>");
}
function unknownResearchInfo() {d.innerHTML("researchInfo","<p style=\"color:#999999\">Buy a Research adjacent to this to reveal this</p>");}
function respecResearch() {
	g.spentDiscoveries=c.d0;
	for (let i of nonPermanentResearchList) g.research[i] = false;
	totalResearch.temporary=0
	updateResearchTree();
}
const baseObservationCostRatios = [
	[c.ee5,c.d0_1,c.d4],
	[c.ee3,c.d0_5,c.d2],
	[c.ee3,c.d0_2,c.d3],
	[c.d2,c.d1,c.d1]
];
function observationCostRatios(type) {
	let out = [...baseObservationCostRatios[type]]
	out[0] = out[0].pow(studies[5].reward(2))
	return out
}
function observationCost(type,amount) {
	if (amount == undefined) amount = g.observations[type];
	let ratios = observationCostRatios(type);
	return [ratios[0],amount.mul(ratios[1]).add(c.d1),ratios[2]].decimalPowerTower();
}
var observationResources = ["exoticmatter","stardust","darkmatter","hawkingradiation"];
function maxAffordableObservations(type) {
	let resource = observationResources[type];
	let ratios = observationCostRatios(type);
	if (g[resource].lt(ratios[0])) return c.d0;
	return g[resource].log(ratios[0]).root(ratios[2]).sub(c.d1).div(ratios[1]).add(c.d1).floor();
}
function buyMaxObservations(type) {
	let resource = observationResources[type];
	let newvalue = maxAffordableObservations(type);
	if (newvalue.lte(g.observations[type])) return;
	g.observations[type]=newvalue;
}
function discoveriesFromKnowledge(x) {
	x=(x==undefined)?g.knowledge:N(x);
	let base = g.knowledge.lt(c.d1)?c.d0:g.knowledge.log10();
	return base.add(stat.extraDiscoveries_add).mul(stat.extraDiscoveries_mul).max(1);
}
function nextDiscovery(x) {
	x=(x==undefined)?g.totalDiscoveries:N(x);
	let real = x.add(c.d1).div(stat.extraDiscoveries_mul).sub(stat.extraDiscoveries_add);
	return real.max(0).pow10();
}
function unspentDiscoveries() {
	return g.totalDiscoveries.sub(g.spentDiscoveries);
}
function researchAdjacentTest(id) {
	if (research[id].type=="normal") return g.research[id]
	else return research[id].adjacent_req.map(x=>researchAdjacentTest(x)).includes(true)
}
function availableResearch(row,col) {
	let adjacents = research["r"+row+"_"+col]["adjacent_req"];
	if (adjacents.length==0) return true;
	let adjacent_test = false;
	for (let i of adjacents) if (researchAdjacentTest(i)) adjacent_test = true;
	return adjacent_test																														// check if research purchase requirement is met
}
function allParentResearch(row,col) {		// This returns all "parent" research; i.e. the "adjacent requirements" of the research, the adjacent requirements of the adjacent requirements and so on.
	let out = ["r"+row+"_"+col];
	while (true) {
		let before = out;
		let nextOut = new Set(out);
		for (let current of out) for (let j of research[current].adjacent_req) nextOut.add(j);
		nextOut = Array.from(nextOut);
		if (Array.equal(before,nextOut)) return nextOut.reverse();
		else out = nextOut;
	}
}
function buySingleResearch(row,col,force=false) {
	let id = "r"+row+"_"+col;
	if (research[id]==undefined) return;					// research does not exist
	if ((!availableResearch(row,col))&&(!force)) return;			// prerequisite research not owned
	if (!researchConditionsMet(id)) return				// special requirement not met		
	if (g.research[id]) return;										// research already owned
	let cost = researchCost(id);
	if (research[id].type=="permanent") {
		if (cost.gt(g.totalDiscoveries)) return;		// not enough discoveries
		totalResearch.permanent++
	} else {
		if (cost.gt(unspentDiscoveries())) return;	// research too expensive
		o.add("spentDiscoveries",cost);
		if (id!=="r6_9") totalResearch.temporary++
	}
	g.research[id] = true
	if (research[id].type == "study"){
		unlockFeature("Studies",true);
		updateAllStudyDivs()
	}
	let regenerateCanvas = false;
	if (!g.researchVisibility.includes(id)) {
		g.researchVisibility.push(id);
		regenerateCanvas = true;
	}
	for (let ach of achievementEvents.researchBuy) addAchievement(ach);
	for (let ach of secretAchievementEvents.researchBuy) addSecretAchievement(ach);
	return regenerateCanvas;
}
function buyResearch(row,col,max=g.buyMaxResearch) {
	let regenerateCanvas = false
	if (max) {
		let toBePurchased = allParentResearch(row,col).filter(x => (!g.research[x] && research[x].type == "normal") || (x == "r"+row+"_"+col));
		for (let i of toBePurchased) regenerateCanvas = regenerateCanvas || buySingleResearch(researchRow(i),researchCol(i));
	} else {
		regenerateCanvas = buySingleResearch(row,col);
	}
	updateResearchTree();
	if (regenerateCanvas) generateResearchCanvas();
}
function researchRow(code) {								 // gets the row number of a research code, eg "r5_7" returns 5
	return Number(code.split("_")[0].substring(1));
}
function researchCol(code) {								 // gets the column number of a research code, eg "r5_7" returns 7
	return Number(code.split("_")[1]);
}
function researchOut(code) {								 // converts an internal research code to an output code, eg "r5_7" returns "5-7"
	return researchRow(code)+"-"+researchCol(code);
}
function researchInt(code) {								 // converts an output research code to an internal code, eg "5-7" returns "r5_7"
	return "r"+code.replace("-","_");
}
var showingResearchLoadouts = false
var researchLoadoutSelected = 1
const researchLoadoutPopupText = "<button class=\"observation\" onClick=\"researchLoadouts.renameHTML()\">Rename this Loadout</button><button class=\"observation\" onClick=\"researchLoadouts.importHTML()\">Import into this Loadout</button><button class=\"observation\" onClick=\"researchLoadouts.export(true)\">Export this Loadout</button><button class=\"observation\" onClick=\"researchLoadouts.save()\">Save current build to this Loadout</button><button class=\"observation\" onClick=\"researchLoadouts.load()\">Load this Loadout</button>"
const researchLoadouts = {
	open:function() {
		showingResearchLoadouts = true
		let text = ""
		for (let i=0;i<9;i++) {
			let loadout = g.researchLoadouts[i]
			text+="<div class=\"researchLoadout\" id=\"div_researchLoadout"+(i+1)+"\" onClick=\"researchLoadoutSelected="+(i+1)+"\"><span class=\"font-size:21px\">"+loadout.name+"</span></div>"
		}
		text+="<br>"+researchLoadoutPopupText
		popup({
			text:text,
			buttons:[["Close","showingResearchLoadouts=false"]]
		})
	},
	renameHTML:function() {
		showingResearchLoadouts=false
		popup({
			text:"What do you want to rename "+g.researchLoadouts[researchLoadoutSelected-1].name+" to?",
			input:g.researchLoadouts[researchLoadoutSelected-1].name,
			buttons:[["Confirm","researchLoadouts.rename(popupInput());researchLoadouts.open()"],["Close","researchLoadouts.open()"]]
		})
	},
	rename: function(name){
		if (name.length>40) popup({text:"Maximum of 40 characters in research loadout names!",buttons:[["Close","researchLoadouts.open()"]]})
		else g.researchLoadouts[researchLoadoutSelected-1].name = name
	},
	importHTML: function(){
		showingResearchLoadouts=false
		popup({
			text:"Import a Research loadout here",
			input:"",
			buttons:[["Confirm","researchLoadouts.import(popupInput())"],["Close",""]]
		})
	},
	import: function(string) {
		let parts = string.split("|")
		if (parts.length==1) {
			g.researchLoadouts[researchLoadoutSelected-1].savedResearch = string.split(",")
		} else if (parts.length==2) {
			researchLoadouts.rename(parts[0])
			g.researchLoadouts[researchLoadoutSelected-1].savedResearch = parts[1].split(",")
		} else {
			notify("Invalid import.","var(--research)")
		}
	},
	export: function(showPopup){
		showingResearchLoadouts=false
		let loadout = g.researchLoadouts[researchLoadoutSelected-1]
		let string = loadout.name+"|"+loadout.savedResearch.join(",")
		if (showPopup) openExport(string)
		else return string
	},
	save:function(){
		showingResearchLoadouts=false
		g.researchLoadouts[researchLoadoutSelected-1].savedResearch = nonPermanentResearchList.filter(x=>g.research[x])
		popup({text:"Successfully saved!",buttons:[["Close","researchLoadouts.open()"]]})
	},
	load:function(string){
		showingResearchLoadouts=false
		function buy(id) { // buys only 1 adjacent research and only if one is not already owned
			if (g.research[id]) return
			let [r,c] = [researchRow(id),researchCol(id)]
			if (!availableResearch(r,c)) {
				let adj = id
				console.log(adj)
				do {
					adj = research[adj].adjacent_req[0]
					console.log(adj)
				} while ((research[adj].type!=="normal")&&(research[adj].adjacent_req.length>0))
				buy(adj)
			}
			buyResearch(r,c,false)
		}
		for (let i of g.researchLoadouts[researchLoadoutSelected-1].savedResearch) buy(i)
		popup({text:"Successfully loaded!",buttons:[["Close",""]]})
	}
}
function exportResearch() {
	popup({text:"Here is your research build:",input:Object.keys(research).filter(x=>g.research[x]).join(","),buttons:[["Close",""]]})
}
function importResearch() {
	popup({
		text:"Import your research build here:",
		input:"",
		buttons:[
			["Confirm","let researchBuild = popupInput().split(',');for (let i of researchBuild) buyResearch(researchRow(i),researchCol(i))"],
			["Close",""]
		]
	})
}
function researchAccessibleName(id) {
	let res = research[id]
	let out = "Research "+researchOut(id)
	if (res.adjacent_req.length>0) out += ", branches off "+res.adjacent_req.map(x=>researchOut(x)).joinWithAnd()
	return out
}