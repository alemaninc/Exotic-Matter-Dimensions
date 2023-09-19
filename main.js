"use strict";
const basesave = {
	exoticmatter:c.d100,
	exoticmatterThisStardustReset:c.d0,
	exoticmatterThisWormholeReset:c.d0,
	exoticmatterThisSpacetimeReset:c.d0,
	totalexoticmatter:c.d0,
	XAxis:c.d0,
	YAxis:c.d0,
	ZAxis:c.d0,
	WAxis:c.d0,
	VAxis:c.d0,
	UAxis:c.d0,
	TAxis:c.d0,
	SAxis:c.d0,
	masteryPower:c.d0,
	baseMasteryPowerGain:c.d0,
	activeMasteries:[null,0,0,0,0,0,0,0,0,0,0],
	masteryContainerStyle:"Legacy",
	masteryIdsShown:true,
	masteryBoostsShown:true,
	masteryActivityShown:true,
	masteryRowsReversed:false,
	timePlayed:0,
	truetimePlayed:c.d0,
	featuresUnlocked:[],
	colortheme:"Default",
	footerDisplay:"All tabs",
	timeThisStardustReset:0,
	truetimeThisStardustReset:c.d0,
	fastestStardustReset:c.d9e15,
	timeThisWormholeReset:0,
	truetimeThisWormholeReset:c.d0,
	fastestWormholeReset:c.d9e15,
	timeThisSpacetimeReset:0,
	truetimeThisSpacetimeReset:c.d0,
	fastestSpacetimeReset:c.d9e15,
	storySnippets:[],
	timeLeft:0,
	dilatedTime:0,
	dilationPower:1,
	dilationUpgrades:[null,0,0,0,0],
	dilationUpgradesUnlocked:0,
	notation:"Mixed scientific",
	newsTickerActive:true,
	newsTickerSpeed:80,
	zipPoints:0,
	zipPointMulti:1,
	version:null,
	topResourcesShown:{
		exoticmatter:true,
		masteryPower:false,
		stardust:true,
		darkmatter:false,
		hr:true,
	},
	glowOptions:{
		buyAxis:true,
		emptyMasteryRow:true,
		overclock:false,
		buyStardustUpgrade:true,
		buyStar:true,
		assignStar:true,
		buyDarkAxis:true,
		gainDarkStar:true,
		observe:true,
		buyPermanentResearch:true,
		noChromaGeneration:true,
		createGalaxy:false,
		buyLuckRune:true,
		buyLuckUpgrade:false,
	},
	confirmations:{
		toggleMastery:false,
		stardustReset:false,
		ironWillStardustReset:true,
		buyStardustUpgrade:false,   // not a confirmation but whatever
		wormholeReset:false,
	},
	hotkeys:savefileHotkeyProperties(),
	achievement:Object.fromEntries(achievement.all.map(x=>[x,false])),
	secretAchievement:Object.fromEntries(Object.keys(secretAchievementList).map(x=>[x,false])),
	completedAchievementTiersShown:true,
	clickedInStudy1:false,
	StardustResets:0,
	TotalStardustResets:0,
	previousStardustRuns:{last10:[],wormhole:{fastest:previousPrestige.baseStardust(),highest:previousPrestige.baseStardust()},spacetime:{fastest:previousPrestige.baseStardust(),highest:previousPrestige.baseStardust()},eternity:{fastest:previousPrestige.baseStardust(),highest:previousPrestige.baseStardust()}},
	previousWormholeRuns:{last10:[],spacetime:{fastest:previousPrestige.baseWormhole(),highest:previousPrestige.baseWormhole(),efficientest:previousPrestige.baseWormhole()},eternity:{fastest:previousPrestige.baseWormhole(),highest:previousPrestige.baseWormhole(),efficientest:previousPrestige.baseWormhole()}},
	stardust:c.d0,
	stardustThisWormholeReset:c.d0,
	stardustThisSpacetimeReset:c.d0,
	totalstardust:c.d0,
	autosaveIsOn:true,
	stardustUpgrades:[0,0,0,0,0],
	showingCappedStardustUpgrades:true,
	axisAutobuyerOn:false,
	axisAutobuyerUpgrades:0,
	axisAutobuyerCaps:Array(12).fill("u"),
	stars:0,
	star:Object.fromEntries(starList.map(x=>[x,false])),
	starContainerStyle:"Legacy",
	starIdsShown:true,
	starActivityShown:true,
	darkmatter:c.d0,
	darkXAxis:c.d0,
	darkYAxis:c.d0,
	darkZAxis:c.d0,
	darkWAxis:c.d0,
	darkVAxis:c.d0,
	darkUAxis:c.d0,
	darkTAxis:c.d0,
	darkSAxis:c.d0,
	darkstars:c.d0,
	darkstarBulk:true,
	darkEnergy:c.d1,
	stelliferousEnergy:c.d1,
	gravitationalEnergy:c.d1,
	spatialEnergy:c.d1,
	neuralEnergy:c.d1,
	metaEnergy:c.d1,
	vacuumEnergy:c.d1,
	mentalEnergy:c.d1,
	dimensionalEnergy:c.d1,
	temporalEnergy:c.d1,
	hawkingradiation:c.d0,
	hawkingradiationThisSpacetimeReset:c.d0,
	totalhawkingradiation:c.d0,
	WormholeResets:0,
	TotalWormholeResets:0,
	last10WormholeRuns:[],
	ach505Progress:c.d0,
	shiningBrightTonight:true,
	ach519possible:true,
	ach524possible:true,
	ach525possible:true,
	ach526possible:true,
	darkAxisAutobuyerOn:false,
	darkAxisAutobuyerUpgrades:0,
	darkAxisAutobuyerCaps:Array(13).fill("u"),	// 13th item = dark stars
	stardustUpgradeAutobuyerOn:false,
	stardustUpgradeAutobuyerUpgrades:0,
	stardustUpgradeAutobuyerCaps:Array(5).fill("u"),
	starAutobuyerOn:false,
	starAutobuyerUpgrades:0,
	starAutobuyerCap:"u",
	starAllocatorOn:false,
	starAllocatorBuild:[],
	wormholeAutomatorOn:false,
	wormholeAutomatorMode:0,
	wormholeAutomatorValue:"1",
	stardustAutomatorOn:false,
	stardustAutomatorMode:0,
	stardustAutomatorValue:"1",
	research:Object.fromEntries(Object.keys(research).map(x=>[x,false])),
	researchVisibility:[],
	researchRespec:false,
	buyMaxResearch:false,
	researchLoadouts:(function(){
		let out = []
		for (let i=0;i<9;i++) out.push({
			name:"Loadout "+(i+1),
			savedResearch:[]
		})
		return out
	})(),
	totalDiscoveries:c.d0,
	spentDiscoveries:c.d0,
	observations:Array(4).fill(c.d0),
	knowledge:c.d0,
	activeStudy:0,
	studyCompletions:[null,0,0,0,0,0,0,0,0,0,0,0,0,0],
	completedStudiesShown:true,
	restoreResearchAfterStudy:false,
	chroma:Array(9).fill(c.d0),
	lumens:Array(9).fill(c.d0),
	activeChroma:null,
	showLightEffectsFrom0:false,
	haltChromaIfLacking:false,
	galaxies:0,
	highestGalaxies:0,
	highestGalaxiesSpacetime:0,
	ach711Progress:61,
	luckEssence:0,
	luckShards:c.d0,
	totalLuckRunes:Object.fromEntries(luckRuneTypes.map(x=>[x,c.d0])),
	spentLuckRunes:Object.fromEntries(luckRuneTypes.map(x=>[x,c.d0])),
	luckUpgrades:Object.fromEntries(luckRuneTypes.map(x=>[x,Object.fromEntries(luckUpgradeList[x].map(y=>[y,c.d0]))])),
	luckShardSpendFactor:c.d0,
	luckRuneSpendFactor:c.d0,
	prismatic:c.d0,
	prismaticUpgrades:Object.fromEntries(Object.keys(prismaticUpgrades).map(x=>[x,c.d0])),
	prismaticSpendFactor:c.d0,
	study9:{
		xp:c.d0,
		milestoneCompletions:[0,0,0],
		milestoneStartTimes:Array(3)
	},
	antimatter:c.d0,
	antiXAxis:c.d0,
	antiYAxis:c.d0,
	antiZAxis:c.d0,
	antiWAxis:c.d0,
	antiVAxis:c.d0,
	antiUAxis:c.d0,
	antiTAxis:c.d0,
	antiSAxis:c.d0,
};
var g = decimalStructuredClone(basesave); // "game"}
const empowerableAxis = ["Y"]
var timeSinceGameOpened = 0;								 // "halted" achievements were being awarded randomly on load
var totalAchievements = 0;
var totalSecretAchievements = 0;
var totalStars = 0;
var totalResearch = {
	temporary:0,
	permanent:0,
	overall:function(){return this.temporary+this.permanent}
}
var overclockSpeedupFactor = 1;
var secretAchievementPoints = 0;
var savecounter = 0; // will prevent save before load
var olddelta = Date.now()
var axisAutobuyerProgress = 0;
var energyTypes = ["dark","stelliferous","gravitational","spatial","neural","meta","vacuum","mental","dimensional","temporal"];
var energyResources = ["Exotic matter gain","Stardust gain","Dark matter gain","Free X axis","Mastery power gain","Energy gain","Hawking radiation gain","Knowledge gain","All axis costs","Tickspeed"];
var energyDeterminers = ["exotic matter","stardust","dark matter","X axis","mastery power","all energies","hawking radiation","knowledge","all axis","tickspeed"];
var energyHyper = [3,3,3,2,3,3,3,3,3,2];
var wormholeAnimationActive = false;
var wormholeAnimationStart = 0;
var darkAxisAutobuyerProgress = 0;
var stardustUpgradeAutobuyerProgress = 0;
var starAutobuyerProgress = 0;
var deltatime = 0;
var lagAchievementTicks = 0;
var fpsAchievementTicks = 0;
var themeAchievementCount = 0;

function gameClick() {
	g.clickedInStudy1=true
}
var overclockActive = false
var gameFrozen = false
const dilationUpgrades = [
	null,
	{
		tooltip:"Increase the limit of Overclock to {e}×",
		cost:function(x=g.dilationUpgrades[1]){return this.effect(x+1)*144},
		cap:22,
		effect:function(x=g.dilationUpgrades[1]){return Decimal.decibel(x+18).toNumber()},
		effectFormat:function(x=g.dilationUpgrades[1]){return this.effect(x).toFixed(0)},
		tickspeedNeeded:N(8)
	},
	{
		tooltip:"Overclock softcap starts {e} later",
		cost:function(x=g.dilationUpgrades[2]){return 1440+60*Math.max(0,Math.max(x,x*4-141)-23)+Math.max(0,Math.max(x,x*4-141)-23)**2*1.25},
		cap:84,
		effect:function(x=g.dilationUpgrades[2]){return Math.max(2*x,3*x-60)},
		effectFormat:function(x=g.dilationUpgrades[2]){return this.effect(x).toFixed(0)},
		tickspeedNeeded:N(128),
	},
	{
		tooltip:"The Overclock softcap is reduced by {e}%",
		cost:function(x=g.dilationUpgrades[3]){return 64800+43200*x},
		cap:10,
		effect:function(x=g.dilationUpgrades[3]){return x==10?0.1:x==0?1:Decimal.decibel(-x).toNumber()},
		effectFormat:function(x=g.dilationUpgrades[3]){return N((1-this.effect(x))*100).noLeadFormat(2)},
		tickspeedNeeded:N(32768)
	},
	{
		tooltip:"Tickspeed is increased by {e}%",
		cost:function(x=g.dilationUpgrades[4]){return 150+300*x},
		cap:24,
		effect:function(x=g.dilationUpgrades[4]){return x==24?c.d2:N(1+Math.round(x*4+x**2/144)/100)},
		effectFormat:function(x=g.dilationUpgrades[4]){return this.effect(x).sub(c.d1).mul(c.e2).toFixed(0)},
		tickspeedNeeded:c.d2pow31
	}
]
function buyDilationUpgrade(x) {
	if ((g.dilationUpgrades[x]<dilationUpgrades[x].cap)&&(g.dilatedTime>dilationUpgrades[x].cost())) {
		g.dilatedTime -= dilationUpgrades[x].cost()
		g.dilationUpgrades[x]++
	}
	updateOverclockScrollbar()
}
function unlockDilationUpgrade() {
	g.dilationUpgradesUnlocked++
	popup({
		text:"By reaching "+BEformat(dilationUpgrades[g.dilationUpgradesUnlocked].tickspeedNeeded)+"× tickspeed, you have unlocked a new Dilation Upgrade! Find it in the 'Offline Time' subtab.",
		buttons:[["Close",""]]
	})
}
function overclockToSoftcap() {
	g.dilationPower=Math.log2(stat.overclockSoftcap)
	updateOverclockScrollbar()
}
function toggleOverclock() {
	overclockActive = !overclockActive
	if (overclockActive&&gameFrozen) gameFrozen = false
}
function toggleFreeze() {
	gameFrozen = !gameFrozen
	if (overclockActive&&gameFrozen) overclockActive = false
}
function updateOverclockScrollbar() {
	d.element('dilationSpeedupFactor').max = Math.ceil(Math.log2(dilationUpgrades[1].effect())*1000)/1000
	d.element('dilationSpeedupFactor').value = g.dilationPower
}
function getRealOverclockSpeedup() {
	if (gameFrozen) {
		overclockSpeedupFactor = 0
		g.dilatedTime += deltatime
	} else if (overclockActive) {
		let added = stat.baseOverclockSpeedup-1
		let cost = stat.overclockCost*deltatime
		let affordable = Math.min(1,g.dilatedTime/cost)
		overclockSpeedupFactor = 1+added*affordable
		g.dilatedTime -= cost*affordable
		if (Math.abs(g.dilatedTime)<1e-12) g.dilatedTime = 0
		if (affordable<1) overclockActive = false
	} else {
		overclockSpeedupFactor = 1
	}
}
function wormholeAmplificationMultiplier() {
	return Math.floor(Math.min(2**d.element("wormholeAmplification").value,1+g.dilatedTime/g.timeThisWormholeReset))
}
function wormholeAmplificationCost() {
	return g.timeThisWormholeReset*(wormholeAmplificationMultiplier()-1)
}
const stardustUpgradeTooltip = [
	null,
	function(x=g.stardustUpgrades[0]) {
		return "Unlock a new Axis"
	},
	function(x=g.stardustUpgrades[1]) {
		return (x==0)?"Unlock axis autobuyer":("Keep "+(stat.stardustUpgrade2AxisRetentionFactor*100).toFixed(2)+"% of the "+axisCodes[x-1]+" Axis on Stardust reset")
	},
	function(x=g.stardustUpgrades[2]) {
		return "Unlock a new Stardust Boost"
	},
	function(x=g.stardustUpgrades[3]) {
		return (x==0)?"You can activate both first row Masteries simultaneously":(x==4)?"Unlock 2 new rows of Masteries":"Unlock a new row of Masteries"
	},
	function(x=g.stardustUpgrades[4]) {
		return (x==0)?"Unlock Dark Matter":("Unlock "+toTitleCase(energyTypes[x-1])+" Energy")
	}
]
const stardustUpgradeNames = [null,"Dimensional","Retention","Boost","Mastery","Progression"]
const baseStardustUpgradeCosts = [
	[c.d1_5e6,c.d4_5e10,c.e14,c.e20],
	[c.d50,c.e2,c.e4,c.e6,c.e8,c.e12,c.e16,c.e24,c.e100],
	[c.d3_3333e9,c.d1_5e16,c.e43,c.e75,c.e140,c.inf,c.ee4,c.ee5,c.ee6,N("6.66e6666666")],
	[c.d125,c.d2e7,c.d5e18,c.d1_5e61,c.e115],
	[c.d5e11,c.e60,c.e96,c.e175,c.d2_2222e222,c.e270,c.inf,c.ee5,c.e2e5,c.e5e5,c.e1_5e6]
]
function stardustUpgradeCost(x,y=g.stardustUpgrades[x-1]) {
	if (y>=stat["stardustUpgrade"+x+"Cap"]) return c.maxvalue
	let cost = baseStardustUpgradeCosts[x-1][y];
	if (achievement.ownedInTier(5) >= 9) cost = cost.dilate(stat.wormholeMilestone9Effect);
	if (StudyE(9)) cost = cost.pow(studies[9].experientiaEffect())
	if (g.achievement[602]&&x==3) cost = cost.pow(c.d0_9)
	if (g.achievement[520]&&y==0) cost = cost.root(achievement(520).effect());
	if (g.achievement[612]) cost = cost.pow(achievement(612).effect()**g.stars)
	if (g.achievement[519]) cost = cost.div(achievement(519).effect().pow(g.stars));
	return cost;
}
function effectiveStardustUpgrades() {      // for Study IV and certain achievements
	return g.stardustUpgrades.map((x,i)=>Math.max(x,[0,1,0,5,0][i])).sum()
}
function studyRewardHTML(studyNum,rewardNum,precisionOrCallback=2,completions=g.studyCompletions[studyNum]) {
	if (showFormulas) if (studies[studyNum].rewardFormulas!==undefined) if (studies[studyNum].rewardFormulas[rewardNum]!==undefined) return formulaFormat(studies[studyNum].rewardFormulas[rewardNum](completions))
	function format(n) {return (typeof precisionOrCallback=="number")?n.noLeadFormat(precisionOrCallback):precisionOrCallback(n)}
	if (completions == studies[0].effectiveMaxCompletions[studyNum]) return format(N(studies[studyNum].reward(rewardNum,completions)));
	return arrowJoin(format(N(studies[studyNum].reward(rewardNum,completions))),format(N(studies[studyNum].reward(rewardNum,completions+1))));
}
function studyPower(x){return Math.min(g.studyCompletions[x],3)}
function studyRewardBoost(studyNum,rewardNum) {
	if (rewardNum==2) return c.d1
	if (rewardNum==3) {
		let out = lightCache.currentEffect[0]
		let studyAchievements = [null,608,609,705,715]
		if (typeof studyAchievements[studyNum] == "number") if (g.achievement[studyAchievements[studyNum]]) out = out.div(c.d0_9)
		return out
	}
	functionError("studyRewardBoost",arguments)
}

function availableThemes() {
	let out = ["Default","Red","Green","Blue","Cyan","Magenta","Yellow","Light Gray","Dark Gray","Black","Light"];
	if (g.secretAchievement[16]) out.push("Wormhole");
	return out;
}
function selectOption(variable,values,flavor="mode",variableCallback=x=>x) {
	popup({
		text:"We're sorry to hear that you hate "+variableCallback(g[variable])+". Which "+flavor+" do you want to try on next?",
		buttons:values.map(x => [variableCallback(x),"g."+variable+"="+((typeof x=="string")?("'"+x+"'"):x)])
	})
}
function changeTheme() {
	popup({
		text:"We're sorry to hear that you hate "+g.colortheme+". Which theme do you want to try on next?",
		buttons:availableThemes().map(x => [x,"g.colortheme='"+x+"';theme()"])
	})
}
function theme() {
	let scheme = dictionary(g.colortheme,[
		["Default",["color:#39f","background:#190033"]],
		["Red",["color:#f00","background:#300"]],
		["Green",["color:#0f0","background:#030"]],
		["Blue",["color:#00f","background:#003"]],
		["Cyan",["color:#0ff","background:#033"]],
		["Magenta",["color:#f0f","background:#303"]],
		["Yellow",["color:#ff0","background:#330"]],
		["Light Gray",["color:#ccc","background:#666"]],
		["Dark Gray",["color:#666","background:#333"]],
		["Black",["color:#fff","background:#000"]],
		["Light",["color:#000","background:#fff"]],
		["Wormhole",["color:#39f","background-image:repeating-radial-gradient(circle at "+(viewportWidth/2)+"px "+(viewportHeight/2)+"px, #190033, #330066 "+(viewportDiagonalLength/20)+"px, #190033 "+(viewportDiagonalLength/10)+"px); background-size:cover"]]
	])
	document.body.style = scheme[0];
	d.element("background").style = scheme[1];
	themeAchievementCount++;
	addSecretAchievement(16);
}

