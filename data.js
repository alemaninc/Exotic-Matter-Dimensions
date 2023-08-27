"use strict";
/*
Everything that is represented in "g" as an object generated from a list of keys is stored here and executed directly before main.js.
*/
const starList = countTo(10).map(x=>countTo(4).map(y=>x*10+y)).flat()
const lightNames = ["red","green","blue","cyan","magenta","yellow","white","black","gray"]
const luckRunes = {
	trifolium:{baseCost:c.d1,scale:c.d1_01,upgCost:x=>c.d1_1.pow(x).mul(c.d10),upgBaseCost:c.d10,upgScale:c.d1_2},
	quatrefolium:{baseCost:c.e4,scale:c.d1_1,upgCost:x=>c.d1_2.pow(x).mul(c.d5),upgBaseCost:c.d4,upgScale:c.d1_5},
	cinquefolium:{baseCost:c.e15,scale:c.d3,upgCost:x=>c.d1_5.pow(x),upgBaseCost:c.d1,upgScale:c.d2}
}
const luckRuneTypes = Object.keys(luckRunes)
// luck upgrades use geometric scaling as a cost formula, but rounded down - calculate amount of upgrades at which rounding no longer matters
for (let i of luckRuneTypes) luckRunes[i].noRoundThreshold = c.e16.div(luckRunes[i].upgBaseCost).log(luckRunes[i].upgScale)
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
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>x.gt(c.d10)?c.d20.sub(x.log10().add(c.d1).pow(c.d2)).div(c.d4).pow10():x.gt(c.d2)?c.e5.div(x):c.e5.sub(x.mul(2.5e4)),
		format:{x:(x=this.eff())=>x.noLeadFormat(3)},
		formula:()=>g.prismaticUpgrades.lumenThresholdReduction1.gte(c.d10)?"10<sup>(20 - (log(λ) + 1)<sup>2</sup>) ÷ 4</sup>":(BEformat(3e5)+" ÷ max(3 × λ, 3 + λ)"),
		cost:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>(x.gt(c.d10)?x.div(c.d20).add(c.d1):c.d1_5).pow(x.gt(c.e2)?x.pow(c.d2).div(c.e2):x).mul(c.d500),
		costFormula:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>(x.gte(c.d10)?"(1 + λ ÷ 20)":"1.5")+"<sup>"+(x.gte(c.e2)?"λ<sup>2</sup> ÷ 100":"λ")+"</sup> × 500",
		max:c.e3
	},
	lumenThresholdReduction2:{
		name:"Lumen Increaser II",
		desc:"The black and white lumen threshold increases are reduced to {x}×",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction2)=>c.d10.sub(x.div(c.d20)),
		format:{x:(x=this.eff())=>x.noLeadFormat(3)},
		formula:()=>"10 - λ ÷ 20",
		cost:function(x=g.prismaticUpgrades.lumenThresholdReduction2){
			let base = c.d12
			let exp = x
			if (x.gte(c.d20)) base = x
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