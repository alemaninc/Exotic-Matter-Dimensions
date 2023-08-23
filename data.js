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
		}
	},
	quatrefoil:{
		star:{
			desc:"Star costs are raised to the power of {}",
			eff:x=>x.div(c.d20)
		}
	}
}