const exoticmatterVariables = ["exoticmatter","totalexoticmatter","exoticmatterThisStardustReset","exoticmatterThisWormholeReset","exoticmatterThisSpacetimeReset"]
function incrementExoticMatter(x) {
	x=x.fix(0);
	for (let i of exoticmatterVariables) o.add(i,x)
}
function unlockFeature(x,condition) {
	if (!g.featuresUnlocked.includes(x)&&condition) {
		g.featuresUnlocked.push(x);
		openStory(x);
	}
}
function unlocked(x) {
	return g.featuresUnlocked.includes(x);
}
const storyEntries = {
	get ["Stardust"](){return "<p>The universe has collapsed due to negative mass, yielding "+BEformat(Decimal.add(g.stardust,stat.pendingstardust))+" atoms of <span class=\"_stardust\">Stardust</span>. This powerful resource will allow your exotic matter to increase faster than before - however, its creation has consumed all of your exotic matter and Stardust.</p><p>Due to radioactive decay, all your Stardust is destroyed each time you create more. As a result, you need more exotic matter to gain Stardust each time.</p><p><b class=\"blue\">Note that Masteries persist on all resets. Story entries which you have already seen can be accessed again in Options > Hotkeys.</b></p>"},
	"Dark Matter":"<p>You have just condensed 500 billion Stardust atoms into a <span class=\"_darkmatter\">particle with positive mass</span>.</p><p>It seems useless at first glance, but like your sprawling galaxies of fundamentally inert exotic matter, it can probably be formed into an Axis.</p>",
	get ["Energy"](){return "<p>Well, you have a universe<sup>"+BEformat(g.totalexoticmatter.log10().div(c.d80).floor())+"</sup> filled with exotic matter. But, you realise that all those particles have virtually no <span class=\"_energy\">Energy</span>!</p><p>The odd laws of physics that come with sixteen dimensions allow for energy to grow exponentially - unfortunately, the same sprawling sixteen-dimensional space must be filled with exorbitant amounts of it before it can help you in any way."},
	"Black hole":"<p>The large quantities of dark matter in your universe have resulted in the formation of a black hole.</p><p>At its current size it is of no use to you... but what if you add some dark matter to it? You feel tempted to try it 'in the name of <span class=\"_research\">science</span>'.</p>",
	"Hawking Radiation":"<p>Perhaps you acted too soon. The black hole grew in size until it consumed all the particles in your universe.</p><p>As the black hole evaporated, it created a wave of <span class=\"_wormhole\">Hawking radiation</span>.</p><p>For the first time since you started, you have no idea why you need this new resource. Perhaps it is time to conduct some <span class=\"_research\">research</span>?</p>",
	get ["Studies"](){return "<p>You decide that, for some Wormhole soon, you'll create a universe "+(visibleStudies().includes(1)?"and not interfere with it at all":visibleStudies().includes(2)?"with very limited star formation":"<span style=\"color:#ff0000\">error</span>")+". In theory this is a harmful idea, but you feel like doing this will give you <span style=\"color:#cc0000\">enlightenment</span>.</p>"},
	get ["Light"](){return "<p>Having traversed "+BEformat(N(g.TotalWormholeResets))+" universes, it's easy to feel as if you've \"seen it all\". You take a moment to appreciate the simple things in your existence, like the color of exotic matter... and you realise that it doesn't seem to have one. Everything is illuminated by the same constant gray light!</p><p>Surely there is a way to create <span style=\"background:-webkit-linear-gradient(0deg,#ff0000,#00ff00,#0000ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;\">color</span> in this place?</p>"},
	get ["Galaxies"](){return "<p>The dark matter has made your stars unstable, and now if you have more than 60 in close proximity to each other they'll all collapse.</p><p>You'll need to practice working with stronger, smaller <span class=\"_galaxies\">galaxies</span> to succeed.</p>"},
	get ["Luck"](){return "<p>In the beginning it was so easy to create <span class=\"_exoticmatter\">space</span>, to form <span class=\"_stars\">stars</span> and <span class=\"_research\">discover</span> the universe.</p><p>What has happened now? What was once enough exotic matter to create "+g.totalexoticmatter.mul(realAxisCostDivisor("X")).root(realAxisCostExponent("X")).div(c.d5).log(c.d6).floor().add(c.d1).format()+" metres of X axis now only provides "+maxAffordableAxis("X").format()+"; new observations come rarely, if at all. A galaxy of 61 stars will now never come to be, no matter how long you wait.</p><p>It's almost as if an <span class=\"blue\">invisible blue hand</span> is putting 'diminishing returns for balance' in your way to annoy you. But perhaps, if <span class=\"_luck\">luck</span> is not on your side, you can create your own?</p>"},
	get ["Prismatic"](){function c(x){return "<span class=\""+x+"\">"+x+"</span>"};return "<p>The exotic matter is now "+c("green")+"; hawking radiation is "+c("blue")+"; the stars are "+c("white")+" specks in the distance surrounded by nebulae of "+c("cyan")+" research papers. At the far end of the universe are dark "+c("red")+" rifts to the "+numword(visibleStudies().length)+" Study dimensions you've discovered, all against a backdrop of "+c("magenta")+" and "+c("yellow")+" crafted from the essence of pure achievement.</p><p>This is such an eyesore! It looks almost like something out of a coloring book... you feel determined to blend the <span class=\"_prismatic\">colors</span> together to create a beautiful universe, though you don't see how that will help you.</p>"},
	get ["Antimatter"](){"<p></p>"}
}
function openStory(x) {
	if (storyEntries[x]!==undefined) {
		g.overclockActive=false
		if (!g.storySnippets.includes(x)) g.storySnippets.push(x);
		popup({text:"<h1 id=\"storyTitle\">"+x+"</h1>"+storyEntries[x],buttons:[["Close",""]]})
	}
}
function showPreviousStory() {
	popup({
		text:"Which story entry would you like to see again?",
		buttons:g.storySnippets.map(x=>[x,"openStory('"+x+"')"])
	})
}
const axisEffectHTML = {
	X:"Exotic matter gain is multiplied by {e}",
	darkX:"Dark matter gain is multiplied by {e}",
	antiX:"Antimatter gain is multiplied by {e}",
	Y:"Increase X axis effect by +{e}×",
	YEmpowered:"Empowered Y axis multiply the X axis effect instead of adding to it",
	darkY:"All dark axis are {e}× cheaper",
	antiY:"Luck shard and prismatic gain is multiplied by {e}",
	Z:"Exotic matter gain is multiplied by {e} (based on exotic matter)",
	darkZ:"Dark matter gain is multiplied by {e} (based on exotic matter)",
	antiZ:"Multiply the anti-X axis effect by {e}",
	W:"Exotic matter gain is multiplied by {e} (increases over time)",
	darkW:"Mastery power gain is multiplied by {e}",
	darkWEmpowered:"Empowered Dark W axis multiply chroma gain by the same amount they multiply mastery power gain",
	antiW:"All anti-axis are {e}× cheaper (based on antimatter)",
	V:"All normal axis are {e}× cheaper",
	darkV:"Normal V axis is {e}% stronger",
	antiV:"Dark Y axis is {e}% stronger",
	U:"Stardust gain is multiplied by {e} (based on unspent stardust)",
	darkU:"Dark matter gain is multiplied by {e} per dark axis owned<br><span class=\"small\">(currently: {e2}×)</span>",
	antiU:"The anti-Z axis effect is multiplied by {e} per anti-axis owned<br><span class=\"small\">(currently: {e2}×)</span>",
	T:"Exotic matter gain is multiplied by {e} (based on total normal axis)",
	darkT:"Dark matter gain is multiplied by {e} (based on time this stardust reset)",
	antiT:"Knowledge gain is multiplied by {e}",
	S:"Exotic matter gain is raised to the power of {e}",
	darkS:"Dark matter gain is raised to the power of {e}",
	antiS:"Antimatter gain is raised to the power of {e}"
};
function realAxisCostDivisor(type) {
	let output = stat.axisCostDivisor;
	if (type=="X") output=output.mul(stat.stardustBoost5.pow(g.XAxis));
	if (type=="Y"&&g.achievement[312]) output=output.mul(stat.stardustBoost5.pow(g.YAxis.mul(c.d0_04)));
	return output;
}
function realAxisCostExponent(type) {
	let typeNum = axisCodes.indexOf(type)
	let output = stat.axisCostExponent;
	if (type=="S"&&g.research.r3_5) output = output.mul(researchEffect(3,5));
	if (typeNum<8) {
		let tier7res = ["r16_2","r15_2","r14_12","r13_2","r13_1","r14_1","r15_1","r16_1"][axisCodes.indexOf(type)]
		if (g.research[tier7res]) output = output.mul(researchEffect(researchRow(tier7res),researchCol(tier7res)))
	}
	for (let i of researchGroupList.spatialsynergism.effectors[type]) if (g.research[i]) output = output.div(research[i].value())
	return output;
}
function realAxisScalePower(type){return stat.axisScalingPower}
function realAxisSuperscalePower(type){
	let out=stat.axisSuperscalingPower
	if (type=="S") out=out.mul(c.d5)
	return out
}
function axisCost(type,axis) {
	axis = (axis == undefined)?g[type+"Axis"]:N(axis);
	let cost = null;
	axis = Decimal.semiexpScaling(axis,stat.axisSuperscalingStart,realAxisSuperscalePower(type));
	axis = Decimal.linearScaling(axis,stat.axisScalingStart,realAxisScalePower(type));
	if (type=="X") cost = c.d6.pow(axis).mul(c.d5);
	else if (type=="Y") cost = c.d1_5.pow(axis.simplex(2)).mul(c.e2);
	else if (type=="Z") cost = c.d10.pow(axis.pow(c.d1_379654224)).mul(c.e6);
	else if (type=="W") cost = c.d10.pow(axis.simplex(2)).mul(c.d5e7);
	else if (type=="V") cost = c.d10.pow(axis).mul(c.e20);
	else if (type=="U") cost = c.d10.pow(axis.pow(c.d1_5)).mul(c.e100);
	else if (type=="T") cost = axis.mul(c.d10).add(c.d180).pow10();
	else if (type=="S") cost = c.inf.pow(c.d1_25.pow(axis));
	else functionError("axisCost",type)
	cost = cost.pow(realAxisCostExponent(type));
	cost = cost.div(realAxisCostDivisor(type));
	return cost;
}
function maxAffordableAxis(type,em=g.exoticmatter) {
	if (axisCost(type).gte(em)&&em.eq(g.exoticmatter)) return g[type+"Axis"];
	let effective_EM = em.mul(realAxisCostDivisor(type)).root(realAxisCostExponent(type));
	let axis;			 // prevent "lexical declaration cannot appear in single-statement context"
	if (type=="X") axis = effective_EM.lte(c.d5)?c.dm1:effective_EM.div(c.d5).log(c.d6);
	else if (type=="Y") axis = effective_EM.lte(c.e2)?c.dm1:effective_EM.div(c.e2).log(c.d1_5).mul(c.d2).add(c.d0_25).sqrt().sub(c.d0_5);
	else if (type=="Z") axis = effective_EM.lte(c.e6)?c.dm1:effective_EM.log10().sub(c.d6).pow(c.d0_7248191884897692);
	else if (type=="W") axis = effective_EM.lte(c.d5e7)?c.dm1:effective_EM.div(c.d5e7).log10().mul(c.d2).add(c.d0_25).sqrt().sub(c.d0_5);
	else if (type=="V") axis = effective_EM.lte(c.e20)?c.dm1:effective_EM.log10().sub(c.d20);
	else if (type=="U") axis = effective_EM.lte(c.e100)?c.dm1:effective_EM.log10().sub(c.e2).pow(c.d2div3);
	else if (type=="T") axis = effective_EM.lte(c.e180)?c.dm1:effective_EM.log10().sub(c.d180).div(c.d10);
	else if (type=="S") axis = effective_EM.lte(c.inf)?c.dm1:effective_EM.log(c.d2).div(c.d1024).log(c.d1_25);
	else functionError("maxAffordableAxis",arguments);
	axis = Decimal.linearSoftcap(axis,stat.axisScalingStart,realAxisScalePower(type));
	axis = Decimal.semilogSoftcap(axis,stat.axisSuperscalingStart,realAxisSuperscalePower(type));
	return axis.floor().add(c.d1);
}
function buyAxis(x) {
	if ((g.exoticmatter.gte(axisCost(x)))&&(stat.axisUnlocked>axisCodes.indexOf(x))) {
		o.sub("exoticmatter",axisCost(x));
		o.add(x+"Axis",c.d1);
		unlockFeature("Masteries",g.XAxis.gt(c.d0));
	}
	if (g.SAxis.gt(c.d0)) g.ach525possible=false;
	if (axisCodes.map(x => g[x+"Axis"].eq(c.d0)).includes(false)) g.ach526possible=false;
	for (let i of achievementEvents.axisBuy) addAchievement(i);
}

