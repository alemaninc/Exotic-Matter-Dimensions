"use strict";
/*
Everything that is represented in "g" as an object generated from a list of keys is stored here and executed directly before main.js.
*/
const starList = countTo(10).map(x=>countTo(4).map(y=>x*10+y)).flat()
const luckRunes = {
	trefoil:{baseCost:c.d50,scale:c.d1_01},
	quatrefoil:{baseCost:c.e3,scale:c.d1_1},
	cinquefoil:{baseCost:c.e9,scale:c.d2}
}
const luckUpgrades = {
	trefoil:{
		normalAxis:{
			desc:"Normal axis costs are raised to the power of {}",
			eff:x=>c.d99.div(c.d99.add(x)),
			format:x=>x.noLeadFormat(3),
			cost:x=>c.d1_1.pow(x).mul(c.d10)
		},
		darkAxis:{
			desc:"Dark axis costs are raised to the power of {}",
			eff:x=>c.d99.div(c.d99.add(x)),
			format:x=>x.noLeadFormat(3),
			cost:x=>c.d1_1.pow(x).mul(c.d10)
		},
		// antimatter
	},
	quatrefoil:{
		star:{
			desc:"Star costs are raised to the power of {}",
			eff:x=>[c.d0_95,x,N(0.8786509132956299)].decimalPowerTower(),
			format:x=>x.noLeadFormat(3),
			cost:x=>c.d1_2.pow(x).mul(c.d5)
		},
		darkstar:{
			desc:"Dark star costs are raised to the power of {}",
			eff:x=>c.d99.div(x.gt(33)?x.sub(c.d32).pow(c.d0_5).mul(c.d2).add(130):x.add(c.d99)),
			format:x=>x.noLeadFormat(3),
			cost:x=>c.d1_2.pow(x).mul(c.d5)
		},
		// prismatic
	}
}