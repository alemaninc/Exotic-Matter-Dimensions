"use strict";
function achievement(id) {
	return achievementList[String(id).substring(0,String(id).length-2)][id];
}
achievement.tierOf = function(id){
	return String(id).substring(0,String(id).length-2);
},
achievement.tierName = function(id) {
	return "Tier "+id;
}
achievement.ownedInTier = function(tier){
	return Object.keys(achievementList[tier]).map(x=>g.achievement[x]?1:0).sum();
}
achievement.tierColors = {
	1:{primary:"#009900",secondary:"#00ff00",complete:"#000000",incomplete:"#000000",notification:"#000000"},
	2:{primary:"#aa6600",secondary:"#ff9900",complete:"#000000",incomplete:"#000000",notification:"#000000"},
	3:{primary:"#660066",secondary:"#cc66ff",complete:"#000000",incomplete:"#000000",notification:"#000000"},
	4:{primary:"#009999",secondary:"#00ffff",complete:"#000000",incomplete:"#000000",notification:"#000000"},
	5:{primary:"#000080",secondary:"#6699ff",complete:"#000000",incomplete:"#ffffff",notification:"#000000"},
	6:{primary:"#000000",secondary:"#ffffff",complete:"#ffffff",incomplete:"#ffffff",notification:"#ffffff"}
}
achievement.perAchievementReward = {
	1:{text:"+0.02× X axis effect per achievement in this tier (currently: +{}×)",value:()=>(achievement.ownedInTier(1)/50).toFixed(2)},
	2:{text:"Stars in the first row are 1% stronger per achievement in this tier (currently: {}%)",value:()=>achievement.ownedInTier(2)},
	3:{text:"Gain 1% more free axis from dark matter per achievement in this tier (currently: {}%)",value:()=>achievement.ownedInTier(3)},
	4:{text:"Energy effects are 0.1% stronger per achievement in this tier (currently: {}%)",value:()=>(achievement.ownedInTier(4)/10).toFixed(1)},
	5:{text:"Base knowledge gain is multiplied by achievements in this tier (currently: ×{}). In addition, gain increasing quality-of-life bonuses as more achievements in this tier are unlocked",value:()=>achievement.ownedInTier(5)},
	6:{text:"Research in rows 8-12 is 1% cheaper per achievement in this tier, plus an extra 1% reduction for every 4 achievements (currently: {}%)",value:()=>Math.floor(achievement.ownedInTier(6)*1.25)}
}
achievement.initial = {1:101,2:201,3:301,4:402,5:501,6:601}
achievement.percent = function(value,needed,log){
	let valuefactor=value.layerplus(-log)
	let neededfactor=needed.layerplus(-log)
	let precision = (value.mod(c.d1).eq(c.d0)&&needed.mod(c.d1).eq(c.d0))?0:2
	return "Progress: "+value.noLeadFormat(precision)+" / "+needed.noLeadFormat(precision)+" ("+valuefactor.div(neededfactor).max(c.d0).min(c.d1).mul(c.e2).fix(c.d0).toFixed(2)+"%)";
}
achievement.label = function(id,plural){
	if (plural==undefined) plural=false;
	return "\""+achievement(id).name+"\" achievement"+(plural?"s":"");
}
/*
	name									the name of the achievement
	description					 the listed condition of the achievement
	check								 the function that tests if the condition of the achievement is fulfilled
	progress							a message that shows how close the player is to obtaining the achievement. shown only if incomplete
	visibility						whether or not the achievement is visible
	reward								the listed reward of the achievement
	flavor								a flavor text shown at the bottom of the achievement panel. if this is undefined then nothing is shown
*/
const achievementList = {
	1:{
		101:{
			name:"Straight Line",
			description:"Buy an X Axis",
			check:function(){return g.XAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			reward:"+1% exotic matter",
			flavor:"A Straight Line to the touch is worth a Circle to the sight"
		},
		102:{
			name:"Square",
			description:"Buy a Y Axis",
			check:function(){return g.YAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			reward:"+2% exotic matter",
			flavor:"Upward, not Northward"
		},
		103:{
			name:"Cube",
			description:"Buy a Z Axis",
			check:function(){return g.ZAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[102];},
			reward:"+3% exotic matter",
			flavor:"It is Knowledge; it is Three Dimensions: open your eye once again and try to look steadily."
		},
		104:{
			name:"Time Dimension",
			description:"Buy a W Axis",
			check:function(){return g.WAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[103];},
			reward:"+4% mastery power",
			flavor:"Time is clearly not our natural dimension. Thus it is that we are never really at home in time."
		},
		105:{
			name:"10,000 Hours",
			get description(){return "Accumulate "+BEformat(c.e11)+" mastery power";},
			check:function(){return g.masteryPower.gt(c.e11);},
			progress:function(){return achievement.percent(g.masteryPower,c.e11,0);},
			visibility:function(){return unlocked("Masteries");},
			get reward(){return "Extremely small boost to first row Masteries based on time played (currently: "+this.effect().format(2)+"%)";},
			flavor:"10,000 hours to master your craft.",
			effect:function(){return Decimal.convergentSoftcap(g.truetimePlayed.div(c.e5).add(c.d10).log10().log10(),c.d0_75,c.d1).sqrt();},
		},
		106:{
			name:"10.000 hours?",
			description:"Play for a total of 10 hours",
			check:function(){return g.truetimePlayed>36000;},
			progress:function(){return achievement.percent(g.truetimePlayed.div(c.d3600),c.d10,0);},
			visibility:function(){return true;},
			reward:"Mastery power gain uses a slightly better formula (+0.001 formula exponent)",
			flavor:"Every 10.000 hours in Africa, 600 minutes pass"
		},
		107:{
			name:"X² axis",
			description:"Make the X Axis effect go above 4×",
			check:function(){return stat.XAxisEffect.gt(c.d4);},
			progress:function(){return achievement.percent(stat.XAxisEffect,c.d4,1);},
			visibility:function(){return true;},
			reward:"1 free Y axis",
			flavor:"Space is relative"
		},
		108:{
			name:"Feedback Loop",
			description:"Make the Z Axis effect go above 4×",
			check:function(){return stat.ZAxisEffect.gt(c.d4);},
			progress:function(){return achievement.percent(stat.ZAxisEffect,c.d4,1);},
			visibility:function(){return g.achievement[103];},
			get reward(){return "Gain a free X Axis per {} purchased Z Axis (currently: "+g.ZAxis.mul(this.effect()).noLeadFormat(2)+")"},
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.d0_05:y.eq(c.d0)?c.d0_04:c.d0_2.div(c.d5.sub(y))},
			flavor:"g.exoticmatter++",
			effectFormat:x=>x.recip().noLeadFormat(2),
			yellowBreakpoints:[c.d75,c.d125,0]
		},
		109:{
			name:"Slow",
			description:"Make the W Axis effect go above 4×",
			check:function(){return stat.WAxisEffect.gt(4);},
			progress:function(){return achievement.percent(stat.WAxisEffect,c.d4,1);},
			visibility:function(){return g.achievement[104];},
			reward:"Add 30 seconds to the W Axis timer per W Axis",
			flavor:"Why has the pleasure of slowness disappeared? Ah, where have they gone, the amblers of yesteryear?"
		},
		110:{
			name:"Halted",
			description:"Store 24 hours worth of exotic matter production (hint: is there a way to decrease your production?)",
			check:function(){return g.exoticmatter.div(stat.exoticmatterPerSec).gt(c.d86400)&&timeSinceGameOpened>5;},
			progress:function(){return achievement.percent(g.exoticmatter,stat.exoticmatterPerSec.mul(c.d86400),0);},
			visibility:function(){return true;},
			reward:"If your exotic matter is less than 15 seconds worth of production, it will instantly increase to that amount",
			flavor:"Be not afraid of going slowly, be afraid only of standing still."
		},
		111:{
			name:"Halted II",
			get description(){return "Store "+timeFormat(c.e6)+" (1,000,000 seconds) worth of exotic matter production"},
			check:function(){return g.exoticmatter.div(stat.exoticmatterPerSec).gt(c.e6)&&timeSinceGameOpened>5;},
			progress:function(){return achievement.percent(g.exoticmatter,stat.exoticmatterPerSec.mul(c.e6),0);},
			visibility:function(){return g.achievement[110];},
			reward:"If your exotic matter is less than 30 seconds worth of production, it will instantly increase to that amount",
			flavor:"To feel the life, don’t stand still; to feel the universe, don’t move!"
		},
		112:{
			name:"Halted III",
			get description(){return "Store "+timeFormat(c.e9)+" ("+BEformat(c.e9)+" seconds) worth of exotic matter production"},
			check:function(){return g.exoticmatter.div(stat.exoticmatterPerSec).gt(c.e9)&&timeSinceGameOpened>5;},
			progress:function(){return achievement.percent(g.exoticmatter,stat.exoticmatterPerSec.mul(c.e9),0);},
			visibility:function(){return g.achievement[111];},
			reward:"If your exotic matter is less than 60 seconds worth of production, it will instantly increase to that amount",
			flavor:"Integrity involves the ability to stand straight when you tell your truth, and still stand straight when the other person comes to talk!"
		},
		113:{
			name:"Quadratic",
			get description(){return "Have 9 purchased X Axis"},
			check:function(){return g.XAxis.gte(c.d9);},
			progress:function(){return achievement.percent(g.XAxis,c.d9,0);},
			visibility:function(){return true;},
			reward:"+0.0004× Y Axis effect per Y Axis",
			flavor:"6<sup>X<sup>2</sup></sup>"
		},
		114:{
			name:"Left Wing",
			description:"Have the first Mastery in each of the first four rows active",
			check:function(){return MasteryE(11)&&MasteryE(21)&&MasteryE(31)&&MasteryE(41);},
			progress:function(){return achievement.percent(N([11,21,31,41].map(x=>MasteryE(x)?1:0).sum()),c.d4,0);},
			get reward(){return "+{}% exotic matter (based on mastery power)";},
			visibility:function(){return unlocked("Masteries");},
			flavor:"I'm not for the left wing or the right wing--I'm for the whole bird.",
			effect:function(y=this.yellowValue){
				let out = g.masteryPower.add(c.d1).log10().pow(c.d2).div(c.e3).add(c.d1)
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.d8_5,c.d10):out.pow(out.log10().add(c.d1))).fix(c.d0)
			},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).format(2),
			yellowBreakpoints:[c.d99,c.e2,0]
		},
		115:{
			name:"Cheap Knockoff",
			description:"Have free axis",
			check:function(){return axisCodes.map(x => stat["free"+x+"Axis"]).reduce((x,y)=>x.max(y)).gt(c.d0);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			reward:"+1 exotic matter",
			flavor:"It’s morally wrong to allow a sucker to keep his money.",
		}
	},
	2:{
		201:{
			name:"Back to Hypercube One",
			description:"Generate stardust",
			check:function(){return true;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			get reward(){return "Masteries in the fourth row are {}% stronger (based on total "+(g.achievement[301]?"normal ":"")+"axis)";},
			flavor:"\"Look on my matter, ye Mighty, and despair!\"<br>Nothing beside remains.",
			effect:function(y=this.yellowValue){
				let out = stat.totalAxis.add(c.d1).log10()
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.d4,c.d5):out.mul(out.div(c.e2).add(c.d1))).fix(c.d0)
			},
			effectFormat:x=>x.format(2),
			yellowBreakpoints:[c.d99,c.e2,0]
		},
		202:{
			name:"Timeless",
			get description(){return "Reach "+BEformat(c.e25)+" exotic matter without W Axis";},
			check:function(){return g.exoticmatter.gt(c.e25)&&g.WAxis.eq(c.d0);},
			progress:function(){return g.WAxis.eq(c.d0)?achievement.percent(g.exoticmatter,c.e25,1):"Failed";},
			visibility:function(){return g.achievement[104];},
			reward:"+0.4% stardust per W Axis",
			flavor:"Like all great art, it defies the tyrant Time."
		},
		203:{
			name:"Spaceless",
			get description(){return "Reach "+BEformat(c.e25)+" exotic matter without Z Axis";},
			check:function(){return g.exoticmatter.gt(c.e25)&&g.ZAxis.eq(c.d0);},
			progress:function(){return g.ZAxis.eq(c.d0)?achievement.percent(g.exoticmatter,c.e25,1):"Failed";},
			visibility:function(){return g.achievement[202];},
			reward:"+0.3% stardust per Z Axis",
			flavor:"Four axis good, two axis better"
		},
		204:{
			name:"String Theory",
			get description(){return "Reach "+BEformat(c.e25)+" exotic matter without Y Axis";},
			check:function(){return g.exoticmatter.gt(c.e25)&&g.YAxis.eq(c.d0);},
			progress:function(){return g.YAxis.eq(c.d0)?achievement.percent(g.exoticmatter,c.e25,1):"Failed";},
			visibility:function(){return g.achievement[203];},
			reward:"+0.2% stardust per Y Axis",
			flavor:"It seemed that this poor ignorant Monarch — as he called himself — was persuaded that the Straight Line which he called his Kingdom, and in which he passed his existence, constituted the whole of the world"
		},
		205:{
			name:"0∞",
			get description(){return "Reach "+BEformat(c.e25)+" exotic matter without X Axis";},
			check:function(){return g.exoticmatter.gt(c.e25)&&g.XAxis.eq(c.d0);},
			progress:function(){return g.XAxis.eq(c.d0)?achievement.percent(g.exoticmatter,c.e25,1):"Failed";},
			visibility:function(){return g.achievement[204];},
			reward:"+0.1% stardust per X Axis",
			flavor:"That Point is a Being like ourselves, but confined to the non-dimensional Gulf. He is himself his own World, his own Universe; of any other than himself he can form no conception; he knows not Length, nor Breadth, nor Height, for he has had no experience of them; he has no cognizance even of the number Two; nor has he a thought of Plurality; for he is himself his One and All, being really Nothing."
		},
		206:{
			name:"The Missing Link",
			description:"Make the Y Axis effect go above 0.4×",
			check:function(){return stat.YAxisEffect.gt(c.d0_4);},
			progress:function(){return achievement.percent(stat.YAxisEffect,c.d0_4,0);},
			visibility:function(){return g.achievement[102];},
			get reward(){return "{} free Y axis (based on mastery power)";},
			flavor:"It’s almost impossible to prevent Y axis from breeding, but when a Y axis reproduces evolution is halted and devolution commences. Y axis truly are the missing link of society",
			effect:function(y=this.yellowValue){
				let out = g.masteryPower.add(c.d1).dilate(c.d0_3).pow(c.d0_3)
				return Decimal.convergentSoftcap(out,c.d8,y.eq(c.d1)?c.d512:c.d12).fix(c.d0)
			},
			effectFormat:x=>x.noLeadFormat(2),
			yellowBreakpoints:[c.d99,c.e2,0]
		},
		207:{
			name:"Penteract",
			description:"Buy a V Axis",
			check:function(){return g.VAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[104];},
			get reward(){return "All "+(unlocked("Dark Matter")?"normal axes":"axes")+" are {}% cheaper per "+(unlocked("Dark Matter")?"normal axis":"axis")+" owned";},
			effect:function(y=this.yellowValue){return c.d0_99.div(N(2.2).pow(y))},
			effectFormat:x=>c.d1.sub(x).mul(c.e2).noLeadFormat(2),
			yellowBreakpoints:[c.d0,c.d25,0],
			flavor:"Think outside the tesseract"
		},
		208:{
			name:"Hexeract",
			description:"Buy a U Axis",
			check:function(){return g.UAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[207];},
			get reward(){return "Gain {}% more stardust per "+(unlocked("Dark Matter")?"normal axis":"axis")+" owned";},
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.d1_06:y.eq(c.d0)?c.d1_001:y.mul(c.d0_059).add(c.d1_001)},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).noLeadFormat(2),
			yellowBreakpoints:[c.d0,c.d36,0],
			flavor:"64 vertices, 192 edges, 240 square faces"
		},
		209:{
			name:"Hepteract",
			description:"Buy a T Axis",
			check:function(){return g.TAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[208];},
			get reward(){return "+{}× to the effects of the first seven "+(unlocked("Dark Matter")?"normal axis":"axis")+" per "+(unlocked("Dark Matter")?"normal axis":"axis")+" owned";},
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.d7em4:y.eq(c.d0)?c.em4:c.d7.pow(y).div(c.e4)},
			effectFormat:x=>x.noLeadFormat(2),
			yellowBreakpoints:[c.d0,c.d49,0],
			flavor:"560 cubic cells, 280 tesseract 4-faces, 84 penteract 5-faces"
		},
		210:{
			name:"Octeract",
			description:"Buy a S Axis",
			check:function(){return g.SAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[209];},
			get reward(){return "For every {} of each normal axis owned, gain a free axis of the previous type"+(Decimal.div(axisCodes.map(i=>g[i+"Axis"]).reduce((x,y)=>x.max(y)),achievement(210).effect()).gt(c.d80)?" (softcaps past 80)":"")},
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.d64:y.eq(c.d0)?c.d80:c.d80.sub(y.pow(c.d2div3).mul(c.d16))},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[c.d16,c.d80,0],
			flavor:"80 make an exotic matter galaxy"
		},
		211:{
			name:"Cities you'll never see on screen", 
			get description(){return "Accumulate "+BEformat(c.e80)+" exotic matter";},
			check:function(){return g.exoticmatter.gt(c.e80);},
			progress:function(){return achievement.percent(g.exoticmatter,c.e80,1);},
			visibility:function(){return true;},
			reward:"Z axis effect uses a better formula",
			flavor:"Not very pretty but we sure know how to run things"
		},
		212:{
			name:"Four Second Mile",
			description:"Reach 1609.344 exotic matter within 4 seconds of stardust-resetting",
			req:N(1609.344),
			check:function(){return g.exoticmatter.gt(this.req)&&g.timeThisStardustReset<4;},
			progress:function(){return g.timeThisStardustReset<4?achievement.percent(g.exoticmatter,this.req,0):"Failed";},
			visibility:function(){return true;},
			reward:"The game runs 0.4% faster",
			flavor:"You think a five-minute mile is fast?"
		},
		213:{
			name:"Four Second Mile II",
			get description(){return "Reach "+BEformat(1199169832)+" exotic matter within 4 seconds of stardust-resetting";},
			check:function(){return g.exoticmatter.gt(1199169832)&&g.timeThisStardustReset<4;},
			progress:function(){return g.timeThisStardustReset<4?achievement.percent(g.exoticmatter,c.e9,0):"Failed";},
			visibility:function(){return g.achievement[212];},
			reward:"The game runs 0.4% faster",
			flavor:"Δt²+v²=c²"
		},
		214:{
			name:"Four Second Mile III",
			get description(){return "Reach "+BEformat(1e15)+" exotic matter within 4 seconds of stardust-resetting";},
			check:function(){return g.exoticmatter.gt(1e15)&&g.timeThisStardustReset<4;},
			progress:function(){return g.timeThisStardustReset<4?achievement.percent(g.exoticmatter,c.e15,0):"Failed";},
			visibility:function(){return g.achievement[213];},
			reward:"The game runs 0.4% faster",
			flavor:"You're made for the mile, not the 400, and the sooner you realize that, the better off you're gonna be."
		},
		215:{
			name:"Four Second Mile IV",
			get description(){return "Reach "+BEformat(1e25)+" exotic matter within 4 seconds of stardust-resetting";},
			check:function(){return g.exoticmatter.gt(1e25)&&g.timeThisStardustReset<4;},
			progress:function(){return g.timeThisStardustReset<4?achievement.percent(g.exoticmatter,c.e25,0):"Failed";},
			visibility:function(){return g.achievement[214];},
			reward:"The game runs 0.4% faster",
			flavor:"In skating over thin ice our safety is in our speed."
		},
		216:{
			name:"Zero Player Game",
			description:"Unlock the axis autobuyer",
			check:function(){return g.stardustUpgrades[1]>0;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			reward:"A fading sense of accomplishment",
			flavor:"A game becomes a game when it is played; until then it is only a set of rules and game props awaiting human engagement."
		},
		217:{
			name:"Leet",
			description:"Have exactly 1 X axis, 3 Y axis, 3 Z axis and 7 W axis. Does not include free axes.",
			check:function(){return g.XAxis.eq(c.d1)&&g.YAxis.eq(c.d3)&&g.ZAxis.eq(c.d3)&&g.WAxis.eq(c.d7);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			reward:"+33.7% stardust",
			flavor:"x 4x15 Y 4X15 2 4X15 W 4x15"
		}
	},
	3:{
		301:{
			name:"The Universe is Dark",
			description:"Unlock dark matter",
			check:function(){return g.stardustUpgrades[4]>0;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			get reward(){return "+{}% stardust (based on dark matter)";},
			flavor:"This is not your average, everyday darkness. This is... ADVANCED darkness.",
			effect:function(y=this.yellowValue){
				let out = g.darkmatter.add(c.d1).log10().div(c.e2).add(c.d1)
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.d8_5,c.d10):out.pow(out.log10().add(c.d1))).fix(c.d1)
			},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).format(2),
			yellowBreakpoints:[c.d99,c.e2,0]
		},
		302:{
			name:"Valence",
			get description(){return "Reach "+BEformat(c.inf)+" exotic matter with no partially filled star rows (all rows must be either full or empty)";},
			check:function(){return g.exoticmatter.gt(c.inf)&&this.valence();},
			progress:function(){return this.valence()?achievement.percent(g.exoticmatter,c.inf,1):"Failed";},
			visibility:function(){return true;},
			reward:"+30.8% dark matter per unassigned star",
			flavor:"I made a noble gas joke, sadly nobody reacted",
			valence:function(){return [1,2,3,4,5,6,7,8,9,10].map(x => [1,2,3,4].map(y => g.star[10*x+y]?1:0).sum()%4).sum()==0;}
		},
		303:{
			name:"Parity",
			description:"Have exactly 1 of each normal axis purchased",
			check:function(){return !axisCodes.slice(0,8).map(x => g[x+"Axis"].eq(c.d1)).includes(false);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[210];},
			reward:"1 free dark X axis",
			flavor:"It's odd, but even when you do nothing the numbers keep growing"
		},
		304:{
			name:"Parity II",
			description:"Have exactly 3 of each normal axis purchased",
			check:function(){return !axisCodes.slice(0,8).map(x => g[x+"Axis"].eq(c.d3)).includes(false);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[303];},
			reward:"1 free dark X and Y axis",
			flavor:"Even when the odds are against you"
		},
		305:{
			name:"Parity III",
			description:"Have exactly 5 of each normal axis purchased",
			check:function(){return !axisCodes.slice(0,8).map(x => g[x+"Axis"].eq(c.d5)).includes(false);},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[304];},
			reward:"1 free dark X, Y and Z axis",
			flavor:"May the odds be even in your favor"
		},
		306:{
			name:"Merchant",
			description:"Make the V axis effect go above 44,444×",
			check:function(){return stat.VAxisEffect.gt(c.d44444);},
			progress:function(){return achievement.percent(stat.VAxisEffect,c.d44444,1);},
			visibility:function(){return g.achievement[207];},
			reward:"1 free V axis",
			flavor:"Original replicas!"
		},
		307:{
			name:"Neutron Star",
			description:"Make the U axis effect go above 4×",
			check:function(){return stat.UAxisEffect.gt(c.d4);},
			progress:function(){return achievement.percent(stat.UAxisEffect,c.d4,1);},
			visibility:function(){return g.achievement[208];},
			reward:"1 free U axis",
			flavor:"What do creationists and neutron stars have in common?"
		},
		308:{
			name:"Multinomial Theorem",
			description:"Make the T axis effect go above 44,444×",
			check:function(){return stat.TAxisEffect.gt(c.d44444);},
			progress:function(){return achievement.percent(stat.TAxisEffect,c.d44444,1);},
			visibility:function(){return g.achievement[209];},
			reward:"1 free T axis",
			flavor:"(X+Y+Z+W+V+U+T)<sup>S</sup>"
		},
		309:{
			name:"Grandmastery",
			description:"Have 10 Masteries active simultaneously",
			check:function(){return this.active()>9;},
			progress:function(){return achievement.percent(N(this.active()),c.d10,0);},
			visibility:function(){return true;},
			get reward(){return "Multiply exotic matter gain by mastery power<sup>{}</sup> (based on dark matter)";},
			flavor:"Only one who devotes himself to a cause with his whole strength and soul can be a true grandmaster. For this reason grandmastery demands all of a person.",
			effect:function(y=this.yellowValue){
				let out = g.darkmatter.add(c.d1).log10().sqrt().div(c.e2)
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.d0_5,c.d1):Decimal.logarithmicSoftcap(out,c.d1,c.d1)).fix(c.d0)
			},
			effectFormat:x=>x.format(3),
			yellowBreakpoints:[c.d99,c.d100,0],
			active:function(){return Object.keys(masteryData).map(x => MasteryE(x)?1:0).reduce((x,y) => x+y);}
		},
		310:{
			name:"Superpowered",
			description:"Reach 1,500% Mastery 11 efficiency",
			check:function(){return masteryBoost(11).gte(c.d15);},
			progress:function(){return achievement.percent(masteryBoost(11).mul(c.e2),c.d1500,0);},
			visibility:function(){return true;},
			reward:"Mastery 52 is 1% more effective",
			flavor:"Mastery-Man, Mastery-Man<br>does whatever a master can"
		},
		311:{
			name:"When will it be enough?",
			get description(){return "Reach "+BEformat("ee3")+" exotic matter";},
			check:function(){return g.exoticmatter.gt("ee3");},
			progress:function(){return achievement.percent(g.exoticmatter,c.ee3,1);},
			visibility:function(){return true;},
			get reward(){return "Multiply exotic matter gain by {} (based on exotic matter)";},
			flavor:"The number of Planck volumes in the observable universe is around 4.65×10<sup>185</sup>. Hence find the volume of 1 exotic matter if 1 observable universe = 10<sup>10<sup>3</sup></sup> exotic matters",
			effect:function(y=this.yellowValue){
				let out = g.exoticmatter.add(c.d1).pow(c.em3)
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.e9,c.e10,1):Decimal.linearSoftcap(out,c.e10,c.d1div3,1)).fix(c.d1)
			},
			effectFormat:x=>x.format(2),
			yellowBreakpoints:[c.d99,c.d100,0]
		},
		312:{
			name:"Garage Sale",
			get description(){return "Make the X axis cost go below "+BEformat(c.em40);},
			check:function(){return axisCost("X").lt(c.em40);},
			progress:function(){return achievement.percent(axisCost("X"),c.em40,1);},
			visibility:function(){return true;},
			get reward(){return "Stardust Boost 5 affects Y axis with reduced effect (^0.04)"},
			flavor:"As free as a bird"
		}
	},
	4:{
		401:{
			name:"Supernova Unlocked",
			description:"Have 24 stars",
			check:function(){return g.stars>=24;},
			progress:function(){return achievement.percent(N(g.stars),c.d24,0);},
			visibility:function(){return g.achievement[201];},
			reward:"^1.05 exotic matter",
			flavor:"Without exploding stars, perhaps there could be a heaven, but there is certainly no Earth."
		},
		402:{
			name:"Dark Circle",
			description:"Unlock the first type of Energy",
			check:function(){return energyTypesUnlocked()>=1;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			reward:"+3% all energy gain",
			flavor:"We’re all going to be tested. The dark energy is going to knock on all of our doors"
		},
		403:{
			name:"Genesis",
			description:"Unlock the second type of Energy",
			check:function(){return energyTypesUnlocked()>=2;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			reward:"+4% all energy gain",
			flavor:"There was nowhere to go but everywhere, so just keep on going under the stars."
		},
		404:{
			name:"Grave Matter",
			description:"Unlock the third type of Energy",
			check:function(){return energyTypesUnlocked()>=3;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[403];},
			reward:"+5% all energy gain",
			flavor:"You may hate gravity, but gravity doesn't care"
		},
		405:{
			name:"Brownian Motion",
			description:"Unlock the fourth type of Energy",
			check:function(){return energyTypesUnlocked()>=4;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[404];},
			reward:"+6% all energy gain",
			flavor:"This is what it's like when a species prepares to depart from hyperspace"
		},
		406:{
			name:"Food for Thought",
			description:"Unlock the fifth type of Energy",
			check:function(){return energyTypesUnlocked()>=5;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[405];},
			reward:"+7% all energy gain",
			flavor:"The energy of the mind is the essence of life"
		},
		407:{
			name:"Energized",
			description:"Unlock the sixth type of Energy",
			check:function(){return energyTypesUnlocked()>=6;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[406];},
			reward:"+8% all energy gain",
			flavor:"Everything is energy"
		},
		408:{
			name:"Eternal Inflation",
			description:"Make the dark energy effect exceed 1 within the first 4 minutes of a Stardust reset",
			check:function(){return energyEffect(0).gt(1)&&g.timeThisStardustReset<240;},
			progress:function(){return g.timeThisStardustReset<240?(timeFormat(240-g.timeThisStardustReset)+" left"):"Failed";},
			visibility:function(){return true;},
			get reward(){return "The effect of tickspeed on energy gain is "+(g.lumens[5].gte(this.yellowBreakpoints[0])?"raised to the power of {}":"squared");},
			flavor:"I don't mind going back to daylight saving time. With inflation, the hour will be the only thing I've saved all year.",
			effect:function(y=this.yellowValue){return y.add(c.d2)},
			effectFormat:x=>x.noLeadFormat(4),
			yellowBreakpoints:[c.d100,c.e3,1]
		},
		409:{
			name:"Time is relative",
			description:"Reach 2× tickspeed",
			check:function(){return stat.tickspeed.gte(2);},
			progress:function(){return achievement.percent(stat.tickspeed,c.d2,1);},
			visibility:function(){return true;},
			get reward(){return "Extremely small tickspeed boost based on exotic matter (currently: {}%)";},
			flavor:"All the sounds of the night seemed to pass through a hollow tunnel of indefinite length.",
			effect:function(y=this.yellowValue){return g.exoticmatter.add(c.e10).layerplus(-3).mul(c.d0_8).mul(y.add(c.d1)).fix(c.d0);},
			effectFormat:x=>x.format(2),
			yellowBreakpoints:[c.d30,c.d60,0],
		},
		410:{
			name:"Time is relative II",
			description:"Reach 4× tickspeed",
			check:function(){return stat.tickspeed.gte(4);},
			progress:function(){return achievement.percent(stat.tickspeed,c.d4,1);},
			visibility:function(){return g.achievement[409];},
			get reward(){return "Extremely small tickspeed boost based on mastery power (currently: {}%)";},
			flavor:"If I get up early the day feels longer than if I get up late, even if I spend the same amount of time awake.",
			effect:function(y=this.yellowValue){return g.masteryPower.add(c.e10).layerplus(-3).mul(c.d1_2).mul(y.add(c.d1)).fix(c.d0);},
			effectFormat:x=>x.format(2),
			yellowBreakpoints:[c.d40,c.d70,0],
		},
		411:{
			name:"Time is relative III",
			description:"Reach 8× tickspeed",
			check:function(){return stat.tickspeed.gte(8);},
			progress:function(){return achievement.percent(stat.tickspeed,c.d8,1);},
			visibility:function(){return g.achievement[410];},
			get reward(){return "Extremely small tickspeed boost based on stardust (currently: {}%)";},
			flavor:"A mathematician makes plans to travel backwards in time through a wormhole to a parallel universe when he can't even make it to Mars with the fastest rocket on hand today.",
			effect:function(y=this.yellowValue){return g.stardust.add(c.e10).layerplus(-3).mul(y.add(c.d1)).fix(c.d0);},
			effectFormat:x=>x.format(2),
			yellowBreakpoints:[c.d50,c.d80,0],
		},
		412:{
			name:"Full House",
			description:"Buy a star from the final row",
			check:function(){return g.star[101]||g.star[102]||g.star[103]||g.star[104];},
			progress:function(){return "Not Completed!";},
			visibility:function(){return g.achievement[201];},
			get reward(){return "Multiply stardust gain by "+this.effect().format(2)+" (based on dark stars)";},
			flavor:"More than a paradise",
			effect:function(){return Decimal.logarithmicSoftcap([c.d1_125,g.darkstars,c.d2].decimalPowerTower(),c.inf,c.d1).fix(c.d1);}
		},
		413:{
			name:"OMCCDV",
			get description(){return "Reach "+BEformat("e44031")+" exotic matter";},
			check:function(){return g.exoticmatter.gt("e44031");},
			progress:function(){return achievement.percent(g.exoticmatter,c.e44031,1);},
			visibility:function(){return g.achievement[413];},	/* this is a secret achievement of sorts */
			reward:"Increase mastery power gain by 19.07% per S axis and 20.20% per dark S axis",
			flavor:"Here's my random number so call me maybe"
		}
	},
	5:{
		501:{
			name:"Wormhole to Somewhere",
			description:"Destroy the universe",
			check:function(){return true;},
			progress:function(){return "Not Completed!";},
			visibility:function(){return true;},
			get reward(){return "+0.01% to exotic matter, mastery power, stardust and dark matter gain per second spent in the current universe (current total: +"+g.truetimeThisWormholeReset.div(c.e2).format(2)+"%"+(MasteryE(101)?" before Mastery 101":"")+")"},
			flavor:"The urge to destroy is also a creative urge."
		},
		502:{
			name:"Iron Will",
			get description(){return "Reach "+BEformat(1e50)+" exotic matter without stardust-resetting or having research in the current universe";},
			check:function(){return g.exoticmatter.gt(1e50)&&stat.ironWill;},
			progress:function(){return stat.ironWill?achievement.percent(g.exoticmatter,c.e50,1):"Failed";},
			visibility:function(){return true;},
			reward:"Dark axis cost scaling is 5% weaker",
			flavor:"What does not kill you makes you stronger"
		},
		503:{
			name:"Iron Will II",
			get description(){return "Reach "+BEformat(1e130)+" exotic matter without stardust-resetting or having research in the current universe";},
			check:function(){return g.exoticmatter.gt(1e130)&&stat.ironWill;},
			progress:function(){return stat.ironWill?achievement.percent(g.exoticmatter,c.e130,1):"Failed";},
			visibility:function(){return g.achievement[502];},
			reward:"Normal axis cost scaling is 5% weaker",
			flavor:"You're only given a little spark of madness. You mustn't lose it"
		},
		504:{
			name:"Iron Will III",
			description:"Unlock Dark Matter without stardust-resetting or having research in the current universe",
			check:function(){return g.stardustUpgrades[4]>0&&stat.ironWill;},
			progress:function(){return stat.ironWill?"Still possible":"Failed";},
			visibility:function(){return g.achievement[503];},
			reward:"Gain 5% more Discoveries from all sources",
			flavor:"This is fine"
		},
		505:{
			name:"Iron Will IV",
			description:"Buy a dark X Axis without stardust-resetting or having research in the current universe",
			check:function(){return g.darkXAxis.gt(0)&&stat.ironWill;},
			progress:function(){return stat.ironWill?"Still possible":"Failed";},
			visibility:function(){return g.achievement[504];},
			get reward(){return "Normal S axis are "+this.effect().sub(c.d1).mul(c.e2).toFixed(1)+"% stronger (increases at milestones of total dark axis reached in Iron Will mode. "+(this.milestones()==40?"All milestones have been reached!)":("Next milestone at "+this.effectBreakpoints[this.milestones()]+" total dark axis)"));},
			flavor:"As a young man just starting out…<br>… I was very poor.<br>But, I never gave up. And today, after many years of hard work and perseverance…<br>… I am old.",
			effectBreakpoints:[c.d2,c.d3,c.d4,c.d5,c.d6,c.d7,c.d8,c.d9,c.d10,c.d12,c.d15,c.d20,c.d25,c.d30,c.d40,c.d50,c.d60,c.d70,c.d80,c.d90,c.e2,c.d120,c.d140,c.d160,c.d180,c.d200,c.d225,c.d250,c.d275,c.d300,c.d325,c.d350,c.d400,c.d450,c.d500,c.d550,c.d600,c.d700,c.d800,c.d900],
			milestones:function(){for(let i=39;i>=0;i--){if(g.ach505Progress.gt(this.effectBreakpoints[i])){return i+1}};return 0},
			effect:function(){return N(1.01+this.milestones()/1e3).fix(c.d0);}
		},
		506:{
			name:"Iron Will V",
			description:"Destroy the universe without stardust-resetting or having research in the current universe",
			check:function(){return stat.ironWill;},
			progress:function(){return stat.ironWill?"Still possible":"Failed";},
			visibility:function(){return g.achievement[505];},
			reward:"Hawking radiation gain ^1.1",
			flavor:"A child ardent for some desperate glory"
		},
		507:{
			name:"Hyperspeed",
			description:"Destroy the universe within 5 hours of starting it",
			check:function(){return g.timeThisWormholeReset<18000;},
			progress:function(){return g.timeThisWormholeReset<18000?(timeFormat(18000-g.timeThisWormholeReset)+" left"):("Fastest time is "+timeFormat(g.fastestWormholeReset));},
			visibility:function(){return true;},
			get reward(){return "Stardust Boost 1 is "+this.effect().noLeadFormat(2)+"% stronger (based on fastest Wormhole reset, cap at 18 seconds)";},
			flavor:"N o t h i n g	 t r a v e l s	 f a s t e r	 t h a n	 t h e	 s p e e d	 o f	 l i g h t",
			effect:function(){return c.d18000.div(g.fastestWormholeReset.max(c.d18)).log10().max(c.d0).simplex(2).mul(c.d2_5).fix(0);}
		},
		508:{
			name:"Hyperspeed II",
			description:"Destroy the universe within 30 minutes of starting it",
			check:function(){return g.timeThisWormholeReset<1800;},
			progress:function(){return g.timeThisWormholeReset<1800?(timeFormat(1800-g.timeThisWormholeReset)+" left"):("Fastest time is "+timeFormat(g.fastestWormholeReset));},
			visibility:function(){return g.achievement[507];},
			get reward(){return "Stardust Boost 4 is "+this.effect().noLeadFormat(2)+"% stronger (based on fastest Wormhole reset, cap at 18 seconds)";},
			flavor:"w	i	t	h		 t	h	e		 p	o	s	s	i	b	l	e		 e	x	c	e	p	t	i	o	n",
			effect:function(){return c.d1800.div(g.fastestWormholeReset.max(c.d18)).log10().max(0).simplex(2).mul(c.d10div3).fix(0);}
		},
		509:{
			name:"Hyperspeed III",
			description:"Destroy the universe within 3 minutes of starting it",
			check:function(){return g.timeThisWormholeReset<180;},
			progress:function(){return g.timeThisWormholeReset<180?(timeFormat(180-g.timeThisWormholeReset)+" left"):("Fastest time is "+timeFormat(g.fastestWormholeReset));},
			visibility:function(){return g.achievement[508];},
			get reward(){return "Stardust Boost 7 is "+this.effect().noLeadFormat(2)+"% stronger (based on fastest Wormhole reset, cap at 18 seconds)";},
			flavor:"o	 f			 b	 a	 d			 n	 e	 w	 s",
			effect:function(){return c.d180.div(g.fastestWormholeReset.max(c.d18)).log10().max(0).simplex(2).mul(c.d5).fix(0);}
		},
		510:{
			name:"Hyperspeed IV",
			description:"Destroy the universe within 18 seconds of starting it",
			check:function(){return g.timeThisWormholeReset<18;},
			progress:function(){return g.timeThisWormholeReset<18?(timeFormat(18-g.timeThisWormholeReset)+" left"):("Fastest time is "+timeFormat(g.fastestWormholeReset));},
			visibility:function(){return g.achievement[509];},
			reward:"The game runs 0.1% faster per total Discovery, up to 25%",
			flavor:"w		 h		 i		 c		 h					 f		 o		 l		 l		 o		 w		 s					 i		 t		 s					 o		 w		 n					 s		 p		 e		 c		 i		 a		 l					 l		 a		 w		 s",
		},
		511:{
			name:"Enneract",
			get description(){return "Reach "+BEformat(c.d9_999e99)+" stardust first, then raise that to the power of 9 with a single reset";},
			check:function(){return stat.pendingstardust.gt(g.stardust.pow(c.d9))&&g.stardust.gt(c.d9_999e99);},
			progress:function(){return g.stardust.gt(c.d9_999e99)?achievement.percent(stat.pendingstardust,g.stardust.pow(c.d9),1):("(Progress: Reach "+BEformat(c.d9_999e99)+" stardust first)");},
			visibility:function(){return true;},
			reward:"Normal U axis is 0.9% stronger",
			flavor:"Slabdrill?",
		},
		512:{
			name:"Shine Bright Tonight",
			description:"Destroy the universe, never having more dark stars than normal stars (including allocated)",
			check:function(){return g.shiningBrightTonight;},
			progress:function(){return g.shiningBrightTonight?"Still possible":"Failed";},
			visibility:function(){return true;},
			reward:"Dark stars are 0.25% cheaper per normal star",
			flavor:"Like diamonds in the sky"
		},
		513:{
			name:"Duplicated",
			description:"Bulk buy 20 dark stars at once",
			check:function(){return true;},					/* This gets checked locally by the dark star gaining function */
			progress:function(){return achievement.percent(stat.maxAffordableDarkStars.sub(g.darkstars),c.d20,0);},
			visibility:function(){return true;},
			reward:"2× dark matter per dark star",
			flavor:"The greatest shortcoming of the human race is our inability to understand the exponential function."
		},
		514:{
			name:"Duplicated II",
			description:"Bulk buy 35 dark stars at once",
			check:function(){return true;},					/* This gets checked locally by the dark star gaining function */
			progress:function(){return achievement.percent(stat.maxAffordableDarkStars.sub(g.darkstars),c.d35,0);},
			visibility:function(){return g.achievement[513];},
			reward:"2× dark matter per dark star",
			flavor:"Anyone who believes exponential growth can go on forever in a finite world is either a madman or an economist."
		},
		515:{
			name:"Duplicated III",
			description:"Bulk buy 50 dark stars at once",
			check:function(){return true;},					/* This gets checked locally by the dark star gaining function */
			progress:function(){return achievement.percent(stat.maxAffordableDarkStars.sub(g.darkstars),c.d50,0);},
			visibility:function(){return g.achievement[514];},
			reward:"2× dark matter per dark star",
			flavor:"10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10</sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup>"
		},
		516:{
			name:"Black Hole Era",
			description:"Destroy a universe that has no stars",
			check:function(){return g.stars==0;},
			progress:function(){return g.stars==0?"Still achievable":"Failed";},
			visibility:function(){return true;},
			reward:"Stars in the 5th and 10th rows additionally make the respective Masteries 1% stronger",
			flavor:"Eyes as black and as shiny as chips of obsidian stared back into his. They were eyes like black holes, letting nothing out, not even information."
		},
		517:{
			name:"Cheap Fill",
			get description(){return "Make all normal axis costs go below "+BEformat(c.eme6);},
			check:function(){return this.lowest().lt(c.eme6);},
			progress:function(){return achievement.percent(this.lowest(),c.eme6,1);},
			visibility:function(){return true;},
			reward:"All normal axis costs ^0.95",
			flavor:"Baby, I don't need matter bills to have fun tonight",
			lowest:function(){return axisCodes.slice(0,8).map(x => axisCost(x)).reduce((x,y) => x.max(y));}
		},
		518:{
			name:"Irradiated",
			description:"Gain 696,342 hawking radiation from a single Wormhole reset",
			check:function(){return stat.pendinghr.gt(696342);},
			progress:function(){return achievement.percent(stat.pendinghr,c.d696342,0);},
			visibility:function(){return true;},
			get reward(){return "Exotic matter gain is multiplied by "+this.effect().format(2)+" (based on observations)";},
			flavor:"Above them, paralyzing half the heavens, burned a great sun. It burnt without cease, always fixed and still at one point in the sky, and so would burn until that day — now no longer impossibly distant — when it burnt itself out.",
			effect:function(){return g.observations.map(x=>[c.d2,x,c.d0_75].decimalPowerTower()).productDecimals().fix(c.d1);}
		},
		519:{
			name:"Shiny Yellow Orbs",
			description:"Accumulate 40 stars without allocating any of them in the current universe",
			check:function(){return g.stars>=40&&g.ach519possible;},
			progress:function(){return g.ach519possible?achievement.percent(N(g.stars),c.d40,0):"Failed";},
			visibility:function(){return true;},
			get reward(){return "Stars are {}× cheaper per Stardust Upgrade owned. Stardust Upgrades are {}× cheaper per star owned."},
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.inf:y.eq(c.d0)?c.d2:[c.d2,c.d1024,y].decimalPowerTower()},
			effectFormat:x=>x.noLeadFormat(2),
			yellowBreakpoints:[c.d10,c.e10,2],
			flavor:"You do know how these work, right?"
		},
		520:{
			name:"Rationing",
			description:"Destroy the universe with no more than 15 stardust upgrades",
			check:function(){return this.owned()<=15;},
			progress:function(){return this.owned()>15?"Failed":((15-this.owned())+" upgrade"+(this.owned()==14?"":"s")+" left");},
			visibility:function(){return true;},
			reward:"Square root the cost of the first level of each Stardust Upgrade",
			flavor:"The worst advertisement for Socialism is its adherents.",
			owned:function(){return g.stardustUpgrades.sum();}
		},
		521:{
			name:"Bejouled",
			description:"Destroy the universe without unlocking neural energy",
			check:function(){return energyTypesUnlocked()<5;},
			progress:function(){return energyTypesUnlocked()<5?"Still achievable":"Failed";},
			visibility:function(){return true;},
			reward:"+50% neural and meta energy gain",
			flavor:"5 hours of energy but you can eat it in 3 seconds"
		},
		522:{
			name:"Bejouled II",
			description:"Destroy the universe without unlocking gravitational energy",
			check:function(){return energyTypesUnlocked()<3;},
			progress:function(){return energyTypesUnlocked()<3?"Still achievable":"Failed";},
			visibility:function(){return g.achievement[521];},
			reward:"+50% gravitational and spatial energy gain",
			flavor:"25-hour energy: for those who need an extra hour in the day"
		},
		523:{
			name:"Bejouled III",
			description:"Destroy the universe without unlocking dark energy",
			check:function(){return energyTypesUnlocked()<1;},
			progress:function(){return energyTypesUnlocked()<1?"Still achievable":"Failed";},
			visibility:function(){return g.achievement[522];},
			reward:"+50% dark and stelliferous energy gain",
			flavor:"You still have six joules regardless."
		},
		524:{
			name:"Mastery is not a trivial monster",
			description:"Destroy the universe without having active Masteries at any point",
			check:function(){return g.ach524possible;},
			progress:function(){return g.ach524possible?"Still achievable":"Failed";},
			visibility:function(){return true;},
			reward:"Unlock a new row of Masteries",
			flavor:"Now with 270% more accidents involving falling objects",
			active:function(){return !g.activeMasteries.map(x=>x==0).includes(false);}
		},
		525:{
			name:"You didn't need it anyway",
			description:"Destroy the universe without buying S axis of any kind",
			check:function(){return g.ach525possible;},
			progress:function(){return g.ach525possible?"Still achievable":"Failed";},
			visibility:function(){return true;},
			reward:"+0.0001 normal and dark S axis effect",
			flavor:"Minimalism at its finest"
		},
		526:{
			name:"Big Crunch",
			description:"Buy a dark X axis without buying normal axis in the current Wormhole reset",
			check:function(){return g.ach526possible&&g.darkXAxis.gt(0)&&unlocked("Hawking Radiation");},
			progress:function(){return g.ach526possible?"Still achievable":"Failed";},
			visibility:function(){return g.achievement[525];},
			get reward(){return "+"+this.effect().format(3)+" normal and dark S axis effect (based on total normal axis)";},
			flavor:"",		// intentionally left blank
			effect:function(){return Decimal.convergentSoftcap(stat.totalAxis.add(c.d1).log10().div(c.e4),c.d0_0004,c.d0_0009)},
		},
		527:{
			name:"The 4th dimension doesn't exist",
			description:"Reach 160 total dark axis without more than 3 different types of dark axis",
			check:function(){return stat.totalDarkAxis.gte(160)&&this.active()&&achievement.ownedInTier(5)>=7;},
			progress:function(){return this.active()?achievement.percent(stat.totalDarkAxis,c.d160,0):"Failed";},
			visibility:function(){return achievement.ownedInTier(5)>=7;},
			reward:"Dark star cost scaling starts 4 dark stars later",
			flavor:"Einstein would agree",
			active:function(){return axisCodes.map(x => g["dark"+x+"Axis"].eq(c.d0)?0:1).sum()<=3;}
		},
		528:{
			name:"Grand Balance",
			description:"Have exactly 40 stars and 40 dark stars",
			check:function(){return g.stars==40&&g.darkstars.eq(c.d40);},
			progress:function(){return (g.stars<=40&&g.darkstars.lte(c.d40))?achievement.percent(Decimal.add(g.stars,g.darkstars),c.d80,0):"Failed";},
			get reward(){return "For every 125 normal axis, gain 1 of the corresponding dark axis for free"+(axisCodes.map(i=>g[i+"Axis"]).reduce((x,y)=>x.max(y)).gt(12500)?" (softcaps past 100)":"")},
			visibility:function(){return true;},
			flavor:"Does not include neutron stars, protostars, white dwarf stars, blue hypergiant stars nor starfish"
		},
		529:{
			name:"Millionaire",
			get description(){return "Reach "+BEformat(c.ee6)+" exotic matter";},
			check:function(){return g.exoticmatter.gt(c.ee6);},
			progress:function(){return achievement.percent(g.exoticmatter,c.ee6,1);},
			visibility:function(){return true;},
			get reward(){return "The base value of the base mastery power exponent is multiplied by "+this.effect().format(4)+" (based on unspent hawking radiation)<br><span class=\"small\">(TL:DR - more mastery power)</span>";},
			flavor:"Go become a millionaire in real life.",
			effect:function(){return Decimal.mul(Decimal.convergentSoftcap(g.hawkingradiation.add(c.d10).dilate(c.d0_1).div(c.d10),c.d1_75,c.d2),g.hawkingradiation.add(c.e10).log10().log10()).fix(c.d1);}
		},
		530:{
			name:"Big Bang",
			description:"Bulk buy 4,800 normal axis at once",
			check:function(){return unlocked("Hawking Radiation");},	 // checked locally by axis-buying function, but no spoilers
			progress:function(){return achievement.percent(axisCodes.map(x => maxAffordableAxis(x)).reduce((x,y)=>x.add(y)).sub(stat.totalAxis),c.d4800,0);},
			visibility:function(){return true;},
			reward:"Dark axis cost scaling is 1% weaker",
			flavor:"Did God create man or did man create God?"
		}
	},
	6:{
		601:{
			name:"Enlightenment",
			description:"Unlock Light",
			check:function(){return g.research.r8_8},
			progress:function(){return "Not Completed!"},
			visibility:function(){return g.researchVisibility.includes("r7_8");},
			get reward(){return "+"+this.effect().sub(c.d1).mul(c.e2).format(2)+"% hawking radiation (based on exotic matter and stardust)"},
			flavor:"Oh, how hard it is to be the only one who knows the truth!",
			effect:function(){return [g.exoticmatter.add(c.d1).pow(c.em8).mul(c.d10).layerplus(-2),g.stardust.add(c.d1).pow(c.em5).mul(c.d10).layerplus(-2)].productDecimals().pow10()},
		},
		602:{
			name:"District 13",
			description:"Unlock 12 Stardust Boosts",
			check:function(){return g.stardustUpgrades[2]>9},
			progress:function(){return achievement.percent(N(g.stardustUpgrades[2]+2),c.d12,0)},
			visibility:function(){return true;},
			reward:"The cost of the third Stardust Upgrade is raised to the power of 0.9",
			flavor:"Ladies and gentlemen... welcome to the 76th Hunger Games!",
		},
		603:{
			name:"16,777,216 Color Theorem",
			description:"Get 1 of each primary lumen",
			check:function(){return !g.lumens.slice(0,3).map(x=>x.eq(c.d0)).includes(true)},
			progress:function(){return achievement.percent(g.lumens.slice(0,3).map(x=>x.min(c.d1)).sumDecimals(),c.d3,0)},
			visibility:function(){return g.achievement[601];},
			get reward(){return "+"+this.effect().sub(c.d1).mul(c.e2).format()+"% chroma gain (based on total lumens)"},
			flavor:"The soul becomes dyed with the color of its thoughts.",
			effect:function(){return g.lumens.sumDecimals().div(c.d100).add(c.d1)}
		},
		604:{
			name:"Graduation",
			description:"Complete any Study four times",
			check:function(){return g.studyCompletions.includes(4)},
			progress:function(){return achievement.percent(N(g.studyCompletions.slice(1).reduce((x,y)=>Math.max(x,y))),c.d4,0)},
			visibility:function(){return g.achievement[501];},
			get reward(){return "Every Study completion gives 1% of the relevant Study's base cost as free Discoveries (current total: "+this.effValue().noLeadFormat(2)+")"},
			flavor:"He would automatically begin to assume that specialists in all other fields were magicians, judging the depth of their wisdom by the breadth of his own ignorance...",
			effValue:function(){return countTo(studies.length-1).map(x=>research[studies[x].research].basecost.mul(0.01*g.studyCompletions[x])).sumDecimals()}
		},
		605:{
			name:"Time of Gifts",
			description:"Reach 256× tickspeed",
			check:function(){return stat.tickspeed.gte(c.d256)},
			progress:function(){return achievement.percent(stat.tickspeed,c.d256,1)},
			visibility:function(){return true;},
			reward:"Research 8-2 is 10% stronger",
			flavor:"To give somebody your time is the biggest gift you can give."
		},
		606:{
			name:"Ball Lightning",
			req:N(10).quad_tetr(Math.PI),
			get description(){return "Reach "+this.req.format()+" (10^^π) dark energy"},
			check:function(){return g.darkEnergy.gt(this.req)},
			progress:function(){return achievement.percent(g.darkEnergy,this.req,1)},
			visibility:function(){return true},
			get reward(){return "+"+this.effect().sub(c.d1).mul(c.e2).format(2)+"% all energy gain (based on dark energy)"},
			flavor:"Programming graphics in X is like finding the square root of π using Roman numerals",
			effect:function(){return g.darkEnergy.mul(c.ee10).layerplus(-3).pow(c.d2)}
		},
		607:{
			name:"There are Four Lights",
			description:"Have at least 1 of four colors of lumen",
			check:function(){return this.lumens()>3},
			progress:function(){return achievement.percent(N(this.lumens()),c.d4,0)},
			visibility:function(){return g.achievement[601]},
			get reward(){return "+"+this.effect().sub(c.d1).mul(c.e2).format(2)+"% chroma gain (based on stars below 60)"},
			flavor:"There are six lights. How many do you see now?",
			effect:function(){return g.stars==60?c.d1:c.d1_01.pow(N(60-g.stars).simplex(2))},
			lumens:function(){return countTo(6,true).map(x=>g.lumens[x].gt(c.d0)?1:0).sum()},
		},
		608:{
			name:"Zero Player Game II",
			description:"Complete the fourth level of Study I without any clicks in the current Wormhole",
			check:function(){return (g.activeStudy==1)&(g.studyCompletions[1]>2)&&(!g.clickedInStudy1)},
			progress:function(){return (g.studyCompletions[1]<3)?"Complete Study I 3 times first":(g.activeStudy!==1)?"Enter Study I first":g.clickedInStudy1?"Failed":"Still possible"},
			visibility:function(){return g.achievement[601]},
			reward:"The third reward of Study I is 11.1% stronger",
			flavor:"The only time a lazy man ever succeeds is when he tries to do nothing."
		},
		609:{
			name:"Black Hole Era II",
			description:"Complete the fourth level of Study II without any stars",
			check:function(){return (g.activeStudy==2)&(g.studyCompletions[2]>2)&&(g.stars==0)},
			progress:function(){return (g.studyCompletions[2]<3)?"Complete Study II 3 times first":(g.activeStudy!==2)?"Enter Study II first":(g.stars==0)?"Still possible":"Failed"},
			visibility:function(){return true},
			reward:"The third reward of Study II is 11.1% stronger",
			flavor:"Let's not strive to be black holes in the meantime. Let's illuminate the world instead of darkening it, instead of tearing it to pieces. Let's prove we are worthy of being stardust."
		},
		610:{
			name:"Triple Nine Society",
			description:"Reach 999 Discoveries",
			check:function(){return g.totalDiscoveries.gte(999)},
			progress:function(){return achievement.percent(g.totalDiscoveries,N(999),0)},
			visibility:function(){return g.achievement[501]},
			get reward(){return "+"+this.effect().sub(c.d1).mul(c.e2).format(2)+"% hawking radiation (based on percentage of unspent Discoveries)"},
			flavor:"\"999 Emergencies, what is your emergency?\"<br>\"MY FITBIT SAYS I’M ABOUT TO DIE!\"",
			effect:function(){return unspentDiscoveries().div(g.totalDiscoveries.gte(999)?g.totalDiscoveries:g.totalDiscoveries.mul(999).sqrt().max(c.d1)).add(c.d1)},
		},
		611:{
			name:"Pieces of Eight",
			description:"Unlock 8 colors of Light",
			check:function(){return g.research.r11_8},
			progress:function(){return "Not Completed!"},
			visibility:function(){return g.achievement[607]},
			reward:"+0.25% chroma gain per dark star",
			flavor:"Stars, hide your fires, let not light see my black and deep desires",
			effect:function(){return (g.darkstars.gte(c.e2)?c.d1_04.pow(g.darkstars.sub(c.e2)):g.darkstars.pow(c.d4).div(c.e8)).add(c.d1)}
		},
		612:{
			name:"Star-Spangled Banner",
			description:"Buy the 60th star",
			check:function(){return g.stars==60},
			progress:function(){return achievement.percent(N(g.stars),c.d60,0)},
			visibility:function(){return true},
			reward:"Each stardust upgrade raises the star cost to the power of 0.999. Each star raises the stardust upgrade cost to the power of 0.999.",
			flavor:"<span style=\"color:#8a8767;text-shadow: 0px 1px 0px #a0a67c;\">(hardcapped)</span>"
		}
	}
};
achievement.all = Object.values(achievementList).map(x => Object.keys(x)).flat()
const secretAchievementRarityNames = [null,"Super Easy","Common","Rare","Legendary","Mythical","Shiny","Celestial"]
const secretAchievementRarityColors = [null,"#999999","#00cc00","#cc66ff","#ff6600","#ff3333","#ffff00","#3333ff"]
const secretAchievementList = {
	1:{
		name:"Prestigious",
		description:"Stardust reset 10,000 times",
		check:function(){return g.TotalStardustResets>=1e4;},
		flavor:"What are you doing with your life...",
		rarity:4
	},
	2:{
		name:"Anniversary",
		description:"Play <i>Exotic Matter Dimensions</i> on its anniversary (using UTC time zone)",
		check:function(){return (new Date().getUTCMonth()==1)&&(new Date().getUTCDate()==22);},
		flavor:"bUt 22/2/22 sHoUlD bE 2022-02-22, lIkE tHe rEsT oF tHe cHaNgElOg!",
		rarity:3
	},
	3:{
		name:"Epsilon Time",
		description:"Have 10 consecutive frames be more than 1 second long",
		check:function(){return lagAchievementTicks>=10;},
		flavor:"Oh, hey... you're still here?",
		rarity:1
	},
	4:{
		name:"Oh, hey... you're still here?",
		description:"Have the game window open for 8 hours",
		check:function(){return timeSinceGameOpened>28800;},
		reward:"Lifetime membership at <a href=\"https://www.reddit.com/r/StopGaming\" style=\"color:#999999\">https://www.reddit.com/r/StopGaming</a>",
		flavor:"Well, I'm flattered that people are having so much fun with <i>Exotic Matter Dimensions</i>!<br>But seriously, get help.",
		rarity:2
	},
	5:{
		name:"Legacy",
		description:"Play for a year.",
		check:function(){return g.timePlayed>31556926;},
		flavor:"...and then you set Overclock to 10,000× and blow it all instantly.",
		rarity:6
	},
	6:{
		name:"I am speed",
		description:"Have 10 consecutive frames be 50 milliseconds long (maximum fps)",
		check:function(){return fpsAchievementTicks>=10;},
		flavor:"1200 frames per minute! Wow. AleManInc only gets 20 frames per minute.",
		rarity:1
	},
	7:{
		name:"Rasputin",
		description:"Import \"cat\" as a savefile",
		check:function(){return true;}, // checked locally
		flavor:"There was a cat that really was gone",
		rarity:3
	},
	8:{
		name:"Help Wanted",
		description:"Import \"AleManInc\" as a savefile",
		check:function(){return true;}, // checked locally
		flavor:"Have you considered becoming an EMD beta tester? Well, what if I told you that <b>all players already are beta testers?</b>",
		rarity:3
	},
	9:{
		name:"The Ultimate Upgrade",
		description:"Click the text of the Secret Achievement boost in the stat breakdown",
		check:function(){return true;},
		flavor:"There is much pleasure to be gained from useless upgrades.",
		rarity:2
	},
	10:{
		name:"Nice",
		description:"Input 69 into any input",
		check:function(){return true;}, // checked locally
		flavor:"Don't act like you don't know what you did.",
		rarity:2
	},
	11:{
		name:"You do know how these work, right?",
		description:"Respec Research without having any research.",
		check:function(){return g.researchRespec&&(!Object.values(g.research).includes(true));},
		flavor:"<a style=\"color:#ffffff\" href=\"https://books.google.co.uk/books/about/Quantum_Physics_For_Dummies.html?id=pRRq8vCFvzEC&source=kp_book_description&redir_esc=y\">Studies will help</a>",
		rarity:3
	},
	12:{
		name:"Precision to the millimeter",
		description:"Destroy the universe with exactly 1,000 total dark axis",
		check:function(){return stat.totalDarkAxis.eq(c.e3);},
		flavor:"Should we tell them about buy max...",
		rarity:3
	},
	13:{
		name:"One in a Million",
		description:"You have a 1 in 1,000,000 chance of getting this achievement every second",
		check:function(){return true;}, // checked locally
		flavor:"It takes on average 11 days, 13 hours, 46 minutes and 40 seconds to get this. That's... not that long.",
		chance:function(time){return 1-Math.exp(-time/1e6);},
		rarity:5
	},
	14:{
		name:"One in a Billion",
		description:"You have a 1 in 1,000,000,000 chance of getting this achievement every second",
		check:function(){return true;}, // checked locally
		flavor:"It takes on average 31 years, 259 days, 1 hour, 46 minutes and 40 seconds to get this. Thank you for spending that time with <i>Exotic Matter Dimensions</i>!",
		chance:function(time){return 1-Math.exp(-time/1e9);},
		rarity:6
	},
	15:{
		name:"One in a Trillion",
		description:"You have a 1 in 1,000,000,000,000 chance of getting this achievement every second",
		check:function(){return true;}, // checked locally
		flavor:"It takes on average 31,709 years, 289 days, 1 hour, 46 minutes and 40 seconds to get this. Did you have fun?",
		chance:function(time){return 1-Math.exp(-time/1e12);},
		rarity:7
	},
	16:{
		name:"Professional decorator",
		description:"Toggle the color theme 20 times in one session.",
		check:function(){return themeAchievementCount>19;},
		reward:"Unlock a new color theme",
		flavor:"Another DarkReader glitch? *sigh*",
		rarity:3
	},
	17:{
		name:"Go research in real life instead.",
		description:"Buy the secret research.",
		check:function(){return g.research.r6_9;},
		flavor:"<b>its not Free, Its Negative free, and Negative free is expensive.</b> - Stat Mark",
		rarity:2
	},
	18:{
		name:"Empowered Exotic Matter Dimensions",
		description:"Try to buy an empowered axis",
		check:function(){return empoweredAxisBought>=1;},
		flavor:"Just call it the R axis!",
		rarity:1
	},
	19:{
		name:"Empowered Exotic Matter Dimensions II",
		description:"Try to buy an empowered axis 10 times in one session",
		check:function(){return empoweredAxisBought>=10;},
		flavor:"Cost: 100 empowered exotic matter",
		rarity:2
	},
	20:{
		name:"Empowered Exotic Matter Dimensions III",
		description:"Try to buy an empowered axis 100 times in one session",
		check:function(){return empoweredAxisBought>=100;},
		flavor:"Stop it. Get some help.",
		rarity:2
	},
	21:{
		name:"Empowered Exotic Matter Dimensions IV",
		description:"Try to buy an empowered axis 1,000 times in one session",
		check:function(){return empoweredAxisBought>=1000;},
		flavor:"This is the last one, I promise.",
		rarity:3
	},
	22:{
		name:"Empowered Exotic Matter Dimensions V",
		description:"Try to buy an empowered axis 10,000 times in one session",
		check:function(){return empoweredAxisBought>=10000;},
		get flavor(){return (empoweredAxisBought>=1e5)?("THERE IS NO EMPOWERED EXOTIC MATTER DIMENSIONS VI<br>[cackles maniacally]"):("You've still "+BEformat(1e5-empoweredAxisBought)+" more clicks before the next one. Good luck!");},
		rarity:4
	},
	23:{
		name:"Tichat's Heart",
		description:"Buy the 40th star.",
		check:function(){return g.stars>39},
		flavor:"Row 11 stars coming in 𝕍3.0!",
		rarity:1
	},
	24:{
		name:"Tardis",
		description:"Max out all dilation upgrades",
		check:function(){return countTo(4).map(x=>g.dilationUpgrades[x]==dilationUpgrades[x].cap).reduce((x,y)=>x&&y)},
		timeTaken:function(){
			let out = 0
			for (let i=1;i<5;i++) for (let j=0;j<dilationUpgrades[i].cap;j++) out+=dilationUpgrades[i].cost(j)
			return out
		},
		get flavor(){return timeFormat(this.timeTaken())+" well spent."},
		rarity:6
	},
	25:{
		name:"I love Rick 'n' Roll",
		description:"Get rickrolled by alemaninc",
		check:function(){return true}, // all this takes is clicking a link
		reward:"alemaninc will never give up <i>Exotic Matter Dimensions</i>! You will never be let down by a disappointing <i>Exotic Matter Dimensions</i> update again.",
		flavor:"See? Yet another reason to trust alemaninc.",
		rarity:2
	},
	26:{
		name:"Gone Phishing",
		description:"Get scammed by alemaninc",
		check:function(){return true}, // all this takes is clicking 7 buttons
		get reward(){return "alemaninc will come to your house and ask for that credit card. Estimated arrival in: "+timeFormat(Math.max(86400-timeSinceGameOpened,46800-timeSinceGameOpened%7200))},
		flavor:"You can run but you can't hide",
		rarity:2
	},
	27:{
		name:"Tabloid addiction",
		description:"Get helped by alemaninc",
		check:function(){return true}, // all this takes is clicking a button
		reward:"+1% productivity",
		flavor:"The public have an insatiable curiosity to know everything, except what is worth knowing.",
		rarity:2
	},
	28:{
		name:"xhwzwka",
		description:"Prove your status as a Distinguished Contributor",
		check:function(){return newsSupport.xhwzwkaPhishing==5},
		flavor:"\"WHO IS XHWZWKA\"<br>\"It's ill-defined!\"",
		rarity:7
	}
}
const achievementEvents = {
	axisBuy:[101,102,103,104,113,207,208,209,210,217,303,304,305,505,526,527],
	gameloop:[105,106,107,108,109,110,111,112,114,115,202,203,204,205,206,211,212,213,214,215,302,306,307,308,309,310,311,312,408,409,410,411,413,502,503,504,517,529,605,606,610],
	stardustUpgrade:[216,301,402,403,404,405,406,407,602],
	starBuy:[401,519,528,612],
	wormholeResetBefore:[501,506,507,508,509,510,512,516,518,520,521,522,523,524,525,608,609],
	wormholeResetAfter:[604],
	researchBuy:[601,611],
	lumenGain:[603,607],
}
const secretAchievementEvents = {
	gameloop:[3,4,5,6],
	luckyGameloop:[13,14,15],
	starBuy:[23],
	wormholeResetBefore:[11,12],
	wormholeResetAfter:[],
	researchBuy:[17],
}
function updateAchievementsTab() {
	let tiers = Object.keys(achievementList);
	for (let tier of tiers) {
		if ((achievement.ownedInTier(tier)==0)||((achievement.ownedInTier(tier)==Object.keys(achievementList[tier]).length)&&(!g.completedAchievementTiersShown))) {
			d.display("div_achievementTier"+tier,"none");
		} else {
			d.display("div_achievementTier"+tier,"inline-block");
			d.innerHTML("span_ownedTier"+tier+"Achievements",achievement.ownedInTier(tier).toFixed(0));
			let list = Object.keys(achievementList[tier]);
			for (let ach of list) {
				let visible = g.achievement[ach] || (achievement(ach).visibility() && g.achievement[achievement.initial[tier]]);
				if (!visible) {
					d.display("div_achievement"+ach,"none");
				} else {
					d.display("div_achievement"+ach,"inline-block");
					d.element("div_achievement"+ach).style["background-color"] = g.achievement[ach]?"rgba(0,255,0,0.5)":"rgba(102,102,102,0.2)";
					d.element("div_achievement"+ach).style.color = achievement.tierColors[tier][g.achievement[ach]?"complete":"incomplete"];
					d.element("div_achievement"+ach).style["border-color"] = g.achievement[ach]?"rgba(0,255,0,0.8)":"rgba(0,0,0,0.2)";
				}
			}
		}
	}
}
function updateSecretAchievementsTab() {
	secretAchievementPoints = Object.entries(g.secretAchievement).map(x=>x[1]?secretAchievementList[x[0]].rarity:0).sum()
	d.innerHTML("span_secretAchievementPoints",secretAchievementPoints)
	for (let i of Object.keys(secretAchievementList)) d.display("div_secretAchievement"+i,g.secretAchievement[Number(i)]?"inline-block":"none")
}
const yellowLight = {}
yellowLight.value = function(breakpoints,x) {
	if (x.lte(breakpoints[0])) return c.d0
	if (breakpoints.length == 3) {
		if (x.gte(breakpoints[1])) return c.d1
		let start = breakpoints[0].layerplus(-breakpoints[2])
		let end = breakpoints[1].layerplus(-breakpoints[2])
		return Decimal.div(Decimal.sub(x.layerplus(-breakpoints[2]),start),Decimal.sub(end,start))
	} else {
		return Decimal.div(x.layerplus(-breakpoints[1]),breakpoints[0].layerplus(-breakpoints[1])).sub(c.d1)
	}
}
yellowLight.affected = achievement.all.filter(x=>achievement(x).yellowBreakpoints!==undefined)
yellowLight.effectHTML = function(id,a,b) {
	if (a.eq(b)||(lightTiersUnlocked()<2)) {return achievement(id).effectFormat(achievement(id).effect())}
	return arrowJoin("<span class=\"big\" style=\"font-size:110%;color:#cccc00\">"+achievement(id).effectFormat(achievement(id).effect(a))+"</span>","<span class=\"yellow\" style=\"font-size:110%\">"+achievement(id).effectFormat(achievement(id).effect(b))+"</span>")
}
function showAchievementInfo(id) {
	let ach = achievement(id);
	let textcolor = achievement.tierColors[achievement.tierOf(id)].secondary;
	let out = "<h4 style=\"color:"+textcolor+";text-decoration:underline\">"+ach.name+"</h4>";
	out += "<p style=\"color:"+textcolor+"\">"+ach.description+"</p>";
	if (ach.reward !== undefined) {
		let rewardText = [yellowLight.affected.includes(String(id))?ach.reward.replaceAll("{}",yellowLight.effectHTML(id,c.d0,achievement(id).yellowValue)):ach.reward]
		if (ach.yellowBreakpoints!==undefined) {if(ach.yellowBreakpoints[0].lte(g.lumens[5])) {
			let limitReached = ach.yellowBreakpoints.length==3?ach.yellowBreakpoints[1].lte(g.lumens[5]):false
			let from0 = ach.yellowBreakpoints[0].eq(c.d0)
			let text = (limitReached&&from0)?("Affected by yellow lumens up to "+ach.yellowBreakpoints[1].format())
			:(limitReached&&(!from0))?("Affected by yellow lumens from "+ach.yellowBreakpoints[0].format()+" to "+ach.yellowBreakpoints[1].format())
			:((!limitReached)&&from0)?("Affected by yellow light")
			:("Affected by yellow lumens above "+ach.yellowBreakpoints[0].format())
			rewardText.push("<span style=\"color:#cccc00\">("+text+")</span>")
		}}
		out += "<p style=\"color:"+textcolor+"\">Reward: "+rewardText.join("<br>")+"</p>";
	}
	if (g.achievement[id]) out += "<p style=\"color:#00cc00\">(Completed!)</p>";
	else out += "<p style=\"color:#ffcc00\">"+ach.progress()+"</p>";
	if (ach.flavor!==undefined&&g.achievement[id]) out += "<p style=\"font-size:10px;color:#ffffff;white-space:break-spaces\">\""+ach.flavor+"\"</p>";
	d.innerHTML("achievementPanel",out);	
}
function blackOrWhiteContrast(hex) {
	let rgb = [parseInt(hex.substring(1,3),16),parseInt(hex.substring(3,5),16),parseInt(hex.substring(5,7),16)]
	var sum = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
	return (sum > 128) ? "#000000" : "#ffffff";
}
function addAchievement(x) {
	if (achievement(x).check()&&(!g.achievement[x])) {
		g.achievement[x]=true;
		let colors = achievement.tierColors[String(x).substring(0,String(x).length-2)]
		notify("Achievement Get! \""+achievement(x).name+"\"",colors.primary);
		updateResearchTree();
		updateAchievementsTab();
		d.display("span_noAchievements","none")
		totalAchievements = Object.values(g.achievement).map(x=>x?1:0).sum()
		if (achievement.tierOf(x)==5) {if (wormholeMilestoneList[achievement.ownedInTier(5)]!==undefined) {
			let milestone = wormholeMilestoneList[achievement.ownedInTier(5)]
			notify("You have unlocked a new Wormhole Milestone! "+(milestone.notification??milestone.text??milestone.static)+".","#000099","#ffffff")
		}}
	}
}
function validAchievement(id) {
	try {achievement(id)}
	catch {return false}
	if (achievement(id) == undefined) return false
	return true
}
function showSecretAchievementInfo(id) {
	let ach = secretAchievementList[id];
	let textcolor = secretAchievementRarityColors[ach.rarity];
	let out = "<p style=\"color:"+textcolor+"\"><span style=\"text-decoration:underline;font-weight:700\">"+ach.name+"</span><br><span style=\"font-size:75%\">("+secretAchievementRarityNames[ach.rarity]+" - "+ach.rarity+" point"+(ach.rarity==1?"":"s")+")</span>";
	out += "<p style=\"color:"+textcolor+"\">"+ach.description+"</p>";
	if (ach.reward !== undefined) out += "<p style=\"color:"+textcolor+"\">Reward: "+ach.reward+"</p>";
	out += "<p style=\"color:#00cc00\">(Completed!)</p>"
	if (ach.flavor!==undefined) out += "<p style=\"font-size:10px;color:#ffffff;white-space:break-spaces\">\""+halfFunction(ach.flavor)+"\"</p>";
	d.innerHTML("secretAchievementPanel",out)
}
function addSecretAchievement(x) {
	if (secretAchievementList[x].check()&&(!g.secretAchievement[x])) {
		g.secretAchievement[x]=true;
		let color = secretAchievementRarityColors[secretAchievementList[x].rarity]
		notify("Secret Achievement Get! \""+secretAchievementList[x].name+"\" ("+secretAchievementRarityNames[secretAchievementList[x].rarity]+")",color,blackOrWhiteContrast(color))
		updateSecretAchievementsTab();
		totalSecretAchievements = Object.values(g.secretAchievement).map(x=>x?1:0).sum()
	}
}