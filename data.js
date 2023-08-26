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
			formula:()=>"10<sup>Σ<span class=\"xscript\"><sup>9</sup><sub>n=1</sub></span>(log(L<sub>n</sub> + 10)<sup>ln(λ) + 1</sup>) ÷ 100"
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