function buyMaxAxis(caps) {
	let totalBefore = stat.totalNormalAxis;
	for (let j=0; j<stat.axisUnlocked; j++) {
		let amount = caps[j]=="u"?maxAffordableAxis(axisCodes[j]):Decimal.min(maxAffordableAxis(axisCodes[j]),N(caps[j]));
		if (amount=="NA") continue;
		if (amount.lte(g[axisCodes[j]+"Axis"])) continue;
		if (axisCost(axisCodes[j],amount.sub(c.d1)).lt(g.exoticmatter)) o.sub("exoticmatter",axisCost(axisCodes[j],amount.sub(c.d1)));
		g[axisCodes[j]+"Axis"]=amount;
	}
	g.exoticmatter=g.exoticmatter.max(c.d0); // maxAffordableAxis() doesn't seem to work properly because people are getting negative EM.
	if (g.SAxis.gt(c.d0)) g.ach525possible=false;
	for (let i of achievementEvents.axisBuy) addAchievement(i);
	if (axisCodes.map(x => g[x+"Axis"].eq(c.d0)).includes(false)) g.ach526possible=false;
	if (axisCodes.map(x => g[x+"Axis"]).sumDecimals().sub(totalBefore).gte(c.d4800)) addAchievement(530);
	unlockFeature("Masteries",g.XAxis.gt(c.d0));
}
var empoweredAxisBought = 0;
function buyEmpoweredAxis() {
	empoweredAxisBought++;
	for (let i=18;i<23;i++) addSecretAchievement(i);
}
const masteryData = {
	11:{icon:"<span class=\"_exoticmatter\">EM</span><sup>+</sup>"},
	12:{icon:"<span class=\"_exoticmatter\">A$</span><sup>-</sup>"},
	21:{icon:"<span class=\"_exoticmatter\">X</span><sup>+</sup>"},
	22:{icon:"<span class=\"_exoticmatter\">Y</span><sup>+</sup>"},
	31:{icon:"<span class=\"_exoticmatter\">Z</span><sup>+</sup>"},
	32:{icon:"<span class=\"_exoticmatter\">W</span><sup>+</sup>"},
	41:{icon:"<span class=\"_mastery\">M</span><span class=\"xscript\"><sup>+</sup><sub class=\"_mastery\">x1</sub></span>"},
	42:{icon:"<span class=\"_stardust\">S</span><sup>+</sup>",req:function(){return g.exoticmatterThisSpacetimeReset.gte(stat.stardustExoticMatterReq)||(g.StardustResets>0)||(g.WormholeResets>0)}},
	43:{icon:"<span class=\"_mastery\">M</span><span class=\"xscript\"><sup>+</sup><sub class=\"_mastery\">x2</sub></span>"},
	51:{icon:"<span class=\"_exoticmatter\">X</span><sup>+</sup>"},
	52:{icon:"<span class=\"_mastery\">M</span><span class=\"xscript\"><sup>+</sup><sub class=\"_mastery\">1x</sub></span>"},
	61:{icon:"<span class=\"_darkmatter\">X</span><sup>+</sup>"},
	62:{icon:"<span class=\"_darkmatter\">A</span><sup>-</sup>"},
	63:{icon:"<span class=\"_darkmatter\">DS$</span><sup>-</sup>"},
	71:{icon:"<span class=\"_energy\">E</span><sup>+</sup>"},
	72:{icon:"<span class=\"_energy\">E</span><sup>^</sup>"},
	81:{icon:"<span class=\"_exoticmatter\">X</span>→<span class=\"_mastery\">MP</span>"},
	82:{icon:"<span class=\"_exoticmatter\">EM</span>→<span class=\"_mastery\">MP</span>"},
	83:{icon:"<span class=\"_darkmatter\">DM</span>→<span class=\"_mastery\">MP</span>"},
	84:{icon:"<span class=\"_stardust\">S</span>→<span class=\"_mastery\">MP</span>"},
	85:{icon:"<span class=\"_mastery\">MP</span><sup>+</sup>"},
	91:{icon:"<span class=\"_time\">t</span>→<span class=\"_mastery\">M<sub>8x</sub></span>"},
	92:{icon:"<span class=\"_time\">t</span><sup>-1</sup>→<span class=\"_mastery\">M<sub>8x</sub></span>"},
	101:{icon:"<span class=\"_achievements\">A</span><span class=\"xscript\"><sup>+</sup><sub class=\"_achievements\">501</sub></span>"},
	102:{icon:"<span class=\"_wormhole\">HR</span><sup>+</sup>"},
	103:{icon:"<span class=\"_research\">K</span><sup>+</sup>"},
	104:{icon:"<span class=\"_stars\">L</span><sup>+</sup>",req:function(){return g.research.r10_11}},
	105:{icon:"<span class=\"_stars\">S$</span><sup>-</sup>",req:function(){return g.achievement[711]}}
}
const totalMasteryRows = Math.floor(Object.keys(masteryData).map(x => Number(x)).reduce((x,y) => Math.max(x,y))/10);
function fixMasteryArrays() {
	let masteryArrays = ["activeMasteries"];
	for (let i of masteryArrays) while (g[i].length<=totalMasteryRows) g[i].push(0);
}
fixMasteryArrays();
function deltaBaseMasteryPowerGain() {
	let out = stat.tickspeed;
	if (g.research.r6_5) out = out.mul(researchEffect(6,5).mul(totalAchievements).add(c.d1));
	return out;
}
function MasteryE(x) {
	x=Number(x)
	let row = Math.floor(x/10);
	if (g.activeMasteries[row]==0) return false;
	if (StudyE(8)) return g.activeMasteries[row]==(x%10) // ignore all "multi-activate" effects
	if (g.achievement[708]&&row==10&&[101,103].includes(x)&&[1,3].includes(g.activeMasteries[10])) return true
	return (g.activeMasteries[row]==(x%10))||masteredRow(row);
}
function masteredRow(x) {
	if (x==1) return g.stardustUpgrades[3]>0;
	if (x<=9) return g.star[[51,52,53,54,101,102,103,104][x-2]];
	return false;
}
function tryToggleMastery(x) {
	if (g.confirmations.toggleMastery&&(g.activeMasteries[row]>0)) {
		popup({
			text:"Are you sure you want to "+((x%10==0)?("unassign Row "+(x/10)+" Masteries"):("toggle Mastery "+x))+"?",
			buttons:[["Confirm","toggleMastery("+x+")"],["Close",""]]
		})
	} else {
		toggleMastery(x)
	}
}
function toggleMastery(x) {
	let row = Math.floor(x/10);
	if (!(x==g.activeMasteries[row])) {
		if ((g.activeMasteries[row]!==0)&&(!MasteryE(x))) masteryReset()
		g.activeMasteries[row]=x%10;
	}
	g.ach524possible=g.ach524possible&&achievement(524).active();
}
function masteryEffect(x) {
	if (x==11) return g.masteryPower.add(c.d1).pow(masteryBoost(11).mul(c.d0_1));
	if (x==12) return g.masteryPower.add(c.d1).pow(masteryBoost(12).mul(c.d0_15));
	if (x==21) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).dilate(c.d0_6).pow(masteryBoost(21).mul(c.d0_0175)),c.e50,c.d0_2);
	if (x==22) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).dilate(c.d0_6).pow(masteryBoost(22).mul(c.d0_035)),c.e100,c.d0_1);
	if ([31,32].includes(x)) return g.masteryPower.add(c.d1).log10().sqrt().mul(c.d0_75).mul(masteryBoost(x));
	if ([41,43].includes(x)) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).log10().div(c.d15),c.d1,c.d2).mul(masteryBoost(x)).add(c.d1);
	if (x==42) return g.masteryPower.add(c.e4).dilate(c.d0_5).div(c.e2).pow(masteryBoost(42));
	if (x==51) return g.masteryPower.add(c.d1).log10().pow(c.d0_6).mul(c.d2_5).mul(masteryBoost(51));
	if (x==52) {
		let out = g.masteryPower.add(c.d1).log10().pow(c.d0_4).mul(c.d2_5).mul(masteryBoost(52)).add(c.d1);
		if (g.research.r19_9) out = out.pow(researchEffect(19,9))
		return out
	}
	if (x==61) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d10).log10().pow(c.d0_1).sub(c.d1),c.d9,c.d2).mul(masteryBoost(61)).add(c.d1);
	if (x==62) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d10).log10().pow(c.d0_04),c.d2,c.d1).pow(masteryBoost(62).neg());
	if (x==63) return g.masteryPower.add(c.d1).log10().pow(c.d0_8).mul(masteryBoost(63));
	if (x==71) return g.masteryPower.pow(c.d1_25).add(c.e10).log10().log10().pow(masteryBoost(71));
	if (x==72) return Decimal.logarithmicSoftcap(g.masteryPower.pow(c.d1_25).add(c.e10).log10().log10().sqrt().sub(c.d1),c.d1,c.d5).mul(masteryBoost(72)).add(c.d1);
	if ([81,82,83,84].includes(x)) {
		let output = [g.masteryPower.add(c.d1).log10().sqrt(),[c.d0_03,c.d0_1,c.d0_2,c.d0_24][x-81],masteryBoost(x)].productDecimals();
		if (x==81) output = output.mul(g.XAxis.pow(c.d0_4));
		if (x==82) output = output.mul(g.exoticmatter.add(c.d10).log10().log10());
		if (x==83) output = output.mul(g.darkmatter.add(c.d10).log10().log10().pow(c.d0_75));
		if (x==84) output = output.mul(g.stardust.add(c.d10).log10().log10().sqrt());
		return Decimal.logarithmicSoftcap(output,c.e2,c.d1).pow10();
	}
	if (x==85) return [g.masteryPower.add(c.d10).log10().log10(),masteryBoost(85),c.d0_2].productDecimals();
	if (x==91) return g.masteryPower.add(c.d10).log10().log10().div(c.d10).mul(Decimal.mul(c.d0_3,g.truetimeThisStardustReset.add(c.d10).log10())).mul(masteryBoost(91)).add(c.d1);
	if (x==92) return g.masteryPower.add(c.d10).log10().log10().div(c.d10).div(Decimal.mul(c.d0_3,g.truetimeThisStardustReset.add(c.d10).log10())).mul(masteryBoost(92)).add(c.d1);
	if (x==101) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).log10().add(c.d1).pow(masteryBoost(101).div(c.d2)),c.d75,c.d2);
	if (x==102) return g.masteryPower.add(c.d1).dilate(c.d2div3).pow(masteryBoost(102).mul(c.d0_0175));
	if (x==103) return g.masteryPower.add(c.d10).dilate(c.d0_2).sub(c.d9).pow(masteryBoost(103));
	if (x==104) return masteryBoost(104).mul(g.masteryPower.gt(c.ee3)?g.masteryPower.log10().sub(c.d500):g.masteryPower.add(c.d1).log10().pow(c.d2).div(2000)).div(500).pow10()
	if (x==105) return c.d1.sub(g.masteryPower.add(c.d1).log10().div(c.e2).add(c.d10).log10().pow(c.d0_5)).mul(masteryBoost(105)).pow10()
	functionError("masteryEffect",arguments)
}
function masteryBoost(x) {
	x=Number(x)
	let row = Math.floor(x/10);
	let b=stat.knowledgeEffect.div(c.e2).add(c.d1);
	let excessMasteryResearch = ownedResearchInGroup("mastery").length-g.studyCompletions[8]
	if (excessMasteryResearch>0) b = b.mul(Math.max(0,1-excessMasteryResearch/3))
	// inter-row effects
	if ([11,21,31].includes(x)&&MasteryE(41)) b = b.mul(masteryEffect(41));
	if ([12,22,32].includes(x)&&MasteryE(43)) b = b.mul(masteryEffect(43));
	if (g.achievement[516]&&row>=2&&row<=9) if (g.star[[51,52,53,54,101,102,103,104][row-2]]) b = b.mul(c.d1_01);
	if (g.research.r6_11) {
		let row = Math.floor(x/10);
		let owned = 0
		for (let i=1;i<5;i++) if (g.star[row*10+i]) owned++;
		b = b.mul(researchEffect(6,11).div(c.e2).mul(owned).add(c.d1));
	}
	// single row effects
	if (row==1) {
		if (g.achievement[105]) b = b.mul(achievement(105).effect().div(c.e2).add(c.d1));
		if (MasteryE(52)) b = b.mul(masteryEffect(52))
		if ((x==11)&&g.research.r4_6) b = b.mul(researchEffect(4,6));
		if ((x==12)&&g.research.r4_10) b = b.mul(researchEffect(4,10));
	}
	if (row==2) {
		if (g.research.r5_13) b = b.mul(stat.spatialEnergyEffect.pow(researchEffect(5,13)));
	}
	if (row==4) {
		if (g.achievement[201]) b = b.mul(achievement(201).effect().div(c.e2).add(c.d1));
		if (x==42) b = b.mul(studies[4].reward(2))
	}
	if (x==52&&g.achievement[310]&&(!betaActive)) b = b.mul(c.d1_01);
	if (row==6) {
		if (g.research.r20_7&&x!==62) b = b.mul(researchEffect(20,7))
	}
	if (row==8) {
		for (let i of [91,92]) if (MasteryE(i)) b = b.mul(masteryEffect(i))
		if (x==85) b = b.mul(studies[8].reward(2).mul(achievement.ownedInTier(8)).div(c.e2).add(c.d1))
	}
	if (row==10) {
		b = b.mul(stat.stardustBoost11);
		if (achievement.ownedInTier(5)>=27) b = b.mul(wormholeMilestone27Effect().div(c.e2).add(c.d1));
		if (g.achievement[710]&&x==103) b = b.mul(betaActive?c.d9:c.d4);
		if (x==105) b = b.mul(achievement(711).effect())
		if (g.research.r20_9&&[102,104].includes(x)) b = b.mul(researchEffect(20,9))
	}
	return b.fix(c.d0);
}
const percentableMasteries = [41,43,61,72,91,92] // masteries with effects that can be formatted as a percentage
function masteryEffFormat(x) {
	let precision = [52,62,85,101,105].includes(x)?3:2
	let percentable = percentableMasteries.includes(x)
	let func = [].includes(x)?"noLeadFormat":"format"
	let eff = masteryEffect(x)
	if (percentable) {
		if (eff.gte(c.d10)) return eff[func](precision)+"×"
		return eff.sub(c.d1).mul(c.e2)[func](precision)+"%"
	}
	return eff[func](precision)
}
function masteryFormula(x) {
	if ([11,12].includes(x)) return "(MP + 1)<sup>"+masteryBoost(x).mul(x==12?c.d0_15:c.d0_1).noLeadFormat(3)+"</sup>"
	if ([21,22].includes(x)) {
		let out = "log(MP + 1)<sup>0.6</sup>"+formulaFormat.mult(masteryBoost(x).mul(x==22?c.d0_035:c.d0_0175))  // this is the exponent
		if (masteryEffect(x).gt(x==22?c.e100:c.e50)) out = "(("+out+" - "+(x==22?"100":"50")+") × "+(x==22?"0.23026":"0.46052")+" + 1)<sup>"+(x==22?"10":"5")+"</sup>"+formulaFormat.mult(x==22?c.e100:c.e50)
		else out = "10<sup>"+out+"</sup>"
		return out
	}
	if ([31,32].includes(x)) return "log(MP + 1)<sup>0.5</sup>"+formulaFormat.mult(masteryBoost(x).mul(c.d0_75))
	if ([41,43].includes(x)) return formulaFormat.logSoftcap("log(MP+1) ÷ 15",c.d1,c.d1,g.masteryPower.gte(c.e15))+formulaFormat.mult(masteryBoost(x))+" + 1"
	if (x==42) return "10<sup>(log(MP + "+c.e4.format()+")<sup>0.5</sup> - 2)"+formulaFormat.mult(masteryBoost(42))+"</sup>"
	if ([51,52].includes(x)) { 
		let out = "log(MP+1)<sup>0."+(x==52?"4":"6")+"</sup>"+formulaFormat.mult(masteryBoost(x).mul(c.d2_5))+(x==52?" + 1":"")
		if (x==52&&g.research.r19_9) out = "("+out+")"+formulaFormat.exp(researchEffect(19,9))
		return out
	}
	if (x==61) {
		if (masteryBoost(61).eq(c.d1)&&masteryEffect(61).lte(c.d10)) return "log(MP+10)<sup>0.1</sup>"
		let out = "log(MP+10)<sup>0.1</sup> - 1"
		if (g.masteryPower.gte(c.ee10)) out = "ln(("+out+") ÷ 9) × 2 + 1)<sup>0.5</sup>"
		return "("+out+") × "+(g.masteryPower.gte(c.ee10)?masteryBoost(61).mul(c.d9):masteryBoost(61)).noLeadFormat(3)+" + 1"
	}
	if (x==62) {
		if (g.masteryPower.gte("e33554432")) return "((ln(log(MP + 10)<sup>0.04</sup> ÷ 2) + 1) × 2)<sup>"+masteryBoost(62).neg().noLeadFormat(3)+"</sup>"
		return "log(MP+10)<sup>"+masteryBoost(62).mul(-0.04).noLeadFormat(3)+"</sup>"
	}
	if (x==63) return "log(MP+1)<sup>0.8</sup>"+formulaFormat.mult(masteryBoost(63))
	if (x==71) return "log<sup>[2]</sup>(MP<sup>1.25</sup> + "+c.e10.format()+")"+formulaFormat.exp(masteryBoost(71))
	if (x==72) return formulaFormat.logSoftcap("log<sup>[2]</sup>(MP + "+c.e10.format()+")<sup>0.5</sup> - 1",c.d1,c.d5,g.masteryPower.gt(c.ee4))+formulaFormat.mult(masteryBoost(72))+" + 1"
	if ([81,82,83,84].includes(x)) {
		let out = "log(MP + 1)<sup>0.5 "+formulaFormat.mult(masteryBoost(x).mul([c.d0_03,c.d0_1,c.d0_2,c.d0_24][x-81]))+" × "
		if (x==81) out += "X<sup>0.4</sup>"
		if (x==82) out += "log<sup>[2]</sup>(EM + 10)"
		if (x==83) out += "log<sup>[2]</sup>(DM + 10)<sup>0.75</sup>"
		if (x==84) out += "log<sup>[2]</sup>(S + 10)<sup>0.5</sup>"
		return "10<sup>"+formulaFormat.logSoftcap(out,c.e2,c.d1,masteryEffect(x).gt(c.e100))+"</sup>"
	}
	if (x==85) return "log<sup>[2]</sup>(MP + 10)"+formulaFormat.mult(masteryBoost(85).mul(c.d0_2))
	if (x==91) return "log<sup>[2]</sup>(MP + 10)"+formulaFormat.mult(masteryBoost(91).mul(c.d0_03))+" × log(t + 10) + 1"
	if (x==92) return "log<sup>[2]</sup>(MP + 10)"+formulaFormat.mult(masteryBoost(92).div(c.d3))+" ÷ log(t + 10) + 1"
	if (x==101) return formulaFormat.logSoftcap("log(MP + 10)"+formulaFormat.exp(masteryBoost(101).div(c.d2)),c.d75,c.d2,masteryEffect(101).gt(c.d75))
	if (x==102) return "10<sup>log(MP + 1)<sup>2 ÷ 3</sup>"+formulaFormat.mult(masteryBoost(102).mul(c.d0_0175))+"</sup>"
	if (x==103) return "(10<sup>log(MP + 10)<sup>0.2</sup></sup> - 9)"+formulaFormat.exp(masteryBoost(103))
	if (x==104) return "10<sup>("+(g.masteryPower.gt(c.ee3)?"log(MP) - 500":"log(MP + 1)<sup>2</sup> ÷ 2,000")+")"+formulaFormat.mult(masteryBoost(104).div(c.d500))+"</sup>"
	if (x==105) return masteryBoost(105).pow10().noLeadFormat(3)+"<sup>1 - log(log(MP + 10) ÷ 100 + 10)<sup>0.5</sup></sup>"
}

function masteryText(x) {
	x=Number(x)
	let out
	if (x==11) out = "Multiply exotic matter gain by {}";
	if (x==12) out = "All "+(unlocked("Dark Matter")?"normal axis":"axis")+" are {}× cheaper";
	if ([21,22].includes(x)) out = "Multiply the "+["X","Y"][x-21]+" axis effect by {}";
	if (x==31) out = "Gain {} free Z axis that do not increase the cost";
	if (x==32) out = "Gain {} free W axis that do not increase the cost";
	if (x==41) out = "Increase the effect of masteries 11, 21 and 31 by {}";
	if (x==42) out = "Multiply stardust gain by {}";
	if (x==43) out = "Increase the effect of masteries 12, 22 and 32 by {}";
	if (x==51) out = "Gain {} free X axis";
	if (x==52) out = "Raise the effects of the first row Masteries to the power of {}";
	if (x==61) out = "Dark X axis are {} stronger";
	if (x==62) out = "Dark axis costs are raised to the power of {}";
	if (x==63) out = "Subtract {} from the dark star cost";
	if (x==71) out = "Multiply energy gain by {}";
	if (x==72) out = "Energy effects are {} stronger";
	if ([81,82,83,84].includes(x)) out = "Multiply mastery power gain by {} (based on "+["X axis","exotic matter","dark matter","stardust"][x-81]+")";
	if (x==85) out = "Add {} to the base mastery power gain exponent<br><span class=\"small\">(currently a "+stat.masteryTimer.pow(masteryEffect(85)).format(2)+"× multiplier)</span>";
	if ([91,92].includes(x)) out = "Row 8 masteries are {} stronger ("+["in","de"][x-91]+"creases over time)";
	if (x==101) out = "The \"Wormhole to Somewhere\" achievement reward is raised to the power of {}";
	if (x==102) out = "Multiply Hawking radiation gain by {}";
	if (x==103) out = "Multiply knowledge gain by {}";
	if (x==104) out = "Multiply chroma gain by {}";
	if (x==105) out = "The star cost is raised to the power of {}";
	return out.replace("{}",showFormulas?("<i>"+masteryFormula(x)+"</i>"+(percentableMasteries.includes(x)?"×":"")):masteryEffFormat(x))
}
function masteryReset() {
	g.masteryPower=c.d0;
	g.baseMasteryPowerGain=c.d1;
}
var shownMastery
function showMasteryInfo(x,mode) {	/* mode 1 = text; mode 2 = button */
	if (mode & 1) {
		d.innerHTML("span_shownMasteryText",x==undefined?"":masteryText(x))
	}
	let row = Math.floor(x/10)
	if (mode & 2) {
		let out2
		if (masteredRow(row)) {
			if (MasteryE(x)) {
				out2="<button class=\"genericbutton\" onClick=\"g.activeMasteries["+row+"]=0;masteryReset()\">Unassign Row "+row+" Masteries</button>"
			} else {
				out2="<button class=\"genericbutton\" onClick=\"toggleMastery("+x+")\">Activate Row "+row+" Masteries</button>"
			}
		} else {
			if (MasteryE(x)) {
				out2="<button class=\"genericbutton\" onClick=\"g.activeMasteries["+row+"]=0;masteryReset()\">Unassign Mastery "+x+"</button>"
			} else if (g.activeMasteries[row]==0) {
				out2="<button class=\"genericbutton\" onClick=\"toggleMastery("+x+")\">Activate Mastery "+x+"</button>"
			} else {
				out2="<button class=\"genericbutton\" onClick=\"toggleMastery("+x+")\">Switch from Mastery "+(row*10+g.activeMasteries[row])+" to "+x+"</button>"
			}
		}
		d.innerHTML("button_enableShownMastery",out2)
	}
}
function updateMasteryLayout() {
	d.display("masteryPanel",g.masteryContainerStyle=="Modern"?"inline-block":"none")
	d.display("masteryContainerLegacy",g.masteryContainerStyle=="Legacy"?"inline-block":"none")
	d.display("masteryContainerModern",g.masteryContainerStyle=="Modern"?"inline-block":"none")
	for (let i of document.getElementsByClassName("masteryID"+g.masteryContainerStyle)) i.style.display=g.masteryIdsShown?"inline-block":"none"
	for (let i of document.getElementsByClassName("masteryBoost"+g.masteryContainerStyle)) i.style.display=g.masteryBoostsShown?"inline-block":"none"
	for (let i of document.getElementsByClassName("masteryActive"+g.masteryContainerStyle)) i.style.display=g.masteryActivityShown?"inline-block":"none"
}
function stardustExoticMatterReqText() {
	if (stat.pendingstardust.lte(g.stardust)||g.exoticmatter.lt(stat.stardustExoticMatterReq)) return "(Need "+BEformat(g.stardust.floor().add(c.d1).root(stat.stardustExponent).div(stat.stardustMultiplier).dilate(studies[4].reward(1).recip()).max(c.d10).mul(stat.stardustExoticMatterReq.div(c.d10)))+" exotic matter)";
	else if (stat.pendingstardust.lt(c.e3)) return "(Next at "+BEformat(stat.pendingstardust.add(c.d1).floor().root(stat.stardustExponent).div(stat.stardustMultiplier).dilate(c.d2).mul(stat.stardustExoticMatterReq.div(c.d10)))+" exotic matter)";
	return "";
}

