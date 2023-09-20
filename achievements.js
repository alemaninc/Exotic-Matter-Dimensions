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
	1:{primary:"#009900",secondary:"#00ff00"},
	2:{primary:"#aa6600",secondary:"#ff9900"},
	3:{primary:"#660066",secondary:"#cc66ff"},
	4:{primary:"#009999",secondary:"#00ffff"},
	5:{primary:"#000080",secondary:"#6699ff"},
	6:{primary:"#000000",secondary:"#ffffff"},
	7:{primary:"#999900",secondary:"#ffff00"},
	8:{primary:"#008855",secondary:"#00ff99"}
}
achievement.perAchievementReward = {
	1:{text:"+0.02× X axis effect per achievement in this tier (currently: +{}×)",value:()=>(achievement.ownedInTier(1)/50).toFixed(2),calc:x=>N(x/50),currentVal:c.d0},
	2:{text:"Stars in the first row are 1% stronger per achievement in this tier (currently: {}%)",value:()=>achievement.ownedInTier(2),calc:x=>N(x/100+1),currentVal:c.d1},
	3:{text:"Gain 1% more free axis from dark matter per achievement in this tier (currently: {}%)",value:()=>achievement.ownedInTier(3),calc:x=>N(x/100+1),currentVal:c.d1},
	4:{text:"Energy effects are 0.1% stronger per achievement in this tier (currently: {}%)",value:()=>(achievement.ownedInTier(4)/10).toFixed(1),calc:x=>N(x/1e3+1),currentVal:c.d1},
	5:{text:"Base knowledge gain is multiplied by achievements in this tier (currently: ×{}). In addition, gain increasing quality-of-life bonuses as more achievements in this tier are unlocked",value:()=>achievement.ownedInTier(5),calc:x=>N(x),currentVal:c.d0},
	6:{text:"Research in rows 8-12 is 1% cheaper per achievement in this tier, plus an extra 1% reduction for every 4 achievements (currently: {}%)",value:()=>Math.floor(achievement.ownedInTier(6)*1.25),calc:x=>N(1-Math.floor(x*1.25)/100),currentVal:c.d1},
	7:{text:"The base of the first galaxy penalty is reduced based on achievements in this tier ({})",value:function(){return showFormulas?"ceil(10<sup>36 ÷ (17+A)</sup>)":(achievement.ownedInTier(7)==Object.keys(achievementList[7]).length)?"currently: 10":("currently: "+this.calc(achievement.ownedInTier(7)).format()+", next: "+this.calc(achievement.ownedInTier(7)+1).format())},calc:x=>N(Math.ceil(10**(36/(x+17)))),currentVal:c.e2},
	8:{text:"You can buy 2 additional Spatial Synergism research per achievement in this tier (currently: {})",value:()=>2*achievement.ownedInTier(8)+6,calc:x=>2*x+6,currentVal:6}
}
achievement.initial = {1:101,2:201,3:301,4:402,5:501,6:601,7:701,8:717}
achievement.visible = function(id) {
	if (g.achievement[id]) return true
	if (achievement(id).beta==true) if (!betaActive) return false
	let tier = achievement.tierOf(id)
	if (!g.achievement[achievement.initial[tier]]) return false
	if (achievement(id).prevReq!==undefined) for (let i of achievement(id).prevReq) if (!g.achievement[i]) return false
	return true
}
achievement.percent = function(value,needed,log){
	let valuefactor=value.layerplus(-log)
	let neededfactor=needed.layerplus(-log)
	let percent = valuefactor.div(neededfactor).max(c.d0).min(c.d1).toNumber()*100
	let precision = (percent%1==0)?0:(percent%0.1==0)?1:(percent%0.1==0)?2:3
	return "Progress: "+value.noLeadFormat(3)+" / "+needed.noLeadFormat(3)+" ("+percent.toFixed(precision)+"%)";
}
achievement.label = function(id,plural){
	if (plural==undefined) plural=false;
	return "\""+achievement(id).name+"\" achievement"+(plural?"s":"");
}
/*
	name									the name of the achievement
	description						the listed condition of the achievement
	check									the function that tests if the condition of the achievement is fulfilled
	progress							a message that shows how close the player is to obtaining the achievement. shown only if incomplete
	[prevReq]							achievements which must be owned for this achievement to appear
	reward								the listed reward of the achievement
	[effect]							formula used to calculate the effect of the reward (for achievements with dynamic rewards)
	[effectFormat]				formula used to display the value of the achievement reward (for achievements boosted by yellow light)
	[yellowBreakpoints]		the range of yellow lumens which boosts the achievement reward
	flavor								a flavor text shown at the bottom of the achievement panel. if this is undefined then nothing is shown
	[beta]								if set to true will be unobtainable unless beta is active
*/
const achievementList = {
	1:{
		101:{
			name:"Straight Line",
			description:"Buy an X Axis",
			check:function(){return g.XAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			reward:"+1% exotic matter",
			flavor:"A Straight Line to the touch is worth a Circle to the sight"
		},
		102:{
			name:"Square",
			description:"Buy a Y Axis",
			check:function(){return g.YAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			prevReq:[101],
			reward:"+2% exotic matter",
			flavor:"Upward, not Northward"
		},
		103:{
			name:"Cube",
			description:"Buy a Z Axis",
			check:function(){return g.ZAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			prevReq:[102],
			reward:"+3% exotic matter",
			flavor:"It is Knowledge; it is Three Dimensions: open your eye once again and try to look steadily."
		},
		104:{
			name:"Time Dimension",
			description:"Buy a W Axis",
			check:function(){return g.WAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			prevReq:[103],
			reward:"+4% mastery power",
			flavor:"Time is clearly not our natural dimension. Thus it is that we are never really at home in time."
		},
		105:{
			name:"10,000 Hours",
			get description(){return "Accumulate "+BEformat(c.e11)+" mastery power";},
			check:function(){return g.masteryPower.gt(c.e11);},
			progress:function(){return achievement.percent(g.masteryPower,c.e11,0);},
			get reward(){return "Extremely small boost to first row Masteries based on time played (currently: {}%)";},
			flavor:"10,000 hours to master your craft.",
			effect:function(){return Decimal.convergentSoftcap(g.truetimePlayed.div(c.e5).add(c.d10).log10().log10(),c.d0_75,c.d1).sqrt();},
			effectFormat:x=>x.format(2),
			formulaText:()=>formulaFormat.convSoftcap("log<sup>[2]</sup>(t ÷ 100,000 + 10)",c.d0_75,c.d1,g.truetimePlayed.gt(42014859476))+"<sup>0.5</sup>"
		},
		106:{
			name:"10.000 hours?",
			description:"Play for a total of 10 hours",
			check:function(){return g.truetimePlayed>36000;},
			progress:function(){return achievement.percent(g.truetimePlayed.div(c.d3600),c.d10,0);},
			reward:"Mastery power gain uses a slightly better formula (+0.001 formula exponent)",
			flavor:"Every 10.000 hours in Africa, 600 minutes pass"
		},
		107:{
			name:"X² axis",
			description:"Make the X Axis effect go above 4×",
			check:function(){return stat.XAxisEffect.gt(c.d4);},
			progress:function(){return achievement.percent(stat.XAxisEffect,c.d4,1);},
			prevReq:[101],
			reward:"1 free Y axis",
			flavor:"Space is relative"
		},
		108:{
			name:"Feedback Loop",
			description:"Make the Z Axis effect go above 4×",
			check:function(){return stat.ZAxisEffect.gt(c.d4)&&stat.axisUnlocked>2;},
			progress:function(){return achievement.percent(stat.ZAxisEffect,c.d4,1);},
			prevReq:[103],
			get reward(){return "Gain a free X Axis per {} purchased Z Axis (currently: "+g.ZAxis.mul(this.effect()).noLeadFormat(2)+")"},
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.d0_05:y.eq(c.d0)?c.d0_04:c.d0_2.div(c.d5.sub(y))},
			flavor:"g.exoticmatter++",
			effectFormat:x=>x.recip().noLeadFormat(2),
			yellowBreakpoints:[c.d75,c.d125,0]
		},
		109:{
			name:"Slow",
			description:"Make the W Axis effect go above 4×",
			check:function(){return stat.WAxisEffect.gt(4)&&stat.axisUnlocked>3;},
			progress:function(){return achievement.percent(stat.WAxisEffect,c.d4,1);},
			prevReq:[104],
			get reward(){return "Add 30 seconds to the W Axis timer per W Axis"+(g.lumens[5].lt(c.d360)?"":"<sup>{}</sup>")+(Decimal.eq(g.WAxis,stat.realWAxis)?"":" (including free)")},
			effect:function(y=this.yellowValue){return y.add(c.d1)},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[c.d360,N(360000),1],
			flavor:"Why has the pleasure of slowness disappeared? Ah, where have they gone, the amblers of yesteryear?"
		},
		110:{
			name:"Halted",
			description:"Store 24 hours worth of exotic matter production (hint: is there a way to decrease your production?)",
			check:function(){return g.exoticmatter.div(stat.exoticmatterPerSec).gt(c.d86400)&&timeSinceGameOpened>5;},
			progress:function(){return achievement.percent(g.exoticmatter,stat.exoticmatterPerSec.mul(c.d86400),0);},
			reward:"If your exotic matter is less than 15 seconds worth of production, it will instantly increase to that amount",
			flavor:"Be not afraid of going slowly, be afraid only of standing still."
		},
		111:{
			name:"Halted II",
			get description(){return "Store "+timeFormat(c.e6)+" (1,000,000 seconds) worth of exotic matter production"},
			check:function(){return g.exoticmatter.div(stat.exoticmatterPerSec).gt(c.e6)&&timeSinceGameOpened>5;},
			progress:function(){return achievement.percent(g.exoticmatter,stat.exoticmatterPerSec.mul(c.e6),0);},
			prevReq:[110],
			reward:"If your exotic matter is less than 30 seconds worth of production, it will instantly increase to that amount",
			flavor:"To feel the life, don’t stand still; to feel the universe, don’t move!"
		},
		112:{
			name:"Halted III",
			get description(){return "Store "+timeFormat(c.e9)+" ("+BEformat(c.e9)+" seconds) worth of exotic matter production"},
			check:function(){return g.exoticmatter.div(stat.exoticmatterPerSec).gt(c.e9)&&timeSinceGameOpened>5;},
			progress:function(){return achievement.percent(g.exoticmatter,stat.exoticmatterPerSec.mul(c.e9),0);},
			prevReq:[111],
			reward:"If your exotic matter is less than 60 seconds worth of production, it will instantly increase to that amount",
			flavor:"Integrity involves the ability to stand straight when you tell your truth, and still stand straight when the other person comes to talk!"
		},
		113:{
			name:"Quadratic",
			get description(){return "Have 9 purchased X Axis"},
			check:function(){return g.XAxis.gte(c.d9);},
			progress:function(){return achievement.percent(g.XAxis,c.d9,0);},
			prevReq:[101],
			reward:"+0.0004× Y Axis effect per Y Axis",
			flavor:"6<sup>X<sup>2</sup></sup>"
		},
		114:{
			name:"Left Wing",
			description:"Have the first Mastery in each of the first four rows active",
			check:function(){return MasteryE(11)&&MasteryE(21)&&MasteryE(31)&&MasteryE(41);},
			progress:function(){return achievement.percent(N([11,21,31,41].map(x=>MasteryE(x)?1:0).sum()),c.d4,0);},
			get reward(){return "+{}% exotic matter (based on mastery power)";},
			flavor:"I'm not for the left wing or the right wing--I'm for the whole bird.",
			effect:function(y=this.yellowValue){
				let out = g.masteryPower.add(c.d1).log10().pow(c.d2).div(c.e3).add(c.d1)
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.d8_5,c.d10):out.pow(out.log10().add(c.d1))).fix(c.d0)
			},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).format(2),
			formulaText:()=>{
				if (g.lumens[5].lt(c.e2)) return formulaFormat.convSoftcap("log(MP + 1)<sup>2</sup> ÷ 10",c.d750,c.d900,g.masteryPower.gt(4.004e86))
				return "((log(MP + 1)<sup>2</sup> ÷ 1,000 + 1)<sup>1 + log(log(MP + 1)<sup>2</sup> ÷ 1,000 + 1)</sup> - 1) × 100"
			},
			yellowBreakpoints:[c.d99,c.e2,0]
		},
		115:{
			name:"Original Replicas",
			description:"Have free axis",
			check:function(){return axisCodes.map(x => stat["free"+x+"Axis"]).reduce((x,y)=>x.max(y)).gt(c.d0);},
			progress:function(){return "Not Completed!";},
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
			get reward(){return "Masteries in the fourth row are {}% stronger (based on total "+(g.achievement[301]?"normal ":"")+"axis)";},
			flavor:"\"Look on my matter, ye Mighty, and despair!\"<br>Nothing beside remains.",
			effect:function(y=this.yellowValue){
				let out = stat.totalNormalAxis.add(c.d1).log10()
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.d4,c.d5):out.mul(out.div(c.e2).add(c.d1))).fix(c.d0)
			},
			effectFormat:x=>x.format(2),
			formulaText:()=>{
				let out = "log(ΣA + 1)"
				return (g.lumens[5].lt(c.d100)?formulaFormat.convSoftcap(out,c.d4,c.d5,stat.totalNormalAxis.gte(9999)):(out+" + "+out+"<sup>2</sup> ÷ 100"))
			},
			yellowBreakpoints:[c.d99,c.e2,0]
		},
		202:{
			name:"Timeless",
			get description(){return "Reach "+BEformat(c.e25)+" exotic matter without W Axis";},
			check:function(){return g.exoticmatter.gt(c.e25)&&g.WAxis.eq(c.d0);},
			progress:function(){return g.WAxis.eq(c.d0)?achievement.percent(g.exoticmatter,c.e25,1):"Failed";},
			prevReq:[104],
			get reward(){return "+0.4% stardust per W Axis (total: "+percentOrMult(c.d1_004.pow(g.WAxis))+")"},
			flavor:"Like all great art, it defies the tyrant Time."
		},
		203:{
			name:"Spaceless",
			get description(){return "Reach "+BEformat(c.e25)+" exotic matter without Z Axis";},
			check:function(){return g.exoticmatter.gt(c.e25)&&g.ZAxis.eq(c.d0);},
			progress:function(){return g.ZAxis.eq(c.d0)?achievement.percent(g.exoticmatter,c.e25,1):"Failed";},
			prevReq:[202],
			get reward(){return "+0.3% stardust per Z Axis (total: "+percentOrMult(c.d1_003.pow(g.ZAxis))+")"},
			flavor:"Four axis good, two axis better"
		},
		204:{
			name:"String Theory",
			get description(){return "Reach "+BEformat(c.e25)+" exotic matter without Y Axis";},
			check:function(){return g.exoticmatter.gt(c.e25)&&g.YAxis.eq(c.d0);},
			progress:function(){return g.YAxis.eq(c.d0)?achievement.percent(g.exoticmatter,c.e25,1):"Failed";},
			prevReq:[203],
			get reward(){return "+0.2% stardust per Y Axis (total: "+percentOrMult(c.d1_002.pow(g.YAxis))+")"},
			flavor:"It seemed that this poor ignorant Monarch — as he called himself — was persuaded that the Straight Line which he called his Kingdom, and in which he passed his existence, constituted the whole of the world"
		},
		205:{
			name:"0∞",
			get description(){return "Reach "+BEformat(c.e25)+" exotic matter without X Axis";},
			check:function(){return g.exoticmatter.gt(c.e25)&&g.XAxis.eq(c.d0);},
			progress:function(){return g.XAxis.eq(c.d0)?achievement.percent(g.exoticmatter,c.e25,1):"Failed";},
			prevReq:[204],
			get reward(){return "+0.1% stardust per X Axis (total: "+percentOrMult(c.d1_001.pow(g.XAxis))+")"},
			flavor:"That Point is a Being like ourselves, but confined to the non-dimensional Gulf. He is himself his own World, his own Universe; of any other than himself he can form no conception; he knows not Length, nor Breadth, nor Height, for he has had no experience of them; he has no cognizance even of the number Two; nor has he a thought of Plurality; for he is himself his One and All, being really Nothing."
		},
		206:{
			name:"The Missing Link",
			description:"Make the Y Axis effect go above 0.4×",
			check:function(){return stat.YAxisEffect.gt(c.d0_4)&&stat.axisUnlocked>1;},
			progress:function(){return achievement.percent(stat.YAxisEffect,c.d0_4,0);},
			prevReq:[102],
			get reward(){return "{} free Y axis (based on mastery power)";},
			flavor:"It’s almost impossible to prevent Y axis from breeding, but when a Y axis reproduces evolution is halted and devolution commences. Y axis truly are the missing link of society",
			effect:function(y=this.yellowValue){
				let out = g.masteryPower.add(c.d1).dilate(c.d0_3).pow(c.d0_3)
				return Decimal.convergentSoftcap(out,c.d8,y.eq(c.d1)?c.d512:c.d12).fix(c.d0)
			},
			effectFormat:x=>x.noLeadFormat(2),
			formulaText:()=>formulaFormat.convSoftcap("10<sup>log(MP + 1)<sup>0.3</sup> × 0.3</sup>",c.d8,g.lumens[5].lt(c.d100)?c.d12:c.d512,g.masteryPower.gt(2.4444e39)),
			yellowBreakpoints:[c.d99,c.e2,0]
		},
		207:{
			name:"Penteract",
			description:"Buy a V Axis",
			check:function(){return g.VAxis.gt(c.d0);},
			progress:function(){return "Not Completed!";},
			prevReq:[104],
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
			prevReq:[207],
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
			prevReq:[208],
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
			prevReq:[209],
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
			reward:"Z axis effect uses a better formula (+0.01 formula exponent)",
			flavor:"Not very pretty but we sure know how to run things"
		},
		212:{
			name:"Four Second Mile",
			description:"Reach 1609.344 exotic matter within 4 seconds of stardust-resetting",
			req:N(1609.344),
			check:function(){return g.exoticmatter.gt(this.req)&&g.timeThisStardustReset<4;},
			progress:function(){return g.timeThisStardustReset<4?achievement.percent(g.exoticmatter,this.req,0):"Failed";},
			reward:"The game runs 0.4% faster",
			flavor:"You think a five-minute mile is fast?"
		},
		213:{
			name:"Four Second Mile II",
			req:N(1199169832),
			get description(){return "Reach "+BEformat(this.req)+" exotic matter within 4 seconds of stardust-resetting";},
			check:function(){return g.exoticmatter.gt(this.req)&&g.timeThisStardustReset<4;},
			progress:function(){return g.timeThisStardustReset<4?achievement.percent(g.exoticmatter,c.e9,0):"Failed";},
			prevReq:[212],
			reward:"The game runs 0.4% faster",
			flavor:"Δt²+v²=c²"
		},
		214:{
			name:"Four Second Mile III",
			get description(){return "Reach "+BEformat(c.e15)+" exotic matter within 4 seconds of stardust-resetting";},
			check:function(){return g.exoticmatter.gt(c.e15)&&g.timeThisStardustReset<4;},
			progress:function(){return g.timeThisStardustReset<4?achievement.percent(g.exoticmatter,c.e15,0):"Failed";},
			prevReq:[213],
			reward:"The game runs 0.4% faster",
			flavor:"You're made for the mile, not the 400, and the sooner you realize that, the better off you're gonna be."
		},
		215:{
			name:"Four Second Mile IV",
			get description(){return "Reach "+BEformat(c.e25)+" exotic matter within 4 seconds of stardust-resetting";},
			check:function(){return g.exoticmatter.gt(c.e25)&&g.timeThisStardustReset<4;},
			progress:function(){return g.timeThisStardustReset<4?achievement.percent(g.exoticmatter,c.e25,0):"Failed";},
			prevReq:[214],
			reward:"The game runs 0.4% faster",
			flavor:"In skating over thin ice our safety is in our speed."
		},
		216:{
			name:"Zero Player Game",
			description:"Unlock the axis autobuyer",
			check:function(){return g.stardustUpgrades[1]>0;},
			progress:function(){return "Not Completed!";},
			reward:"A fading sense of accomplishment",
			flavor:"A game becomes a game when it is played; until then it is only a set of rules and game props awaiting human engagement."
		},
		217:{
			name:"Leet",
			description:"Have exactly 1 X axis, 3 Y axis, 3 Z axis and 7 W axis. Does not include free axes.",
			check:function(){return g.XAxis.eq(c.d1)&&g.YAxis.eq(c.d3)&&g.ZAxis.eq(c.d3)&&g.WAxis.eq(c.d7);},
			progress:function(){return (g.XAxis.gt(c.d1)||g.YAxis.gt(c.d3)||g.ZAxis.gt(c.d3)||g.WAxis.gt(c.d7))?"Failed":achievement.percent(axisCodes.slice(0,4).map(x=>g[x+"Axis"]).sumDecimals(),N(14),0);},
			prevReq:[104],
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
			get reward(){return "+{}% stardust (based on dark matter)";},
			flavor:"This is not your average, everyday darkness. This is... ADVANCED darkness.",
			effect:function(y=this.yellowValue){
				let out = g.darkmatter.add(c.d1).log10().div(c.e2).add(c.d1)
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.d8_5,c.d10):out.pow(out.log10().add(c.d1))).fix(c.d1)
			},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).format(2),
			formulaText:()=>{
				if (g.lumens[5].lt(c.d100)) return formulaFormat.convSoftcap("log(DM + 1)",c.d750,c.d900,g.darkmatter.gt("e750"))
				return "((1 + log(DM + 1) ÷ 100)<sup>1 + log(1 + log(DM + 1) ÷ 100)</sup> - 1) × 100"
			},
			yellowBreakpoints:[c.d99,c.e2,0]
		},
		302:{
			name:"Valence",
			get description(){return "Reach "+BEformat(c.inf)+" exotic matter with no partially filled star rows (all rows must be either full or empty)";},
			check:function(){return g.exoticmatter.gt(c.inf)&&this.valence();},
			progress:function(){return this.valence()?achievement.percent(g.exoticmatter,c.inf,1):"Failed";},
			get reward(){return "+30.8% dark matter per unassigned star (total: "+percentOrMult(N(1.308).pow(unspentStars()))+")"},
			flavor:"I made a noble gas joke, sadly nobody reacted",
			valence:function(){return [1,2,3,4,5,6,7,8,9,10].map(x => [1,2,3,4].map(y => g.star[10*x+y]?1:0).sum()%4).sum()==0;}
		},
		303:{
			name:"Parity",
			description:"Have exactly 1 of each normal axis purchased",
			check:function(){return !axisCodes.slice(0,8).map(x => g[x+"Axis"].eq(c.d1)).includes(false);},
			progress:function(){return "Not Completed!";},
			prevReq:[210],
			reward:"1 free dark X axis",
			flavor:"It's odd, but even when you do nothing the numbers keep growing"
		},
		304:{
			name:"Parity II",
			description:"Have exactly 3 of each normal axis purchased",
			check:function(){return !axisCodes.slice(0,8).map(x => g[x+"Axis"].eq(c.d3)).includes(false);},
			progress:function(){return "Not Completed!";},
			prevReq:[303],
			reward:"1 free dark X and Y axis",
			flavor:"Even when the odds are against you"
		},
		305:{
			name:"Parity III",
			description:"Have exactly 5 of each normal axis purchased",
			check:function(){return !axisCodes.slice(0,8).map(x => g[x+"Axis"].eq(c.d5)).includes(false);},
			progress:function(){return "Not Completed!";},
			prevReq:[304],
			reward:"1 free dark X, Y and Z axis",
			flavor:"May the odds be even in your favor"
		},
		306:{
			name:"Merchant",
			description:"Make the V axis effect go above 44,444×",
			check:function(){return stat.VAxisEffect.gt(c.d44444)&&stat.axisUnlocked>4;},
			progress:function(){return achievement.percent(stat.VAxisEffect,c.d44444,1);},
			prevReq:[207],
			reward:"1 free V axis",
			flavor:"Original replicas!"
		},
		307:{
			name:"Neutron Star",
			description:"Make the U axis effect go above 4×",
			check:function(){return stat.UAxisEffect.gt(c.d4)&&stat.axisUnlocked>5;},
			progress:function(){return achievement.percent(stat.UAxisEffect,c.d4,1);},
			prevReq:[208],
			reward:"1 free U axis",
			flavor:"What do creationists and neutron stars have in common?"
		},
		308:{
			name:"Multinomial Theorem",
			description:"Make the T axis effect go above 44,444×",
			check:function(){return stat.TAxisEffect.gt(c.d44444)&&stat.axisUnlocked>6;},
			progress:function(){return achievement.percent(stat.TAxisEffect,c.d44444,1);},
			prevReq:[209],
			reward:"1 free T axis",
			flavor:"(X+Y+Z+W+V+U+T)<sup>S</sup>"
		},
		309:{
			name:"Grandmastery",
			description:"Have 10 Masteries active simultaneously",
			check:function(){return this.active()>9;},
			progress:function(){return achievement.percent(N(this.active()),c.d10,0);},
			get reward(){return "Multiply exotic matter gain by mastery power<sup>{}</sup> (based on dark matter)";},
			flavor:"Only one who devotes himself to a cause with his whole strength and soul can be a true grandmaster. For this reason grandmastery demands all of a person.",
			effect:function(y=this.yellowValue){
				let out = g.darkmatter.add(c.d1).log10().sqrt().div(c.e2)
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.d0_5,c.d1):Decimal.logarithmicSoftcap(out,c.d1,c.d1)).fix(c.d0)
			},
			effectFormat:x=>x.format(3),
			formulaText:()=>{
				let out = "log(DM + 1)<sup>0.5</sup> ÷ 100"
				return g.lumens[5].lt(c.d100)?formulaFormat.convSoftcap(out,c.d0_5,c.d1,g.darkmatter.gt("e2500")):formulaFormat.logSoftcap(out,c.d1,c.d1,g.darkmatter.gt(c.ee4))
			},
			yellowBreakpoints:[c.d99,c.e2,0],
			active:function(){return Object.keys(masteryData).map(x => MasteryE(x)?1:0).reduce((x,y) => x+y);}
		},
		310:{
			name:"Superpowered",
			description:"Reach 1,500% Mastery 11 efficiency",
			check:function(){return masteryBoost(11).gte(c.d15);},
			progress:function(){return achievement.percent(masteryBoost(11).mul(c.e2),c.d1500,0);},
			get reward(){return betaActive?("Add 15"+(stat.tickspeed.eq(c.d1)?"":" real life")+" minutes to the Mastery timer"+(g.studyCompletions[8]==0?"":" (this is now useless due to Study VIII! :D)")):"Mastery 52 is 1% more effective"},
			flavor:"Mastery-Man, Mastery-Man<br>does whatever a master can"
		},
		311:{
			name:"When will it be enough?",
			get description(){return "Reach "+BEformat(c.ee3)+" exotic matter";},
			check:function(){return g.exoticmatter.gt(c.ee3);},
			progress:function(){return achievement.percent(g.exoticmatter,c.ee3,1);},
			get reward(){return "Multiply exotic matter gain by {} (based on exotic matter)";},
			get flavor(){return "The number of Planck volumes in the observable universe is around "+BEformat("4.65e185")+". Hence find the volume of 1 exotic matter if 1 observable universe = "+c.ee3.format()+" exotic matters"},
			effect:function(y=this.yellowValue){
				let out = g.exoticmatter.add(c.d1).pow(c.em3)
				return (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.e9,c.e10,1):Decimal.linearSoftcap(out,c.e10,c.d1div3,1)).fix(c.d1)
			},
			effectFormat:x=>x.format(2),
			formulaText:()=>{
				let out = "log(EM + 1) ÷ 1,000"
				return "10<sup>"+(g.lumens[5].lt(c.e2)?formulaFormat.convSoftcap(out,c.d9,c.d10,g.exoticmatter.gt("e9e3")):formulaFormat.linSoftcap(out,c.d10,c.d1div3,g.exoticmatter.gt(c.ee4)))+"</sup>"
			},
			yellowBreakpoints:[c.d99,c.d100,0]
		},
		312:{
			name:"Garage Sale",
			get description(){return "Make the X axis cost go below "+BEformat(c.em40);},
			check:function(){return axisCost("X").lt(c.em40);},
			progress:function(){return achievement.percent(axisCost("X"),c.em40,1);},
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
			prevReq:[201],
			reward:"^1.05 exotic matter",
			flavor:"Without exploding stars, perhaps there could be a heaven, but there is certainly no Earth."
		},
		402:{
			name:"Dark Circle",
			description:"Unlock the first type of Energy",
			check:function(){return energyTypesUnlocked()>=1;},
			progress:function(){return "Not Completed!";},
			reward:"+3% all energy gain",
			flavor:"We’re all going to be tested. The dark energy is going to knock on all of our doors"
		},
		403:{
			name:"Genesis",
			description:"Unlock the second type of Energy",
			check:function(){return energyTypesUnlocked()>=2;},
			progress:function(){return "Not Completed!";},
			prevReq:[402],
			reward:"+4% all energy gain",
			flavor:"There was nowhere to go but everywhere, so just keep on going under the stars."
		},
		404:{
			name:"Grave Matter",
			description:"Unlock the third type of Energy",
			check:function(){return energyTypesUnlocked()>=3;},
			progress:function(){return "Not Completed!";},
			prevReq:[403],
			reward:"+5% all energy gain",
			flavor:"You may hate gravity, but gravity doesn't care"
		},
		405:{
			name:"Brownian Motion",
			description:"Unlock the fourth type of Energy",
			check:function(){return energyTypesUnlocked()>=4;},
			progress:function(){return "Not Completed!";},
			prevReq:[404],
			reward:"+6% all energy gain",
			flavor:"This is what it's like when a species prepares to depart from hyperspace"
		},
		406:{
			name:"Food for Thought",
			description:"Unlock the fifth type of Energy",
			check:function(){return energyTypesUnlocked()>=5;},
			progress:function(){return "Not Completed!";},
			prevReq:[405],
			reward:"+7% all energy gain",
			flavor:"The energy of the mind is the essence of life"
		},
		407:{
			name:"Energized",
			description:"Unlock the sixth type of Energy",
			check:function(){return energyTypesUnlocked()>=6;},
			progress:function(){return "Not Completed!";},
			prevReq:[406],
			reward:"+8% all energy gain",
			flavor:"Everything is energy"
		},
		408:{
			name:"Eternal Inflation",
			description:"Make the dark energy effect exceed 1 within the first 4 minutes of a Stardust reset",
			check:function(){return stat.darkEnergyEffect.gt(c.d1)&&g.timeThisStardustReset<240;},
			progress:function(){return g.timeThisStardustReset<240?(timeFormat(240-g.timeThisStardustReset)+" left"):"Failed";},
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
			get reward(){return "Extremely small tickspeed boost based on exotic matter (currently: {}%)";},
			flavor:"All the sounds of the night seemed to pass through a hollow tunnel of indefinite length.",
			effect:function(y=this.yellowValue){return g.exoticmatter.add(c.e10).layerplus(-3).mul(c.d0_8).mul(y.add(c.d1)).fix(c.d0);},
			effectFormat:x=>x.format(2),
			formulaText:function(){return "log<sup>[3]</sup>(EM + "+c.e10.format()+")"+formulaFormat.mult(c.d0_8.mul(this.yellowValue.add(c.d1)))},
			yellowBreakpoints:[c.d30,c.d60,0],
		},
		410:{
			name:"Time is relative II",
			description:"Reach 4× tickspeed",
			check:function(){return stat.tickspeed.gte(4);},
			progress:function(){return achievement.percent(stat.tickspeed,c.d4,1);},
			prevReq:[409],
			get reward(){return "Extremely small tickspeed boost based on mastery power (currently: {}%)";},
			flavor:"If I get up early the day feels longer than if I get up late, even if I spend the same amount of time awake.",
			effect:function(y=this.yellowValue){return g.masteryPower.add(c.e10).layerplus(-3).mul(c.d1_2).mul(y.add(c.d1)).fix(c.d0);},
			effectFormat:x=>x.format(2),
			formulaText:function(){return "log<sup>[3]</sup>(MP + "+c.e10.format()+")"+formulaFormat.mult(c.d1_2.mul(this.yellowValue.add(c.d1)))},
			yellowBreakpoints:[c.d40,c.d70,0],
		},
		411:{
			name:"Time is relative III",
			description:"Reach 8× tickspeed",
			check:function(){return stat.tickspeed.gte(8);},
			progress:function(){return achievement.percent(stat.tickspeed,c.d8,1);},
			prevReq:[410],
			get reward(){return "Extremely small tickspeed boost based on stardust (currently: {}%)";},
			flavor:"A mathematician makes plans to travel backwards in time through a wormhole to a parallel universe when he can't even make it to Mars with the fastest rocket on hand today.",
			effect:function(y=this.yellowValue){return g.stardust.add(c.e10).layerplus(-3).mul(y.add(c.d1)).fix(c.d0);},
			effectFormat:x=>x.format(2),
			formulaText:function(){return "log<sup>[3]</sup>(S + "+c.e10.format()+")"+formulaFormat.mult(this.yellowValue.add(c.d1))},
			yellowBreakpoints:[c.d50,c.d80,0],
		},
		412:{
			name:"Full House",
			description:"Buy a star from the final row",
			check:function(){return g.star[101]||g.star[102]||g.star[103]||g.star[104];},
			progress:function(){return "Not Completed!";},
			prevReq:[401],
			get reward(){return "Multiply stardust gain by {} (based on dark stars)";},
			flavor:"More than a paradise",
			effect:function(){return Decimal.logarithmicSoftcap([c.d1_125,g.darkstars,c.d2].decimalPowerTower(),c.inf,c.d1).fix(c.d1);},
			effectFormat:x=>x.format(2),
			formulaText:function(){return formulaFormat.logSoftcap("1.125<sup>★<sup>2</sup></sup>",c.inf,c.d1,this.effect().gt(c.inf))}
		},
		413:{
			name:"OMCCDV",
			get description(){return "Reach "+BEformat(c.e44031)+" exotic matter";},
			check:function(){return g.exoticmatter.gt(c.e44031);},
			progress:function(){return achievement.percent(g.exoticmatter,c.e44031,1);},
			prevReq:[413],	/* this is a secret achievement of sorts */
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
			get reward(){return "+0.01% to exotic matter, mastery power, stardust and dark matter gain per second spent in the current universe (current total: "+percentOrMult(this.realEffect(),2)+")"},
			flavor:"The urge to destroy is also a creative urge.",
			effectExp:function(){
				if (MasteryE(101)) return masteryEffect(101)
				if (g.achievement[615]) return masteryEffect(101).pow(c.d0_5)
				return c.d1
			},
			realEffect:function() {return g.truetimeThisWormholeReset.div(c.e4).add(c.d1).pow(this.effectExp());}
		},
		502:{
			name:"Iron Will",
			get description(){return "Reach "+BEformat(c.e50)+" exotic matter without stardust-resetting or having research in the current universe";},
			check:function(){return g.exoticmatter.gt(c.e50)&&stat.ironWill;},
			progress:function(){return stat.ironWill?achievement.percent(g.exoticmatter,c.e50,1):"Failed";},
			reward:"Normal axis cost scaling is 5% weaker",
			flavor:"What does not kill you makes you stronger"
		},
		503:{
			name:"Iron Will II",
			get description(){return "Reach "+BEformat(c.e130)+" exotic matter without stardust-resetting or having research in the current universe";},
			check:function(){return g.exoticmatter.gt(c.e130)&&stat.ironWill;},
			progress:function(){return stat.ironWill?achievement.percent(g.exoticmatter,c.e130,1):"Failed";},
			prevReq:[502],
			reward:"Dark axis cost scaling is 5% weaker",
			flavor:"You're only given a little spark of madness. You mustn't lose it"
		},
		504:{
			name:"Iron Will III",
			description:"Unlock Dark Matter without stardust-resetting or having research in the current universe",
			check:function(){return g.stardustUpgrades[4]>0&&stat.ironWill;},
			progress:function(){return stat.ironWill?"Still possible":"Failed";},
			prevReq:[503],
			reward:"Gain 5% more Discoveries from all sources",
			flavor:"This is fine"
		},
		505:{
			name:"Iron Will IV",
			description:"Buy a dark X Axis without stardust-resetting or having research in the current universe",
			check:function(){return g.darkXAxis.gt(c.d0)&&stat.ironWill;},
			progress:function(){return stat.ironWill?"Still possible":"Failed";},
			prevReq:[504],
			effect:function(){return N(1.01+this.milestones()/1e3).fix(c.d0);},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).noLeadFormat(1),
			formulaText:()=>"1 + μ ÷ 10",
			effectBreakpoints:[c.d2,c.d3,c.d4,c.d5,c.d6,c.d7,c.d8,c.d9,c.d10,c.d12,c.d15,c.d20,c.d25,c.d30,c.d40,c.d50,c.d60,c.d70,c.d80,c.d90,c.e2,c.d120,c.d140,c.d160,c.d180,c.d200,c.d225,c.d250,c.d275,c.d300,c.d325,c.d350,c.d400,c.d450,c.d500,c.d550,c.d600,c.d700,c.d800,c.d900],
			milestones:function(){for(let i=39;i>=0;i--){if(g.ach505Progress.gte(this.effectBreakpoints[i])){return i+1}};return 0},
			maxMilestones:40,
			get reward(){return "Normal S axis are {}% stronger "+((this.milestones()==40)?"":("increases at milestones of total dark axis reached in Iron Will mode. Next milestone at "+this.effectBreakpoints[this.milestones()]+" total dark axis"));},
			flavor:"As a young man just starting out…<br>… I was very poor.<br>But, I never gave up. And today, after many years of hard work and perseverance…<br>… I am old.",
		},
		506:{
			name:"Iron Will V",
			description:"Destroy the universe without stardust-resetting or having research in the current universe",
			check:function(){return stat.ironWill;},
			progress:function(){return stat.ironWill?"Still possible":"Failed";},
			prevReq:[505],
			reward:"Hawking radiation gain ^1.1",
			flavor:"A child ardent for some desperate glory"
		},
		507:{
			name:"Hyperspeed",
			description:"Destroy the universe within 5 hours of starting it",
			check:function(){return g.timeThisWormholeReset<18000;},
			progress:function(){return g.timeThisWormholeReset<18000?(timeFormat(18000-g.timeThisWormholeReset)+" left"):("Fastest time is "+timeFormat(g.fastestWormholeReset));},
			reward:"Stardust Boost 1 is {}% stronger (based on fastest Wormhole reset, cap at 18 seconds)",
			flavor:"N o t h i n g	 t r a v e l s	 f a s t e r	 t h a n	 t h e	 s p e e d	 o f	 l i g h t",
			effect:function(){return c.d18000.div(g.fastestWormholeReset.max(c.d18)).log10().max(c.d0).simplex(2).mul(c.d2_5).fix(c.d0);},
			effectFormat:x=>x.noLeadFormat(3),
			formulaText:()=>"max(log(18,000 ÷ max(t, 18)), 0) × (max(log(18,000 ÷ max(t, 18)), 0) + 1) × 1.25"
		},
		508:{
			name:"Hyperspeed II",
			description:"Destroy the universe within 30 minutes of starting it",
			check:function(){return g.timeThisWormholeReset<1800;},
			progress:function(){return g.timeThisWormholeReset<1800?(timeFormat(1800-g.timeThisWormholeReset)+" left"):("Fastest time is "+timeFormat(g.fastestWormholeReset));},
			prevReq:[507],
			get reward(){return "Stardust Boost 4 is {}% stronger (based on fastest Wormhole reset, cap at 18 seconds)";},
			flavor:"w	i	t	h		 t	h	e		 p	o	s	s	i	b	l	e		 e	x	c	e	p	t	i	o	n",
			effect:function(){return c.d1800.div(g.fastestWormholeReset.max(c.d18)).log10().max(c.d0).simplex(2).mul(c.d10div3).fix(c.d0);},
			effectFormat:x=>x.noLeadFormat(3),
			formulaText:()=>"max(log(1,800 ÷ max(t, 18)), 0) × (max(log(1,800 ÷ max(t, 18)), 0) + 1) × 1.667"
		},
		509:{
			name:"Hyperspeed III",
			description:"Destroy the universe within 3 minutes of starting it",
			check:function(){return g.timeThisWormholeReset<180;},
			progress:function(){return g.timeThisWormholeReset<180?(timeFormat(180-g.timeThisWormholeReset)+" left"):("Fastest time is "+timeFormat(g.fastestWormholeReset));},
			prevReq:[508],
			get reward(){return "Stardust Boost 7 is {}% stronger (based on fastest Wormhole reset, cap at 18 seconds)";},
			flavor:"o	 f			 b	 a	 d			 n	 e	 w	 s",
			effect:function(){return c.d180.div(g.fastestWormholeReset.max(c.d18)).log10().max(c.d0).simplex(2).mul(c.d5).fix(c.d0);},
			effectFormat:x=>x.noLeadFormat(3),
			formulaText:()=>"max(log(180 ÷ max(t, 18)), 0) × (max(log(180 ÷ max(t, 18)), 0) + 1) × 2.5"
		},
		510:{
			name:"Hyperspeed IV",
			description:"Destroy the universe within 18 seconds of starting it",
			check:function(){return g.timeThisWormholeReset<18;},
			progress:function(){return g.timeThisWormholeReset<18?(timeFormat(18-g.timeThisWormholeReset)+" left"):("Fastest time is "+timeFormat(g.fastestWormholeReset));},
			prevReq:[509],
			reward:"The game runs {}% faster (based on total Discoveries)",
			effect:function(){let b = g.totalDiscoveries.div(c.e3),s = achievement(805).effect().div(c.e2);return g.achievement[805]?(b.gt(s)?Decimal.mul(b.pow(c.d0_01),s.pow(c.d0_99)):b).add(c.d1):b.min(c.d1_25)},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).noLeadFormat(3),
			formulaText:()=>g.achievement[805]?("min(D ÷ 10, D<sup>0.01</sup>"+formulaFormat.mult(achievement(805).effect().pow(c.d0_99).mul(10**-0.01),4)+")"):"min(D ÷ 10, 25)",
			flavor:"w		 h		 i		 c		 h					 f		 o		 l		 l		 o		 w		 s					 i		 t		 s					 o		 w		 n					 s		 p		 e		 c		 i		 a		 l					 l		 a		 w		 s",
		},
		511:{
			name:"Enneract",
			get description(){return "Reach "+BEformat(c.d9_999e99)+" stardust first, then raise that to the power of 9 with a single reset";},
			check:function(){return stat.pendingstardust.gt(g.stardust.pow(c.d9))&&g.stardust.gt(c.d9_999e99);},
			progress:function(){return g.stardust.gt(c.d9_999e99)?achievement.percent(stat.pendingstardust,g.stardust.pow(c.d9),1):("(Progress: Reach "+BEformat(c.d9_999e99)+" stardust first)");},
			reward:"Normal U axis is 0.9% stronger",
			flavor:"Slabdrill?",
		},
		512:{
			name:"Shine Bright Tonight",
			description:"Destroy the universe, never having more dark stars than normal stars (including allocated)",
			check:function(){return g.shiningBrightTonight;},
			progress:function(){return g.shiningBrightTonight?"Still possible":"Failed";},
			get reward(){return "Dark stars are 0.25% cheaper per normal star (total: "+percentOrMult(N(0.9975**g.stars))+")"},
			flavor:"Like diamonds in the sky"
		},
		513:{
			name:"Duplicated",
			description:"Bulk buy 20 dark stars at once",
			check:function(){return true;},					/* This gets checked locally by the dark star gaining function */
			progress:function(){return achievement.percent(stat.maxAffordableDarkStars.sub(g.darkstars),c.d20,0);},
			get reward(){return "2× dark matter per dark star (total: "+c.d2.pow(g.darkstars).format()+"×)"},
			flavor:"The greatest shortcoming of the human race is our inability to understand the exponential function."
		},
		514:{
			name:"Duplicated II",
			description:"Bulk buy 35 dark stars at once",
			check:function(){return true;},					/* This gets checked locally by the dark star gaining function */
			progress:function(){return achievement.percent(stat.maxAffordableDarkStars.sub(g.darkstars),c.d35,0);},
			prevReq:[513],
			get reward(){return "2× dark matter per dark star (total: "+c.d2.pow(g.darkstars).format()+"×)"},
			flavor:"Anyone who believes exponential growth can go on forever in a finite world is either a madman or an economist."
		},
		515:{
			name:"Duplicated III",
			description:"Bulk buy 50 dark stars at once",
			check:function(){return true;},					/* This gets checked locally by the dark star gaining function */
			progress:function(){return achievement.percent(stat.maxAffordableDarkStars.sub(g.darkstars),c.d50,0);},
			prevReq:[514],
			get reward(){return "2× dark matter per dark star (total: "+c.d2.pow(g.darkstars).format()+"×)"},
			flavor:"10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10</sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup></sup>"
		},
		516:{
			name:"Black Hole Era",
			description:"Destroy a universe that has no stars",
			check:function(){return g.stars==0;},
			progress:function(){return g.stars==0?"Still achievable":"Failed";},
			reward:"Stars in the 5th and 10th rows additionally make the respective Masteries 1% stronger",
			flavor:"Eyes as black and as shiny as chips of obsidian stared back into his. They were eyes like black holes, letting nothing out, not even information."
		},
		517:{
			name:"Cheap Fill",
			get description(){return "Make all normal axis costs go below "+BEformat(c.eme6);},
			check:function(){return this.lowest().lt(c.eme6);},
			progress:function(){return achievement.percent(this.lowest(),c.eme6,1);},
			reward:"All normal axis costs ^0.95",
			flavor:"Baby, I don't need matter bills to have fun tonight",
			lowest:function(){return axisCodes.slice(0,8).map(x => axisCost(x)).reduce((x,y) => x.max(y));}
		},
		518:{
			name:"Irradiated",
			description:"Gain 696,342 hawking radiation from a single Wormhole reset",
			check:function(){return stat.pendinghr.gte(696342);},
			progress:function(){return achievement.percent(stat.pendinghr,c.d696342,0);},
			reward:"Exotic matter gain is multiplied by {} (based on observations)",
			flavor:"Above them, paralyzing half the heavens, burned a great sun. It burnt without cease, always fixed and still at one point in the sky, and so would burn until that day — now no longer impossibly distant — when it burnt itself out.",
			effect:function(y=this.yellowValue){let p = c.d12.pow(y);return c.d2.pow(g.observations.map(x=>x.pow(c.d0_75.div(p))).sumDecimals().pow(p)).fix(c.d1);},
			effectFormat:x=>x.format(2),
			formulaText:function(){return "2<sup>"+(this.yellowValue.gt(c.d0)?"(":"")+"Σ<span class=\"xscript\"><sup>4</sup><sub>1</sub></span>O<span class=\"xscript\"><sup>"+c.d0_75.div(c.d12.pow(this.yellowValue)).noLeadFormat(4)+"</sup><sub>n</sub></span>"+(this.yellowValue.gt(c.d0)?(")<sup>"+c.d12.pow(this.yellowValue).noLeadFormat(4)+"</sup>"):"")+"</sup>"},
			yellowBreakpoints:[c.d2e3,c.e10,2]
		},
		519:{
			name:"Shiny Yellow Orbs",
			description:"Accumulate 40 stars without allocating any of them in the current universe",
			check:function(){return g.stars>=40&&g.ach519possible;},
			progress:function(){return g.ach519possible?achievement.percent(N(g.stars),c.d40,0):"Failed";},
			get reward(){return "Stars are {}× cheaper per Stardust Upgrade owned. Stardust Upgrades are {}× cheaper per star owned."},
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.inf:y.eq(c.d0)?c.d2:[c.d2,c.d1024,y].decimalPowerTower()},
			effectFormat:x=>x.noLeadFormat(2),
			yellowBreakpoints:[c.d10,c.e10,2],
			flavor:"You do know how these work, right?"
		},
		520:{
			name:"Rationing",
			description:"Destroy the universe with no more than 15 stardust upgrades (note that the axis autobuyer upgrade and Mastery unlocks always persist on reset)",
			check:function(){return effectiveStardustUpgrades()<=15;},
			progress:function(){let o=effectiveStardustUpgrades();return o>15?"Failed":((15-o)+" upgrade"+(o==14?"":"s")+" left");},
			get reward(){return (this.yellowValue.eq(c.d0)?"Square":"{}th")+" root the cost of the first level of each Stardust Upgrade"},
			effect:function(y=this.yellowValue){return y.mul(c.d8).add(c.d2)},
			effectFormat:x=>x.noLeadFormat(2),
			yellowBreakpoints:[c.d200,c.e3,0],
			flavor:"The worst advertisement for Socialism is its adherents.",
		},
		521:{
			name:"Bejouled",
			description:"Destroy the universe without unlocking neural energy",
			check:function(){return energyTypesUnlocked()<5;},
			progress:function(){return energyTypesUnlocked()<5?"Still achievable":"Failed";},
			reward:"+50% neural and meta energy gain",
			flavor:"5 hours of energy but you can eat it in 3 seconds"
		},
		522:{
			name:"Bejouled II",
			description:"Destroy the universe without unlocking gravitational energy",
			check:function(){return energyTypesUnlocked()<3;},
			progress:function(){return energyTypesUnlocked()<3?"Still achievable":"Failed";},
			prevReq:[521],
			reward:"+50% gravitational and spatial energy gain",
			flavor:"25-hour energy: for those who need an extra hour in the day"
		},
		523:{
			name:"Bejouled III",
			description:"Destroy the universe without unlocking dark energy",
			check:function(){return energyTypesUnlocked()<1;},
			progress:function(){return energyTypesUnlocked()<1?"Still achievable":"Failed";},
			prevReq:[522],
			reward:"+50% dark and stelliferous energy gain",
			flavor:"You still have six joules regardless."
		},
		524:{
			name:"Mastery is not a trivial monster",
			description:"Destroy the universe without having active Masteries at any point",
			check:function(){return g.ach524possible;},
			progress:function(){return g.ach524possible?"Still achievable":"Failed";},
			reward:"Unlock a new row of Masteries",
			flavor:"Now with 270% more accidents involving falling objects",
			active:function(){return !g.activeMasteries.map(x=>x==0).includes(false);}
		},
		525:{
			name:"You didn't need it anyway",
			description:"Destroy the universe without buying S axis of any kind",
			check:function(){return g.ach525possible;},
			progress:function(){return g.ach525possible?"Still achievable":"Failed";},
			reward:"+0.0001 normal and dark S axis effect",
			flavor:"Minimalism at its finest"
		},
		526:{
			name:"Big Crunch",
			description:"Buy a dark X axis without buying normal axis in the current Wormhole reset",
			check:function(){return g.ach526possible&&g.darkXAxis.gt(0)&&unlocked("Hawking Radiation");},
			progress:function(){return g.ach526possible?"Still achievable":"Failed";},
			prevReq:[525],
			get reward(){return "+{} normal and dark S axis effect (based on total normal axis)";},
			flavor:"",		// intentionally left blank
			effect:function(){return Decimal.convergentSoftcap(stat.totalNormalAxis.add(c.d1).log10().div(c.e4),c.d0_0004,c.d0_0009)},
			effectFormat:x=>x.format(3),
			formulaText:()=>formulaFormat.convSoftcap("log(ΣA + 1) ÷ 10,000",c.d0_0004,c.d0_0009,stat.totalNormalAxis.gte(9999))
		},
		527:{
			name:"The 4th dimension doesn't exist",
			description:"Reach 160 total dark axis without more than 3 different types of dark axis or resetting your dark axis in the current Wormhole",
			check:function(){return stat.totalDarkAxis.gte(160)&&this.active()&&(achievement.ownedInTier(5)>=7||g.darkstars.eq(c.d0));},
			progress:function(){return ((g.darkstars.eq(c.d0)||achievement.ownedInTier(5)>=7)&&this.active())?achievement.percent(stat.totalDarkAxis,c.d160,0):"Failed";},
			reward:"Dark star cost scaling starts 4 dark stars later",
			flavor:"Einstein would agree",
			active:function(){return axisCodes.map(x => g["dark"+x+"Axis"].eq(c.d0)?0:1).sum()<=3;}
		},
		528:{
			name:"Grand Balance",
			description:"Have exactly 40 stars and 40 dark stars",
			check:function(){return g.stars==40&&g.darkstars.eq(c.d40);},
			progress:function(){return (g.stars<=40&&g.darkstars.lte(c.d40))?achievement.percent(Decimal.add(g.stars,g.darkstars),c.d80,0):"Failed";},
			get reward(){return "For every {} normal axis, gain 1 of the corresponding dark axis for free"+(axisCodes.map(i=>g[i+"Axis"]).reduce((x,y)=>x.max(y)).gt(12500)?" (softcaps past 100)":"")},
			flavor:"Does not include neutron stars, protostars, white dwarf stars, blue hypergiant stars nor starfish",
			effect:function(y=this.yellowValue){return y.mul(c.d2).pow10().mul(0.008)},
			effectFormat:x=>x.recip().noLeadFormat(3),
			yellowBreakpoints:[c.e4,c.e8,1]
		},
		529:{
			name:"Millionaire",
			get description(){return "Reach "+BEformat(c.ee6)+" exotic matter";},
			check:function(){return g.exoticmatter.gt(c.ee6);},
			progress:function(){return achievement.percent(g.exoticmatter,c.ee6,1);},
			get reward(){return "The base value of the base mastery power exponent is multiplied by {} (based on unspent hawking radiation)<br><span class=\"small\">(TL:DR - more mastery power)</span>";},
			flavor:"Go become a millionaire in real life.",
			effect:function(){return Decimal.mul(Decimal.convergentSoftcap(g.hawkingradiation.add(c.d10).dilate(c.d0_1).div(c.d10),c.d1_75,c.d2),g.hawkingradiation.add(c.e10).log10().log10()).fix(c.d1);},
			effectFormat:x=>x.noLeadFormat(4),
			formulaText:()=>{return formulaFormat.convSoftcap("10<sup>log(HR + 10)<sup>0.1</sup></sup> ÷ 10",c.d1_75,c.d2,g.hawkingradiation.gt(641695609))+" × log<sup>[2]</sup>(HR + "+c.e10.format()+")"}
		},
		530:{
			name:"Big Bang",
			description:"Bulk buy 4,800 normal axis at once",
			check:function(){return unlocked("Hawking Radiation");},	 // checked locally by axis-buying function, but no spoilers
			progress:function(){return achievement.percent(axisCodes.map(x => maxAffordableAxis(x)).reduce((x,y)=>x.add(y)).sub(stat.totalNormalAxis),c.d4800,0);},
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
			reward:"Gain more hawking radiation based on exotic matter and stardust (currently: {})",
			flavor:"Oh, how hard it is to be the only one who knows the truth!",
			effect:function(){return [g.exoticmatter.add(c.d1).pow(c.em8).mul(c.d10).layerplus(-2),g.stardust.add(c.d1).pow(c.em5).mul(c.d10).layerplus(-2)].productDecimals().pow10()},
			effectFormat:x=>percentOrMult(x),
			formulaText:function(){
				let out = "10<sup>log<sup>[2]</sup>((EM + 1)<sup>"+c.em8.format()+"</sup> × 10) × log<sup>[2]</sup>((S + 1)<sup>"+c.em5.format()+"</sup> × 10)</sup>"
				return this.effect().gte(c.d10)?(out+"×"):("("+out+" - 1) × 100%")
			}
		},
		602:{
			name:"District 13",
			description:"Unlock 12 Stardust Boosts",
			check:function(){return g.stardustUpgrades[2]>9},
			progress:function(){return achievement.percent(N(g.stardustUpgrades[2]+2),c.d12,0)},
			reward:"The cost of the third Stardust Upgrade is raised to the power of 0.9",
			flavor:"Ladies and gentlemen... welcome to the 76th Hunger Games!",
		},
		603:{
			name:"16,777,216 Color Theorem",
			description:"Get 1 of each primary lumen",
			check:function(){return !g.lumens.slice(0,3).map(x=>x.eq(c.d0)).includes(true)},
			progress:function(){return achievement.percent(g.lumens.slice(0,3).map(x=>x.min(c.d1)).sumDecimals(),c.d3,0)},
			reward:"{} chroma gain (based on total lumens)",
			flavor:"The soul becomes dyed with the color of its thoughts.",
			effect:function(){return g.lumens.sumDecimals().div(c.d100).add(c.d1)},
			effectFormat:x=>percentOrMult(x),
			formulaText:()=>g.lumens.sumDecimals().gte(c.d900)?"ΣL ÷ 100 + 1×":"+ΣL%"
		},
		604:{
			name:"Graduation",
			description:"Complete any Study four times",
			check:function(){return g.studyCompletions.includes(4)},
			progress:function(){return achievement.percent(N(g.studyCompletions.slice(1).reduce((x,y)=>Math.max(x,y))),c.d4,0)},
			get reward(){return "Every Study completion gives 1% of the relevant Study's base cost as free Discoveries (current total: "+this.effValue().noLeadFormat(2)+")"},
			flavor:"He would automatically begin to assume that specialists in all other fields were magicians, judging the depth of their wisdom by the breadth of his own ignorance...",
			studyValue:function(x){
				if (x===10) return c.d0 /*studies[10].research.slice(0,g.studyCompletions[10]).map(x=>research[x].basecost).sumDecimals()*/
				return research[studies[x].research].basecost.mul(0.01*g.studyCompletions[x])
			},
			effValue:function(){return countTo(studies.length-1).map(x=>this.studyValue(x)).sumDecimals()}
		},
		605:{
			name:"Time of Gifts",
			description:"Reach 256× tickspeed",
			check:function(){return stat.tickspeed.gte(c.d256)},
			progress:function(){return achievement.percent(stat.tickspeed,c.d256,1)},
			reward:"Research 8-2 is 10% stronger",
			flavor:"To give somebody your time is the biggest gift you can give."
		},
		606:{
			name:"Ball Lightning",
			req:c.d10.quad_tetr(c.pi),
			get description(){return "Reach "+this.req.format()+" (10^^π) dark energy"},
			check:function(){return g.darkEnergy.gt(this.req)},
			progress:function(){return achievement.percent(g.darkEnergy,this.req,1)},
			reward:"{} all energy gain (based on dark energy)",
			flavor:"Programming graphics in X is like finding the square root of π using Roman numerals",
			effect:function(){return g.darkEnergy.mul(c.ee10).layerplus(-3).pow(c.d2)},
			effectFormat:x=>percentOrMult(x),
			formulaText:()=>"log<sup>[3]</sup>(DE × "+c.ee10.format()+")<sup>2</sup>×"
		},
		607:{
			name:"There are Four Lights",
			description:"Have at least 1 of four colors of lumen",
			check:function(){return this.lumens()>3},
			progress:function(){return achievement.percent(N(this.lumens()),c.d4,0)},
			get reward(){return "Each star below 60 divides chroma gain by {} rather than 3"},
			flavor:"There are six lights. How many do you see now?",
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.d1_25:y.eq(c.d0)?N(2.8):c.d2_5.sub(y)},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[N(999),c.e4,1],
			lumens:function(){return g.lumens.map(x=>x.sign).sum()},
		},
		608:{
			name:"Zero Player Game II",
			description:"Complete the fourth level of Study I without any clicks in the current Wormhole",
			check:function(){return (g.activeStudy==1)&(g.studyCompletions[1]>2)&&(!g.clickedInStudy1)},
			progress:function(){return (g.studyCompletions[1]<3)?"Complete Study I 3 times first":(g.activeStudy!==1)?"Enter Study I first":g.clickedInStudy1?"Failed":"Still possible"},
			reward:"The third reward of Study I is 11.1% stronger",
			flavor:"The only time a lazy man ever succeeds is when he tries to do nothing."
		},
		609:{
			name:"Black Hole Era II",
			description:"Complete the fourth level of Study II without any stars",
			check:function(){return (g.activeStudy==2)&(g.studyCompletions[2]>2)&&(g.stars==0)},
			progress:function(){return (g.studyCompletions[2]<3)?"Complete Study II 3 times first":(g.activeStudy!==2)?"Enter Study II first":(g.stars==0)?"Still possible":"Failed"},
			reward:"The third reward of Study II is 11.1% stronger",
			flavor:"Let's not strive to be black holes in the meantime. Let's illuminate the world instead of darkening it, instead of tearing it to pieces. Let's prove we are worthy of being stardust."
		},
		610:{
			name:"Triple Nine Society",
			description:"Reach 999 Discoveries",
			check:function(){return g.totalDiscoveries.gte(999)},
			progress:function(){return achievement.percent(g.totalDiscoveries,N(999),0)},
			reward:"+{}% hawking radiation (based on percentage of unspent Discoveries)",
			flavor:"999 Emergencies, what is your emergency?\"<br>\"MY FITBIT SAYS I’M ABOUT TO DIE!",
			effect:function(){return unspentDiscoveries().div(g.totalDiscoveries.gte(999)?g.totalDiscoveries:g.totalDiscoveries.mul(999).sqrt().max(c.d1)).add(c.d1)},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).format(2),
			formulaText:()=>"100 × υD ÷ ΣD"
		},
		611:{
			name:"Pieces of Eight",
			description:"Unlock 8 colors of Light",
			check:function(){return g.research.r11_8},
			progress:function(){return "Not Completed!"},
			prevReq:[607],
			get reward(){return "+0.25% chroma gain per dark star (total: "+percentOrMult(N(1.0025).pow(g.darkstars))+")"},
			flavor:"Stars, hide your fires, let not light see my black and deep desires"
		},
		612:{
			name:"Star-Spangled Banner",
			description:"Buy the 60th star",
			check:function(){return g.stars==60},
			progress:function(){return achievement.percent(N(g.stars),c.d60,0)},
			reward:"Each stardust upgrade raises the star cost to the power of {}. Each star raises the stardust upgrade cost to the power of {}.",
			effect:function(y=this.yellowValue){return 0.999-0.009*y.toNumber()},
			effectFormat:x=>N(x).noLeadFormat(4),
			yellowBreakpoints:[N(480),N(750),0],
			flavor:"<span style=\"color:#8a8767;text-shadow: 0px 1px 0px #a0a67c;\">(hardcapped)</span>"
		},
		613:{
			name:"Antimatter Academia",
			description:"Have research 9-7, 9-8 and 9-9 active simultaneously",
			check:function(){return this.active()==3},
			progress:function(){return achievement.percent(N(this.active()),c.d3,0)},
			active:function(){return [7,8,9].map(x=>g.research["r9_"+x]?1:0).sum()},
			reward:"+{}× to the effects of research 10-7, 10-8 and 10-9",
			effect:function(y=this.yellowValue){return y.pow10().pow10().sub(c.d1).div(c.d3)},
			effectFormat:x=>x.noLeadFormat(2),
			yellowBreakpoints:[N(3333),N(333333),2],
			flavor:"Injustice in the Antimatter Academia: Beginners are only allowed to choose one field of study while the elite can pick all three. \"Its just not fair, man. How come they can do it?\" Questions frustrated student."
		},
		614:{
			name:"Redstone Clock",
			description:"Have each of the last 10 Wormhole resets be less than 1 second long",
			check:function(){return !g.previousWormholeRuns.last10.map(x=>x.time<1).includes(false)},
			progress:function(){return "Slowest run is "+timeFormat(g.previousWormholeRuns.last10.map(x=>x.time).reduce((x,y)=>Math.max(x,y)))},
			get reward(){return "+1% tickspeed per number of digits in the time in seconds spent in the current Wormhole (currently: "+this.effect().format()+"%, next increase in "+timeFormat(this.effect().pow10().sub(g.truetimeThisWormholeReset))+")"},
			effect:function(){return g.truetimeThisWormholeReset.gte(c.d10)?g.truetimeThisWormholeReset.log10().floor().add(c.d1):c.d1},
			flavor:"I'd tell a joke about redstone delay but then I'd just be repeating myself"
		},
		615:{
			name:"Twosday",
			req:N("2.22e2222"),
			get description(){return "Accumulate "+this.req.format()+" mastery power"},
			check:function(){return g.masteryPower.gte(this.req)},
			progress:function(){return achievement.percent(g.masteryPower,this.req,1)},
			get reward(){return "Mastery 101 works with square-rooted effect even when inactive (currently: ^"+masteryEffect(101).sqrt().format(3)+")"},
			get flavor(){return "But Twosday was like "+Math.round((Date.now()-1645488000000)/86400000).toLocaleString("en-US")+" days ago!"}
		},
		616:{
			name:"Pseudoscience",
			description:"Have 30 researches with no spent Discoveries",
			check:function(){return (totalResearch.overall()>=30)&&g.spentDiscoveries.eq(c.d0)},
			progress:function(){return g.spentDiscoveries.eq(c.d0)?achievement.percent(N(totalResearch.overall()),c.d30,0):"Failed"},
			reward:"Research 7-5 is 0.33% stronger per research owned",
			flavor:"These mysteries about <i>how</i> we evolved should not distract us from the indisputable fact that we <i>did</i> evolve."
		}
	},
	7:{
		701:{
			name:"Arquillian Galaxy",
			description:"Create a galaxy",
			check:function(){return true},  // checked locally
			progress:function(){return "Not Completed!"},
			reward:"The first 40 stars cost less (-^0.01 per star below 40)",
			flavor:"Did you know you can play <i>Exotic Matter Dimensions</i> on <a href=\"https://galaxy.click/play/129\">galaxy.click</a>? Try it!"
		},
		702:{
			name:"Double Galaxy",
			description:"Create 2 galaxies",
			check:function(){return g.galaxies>=2},
			progress:function(){return achievement.percent(N(g.galaxies),c.d2,0)},
			get reward(){return "The star cost is divided by {} per star, per star (based on time in the current Wormhole) (current total: "+this.effect().pow(g.stars**2).format(2)+")"},
			flavor:"Did you know you can also play <i>Exotic Matter Dimensions</i> on <a href=\"alemaninc.github.io/Exotic-Matter-Dimensions/\">alemaninc.github.io</a>? Try that too!",
			effect:function(){return g.truetimeThisWormholeReset.div(c.e7).add(c.d1).pow(c.e2)},
			effectFormat:x=>x.format(4),
			formulaText:()=>"(1 + t ÷ "+c.e7.format()+")<sup>100</sup>"
		},
		703:{
			name:"You got past the Big Wall",
			description:"Create 3 galaxies",
			prevReq:[702],
			check:function(){return g.galaxies>=3},
			progress:function(){return achievement.percent(N(g.galaxies),c.d3,0)},
			reward:"The star cost superscaling starts at {} instead of 25 (based on hawking radiation)",
			flavor:"Did you know you can also play <i>Exotic Matter Dimensions</i> on <a href=\"file:///C:/Users/\">C:/Users/ale</a>-- okay, maybe not that one...",
			effect:function(){return Decimal.convergentSoftcap(g.hawkingradiation.add(c.e10).log10().log10(),c.d8,c.d16).add(c.d24)},
			effectFormat:x=>x.noLeadFormat(4),
			formulaText:()=>g.hawkingradiation.gt(c.ee8)?"40 - 64 ÷ log<sup>[2]</sup>(HR)":("log<sup>[2]</sup>(HR + "+c.e10.format()+") + 24")
		},
		704:{
			name:"Five-finger discount",
			description:"Have 5555 total dark axis",
			check:function(){return stat.totalDarkAxis.gte(5555)},
			progress:function(){return achievement.percent(stat.totalDarkAxis,N(5555),0)},
			reward:"+0.5555× dark Y axis effect",
			flavor:"You've got to pick a pocket or two!"
		},
		705:{
			name:"Nameless here for evermore",
			description:"Make the dark energy effect go below 0.003",
			check:function(){return stat.darkEnergyEffect.lt(c.d0_003)},
			progress:function(){return achievement.percent(stat.darkEnergyEffect,c.d0_003,1)},
			reward:"The third reward of Study III is 11.1% stronger",
			flavor:"Give me two years and your dinner will be free"
		},
		706:{
			name:"Cortex Baker",
			description:"Reach the knowledge effect softcap",
			check:function(){return Decimal.div(stat.knowledgeEffect,stat.knowledgeEffectCap).gte(c.d0_75)},
			progress:function(){return achievement.percent(stat.knowledgeEffect,stat.knowledgeEffectCap.mul(c.d0_75),0)},
			reward:"Each dark W axis (including free) gives a {}× multiplier to dark matter gain (based on knowledge)",
			flavor:"Knowledge is like the sea. Go too deep, and the crushing weight of it could kill you.",
			effect:function(){return Decimal.logarithmicSoftcap(g.knowledge.add(c.d1).log10().pow(c.d2div3),c.e3,c.d0_1,1).sub(c.inflog).pow10().add(c.d1)},
			effectFormat:x=>x.noLeadFormat(2),
			formulaText:()=>"10<sup>"+formulaFormat.logSoftcap("log(K + 1)<sup>2 ÷ 3</sup>",c.e3,c.d0_1,g.knowledge.gt("ee4.5"))+" - 308.254</sup> + 1"
		},
		707:{
			name:"Master of the Void",
			get description(){return "Reach "+c.e30.format()+" mastery power without buying normal axis, having active Masteries, doing stardust resets, buying stars or stardust upgrades or having temporary research"},
			check:function(){return g.masteryPower.gte(c.e30)&&stat.totalNormalAxis.eq(c.d0)&&g.ach524possible&&(g.TotalStardustResets==0)&&(totalResearch.temporary==0)},
			progress:function(){return (totalResearch.temporary>0)?"Failed due to having research":(g.stars>0)?"Failed due to having stars":(effectiveStardustUpgrades()>6)?"Failed due to buying stardust upgrades":(g.TotalStardustResets>0)?"Failed due to stardust resetting":(!g.ach524possible)?"Failed due to having active Masteries":(stat.totalNormalAxis.neq(c.d0))?"Failed due to having axis":achievement.percent(g.masteryPower,c.e30,1)},
			reward:"+{} to the base mastery power gain exponent (based on time since last mastery swap)",
			flavor:"This is not Iron Will VI",
			effect:function(){return stat.masteryTimer.log10()},
			effectFormat:x=>x.format(3),
			formulaText:()=>"log(t + 1)",
		},
		708:{
			name:"Mind-bending Curvature",
			get req(){return betaActive?N("7.77e777"):N("8.88e888")},
			get description(){return "Make the effect of the "+achievement.label(501)+" reward exceed "+this.req.format()+"×"},
			check:function(){return achievement(501).realEffect().gte(this.req)},
			progress:function(){return achievement.percent(achievement(501).realEffect(),this.req,1)+"<br>(Estimated real time to get: "+timeFormat(this.req.root(achievement(501).effectExp()).sub(c.d1).mul(c.e4).sub(g.truetimeThisWormholeReset).div(stat.tickspeed))+")"},
			reward:"Masteries 101 and 103 can be activated simultaneously",
			flavor:"God is a philosophical black hole - the point where reason breaks down."
		},
		709:{
			name:"Mind-bending Curvature II",
			get req(){return betaActive?N("8.88e888"):N("9.99e999")},
			prevReq:[708],
			get description(){return "Make the effect of the "+achievement.label(501)+" reward exceed "+this.req.format()+"×"},
			check:function(){return achievement(501).realEffect().gte(this.req)},
			progress:function(){return achievement.percent(achievement(501).realEffect(),this.req,1)+"<br>(Estimated real time to get: "+timeFormat(this.req.root(achievement(501).effectExp()).sub(c.d1).mul(c.e4).sub(g.truetimeThisWormholeReset).div(stat.tickspeed))+")"},
			get reward(){return "The "+achievement.label(501)+" reward divides dark axis costs"},
			flavor:"God not only plays dice, but sometimes throws them where they cannot be seen."
		},
		710:{
			name:"Mind-bending Curvature III",
			get req(){return betaActive?N("9.99e999"):N("1.11e1111")},
			prevReq:[709],
			get description(){return "Make the effect of the "+achievement.label(501)+" reward exceed "+this.req.format()+"×"},
			check:function(){return achievement(501).realEffect().gte(this.req)},
			progress:function(){return achievement.percent(achievement(501).realEffect(),this.req,1)+"<br>(Estimated real time to get: "+timeFormat(this.req.root(achievement(501).effectExp()).sub(c.d1).mul(c.e4).sub(g.truetimeThisWormholeReset).div(stat.tickspeed))+")"},
			get reward(){return "Mastery 103 is "+(betaActive?9:4)+"× stronger"},
			flavor:"Auschwitz will forever remain the black hole of the entire human history"
		},
		711:{
			name:"Moonlight Capital",
			description:"Generate 1 chroma per second with 40 stars or less",
			check:function(){return g.ach711Progress<41},
			progress:function(){return g.ach711Progress===61?"1 chroma per second has not been reached in the current Matrix":("Best is "+g.ach711Progress+" stars")},
			get reward(){return "Unlock Mastery 105, and Mastery 105 works with {}% efficiency"+((g.ach711Progress===0)?"":(" (based on least number of stars that 1 chroma per second was generated with. Next milestone at "+Math.min(g.ach711Progress-1,39)+")"))},
			flavor:"I only know two pieces; one is 'Clair de lune' and the other isn't",
			milestones:function(){return 40-g.ach711Progress},
			maxMilestones:40,
			effect:function(){return (g.ach711Progress===0)?c.d1:(g.ach711Progress>40)?c.d0:N(0.91-g.ach711Progress/50)},
			effectFormat:x=>x.mul(c.e2).max(c.d11).format(),
			formulaText:()=>"max(100 × floor(μ ÷ 40), 11 + μ × 2)"
		},
		712:{
			name:"Rewind",
			description:"Buy a research which stems from a research below it",
			check:function(){return g.research.r15_2||g.research.r15_14},
			progress:function(){return "Not Completed!"},
			reward:"Each Photonic research reduces the cost of all other Photonic research by {} Discoveries",
			effect:function(y=this.yellowValue){return y.mul(1405).add(c.d35)},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[N(3500),N(144000),0],
			flavor:"If you miss the beginning, the basics, then you are destined to go back and visit the basics."
		},
		713:{
			name:"V's Achievements",
			description:"Have all Chromatic research active simultaneously",
			check:function(){return this.active()===6},
			progress:function(){return achievement.percent(N(this.active()),c.d6,0)},
			active:function(){return [7,8,9].map(x=>g.research["r10_"+x]?2:g.research["r9_"+x]?1:0).sum()},
			get reward(){return "Reduce the cost multiplier per Chromatic research to {}×"+(g.lumens[5].gte(c.d360)?"":" (must have 360 yellow lumens for this to take effect)")},
			effect:function(y=this.yellowValue){return c.d4.pow(c.d1.sub(y))},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[N(500),N(50000),1],
			flavor:"Injustice in the Antimatter Academia: Beginners are only allowed to choose one field of study while the elite can pick all three. \"Its just not fair, man. How come they can do it?\" Questions frustrated student."
		},
		714:{
			name:"Old age",
			description:"Play for 122 years",
			check:function(){return g.truetimePlayed.gt(31556926*122)},
			progress:function(){return achievement.percent(g.truetimePlayed.div(31556926),c.d122,0)+"<br>(Real time left to reach: "+timeFormat(N(31556926*122).sub(g.truetimePlayed).div(stat.tickspeed))+")"},
			get reward(){return betaActive?("{} extra Discoveries (based on time played)"+(this.effect().gt(g.knowledge.log10().div(c.d10))?" (softcapped past "+g.knowledge.log10().div(c.d10).format()+", based on knowledge)":"")):"122 extra Discoveries"},
			effect:function(){
				if (!betaActive) return c.d122
				let out = g.truetimePlayed.div(31556926)
				if (out.gt(c.e4)) out = out.log10().mul(c.d3).sub(c.d11).pow(c.d1div3).add(c.d3).pow10()
				return Decimal.logarithmicSoftcap(out,g.knowledge.log10().div(c.d10),c.d1)
			},
			effectFormat:x=>x.format(3),
			formulaText:function(){return formulaFormat.logSoftcap(g.truetimePlayed.gt(31556926e3)?"10<sup>(log(t ÷ 31,556,926) × 3 - 11)<sup>1 ÷ 3</sup> + 3</sup>":"t ÷ 31,556,926",g.knowledge.log10().div(c.d10),c.d1,this.effect().gt(g.knowledge.log10().div(c.d10)))},
			flavor:"As soon as you feel too old to do a thing, do it."
		},
		715:{
			name:"Metastable",
			description:"Complete the fourth level of Study IV with just one Stardust reset",
			check:function(){return (g.activeStudy===4)&(g.studyCompletions[4]>2)&&(g.TotalStardustResets<2)},
			progress:function(){return (g.studyCompletions[4]<3)?"Complete Study IV 3 times first":(g.activeStudy!==4)?"Enter Study IV first":g.TotalStardustResets>1?"Failed":"Still possible"},
			reward:"The third reward of Study IV is 11.1% stronger",
			flavor:"Nature abhors a vacuum, and if I can only walk with sufficient carelessness I am sure to be filled.",
			beta:true
		},
		716:{
			name:"Infinity Upgrade",
			get description(){return "Buy a stardust upgrade for less than "+c.inf.recip().format()+" stardust"},
			check:function(){return true}, // checked locally
			progress:function(){let min = countTo(5).map(x=>stat["stardustUpgrade"+x+"Cost"]).reduce((x,y)=>x.min(y));return min.lt(c.inf.recip())?"You can achieve this if you buy a stardust upgrade right now!":achievement.percent(min.recip(),c.inf,1)},
			reward:"The 9-achievement Wormhole Milestone effect is raised to the power of {} (based on time in the current Wormhole)",
			effect:function(){return g.truetimeThisWormholeReset.div(c.e4).add(c.d10).log10().log10().div(c.d10).add(c.d1)},
			effectFormat:x=>x.format(4),
			formulaText:()=>"log<sup>[2]</sup>(t ÷ 10,000 + 10) ÷ 10 + 1",
			flavor:"I am incapable of conceiving infinity, and yet I do not accept finity.",
			beta:true
		},
		717:{
			name:"Ant God's Discovery",
			description:"Buy a Spatial Synergism research",
			prevReq:[712],
			check:function(){return g.research.r17_1||g.research.r17_15},
			progress:function(){return "Not Completed!"},
			get reward(){return "The normal and dark axis cost scaling is {}% weaker (based on highest-ever exotic matter)"},
			effect:function(){return Decimal.convergentSoftcap(g.exoticmatterThisSpacetimeReset.add(c.d1).log10().div(c.e7).add(c.d1).log2(),c.d25,c.d50)},
			effectFormat:x=>x.toFixed(3),
			formulaText:function(){return formulaFormat.convSoftcap("log<sub>2</sub>(log(EM) ÷ "+c.e7.format()+" + 1)",c.d25,c.d50,this.effect().gt(c.d25))},
			flavor:"This is my song and no one can take it away<br>It's been so long, but now you're here, here to stay<br>And I wonder if you know what it means to find your dreams come true",
			beta:true
		},
		718:{
			name:"Softcap-colored Lights",
			description:"Have 26 black and white lumens each",
			check:function(){return g.lumens[6].gt(c.d25)&&g.lumens[7].gt(c.d25)},
			progress:function(){return this.check()?"Due to the way achievements work, you need to gain 1 more lumen of any kind to get this.":achievement.percent(Decimal.add(g.lumens[6].min(c.d26),g.lumens[7].min(c.d26)),c.d52,0)},
			reward:"Research 13-8 is 2.6% stronger",
			flavor:"Game under construction: all mechanics must wear hardcaps.",
			beta:true
		},
		719:{
			name:"OMCCDV II",
			req:N(44059),
			description:"Reach 44,059 total axis",
			prevReq:[719],
			check:function(){return stat.totalAxis.gte(this.req)},
			progress:function(){return achievement.percent(stat.totalAxis,this.req,0)},
			get reward(){return "Each observation increases knowledge gain by (20.20 + 8.16 × [number of galaxies])%, compounding with itself (currently: "+this.effect().format()+"×)"},
			flavor:"\"This is a house, Do you want to live here?\" - Stat Mark, 2020",
			effect:function(){return c.d0_0816.mul(g.galaxies).add(c.d1_202).pow(g.observations.sumDecimals())}
		}
	},
	8:{
		801:{
			name:"The Explorer",
			description:"Reveal all Spatial Synergism research",
			check:function(){return this.revealed()==56},
			progress:function(){function q(x){return "<span style=\"color:#330066\">"+"?".repeat(x)+"</span>"};return "Progress: "+this.revealed()+" / "+q(2)+" ("+q(2)+"."+q(3)+"%)"},
			get reward(){return "Mastery 62 affects normal axis costs with ^0.1 effect (currently: ^"+masteryEffect(62).pow(c.d0_1).format(4)+")"},
			flavor:"Adventure is just bad planning.",
			revealed:function(){let v = visibleResearch();return researchGroupList.spatialsynergism.contents.map(x=>v.includes(x)?1:0).sum()},
			beta:true
		},
		802:{
			name:"Blacken the Sun",
			get description(){return "Reach "+c.d2_1e67.format()+" hawking radiation"},
			check:function(){return g.hawkingradiation.gte(c.d2_1e67)},
			progress:function(){return achievement.percent(g.hawkingradiation,c.d2_1e67,1)},
			reward:"+1% dark X axis effect per black hole observation",
			flavor:"Every revolution evaporates and leaves behind only the slime of a new bureaucracy.",
			beta:true
		},
		803:{
			name:"Base 3",
			description:"Have at least 3 times more of each normal axis than the following normal axis, with at least 1 S axis.",
			check:function(){
				if (g.SAxis.eq(c.d0)) return false
				for (let i=0;i<7;i++) if (Decimal.lt(g[axisCodes[i]+"Axis"],g[axisCodes[i+1]+"Axis"].mul(c.d3))) return false
				return true
			},
			progress:function(){
				if (stat.realSAxis.eq(c.d0)) return "Need an S axis"
				for (let i=6;i>=0;i--) if (Decimal.lt(g[axisCodes[i]+"Axis"],g[axisCodes[i+1]+"Axis"].mul(c.d3))) return g[axisCodes[i]+"Axis"].noLeadFormat(3)+" / "+g[axisCodes[i+1]+"Axis"].mul(c.d3).noLeadFormat(3)+" "+axisCodes[i]+" axis"
				return "Wormhole now to get this achievement!"
			},
			reward:"The softcap of the 3rd dark star effect is 3% weaker",
			flavor:"\"Reaching Base 3 Needs a massive 1.00E100<br>Which takes 2 hours to do<br>Base 3 is the final base. You have to reach<br>ω^ω^ω Which takes 1 day to do.\"<br>- Stat Mark",
			beta:true
		},
		804:{
			name:"Danzig Russia",
			req:N("e771277123"),
			get description(){return "Reach "+((g.notation=="BE Default")?"1e771277123":["Engineering","Mixed scientific","Scientific"].includes(g.notation)?"1.00e771,277,123":(g.notation=="Logarithm")?"e771,277,123":this.req.format())+" exotic matter"},
			check:function(){return g.exoticmatter.gt(this.req)},
			progress:function(){return achievement.percent(g.exoticmatter,this.req,1)},
			reward:"+12.3% Y axis effect per 7 dark stars",
			flavor:"Read the stars and see my scars",
			beta:true
		},
		805:{
			name:"The Energetic Hour",
			req:N("ee60"),
			get description(){return "Reach "+this.req.format()+" meta energy"},
			check:function(){return g.metaEnergy.gt(this.req)},
			progress:function(){return achievement.percent(g.metaEnergy,this.req,1)},
			get reward(){return "The "+achievement.label(510)+" reward hardcap is now a softcap and starts at {}% instead of 25 (based on meta energy)"},
			effect:function(){return g.metaEnergy.log10().pow(c.d0_1).add(c.e6).pow(0.0162).mul(c.d20)},
			effectFormat:x=>x.noLeadFormat(3),
			formulaText:function(){return "(log(ME)<sup>0.1</sup> + "+c.e6.format()+")<sup>0.0162</sup> × 20"},
			flavor:"DID YOU. JUST FLIP. MY SWITCH?",
			beta:true,
		},
		806:{
			name:"Cheap Fill II",
			get description(){return "Make all dark axis costs go below "+BEformat(c.eme5);},
			check:function(){return this.lowest().lt(c.eme5);},
			progress:function(){return achievement.percent(this.lowest(),c.eme5,1);},
			reward:"All dark axis costs ^0.95",
			flavor:"Let's go below zero and hide from the sun",
			lowest:function(){return axisCodes.slice(0,8).map(x => darkAxisCost(x)).reduce((x,y) => x.max(y));}
		},
		807:{
			name:"Get Lucky",
			description:"Buy a Luck Upgrade",
			prevReq:[807],
			check:function(){return true}, // checked locally
			progress:function(){return "Not Completed!"},
			reward:"Luck shard gain is multiplied by {} (based on total runes)",
			effect:function(){return Object.values(g.totalLuckRunes).map(x=>x.div(c.e2).add(c.d10).log10()).productDecimals().pow10().sub(c.d9)},
			effectFormat:x=>x.noLeadFormat(2),
			formulaText:()=>runeTypeUnlocked("quatrefolium")?("10<sup>Π<span class=\"xscript\"><sup>"+(runeTypeUnlocked("cinquefolium")?3:2)+"</sup><sub>1</sub></span>log(R"+(runeTypeUnlocked("quatrefolium")?"<sub>n</sub>":"")+" ÷ 100 + 10)</sup> - 9"):"1 + R ÷ 100",
			flavor:"Oh, I appear to have run out of random access <span style=\"color:#9575cd\">memories</span>...",
			beta:true
		},
		808:{
			name:"Octarine-colored Master Spark",
			description:"Unlock Prismatic",
			prevReq:[808],
			check:function(){return g.research.r20_8},
			progress:function(){return "Not Completed!"},
			reward:"Dark W axis is {}% stronger (based on permanent research owned)",
			effect:function(){let r=totalResearch.permanent;return Math.exp(-r/100)+r/100},
			effectFormat:x=>N((x-1)*100).noLeadFormat(2),
			formulaText:()=>"100 × (1 - e<sup>R ÷ 100</sup>) + R",
			flavor:"Shoot and I'll move.",
			beta:true
		},
		809:{
			name:"False Deity Destroyer",
			description:"Buy an anti-axis",
			prevReq:[809],
			check:function(){return g.antiXAxis.neq(c.d0)},
			progress:function(){return "Not Completed!"},
			reward:"Increase the start and limit of the free axis softcap by 5 percentage points",
			flavor:"One day, alemaninc wasn't nice to Stat Mark. So Stat Mark prayed to the Heavenly Pelle, and she blessed Stat Mark with the power to create an antimatter-storm wherever he pleases. And Stat Mark gave the antimatter-storm to alemaninc and destroyed his house. And alemaninc was never seen again.",
			beta:true
		},
		810:{
			name:"Night of Nights",
			description:"Unlock the Study of Studies",
			prevReq:[807],
			check:function(){return g.research.r26_5},
			progress:function(){return "Not Completed!"},
			reward:"",
			flavor:"Come back two hours earlier."
		},
		811:{
			name:"Wall of a Vigintillion Photons",
			description:"Create 7 galaxies",
			prevReq:[703],
			check:function(){return g.galaxies>=7},
			progress:function(){return achievement.percent(N(g.galaxies),c.d7,0)},
			get reward(){return "The star cost is raised to the power of 0.97 for every galaxy below your highest count"+(unlocked("Matrix")?" this Matrix":"")+" (currently: ^"+N(0.97).pow(g.highestGalaxiesSpacetime-g.galaxies).noLeadFormat(3)+")"},
			flavor:"The red pill of Aarexian balancing and the blue pill of upgrade clickers",
		},
	}
};
achievement.all = Object.values(achievementList).map(x => Object.keys(x)).flat()
achievement.withMilestones = achievement.all.filter(x=>(typeof achievement(x).milestones)!=="undefined")
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
		flavor:"1200 frames per minute! Wow. alemaninc only gets 20 frames per minute.",
		rarity:1
	},
	7:{
		name:"Rasputin",
		description:"Import \"cat\" as a promotion code",
		check:function(){return true;}, // checked locally
		flavor:"There was a cat that really was gone",
		rarity:3
	},
	8:{
		name:"Help Wanted",
		description:"Import \"alemaninc\" as a promotion code",
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
		check:function(){return g.researchRespec&&(!nonPermanentResearchList.map(x=>g.research[x]).includes(true));},
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
		description:"Buy research 6-9.",
		check:function(){return g.research.r6_9;}, // checked locally
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
		get flavor(){return (empoweredAxisBought>=1e5)?("THERE IS NO EMPOWERED EXOTIC MATTER DIMENSIONS VI<br>[cackles maniacally]"):("You've still "+(1e5-empoweredAxisBought).toLocaleString("en-US")+" more clicks before the next one. Good luck!");},
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
		rarity:5
	},
	29:{
		name:"Dilated Pupils",
		get description(){return "Reach "+timeFormat(c.inf.pow10())+" of dilated exotic matter"},
		check:function(){return g.exoticmatter.dilate(c.d1_05.pow(newsSupport.dilationPenaltyReductions).mul(c.d0_75)).log10().gt(c.inf)},
		flavor:"Is that how long it'll take for you to stop clicking the news ticker?",
		rarity:4
	},
	30:{
		name:"<img src=\"img/blob.png\" alt=\"Blob\" height=\"32\" width=\"32\">",
		description:"Prove your status as a regular Contributor",
		check:function(){return true},
		reward:"Your blob is in the game! Look!",
		flavor:"How come PSionJoule gets a secret achievement and no one else? Not fair!",
		rarity:3,
	},
	31:{
		name:"Deep Thought",
		description:"Click the Hitchhiker's Guide to the Galaxies exactly 42 times",
		check:function(){return this.clicks==42},
		flavor:"The ultimate question of life, the universe and what people are doing clicking random headings",
		rarity:5,
		clicks:0,
		click:function(){
			this.clicks++
			if (this.clicks==42) {setTimeout(()=>{addSecretAchievement(31)},2000)}
			else {setTimeout(function(){secretAchievementList[31].clicks=0},30000)}
		}
	},
	32:{
		name:"You have 1 ^300, 0 ^299, 0 ^298, 0 ^297 and 0 ^296",
		get description(){return "Have a Zip Point multiplier of "+BEformat("e300")+"×"},
		check:function(){return g.zipPointMulti==1e300},
		flavor:"Stupid xhwzwka changed it to \"You have 1e300 exponents\". How boring...<br>But then, he restored the \"You have 0 ^3, 0 ^2, 0 ^1 and 0 ^0\" and the Zip Points were returned to their former glory.",
		rarity:7
	},
	33:{
		name:"Stat Mark",
		description:"Prove your status as a Distinguished Contributor that's not in our server",
		check:function(){return newsSupport.newsletter.answered==8},
		flavor:"Hardly marked",
		rarity:6
	},
	34:{
		name:"Wrong game?",
		description:"Import a save string from Antimatter Dimensions",
		check:function(){return true},
		flavor:"alemaninc knows what it is like to get mistaken for someone far grander than yourself.<br>alemaninc gets angrier.",
		rarity:2
	}
}
const achievementEvents = {
	axisBuy:[101,102,103,104,113,207,208,209,210,217,303,304,305,505,526,527,704,719,803,809],
	gameloop:[105,106,107,108,109,110,111,112,114,115,202,203,204,205,206,211,212,213,214,215,302,306,307,308,309,310,311,312,408,409,410,411,413,502,503,504,517,529,605,606,610,615,705,706,707,708,709,710,711,714,804,805,806],
	stardustUpgrade:[216,301,402,403,404,405,406,407,602],
	starBuy:[401,519,528,612],
	wormholeResetBefore:[501,506,507,508,509,510,512,516,518,520,521,522,523,524,525,608,609,715],
	wormholeResetAfter:[604,614,802],
	researchBuy:[601,611,613,616,712,713,717,801,808,810],
	lumenGain:[603,607,718],
	galaxyGain:[701,702,703,811],
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
		if (((achievement.ownedInTier(tier)==0)&&(!g.achievement[achievement.initial[tier]]))||((achievement.ownedInTier(tier)==Object.keys(achievementList[tier]).length)&&(!g.completedAchievementTiersShown))) {
			d.display("div_achievementTier"+tier,"none");
		} else {
			d.display("div_achievementTier"+tier,"inline-block");
			d.innerHTML("span_ownedTier"+tier+"Achievements",achievement.ownedInTier(tier).toFixed(0));
			let list = Object.keys(achievementList[tier]);
			for (let ach of list) {
				if (achievement.visible(ach)) {
					d.display("div_achievement"+ach,"inline-block");
					d.element("div_achievement"+ach).style["background-color"] = g.achievement[ach]?"rgba(0,255,0,0.5)":"rgba(102,102,102,0.2)";
					let bgcolor=[[1,3],[3,5],[5,7]].map(x=>achievement.tierColors[tier].primary.substring(x[0],x[1]))
					let realbgcolor=g.achievement[ach]?[bgcolor[0]/2,bgcolor[1]/2+128,bgcolor[2]/2]:bgcolor.map(x=>x*0.8+20.4)
					d.element("div_achievement"+ach).style.color = blackOrWhiteContrast("#"+realbgcolor.map(x=>Math.floor(x).toString(16).padStart(2,"0")).join(""));
					d.element("div_achievement"+ach).style["border-color"] = g.achievement[ach]?"rgba(0,255,0,0.8)":"rgba(0,0,0,0.2)";
				} else {
					d.display("div_achievement"+ach,"none");
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
		let rewardText = [ach.effect==undefined?ach.reward:(showFormulas&&ach.formulaText!==undefined)?ach.reward.replaceAll("{}",formulaFormat(ach.formulaText())):yellowLight.affected.includes(String(id))?ach.reward.replaceAll("{}",yellowLight.effectHTML(id,c.d0,achievement(id).yellowValue)):(ach.effectFormat==undefined)?ach.reward:ach.reward.replaceAll("{}",ach.effectFormat(ach.effect()))]
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
	if (g.achievement[id]) out += (((typeof achievement(id).milestones)=="undefined")?true:(achievement(id).milestones()===achievement(id).maxMilestones))?"<p style=\"color:#00cc00\">(Completed!)</p>":("<p style=\"color:#00cccc\">(Completed | reward upgradable | "+achievement(id).milestones()+" / "+achievement(id).maxMilestones+" milestones reached)</p>");
	else out += "<p style=\"color:#ffcc00\">"+ach.progress()+"</p>";
	if (ach.flavor!==undefined&&g.achievement[id]) out += "<p style=\"font-size:10px;color:#ffffff;white-space:break-spaces\">\""+ach.flavor+"\"</p>";
	d.innerHTML("achievementPanel",out);	
}
function addAchievement(x) {
	if (achievement(x).beta&&(!betaActive)) return
	if (achievement(x).check()&&(!g.achievement[x])) {
		g.achievement[x]=true;
		let tier = achievement.tierOf(x)
		let colors = achievement.tierColors[tier]
		notify("Achievement Get! \""+achievement(x).name+"\"",colors.primary);
		if (tier!=="1") if (x==achievement.initial[tier]) notify("You have unlocked "+achievement.tierName(tier)+" achievements!",colors.primary)
		if (achievement.ownedInTier(tier)==Object.keys(achievementList[tier]).length) notify("You have completed all "+achievement.tierName(tier)+" achievements!")
		if (tier==5&&achievement.ownedInTier(5)==15) updateResearchTree();
		updateAchievementsTab();
		d.display("span_noAchievements","none")
		totalAchievements = Object.values(g.achievement).map(x=>x?1:0).sum()
		if (achievement.tierOf(x)==5) {if (wormholeMilestoneList[achievement.ownedInTier(5)]!==undefined) {
			let milestone = wormholeMilestoneList[achievement.ownedInTier(5)]
			notify("You have unlocked a new Wormhole Milestone! "+(milestone.notification??milestone.text??milestone.static)+".","#000099","#ffffff")
		}}
		achievement.perAchievementReward[tier].currentVal = achievement.perAchievementReward[tier].calc(achievement.ownedInTier(tier))
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