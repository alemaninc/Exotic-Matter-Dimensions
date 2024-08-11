"use strict";
function achievement(id) {return achievementList[String(id).substring(0,String(id).length-2)][id];}
achievement.tierOf = function(id){return String(id).substring(0,String(id).length-2);}
achievement.tierName = function(id) {return "Tier "+id;}
achievement.ownedInTier = function(tier){return Object.keys(achievementList[tier]).map(x=>g.achievement[x]?1:0).sum();}
achievement.tierColors = {
	1:{dark:"#009900",light:"#00ff00"},
	2:{dark:"#804c00",light:"#ff9900"},
	3:{dark:"#330033",light:"#990099"},
	4:{dark:"#009999",light:"#00ffff"},
	5:{dark:"#000033",light:"#0000ff"},
	6:{dark:"#000000",light:"#ffffff"},
	7:{dark:"#666600",light:"#bbbb00"},
	8:{dark:"#008855",light:"#00ff99"},
	9:{dark:"#660000",light:"#cc0000"}
}
achievement.perAchievementReward = {
	1:{text:"+0.02× X axis effect per achievement in this tier (currently: +{}×)",value:()=>(achievement.ownedInTier(1)/50).toFixed(2),calc:x=>N(x/50),currentVal:c.d0},
	2:{text:"Stars in the first row are 1% stronger per achievement in this tier (currently: {}%)",value:()=>achievement.ownedInTier(2),calc:x=>N(x/100+1),currentVal:c.d1},
	3:{text:"Gain 1% more free axis from dark matter per achievement in this tier (currently: {}%)",value:()=>achievement.ownedInTier(3),calc:x=>N(x/100+1),currentVal:c.d1},
	4:{text:"Energy effects are 0.1% stronger per achievement in this tier (currently: {}%)",value:()=>(achievement.ownedInTier(4)/10).toFixed(1),calc:x=>N(x/1e3+1),currentVal:c.d1},
	5:{text:"Base knowledge gain is multiplied by achievements in this tier (currently: ×{})",value:()=>achievement.ownedInTier(5),calc:x=>N(x),currentVal:c.d0},
	6:{text:"Research in rows 8-12 is 1% cheaper per achievement in this tier, plus an extra 1% reduction for every 4 achievements (currently: {}%)",value:()=>Math.floor(achievement.ownedInTier(6)*1.25),calc:x=>Decimal.FC_NN(1,0,1-Math.floor(x*1.25)/100),currentVal:c.d1},
	7:{text:"The base of the first galaxy penalty is reduced based on achievements in this tier ({})",value:function(){return showFormulas?formulaFormat("⌈10<sup>36 ÷ (17 + A)</sup>⌉"):(achievement.ownedInTier(7)===Object.keys(achievementList[7]).length)?"currently: 10":("currently: "+this.calc(achievement.ownedInTier(7)).format()+", next: "+this.calc(achievement.ownedInTier(7)+1).format())},calc:x=>Decimal.FC_NN(1,0,Math.ceil(10**(36/(x+17)))),currentVal:c.e2},
	8:{text:"2 additional Spatial Synergism research can be purchased per achievement in this tier (currently: {})",value:()=>2*achievement.ownedInTier(8)+6,calc:x=>2*x+6,currentVal:6},
	9:{text:"The Study XIII goal is reduced based on achievements in this tier ({})",base:()=>1032,value:function(){return showFormulas?formulaFormat("min(999, "+this.base()+" - 4 × A)"):(achievement.ownedInTier(9)===Object.keys(achievementList[9]).length)?("currently: "+(this.base()-132)):("currently: "+this.calc(achievement.ownedInTier(9)).format()+", next: "+this.calc(achievement.ownedInTier(9)+1))},calc:function(x){return Decimal.FC_NN(1,0,Math.min(999,this.base()-x*4))},currentVal:c.d999}
}
achievement.initial = {1:101,2:201,3:301,4:402,5:501,6:601,7:701,8:717,9:823}
achievement.visible = function(id) {
	if (g.achievement[id]) {return true}
	if ((achievement(id).beta===true)&&(!betaActive)) {return false}
	let tier = achievement.tierOf(id)
	if (!g.achievement[achievement.initial[tier]]) {return false}
	if (achievement(id).prevReq!==undefined) {for (let i of achievement(id).prevReq) {if (!g.achievement[i]) {return false}}}
	return true
}
achievement.percent = function(value,needed,log){
	let valuefactor=(typeof log==="function")?log(value):value.layerplus(-log)
	let neededfactor=(typeof log==="function")?log(needed):needed.layerplus(-log)
	let percent = valuefactor.div(neededfactor).max(c.d0).min(c.d1)
	return [percent.isNaN()?0:(percent.toNumber()*100),value,needed]
}
achievement.label = function(id,num=1){
	let name = achievement(id).name
	if (num>1) {
		for (let i=5;i>0;i--) {name = name.replace(" "+roman(i),"")} // avoid cases like "Parity II" being the plural name
		loop: for (let i=1;i<num;i++) {if (name!==achievement(id+i-1).name.substring(0,name.length)) {name = undefined; break loop}}
	}
	return "Achievement"+((num===1)?"":"s")+" "+id+((num===1)?"":("-"+(id+num-1)))+((name===undefined)?"":(" \""+name+"\""))
}
achievement.roman = function(num){return (num===1)?"":(" "+roman(num))}
achievement.tiersUnlocked = function(){return Object.keys(achievementList).filter(x=>(Number(x)!==NaN)&&(achievement.ownedInTier(x)>0))}
achievement.nextTier = function(){
	let u = achievement.tiersUnlocked()
	let out = Object.keys(achievementList).filter(x=>!u.includes(x))
	return out.length===0?null:out[0]
}
achievement.selectForProgressBar = function(){
	if (g.achOnProgressBar==="N") {
		let available = achievement.all.filter(x=>achievement.visible(x)&&((!g.achievement[x])||((achievement(x).maxMilestones===undefined)?false:(achievement(x).milestones()<achievement(x).maxMilestones))))
		let showDisclaimer = available.map(x=>achievement(x).failed===undefined).includes(false)
		if (available.length>0) {popup({
			text:"Which achievement to show?"+(showDisclaimer?"<br><i>(achievements with ID's marked with a * asterisk become impossible to fail when shown on the progress bar.)</i>":""),
			buttons:available.map(x=>[x+((achievement(x).failed===undefined)?"":"<b>*</b>")+"<br>\""+achievement(x).name+"\"","g.achOnProgressBar='"+x+"'"]),
			buttonSize:2
		})} else {popup({
			text:"There are no achievements to show.",
			buttons:[["Close",""]]
		})}
	} else {g.achOnProgressBar = "N"}
}
achievement.wormholeProgress = function(){return achievement.percent(stat.totalDarkAxis,stat.wormholeDarkAxisReq,0)}
achievement.locking = function(x){return (g.achOnProgressBar==x)?(!achievement(x).failed()):false}
achievement.lockPopup = function() {
	if (g.achOnProgressBar==="N") {return}
	popup({
		text:"This action would cause you to fail "+achievement.label(g.achOnProgressBar)+". Remove it from the progress bar to perform this action.",
		buttons:[
			["Remove","g.achOnProgressBar='N'"],
			["Close",""]
		]
	})
}
achievement.maxForLocks = {
	axis:{
		202:{W:c.d0},
		203:{Z:c.d0},
		204:{Y:c.d0},
		205:{X:c.d0},
		217:{X:c.d1,Y:c.d3,Z:c.d3,W:c.d7},
		303:Object.fromEntries(axisCodes.slice(0,8).map(x=>[x,c.d1])),
		304:Object.fromEntries(axisCodes.slice(0,8).map(x=>[x,c.d3])),
		305:Object.fromEntries(axisCodes.slice(0,8).map(x=>[x,c.d5])),
		525:{S:c.d0,darkS:c.d0},
		526:Object.fromEntries(axisCodes.map(x=>[x,c.d0])),
		get 527(){return Object.fromEntries(axisCodes.map(x=>["dark"+x,((axisCodes.map(x => g["dark"+x+"Axis"].eq(c.d0)?0:1).sum()===3)&&g["dark"+x+"Axis"].eq(c.d0))?c.d0:c.maxvalue]))},
		707:{X:c.d0,Y:c.d0,Z:c.d0,W:c.d0,V:c.d0,U:c.d0,T:c.d0,S:c.d0,R:c.d0,Q:c.d0,P:c.d0,O:c.d0},
		813:Object.fromEntries(axisCodes.map(x=>[x,"dark"+x]).flat().map(x=>[x,c.d0])),
		get 825(){return Object.fromEntries(axisCodes.map(x=>[x,"dark"+x]).flat().map(x=>[x,achievement(825).maxAxisToNotFail(calcStatUpTo("free"+x+"Axis","Softcap"))]))}
	},
	mastery:[524,707,908],
	stardustReset:{
		get 502(){return true},
		get 503(){return true},
		get 504(){return true},
		get 505(){return true},
		get 506(){return true},
		get 707(){return true},
		get 715(){return g.TotalStardustResets===1},
	},
	specificStardustUpgrades:{
		521:{5:5},
		522:{5:3},
		523:{5:1}
	},
	totalStardustUpgrades:{
		520:15,
		707:6,
		915:6,
		932:7
	},
	stars:{
		516:0,
		528:0,
		609:0,
		707:0,
		get 711(){return Math.min(39-achievement(711).milestones(),40)},
	},
	darkstars:{
		get 512(){return N(g.stars)},
		528:c.d40,
		get 806(){return (achievement.ownedInTier(5)<7)?c.d0:c.maxvalue},
		get 813(){return (achievement.ownedInTier(5)<7)?c.d0:c.maxvalue},
		914:c.d0,
	},
	discoveries:{
		get 616(){return true},
		get 817(){return true}
	},
	discoveries:[616,817],
	research:[502,503,504,505,506,707,812,915]
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
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			reward:"+1% exotic matter",
			flavor:"A Straight Line to the touch is worth a Circle to the sight"
		},
		102:{
			name:"Square",
			description:"Buy a Y Axis",
			check:function(){return g.YAxis.gt(c.d0);},
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			prevReq:[101],
			reward:"+2% exotic matter",
			flavor:"Upward, not Northward"
		},
		103:{
			name:"Cube",
			description:"Buy a Z Axis",
			check:function(){return g.ZAxis.gt(c.d0);},
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			prevReq:[102],
			reward:"+3% exotic matter",
			flavor:"It is Knowledge; it is Three Dimensions: open your eye once again and try to look steadily."
		},
		104:{
			name:"Time Dimension",
			description:"Buy a W Axis",
			check:function(){return g.WAxis.gt(c.d0);},
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			prevReq:[103],
			reward:"+4% mastery power",
			flavor:"Time is clearly not our natural dimension. Thus it is that we are never really at home in time."
		},
		105:{
			name:"10,000 Hours",
			get description(){return "Accumulate "+BEformat(c.e11)+" mastery power";},
			check:function(){return g.masteryPower.gt(c.e11);},
			event:"gameloop",
			progress:function(){return achievement.percent(g.masteryPower,c.e11,0)},
			get reward(){return "Extremely small boost to first row Masteries based on time played (currently: {}%)";},
			flavor:"10,000 hours to master your craft.",
			effect:function(){return Decimal.convergentSoftcap(g.truetimePlayed.div(c.e5).add(c.d10).log10().log10(),c.d0_75,c.d1).pow(c.d0_5);},
			effectFormat:x=>x.format(2),
			formulaText:()=>formulaFormat.convSoftcap("log<sup>[2]</sup>(t ÷ 100,000 + 10)",c.d0_75,c.d1,g.truetimePlayed.gt(42014859476))+"<sup>0.5</sup>"
		},
		106:{
			name:"10.000 hours?",
			description:"Play for a total of 10 hours",
			check:function(){return g.truetimePlayed>36000;},
			event:"gameloop",
			progress:function(){return achievement.percent(g.truetimePlayed.div(c.d3600),c.d10,0)},
			reward:"Mastery power gain uses a slightly better formula (+0.001 formula exponent)",
			flavor:"Every 10.000 hours in Africa, 600 minutes pass"
		},
		107:{
			name:"X² axis",
			description:"Make the X Axis effect go above 4×",
			check:function(){return stat.XAxisEffect.gt(c.d4);},
			event:"gameloop",
			progress:function(){return achievement.percent(stat.XAxisEffect,c.d4,1)},
			prevReq:[101],
			reward:"1 free Y axis",
			flavor:"Space is relative"
		},
		108:{
			name:"Feedback Loop",
			description:"Make the Z Axis effect go above 4×",
			check:function(){return stat.ZAxisEffect.gt(c.d4)&&stat.axisUnlocked>2;},
			event:"gameloop",
			progress:function(){return achievement.percent(stat.ZAxisEffect,c.d4,1)},
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
			event:"gameloop",
			progress:function(){return achievement.percent(stat.WAxisEffect,c.d4,1)},
			prevReq:[104],
			get reward(){return "Add 30 seconds to the W Axis timer per W Axis"+(g.lumens[5].lt(c.d360)?"":"<sup>{}</sup>")+(Decimal.eq(g.WAxis,stat.realWAxis)?"":" (including free; currently: "+timeFormat(stat.realWAxis.pow(achievement(109).effect()).mul(c.d30))+")")},
			effect:function(y=this.yellowValue){return y.add(c.d1)},
			effectFormat:x=>x.noLeadFormat(4),
			yellowBreakpoints:[c.d360,N(3.6e5),1],
			flavor:"Why has the pleasure of slowness disappeared? Ah, where have they gone, the amblers of yesteryear?"
		},
		...(()=>{
			let out = {}
			for (let i=0;i<3;i++) {
				let req = [c.d86400,c.e6,c.e9][i]
				out[110+i] = {
					name:"Halted"+achievement.roman(i+1),
					get description(){return "Store "+["24 hours",timeFormat(c.e6)+" (1,000,000 seconds)",timeFormat(c.e9)+" ("+c.e9.format()+" seconds)"][i]+" worth of exotic matter production"+((i===0)?" (hint: is there a way to decrease production?)":"")},
					check:function(){return g.exoticmatter.div(stat.exoticmatterPerSec).gt(req)&&(timeSinceGameOpened>5)}, // weird things happen where "Halted" is awarded randomly where opening
					event:"gameloop",
					progress:function(){return achievement.percent(g.exoticmatter,stat.exoticmatterPerSec.mul(req),0)},
					prevReq:(i===0)?[]:[109+i],
					reward:"If exotic matter is less than "+["15","30","60"][i]+" seconds worth of production, it will instantly increase to that amount",
					flavor:["Be not afraid of going slowly, be afraid only of standing still.","To feel the life, don't stand still; to feel the universe, don't move!","Integrity involves the ability to stand straight when you tell your truth, and still stand straight when the other person comes to talk!"][i]
				}
			}
			return out
		})(),
		113:{
			name:"Quadratic",
			get description(){return "Have 9 purchased X Axis"},
			check:function(){return g.XAxis.gte(c.d9);},
			event:"axisBuy",
			progress:function(){return achievement.percent(g.XAxis,c.d9,0)},
			prevReq:[101],
			reward:"+0.0004× Y Axis effect per Y Axis",
			flavor:"6<sup>X<sup>2</sup></sup>"
		},
		114:{
			name:"Left Wing",
			description:"Have the first Mastery in each of the first four rows active",
			check:function(){return MasteryE(11)&&MasteryE(21)&&MasteryE(31)&&MasteryE(41);},
			prevReq:[103],
			event:"gameloop",
			progress:function(){return achievement.percent(N([11,21,31,41].map(x=>MasteryE(x)?1:0).sum()),c.d4,0);},
			get reward(){return "+{}% exotic matter (based on mastery power)";},
			flavor:"I'm not for the left wing or the right wing--I'm for the whole bird.",
			effect:function(y=this.yellowValue){
				let out = g.masteryPower.add(c.d1).log10().pow(c.d2).div(c.e3).add(c.d1)
				return (y.eq(c.d1)?out.pow(out.log10().add(c.d1)):Decimal.convergentSoftcap(out,c.d8_5,c.d10)).fix(c.d0)
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
			event:"gameloop",
			progress:function(){return "Not Completed!";},
			reward:"+1 exotic matter",
			flavor:"It's morally wrong to allow a sucker to keep his money.",
		}
	},
	2:{
		201:{
			name:"Back to Hypercube One",
			description:"Generate stardust",
			check:function(){return true;},
			event:"stardustReset",
			progress:function(){return "Not Completed!";},
			get reward(){return "Masteries in the fourth row are {}% stronger (based on total "+(g.achievement[301]?"normal ":"")+"axis)";},
			flavor:"\"Look on my matter, ye Mighty, and despair!\"<br>Nothing beside remains.",
			effect:function(y=this.yellowValue){
				let out = stat.totalNormalAxis.add(c.d1).log10()
				out = (y.eq(c.d0)?Decimal.convergentSoftcap(out,c.d4,c.d5):out.mul(out.div(c.e2).add(c.d1)))
				if (study13.bound(196)) {out = out.mul(study13.bindingEff(196))}
				return out
			},
			effectFormat:x=>x.format(2),
			formulaText:()=>{
				let out = "log(ΣA + 1)"
				out = (g.lumens[5].lt(c.d100)?formulaFormat.convSoftcap(out,c.d4,c.d5,stat.totalNormalAxis.gte(9999)):(out+" + "+out+"<sup>2</sup> ÷ 100"))
				if (study13.bound(196)) {out = "("+out+") × "+study13.bindingEff(196).noLeadFormat(3)}
				return out
			},
			yellowBreakpoints:[c.d99,c.e2,0]
		},
		...(()=>{
			let out = {}
			for (let i=0;i<4;i++) {
				let type = axisCodes[3-i]
				out[202+i] = {
					name:["Timeless","Spaceless","String Theory","0∞"][i],
					get description(){return "Reach "+c.e25.format()+" exotic matter without "+(unlocked("Dark Matter")?"normal ":"")+type+" Axis"},
					check:function(){return g.exoticmatter.gt(c.e25)&&g[type+"Axis"].eq(c.d0)},
					event:"gameloop",
					progress:function(){return g[type+"Axis"].eq(c.d0)?achievement.percent(g.exoticmatter,c.e25,1):"Failed"},
					failed:function(){return g[type+"Axis"].neq(c.d0)},
					prevReq:[[104,202,203,204][i]],
					get reward(){return "+0."+(4-i)+"% stardust per "+type+" Axis (total: "+percentOrMult(Decimal.pow(Decimal.FC_NN(1,0,1.004-i/1e3),g[type+"Axis"]),2,true)+")"},
					flavor:["Like all great art, it defies the tyrant Time.","Four axis good, two axis better","It seemed that this poor ignorant Monarch — as he called himself — was persuaded that the Straight Line which he called his Kingdom, and in which he passed his existence, constituted the whole of the world","That Point is a Being like ourselves, but confined to the non-dimensional Gulf. He is himself his own World, his own Universe; of any other than himself he can form no conception; he knows not Length, nor Breadth, nor Height, for he has had no experience of them; he has no cognizance even of the number Two; nor has he a thought of Plurality; for he is himself his One and All, being really Nothing."][i]
				}
			}
			return out
		})(),
		206:{
			name:"The Missing Link",
			description:"Make the Y Axis effect go above 0.4×",
			check:function(){return stat.YAxisEffect.gt(c.d0_4)&&stat.axisUnlocked>1;},
			event:"gameloop",
			progress:function(){return achievement.percent(stat.YAxisEffect,c.d0_4,0);},
			prevReq:[102],
			get reward(){return "{} free Y axis (based on mastery power)";},
			flavor:"It's almost impossible to prevent Y axis from breeding, but when a Y axis reproduces evolution is halted and devolution commences. Y axis truly are the missing link of society",
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
			event:"axisBuy",
			progress:function(){return "Not Completed!";},
			prevReq:[104],
			get reward(){return "All "+(unlocked("Dark Matter")?"normal axis":"axis")+" are {}% cheaper per "+(unlocked("Dark Matter")?"normal axis":"axis")+" owned (total: "+percentOrDiv(this.effect().pow(stat.totalNormalAxis),2,true)+")";},
			effect:function(y=this.yellowValue){
				let out = c.d0_99.div(N(2.2).pow(y))
				if (study13.bound(192)) {out = out.pow(study13.bindingEff(192))}
				return out
			},
			effectFormat:x=>c.d1.sub(x).mul(c.e2).noLeadFormat(2),
			yellowBreakpoints:[c.d0,c.d25,0],
			flavor:"Think outside the tesseract"
		},
		208:{
			name:"Hexeract",
			description:"Buy a U Axis",
			check:function(){return g.UAxis.gt(c.d0);},
			event:"axisBuy",
			progress:function(){return "Not Completed!";},
			prevReq:[207],
			get reward(){return "Gain {}% more stardust per "+(unlocked("Dark Matter")?"normal axis":"axis")+" owned (total: "+percentOrMult(this.effect().pow(stat.totalNormalAxis),2,true)+")";},
			effect:function(y=this.yellowValue){
				let out = (y.eq(c.d1)?c.d0_06:y.eq(c.d0)?c.em3:y.mul(c.d0_059).add(c.em3)).add(c.d1)
				if (study13.bound(192)) {out = out.pow(study13.bindingEff(192))}
				return out
			},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).noLeadFormat(2),
			yellowBreakpoints:[c.d0,c.d36,0],
			flavor:"64 vertices, 192 edges, 240 square faces"
		},
		209:{
			name:"Hepteract",
			description:"Buy a T Axis",
			check:function(){return g.TAxis.gt(c.d0);},
			event:"axisBuy",
			progress:function(){return "Not Completed!";},
			prevReq:[208],
			get reward(){return "+{}× to the effects of the first seven "+(unlocked("Dark Matter")?"normal axis":"axis")+" per "+(unlocked("Dark Matter")?"normal axis":"axis")+" owned (total: +"+this.effect().mul(stat.totalNormalAxis).noLeadFormat(3)+")";},
			effect:function(y=this.yellowValue){
				let out = (y.eq(c.d1)?c.d7em4:y.eq(c.d0)?c.em4:c.d7.pow(y).div(c.e4))
				if (study13.bound(162)) {out = out.div(study13.bindingEff(162))}
				if (study13.bound(192)) {out = out.mul(study13.bindingEff(192))}
				return out
			},
			effectFormat:x=>x.noLeadFormat(2),
			yellowBreakpoints:[c.d0,c.d49,0],
			flavor:"560 cubic cells, 280 tesseract 4-faces, 84 penteract 5-faces"
		},
		210:{
			name:"Octeract",
			description:"Buy an S Axis",
			check:function(){return g.SAxis.gt(c.d0);},
			event:"axisBuy",
			progress:function(){return "Not Completed!";},
			prevReq:[209],
			get reward(){return "For every {} of each normal axis owned, gain a free axis of the previous type"+(Decimal.div(axisCodes.map(i=>g[i+"Axis"]).reduce((x,y)=>x.max(y)),achievement(210).effect()).gte(c.d80)?" (softcaps past 80)":"")},
			effect:function(y=this.yellowValue){
				let out = y.eq(c.d1)?c.d64:y.eq(c.d0)?c.d80:c.d80.sub(y.pow(c.d2div3).mul(c.d16))
				if (study13.bound(164)) {out = out.mul(study13.bindingEff(164))}
				if (study13.bound(174)) {out = out.mul(study13.bindingEff(174))}
				if (study13.bound(192)) {out = out.div(study13.bindingEff(192).max(c.minvalue))}
				return out
			},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[c.d16,c.d80,0],
			scp:function(b184=study13.bound(184)){
				let out = c.d1
				if (b184) {out = out.mul(study13.bindingEff(184))}
				return out.add(c.d1).recip()
			},
			value:function(type){
				let out = g[type+"Axis"].div(this.effect())
				if (out.gt(c.d80)) out=out.div(c.d80).pow(this.scp()).mul(c.d80)
				return out
			},
			flavor:"80 make an exotic matter galaxy"
		},
		211:{
			name:"Cities you'll never see on screen", 
			get description(){return "Accumulate "+BEformat(c.e80)+" exotic matter";},
			check:function(){return g.exoticmatter.gt(c.e80);},
			event:"gameloop",
			progress:function(){return achievement.percent(g.exoticmatter,c.e80,1);},
			reward:"Z axis effect uses a better formula (+0.01 formula exponent)",
			flavor:"Not very pretty but we sure know how to run things"
		},
		...(()=>{
			let out = {}
			for (let i=0;i<4;i++) {
				let req = Decimal.FC_NN([1,1,1,1][i],[0,0,0,1][i],[1609.344,1199169832,1e15,25][i])
				out[i+212] = {
					name:"Four Second Mile"+achievement.roman(i+1),
					get description(){return "Reach "+req.format(6)+" exotic matter within 4 seconds of stardust-resetting"},
					check:function(){return g.exoticmatter.gt(req)&&(g.timeThisStardustReset<4)},
					event:"gameloop",
					progress:function(){return (g.timeThisStardustReset<4)?{percent:achievement.percent(g.exoticmatter,req,(i>1)?1:0),text:(4-g.timeThisStardustReset)+" seconds left"}:"Failed"},
					prevReq:(i===0)?[]:[211+i],
					reward:"The game runs 0.4% faster",
					flavor:["You think a five-minute mile is fast?","(Δt')²+v²=c²","You're made for the mile, not the 400, and the sooner you realize that, the better off you're gonna be.","In skating over thin ice our safety is in our speed."][i]
				}
			}
			return out
		})(),
		216:{
			name:"Zero Player Game",
			description:"Unlock the axis autobuyer",
			check:function(){return g.stardustUpgrades[1]>0;},
			event:"stardustUpgrade",
			progress:function(){return "Not Completed!";},
			reward:"A fading sense of accomplishment",
			flavor:"A game becomes a game when it is played; until then it is only a set of rules and game props awaiting human engagement."
		},
		217:{
			name:"Leet",
			description:"Have exactly 1 X axis, 3 Y axis, 3 Z axis and 7 W axis. Does not include free axis.",
			check:function(){return g.XAxis.eq(c.d1)&&g.YAxis.eq(c.d3)&&g.ZAxis.eq(c.d3)&&g.WAxis.eq(c.d7);},
			event:"axisBuy",
			progress:function(){return (g.XAxis.gt(c.d1)||g.YAxis.gt(c.d3)||g.ZAxis.gt(c.d3)||g.WAxis.gt(c.d7))?"Failed":achievement.percent(axisCodes.slice(0,4).map(x=>g[x+"Axis"]).sumDecimals(),c.d14,0);},
			failed:function(){return g.XAxis.gt(c.d1)||g.YAxis.gt(c.d3)||g.ZAxis.gt(c.d3)||g.WAxis.gt(c.d7)},
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
			event:"stardustUpgrade",
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
			prevReq:[211],
			event:"gameloop",
			progress:function(){return this.valence()?achievement.percent(g.exoticmatter,c.inf,1):"Failed";},
			failed:function(){
				loop: for (let i=1;i<10;i++) {
					if (maxStars(i)===4) {continue loop}
					for (let j=1;j<5;j++) {if (g.star[i*10+j]) {return true}}
				}
				return false
			},
			get reward(){return "+30.8% dark matter per unassigned star (total: "+percentOrMult(N(1.308).pow(unspentStars()),2,true)+")"},
			flavor:"I made a noble gas joke, sadly nobody reacted",
			valence:function(){return countTo(10).map(x => [1,2,3,4].map(y => g.star[10*x+y]?1:0).sum()%4).sum()===0;}
		},
		...(()=>{
			let out = {}
			for (let i=0;i<3;i++) {
				let req = [c.d1,c.d3,c.d5][i]
				out[303+i] = {
					name:"Parity"+achievement.roman(i+1),
					get description(){return "Have exactly "+(1+i*2)+" of each"+(unlocked("Hindrance")?" of the first eight":"")+" normal axis purchased"},
					check:function(){return !axisCodes.slice(0,8).map(x => g[x+"Axis"].eq(req)).includes(false);},
					event:"axisBuy",
					progress:function(){let amts = axisCodes.slice(0,8).map(x=>g[x+"Axis"]); return amts.reduce((x,y)=>x.max(y)).gt(req)?"Failed":achievement.percent(amts.sumDecimals(),req.mul(c.d8),0)},
					failed:function(){
						for (let i of axisCodes.slice(0,8)) {if (g[i+"Axis"].gt(req)) {return true}}
						return false
					},
					prevReq:[[210,303,304][i]],
					reward:"1 free dark "+"XYZ".split("").slice(0,i+1).joinWithAnd()+" axis",
					flavor:["It's odd, but even when you do nothing the numbers keep growing","Even when the odds are against you","May the odds be even in your favor"][i]
				}
			}
			return out
		})(),
		306:{
			name:"Merchant",
			description:"Make the V axis effect go above 44,444×",
			check:function(){return stat.VAxisEffect.gt(c.d44444)&&stat.axisUnlocked>4;},
			event:"gameloop",
			progress:function(){return achievement.percent(stat.VAxisEffect,c.d44444,1);},
			prevReq:[207],
			reward:"1 free V axis",
			flavor:"My vault is much more secure. In all my time as a banker, I've never lost a single Geo!"
		},
		307:{
			name:"Neutron Star",
			description:"Make the U axis effect go above 4×",
			check:function(){return stat.UAxisEffect.gt(c.d4)&&stat.axisUnlocked>5;},
			event:"gameloop",
			progress:function(){return achievement.percent(stat.UAxisEffect,c.d4,1);},
			prevReq:[208],
			reward:"1 free U axis",
			flavor:"What do creationists and neutron stars have in common?"
		},
		308:{
			name:"Multinomial Theorem",
			description:"Make the T axis effect go above 44,444×",
			check:function(){return stat.TAxisEffect.gt(c.d44444)&&stat.axisUnlocked>6;},
			event:"gameloop",
			progress:function(){return achievement.percent(stat.TAxisEffect,c.d44444,1);},
			prevReq:[209],
			reward:"1 free T axis",
			flavor:"(X+Y+Z+W+V+U+T)<sup>S</sup>"
		},
		309:{
			name:"Grandmastery",
			description:"Have 10 Masteries active simultaneously",
			check:function(){return this.active()>9;},
			event:"gameloop",
			progress:function(){return achievement.percent(N(this.active()),c.d10,0);},
			get reward(){return "Multiply exotic matter gain by mastery power<sup>{}</sup>, based on dark matter (current effect: ×"+g.masteryPower.add(c.d1).pow(this.effect()).format(2)+")";},
			flavor:"Only one who devotes himself to a cause with his whole strength and soul can be a true grandmaster. For this reason grandmastery demands all of a person.",
			effect:function(y=this.yellowValue){
				let out = g.darkmatter.add1Log(c.d10).pow(c.d0_5).div(c.e2)
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
			event:"gameloop",
			progress:function(){return achievement.percent(masteryBoost(11).mul(c.e2),c.d1500,0);},
			get reward(){return "Add 15"+(stat.tickspeed.eq(c.d1)?"":" real")+" minutes to the Mastery timer"+(g.studyCompletions[8]===0?"":" (this is now useless due to Study VIII! :D)")},
			flavor:"Mastery-Man, Mastery-Man<br>does whatever a master can"
		},
		311:{
			name:"When will it be enough?",
			get description(){return "Reach "+BEformat(c.ee3)+" exotic matter";},
			check:function(){return g.exoticmatter.gt(c.ee3);},
			prevReq:[211],
			event:"gameloop",
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
			event:"gameloop",
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
			event:"starBuy",
			progress:function(){return achievement.percent(N(g.stars),c.d24,0);},
			prevReq:[201],
			reward:"^1.05 exotic matter",
			flavor:"Without exploding stars, perhaps there could be a heaven, but there is certainly no Earth."
		},
		...(()=>{
			let out = {}
			for (let i=0;i<6;i++) {out[402+i] = {
				name:["Dark Circle","Genesis","Grave Matter","Brownian Motion","Food for Thought","Energized"][i],
				description:"Unlock the "+["first","second","third","fourth","fifth","sixth"][i]+" type of energy",
				prevReq:(i===0)?[]:[401+i],
				check:function(){return energyTypesUnlocked()>i},
				event:"stardustUpgrade",
				progress:function(){return "Not Completed!";},
				reward:"+"+(i+3)+"% all energy gain",
				flavor:["We're all going to be tested. The dark energy is going to knock on all of our doors","There was nowhere to go but everywhere, so just keep on going under the stars.","You may hate gravity, but gravity doesn't care","This is what it's like when a species prepares to depart from hyperspace","The energy of the mind is the essence of life","Everything is energy"][i]
			}}
			return out
		})(),
		408:{
			name:"Eternal Inflation",
			description:"Make the dark energy effect exceed 1 within the first 4 minutes of a Stardust reset",
			check:function(){return stat.darkEnergyEffect.gt(c.d1)&&g.timeThisStardustReset<240;},
			event:"gameloop",
			progress:function(){return g.timeThisStardustReset<240?(timeFormat(240-g.timeThisStardustReset)+" left"):"Failed";},
			get reward(){return "The effect of tickspeed on energy gain is "+(g.lumens[5].gte(this.yellowBreakpoints[0])?"raised to the power of {}":"squared");},
			flavor:"I don't mind going back to daylight saving time. With inflation, the hour will be the only thing I've saved all year.",
			effect:function(y=this.yellowValue){return y.add(c.d2)},
			effectFormat:x=>x.noLeadFormat(4),
			yellowBreakpoints:[c.d100,c.e3,1]
		},
		...(()=>{
			let out = {}
			for (let i=0;i<3;i++) {
				let req = [c.d2,c.d4,c.d8][i]
				out[409+i] = {
					name:"Time is relative"+achievement.roman(i+1),
					description:"Reach "+req.toString()+"× tickspeed",
					prevReq:(i===0)?[]:[408+i],
					check:function(){return stat.tickspeed.gte(req)},
					event:"gameloop",
					progress:function(){return achievement.percent(stat.tickspeed,req,1)},
					reward:"Extremely small tickspeed boost based on "+["exotic matter","mastery power","stardust"][i]+" (currently: {}%)",
					flavor:["All the sounds of the night seemed to pass through a hollow tunnel of indefinite length.","If I get up early the day feels longer than if I get up late, even if I spend the same amount of time awake.","A mathematician makes plans to travel backwards in time through a wormhole to a parallel universe when he can't even make it to Mars with the fastest rocket on hand today."][i],
					effect:function(y=this.yellowValue){let res = [g.exoticmatter,g.masteryPower,g.stardust][i], mult = [c.d0_8,c.d1_2,c.d1][i].mul(y.add(c.d1));return res.add(c.e10).layerplus(-3).mul(mult).fix(c.d0);},
					effectFormat:x=>x.format(2),
					formulaText:function(){return "log<sup>[3]</sup>("+["EM","MP","S"][i]+" + "+c.e10.format()+")"+formulaFormat.mult([c.d0_8,c.d1_2,c.d1][i].mul(this.yellowValue.add(c.d1)))},
					yellowBreakpoints:[[c.d30,c.d40,c.d50][i],[c.d60,c.d70,c.d80][i],0]
				}
			}
			return out
		})(),
		412:{
			name:"Full House",
			description:"Assign a star to the final row",
			check:function(){return g.star[101]||g.star[102]||g.star[103]||g.star[104];},
			progress:function(){return "Not Completed!";},
			prevReq:[401],
			get reward(){return "Multiply stardust gain by {} (based on dark stars)";},
			flavor:"More than a paradise",
			base:function(r11_5=g.research.r11_5){
				let out = c.d1_125
				if (r11_5) {out = out.mul(researchEffect(11,5).pow(totalAchievements))}
				return out
			},
			effect:function(r11_5=g.research.r11_5){
				let out = [this.base(r11_5),g.darkstars,c.d2].decimalPowerTower()
				if (!r11_5) {out = Decimal.logarithmicSoftcap(out,c.inf,c.d1).fix(c.d1)}
				return out
			},
			effectFormat:x=>x.format(2),
			formulaText:function(){
				let out = this.base().noLeadFormat(3)+"<sup>★<sup>2</sup></sup>"
				if (!g.research.r11_5) {out = formulaFormat.logSoftcap(out,c.inf,c.d1,this.effect().gt(c.inf))}
				return out
			}
		},
		413:{
			name:"OMCCDV",
			get description(){return "Reach "+BEformat(c.e44031)+" exotic matter";},
			check:function(){return g.exoticmatter.gt(c.e44031);},
			event:"gameloop",
			progress:function(){return achievement.percent(g.exoticmatter,c.e44031,1);},
			prevReq:[413],	/* this is a secret achievement of sorts */
			get reward(){return "Increase mastery power gain by 19.07% per S axis and 20.20% per dark S axis (currently: "+Decimal.mul(c.d1_1907.pow(g.SAxis),c.d1_202.pow(g.darkSAxis)).format(2)+"×)"},
			flavor:"Here's my random number so call me maybe"
		}
	},
	5:{
		501:{
			name:"Wormhole to Somewhere",
			description:"Destroy the universe",
			check:function(){return true;},
			event:"wormholeResetBefore",
			progress:function(){return "Not Completed!";},
			get reward(){return "+"+this.perSec().mul(c.e2).noLeadFormat(3)+"% to exotic matter, mastery power, stardust and dark matter gain per second spent in the current universe (current total: "+(this.effectExp().eq(c.d1)?percentOrMult(this.realEffect(),2,true):arrowJoin(percentOrMult(this.base(),2,true),percentOrMult(this.realEffect(),2,true)))+")"},
			flavor:"The urge to destroy is also a creative urge.",
			perSec:function(){
				let out = c.em4
				if (g.achievement[816]) {out = out.mul(c.d2)}
				if (study13.bound(166)) {out = out.div(study13.bindingEff(166))}
				return out
			},
			base:function(b176=study13.bound(176)){
				let out = g.truetimeThisWormholeReset.mul(this.perSec()).add(c.d1)
				if (b176) {out = Decimal.convergentSoftcap(out,c.d1,study13.bindingEff(176),1)}
				return out
			},
			effectExp:function(m101=MasteryE(101)){
				if (m101) {return masteryEffect(101)}
				if (g.achievement[615]) {return masteryEffect(101).pow(c.d0_5)}
				return c.d1
			},
			realEffect:function(b176=study13.bound(176)) {return this.base(b176).pow(this.effectExp())}
		},
		502:{
			name:"Iron Will",
			get description(){return "Reach "+BEformat(c.e50)+" exotic matter without stardust-resetting or having research in the current universe";},
			check:function(){return g.exoticmatter.gt(c.e50)&&stat.ironWill;},
			event:"gameloop",
			progress:function(){return stat.ironWill?achievement.percent(g.exoticmatter,c.e50,1):"Failed";},
			failed:function(){return !stat.ironWill},
			get reward(){return "Normal axis cost scaling is "+N(studies[12].reward(1)*100+5).noLeadFormat(2)+"% weaker"},
			flavor:"What does not kill you makes you stronger"
		},
		503:{
			name:"Iron Will II",
			get description(){return "Reach "+BEformat(c.e130)+" exotic matter without stardust-resetting or having research in the current universe";},
			check:function(){return g.exoticmatter.gt(c.e130)&&stat.ironWill;},
			event:"gameloop",
			progress:function(){return stat.ironWill?achievement.percent(g.exoticmatter,c.e130,1):"Failed";},
			failed:function(){return !stat.ironWill},
			prevReq:[502],
			get reward(){return "Dark axis cost scaling is "+N(studies[12].reward(1)*100+5).noLeadFormat(2)+"% weaker"},
			flavor:"You're only given a little spark of madness. You mustn't lose it"
		},
		504:{
			name:"Iron Will III",
			description:"Unlock Dark Matter without stardust-resetting or having research in the current universe",
			check:function(){return g.stardustUpgrades[4]>0&&stat.ironWill;},
			event:"gameloop",
			progress:function(){return stat.ironWill?"Still possible":"Failed";},
			failed:function(){return !stat.ironWill},
			prevReq:[503],
			get reward(){return "Gain "+N(studies[12].reward(1)*100+5).noLeadFormat(2)+"% more Discoveries from all sources"},
			flavor:"This is fine"
		},
		505:{
			name:"Iron Will IV",
			description:"Buy a dark X Axis without stardust-resetting or having research in the current universe",
			check:function(){return g.darkXAxis.gt(c.d0)&&stat.ironWill;},
			event:"axisBuy",
			progress:function(){return stat.ironWill?(g.achievement[505]?achievement.percent(stat.totalDarkAxis,this.effectBreakpoints[Math.min(this.milestones(),39)],0):"Still possible"):"Failed";},
			failed:function(){return !stat.ironWill},
			prevReq:[504],
			effect:function(){return N(1.01+this.milestones()/1e3+studies[12].reward(1)).fix(c.d0);},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).noLeadFormat(2),
			formulaText:()=>N(1+studies[12].reward(1)*100).noLeadFormat(2)+" + μ ÷ 10",
			effectBreakpoints:[c.d2,c.d3,c.d4,c.d5,c.d6,c.d7,c.d8,c.d9,c.d10,c.d12,c.d15,c.d20,c.d25,c.d30,c.d40,c.d50,c.d60,c.d70,c.d80,c.d90,c.e2,c.d120,c.d140,c.d160,c.d180,c.d200,c.d225,c.d250,c.d275,c.d300,c.d325,c.d350,c.d400,c.d450,c.d500,c.d550,c.d600,c.d700,c.d800,c.d900],
			milestones:function(){for(let i=39;i>=0;i--){if(g.ach505Progress.gte(this.effectBreakpoints[i])){return i+1}};return 0},
			maxMilestones:40,
			get reward(){return "Normal S axis are {}% stronger"+((this.milestones()===40)?"":(" (increases at milestones of total dark axis reached in Iron Will mode. Next milestone at "+this.effectBreakpoints[this.milestones()]+" total dark axis)"));},
			flavor:"As a young man just starting out…<br>… I was very poor.<br>But, I never gave up. And today, after many years of hard work and perseverance…<br>… I am old.",
		},
		506:{
			name:"Iron Will V",
			description:"Destroy the universe without stardust-resetting or having research in the current universe",
			check:function(){return stat.ironWill;},
			event:"wormholeResetBefore",
			progress:function(){return stat.ironWill?achievement.wormholeProgress():"Failed";},
			failed:function(){return !stat.ironWill},
			prevReq:[505],
			reward:"Hawking radiation gain ^1.1",
			flavor:"A child ardent for some desperate glory"
		},
		...(()=>{
			let out = {}
			for (let i=0;i<4;i++) {
				let req = 18000/10**i,effect,formulaText
				function flavorFormat(txt,n) {return txt.split(" ").map(x=>x.split("").join("&nbsp;".repeat(n))).join(" ".repeat(n*2+1))}
				if (i===3) {
					effect = function(){
						let d = g.totalDiscoveries
						if (!g.achievement[805]) return d.div(c.e3).add(c.d1).min(c.d1_25)
						let s = achievement(805).effect()
						return (d.div(c.d10).gt(s))?[s,Decimal.div(d.log10().sub(c.d1),s.log10()),c.d0_01].decimalPowerTower().div(c.e2).add(c.d1):d.div(c.e3).add(c.d1)
					}
					formulaText = function(){let b = g.totalDiscoveries.div(c.d10),s = achievement(805).effect();return g.achievement[805]?(b.gte(s)?(s.noLeadFormat(3)+"<sup>log<sub>"+s.noLeadFormat(3)+"</sub>(D ÷ 10)<sup>0.01</sup></sup>"):"D ÷ 10"):"min(D ÷ 10, 25)"}					
				} else {
					effect = function(){return Decimal.FC_NN(1,0,req).div(g.fastestWormholeReset.max(c.d18)).log10().max(c.d0).simplex(2).mul(c.d10).div(4-i).fix(c.d0)}
					formulaText = ()=>"(max(log("+BEformat(req)+" ÷ max(t, 18)), 0)<sup>2</sup> - 0.25)"+formulaFormat.mult(Decimal.FC_NN(1,0,5/(i+2)))
				}
				out[507+i] = {
					name:"Hyperspeed"+achievement.roman(i+1),
					get description(){return "Destroy the universe within "+timeFormat(req)+" of starting it"},
					check:function(){return g.timeThisWormholeReset<req},
					prevReq:(i===0)?[]:[506+i],
					event:"wormholeResetBefore",
					progress:function(){return (g.timeThisWormholeReset<req)?{percent:achievement.wormholeProgress(),text:timeFormat(req-g.timeThisWormholeReset)+" left"}:"Failed"},
					reward:((i===3)?"The game runs {}% faster (based on total Discoveries)":("Stardust Boost "+(3*i+1)+" is {}% stronger (based on fastest Wormhole reset, cap at 18 seconds)")),
					flavor:flavorFormat(["Nothing travels faster than the speed of light","with the possible exception","of bad news","which follows its own special laws"][i],[1,2,3,5][i]),
					effect:effect,
					effectFormat:x=>((i===3)?x.sub(c.d1).mul(c.e2):x).noLeadFormat(3),
					formulaText:formulaText
				}
			}
			return out
		})(),
		511:{
			name:"Enneract",
			get description(){return "Reach "+BEformat(c.d9_999e99)+" stardust first, then raise that to the power of 9 with a single reset";},
			check:function(){return stat.pendingstardust.gt(g.stardust.pow(c.d9))&&g.stardust.gt(c.d9_999e99);},
			event:"stardustReset",
			progress:function(){return g.stardust.gt(c.d9_999e99)?achievement.percent(stat.pendingstardust,g.stardust.pow(c.d9),1):("Reach "+BEformat(c.d9_999e99)+" stardust first");},
			reward:"Normal U axis is 0.9% stronger",
			flavor:"Slabdrill?",
		},
		512:{
			name:"Shine Bright Tonight",
			description:"Destroy the universe, never having more dark stars than normal stars (including allocated)",
			check:function(){return g.shiningBrightTonight;},
			event:"wormholeResetBefore",
			progress:function(){return g.shiningBrightTonight?{percent:achievement.wormholeProgress(),text:g.darkstars.format()+" / "+g.stars+" dark stars"}:"Failed";},
			failed:function(){return !g.shiningBrightTonight},
			get reward(){return "Dark stars are 0.25% cheaper per normal star (total: "+percentOrDiv(N(0.9975**g.stars))+")"},
			flavor:"Like diamonds in the sky"
		},
		...(()=>{
			let out = {}
			for (let i=0;i<3;i++) {
				let req = [c.d20,c.d35,c.d50][i]
				out[513+i] = {
					name:"Duplicated"+achievement.roman(i+1),
					description:"Bulk buy "+req.toString()+" dark stars at once",
					prevReq:(i===0)?[]:[512+i],
					check:function(){return true}, /* gets checked locally by the dark star gaining function */
					progress:function(){return achievement.percent(stat.maxAffordableDarkStars.sub(g.darkstars),req,0)},
					get reward(){return "2× dark matter per dark star (total: "+c.d2.pow(g.darkstars).format()+"×)"},
					flavor:["The greatest shortcoming of the human race is our inability to understand the exponential function.","Anyone who believes exponential growth can go on forever in a finite world is either a madman or an economist.",(()=>{let out = "10";for (let i=0;i<99;i++){out = "10<sup>"+out+"</sup>"};return out})()][i]
				}
			}
			return out
		})(),
		516:{
			name:"Black Hole Era",
			description:"Destroy a universe that has no stars",
			check:function(){return g.stars===0;},
			event:"wormholeResetBefore",
			progress:function(){return (g.stars===0)?achievement.wormholeProgress():"Failed";},
			failed:function(){return g.stars!==0},
			reward:"Stars in the 5th and 10th rows additionally make the respective Masteries 1% stronger",
			flavor:"Eyes as black and as shiny as chips of obsidian stared back into his. They were eyes like black holes, letting nothing out, not even information."
		},
		517:{
			name:"Cheap Fill",
			get description(){return "Make all normal axis costs go below "+BEformat(c.eme6);},
			check:function(){return this.lowest().lt(c.eme6);},
			prevReq:[312],
			event:"gameloop",
			progress:function(){return achievement.percent(this.lowest(),c.eme6,1);},
			reward:"All normal axis costs ^0.95",
			flavor:"Baby, I don't need matter bills to have fun tonight",
			lowest:function(){return axisCodes.slice(0,8).map(x => axisCost(x)).reduce((x,y) => x.max(y));}
		},
		518:{
			name:"Irradiated",
			description:"Gain 696,342 Hawking radiation from a single Wormhole reset",
			check:function(){return stat.pendinghr.gte(696342);},
			event:"wormholeResetBefore",
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
			check:function(){return (g.stars>=40)&&g.ach519possible;},
			prevReq:[412],
			event:"starBuy",
			progress:function(){return g.ach519possible?achievement.percent(N(g.stars),c.d40,0):"Failed";},
			failed:function(){return !g.ach519possible},
			get reward(){return "Stars are {}× cheaper per Stardust Upgrade owned, and vice versa (total: "+this.effect().pow(g.stardustUpgrades.sum()).noLeadFormat(2)+"× stars, "+this.effect().pow(g.stars).noLeadFormat(2)+"× Stardust Upgrades)"},
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.inf:y.eq(c.d0)?c.d2:[c.d2,c.d1024,y].decimalPowerTower()},
			effectFormat:x=>x.noLeadFormat(2),
			yellowBreakpoints:[c.d10,c.e10,2],
			flavor:"You do know how these work, right?"
		},
		520:{
			name:"Rationing",
			description:"Destroy the universe with no more than 15 stardust upgrades (note that the axis autobuyer upgrade and Mastery unlocks always persist on reset)",
			check:function(){return effectiveStardustUpgrades()<=15;},
			event:"wormholeResetBefore",
			progress:function(){let o=effectiveStardustUpgrades();return (o>15)?"Failed":{percent:achievement.wormholeProgress(),text:((15-o)+" upgrade"+(o===14?"":"s")+" left")}},
			failed:function(){return effectiveStardustUpgrades()>15;},
			get reward(){return (g.lumens[5].lt(this.yellowBreakpoints[0])?"Square":"{}th")+" root the cost of the first level of each Stardust Upgrade"},
			effect:function(y=this.yellowValue){return y.mul(c.d8).add(c.d2)},
			effectFormat:x=>x.noLeadFormat(2),
			yellowBreakpoints:[c.d200,c.e3,0],
			flavor:"The worst advertisement for Socialism is its adherents.",
		},
		...(()=>{
			let out = {}
			for (let i=0;i<3;i++) {
				let max = 4-2*i
				out[521+i] = {
					name:"Bejouled"+achievement.roman(1+i),
					description:"Destroy the universe without unlocking "+energyTypes[max]+" energy",
					prevReq:(i===0)?[]:[520+i],
					check:function(){return energyTypesUnlocked()<=max},
					event:"wormholeResetBefore",
					progress:function(){return (energyTypesUnlocked()<=max)?achievement.wormholeProgress():"Failed"},
					failed:function(){return energyTypesUnlocked()>max},
					reward:"50% "+energyTypes[max]+" and "+energyTypes[max+1]+" energy gain",
					flavor:["5 hours of energy but you can eat it in 3 seconds","25-hour energy: for those who need an extra hour in the day","You still have six joules regardless."][i]
				}
			}
			return out
		})(),
		524:{
			name:"Mastery is not a trivial monster",
			description:"Destroy the universe without having active Masteries at any point",
			check:function(){return g.ach524possible;},
			event:"wormholeResetBefore",
			progress:function(){return g.ach524possible?achievement.wormholeProgress():"Failed";},
			failed:function(){return !g.ach524possible;},
			reward:"Unlock a new row of Masteries",
			flavor:"Now with 270% more accidents involving falling objects",
			active:function(){return !g.activeMasteries.slice(1).map(x=>x===0).includes(false);}
		},
		525:{
			name:"You didn't need it anyway",
			description:"Destroy the universe without buying normal or dark S axis at any point",
			check:function(){return g.ach525possible;},
			event:"wormholeResetBefore",
			progress:function(){return g.ach525possible?achievement.wormholeProgress():"Failed";},
			failed:function(){return !g.ach525possible},
			get reward(){return "+"+this.effect().noLeadFormat(3)+" normal and dark S axis effect"},
			effect:function(){
				let out = (g.achievement[526]?achievement(526).effect():c.d1).div(c.e4)
				if (betaActive) {out = out.mul(studies[12].reward(3).add(c.d1))}
				return out
			},
			flavor:"Minimalism at its finest"
		},
		526:{
			name:"Big Crunch",
			description:"Buy a dark X axis without buying normal axis in the current Wormhole reset",
			check:function(){return g.ach526possible&&g.darkXAxis.gt(c.d0)&&unlocked("Hawking Radiation");},
			event:"axisBuy",
			progress:function(){return g.ach526possible?{percent:achievement.percent(g.darkmatter,darkAxisCost("X"),0),text:"Not Completed!"}:"Failed";},
			failed:function(){return !g.ach526possible},
			prevReq:[525],
			get reward(){return "The "+achievement.label(525)+" reward is {}% stronger (based on total normal axis)";},
			flavor:"",		// intentionally left blank
			effect:function(){
				let out = Decimal.convergentSoftcap(stat.totalNormalAxis.add(c.d1).log10(),c.d4,c.d9)
				if (!betaActive) {out = out.mul(studies[12].reward(3).add(c.d1))}
				out = out.add(c.d1)
				return out
			},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).noLeadFormat(3),
			formulaText:function(){
				let mult = studies[12].reward(3).add(c.d1)
				return formulaFormat.convSoftcap("log(ΣA + 1)"+formulaFormat.mult(mult),c.d4.mul(mult),c.d9.mul(mult),stat.totalNormalAxis.gte(9999))+" × 100"
			}
		},
		527:{
			name:"The 4th dimension doesn't exist",
			description:"Reach 160 total dark axis without more than 3 different types of dark axis or resetting dark axis in the current Wormhole",
			check:function(){return stat.totalDarkAxis.gte(160)&&this.active()&&(achievement.ownedInTier(5)>=7||g.darkstars.eq(c.d0));},
			event:"axisBuy",
			progress:function(){return ((g.darkstars.eq(c.d0)||achievement.ownedInTier(5)>=7)&&this.active())?achievement.percent(stat.totalDarkAxis,c.d160,0):"Failed";},
			failed:function(){return !this.active()},
			get reward(){return "Dark Star Scaling starts {} dark stars later"+((Decimal.gte(g.lumens[5],this.yellowBreakpoints[0])&&(g.studyCompletions[12]===0))?" <span style=\"color:#666600\">(requires Study XII completion to be boosted)</span>":"")},
			flavor:"Einstein would agree",
			effect:function(y=this.yellowValue){return studies[12].reward(2).mul(y).add(c.d4)},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[c.d12.pow(c.d4),c.d12.pow(c.d7),1],
			active:function(){return axisCodes.map(x => g["dark"+x+"Axis"].eq(c.d0)?0:1).sum()<=3;}
		},
		528:{
			name:"Grand Balance",
			description:"Have exactly 40 stars and 40 dark stars",
			check:function(){return (g.stars===40)&&g.darkstars.eq(c.d40);},
			prevReq:[412],
			event:"starBuy",
			progress:function(){return (g.stars<=40&&g.darkstars.lte(c.d40))?achievement.percent(Decimal.add(g.stars,g.darkstars),c.d80,0):"Failed";},
			failed:function(){return (g.stars>40)|g.darkstars.gt(c.d40)},
			get reward(){return "For every {} normal axis, gain 1 of the corresponding dark axis for free"+(axisCodes.map(i=>g[i+"Axis"]).reduce((x,y)=>x.max(y)).mul(this.effect()).gte(c.e2)?" (softcaps past 100)":"")},
			flavor:"Does not include neutron stars, protostars, white dwarf stars, blue hypergiant stars nor starfish",
			effect:function(y=this.yellowValue){
				let out = y.mul(c.d2).pow10().mul(c.d8em3)
				if (study13.bound(168)) {out = out.div(study13.bindingEff(168))}
				if (study13.bound(178)) {out = out.div(study13.bindingEff(178))}
				return out
			},
			effectFormat:x=>x.recip().noLeadFormat(3),
			yellowBreakpoints:[c.e4,c.e8,1],
			scp:function(b188=study13.bound(188)){
				let out = c.d2
				if (b188) {out = out.mul(study13.bindingEff(188))}
				return out
			},
			value:function(type){return Decimal.linearSoftcap(g[type+"Axis"].mul(achievement(528).effect()),c.d100,this.scp(),1)}
		},
		529:{
			name:"Millionaire",
			get description(){return "Reach "+BEformat(c.ee6)+" exotic matter";},
			check:function(){return g.exoticmatter.gt(c.ee6);},
			prevReq:[311],
			event:"gameloop",
			progress:function(){return achievement.percent(g.exoticmatter,c.ee6,1);},
			get reward(){return "The base value of the base mastery power exponent is multiplied by {} (based on Hawking radiation)<br><span class=\"small\">(TL:DR - more mastery power)</span>";},
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
			event:"researchBuy",
			progress:function(){return "Not Completed!"},
			reward:"Gain more Hawking radiation based on exotic matter and stardust (currently: {})",
			flavor:"Oh, how hard it is to be the only one who knows the truth!",
			effect:function(){return [g.exoticmatter.add(c.d1).pow(c.em8).mul(c.d10).layerplus(-2),g.stardust.add(c.d1).pow(c.em5).mul(c.d10).layerplus(-2)].productDecimals().pow10()},
			effectFormat:x=>percentOrMult(x,2,true),
			formulaText:function(){
				let out = "10<sup>log<sup>[2]</sup>((EM + 1)<sup>"+c.em8.format()+"</sup> × 10) × log<sup>[2]</sup>((S + 1)<sup>"+c.em5.format()+"</sup> × 10)</sup>"
				return this.effect().gte(c.d10)?(out+"×"):("("+out+" - 1) × 100%")
			}
		},
		602:{
			name:"District 13",
			description:"Unlock 12 Stardust Boosts",
			check:function(){return g.stardustUpgrades[2]>9},
			event:"stardustUpgrade",
			progress:function(){return achievement.percent(N(g.stardustUpgrades[2]+2),c.d12,0)},
			reward:"The cost of the third Stardust Upgrade is raised to the power of 0.9",
			flavor:"Ladies and gentlemen... welcome to the 76th Hunger Games!",
		},
		603:{
			name:"16,777,216 Color Theorem",
			description:"Get 1 of each primary lumen",
			check:function(){return !g.lumens.slice(0,3).map(x=>x.eq(c.d0)).includes(true)},
			event:"lumenGain",
			progress:function(){return achievement.percent(g.lumens.slice(0,3).map(x=>x.min(c.d1)).sumDecimals(),c.d3,0)},
			reward:"{} chroma gain (based on total lumens)",
			flavor:"The soul becomes dyed with the color of its thoughts.",
			yellowMult:function(y=this.yellowValue){return y.lt(2/47)?y.mul(2.35):y.mul(0.94).add(0.06)},
			effect:function(y=this.yellowValue){return Decimal.add(g.lumens.sumDecimals().div(c.d100),[g.lumens.productDecimals().pow(c.d0_1),this.yellowMult(y)].productDecimals().pow10())},
			effectFormat:x=>percentOrMult(x,2,true),
			yellowBreakpoints:[c.e6,c.e100,1],
			formulaText:function(){return (g.lumens.sumDecimals().gte(c.d900))?("ΣL ÷ 100 + "+(this.yellowValue.eq(c.d0)?"1":("10<sup>(ΠL)<sup>0.1</sup>"+formulaFormat.mult(this.yellowMult())))+"×"):"+ΣL<span style=\"font-style:normal;\">%</span>"}
		},
		604:{
			name:"Graduation",
			description:"Complete any Study four times",
			check:function(){return g.studyCompletions.includes(4)},
			event:"wormholeResetAfter",
			progress:function(){return achievement.percent(N(g.studyCompletions.slice(1).reduce((x,y)=>Math.max(x,y))),c.d4,0)},
			get reward(){return "Every Study completion gives 1% of the relevant Study's base cost as free Discoveries (current total: "+this.effValue().noLeadFormat(2)+")"},
			flavor:"He would automatically begin to assume that specialists in all other fields were magicians, judging the depth of their wisdom by the breadth of his own ignorance...",
			studyValue:function(x){
				if (x===10) {return studies[10].researchList.slice(0,g.studyCompletions[10]).map(x=>research[x].basecost).sumDecimals().mul(c.d0_01)}
				return research[studies[x].research].basecost.mul(0.01*g.studyCompletions[x])
			},
			effValue:function(){return countTo(13).map(x=>this.studyValue(x)).sumDecimals()}
		},
		605:{
			name:"Time of Gifts",
			description:"Reach 256× tickspeed",
			check:function(){return stat.tickspeed.gte(c.d256)},
			prevReq:[411],
			event:"gameloop",
			progress:function(){return achievement.percent(stat.tickspeed,c.d256,1)},
			reward:"Research 8-2 is 10% stronger",
			flavor:"To give somebody your time is the biggest gift you can give."
		},
		606:{
			name:"Ball Lightning",
			req:c.d10.quad_tetr(c.pi),
			get description(){return "Reach "+this.req.format()+((g.notation==="Tetration")?"":" (10 ⇈ π)")+" dark energy"},
			check:function(){return g.darkEnergy.gt(this.req)},
			prevReq:[402],
			event:"gameloop",
			progress:function(){return achievement.percent(g.darkEnergy,this.req,1)},
			reward:"{} all energy gain (based on dark energy)",
			flavor:"Programming graphics in X is like finding the square root of π using Roman numerals",
			effect:function(y=this.yellowValue){return g.darkEnergy.mul(c.ee10).layerplus(-3).pow(c.pi.sub(c.d2).mul(y).add(c.d2))},
			effectFormat:x=>percentOrMult(x,2,true),
			yellowBreakpoints:[N(1e6),N(1570796),1],
			formulaText:function(){return "log<sup>[3]</sup>(DE × "+c.ee10.format()+")<sup>"+c.pi.sub(c.d2).mul(this.yellowValue).add(c.d2).noLeadFormat(4)+"</sup>×"}
		},
		607:{
			name:"There are Four Lights",
			description:"Have at least 1 of four colors of lumen",
			check:function(){return this.lumens()>3},
			prevReq:[603],
			event:"lumenGain",
			progress:function(){return achievement.percent(N(this.lumens()),c.d4,0)},
			get reward(){return "Each star below 60 divides chroma gain by {} rather than 3"},
			flavor:"There are six lights. How many do you see now?",
			effect:function(y=this.yellowValue){return y.eq(c.d1)?c.d1_25:y.eq(c.d0)?N(2.75):c.d2_5.sub(y)},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[N(999),c.e4,1],
			lumens:function(){return g.lumens.map(x=>x.sign).sum()},
		},
		608:{
			name:"Zero Player Game II",
			description:"Complete the fourth level of Study I without any clicks in the current Wormhole",
			check:function(){return (g.activeStudy===1)&(g.studyCompletions[1]>2)&&(!g.clickedInStudy1)},
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[1]<3)?"Complete Study I 3 times first":(g.activeStudy!==1)?"Enter Study I first":g.clickedInStudy1?"Failed":achievement.wormholeProgress()},
			reward:"The third reward of Study I is 11.1% stronger",
			flavor:"The only time a lazy man ever succeeds is when he tries to do nothing."
		},
		609:{
			name:"Black Hole Era II",
			description:"Complete the fourth level of Study II without any stars",
			check:function(){return (g.activeStudy===2)&(g.studyCompletions[2]>2)&&(g.stars===0)},
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[2]<3)?"Complete Study II 3 times first":(g.activeStudy!==2)?"Enter Study II first":(g.stars===0)?achievement.wormholeProgress():"Failed"},
			failed:function(){return (g.studyCompletions[2]<3)||(g.activeStudy!==2)||(g.stars>0)},
			reward:"The third reward of Study II is 11.1% stronger",
			flavor:"Let's not strive to be black holes in the meantime. Let's illuminate the world instead of darkening it, instead of tearing it to pieces. Let's prove we are worthy of being stardust."
		},
		610:{
			name:"Triple Nine Society",
			description:"Reach 999 Discoveries",
			check:function(){return g.totalDiscoveries.gte(999)},
			event:"gameloop",
			progress:function(){return achievement.percent(g.totalDiscoveries,c.d999,0)},
			reward:"+{}% Hawking radiation (based on percentage of unspent Discoveries)",
			flavor:"999 Emergencies, what is your emergency?\"<br>\"MY FITBIT SAYS I'M ABOUT TO DIE!",
			effect:function(){return unspentDiscoveries().div(g.totalDiscoveries.gte(c.d999)?g.totalDiscoveries:g.totalDiscoveries.mul(c.d999).pow(c.d0_5).max(c.d1)).add(c.d1)},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).format(2),
			formulaText:()=>"100 × υD ÷ ΣD"
		},
		611:{
			name:"Pieces of Eight",
			description:"Unlock 8 colors of Light",
			check:function(){return g.research.r11_8},
			event:"researchBuy",
			progress:function(){return "Not Completed!"},
			prevReq:[607],
			get reward(){return "+0.25% chroma gain per purchased dark star (total: "+percentOrMult(N(1.0025).pow(g.darkstars),2,true)+")"},
			flavor:"Stars, hide your fires, let not light see my black and deep desires"
		},
		612:{
			name:"Star-Spangled Banner",
			description:"Buy the 60th star",
			check:function(){return g.stars===60},
			event:"starBuy",
			progress:function(){return achievement.percent(N(g.stars),c.d60,0)},
			get reward(){return "Stardust Upgrade costs ^{} per star owned, and vice versa (total: ^"+N(this.effect()**g.stars).noLeadFormat(3)+" stars, ^"+N(this.effect()**g.stardustUpgrades.sum()).noLeadFormat(3)+" Stardust Upgrades)"},
			effect:function(y=this.yellowValue){return 0.999-0.009*y.toNumber()},
			effectFormat:x=>N(x).noLeadFormat(5),
			yellowBreakpoints:[N(480),N(750),0],
			flavor:"<span class=\"_jacorb\">(hardcapped)</span>"
		},
		613:{
			name:"Antimatter Academia",
			description:"Have research 9-7, 9-8 and 9-9 active simultaneously",
			prevReq:[610],
			check:function(){return this.active()===3},
			event:"researchBuy",
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
			description:"Have each of the last 10 Wormhole resets be less than or equal to 1 second long",
			check:function(){return (g.previousWormholeRuns.last10.length===10)&&(!g.previousWormholeRuns.last10.map(x=>x.time<=1).includes(false))},
			prevReq:[510],
			event:"wormholeResetAfter",
			progress:function(){return (g.previousWormholeRuns.last10.length===10)?{percent:achievement.percent(N(this.time()),c.d1,x=>x.recip()),text:"Slowest run is "+timeFormat(this.time())}:("Do 10 Wormhole resets first (currently: "+g.previousWormholeRuns.last10.length+")")},
			time:function(){return g.previousWormholeRuns.last10.map(x=>x.time).reduce((x,y)=>Math.max(x,y))},
			get reward(){return "+1% tickspeed per number of digits in the time in seconds spent in the current Wormhole (currently: "+this.effect().format()+"%, next increase in "+timeFormat(this.effect().pow10().sub(g.truetimeThisWormholeReset))+")"},
			effect:function(){return g.truetimeThisWormholeReset.gte(c.d10)?g.truetimeThisWormholeReset.log10().floor().add(c.d1):c.d1},
			flavor:"I'd tell a joke about redstone delay but then I'd just be repeating myself"
		},
		615:{
			name:"Twosday",
			req:N("2.22e2222"),
			get description(){return "Accumulate "+this.req.format()+" mastery power"},
			check:function(){return g.masteryPower.gte(this.req)},
			event:"gameloop",
			progress:function(){return achievement.percent(g.masteryPower,this.req,1)},
			get reward(){return "Mastery 101 works with square-rooted effect even when inactive (currently: ^"+masteryEffect(101).pow(c.d0_5).format(3)+")"},
			get flavor(){return "But Twosday was like "+Math.round((Date.now()-1645488000000)/86400000).toLocaleString("en-US")+" days ago!"}
		},
		616:{
			name:"Pseudoscience",
			description:"Have 30 researches with no spent Discoveries",
			prevReq:[610,611],
			check:function(){return (totalResearch.overall()>=30)&&g.spentDiscoveries.eq(c.d0)},
			event:"researchBuy",
			progress:function(){return g.spentDiscoveries.eq(c.d0)?achievement.percent(N(totalResearch.overall()),c.d30,0):"Failed"},
			failed:function(){return g.spentDiscoveries.neq(c.d0)},
			reward:"Research 7-5 is 0.33% stronger per research owned",
			flavor:"These mysteries about <i>how</i> we evolved should not distract us from the indisputable fact that we <i>did</i> evolve."
		}
	},
	7:{
		701:{
			name:"Arquillian Galaxy",
			description:"Create a galaxy",
			check:function(){return true},  // checked locally
			event:"galaxyGain",
			progress:function(){return "Not Completed!"},
			get reward(){return "The first 40 stars cost less (-^0.01 per star below 40, currently: ^"+this.realEffect().noLeadFormat(4)+")"},
			realEffect:function(){return Decimal.FC_NN(1,0,1-0.01*Math.max(0,40-g.stars))},
			flavor:"Did you know you can play <i>Exotic Matter Dimensions</i> on <a href=\"https://galaxy.click/play/129\" target=\"_blank\">galaxy.click</a>? Try it!"
		},
		702:{
			name:"Double Galaxy",
			description:"Create 2 galaxies",
			check:function(){return g.galaxies>=2},
			event:"galaxyGain",
			progress:function(){return achievement.percent(N(g.galaxies),c.d2,0)},
			get reward(){return "The star cost is divided by {} per star, per star (based on time in the current Wormhole) (current total: "+this.effect().pow(g.stars**2).format(2)+")"},
			flavor:"Did you know you can also play <i>Exotic Matter Dimensions</i> on <a href=\"https://alemaninc.github.io/Exotic-Matter-Dimensions/\" target=\"_blank\">alemaninc.github.io</a>? Try that too!",
			effect:function(){return g.truetimeThisWormholeReset.div(c.e7).add(c.d1).pow(c.e2)},
			effectFormat:x=>x.formatFrom1(3),
			formulaText:()=>"(1 + t ÷ "+c.e7.format()+")<sup>100</sup>"
		},
		703:{
			name:"You got past the Big Wall",
			description:"Create 3 galaxies",
			prevReq:[702],
			check:function(){return g.galaxies>=3},
			event:"galaxyGain",
			progress:function(){return achievement.percent(N(g.galaxies),c.d3,0)},
			reward:"Star Scaling starts at {} instead of 25 (based on Hawking radiation)",
			flavor:"Did you know you can also play <i>Exotic Matter Dimensions</i> on <a href=\"file:///C:/Users/\" target=\"_blank\">C:/Users/ale</a>-- okay, maybe not that one...",
			effect:function(){return g.hawkingradiation.add(c.e10).log10().log10().add(c.d24)},
			effectFormat:x=>x.noLeadFormat(4),
			formulaText:()=>"log<sup>[2]</sup>(HR + "+c.e10.format()+") + 24"
		},
		704:{
			name:"Five-finger discount",
			get description(){return "Have "+BEformat(5555)+" total dark axis"},
			check:function(){return stat.totalDarkAxis.gte(5555)},
			event:"axisBuy",
			progress:function(){return achievement.percent(stat.totalDarkAxis,N(5555),0)},
			reward:"+0.5555× dark Y axis effect",
			flavor:"You've got to pick a pocket or two!"
		},
		705:{
			name:"Nameless here for evermore",
			description:"Make the dark energy effect go below 0.003",
			check:function(){return stat.darkEnergyEffect.lt(c.d3em3)},
			event:"gameloop",
			progress:function(){return achievement.percent(stat.darkEnergyEffect,c.d3em3,1)},
			reward:"The third reward of Study III is 11.1% stronger",
			flavor:"Give me two years and your dinner will be free"
		},
		706:{
			name:"Cortex Baker",
			description:"Reach the knowledge effect softcap",
			check:function(){return Decimal.div(stat.knowledgeEffect,stat.knowledgeEffectCap).gte(c.d0_75)},
			prevReq:[610],
			event:"gameloop",
			progress:function(){return achievement.percent(stat.knowledgeEffect,stat.knowledgeEffectCap.mul(c.d0_75),0)},
			reward:"Each dark W axis (including free) gives a {}× multiplier to dark matter gain (based on knowledge)",
			flavor:"Knowledge is like the sea. Go too deep, and the crushing weight of it could kill you.",
			scp:function(b204=study13.bound(204)){
				let out = c.d0_1
				if (b204) {out = out.mul(study13.bindingEff(204))}
				return out
			},
			effect:function(b204=study13.bound(204)){return Decimal.logarithmicSoftcap(g.knowledge.add(c.d1).log10().pow(c.d2div3),c.e3,this.scp(b204),1).sub(c.inflog).pow10().add(c.d1)},
			effectFormat:x=>x.noLeadFormat(2),
			formulaText:function(){return "10<sup>"+formulaFormat.logSoftcap("log(K + 1)<sup>2 ÷ 3</sup>",c.e3,this.scp(),g.knowledge.gt("ee4.5"))+" - 308.254</sup> + 1"}
		},
		707:{
			name:"Master of the Void",
			get description(){return "Reach "+c.e30.format()+" mastery power without buying normal axis, having active Masteries, doing stardust resets, buying stars or stardust upgrades or having temporary research"},
			check:function(){return g.masteryPower.gte(c.e30)&&stat.totalNormalAxis.eq(c.d0)&&g.ach524possible&&(g.TotalStardustResets===0)&&(g.stars===0)&&(effectiveStardustUpgrades()===6)&&(totalResearch.temporary===0)},
			event:"gameloop",
			progress:function(){return (totalResearch.temporary>0)?"Failed due to having research":(g.stars>0)?"Failed due to having stars":(effectiveStardustUpgrades()>6)?"Failed due to buying stardust upgrades":(g.TotalStardustResets>0)?"Failed due to stardust resetting":(!g.ach524possible)?"Failed due to having active Masteries":(stat.totalNormalAxis.neq(c.d0))?"Failed due to having axis":achievement.percent(g.masteryPower,c.e30,1)},
			failed:function(){return stat.totalNormalAxis.neq(c.d0)||(!g.ach524possible)||(g.TotalStardustResets!==0)||(g.stars!==0)||(effectiveStardustUpgrades()!==6)||(totalResearch.temporary!==0)},
			reward:"+{} to the base mastery power gain exponent (based on time since last Mastery unassignment)",
			flavor:"This is not Iron Will VI",
			effect:function(y=this.yellowValue){return stat.masteryTimer.log10().add1PowSub1(y.add(c.d1))},
			effectFormat:x=>x.format(3),
			yellowBreakpoints:[N(7e5),N(777777),0],
			formulaText:function(){return this.yellowValue.eq(c.d0)?"log(t + 1)":("(log(t + 1) + 1)<sup>"+this.yellowValue.add(c.d1).noLeadFormat(4)+"</sup> - 1")},
		},
		...(()=>{
			let out = {}
			for (let i=0;i<3;i++) {
				let req = N(["7.77e777","3.33e833","8.88e888"][i])
				out[708+i] = {
					name:"Mind-bending Curvature"+achievement.roman(i+1),
					get description(){return "Make the effect of the "+achievement.label(501)+" reward exceed "+req.format()+"×"},
					check:function(){return achievement(501).realEffect().gte(req)},
					prevReq:(i===0)?[]:[707+i],
					event:"gameloop",
					progress:function(){return {percent:achievement.percent(achievement(501).realEffect(),req,1),text:"Estimated real time to get: "+timeFormat(req.root(achievement(501).effectExp()).sub(c.d1).div(achievement(501).perSec()).sub(g.truetimeThisWormholeReset).div(stat.tickspeed))}},
					get reward(){return ["Masteries 101 and 103 can be activated simultaneously","The "+achievement.label(501)+" reward divides dark axis costs","Mastery 103 is 9× stronger"][i]},
					flavor:["God is a philosophical black hole - the point where reason breaks down.","God not only plays dice, but sometimes throws them where they cannot be seen.","Auschwitz will forever remain the black hole of the entire human history"][i]
				}
			}
			return out
		})(),
		711:{
			name:"Moonlight Capital",
			description:"Generate 1 chroma per second with 40 stars or less",
			check:function(){return g.ach711Progress<41},
			event:"gameloop",
			progress:function(){return (g.ach711Progress===61)?("1 chroma per second has "+(unlocked("Matrix")?"not been reached in the current Matrix":"never been reached")):(g.stars<=(39-this.milestones()))?{percent:achievement.percent(stat.chromaPerSec,c.d1,0),text:g.stars+" / "+(39-this.milestones())+" stars"}:"Failed"},
			failed:function(){return g.stars>(g.achievement[711]?(39-this.milestones()):40)},
			get reward(){return "Unlock Mastery 105, and Mastery 105 works with {}% efficiency"+((g.ach711Progress===0)?"":(" (based on least number of stars that 1 chroma per second was generated with. Next milestone at "+Math.min(g.ach711Progress-1,39)+")"))},
			flavor:"I only know two pieces; one is 'Clair de lune' and the other isn't",
			milestones:function(){return 40-g.ach711Progress},
			maxMilestones:40,
			effect:function(){return (g.ach711Progress===0)?c.d1:(g.ach711Progress>40)?c.d0:Decimal.FC_NN(1,0,0.91-g.ach711Progress/50)},
			effectFormat:x=>x.mul(c.e2).max(c.d11).format(),
			formulaText:()=>"max(100 × ⌊μ ÷ 40⌋, 11 + μ × 2)"
		},
		712:{
			name:"Rewind",
			description:"Buy a research which stems from a research below it",
			check:function(){return g.research.r15_2||g.research.r15_14},
			event:"researchBuy",
			progress:function(){return "Not Completed!"},
			reward:"Each Photonic research reduces the cost of all other Photonic research by {} Discoveries",
			effect:function(y=this.yellowValue){return y.mul(c.d1404).add(c.d36)},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[c.d3600,N(144000),0],
			flavor:"If you miss the beginning, the basics, then you are destined to go back and visit the basics."
		},
		713:{
			name:"V's Achievements",
			description:"Have all Chromatic research active simultaneously",
			check:function(){return this.active()===6},
			prevReq:[613],
			event:"researchBuy",
			progress:function(){return achievement.percent(N(this.active()),c.d6,0)},
			active:function(){return [7,8,9].map(x=>g.research["r10_"+x]?2:g.research["r9_"+x]?1:0).sum()},
			get reward(){return "Reduce the cost multiplier per Chromatic research to {}×"+(g.lumens[5].gte(c.d500)?"":" (must have 500 yellow lumens for this to take effect)")},
			effect:function(y=this.yellowValue){return c.d4.pow(c.d1.sub(y))},
			effectFormat:x=>x.noLeadFormat(3),
			yellowBreakpoints:[N(500),N(50000),1],
			flavor:"Injustice in the Antimatter Academia: Beginners are only allowed to choose one field of study while the elite can pick all three. \"Its just not fair, man. How come they can do it?\" Questions frustrated student."
		},
		714:{
			name:"Old age",
			description:"Play for 122 years",
			check:function(){return g.truetimePlayed.gt(31556926*122)},
			prevReq:[106],
			event:"gameloop",
			progress:function(){return {percent:achievement.percent(g.truetimePlayed.div(31556926),c.d122,0),text:"Real time left to reach: "+timeFormat(N(31556926*122).sub(g.truetimePlayed).div(stat.tickspeed))}},
			get reward(){return "{} extra Discoveries (based on time played)"+(this.effect().gt(g.knowledge.add1Log(c.d10).div(c.d10))?" (softcapped past "+g.knowledge.add1Log(c.d10).pow(c.d0_9).format()+", based on knowledge)":"")},
			effect:function(){
				let out = g.truetimePlayed.div(31556926)
				return Decimal.logarithmicSoftcap(out,g.knowledge.add1Log(c.d10).pow(c.d0_9),c.d1)
			},
			effectFormat:x=>x.format(3),
			formulaText:function(){return formulaFormat.logSoftcap("t ÷ 31,556,926",g.knowledge.add1Log(c.d10).div(c.d0_9),c.d1,this.effect().gt(g.knowledge.add1Log(c.d10).div(c.d0_9)))},
			flavor:"As soon as you feel too old to do a thing, do it."
		},
		715:{
			name:"Metastable",
			description:"Complete the fourth level of Study IV with just one Stardust reset",
			check:function(){return (g.activeStudy===4)&(g.studyCompletions[4]>2)&&(g.TotalStardustResets<2)},
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[4]<3)?"Complete Study IV 3 times first":(g.activeStudy!==4)?"Enter Study IV first":g.TotalStardustResets>1?"Failed":achievement.wormholeProgress()},
			failed:function(){return (g.studyCompletions[4]<3)||(g.activeStudy!==4)||(g.TotalStardustResets>1)},
			reward:"The third reward of Study IV is 11.1% stronger",
			flavor:"Nature abhors a vacuum, and if I can only walk with sufficient carelessness I am sure to be filled.",
		},
		716:{
			name:"Infinity Upgrade",
			get description(){return "Buy a stardust upgrade for less than "+c.inf.recip().format()+" stardust"},
			check:function(){return true}, // checked locally
			progress:function(){let min = countTo(5).map(x=>stat["stardustUpgrade"+x+"Cost"]).reduce((x,y)=>x.min(y));return min.lt(c.inf.recip())?"Currently achievable!":achievement.percent(min,c.inf.recip(),1)},
			reward:"The 9-achievement Wormhole Milestone effect is raised to the power of {} (based on time in the current Wormhole)",
			timeMult:function(){
				let out = c.em4
				if (g.wormholeUpgrades[4]) {out = out.mul(c.e2)}
				return out
			},
			effect:function(){return g.truetimeThisWormholeReset.mul(this.timeMult()).add(c.d10).log10().log10().div(c.d10).add(c.d1)},
			effectFormat:x=>x.format(4),
			formulaText:function(){return "log<sup>[2]</sup>(t"+formulaFormat.mult(this.timeMult())+" + 10) ÷ 10 + 1"},
			flavor:"I am incapable of conceiving infinity, and yet I do not accept finity.",
		},
		717:{
			name:"Ant God's Discovery",
			description:"Buy a Spatial Synergism research",
			prevReq:[712],
			event:"researchBuy",
			check:function(){return g.research.r17_1||g.research.r17_15},
			progress:function(){return "Not Completed!"},
			get reward(){return "The normal and dark axis cost scaling is {}% weaker (based on highest-ever exotic matter)"},
			power:function(){
				let out = c.d1
				if (study13.bound(206)) {out = out.mul(study13.bindingEff(206))}
				return out
			},
			effect:function(){return Decimal.convergentSoftcap(g.exoticmatterThisSpacetimeReset.add(c.d1).log10().div(c.e8).add(c.d1).log2().mul(this.power()),c.d25,c.d50)},
			effectFormat:x=>x.toFixed(3),
			formulaText:function(){return formulaFormat.convSoftcap("log<sub>2</sub>(log(EM) ÷ "+c.e8.format()+" + 1)"+formulaFormat.mult(this.power()),c.d25,c.d50,this.effect().gt(c.d25))},
			flavor:"This is my song and no one can take it away<br>It's been so long, but now you're here, here to stay<br>And I wonder if you know what it means to find your dreams come true",
		},
		718:{
			name:"Softcap-colored Lights",
			description:"Have 26 black and white lumens each",
			prevReq:[611],
			check:function(){return g.lumens[6].gt(c.d25)&&g.lumens[7].gt(c.d25)},
			event:"lumenGain",
			progress:function(){return achievement.percent(Decimal.add(g.lumens[6].min(c.d26),g.lumens[7].min(c.d26)),c.d52,0)},
			get reward(){return "Research 13-8 is 2.6% stronger, and all colors of chroma are generated simultaneously with (1 ÷ "+c.e15.format()+") efficiency if chroma generation is enabled."},
			flavor:"Game under construction: all mechanics must wear hardcaps.",
		},
		719:{
			name:"OMCCDV II",
			req:Decimal.FC_NN(1,0,44059),
			description:"Reach 44,059 total axis",
			prevReq:[719],
			check:function(){return stat.totalAxis.gte(this.req)},
			event:"axisBuy",
			progress:function(){return achievement.percent(stat.totalAxis,this.req,0)},
			get reward(){return "Each observation increases knowledge gain by (2,020 + 816 × [number of galaxies])%, compounding with itself (currently: "+this.effect().format()+"×)"},
			flavor:"\"This is a house, Do you want to live here?\" - Stat Mark, 2020",
			effect:function(){return N(8.16).mul(g.galaxies).add(21.2).pow(g.observations.sumDecimals())}
		}
	},
	8:{
		801:{
			name:"The Explorer",
			description:"Reveal all Spatial Synergism research",
			check:function(){return this.revealed()===56},
			event:"researchBuy",
			progress:function(){function q(x){return "<span style=\"color:#330066\">"+"?".repeat(x)+"</span>"};return this.revealed()+" / "+q(2)+" ("+q(2)+"."+q(3)+"%)"},
			reward:"Hawking radiation gain is multiplied based on the number of Tier 8 achievements (currently: ×{})",
			effect:function(){return Decimal.FC_NN(1,0,10**((1+achievement.ownedInTier(8)*0.08)**2-1))},
			effectFormat:x=>x.noLeadFormat(2),
			formulaText:()=>"10<sup>(1 + A × 0.08)<sup>2</sup> - 1</sup>",
			flavor:"Adventure is just bad planning.",
			revealed:function(){let v = visibleResearch();return researchGroupList.spatialsynergism.contents.map(x=>v.includes(x)?1:0).sum()},
		},
		802:{
			name:"Blacken the Sun",
			get description(){return "Reach "+c.d2_1e67.format()+" Hawking radiation"},
			check:function(){return g.hawkingradiation.gte(c.d2_1e67)},
			prevReq:[518],
			event:"wormholeResetAfter",
			progress:function(){return achievement.percent(g.hawkingradiation,c.d2_1e67,1)},
			get reward(){return "Additive +1% dark X axis effect per black hole observation (currently: "+percentOrMult(g.observations[3].div(c.e2).add(c.d1),2,true)+")"},
			flavor:"Every revolution evaporates and leaves behind only the slime of a new bureaucracy.",
		},
		803:{
			name:"Base 3",
			description:"Have at least 3 times more of each normal axis than the following normal axis, with at least 1 S axis.",
			check:function(){
				if (g.SAxis.eq(c.d0)) return false
				for (let i=0;i<7;i++) if (Decimal.lt(g[axisCodes[i]+"Axis"],g[axisCodes[i+1]+"Axis"].mul(c.d3))) return false
				return true
			},
			event:"axisBuy",
			progress:function(){
				if (stat.realSAxis.eq(c.d0)) return "Need an S axis"
				let text = "Wormhole now to get this achievement!", minratio = c.d3
				for (let i=0;i<=axisCodes.length-2;i++) {
					if (g[axisCodes[i+1]+"Axis"].gt(c.d0)) {minratio = minratio.min(Decimal.div(g[axisCodes[i]+"Axis"],g[axisCodes[i+1]+"Axis"]))}
					if (Decimal.lt(g[axisCodes[i]+"Axis"],g[axisCodes[i+1]+"Axis"].mul(c.d3))) {text = g[axisCodes[i]+"Axis"].noLeadFormat(3)+" / "+g[axisCodes[i+1]+"Axis"].mul(c.d3).noLeadFormat(3)+" "+axisCodes[i]+" axis"}
				}
				return {percent:minratio.toNumber()/0.03,text:text}
			},
			reward:"The softcap of the 3rd dark star effect is 3% weaker",
			flavor:"\"Reaching Base 3 Needs a massive 1.00E100<br>Which takes 2 hours to do<br>Base 3 is the final base. You have to reach<br>ω^ω^ω Which takes 1 day to do.\"<br>- Stat Mark",
		},
		804:{
			name:"Danzig Russia",
			req:N("e771277123"),
			get description(){return "Reach "+((g.notation==="BE Default")?"1e771277123":["Engineering","Mixed scientific","Scientific"].includes(g.notation)?"1.00e771,277,123":(g.notation==="Logarithm")?"e771,277,123":this.req.format())+" exotic matter"},
			check:function(){return g.exoticmatter.gt(this.req)},
			prevReq:[529],
			event:"gameloop",
			progress:function(){return achievement.percent(g.exoticmatter,this.req,1)},
			get reward(){return "+12.3% Y axis effect per 7 dark stars (total: "+percentOrMult(N(1.123).pow(stat.realDarkStars.div(c.d7).floor()),2,true)+")"},
			flavor:"Read the stars and see my scars",
		},
		805:{
			name:"The Energetic Hour",
			req:N("ee60"),
			get description(){return "Reach "+this.req.format()+" meta energy"},
			check:function(){return g.metaEnergy.gt(this.req)},
			event:"gameloop",
			progress:function(){return achievement.percent(g.metaEnergy,this.req,1)},
			get reward(){return "The "+achievement.label(510)+" reward hardcap is now a softcap and starts at {}% instead of 25 (based on meta energy)"},
			effect:function(){return g.metaEnergy.log10().pow(c.d0_1).add(c.e6).pow(0.0162).mul(c.d20)},
			effectFormat:x=>x.noLeadFormat(3),
			formulaText:function(){return "(log(ME)<sup>0.1</sup> + "+c.e6.format()+")<sup>0.0162</sup> × 20"},
			flavor:"DID YOU. JUST FLIP. MY SWITCH?",
		},
		806:{
			name:"Cheap Fill II",
			get description(){return "Make all dark axis costs go below "+BEformat(c.eme5)+((achievement.ownedInTier(5)<7)?" without resetting dark matter in the current Wormhole":"");},
			check:function(){return this.lowest().lt(c.eme5)&&((achievement.ownedInTier(5)>6)||g.darkstars.eq(c.d0));},
			prevReq:[517],
			event:"gameloop",
			progress:function(){return ((achievement.ownedInTier(5)<7)&&g.darkstars.gt(c.d0))?"Failed":achievement.percent(this.lowest(),c.eme5,1);},
			failed:function(){return (achievement.ownedInTier(5)<7)&&g.darkstars.gt(c.d0)},
			reward:"All dark axis costs ^0.95",
			flavor:"Let's go below zero and hide from the sun",
			lowest:function(){return axisCodes.slice(0,8).map(x => darkAxisCost(x)).reduce((x,y) => x.max(y));},
		},
		807:{
			name:"Get Lucky",
			description:"Buy a Luck Upgrade",
			prevReq:[807],
			check:function(){return Object.values(g.luckUpgrades).map(x=>Object.values(x)).flat().map(x=>x.sign).includes(1)}, // checked locally
			event:"buyLuckUpgrade",
			progress:function(){return "Not Completed!"},
			reward:"Luck shard gain is multiplied by {} (based on total runes)",
			effect:function(){return Object.values(g.totalLuckRunes).map(x=>x.div(c.e2).add(c.d10).log10()).productDecimals().pow10().sub(c.d9)},
			effectFormat:x=>x.noLeadFormat(2),
			formulaText:()=>runeTypeUnlocked("quatrefolium")?("10<sup>Π<span class=\"xscript\"><sup>"+luckRuneTypes.map(x=>runeTypeUnlocked(x)?1:0).sum()+"</sup><sub>1</sub></span>log(R"+(runeTypeUnlocked("quatrefolium")?"<sub>n</sub>":"")+" ÷ 100 + 10)</sup> - 9"):"1 + R ÷ 100",
			flavor:"Oh, I appear to have run out of random access <span style=\"color:#9575cd\">memories</span>...",
		},
		808:{
			name:"Octarine-colored Magic",
			description:"Buy a Prismatic Upgrade",
			prevReq:[808],
			event:"prismaticUpgradeBuy",
			check:function(){return Object.values(g.prismaticUpgrades).map(x=>x.sign).includes(1)},
			progress:function(){return "Not Completed!"},
			reward:"Dark W axis is {}% stronger (based on permanent research owned)",
			effect:function(){let r=totalResearch.permanent;return Math.exp(-r/100)+r/100},
			effectFormat:x=>N((x-1)*100).noLeadFormat(2),
			formulaText:()=>"100 × (1 - e<sup>R ÷ 100</sup>) + R",
			flavor:"Shoot and I'll move.",
		},
		809:{
			name:"False Deity Destroyer",
			description:"Buy an anti-axis",
			prevReq:[809],
			check:function(){for (let i of axisCodes) {if (g["anti"+i+"Axis"].neq(c.d0)) {return true}};return false},
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			reward:"Increase the start and limit of the free axis softcap by 5 percentage points",
			flavor:"One day, alemaninc wasn't nice to Stat Mark. So Stat Mark prayed to the Heavenly Pelle, and she blessed Stat Mark with the power to create an antimatter-storm wherever he pleases. And Stat Mark gave the antimatter-storm to alemaninc and destroyed his house. And alemaninc was never seen again.",
		},
		810:{
			name:"Night of Nights",
			description:"Unlock the Study of Studies",
			prevReq:[810],
			check:function(){return g.research.r26_5},
			event:"researchBuy",
			progress:function(){return "Not Completed!"},
			get reward(){return "Research 3-6 and 3-10 are {}% stronger (based on red lumens)"},
			flavor:"Come back two hours earlier.",
			effect:function(){return g.lumens[0].div(c.e3).add(c.d1).log10().pow(c.d2).add(c.d1)},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).noLeadFormat(3),
			formulaText:()=>"log(L ÷ 1,000 + 1)<sup>2</sup> × 100",
		},
		811:{
			name:"Wall of a Vigintillion Photons",
			description:"Create 7 galaxies",
			prevReq:[703],
			check:function(){return g.galaxies>=7},
			event:"galaxyGain",
			progress:function(){return achievement.percent(N(g.galaxies),c.d7,0)},
			get reward(){return "The star cost is raised to the power of 0.97 for every galaxy below your highest count"+(unlocked("Matrix")?" this Matrix":"")+" (currently: ^"+c.d0_97.pow(g.highestGalaxiesSpacetime-g.galaxies).noLeadFormat(3)+")"},
			flavor:"The red pill of Aarexian balancing and the blue pill of upgrade clickers",
		},
		812:{
			name:"Stone Age",
			description:"Complete the fourth level of Study V without any temporary research (this does not cover Study research)",
			check:function(){return (g.activeStudy===5)&&(g.studyCompletions[5]>2)&&(totalResearch.temporary===0)},
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[5]<3)?"Complete Study V 3 times first":(g.activeStudy!==5)?"Enter Study V first":totalResearch.temporary===0?achievement.wormholeProgress():"Failed"},
			failed:function(){return (g.studyCompletions[5]<3)||(g.activeStudy!==5)||(totalResearch.temporary!==0)},
			reward:"The third reward of Study V is 11.1% stronger",
			flavor:"We have progressed from the stone age and moved on to the age of stone hearted people.",
		},
		813:{
			name:"Hidden Stars in Zero Dimensions",
			req:N(208),
			get description(){return "Have "+this.req.format()+" total stars, (effective) dark stars and galaxies without any normal or dark axis in the current Wormhole"+(achievement.ownedInTier(5)>6?"":" and without resetting dark matter in the current Wormhole")},
			check:function(){return g.ach526possible&&(stat.totalDarkAxis.sign===0)&&((achievement.ownedInTier(5)>6)||g.darkstars.eq(c.d0))&&stat.realDarkStars.add(g.stars+g.galaxies).gte(this.req)},
			event:"gameloop",
			progress:function(){return ((achievement.ownedInTier(5)<7)&&g.darkstars.gt(c.d0))?"Failed due to resetting dark stars":(!g.ach526possible)?"Failed due to having normal axis in the current Wormhole":(stat.totalDarkAxis.sign===1)?"Failed due to having dark axis in the current Wormhole":achievement.percent(stat.realDarkStars.add(g.stars+g.galaxies),N(this.req),0)},
			failed:function(){return ((achievement.ownedInTier(5)<7)&&g.darkstars.gt(c.d0))||(!g.ach526possible)||(stat.totalDarkAxis.sign!==0)},
			reward:"Dark Star Scaling is 5% weaker",
			flavor:"I don't need sleep, I don't need answers. I need to determine where, in this swamp of unbalanced formulas, squatteth the toad of truth.",
		},
		814:{
			name:"Touching the Void",
			description:"Complete the fourth level of Study VI in 6 seconds or less",
			check:function(){return (g.activeStudy===6)&&(g.studyCompletions[6]>2)&&(g.timeThisWormholeReset<6)},
			prevReq:[510],
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[6]<3)?"Complete Study VI 3 times first":(g.activeStudy!==6)?"Enter Study VI first":(g.timeThisWormholeReset<6)?{percent:achievement.wormholeProgress(),text:(timeFormat(6-g.timeThisWormholeReset)+" left")}:"Failed"},
			reward:"The third reward of Study VI is 11.1% stronger",
			flavor:"Life is wide, limitless. There is no border, no frontier.",
		},
		815:{
			name:"Gensokyo Millennium",
			get description(){return "Generate "+c.ee3.format()+" chroma per second"},
			check:function(){return stat.chromaPerSec.gt(c.ee3)},
			event:"gameloop",
			progress:function(){return achievement.percent(stat.chromaPerSec,c.ee3,1)},
			flavor:"From eternity's point of view, you are but a mere instant.",
			get reward(){return "Unlock an option to generate all types of chroma at once without them costing anything. However, chroma generation is reduced based on the chroma cost multiplier when this is active. (currently: ×{})"+(((study13.rewardLevels.hyperdrive!==0)||unlocked("Matrix"))?"<br><br><i>(This is a pure multiplier, meaning it is unaffected by exponents, dilations or layer functions)</i>":"")},
			effect:function(){return c.d1.sub(stat.chromaCostMultiplier).max(c.d0)},
			effectFormat:x=>x.noLeadFormat(3),
			formulaText:()=>"max(1 - m, 0)",
		},
		816:{
			name:"Cosmic Mind",
			get description(){return "Have a Mastery 101 effect of ^"+c.inflog.format(5)},
			check:function(){return achievement(501).effectExp().gt(c.inflog)},
			event:"gameloop",
			progress:function(){return achievement.percent(achievement(501).effectExp(),c.inflog,0)},
			get reward(){return "The "+achievement.label(501)+" reward increases 2× faster"},
			flavor:"A pulse in the eternal mind, no less",
		},
		817:{
			name:"The Knowing Existence",
			description:"Have all Theoretical research without spending any Discoveries",
			check:function(){return (ownedResearchInGroup("study5a").length===4)&&g.spentDiscoveries.eq(c.d0)},
			event:"researchBuy",
			progress:function(){return g.spentDiscoveries.eq(c.d0)?achievement.percent(N(ownedResearchInGroup("study5a").length),c.d4,0):"Failed"},
			failed:function(){return g.spentDiscoveries.neq(c.d0)},
			reward:"Unlock an autobuyer for research costing 0 Discoveries",
			flavor:"I am convinced that the art of thinking logically cannot possibly be natural to the human mind.",
		},
		818:{
			name:"The Eighth Wonder of the World",
			description:"Buy an anti-S axis",
			prevReq:[809],
			check:function(){return g.antiSAxis.neq(c.d0)},
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			reward:"Each anti-U axis gives a free anti-X axis",
			flavor:"is the wonder of the world we live in",
		},
		819:{
			name:"Power of a Unicorn",
			description:"Have research 24-8",
			prevReq:[808],
			check:function(){return g.research.r24_8},
			event:"researchBuy",
			progress:function(){return "Not Completed!"},
			get reward(){return "Reduce the penalty of Luck and Antimatter research by {}"+(this.effect().lt(c.d0_1)?"×":"%")+" (based on prismatic), and Quatrefolium "+luckUpgrades.quatrefolium.prismatic.name+" is 2× stronger"},
			effect:function(y=this.yellowValue){return g.prismatic.add(c.d1).log10().div(c.e3).add(c.d1).pow(y.pow10().neg())},
			effectFormat:function(x){return this.effect().lt(c.d0_1)?x.recip().formatFrom1(4):c.d1.sub(x).mul(c.e2).noLeadFormat(3)},
			formulaText:function(){let out = "(log(P + 1) ÷ 1,000 + 1)"+formulaFormat.exp(this.yellowValue.pow10().neg(),false,4);if (this.effect().gte(c.d0_1)) {out = "(1 - "+out+") × 100"};return out},
			yellowBreakpoints:[c.d5e4,N(5e9),1],
			flavor:"I won't look back, I won't look down, I'm going up, you better turn around",
		},
		820:{
			name:"Eternity in an Hour",
			description:"Reach 1 year of game time in the current Wormhole with less than 1 hour of real time",
			check:function(){return g.truetimeThisWormholeReset.gte(c.d31556926)&&(g.timeThisWormholeReset<3600)},
			prevReq:[605,809],
			event:"gameloop",
			progress:function(){return (g.timeThisWormholeReset<3600)?{percent:achievement.percent(g.truetimeThisWormholeReset.div(c.d31556926),c.d1,0),text:timeFormat(3600-g.timeThisWormholeReset)+" left; average "+c.d31556926.sub(g.truetimeThisWormholeReset).div(3600-g.timeThisWormholeReset).format(2)+"× tickspeed needed in the remainder of the hour"}:"Failed"},
			get reward(){return "Multiply the research 24-12 effect softcap start by the number of seconds in the current Wormhole (currently: ×"+g.truetimeThisWormholeReset.max(c.d1).format(2)+")"},
			flavor:"Hold Infinity in the palm of your hand and Reality in a game",
		},
		...(()=>{
			let out = []
			let names = ["Entrusting the Star Signs to Altman","Master of Astrophysics","The Nameless Ones' Prison","Triad of Triads"]
			let triads = ["Stellar","Decisive","Temporal","Ontological"]
			let rewards = ["Stardust reset autobuyer is 1% less useless","Stars move 2% faster","Be freed from alemaninc's special development hell","All timewalls past this point are 4% shorter than before"]
			let flavors = ["The only function of economic forecasting is to make astrology look respectable.","The sky truly is the limit; deciding which star to ride on first is the hard part.","Freedom from torture... is torture itself.","\"My name is Ozymandias, king of kings:\" and the rest is history."]
			for (let i=0;i<4;i++) out.push([821+i,{
				name:names[i],
				description:"Complete the "+triads[i]+" Triad of the Study of Studies",
				prevReq:[(i===0)?810:(820+i)],
				check:function(){return g.studyCompletions[10]>i},
				event:"wormholeResetAfter",
				progress:function(){return ((g.activeStudy===10)&&(studyPower(10)===i))?achievement.wormholeProgress():("Enter Study of Studies ("+triads[i]+") first")},
				reward:rewards[i],
				flavor:flavors[i]
			}])
			return Object.fromEntries(out)
		})(),
		825:{
			name:"Freedom is Slavery",
			description:"Reach 1,600 total purchased axis (of all types) without the free level of any normal or dark axis going below twice the purchased level",
			check:function(){return stat.totalAxis.gte(1600)&&g.ach825possible},
			update:function(){if (g.ach825possible) {for (let i of axisCodes) {
				if (Decimal.lt(stat["free"+i+"Axis"],g[i+"Axis"].mul(c.d2))) {g.ach825possible = false}
				if (Decimal.lt(stat["freedark"+i+"Axis"],g["dark"+i+"Axis"].mul(c.d2))) {g.ach825possible = false}
			}}},
			maxAxisToNotFail:function(f){
				let s = stat.freeAxisSoftcapStart;
				if (s.gt(c.d2)) {return f.div(c.d2).floor()}
				let l = stat.freeAxisSoftcapLimit;
				return Decimal.div(l.sub(c.d2).mul(f),Decimal.add(l.mul(c.d2),s.sub(c.d4).mul(s))).floor();
			},
			prevReq:[809],
			event:"axisBuy",
			progress:function(){return g.ach825possible?achievement.percent(stat.totalAxis,N(1600),0):"Failed"},
			failed:function(){return !g.ach825possible},
			reward:"Row 3 Masteries are 3× stronger and gain 10% "+prismaticUpgradeName("prismCondenser")+" power (this causes it to affect more anti-axis)",
			flavor:"If you want to keep a secret, you must also hide it from yourself."
		}
	},
	9:{
		901:{
			name:"Base 11",
			req:Decimal.FC_NN(1,1,12345678900),
			get description(){return "Have an exotic matter count with at least 12,345,678,901 digits"+(["BE Default","Engineering","Logarithm","Mixed scientific","Scientific"].includes(g.notation)?"":(" (need "+this.req.format()+" exotic matter)"))},
			check:function(){return g.exoticmatter.gt(this.req)},
			event:"gameloop",
			prevReq:[804],
			progress:function(){return achievement.percent(numberOfDigits(g.exoticmatter),N(12345678901),0)},
			reward:"The cyan light softcap weakens over time based on exotic matter, resetting on Wormhole (currently: exponent "+arrowJoin("0.5","{}")+")",
			effect:function(){return Decimal.sub(c.d1,N(5e9).div(g.ach901Int.add(c.e100).log10().pow(c.d5)))},
			effectFormat:x=>x.format(3),
			formulaText:()=>"1 - "+N(5e9).format()+" ÷ log("+c.e100.format()+" + ∫<span class=\"xscript\"><sup>t</sup><sub>0</sub></span>log(EM + 1)<sup>10</sup>dt)<sup>5</sup>",
			flavor:"Reach g<sub>ψ(Ω)</sub> (11) to see when you can boost!"
		},
		902:{
			name:"四 Shattered Mirrors",
			maxStardust:28,
			luckReq:137777777,
			get description(){return "Complete the fourth level of Study VII with over "+this.luckReq.toLocaleString("en-US")+" luck essence and no more than "+this.maxStardust+" Stardust resets"},
			check:function(){return (g.activeStudy===7)&&(g.studyCompletions[7]>2)&&(g.luckEssence>=this.luckReq)&&(g.TotalStardustResets<=this.maxStardust)},
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[7]<3)?"Complete Study VII 3 times first":(g.activeStudy!==7)?"Enter Study VII first":(g.TotalStardustResets<=this.maxStardust)?{percent:achievement.percent(N(g.luckEssence),N(this.luckReq),0),text:(this.maxStardust-g.TotalStardustResets)+" resets left"}:"Failed"},
			reward:"The third reward of Study VII is 11.1% stronger",
			flavor:"I busted a mirror and got seven years of bad luck, but my lawyer thinks he can get me five."
		},
		903:{
			name:"The Long-Awaited Reskin",
			get description(){return "Have each of the last 10 (valid) Wormhole resets give at least "+c.inf.format()+"× more Hawking radiation than the last"},
			check:function(){return this.current()===9},
			prevReq:[802],
			event:"wormholeResetAfter",
			progress:function(){return (g.previousWormholeRuns.last10.length===0)?"Do a Wormhole first":{percent:[(this.current()+Decimal.div(stat.pendinghr,N(g.previousWormholeRuns.last10[0].gain)).add(c.d1).log(c.inf).min(c.d1).toNumber())/0.09,stat.pendinghr,N(g.previousWormholeRuns.last10[0].gain).mul(c.inf)],text:(9-this.current())+" more Wormholes needed"}},
			reward:"Unlock Wormhole Upgrades",
			flavor:"There are no black holes - in the sense of regimes from which light can't escape to infinity.",
			current:function(){
				let valid = 0 // the number of runs which already satisfy the achievement requirement
				for (let i=0;i<(g.previousWormholeRuns.last10.length-1);i++) {if (Decimal.gte(g.previousWormholeRuns.last10[i].gain,N(g.previousWormholeRuns.last10[i+1].gain).mul(c.inf))) {valid++} else {break}}
				return valid
			}
		},
		904:{
			name:"Millionaire II",
			get description(){return "Reach "+BEformat(c.e2e6)+" stardust";},
			check:function(){return g.stardust.gt(c.e2e6);},
			prevReq:[529],
			event:"gameloop",
			progress:function(){return achievement.percent(g.stardust,c.e2e6,1);},
			get reward(){return "Research 9-15 and 10-13 are {}× stronger (based on Hawking radiation)";},
			flavor:"If you don't come from a rich family, a rich family must come from you.",
			effect:function(){return g.hawkingradiation.add(1e200).log10().log10().pow(c.d5).div(c.d64);},
			effectFormat:x=>x.format(3),
			formulaText:()=>"log<sup>[2]</sup>(HR + "+N(1e200).format()+")<sup>5</sup> ÷ 64"
		},
		905:{
			name:"Enter the E",
			description:"Enter Study XIII",
			check:function(){return true}, // checked locally
			prevReq:[821],
			progress:function(){return "Not Completed!"},
			reward:"Chroma, luck shard, prismatic and antimatter gain are multiplied by {} (based on Study XIII completions)",
			effectBreakpoints:[0,24,56,96,144,200], // 256 functions as a final breakpoint of sorts but as (256 - 200 == 200 - 144) we do not need to code it
			effect:function(){
				let base
				for (let i=4;i>=0;i--) {if (g.studyCompletions[13]>=this.effectBreakpoints[i]) {base = i+1+((g.studyCompletions[13]-this.effectBreakpoints[i])/(this.effectBreakpoints[i+1]-this.effectBreakpoints[i]));break}}
				return N(base*2).pow10().sub(c.d1).mul(c.d13).div(c.d99)
			},
			effectFormat:x=>x.noLeadFormat(3),
			formulaText:function(){for (let i=4;i>=0;i--) {if (g.studyCompletions[13]>=this.effectBreakpoints[i]) {return "(10<sup>(c"+formulaFormat.add(N((this.effectBreakpoints[i+1]-this.effectBreakpoints[i])*(i+1)-this.effectBreakpoints[i]))+")"+formulaFormat.mult(N(2/(this.effectBreakpoints[i+1]-this.effectBreakpoints[i])))+"</sup> - 1) × 13 ÷ 99"}}},
			get flavor(){return "<b>This is the last update ever.</b> It has been <b>"+BEformat(Math.floor((Date.now()-1616371200000)/86400000))+"</b> days since the game being updated."}
		},
		906:{
			name:"Dark Eternity on the Moon",
			get description(){return "Make tickspeed go below "+c.e8.format()+"÷ outside of Study VI and XIII"},
			check:function(){return stat.tickspeed.lt(c.em8)&&(!StudyE(6))&&(g.activeStudy!==13)},
			event:"gameloop",
			progress:function(){return g.achievement[906]?achievement.percent(stat.tickspeed,this.milestoneReq(this.milestones()+1),1):(StudyE(6)||(g.activeStudy===13))?"Failed":achievement.percent(stat.tickspeed,c.em8,1)},
			get reward(){return "Observation effect softcaps are {}% weaker "+((this.milestones()===40)?"":(" (increases at milestones of best-ever tickspeed, next at "+this.milestoneReq(this.milestones()+1).format()+"×)"))},
			effect:function(){return Decimal.FC_NN(1,0,1-Math.log2(1+this.milestones()/40)/4)},
			effectFormat:x=>c.d1.sub(x).mul(c.e2).noLeadFormat(3),
			formulaText:()=>"25 × log<sub>2</sub>(1 + μ ÷ 40)",
			milestoneReq:function(x){return Decimal.decibel(Math.floor(x/4)+40).mul(1+(x%4)*0.06)},
			milestones:function(){for (let i=40;i>0;i--) {if (g.bestTickspeedThisMatrix.gte(this.milestoneReq(i))) {return i}};return 0},
			maxMilestones:40,
			flavor:"One of the principal functions of a friend is to suffer (in a milder and symbolic form) the punishments that we should like, but are unable, to inflict upon our enemies."
		},
		907:{
			name:"Philosopher of Medicine",
			description:"Buy 16 Study research in a single Wormhole",
			prevReq:[905],
			check:function(){return g.ach907Progress>15},
			event:"researchBuy",
			progress:function(){return achievement.percent(N(g.ach907Progress),c.d16,0)},
			reward:"All Study research are {}% cheaper",
			effect:function(y=this.yellowValue){return c.d0_9.sub(c.d0_8.mul(y))},
			effectFormat:x=>c.d1.sub(x).mul(c.e2).noLeadFormat(3),
			yellowBreakpoints:[N(250000),N(2.25e6),0],
			flavor:"Never confuse education with intelligence, you can have a PhD and still be an idiot."
		},
		908:{
			name:"Master Date",
			description:"Complete the fourth level of Study VIII without having Masteries active at any point and without buying any dark axis with a cost greater than 1",
			prevReq:[524],
			check:function(){return (g.activeStudy===8)&&(g.studyCompletions[8]>2)&&g.ach524possible&&g.ach908possible},
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[8]<3)?"Complete Study VIII 3 times first":(g.activeStudy!==8)?"Enter Study VIII first":g.ach524possible?(g.ach908possible?achievement.wormholeProgress():"Failed due to spending too much on a dark axis"):"Failed due to having Masteries"},
			failed:function(){return (g.activeStudy!==8)||(g.studyCompletions[8]<3)||(!g.ach524possible)||(!g.ach908possible)},
			reward:"The third reward of Study VIII is 11.1% stronger",
			flavor:"No eye at all is better than an evil eye, dark master!"
		},
		909:{
			name:"Octadecayotton",
			description:"Buy any R axis",
			check:function(){return g.RAxis.gt(c.d0)||g.darkRAxis.gt(c.d0)||g.antiRAxis.gt(c.d0)},
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			prevReq:[909],
			get reward(){return "All anti-axis costs are lowered to the (1 + [total anti-axis] ÷ {})th root (currently: "+this.effect().mul(stat.totalAntiAxis).add(c.d1).noLeadFormat(4)+"th)"},
			effect:function(){
				let out = c.em5
				if (g.achievement[910]) {out = out.mul(c.d1_01)}
				return out
			},
			effectFormat:x=>x.recip().noLeadFormat(3),
			flavor:"Because triangles have 3 corners, while squares only have 5.... So because 3 is the square root of 9, therefore 9th axis can't exist because 'Illumenati IV' is real."
		},
		910:{
			name:"Icosaxennon",
			description:"Buy any Q axis",
			check:function(){return g.QAxis.gt(c.d0)||g.darkQAxis.gt(c.d0)||g.antiQAxis.gt(c.d0)},
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			prevReq:[909],
			get reward(){return "Vacuum energy increases {}% faster per anti-axis owned (additive; currently "+[achievement(910).effect(),stat.totalAntiAxis,c.e2].productDecimals().noLeadFormat(2)+"%); "+achievement.label(909)+" reward is 1% stronger"},
			effect:function(){
				let out = c.d0_01
				if (g.achievement[911]) {out = out.mul(1.11)}
				return out
			},
			effectFormat:x=>x.mul(c.e2).noLeadFormat(2),
			get flavor(){return "Q axis base cost is "+Decimal.FC_NN(1,41898,1e10).format()}
		},
		911:{
			name:"Icosididakon",
			description:"Buy any P axis",
			check:function(){return g.PAxis.gt(c.d0)||g.darkPAxis.gt(c.d0)||g.antiPAxis.gt(c.d0)},
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			prevReq:[910],
			get reward(){return "+{}% Y axis effect per dark axis owned (additive; currently "+[achievement(911).effect(),stat.totalDarkAxis,c.e2].productDecimals().noLeadFormat(2)+"%); "+achievement.label(910)+" reward is 11% stronger"},
			effect:function(){
				let out = N(0.0223)
				return out
			},
			effectFormat:x=>x.mul(c.e2).noLeadFormat(2),
			flavor:"(Eins, zwei,) P(olizei)"
		},
		912:{
			name:"Icositetrahendon",
			description:"Buy any O axis",
			check:function(){return g.OAxis.gt(c.d0)||g.darkOAxis.gt(c.d0)||g.antiOAxis.gt(c.d0)},
			event:"axisBuy",
			progress:function(){return "Not Completed!"},
			prevReq:[911],
			get reward(){return "Normal, dark and anti-S axis is 1% stronger"},
			flavor:"Only real old-timers can associate 1E#1e41900 with the P axis"
		},
		913:{
			name:"Axistential Dread",
			description:"Have twelve distinct axis types affected by Corruption simultaneously, including at least one type of O axis",
			check:function(){return this.hasO()&&(this.value()>=12)},
			event:"gameloop",
			progress:function(){return this.hasO()?achievement.percent(N(this.value()),c.d12,0):"Need a corrupted O axis"},
			prevReq:[912],
			reward:"Unlock Study XIII Binding 25",
			flavor:"Fifteen birds in five firtrees,<br>their feathers were fanned in a fiery breeze!<br>But, funny little birds, they had no wings!<br>O what shall we do with the funny little things?<br>Roast 'em alive, or stew them in a pot;<br>fry them, boil them and eat them hot?",
			value:function(){
				let out = 0
				for (let i of ["axis","darkAxis","antiAxis"]) {for (let j of axisCodes) {if (corruption.list[i].isCorrupted(j)) {out++}}}
				return out
			},
			hasO:function(){
				for (let i of ["axis","darkAxis","antiAxis"]) {if (corruption.list[i].isCorrupted("O")) {return true}}
				return false
			},
			beta:true
		},
		914:{
			name:"Excaecati Negando Experientia",
			description:"Complete the fourth level of Study IX without dark stars",
			check:function(){return (g.activeStudy===9)&&(g.studyCompletions[9]>2)&&g.darkstars.eq(c.d0)},
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[9]<3)?"Complete Study IX 3 times first":(g.activeStudy!==9)?"Enter Study IX first":g.darkstars.eq(c.d0)?achievement.wormholeProgress():"Failed"},
			failed:function(){return (g.activeStudy!==9)||(g.studyCompletions[9]<3)||g.darkstars.neq(c.d0)},
			reward:"The third reward of Study IX is 11.1% stronger",
			flavor:"Everyone is a prisoner of his own experiences"
		},
		915:{
			name:"End of the Stelliferous Era",
			description:"Reach 55 stars without any temporary research or more than 6 Stardust upgrades",
			check:function(){return (g.stars>=55)&&(totalResearch.temporary===0)&&(effectiveStardustUpgrades()===6)},
			prevReq:[905],
			event:"starBuy",
			progress:function(){return (totalResearch.temporary!==0)?"Failed due to having research":(effectiveStardustUpgrades()>6)?"Failed due to too many Stardust upgrades":achievement.percent(N(g.stars),N(55),0)},
			get reward(){return "The cost of Stardust Upgrades is divided by {} per Stardust Upgrade, per Stardust Upgrade (based on time in the current Wormhole) (current total: "+this.effect().pow(g.stardustUpgrades.sum()**2).format(2)+")"},
			failed:function(){return (totalResearch.temporary!==0)||(effectiveStardustUpgrades()!==6)},
			flavor:"The universe bursts into existence from life, not the other way around as we have been) taught. For each life there is a universe, its own universe. We generate spheres of reality, individual bubbles of existence. Our planet is comprised of billions of spheres of reality, generated by each individual human and perhaps even by each animal.",
			effect:function(){return g.truetimeThisWormholeReset.div(c.e8).add(c.d1).pow(c.e2)},
			effectFormat:x=>x.format(4),
			formulaText:()=>"(1 + t ÷ "+c.e8.format()+")<sup>100</sup>"
		},
		916:{
			name:"While you were away... nothing happened",
			description:"Unlock the third Dilation Upgrade",
			check:function(){return g.dilationUpgradesUnlocked>2},
			prevReq:[605,905],
			event:"gameloop",
			progress:function(){return achievement.percent(N(g.dilationUpgradesUnlocked),c.d3,0)},
			reward:"The effect of tickspeed on antimatter gain is raised to the power of {} (based on antimatter galaxies)",
			flavor:"A late game is only late until it ships. A bad game is bad until the end of time.",
			effect:function(){return g.antimatterGalaxies.div(c.e3).add(c.d1).pow(c.e2).mul(c.e2).sub(c.d99)},
			effectFormat:x=>x.noLeadFormat(3),
			formulaText:()=>"(G ÷ 1,000 + 1)<sup>100</sup></sup> × 100 - 99"
		},
		917:{
			name:"Ant God's Ascension",
			description:"Buy all Spatial Synergism research",
			prevReq:[824,905],
			check:function(){for (let i of researchGroupList.spatialsynergism.contents) {if (!g.research[i]){return false}};return true},
			event:"researchBuy",
			progress:function(){return achievement.percent(N(ownedResearchInGroup("spatialsynergism").length),c.d56,0)},
			reward:"Hawking radiation gain is multiplied by {} (based on all S axis)",
			effect:function(){return [c.d2,c.d1_05,[g.SAxis,g.darkSAxis,g.antiSAxis].sumDecimals()].decimalPowerTower().sub(c.d1)},
			effectFormat:x=>x.format(2),
			formulaText:()=>"2<sup>1.05<sup>ΣS</sup></sup> - 1",
			flavor:"I ate some banana yogurt.<br>Then went out for a walk.<br><br>Fresh air never hurt anybody"
		},
		918:{
			name:"Where is that Infinite Galaxy now?",
			description:"Have 308 effective dark stars",
			prevReq:[905],
			check:function(){return stat.realDarkStars.gte(c.d308)},
			event:"gameloop",
			progress:function(){return achievement.percent(stat.realDarkStars,c.d308,0)},
			get reward(){return "+3.08% chroma per effective dark star (currently: "+percentOrMult(N(1.0308).pow(stat.realDarkStars),2,true)+")"},
			flavor:"The ability to destroy a planet is insignificant compared to the power of the Force."
		},
		919:{
			name:"Zero Player Game III",
			description:"Cap the interval of the axis autobuyer",
			prevReq:[905],
			check:function(){return autobuyerMeta.interval("axis")===0.05},
			event:"autobuyerUpgrade",
			progress:function(){return achievement.percent(N(autobuyerMeta.interval("axis")),N(0.05),x=>x.recip())},
			rewardAffects:[242,248,333,337],
			get reward(){return "Study XIII Bindings "+this.rewardAffects.joinWithAnd()+" are {}% weaker (based on total autobuyer levels)"},
			effect:function(){return Decimal.convergentSoftcap(N(1-autobuyerMeta.totalLevels()*0.00035),c.d0_5,c.d0)},
			effectFormat:x=>c.d1.sub(x).mul(c.e2).noLeadFormat(3),
			formulaText:()=>(autobuyerMeta.totalLevels()>=2500)?"100 - 71,428 ÷ Σλ":"Σλ × 0.035",
			flavor:"There is nothing so useless as doing efficiently what should not be done at all."
		},
		920:{
			name:"Hyperbolic Lawmakers",
			description:"Complete the Ontological Triad using a Study combination from a previous Triad",
			prevReq:[824,905],
			check:function(){return (g.activeStudy===10)&&(studyPower(10)===3)&&["147","258","369"].includes(g.study10Options.sort((a,b)=>a-b).join(""))},
			event:"wormholeResetBefore",
			progress:function(){
				if (g.achievement[920]) {
					let remaining = countTo(9).filter(x=>(g.ach920Completions&(2**(x-1)))===0)
					return ((g.activeStudy!==10)||(studyPower(10)!==3)||(!g.study10Options.map(x=>remaining.includes(x)).includes(true)))?("Enter the Ontological Triad and select "+remaining.map(x=>roman(x)).joinWithAnd().replace("and","or")+" first"):achievement.wormholeProgress()
				} else {
					return ((g.activeStudy!==10)||(studyPower(10)!==3))?"Enter the Ontological Triad and select I+IV+VII, II+V+VIII or III+VI+IX first":achievement.wormholeProgress()
				}
			},
			get reward(){return "The third reward of Study of Studies is {}% stronger"+((this.milestones()===9)?"":"<br>(based on Studies completed as part of the Ontological Triad)")},
			effect:function(){return Decimal.FC_NN(1,0,1+this.milestones()/81)},
			effectFormat:x=>x.sub(c.d1).mul(c.e2).format(2),
			formulaText:()=>"μ ÷ 0.81",
			milestones:function(){return g.ach920Completions.toString(2).replaceAll("0","").length},
			maxMilestones:9,
			flavor:"A hostess is giving a dinner party and she's got a lovely five-pound T-bone steak sitting on the sideboard in the kitchen waiting to be cooked while she chats with the guests in the living room—has a few drinks and whatnot. But then she excuses herself to go into the kitchen to cook the steak—and it's gone. And there's the family cat, in the corner, sedately washing it's face. \"The cat got the steak,\" Barney said. Did it? The guests are called in; they argue about it. The steak is gone, all five pounds of it; there sits the cat, looking well-fed and cheerful. \"Weigh the cat,\" someone says. They've had a few drinks; it looks like a good idea. So they go into the bathroom and weigh the cat on the scales. It reads exactly five pounds. They all perceive this reading and a guest says, \"okay, that's it. There's the steak.\" They're satisfied that they know what happened, now; they've got empirical proof. Then a qualm comes to one of them and he says, puzzled, \"But where's the cat?\""
		},
		...(()=>{
			let out = {}
			for (let i=0;i<5;i++) {
				let s13req = [24,56,96,144,200][i]
				let bms = ["Gain 1 RP per second","You can now change the Singularity faster (max, min, slider) and autobuy singularity function upgrades","<del>Forever keep the first four function upgrades free and unlock advanced autoshift (Refunding is encouraged)</del><br><ins>Unlock Autoprestiger to automatically enter challenges</ins>","<del>Automatically get Incrementy and Dark Manifolds and Upgrades without losing incrementy, (max cost of e600 Incrementy)</del><br><ins>Reward: Unlock option to automatically distribute Cardinals and buy ℵω</ins>","Unlock Baseless<sup>2</sup> Milestones (base 7)"]
				let bmrs = ["ω<sup>ω<sup>2</sup>3</sup>","ω<sup>ω<sup>2</sup>3+ω3</sup>","<del>ω<sup>ω<sup>2</sup>4+ω3</sup></del> <ins>ω<sup>ω<sup>2</sup>3+ω4</sup></ins>","<del>ω<sup>ω<sup>2</sup>4+ω4</sup></del> <ins>ω<sup>ω<sup>2</sup>4</sup></ins>","ω<sup>ω<sup>3</sup></sup>"]
				let b2ms = ["Reward: Unlock new Singularity Functions, and raise the OP cap to e1e100, or a <b>googolplex</b>","Disable normal challenge reward scaling","Unlock new Booster Upgrades and u22 scales better <i>"+arrowJoin("(10+(boosters<sup>0.9</sup>))","(10+(boosters<sup>1.25</sup>))")+"</i>","You can complete Omega Challenges up to 3 times","Unlock Epsilon Challenges"]
				let b2mrs = [c.inf,N("2.048e451"),N("1.152e564"),N("1.148e684"),N("4.361e809")]
				out[921+i] = {
					name:"Baseless Milestone"+achievement.roman(i+1),
					prevReq:(i===0)?[905]:[920+i],
					get description(){return "Have an exotic matter count with at least 1,000,000,000 digits"+(["BE Default","Engineering","Logarithm","Mixed scientific","Scientific"].includes(g.notation)?"":(" (need "+this.req.format()+" exotic matter)"))+" in Study XIII at level "+s13req+" or higher"},
					check:function(){return numberOfDigits(g.exoticmatter).gte(this.nextMilestone(0))&&(g.activeStudy===13)&&(studyPower(13)>=s13req)},
					event:"gameloop",
					progress:function(){return (g.activeStudy!==13)?"Enter Study XIII first":(studyPower(13)<s13req)?("Binding level too low ("+studyPower(13)+" / "+s13req+")"):(study13.bound(236))?{percent:achievement.percent(numberOfDigits(g.exoticmatter),N(this.nextMilestone(g.achievement[921+i]?this.milestones():0)),0),text:numberOfDigits(g.exoticmatter).format()+" / "+N(this.nextMilestone(g.achievement[921+i]?this.milestones():0)).format()+"; "+timeFormat(study13.bindingEff(236)-g.timeThisWormholeReset)+" left"}:achievement.percent(numberOfDigits(g.exoticmatter),N(this.nextMilestone(g.achievement[921+i]?this.milestones():0)),0)},
					get reward(){return (i===4)?("The "+achievement.label(921,5)+" rewards are {}% stronger"):("Research "+["13-5","13-7 and 13-9","13-8","13-11"][i]+" "+((i===1)?"are":"is")+" {}% stronger"+((achievement(921+i).milestones()===13)?"":(" (increases based on milestones of most digits of exotic matter in Study XIII level ≥ "+s13req+")")))},
					effect:function(){
						let out = Math.sqrt(Math.max(this.milestones()*2-1,0))/25
						return (i===4)?Decimal.FC_NN(1,0,g.achievement[925]?(1/(1-out)):(1+out)):Decimal.FC_NN(1,0,1+out*(g.achievement[925]?achievement(925).effect():1))
					},
					effectFormat:x=>x.sub(c.d1).mul(c.e2).noLeadFormat(2),
					formulaText:()=>"max(μ × 2 - 1, 0)<sup>0.5</sup> × "+N(g.achievement[925]?(achievement(925).effect()*4):4).noLeadFormat(3),
					milestones:function(){return g.baselessMilestones[i]},
					nextMilestone:function(num){return Math.floor(Math.min(1e9*1.2345678901**num,12345678901))},
					maxMilestones:13,
					get flavor(){
						let out = "<b>Baseless Milestone №"+(i+1)+" ("+bmrs[i]+")</b><br>"+bms[i]
						if (g.baselessMilestones[i]===13) {out += "<br><b>Baseless<sup>2</sup> Milestone №"+(i+1)+" ("+b2mrs[i].format()+" OP)</b><br>"+b2ms[i]}
						return out
					}
				}
			}
			return out
		})(),
		926:{
			name:"Scrivener's Moon",
			description:"Complete the fourth level of Study XI in 9 seconds or less",
			prevReq:[510,905],
			check:function(){return (g.activeStudy===11)&&(g.studyCompletions[11]>2)&&(g.timeThisWormholeReset<9)},
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[11]<3)?"Complete Study XI 3 times first":(g.activeStudy!==11)?"Enter Study XI first":(g.timeThisWormholeReset<9)?{percent:achievement.wormholeProgress(),text:timeFormat(9-g.timeThisWormholeReset)+" left"}:"Failed"},
			reward:"The third reward of Study XI is 11.1% stronger",
			flavor:"With skin as fair as mine, moonburn is a real possibility."
		},
		...(()=>{
			let out = {}
			for (let i=0;i<3;i++) {
				let req = [N(133),N(140),N(147)][i]
				out[927+i] = {
					name:"Irelande Douze Pointe"+achievement.roman(i+1),
					description:"Have "+req.toString()+" total Luck Upgrades",
					prevReq:[[807],[905,927],[928]][i],
					check:function(){return Object.values(g.luckUpgrades).map(x=>Object.values(x).sumDecimals()).sumDecimals().gte(req)},
					event:"buyLuckUpgrade",
					progress:function(){return achievement.percent(Object.values(g.luckUpgrades).map(x=>Object.values(x).sumDecimals()).sumDecimals(),N(req),0)},
					get reward(){return "Add {} free level"+(achievement(927+i).effect().eq(c.d1)?"":"s")+" to "+(x=>toTitleCase(x[0])+" "+luckUpgrades[x[0]][x[1]].name)([["trifolium","antiAxis"],["quatrefolium","prismatic"],["cinquefolium","luck"]][i])},
					effect:function(y=this.yellowValue){return y.mul(c.d6).add(c.d1)},
					effectFormat:x=>x.noLeadFormat(3),
					yellowBreakpoints:[N(250000*2**i),N(2.5e6*2**i),1],
					flavor:["The key is not to prioritize what's on your schedule...","...but to schedule your priorities.","Would alemaninc's players be satisfied with how low his game is on the schedule?","TBD","TBD"][i]
				}
			}
			return out
		})(),
		930:{
			name:"Way to go, Albert Einstrimp...",
			description:"Reach the Corruption",
			prevReq:[905],
			check:function(){return true}, // checked locally
			progress:function(){return "Not Completed!"},
			reward:"Research 7-8 is 2% stronger",
			flavor:"When you sit with a nice girl for two hours you think it's only a minute. But when you sit on a hot stove for a minute you think it's two hours. That's relativity."
		},
		931:{
			name:"The Shining Law of Conservation of Information",
			description:"Activate all research simultaneously",
			prevReq:[907,917],
			check:function(){return totalResearch.overall()===360},
			event:"researchBuy",
			progress:function(){return achievement.percent(N(totalResearch.overall()),N(360),0)},
			reward:"All research in column 8 is {}% stronger (based on total Discoveries)",
			effect:function(){return g.totalDiscoveries.add(c.d10).log10().log10().pow(c.d3)},
			effectFormat:x=>x.format(3),
			formulaText:()=>"log<sup>[2]</sup>(D + 10)<sup>3</sup>",
			flavor:"The world is one big data problem.",
			beta:true
		},
		932:{
			name:"Crazy Rolling in Metal",
			description:"Complete the fourth level of Study XII with no more than 7 Stardust Upgrades",
			prevReq:[905],
			check:function(){return (g.activeStudy===12)&&(g.studyCompletions[12]>2)&&(effectiveStardustUpgrades()<=7)},
			event:"wormholeResetBefore",
			progress:function(){return (g.studyCompletions[12]<3)?"Complete Study XII 3 times first":(g.activeStudy!==12)?"Enter Study XII first":(effectiveStardustUpgrades()>7)?"Failed":{percent:achievement.wormholeProgress(),text:(7-effectiveStardustUpgrades())+" upgrade"+((effectiveStardustUpgrades()===6)?"":"s")+" left"}},
			failed:function(){return (g.activeStudy!==12)||(g.studyCompletions[12]<3)||(effectiveStardustUpgrades()>7)},
			reward:"The third reward of Study XII is 11.1% stronger",
			flavor:"You are now a chieftain of a zebra tribe.<br>(how is this even possible?)",
			beta:true
		},
		933:{
			name:"ÒMCCDV IIÍ",
			req:Decimal.FC_NN(1,1,44297),
			get description(){return "Reach "+this.req.format()+" mastery power"},
			prevReq:[933],
			check:function(){return g.masteryPower.gt(this.req)},
			event:"gameloop",
			progress:function(){return achievement.percent(g.masteryPower,this.req,1)},
			get reward(){return "The anti-W axis effect softcaps 20.21× later, and an extra 4.11× later per anti-W axis (currently: "+N(4.11).pow(stat.realantiWAxis).mul(20.21).format(3)+"×, translated to about ^"+Decimal.div(miscStats.antiWAxisEffect.modifiers[0].softcap(true).log10().log10(),miscStats.antiWAxisEffect.modifiers[0].softcap(false).log10().log10()).pow(c.d2).format(4)+" more effect)"},
			get flavor(){return "<del>500 sh--</del> <ins>933 achievements</ins>... We've come a long way since our beginning in <del>August 20--</del> <ins>January 2022</ins>. Memories...<br><br>Since <del>OMCCDV I--</del> <ins>Exotic Matter Dimensions'</ins> creation on <del>2--</del> <ins>3 January 2022</ins>, we've created an average of <del>2.75 sh--</del> <ins>"+N(achievement.all.length/(newsSupport.excelDate()-44564)).format(2)+" achievements</ins> per day.<br><br><del>OM--</del> <ins>EMD</ins> has been in <del>c--</del> <ins>public</ins> for <del>six months</del> <ins>"+numword(new Date().getUTCFullYear()-2022)+" years</ins> now because of <del>Ma--</del> <ins>Stat Mark and xhwzwka</ins>... and I refuse to acknowledge <del>my</del> <ins>their</ins> part in fueling <del>their va--</del> <ins>my contribution</ins> even though everyone knows <del>I started it</del> <ins>they suggested half the features</ins>.<br><br><del>What other statistics could I put i--</del> <ins style=\"color:#ff0000;\">Wow. It turns out alemaninc will really do ANYTHING to get this out...</ins>"}
		}
	}
};
achievement.all = Object.values(achievementList).map(x => Object.keys(x)).flat()
achievement.withMilestones = achievement.all.filter(x=>(typeof achievement(x).milestones)!=="undefined")
const secretAchievementRarityNames = [null,"Super Easy","Common","Rare","Legendary","Mythical","Shiny","Celestial"]
const secretAchievementRarityColors = {
	1:{light:"#999999",dark:"#333333"},
	2:{light:"#00cc00",dark:"#006600"},
	3:{light:"#cc66ff",dark:"#330066"},
	4:{light:"#ff6600",dark:"#663300"},
	5:{light:"#ff0000",dark:"#660000"},
	6:{light:"#00ffff",dark:"#006666"},
	7:{light:"#0000ff",dark:"#000033"}
}
const secretAchievementList = {
	1:{
		name:"Prestigious",
		get description(){return "Stardust reset 10,000 times"+(unlocked("Hawking Radiation")?" in the current universe":"")},
		check:function(){return g.TotalStardustResets>=1e4;},
		event:"stardustReset",
		flavor:"What are you doing with your life...",
		rarity:4
	},
	2:{
		name:"Anniversary",
		description:"Play <i>Exotic Matter Dimensions</i> on its anniversary (using UTC time zone)",
		check:function(){return (new Date().getUTCMonth()===1)&&(new Date().getUTCDate()===22);},
		flavor:"bUt 22/2/22 sHoUlD bE 2022-02-22, lIkE tHe rEsT oF tHe cHaNgElOg!",
		rarity:3
	},
	3:{
		name:"Epsilon Time",
		description:"Have 10 consecutive frames be more than 1 second long",
		check:function(){return lagAchievementTicks>=10;},
		event:"gameloop",
		flavor:"Oh, hey... you're still here?",
		rarity:1
	},
	4:{
		name:"Oh, hey... you're still here?",
		description:"Have the game window open for 8 hours",
		check:function(){return timeSinceGameOpened>28800;},
		event:"gameloop",
		reward:"Lifetime membership at <a href=\"https://www.reddit.com/r/StopGaming\" style=\"color:inherit;\" target=\"_blank\">https://www.reddit.com/r/StopGaming</a>",
		flavor:"Well, I'm flattered that people are having so much fun with <i>Exotic Matter Dimensions</i>!<br>But seriously, get help.",
		rarity:2
	},
	5:{
		name:"Legacy",
		description:"Play for a year.",
		check:function(){return g.timePlayed>31556926;},
		event:"gameloop",
		flavor:"...and then you set Overclock to 10,000× and blow it all instantly.",
		rarity:5
	},
	6:{
		name:"I am speed",
		description:"Have 10 consecutive frames be 50 milliseconds long (maximum fps)",
		check:function(){return fpsAchievementTicks>=10;},
		event:"gameloop",
		flavor:"1200 frames per minute! Wow. alemaninc only gets 20 frames per minute.",
		rarity:1
	},
	7:{
		name:"Rasputin",
		description:"Use \"cat\" as a promotion code",
		check:function(){return true;}, // checked locally
		flavor:"There was a cat that really was gone",
		rarity:3
	},
	8:{
		name:"Help Wanted",
		description:"Use \"alemaninc\" as a promotion code",
		check:function(){return true;}, // checked locally
		flavor:"Have you considered becoming an EMD beta tester? Well, what if I told you that <b>all players already are beta testers?</b>",
		rarity:2
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
		check:function(){return g.researchRespec&&(!researchList.nonPermanent.map(x=>g.research[x]).includes(true));},
		event:"wormholeResetBefore",
		flavor:"<a style=\"color:#ffffff\" href=\"https://books.google.co.uk/books/about/Quantum_Physics_For_Dummies.html?id=pRRq8vCFvzEC&source=kp_book_description&redir_esc=y\" target=\"_blank\">Studies will help</a>",
		rarity:3
	},
	12:{
		name:"Precision to the millimeter",
		description:"Destroy the universe with exactly 1,000 total dark axis",
		check:function(){return stat.totalDarkAxis.eq(c.e3);},
		event:"wormholeResetBefore",
		flavor:"Should we tell them about buy max...",
		rarity:3
	},
	13:{
		name:"One in a Million",
		description:"There is a 1 in 1,000,000 chance of getting this achievement every second",
		check:function(){return true;}, // checked locally
		event:"luckyGameloop",
		flavor:"It takes on average 11 days, 13 hours, 46 minutes and 40 seconds to get this. That's... not that long.",
		chance:function(time){return 1-Math.exp(-time/1e6);},
		rarity:5
	},
	14:{
		name:"One in a Billion",
		description:"There is a 1 in 1,000,000,000 chance of getting this achievement every second",
		check:function(){return true;}, // checked locally
		prevReq:[13],
		event:"luckyGameloop",
		flavor:"It takes on average 31 years, 259 days, 1 hour, 46 minutes and 40 seconds to get this. Thank you for spending that time with <i>Exotic Matter Dimensions</i>!",
		chance:function(time){return 1-Math.exp(-time/1e9);},
		rarity:6
	},
	15:{
		name:"One in a Trillion",
		description:"There is a 1 in 1,000,000,000,000 chance of getting this achievement every second",
		check:function(){return true;}, // checked locally
		prevReq:[14],
		event:"luckyGameloop",
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
		event:"researchBuy",
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
		prevReq:[18],
		check:function(){return empoweredAxisBought>=10;},
		flavor:"Cost: 100 empowered exotic matter",
		rarity:2
	},
	20:{
		name:"Empowered Exotic Matter Dimensions III",
		description:"Try to buy an empowered axis 100 times in one session",
		prevReq:[19],
		check:function(){return empoweredAxisBought>=100;},
		flavor:"Stop it. Get some help.",
		rarity:2
	},
	21:{
		name:"Empowered Exotic Matter Dimensions IV",
		description:"Try to buy an empowered axis 1,000 times in one session",
		prevReq:[20],
		check:function(){return empoweredAxisBought>=1000;},
		flavor:"This is the last one, I promise.",
		rarity:3
	},
	22:{
		name:"Empowered Exotic Matter Dimensions V",
		description:"Try to buy an empowered axis 10,000 times in one session",
		prevReq:[21],
		check:function(){return empoweredAxisBought>=10000;},
		get flavor(){return (empoweredAxisBought>=1e5)?("THERE IS NO EMPOWERED EXOTIC MATTER DIMENSIONS VI<br>[cackles maniacally]"):("You've still "+(1e5-empoweredAxisBought).toLocaleString("en-US")+" more clicks before the next one. Good luck!");},
		rarity:4
	},
	23:{
		name:"Tichat's Heart",
		description:"Buy the 40th star.",
		check:function(){return g.stars>39},
		event:"starBuy",
		flavor:"Row 11 stars coming in 𝕍3.0!",
		rarity:1
	},
	24:{
		name:"Tardis",
		description:"Max out all dilation upgrades",
		check:function(){return countTo(4).map(x=>g.dilationUpgrades[x]===dilationUpgrades[x].cap).reduce((x,y)=>x&&y)},
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
		get reward(){return "alemaninc is on his way to collect that credit card. Estimated arrival in: "+timeFormat(Math.max(86400-timeSinceGameOpened,46800-timeSinceGameOpened%7200))},
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
		check:function(){return newsSupport.xhwzwkaPhishing===5},
		prevReq:[26],
		flavor:"WHO IS XHWZWKA\"<br>\"It's ill-defined!",
		rarity:5
	},
	29:{
		name:"Dilated Pupils",
		get description(){return "Reach "+timeFormat(c.inf.pow10())+" of dilated exotic matter"},
		check:function(){return g.exoticmatter.log10().pow(c.d1_05.pow(newsSupport.dilationPenaltyReductions).mul(c.d0_75)).gt(c.inf)},
		flavor:"Is that how long it'll take for you to stop clicking the news ticker?",
		rarity:4
	},
	30:{
		name:img("blobwave","Blob wave",32),
		description:"Prove your status as a regular Contributor",
		check:function(){return true},
		reward:"Your blob is in the game! Look!",
		flavor:"How come PSionJoule gets a secret achievement and no one else? Not fair!",
		rarity:3,
	},
	31:{
		name:"Deep Thought",
		description:"Click the Hitchhiker's Guide to the Galaxies exactly 42 times",
		check:function(){return this.clicks===42},
		flavor:"The ultimate question of life, the universe and what people are doing clicking random headings",
		rarity:5,
		clicks:0,
		click:function(){
			this.clicks++
			if (this.clicks===42) {setTimeout(()=>{addSecretAchievement(31)},2000)}
			else {setTimeout(function(){secretAchievementList[31].clicks=0},30000)}
		}
	},
	32:{
		name:"You have 1 ^300, 0 ^299, 0 ^298, 0 ^297 and 0 ^296",
		get description(){return "Have a Zip Point multiplier of "+BEformat("e300")+"×"},
		check:function(){return g.zipPointMulti===1e300},
		flavor:"Stupid xhwzwka changed it to \"You have 1e300 exponents\". How boring...<br>But then, he restored the \"You have 1 ^300, 0 ^299, 0 ^298 and 0 ^297\" and the Zip Points were returned to their former glory.",
		rarity:7
	},
	33:{
		name:"Stat Mark",
		description:"Prove your status as a Distinguished Contributor that's not in our server",
		check:function(){return newsSupport.newsletter.remaining.length===0},
		flavor:"Hardly marked",
		rarity:6
	},
	34:{
		name:"Wrong game?",
		description:"Import a save string from <i>Antimatter Dimensions</i>",
		check:function(){return true},
		flavor:"alemaninc knows what it is like to get mistaken for someone far grander than yourself.<br>alemaninc gets angrier.",
		rarity:2
	},
	35:{
		name:"One for each archverse",
		description:"After a Wormhole reset, have an equal number of seconds of dilated time and total Wormhole resets.",
		check:function(){return Math.floor(g.dilatedTime)===g.TotalWormholeResets},
		event:"wormholeResetAfter",
		get flavor(){return "You'd call them dimensions but each of them already has "+fullAxisCodes.map(x=>stat["real"+x+"Axis"]).filter(x=>x.gt(0)).length+" of those..."},
		rarity:4
	},
	36:{
		name:"Wheel of Fortune",
		description:"Have at least 7 instances of the number 7 in your luck essence amount",
		check:function(){
			if (!StudyE(7)) return false
			let count = 0
			for (let i of String(g.luckEssence).split("")) if (i==="7") count++
			return count>6
		},
		event:"stardustReset",
		flavor:"This could have been 7 points, but of course alemaninc is stingy and only gives 7 points to his own achievement...",
		rarity:4
	},
	37:{
		name:"Last Quarter",
		description:"Set Overclock to 265.78× or higher in Study XI",
		check:function(){return StudyE(11)&&(overclockSpeedupFactor>=265.77531)},
		event:"gameloop",
		flavor:"alemaninc really is a lunar-tick, isn't he?",
		rarity:3
	},
	38:{
		name:"Read More",
		description:"Click \"Read More\" twice in a row.",
		check:function(){return newsSupport.readMoreIteration>1},
		event:"readMore",
		flavor:"Did you know that the developer is not in fact alemaninc, but in fact<br><b onMousedown=\"newsSupport.readMore()\">Read More</b>",
		rarity:2
	},
	39:{
		name:"Gaster's Blast",
		description:"Click \"Read More\" ten times in a row.",
		check:function(){return newsSupport.readMoreIteration>9},
		prevReq:[38],
		event:"readMore",
		flavor:"Life is too short to read a bad book.",
		rarity:7
	},
	40:{
		name:"Perfectly Balanced",
		description:"Make the average color of all your chroma within 0.1% of gray",
		check:function(){
			if (g.chroma.sumDecimals().eq(c.d0)) return false
			let channels = [[0,4,5,6],[1,3,5,6],[2,3,4,6]]
			let colors = channels.map(x=>Decimal.div(x.map(y=>g.chroma[y]).sumDecimals().add(g.chroma[8].div(c.d2)),g.chroma.sumDecimals()))
			return Decimal.eq_tolerance(colors[0],colors[1],0.001)&&Decimal.eq_tolerance(colors[0],colors[2],0.001)&&Decimal.eq_tolerance(colors[1],colors[2],0.001)
		},
		event:"gameloop",
		flavor:"As all things should be.",
		rarity:2
	},
	41:{
		name:"Internet Explorer",
		description:"Read the entire <i>Exotic Matter Dimensions</i> source code",
		check:function(){return true}, // checked locally
		flavor:"Good software, like wine, takes time.",
		rarity:6
	},
	42:{
		name:"Always a Bigger Phish",
		description:"Escape nicodium's scam",
		check:function(){return true}, // checked locally
		flavor:"My colleagues thought I was an embarrassment because I was talking about mind, body, spirit. So I was called a quack. I was called a fraud, which I initially resented, but then I got used to it.",
		rarity:2
	},
	43:{
		name:"Exotic Time",
		description:"Reverse time",
		check:function(){return deltatime<0},
		get flavor(){let t = 86400-(Date.now()%24000)*3.6;return String(Math.floor(t/3600)).padStart(2,"0")+":"+String(Math.floor(t/60)%60).padStart(2,"0")+":"+String(Math.floor(t)%60).padStart(2,"0")},
		rarity:4
	},
	44:{
		name:"Uncanny clicker",
		description:"Click the unclickable news ticker",
		clicks:0,
		check:function(){return this.clicks>99},
		flavor:"",
		rarity:3
	},
	45:{
		name:"Advent of Descension",
		description:"Have each of the last 10 Wormhole runs give less Hawking radiation than the one before",
		check:function(){
			if (g.previousWormholeRuns.last10.length!==10) {return false}
			for (let i=0;i<9;i++) {if (Decimal.gte(g.previousWormholeRuns.last10[i].gain,g.previousWormholeRuns.last10[i+1].gain)) {return false}}
			return true
		},
		event:"wormholeResetAfter",
		rarity:4
	},
	46:{
		name:"Angels with Filthy Souls",
		description:"Enter the Ontological Triad with Studies I, II and III",
		check:function(){return (g.activeStudy===10)&&(studyPower(10)===3)&&(g.study10Options.sum()===6)},
		event:"wormholeResetBefore",
		flavor:"One... two... three... TEN!",
		rarity:2
	},
	47:{
		name:"Angels with Even Filthier Souls",
		description:"Complete the Ontological Triad with Studies I, II and III",
		prevReq:[46],
		check:function(){return (g.activeStudy===10)&&(studyPower(10)===3)&&(g.study10Options.sum()===6)},
		event:"wormholeResetAfter",
		flavor:"Keep the change, ya filthy animal...",
		rarity:4
	},
	48:{
		name:"Consolation Prize",
		description:"Hack in some secret achievement points",
		check:function(){return Number(d.element("span_secretAchievementPoints").innerText)!==secretAchievementPoints},
		event:"gameloop",
		flavor:"Not everytime is a consolation prize given to offer solace to the recipient. It is sometimes given to console the giver's own conscience.",
		rarity:5
	},
	49:{
		name:"Turtle Master",
		description:"Cure the news ticker",
		check:function(){return true}, // checked locally
		flavor:"1 water bottle, 1 nether wart, 1 turtle shell",
		rarity:5
	},
	50:{
		name:"The world has collapsed due to excess of antimatter.",
		get description(){return "Reach "+c.inf.format()+" antimatter"},
		check:function(){return betaActive&&g.antimatter.gt(c.inf)},
		event:"gameloop",
		flavor:unbreak("<div style=\"text-align:left\"><code>"+["studies nowait purchase 11-304","while total tt < 12900 {","  studies nowait purchase 11-304","}","studies nowait purchase 11-304","if tp < 10 {","  unlock dilation","  start dilation","  pause 0.1s","  eternity nowait","}","studies purchase 11-304","wait 0 > 0"].map((x,i)=>"<span style=\"opacity:0.5;\">"+String(i+1).padStart(2," ")+"</span>  "+x).join("<br>")+"</code></div>"),
		noQuotes:true,
		rarity:1
	},
	// skip 50 numbers for meta-achievements
	...(()=>{
		let names = ["The Giver","Secret Keeper","General Secretary of the Workers' Party","[REDACTED]","Celestial of the Forgotten","Secrets of the Darkest Art","alemaninc"]
		let flavors = ["I feel sorry for anyone who is in a place where he feels strange and stupid.","You-Know-Who could search the village where Lily and James were staying for years and never find them, not even if he had his nose pressed against their sitting room window!","<i>How to Be a Terrible Leader for Dummies</i>: now at your local alemaninc Inc.","This news message has been removed under data protection law in Europe.","Finally, I remember everything. This darkness that banished me. Lai'tela...","Of the Horcrux, wickedest of magical inventions, we shall not speak nor give direction —",""]
		let out = []
		for (let i=0;i<7;i++) {out.push([101+i,{
			name:names[i],
			description:"Reach "+((i+1)*100)+" secret achievement points",
			prevReq:(i===0)?[]:[100+i],
			event:"secretMeta",
			check:function(){return secretAchievementPoints>=((i+1)*100)},
			flavor:flavors[i]??"TBD",
			rarity:i+1
		}])}
		return Object.fromEntries(out)
	})(),
	...(()=>{
		let names = ["\"Something-Colored Mugenri\"","QEF \"Ripple of About 500-or-So Years\""]
		let flavors = ["Based on <i>\"Scarlet Gensokyo\"</i> from Remilia Scarlet","Based on <i>\""]
		let out = []
		for (let i=0;i<6;i++) {out.push([108+i,{
			name:names[i]??"TBD",
			description:"Have "+((i+1)*25)+" secret achievements",
			event:"secretMeta",
			check:function(){return betaActive&&(totalSecretAchievements>=(i+1)*25)},
			flavor:flavors[i]??"TBD",
			rarity:i+2
		}])}
		return Object.fromEntries(out)
	})(),
	...(()=>{
		function dialogueGen(array){return "<div><table>"+array.map(x=>(x.length===1)?("<tr><td style=\"width:360px;text-align:left;vertical-align:top;padding-bottom:2px;\" colspan=\"2\">"+x[0]+"</td></tr>"):("<tr><td style=\"width:60px;text-align:left;vertical-align:top;padding-bottom:2px;\">"+x[0]+"</td><td style=\"width:300px;text-align:left;vertical-align:top;padding-bottom:2px;\">"+x[1]+"</td></tr>")).join("")+"</table></div>"}
		let flavors = {
			1:[["<i>A long, long corridor. Is it a lunatic illusion being shown by someone? To the youkai, this closer moon brought faint, nostalgic memories.</i>"]],
			2:[["<b>Eirin Yagokoro ENTERS</b>"],["EIRIN:","Hahaha."],["","Good, so you're following me."]],
			3:[["YUKARI:","This corridor is strange. It can't possibly be this long."],["REIMU:","The outside's turned into some world I've never seen!"]],
			4:[["<b>Eirin Yagokoro EXITS</b>"],["REIMU:","It looks like that long corridor has ended now. How about giving up soon?"]],
			5:[["<b>Eirin Yagokoro ENTERS</b>"],["EIRIN:","Ahahaha. My, aren't you two stupid."],["YUKARI:","Hey, she just said we're stupid. It's because I let a shrine maiden do her things."]],
			6:[["EIRIN:","The morning will come soon."],["","After that, I'll return the full moon to you."],["REIMU:","My, aren't you a good listener?"],["EIRIN:","My spell is already complete."],["","It's impossible for anyone to take the princess from here."],["YUKARI:","A princess? We had no interest in a princess to begin with."],["REIMU:","We only want you to return the full moon."]],
			7:[["EIRIN:","Don't worry. When the morning comes, I'll give it right back."],["REIMU:","That's not good enough."],["","We came here to get it back <i>before</i> the morning."],["EIRIN:","You're so impatient."],["","But, look at the place we're in right now. Do you know where this is?"],["REIMU:","??"]],
			8:[["EIRIN:","This place is the corridor between the false moon and the Earth."],["","That endless corridor just now was a false passage that connects the two."],["","You two were fooled by an illusion that the false full moon produced, and came here."],["REIMU:","And? So what about it?"],["EIRIN:","Do you have any method of returning home?"]],
			9:[["YUKARI:","I see. Let's take care of that after beating you."],["","We're in no hurry."],["EIRIN:","How can someone who was so perfectly deceived by my spell think they can still oppose me? It's quite strange."],["","Well, I'm no demon myself."],["","Until morning, I'll play with you."]],
			10:[["REIMU:","I don't quite get it, but..."],["","If we defeat her, it'll solve everything?"],["YUKARI:","See, that's why she called you stupid."],["","But you're exactly right."],["","Everything Reimu Hakurei says is entirely correct."]],
			11:[["EIRIN:","Right now, all Earthlings will wander forever without ever reaching the moon."],["","And the people of the moon are just the same."],["","With this, none of the moon's people should be able to reach the Earth."],["","This is one of my greatest secret spells. The Earth has become a gigantic sealed chamber."]],
			12:[["YUKARI:","She's just like that rabbit from before. There's so many lunatics in here."],["REIMU:","So, Yukari. Let's beat her up quick, and head back to the Earth."]],
			13:[["EIRIN:","Oh, it looks like you want to play with me now."],["","I'm afraid I lack the power to play forever, but..."],["","Even so, I can play until morning."]],
			14:[["YUKARI:","I wouldn't mind playing forever. But some other time..."],["EIRIN:","Now, the dawn of Gensokyo is at hand!"]],
			15:[["<b>Eirin Yagokoro DEFEATED</b>"],["KAGUYA:","What are you playing at!?"],["<b>Kaguya Houraisan ENTERS</b>"],["KAGUYA:","Eirin, I grant you one more chance with my power."],["","If you lose this time..."],["","You there, human and youkai!"],["","With the medicine made by my power, and Eirin's true strength, you'll never forget this as long as you live!"],["<b>Eirin Yagokoro REVIVES</b>"]],
			16:[["<b>Eirin Yagokoro DEFEATED</b>"],["<b>Normal Ending #5</b>"]]
		}
		let out = []
		function countByRarity(rarity) {
			let out = 0
			for (let i of Object.keys(secretAchievementList)) {if (g.secretAchievement[i]&&(secretAchievementList[i].rarity===rarity)) {out++}}
			return out
		}
		let storyOrder = [6,12,5,8,15,1,10,3,11,2,4,13,9,14,16,7]
		for (let r=1;r<7;r++) {
			for (let n=0;n<[1,5,4,3,2,1][r-1];n++) {
				let num = 10+10*n
				let rarity = r+n+1
				out.push([114+out.length,{
					name:"Medallion of Numbers Going Up, Part "+String(storyOrder[out.length]).padStart(2,"0")+" of 16",
					description:"Have "+num+" "+secretAchievementRarityNames[r]+" secret achievements",
					event:"secretMeta",
					check:function(){return (countByRarity(r)>=num)},
					flavor:dialogueGen(flavors[storyOrder[out.length]]),
					noQuotes:true,
					rarity:rarity
				}])
			}
		}
		return Object.fromEntries(out)
	})()
}
const achievementEvents = (()=>{
	let out = {}
	for (let i of achievement.all) {
		let e = achievement(i).event
		if (e===undefined) {continue}
		if (out[e]===undefined) {out[e]=[]}
		out[e].push(i)
	}
	return out
})()
const secretAchievementEvents = (()=>{
	let out = {}
	for (let i of Object.keys(secretAchievementList)) {
		let e = secretAchievementList[i].event
		if (e===undefined) {continue}
		if (out[e]===undefined) {out[e]=[]}
		out[e].push(i)
	}
	return out
})()
function updateAchievementsTab() {
	let tiers = Object.keys(achievementList);
	for (let tier of tiers) {
		if (((achievement.ownedInTier(tier)===0)&&(!g.achievement[achievement.initial[tier]]))||((achievement.ownedInTier(tier)===Object.keys(achievementList[tier]).length)&&(!g.completedAchievementTiersShown))) {
			d.display("div_achTier"+tier,"none");
		} else {
			d.display("div_achTier"+tier,"inline-block");
			d.innerHTML("span_ownedTier"+tier+"Achievements",achievement.ownedInTier(tier).toFixed(0));
			let list = Object.keys(achievementList[tier]);
			for (let ach of list) {
				if (achievement.visible(ach)) {
					d.display("div_achievement"+ach,"inline-block");
					d.element("div_achievement"+ach).style["background-color"] = g.achievement[ach]?"rgba(0,255,0,0.5)":"rgba(102,102,102,0.2)";
					let bgcolor=[[1,3],[3,5],[5,7]].map(x=>parseInt(achievement.tierColors[tier].dark.substring(x[0],x[1]),16))
					let realbgcolor=g.achievement[ach]?[bgcolor[0]/2,bgcolor[1]/2+128,bgcolor[2]/2]:bgcolor.map(x=>x*0.8+20.4)
					d.element("div_achievement"+ach).style.color = blackOrWhiteContrast(realbgcolor.join(","));
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
	if (breakpoints.length === 3) {
		if (x.gte(breakpoints[1])) return c.d1
		let start = breakpoints[0].layerplus(-breakpoints[2])
		let end = breakpoints[1].layerplus(-breakpoints[2])
		return Decimal.div(Decimal.sub(x.layerplus(-breakpoints[2]),start),Decimal.sub(end,start))
	} else {
		return Decimal.div(x.layerplus(-breakpoints[1]),breakpoints[0].layerplus(-breakpoints[1])).sub(c.d1)
	}
}
yellowLight.affected = achievement.all.filter(x=>achievement(x).yellowBreakpoints!==undefined)
yellowLight.currentAffected
yellowLight.effectHTML = function(id,a,b) {
	if (a.eq(b)||(lightTiersUnlocked()<2)) {return achievement(id).effectFormat(achievement(id).effect())}
	return arrowJoin("<span class=\"big\" style=\"font-size:110%;color:#cccc00\">"+achievement(id).effectFormat(achievement(id).effect(a))+"</span>","<span class=\"yellow\" style=\"font-size:110%\">"+achievement(id).effectFormat(achievement(id).effect(b))+"</span>")
}
function showAchievementInfo(id) {
	alignTooltip("achievementInfo","div_achievement"+id)
	let colors = achievement.tierColors[achievement.tierOf(id)]
	let info = d.element("achievementInfo").style
	info["background-color"] = colors.dark
	info.color = colors.light
	info["border-color"] = colors.light
	let ach = achievement(id)
	let txt = ["<h3 style=\"margin:2px;\">"+ach.name+"</h3>"+((achievement(id).failed===undefined)?"":"<div style=\"font-size:10px;white-space:break-spaces;\">(Showing this achievement on the progress bar will prevent it from being failed.)</div>"),"<b>Requirement</b><br>"+ach.description];
	if (ach.reward !== undefined) {
		let rewardText = [ach.effect===undefined?ach.reward:(showFormulas&&ach.formulaText!==undefined)?ach.reward.replaceAll("{}",formulaFormat(ach.formulaText())):yellowLight.affected.includes(String(id))?ach.reward.replaceAll("{}",yellowLight.effectHTML(id,c.d0,achievement(id).yellowValue)):(ach.effectFormat===undefined)?ach.reward:ach.reward.replaceAll("{}",ach.effectFormat(ach.effect()))]
		if ((ach.yellowBreakpoints!==undefined)&&(lightTiersUnlocked()>1)) {if(ach.yellowBreakpoints[0].lte(g.lumens[5])) {
			let limitReached = (ach.yellowBreakpoints.length===3)?ach.yellowBreakpoints[1].lte(g.lumens[5]):false
			let from0 = ach.yellowBreakpoints[0].eq(c.d0)
			let text = (limitReached&&from0)?("Affected by yellow lumens up to "+ach.yellowBreakpoints[1].format())
			:(limitReached&&(!from0))?("Affected by yellow lumens from "+ach.yellowBreakpoints[0].format()+" to "+ach.yellowBreakpoints[1].format())
			:((!limitReached)&&from0)?("Affected by yellow light")
			:("Affected by yellow lumens above "+ach.yellowBreakpoints[0].format())
			rewardText.push("<span style=\"color:#cccc00\">("+text+")</span>")
		}}
		txt.push("<b>Reward</b><br>"+rewardText.join("<br>"));
	}
	let raw = ach.progress()
	let percent = Array.isArray(raw)?raw:((typeof raw) === "object")?raw.percent:undefined
	let tooltip = ((typeof raw) === "string")?raw:(((typeof raw) === "object")&&(!Array.isArray(raw)))?raw.text:undefined
	if (percent!==undefined) {percent = ((typeof percent)==="number")?(percent.toFixed(3)+"%"):(percent[0].toFixed(3)+"% ("+percent[1].noLeadFormat(3)+" / "+percent[2].noLeadFormat(3)+")")}
	let req = (((percent!==undefined)&&(tooltip!==undefined))?(percent+" ("+tooltip+")"):(percent!==undefined)?percent:(tooltip!==undefined)?tooltip:functionError("showAchievementInfo",arguments))
	if (g.achievement[id]) {
		txt.push("<b>Progress</b><br>"+((((typeof achievement(id).milestones)==="undefined")?true:(achievement(id).milestones()===achievement(id).maxMilestones))?"<span style=\"color:#00cc00\">Completed!</span>":("<span><span style=\"color:#00cccc\">"+achievement(id).milestones()+" / "+achievement(id).maxMilestones+" milestones reached</span><br><span style=\"color:#ffcc00\">"+req+"</span></span>")));
	} else {
		txt.push("<b>Progress</b><br><span style=\"color:#ffcc00;\">"+req+"</span>");
	}
	if (ach.flavor!==undefined&&g.achievement[id]) {txt.push("<div style=\"font-size:10px;white-space:break-spaces;color:"+blackOrWhiteContrast(hexToRGB(colors.dark))+"\">\""+ach.flavor+"\"</div>");}
	d.innerHTML("achievementInfo",txt.join("<hr>"))
}
function addAchievement(x) {
	if (achievement(x).beta&&(!betaActive)) return
	if (achievement(x).check()&&(!g.achievement[x])) {
		g.achievement[x]=true;0
		let tier = achievement.tierOf(x)
		let colors = achievement.tierColors[tier]
		notify("Achievement Get! \""+achievement(x).name+"\" ["+x+"]",colors.dark,colors.light);
		if (achievement.ownedInTier(tier)===Object.keys(achievementList[tier]).length) notify("You have completed all "+achievement.tierName(tier)+" achievements!",colors.dark)
		if ((tier==="5")&&achievement.ownedInTier(5)===15) {updateResearchTree();generateResearchCanvas();}
		updateAchievementsTab();
		d.display("span_noAchievements","none")
		totalAchievements = Object.values(g.achievement).map(x=>x?1:0).sum()
		if (achievement.tierOf(x)===5) {if (wormholeMilestoneList[achievement.ownedInTier(5)]!==undefined) {
			let milestone = wormholeMilestoneList[achievement.ownedInTier(5)]
			notify("You have unlocked a new Wormhole Milestone! "+(milestone.notification??milestone.text??milestone.static)+".","#000099","#ffffff")
		}}
		achievement.perAchievementReward[tier].currentVal = achievement.perAchievementReward[tier].calc(achievement.ownedInTier(tier))
	}
}
function addAchievements(evt) {
	for (let i of achievementEvents[evt]??[]) addAchievement(i)
	for (let i of secretAchievementEvents[evt]??[]) addSecretAchievement(i)
}
function validAchievement(id) {
	try {achievement(id)} catch {return false}
	if (achievement(id) === undefined) return false
	return true
}
function addSecretAchievement(x) {
	if (secretAchievementList[x].check()&&(!g.secretAchievement[x])) {
		g.secretAchievement[x]=true;
		let colors = secretAchievementRarityColors[secretAchievementList[x].rarity]
		notify("Secret Achievement Get! \""+secretAchievementList[x].name+"\" ("+secretAchievementRarityNames[secretAchievementList[x].rarity]+")",colors.dark,colors.light)
		updateSecretAchievementsTab();
		totalSecretAchievements = Object.values(g.secretAchievement).map(x=>x?1:0).sum()
		addAchievements("secretMeta")
	}
}
function showSecretAchievementInfo(id) {
	alignTooltip("secretAchievementInfo","div_secretAchievement"+id)
	let info = d.element("secretAchievementInfo").style
	let ach = secretAchievementList[id]
	let colors = secretAchievementRarityColors[ach.rarity]
	info["background-color"] = colors.dark
	info.color = colors.light
	info["border-color"] = colors.light
	let txt = ["<h3 style=\"text-decoration:underline;font-weight:700;margin:0px;\">"+ach.name+"</h3><span style=\"font-size:75%\">"+secretAchievementRarityNames[ach.rarity]+" 〜 "+ach.rarity+" point"+((ach.rarity===1)?"":"s")+"</span>","<b>Requirement</b><br>"+ach.description];
	if (ach.reward !== undefined) {txt.push("<b>Reward</b><br>"+ach.reward);}
	txt.push("<div style=\"font-size:75%;color:"+blackOrWhiteContrast(hexToRGB(colors.dark))+"\">"+(ach.noQuotes?"":"\"")+ach.flavor+(ach.noQuotes?"":"\"")+"</div>");
	d.innerHTML("secretAchievementInfo",txt.join("<hr style=\"color:inherit;opacity:0.5;\">"))
}