const stardustVariables = ["stardust","stardustThisWormholeReset","stardustThisSpacetimeReset","totalstardust"]
function incrementStardust(x) {
	x=x.fix(c.d0);
	for (let i of stardustVariables) o.add(i,x)
}
function attemptStardustReset(showPopups=false) {
	if (stat.pendingstardust.gt(g.stardust)) {
		if ((g.confirmations.stardustReset||(g.confirmations.ironWillStardustReset&&stat.ironWill))&&showPopups) {
			popup({
				text:"Are you sure you want to "+((stat.ironWill&&g.achievement[501])?"forfeit your Iron Will run":"Stardust reset")+"?",
				buttons:[["Confirm","if (stat.pendingstardust.gt(g.stardust)) {stardustReset()} else {notify('Insufficient exotic matter to stardust reset!','#ff9900','#ffffff')}"],["Cancel",""]]     // stardust reset check must be done again because of autobuyers
			})
		} else {
			stardustReset()
		}
	} else {
		if (showPopups) notify("You must be able to gain stardust in order to reset!","#ff6600","#000000")
	}
}
function stardustReset() {
	if (g.timeThisStardustReset==0) return
	let stardustGained = stat.pendingstardust.gt(g.stardust)
	if (stardustGained) g.StardustResets++;
	g.TotalStardustResets++;
	unlockFeature("Stardust",true);
	unlockFeature("Stars",true);
	let summary = previousPrestige.generate(1)
	if (stardustGained) {
		g.previousStardustRuns.last10 = [summary].concat(g.previousStardustRuns.last10).slice(0,10)
		if (summary.time < g.previousStardustRuns.wormhole.fastest.time) g.previousStardustRuns.wormhole.fastest = summary
		if (summary.time < g.previousStardustRuns.spacetime.fastest.time) g.previousStardustRuns.spacetime.fastest = summary
		if (summary.time < g.previousStardustRuns.eternity.fastest.time) g.previousStardustRuns.eternity.fastest = summary
		if (summary.gain.gt(g.previousStardustRuns.wormhole.highest.gain)) g.previousStardustRuns.wormhole.highest = summary
		if (summary.gain.gt(g.previousStardustRuns.spacetime.highest.gain)) g.previousStardustRuns.spacetime.highest = summary
		if (summary.gain.gt(g.previousStardustRuns.eternity.highest.gain)) g.previousStardustRuns.eternity.highest = summary
		addAchievement(201);
		addAchievement(511);
		if (StudyE(7)) g.luckEssence += studies[7].luckEssenceGain()
		incrementStardust(stat.pendingstardust.floor().sub(g.stardust).max(c.d0))
		g.fastestStardustReset=Decimal.min(g.fastestStardustReset,g.timeThisStardustReset);
	}
	g.exoticmatter=c.d0;
	for (let i=0;i<8;i++) {
		g[axisCodes[i]+"Axis"]=(g.stardustUpgrades[1]>=i+2)?(Decimal.mul(g[axisCodes[i]+"Axis"],stat.stardustUpgrade2AxisRetentionFactor).floor()):c.d0;
	}
	g.masteryPower=c.d1;
	g.baseMasteryPowerGain=c.d1;
	g.exoticmatterThisStardustReset=c.d0;
	g.timeThisStardustReset=0;
	g.truetimeThisStardustReset=c.d0;
	for (let i of energyTypes.slice(0,6)) g[i+"Energy"] = StudyE(3)?c.d1:g[i+"Energy"].pow(studies[3].reward(2))
	addSecretAchievement(1);
}
function stardustBoostBoost(x) {
	let out = c.d1;
	if (x==1) if (g.achievement[507]) out=out.mul(achievement(507).effect().div(c.e2).add(c.d1));
	if (x==4) if (g.achievement[508]) out=out.mul(achievement(508).effect().div(c.e2).add(c.d1));
	if (x==7) {
		if (g.achievement[509]) out=out.mul(achievement(509).effect().div(c.e2).add(c.d1));
		if (g.research.r5_14) out=out.mul(Decimal.pow(stat.neuralEnergyEffect,researchEffect(5,14)))
	}
	if (x%3==0) if (g.research.r13_11) out = out.mul(researchEffect(13,11))
	return out;
}
const stardustBoostText = [
	null,
	"Exotic matter gain is multiplied by {v}",
	"Y Axis is {v}{t} stronger",
	"W Axis is {v}{t} stronger",
	"Stardust gain is multiplied by (mastery&nbsp;power)<sup>{v}</sup><br><span class=\"small\">(current total: ×{t})</span>",
	"X Axis base price ratio is divided by {v}<br><span class=\"small\">(overall: {t}× cheaper)</span>",
	"Dark Z Axis is {v}{t} stronger",
	"Mastery power gain is multiplied by {v}<sup>s<sup id=\"span_stardustBoost7FakeExp\"></sup></sup>, where s = "+unbreak("(seconds in this stardust reset)")+"<br><span class=\"small\">(current total: ×{t})</span>",
	"V Axis is {v}{t} stronger",
	"Dark stars are {v}× cheaper",
	"Increase the exponent of the Z axis effect formula by {v}",
	"Row 10 Masteries are {v}% stronger",
	"Increase the exponent of the hawking radiation gain formula by {v}"
]
function formatStardustBoost(x){
	let val = stat["stardustBoost"+x]
	if ([2,3,6,8].includes(x)) return (val.gte(c.d10)?val:val.sub(c.d1).mul(c.e2)).noLeadFormat(2)
	return val.noLeadFormat([7,10,12].includes(x)?4:[4,9].includes(x)?3:2)
}
const showStardustBoostFormula = {
	1:function(){
		let mult1 = "(1 + S ÷ 10)<sup>0.5</sup>"
		let mult2 = g.stardust.gt("ee6.6666666666")?("Ξ<sup>[2]</sup>"+formulaFormat.convSoftcap("log<sup>[2]</sup>(S + 1) × 1.5 - 1",c.d9,c.d12,true)):"10<sup>log(S + 1)<sup>1.5</sup> × 0.1</sup>"
		let base = stardustBoostBoost(1).eq(c.d1)?(mult1+" × "+mult2):("("+mult1+" × "+mult2+")<sup>"+stardustBoostBoost(1).noLeadFormat(3))
		if (stat.stardustBoost1.lt(c.ee12)) return base
		return "Ξ<sup>[2]</sup>"+formulaFormat.convSoftcap("log<sup>[2]</sup>("+base+")",c.d12,c.d15,true)
	},
	2:function(){return "(1 + log(S + 1) × 0.075)"+formulaFormat.exp(stardustBoostBoost(2))},
	3:function(){return "("+formulaFormat.linSoftcap("log(S ÷ "+c.e7.format()+" + 1)<sup>0.7</sup> ÷ 2",c.d10,c.d1,g.stardust.gt(1.6324e79))+" + 1)"+formulaFormat.exp(stardustBoostBoost(3))},
	4:function(){return "(log(S<sup>0.05</sup> + 10)<sup>1 ÷ 3</sup> - 1)"+formulaFormat.mult(stardustBoostBoost(4))},
	5:function(){return "("+formulaFormat.linSoftcap("10<sup>log(S × "+c.e24.format()+" + "+c.e64.format()+")<sup>2 ÷ 3</sup> - 16</sup>",c.inf,c.d1,g.stardust.gt("7.56e5814"))+")"+formulaFormat.exp(stardustBoostBoost(5))},
	6:function(){return "log<sup>[2]</sup>(S<sup>0.15</sup> + "+c.e10.format()+")"+formulaFormat.exp(stardustBoostBoost(6))},
	7:function(){return "log(S + 10)"+formulaFormat.exp(stardustBoostBoost(7).div(c.e2))},
	8:function(){return "log<sup>[2]</sup>(S + "+c.e100.format()+")"+formulaFormat.exp(stardustBoostBoost(8).mul(c.d5))+formulaFormat.mult(N(1/32).pow(stardustBoostBoost(8)))},
	9:function(){return "(log(S + "+c.e100.format()+") ÷ 100)"+formulaFormat.exp(stardustBoostBoost(9).mul(c.d0_4))},
	10:function(){return formulaFormat.convSoftcap("(log<sup>[2]</sup>(S + "+c.ee3.format()+") - 3)"+formulaFormat.mult(stardustBoostBoost(10).div(c.d10)),c.d0_5,c.d1,stat.stardustBoost10.gt(c.d0_5))},
	11:function(){return formulaFormat.convSoftcap("(log<sup>[2]</sup>(S + "+c.ee4.format()+") - 4)"+formulaFormat.mult(stardustBoostBoost(11).div(c.d10)),c.d1_5,c.d2,stat.stardustBoost11.gt(c.d2_5))+" + 1"},
	12:function(){return formulaFormat.convSoftcap("(log<sup>[2]</sup>(S + "+c.ee5.format()+") - 5)"+formulaFormat.mult(stardustBoostBoost(12)),c.d0,c.d1,true)}
}
function stardustBoost7Exp(x) {
	x=(x==undefined)?g.truetimeThisStardustReset:N(x)
	return Decimal.logarithmicSoftcap(x.pow(c.d0_5),c.e3,c.d4,c.d1)
}
function stardustBoost7IsSoftcapped(){
	return g.truetimeThisStardustReset.gt(c.e6)
}
function buyStardustUpgrade(x) {
	if (g.stardust.gt(stat["stardustUpgrade"+x+"Cost"])&&(g.stardustUpgrades[x-1]<stat["stardustUpgrade"+x+"Cap"])) {
		if (stat["stardustUpgrade"+x+"Cost"].lt(c.inf.recip())) addAchievement(716)
		o.sub("stardust",stat["stardustUpgrade"+x+"Cost"]);
		g.stardustUpgrades[x-1]++;
		updateStat("stardustUpgrade"+x+"Cost")
		unlockFeature("Dark Matter",g.stardustUpgrades[4]>0);
		unlockFeature("Energy",g.stardustUpgrades[4]>1);
	}
	for (let i of achievementEvents.stardustUpgrade) addAchievement(i);
}
const autobuyers = {
	axis:{baseInterval:5,baseCost:c.e25,costGrowth:c.d1_05,resource:"exoticmatter",unlockReq:function(){return g.stardustUpgrades[1]>0;}},
	darkAxis:{baseInterval:5,baseCost:c.e25,costGrowth:c.d1_05,resource:"darkmatter",unlockReq:function(){return achievement.ownedInTier(5)>=1;}},
	stardustUpgrade:{baseInterval:30,baseCost:c.e100,costGrowth:c.d1_1,resource:"stelliferousEnergy",unlockReq:function(){return achievement.ownedInTier(5)>=3;}},
	star:{baseInterval:15,baseCost:c.e25,costGrowth:c.d1_08,resource:"stardust",unlockReq:function(){return achievement.ownedInTier(5)>=4;}}
};
const autobuyerMeta = {
	cost:function(id){return [autobuyers[id].baseCost,autobuyers[id].costGrowth,N(g[id+"AutobuyerUpgrades"])].decimalPowerTower();},
	interval:function(id){return Math.max(0.1,autobuyers[id].baseInterval*0.95**g[id+"AutobuyerUpgrades"]);},
	cap:function(id){return Math.ceil(Math.log(0.1/autobuyers[id].baseInterval)/Math.log(0.95));}
};
function upgradeAutobuyer(id) {
	while ((g[autobuyers[id].resource].gt(autobuyerMeta.cost(id))) && (g[id+"AutobuyerUpgrades"]<autobuyerMeta.cap(id))) {
		o.sub(autobuyers[id].resource,autobuyerMeta.cost(id));
		g[id+"AutobuyerUpgrades"]++;
	}
}
const stardustAutomatorModes = ["Amount of stardust","Real time in this Stardust","X times (current stardust)","(current stardust)<sup>X</sup>"]
const wormholeAutomatorModes = ["Amount of HR","Real time in this Wormhole","X times (current HR)","(current HR)<sup>X</sup>"]
function inputStarAllocatorBuild() {
	inputStarAllocatorBuild.order =  []
	popup({
		text:"Select the stars in the order you want them autobought:<br><table>"+countTo(10).map(r=>"<tr>"+countTo(4).map(c=>"<td><button style=\"height:24px;width:24px;border-radius:50%;font-size:9px;padding:0px\" id=\"button_inputStarAllocatorBuild_"+(10*r+c)+"\" onClick=\"inputStarAllocatorBuild.toggle("+(10*r+c)+")\">"+(10*r+c)+"</button></td>").join("")+"</tr>").join("")+"</table>",
		buttons:[["Confirm","g.starAllocatorBuild=structuredClone(inputStarAllocatorBuild.order);notify('Build saved successfully')"],["Cancel",""]]
	})
}
inputStarAllocatorBuild.order = []
inputStarAllocatorBuild.toggle = function(id){
	if (inputStarAllocatorBuild.order.includes(id)) {
		inputStarAllocatorBuild.order.remove(id)
		d.element("button_inputStarAllocatorBuild_"+id).className = ""
	} else {
		inputStarAllocatorBuild.order.push(id)
		d.element("button_inputStarAllocatorBuild_"+id).className = "legacy ownedstarbutton"+Math.floor(id/10)
	}
}
function importStarAllocatorBuild() {
	popup({
		text:"Paste your star build here:",
		input:"",
		buttons:[["Submit","g.starAllocatorBuild=popupInput().split(',').map(x=>Number(x))"],["Cancel",""]]
	})
}
function exportStarAllocatorBuild() {
	popup({
		text:"Here is your star allocator build:",
		input:g.starAllocatorBuild.join(","),
		buttons:[["Close",""]]
	})
}
function starCost(x=g.stars,gal=g.galaxies) {
	if (x>=60) return c.maxvalue
	x=N(x)
	let effx=x
	if (g.research.r8_14) effx = effx.sub(researchEffect(8,14).toNumber());
	if (x.sign==-1) effx = c.d0;
	let formula_exponent = StudyE(2)?[c.d3,c.d4,c.d5,c.d6][studyPower(2)]:c.d2;
	let scaling_power = c.d2_5;
	scaling_power = scaling_power.mul(c.d1.sub(studies[2].reward(1).div(c.e2)));
	if (g.research.r7_8) scaling_power = scaling_power.mul(researchEffect(7,8));
	let scaling_start = g.achievement[703]?achievement(703).effect():c.d25
	let cost = Decimal.pow(c.d2,Decimal.exponentialScaling(Decimal.superexpScaling(effx,scaling_start,scaling_power),c.d10,c.d0_5).pow(formula_exponent).add(c.d10)).pow(effx.gte(c.d10)?c.d1_5:c.d1);
	cost = cost.mul(galaxyEffects[3].penalty.value(gal).pow(x)).pow(galaxyEffects[1].penalty.value(gal))
	// hyper-4 cost reductions
	if (achievement.ownedInTier(5) >= 9) cost = cost.dilate(stat.wormholeMilestone9Effect);
	// hyper-3 cost reductions
	if (StudyE(9)) cost = cost.pow(studies[9].experientiaEffect())
	if (g.research.r6_2) cost = cost.root(stat.stelliferousEnergyEffect.pow(researchEffect(6,2)));
	if (g.research.r7_11) cost = cost.pow(researchEffect(7,11).pow(g.darkstars));
	if (g.research.r13_7) cost = cost.pow(researchEffect(13,7))
	if (g.achievement[612]) cost = cost.pow(achievement(612).effect()**g.stardustUpgrades.sum())
	cost = cost.pow(lightCache.currentEffect[6])
	if (g.achievement[701]&&x<40) cost = cost.pow(0.6+x/100)
	if (MasteryE(105)) cost = cost.pow(masteryEffect(105))
	cost = cost.pow(luckUpgrades.quatrefolium.star.eff())
	// hyper-2 cost reductions
	if (g.achievement[519]) cost = cost.div(achievement(519).effect().pow(g.stardustUpgrades.sum()));
	if (g.achievement[702]) cost = cost.div(achievement(702).effect().pow(x**2))
	return cost;
}
function buyStar() {
	if (g.stardust.gt(starCost())) {
		o.sub("stardust",starCost());
		g.stars++;
		for (let i of achievementEvents.starBuy) addAchievement(i);
		for (let i of secretAchievementEvents.starBuy) addSecretAchievement(i);
		if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false;
	}
}
function affordableStars(gal=g.galaxies) {
	for (let i=59;i>=0;i--) if (starCost(i,gal).lt(g.stardust)) return i+1
	return 0
}
function buyStarUpgrade(x) {
	if (starList.includes(x) && (unspentStars() > 0) && availableStarRow(Math.floor(x/10)) && (!g.star[x])) {
		g.star[x] = true;
		g.ach519possible = false;
		totalStars++
	}
	if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false;
	addAchievement(412);
}
function respecStars() {
	stardustReset();
	for (let i of starList) g.star[i]=false;
	totalStars=0
}
function importStars() {
	popup({
		text:"Import your star build here:",
		input:"",
		buttons:[
			["Confirm","let starBuild = popupInput().split(',');for (let i of starBuild) buyStarUpgrade(Number(i))"],
			["Close",""]
		]
	})
}
function exportStars() {
	openExport(starList.filter(x=>g.star[x]).join(","));
}
function maxFullStarRows() {
	for (let i=1;i<11;i++) if (maxStars(i)==4) for (let j=1;j<5;j++) buyStarUpgrade(i*10+j);
}
const dynamicStars = [11,12,13,14,42,61,62,63,64,71,72,73,74,91,92,93,94]
function row1StarPower(x) {
	let exp = c.d3
	if (g.star[x+20]) exp = exp.mul(c.d3);
	if (g.star[x+80]) exp = exp.mul(starEffect(90));
	exp = exp.mul(achievement.perAchievementReward[2].currentVal);
	exp = exp.mul(galaxyEffects[1].boost.value())
	return exp
}
function starEffect(x) {
	if ([11,12,13,14].includes(x)) {
		let exp = row1StarPower(x), mult;
		if (x==11) mult = Decimal.sub(c.d1,g.exoticmatter.add(c.d1).mul(c.e10).log10().log10().pow(c.dm1));
		else if (x==12) mult = g.exoticmatter.add(c.d1).mul(c.e10).log10().log10().pow(c.dm1);
		else if (x==13) mult = Decimal.sub(c.d1,g.truetimeThisStardustReset.div(c.e3).add(c.d1).pow(c.dm1));
		else if (x==14) mult = g.truetimeThisStardustReset.div(c.e3).add(c.d1).pow(c.dm1);
		return exp.mul(mult).pow10();
	}
	if (x==60) return Decimal.convergentSoftcap(Decimal.logarithmicSoftcap(g.exoticmatter.pow(c.d0_02).add(c.d10).log10().pow(c.d0_7),c.e3,c.d0_5),c.d7e3,c.d8e3);
	if (x==64) return Decimal.convergentSoftcap(g.exoticmatter.add(c.d10).log10().pow(c.d0_1),c.d1,c.d3);
	if ([71,72,73,74].includes(x)) {
		let ef;
		if (x==71) ef = g.masteryPower.pow(c.sqrt0_1).add(c.d10).log10().log10().mul(c.d22_5);
		else if (x==72) ef = g.exoticmatter.fix(c.d0).add(c.d10).log10().log10().pow(c.d2).mul(c.d1_5);
		else if (x==73) ef = g.stardust.add(c.d10).log10().log10().mul(c.d8);
		else if (x==74) ef = g.truetimeThisStardustReset.add(c.d1).log10().mul(c.d7_5);
		if (g.research.r6_10) ef=ef.mul(researchEffect(6,10).div(c.e2).add(c.d1));
		return Decimal.convergentSoftcap(ef,c.d75,c.e2);
	}
	if (x==90) return g.exoticmatter.add(c.d1).log10().pow(c.d0_75).div(c.e2).add(c.d1).pow(studies[2].reward(2));
	functionError("starEffect",arguments)
}
function formatStarEffect(x) {
	if (x==42) return c.e18.format()
	if ([61,62,63].includes(x)) return starEffect(60).format(2)
	if (Math.floor(x/10)==9) return starEffect(90).format(2)
	return starEffect(x).format(x==64?3:2)
}
function showStarEffectFormula(x) {
	if (x==42) return c.e18.format()
	if ([11,12,13,14].includes(x)) {
		let modifier
		if (x==11) modifier = " × (1 - 1 ÷ log<sup>[2]</sup>((EM + 1) × "+c.e10.format()+"))"
		if (x==12) modifier = " ÷ log<sup>[2]</sup>((EM + 1) × "+c.e10.format()+")"
		if (x==13) modifier = " × (1 - 1 ÷ (1 + t ÷ 1,000))"
		if (x==14) modifier = " ÷ (1 + t ÷ 1,000)"
		return "10<sup>"+row1StarPower(x).noLeadFormat(3)+modifier+"</sup>"
	}
	if ([61,62,63].includes(x)) return formulaFormat.convSoftcap(formulaFormat.logSoftcap("log(EM<sup>0.02</sup> + 10)<sup>0.7</sup>",c.e3,c.d0_5,starEffect(60).gt(c.e3)),c.d7e3,c.d8e3,starEffect(60).gt(c.d7e3))
	if (x==64) return formulaFormat.convSoftcap("log(EM + 10)<sup>0.1</sup>",c.d1,c.d3,true) // always softcapped
	if ([71,72,73,74].includes(x)) {
		let power = g.research.r6_10?researchEffect(6,10).div(c.e2).add(c.d1):c.d1,out
		if (x==71) out = "log<sup>[2]</sup>(MP<sup>0.31623</sup> + 10)"+formulaFormat.mult(power.mul(c.d22_5))
		if (x==72) out = "log<sup>[2]</sup>(EM + 10)<sup>2</sup>"+formulaFormat.mult(power.mul(c.d1_5))
		if (x==73) out = "log<sup>[2]</sup>(S + 10)"+formulaFormat.mult(power.mul(c.d8))
		if (x==74) out = "log(t + 1)"+formulaFormat.mult(power.mul(c.d7_5))
		return formulaFormat.convSoftcap(out,c.d75,c.e2,starEffect(x).gt(c.d75))
	}
	if ([91,92,93,94].includes(x)) {
		let out = "log(EM + 1)<sup>0.75</sup> ÷ 100 + 1"
		if (studies[2].reward(2).gt(c.d1)) out = "("+out+")<sup>"+studies[2].reward(2).noLeadFormat(3)
		return out
	}
}
function showStarInfo(x) {d.innerHTML("starPanel",starText(x).replace("{x}",dynamicStars.includes(x)?(showFormulas?formulaFormat(showStarEffectFormula(x)):formatStarEffect(x)):null)+(g.star[x]?"":("<br><button class=\"genericbutton\" onClick=\"buyStarUpgrade("+x+");showStarInfo("+x+")\">Buy Star "+x+"</button>")))}
function updateStarLayout() {
	d.display("starPanel",g.starContainerStyle=="Modern"?"inline-block":"none")
	d.display("starContainerLegacy",g.starContainerStyle=="Legacy"?"inline-block":"none")
	d.display("starContainerModern",g.starContainerStyle=="Modern"?"inline-block":"none")
	for (let i of document.getElementsByClassName("starID"+g.starContainerStyle)) i.style.display=g.starIdsShown?"inline-block":"none"
	for (let i of document.getElementsByClassName("starActive"+g.starContainerStyle)) i.style.display=g.starActivityShown?"inline-block":"none"
}
const starIcons = (()=>{
	let classes = {
		sup:x=>"<sup>"+x+"</sup>",
		sub:x=>"<sub>"+x+"</sub>",
		xscript:(t,d)=>"<span class=\"xscript\"><sup>"+t+"</sup><sub>"+d+"</sub></span>",
	}
	let basicclasslist = ["exoticmatter","time","mastery","stardust","stars","darkmatter"]
	for (let i of basicclasslist) classes[i] = function(x){return "<span class=\"_"+i+"\">"+x+"</span>"}
	let icon = {
		plus:classes.sup("+"),
		minus:classes.sup("-"),
		inv:classes.sup("-1"),
		exoticmatter:classes.exoticmatter("EM"),
		axis:x=>classes.exoticmatter(axisCodes[x]),
		axiscost:classes.exoticmatter("A$"),
		time:classes.time("t"),
		tickspeed:classes.time("Δt"),
		mastery:x=>classes.mastery("M"+classes.sub(x)),
		masteryPower:classes.mastery("MP"),
		stardust:classes.stardust("S"),
		star:x=>classes.stars("★"+classes.sub(x)),
		darkaxis:x=>classes.darkmatter(axisCodes[x]),
		darkaxiscost:classes.darkmatter("A$")
	}
	let out = []
	for (let i=11;i<15;i++) out.push([i,(i>12?icon.time:icon.exoticmatter)+[icon.inv,""][i%2]+"→"+icon.exoticmatter])
	for (let i=21;i<25;i++) out.push([i,icon.axis(i-21)+icon.plus])
	for (let i=31;i<35;i++) out.push([i,icon.star("")+classes.xscript(icon.plus,classes.stars(i-20))])
	for (let i=41;i<45;i++) out.push([i,(i>42?icon.stardust:icon.exoticmatter)+["+","^"][i%2]+"</sup>"])
	for (let i=51;i<55;i++) out.push([i,icon.mastery(i-49)])
	for (let i=61;i<65;i++) out.push([i,icon.exoticmatter+"→"+icon.axis(i-57)])
	for (let i=71;i<75;i++) out.push([i,[icon.masteryPower,icon.exoticmatter,icon.stardust,icon.time][i-71]+"→"+icon.tickspeed])
	out.push([81,icon.axiscost+icon.minus])
	out.push([82,icon.axis(4)+icon.plus])
	out.push([83,icon.darkaxiscost+icon.minus])
	out.push([84,icon.darkaxis(1)+icon.plus])
	for (let i=91;i<95;i++) out.push([i,icon.exoticmatter+"→"+icon.star(i-80)])
	for (let i=101;i<105;i++) out.push([i,icon.mastery(i-95)])
	return Object.fromEntries(out)
})()
function starText(x) {
	if ([11,12,13,14].includes(x)) return "Exotic matter gain is multiplied by {x} ("+["de","in"][x%2]+"creases with "+(x>12?"time in this stardust reset":"exotic matter")+")";
	if ([21,22,23,24].includes(x)) return "Gain 3 free "+axisCodes[x-21]+" axis";
	if ([31,32,33,34].includes(x)) return "Cube the effect of star "+(x-20)+" (two above this)";
	if (x==41) return "Exotic matter gain is raised to the power of 1.05";
	if (x==42) return "Exotic matter gain is multiplied by {x}";
	if (x==43) return "Stardust gain is raised to the power of 1.05";
	if (x==44) return "Stardust gain is multiplied by 100";
	if ([51,52,53,54].includes(x)) return "You can activate all "+["second","third","fourth","fifth"][x-51]+" row Masteries";
	if ([61,62,63].includes(x)) return "Gain {x} free "+axisCodes[x-57]+" axis (based on exotic matter)";
	if (x==64) return "Gain {x} free S axis (based on exotic matter)";
	if ([71,72,73,74].includes(x)) return "The game runs {x}% faster (based on "+["mastery power","exotic matter","stardust","time in this stardust reset"][x-71]+")";
	if ([81,83].includes(x)) return (x==83?"Dark":"Normal")+" axis costs are raised to the power of 0.8";
	if ([82,84].includes(x)) return (x==84?"Dark Y":"Normal V")+" axis is 3 times stronger";
	if ([91,92,93,94].includes(x)) return "The effect of star "+(x-80)+" is raised to the power of {x} (based on exotic matter)";
	if ([101,102,103,104].includes(x)) return "You can activate all "+["sixth","seventh","eighth","ninth"][x-101]+" row Masteries";
	functionError("starText",arguments)
}
function starRowsShown() {
	return Array.removeDuplicates(countTo(40).map(x=>starRow(x))).slice(0,Array.removeDuplicates(countTo(Math.min(g.stars,40)).map(x=>starRow(x))).length+1).sort((a,b)=>a-b)
};
function unspentStars() {
	return g.stars-totalStars
}
function starRow(index) {
	if (!StudyE(2)) return [1,1,2,1,2,3,1,2,3,4,2,3,4,5,3,4,5,6,4,5,6,7,5,6,7,8,6,7,8,9,7,8,9,10,8,9,10,9,10,10][index-1];
	if (studyPower(2)==0) return [1,1,2,1,1,2,3,2,2,3,4,3,3,4,5,4,4,5,6,5,5,6,7,6,6,7,8,7,7,8,9,8,8,9,10,9,9,10,10,10][index-1];
	if (studyPower(2)==1) return [1,1,1,2,1,2,2,3,2,3,3,4,3,4,4,5,4,5,5,6,5,6,6,7,6,7,7,8,7,8,8,9,8,9,9,10,9,10,10,10][index-1];
	if (studyPower(2)==2) return Math.floor(index/4+0.75);
	return [3,3,9,3,9,2,3,9,2,4,9,2,4,5,2,4,5,6,4,5,6,7,5,6,7,8,6,7,8,1,7,8,1,10,8,1,10,1,10,10][index-1];
}
function maxStars(row) {
	let output=0;
	for (let i=0;i<Math.min(g.stars,40);i++) if (starRow(i+1)==row) output++;
	return output;
}
function availableStarRow(row) {
	return (maxStars(row)>[1,2,3,4].map(x=>g.star[x+10*row]?1:0).sum());
}
const empowerableDarkAxis = ["W"];
function buyDarkAxis(x) {
	if (g.darkmatter.gt(darkAxisCost(x))&&(4+g.stardustUpgrades[0]>axisCodes.indexOf(x))) {
		o.sub("darkmatter",darkAxisCost(x));
		o.add("dark"+x+"Axis",c.d1);
	}
	if (g.darkSAxis.gt(c.d0)) g.ach525possible=false;
	for (let i of achievementEvents.axisBuy) addAchievement(i);
}
function buyMaxDarkAxis(caps) {
	for (let j=0; j<4+g.stardustUpgrades[0]; j++) {
		let amount = caps[j]=="u"?maxAffordableDarkAxis(axisCodes[j]):Decimal.min(maxAffordableDarkAxis(axisCodes[j]),N(caps[j]));
		if (amount=="NA") continue;
		if (amount.lte(g["dark"+axisCodes[j]+"Axis"])) continue;
		if (darkAxisCost(axisCodes[j],amount.sub(c.d1)).lt(g.darkmatter)) o.sub("darkmatter",darkAxisCost(axisCodes[j],amount.sub(c.d1)));
		g["dark"+axisCodes[j]+"Axis"]=amount;
	}
	if (g.darkSAxis.gt(c.d0)) g.ach525possible=false;
	for (let i of achievementEvents.axisBuy) addAchievement(i);
}
function darkStarEffect1(x=stat.realDarkStars) {
	return studies[4].reward(3).mul(x).div(c.d20).add(c.d1)
}
function darkStarEffect3SoftcapInc() {	
	let out = c.d10
	if (g.achievement[803]) out = out.mul(c.d1_03)
	return out
}
function darkStarEffect3(x) {
	x=(x==undefined)?stat.realDarkStars:N(x);
	if (x.lte(c.e2)) return x;
	let inc = darkStarEffect3SoftcapInc()
	return Decimal.convergentSoftcap(x.div(inc).sub(c.d9).ln().mul(inc).add(c.e2),c.d150,c.d200);
}
function darkStarEffectHTML() {
	let v1 = stat.realDarkStars;
	let v2 = realDarkStars(stat.maxAffordableDarkStars.max(g.darkstars.add(c.d1)));
	let eff2 = darkAxisBoostedNextStar()
	let eff3text = arrowJoin(darkStarEffect3(v1).noLeadFormat(4),darkStarEffect3(v2).noLeadFormat(4))
	let eff3inc = darkStarEffect3SoftcapInc()
	if (showFormulas&&v2.gte(c.e2)) eff3text = formulaFormat(formulaFormat.convSoftcap("100 + ln(★ ÷ "+eff3inc.noLeadFormat(3)+" - 9) × "+eff3inc.noLeadFormat(3),c.d150,c.d200,darkStarEffect3().gt(c.d150))) 
	return [
		"The base gain of dark matter will become "+arrowJoin(darkStarEffect1(v1).sub(c.d1).mul(c.e2).noLeadFormat(2),darkStarEffect1(v2).sub(c.d1).mul(c.e2).noLeadFormat(2))+"% stronger",
		 (eff2.length==8?"All dark":("Dark "+eff2.joinWithAnd()))+" axis will become stronger",
		 "You will gain "+eff3text+"% more free axis from dark matter"
	].join("<br>");
}
function realDarkAxisScalePower(type){
	let out=stat.darkAxisScalingPower
	if (type=="S") out=out.mul(c.d2)
	return out
}
function realDarkAxisSuperscalePower(type){
	let out=stat.darkAxisSuperscalingPower
	if (type=="W") out=out.mul(c.d3)
	if (type=="S") out=out.mul(c.d5)
	return out
}
function darkAxisCost(type,axis) {
	if (axis == undefined) axis = g["dark"+type+"Axis"];
	let cost = null;
	axis = Decimal.semiexpScaling(axis,stat.darkAxisSuperscalingStart,realDarkAxisSuperscalePower(type));
	axis = Decimal.linearScaling(axis,stat.darkAxisScalingStart,realDarkAxisScalePower(type));
	if (type=="X") cost = axis.pow(c.d1_2).add(c.d1).pow10();
	else if (type=="Y") cost = Decimal.pow(c.e2,axis.add(c.d1));
	else if (type=="Z") cost = axis.add(c.d10).pow10();
	else if (type=="W") cost = axis.pow(c.d1_5).add(c.d15).pow10();
	else if (type=="V") cost = axis.pow(c.d1_25).add(c.d30).pow10();
	else if (type=="U") cost = axis.pow(c.d2).add(c.d45).pow10();
	else if (type=="T") cost = axis.mul(c.d4).add(c.e2).pow10();
	else if (type=="S") cost = [c.inf,c.d1_2,axis].decimalPowerTower();
	else error("Cannot access darkAxisCost("+type+")")
	cost=cost.pow(realDarkAxisCostExponent(type));
	cost=cost.div(realDarkAxisCostDivisor(type));
	return cost;
}
function realDarkAxisCostDivisor(type) {
	let output = stat.darkAxisCostDivisor;
	return output;
}
function realDarkAxisCostExponent(type) {
	let typeNum = axisCodes.indexOf(type)
	let output = stat.darkAxisCostExponent;
	if (type=="S"&&g.research.r3_11) output = output.mul(researchEffect(3,11));
	if (typeNum<8) {
		let tier7res = ["r16_14","r15_14","r14_14","r13_14","r13_15","r14_15","r15_15","r16_15"][typeNum]
		if (g.research[tier7res]) output = output.mul(researchEffect(researchRow(tier7res),researchCol(tier7res)))
	}
	for (let i of researchGroupList.spatialsynergism.effectors["dark"+type]) if (g.research[i]) output = output.div(research[i].value())
	return output;
}
function maxAffordableDarkAxis(type,dm=g.darkmatter) {
	if (darkAxisCost(type).gte(dm)&&dm.eq(g.darkmatter)) return g["dark"+type+"Axis"];
	let effective_DM = dm.mul(realDarkAxisCostDivisor(type)).root(realDarkAxisCostExponent(type));
	let axis;			 // prevent "lexical declaration cannot appear in single-statement context"
	if (type=="X") axis = effective_DM.lte(c.d10)?c.dm1:effective_DM.log10().sub(c.d1).pow(c.d5div6);
	else if (type=="Y") axis = effective_DM.lte(c.e2)?c.dm1:effective_DM.log10().div(c.d2).sub(c.d1);
	else if (type=="Z") axis = effective_DM.lte(c.e10)?c.dm1:effective_DM.log10().sub(c.d10);
	else if (type=="W") axis = effective_DM.lte(c.e15)?c.dm1:effective_DM.log10().sub(c.d15).pow(c.d2div3);
	else if (type=="V") axis = effective_DM.lte(c.e30)?c.dm1:effective_DM.log10().sub(c.d30).pow(c.d0_8);
	else if (type=="U") axis = effective_DM.lte(c.e45)?c.dm1:effective_DM.log10().sub(c.d45).sqrt();
	else if (type=="T") axis = effective_DM.lte(c.e100)?c.dm1:effective_DM.log10().sub(c.e2).div(c.d4);
	else if (type=="S") axis = effective_DM.lte(c.inf)?c.dm1:effective_DM.log(c.d2).div(c.d1024).log(c.d1_2);
	else error("Cannot access maxAffordableDarkAxis("+type+")")
	axis = Decimal.linearSoftcap(axis,stat.darkAxisScalingStart,realDarkAxisScalePower(type));
	axis = Decimal.semilogSoftcap(axis,stat.darkAxisSuperscalingStart,realDarkAxisSuperscalePower(type));
	return axis.floor().add(c.d1);
}
function darkStarPriceMod(type) {
	let output;
	if (type=="sub") {
		output=c.d0;
		if (MasteryE(63)) output=output.add(masteryEffect(63));
	} else if (type=="div") {
		output=stat.stardustBoost9;
		if (g.achievement[512]) output=output.div(0.9975**g.stars);
		if (g.research.r6_3) output=output.mul(stat.gravitationalEnergyEffect.pow(researchEffect(6,3)));
		if (g.research.r16_12) output=output.mul(researchEffect(16,12))
		output = output.mul(luckUpgrades.quatrefolium.darkstar.eff())
	} else if (type=="pow") {
		output = StudyE(9)?studies[9].experientiaEffect():c.d1
	} else {
		error("Cannot access darkStarPriceMod("+type+")")
	}
	return output;
}
function darkStarReq(x) {
	x=(x==undefined)?g.darkstars:N(x);
	if (x.gt(stat.darkStarScalingStart)) {
		let start=stat.darkStarScalingStart
		let power=stat.darkStarScalingPower;
		x=x.sub(start).mul(power.add(c.d1)).add(start);
		x=Decimal.exponentialScaling(x,start,power);
	}
	let cost=[c.d36,x.mul(c.d5_5),x.pow(c.d2).div(c.d8)].sumDecimals();
	return cost.pow(darkStarPriceMod("pow")).div(darkStarPriceMod("div")).sub(darkStarPriceMod("sub")).ceil().max(c.d0);
}
function darkStarReqFormula() {
	let start = stat.darkStarScalingStart, power = stat.darkStarScalingPower
	let out = g.darkstars.gte(start) ? formulaFormat.expScaling("★"+formulaFormat.mult(power.add(c.d1))+formulaFormat.add(start.mul(power).neg()),start,power,true) : "★"
	out = "(("+out+" + 22)<sup>2</sup> - 196)"+formulaFormat.exp(darkStarPriceMod("pow"))+formulaFormat.mult(N(0.125).div(darkStarPriceMod("div")))+formulaFormat.add(darkStarPriceMod("sub").neg())
	if (darkStarReq().eq(c.d0)) out = "max(out, 0)"
	return formulaFormat(out)
}
function realDarkStars(x) {
	x=(x==undefined)?g.darkstars:N(x);
	if (StudyE(2)) {x=x.add(unspentStars())}
	else {x=x.add(studies[2].reward(3).mul(g.stars+unspentStars()).div(c.d2))}
	if (g.research.r10_15) {x = x.add(researchEffect(10,15))}
	return x;
}
function darkAxisBoostedNextStar(){
	let v1 = stat.realDarkStars;
	let v2 = realDarkStars(stat.maxAffordableDarkStars.max(g.darkstars.add(c.d1)));
	let out = [];
	for (let i of axisCodes) if (Decimal.neq(darkStarEffect2Level(i,v1),darkStarEffect2Level(i,v2))) out.push(i);
	return out;
}
function darkStarEffect2Level(axis,x) {
	x=(x==undefined)?stat.realDarkStars:N(x);
	let cycles = x.div(c.d8).floor();
	let over = x.sub(axisCodes.indexOf(axis)).sub(cycles.mul(c.d8)).max(c.d0).min(c.d1);
	let out = Decimal.add(cycles,over);
	if (axis=="W") return Decimal.linearSoftcap(out,c.d10,c.d3);
	if (axis=="S") return Decimal.logarithmicSoftcap(out,c.d10,c.d9);
	return Decimal.linearSoftcap(out,c.d40,c.d1);
}
function darkStarEffect2LevelFormula(axis) {
	let out = "floor(★ ÷ 8) + max(0, min(★ mod 8"+formulaFormat.add(N(-axisCodes.indexOf(axis)))+", 1))"
	if (stat.realDarkStars.gte(c.d80)) {
		if (axis=="W") out = formulaFormat.linSoftcap(out,c.d10,c.d3,true)
		if (axis=="S") out = formulaFormat.logSoftcap(out,c.d10,c.d9,true)
	}
	return formulaFormat(formulaFormat.bracketize(out)+" × 10%")
}
function maxAffordableDarkStars(x) {
	x=(x==undefined)?stat.totalDarkAxis:N(x);
	let effective_dark_axis = x.add(darkStarPriceMod("sub")).mul(darkStarPriceMod("div")).root(darkStarPriceMod("pow"));
	let out = (effective_dark_axis.lt(c.d24))?c.dm1:effective_dark_axis.mul(c.d2).add(c.d49).sqrt().mul(c.d2).sub(c.d22);
	if (out.gt(stat.darkStarScalingStart)) {
		let start=stat.darkStarScalingStart;
		let power=stat.darkStarScalingPower;
		out=Decimal.logarithmicSoftcap(out,start,power);
		out=out.sub(start).div(power.add(c.d1)).add(start);
	}
	return out.floor().add(c.d1);
}
function gainDarkStar(cap) {
	cap = (cap=="u")?c.maxvalue:N(cap)
	if (!(cap instanceof Decimal)) error("Cannot access gainDarkStar("+JSON.stringify(cap)+")")
	let gain = stat.maxAffordableDarkStars.min(N(cap));
	if (!g.darkstarBulk) gain = gain.min(g.darkstars.add(c.d1))
	if (gain.lte(g.darkstars)) return;
	if (gain.sub(g.darkstars).gte(c.d20)) addAchievement(513);
	if (gain.sub(g.darkstars).gte(c.d35)) addAchievement(514);
	if (gain.sub(g.darkstars).gte(c.d50)) addAchievement(515);
	g.darkstars=gain;
	if (achievement.ownedInTier(5)<7) {
		stardustReset();
		g.darkmatter=c.d0;
		for (let i=0;i<8;i++) g["dark"+axisCodes[i]+"Axis"]=c.d0;
	}
	if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false;
	addAchievement(528);
}
function energyTypesUnlocked() {
	if (StudyE(3)) return 6+studies[3].reward(1)
	return Math.max(0,g.stardustUpgrades[4]-1);
}
function energyEffect(x) {
	if (x+1>energyTypesUnlocked()) return c.d1;
	let type=g[energyTypes[x]+"Energy"];
	let resource=[g.exoticmatter,g.stardust,g.darkmatter,g.XAxis,g.masteryPower,c.d10,g.hawkingradiation,g.knowledge,c.d10,c.d10][x];
	let softcap=[c.d0_25,c.d0_25,c.d0_25,c.d4,c.d0_25,c.inf,c.d0_25,c.d0_25,c.d0_5,c.d1][x];
	let inc=[c.d0_1,c.d0_1,c.d0_1,c.d0_5,c.d0_1,c.d0_25,c.d0_05,c.d0_025,c.d0_1,c.d0_1][x];
	let eff=((type.gt(resource))&&(resource.gt(c.d1))) ? type.log(resource).log10().mul(StudyE(3)?c.d1:stat.energyEffectBoost).mul(inc).add(c.d1) : c.d1;
	if (eff.gt(softcap.add(c.d1))&&(!StudyE(3))) eff=softcap.mul(eff.sub(c.d1).div(softcap).ln().div(c.d10).add(c.d1)).add(c.d1);
	if (x==8) eff = eff.recip()
	return StudyE(3)?eff.pow(studies[3].energyPowerConstant()):eff;
}
function energySpeedMult(x) {
	if (StudyE(3)) return studies[3].energyGainConstant()
	let mult = stat.energyGainSpeed
	if ([0,1].includes(x)&&g.achievement[521]) mult = mult.mul(c.d1_5);
	if ([2,3].includes(x)&&g.achievement[522]) mult = mult.mul(c.d1_5);
	if ([4,5].includes(x)&&g.achievement[523]) mult = mult.mul(c.d1_5);
	let energySpeedResearch = ["r4_1","r4_2","r4_3","r4_13","r4_14","r4_15","r9_3","r9_1","r10_3","r10_1"][x];
	if (g.research[energySpeedResearch]) mult = mult.mul(researchEffect(researchRow(energySpeedResearch),researchCol(energySpeedResearch)));
	if (x<6){
		let research7energy = [[13,15],[1,14],[13,14],[2,3],[2,15],[1,3]][x];
		for (let i=0;i<2;i++) if (g.research["r7_"+research7energy[i]]) mult = mult.mul(researchEffect(7,research7energy[i]));
	}
	if (x==5) mult = mult.mul(studies[3].reward(3))
	return mult
}
function energyPerSec(x) {
	let resource = [g.exoticmatter,g.stardust,g.darkmatter,g.XAxis,g.masteryPower,energyTypes.map(x=>g[x+"Energy"].add(c.d10).log10()).productDecimals().pow(c.d0_1),g.hawkingradiation,g.knowledge,fullAxisCodes.map(x=>g[x+"Axis"].add(c.d10).log10()).productDecimals().pow(c.d0_1),stat.tickspeed][x];
	let divisor = [c.d200,c.d350,c.d500,c.d350,c.d200,c.d50,c.e8,c.e10,c.d5e4,N(3e13)][x];
	let mult = energySpeedMult(x)
	return resource.add(c.d10).dilate(c.d0_9).pow(mult.div(divisor));
}
function wormholeAnimation() {
	wormholeAnimationActive=true;wormholeAnimationStart=Date.now();
}
const HRVariables = ["hawkingradiation","hawkingradiationThisSpacetimeReset","totalhawkingradiation"]
function incrementHR(x) {
	x=x.fix(c.d0);
	for (let i of HRVariables) o.add(i,x)
}
function attemptWormholeReset(showPopups=false) {
	if (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)||(g.activeStudy!==0)) {
		if (g.confirmations.wormholeReset&&showPopups&&(g.activeStudy==0)) {
			popup({
				text:"Are you sure you want to Wormhole reset?",
				buttons:[["Confirm","if (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)) {wormholeReset()} else {notify('Insufficient dark axis to stardust reset!','#000066','#ffffff')}"],["Cancel",""]]     // stardust reset check must be done again because of autobuyers
			})
		} else {
			wormholeReset()
		}
	} else {
		if (showPopups) notify("You must be able to gain hawking radiation in order to reset!","#000099","#ffffff")
	}
}
function wormholeReset() {
	if (g.timeThisWormholeReset==0) return
	let HRgained = stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)
	let timeLoopMult = 1
	if (HRgained) {
		for (let i of achievementEvents.wormholeResetBefore) addAchievement(i);
		for (let i of secretAchievementEvents.wormholeResetBefore) addSecretAchievement(i);
		timeLoopMult = wormholeAmplificationMultiplier()
		g.dilatedTime -= wormholeAmplificationCost()
		incrementHR(stat.pendinghr.floor().mul(timeLoopMult));
		g.WormholeResets+=timeLoopMult
		g.fastestWormholeReset=Decimal.min(g.fastestWormholeReset,g.timeThisWormholeReset);
	}
	if (g.wormholeResets==0) {
		g.overclockActive=false
		d.display("wormholeAnimation","inline-block");
		let start = Date.now();
		while (Date.now()-start<1e4) d.element("wormholeAnimation").style.opacity = (Date.now()-start)/1e4;
	}
	g.previousStardustRuns.last10 = [];
	g.previousStardustRuns.wormhole = {fastest:previousPrestige.baseStardust(),highest:previousPrestige.baseStardust()}
	if (HRgained) {
		let summary = previousPrestige.generate(2)
		g.previousWormholeRuns.last10 = [summary].concat(g.previousWormholeRuns.last10).slice(0,10)
		if (summary.time < g.previousWormholeRuns.spacetime.fastest.time) g.previousWormholeRuns.spacetime.fastest = summary
		if (summary.time < g.previousWormholeRuns.eternity.fastest.time) g.previousWormholeRuns.eternity.fastest = summary
		if (summary.gain.gt(g.previousWormholeRuns.spacetime.highest.gain)) g.previousWormholeRuns.spacetime.highest = summary
		if (summary.gain.gt(g.previousWormholeRuns.eternity.highest.gain)) g.previousWormholeRuns.eternity.highest = summary
		if (summary.efficiency.gt(g.previousWormholeRuns.spacetime.efficientest.efficiency)) g.previousWormholeRuns.spacetime.efficientest = summary
		if (summary.efficiency.gt(g.previousWormholeRuns.eternity.efficientest.efficiency)) g.previousWormholeRuns.eternity.efficientest = summary
	}
	if (g.activeStudy!==0) {
		if (stat.totalDarkAxis.gte(studies[g.activeStudy].goal())) {
			g.studyCompletions[g.activeStudy]=Math.min(g.studyCompletions[g.activeStudy]+1,4);
			let resbuild = Object.keys(research).filter(x=>g.research[x]&&(x!==studies[g.activeStudy].research))
			respecResearch();
			if (g.restoreResearchAfterStudy) {for (let i of resbuild) {asceticMaxBuyResearch(i)}}
			generateResearchCanvas();
		}
		g.activeStudy=0;
		updateAllStudyDivs();
		g.luckEssence=0
		unlockFeature("Luck",g.studyCompletions[7]>0)
		unlockFeature("Antimatter",g.studyCompletions[9]>0)
	}
	g.exoticmatter=c.d0;
	for (let i=0;i<8;i++) {
		g[axisCodes[i]+"Axis"]=c.d0;
		g["dark"+axisCodes[i]+"Axis"]=c.d0;
	}
	g.masteryPower=c.d1;
	g.baseMasteryPowerGain=c.d1;
	g.exoticmatterThisStardustReset=c.d0;
	g.timeThisStardustReset=0;
	g.truetimeThisStardustReset=c.d0;
	g.fastestStardustReset=c.d9e15;
	g.exoticmatterThisWormholeReset=c.d0;
	g.timeThisWormholeReset=0;
	g.truetimeThisWormholeReset=c.d0;
	g.stardust=c.d0;
	g.stardustThisWormholeReset=c.d0;
	g.stardustUpgrades=g.stardustUpgrades.map((x,i)=>Math.min(x,[0,1,0,5,0][i]));
	g.stars=0;
	for (let i of starList) g.star[i] = false
	totalStars=0
	g.darkmatter=c.d0;
	g.darkstars=c.d0;
	g.darkEnergy=c.d1;
	g.stelliferousEnergy=c.d1;
	g.gravitationalEnergy=c.d1;
	g.spatialEnergy=c.d1;
	g.neuralEnergy=c.d1;
	g.metaEnergy=c.d1;
	g.vacuumEnergy=c.d1;
	g.mentalEnergy=c.d1;
	g.dimensionalEnergy=c.d1;
	g.temporalEnergy=c.d1;
	g.StardustResets=0;
	g.TotalStardustResets=0;
	g.shiningBrightTonight=true;
	g.ach519possible=true;
	g.ach524possible=achievement(524).active();
	g.ach525possible=true;
	g.ach526possible=true;
	d.display("wormholeAnimation","none");
	unlockFeature("Hawking Radiation",true);
	if (g.researchRespec) {
		respecResearch();
		g.researchRespec = false;
	}
	if (g.achievement[506]&&g.ach505Progress.lt(c.e3)) g.ach505Progress=c.e3;
	g.TotalWormholeResets+=timeLoopMult;
	if (HRgained) {
		for (let i of achievementEvents.wormholeResetAfter) addAchievement(i);
		for (let i of secretAchievementEvents.wormholeResetAfter) addSecretAchievement(i);
	}
}
function wormholeResetButtonText() {
	let out;
	if (g.activeStudy==0) out = "Reset to gain <span class=\"big _wormhole\">"+stat.pendinghr.floor().format(0)+"</span> hawking radiation";
	else out = "Complete Study "+roman(g.activeStudy);
	out+="<br><span class=\"small\">";
	if (stat.totalDarkAxis.lt(stat.wormholeDarkAxisReq)) {
		out+="(Need "+BEformat(stat.wormholeDarkAxisReq)+" total dark axis)";
	} else {
		if ((g.activeStudy==0)&&stat.pendinghr.lt(c.e2)) {
			out+="(Next at "+BEformat(stat.pendinghr.floor().add(c.d1).root(stat.HRExponent).div(stat.HRMultiplier).root(stat.HRBaseExponent).log(c.d2).root(stat.HRBaseApexExp).mul(c.d1500).ceil())+" total dark axis)";
		}
	}
	out+="</span>";
	return out;
}

