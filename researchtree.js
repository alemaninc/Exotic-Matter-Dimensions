"use strict"
/*
normal-type research is refunded on Research respec
permanent-type research is not refunded on Research respec
study-type research allows the player to enter a study and is refunded on Research respec, unless the player is entering a study
*/
/*
description          the effect of the research, accounting for boosts
adjacent_req         adjacent research. at least one research in this array must be purchased in order to purchase the research. row 1 research is always purchasable
condition            a condition that must be fulfilled to purchase the research
condition_tooltip    the condition written in standard English, only exists for researches with conditions
visibility           a condition that must be fulfilled for the research to appear (besides having purchased a research from the previous row at least once)
type                 whether the research is normal, permanent or a study
basecost             the base cost
icon                 the text inside the research box
*/
const research = {
  r1_3: {
    description:function(){return "Gain "+researchEffect(1,3).format(2)+"× more exotic matter per normal axis owned (current total: "+researchEffect(1,3).pow(totalAxis("normal")).format(2)+"×)"},
    adjacent_req:[],
    condition:function(){return true}, 
    visibility:function(){return true},
    type:"normal",
    basecost:"1",
    icon:"<span class=\"matterlayertext\">A</span>→<span class=\"matterlayertext\">EM</span>",
    effect:function(power){return N(1.5).pow(power)}
  },
  r1_8: {
    description:function(){return "Multiply the effects of the first seven normal axis by "+researchEffect(1,8).format(2)},
    adjacent_req:[],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"1",
    icon:"<span class=\"matterlayertext\">A</span><sup>+</sup>",
    effect:function(power){return N(1.5).pow(power)}
  },
  r1_13: {
    description:function(){return "Gain "+researchEffect(1,13).format(2)+"× more dark matter per dark axis owned (current total: "+researchEffect(1,13).pow(totalAxis("dark")).format(2)+"×)"},
    adjacent_req:[],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"1",
    icon:"<span class=\"darkmattertext\">A</span>→<span class=\"darkmattertext\">DM</span>",
    effect:function(power){return N(1.2).pow(power)}
  },
  r2_2: {
    description:function(){return "Increase the X Axis effect by "+researchEffect(2,2).format(1)+"% per X Axis owned (current total: "+researchEffect(2,2).mul(g.XAxis).format(1)+"%)"},
    adjacent_req:["r1_3"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"2",
    icon:"<span class=\"matterlayertext\">X</span><sup>+<span style=\"color:#00ff00\">X</span></sup>",
    effect:function(power){return power}
  },
  r2_4: {
    description:function(){return "Increase the X Axis effect by "+researchEffect(2,4).format(1)+"% per second in this Wormhole (current total: "+researchEffect(2,4).mul(g.truetimeThisWormholeReset).format(1)+"%)"},
    adjacent_req:["r1_3"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"2",
    icon:"<span class=\"matterlayertext\">X</span><sup>++</sup>",
    effect:function(power){return power.div(10)}
  },
  r2_7: {
    description:function(){return "Increase the X Axis effect by "+researchEffect(2,7).format(1)+"% per OoM of spatial energy (current total: "+researchEffect(2,7).mul(g.spatialEnergy.log10()).format(1)+"%)"},
    adjacent_req:["r1_8"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"2",
    icon:"<span class=\"matterlayertext\">X</span><sup>+<span style=\"color:#00ffff\">E</span></sup>",
    effect:function(power){return power}
  },
  r2_9: {
    description:function(){return "Increase the X Axis effect by "+researchEffect(2,9).format(1)+"% per dark X Axis owned (current total: "+researchEffect(2,9).mul(g.darkXAxis).format(1)+"%)"},
    adjacent_req:["r1_8"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"2",
    icon:"<span class=\"matterlayertext\">X</span><sup>+<span style=\"color:#990099\">X</span></sup>",
    effect:function(power){return power.mul(10)}
  },
  r2_12: {
    description:function(){return "Increase the X Axis effect by "+researchEffect(2,12).format(1)+"% per total Discovery (current total: "+researchEffect(2,12).mul(g.totalDiscoveries).format(1)+"%)"},
    adjacent_req:["r1_13"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"2",
    icon:"<span class=\"matterlayertext\">X</span><sup>+<span style=\"color:#66ccff\">R</span></sup>",
    effect:function(power){return power.mul(80)}
  },
  r2_14: {
    description:function(){return "Raise the X Axis effect to the power of "+researchEffect(2,14).format(4)+" (decreases based on X Axis owned)"},
    adjacent_req:["r1_13"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"2",
    icon:"<span class=\"matterlayertext\">X</span><sup>^</sup>",
    effect:function(power){return power.div(realAxis("X").div(100).add(1).pow(0.1).mul(4)).add(1)}
  },
  r3_2: {
    description:function(){return "Gain "+researchEffect(3,2).format(2)+" free S Axis"},
    adjacent_req:["r2_2"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"matterlayertext\">S</span><sup>+</sup>",
    effect:function(power){return power}
  },
  r3_5: {
    description:function(){return "Raise the S Axis cost to the power of "+researchEffect(3,5).format(3)},
    adjacent_req:["r2_4"],
    condition:function(){return true},
    visibility:function(){return true}, 
    type:"normal",
    basecost:"3",
    icon:"<span class=\"matterlayertext\">S$</span>",
    effect:function(power){return power.div(2)}
  },
  r3_6: {
    description:function(){return "Gain "+researchEffect(3,6).format(2)+" free dark X Axis per dark S Axis owned (current total: "+researchEffect(3,6).mul(g.darkSAxis).format(2)+")"},
    adjacent_req:["r2_7"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"darkmattertext\">X</span><sup>+<span class=\"darkmattertext\">S</span></sup>",
    effect:function(power){return power}
  },
  r3_10: {
    description:function(){return "Gain "+researchEffect(3,10).format(2)+" free dark X axis per dark star owned (current total: "+researchEffect(3,10).mul(g.darkstars).format(2)+")"},
    adjacent_req:["r2_9"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"darkmattertext\">X</span><sup>+<span class=\"darkmattertext\">★</span></sup>",
    effect:function(power){return power.mul(0.25)}
  },
  r3_11: {
    description:function(){return "Raise the dark S Axis cost to the power of "+researchEffect(3,11).format(3)},
    adjacent_req:["r2_12"],
    condition:function(){return true},
    visibility:function(){return true}, 
    type:"normal",
    basecost:"3",
    icon:"<span class=\"darkmattertext\">S$</span>", 
    effect:function(power){return power.div(2)}
  },
  r3_14: {
    description:function(){return "Gain "+researchEffect(3,14).format(2)+" free dark S Axis"},
    adjacent_req:["r2_14"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"darkmattertext\">S</span><sup>+</sup>",
    effect:function(power){return power}
  },
  r4_1: {
    description:function(){return "Dark energy increases "+researchEffect(4,1).format(2)+"× faster"},
    adjacent_req:["r3_2"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+</sup><sub style=\"color:#00ffff\">1</sub></span>",
    effect:function(power){return N(15).pow(power)}
  },
  r4_2: {
    description:function(){return "Stelliferous energy increases "+researchEffect(4,2).format(2)+"× faster"},
    adjacent_req:["r3_2"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+</sup><sub style=\"color:#00ffff\">2</sub></span>",
    effect:function(power){return N(15).pow(power)}
  },
  r4_3: {
    description:function(){return "Gravitational energy increases "+researchEffect(4,3).format(2)+"× faster"},
    adjacent_req:["r3_2"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+</sup><sub style=\"color:#00ffff\">3</sub></span>",
    effect:function(power){return N(15).pow(power)}
  },
  r4_6: {
    description:function(){return "S Axis effect"+(researchPower(4,6).eq(1)?"":("<sup>"+researchPower(4,6).format(3)+"</sup"))+" affects Mastery 11"},
    adjacent_req:["r3_5","r3_6"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"masterytext\">M</span><span class=\"xscript\"><sup>+<span style=\"color:#00ff00\">S</span></sup><sub style=\"color:#ff0099\">11</sub></span>",
    effect:function(power){return stat("SAxisEffect").pow(realAxis("S").mul(power))}
  },
  r4_10: {
    description:function(){return "S Axis effect"+(researchPower(4,10).eq(1)?"":("<sup>"+researchPower(4,10).format(3)+"</sup"))+" affects Mastery 12"},
    adjacent_req:["r3_10","r3_11"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"masterytext\">M</span><span class=\"xscript\"><sup>+<span style=\"color:#00ff00\">S</span></sup><sub style=\"color:#ff0099\">12</sub></span>",
    effect:function(power){return stat("SAxisEffect").pow(realAxis("S").mul(power))}
  },
  r4_13: {
    description:function(){return "Spatial energy increases "+researchEffect(4,13).format(2)+"× faster"},
    adjacent_req:["r3_14"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+</sup><sub style=\"color:#00ffff\">4</sub></span>",
    effect:function(power){return N(15).pow(power)}
  },
  r4_14: {
    description:function(){return "Neural energy increases "+researchEffect(4,14).format(2)+"× faster"},
    adjacent_req:["r3_14"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+</sup><sub style=\"color:#00ffff\">5</sub></span>",
    effect:function(power){return N(15).pow(power)}
  },
  r4_15: {
    description:function(){return "Meta energy increases "+researchEffect(4,15).format(2)+"× faster"},
    adjacent_req:["r3_14"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"3",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+</sup><sub style=\"color:#00ffff\">6</sub></span>",
    effect:function(power){return N(15).pow(power)}
  },
  r5_1: {
    description:function(){return "The dark energy effect<sup>"+(researchEffect(5,1).eq(1)?"":researchEffect(5,1).format(2))+"</sup> boosts T axis effect"},
    adjacent_req:["r4_1","r4_2","r4_3"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+<span style=\"color:#00ff00\">T</span></sup><sub style=\"color:#00ffff\">1</sub></span>",
    effect:function(power){return power}
  },
  r5_2: {
    description:function(){return "The stelliferous energy effect<sup>"+(researchEffect(5,2).eq(1)?"":researchEffect(5,2).format(2))+"</sup> boosts U axis effect"},
    adjacent_req:["r4_1","r4_2","r4_3"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+<span style=\"color:#00ff00\">U</span></sup><sub style=\"color:#00ffff\">2</sub></span>",
    effect:function(power){return power}
  },
  r5_3: {
    description:function(){return "The gravitational energy effect<sup>"+(researchEffect(5,3).eq(1)?"":researchEffect(5,3).format(2))+"</sup> boosts dark U axis effect"},
    adjacent_req:["r4_1","r4_2","r4_3"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+<span style=\"color:#990099\">U</span></sup><sub style=\"color:#00ffff\">3</sub></span>",
    effect:function(power){return power}
  },
  r5_7: {
    constant: function() {
      return 1000*Math.min(g.studyCompletions[1]+1,4)
    },
    description:function(){return fullStudyName(1)},
    adjacent_req:["r4_6"],
    condition:function(){return totalAxis("dark").gte(this.constant())},
    condition_tooltip:function(){return totalAxis("dark").format(0)+" / "+BEformat(this.constant())+" total dark axis"},
    visibility:function(){return true},
    type:"study",
    basecost:"12",
    icon:"<span style=\"color:#980000;font-size:30px\">I</span>"
  },
  r5_9: {
    constant: function() {
      return ["e7e3","e1e4","e12500","ee100"][Math.min(g.studyCompletions[2],3)]
    },
    description:function(){return fullStudyName(2)},
    adjacent_req:["r4_10"],
    condition:function(){return g.stardust.gt(this.constant())},
    condition_tooltip:function(){return g.stardust.format(0)+" / "+N(this.constant()).format(0)+" stardust"},
    visibility:function(){return true},
    type:"study",
    basecost:"12",
    icon:"<span style=\"color:#980000;font-size:30px\">II</span>"
  },
  r5_13: {
    description:function(){return "The spatial energy effect<sup>"+(researchEffect(5,13).eq(1)?"":researchEffect(5,13).format(2))+"</sup> boosts Row 2 Masteries"},
    adjacent_req:["r4_13","r4_14","r4_15"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+<span style=\"color:#ff0099\">M</span></sup><sub style=\"color:#00ffff\">4</sub></span>",
    effect:function(power){return power}
  },
  r5_14: {
    description:function(){return "The neural energy effect<sup>"+(researchEffect(5,14).eq(1)?"":researchEffect(5,14).format(2))+"</sup> boosts Stardust Boost 7"},
    adjacent_req:["r4_13","r4_14","r4_15"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+<span class=\"stardusttextsmall\">b7</span></sup><sub style=\"color:#00ffff\">5</sub></span>",
    effect:function(power){return power}
  },
  r5_15: {
    description:function(){return "The meta energy effect<sup>"+(researchEffect(5,15).eq(1)?"":researchEffect(5,15).format(2))+"</sup> multiplies tickspeed"},
    adjacent_req:["r4_13","r4_14","r4_15"],
    condition:function(){return true},
    visibility:function(){return achievement.ownedInTier(5)>=15},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+Δt</sup><sub style=\"color:#00ffff\">6</sub></span>",
    effect:function(power){return power}
  },
  r6_1: {
    description:function(){return "The dark energy effect<sup>"+(researchEffect(6,1).eq(1)?"":researchEffect(6,1).format(2))+"</sup> boosts Z Axis effect"},
    adjacent_req:["r5_1","r5_2","r5_3"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"8",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+<span style=\"color:#00ff00\">Z</span></sup><sub style=\"color:#00ffff\">1</sub></span>",
    effect:function(power){return power}
  },
  r6_2: {
    description:function(){return "The stelliferous energy effect<sup>"+(researchEffect(6,2).eq(1)?"":researchEffect(6,2).format(2))+"</sup> reduces the star cost"},
    adjacent_req:["r5_1","r5_2","r5_3"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"8",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>-<span style=\"color:#ffffff\">S</span><span class=\"stardusttextsmall\">$</span></sup><sub style=\"color:#00ffff\">2</sub></span>",
    effect:function(power){return power}
  },
  r6_3: {
    description:function(){return "The gravitational energy effect<sup>"+(researchEffect(6,3).eq(1)?"":researchEffect(6,3).format(2))+"</sup> divides the dark star cost"},
    adjacent_req:["r5_1","r5_2","r5_3"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"8",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>-<span style=\"color:#990099\">DS$</span></sup><sub style=\"color:#00ffff\">3</sub></span>",
    effect:function(power){return power}
  },
  r6_5: {
    description:function(){return "Mastery power gain accelerates "+researchEffect(6,5).mul(100).format(1)+"% faster per achievement completed (current total: "+Decimal.product(researchEffect(6,5),achievement.owned(),100).format(2)+"%)"},
    adjacent_req:["r6_6"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[1]>=2},
    type:"normal",
    basecost:"3",
    icon:"<span style=\"color:#ffff00\">A</span></span>→<span style=\"color:#ff0099\">MP</span>", 
    effect:function(power){return power.mul(0.02)}
  },
  r6_6: {
    description:function(){return "Tickspeed is "+researchEffect(6,6).mul(100).format(1)+"% higher per achievement completed (current total: "+Decimal.product(researchEffect(6,6),achievement.owned(),100).format(2)+"%)"},
    adjacent_req:["r4_6","r5_7"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[1]>=1},
    type:"normal",
    basecost:"2",
    icon:"<span style=\"color:#ffff00\">A</span></span>→Δt",
    effect:function(power){return power.mul(0.01)}
  },
  r6_8: {
    description:function(){return "Hawking radiation gain is "+researchEffect(6,8).mul(100).format(1)+"% higher per achievement completed, per purchased star (current total: "+Decimal.product(researchEffect(6,8),achievement.owned(),g.stars,100).format(2)+"%)"},
    adjacent_req:["r4_6","r4_10"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[1]>=1&&g.studyCompletions[2]>=1},
    type:"normal",
    basecost:"3",
    icon:"<span style=\"color:#ffff00\">A</span><span style=\"color:#ffffff\">S</span>→<span class=\"wormholetextsmall\">HR</span>",
    effect:function(power){return power.mul(0.01)}
  },
	r6_9: {
		description:function(){return "Unlock a secret achievement"},
		adjacent_req:["r5_1","r5_2","r5_3","r5_7","r5_9","r5_13","r5_14","r5_15"],
		condition:function(){return true},
		visibility:function(){return true},
		type:"normal",
		basecost:"0",
		icon:"Nice."
	},
  r6_10: {
    description:function(){return "Row 7 stars are "+researchEffect(6,10).format(3)+"% stronger"},
    adjacent_req:["r4_10","r5_9"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[2]>=1},
    type:"normal",
    basecost:"2",
    icon:"<span style=\"color:\ffffff\">S</span><span class=\"xscript\"><sup>+</sup><sub style=\"color:\ffffff\">7</sub></span>",
    effect:function(power){return power.mul(20)}
  },
  r6_11: {
    description:function(){return "Each allocated star makes the Masteries in that row "+researchEffect(6,11).format(2)+"% stronger"},
    adjacent_req:["r6_10"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[2]>=2},
    type:"normal",
    basecost:"3",
    icon:"<span style=\"color:\ffffff\">S<sub style=\"font-family:'Courier New'\">x</sub></span>→<span style=\"color:\ff0099\">M<sub style=\"font-family:'Courier New'\">x</sub></span>",
    effect:function(power){return power.mul(1.25)}
  },
  r6_13: {
    description:function(){return "The spatial energy effect<sup>"+(researchEffect(6,13).eq(1)?"":researchEffect(6,13).format(2))+"</sup> boosts V Axis effect"},
    adjacent_req:["r5_13","r5_14","r5_15"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"8",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+<span style=\"color:#00ff00\">V</span></sup><sub style=\"color:#00ffff\">4</sub></span>",
    effect:function(power){return power}
  },
  r6_14: {
    description:function(){return "The neural energy effect<sup>"+(researchEffect(6,14).eq(1)?"":researchEffect(6,14).format(2))+"</sup> boosts dark W Axis effect"},
    adjacent_req:["r5_13","r5_14","r5_15"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"8",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+<span style=\"color:#990099\">W</span></sup><sub style=\"color:#00ffff\">5</sub></span>",
    effect:function(power){return power}
  },
  r6_15: {
    description:function(){return "The meta energy effect<sup>"+(researchEffect(6,15).eq(1)?"":researchEffect(6,15).format(2))+"</sup> multiplies hawking radiation"},
    adjacent_req:["r5_13","r5_14","r5_15"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"8",
    icon:"<span class=\"energytext\">E</span><span class=\"xscript\"><sup>+<span style=\"color: #0000ff;text-shadow: 0 0 5px #3300ff, 0 0 20px #6600ff, 0 0 45px #9900ff;\">HR</span></sup><sub style=\"color:#00ffff\">6</sub></span>",
    effect:function(power){return power}
  },
  r7_1: {
    description:function(){return "The dark energy effect<sup>"+(researchEffect(7,1)==1?"":researchEffect(7,1).format(2))+"</sup> affects stelliferous and meta energy gain"},
    adjacent_req:["r6_1","r6_2","r6_3"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span>→<span class=\"energytext\">E</span>",
    effect:function(power){return power.mul(7)}
  },
  r7_2: {
    description:function(){return "The stelliferous energy effect<sup>"+(researchEffect(7,2)==1?"":researchEffect(7,2).format(2))+"</sup> affects spatial and neural energy gain"},
    adjacent_req:["r6_1","r6_2","r6_3"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span>→<span class=\"energytext\">E</span>",
    effect:function(power){return power.mul(7)}
  },
  r7_3: {
    description:function(){return "The gravitational energy effect<sup>"+(researchEffect(7,3)==1?"":researchEffect(7,3).format(2))+"</sup> affects spatial and meta energy gain"},
    adjacent_req:["r6_1","r6_2","r6_3"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span>→<span class=\"energytext\">E</span>",
    effect:function(power){return power.mul(7)}
  },
  r7_5: {
    description:function(){return "Knowledge increases "+researchEffect(7,5).format(2)+"% faster per achievement completed (current total: "+Decimal.product(researchEffect(7,5),achievement.owned(),100).format(1)+"%)"},
    adjacent_req:["r6_5"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[1]>=3},
    type:"normal",
    basecost:"4",
    icon:"<span style=\"color:#ffff00\">A</span></span>→<span class=\"researchtext\">K</span>",
    effect:function(power){return power.mul(3)}
  },
  r7_8: {
    description:function(){return "The star cost scaling is "+N(1).sub(researchEffect(7,8)).mul(100).format(2)+"% slower (based on owned achievements)"},
    adjacent_req:["r6_8"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[1]>=2&&g.studyCompletions[2]>=2},
    type:"normal",
    basecost:"4",
    icon:"<span style=\"color:#ffffff\">S</span><span class=\"stardusttextsmall\">$</span><sup>-A</sup>",
    effect:function(power){return N(achievement.owned()/50).max(1).pow(power.mul(-0.5))}
  },
  r7_11: {
    description:function(){return "Each purchased dark star raises the normal star cost to the power of "+researchEffect(7,11).format(3)+" (current total: ^"+researchEffect(7,11).pow(g.darkstars).format(4)+")"},
    adjacent_req:["r6_11"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[2]>=3},
    type:"normal",
    basecost:"4",
    icon:"<span style=\"color:#ffffff\">S</span><span class=\"stardusttextsmall\">$</span><sup>-<span class=\"color:#990099\">DS</span></sup>",
    effect:function(power){return N(0.99).pow(power)}
  },
  r7_13: {
    description:function(){return "The spatial energy effect<sup>"+(researchEffect(7,13)==1?"":researchEffect(7,13).format(2))+"</sup> affects dark and gravitational energy gain"},
    adjacent_req:["r6_13","r6_14","r6_15"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span>→<span class=\"energytext\">E</span>",
    effect:function(power){return power.mul(7)}
  },
  r7_14: {
    description:function(){return "The neural energy effect<sup>"+(researchEffect(7,14)==1?"":researchEffect(7,14).format(2))+"</sup> affects stelliferous and gravitational energy gain"},
    adjacent_req:["r6_13","r6_14","r6_15"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span>→<span class=\"energytext\">E</span>",
    effect:function(power){return power.mul(7)}
  },
  r7_15: {
    description:function(){return "The meta energy effect<sup>"+(researchEffect(7,15)==1?"":researchEffect(7,15).format(2))+"</sup> affects dark and neural energy gain"},
    adjacent_req:["r6_13","r6_14","r6_15"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"6",
    icon:"<span class=\"energytext\">E</span>→<span class=\"energytext\">E</span>",
    effect:function(power){return power}
  },
  r8_2: {
    description:function(){return "Multiply hawking radiation by tickspeed<sup>"+(researchEffect(8,2)==1?"":researchEffect(8,2).format(2))+"</sup>"},
    adjacent_req:["r7_1","r7_2","r7_3"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"10",
    icon:"Δt→<span class=\"wormholetextsmall\">HR</span>",
    effect:function(power){return power.div(2)}
  },
  r8_5: {
    description:function(){return "Energy increases "+researchEffect(8,5).format(2)+"% faster per achievement completed (current total: "+Decimal.product(researchEffect(8,5),achievement.owned(),100).format(1)+"%)"},
    adjacent_req:["r7_5"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[1]>=4},
    type:"normal",
    basecost:"5",
    icon:"<span style=\"color:#ffff00\">A</span></span>→<span class=\"energytext\">E</span>",
    effect:function(power){return power.mul(4)}
  },
  r8_11: {
    description:function(){return "Row 1 research is "+researchEffect(8,11).format(2)+"% stronger per purchased star (current total: "+researchEffect(8,11).mul(g.stars).format(2)+"%)"},
    adjacent_req:["r7_11"],
    condition:function(){return true},
    visibility:function(){return g.studyCompletions[2]>=4},
    type:"normal",
    basecost:"5",
    icon:"<span class=\"startext\">S</span>→<span class=\"researchtext\">R<sub>1</sub></span>",
    effect:function(power){return power.mul(10)}
  },
  r8_14: {
    description:function(){return "Offset the star cost by "+researchEffect(8,14).format(2)+" stars"},
    adjacent_req:["r7_13","r7_14","r7_15"],
    condition:function(){return true},
    visibility:function(){return true},
    type:"normal",
    basecost:"10",
    icon:"<span class=\"startext\">S</span><span class=\"stardusttextsmall\">$</span><sup>-</sup>",
    effect:function(power){return power.mul(4)}
  }
}
function validResearch(x) {
	let res = research[x]
	return ((typeof res.description == "function") && (typeof res.adjacent_req == "object") && (typeof res.condition == "function") && (typeof res.visibility == "function") && (["normal","permanent","study"].includes(res.type)) && validDecimal(res.basecost) && (typeof res.icon == "string"))
}
for (let i=0;i<Object.keys(research).length;i++) {
	let id = Object.keys(research)[i]
	if (!validResearch(id)) console.error("Research "+id+" is invalid")
}