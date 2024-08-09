"use strict";
const study13 = {
	name:function(){
		let available = study13.allBindings.filter(x=>g.study13Bindings[x]&&(x!==25)).map(x=>Number(x))
		let lvExcl25 = studyPower(13)-(g.study13Bindings[25]?56:0)
		if (lvExcl25===0) {return g.study13Bindings[25]?"Space (56)":"The First Study (0)"}
		if (lvExcl25===24) {return g.study13Bindings[25]?"Time Dimension (80)":"Dreamers' Galaxy (24)"}
		if (lvExcl25===56) {return g.study13Bindings[25]?"The Sea of Lifeblood Where Miracles Reflect (112)":"The Amazing Mirror (56)"}
		if (lvExcl25===96) {return g.study13Bindings[25]?"Aeon, the Realmstone of Achievements (152)":"Pure Achievement 〜 Whereabouts of the Tenth (96)"}
		if (lvExcl25===144) {return g.study13Bindings[25]?"Matrix of the Four Triads (200)":"Study of Triads (144)"}
		if (lvExcl25===200) {return g.study13Bindings[25]?("Approach It Not, Gaze Not Upon It; Heaven Lies Hidden Beyond This Brave Old World 〜 "+g.playerName+"'s Device (256)"):"Thirteenth Hell 〜 Development Hell (200)"}
		let used = []
		function bindingRank(id) {return (id===25)?Infinity:(Math.floor(id/10)*100+Math.min(id%10,10-(id%10))*9+study13.bindings[id].lv*11+Math.sin(id))} // use this to identify the strongest bindings
		while ((available.length>0)&&(used.length<3)) { // we will only ever use 3 so use an O(n) method instead of sorting which is O(n^2)
			let maxRank = available.map(x=>bindingRank(x)).reduce((x,y)=>Math.max(x,y))
			let next = available.filter(x=>bindingRank(x)===maxRank)[0]
			available.remove(next)
			used.push(next)
		}
		let base
		if ([3,15,28,44,61,81,102,126,151,179].includes(lvExcl25)) {base = study13.bindings[used[0]].nameMod[0]+" and "+study13.bindings[used[1]].nameMod[0]}
		else if ([6,18,32,48,66,86,108,132,158,186].includes(lvExcl25)) {base = study13.bindings[used[0]].nameMod[0]+", "+study13.bindings[used[1]].nameMod[0]+" and "+study13.bindings[used[0]].nameMod[1]+" "+study13.bindings[used[2]].nameMod[0]}
		else if ([9,21,36,52,71,91,114,138,165,193].includes(lvExcl25)) {let out = [];for (let i=0;i<3;i++) {for (let j=2;j>0;j--) {out.push(study13.bindings[used[i]].nameMod[j])}};base = out.sort((a,b)=>(b.includes("'")?1:0)-(a.includes("'")?1:0)).join(" ")+" "+study13.bindings[used[0]].nameMod[0]}
		else if ([12,40,76,120,172].includes(lvExcl25)) {base = study13.bindings[used[0]].nameMod[1]+" "+study13.bindings[used[0]].nameMod[0]}
		else {
			/*
			where [1], [2] and [3] are the strongest, second-strongest and third-strongest bindings (where strength = level),
			the name of any Study XIII combination is determined by "[2] [name] [preposition] [3] [1]"
			*/
			function basename(ids){
				if (Math.sqrt(ids.sum())%1<0.1) {return study13.bindings[used[0]].nameMod[0]+" 〜"}
				const names = [
					[ids.length+" Bindings",["in","of"]],
					["Challenge",["in","of"]],
					["Dimension",["〜","beyond","of"]],
					["Dreams",["in","of"]],
					["Enclave",["beyond","in"]],
					["Experience",["of","with"]],
					["Game",["of"]],
					["Hindrance",["in","of"]],
					["Matriculation",["in","of","to","through"]],
					["Offering",["to"]],
					["Place",["in","of"]],
					["Reality",["〜","of"]],
					["Realm",["〜","before","beyond","in","of"]],
					["Rift",["beyond","in","of","past","through"]],
					["Study",["in","of"]],
					["Subspace",["〜","in"]],
					["Theory",["〜","of"]],
					["Trial",["〜","by","in","of"]],
					["Tribute",["to"]],
					["Universe",["〜","beyond","of"]],
					["World",["〜","beyond","in","of"]],
					["Wormhole",["from","to"]],
					["Void",["〜"]]
				]
				let num = ids.map((x,i)=>x*(x+1)*((i%22)+1)).sum()
				let pos = num%names.length
				return names[pos][0]+" "+names[pos][1][num%names[pos][1].length]
			}
			base = "[1]"+basename([...available,...used])+"[2][0]"
			for (let i=0;i<3;i++) {base = base.replace("["+i+"]",(used.length>i)?(" "+study13.bindings[used[i]].nameMod[i]+" "):"")}
		}
		base = capitalize(base.trim())
		if (g.study13Bindings[25]) {
			let special25Name = ["Crystallized Space","Crystallized Time","Game of Life","Great Realm","Matrix"][Math.floor(Math.sqrt(25+lvExcl25)*1438)%5]
			base = special25Name+" \""+base+"\""
		}
		return base+" ("+studyPower(13)+")"
	},
	activeT3:"bindings",
	openT3:function(name) {
		this.activeT3=name
		for (let i of d.class("tier3tab wormhole_study13")) i.style.display="none";
		d.display("tier3tab_wormhole_study13_"+name,"inline-block");
		for (let i of d.class("tabtier3 wormhole_study13")) i.style.filter = "brightness(60%)"
		d.element("button_tier3tab_wormhole_study13_"+name).style.filter = "brightness(100%)"
		updateHTML()
	},
	totalActiveBindings:function(){return Object.values(g.study13Bindings).map(x=>x?1:0).sum()},
	bindingEff:function(id){return study13.bindings[id].effect(study13.bindingPower(id))},
	...(()=>{
		function numOrFormula(id) {return showFormulas?formulaFormat(study13.bindings[id].formulaDesc()):study13.bindings[id].numDesc()}
		function studyIcon(num) {return research[(num===10)?"r27_8":studies[num].research].icon.replaceAll("studyDot","studyDot binding")}
		let metaBindings = {}
		function metaBinding(thisID,targetIDs,adjacent_req,lv,powerDiv,nameMod,bindingIcon=(targetIDs.length===1)?targetIDs[0]:("<div style=\"position:relative;top:0.5em\">"+targetIDs.join("<br>")+"</div>")){
			for (let i of targetIDs) {
				if (metaBindings[i]===undefined) {metaBindings[i]=[]}
				metaBindings[i].push(thisID)
			}
			return {
				description:function(){return "Binding"+((targetIDs.length===1)?"":"s")+" "+targetIDs.joinWithAnd()+" "+((targetIDs.length===1)?"is":"are")+" "+study13.bindingEff(thisID).mul(c.e2).noLeadFormat(3)+"% stronger per binding level (total: "+[study13.bindingEff(thisID),c.e2,N(studyPower(13))].productDecimals().noLeadFormat(3)+"%)"},
				adjacent_req:adjacent_req,
				icon:icon.binding+icon.arr+classes.binding("B"+classes.sub(bindingIcon)),
				lv:lv,
				effect:function(power){return power.div(powerDiv)},
				nameMod:nameMod
			}
		}
		let researchBindings = {}
		function researchBinding(thisID,resID,resIcon,adjacent_req,basePow,nameMod,lv=1){
			researchBindings[resID] = thisID
			return {
				description:function(){return "Research "+researchOut(resID)+" is "+percentOrDiv(study13.bindingEff(thisID),3)+" weaker"},
				adjacent_req:adjacent_req,
				icon:icon.research+classes.xscript("-",resIcon)+"<br><span class=\"small\">"+classes.research(researchOut(resID))+"</span>",
				lv:lv,
				effect:function(power){return basePow.pow(power)},
				nameMod:nameMod
			}
		}
		return {
			metaBindings:metaBindings,
			researchBindings:researchBindings,
			bindings:{
				15:{
					numDesc:function(){return study13.bindingEff(15).noLeadFormat(3)},
					formulaDesc:function(){return "("+N(5e5).format()+" ÷ (log<sup>[2]</sup>(EM + 10)<sup>2</sup> + 1) + 1)"+formulaFormat.exp(study13.bindingPower(15))},
					description:function(){return "All dark axis costs are raised to the power of "+numOrFormula(15)+" (reduced by exotic matter)"},
					adjacent_req:[],
					icon:icon.exoticmatter+classes.sup("-1")+icon.arr+classes.darkmatter("A$"),
					lv:1,
					effect:function(power){return N(5e5).div(g.exoticmatter.add(c.d10).log10().log10().pow(c.d2).add(c.d1)).add(c.d1).pow(power)},
					nameMod:["Space","Dimensional","Axiomatic"]
				},
				24:{
					description:function(){return "Each star raises the star cost to the power of "+study13.bindingEff(24).noLeadFormat(3)},
					adjacent_req:[15],
					icon:icon.star("")+classes.stardust("$")+icon.plus,
					lv:1,
					effect:function(power){return c.d1_1.pow(power)},
					nameMod:["Stars","Stellar","Blazing"]
				},
				25:{
					description:function(){return "Exotic matter and dark matter gain as well as total exotic and dark axis cost divisors are mapped by "+formulaFormat("x → max(log<sup>["+study13.bindingEff(25).noLeadFormat(4)+"]</sup>(x), 0)")},
					adjacent_req:[],
					icon:(()=>{
						function f(x){return "<div style=\"height:14px;\"><table><tr><td style=\"height:18px;width:18px;font-size:14px;vertical-align:center;text-align:center;padding:0px;color:"+x+";\">◉</td></tr></table></div>"}
						return f("#556677")+"<br>"+f("#3333ff")+f("#00cc00")+"<br>"+f("#996600")
					})(),
					lv:56,
					effect:function(power){return power.div(c.d40)},
					// Binding 25 does not affect names in the normal way
				},
				26:{
					description:function(){return "The dark star requirement is raised to the power of "+study13.bindingEff(26).noLeadFormat(3)},
					adjacent_req:[15],
					icon:icon.darkstar+classes.darkmatter("$")+icon.plus,
					lv:2,
					effect:function(power){return c.d1_1.pow(power)},
					nameMod:["Darkness","Lightless","Dim"]
				},
				33:{
					description:function(){return "Spatial Synergism research from the dark side are "+percentOrDiv(study13.bindingEff(33))+" weaker"},
					adjacent_req:[24],
					icon:classes["wormhole_noGlow"]("SS")+classes.xscript("-",icon.darkaxis),
					lv:2,
					effect:function(power){return c.d0_25.pow(power)},
					nameMod:["Synergy","Dark","Platonic"]
				},
				37:{
					description:function(){return "Spatial Synergism research from the exotic side are "+percentOrDiv(study13.bindingEff(33))+" weaker"},
					adjacent_req:[26],
					icon:classes["wormhole_noGlow"]("SS")+classes.xscript("-",icon.normalaxis),
					lv:1,
					effect:function(power){return c.d0_25.pow(power)},
					nameMod:["Synergy","Light","Platonic"]
				},
				41:researchBinding(41,"r8_14",icon.star(""),[33],c.d0_25,["Supernovæ","Filament","a Broken Star's"]),
				44:{
					description:function(){return "Row 3 Masteries are "+percentOrDiv(study13.bindingEff(44))+" weaker"},
					adjacent_req:[26,33],
					icon:icon.mastery()+classes.xscript("-",classes.mastery("3x")),
					lv:1,
					effect:function(power){return c.d0_3.pow(power)},
					nameMod:["Liberty","Ownerless","Unwanted"]
				},
				46:{
					description:function(){return "Row 7 stars are "+percentOrDiv(study13.bindingEff(46))+" weaker"},
					adjacent_req:[24,37],
					icon:icon.star("")+classes.xscript("-",classes.stars("7x")),
					lv:1,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["Snail","Transient","Temporal"]
				},
				49:researchBinding(49,"r6_5",icon.masteryPower,[37],c.d0_25,["University","Doctoral","Unattainable"]),
				52:{
					description:function(){return "Subtract "+study13.bindingEff(52).noLeadFormat(3)+" from all energy effects"},
					adjacent_req:[41],
					icon:icon.energy+classes.sup("-1"),
					lv:3,
					effect:function(power){return c.d1div3.mul(power)},
					nameMod:["Fatigue","Dreaming","Jaded"]
				},
				53:{
					description:function(){return "Row 1 Masteries are "+study13.bindingEff(53).recip().noLeadFormat(2)+"× weaker"},
					adjacent_req:[41,44],
					icon:icon.mastery()+classes.xscript("-",classes.mastery("1x")),
					lv:1,
					effect:function(power){return c.d0_1.pow(power)},
					nameMod:["Origins","Five Atoms'","Nostalgic"]
				},
				55:{
					description:function(){return "Research 1-3, 1-8 and 1-13 are "+percentOrDiv(study13.bindingEff(55))+" weaker"},
					adjacent_req:[24,26],
					icon:icon.research+classes.xscript("-",classes.research("1")),
					lv:1,
					effect:function(power){return c.d0_2.pow(power)},
					nameMod:["Breakthrough","First Scientific","Seven Straight Lines'"]
				},
				57:{
					description:function(){return "Row 1 stars are "+percentOrDiv(study13.bindingEff(57))+" weaker"},
					adjacent_req:[46,49],
					icon:icon.star("")+classes.xscript("-",classes.stars("1x")),
					lv:1,
					effect:function(power){return c.d0_3.pow(power)},
					nameMod:["Inverted Gravity","Starry Sky's","Negative"]
				},
				58:{
					description:function(){return "Energy gain increases "+study13.bindingEff(58).noLeadFormat(3)+"× slower"},
					adjacent_req:[49],
					icon:icon.energy+icon.minus,
					lv:3,
					effect:function(power){return c.e15.pow(power)},
					nameMod:["Lethargy","Sleeping","Resting"]
				},
				64:{
					description:function(){return "Row 8 Masteries are "+percentOrDiv(study13.bindingEff(64))+" weaker"},
					adjacent_req:[52,53],
					icon:icon.mastery("")+classes.xscript("-",classes.mastery("8x")),
					lv:2,
					effect:function(power){return c.d0_3.pow(power)},
					nameMod:["Masters","Experienced","Masterful"]
				},
				66:{
					description:function(){return "Row 9 stars are "+percentOrDiv(study13.bindingEff(66))+" weaker"},
					adjacent_req:[57,58],
					icon:icon.star("")+classes.xscript("-",classes.stars("9x")),
					lv:2,
					effect:function(power){return c.d0_7.pow(power)},
					nameMod:["Couplings","Twice Bound","Duplicitous"]
				},
				85:{
					numDesc:function(){return study13.bindingEff(85).noLeadFormat(3)},
					formulaDesc:function(){return "(1 - (log(EM + 1) ÷ "+c.e7.format()+" + 1))"+formulaFormat.exp(study13.bindingPower(85))},
					description:function(){return "Stardust gain is severely reduced the less exotic matter you have (currently: ^"+numOrFormula(85)+")"},
					adjacent_req:[55,64,66],
					icon:icon.exoticmatter+classes.sup("-1")+icon.arr+icon.stardust+classes.sup("-1"),
					lv:1,
					effect:function(power){
						let out = g.exoticmatter.add1Log(c.d10).div(c.e7)
						if (out.gt(1e-10)) {out = Decimal.sub(c.d1,out.add(c.d1).recip()).pow(power)}
						return out
					},
					nameMod:["Onions","Layered","Hierarchical"]
				},
				94:{
					description:function(){return "Lose "+study13.bindingEff(94).noLeadFormat(3)+" free S axis"},
					adjacent_req:[85],
					icon:icon.SAxis+icon.minus,
					lv:1,
					effect:function(power){return power},
					nameMod:["Powers","Exponential","Geometric"]
				},
				95:{
					description:function(){return "All normal axis costs are raised to the power of "+study13.bindingEff(95).noLeadFormat(3)},
					adjacent_req:[85],
					icon:classes.exoticmatter("A$")+icon.plus,
					lv:5,
					effect:function(power){return c.e2.pow(power)},
					nameMod:["Duality","Sixteen-Dimensional","Spatial"]
				},
				96:{
					description:function(){return "Lose "+study13.bindingEff(96).noLeadFormat(3)+" free dark S axis"},
					adjacent_req:[85],
					icon:icon.darkSAxis+icon.minus,
					lv:1,
					effect:function(power){return power},
					nameMod:["Roots","Logarithmic","Algebraic"]
				},
				103:{
					description:function(){return "Stardust upgrade costs are raised to the power of "+study13.bindingEff(103).noLeadFormat(3)},
					adjacent_req:[94],
					icon:classes.stardust("SU$")+icon.plus,
					lv:2,
					effect:function(power){return c.d50.pow(power)},
					nameMod:["Boosts and Axis","Spaceless","Powerless"]
				},
				104:{
					description:function(){return "Galaxy Penalty 2 is raised to the power of "+study13.bindingEff(104).noLeadFormat(3)},
					adjacent_req:[94],
					icon:icon.galaxy+classes.xscript("-","<span class=\"_galaxypenalties\">2</span>"),
					lv:1,
					effect:function(power){return c.d1_5.pow(power)},
					nameMod:["Clusters","Filamented","Galactic"]
				},
				106:{
					description:function(){return "Normal and dark T axis effects are raised to the power of "+study13.bindingEff(106).noLeadFormat(3)},
					adjacent_req:[96],
					icon:gradientText("T","-webkit-linear-gradient(90deg,var(--exoticmatter),var(--darkmatter))")+icon.minus,
					lv:1,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["Tetra-time","Tau","Twenty-first"]
				},
				107:{
					description:function(){return "Lose "+study13.bindingEff(107).noLeadFormat(3)+" free dark stars"},
					adjacent_req:[96],
					icon:icon.darkstar+icon.minus,
					lv:4,
					effect:function(power){return power.mul(c.d50)},
					nameMod:["Night Shining Bright","Shine Bright,","Bright"]
				},
				113:{
					description:function(){return "Stardust upgrade costs are raised to the power of "+study13.bindingEff(113).noLeadFormat(3)},
					adjacent_req:[103,104],
					icon:classes.stardust("SU$")+classes.sup("++"),
					lv:4,
					effect:function(power){return c.d1_5.pow(power)},
					nameMod:["Spatial Empowerment","Cramped","Unboosted"]
				},
				114:{
					description:function(){return "Galaxy Penalty 2 is raised to the power of "+study13.bindingEff(114).noLeadFormat(3)},
					adjacent_req:[103,106],
					icon:icon.galaxy+classes.xscript("--","<span class=\"_galaxypenalties\">2</span>"),
					lv:1,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["Superclusters","Filamentous","Clustered"]
				},
				116:{
					description:function(){return "Normal and dark T axis effects are raised to the power of "+study13.bindingEff(116).noLeadFormat(3)},
					adjacent_req:[104,107],
					icon:gradientText("T","-webkit-linear-gradient(90deg,var(--darkmatter),var(--exoticmatter))")+icon.minus,
					lv:1,
					effect:function(power){return c.d0_1.pow(power)},
					nameMod:["T","Taw","Nefertiti's"]
				},
				117:{
					description:function(){return "Lose "+study13.bindingEff(117).noLeadFormat(3)+" free dark stars"},
					adjacent_req:[106,107],
					icon:icon.darkstar+classes.sup("--"),
					lv:2,
					effect:function(power){return power.mul(c.d20)},
					nameMod:["Bamboo Cutter","Twinkling","Astronomical"]
				},
				124:{
					description:function(){return "Lose "+study13.bindingEff(124).noLeadFormat(3)+" free S axis"},
					adjacent_req:[113,114],
					icon:icon.SAxis+classes.sup("--"),
					lv:1,
					effect:function(power){return power},
					nameMod:["Exponents","Polynomial","Shaped"]
				},
				125:{
					description:function(){return "All normal axis costs are multiplied by "+study13.bindingEff(125).noLeadFormat(2)},
					adjacent_req:[95],
					icon:classes.exoticmatter("A$")+classes.sup("++"),
					lv:5,
					effect:function(power){return N("5e5e5").pow(power)},
					nameMod:["Gate","Locked","Walled"]
				},
				126:{
					description:function(){return "Lose "+study13.bindingEff(126).noLeadFormat(3)+" free dark S axis"},
					adjacent_req:[116,117],
					icon:icon.darkSAxis+classes.sup("--"),
					lv:1,
					effect:function(power){return power},
					nameMod:["Radicals","Antipolynomial","Variable"]
				},
				135:{
					numDesc:function(){return study13.bindingEff(135).noLeadFormat(3)},
					formulaDesc:function(){return "(1 - (log(S + 1) ÷ 1,000 + 1))"+formulaFormat.exp(study13.bindingPower(135))},
					description:function(){return "Exotic matter gain is severely reduced the less stardust you have (currently: ^"+numOrFormula(135)+")"},
					adjacent_req:[124,125,126],
					icon:icon.stardust+classes.sup("-1")+icon.arr+icon.exoticmatter+classes.sup("-1"),
					lv:1,
					effect:function(power){
						let out = g.stardust.add1Log(c.d10).div(c.e3)
						if (out.gt(1e-10)) {out = Decimal.sub(c.d1,out.add(c.d1).recip())}
						return out.pow(power)
					},
					nameMod:["Ogres","Prestigious","Stacked"]
				},
				155:{
					description:function(){return "Star Scaling starts "+study13.bindingEff(155).noLeadFormat(3)+" stars earlier"},
					adjacent_req:[135],
					icon:icon.star("")+icon.arr+icon.star("")+classes.stars("$"),
					lv:8,
					effect:function(power){return N(17.5).mul(power)},
					nameMod:["Black Skies","Obscured","Polluted"]
				},
				162:{
					description:function(){return "The "+achievement.label(209)+" reward is "+study13.bindingEff(162).noLeadFormat(3)+"× weaker"},
					adjacent_req:[135],
					icon:icon.achievements+classes.xscript("-",classes.achievements("209")),
					lv:1,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["Hepteract","Seventh","Seven-Dimensional"]
				},
				164:{
					description:function(){return "The "+achievement.label(210)+" reward is "+study13.bindingEff(164).noLeadFormat(3)+"× weaker"},
					adjacent_req:[155],
					icon:icon.achievements+classes.xscript("-",classes.achievements("210")),
					lv:2,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["Octeract","Eighth","Eight-Dimensional"]
				},
				166:{
					description:function(){return "The "+achievement.label(501)+" reward increases "+study13.bindingEff(166).noLeadFormat(3)+"× slower"},
					adjacent_req:[155],
					icon:icon.achievements+classes.xscript("-",classes.achievements("501")),
					lv:1,
					effect:function(power){return c.d10.pow(power)},
					nameMod:["Milestones","Second","Portal's"]
				},
				168:{
					description:function(){return "The "+achievement.label(528)+" reward is "+study13.bindingEff(168).noLeadFormat(3)+"× weaker"},
					adjacent_req:[135],
					icon:icon.achievements+classes.xscript("-",classes.achievements("528")),
					lv:2,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["Scale","Balanced","Neutral"]
				},
				172:{
					description:function(){return "The U axis effect base is raised to the power of "+study13.bindingEff(172).noLeadFormat(3)},
					adjacent_req:[162],
					icon:icon.UAxis+icon.minus,
					lv:2,
					effect:function(power){return c.d0_1.pow(power)},
					nameMod:["Reliance","Dominant","Underdog's"]
				},
				174:{
					numDesc:function(){return study13.bindingEff(174).noLeadFormat(3)},
					formulaDesc:function(){return "(1 + 1 ÷ log(L + 10))"+formulaFormat.exp(study13.bindingPower(174))},
					description:function(){return "The "+achievement.label(210)+" reward is an additional "+numOrFormula(174)+"× weaker (decreases with yellow lumens)"},
					adjacent_req:[164],
					icon:icon.lumen(5)+classes.sup(-1)+icon.arr+icon.achievements+classes.xscript("-1",classes.achievements("210")),
					lv:1,
					effect:function(power){return g.lumens[5].log10().recip().add(c.d1).pow(power)},
					nameMod:["Eight Shades of Yellow","Golden","Luminous"]
				},
				176:{
					description:function(){return "The "+achievement.label(501)+" reward caps at "+study13.bindingEff(176).noLeadFormat(3)+"× (before Mastery 101)<br>(projected effect: "+arrowJoin(achievement(501).realEffect(false).format(2)+"×",achievement(501).realEffect(true).format(2)+"×")+")"},
					adjacent_req:[166],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("501"))+icon.arr+icon.achievements+classes.sub(classes.achievements("501")),
					lv:2,
					effect:function(power){return c.d2.pow(power.recip())},
					nameMod:["Convergence","Limited","Jacorbian"]
				},
				178:{
					numDesc:function(){return study13.bindingEff(178).noLeadFormat(3)},
					formulaDesc:function(){return "(1 + 1 ÷ log(L + 10))"+formulaFormat.exp(study13.bindingPower(178))},
					description:function(){return "The "+achievement.label(528)+" reward is an additional "+numOrFormula(178)+"× weaker (decreases with yellow lumens)"},
					adjacent_req:[168],
					icon:icon.lumen(5)+classes.sup(-1)+icon.arr+icon.achievements+classes.xscript("-1",classes.achievements("528")),
					lv:1,
					effect:function(power){return g.lumens[5].log10().recip().add(c.d1).pow(power)},
					nameMod:["Yellow Druid","Sun's","Coloristically Balanced"]
				},
				182:{
					description:function(){return "Subtract "+study13.bindingEff(182).noLeadFormat(3)+" from the V axis effect"},
					adjacent_req:[164,172],
					icon:icon.VAxis+icon.minus,
					lv:1,
					effect:function(power){return c.d4.mul(power)},
					nameMod:["Dependencies","Five-Dimensional Seven-Dimensional","Domineering"]
				},
				184:{
					description:function(){return "The "+achievement.label(210)+" reward softcap is stronger <span style=\"white-space:nowrap\">(O(n<sup>"+achievement(210).scp(false).noLeadFormat(3)+"</sup>) "+icon.arr+" O(n<sup>"+achievement(210).scp(true).noLeadFormat(3)+"</sup>))</span>"},
					adjacent_req:[162,166,174],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("210"))+icon.arr+icon.achievements+classes.sub(classes.achievements("210")),
					lv:2,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["Elastic Limit","Subspatial","Eight Broken Dimensions'"]
				},
				186:{
					description:function(){return "Mastery 101 is "+percentOrDiv(study13.bindingEff(186))+" weaker"},
					adjacent_req:[164,168,176],
					icon:icon.mastery("")+classes.xscript("-",classes.mastery("101")),
					lv:1,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["Curvature","Mind-bending","Wall of Clocks'"]
				},
				188:{
					description:function(){return "The "+achievement.label(528)+" reward softcap is stronger <span style=\"white-space:nowrap\">(10<sup>O(log(n)<sup>"+achievement(528).scp(false).add(c.d1).recip().noLeadFormat(3)+"</sup>)</sup> "+icon.arr+" 10<sup>O(log(n)<sup>"+achievement(528).scp(true).add(c.d1).recip().noLeadFormat(3)+"</sup>)</sup>)</span>"},
					adjacent_req:[166,178],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("528"))+icon.arr+icon.achievements+classes.sub(classes.achievements("528")),
					lv:2,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["Proportionality Limit","Unbalanced","<span class=\"_jacorb\">(softcapped)</span>"]
				},
				192:{
					numDesc:function(){return percentOrDiv(study13.bindingEff(192))},
					formulaDesc:function(){return "(ΣA ÷ (ΣA + 10,000))"+formulaFormat.exp(study13.bindingPower(192))},
					description:function(){return "The rewards of "+achievement.label(207,4)+" are "+numOrFormula(192)+(showFormulas?"× stronger":" weaker")+" (based on total normal axis)"},
					adjacent_req:[174,182],
					icon:icon.achievements+classes.sub(classes.achievements("207-210"))+"<br>"+icon.normalaxis+icon.arr+icon.normalaxis+classes.sup(2),
					lv:2,
					effect:function(power){return Decimal.div(stat.totalNormalAxis,stat.totalNormalAxis.add(c.e4)).pow(power)},
					nameMod:["Squares","Two-Dimensional Seven-Dimensional","Quadratic"]
				},
				194:{
					description:function(){return "The free amount of each normal axis is reduced past the amount gained from the "+achievement.label(210)+" reward (O(n<sup>"+study13.bindingEff(194).noLeadFormat(3)+"</sup>))"},
					adjacent_req:[172,176,184],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("210"))+icon.arr+icon.normalaxis+icon.inv,
					lv:1,
					effect:function(power){return c.d0_99.pow(power)},
					nameMod:["Prestige Tree","Eight Jacorbian Dimensions'","Distant Incremental"]
				},
				196:{
					description:function(){return "The "+achievement.label(201)+" reward and all Masteries in odd-numbered rows are "+percentOrDiv(study13.bindingEff(196))+" weaker"},
					adjacent_req:[174,178,186],
					icon:icon.achievements+classes.sub(classes.achievements("201"))+icon.br+icon.mastery("")+classes.sub(classes.mastery("[2z±1]x")),
					lv:2,
					effect:function(power){return c.d0_95.pow(power)},
					nameMod:["Hybrid","Two-in-One","Odd"]
				},
				198:{
					description:function(){return "The free amount of each dark axis is reduced past the amount gained from the "+achievement.label(528)+" reward (O(n<sup>"+study13.bindingEff(198).noLeadFormat(3)+"</sup>))"},
					adjacent_req:[176,188],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("528"))+icon.arr+icon.darkaxis+icon.inv,
					lv:1,
					effect:function(power){return c.d0_99.pow(power)},
					nameMod:["Dark Circle","Sixteen Jacorbian Dimensions'","Energetic Incremental"]
				},
				204:{
					description:function(){return "The "+achievement.label(706)+" reward softcap is "+study13.bindingEff(204).noLeadFormat(3)+"× stronger<br>(projected effect: "+arrowJoin(achievement(706).effect(false).noLeadFormat(2)+"×",achievement(706).effect(true).noLeadFormat(2)+"×")+")"},
					adjacent_req:[182,186,194],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("706"))+icon.arr+icon.achievements+classes.sub(classes.achievements("706")),
					lv:4,
					effect:function(power){return c.d3.pow(power)},
					nameMod:["Cookies","Crumbly","Grimoire of"]
				},
				206:{
					description:function(){return "The "+achievement.label(717)+" reward is "+percentOrDiv(study13.bindingEff(206))+" weaker"},
					adjacent_req:[184,188,196],
					icon:icon.achievements+classes.xscript("-",classes.achievements("717")),
					lv:4,
					effect:function(power){return c.d0_8.pow(power)},
					nameMod:["Ants","Ascended","Platonic"]
				},
				225:{
					numDesc:function(){return study13.bindingEff(225).noLeadFormat(3)},
					formulaDesc:function(){return "min(log<sub>"+this.discoveryReq(study13.bindingPower(225)).noLeadFormat(3)+"</sub>(1 - υD ÷ "+g.totalDiscoveries.format()+"), 1)"},
					description:function(){return "You can only spend a maximum of "+this.discoveryReq(study13.bindingPower(225)).mul(c.e2).noLeadFormat(3)+"% of your Discoveries ("+g.spentDiscoveries.format(0,3)+" / "+this.spendableDiscoveries().format(0,3)+").<br><br>If you spend more than this, exotic matter, stardust, dark matter and mastery power gain are significantly reduced (currently: "+unbreak(arrowJoin("x","10<sup>log(<i>x</i>)<sup>"+numOrFormula(225)+"</sup></sup>"))+" if "+formulaFormat("x > 10")+")"},
					adjacent_req:[192,198,204,206],
					icon:studyIcon(5),
					lv:4,
					discoveryReq:function(power){return c.d0_25.pow(power)},
					spendableDiscoveries:function(){return this.discoveryReq(study13.bindingPower(225)).mul(g.totalDiscoveries).floor()},
					effect:function(power){let p = g.totalDiscoveries.eq(c.d0)?c.d0:Decimal.div(g.spentDiscoveries,g.totalDiscoveries),r=this.discoveryReq(power);return p.gt(r)?p.log(r):c.d1},
					nameMod:["Science","Illiterate","Medieval"]
				},
				234:{
					description:function(){return "All Masteries are weaker based on their row number (×"+study13.bindingEff(234).formatFrom1(2)+"<sup><i>row</i></sup>)"},
					adjacent_req:[225],
					icon:studyIcon(8),
					lv:3,
					effect:function(power){return c.d0_98.pow(power)},
					nameMod:["Mastery","Eighth","Skilled"]
				},
				236:{
					description:function(){return "You must complete the Study within "+timeFormat(study13.bindingEff(236))+" before you are forcibly removed.<br><br>"+studies[0].exactFrames[0]},
					adjacent_req:[225],
					get icon(){return studyIcon(11)},
					lv:5,
					effect:function(power){return N(540).div(power).toNumber()},
					nameMod:["Moon","Scriven","Lunar"]
				},
				242:{
					description:function(){return "The game runs "+study13.bindingEff(242).formatFrom1(3)+"× slower per dark axis below the goal (currently: ×"+study13.bindingEff(242).pow(stat.wormholeDarkAxisReq.sub(stat.totalDarkAxis).max(c.d0)).noLeadFormat(2)+")"},
					adjacent_req:[234],
					icon:studyIcon(6),
					lv:3,
					effect:function(power){return c.d1_05.pow(power)},
					nameMod:["Void","Black","Irradiated"]
				},
				244:{
					numDesc:function(){return study13.bindingEff(244).noLeadFormat(3)},
					formulaDesc:function(){return "(8 ÷ log(★ + 10) + 1)"+formulaFormat.exp(study13.bindingPower(244))},
					description:function(){return "Anti-axis dimension boosts are "+numOrFormula(244)+"× weaker (decreases with dark stars)"},
					adjacent_req:[236],
					icon:studyIcon(9),
					lv:5,
					effect:function(power){return c.d8.div(g.darkstars.add(c.d10).log10()).add(c.d1).pow(power)},
					nameMod:["Antimatter","Experienced","Seasoned"]
				},
				245:{
					description:function(){return "The third reward of every Study is "+percentOrDiv(study13.bindingEff(245))+" weaker"},
					adjacent_req:[234],
					icon:studyIcon(1),
					lv:4,
					effect:function(power){return c.d0_75.pow(power)},
					nameMod:["Developer","Mechanical","Unplayable"]
				},
				246:{
					numDesc:function(){return study13.bindingEff(246).noLeadFormat(3)},
					formulaDesc:function(){return "(6 ÷ (log<sup>[3]</sup>(S + "+c.e10.format()+") + 1)<sup>2</sup> + 1)"+formulaFormat.exp(study13.bindingPower(246))},
					description:function(){return "Reduce the effective level of all Luck Upgrades by "+numOrFormula(246)+"× (decreases with stardust)"},
					adjacent_req:[236],
					icon:studyIcon(7),
					lv:4,
					effect:function(power){return c.d6.div(g.stardust.add(c.e10).layerplus(-3).add(c.d1).pow(c.d2)).add(c.d1).pow(power)},
					nameMod:["Fortune","Unlucky","Spinning Wheel's"]
				},
				248:{
					numDesc:function(){return study13.bindingEff(248).noLeadFormat(2)},
					formulaDesc:function(){return "(S = 0) ? 1 : 10<sup>10<sup>(S - 1)"+formulaFormat.mult(study13.bindingPower(248))+"</sup>"+formulaFormat.mult(study13.bindingPower(248))+"</sup>"},
					description:function(){return "Stardust gain is reduced based on the number of Stardust resets done (currently: ÷"+numOrFormula(248)+")"},
					adjacent_req:[236],
					icon:studyIcon(4),
					lv:3,
					effect:function(power){return (g.TotalStardustResets===0)?c.d1:[power.pow10(),power.pow10(),N(g.TotalStardustResets-1)].decimalPowerTower()},
					nameMod:["Vacuum","Radioactive","Curie's"]
				},
				254:{
					description:function(){return "Row 5 and 6 Energy research are "+percentOrDiv(study13.bindingEff(254))+" weaker"},
					adjacent_req:[242,244,246],
					icon:studyIcon(3),
					lv:4,
					effect:function(power){return c.d0_75.pow(power)},
					nameMod:["Analgesia","Conserved","Vacuous Mental Dimensional Temporal"]
				},
				256:{
					description:function(){return "Increase the star cost by "+study13.bindingEff(256).noLeadFormat(3)+" star"+(study13.bindingEff(256).eq(c.d1)?"":"s")},
					adjacent_req:[245,248],
					icon:studyIcon(2),
					lv:3,
					effect:function(power){return power.mul(c.d2)},
					nameMod:["Creation","Galactic","Neutronic"]
				},
				265:{
					description:function(){return "The second reward of every Study is "+percentOrDiv(study13.bindingEff(265))+" weaker"},
					adjacent_req:[254,256],
					get icon(){return studyIcon(10)},
					lv:4,
					effect:function(power){return c.d0_75.pow(power)},
					nameMod:{0:"Study",1:"Ontological",get 2(){return ["Stellar","Decisive","Temporal"][Math.floor(Date.now()/60000+(g.study13Bindings[291]?1:0)+(g.study13Bindings[299]?2:0))%3]}}
				},
				275:{
					numDesc:function(){return study13.bindingEff(275).noLeadFormat(2)},
					formulaDesc:function(){
						let p = study13.bindingPower(275);
						let out = "((1 + log<sup>[2]</sup>(DM + 10) ÷ 100)<sup>331.3</sup>"+(p.eq(c.d1)?" ":"<br>")+"× 10<sup>5</sup>)"+formulaFormat.exp(p.recip())+formulaFormat.mult(p.recip())
						if (StudyE(12)) {out = "1 - 1 ÷ ("+out+" + 1)"}
						return out
					},
					description:function(){return "Dark matter gain is capped at 1, but Titanium Empowerments are available and fortitude gain and cap is multiplied by "+numOrFormula(275)+" (based on dark matter)"+(StudyE(12)?"<br><br><i>(note: the fortitude multiplier does not work if simultaneously in Study XII)</i>":"")},
					adjacent_req:[265],
					get icon(){return studyIcon(12)},
					lv:6,
					effect:function(power){
						let out = g.darkmatter.add(c.d10).log10().log10().div(c.e2).add(c.d1).pow(331.3).mul(c.e5).root(power).div(power)
						if (StudyE(12)) {out = c.d1.sub(out.add(c.d1).recip())}
						return out
					},
					nameMod:["Elements","Titanic","Fortified"]
				},
				291:{
					description:function(){return "Dark matter gain is raised to the power of "+study13.bindingEff(291).noLeadFormat(3)},
					adjacent_req:[275],
					icon:icon.darkmatter+icon.minus,
					lv:2,
					effect:function(power){return c.d0_9.pow(power)},
					nameMod:["Inkwell","Stygian","Impenetrable"]
				},
				299:{
					description:function(){return "Exotic matter gain is raised to the power of "+study13.bindingEff(299).noLeadFormat(3)},
					adjacent_req:[275],
					icon:icon.exoticmatter+icon.minus,
					lv:1,
					effect:function(power){return c.d0_9.pow(power)},
					nameMod:["Minus World","Tropical","Exotic"]
				},
				301:metaBinding(301,[291],[291,299],2,256,["Sea of Ink","Styx's","Tar and"]),
				304:{
					description:function(){return "Star costs are raised to the power of "+study13.bindingEff(304).noLeadFormat(3)},
					adjacent_req:[291],
					icon:icon.star("")+classes.stardust("$")+icon.plus,
					lv:1,
					effect:function(power){return c.e2.pow(power)},
					nameMod:["Glow","Nebulous","Ten Rows'"]
				},
				306:{
					description:function(){return "Reduce the effective number of dark stars by "+percentOrDiv(study13.bindingEff(306),3)},
					adjacent_req:[299],
					icon:icon.darkstar+icon.minus,
					lv:2,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["Stars Long-Extinguished","Obstructed","Dwarven"]
				},
				309:metaBinding(309,[299],[291,299],2,128,["Zero World","Amazonian","Strange"]),
				312:{
					description:function(){return "Mastery power gain is raised to the power of "+study13.bindingEff(312).noLeadFormat(3)},
					adjacent_req:[301,306],
					icon:icon.masteryPower+icon.minus,
					lv:1,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["Expertise","Proficient","Talented"]
				},
				315:{
					description:function(){return "Add "+study13.bindingEff(315).noLeadFormat(3)+" galax"+(study13.bindingEff(315).eq(c.d1)?"y":"ies")+" to the effects of all penalties"},
					adjacent_req:[301,304,306,309],
					icon:classes.galaxypenalties("G")+icon.plus,
					lv:2,
					effect:function(power){return power},
					nameMod:["Prison","Punisher's","Criminal"]
				},
				318:{
					description:function(){return "The mastery timer increases "+study13.bindingEff(318).noLeadFormat(3)+"× slower"},
					adjacent_req:[304,309],
					icon:icon.mastery("")+icon.time+icon.minus,
					lv:1,
					effect:function(power){return c.e3.pow(power)},
					nameMod:["Talent","Skilful","Educated"]
				},
				323:{
					description:function(){return study13.rewardLabel("emBoost")+" is "+percentOrDiv(study13.bindingEff(323))+" weaker"},
					adjacent_req:[304,309,312],
					icon:classes.binding("S")+classes.xscript(classes.binding("13")+icon.minus,icon.normalaxis),
					lv:1,
					effect:function(power){return c.d0_2.pow(power)},
					nameMod:["Fission","Reactive","Reacted"]
				},
				327:{
					description:function(){return study13.rewardLabel("dmBoost")+" is "+percentOrDiv(study13.bindingEff(327))+" weaker"},
					adjacent_req:[301,306,318],
					icon:classes.binding("S")+classes.xscript(classes.binding("13")+icon.minus,icon.darkaxis),
					lv:2,
					effect:function(power){return c.d0_2.pow(power)},
					nameMod:["Fusion","Unreactive","Unreacted"]
				},
				331:{
					description:function(){return "Normal S axis is "+percentOrDiv(study13.bindingEff(331))+" weaker"},
					adjacent_req:[301,327],
					icon:icon.SAxis+classes.sup("---"),
					lv:1,
					effect:function(power){return c.d0_9.pow(power)},
					nameMod:["Sigma","Kappa","Manic"]
				},
				333:{
					numDesc:function(){return study13.bindingEff(333).noLeadFormat(3)},
					formulaDesc:function(){return "10<sup>max(60 - ★, 0)"+formulaFormat.mult(study13.bindingPower(333).div(c.d300))+" + max(40 - ★, 0)<sup>2</sup>"+formulaFormat.mult(study13.bindingPower(333).div(c.d2e3))+"</sup>"},
					description:function(){return "Tickspeed is divided by "+numOrFormula(333)+" (based on stars)"},
					adjacent_req:[318,323],
					icon:icon.star("")+icon.inv+icon.arr+icon.tickspeed+icon.inv,
					lv:1,
					effect:function(power){return N(Math.max(60-g.stars,0)/300+Math.max(40-g.stars,0)**2/2000).mul(power).pow10()},
					nameMod:["Dilation","Stretched","Dilated"]
				},
				337:{
					description:function(){return "Tickspeed below 1 is raised to the power of "+study13.bindingEff(337).noLeadFormat(4)},
					adjacent_req:[312,327],
					icon:icon.tickspeed+icon.inv+icon.arr+icon.tickspeed+icon.inv,
					lv:1,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["Time Prison","Accelerating","Quadratic"]
				},
				339:{
					description:function(){return "Dark S axis is "+percentOrDiv(study13.bindingEff(339))+" weaker"},
					adjacent_req:[309,323],
					icon:icon.darkSAxis+classes.sup("---"),
					lv:2,
					effect:function(power){return c.d0_9.pow(power)},
					nameMod:["Shin","Kaf","Pellenic"]
				},
				342:metaBinding(342,[225],[331,333],2,230.4,["Dark Ages","Unchanging","Holy"]),
				345:metaBinding(345,[333,337],[315,333,337],2,128,["Stasis","Frozen","Static"],"33x"),
				348:{
					description:function(){return "The knowledge boost to all Masteries is "+percentOrDiv(study13.bindingEff(348))+" weaker (before the softcap)"},
					adjacent_req:[337,339],
					icon:icon.knowledge+icon.inv+icon.arr+icon.mastery("")+icon.inv,
					lv:1,
					effect:function(power){return c.d0_8.pow(power)},
					nameMod:["Theory","Inapplicable","Useless"]
				},
				353:metaBinding(353,[236],[342,345],2,8/7,["Countdown","Ticking","Race of"]),
				357:metaBinding(357,[234],[345,348],1,256,["Pyramid","Collapsing","Building of"]),
				371:researchBinding(371,"r14_6",icon.tickspeed,[331,357],c.d0_8,["Seconds","Ancient","Timeless"]),
				373:researchBinding(373,"r14_10",icon.darkYAxis,[353,348],c.d0_6,["Yearlong Darkness","Yperite","Yesternight's Garage"],2),
				375:metaBinding(375,[315],[345],4,256,["Netherworld","Yama's","Sinful"]),
				377:researchBinding(377,"r2_10",icon.stardust,[357,342],c.d0_6,["Nebula","Main Sequence of","Nebulous"],2),
				379:researchBinding(379,"r16_12",icon.darkstar,[339,353],c.d0_6,["Dwarfs","Elven","Garden Gnome's"]),
				382:researchBinding(382,"r13_11",classes.stardust("B"),[371,373,375],c.d0_5,["Trinity","Three Microcosms'","Ternary"]),
				388:researchBinding(388,"r9_5",icon.achievements,[375,377,379],c.d0_25,["Pride","Accomplished","Overachieving"]),
				393:researchBinding(393,"r1_8",icon.normalaxis,[379,382],c.em3,["Basics","Primary","Original"]),
				395:{
					description:function(){return "Gain "+percentOrDiv(study13.bindingEff(395))+" less free normal axis from dark matter"},
					adjacent_req:[373,375,377],
					icon:"("+icon.darkaxis+icon.arr+icon.normalaxis+")"+icon.inv,
					lv:2,
					effect:function(power){return c.d0_1.pow(power)},
					nameMod:["Dark Energy","Spectral","Massless"]
				},
				397:researchBinding(397,"r7_8",icon.star(""),[371,388],c.d0_75,["Constellation","Astronomical","Stargazer's"]),
				415:{
					description:function(){return "Finality Research is "+percentOrDiv(study13.bindingEff(415))+" weaker"},
					adjacent_req:[393,395,397],
					icon:icon.research+classes.xscript("-","<span style=\"color:"+researchGroupList.finality1.color+"\">F</span>"),
					lv:2,
					effect:function(power){return c.d0_2.pow(power)},
					nameMod:["Culmination","Ultimate","Final"]
				},
				442:metaBinding(442,[371,373,377,379,382,388,393,397],[415],3,1024,["Gap God","","Ignorant"],icon.research),
				445:metaBinding(445,[85,103,104,125,135,242,333,337],[415],2,1024,["Beginning","Gateway to","Eight Tests'"],"-1"),
				448:metaBinding(448,[164,168,174,178,184,188,194,198],[415],3,1024,["Progress","Develop Nobly,","Venerable"],gradientText("A","linear-gradient(180deg,var(--exoticmatter) 25%,var(--achievements) 41.67% 58.33%,var(--darkmatter) 75%)"))
			}
		}
	})(),
	bindingSelected:undefined,
	allParentBindings:function(id){ // all bindings which binding 'id' branches off, including 'id' itself
		let out = [id]
		while (true) {
			let prev = out // add all parents of bindings already in array, then check if anything was added. If not, return
			let next = []
			for (let i of out) {next.push(i); for (let j of study13.bindings[i].adjacent_req) {next.push(j)}}
			next = Array.removeDuplicates(next)
			if (prev.length===next.length) {return next}
			out = next
		}
	},
	allDescendantBindings:function(id){ // all bindings which branch off 'id', including 'id' itself
		let out = [id]
		while (true) {
			let prev = Array.removeDuplicates(out) // add all children of bindings already in array, then check if anything was added. If not, return
			for (let i of study13.allBindings) {for (let j of study13.bindings[i].adjacent_req) {if (out.includes(j)) {out.push(Number(i))}}}
			out = Array.removeDuplicates(out)
			if (prev.length===out.length) {return out}
		}
	},
	activateBinding:function(id){
		if (StudyE(13)) {return}
		let changes = false
		if (g.study13Bindings[id]) { // if the binding is already active, remove it and all its descendants
			for (let i of study13.allDescendantBindings(id)) {
				if (g.study13Bindings[i]) {changes = true}
				g.study13Bindings[i] = false
			}
		} else { // if the binding is not active, add it and all its ancestors
			for (let i of study13.allParentBindings(id)) {
				if (!g.study13Bindings[i]) {changes = true}
				g.study13Bindings[i] = true
			}
		}
		if (changes) {study13.updateBindingTree();}
	},
	updateBindingTree:function(){
		for (let i of study13.allBindings) {d.element("button_study13Binding"+i).style.filter = "contrast("+(g.study13Bindings[i]?120:100)+"%)"}
	},
	accessibleBindingName:function(id) {
		let data = study13.bindings[id]
		let out = "Binding "+id
		if (data.adjacent_req.length>0) out += ", branches off "+data.adjacent_req.joinWithAnd()
		return out
	},
	bindingPower:function(id){
		let out = c.d1, row = Math.floor(id/10)
		// row-by-row effects
		// non-row-by-row effects
		if (study13.rewards.weakenBindings.allAffected.includes(id)) {out = out.mul(stat.study13RewardWeakBindings[id])} // Mailbreaker
		if ((study13.rewardLevels.signed8bit>0)&&[2,8].includes(id%10)) { // Mailbreaker II
			let complement = 10*Math.floor(id/10)+10-(id%10)
			if (g.study13Bindings[id]&&g.study13Bindings[complement]) {out = out.mul(c.d0_9)}
		}
		if (achievement(919).rewardAffects.includes(id)&&g.achievement[919]) {out = out.mul(achievement(919).effect())}
		// these directly affect other bindings so we apply them even outside study XIII for clarity
		if (study13.metaBindings[id]!==undefined) {for (let i of study13.metaBindings[id]) {if (g.study13Bindings[i]) {out = out.mul(study13.bindingEff(i).mul(studyPower(13)).add(c.d1))}}}
		return out
	},
	renderTree:function(){
		d.element("study13BindingContainer").style.height = (74*study13.bindingRows+30)+"px"
		let canvas = d.element("study13BindingCanvas");
		let context = canvas.getContext("2d")
		canvas.style.height = (study13.bindingRows*74)+"px";
		canvas.height = study13.bindingRows*74;
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (let b1 of study13.allBindings) {
			for (let b2 of study13.bindings[b1].adjacent_req) {
				context.moveTo((b1%10)*74-37,Math.floor(b1/10)*74-37);
				context.lineTo((b2%10)*74-37,Math.floor(b2/10)*74-37);
			}
		}
		context.strokeStyle = "#c2a366";
		context.lineWidth = 2;
		context.stroke();
		for (let y of [481,999,1517,2035]) {for (let x=-6;x<=666;x+=12) {
			context.rect(x,y,6,6)
			context.moveTo(x+6,y+3)
			context.lineTo(x+12,y+3)
		}}
		context.strokeStyle = "#698133"
		context.lineWidth = 1;
		context.stroke();
	},
	bound:function(id){return (study13.bindings[id]===undefined)?functionError("study13.bound",arguments):(StudyE(13)&&g.study13Bindings[id])},
	resizeBinding:function(x){
		let size = 15
		let elem = d.element("button_study13Binding"+x)
		while (true) {
			d.element("foo").innerHTML = elem.innerHTML
			d.element("foo").style["font-size"] = elem.style["font-size"]
			if ((d.element("foo").offsetWidth>50)||(d.element("foo").offsetHeight>50)) {
				size--
				elem.style["font-size"] = size+"px"
				if (size===0) break
			} else {
				break
			}
		}
	},
	/*
	reward types are:
	scaling       each reward supersedes the previous, eg. "2× EM", "4× EM", "8× EM"
	composite     each level adds a new reward, eg. "2× X axis effect", "2× Y axis effect", "2× Z axis effect"
	single        there is only one level
	*/
	rewards:(()=>{
		function scaleFormat(curr,prev,func){
			if (func(curr)===func(prev)) {return func(curr)}
			return arrowJoin("<span style=\"color:var(--binding_dark)\">"+func(prev)+"</span>","<span style=\"color:var(--binding_light)\">"+func(curr)+"</span>")
		}
		return {
			emBoost:{
				name:"Exo Reactor",
				breakpoints:[1,3,6,10,15,21,28,36,45,55,66,78,91,105,120,136,153,171,190,210,231,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.emBoost){
					let out = N((lv===22)?0.15:(lv/150))
					if (study13.bound(323)) {out = out.mul(study13.bindingEff(323))}
					return out.add(c.d1)
				},
				desc:function(curr,prev){return "The effects of the first seven normal axis are "+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x),3,false))+" stronger"},
			},
			dmBoost:{
				name:"Dark Reactor",
				breakpoints:[1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.emBoost){
					let out = N((lv===16)?0.11:(lv/150))
					if (study13.bound(327)) {out = out.mul(study13.bindingEff(327))}
					return out.add(c.d1)
				},
				desc:function(curr,prev){return "The effects of the first seven dark axis are "+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x),3,false))+" stronger"},
			},
			amBoost:{
				name:"Anti-Reactor",
				breakpoints:[1,5,12,22,35,51,70,92,117,145,176,210,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.emBoost){
					let out = N((lv===13)?0.09:(lv/150))
					return out.add(c.d1)
				},
				desc:function(curr,prev){return "The effects of the first seven anti-axis are "+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x),3,false))+" stronger"},
			},
			masterNumber:{
				name:"Master's Encyclopædia of Integer Sequences®",
				breakpoints:[2,5,12,29,70,169],
				type:"composite",
				l3Mult:function(){return (study13.rewardLevels.masterNumber===6)?(g.stars+g.galaxies+totalAchievements):g.stars},
				desc:function(lv){return ["Mastery 42 is 130% stronger","Mastery 63 is 1.3× stronger","Mastery 105 is 0.13% stronger per star (currently: "+N(this.l3Mult()*0.13).noLeadFormat(2)+"%)","Mastery 42 is an additional 1.3% stronger per Study XIII completion (currently: "+N(g.studyCompletions[13]*1.3).noLeadFormat(2)+"%) (multiplicative with Level 1)","Mastery 63 is an additional 0.13% stronger per purchased dark star (currently: "+g.darkstars.mul(0.13).noLeadFormat(2)+"%) (multiplicative with Level 2)","Galaxies and achievements now add to the Level 3 effect"][lv-1]}
			},
			particleLab:{
				name:"Stat Mark's Edible Periodic Table",
				breakpoints:[3,9,19,37,55,87,119,169,219,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.particleLab){return Decimal.FC_NN(1,0,(lv===10)?(10/3):(lv>4)?(0.75+lv/4):(1+lv/5))},
				desc:function(curr,prev){return "The base gain of knowledge is multiplied by "+scaleFormat(curr,prev,x=>this.eff(x).noLeadFormat(3))+"×"}
			},
			clock:{
				name:"Pocket Watch of 13 Hours",
				breakpoints:[16,64,144,256],
				type:"composite",
				desc:function(lv){return ["The game runs 0.78125% faster per Study XIII completion (currently: "+N(g.studyCompletions[13]*0.78125).noLeadFormat(3)+"%)","The game runs an additional 0.1953125% faster in Study XIII per binding level (currently: "+N(studyPower(13)*0.1953125).noLeadFormat(3)+"%)","The game runs an additional 10% faster","The game runs an additional 1% faster"][lv-1]}
			},
			...(()=>{
				let out = {}
				for (let i=0;i<3;i++) {out["trinity"+i] = {
					name:"Trinitarian "+["Shards","Sparks","Stars"][i],
					breakpoints:[24],
					type:"single",
					desc:function(){return ["Unlock 3 new Luck Upgrades","Unlock 2 new Prismatic Upgrades","Unlock Antimatter Galaxies"][i]}
				}}
				return out
			})(),
			weakenBindings:(()=>{
				let out = {
					name:"Mailbreaker",
					breakpoints:[25,40,55,100,120,128,144,153,160,172,180,188,200],
					type:"scaling",
					eff:function(lv=study13.rewardLevels.weakenBindings){
						function f(x,l){return Decimal.FC_NN(1,0,Math.max(l,Math.min(1,x)))}
						return {
							44:Decimal.FC_NN(1,0,(lv>=10)?(Math.log(0.6)/Math.log(0.3)):1),
							46:f(Math.log(0.45+lv/20)/Math.log(0.5),Math.log(0.75)/Math.log(0.5)),
							52:f(1-Math.floor((lv+1)/2)/10,0.5),
							53:f((lv>4)?1-Math.log10(lv-3):1,Math.log10(2)),
							57:Decimal.FC_NN(1,0,(lv>=10)?(Math.log(0.6)/Math.log(0.3)):1),
							58:f(1-Math.floor(lv/2)/15,2/3),
							103:f(1.18-lv*0.09,Math.log(40/3)/Math.log(50)),
							107:f(1.18-lv*0.09,0.64),
							155:f((76-lv)/70,32/35),
							225:f(Math.log(0.1+lv/20)/Math.log(0.25),0.5),
							234:(lv>9)?c.d0_99:c.d1,
							236:N(9-lv).min(c.d0).pow10(),
							242:Decimal.FC_NN(1,0,(lv>4)?0.1:1),
							248:f(1.05-lv/80,0.9),
							304:f(1-Math.sqrt(Math.max(lv-7,0)/12),0.5),
							306:f(Math.log(Math.max(lv-1,6)/12)/Math.log(0.5),Math.log(0.75)/Math.log(0.5)),
							312:f((2/3)**(lv-8),(Math.log(0.9)*10)/(Math.log(0.5)*9)),
							318:f((2/3)**(lv-8),Math.log10(3)/3),
							373:Decimal.FC_NN(1,0,Math.log(1-0.4/Math.min(2,Math.max(1,lv-9)**0.5))/Math.log(0.6)),
							377:Decimal.FC_NN(1,0,Math.log(1-0.4/Math.min(2,Math.max(1,lv-9)**0.5))/Math.log(0.6)),
						}
					},
					desc:function(curr,prev){
						if (curr===0) {return "All Bindings are fully powered"}
						return "Certain Bindings are weakened:<br>"+Object.entries(this.eff(curr)).filter(b=>b[1].neq(c.d1)).map(b=>"<div style=\"height:16px;font-size:12px;width:225px;border-style:solid;border-radius:4px;border-width:2px;border-color:var(--binding);margin:4px;padding:4px;\"><span style=\"float:left\">"+b[0]+"</span><span style=\"float:right\">"+scaleFormat(curr,prev,x=>percentOrDiv(this.eff(x)[b[0]]))+"</span></div>").join("")
					}
				}
				out.allAffected = Object.keys(out.eff(out.breakpoints.length)).map(x=>Number(x))
				return out
			})(),
			nitro:{
				name:"Nitrous Chroma",
				breakpoints:[27,30,33,36,40,44,48,52,56,62,68,74,80,88,96,108,120,144],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.nitro){return Decimal.FC_NN(1,0,Math.max(2**(1/9),Math.min(1.26-lv/100,2**(1/3))))},
				desc:function(curr,prev){return prismaticUpgradeName("chromaOverdrive")+" increases chroma costs by "+scaleFormat(curr,prev,x=>this.eff(x).noLeadFormat(2))+"× per level"}
			},
			wildfire:{
				name:"White Wildfire",
				breakpoints:[36,46,56,66,76,86,96,108,124,144],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.wildfire){return N(lv/10)},
				desc:function(curr,prev){return "White lumens affect Stardust Upgrade costs with ^"+scaleFormat(curr,prev,x=>this.eff(x).format())+" effect (currently: ^"+scaleFormat(curr,prev,x=>stat.whiteLightEffect.pow(this.eff(x)).noLeadFormat(3))+")"}
			},
			slabdrill:{
				name:"Traditional Old Slab and Stylish Drill",
				breakpoints:[56,96,144,200],
				type:"scaling",
				desc:function(curr,prev){return "The first Stardust Upgrade can be purchased "+scaleFormat(curr,prev,x=>x)+" additional time"+((curr===1)?"":"s")}
			},
			sacredNumber:{
				name:"Wire and Brimstone",
				breakpoints:[69,138,207],
				type:"composite",
				desc:function(lv){return ["Luck shard and prismatic gain is multiplied by 420","All anti-axis costs are divided by 13.37 per anti-axis owned (total: ×"+N(13.37).pow(stat.totalAntiAxis).format()+")","Increase the gray lumen base by 3.4%"][lv-1]}
			},
			radiance:{
				name:"Black Radiance",
				breakpoints:[96,104,112,122,132,144,156,170,184,200],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.radiance){return {mul:Decimal.FC_NN(1,0,Math.min(1+lv/6,2.5)),lim:N(1-lv/10).max(c.minvalue).recip().pow10().floor().pow10()}},
				desc:function(curr,prev){return "Increase the effective number of black lumens by "+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x).mul,false))+" and their effect limit is "+scaleFormat(curr,prev,x=>this.eff(x).lim.format())+"<br><br>(translated to a black lumen effect of "+scaleFormat(curr,prev,x=>percentOrDiv(lightEffect[7].value(g.lumens[7],x),3).replace("-","").replace("÷","×"))+")"}
			},
			century:{
				name:"Centennial Festival for Celestials",
				breakpoints:[100,200],
				type:"composite",
				desc:function(lv){return ["Antimatter gain is multiplied by 100 per Study XIII completion (total: ×"+c.e2.pow(g.studyCompletions[13]).format()+")","Stardust gain is multiplied by 100 per Study XIII completion (total: ×"+c.e100.pow(g.studyCompletions[13]).format()+")"][lv-1]}
			},
			signed8bit:{
				name:"Mailbreaker II 〜 Two's Complement",
				breakpoints:[128],
				type:"single",
				desc:function(){return "Activating both the Binding in column 2 and 8 of any row (e.g. 52 and 58; 192 and 198; 242 and 248) will make both of these Bindings 10% weaker"}
			},
			zemer:{
				name:"Gray Flower",
				breakpoints:[144,154,164,176,188,200,212,226,240,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.zemer){return c.d5.mul(lv)},
				desc:function(curr,prev){return "The gray lumen softcap starts "+scaleFormat(curr,prev,x=>this.eff(x).format())+" later<br><br>(translated to a gray lumen effect of "+scaleFormat(curr,prev,x=>lightEffect[8].value(g.lumens[8],x).format(2))+"×)"},
			},
			particleLab2:{
				name:"Stat Mark's Eternal Decay Chain",
				breakpoints:[144,168,200,224,240],
				type:"composite",
				desc:function(lv){return (lv===5)?"Unlock ":("Unlock research "+(lv+28)+"-4 and "+(lv+28)+"-12")}
			},
			forge:{
				name:"Titans' Furnace",
				breakpoints:[150,155,160,165,170,175,180,185,190,195,200,206,212,218,224,230,236,242,248,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.forge){return {b:Decimal.fracDecibel_arithmetic(Decimal.FC_NN(1,0,70-lv/2)).pow10(),s:Decimal.FC_NN(1,0,Math.max(3360-lv*6,3350-lv*5)/3000)}},
				desc:function(curr,prev){return "Titanium Empowerments have a base cost of "+scaleFormat(curr,prev,x=>this.eff(x).b.format())+" and cost increase of ^"+scaleFormat(curr,prev,x=>this.eff(x).s.noLeadFormat(5))}
			},
			particleLab3:(()=>{
				let out = {
					name:"Stat Mark's Cellular Game of Rising",
					breakpoints:[168,174,182,192,200],
					type:"scaling",
					eff:function(lv=study13.rewardLevels.particleLab3){
						function f(x,l){return Decimal.FC_NN(1,0,Math.min(l,Math.max(1,x)))}
						let finality12Boost = f(lv/2,12)
						return {
							r15_7:f(Math.round(100+lv*12.5-lv**2*0.25)/100,2),
							r15_9:f(Math.round(lv*7.5+lv**2*0.25)*10,1000),
							r19_7:f(lv*4,16),
							r19_9:N(1+lv**(2/3)/40,Math.log(1.225)/Math.log(1.2)),
							r22_6:Decimal.FC_NN(1,0,2.05625-(Math.max(-6.5,Math.min(lv-9.5,-1.5)))**2/40),
							r22_10:Decimal.FC_NN(1,0,0.94375+(Math.max(1.5,Math.min(lv-1.5,6.5)))**2/40),
							r25_1:Decimal.FC_NN(1,0,(lv>=4)?(Math.log(7.7)/Math.log(7)):1),
							r25_15:(lv>=4)?c.d9:c.d1,
							r41_6:finality12Boost,
							r41_10:finality12Boost,
							r44_4:finality12Boost,
							r44_12:finality12Boost,
							r47_6:finality12Boost,
							r47_10:finality12Boost
						}
					},
					desc:function(curr,prev){
						if (curr===0) {return "No Research is boosted"}
						return "Certain Research is strengthened:<br>"+Object.entries(this.eff(curr)).filter(r=>r[1].neq(c.d1)).map(r=>"<div style=\"height:16px;font-size:12px;width:225px;border-style:solid;border-radius:4px;border-width:2px;border-color:var(--binding);margin:4px;padding:4px;\"><span style=\"float:left\">"+researchOut(r[0])+"</span><span style=\"float:right\">"+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x)[r[0]],2,true))+"</span></div>").join("")
					}
				}
				out.allAffected = Object.keys(out.eff(out.breakpoints.length))
				return out
			})(),
			purifier:{
				name:"Evil-Sealing Circle",
				breakpoints:[176,188,200,208,216,224,232,240,248,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.purifier){return {e:Decimal.FC_NN(1,0,1+lv/5-lv**2/100),d:Decimal.FC_NN(1,0,1+lv**2/100)}},
				desc:function(curr,prev){return "Normal Axis Corruption starts ^"+scaleFormat(curr,prev,x=>this.eff(x).e.noLeadFormat(4))+" later<br>Dark Axis Corruption starts ^"+scaleFormat(curr,prev,x=>this.eff(x).d.noLeadFormat(4))+" later"}
			},
			hyperdrive:{
				name:"Chromatic Hyperdrive",
				breakpoints:betaActive?[200,208,216,223,230,236,242,247,252,256]:[],
				type:"scaling",
				eff:function(lvs=study13.rewardLevels.hyperdrive,lvp=g.prismaticUpgrades.chromaOverdrive){return (lvs===0)?c.d1:lvp.add(c.d1).log10().mul((Math.log10(lvs)+1)**2/100).add(c.d1)},
				desc:function(curr,prev){return "Chroma gain is raised to the power of "+scaleFormat(curr,prev,x=>showFormulas?formulaFormat("1 + log(λ + 1)"+formulaFormat.mult((x===0)?c.d0:N((Math.log10(x)+1)**2/100))):this.eff(x).noLeadFormat(4))+" (based on "+prismaticUpgradeName("chromaOverdrive")+" level)"}
			},
			trinity3:{
				name:"Trinitarian Synergy",
				breakpoints:[243],
				type:"single",
				eff:function(){return [g.luckShards,g.prismatic,g.antimatter].map(x=>x.add(c.d10).log10().log10()).productDecimals().div(c.e4).add(c.d1)},
				desc:function(){return "Luck shard, prismatic and antimatter gain are raised to the power of "+(showFormulas?formulaFormat("1 + log<sup>[2]</sup>(LS + 10) × log<sup>[2]</sup>(P + 10) × log<sup>[2]</sup>(AM + 10) ÷ 10,000"):this.eff().noLeadFormat(4))+" (based on luck shards, prismatic, antimatter)"}
			},
			particleLab4:{
				name:"Stat Mark's World of High and Low Structures",
				breakpoints:[243],
				type:"single",
				eff:function(){
					let uD = unspentDiscoveries();
					if (uD.eq(c.d0)) {return c.d0;}
					let tD = g.totalDiscoveries;
					let t_u = tD.div(uD);
					return tD.div(Decimal.pow(t_u,t_u)).pow(c.d10).max(c.d10).log10().log10().pow(c.d2)
				},
				desc:function(){return "The knowledge effect limit is increased by "+(showFormulas?formulaFormat("log<sup>[2]</sup>(max(ΣD ÷ (ΣD ÷ υD) ⇈ 2)<sup>10</sup>, 10))<sup>2</sup>"):this.effect().format(3))+" percentage points (based on unspent and total Discoveries)"}
			},
			matrix:{
				get name(){return g.playerName+"'s Device 〜 \"Not Responding\""},
				breakpoints:[256],
				type:"single",
				desc:function(){return "Unlock the ability to create a new Matrix"}
			}
		}
	})(),
	rewardSelected:undefined,
	updateRewardLevels:function(){
		for (let i of study13.allRewards) {study13.prevRewardLevels[i] = study13.rewardLevels[i]}
		loop: for (let i of study13.allRewards) {
			for (let lv=study13.rewards[i].breakpoints.length;lv>0;lv--) {if (g.studyCompletions[13]>=study13.rewards[i].breakpoints[lv-1]) {study13.rewardLevels[i]=lv;continue loop}}
			study13.rewardLevels[i]=0
		}
		d.innerHTML("study13RewardContainer",study13.rewardSort().map(x=>"<div class=\"study13Reward\" onClick=\"study13.rewardSelected='"+x+"'\" onMouseover=\"study13.rewardSelected='"+x+"'\""+((study13.rewardLevels[x]===study13.prevRewardLevels[x])?"":" style=\"color:#c2a333;border-color:#c2a333;font-weight:700\"")+">"+((study13.rewards[x].type==="single")?study13.rewards[x].name:("<span style=\"float:left\">"+study13.rewards[x].name+"</span><span style=\"float:right\">"+study13.rewardLevels[x]+"</span>"))+"</div>").join(""))
	},
	rewardSort:function(){ // determines the order in which rewards are displayed. Most recently upgraded rewards are at the top, rewards which are not unlocked at all yet are not shown
		let out = []
		for (let i of study13.allRewards) {if (study13.rewardLevels[i]>0) {out.push([i,study13.rewards[i].breakpoints[study13.rewardLevels[i]-1]])}}
		return out.reverse().sort((a,b)=>b[1]-a[1]).map(x=>x[0])
	},
	rewardLabel:function(id,lv){return "Study XIII Reward \""+study13.rewards[id].name+"\""+((lv===undefined)?"":(" Level "+lv))}
}
study13.allBindings = Object.keys(study13.bindings).map(x=>Number(x))
d.innerHTML("span_study13MaxCompletions",betaActive?256:200)
study13.bindingRows = Math.floor(study13.allBindings.reduce((x,y)=>Math.max(x,y))/10)
study13.allRewards = Object.keys(study13.rewards)
if (!betaActive) {for (let i of study13.allRewards) {study13.rewards[i].breakpoints = study13.rewards[i].breakpoints.filter(x=>x<=200)}}
study13.rewardLevels = Object.fromEntries(study13.allRewards.map(x=>[x,0]))
study13.prevRewardLevels = Object.fromEntries(study13.allRewards.map(x=>[x,0]))