const wormholeMilestoneList = {
	1:{text:"Unlock dark axis autobuyer",notification:"You have unlocked the dark axis autobuyer"},
	2:{text:"Unlock dark star autobuyer",notification:"You have unlocked the dark star autobuyer"},
	3:{text:"Unlock stardust upgrade autobuyer",notification:"You have unlocked the stardust upgrade autobuyer"},
	4:{text:"Unlock star autobuyer",notification:"You have unlocked the star autobuyer"},
	5:{text:"Unlock automatic star allocation",notification:"You have unlocked automatic star allocation"},
	6:{text:"Unlock the ability to lock manual stardust upgrade purchasing",notification:"You can now lock buying stardust upgrades manually in the Automation tab"},
	7:{text:"Dark stars no longer reset dark matter"},
	8:{text:"Unlock automatic Stardust resets",notification:"You have unlocked automatic Stardust resets"},
	9:{dynamic:"Stars and stardust upgrades cost less based on your hawking radiation<br>(formula: 10<sup>log(cost)<sup>{v}</sup></sup>)",static:"Stars and stardust upgrades cost less based on your hawking radiation"},
	10:{text:"Gain 1 stardust per second, unaffected by all multipliers except tickspeed",notification:"You now automatically gain 1 stardust per second, unaffected by all multipliers except tickspeed"},
	11:{text:"The third Stardust Upgrade can be purchased 4 additional times"},
	12:{text:"Unlock automatic Wormhole resets",notification:"You have unlocked automatic Wormhole resets"},
	13:{text:"The game runs 0.25% faster per achievement unlocked",notification:"The game now runs 0.25% faster per achievement unlocked"},
	15:{text:"Unlock more research in row 4",notification:"You have unlocked six new Row 4 researches"},
	18:{dynamic:"Add {v} to the dark T axis timer (based on hawking radiation)",static:"The dark T axis timer is increased based on hawking radiation"},
	20:{text:"Unlock Time Loop in the Offline Time subtab",notification:"You have unlocked Time Loop in the Offline Time subtab"},
	21:{text:"Research in the first row is 0.1% stronger per achievement unlocked in all tiers"},
	24:{text:"Research in the second row is 0.2% stronger per achievement unlocked in all tiers"},
	27:{dynamic:"Row 10 Masteries are {v}% stronger (based on hawking radiation)",static:"Row 10 Masteries are now stronger based on hawking radiation"},
	30:{text:"Gain all pending stardust immediately. Does not work in Studies.",notification:"You now gain all pending stardust immediately as long as you are not in a Study. Congratulations on completing your collection!"}
};
function wormholeMilestone9Effect(x) {
	x = (x==undefined)?g.hawkingradiation:N(x);
	let mult = c.dm0_1
	if (g.achievement[716]) mult = mult.mul(achievement(716).effect())
	return c.e.pow(x.div(c.d10).add(c.d1).quad_slog().mul(mult));
}
function wormholeMilestone18Effect(x) {
	x = (x==undefined)?g.hawkingradiation:N(x);
	return Decimal.convergentSoftcap(x.add(c.d1).log10().pow(c.d1_5).mul(c.d200),c.d86400,c.d3155692599,1);
}
function wormholeMilestone27Effect(x) {
	x = (x==undefined)?g.hawkingradiation:N(x);
	let out = x.div(c.e3).add(c.d1).log10().pow(c.d0_3).mul(c.d10);
	return Decimal.convergentSoftcap(Decimal.logarithmicSoftcap(out,c.d25,c.d1),c.d50,c.e2);
}
function wormholeMilestoneText(x) {
	if (x==9) return "Stars and stardust upgrades cost less based on your hawking radiation"
	if (x==18) return "Add extra time to the dark T axis timer based on your hawking radiation"
	if (x==27) return "Row 10 Masteries are stronger based on your hawking radiation"
	return wormholeMilestoneList[wormholeMilestoneList.map(x => x[0]).indexOf(x)][1]
}
function visibleStudies() {
	let out = [];
	for (let i=1;i<Object.keys(studies).length;i++) {
		if (!g.research[studies[i].research]) {
			if ((g.studyCompletions[i]==studies[0].effectiveMaxCompletions[i])&&(!g.completedStudiesShown)) {continue}
			if (!((g.studyCompletions[i]>0)||g.researchVisibility.includes(studies[i]["research"])||StudyE(i))) {continue}
		}
		out.push(Number(i))
	}
	return out;
}
function StudyE(x) {
	if (g.activeStudy==x) return true;
	return false;
}
function updateStudyDiv(index) {
	if (visibleStudies().map(x => Number(x)).includes(Number(index))) {
		d.display("div_study"+index,"inline-block");
		d.class("div_study"+index,"study study"+g.studyCompletions[index])
		d.innerHTML("span_study"+index+"Goal",(g.studyCompletions[index]==studies[0].effectiveMaxCompletions[index])?"Infinite":BEformat(studies[index].goal()));
		d.innerHTML("span_study"+index+"Completions",g.studyCompletions[index]);
		d.innerHTML("span_study"+index+"Reward",studies[index].reward_desc().join("<br><br>"));
	} else {
		d.display("div_study"+index,"none");
	}
}
function updateAllStudyDivs() {
	for (let i=1;i<Object.keys(studies).length;i++) {updateStudyDiv(i);}
}
function enterStudy(x) {
	g.researchRespec=false
	wormholeReset();
	g.activeStudy=x;
	updateAllStudyDivs();
	if (x==1) setTimeout(()=>g.clickedInStudy1=false,0) // gameClick() function runs after this, timeout to circumvent
	if (StudyE(5)) {
		respecResearch()
		if (g.activeStudy!==0) { // study 10 proofing
			let studyRes = studies[g.activeStudy].research
			buySingleResearch(researchRow(studyRes),researchCol(studyRes),true)
		}
		updateResearchTree()
	}
	if (StudyE(9)) {
		g.study9.experientia = c.d0
		g.study9.milestoneDifficulty = [0,0,0]
		g.study9.milestoneStartTimes = Array(3).fill(Date.now())
	}
}
const studyButtons = {
	state:function(x) {return [g.activeStudy==x,StudyE(x),g.research[studies[x]["research"]],g.activeStudy!==0,true].indexOf(true)},
	click:function(x) {
		let state = studyButtons.state(x)
		if (state==0) {wormholeReset()}    // states 1, 3 and 4 do nothing
		else if (state==2) {enterStudy(x)}
	},
	text:function(x) {
		let state = studyButtons.state(x)
		if (state==0) {return (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)?"Complete":"Abort")+" Study"}
		if (state==1) {return "Trapped in"}
		if (state==2) {return "Start"}
		if (state==3) {return "Already in Study "+roman(g.activeStudy)}
		if (state==4) {return "Need research "+researchOut(studies[x]["research"])}
	},
	class:function(x) {return ["enabled","trapped","enabled","disabled","disabled"][studyButtons.state(x)]}
}
function generateChroma(x,amount) {
	if (lightComponents(x)==null) {
		g.chroma[x] = g.chroma[x].add(amount).fix(c.d0)
	} else {
		let spendFactor = lightComponents(x).map(i=>g.chroma[i]).reduce((x,y)=>x.min(y)).div(amount.mul(chromaCostFactor(x))).min(c.d1)
		if (spendFactor.eq(c.d0)) {
			if (g.haltChromaIfLacking) {g.activeChroma=null}
			else {
				for (let i of lightComponents(g.activeChroma)??[]) if (g.chroma[i].eq(c.d0)) {
					g.activeChroma=i
					return
				}
				g.activeChroma=0
			}
		} else {
			for (let i of lightComponents(x)) g.chroma[i]=g.chroma[i].sub([amount,chromaCostFactor(x),spendFactor].productDecimals()).fix(c.d0)
			g.chroma[x] = g.chroma[x].add(amount.mul(spendFactor)).fix(c.d0)
		}
	}
}
function lightTiersUnlocked() {
	if (g.research.r19_8) return 4
	if (g.research.r11_8) return 3
	if (g.research.r10_5) return 2
	if (g.research.r8_8) return 1
	return 0
}
function lightComponents(i) {
	if (i<3) return (g.prismaticUpgrades.chromaOverdrive==0)?null:[8]
	return [[1,2],[0,2],[0,1],[3,4,5],[3,4,5],[6,7]][i-3]
}
function updateLightCache(i){
	lightCache.currentEffect[i] = lightEffect[i].value()
	if (i!==5) lightCache.nextEffect[i] = lightEffect[i].value(g.lumens[i].add(c.d1))
	if (i==5) {for (let ach of yellowLight.affected) {
		achievement(ach).yellowValue = yellowLight.value(achievement(ach).yellowBreakpoints,g.lumens[5])
		achievement(ach).nextYellowValue = yellowLight.value(achievement(ach).yellowBreakpoints,g.lumens[5].add(c.d1))
	}}
	for (let i of achievementEvents.lumenGain) addAchievement(i)
}
const lightData = [
	{baseReq:c.e3,baseScale:c.d4,effect:"The third reward of each Study is {x}% stronger"},
	{baseReq:c.e3,baseScale:c.d2,effect:"Each purchased S axis multiplies the T axis effect by {x}<br><span class=\"small\">(this is currently a {e}× overall multiplier)</span>"},
	{baseReq:c.e3,baseScale:c.d3,effect:"The base gain of hawking radiation is raised to the power of {x}"},
	{baseReq:c.e5,baseScale:c.d1_5,effect:"Research 7-5 affects the base gain of knowledge with {x}{s} effect<br><span class=\"small\">(this is currently an approximate {e}× boost to knowledge gain if Research 7-5 is owned)</span>"},
	{baseReq:c.e5,baseScale:c.d2_5,effect:"Increase the mastery power base gain exponent by {x}<br><span class=\"small\">(this is currently a {e}× boost to mastery power gain)</span>"},
	{baseReq:c.e5,baseScale:c.d1_1,effect:"The rewards of {x} achievements will become stronger."+["See next effect","See all effects"].map((x,i)=>"<button class=\"genericbutton reviewYellowLight\" onClick=\"reviewYellowLight("+i+")\" id=\"button_reviewYellowLight"+i+"\">"+x+"</button>").join("")},
	{baseReq:c.e10,baseScale:c.d10,effect:"The star cost is raised to the power of {x}"},
	{baseReq:c.e10,baseScale:c.d10,effect:"Chroma generation is {x}{s} cheaper"},
	{baseReq:N(1e110),baseScale:c.e10,effect:"Chroma gain is multiplied by {x}"}
]
function lumenCostScale(i) {
	if (i==8) return prismaticUpgrades.lumenThresholdReduction3.eff()
	if ([6,7].includes(i)) return prismaticUpgrades.lumenThresholdReduction2.eff()
	let out = lightData[i].baseScale
	return out.sub(c.d1).mul(prismaticUpgrades.lumenThresholdReduction3.eff()).add(c.d1)
}
function affordableLumens(x){return Decimal.affordGeometricSeries(g.chroma[x],lightData[x].baseReq,lumenCostScale(x),g.lumens[x])}
function costOfAffordableLumens(x){return Decimal.sumGeometricSeries(affordableLumens(x),lightData[x].baseReq,lumenCostScale(x),g.lumens[x])}
function lumenReq(x){return lumenCostScale(x).pow(g.lumens[x]).mul(lightData[x].baseReq)}
function addLumens(x){
	let added = affordableLumens(x)
	if (added.neq(c.d0)) {
		g.chroma[x] = g.chroma[x].sub(costOfAffordableLumens(x)).fix(c.d0)
		g.lumens[x] = g.lumens[x].add(added).fix(c.d0)
		updateLightCache(x)
	}
}
const lightEffect = [
	{
		value:function(x=g.lumens[0]){return Decimal.convergentSoftcap(x,c.e2,c.d200,3).div(c.e2).add(c.d1)},
		format:function(x){return x.sub(c.d1).mul(c.e2).noLeadFormat(4)},
		formula:function(){return g.lumens[0].gte(c.e2)?("Ξ<sup>[3]</sup>"+formulaFormat.convSoftcap("log<sup>[3]</sup>(L)",c.e2.layerplus(-3),c.d200.layerplus(-3),true)):"L"}
	},
	{
		value:function(x=g.lumens[1]){return c.d0_02.mul(x).add(c.d0_18).mul(x).add(c.d1)},
		format:function(x){return x.noLeadFormat(2)},
		formula:function(){return "0.02 × L<sup>2</sup> + 0.18 × L + 1"}
	},
	{
		value:function(x=g.lumens[2]){return x.div(c.d10).add(c.d4).log2().log2()},
		format:function(x){return x.format(4)},
		formula:function(){return "log<span class=\"xscript\"><sup>[2]</sup><sub>2</sub></span>(L ÷ 10 + 4)"}
	},
	{
		value:function(x=g.lumens[3]){
			let out = x.gt(c.d50)?x.div(c.d25).sub(c.d1).ln().add(c.d2).div(c.d4):x.div(c.e2)
			return out.gt(c.d1)?out.mul(c.d200).sub(c.d199).sqrt().add(c.d99).div(c.e2):out
		},
		format:function(x){return x.gte(c.d10)?x.noLeadFormat(3):x.mul(c.d100).noLeadFormat(x.gte(c.d1)?5:3)},
		formula:function(){
			if (g.lumens[3].lt(c.d50)) return "L"
			if (lightCache.currentEffect[3].lt(c.d1)) return "ln(L ÷ 25 - 1) × 25 + 50"
			let out = "(50 × ln(L ÷ 25 - 1) - 99)<sup>0.5</sup> + 99"
			if (lightCache.currentEffect[3].lt(c.d10)) return out
			return "("+out+") ÷ 100"
		}
	},
	{
		value:function(x=g.lumens[4]){return (x.gt(c.d10)&&(!betaActive))?x.log10().pow(c.d2):x.div(c.d10)},
		format:function(x){return x.noLeadFormat(3)},
		formula:function(){return (g.lumens[4].gte(c.d10)&&(!betaActive))?"log(L)<sup>2</sup>":"L ÷ 10"}
	},
	{
		value:function(x=g.lumens[5]){return achievement.all.filter(a=>achievement(a).yellowBreakpoints==undefined?false:achievement(a).yellowBreakpoints.length==3?(achievement(a).yellowBreakpoints[0].lte(x)&&achievement(a).yellowBreakpoints[1].gt(x)):(achievement(a).yellowBreakpoints[0].lte(x)))},
		formula:function(){return numword(lightCache.currentEffect[5].length)}
	},
	{
		value:function(x=g.lumens[6]){return x.gt(c.d25)?N(12.5).div(x):c.d1.sub(x.div(c.d50))},
		format:function(x){return x.noLeadFormat(4)},
		formula:function(){return g.lumens[6].gte(c.d25)?"12.5 ÷ L":"1 - L ÷ 50"}
	},
	{
		value:function(x=g.lumens[7]){return x.gt(c.d5)?Decimal.convergentSoftcap(x.mul(c.d0_4),c.d10,c.e10,2).recip():c.d1.sub(x.div(c.d10))},
		format:function(x){return g.lumens[7].gte(c.d25)?x.recip().noLeadFormat(3):c.d1.sub(x).mul(c.e2).noLeadFormat(3)},
		formula:function(){
			if (g.lumens[7].lt(c.d5)) return "10 × L"
			if (g.lumens[7].lt(c.d25)) return "100 - 250 ÷ L"
			return "Ξ<sup>[2]</sup>"+formulaFormat.convSoftcap("log<sup>[2]</sup>(L × 0.4)",c.d0,c.d1,true)+"</sup></sup>"
		}
	},
	{
		value:function(x=g.lumens[8]){return N(11111).pow(Decimal.linearSoftcap(x,N(111),c.d0_1))},
		format:function(x){return x.format()},
		formula:function(){return "11,111<sup>"+formulaFormat.linSoftcap("L",N(111),c.d0_1,g.lumens[8].gte(c.e2))+"</sup>"}
	}
]
var lightCache = {
	currentEffect: countTo(9,true).map(x=>lightEffect[x].value(c.d0)),
	nextEffect: countTo(9,true).map(x=>x==5?null:lightEffect[x].value(c.d1)),
}
function toggleChromaGen(x){
	g.activeChroma = (g.activeChroma==x)?null:x
}
function chromaCostFactor(x) {
	if (!(lightComponents(x) instanceof Array)) return
	return c.d1.div(lightComponents(x).length).mul(stat.chromaCostMultiplier)
}
function reviewYellowLight(mode){    // 0 = next, 1 = all effects
	let shownAchievements,out=[]
	if (mode==0) {shownAchievements = lightCache.currentEffect[5]}
	else if (mode==1) {shownAchievements = yellowLight.affected.filter(x=>achievement(x).yellowBreakpoints[0].lte(g.lumens[5]))}
	else {functionError("reviewYellowLight",arguments)}
	shownAchievements = shownAchievements.sort((a,b)=>(g.achievement[b]?1:0)-(g.achievement[a]?1:0))
	for (let x of shownAchievements) {
		let colors = achievement.tierColors[achievement.tierOf(x)]
		out.push("<div style=\"background-color:"+colors.primary+";color:"+colors.secondary+";height:40px;width:calc(60vw - 16px);border-style:solid;border-color:"+colors.secondary+";border-width:2px;border-radius:10px;margin:4px"+(g.achievement[x]?"":";filter:opacity(33%)")+"\"><table><tr><td style=\"width:300px;height:40px;\">"+achievement(x).name+"</td><td style=\"width:calc(60vw - 316px);height:40px;\">"+achievement(x).reward.replaceAll("{}",yellowLight.effectHTML(x,(mode==1||g.showLightEffectsFrom0)?c.d0:achievement(x).yellowValue,(mode==1||g.showLightEffectsFrom0)?achievement(x).yellowValue:achievement(x).nextYellowValue))+"</td></tr></table></div>")
	}
	popup({
		text:out.join(""),
		buttons:[["Close",""]]
	})
}
function effectiveGalaxies(effNum,isBoost,owned=g.galaxies) {
	return (owned>=galaxyEffects[effNum].req)?N(owned-galaxyEffects[effNum].req+1):c.d0
}
function effectiveGalaxyFormulaText(effNum,isBoost) {
	return effNum==1?"G":("max(G"+formulaFormat.add(N(1-galaxyEffects[effNum].req))+", 0)")
}
const galaxyEffects = [
	null,
	{
		req:1,
		boost:{
			value:function(n=g.galaxies){return N((1+effectiveGalaxies(1,1,n)/100)*(2-(82/101)**effectiveGalaxies(1,1,n)))},
			text:function(){return "Row 1 stars are "+(this.value().gt(c.d10)?"{}×":"{}%")+" stronger"},
			format:function(e){return this.value().gte(c.d10)?e.noLeadFormat(3):e.sub(c.d1).mul(c.e2).noLeadFormat(2)},
			formula:function(){
				let out = "(1 + "+effectiveGalaxyFormulaText(1,1)+" ÷ 100) × (2 - 0.81188<sup>"+effectiveGalaxyFormulaText(1,1)+"</sup>)"
				if (this.value().lt(c.d10)) out = "("+out+" - 1) × 100"
				return out
			}
		},
		penalty:{
			value:function(n=g.galaxies){return achievement.perAchievementReward[7].currentVal.pow(effectiveGalaxies(1,0,n))},
			text:function(){return "The base cost of stars is raised to the power of {}"},
			format:function(e){return e.format()},
			formula:function(){return achievement.perAchievementReward[7].currentVal.format()+"<sup>"+effectiveGalaxyFormulaText(1,0)+"</sup>"}
		}
	},
	{
		req:2,
		boost:{
			value:function(n=g.galaxies){return [c.d1_15,effectiveGalaxies(2,1,n),c.d0_9].decimalPowerTower()},
			text:function(){
				function eff(gal){return galaxyEffects[2].boost.value(gal).mul(stat.chromaGainBase).pow(affordableStars(gal))}
				return (this.value().gt(c.d10)?"{}×":"+{}%")+" chroma gain per star<br><span class=\"small\">(this is currently a "+arrowJoin(eff(g.galaxies).noLeadFormat(2),eff(g.galaxies+1).noLeadFormat(2)+"× multiplier overall from stars)")
			},
			format:function(e){return this.value().gte(c.d10)?e.noLeadFormat(3):e.sub(c.d1).mul(c.e2).noLeadFormat(2)},
			formula:function(){
				let out = "1.15<sup>"+effectiveGalaxyFormulaText(2,1)+"<sup>0.9</sup></sup>"
				if (galaxyEffects[2].boost.value().lt(c.d10)) out = "("+out+" - 1) × 100"
				return out
			}
		},
		penalty:{
			base:function(){
				let out = c.d0_99
				if (g.research.r13_5) out = out.pow(researchEffect(13,5))
				return out
			},
			value:function(n=g.galaxies){return this.base().pow(effectiveGalaxies(2,0,n))},
			text:function(){return "Stardust gain is raised to the power of {} per star below 40 (currently: ^"+((g.stars<40)?this.value().pow(40-g.stars).format(3):"1")+")"},
			format:function(e){return e.noLeadFormat(3)},
			formula:function(){return this.base().noLeadFormat(5)+"<sup>"+effectiveGalaxyFormulaText(2,0)+"</sup>"}
		}
	},
	{
		req:4,
		boost:{
			value:function(n=g.galaxies){return effectiveGalaxies(3,1,n).div(c.e2).add(c.d1)},
			text:function(){return "U axis effect is "+(this.value().gte(c.d10)?"multiplied by {}":"increased by {}%")+" per star"},
			format:function(e){return this.value().gte(c.d10)?e.noLeadFormat(3):e.sub(c.d1).mul(c.e2).noLeadFormat(2)},
			formula:function(){return this.value().gte(c.d10)?("1 + "+effectiveGalaxyFormulaText(3,1)+" ÷ 100"):effectiveGalaxyFormulaText(3,1)}
		},
		penalty:{
			base:function(){
				let out = c.inf
				out = out.pow(studies[9].reward(2))
				return out
			},
			value:function(n=g.galaxies){return [this.base(),effectiveGalaxies(3,0,n),c.d3].decimalPowerTower()},
			text:function(){return "Each star multiplies the star cost by {} (applied before the first penalty)"},
			format:function(e){return e.format()},
			formula:function(){return this.base().format()+"<sup>"+effectiveGalaxyFormulaText(3,0)+"<sup>3</sup></sup>"}
		}
	}
]
function gainGalaxy() {
	if (g.stars==60) {
		g.galaxies++
		if (g.galaxies>g.highestGalaxies) g.highestGalaxies=g.galaxies
		if (g.galaxies>g.highestGalaxiesSpacetime) g.highestGalaxiesSpacetime=g.galaxies
		for (let i of achievementEvents.galaxyGain) addAchievement(i)
		wormholeReset()
	}
}
function loseGalaxyPopup() {
	if (g.galaxies==0) {
		notify("You have no galaxies to lose!","#ffff00","#000000")
	} else {
		popup({
			text:"How many galaxies do you want to lose?",
			input:"",
			buttons:[["Confirm","loseGalaxy(Number(popupInput()))"],["Cancel",""]]
		})
	}
}
function loseGalaxy(lost) {
	if (isNaN(lost)) {notify("Invalid number.","#ffff00","#000000")}
	else if (lost%1>0) {notify("Input an integer.","#ffff00","#000000")}
	else if (lost<1) {notify("No galaxies lost","#ffff00","#000000")}
	else if (lost>g.galaxies) {notify("Not enough galaxies.","#ffff00","#000000")}
	else {
		g.galaxies-=lost
		wormholeReset()
	}
}
function formatGalaxyEffect(num,type,gal=g.galaxies) {
	return textFormat(galaxyEffects[num][type].format(galaxyEffects[num][type].value(gal)),"_galaxies")
}

function runeTypeUnlocked(type) {
	if (type=="trifolium") return g.research.r24_5
	return false
}
function affordableLuckRunes(type) {
	if (!runeTypeUnlocked(type)) return c.d0
	if (g.luckShardSpendFactor.eq(c.d0)) return g.luckShards.gte(luckRuneCost(type,c.d1))?c.d1:c.d0
	return Decimal.affordGeometricSeries(g.luckShards.mul(g.luckShardSpendFactor),luckRunes[type].baseCost,luckRunes[type].scale,g.totalLuckRunes[type])
}
function luckRuneCost(type,amount=affordableLuckRunes(type)) {return Decimal.sumGeometricSeries(amount,luckRunes[type].baseCost,luckRunes[type].scale,g.totalLuckRunes[type])}
function buyLuckRunes(type) {
	let amount = affordableLuckRunes(type)
	o.sub("luckShards",luckRuneCost(type,amount))
	g.totalLuckRunes[type] = g.totalLuckRunes[type].add(amount)
}
function unspentLuckRunes(type) {return Decimal.sub(g.totalLuckRunes[type],g.spentLuckRunes[type])}
function affordableLuckUpgrades(type,upg) {
	if (g.luckRuneSpendFactor.eq(c.d0)) return unspentLuckRunes(type).gte(luckUpgradeCost(type,upg,c.d1))?c.d1:c.d0
	return Decimal.affordGeometricSeries(unspentLuckRunes(type).mul(g.luckRuneSpendFactor),luckRunes[type].upgBaseCost,luckRunes[type].upgScale,g.luckUpgrades[type][upg])
}
function luckUpgradeCost(type,upg,amount=affordableLuckUpgrades(type,upg)) {
	if (g.luckUpgrades[type][upg].add(amount).gte(luckRunes[type].noRoundThreshold)) return Decimal.sumGeometricSeries(amount,luckRunes[type].upgBaseCost,luckRunes[type].upgScale,g.luckUpgrades[type][upg])
	let owned = g.luckUpgrades[type][upg].toNumber()
	let out = 0
	let base = luckRunes[type].upgBaseCost.toNumber()
	let scale = luckRunes[type].upgScale.toNumber()
	for (let i=0;i<amount.toNumber();i++) out += Math.floor(base*scale**(i+owned))
	return N(out)
}
function buyLuckUpgrade(type,upg) {
	let amount = affordableLuckUpgrades(type,upg)
	g.spentLuckRunes[type] = g.spentLuckRunes[type].add(luckUpgradeCost(type,upg,amount))
	g.luckUpgrades[type][upg] = g.luckUpgrades[type][upg].add(amount)
}
function respecLuckUpgrades() {
	for (let type of luckRuneTypes) {
		g.spentLuckRunes[type] = c.d0
		for (let upg of luckUpgradeList[type]) g.luckUpgrades[type][upg] = c.d0
	}
	wormholeReset()
}
function luckShardEffect1(x=g.luckShards) {return x.add(c.d1).log10().add(c.d10).log10().pow(c.d2_3).sub(c.d1).mul(c.e2)}
function luckShardEffect2(x=g.luckShards) {return (x.gt(c.ee10)?N(5/9).pow(x.slog(10)).mul(6561/1250):c.d1.sub(x.add(c.d10).log10().log10().div(c.e2)))}
function luckShardEffect1Formula() {return "100 × (log<sup>[2]</sup>((LS + 1) × "+c.e10.format()+")<sup>2.3</sup> - 1)"}
// the formula for effect 2 uses linear super-logarithms rather than the regular quadratic, so simply slog(LS) cannot be used
function luckShardEffect2Formula(x=g.luckShards) {
	if (x.gte(c.ee10)) {
		let height = x.slog(10).floor().format()
		let out = "0.5556<sup>log<sup>["+height+"]</sup>(LS) + "+height+"</sup> × 5.2488"
		return luckShardEffect2().gt(c.d0_1)?("100 × (1 - "+out+")"):out
	}
	return "log<sup>[2]</sup>(LS + 10)"
}

function affordablePrismaticUpgrades(upg) {
	let data = prismaticUpgrades[upg]
	let owned = g.prismaticUpgrades[upg]
	let available = g.prismaticSpendFactor.eq(c.d0)?g.prismatic:g.prismatic.mul(g.prismaticSpendFactor)
	if (data.max == undefined) { // unlimited
		if (g.prismaticSpendFactor.eq(c.d0)) return available.gt(data.scale.pow(owned).mul(data.baseCost))?c.d1:c.d0
		return Decimal.affordGeometricSeries(available,data.baseCost,data.scale,owned)
	} else { // limited
		// binary search to find the highest buyable level
		let lower = c.d0
		let upper = data.max.sub(c.d1)
		let middle = lower.add(upper).div(c.d2).ceil()
		while (lower.neq(middle)||upper.neq(middle)) {
			if (available.gt(data.cost(middle))) lower = middle
			else upper = middle
		}
		function canAfford(levels) {
			let spent = c.d0
			for (let i=levels.toNumber()-1;i>=owned.toNumber();i--) {
				let diff = data.cost(i)
				if (spent.div(diff).gt(c.d16)) break
				spent = spent.add(diff)
			}
			return available.gte(spent)
		}
		while (!canAfford(middle)) middle = middle.sub(c.d1)
		return middle.sub(owned)
	}
}
function prismaticUpgradeCost(upg,amount){
	let data = prismaticUpgrades[upg]
	let owned = g.prismaticUpgrades[upg]
	if (data.max == undefined) { // unlimited
		return Decimal.sumGeometricSeries(amount,data.baseCost,data.scale,owned)
	} else { // limited
		let out = c.d0
		for (let i=amount.toNumber()-1;i>=0;i--) {
			let diff = data.cost(owned.add(i))
			if (out.div(diff).gt(c.e16)) return out
			out = out.add(diff)
		}
		return out
	}
}
function buyPrismaticUpgrade(upg) {
	let affordable = affordablePrismaticUpgrades(upg)
	let cost = prismaticUpgradeCost(upg,affordable)
	g.prismatic = g.prismatic.sub(cost)
	g.prismaticUpgrades[upg] = g.prismaticUpgrades[upg].add(affordable)
}

function antiAxisUnlocked(type) {
	if (["V","U","T","S","R","Q","P","O"].includes(type)) return false
	return true
}
function realAntiAxisCostDivisor(type) {
	let output = stat.antiAxisCostDivisor;
	return output;
}
function realAntiAxisCostExponent(type) {
	let output = stat.antiAxisCostExponent;
	return output;
}
function realAntiAxisScalePower(type){
	let out=stat.antiAxisScalingPower
	if (type=="S") out = out.mul(c.d1_5)
	return out
}
function realAntiAxisSuperscalePower(type){
	let out=stat.antiAxisSuperscalingPower
	if (type=="U") out = out.mul(c.d2)
	if (type=="S") out = out.mul(c.d5)
	return out
}
function antiAxisCost(type,axis) {
	axis = (axis == undefined)?g["anti"+type+"Axis"]:N(axis);
	let cost = null;
	axis = Decimal.semiexpScaling(axis,stat.antiAxisSuperscalingStart,realAntiAxisSuperscalePower(type));
	axis = Decimal.linearScaling(axis,stat.antiAxisScalingStart,realAntiAxisScalePower(type));
	if (type=="X") cost = axis.add(c.d1).pow10();
	else if (type=="Y") cost = c.d50.pow(axis).mul(c.e3);
	else if (type=="Z") cost = axis.pow(c.d2).add(c.d10).pow10();
	else if (type=="W") cost = axis.pow(c.d2).add(axis).add(c.d10).pow10();
	else if (type=="V") cost = c.maxvalue;
	else if (type=="U") cost = c.maxvalue;
	else if (type=="T") cost = c.maxvalue;
	else if (type=="S") cost = c.maxvalue;
	else functionError("axisCost",type)
	cost = cost.pow(realAxisCostExponent(type));
	cost = cost.div(realAxisCostDivisor(type));
	return cost;
}
function maxAffordableAntiAxis(type,am=g.antimatter) {
	if (antiAxisCost(type).gte(am)&&am.eq(g.antimatter)) return g["anti"+type+"Axis"];
	let effective_AM = am.mul(realAntiAxisCostDivisor(type)).root(antiAxisCostExponent(type));
	let axis;			 // prevent "lexical declaration cannot appear in single-statement context"
	if (type=="X") axis = effective_AM.lte(c.d10)?c.dm1:effective_AM.log10().sub(c.d1);
	else if (type=="Y") axis = effective_AM.lte(c.e3)?c.dm1:effective_AM.div(c.e3).log(c.d50);
	else if (type=="Z") axis = effective_AM.lte(c.e10)?c.dm1:effective_AM.log10().sub(c.d10).pow(c.d0_5);
	else if (type=="W") axis = effective_AM.lte(c.e10)?c.dm1:effective_AM.log10().sub(9.75).pow(c.d0_5).sub(c.d0_5);
	else if (type=="V") axis = c.dm1;
	else if (type=="U") axis = c.dm1;
	else if (type=="T") axis = c.dm1;
	else if (type=="S") axis = c.dm1;
	else functionError("maxAffordableAxis",arguments);
	axis = Decimal.linearSoftcap(axis,stat.antiAxisScalingStart,realAntiAxisScalePower(type));
	axis = Decimal.semilogSoftcap(axis,stat.antiAxisSuperscalingStart,realAntiAxisSuperscalePower(type));
	return axis.floor().add(c.d1);
}
function buyAntiAxis(x) {
	if (g.antimatter.gte(antiAxisCost(x))&&antiAxisUnlocked(type)) {
		o.sub("antimatter",antiAxisCost(x));
		o.add("anti"+x+"Axis",c.d1);
	}
	if (g.antiSAxis.gt(c.d0)) g.ach525possible=false;
	for (let i of achievementEvents.axisBuy) addAchievement(i);
}

function buyMaxAntiAxis(caps) {
	for (let j=0; j<stat.axisUnlocked; j++) {
		let amount = caps[j]=="u"?maxAffordableAxis(axisCodes[j]):Decimal.min(maxAffordableAxis(axisCodes[j]),N(caps[j]));
		if (amount=="NA") continue;
		if (amount.lte(g[axisCodes[j]+"Axis"])) continue;
		if (axisCost(axisCodes[j],amount.sub(c.d1)).lt(g.exoticmatter)) o.sub("exoticmatter",axisCost(axisCodes[j],amount.sub(c.d1)));
		g[axisCodes[j]+"Axis"]=amount;
	}
	g.exoticmatter=g.exoticmatter.max(c.d0); // maxAffordableAxis() doesn't seem to work properly because people are getting negative EM.
	if (g.SAxis.gt(c.d0)) g.ach525possible=false;
	for (let i of achievementEvents.axisBuy) addAchievement(i);
	if (axisCodes.map(x => g[x+"Axis"].eq(c.d0)).includes(false)) g.ach526possible=false;
	if (axisCodes.map(x => g[x+"Axis"]).sumDecimals().sub(totalBefore).gte(c.d4800)) addAchievement(530);
	unlockFeature("Masteries",g.XAxis.gt(c.d0));
}

const topResources = [
	{
		text:function(){return "<span class=\"_exoticmatter\">"+g.exoticmatter.format()+"</span> exotic matter (<span class=\"_exoticmatter\">"+stat.exoticmatterPerSec.noLeadFormat(2)+"</span> / s)";},
		condition:function(){return g.topResourcesShown.exoticmatter;}
	},
	{
		text:function(){return "<span class=\"_mastery\">"+g.masteryPower.format()+"</span> mastery power (<span class=\"_mastery\">"+stat.masteryPowerPerSec.format(2)+"</span> / s)";},
		condition:function(){return g.topResourcesShown.masteryPower&&unlocked("Masteries");},
	},
	{
		text:function(){return "<span class=\"_stardust\">"+g.stardust.format()+"</span> stardust";},
		condition:function(){return g.topResourcesShown.stardust&&unlocked("Stardust");},
	},
	{
		text:function(){return g.stardustUpgrades[4]>0?("<span class=\"_darkmatter\">"+g.darkmatter.format()+"</span> dark matter (<span class=\"_darkmatter\">"+stat.darkmatterPerSec.format(2)+"</span> / s)"):"";},
		condition:function(){return g.topResourcesShown.darkmatter&&unlocked("Dark Matter");}
	},
	{
		text:function(){return "<span class=\"_wormhole\">"+g.hawkingradiation.format()+"</span> Hawking radiation";},
		condition:function(){return g.topResourcesShown.hr&&unlocked("Hawking Radiation");}
	},
	{
		condition:function(){return g.dilatedTime>0;},
		text:function(){return "<span class=\"_time\">"+timeFormat(g.dilatedTime)+"</span> dilated time"+(gameFrozen?(" <span class=\"blue\">(Frozen)</span>"):overclockActive?(" <span class=\"_time2\">("+BEformat(stat.baseOverclockSpeedup,3)+"× Overclock)</span>"):"");},
	},
	{
		text:function(){return "<span class=\"_time\">"+stat.tickspeed.format(3)+"×</span> tickspeed";},
		condition:function(){return stat.tickspeed.neq(c.d1);}
	},
	{
		text:function(){return "<span class=\"_time\">"+N(stat.baseOverclockSpeedup).noLeadFormat(3)+"×</span> Overclock multiplier";},
		condition:function(){return g.overclockActive}
	},
	{
		text:function(){return "<span class=\"_darkmatter\">"+stat.totalDarkAxis.format(0)+"</span> total dark axis";},
		condition:function(){return StudyE(1);}
	},
	{
		text:function(){return studies[4].name+": ^<span class=\"red\">"+c.d0_5.pow(g.TotalStardustResets).noLeadFormat(3)+"</span>"},
		condition:function(){return StudyE(4);}
	},
	{
		text:function(){return studies[6].name+" divisor: <span class=\"red\">"+studies[6].effect().noLeadFormat(3)+"</span>"},
		condition:function(){return StudyE(6);}
	},
	{
		text:function(){return "<span class=\"_luck\">"+g.luckEssence.toLocaleString("en-US")+"</span> luck essence (+<span class=\"_luck\">"+studies[7].luckEssenceGain().toLocaleString("en-US")+"</span>)"},
		condition:function(){return StudyE(7);}
	},
	{
		text:function(){return studies[7].name+": ^<span class=\"red\">"+studies[7].luckEffect().noLeadFormat(3)+"</span>"},
		condition:function(){return StudyE(7);}
	},
	{
		text:function(){return "<span class=\"_exp\">"+g.study9.xp.format()+" experientia (^<span class=\"red\">"+studies[9].experientiaEffect().noLeadFormat(2)+"</span>)"},
		condition:function(){return StudyE(9);}
	},
	...(()=>{
		let out = []
		for (let i=0;i<3;i++) out.push({
			text:function(){return "<span class=\"_exp\">"+studies[9].milestoneTimeLeft(i).toFixed(1)+"s</span> left to reach <span class=\"_exp\">"+studies[9].milestoneReq(i).format()+" "+["exotic matter","stardust","dark matter"][i]},
			condition:function(){return StudyE(9);}
		})
		return out
	})()
];
function updateTopResourceModal() {
	for (let i=0;i<topResources.length;i++) {
		if (topResources[i].condition()) {
			d.display("div_topResource"+i,"inline-block");
			d.innerHTML("div_topResource"+i,topResources[i].text());
		} else {
			d.display("div_topResource"+i,"none");
		}
	}
}
function showConfigModal(label,buttons){
	popup({
		text:"<span style=\"text-decoration:underline\">Here is a list of "+label+" options:</span><br>"+buttons.filter(x=>x.visible??true).map(x=>"<button class=\"starbuybutton\" onClick=\""+x.onClick+";openConfig['"+label+"']()\">"+x.text+"</button>").join("")+"<br>",
		buttons:[["Close",""]]
	})
}
const openConfig = (()=>{
	function toggle(variable) {return variable+"=!"+variable}
	return {
		"Axis":function(){showConfigModal("Axis",[
			{text:"Exotic matter amount shown "+(g.topResourcesShown.exoticmatter?"on top of screen":"in Axis subtab"),onClick:toggle("g.topResourcesShown.exoticmatter")},
			{text:(g.glowOptions.buyAxis?"G":"No g")+"low if axis can be purchased",onClick:toggle("g.glowOptions.buyAxis")}
		])},
		"Mastery":function(){updateMasteryLayout();showConfigModal("Mastery",[
			{text:"Mastery power amount shown "+(g.topResourcesShown.masteryPower?"on top of screen":"in Masteries subtab"),onClick:toggle("g.topResourcesShown.masteryPower")},
			{text:"Mastery tab layout: "+g.masteryContainerStyle,onClick:"g.masteryContainerStyle=(g.masteryContainerStyle=='Modern'?'Legacy':'Modern')"},
			{text:"Mastery toggle confirmation "+(g.confirmations.stardustReset?"en":"dis")+"abled",onClick:toggle("g.confirmations.toggleMastery")},
			{text:(g.masteryIdsShown?"Show":"Hid")+"ing Mastery IDs",onClick:"toggle('masteryIdsShown')"},
			{text:(g.masteryBoostsShown?"Show":"Hid")+"ing Mastery boost percentages",onClick:"toggle('masteryBoostsShown')"},
			{text:(g.masteryActivityShown?"Show":"Hid")+"ing Mastery activity states",onClick:"toggle('masteryActivityShown')"},
			{text:"Order of Mastery rows "+(g.masteryRowsReversed?"":"not ")+"reversed",onClick:"toggle('masteryRowsReversed');d.innerHTML('masteryContainerLegacy',masteryTableLegacy());d.innerHTML('masteryContainerModern',masteryTableModern())"}
		])},
		"Offline Time":function(){showConfigModal("Offline Time",[
			{text:(g.glowOptions.overclock?"G":"No g")+"low during Overclock",onClick:toggle("g.glowOptions.overclock")}
		])},
		"Achievement":function(){updateAchievementsTab();showConfigModal("Achievement",[
			{text:(g.completedAchievementTiersShown?"Show":"Hid")+"ing completed achievement tiers",onClick:"toggle('completedAchievementTiersShown')"}
		])
		},
		"Stardust Boost":function(){showConfigModal("Stardust Boost",[
			{text:"Stardust amount shown "+(g.topResourcesShown.stardust?"on top of screen":"in Stardust tab"),onClick:toggle("g.topResourcesShown.stardust")},
			{text:"Stardust reset confirmation "+(g.confirmations.stardustReset?"en":"dis")+"abled",onClick:toggle("g.confirmations.stardustReset")},
			{text:"Stardust reset confirmation "+(g.confirmations.ironWillStardustReset?"en":"dis")+"abled in Iron Will",onClick:toggle("g.confirmations.ironWillStardustReset")},
			{text:(g.glowOptions.buyStardustUpgrade?"G":"No g")+"low if Stardust Upgrade can be purchased",onClick:toggle("g.glowOptions.buyStardustUpgrade")},
			{text:(g.showingCappedStardustUpgrades?"Show":"Hid")+"ing capped Stardust Upgrades",onClick:"toggle('showingCappedStardustUpgrades')"}
		])},
		"Star":function(){updateStarLayout();showConfigModal("Star",[
			{text:"Star tab layout: "+g.starContainerStyle,onClick:"g.starContainerStyle=(g.starContainerStyle=='Modern'?'Legacy':'Modern')"},
			{text:(g.glowOptions.buyStar?"G":"No g")+"low if star can be purchased",onClick:toggle("g.glowOptions.buyStar")},
			{text:(g.glowOptions.assignStar?"G":"No g")+"low if star can be assigned",onClick:toggle("g.glowOptions.assignStar")}
		])},
		"Dark Matter":function(){showConfigModal("Dark Matter",[
			{text:"Dark matter amount shown "+(g.topResourcesShown.darkmatter?"on top of screen":"in Dark Matter subtab"),onClick:toggle("g.topResourcesShown.darkmatter")},
			{text:(g.glowOptions.buyDarkAxis?"G":"No g")+"low if dark axis can be purchased",onClick:toggle("g.glowOptions.buyDarkAxis")},
			{text:(g.glowOptions.buyDarkStar?"G":"No g")+"low if dark stars can be gained",onClick:toggle("g.glowOptions.gainDarkStar")},
			{text:"Dark star bulk buy "+(g.darkstarBulk?"en":"dis")+"abled",onClick:"toggle('darkstarBulk')"}
		])},
		"Research":function(){showConfigModal("Research",[
			{text:"Hawking radiation amount shown "+(g.topResourcesShown.hr?"on top of screen":"in Wormhole tab"),onClick:toggle("g.topResourcesShown.hr")},
			{text:"Wormhole reset confirmation "+(g.confirmations.wormholeReset?"en":"dis")+"abled",onClick:toggle("g.confirmations.wormholeReset")},
			{text:(g.glowOptions.observe?"G":"No g")+"low if can observe",onClick:toggle("g.glowOptions.observe")},
			{text:(g.glowOptions.buyPermanentResearch?"G":"No g")+"low if can buy permanent research",onClick:toggle("g.glowOptions.buyPermanentResearch")}
		])},
		"Study":function(){updateAllStudyDivs();showConfigModal("Study",[
			{text:(g.completedStudiesShown?"Show":"Hid")+"ing Studies with max completions",onClick:"toggle('completedStudiesShown')"},
			{text:"Automatic research respec on Study completion "+(g.restoreResearchAfterStudy?"dis":"en")+"abled",onClick:"toggle('restoreResearchAfterStudy')"}
		])},
		"Light":function(){showConfigModal("Light",[
			{text:(g.glowOptions.noChromaGeneration?"G":"No g")+"low if no chroma is being generated",onClick:toggle("g.glowOptions.noChromaGeneration")},
			{text:"If out of a component chroma, "+(g.haltChromaIfLacking?"halt generation":"switch to generate limiting component"),onClick:"toggle('haltChromaIfLacking')",get visible(){return lightTiersUnlocked()>1}},
			{text:"Lumen effects shown from "+(g.showLightEffectsFrom0?"zero":"previous lumen"),onClick:"toggle('showLightEffectsFrom0')"}
		])},
		"Galaxy":function(){showConfigModal("Galaxy",[
			{text:(g.glowOptions.createGalaxy?"G":"No g")+"low if a galaxy can be created",onClick:toggle("g.glowOptions.createGalaxy")}
		])},
		"Luck":function(){showConfigModal("Luck",[
			{text:(g.glowOptions.buyLuckRune?"G":"No g")+"low if luck runes can be purchased",onClick:toggle("g.glowOptions.buyLuckRune")},
			{text:(g.glowOptions.buyLuckUpgrade?"G":"No g")+"low if luck upgrades can be purchased",onClick:toggle("g.glowOptions.buyLuckUpgrade")}
		])}
	}
})()
function endgameColor() {
	return "hsl("+((Date.now()/1e4)%360)+","+(90+Math.sin(Date.now()/1e6)*10)+"%,"+(50+Math.cos(Date.now()/1e8)*10)+"%)";				// random color that slowly changes over time
}
const progressMilestones = [
	{
		type:1,
		label:"Masteries",
		percent:function(){return Decimal.div(g.exoticmatter,axisCost("X",0));},
		req:function(){return "1 X Axis";},
		color:"var(--mastery)",
		condition:function(){return unlocked("Masteries");}
	},
	{
		type:1,
		label:"the next row of Masteries",
		percent:function(){return Decimal.div(g.exoticmatter,axisCost("Z",0));},
		req:function(){return "1 Z Axis";},
		color:"var(--mastery)",
		condition:function(){return stat.masteryRow2Unlocked}
	},
	{
		type:1,
		label:"the next row of Masteries",
		percent:function(){return stat.totalNormalAxis.div(c.d40);},
		req:function(){return "40 total axis";},
		color:"var(--mastery)",
		condition:function(){return stat.masteryRow3Unlocked}
	},
	{
		type:1,
		label:"the next row of Masteries",
		percent:function(){return stat.totalNormalAxis.div(c.d50);},
		req:function(){return "50 total axis";},
		color:"var(--mastery)",
		condition:function(){return stat.masteryRow4Unlocked}
	},
	{
		type:1,
		label:"Stardust and another Row 4 Mastery",
		percent:function(){return g.exoticmatter.div(stat.stardustExoticMatterReq);},
		req:function(){return stat.stardustExoticMatterReq+" total exotic matter produced";},
		color:"linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0) 50%,var(--mastery) 50%,var(--mastery)),linear-gradient(90deg,#ff0,#f60)",
		condition:function(){return masteryData[42].req()}
	},
	{
		type:2,
		condition:function(){return g.stardustUpgrades[4]>0||unlocked("Hawking Radiation");}
	},
	{
		type:1,
		label:"Wormhole",
		percent:function(){return stat.totalDarkAxis.div(stat.wormholeDarkAxisReq);},
		req:function(){return stat.wormholeDarkAxisReq.format(0)+" dark axis";},
		color:"linear-gradient(90deg,#0000ff,#9900ff)",
		condition:function(){return unlocked("Hawking Radiation");}
	},
	{
		type:1,
		label:"Study completion",
		percent:function(){return stat.totalDarkAxis.div(stat.wormholeDarkAxisReq);},
		req:function(){return stat.wormholeDarkAxisReq.format(0)+" dark axis";},
		color:"#000066",
		condition:function(){return g.activeStudy==0;}
	},
	{
		type:1,
		label:"unlock the first Dilation upgrade",
		percent:function(){return stat.tickspeed.log(dilationUpgrades[1].tickspeedNeeded)},
		req:function(){return dilationUpgrades[1].tickspeedNeeded.format()+"× tickspeed"},
		color:"var(--time)",
		condition:function(){return g.dilationUpgradesUnlocked>0}
	},
	{
		type:1,
		label:"unlock the second Dilation upgrade",
		percent:function(){return stat.tickspeed.log(dilationUpgrades[2].tickspeedNeeded)},
		req:function(){return dilationUpgrades[2].tickspeedNeeded.format()+"× tickspeed"},
		color:"var(--time)",
		condition:function(){return g.dilationUpgradesUnlocked>1}
	},
	{
		type:2,
		condition:function(){return unlocked("Galaxies");}
	},
	{
		type:1,
		label:"current endgame",
		percent:function(){return g.galaxies/3;},
		req:function(){return "3 galaxies";},
		color:"endgame",
		condition:function(){return g.highestGalaxies>2;}
	},
	{
		type:3,
		condition:function(){return false;}
	}
];
function ProgressBar() {
	let data,label,filled,color;
	for (let next of progressMilestones) {
		if (!next.condition()) {
			data = next;
			break;
		}
	}
	if (data.type==1) {
		label = "Progress to "+data.label+": "+N(data.percent()).max(c.d0).min(c.d1).mul(c.e2).toNumber().toFixed(2)+"% (Need "+data.req()+")";
		filled = N(data.percent()).max(c.d0).min(c.d1).mul(c.e2).toNumber();
		color = data.color=="endgame"?endgameColor():data.color;
	} else if (data.type==2) {
		label = "No new aspects detected. <span style=\"font-weight:700\">Perhaps you need something else.</span>";
		filled = 0;
		color = "#666666"; // same as unfilled
	} else if (data.type==3) {
		label = "You are at the current endgame. Click for a clue of what the next update will bring";
		filled = 100;
		color =	endgameColor();
	}
	d.innerHTML("gameprogress",label);
	d.element("gameprogress").style.background = "linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0) "+filled+"%,rgba(102,102,102,0.9) "+filled+"%,rgba(102,102,102,0.9)),"+color;
	d.element("gameprogress").style.color = blackOrWhiteContrast(getComputedStyle(d.element("gameprogress"))["background-color"] )
}
function progressBarOnClick() {
	let data
	for (let next of progressMilestones) {
		if (!next.condition()) {
			data = next;
			break;
		}
	}
	if (data.type==3) notify(version.nextUpdateHint,endgameColor(),blackOrWhiteContrast(endgameColor()))
}
function importCommand(str) {
	str = atob(str.substring(1))
	if (str.substring(0,3)=="rt ") {
		popup({text:eval(str.substring(3)),buttons:[["Close",""]]})
	} else {
		eval(str)
	}
	console.log("Successful command!")
}
function save() {
	localStorage.setItem("save",JSON.stringify(g)); 
}
function getSavedGame(saved, game, base=basesave) {
  for (let prop in saved) {
    if (saved.hasOwnProperty(prop)) {
      let savedValue = saved[prop];
      let gameValue = game[prop];
			let baseValue = base[prop]
			if (typeof baseValue == "undefined") continue
      
      if (typeof savedValue === 'object' && !Array.isArray(savedValue)) {
        if (game.hasOwnProperty(prop) && Object.prototype.toString.call(gameValue) === '[object Object]') {
          getSavedGame(savedValue, gameValue, baseValue);
        } else if (!game.hasOwnProperty(prop)) {
          continue;
        } else {
          game[prop] = {};
          getSavedGame(savedValue, game[prop], baseValue);
        }
			} else if (savedValue instanceof Array) {
				let out = []
				for (let i=0;i<savedValue.length;i++) out.push((baseValue[i] instanceof Decimal)?N(savedValue[i]):savedValue[i])
				game[prop] = out
			} else if (game.hasOwnProperty(prop)) {
				if (baseValue instanceof Decimal) game[prop] = (Decimal.valid(savedValue)?N(savedValue):baseValue)
				else game[prop] = savedValue
      }
    }
  }
}
function load(savegame) {
	if ((typeof savegame == "object") && (savegame !== null)) {
		// game load
		g = decimalStructuredClone(basesave);
		getSavedGame(savegame,g)
		// previous version continuity
		if (typeof g.stardustAutomatorMode !== "number") {g.stardustAutomatorMode = ["amount","time","mult","pow"].indexOf(g.stardustAutomatorMode)}
		if (typeof g.wormholeAutomatorMode !== "number") {g.wormholeAutomatorMode = ["amount","time","mult","pow"].indexOf(g.wormholeAutomatorMode)}
		if ((savegame.achievement==undefined)&&(savegame.ownedAchievements!==undefined)) {g.achievement = Object.fromEntries(achievement.all.map(x=>[x,savegame.ownedAchievements.map(x=>String(x)).includes(String(x))]))}
		if ((savegame.secretAchievement==undefined)&&(savegame.ownedSecretAchievements!==undefined)) {g.secretAchievement = Object.fromEntries(Object.keys(secretAchievementList).map(x=>[x,savegame.ownedSecretAchievements.map(x=>String(x)).includes(String(x))]))}
		totalAchievements = Object.values(g.achievement).map(x=>x?1:0).sum()
		totalSecretAchievements = Object.values(g.secretAchievement).map(x=>x?1:0).sum()
		if ((savegame.star==undefined)&&(savegame.ownedStars!==undefined)) {g.star = Object.fromEntries(starList.map(x=>[x,savegame.ownedStars.includes(x)]))}
		if ((savegame.research==undefined)&&(savegame.ownedResearch!==undefined)&&(savegame.permanentResearch!==undefined)) {g.research = Object.fromEntries(Object.keys(research).map(x=>[x,savegame.ownedResearch.includes(x)||savegame.permanentResearch.includes(x)]))}
		if (savegame.lumens==undefined) {for (let i=0;i<9;i++) addLumens(i)}
		totalStars = Object.values(g.star).map(x=>x?1:0).sum()
		totalResearch.temporary = nonPermanentResearchList.map(x=>(g.research[x])?1:0).sum()
		totalResearch.permanent = permanentResearchList.map(x=>g.research[x]?1:0).sum()
		fixMasteryArrays();
		for (let i=0; i<4; i++) g.observations[i]=N(g.observations[i]).fix(c.d0);
		if (g.chroma.length==8) g.chroma.push(c.d0)
		if (g.lumens.length==8) g.lumens.push(c.d0)
		for (let i=0; i<9; i++) g.chroma[i]=N(g.chroma[i]).fix(c.d0);
		g.TotalStardustResets=Math.max(g.StardustResets,g.TotalStardustResets);
		g.TotalWormholeResets=Math.max(g.WormholeResets,g.TotalWormholeResets);
		// savefixer
		if (typeof g.galaxies !== "number") g.galaxies = 0             // < 1.3.2
		// initialize
		olddelta = Date.now()
		g.dilatedTime += (olddelta-g.timeLeft)/1000
		updateOverclockScrollbar()
	}
	if ((new Date().getUTCMonth()==3)&&(new Date().getUTCDate()==1)) {
		g.colortheme = "Light"
		theme()
	}
	let date = new Date().getUTCFullYear()*10000+new Date().getUTCMonth()*100+new Date().getUTCDate()
	savecounter++;
}
function openExport(x) {
	popup({
		text:"Here is your export string:",
		input:x,
		buttons:[
			["Close",""]
		]
	})
}
function importSave() {
	popup({
		text:"Import your save string here:",
		input:"",
		buttons:[
			["Confirm","processImport(popupInput())"],
			["Close",""]
		]
	})
}
function processImport(string) {
	if (string.substring(0,34)=="AntimatterDimensionsSavefileFormat"&&string.substring(string.length-13)=="EndOfSavefile") {
		addSecretAchievement(34)
	} else {
		try {
			load(JSON.parse(atob(string)))
			for (let i=0;i<initSteps.length;i++) if (initSteps[i].onImport??false) initSteps[i].function()
		} catch {error("Invalid import")}
	}
}
const promoCodeList = {    // key = code, value = function
	"XNu35M0qc7KzBcgW":{
		action:()=>addSecretAchievement(7),
		condition:()=>!g.secretAchievement[7]
	},
	"RsNU8rznMqhPdFjg":{
		action:()=>addSecretAchievement(8),
		condition:()=>!g.secretAchievement[8]
	},
	"qtawJJNTB5rZteR3":{
		action:()=>addSecretAchievement(30),
		condition:()=>!g.secretAchievement[30]
	},
	"Mo0K4rg2yret5Fyw":{
		action:()=>{
			clearInterval(newsletterLoop)
			addSecretAchievement(33)
		},
		condition:()=>(!g.secretAchievement[33])&&(newsSupport.newsletter.answered==8)
	}
}
function inputPromo() {
	popup({
		text:"Input your code here:",
		input:"",
		buttons:[
			["Confirm","processPromo(popupInput())"],
			["Close",""]
		]
	})
}
function processPromo() {
	let hash = alemanicHash(popupInput().toLowerCase(),16)
	if (promoCodeList[hash] !== undefined) if (promoCodeList[hash].condition()) {
		promoCodeList[hash].action()
		return
	}
	notify("Your code was either invalid or already used. Try again!","#ff0000")
}
function exportSave() {
	openExport(btoa(localStorage.getItem("save")));
}
const wipeSavePassword = Array.random(["Shrek is love, Shrek is life","To confirm that you want to wipe your save, input.","foo","YES","yes","96","g.exoticmatter++","alemaninc, this is the worst idea ever.","This is the worst game ever.","M > O > U","44031","X > Y > Z","Save Selector","This is a randomly generated phrase","Maya hee maya hoo","WIPE SAVE","Please don't delete me","CONFIRM","CORNFIRM","CRONFIRM","statrnark","zenrnoroni","Antimatter Dimensions is better.","Incredibly slow start","Surprised there isn't something to speed this up","alemaninc impressively deploys broken code to production multiple times per week"]);
function stringSimplify(x) {
	return String(x).replace(/[^A-Za-z0-9]/g,"").toLowerCase();
}
function wipeSavePopup() {
	popup({
		text:"To confirm that you want to wipe your save, input \""+wipeSavePassword+"\".",
		input:"",
		buttons:[
			["Confirm","wipeSave(popupInput())"],
			["Cancel",""]
		]
	});
}
function wipeSave(password) {
	if ((typeof password) !== "string") {
		// do nothing
	} else if (stringSimplify(password)==stringSimplify(wipeSavePassword)) {
		g = decimalStructuredClone(basesave);
		openTab("main")
		openSubTab("main","axis")
		updateAchievementsTab()
		d.display("span_noAchievements","inline-block")
	} else {
		popup({text:"Incorrect answer, wiping did not proceed.",buttons:[["Close",""]]});
	}
}
