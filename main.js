"use strict";
const basesave = {
	playerName:"EMD"+String(ranint(0,9999)).padStart(4,"0"),
	exoticmatter:c.d0,
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
	RAxis:c.d0,
	QAxis:c.d0,
	PAxis:c.d0,
	OAxis:c.d0,
	masteryPower:c.d0,
	baseMasteryPowerGain:c.d1,
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
	achOnProgressBar:"N", // "N" = none, can't use undefined or null due to issues
	activeTab:"main",
	activeSubtabs:Object.fromEntries(Object.keys(subtabList).map(x=>[x,subtabList[x][0]])),
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
	timeLeft:Date.now(),
	dilatedTime:0,
	dilationPower:1,
	dilationUpgrades:[null,0,0,0,0],
	dilationUpgradesUnlocked:0,
	notation:"Mixed scientific",
	newsTickerActive:true,
	newsTickerSpeed:80,
	newsTickerDilation:0.125,
	zipPoints:0,
	zipPointMulti:1,
	version:1,
	alwaysBeta:false,
	topResourcesShown:{
		exoticmatter:true,
		masteryPower:false,
		stardust:true,
		darkmatter:false,
		hr:true,
		antimatter:false
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
		study12:true,
		observe:true,
		buyPermanentResearch:true,
		noChromaGeneration:true,
		createGalaxy:false,
		buyLuckRune:true,
		buyLuckUpgrade:false,
		buyPrismaticUpgrade:true,
		buyRefundablePrismaticUpgrade:false,
		buyAntiAxis:true,
		buyWormholeUpgrade:true,
	},
	confirmations:{
		doubleClickToBuy:false,
		stardustReset:false,
		ironWillStardustReset:false,
		buyStardustUpgrade:false,   // not a confirmation but whatever
		wormholeReset:false,
		researchDoubleClick:false,
	},
	hotkeys:savefileHotkeyProperties(),
	EMDLevel:1, // dynamic quantity but we store it regardless for compatibility with subpages
	EMDLevelDisplayInFooter:1,
	achievement:Object.fromEntries(achievement.all.map(x=>[x,false])),
	secretAchievement:Object.fromEntries(Object.keys(secretAchievementList).map(x=>[x,false])),
	achievementIDShown:true,
	completedAchievementTiersShown:true,
	achievementTiersReversed:false,
	clickedInStudy1:false,
	StardustResets:0,
	TotalStardustResets:0,
	previousStardustRuns:{last10:[],wormhole:{fastest:previousPrestige.generate(1,2,true),highest:previousPrestige.generate(1,2,true)},spacetime:{fastest:previousPrestige.generate(1,3,true),highest:previousPrestige.generate(1,3,true)},eternity:{fastest:previousPrestige.generate(1,4,true),highest:previousPrestige.generate(1,4,true)}},
	previousWormholeRuns:{last10:[],spacetime:{fastest:previousPrestige.generate(2,3,true),highest:previousPrestige.generate(2,3,true),efficientest:previousPrestige.generate(2,3,true)},eternity:{fastest:previousPrestige.generate(2,4,true),highest:previousPrestige.generate(2,4,true),efficientest:previousPrestige.generate(2,4,true)}},
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
	darkmatterThisWormholeReset:c.d0,
	darkmatterThisSpacetimeReset:c.d0,
	totaldarkmatter:c.d0,
	darkXAxis:c.d0,
	darkYAxis:c.d0,
	darkZAxis:c.d0,
	darkWAxis:c.d0,
	darkVAxis:c.d0,
	darkUAxis:c.d0,
	darkTAxis:c.d0,
	darkSAxis:c.d0,
	darkRAxis:c.d0,
	darkQAxis:c.d0,
	darkPAxis:c.d0,
	darkOAxis:c.d0,
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
	studyContainerStyle:"Compact",
	studyContainerCompactSelected:undefined,
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
	prismaticUpgrades:Object.fromEntries(prismaticUpgradeList.map(x=>[x,c.d0])),
	prismaticSpendFactor:c.d0,
	study9:{
		xp:c.d0,
		fracxp:c.d0,
		start:0,
		resets:0
	},
	antimatter:c.d0,
	antimatterThisSpacetimeReset:c.d0,
	totalantimatter:c.d0,
	antiXAxis:c.d0,
	antiYAxis:c.d0,
	antiZAxis:c.d0,
	antiWAxis:c.d0,
	antiVAxis:c.d0,
	antiUAxis:c.d0,
	antiTAxis:c.d0,
	antiSAxis:c.d0,
	antiRAxis:c.d0,
	antiQAxis:c.d0,
	antiPAxis:c.d0,
	antiOAxis:c.d0,
	antimatterGalaxies:c.d0,
	antimatterGalaxyBulk:true,
	ach815RewardActive:true,
	study10Options:[],
	researchAutobuyerOn:false,
	researchAutobuyerUpgrades:0,
	researchAutobuyerMode:0,
	ach825possible:true,
	study12:{
		empowerments:c.d0,
		fortitude:c.d0
	},
	wormholeUpgrades:[null,...Array(12).fill(0)],
	ach901Int:c.d0,
	bestTickspeedThisMatrix:c.d1,
	bestTickspeed:c.d1,
	ach907Progress:0,
	ach908possible:true,
	ach920Completions:0,  // stored as bitfield: 1-bit = I, 2-bit = II, 4-bit = III, 8-bit = IV, etc.
	baselessMilestones:Array(5).fill(1), // for achievements 921-925
	study13Bindings:Object.fromEntries(study13.allBindings.map(x=>[x,false])),
	study13ShowParentBindings:false,
	corruptionsUnlocked:0,
};
var g = decimalStructuredClone(basesave); // "game"}
const empowerableAxis = {
	normal:["Y"],
	dark:["W"],
	anti:["V"]
}
const selections = {
	achievement:undefined,
	secretAchievement:undefined,
	mastery:undefined,
	masteryClick:undefined,
	star:undefined,
	starClick:undefined,
	research:undefined,
	study13Binding:undefined,
}
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
var wormholeAnimationActive = false;
var wormholeAnimationStart = 0;
var darkAxisAutobuyerProgress = 0;
var stardustUpgradeAutobuyerProgress = 0;
var starAutobuyerProgress = 0;
var researchAutobuyerProgress = 0;
var deltatime = 0;
var lagAchievementTicks = 0;
var fpsAchievementTicks = 0;
var themeAchievementCount = 0;
function gameClick() {
	g.clickedInStudy1=true
}

// Options & Display
function changePlayerName() {
	popup({
		text:"Input your player name:",
		input:g.playerName,
		buttons:[["Confirm","if (popupInput().length>40) {notify('Maximum of 40 characters for player names')} else {g.playerName=popupInput()}"]]
	})
}
function availableThemes() {
	let out = ["Default","Red","Green","Blue","Cyan","Magenta","Yellow","Light Gray","Dark Gray","Black","Light"];
	if (g.secretAchievement[16]) out.push("Wormhole");
	return out;
}
function selectOption(variable,values,flavor="mode",variableCallback=x=>x) {
	popup({
		text:"We're sorry to hear that you hate "+variableCallback(g[variable])+". Which "+flavor+" do you want to try on next?",
		buttons:values.map(x => [variableCallback(x),"g."+variable+"="+((typeof x==="string")?("'"+x+"'"):x)])
	})
}
function changeTheme() {
	popup({
		text:"We're sorry to hear that you hate "+g.colortheme+". Which theme do you want to try on next?",
		buttons:availableThemes().map(x => [x,"g.colortheme='"+x+"';theme()"])
	})
}
function theme() {
	let scheme = dictionary(g.colortheme,{
		"Default":["color:#39f","background:#190033"],
		"Red":["color:#f00","background:#300"],
		"Green":["color:#0f0","background:#030"],
		"Blue":["color:#00f","background:#003"],
		"Cyan":["color:#0ff","background:#033"],
		"Magenta":["color:#f0f","background:#303"],
		"Yellow":["color:#ff0","background:#330"],
		"Light Gray":["color:#ccc","background:#666"],
		"Dark Gray":["color:#666","background:#333"],
		"Black":["color:#fff","background:#000"],
		"Light":["color:#000","background:#fff"],
		"Wormhole":["color:#39f","background-image:repeating-radial-gradient(circle at "+(viewportWidth()/2)+"px "+(viewportHeight()/2)+"px, #190033, #330066 "+(viewportDiagonalLength/20)+"px, #190033 "+(viewportDiagonalLength/10)+"px); background-size:cover"]
	})
	document.body.style = scheme[0];
	d.element("background").style = scheme[1];
	themeAchievementCount++;
	addSecretAchievement(16);
}
function EMDLevel() {
	if (unlocked("Study XIII")) {return 9}
	if (unlocked("Luck")||unlocked("Prismatic")||unlocked("Antimatter")) {return 8}
	if (unlocked("Galaxies")) {return 7}
	if (unlocked("Light")) {return 6}
	if (unlocked("Hawking Radiation")) {return 5}
	if (unlocked("Energy")) {return 4}
	if (unlocked("Dark Matter")) {return 3}
	if (unlocked("Stardust")) {return 2}
	return 1
}
function showEMDLevelTooltip(){
	popup({
		text:"Your EMD Level is an indicator of how far you have progressed in the game. It increments at certain major progression milestones.<br><br>EMD Level is used purely to indicate how far you have progressed (for features such as the Discord and save bank) and has no effect on gameplay.",
		buttons:[["Close",""]]
	})
}
/*
Factors used to calculate EMD Score out of 1 000 000 are:
(a) total exotic matter and prestige currencies, with the following approximate weightings:
     (i) exotic matter = 5
    (ii) most recent prestige currency = 5 if unlocked in this EMD level, then 4, then 3
	 (iii) most recent new matter = 5 if unlocked in this EMD level, then 4, then 3
    (iv) Matrix currencies = 1/2 of normal value
    Round as appropriate.
    (250 000)
(b) main feature at this stage (450 000)
(c) other features at this stage, or if nothing meaningful available add on to (a) (150 000)
(d) achievements (150 000)
EMD Score should never decrease.
*/
function EMDScore(showTooltip,valueArray,level=g.EMDLevel) {
	let factors
	function giveScore(min,val,max,tariff,formula,taper) {
		let scaled = Decimal.div(Decimal.sub(formula(val),formula(min)),Decimal.sub(formula(max),formula(min))).toNumber()
		scaled = taper?((scaled>0.95)?(1-0.05*Math.exp(19-scaled*20)):(scaled<0.05)?(min.eq(c.d0)?Math.max(scaled,0):(0.05*Math.exp(scaled*20-1))):scaled):Math.max(0,Math.min(1,scaled))
		return Math.round(tariff*scaled)
	}
	// array = [resource name, minimum, maximum, score, tariff]
	if (level===1) {factors = [
		["Total exotic matter",g.totalexoticmatter,x=>giveScore(c.d0,x,N(1e22),400000,n=>n.div(c.e2).add(c.d1).log10(),true),400000],
		["Total axis",stat.totalAxis,x=>x.min(c.d60).toNumber()*7500,450000],
		["Tier 1 achievements",achievement.ownedInTier(1),x=>x*10000,150000]
	]} else if (level===2) {factors = [
		["Total exotic matter",g.totalexoticmatter,x=>giveScore(c.e25,x,N(1e150),125000,n=>n.add(c.d10).log10().log10(),true),125000],
		["Total stardust",g.totalstardust,x=>giveScore(c.d0,x,c.e12,575000,n=>n.div(c.e2).add(c.d1).log10(),true),575000],
		["Stars",g.stars,x=>(x>=6)?(150000-10000*0.4**(x-6)):(x*25000),150000],
		["Tier 2 achievements",achievement.ownedInTier(2),x=>(x===17)?150000:(x===16)?147500:(x===1)?2500:(x===0)?0:((x-1)*10000),150000]
	]} else if (level===3) {factors = [
		["Total exotic matter",g.totalexoticmatter,x=>giveScore(N(1e125),x,N("e1800"),90000,n=>n.add(c.d10).log10().log10(),true),90000],
		["Total stardust",g.totalstardust,x=>giveScore(N(1e11),x,N(1e70),70000,n=>n.add(c.d10).log10().log10(),true),70000],
		["Total dark matter",g.totaldarkmatter,x=>giveScore(c.d0,x,N(1e35),450000,n=>n.div(c.e3).add(c.d1).log10(),true),450000],
		["Dark stars",g.darkstars,x=>90250-(9.5-x.min(c.d9).toNumber())**2*1000,90000],
		["Stars",g.stars,x=>x*22500-127500,150000],
		["Tier 3 achievements",achievement.ownedInTier(3),x=>x*12500,150000]
	]} else if (level===4) {factors = [
		["Total exotic matter",g.totalexoticmatter,x=>giveScore(N("e1500"),x,N("e3e5"),100000,n=>n.add(c.d10).log10().log10(),true),100000],
		["Total stardust",g.totalstardust,x=>giveScore(N(1e55),x,N("e3000"),80000,n=>n.add(c.d10).log10().log10(),true),80000],
		["Total dark matter",g.totaldarkmatter,x=>giveScore(N(1e25),x,N("e4000"),70000,n=>n.add(c.d10).log10().log10(),true),70000],
		["Energy types unlocked",g.stardustUpgrades[4]-1,x=>(x-1)*60000,300000],
		["Stardust Upgrades 1-4",g.stardustUpgrades.slice(0,4).sum(),x=>(x>=19)?(27000*x-498000):(12500*2**(x-18)),150000],
		["Stars",g.stars,x=>x*4000-47000,90000],
		["Dark stars",g.darkstars,x=>x.toNumber()*1000,60000],
		["Tier 4 achievements",achievement.ownedInTier(4),x=>x*12000-6000,150000],
	]} else if (level===5) {factors = [
		["Total exotic matter",g.totalexoticmatter,x=>giveScore(N("e2e5"),x,N("e8e7"),75000,n=>n.add(c.d10).log10().log10().sub(c.d5).max(c.d0).pow(c.d2),true),75000],
		["Total stardust",g.totalstardust,x=>giveScore(N("e1500"),x,N("e5e4"),50000,n=>n.add(c.d10).log10().log10().sub(c.d3).max(c.d0).pow(c.d2),true),50000],
		["Total dark matter",g.totaldarkmatter,x=>giveScore(N("e2500"),x,N("ee5"),50000,n=>n.add(c.d10).log10().log10().sub(c.d3).max(c.d0).pow(c.d2),true),50000],
		["Total Hawking radiation",g.totalhawkingradiation,x=>giveScore(c.d0,x,N(1e12),75000,n=>n.div(c.d10).add(c.d1).log10(),true),75000],
		["Knowledge",g.knowledge,x=>giveScore(c.d0,x,N("1e500"),337500,n=>n.add(c.d10).log10().pow(c.d0_5),true),337500],
		[unlocked("Studies")?"Study completions":"? ? ?",g.studyCompletions.slice(1).sum(),x=>x*10000,75000],
		["Tier 5 achievements",achievement.ownedInTier(5),x=>x*11250,337500]
	]} else if (level===6) {factors = [
		["Total exotic matter",g.totalexoticmatter,x=>giveScore(N("e5e7"),x,N("e4e8"),80000,n=>n.add(c.d10).log10().log10(),true),80000],
		["Total stardust",g.totalstardust,x=>giveScore(N("e4e4"),x,N("e2e5"),50000,n=>n.add(c.d10).log10().log10(),true),50000],
		["Total dark matter",g.totaldarkmatter,x=>giveScore(N("e6e4"),x,N("e2.5e5"),50000,n=>n.add(c.d10).log10().log10(),true),50000],
		["Total Hawking radiation",g.totalhawkingradiation,x=>giveScore(c.e10,x,N(1e30),70000,n=>n.add(c.d10).log10().log10(),true),70000],
		["Total RGB lumens",g.lumens.slice(0,3).sumDecimals(),x=>giveScore(c.d0,x,N(150),450000,n=>n,true),450000],
		["Knowledge",g.knowledge,x=>giveScore(N("1e450"),x,N("e5000"),60000,n=>n.add(c.d10).log10().log10(),true),60000],
		["Study completions",g.studyCompletions.slice(1).sum(),x=>10000*(x-6),90000],
		["Tier 6 achievements",achievement.ownedInTier(6),x=>Math.max(x*5000,(x-1)*10000),150000]
	]} else if (level===7) {factors = [
		["Total exotic matter",g.totalexoticmatter,x=>giveScore(N("e3e8"),x,N("e8e8"),85000,n=>n.add(c.d10).log10().log10(),true),85000],
		["Total stardust",g.totalstardust,x=>giveScore(N("e1.5e5"),x,N("e3.5e5"),55000,n=>n.add(c.d10).log10().log10(),true),55000],
		["Total dark matter",g.totaldarkmatter,x=>giveScore(N("e1.5e5"),x,N("e1.2e6"),55000,n=>n.add(c.d10).log10().log10(),true),55000],
		["Total Hawking radiation",g.totalhawkingradiation,x=>giveScore(N("e25"),x,N("e80"),55000,n=>n.add(c.d10).log10().log10(),true),55000],
		["Highest galaxies",g.highestGalaxies,x=>50000*(x-1),150000],
		["Knowledge",g.knowledge,x=>giveScore(N("e4000"),x,N("e2.5e4"),100000,n=>n.add(c.d10).log10().log10(),true),100000],
		["Study completions",g.studyCompletions.slice(1).sum(),x=>12500*(x-12),100000],
		["Total lumens",g.lumens.sumDecimals(),x=>x.gt(c.d2e3)?250000:x.gt(1600)?(x.toNumber()*125):x.gt(1250)?((x.toNumber()-200)*1000/7):x.gt(1000)?((x.toNumber()-500)*200):x.gt(800)?((x.toNumber()-600)*250):x.gt(640)?((x.toNumber()-640)*312.5):0,250000],
		["Tier 7 achievements",achievement.ownedInTier(7),x=>x*8000-2000,150000]
	]} else if (level===8) {factors = [
		["Total exotic matter",g.totalexoticmatter,x=>giveScore(N("e7e8"),x,N("e3e10"),85000,n=>n.add(c.d10).log10().log10(),true),85000],
		["Total stardust",g.totalstardust,x=>giveScore(N("e2.5e5"),x,N("e3e6"),55000,n=>n.add(c.d10).log10().log10(),true),55000],
		["Total dark matter",g.totaldarkmatter,x=>giveScore(N("ee6"),x,N("e3e7"),55000,n=>n.add(c.d10).log10().log10(),true),55000],
		["Total Hawking radiation",g.totalhawkingradiation,x=>giveScore(N("e60"),x,N("e6000"),55000,n=>n.add(c.d10).log10().log10(),true),55000],
		[g.research.r24_5?"Trifolium runes":"? ? ? (Buy Research 24-5)",g.totalLuckRunes.trifolium,x=>giveScore(c.d0,x,N(25000),50000,n=>n,true),50000],
		[g.research.r24_3?"Quatrefolium runes":"? ? ? (Buy Research 24-3)",g.totalLuckRunes.quatrefolium,x=>giveScore(c.d0,x,N(2500),50000,n=>n,true),50000],
		[g.research.r25_3?"Cinquefolium runes":"? ? ? (Buy Research 25-3)",g.totalLuckRunes.cinquefolium,x=>giveScore(c.d0,x,N(200),50000,n=>n,true),50000],
		[unlocked("Prismatic")?"Non-refundable Prismatic Upgrades":"? ? ? (Buy Research 20-8)",nonRefundablePrismaticUpgrades.map(x=>g.prismaticUpgrades[x]).sumDecimals(),x=>giveScore(c.d0,x,N(2400),150000,n=>n,true),150000],
		[unlocked("Antimatter")?"Total anti-axis":"? ? ? (Complete Study IX)",stat.totalAntiAxis,x=>giveScore(c.d0,x,N(625),150000,n=>n,true),150000],
		["Knowledge",g.knowledge,x=>giveScore(N("e1.75e4"),x,N("e1.5e6"),37500,n=>n.add(c.d10).log10().log10(),true),37500],
		["Study completions",g.studyCompletions.slice(1).sum(),x=>1500*(x-21),37500],
		["Total lumens",g.lumens.sumDecimals(),x=>giveScore(N(1500),x,N(2e5),37500,n=>n.add(c.d1).log10(),true),37500],
		["Highest galaxies",g.highestGalaxies,x=>x*6000-22500,37500],
		["Tier 8 achievements",achievement.ownedInTier(8),x=>x*6000,150000]
	]} else if (level===9) {factors = [
		["Total exotic matter",g.totalexoticmatter,x=>giveScore(N("e2e10"),x,N("ee13"),85000,n=>n.add(c.d10).log10().log10(),true),85000],
		["Total stardust",g.totalstardust,x=>giveScore(N("e2e6"),x,N("e4e7"),55000,n=>n.add(c.d10).log10().log10(),true),55000],
		["Total dark matter",g.totaldarkmatter,x=>giveScore(N("e2e7"),x,N("ee9"),55000,n=>n.add(c.d10).log10().log10(),true),55000],
		["Total Hawking radiation",g.totalhawkingradiation,x=>giveScore(N("e4000"),x,N("ee5"),55000,n=>n.add(c.d10).log10().log10(),true),55000],
		["Study XIII completions",g.studyCompletions[13],x=>(x===256)?450000:(x>=200)?(900*x+195000):(x>=144)?(900*x+170400):(x>=96)?(1050*x+124200):(x>=56)?(1260*x+79440):(x>=24)?(1575*x+37200):(2100*x),450000],
		["Knowledge",g.knowledge,x=>giveScore(N("ee6"),x,N("ee8"),30000,n=>n.add(c.d10).log10().log10(),true),30000],
		["Study completions excluding XIII",g.studyCompletions.slice(1,13).sum(),x=>Math.max(x-43.5,0)**2*1500-375,30000],
		["Total lumens",g.lumens.sumDecimals(),x=>giveScore(N(1.5e5),x,N(1.5e6),30000,n=>n.add(c.d1).log10(),true),30000],
		["Cinquefolium runes",g.totalLuckRunes.cinquefolium,x=>giveScore(N(150),x,N(750),15000,n=>n,true),15000],
		[prismaticUpgradeName("prismaticSpeed"),g.prismaticUpgrades.prismaticSpeed,x=>giveScore(N(675),x,N(4050),15000,n=>n,true),15000],
		["Anti-X axis",g.antiXAxis,x=>giveScore(N(200),x,N(700),15000,n=>n,true),15000],
		["Non-repeatable Wormhole Upgrades",g.wormholeUpgrades.slice(1,10).sum(),x=>x*1000,9000],
		["Repeatable Wormhole Upgrades",g.wormholeUpgrades.slice(10,13).sum(),x=>x*100,6000],
		["Tier 9 achievements",achievement.ownedInTier(9),x=>(x>=9)?(6000*x-48000):[0,10,30,70,150,350,750,1500,3000][x],150000]
	]}
	function scoreFactor(i) {return Math.max(0,Math.min(factors[i][3],Math.round(factors[i][2]((valueArray===undefined)?factors[i][1]:valueArray[i]))))}
	if (showTooltip) popup({
		text:"Your EMD Level is a numeric indicator of your progression within the game as a whole. It will increment at major progression milestones.<br><br>EMD Level is only used for spoiler-free progression indicators such as in the save bank and Discord, and has no effect on gameplay.<br><br>Your EMD Level is <b>"+level+"</b>.<hr>EMD Score is used to further sub-divide each EMD Level in cases like the save bank (where saves are sorted according to progression). EMD Score is an indicator of how far you have progressed within the current EMD Level: it is given out of 1,000,000 and will decrease upon unlocking a new level. Like EMD Level, it has no effect on gameplay.<br><br>Your EMD Score is:<br><table style=\"width:95%\"><colgroup><col style=\"width:30%\"/><col style=\"width:25%\"/><col style=\"width:20%\"/><col style=\"width:20%\"/></colgroup><tbody style=\"width:100%\"><tr><th style=\"text-align:left;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">Factor</th><th style=\"text-align:center;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">Factor Value</th><th style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">Score</th><th style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">Maximum Score</th></tr>"+factors.map((x,i)=>"<tr><td style=\"text-align:left;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">"+x[0]+"</td><td style=\"text-align:center;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">"+BEformat(x[1])+"</td></td><td style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">"+BEformat(scoreFactor(i))+"</td><td style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">"+BEformat(x[3])+"</td></tr>").join("")+"<tr><td style=\"text-align:left;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">Overall</td><td style=\"text-align:center;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\"></td><td style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">"+BEformat(countTo(factors.length,true).map(x=>scoreFactor(x)).sum())+"</td><td style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">1,000,000</td></tr></tbody></table><br><i>Note that EMD Score is a composite indicator so cannot be accurately used for gatekeeping purposes.</i>",
		buttons:[["Close",""]]
	})
	return countTo(factors.length,true).map(x=>scoreFactor(x)).sum()
}

// Offline Time
var timeState = 0 // 0 = normal, 1 = overclock, 2 = frozen, 3 = equalized
const dilationUpgrades = [
	null,
	{
		tooltip:"Increase the limit of Overclock to {e}×",
		cost:function(x=g.dilationUpgrades[1]){return this.effect(x+1)*144},
		cap:22,
		effect:function(x=g.dilationUpgrades[1]){return Decimal.decibel(x+18).toNumber()},
		effectFormat:function(x=g.dilationUpgrades[1]){return this.effect(x).toFixed(0)},
		tickspeedNeeded:c.d8
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
		effect:function(x=g.dilationUpgrades[3]){return x===10?0.1:x===0?1:Decimal.decibel(-x).toNumber()},
		effectFormat:function(x=g.dilationUpgrades[3]){return N((1-this.effect(x))*100).noLeadFormat(2)},
		tickspeedNeeded:N(32768)
	},
	{
		tooltip:"Tickspeed is increased by {e}%",
		cost:function(x=g.dilationUpgrades[4]){return 150+300*x},
		cap:24,
		effect:function(x=g.dilationUpgrades[4]){return x===24?c.d2:x===0?c.d1:N(1+Math.round(x*4+x**2/144)/100)},
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
function setTimeState(x) {timeState = (timeState===x)?0:x}
function timeAlwaysEqualized() {return StudyE(3)||StudyE(9)||study13.bound(236)}
function updateOverclockScrollbar() {
	d.element('dilationSpeedupFactor').max = Math.ceil(Math.log2(dilationUpgrades[1].effect())*1000)/1000
	d.element('dilationSpeedupFactor').value = g.dilationPower
}
function getRealOverclockSpeedup() {
	if (timeState===2) {
		overclockSpeedupFactor = 0
		g.dilatedTime += deltatime
	} else if (timeState===1) {
		let added = stat.baseOverclockSpeedup-1
		let cost = stat.overclockCost*deltatime
		let affordable = Math.min(1,g.dilatedTime/cost)
		overclockSpeedupFactor = 1+added*affordable
		g.dilatedTime -= cost*affordable
		if (Math.abs(g.dilatedTime)<1e-12) {g.dilatedTime = 0}
		if (affordable<1) {timeState = 0}
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

// Story & Features
function unlockFeature(x) {
	if (!g.featuresUnlocked.includes(x)) {
		openStory(x);
		g.featuresUnlocked.push(x);
	}
}
function unlocked(x) {
	return g.featuresUnlocked.includes(x);
}
const storyEntries = (()=>{
	function EMDLevelIncrement(x){return (g.EMDLevel<x)?"<p style=\"font-weight:700;color:#00ff00;\">Your EMD Level has increased.</p>":""}
	return {
		"Stardust":{dt:2700,text:function(){return "<p>The universe has collapsed due to negative mass, yielding "+BEformat(Decimal.add(g.stardust,stat.pendingstardust))+" atoms of <span class=\"_stardust\">Stardust</span>. This powerful resource will allow your exotic matter to increase faster than before - however, its creation has consumed all of your exotic matter.</p><p>Due to radioactive decay, all your Stardust is destroyed each time you create more. As a result, you need more exotic matter to gain Stardust each time.</p><p style=\"font-weight:700;\" class=\"blue\">Note that Masteries persist on all resets. Story entries which you have already seen can be accessed again in Options > Hotkeys.</p>"+EMDLevelIncrement(2)}},
		"Dark Matter":{dt:1800,text:function(){return "<p>You have just condensed 500 billion Stardust atoms into a <span class=\"_darkmatter\">particle with positive mass</span>.</p><p>It seems useless at first glance, but like your sprawling galaxies of fundamentally inert exotic matter, it can probably be formed into an Axis.</p>"+EMDLevelIncrement(3)}},
		"Energy":{dt:2400,text:function(){return "<p>Well, you have a universe<sup>"+BEformat(g.totalexoticmatter.log10().div(c.d80).floor())+"</sup> filled with exotic matter. But, you realise that all those particles have virtually no <span class=\"_energy\">Energy</span>!</p><p>You managed to shape the stardust into a sort of breeder reactor which produces an exponentially growing supply of dark energy - unfortunately, the sprawling sixteen-dimensional space you find yourself in must be filled with exorbitant amounts of it before it can help you in any way."+EMDLevelIncrement(4)}},
		"Black hole":{dt:300,text:function(){return "<p>The large quantities of dark matter in your universe have resulted in the formation of a black hole.</p><p>At its current size it is of no use to you... but what if you add some dark matter to it? You feel tempted to try it 'in the name of <span class=\"_research\">science</span>'.</p>"}},
		"Hawking Radiation":{dt:14400,text:function(){return "<p>Perhaps you acted too soon. The black hole grew in size until it consumed all the particles in your universe.</p><p>As the black hole evaporated, it created a wave of <span class=\"_wormhole\">Hawking radiation</span>.</p><p>For the first time since you started, you have no idea why you need this new resource. Perhaps it is time to conduct some <span class=\"_research\">research</span>?</p>"+EMDLevelIncrement(5)}},
		"Studies":{dt:3600,text:function(){return "<p>You decide that, for some Wormhole soon, you'll create a universe "+(visibleStudies().includes(1)?"and not interfere with it at all":visibleStudies().includes(2)?"with very limited star formation":"<span style=\"color:#ff0000\">error</span>")+". In theory this is a harmful idea, but you feel like doing this will give you <span style=\"color:#cc0000\">enlightenment</span>.</p>"}},
		"Light":{dt:5400,text:function(){return "<p>Having traversed "+BEformat(N(g.TotalWormholeResets))+" universes, it's easy to feel as if you've \"seen it all\". You take a moment to appreciate the simple things in your existence, like the color of exotic matter... and you realise that it doesn't seem to have one. Everything is illuminated by the same constant gray light!</p><p>Surely there is a way to create "+gradientText("color","-webkit-linear-gradient(0deg,#ff0000,#00ff00,#0000ff)")+" in this place?</p>"+EMDLevelIncrement(6)}},
		"Galaxies":{dt:7200,text:function(){return "<p>The dark matter has made your stars unstable, and now if you have more than 60 in close proximity to each other they'll all collapse.</p><p>You'll need to practice working with stronger, smaller <span class=\"_galaxies\">galaxies</span> to succeed.</p>"+EMDLevelIncrement(7)}},
		"Luck":{dt:6300,text:function(){return "<p>In the beginning it was so easy to create <span class=\"_exoticmatter\">space</span>, to form <span class=\"_stars\">stars</span> and <span class=\"_research\">discover</span> the universe.</p><p>What has happened now? What was once enough exotic matter to create "+g.totalexoticmatter.mul(realAxisCostDivisor("X")).root(realAxisCostExponent("X")).div(c.d5).log(c.d6).floor().add(c.d1).format()+" metres of X axis now only provides "+maxAffordableAxis("X").format()+"; new observations come rarely, if at all. A galaxy of 61 stars will now never come to be, no matter how long you wait.</p><p>It's almost as if an <span class=\"blue\">invisible blue hand</span> is putting 'diminishing returns for balance' in your way to annoy you. But perhaps, if <span class=\"_luck\">luck</span> is not on your side, you can create your own?</p>"+EMDLevelIncrement(8)}},
		"Prismatic":{dt:7200,text:function(){function c(x){return "<span class=\""+x+"\">"+x+"</span>"};return "<p>The exotic matter is now "+c("green")+"; Hawking radiation is "+c("blue")+"; the stars are "+c("white")+" specks in the distance surrounded by nebulae of "+c("cyan")+" research papers. At the far end of the universe are dark "+c("red")+" rifts to the "+numword(visibleStudies().length)+" Study dimensions you've discovered, all against a backdrop of "+c("magenta")+" and "+c("yellow")+" crafted from the essence of pure achievement.</p><p>This is such an eyesore! It looks almost like something out of a coloring book... you feel determined to blend the <span class=\"_prismatic\">colors</span> together to create a beautiful universe, though you don't see how that will help you.</p>"+EMDLevelIncrement(8)}},
		"Antimatter":{dt:8100,text:function(){return "<p>The universe is perfectly balanced, the exotic matter pulling everything apart and the dark matter holding it together.</p><p>How long has it been this way? A year? Ten years? "+timeFormat(g.truetimePlayed)+"?</p><p>For as long as you remember, you've been drifting through this void of sixteen dimensions, creating space and filling it with stars and galaxies... but what is it all for? Is there something watching you? Are you a part of some callous celestial experiment?</p><p>Surely that can't be true... either way, you resolve to tear your way out of this place and you won't let anything stop you. Perhaps disrupting the balance with a <span class=\"_antimatter\">new substance</span> is a good start?</p>"+EMDLevelIncrement(8)}},
		"Corruption":{dt:2700,text:function(){let corrupt = corruption.unlocked("axis")?axisCodes.filter(x=>corruption.list.axis.isCorrupted(x))[0]:corruption.unlocked("darkAxis")?("dark "+axisCodes.filter(x=>corruption.list.darkAxis.isCorrupted(x))[0]):corruption.unlocked("antiAxis")?("anti-"+axisCodes.filter(x=>corruption.list.antiAxis.isCorrupted(x))[0]):"<span style=\"color:#ff0000\">error</span>";return "<p>What's this? Some sort of wall? It's almost as if the "+corrupt+" axis is actively resisting expansion...</p><p>Something is clearly trying to stop you now.</p>"}},
		"Study XIII":{dt:23400,text:function(){return "<p>A new <span style=\"color:#cc0000\">Study</span> subverse flickers into existence, but this one seems different...</p><p>All the ones before this one were already filled with bindings and knowledge to be harnessed, named and protected by a barrier. This one, however, seems to have neither a name nor any bindings, there are no visible paradigms to be salvaged from within and the barrier which must normally be weakened with resources to enter seems to be broken.</p><p>It's almost as if you've stumbled upon a blank universe... did you just create this yourself? Perhaps you can create your own bindings and rewards as well...</p>"+EMDLevelIncrement(9)}},
		"":{dt:900,text:function(){return }}
	}
})()
function openStory(x) {
	if (storyEntries[x]!==undefined) {
		timeState = 0
		if (!g.storySnippets.includes(x)) g.storySnippets.push(x);
		popup({text:"<h1 id=\"storyTitle\">"+x+"</h1>"+storyEntries[x].text(),buttons:[["Close",""]]})
	}
}
function showPreviousStory() {
	popup({
		text:"Which story entry would you like to see again?",
		buttons:g.storySnippets.map(x=>[x,"openStory('"+x+"')"])
	})
}

// Exotic Matter
const exoticmatterVariables = ["exoticmatter","exoticmatterThisStardustReset","exoticmatterThisWormholeReset","exoticmatterThisSpacetimeReset","totalexoticmatter"]
function incrementExoticMatter(x) {
	x=x.fix(c.d0);
	for (let i of exoticmatterVariables) o.add(i,x)
}

const axisEffectHTML = {
	X:"Exotic matter gain is multiplied by {e}",
	darkX:"Dark matter gain is multiplied by {e}",
	antiX:"Antimatter gain is multiplied by {e}",
	Y:"Increase X axis effect by +{e}×",
	YEmpowered:"Empowered Y axis multiply the X axis effect as well as adding to it (only applies if effect is above 1×)",
	darkY:"All dark axis are {e}× cheaper",
	antiY:"Luck shard, prismatic and antimatter gain is multiplied by {e}",
	Z:"Exotic matter gain is multiplied by {e} (based on exotic matter)",
	darkZ:"Dark matter gain is multiplied by {e} (based on exotic matter)",
	antiZ:"Multiply the anti-X axis effect by {e}",
	W:"Exotic matter gain is multiplied by {e} (increases over time)",
	darkW:"Mastery power gain is multiplied by {e}",
	darkWEmpowered:"Empowered dark W axis multiply chroma gain by the same amount they multiply mastery power gain",
	antiW:"All anti-axis are {e}× cheaper (based on antimatter)",
	V:"All normal axis are {e}× cheaper",
	darkV:"Normal V axis is {e}% stronger",
	antiV:"Dark Y axis is {e}% stronger",
	antiVEmpowered:"Empowered anti-V axis boost the anti-T axis by the same amount they boost the dark Y axis",
	U:"Stardust gain is multiplied by {e} (based on unspent stardust)",
	darkU:"Dark matter gain is multiplied by {e} per dark axis owned<br><span class=\"small\">(currently: {e2}×)</span>",
	antiU:"The anti-Z axis effect is multiplied by {e} per anti-axis owned<br><span class=\"small\">(currently: {e2}×)</span>",
	T:"Exotic matter gain is multiplied by {e} (based on total normal axis)",
	darkT:"Dark matter gain is multiplied by {e} (based on time this stardust reset)",
	antiT:"Add {e} to the observation effect<br><span class=\"small\">(currently equivalent to {e2}× knowledge)</span>",
	S:"Exotic matter gain is raised to the power of {e}",
	darkS:"Dark matter gain is raised to the power of {e}",
	antiS:"Antimatter gain is raised to the power of {e}",
	R:"All normal axis costs are raised to the power of {e}",
	darkR:"Normal R axis cost is raised to the power of {e}",
	antiR:"Anti-W axis is {e}% stronger",
	Q:"Energy gain is multiplied by {e}",
	darkQ:"Hawking radiation gain is multiplied by {e} (based on unspent Hawking radiation)",
	antiQ:"All anti-axis costs are raised to the power of {e}",
	P:"Y axis effect is multiplied by {e}",
	darkP:"All dark axis costs are raised to the power of {e}",
	antiP:"Dark P axis cost is raised to the power of {e}",
	O:"The effective levels of the first eleven normal axis are multiplied by {e}",
	darkO:"The effective levels of the first eleven dark axis are multiplied by {e}",
	antiO:"The effective levels of the first eleven anti-axis are multiplied by {e}",
};
function realAxisCostDivisor(type) {
	let output = stat.axisCostDivisor;
	if (type==="X") {output=output.mul(stat.stardustBoost5.pow(g.XAxis));}
	if (type==="Y"&&g.achievement[312]) {output=output.mul(stat.stardustBoost5.pow(g.YAxis.mul(c.d0_04)));}
	if (study13.bound(25)) {output=output.layerf(x=>Math.max(x-study13.bindingEff(25).toNumber(),-1)).max(c.minvalue);}
	return output;
}
function realAxisCostExponent(type) {
	let typeNum = axisCodes.indexOf(type)
	let output = stat.axisCostExponent;
	if (type==="S"&&g.research.r3_5) {output = output.mul(researchEffect(3,5));}
	if (typeNum<8) {
		let tier7res = ["r16_2","r15_2","r14_2","r13_2","r13_1","r14_1","r15_1","r16_1"][axisCodes.indexOf(type)]
		if (g.research[tier7res]) output = output.mul(researchEffect(researchRow(tier7res),researchCol(tier7res)))
	}
	for (let i of researchGroupList.spatialsynergism.effectors[type]) {if (g.research[i]) {output = output.div(research[i].value())}}
	if (type==="R") {output = output.mul(stat.darkRAxisEffect.pow(stat.realdarkRAxis))}
	return output;
}
function realAxisScalePower(type){
	let out=stat.axisScalingPower
	if (type==="O") {out=out.mul(c.d2)}
	return out
}
function realAxisSuperscalePower(type){
	let out=stat.axisSuperscalingPower
	if (type==="S") {out=out.mul(c.d5)}
	if (type==="R") {out=out.mul(c.d5)}
	if (type==="O") {out=out.mul(c.d9)}
	return out
}
function axisCost(type,axis) {
	axis = (axis === undefined)?g[type+"Axis"]:N(axis);
	let cost = null;
	axis = Decimal.semiexpScaling(axis,stat.axisSuperscalingStart,realAxisSuperscalePower(type));
	axis = Decimal.linearScaling(axis,stat.axisScalingStart,realAxisScalePower(type));
	if (type==="X") cost = c.d6.pow(axis).mul(c.d5);
	else if (type==="Y") cost = c.d1_5.pow(axis.simplex(2)).mul(c.e2);
	else if (type==="Z") cost = c.d10.pow(axis.pow(c.d1_379654224)).mul(c.e6);
	else if (type==="W") cost = c.d10.pow(axis.simplex(2)).mul(c.d5e7);
	else if (type==="V") cost = c.d10.pow(axis).mul(c.e20);
	else if (type==="U") cost = c.d10.pow(axis.pow(c.d1_5)).mul(c.e100);
	else if (type==="T") cost = axis.mul(c.d10).add(c.d180).pow10();
	else if (type==="S") cost = c.inf.pow(c.d1_25.pow(axis));
	else if (type==="R") cost = [N("e7.5e12"),c.d4div3,axis].decimalPowerTower()
	else if (type==="Q") cost = [N("e4e13"),c.d1_1,axis].decimalPowerTower()
	else if (type==="P") cost = [N("e1.3e14"),c.d1_03,axis].decimalPowerTower()
	else if (type==="O") cost = axis.add(c.d35).div(c.d30).layerplus(3)
	else functionError("axisCost",type)
	cost = corruption.value("axis",cost)
	cost = cost.pow(realAxisCostExponent(type));
	cost = cost.div(realAxisCostDivisor(type));
	return cost;
}
function maxAffordableAxis(type,em=g.exoticmatter) {
	if (axisCost(type).gte(em)&&em.eq(g.exoticmatter)) return g[type+"Axis"];
	let effective_EM = corruption.invertValue("axis",em.mul(realAxisCostDivisor(type)).root(realAxisCostExponent(type)));
	let axis;			 // prevent "lexical declaration cannot appear in single-statement context"
	if (type==="X") {axis = effective_EM.lte(c.d5)?c.dm1:effective_EM.div(c.d5).log(c.d6);}
	else if (type==="Y") {axis = effective_EM.lte(c.e2)?c.dm1:effective_EM.div(c.e2).log(c.d1_5).mul(c.d2).add(c.d0_25).pow(c.d0_5).sub(c.d0_5);}
	else if (type==="Z") {axis = effective_EM.lte(c.e6)?c.dm1:effective_EM.log10().sub(c.d6).pow(c.d0_7248191884897692);}
	else if (type==="W") {axis = effective_EM.lte(c.d5e7)?c.dm1:effective_EM.div(c.d5e7).log10().mul(c.d2).add(c.d0_25).pow(c.d0_5).sub(c.d0_5);}
	else if (type==="V") {axis = effective_EM.lte(c.e20)?c.dm1:effective_EM.log10().sub(c.d20);}
	else if (type==="U") {axis = effective_EM.lte(c.e100)?c.dm1:effective_EM.log10().sub(c.e2).pow(c.d2div3);}
	else if (type==="T") {axis = effective_EM.lte(c.e180)?c.dm1:effective_EM.log10().sub(c.d180).div(c.d10);}
	else if (type==="S") {axis = effective_EM.lte(c.inf)?c.dm1:effective_EM.log(c.d2).div(c.d1024).log(c.d1_25);}
	else if (type==="R") {axis = effective_EM.lte("e7.5e12")?c.dm1:effective_EM.log10().div(7.5e12).log(c.d4div3);}
	else if (type==="Q") {axis = effective_EM.lte("e4e13")?c.dm1:effective_EM.log10().div(4e13).log(c.d1_1);}
	else if (type==="P") {axis = effective_EM.lte("e1.3e14")?c.dm1:effective_EM.log10().div(1.3e14).log(c.d1_03);}
	else if (type==="O") {axis = effective_EM.lte(N(35/30).layerplus(3))?c.dm1:effective_EM.layerplus(-3).mul(c.d30).sub(c.d35);}
	else functionError("maxAffordableAxis",arguments);
	axis = Decimal.linearSoftcap(axis,stat.axisScalingStart,realAxisScalePower(type));
	axis = Decimal.semilogSoftcap(axis,stat.axisSuperscalingStart,realAxisSuperscalePower(type));
	return axis.floor().add(c.d1);
}
function maxAxisForAchievement(type) {
	if (achievement.maxForLocks.axis[g.achOnProgressBar]!==undefined) {if (achievement.locking(g.achOnProgressBar)) {if (achievement.maxForLocks.axis[g.achOnProgressBar][type]!==undefined) {return achievement.maxForLocks.axis[g.achOnProgressBar][type]}}}
	return c.maxvalue
}
function buyAxis(x,manual=false) {
	if (Decimal.eq(maxAxisForAchievement(x),g[x+"Axis"])) {if (manual) {achievement.lockPopup()};return}
	if ((g.exoticmatter.gte(axisCost(x)))&&(stat.axisUnlocked>axisCodes.indexOf(x))) {
		o.sub("exoticmatter",axisCost(x));
		o.add(x+"Axis",c.d1);
		if (g.XAxis.gt(c.d0)) unlockFeature("Masteries");
	}
	if (g.SAxis.gt(c.d0)) g.ach525possible=false;
	if (axisCodes.map(x => g[x+"Axis"].eq(c.d0)).includes(false)) g.ach526possible=false;
	addAchievements("axisBuy");
}

function buyMaxAxis(caps,manual=false) {
	let total = axisCodes.map(x=>g[x+"Axis"]).sumDecimals()
	let totalBefore = stat.totalNormalAxis;
	axis: for (let j=0; j<stat.axisUnlocked; j++) {
		for (let i=0;i<4;i++) {if ((g.achOnProgressBar===(202+i))&&(i===j)) {continue axis}}
		let amount = caps[j]==="u"?maxAffordableAxis(axisCodes[j]):Decimal.min(maxAffordableAxis(axisCodes[j]),N(caps[j]).fix(c.d0,false));
		if (amount==="NA") continue;
		if (amount.lte(g[axisCodes[j]+"Axis"])) continue;
		amount = amount.min(maxAxisForAchievement(axisCodes[j]))
		if (axisCost(axisCodes[j],amount.sub(c.d1)).lt(g.exoticmatter)) o.sub("exoticmatter",axisCost(axisCodes[j],amount.sub(c.d1)));
		g[axisCodes[j]+"Axis"]=amount;
	}
	g.exoticmatter=g.exoticmatter.max(c.d0); // maxAffordableAxis() doesn't seem to work properly because people are getting negative EM.
	if (g.SAxis.gt(c.d0)) g.ach525possible=false;
	if (axisCodes.map(x => g[x+"Axis"].eq(c.d0)).includes(false)) g.ach526possible=false;
	if (axisCodes.map(x => g[x+"Axis"]).sumDecimals().sub(totalBefore).gte(c.d4800)) addAchievement(530);
	if (g.XAxis.gt(c.d0)) unlockFeature("Masteries");
	addAchievements("axisBuy");
	if (manual&&(achievement.maxForLocks.axis[g.achOnProgressBar]!==undefined)&&achievement.locking(g.achOnProgressBar)&&axisCodes.map(x=>g[x+"Axis"]).sumDecimals().eq(total)) {achievement.lockPopup();}
}
var empoweredAxisBought = 0;
function buyEmpoweredAxis() {
	empoweredAxisBought++;
	for (let i=18;i<23;i++) addSecretAchievement(i);
}

// Masteries
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
	101:{icon:"<span class=\"_achievements\">A</span><span class=\"xscript\"><sup>+</sup><sub class=\"_achievements\">501</sub></span>",softcap:function(){return g.wormholeUpgrades[5]?wormholeUpgrades[5].eff():c.d75}},
	102:{icon:"<span class=\"_wormhole\">HR</span><sup>+</sup>"},
	103:{icon:"<span class=\"_research\">K</span><sup>+</sup>"},
	104:{icon:"<span class=\"_stars\">C</span><sup>+</sup>",req:function(){return g.research.r10_11}},
	105:{icon:"<span class=\"_stars\">"+icon.star("")+"$</span><sup>-</sup>",req:function(){return g.achievement[711]}},
	111:{icon:"<span class=\"_mastery\">M<sub>104</sub></span>→<span class=\"_prismatic\">P</span>",req:function(){return g.research.r23_6}},
	112:{icon:"<span class=\"_mastery\">M</span><span class=\"xscript\"><sup>+</sup><sub class=\"_mastery\">104</sub></span>",req:function(){return g.research.r23_10}}
}
const totalMasteryRows = Math.floor(Object.keys(masteryData).map(x => Number(x)).reduce((x,y) => Math.max(x,y))/10);
function fixMasteryArrays() {
	let masteryArrays = ["activeMasteries"];
	for (let i of masteryArrays) while (g[i].length<=totalMasteryRows) g[i].push(0);
}
fixMasteryArrays();
function MasteryE(x) {
	x=Number(x)
	if (masteryData[x].req !== undefined) {if (!masteryData[x].req()) return false}
	let row = Math.floor(x/10);
	if (g.activeMasteries[row]===0) return false;
	if (StudyE(8)) return g.activeMasteries[row]===(x%10) // ignore all "multi-activate" effects
	if (g.achievement[708]&&(row===10)&&[101,103].includes(x)&&[1,3].includes(g.activeMasteries[10])) return true
	return (g.activeMasteries[row]===(x%10))||masteredRow(row);
}
function masteredRow(x) {
	if (x===1) return g.stardustUpgrades[3]>0;
	if (x<=9) return g.star[[51,52,53,54,101,102,103,104][x-2]];
	if (x===11) {return g.prismaticUpgrades.masterSpark.gt(c.d0)}
	return false;
}
function tryToggleMastery(x) {
	if (g.confirmations.doubleClickToBuy&&(g.masteryContainerStyle==="Modern")) {
		if (selections.masteryClick===x) {
			toggleMastery(x,true)
		}
	} else {
		toggleMastery(x,true)
	}
	selections.masteryClick = x
}
function toggleMastery(x,manual=false) {
	if (achievement.maxForLocks.mastery.includes(Number(g.achOnProgressBar))&&achievement.locking(g.achOnProgressBar)) {if (manual) {achievement.lockPopup()};return}
	let row = Math.floor(x/10);
	if (!(x===g.activeMasteries[row])) {
		if ((g.activeMasteries[row]!==0)&&(!MasteryE(x))) masteryReset()
		g.activeMasteries[row]=x%10;
	}
	g.ach524possible=g.ach524possible&&achievement(524).active();
}
function unassignMasteryRow(row) {
	if (g.activeMasteries[row]!==0) {
		g.activeMasteries[row]=0
		masteryReset()
	}
}
function masteryEffect(x) {
	if (x===11) return g.masteryPower.add(c.d1).pow(masteryBoost(11).mul(c.d0_1));
	if (x===12) return g.masteryPower.add(c.d1).pow(masteryBoost(12).mul(c.d0_15));
	if (x===21) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).dilate(c.d0_6).pow(masteryBoost(21).mul(c.d0_0175)),c.e50,c.d0_2);
	if (x===22) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).dilate(c.d0_6).pow(masteryBoost(22).mul(c.d0_035)),c.e100,c.d0_1);
	if ([31,32].includes(x)) return g.masteryPower.add(c.d1).log10().pow(c.d0_5).mul(c.d0_75).mul(masteryBoost(x));
	if ([41,43].includes(x)) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).log10().div(c.d15),c.d1,c.d2).mul(masteryBoost(x)).add(c.d1);
	if (x===42) return g.masteryPower.add(c.e4).dilate(c.d0_5).div(c.e2).pow(masteryBoost(42));
	if (x===51) return g.masteryPower.add(c.d1).log10().pow(c.d0_6).mul(c.d2_5).mul(masteryBoost(51));
	if (x===52) {
		let out = g.masteryPower.add(c.d1).log10().pow(c.d0_4).mul(c.d2_5).mul(masteryBoost(52)).add(c.d1);
		if (g.research.r19_9) out = out.pow(researchEffect(19,9))
		return out
	}
	if (x===61) return g.masteryPower.add(c.d10).log10().pow(c.d0_1).sub(c.d1).mul(masteryBoost(61)).add(c.d1);
	if (x===62) return g.masteryPower.add(c.d10).log10().pow(masteryBoost(62).mul(-0.04));
	if (x===63) return g.masteryPower.add1Log(c.d10).pow(c.d0_8).mul(masteryBoost(63));
	if (x===71) return g.masteryPower.pow(c.d1_25).add(c.e10).log10().log10().pow(masteryBoost(71));
	if (x===72) return Decimal.logarithmicSoftcap(g.masteryPower.pow(c.d1_25).add(c.e10).log10().log10().pow(c.d0_5).sub(c.d1),c.d1,c.d5).mul(masteryBoost(72)).add(c.d1);
	if ([81,82,83,84].includes(x)) {
		let output = [g.masteryPower.add(c.d1).log10().pow(c.d0_5),[c.d0_03,c.d0_1,c.d0_2,c.d0_24][x-81],masteryBoost(x)].productDecimals();
		if (x===81) output = output.mul(g.XAxis.pow(c.d0_4));
		if (x===82) output = output.mul(g.exoticmatter.add(c.d10).log10().log10());
		if (x===83) output = output.mul(g.darkmatter.add(c.d10).log10().log10().pow(c.d0_75));
		if (x===84) output = output.mul(g.stardust.add(c.d10).log10().log10().pow(c.d0_5));
		return Decimal.logarithmicSoftcap(output,c.e2,c.d1).pow10();
	}
	if (x===85) return [g.masteryPower.add(c.d10).log10().log10(),masteryBoost(85),c.d0_2].productDecimals();
	if (x===91) return g.masteryPower.add(c.d10).log10().log10().div(c.d10).mul(Decimal.mul(c.d0_3,g.truetimeThisStardustReset.add(c.d10).log10())).mul(masteryBoost(91)).add(c.d1);
	if (x===92) return g.masteryPower.add(c.d10).log10().log10().div(c.d10).div(Decimal.mul(c.d0_3,g.truetimeThisStardustReset.add(c.d10).log10())).mul(masteryBoost(92)).add(c.d1);
	if (x===101) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).log10().add(c.d1).pow(masteryBoost(101).div(c.d2)),masteryData[101].softcap(),c.d2);
	if (x===102) return g.masteryPower.add(c.d1).dilate(c.d2div3).pow(masteryBoost(102).mul(c.d0_0175));
	if (x===103) return g.masteryPower.add(c.d10).dilate(c.d0_2).sub(c.d9).pow(masteryBoost(103));
	if (x===104) return masteryBoost(104).mul(g.masteryPower.gt(c.ee3)?g.masteryPower.log10().sub(c.d500):g.masteryPower.add(c.d1).log10().pow(c.d2).div(2000)).div(500).pow10()
	if (x===105) return c.d1.sub(g.masteryPower.add(c.d1).log10().div(c.e2).add(c.d10).log10().pow(c.d0_5)).mul(masteryBoost(105)).pow10()
	if (x===111) return masteryBoost(111).div(c.d32)
	if (x===112) return g.masteryPower.add(c.d1).log10().div(c.e2).add(c.d1).pow(masteryBoost(112).div(c.d32))
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
	if (g.achievement[516]&&(row>=2)&&(row<=9)) if (g.star[[51,52,53,54,101,102,103,104][row-2]]) b = b.mul(c.d1_01);
	if (g.research.r6_11) {
		let row = Math.floor(x/10);
		let owned = 0
		for (let i=1;i<5;i++) if (g.star[row*10+i]) owned++;
		b = b.mul(researchEffect(6,11).div(c.e2).mul(owned).add(c.d1));
	}
	if (study13.bound(196)&&((row%2)===1)) {b = b.mul(study13.bindingEff(196))}
	if (study13.bound(234)) {b = b.mul(study13.bindingEff(234).pow(row))}
	// single row effects
	if (row===1) {
		if (StudyE(11)) return c.d0
		if (g.achievement[105]) b = b.mul(achievement(105).effect().div(c.e2).add(c.d1));
		if (MasteryE(52)) b = b.mul(masteryEffect(52))
		if ((x===11)&&g.research.r4_6) b = b.mul(researchEffect(4,6));
		if ((x===12)&&g.research.r4_10) b = b.mul(researchEffect(4,10));
		if (study13.bound(53)) {b = b.mul(study13.bindingEff(53))}
	}
	if (row===2) {
		if (g.research.r5_13) b = b.mul(stat.spatialEnergyEffect.pow(researchEffect(5,13)));
	}
	if (row===3) {
		if (g.achievement[825]) b = b.mul(c.d3)
		if (study13.bound(44)) {b = b.mul(study13.bindingEff(44))}
	}
	if (row===4) {
		if (g.achievement[201]) b = b.mul(achievement(201).effect().div(c.e2).add(c.d1));
		if (x===42) {
			b = b.mul(studies[4].reward(2))
			if (study13.rewardLevels.masterNumber>0) {b = b.mul(2.3)}
			if (study13.rewardLevels.masterNumber>3) {b = b.mul(1+0.013*g.studyCompletions[13])}
		}
	}
	if (row===6) {
		if (g.research.r20_7&&(x!==62)) {b = b.mul(researchEffect(20,7))}
		if ((x===63)&&(study13.rewardLevels.masterNumber>1)) {b = b.mul(1.3)}
		if ((x===63)&&(study13.rewardLevels.masterNumber>4)) {b = b.mul(g.darkstars.mul(0.0013).add(c.d1))}
	}
	if (row===8) {
		for (let i of [91,92]) {if (MasteryE(i)) {b = b.mul(masteryEffect(i))}}
		if (x===85) {b = b.mul(studies[8].reward(2).mul(achievement.ownedInTier(8)).div(c.e2).add(c.d1))}
		if (study13.bound(64)) {b = b.mul(study13.bindingEff(64))}
	}
	if (row===10) {
		b = b.mul(stat.stardustBoost11);
		if (achievement.ownedInTier(5)>=27) b = b.mul(wormholeMilestone27.eff().div(c.e2).add(c.d1));
		if (g.research.r20_9&&[102,104].includes(x)) b = b.mul(researchEffect(20,9))
		if (x===101) {
			if (study13.bound(186)) {b = b.mul(study13.bindingEff(186))}
		}
		if (x===103) {
			if (g.achievement[710]) {b = b.mul(c.d9);}
		}
		if (x===104) {
			if (MasteryE(112)) {b = b.mul(masteryEffect(112))}
		}
		if (x===105) {
			b = b.mul(achievement(711).effect())
			if (study13.rewardLevels.masterNumber>2) {b = b.mul(1+0.0013*study13.rewards.masterNumber.l3Mult())}
		}
	}
	if (row===11) {
		b = b.mul(prismaticUpgrades.masterSpark.eff())
	}
	return b.fix(c.d0);
}
const percentableMasteries = [41,43,61,72,91,92] // masteries with effects that can be formatted as a percentage
function masteryEffFormat(x,getPrec=false) {
	let precision = [101].includes(x)?4:[52,62,85,105].includes(x)?3:2
	if (getPrec) {return precision;}
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
	if ([11,12].includes(x)) return "(MP + 1)<sup>"+masteryBoost(x).mul(x===12?c.d0_15:c.d0_1).noLeadFormat(3)+"</sup>"
	if ([21,22].includes(x)) {
		let out = "log(MP + 1)<sup>0.6</sup>"+formulaFormat.mult(masteryBoost(x).mul(x===22?c.d0_035:c.d0_0175))  // this is the exponent
		if (masteryEffect(x).gt(x===22?c.e100:c.e50)) out = "(("+out+" - "+(x===22?"100":"50")+") × "+(x===22?"0.23026":"0.46052")+" + 1)<sup>"+(x===22?"10":"5")+"</sup>"+formulaFormat.mult(x===22?c.e100:c.e50)
		else out = "10<sup>"+out+"</sup>"
		return out
	}
	if ([31,32].includes(x)) return "log(MP + 1)<sup>0.5</sup>"+formulaFormat.mult(masteryBoost(x).mul(c.d0_75))
	if ([41,43].includes(x)) return formulaFormat.logSoftcap("log(MP+1) ÷ 15",c.d1,c.d1,g.masteryPower.gte(c.e15))+formulaFormat.mult(masteryBoost(x))+" + 1"
	if (x===42) return "10<sup>(log(MP + "+c.e4.format()+")<sup>0.5</sup> - 2)"+formulaFormat.mult(masteryBoost(42))+"</sup>"
	if ([51,52].includes(x)) { 
		let out = "log(MP+1)<sup>0."+(x===52?"4":"6")+"</sup>"+formulaFormat.mult(masteryBoost(x).mul(c.d2_5))+(x===52?" + 1":"")
		if (x===52&&g.research.r19_9) out = "("+out+")"+formulaFormat.exp(researchEffect(19,9))
		return out
	}
	if (x===61) {
		if (masteryBoost(61).eq(c.d1)&&masteryEffect(61).lte(c.d10)) return "log(MP + 10)<sup>0.1</sup>"
		return "(log(MP + 10)<sup>0.1</sup> - 1)"+formulaFormat.mult(masteryBoost(61))+" + 1"
	}
	if (x===62) {return "log(MP + 10)"+formulaFormat.exp(masteryBoost(62).mul(-0.04))}
	if (x===63) return "log(MP+1)<sup>0.8</sup>"+formulaFormat.mult(masteryBoost(63))
	if (x===71) return "log<sup>[2]</sup>(MP<sup>1.25</sup> + "+c.e10.format()+")"+formulaFormat.exp(masteryBoost(71))
	if (x===72) return formulaFormat.logSoftcap("log<sup>[2]</sup>(MP + "+c.e10.format()+")<sup>0.5</sup> - 1",c.d1,c.d5,g.masteryPower.gt(c.ee4))+formulaFormat.mult(masteryBoost(72))+" + 1"
	if ([81,82,83,84].includes(x)) {
		let out = "log(MP + 1)<sup>0.5</sup> × "
		if (x===81) out += "X<sup>0.4</sup>"
		if (x===82) out += "log<sup>[2]</sup>(EM + 10)"
		if (x===83) out += "log<sup>[2]</sup>(DM + 10)<sup>0.75</sup>"
		if (x===84) out += "log<sup>[2]</sup>(S + 10)<sup>0.5</sup>"
		return "10<sup>"+formulaFormat.logSoftcap(out,c.e2,c.d1,masteryEffect(x).gt(c.e100))+formulaFormat.mult(masteryBoost(x).mul([c.d0_03,c.d0_1,c.d0_2,c.d0_24][x-81]))+"</sup>"
	}
	if (x===85) return "log<sup>[2]</sup>(MP + 10)"+formulaFormat.mult(masteryBoost(85).mul(c.d0_2))
	if (x===91) return "log<sup>[2]</sup>(MP + 10)"+formulaFormat.mult(masteryBoost(91).mul(c.d0_03))+" × log(t + 10) + 1"
	if (x===92) return "log<sup>[2]</sup>(MP + 10)"+formulaFormat.mult(masteryBoost(92).div(c.d3))+" ÷ log(t + 10) + 1"
	if (x===101) return formulaFormat.logSoftcap("log(MP + 10)"+formulaFormat.exp(masteryBoost(101).div(c.d2)),masteryData[101].softcap(),c.d2,Decimal.gte(masteryEffect(101),masteryData[101].softcap()))
	if (x===102) return "10<sup>log(MP + 1)<sup>2 ÷ 3</sup>"+formulaFormat.mult(masteryBoost(102).mul(c.d0_0175))+"</sup>"
	if (x===103) return "(10<sup>log(MP + 10)<sup>0.2</sup></sup> - 9)"+formulaFormat.exp(masteryBoost(103))
	if (x===104) return "10<sup>("+(g.masteryPower.gt(c.ee3)?"log(MP) - 500":"log(MP + 1)<sup>2</sup> ÷ 2,000")+")"+formulaFormat.mult(masteryBoost(104).div(c.d500))+"</sup>"
	if (x===105) return masteryBoost(105).pow10().noLeadFormat(3)+"<sup>1 - log(log(MP + 10) ÷ 100 + 10)<sup>0.5</sup></sup>"
	if (x===111) return masteryBoost(111).div(c.d32).noLeadFormat(3)
	if (x===112) return "(log(MP + 1) ÷ 100 + 1)<sup>"+masteryBoost(112).div(c.d32).noLeadFormat(3)+"</sup>"
	functionError("masteryFormula",arguments)
}
function masteryBaseText(x) {
	if (x===11) return "Multiply exotic matter gain by {}";
	if (x===12) return "All "+(unlocked("Dark Matter")?"normal axis":"axis")+" are {}× cheaper";
	if ([21,22].includes(x)) return "Multiply the "+["X","Y"][x-21]+" axis effect by {}";
	if (x===31) return "Gain {} free Z axis that do not increase the cost";
	if (x===32) return "Gain {} free W axis that do not increase the cost";
	if (x===41) return "Increase the effect of Masteries 11, 21 and 31 by {}";
	if (x===42) return "Multiply stardust gain by {}";
	if (x===43) return "Increase the effect of Masteries 12, 22 and 32 by {}";
	if (x===51) return "Gain {} free X axis";
	if (x===52) return "Raise the effects of the first row Masteries to the power of {}";
	if (x===61) return "Dark X axis are {} stronger";
	if (x===62) return "Dark axis costs are raised to the power of {}";
	if (x===63) return "Subtract {} from the dark star cost";
	if (x===71) return "Multiply energy gain by {}";
	if (x===72) return "Energy effects are {} stronger";
	if ([81,82,83,84].includes(x)) return "Multiply mastery power gain by {} (based on "+["X axis","exotic matter","dark matter","stardust"][x-81]+")";
	if (x===85) return "Add {} to the base mastery power gain exponent<br><span class=\"small\">(currently a "+stat.masteryTimer.pow(masteryEffect(85)).format(2)+"× multiplier)</span>";
	if ([91,92].includes(x)) return "Row 8 Masteries are {} stronger ("+["in","de"][x-91]+"creases over time in this Stardust reset)";
	if (x===101) return "The "+achievement.label(501)+" reward is raised to the power of {}"+(achievement(501).effectExp(false).eq(c.d1)?"":("<br><span class=\"small\">(if inactive: "+achievement(501).effectExp(false).format(3)+")</span>"));
	if (x===102) return "Multiply Hawking radiation gain by {}";
	if (x===103) return "Multiply knowledge gain by {}";
	if (x===104) return "Multiply chroma gain by {}";
	if (x===105) return "The star cost is raised to the power of {}";
	if (x===111) return "Mastery 104 affects prismatic gain with ^{} effect<br><span class=\"small\">(currently equivalent to "+Decimal.pow(masteryEffect(104),masteryEffect(111)).format(2)+"× prismatic)</span>"
	if (x===112) return "The Mastery 104 effect is raised to the power of {}"
	functionError("masteryBaseText",arguments)
}
function masteryText(x) {
	x=Number(x)
	return masteryBaseText(x).replace("{}",showFormulas?("<i>"+masteryFormula(x)+"</i>"+(percentableMasteries.includes(x)?"×":"")):masteryEffFormat(x))
}
function masteryReset() {
	g.masteryPower=c.d0;
	g.baseMasteryPowerGain=c.d1;
}
function showMasteryInfo(x) {
	alignTooltip("masteryInfo","button_mastery"+x+"Modern")
	d.innerHTML("masteryInfo","<b>Mastery "+x+"</b><br><div style=\"font-size:10px;white-space:break-spaces;\">("+(MasteryE(x)?"A":"Ina")+"ctive)</span>"+(masteryBoost(x).eq(c.d1)?"":("<br>("+masteryBoost(x).mul(c.e2).noLeadFormat(3)+"% Powered)"))+"</div><hr style=\"color:inherit\">"+masteryText(x))
}
function updateMasteryLayout() {
	d.display("masteryContainerLegacy",g.masteryContainerStyle==="Legacy"?"inline-block":"none")
	d.display("masteryContainerModern",g.masteryContainerStyle==="Modern"?"inline-block":"none")
	for (let i of document.getElementsByClassName("masteryID"+g.masteryContainerStyle)) i.style.display=g.masteryIdsShown?"inline-block":"none"
	for (let i of document.getElementsByClassName("masteryBoost"+g.masteryContainerStyle)) i.style.display=g.masteryBoostsShown?"inline-block":"none"
	for (let i of document.getElementsByClassName("masteryActive"+g.masteryContainerStyle)) i.style.display=g.masteryActivityShown?"inline-block":"none"
}
function stardustExoticMatterReqText() {
	if (stat.stardustMultiplier.eq(c.d0)||stat.stardustExponent.eq(c.d0)||stat.stardustDilation.eq(c.d0)) return "(Need Infinite exotic matter)"
	if (stat.pendingstardust.lte(g.stardust)||g.exoticmatter.lt(stat.stardustExoticMatterReq)) return "(Need "+BEformat(g.stardust.floor().add(c.d1).dilate(stat.stardustDilation.recip()).root(stat.stardustExponent).div(stat.stardustMultiplier).dilate(studies[4].reward(1).recip()).max(c.d10).mul(stat.stardustExoticMatterReq.div(c.d10)))+" exotic matter)";
	else if (stat.pendingstardust.lt(c.e3)) return "(Next at "+BEformat(stat.pendingstardust.add(c.d1).floor().root(stat.stardustExponent).div(stat.stardustMultiplier).dilate(c.d2).mul(stat.stardustExoticMatterReq.div(c.d10)))+" exotic matter)";
	return "";
}

// Stardust Reset
const stardustVariables = ["stardust","stardustThisWormholeReset","stardustThisSpacetimeReset","totalstardust"]
function incrementStardust(x) {
	x=x.fix(c.d0);
	for (let i of stardustVariables) o.add(i,x)
}
function attemptStardustReset(showPopups=false) {
	if ((achievement.maxForLocks.stardustReset[g.achOnProgressBar]??false)&&achievement.locking(g.achOnProgressBar)) {
		if (showPopups) achievement.lockPopup()
	} else if (StudyE(12)) {
		if (showPopups) {notify("Stardust reset is disabled in Study XII","#990000","#ffffff")}
	} else if (stat.pendingstardust.gt(g.stardust)) {
		if ((g.confirmations.stardustReset||(g.confirmations.ironWillStardustReset&&stat.ironWill))&&showPopups) {
			let willReset = [
				["exotic matter",true],
				[(unlocked("Dark Matter")?"normal ":"")+" axis"+((g.stardustUpgrades[1]<2)?"":(" except "+N(stat.stardustUpgrade2AxisRetentionFactor*100).noLeadFormat(3)+"% of the first "+numword(g.stardustUpgrades[0])+" (rounded down)")),true],
				["mastery power",true],
				["the mastery timer",true],
				[(g.studyCompletions[3]>0)?"the first six Energies":"energy",unlocked("Energy")]
			]
			popup({
				text:"Are you sure you want to "+((stat.ironWill&&g.achievement[502])?"forfeit your Iron Will run":"Stardust reset")+"?<br><br>This will reset "+willReset.filter(x=>x[1]).map(x=>x[0]).joinWithAnd()+".",
				buttons:[["Confirm","if (stat.pendingstardust.gt(g.stardust)) {stardustReset()} else {notify('Insufficient exotic matter to stardust reset!','#ff9900','#ffffff')}"],["Cancel",""]]     // stardust reset check must be done again because of autobuyers
			})
		} else {
			stardustReset(showPopups)
		}
	} else {
		if (showPopups) notify("You must be able to gain stardust in order to reset!","#ff6600","#000000")
	}
}
function stardustReset(showPopups=false) {
	if (achievement.maxForLocks.stardustReset[g.achOnProgressBar]??false) {if (showPopups) {achievement.lockPopup()}; return}
	if (StudyE(12)) {notify("Stardust reset is disabled in Study XII","#990000","#ffffff"); return}
	let stardustGained = stat.pendingstardust.gt(g.stardust)
	if (stardustGained) g.StardustResets++;
	g.TotalStardustResets++;
	unlockFeature("Stardust");
	unlockFeature("Stars");
	if (stardustGained) {
		let f0 = previousPrestige.generate(1,0,false)
		let f2 = previousPrestige.generate(1,2,false)
		let f3 = previousPrestige.generate(1,3,false)
		let f4 = previousPrestige.generate(1,4,false)
		g.previousStardustRuns.last10 = [f0].concat(g.previousStardustRuns.last10).slice(0,10)
		if (f2.time < g.previousStardustRuns.wormhole.fastest.time) g.previousStardustRuns.wormhole.fastest = f2
		if (f3.time < g.previousStardustRuns.spacetime.fastest.time) g.previousStardustRuns.spacetime.fastest = f3
		if (f4.time < g.previousStardustRuns.eternity.fastest.time) g.previousStardustRuns.eternity.fastest = f4
		if (f2.gain.gt(g.previousStardustRuns.wormhole.highest.gain)) g.previousStardustRuns.wormhole.highest = f2
		if (f3.gain.gt(g.previousStardustRuns.spacetime.highest.gain)) g.previousStardustRuns.spacetime.highest = f3
		if (f4.gain.gt(g.previousStardustRuns.eternity.highest.gain)) g.previousStardustRuns.eternity.highest = f4
		addAchievements("stardustReset");
		if (StudyE(7)) g.luckEssence += studies[7].luckEssenceGain()
		incrementStardust(stat.pendingstardust.floor().sub(g.stardust).max(c.d0))
		g.fastestStardustReset=Decimal.min(g.fastestStardustReset,g.timeThisStardustReset);
	}
	g.exoticmatter=c.d0;
	g.exoticmatterThisStardustReset=c.d0;
	for (let i=0;i<12;i++) {g[axisCodes[i]+"Axis"]=(g.stardustUpgrades[1]>=i+2)?(Decimal.mul(g[axisCodes[i]+"Axis"],stat.stardustUpgrade2AxisRetentionFactor).floor()):c.d0;}
	g.masteryPower=c.d0;
	g.baseMasteryPowerGain=c.d1;
	g.timeThisStardustReset=0;
	g.truetimeThisStardustReset=c.d0;
	for (let i of energyTypes.slice(0,6)) {g[i+"Energy"] = StudyE(3)?c.d1:g[i+"Energy"].pow(studies[3].reward(2));}
	addAchievements("stardustReset");
}

// Stardust Boosts
function stardustBoostBoost(x) {
	let out = c.d1;
	if (x===1) {
		if (StudyE(11)) return c.d0
		if (g.achievement[507]) out=out.mul(achievement(507).effect().div(c.e2).add(c.d1));
	} else if (x===4) {
		if (StudyE(11)) return c.d0
		if (g.achievement[508]) out=out.mul(achievement(508).effect().div(c.e2).add(c.d1));
		if (g.research.r10_14) out=out.mul(researchEffect(10,14))
	} else if (x===7) {
		if (g.achievement[509]) out=out.mul(achievement(509).effect().div(c.e2).add(c.d1));
		if (g.research.r5_14) out=out.mul(Decimal.pow(stat.neuralEnergyEffect,researchEffect(5,14)))
	}
	if ((x%3)===0) if (g.research.r13_11) out = out.mul(researchEffect(13,11))
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
	"Row 10 Masteries are {v}{t} stronger",
	"Increase the exponent of the Hawking radiation gain formula by {v}"
]
function formatStardustBoost(x){
	let val = stat["stardustBoost"+x]
	if ([2,3,6,8,11].includes(x)) return (val.gte(c.d10)?val:val.sub(c.d1).mul(c.e2)).noLeadFormat(2)
	return val[[7].includes(x)?"formatFrom1":"noLeadFormat"]([10,12].includes(x)?4:[4,7,9].includes(x)?3:2)
}
const showStardustBoostFormula = {
	1:function(){return "((1 + S ÷ 10)<sup>0.5</sup> × 10<sup>log(S + 1)<sup>1.5</sup> × 0.1</sup>)"+formulaFormat.exp(stardustBoostBoost(1))},
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
	x=(x===undefined)?g.truetimeThisStardustReset:N(x)
	return Decimal.logarithmicSoftcap(x.pow(c.d0_5),c.e3,c.d4,c.d1)
}

// Stardust Upgrades
function buyStardustUpgrade(x,manual=false) {
	if (((achievement.maxForLocks.specificStardustUpgrades[g.achOnProgressBar]?.[x]??Infinity)===g.stardustUpgrades[x-1])&&achievement.locking(g.achOnProgressBar)) {if (manual) {achievement.lockPopup()}return}
	if (((achievement.maxForLocks.totalStardustUpgrades[g.achOnProgressBar]??Infinity)===effectiveStardustUpgrades())&&achievement.locking(g.achOnProgressBar)) {if (manual) {achievement.lockPopup()}return}
	if (g.stardust.gte(stat["stardustUpgrade"+x+"Cost"])&&(g.stardustUpgrades[x-1]<stat["stardustUpgrade"+x+"Cap"])) {
		if (stat["stardustUpgrade"+x+"Cost"].lt(c.inf.recip())) addAchievement(716)
		o.sub("stardust",stat["stardustUpgrade"+x+"Cost"]);
		g.stardustUpgrades[x-1]++;
		updateStat("stardustUpgrade"+x+"Cost")
		if (g.stardustUpgrades[4]>0) unlockFeature("Dark Matter");
		if (g.stardustUpgrades[4]>1) unlockFeature("Energy");
	}
	addAchievements("stardustUpgrade");
}
const stardustUpgradeTooltip = [
	null,
	function(x=g.stardustUpgrades[0]) {
		return "Unlock a new Axis"
	},
	function(x=g.stardustUpgrades[1]) {
		return (x===0)?"Unlock axis autobuyer":("Keep "+(stat.stardustUpgrade2AxisRetentionFactor*100).toFixed(2)+"% of the "+axisCodes[x-1]+" Axis on Stardust reset")
	},
	function(x=g.stardustUpgrades[2]) {
		return "Unlock a new Stardust Boost"
	},
	function(x=g.stardustUpgrades[3]) {
		return (x===0)?"You can activate both first row Masteries simultaneously":(x===4)?"Unlock 2 new rows of Masteries":"Unlock a new row of Masteries"
	},
	function(x=g.stardustUpgrades[4]) {
		return (x===0)?"Unlock Dark Matter":("Unlock "+toTitleCase(energyTypes[x-1])+" Energy")
	}
]
const stardustUpgradeNames = [null,"Dimensional","Retention","Boost","Mastery","Progression"]
const baseStardustUpgradeCosts = [
	[c.d1_5e6,c.d4_5e10,c.e14,c.e20,c.ee10,N("e5e11"),N("e2e13"),N(betaActive?"e7.5e13":"e8e13")],
	[c.d50,c.e2,c.e4,c.e6,c.e8,c.e12,c.e16,c.e24,c.e100,N("ee11"),N("ee13"),N("ee15"),N("ee17")],
	[c.d3_3333e9,c.d1_5e16,c.e43,c.e75,c.e140,c.inf,c.ee4,c.ee5,c.ee6,N("6.66e6666666")],
	[c.d125,c.d2e7,c.d5e18,c.d1_5e61,c.e115],
	[c.d5e11,c.e60,c.e96,c.e175,c.d2_2222e222,c.e270,c.inf,c.ee5,c.e2e5,c.e5e5,c.e1_5e6]
]
function stardustUpgradeCost(x,y=g.stardustUpgrades[x-1]) {
	if (y>=stat["stardustUpgrade"+x+"Cap"]) return c.maxvalue
	let cost = baseStardustUpgradeCosts[x-1][y];
	// hyper-3.5
	if (achievement.ownedInTier(5) >= 9) {cost = cost.dilate(stat.wormholeMilestone9Effect);}
	// hyper-3
	if (g.achievement[602]&&(x===3)) {cost = cost.pow(c.d0_9)}
	if (g.achievement[520]&&(y===0)) {cost = cost.root(achievement(520).effect());}
	if (g.achievement[612]) {cost = cost.pow(achievement(612).effect()**g.stars)}
	for (let i of [103,113]) {if (study13.bound(i)) {cost = cost.pow(study13.bindingEff(i))}}
	cost = [cost,stat.whiteLightEffect,study13.rewards.wildfire.eff()].decimalPowerTower()
	if (g.wormholeUpgrades[8]>0) {cost = [cost,wormholeUpgrades[8].eff(),stat.luckUpgLevel_quatrefolium_star].decimalPowerTower()}
	// hyper-2
	if (g.achievement[519]) cost = cost.div(achievement(519).effect().pow(g.stars));
	if (g.achievement[915]) cost = cost.div(achievement(915).effect().pow(g.stardustUpgrades.sum()))
	return cost;
}
function effectiveStardustUpgrades() {      // for Study IV and certain achievements
	return g.stardustUpgrades.map((x,i)=>Math.max(x,[0,1,0,5,0][i])).sum()
}

// Automation
const autobuyers = {
	axis:{baseInterval:5,baseCost:c.e25,costGrowth:c.d1_05,resource:"exoticmatter",extRes:"exotic matter",unlockReq:function(){return g.stardustUpgrades[1]>0;}},
	darkAxis:{baseInterval:5,baseCost:c.e25,costGrowth:c.d1_05,resource:"darkmatter",extRes:"dark matter",unlockReq:function(){return achievement.ownedInTier(5)>=1;}},
	stardustUpgrade:{baseInterval:30,baseCost:c.e100,costGrowth:c.d1_1,resource:"stelliferousEnergy",extRes:"stelliferous energy",unlockReq:function(){return achievement.ownedInTier(5)>=3;}},
	star:{baseInterval:15,baseCost:c.e25,costGrowth:c.d1_08,resource:"stardust",extRes:"stardust",unlockReq:function(){return achievement.ownedInTier(5)>=4;}},
	research:{baseInterval:60,baseCost:c.ee4,costGrowth:c.d1_03,resource:"masteryPower",extRes:"mastery power",unlockReq:function(){return g.achievement[817]}},
};
const autobuyerMeta = {
	cost:function(id,n=g[id+"AutobuyerUpgrades"]){
		let lv = n, ss = this.softcap(id), base = autobuyers[id].baseCost
		if (g.wormholeUpgrades[9]) {base = base.div(c.d10)}
		if (lv>=ss) {lv += (lv-ss+1)**2*0.08}
		return [base,autobuyers[id].costGrowth,N(lv)].decimalPowerTower()
	},
	maxInterval:function(){return g.wormholeUpgrades[9]?0.05:0.1},
	interval:function(id,n=g[id+"AutobuyerUpgrades"]){return Math.max(this.maxInterval(),autobuyers[id].baseInterval*0.95**Math.min(n,this.softcap(id))*0.99**Math.max(n-this.softcap(id),0));},
	softcap:function(id){return Math.ceil(Math.log(0.1/autobuyers[id].baseInterval)/Math.log(0.95))},
	cap:function(id){return this.softcap(id)+Math.max(Math.ceil(Math.log(this.maxInterval()/(autobuyers[id].baseInterval*0.95**this.softcap(id)))/Math.log(0.99)),0);},
	totalLevels:function(){return Object.keys(autobuyers).map(x=>g[x+"AutobuyerUpgrades"]).sum()}
};
function upgradeAutobuyer(id) {
	while ((g[autobuyers[id].resource].gte(autobuyerMeta.cost(id))) && (g[id+"AutobuyerUpgrades"]<autobuyerMeta.cap(id))) {
		o.sub(autobuyers[id].resource,autobuyerMeta.cost(id));
		g[id+"AutobuyerUpgrades"]++;
	}
	addAchievements("autobuyerUpgrade")
}
const stardustAutomatorModes = ["Amount of stardust","Real time in this Stardust","<i>X</i> times (current stardust)","(current stardust)<sup><i>X</i></sup>","<i>X</i> times (previous stardust)","(previous stardust)<sup><i>X</i></sup>"]
const wormholeAutomatorModes = ["Amount of HR","Real time in this Wormhole","<i>X</i> times (current HR)","(current HR)<sup><i>X</i></sup>","<i>X</i> times (previous HR)","(previous HR)<sup><i>X</i></sup>"]
const researchAutobuyerModes = ["All free research"]
const inputStarAllocatorBuild = {
	selectRow:function(){
		popup({
			text:"Select row: ",
			buttons:countTo(10).map(x=>[x,"inputStarAllocatorBuild.order=[];inputStarAllocatorBuild.editRow("+x+")"]),
			buttonSize:5
		})
	},
	order:[],
	editRow:function(row){
		let tableStyle = "border-style:solid;border-color:#00ff00;border-collapse:collapse;border-width:1px;"
		popup({
			text:"<table style=\"vertical-align:bottom;\"><tr><td style=\"width:160px\">Current selection:</td>"+countTo(4,true).map(x=>"<td style=\"width:50px\">"+(inputStarAllocatorBuild.order[x]??((x===0)?"<i>None</i>":""))+"</td>").join("")+"</tr></table><br><br>"+((inputStarAllocatorBuild.order.length===4)?"Is this correct?":("Options are:<br>"+tableGenerator([countTo(4).map(x=>row*10+x),countTo(4).map(x=>starText(row*10+x).replace("{x}",dynamicStars.includes(row*10+x)?formatStarEffect(row*10+x):null))],tableStyle,tableStyle,tableStyle+"width:25%;padding:8px;",false)+"<br><br>Select next or save current selection:")),
			buttons:[...countTo(4).map(x=>10*row+x).filter(x=>!inputStarAllocatorBuild.order.includes(x)).map(x=>[x,"inputStarAllocatorBuild.order.push("+x+");inputStarAllocatorBuild.editRow("+row+")"]),["Save","inputStarAllocatorBuild.setRow("+row+")"],["Cancel",""]],
			buttonSize:4
		})
	},
	setRow:function(row){
		for (let i=1;i<5;i++) {g.starAllocatorBuild.remove(row*10+i)}
		for (let i of inputStarAllocatorBuild.order) {g.starAllocatorBuild.push(i)}
	}
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


// Stars
function starScaleStart(gal=g.galaxies) {
	let out = g.achievement[703]?achievement(703).effect():c.d25
	if (study13.bound(155)) {out = out.sub(study13.bindingEff(155))}
	return out
}
function starScalePower(x=g.stars,gal=g.galaxies) {
	let out = c.d1.sub(studies[2].reward(1).div(c.e2));
	if (g.research.r7_8) {out = out.mul(researchEffect(7,8));}
	if ((x>40)&&(gal>=galaxyEffects[4].req)) {out = out.mul(galaxyEffects[4].penalty.value(gal).mul(x-40).add(c.d1))}
	if ((g.activeStudy===10)&&(studyPower(10)===1)) {out = out.mul(c.d2)}
	return out
}
function starCost(x=g.stars,gal=g.galaxies,cap=starCap()) {
	if (x>=cap) {return c.maxvalue;}
	x=N(x)
	// scale start
	let scaling_start = starScaleStart(gal)
	if (scaling_start.lte(c.d0)) {return c.maxvalue}
	// effective stars
	let effx=x
	if (g.research.r8_14) {effx = effx.sub(researchEffect(8,14))};
	if (study13.bound(256)) {effx = effx.add(study13.bindingEff(256))}
	if (effx.sign===-1) {effx = c.d0};
	// formula exponent
	let formula_exponent = StudyE(2)?[c.d3,c.d4,c.d5,c.d6][studyPower(2)]:c.d2;
	// scale power
	let scaling_power = starScalePower(x,gal).mul(c.d2_5);
	// base cost
	let cost = Decimal.pow(c.d2,Decimal.exponentialScaling(Decimal.superexpScaling(effx,scaling_start,scaling_power),c.d10,c.d0_5).pow(formula_exponent).add(c.d10)).pow(effx.gte(c.d10)?c.d1_5:c.d1);
	cost = cost.mul(galaxyEffects[3].penalty.value(gal).pow(x)).pow(galaxyEffects[1].penalty.value(gal))
	// ackermannian cost reductions
	// hyper-3.5 cost reductions
	if (achievement.ownedInTier(5) >= 9) {cost = cost.dilate(stat.wormholeMilestone9Effect);}
	// hyper-3 cost reductions
	if (g.research.r6_2) {cost = cost.root(stat.stelliferousEnergyEffect.pow(researchEffect(6,2)));}
	if (g.research.r7_11) {cost = cost.pow(researchEffect(7,11).pow(g.darkstars));}
	if (g.research.r13_7) {cost = cost.pow(researchEffect(13,7))}
	if (g.achievement[612]) {cost = cost.pow(achievement(612).effect()**g.stardustUpgrades.sum())}
	cost = cost.pow(stat.whiteLightEffect)
	if (g.achievement[701]) {cost = cost.pow(achievement(701).realEffect())}
	if (MasteryE(105)) {cost = cost.pow(masteryEffect(105))}
	cost = cost.pow(luckUpgrades.quatrefolium.star.eff())
	if (g.achievement[811]) {cost = [cost,c.d0_97,N(g.highestGalaxiesSpacetime-gal)].decimalPowerTower()}
	cost = cost.pow(wormholeUpgrades[11].eff())
	if (study13.bound(24)) {cost = [cost,study13.bindingEff(24),x].decimalPowerTower()}
	if (study13.bound(304)) {cost = cost.pow(study13.bindingEff(304))}
	// hyper-2 cost reductions
	if (g.achievement[519]) cost = cost.div(achievement(519).effect().pow(g.stardustUpgrades.sum()));
	if (g.achievement[702]) cost = cost.div(achievement(702).effect().pow(x**2))
	// return
	return cost;
}
function buyStar(manual=false) {
	if (((achievement.maxForLocks.stars[g.achOnProgressBar]??Infinity)===g.stars)&&achievement.locking(g.achOnProgressBar)) {if (manual) {achievement.lockPopup()}return}
	if (g.stardust.gte(starCost())) {
		o.sub("stardust",starCost());
		g.stars++;
		addAchievements("starBuy");
		if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false;
	}
}
function affordableStars(gal=g.galaxies) {
	for (let i=59;i>=0;i--) if (starCost(i,gal).lt(g.stardust)) {return i+1}
	return 0
}
function tryBuyStarUpgrade(x) {
	if (g.confirmations.doubleClickToBuy&&(g.starContainerStyle==="Modern")) {
		if (selections.starClick===x) {
			buyStarUpgrade(x,true)
		}
	} else {
		buyStarUpgrade(x,true)
	}
	selections.starClick = x
}
function buyStarUpgrade(x,manual=false) {
	if (achievement.locking(302)) {if (maxStars(Math.floor(x/10))!==4) {if (manual) {achievement.lockPopup()};return}}
	if (achievement.locking(519)) {if (manual) {achievement.lockPopup()};return}
	if (starList.includes(x) && (unspentStars() > 0) && availableStarRow(Math.floor(x/10)) && (!g.star[x])) {
		g.star[x] = true;
		g.ach519possible = false;
		totalStars++
	}
	if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false;
	addAchievement(412);
}
function respecStars(manual=false) {
	if (achievement.maxForLocks.stardustReset[g.achOnProgressBar]??false) {if (manual) {achievement.lockPopup()}; return}
 	if (StudyE(12)) {notify("Stardust reset is disabled in Study XII","#990000","#ffffff"); return}
	stardustReset();
	for (let i of starList) g.star[i]=false;
	totalStars=0
}
function importStars() {
	popup({
		text:"Import your star build here:",
		input:"",
		buttons:[
			["Confirm","let starBuild = popupInput().split(',');for (let i of starBuild) buyStarUpgrade(Number(i),true)"],
			["Close",""]
		]
	})
}
function exportStars() {
	openExport(starList.filter(x=>g.star[x]).join(","));
}
function maxFullStarRows() {
	for (let i=1;i<11;i++) if (maxStars(i)===4) for (let j=1;j<5;j++) buyStarUpgrade(i*10+j,true);
}
const dynamicStars = [11,12,13,14,42,61,62,63,64,71,72,73,74,91,92,93,94]
const starBoosts = {
	1:function(x) {
		if (StudyE(11)) {return c.d0}
		let out = c.d3
		if (g.star[x+20]) out = out.mul(c.d3);
		if (g.star[x+80]) out = out.mul(starEffect(90));
		out = out.mul(achievement.perAchievementReward[2].currentVal);
		out = out.mul(galaxyEffects[1].boost.value())
		if (study13.bound(57)) {out = out.mul(study13.bindingEff(57))}
		return out
	},
	7:{
		mult:function(){
			let out = c.d1
			if (g.research.r6_10) {out = out.mul(researchEffect(6,10).div(c.e2).add(c.d1))}
			if (study13.bound(46)) {out = out.mul(study13.bindingEff(46))}
			return out
		},
		cap:function() {
			let out = c.e2
			if (g.research.r11_11) {out = out.add(researchEffect(11,11).mul(g.galaxies))}
			return out
		}
	},
	9:function(){
		let out = studies[2].reward(2)
		if (study13.bound(66)) {out = out.mul(study13.bindingEff(66))}
		return out
	}
}
function starEffect(x) {
	if ([11,12,13,14].includes(x)) {
		let exp = starBoosts[1](x), mult;
		if (x===11) mult = Decimal.sub(c.d1,g.exoticmatter.add(c.d1).mul(c.e10).log10().log10().pow(c.dm1));
		else if (x===12) mult = g.exoticmatter.add(c.d1).mul(c.e10).log10().log10().pow(c.dm1);
		else if (x===13) mult = Decimal.sub(c.d1,g.truetimeThisStardustReset.div(c.e3).add(c.d1).pow(c.dm1));
		else if (x===14) mult = g.truetimeThisStardustReset.div(c.e3).add(c.d1).pow(c.dm1);
		return exp.mul(mult).pow10();
	}
	if (x===20) {
		let out = (g.research.r34_3)?researchEffect(34,3):c.d3
		return out
	}
	if (x===60) return Decimal.convergentSoftcap(Decimal.logarithmicSoftcap(g.exoticmatter.add(c.d1).pow(c.d0_02).log10().pow(c.d0_7),c.e3,c.d0_5),c.d7e3,c.d8e3);
	if (x===64) return Decimal.convergentSoftcap(g.exoticmatter.add(c.d10).log10().pow(c.d0_1),c.d1,c.d3);
	if ([71,72,73,74].includes(x)) {
		let ef;
		if (x===71) ef = g.masteryPower.pow(c.sqrt0_1).add(c.d10).log10().log10().mul(c.d22_5);
		else if (x===72) ef = g.exoticmatter.fix(c.d0).add(c.d10).log10().log10().pow(c.d2).mul(c.d1_5);
		else if (x===73) ef = g.stardust.add(c.d10).log10().log10().mul(c.d8);
		else if (x===74) ef = g.truetimeThisStardustReset.add1Log(c.d10).mul(c.d7_5);
		ef=ef.mul(starBoosts[7].mult())
		let lim = starBoosts[7].cap()
		return Decimal.convergentSoftcap(ef,lim.mul(c.d0_75),lim);
	}
	if (x===90) return g.exoticmatter.add(c.d1).log10().pow(c.d0_75).div(c.e2).add(c.d1).pow(starBoosts[9]());
	functionError("starEffect",arguments)
}
function formatStarEffect(x) {
	if (Math.floor(x/10)===2) return starEffect(20).noLeadFormat(2)
	if (x===42) return c.e18.format()
	if ([61,62,63].includes(x)) return starEffect(60).format(2)
	if (Math.floor(x/10)===9) return starEffect(90).format(2)
	return starEffect(x).noLeadFormat(x===64?3:2)
}
function showStarEffectFormula(x) {
	if (x===42) return "10<sup>18</sup>"
	if ([11,12,13,14].includes(x)) {
		let modifier
		if (x===11) modifier = " × (1 - 1 ÷ log<sup>[2]</sup>((EM + 1) × "+c.e10.format()+"))"
		if (x===12) modifier = " ÷ log<sup>[2]</sup>((EM + 1) × "+c.e10.format()+")"
		if (x===13) modifier = " × (1 - 1 ÷ (1 + t ÷ 1,000))"
		if (x===14) modifier = " ÷ (1 + t ÷ 1,000)"
		return "10<sup>"+starBoosts[1](x).noLeadFormat(3)+modifier+"</sup>"
	}
	if ([61,62,63].includes(x)) return formulaFormat.convSoftcap(formulaFormat.logSoftcap("log((EM + 1)<sup>0.02</sup>)<sup>0.7</sup>",c.e3,c.d0_5,starEffect(60).gt(c.e3)),c.d7e3,c.d8e3,starEffect(60).gt(c.d7e3))
	if (x===64) return formulaFormat.convSoftcap("log(EM + 10)<sup>0.1</sup>",c.d1,c.d3,true) // always softcapped
	if ([71,72,73,74].includes(x)) {
		let power = starBoosts[7].mult(),out
		if (x===71) out = "log<sup>[2]</sup>(MP<sup>0.31623</sup> + 10)"+formulaFormat.mult(power.mul(c.d22_5))
		if (x===72) out = "log<sup>[2]</sup>(EM + 10)<sup>2</sup>"+formulaFormat.mult(power.mul(c.d1_5))
		if (x===73) out = "log<sup>[2]</sup>(S + 10)"+formulaFormat.mult(power.mul(c.d8))
		if (x===74) out = "log(t + 1)"+formulaFormat.mult(power.mul(c.d7_5))
		let lim = starBoosts[7].cap()
		return formulaFormat.convSoftcap(out,lim.mul(c.d0_75),lim,starEffect(x).gt(lim.mul(c.d0_75)))
	}
	if ([91,92,93,94].includes(x)) {
		let out = "log(EM + 1)<sup>0.75</sup> ÷ 100 + 1"
		if (starBoosts[9]().neq(c.d1)) out = "("+out+")<sup>"+starBoosts[9]().noLeadFormat(3)
		return out
	}
}
function showStarInfo(x) {
	alignTooltip("starInfo","button_star"+x+"Modern")
	d.innerHTML("starInfo","<b>Star "+x+"</b><hr>"+starText(x).replace("{x}",dynamicStars.includes(x)?(showFormulas?formulaFormat(showStarEffectFormula(x)):formatStarEffect(x)):null))}
function updateStarLayout() {
	d.display("starContainerLegacy",g.starContainerStyle==="Legacy"?"inline-block":"none")
	d.display("starContainerModern",g.starContainerStyle==="Modern"?"inline-block":"none")
	for (let i of document.getElementsByClassName("starID"+g.starContainerStyle)) i.style.display=g.starIdsShown?"inline-block":"none"
	for (let i of document.getElementsByClassName("starActive"+g.starContainerStyle)) i.style.display=g.starActivityShown?"inline-block":"none"
}
const starIcons = (()=>{
	let out = []
	for (let i=11;i<15;i++) out.push([i,(i>12?icon.time:icon.exoticmatter)+[icon.inv,""][i%2]+"→"+icon.exoticmatter])
	for (let i=21;i<25;i++) out.push([i,icon[axisCodes[i-21]+"Axis"]+icon.plus])
	for (let i=31;i<35;i++) out.push([i,icon.star("")+classes.xscript(icon.plus,classes.stars(i-20))])
	for (let i=41;i<45;i++) out.push([i,(i>42?icon.stardust:icon.exoticmatter)+classes.sup(["+","^"][i%2])])
	for (let i=51;i<55;i++) out.push([i,icon.mastery(i-49)])
	for (let i=61;i<65;i++) out.push([i,icon.exoticmatter+icon.arr+icon[axisCodes[i-57]+"Axis"]])
	for (let i=71;i<75;i++) out.push([i,[icon.masteryPower,icon.exoticmatter,icon.stardust,icon.time][i-71]+icon.arr+icon.tickspeed])
	out.push([81,icon.normalaxis+classes.exoticmatter("$")+icon.minus])
	out.push([82,icon.VAxis+icon.plus])
	out.push([83,icon.darkaxis+classes.darkmatter("$")+icon.minus])
	out.push([84,icon.darkYAxis+icon.plus])
	for (let i=91;i<95;i++) out.push([i,icon.exoticmatter+"→"+icon.star(i-80)])
	for (let i=101;i<105;i++) out.push([i,icon.mastery(i-95)])
	return Object.fromEntries(out)
})()
function starText(x) {
	if ([11,12,13,14].includes(x)) {return "Exotic matter gain is multiplied by {x} ("+["de","in"][x%2]+"creases with "+(x>12?"time in this stardust reset":"exotic matter")+")";}
	if ([21,22,23,24].includes(x)) {return "Gain "+starEffect(20)+" free "+axisCodes[x-21]+" axis";}
	if ([31,32,33,34].includes(x)) {return "Cube the effect of star "+(x-20)+" (two above this)";}
	if (x===41) {return "Exotic matter gain is raised to the power of 1.05";}
	if (x===42) {return "Exotic matter gain is multiplied by {x}";}
	if (x===43) {return "Stardust gain is raised to the power of 1.05";}
	if (x===44) {return "Stardust gain is multiplied by 100";}
	if ([51,52,53,54,101,102,103,104].includes(x)) {return "You can activate all Row "+(x-((x<101)?49:95))+" Masteries simultaneously";}
	if ([61,62,63].includes(x)) {return "Gain {x} free "+axisCodes[x-57]+" axis (based on exotic matter)";}
	if (x===64) {return "Gain {x} free S axis (based on exotic matter)";}
	if ([71,72,73,74].includes(x)) {return "The game runs {x}% faster (based on "+["mastery power","exotic matter","stardust","time in this stardust reset"][x-71]+")";}
	if ([81,83].includes(x)) {return (x===83?"Dark":"Normal")+" axis costs are raised to the power of 0.8";}
	if ([82,84].includes(x)) {return (x===84?"Dark Y":"Normal V")+" axis is 3 times stronger";}
	if ([91,92,93,94].includes(x)) {return "The effect of star "+(x-80)+" is raised to the power of {x} (based on exotic matter)";}
	functionError("starText",arguments)
}
function starRowsShown() {
	return Array.removeDuplicates(countTo(40).map(x=>starRow(x))).slice(0,Array.removeDuplicates(countTo(Math.min(g.stars,40)).map(x=>starRow(x))).length+1).sort((a,b)=>a-b)
};
function unspentStars() {return g.stars-totalStars}
function starRow(index,s2=StudyE(2)) {
	if (s2) {
		if (studyPower(2)===0) return [1,1,2,1,1,2,3,2,2,3,4,3,3,4,5,4,4,5,6,5,5,6,7,6,6,7,8,7,7,8,9,8,8,9,10,9,9,10,10,10][index-1];
		if (studyPower(2)===1) return [1,1,1,2,1,2,2,3,2,3,3,4,3,4,4,5,4,5,5,6,5,6,6,7,6,7,7,8,7,8,8,9,8,9,9,10,9,10,10,10][index-1];
		if (studyPower(2)===2) return Math.floor(index/4+0.75);
		return [3,3,9,3,9,2,3,9,2,4,9,2,4,5,2,4,5,6,4,5,6,7,5,6,7,8,6,7,8,1,7,8,1,10,8,1,10,1,10,10][index-1];
	}
	return [1,1,2,1,2,3,1,2,3,4,2,3,4,5,3,4,5,6,4,5,6,7,5,6,7,8,6,7,8,9,7,8,9,10,8,9,10,9,10,10][index-1];
}
function maxStars(row) {
	let output=0;
	for (let i=0;i<Math.min(g.stars,40);i++) if (starRow(i+1)===row) output++;
	return output;
}
function availableStarRow(row) {
	return (maxStars(row)>[1,2,3,4].map(x=>g.star[x+10*row]?1:0).sum());
}
function starCap(){return 60}

// Dark Matter
const darkmatterVariables = ["darkmatter","darkmatterThisWormholeReset","darkmatterThisSpacetimeReset","totaldarkmatter"]
function incrementDarkMatter(x) {
	x=x.fix(c.d0);
	for (let i of darkmatterVariables) o.add(i,x)
}
function buyDarkAxis(x,manual=false) {
	if (Decimal.eq(maxAxisForAchievement(x),g["dark"+x+"Axis"])) {if (manual) {achievement.lockPopup()};return}
	if (g.darkmatter.gt(darkAxisCost(x))&&(4+g.stardustUpgrades[0]>axisCodes.indexOf(x))) {
		if (darkAxisCost(x).gt(c.d1)) {g.ach908possible = false}
		o.sub("darkmatter",darkAxisCost(x));
		o.add("dark"+x+"Axis",c.d1);
	}
	if (g.darkSAxis.gt(c.d0)) g.ach525possible=false;
	addAchievements("axisBuy");
}
function buyMaxDarkAxis(caps,manual=false) {
	let total = axisCodes.map(x=>g["dark"+x+"Axis"]).sumDecimals()
	for (let j=0; j<4+g.stardustUpgrades[0]; j++) {
		let amount = caps[j]==="u"?maxAffordableDarkAxis(axisCodes[j]):Decimal.min(maxAffordableDarkAxis(axisCodes[j]),N(caps[j]).fix(c.d0,false));
		if (amount==="NA") continue;
		if (amount.lte(g["dark"+axisCodes[j]+"Axis"])) continue;
		amount = amount.min(maxAxisForAchievement("dark"+axisCodes[j]))
		if (darkAxisCost(axisCodes[j],amount.sub(c.d1)).lt(g.darkmatter)) o.sub("darkmatter",darkAxisCost(axisCodes[j],amount.sub(c.d1)));
		g["dark"+axisCodes[j]+"Axis"]=amount;
		if (darkAxisCost(axisCodes[j],g["dark"+axisCodes[j]+"Axis"].sub(c.d1)).gt(c.d1)) {g.ach908possible = false}
	}
	if (g.darkSAxis.gt(c.d0)) g.ach525possible=false;
	addAchievements("axisBuy");
	if (manual&&(achievement.maxForLocks.axis[g.achOnProgressBar]!==undefined)&&achievement.locking(g.achOnProgressBar)&&axisCodes.map(x=>g["dark"+x+"Axis"]).sumDecimals().eq(total)) {achievement.lockPopup();}
}
function darkStarEffect1(x=stat.realDarkStars) {
	return studies[4].reward(3).mul(x).div(c.d20).add(c.d1)
}
function darkStarEffect3SoftcapInc() {	
	let out = c.d10
	if (g.achievement[803]) out = out.div(c.d0_97)
	return out
}
function darkStarEffect3(x) {
	x=(x===undefined)?stat.realDarkStars:N(x);
	if (x.lte(c.e2)) return x;
	let inc = darkStarEffect3SoftcapInc()
	return Decimal.convergentSoftcap(x.sub(c.e2).div(inc).add(c.d1).ln().mul(inc).add(c.e2),c.d150,c.d200);
}
function darkStarEffectHTML() {
	let v1 = stat.realDarkStars;
	let v2 = calcStatWithDifferentBase("realDarkStars",stat.maxAffordableDarkStars.max(g.darkstars.add(c.d1)));
	let eff2 = darkAxisBoostedNextStar()
	let eff3text
	let eff3inc = darkStarEffect3SoftcapInc()
	if (showFormulas) {eff3text = formulaFormat(v1.gte(c.e2)?formulaFormat.convSoftcap("100 + ln(★ ÷ "+eff3inc.noLeadFormat(3)+" - 9) × "+eff3inc.noLeadFormat(3),c.d150,c.d200,darkStarEffect3().gt(c.d150)):"★")}
	else {eff3text = arrowJoin(darkStarEffect3(v1).noLeadFormat(4),darkStarEffect3(v2).noLeadFormat(4))}
	return [
		"The base gain of dark matter is raised to the power of "+(showFormulas?formulaFormat("★"+formulaFormat.mult(studies[4].reward(3).div(c.d20))+" + 1"):(arrowJoin(darkStarEffect1(v1).noLeadFormat(4),darkStarEffect1(v2).noLeadFormat(4)))),
		(eff2.length===(8+study13.rewardLevels.slabdrill)?"All dark":(eff2.length===0)?"No dark":("Dark "+eff2.joinWithAnd()))+" axis will become stronger",
		"You will gain "+eff3text+"% more free axis from dark matter"
	].join("<br>");
}
function realDarkAxisScalePower(type){
	let out=stat.darkAxisScalingPower
	if (type==="S") {out=out.mul(c.d2)}
	else if (type==="O") {out=out.mul(c.d3)}
	return out
}
function realDarkAxisSuperscalePower(type){
	let out=stat.darkAxisSuperscalingPower
	if (type==="W") {out=out.mul(c.d3)}
	else if (type==="S") {out=out.mul(c.d5)}
	else if (type==="O") {out=out.mul(c.d9)}
	return out
}
function realDarkAxisCostDivisor(type) {
	if (StudyE(12)) {return c.d1}
	let output = stat.darkAxisCostDivisor;
	if (study13.bound(25)) {output=output.layerf(x=>Math.max(x-study13.bindingEff(25).toNumber(),-1)).max(c.minvalue);}
	return output;
}
function realDarkAxisCostExponent(type) {
	let typeNum = axisCodes.indexOf(type)
	let output = stat.darkAxisCostExponent;
	if (type==="S"&&g.research.r3_11) {output = output.mul(researchEffect(3,11));}
	if (typeNum<8) {
		let tier7res = ["r16_14","r15_14","r14_14","r13_14","r13_15","r14_15","r15_15","r16_15"][typeNum]
		if (g.research[tier7res]) output = output.mul(researchEffect(researchRow(tier7res),researchCol(tier7res)))
	}
	for (let i of researchGroupList.spatialsynergism.effectors["dark"+type]) {if (g.research[i]) {output = output.div(research[i].value())}}
	if (type==="P") {output = output.mul(stat.antiPAxisEffect.pow(stat.realantiPAxis))}
	return output;
}
function darkAxisCost(type,axis=g["dark"+type+"Axis"],ignoreStudy8=false) { // ignoreStudy8 is used for the price on the buttons
	let cost = null;
	axis = Decimal.semiexpScaling(axis,stat.darkAxisSuperscalingStart,realDarkAxisSuperscalePower(type));
	axis = Decimal.linearScaling(axis,stat.darkAxisScalingStart,realDarkAxisScalePower(type));
	if (type==="X") {cost = axis.pow(c.d1_2).add(c.d1).pow10();}
	else if (type==="Y") {cost = axis.add(c.d1).mul(c.d2).pow10();}
	else if (type==="Z") {cost = axis.add(c.d10).pow10();}
	else if (type==="W") {cost = axis.pow(c.d1_5).add(c.d15).pow10();}
	else if (type==="V") {cost = axis.pow(c.d1_25).add(c.d30).pow10();}
	else if (type==="U") {cost = axis.pow(c.d2).add(c.d45).pow10();}
	else if (type==="T") {cost = axis.mul(c.d4).add(c.e2).pow10();}
	else if (type==="S") {cost = [c.inf,c.d1_2,axis].decimalPowerTower();}
	else if (type==="R") {cost = [N("e5.5e8"),c.d1_2,axis].decimalPowerTower()}
	else if (type==="Q") {cost = [c.ee9,c.d1_05,axis].decimalPowerTower()}
	else if (type==="P") {cost = [N("e3e9"),c.d4div3,axis].decimalPowerTower()}
	else if (type==="O") {cost = axis.add(c.d30).div(c.d30).layerplus(3)}
	else {functionError("darkAxisCost",arguments)}
	cost = corruption.value("darkAxis",cost)
	cost=cost.pow(realDarkAxisCostExponent(type));
	cost=cost.div(realDarkAxisCostDivisor(type));
	if (StudyE(8)&&Decimal.gt(cost,achievement.locking(908)?c.d1:studies[8].darkAxisMaxCost())&&(!ignoreStudy8)) return c.maxvalue
	return cost;
}
function maxAffordableDarkAxis(type,dm=g.darkmatter) {
	if (StudyE(8)) dm = Decimal.min(dm,achievement.locking(908)?c.d1:studies[8].darkAxisMaxCost())
	if (darkAxisCost(type).gte(dm)&&dm.eq(g.darkmatter)) return g["dark"+type+"Axis"];
	let effective_DM = dm.mul(realDarkAxisCostDivisor(type)).root(realDarkAxisCostExponent(type));
	effective_DM = corruption.invertValue("darkAxis",effective_DM)
	let axis;
	if (type==="X") {axis = effective_DM.lte(c.d10)?c.dm1:effective_DM.log10().sub(c.d1).pow(c.d5div6);}
	else if (type==="Y") {axis = effective_DM.lte(c.e2)?c.dm1:effective_DM.log10().div(c.d2).sub(c.d1);}
	else if (type==="Z") {axis = effective_DM.lte(c.e10)?c.dm1:effective_DM.log10().sub(c.d10);}
	else if (type==="W") {axis = effective_DM.lte(c.e15)?c.dm1:effective_DM.log10().sub(c.d15).pow(c.d2div3);}
	else if (type==="V") {axis = effective_DM.lte(c.e30)?c.dm1:effective_DM.log10().sub(c.d30).pow(c.d0_8);}
	else if (type==="U") {axis = effective_DM.lte(c.e45)?c.dm1:effective_DM.log10().sub(c.d45).pow(c.d0_5);}
	else if (type==="T") {axis = effective_DM.lte(c.e100)?c.dm1:effective_DM.log10().sub(c.e2).div(c.d4);}
	else if (type==="S") {axis = effective_DM.lte(c.inf)?c.dm1:effective_DM.log(c.d2).div(c.d1024).log(c.d1_2);}
	else if (type==="R") {axis = effective_DM.lte("e5.5e8")?c.dm1:effective_DM.log10().div("5.5e8").log(c.d1_2);}
	else if (type==="Q") {axis = effective_DM.lte(c.ee9)?c.dm1:effective_DM.log10().div(c.e9).log(c.d1_05);}
	else if (type==="P") {axis = effective_DM.lte("e3e9")?c.dm1:effective_DM.log10().div(3e9).log(c.d4div3);}
	else if (type==="O") {axis = effective_DM.lte(N(30/30).layerplus(3))?c.dm1:effective_DM.layerplus(-3).mul(c.d30).sub(c.d30);}
	else {functionError("maxAffordableDarkAxis",arguments)}
	axis = Decimal.linearSoftcap(axis,stat.darkAxisScalingStart,realDarkAxisScalePower(type));
	axis = Decimal.semilogSoftcap(axis,stat.darkAxisSuperscalingStart,realDarkAxisSuperscalePower(type));
	return axis.floor().add(c.d1);
}
function darkStarPriceMod(type) {
	if (type==="sub") {
		let output=c.d0;
		if (MasteryE(63)) {output=output.add(masteryEffect(63));}
		return output
	} else if (type==="div") {
		let output=stat.stardustBoost9;
		if (g.achievement[512]) {output=output.div(0.9975**g.stars);}
		if (g.research.r6_3) {output=output.mul(stat.gravitationalEnergyEffect.pow(researchEffect(6,3)));}
		if (g.research.r16_12) {output=output.mul(researchEffect(16,12));}
		output = output.mul(luckUpgrades.quatrefolium.darkstar.eff())
		return output
	} else if (type==="pow") {
		let output=c.d1
		if (study13.bound(26)) {output=output.mul(study13.bindingEff(26))}
		return output
	} else {
		functionError("darkStarPriceMod",arguments)
	}
}
function darkStarReq(x) {
	x=(x===undefined)?g.darkstars:N(x);
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
	let out = stat.maxAffordableDarkStars.gte(start) ? formulaFormat.expScaling("★"+formulaFormat.mult(power.add(c.d1))+formulaFormat.add(start.mul(power).neg()),start,power,true) : "★"
	out = "(("+out+(stat.maxAffordableDarkStars.gte(start)?"<br>":"")+" + 22)<sup>2</sup> - 196)"+formulaFormat.exp(darkStarPriceMod("pow"))+formulaFormat.mult(c.d0_125.div(darkStarPriceMod("div")))+formulaFormat.add(darkStarPriceMod("sub").neg())
	if (darkStarReq().eq(c.d0)) out = "max("+out+", 0)"
	return formulaFormat(out)
}
function darkAxisBoostedNextStar(){
	let v1 = stat.realDarkStars;
	let v2 = calcStatWithDifferentBase("realDarkStars",stat.maxAffordableDarkStars.max(g.darkstars.add(c.d1)));
	let out = [];
	for (let i of axisCodes.slice(0,8+study13.rewardLevels.slabdrill)) if (Decimal.neq(darkStarEffect2Level(i,v1),darkStarEffect2Level(i,v2))) out.push(i);
	return out;
}
function darkStarEffect2Level(axis,x) {
	x=(x===undefined)?stat.realDarkStars:N(x);
	let axisNum = axisCodes.indexOf(axis)
	let cycles = x.div((axisNum>7)?c.d32:c.d8).floor();
	let over = (axisNum>7)?x.sub(axisNum*8-64).sub(cycles.mul(c.d32)).div(c.d8).max(c.d0).min(c.d1):x.sub(axisNum).sub(cycles.mul(c.d8)).max(c.d0).min(c.d1);
	let out = Decimal.add(cycles,over);
	if (axis==="W") {return Decimal.linearSoftcap(out,c.d10,c.d3)};
	if (axis==="S") {return Decimal.logarithmicSoftcap(out,c.d10,c.d9)};
	if (axis==="O") {return Decimal.logarithmicSoftcap(out,c.d20,c.d1,-1)};
	return Decimal.linearSoftcap(out,c.d40,c.d1);
}
function darkStarEffect2LevelFormula(axis) {
	let axisNum = axisCodes.indexOf(axis)
	let out = (axisNum>7)?("⌊★ ÷ 32⌋ + max(0, min((★ ÷ 8) mod 4"+formulaFormat.add(N(8-axisNum))+", 1))"):("⌊★ ÷ 8⌋ + clamp(0, ★ mod 8"+formulaFormat.add(N(-axisNum))+", 1)")
	if (darkStarEffect2Level(axis).gte(["W","S","O"].includes(axis)?c.d10:c.d40)) {
		if (axis==="W") {out = formulaFormat.linSoftcap("<br>"+out+"<br>",c.d10,c.d3,true)}
		else if (axis==="S") {out = formulaFormat.logSoftcap("<br>"+out+"<br>",c.d10,c.d9,true)}
		else if (axis==="O") {out = "log("+formulaFormat.logSoftcap("<br>10<sup>"+out+"</sup><br>",c.d20,c.d1,true)+")"}
		else {out = formulaFormat.logSoftcap("<br>"+out+"<br>",c.d40,c.d1,true)}
	}
	return "<i>"+formulaFormat.bracketize(out)+" × "+((axisNum>7)?"5":"10")+"%</i>"
}
function maxAffordableDarkStars(x) {
	x=(x===undefined)?stat.totalDarkAxis:N(x);
	let effective_dark_axis = x.add(darkStarPriceMod("sub")).mul(darkStarPriceMod("div")).root(darkStarPriceMod("pow"));
	let out = (effective_dark_axis.lt(c.d24))?c.dm1:effective_dark_axis.mul(c.d2).add(c.d49).pow(c.d0_5).mul(c.d2).sub(c.d22);
	if (out.gt(stat.darkStarScalingStart)) {
		let start=stat.darkStarScalingStart;
		let power=stat.darkStarScalingPower;
		out=Decimal.logarithmicSoftcap(out,start,power);
		out=out.sub(start).div(power.add(c.d1)).add(start);
	}
	return out.floor().add(c.d1);
}
function gainDarkStar(cap,manual=false) {
	if (achievement.ownedInTier(5)<7) {
		if (StudyE(12)) {if (manual) {notify("Stardust reset is disabled in Study XII","#990000","#ffffff")}; return}
 	}
	let achCap = ((achievement.maxForLocks.darkstars[g.achOnProgressBar]!==undefined)&&achievement.locking(g.achOnProgressBar))?achievement.maxForLocks.darkstars[g.achOnProgressBar]:c.maxvalue
	if (Decimal.eq(g.darkstars,achCap)) {if (manual) {achievement.lockPopup()};return}
	cap = achCap.min((cap==="u")?c.maxvalue:N(cap))
	if (!(cap instanceof Decimal)) {functionError("gainDarkStar",arguments)}
	let gain = stat.maxAffordableDarkStars.min(N(cap));
	if (!g.darkstarBulk) gain = gain.min(g.darkstars.add(c.d1))
	if (gain.lte(g.darkstars)) return;
	if (gain.sub(g.darkstars).gte(c.d20)) {addAchievement(513);}
	if (gain.sub(g.darkstars).gte(c.d35)) {addAchievement(514);}
	if (gain.sub(g.darkstars).gte(c.d50)) {addAchievement(515);}
	g.darkstars=gain;
	if (achievement.ownedInTier(5)<7) {
		stardustReset();
		g.darkmatter=c.d0;
		for (let i=0;i<12;i++) g["dark"+axisCodes[i]+"Axis"]=c.d0;
	}
	if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false;
	addAchievement(528);
	addAchievement(813);
}

// Energy
function energyTypesUnlocked() {
	if (StudyE(3)) return 6+studies[3].reward(1)
	return Math.max(0,g.stardustUpgrades[4]-1);
}
function energySoftcapStart(x) {
	let out = [c.d0_25,c.d0_25,c.d0_25,c.d4,c.d0_25,c.inf,c.d0_25,c.d0_25,c.d0_5,c.d1][x]
	return out
}
function energySoftcapStrength(x) {
	let out = c.d10
	if (out.lt(1/Math.LN10)) {error("Energy softcap strength out of bounds")}
	return out
}
function energyEffect(x) {
	let type=g[energyTypes[x]+"Energy"];
	let resource=[g.exoticmatter,g.stardust,g.darkmatter,g.XAxis,g.masteryPower,c.d10,g.hawkingradiation,g.knowledge,c.d10,c.d10][x];
	let softcap=energySoftcapStart(x);
	let inc=[c.d0_1,c.d0_1,c.d0_1,c.d0_5,c.d0_1,c.d0_25,c.d0_05,c.d0_025,c.d0_1,c.d0_1][x];
	let eff=((type.gt(resource))&&(resource.gt(c.d1))) ? type.log(resource).log10().mul(StudyE(3)?c.d1:stat.energyEffectBoost).mul(inc).add(c.d1) : c.d1;
	if (eff.gt(softcap.add(c.d1))&&(!StudyE(3))) {eff=softcap.mul(eff.sub(c.d1).div(softcap).ln().div(energySoftcapStrength(x)).add(c.d1)).add(c.d1);}
	if (x>=energyTypesUnlocked()) {eff = c.d1;}

	if (study13.bound(52)&&(!StudyE(3))) {eff = eff.sub(study13.bindingEff(52)).max(c.minvalue)}
	if (x===8) {eff = eff.recip();}
	return StudyE(3)?eff.pow(studies[3].energyPowerConstant()):eff;
}
function energySpeedMult(x) {
	if (StudyE(3)) return studies[3].energyGainConstant();
	let mult = stat.energyGainSpeed;
	if ([0,1].includes(x)&&g.achievement[521]) mult = mult.mul(c.d1_5);
	if ([2,3].includes(x)&&g.achievement[522]) mult = mult.mul(c.d1_5);
	if ([4,5].includes(x)&&g.achievement[523]) mult = mult.mul(c.d1_5);
	let energySpeedResearch = ["r4_1","r4_2","r4_3","r4_13","r4_14","r4_15","r9_3","r9_1","r10_3","r10_1"][x];
	if (g.research[energySpeedResearch]) mult = mult.mul(researchEffect(researchRow(energySpeedResearch),researchCol(energySpeedResearch)));
	if (x<6){
		let research7energy = [[13,15],[1,14],[13,14],[2,3],[2,15],[1,3]][x];
		for (let i=0;i<2;i++) if (g.research["r7_"+research7energy[i]]) mult = mult.mul(researchEffect(7,research7energy[i]));
	}
	if (x===5) {mult = mult.mul(studies[3].reward(3))}
	if ((x===6)&&g.achievement[910]) {mult = mult.mul(achievement(910).effect().mul(stat.totalAntiAxis).add(c.d1))}
	return mult
}
function energyPerSec(x) {
	let resource = [g.exoticmatter,g.stardust,g.darkmatter,g.XAxis,g.masteryPower,energyTypes.map(x=>g[x+"Energy"].add(c.d10).log10()).productDecimals().pow(c.d0_1),g.hawkingradiation,g.knowledge,fullAxisCodes.map(x=>g[x+"Axis"].add(c.d10).log10()).productDecimals().pow(c.d0_1),stat.tickspeed][x];
	let divisor = [c.d200,c.d350,c.d500,c.d350,c.d200,c.d50,c.e8,c.e10,c.d5e4,N(3e13)][x];
	let mult = energySpeedMult(x)
	return resource.add(c.d10).dilate(c.d0_9).pow(mult.div(divisor));
}

// Wormhole Reset
function wormholeAnimation() {wormholeAnimationActive=true;wormholeAnimationStart=Date.now();}
const HRVariables = ["hawkingradiation","hawkingradiationThisSpacetimeReset","totalhawkingradiation"]
function incrementHR(x) {
	x=x.fix(c.d0);
	for (let i of HRVariables) o.add(i,x)
}
function attemptWormholeReset(showPopups=false) {
	if (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)) {
		if (!unlocked("Hawking Radiation")) {
			wormholeAnimation()
		} else if (g.confirmations.wormholeReset&&showPopups&&(g.activeStudy===0)) {
			let willReset = [
				["exotic matter",true],
				["normal and dark axis",true],
				["mastery power",true],
				["the mastery timer",true],
				["stardust",true],
				["Stardust Upgrades, except 1 level of #2 (Retention Path) and 5 levels of #4 (Mastery Path)",true],
				["stars",true],
				["dark matter",true],
				["energy",true]
			]
			popup({
				text:"Are you sure you want to Wormhole reset?<br><br>This will reset "+willReset.filter(x=>x[1]).map(x=>x[0]).joinWithAnd()+".",
				buttons:[["Confirm","if (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)) {wormholeReset("+showPopups+")} else {notify('Insufficient dark axis to Wormhole reset!','#000066','#ffffff')}"],["Cancel",""]]     /* stardust reset check must be done again because of autobuyers */
			})
		} else {
			wormholeReset(showPopups)
		}
	} else {
		if (showPopups) notify((g.activeStudy===0)?"You must be able to gain Hawking radiation in order to reset!":"You must reach the goal of the Study in order to reset!<br>If you are stuck, abort the Study from the Studies tab.","#000099","#ffffff")
	}
}
function wormholeReset(showPopups=false) {
	let HRgained = stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)
	let timeLoopMult = 1
	if (HRgained) {
		addAchievements("wormholeResetBefore");
		timeLoopMult = wormholeAmplificationMultiplier()
		g.dilatedTime -= wormholeAmplificationCost()
		incrementHR(stat.pendinghr.floor().mul(timeLoopMult));
		g.WormholeResets+=timeLoopMult
		g.fastestWormholeReset=Decimal.min(g.fastestWormholeReset,g.timeThisWormholeReset);
	}
	if (g.wormholeResets===0) {
		timeState = 0
		d.display("wormholeAnimation","inline-block");
		let start = Date.now();
		while (Date.now()-start<1e4) d.element("wormholeAnimation").style.opacity = (Date.now()-start)/1e4;
	}
	g.previousStardustRuns.last10 = [];
	g.previousStardustRuns.wormhole = {fastest:previousPrestige.generate(1,2,true),highest:previousPrestige.generate(1,2,true)}
	if (HRgained) {
		let f0 = previousPrestige.generate(2,0,false)
		let f3 = previousPrestige.generate(2,3,false)
		let f4 = previousPrestige.generate(2,4,false)
		g.previousWormholeRuns.last10 = [f0].concat(g.previousWormholeRuns.last10).slice(0,10)
		if (f3.time < g.previousWormholeRuns.spacetime.fastest.time) g.previousWormholeRuns.spacetime.fastest = f3
		if (f4.time < g.previousWormholeRuns.eternity.fastest.time) g.previousWormholeRuns.eternity.fastest = f4
		if (f3.gain.gt(g.previousWormholeRuns.spacetime.highest.gain)) g.previousWormholeRuns.spacetime.highest = f3
		if (f4.gain.gt(g.previousWormholeRuns.eternity.highest.gain)) g.previousWormholeRuns.eternity.highest = f4
		if (f3.efficiency.gt(g.previousWormholeRuns.spacetime.efficientest.efficiency)) g.previousWormholeRuns.spacetime.efficientest = f3
		if (f4.efficiency.gt(g.previousWormholeRuns.eternity.efficientest.efficiency)) g.previousWormholeRuns.eternity.efficientest = f4
	}
	if (g.activeStudy!==0) {
		if (stat.totalDarkAxis.gte(studies[g.activeStudy].goal())) {
			g.studyCompletions[g.activeStudy] = (g.activeStudy===13)?Math.max(studyPower(13),g.studyCompletions[13]):Math.min(studyPower(g.activeStudy)+1,4); // study X proof - no completions from doing Stellar Triad 4 times!
			if (g.activeStudy===13) {
				study13.updateRewardLevels()
			} else {
				let resbuild = Object.keys(research).filter(x=>g.research[x]&&(research[x].type!=="study"))
				respecResearch()
				if (g.restoreResearchAfterStudy) {buyResearchList(resbuild)}
			};
			updateResearchTree();
			generateResearchCanvas();
			if ((g.activeStudy===10)&&(studyPower(10)===3)) {for (let i of g.study10Options) {g.ach920Completions |= 2**(i-1)}}
		}
		g.activeStudy=0;
		g.luckEssence=0
		if (g.studyCompletions[7]>0) unlockFeature("Luck")
		if (g.studyCompletions[9]>0) unlockFeature("Antimatter")
		g.study10Options=[]
	}
	g.exoticmatter=c.d0;
	g.exoticmatterThisStardustReset=c.d0;
	g.exoticmatterThisWormholeReset=c.d0;
	for (let i=0;i<12;i++) {
		g[axisCodes[i]+"Axis"]=c.d0;
		g["dark"+axisCodes[i]+"Axis"]=c.d0;
	}
	g.masteryPower=c.d0;
	g.baseMasteryPowerGain=c.d1;
	g.timeThisStardustReset=0;
	g.truetimeThisStardustReset=c.d0;
	g.fastestStardustReset=c.d9e15;
	g.timeThisWormholeReset=0;
	g.truetimeThisWormholeReset=c.d0;
	g.stardust=c.d0;
	g.stardustThisWormholeReset=c.d0;
	g.stardustUpgrades=g.stardustUpgrades.map((x,i)=>Math.min(x,[0,1,0,5,0][i]));
	g.stars=0;
	for (let i of starList) g.star[i] = false
	totalStars=0
	g.darkmatter=c.d0;
	g.darkmatterThisWormholeReset=c.d0;
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
	g.study9.xp = c.d0;
	g.study9.fracxp = c.d0;
	g.study9.resets = 0;
	g.ach825possible=true;
	g.ach901Int=c.d0;
	g.study12.empowerments = c.d0
	g.study12.fortitude = c.d0
	g.ach907Progress=0;
	g.ach908possible=true;
	d.display("wormholeAnimation","none");
	if (g.researchRespec) {
		respecResearch();
		g.researchRespec = false;
	}
	if (g.achievement[506]&&g.ach505Progress.lt(c.e3)) g.ach505Progress=c.e3;
	g.TotalWormholeResets+=timeLoopMult;
	updateStats();
	if (HRgained) {addAchievements("wormholeResetAfter");}
}
function updateWormholeResetButtonText() {
	if (g.activeStudy===0) {
		d.display("span_wormholeResetButtonHRText","inline-block")
		d.display("span_wormholeResetButtonStudyText","none")
		d.innerHTML("span_wormholeResetButtonPendingHR",stat.pendinghr.format())
	} else {
		d.display("span_wormholeResetButtonHRText","none")
		d.display("span_wormholeResetButtonStudyText","inline-block")
		d.innerHTML("span_wormholeResetButtonPendingHR",roman(g.activeStudy))
	}
	if (stat.totalDarkAxis.lt(stat.wormholeDarkAxisReq)) {
		d.innerHTML("span_wormholeResetButtonReqText","(Need "+BEformat(stat.wormholeDarkAxisReq)+" total dark axis)")
	} else if ((g.activeStudy===0)&&stat.pendinghr.lt(c.e2)) {
		d.innerHTML("span_wormholeResetButtonReqText","(Next at "+BEformat(stat.pendinghr.floor().add(c.d1).root(stat.HRExponent).div(stat.HRMultiplier).root(stat.HRBaseExponent).log(c.d2).root(stat.HRBaseApexExp).mul(c.d1500).ceil())+" total dark axis)")
	} else {
		d.innerHTML("span_wormholeResetButtonReqText","")
	}
}

// Wormhole Milestones
const wormholeMilestoneList = {
	1:{text:"Unlock dark axis autobuyer",notification:"You have unlocked the dark axis autobuyer"},
	2:{text:"Unlock dark star autobuyer",notification:"You have unlocked the dark star autobuyer"},
	3:{text:"Unlock stardust upgrade autobuyer",notification:"You have unlocked the stardust upgrade autobuyer"},
	4:{text:"Unlock star autobuyer",notification:"You have unlocked the star autobuyer"},
	5:{text:"Unlock automatic star allocation",notification:"You have unlocked automatic star allocation"},
	6:{text:"Unlock the ability to lock manual stardust upgrade purchasing",notification:"You can now lock buying stardust upgrades manually in the Automation tab"},
	7:{text:"Dark stars no longer reset dark matter"},
	8:{text:"Unlock automatic Stardust resets",notification:"You have unlocked automatic Stardust resets"},
	9:{dynamic:"Stars and stardust upgrades cost less based on your Hawking radiation<br>(formula: 10<sup>log(cost)<sup>{v}</sup></sup>)",static:"Stars and stardust upgrades cost less based on your Hawking radiation"},
	10:{text:"Gain 1 stardust per second, unaffected by all multipliers except tickspeed",notification:"You now automatically gain 1 stardust per second, unaffected by all multipliers except tickspeed"},
	11:{text:"The third Stardust Upgrade can be purchased 4 additional times"},
	12:{text:"Unlock automatic Wormhole resets",notification:"You have unlocked automatic Wormhole resets"},
	13:{text:"The game runs 0.25% faster per achievement unlocked",notification:"The game now runs 0.25% faster per achievement unlocked"},
	14:{text:"Knowledge gain is 1.25× faster",notification:"Knowledge gain is now 1.25× faster"},
	15:{text:"Unlock more research in row 4",notification:"You have unlocked six new Row 4 researches"},
	16:{text:"Knowledge multiplier from Wormhole Milestones is increased to 1.6×",notification:"Knowledge gain is now 1.28× faster"},
	17:{text:"Knowledge multiplier from Wormhole Milestones is increased to 2×",notification:"Knowledge gain is now 1.25× faster"},
	18:{dynamic:"Add {v} to the dark T axis timer (based on Hawking radiation)",static:"The dark T axis timer is increased based on Hawking radiation"},
	19:{text:"Knowledge multiplier from Wormhole Milestones is increased to 2.5×",notification:"Knowledge gain is now 1.25× faster"},
	20:{text:"Unlock Time Loop in the Offline Time subtab",notification:"You have unlocked Time Loop in the Offline Time subtab"},
	21:{text:"Research in the first row is 0.1% stronger per achievement unlocked in all tiers"},
	22:{text:"Knowledge multiplier from Wormhole Milestones is increased to 3.2×",notification:"Knowledge gain is now 1.28× faster"},
	23:{text:"Knowledge multiplier from Wormhole Milestones is increased to 4×",notification:"Knowledge gain is now 1.25× faster"},
	24:{text:"Research in the second row is 0.2% stronger per achievement unlocked in all tiers"},
	25:{text:"Knowledge multiplier from Wormhole Milestones is increased to 5×",notification:"Knowledge gain is now 1.25× faster"},
	26:{text:"Knowledge multiplier from Wormhole Milestones is increased to 6.4×",notification:"Knowledge gain is now 1.28× faster"},
	27:{dynamic:"Row 10 Masteries are {v}% stronger (based on Hawking radiation)",static:"Row 10 Masteries are now stronger based on Hawking radiation"},
	28:{text:"Knowledge multiplier from Wormhole Milestones is increased to 8×",notification:"Knowledge gain is now 1.25× faster"},
	29:{text:"Knowledge multiplier from Wormhole Milestones is increased to 10×",notification:"Knowledge gain is now 1.25× faster"},
	30:{text:"Gain all pending stardust immediately. Does not work in Studies.",notification:"You now gain all pending stardust immediately as long as you are not in a Study. Congratulations on completing your collection!"}
};
const wormholeMilestone9 = {
	mult:function(){
		let mult = c.dm0_1
		if (g.achievement[716]) mult = mult.mul(achievement(716).effect())
		return mult
	},
	eff:function(x=g.hawkingradiation) {return c.e.pow(x.div(c.d10).add(c.d1).quad_slog().mul(wormholeMilestone9.mult()));},
	formula:function(){return "e<sup>slog(HR ÷ 10 + 1)"+formulaFormat.mult(wormholeMilestone9.mult(),4)+"</sup>"}
}
const wormholeMilestone18 = {
	mult:function(){
		let out = c.d200
		return out
	},
	scstart:function(){
		let out = c.d86400 // 24 hours
		return out
	},
	sclim:function(){
		let out = c.d3155692599 // 100 years
		return out
	},
	eff:function(x=g.hawkingradiation){return Decimal.convergentSoftcap(x.add1Log(c.d10).pow(c.d1_5).mul(this.mult()),this.scstart(),this.sclim(),1);},
	formula:function(){
		let out = "log(HR + 1)<sup>1.5</sup>"+formulaFormat.mult(this.mult())
		return Decimal.gte(this.eff(),this.scstart())?("10<sup>log("+formulaFormat.convSoftcap(out,this.scstart().log10(),this.sclim().log10(),true)+")"):out
	}
}
const wormholeMilestone27 = {
	eff:function(x=g.hawkingradiation) {
		let out = x.div(c.e3).add(c.d1).log10().pow(c.d0_3).mul(c.d10);
		return Decimal.convergentSoftcap(Decimal.logarithmicSoftcap(out,c.d25,c.d1),c.d50,c.e2);
	},
	formula:function() {return formulaFormat.convSoftcap(formulaFormat.logSoftcap("log(HR ÷ 1,000 + 1)<sup>0.3</sup> × 10",c.d25,c.d1,wormholeMilestone27.eff().gt(c.d25)),c.d50,c.e2,wormholeMilestone27.eff().gt(c.d50))}
}
function wormholeMilestoneText(x) {
	if (x===9) return "Stars and stardust upgrades cost less based on your Hawking radiation"
	if (x===18) return "Add extra time to the dark T axis timer based on your Hawking radiation"
	if (x===27) return "Row 10 Masteries are stronger based on your Hawking radiation"
	return wormholeMilestoneList[wormholeMilestoneList.map(x => x[0]).indexOf(x)][1]
}

// Studies
function visibleStudies() {
	let out = [];
	for (let i=1;i<13;i++) {
		if (!g.research[(i===10)?studies[10].research[0]:studies[i].research]) {
			if ((g.studyCompletions[i]===4)&&(!g.completedStudiesShown)&&(g.studyContainerStyle==="Detailed")) {continue}
			if (!((g.studyCompletions[i]>0)||g.researchVisibility.includes(studies[i]["research"])||StudyE(i))) {continue}
		}
		out.push(Number(i))
	}
	return out;
}
function StudyE(x) {
	if (x<10) if (g.activeStudy===10) if ([[1,4,7],[2,5,8],[3,6,9],g.study10Options][studyPower(10)].includes(x)) return true
	if (g.activeStudy===x) return true;
	return false;
}
function enterStudy(x) {
	if ((x===10)&&(studyPower(10)===3)&&(g.study10Options.length<3)) { // pick options
		popup({
			text:"Select "+ordinal(g.study10Options.length+1)+" option:",
			buttons:countTo(9).filter(i=>!g.study10Options.includes(i)).map(x=>[roman(x),"g.study10Options.push("+x+");enterStudy(10)"]),
			buttonSize:5
		})
	} else {
		g.researchRespec=false
		wormholeReset();
		g.activeStudy=x;
		if (x===1) setTimeout(()=>g.clickedInStudy1=false,0) // gameClick() function runs after this, timeout to circumvent
		if (StudyE(5)) {
			let studyRes = studies[g.activeStudy].research
			respecResearch()
			buySingleResearch(researchRow(studyRes),researchCol(studyRes),true)
			updateResearchTree()
		}
		if (x===13) {
			addAchievement(905)
		}
	}
}
const studyButtons = {
	state:function(x) {return [g.activeStudy===x,StudyE(x),g.research[studies[x]["research"]],g.activeStudy!==0,true].indexOf(true)},
	click:function(x) {
		let state = studyButtons.state(x)
		if (state===0) {wormholeReset()}    // states 1, 3 and 4 do nothing
		else if (state===2) {enterStudy(x)}
	},
	text:function(x) {
		let state = studyButtons.state(x)
		if (state===0) {return (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)?"Complete":"Abort")+" Study"}
		if (state===1) {return "Trapped in"}
		if (state===2) {return "Start"}
		if (state===3) {return "Already in Study "+studies[0].roman(g.activeStudy)}
		if (state===4) {return "Need research "+researchOut(studies[x]["research"])}
	},
	class:function(x) {return ["enabled","enabled","enabled","disabled","disabled"][studyButtons.state(x)]}
}
function updateStudyDiv(HTMLnum,studyNum,follow) {
	d.class("div_study"+HTMLnum+follow,"studyDiv comp"+(((g.activeStudy===10)&&(Math.min(g.studyCompletions[10],3)!==studyPower(10)))?studyPower(10):g.studyCompletions[studyNum]))
	d.innerHTML("span_study"+HTMLnum+"Num"+follow,studies[0].roman(studyNum))
	d.innerHTML("span_study"+HTMLnum+"Name"+follow,(studyNum===10)?(["Stellar","Decisive","Temporal","Ontological"][studyPower(10)]+" Triad"):studies[studyNum].name)
	d.innerHTML("button_study"+HTMLnum+follow,studyButtons.text(studyNum))
	d.innerHTML("span_study"+HTMLnum+"Goal"+follow,studies[studyNum].goal().format());
	d.innerHTML("span_study"+HTMLnum+"Description"+follow,(studies[studyNum].description().length===1)?studies[studyNum].description()[0]:("<table>"+studies[studyNum].description().map((x,i)=>"<tr><td style=\"vertical-align:top;text-align:left;width:20px;\">"+(i+1)+"</td><td style=\"vertical-align:top;text-align:left;\">"+x+"</td>").join("")+"</table>"))
	if (studies[studyNum].disclaimers===undefined) {
		d.tr("span_study"+HTMLnum+"Disclaimers"+follow,false)
	} else {
		let disclaimers = studies[studyNum].disclaimers.filter(x=>x[1]()).map(x=>x[0])
		if (disclaimers.length===0) {
			d.tr("span_study"+HTMLnum+"Disclaimers"+follow,false)
		} else {
			d.tr("span_study"+HTMLnum+"Disclaimers"+follow,true)
			d.innerHTML("span_study"+HTMLnum+"Disclaimers"+follow,"<i>"+disclaimers.map(x=>"NB: "+x).join("<br>")+"</i>")
		}
	}
	if (follow!=="CompactView") {d.innerHTML("span_study"+HTMLnum+"Completions"+follow,g.studyCompletions[studyNum]);}
	d.innerHTML("span_study"+HTMLnum+"Reward"+follow,"<table>"+studies[studyNum].reward_desc().map((x,i)=>"<tr><td style=\"vertical-align:top;text-align:left;width:20px;\">"+(i+1)+"</td><td style=\"vertical-align:top;text-align:left;\">"+x+"</td>").join("")+"</table>");	
	d.class("button_study"+HTMLnum+follow,"studyButton "+studyButtons.class(studyNum))
}
function studyRewardHTML(studyNum,rewardNum,precisionOrCallback=2,completions=g.studyCompletions[studyNum]) {
	if (showFormulas) if (studies[studyNum].rewardFormulas!==undefined) if (studies[studyNum].rewardFormulas[rewardNum]!==undefined) return formulaFormat(studies[studyNum].rewardFormulas[rewardNum](completions))
	function format(n) {return (typeof precisionOrCallback==="number")?n.noLeadFormat(precisionOrCallback):precisionOrCallback(n)}
	let curr = N(studies[studyNum].reward(rewardNum,completions))
	let next = N(studies[studyNum].reward(rewardNum,Math.min(completions+1,4)))
	if ((completions === 4) || Decimal.eq(curr,next)) return "<b>"+format(curr)+"</b>";
	return "<b>"+arrowJoin(format(curr),format(next))+"</b>";
}
function studyPower(x){
	if (x===13) {return study13.allBindings.map(x=>g.study13Bindings[x]?study13.bindings[x].lv:0).sum()}
	if ((x<10)&&(g.activeStudy===10)) {return 3} // no exploits :D
	if (x===10) {for (let i=3;i>=0;i--) {if (g.research[studies[10].researchList[i]]) {return i}}} // allow retrying previous triads
	return Math.min(g.studyCompletions[x],3)
}
function studyRewardBoost(studyNum,rewardNum) {
	if (rewardNum===2) {
		let out = (studyNum===10)?c.d1:studies[10].reward(4)
		if ((studyNum===7)&&g.research.r28_1) out = out.mul(researchEffect(28,1))
		if (study13.bound(265)) {out = out.mul(study13.bindingEff(265))}
		return out
	}
	if (rewardNum===3) {
		let out = stat.redLightEffect
		if (studyNum===10) {
			if (g.achievement[920]) {out = out.mul(achievement(920).effect())}
		} else {
			let studyAchievements = [null,608,609,705,715,812,814,902,908,914,null,926,932]
			if (typeof studyAchievements[studyNum] === "number") if (g.achievement[studyAchievements[studyNum]]) {out = out.div(c.d0_9)}
		}
		if ((studyNum===7)&&g.research.r25_1) {out = out.mul(researchEffect(25,1))}
		if (study13.bound(245)) {out = out.mul(study13.bindingEff(245))}
		return out
	}
	functionError("studyRewardBoost",arguments)
}

// Light
function generateChroma(x,amount) {
	let typesUnlocked = [0,3,6,8,9][lightTiersUnlocked()]
	if (g.achievement[718]) {
		let val718 = [amount,c.d1.sub(stat.chromaCostMultiplier).max(c.d0),c.em15].productDecimals()
		for (let j=0;j<typesUnlocked;j++) g.chroma[j] = g.chroma[j].add(val718).max(c.d0) // prevent lag
	}
	for (let i=0;i<100;i++) { // prevent infinite loop
		let lowestChroma = g.chroma.reduce((x,y)=>x.min(y))
		if (amount.lt(lowestChroma.max(stat.chromaPerSec).div(c.e15))) break
		if (lightComponents(x)===null) {
			g.chroma[x] = g.chroma[x].add(amount).fix(c.d0)
			return
		} else {
			let toGenerate = lightComponents(x).map(i=>g.chroma[i]).reduce((x,y)=>x.min(y)).div(chromaCostFactor(x)).min(amount).max(c.d0)
			if (toGenerate.eq(c.d0)&&g.haltChromaIfLacking) {
				g.activeChroma=null;return
			} else {
				for (let i of lightComponents(x)) g.chroma[i]=g.chroma[i].sub(toGenerate.mul(chromaCostFactor(x))).max(c.d0).fix(c.d0)
				g.chroma[x] = g.chroma[x].add(toGenerate).max(c.d0).fix(c.d0)
				amount = amount.sub(toGenerate)
				if (amount.sign!==0) {
					if (g.haltChromaIfLacking) {g.activeChroma=null}
					else {for (let i of lightComponents(x)) if (g.chroma[i].eq(c.d0)) {x=i;g.activeChroma=i}}
				}
			}
		}
	}
	if (g.achievement[718]) {
		let remainder = amount.div(c.d9).mul(c.d1.sub(stat.chromaCostMultiplier).max(c.d0))
		for (let i=0;i<typesUnlocked;i++) g.chroma[i] = g.chroma[i].add(remainder)
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
	if (i<3) return (g.prismaticUpgrades.chromaOverdrive.sign===0)?null:[8]
	return [[1,2],[0,2],[0,1],[3,4,5],[3,4,5],[6,7]][i-3]
}
function updateYellowLightCache(i){
	for (let ach of yellowLight.affected) {
		achievement(ach).yellowValue = yellowLight.value(achievement(ach).yellowBreakpoints,g.lumens[5])
		achievement(ach).nextYellowValue = yellowLight.value(achievement(ach).yellowBreakpoints,g.lumens[5].add(c.d1))
	}
	yellowLight.currentAffected = yellowLight.affected.filter(ach=>Decimal.neq(yellowLight.value(achievement(ach).yellowBreakpoints,g.lumens[5]),yellowLight.value(achievement(ach).yellowBreakpoints,g.lumens[5].add(c.d1))))
}
const lightData = [
	{baseReq:c.e3,baseScale:c.d4,effect:"The third reward of each Study is {x}% stronger"},
	{baseReq:c.e3,baseScale:c.d2,effect:"Each purchased S axis multiplies the T axis effect by {x}<br><span class=\"small\">(this is currently a {e}× overall multiplier)</span>"},
	{baseReq:c.e3,baseScale:c.d3,effect:"The base gain of Hawking radiation is raised to the power of {x}"},
	{baseReq:c.e5,baseScale:c.d1_5,effect:"Research 7-5 affects the base gain of knowledge with {x}{s} effect<br><span class=\"small\">(this is currently an approximate {e}× boost to knowledge gain if Research 7-5 is owned)</span>"},
	{baseReq:c.e5,baseScale:c.d2_5,effect:"Increase the mastery power base gain exponent by {x}<br><span class=\"small\">(this is currently a {e}× boost to mastery power gain)</span>"},
	{baseReq:c.e5,baseScale:c.d1_1,effect:"The rewards of {x} achievements will become stronger.<br>"+["See next effect","See all effects"].map((x,i)=>"<button class=\"genericbutton size3 reviewYellowLight\" onClick=\"reviewYellowLight("+i+")\" id=\"button_reviewYellowLight"+i+"\">"+x+"</button>").join("")},
	{baseReq:c.e10,baseScale:c.d10,effect:"The star cost is raised to the power of {x}"},
	{baseReq:c.e10,baseScale:c.d10,effect:"Chroma generation is {x}{s} cheaper"},
	{baseReq:c.e100,baseScale:c.e10,effect:"Chroma gain is multiplied by {x}"}
]
function lumenCostScale(i) {
	if (i===8) return prismaticUpgrades.lumenThresholdReduction1.eff()
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
		if (x===5) updateYellowLightCache()
	}
	addAchievements("lumenGain")
}
const lightEffect = [
	{
		value:function(x=g.lumens[0]){return Decimal.convergentSoftcap(x,c.e2,c.d200,3).div(c.e2).add(c.d1)},
		format:function(x){return x.sub(c.d1).mul(c.e2).noLeadFormat(4)},
		formula:function(){return g.lumens[0].gte(c.e2)?("<span style=\"font-size:95%;\">Ξ<sup>[3]</sup>"+formulaFormat.convSoftcap("log<sup>[3]</sup>(L)",c.e2.layerplus(-3),c.d200.layerplus(-3),true)+"</span>"):"L"}
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
		ssExp:function(){return g.achievement[901]?achievement(901).effect():c.d0_5},
		value:function(x=g.lumens[3],s=this.ssExp()){
			let out = x.gt(c.d50)?x.div(c.d25).sub(c.d1).ln().add(c.d2).div(c.d4):x.div(c.e2)
			return out.gt(c.d1)?out.mul(c.e2.div(s)).sub(c.e2.div(s)).add(c.d1).pow(s).add(c.d99).div(c.e2):out
		},
		format:function(x){return x.gte(c.d10)?x.noLeadFormat(3):x.mul(c.d100).noLeadFormat(x.gte(c.d1)?5:3)},
		formula:function(s=this.ssExp()){
			if (g.lumens[3].lt(c.d50)) return "L"
			if (stat.cyanLightEffect.lt(c.d10)) {
				if (stat.cyanLightEffect.lt(c.d1)||s.eq(c.d1)) {return "ln(L ÷ 25 - 1) × 25 + 50"}
				return "(ln(L ÷ 25 - 1) × "+c.d25.div(s).noLeadFormat(3)+formulaFormat.add(c.d50.div(s).sub(c.e2.div(s)).add(c.d1))+")"+formulaFormat.exp(s)+" + 99"
			} else {
				if (s.eq(c.d1)) {return "ln(L ÷ 25 - 1) ÷ 4 + 0.5"}
				return "((ln(L ÷ 25 - 1) × "+c.d25.div(s).noLeadFormat(3)+formulaFormat.add(c.d50.div(s).sub(c.e2.div(s)).add(c.d1))+")"+formulaFormat.exp(s)+" + 99) ÷ 100"
			}
		}
	},
	{
		value:function(x=g.lumens[4]){return Decimal.logarithmicSoftcap(x.div(c.d10),c.d256,c.d0_25)},
		format:function(x){return x.noLeadFormat(3)},
		formula:function(){return formulaFormat.logSoftcap("L ÷ 10",c.d256,c.d0_25,g.lumens[4].gte(2560))}
	},
	{
		value:function(x=g.lumens[5]){return achievement.all.filter(a=>achievement(a).yellowBreakpoints===undefined?false:achievement(a).yellowBreakpoints.length===3?(achievement(a).yellowBreakpoints[0].lte(x)&&achievement(a).yellowBreakpoints[1].gt(x)):(achievement(a).yellowBreakpoints[0].lte(x)))},
		formula:function(){return numword(yellowLight.currentAffected.length)}
	},
	{
		value:function(x=g.lumens[6]){return x.gt(c.d25)?N(12.5).div(x):c.d1.sub(x.div(c.d50))},
		format:function(x){return x.noLeadFormat(3)},
		formula:function(){return g.lumens[6].gte(c.d25)?"12.5 ÷ L":"1 - L ÷ 50"}
	},
	{
		value:function(x=g.lumens[7],radiance=study13.rewardLevels.radiance){
			x = x.mul(study13.rewards.radiance.eff(radiance).mul)
			return x.gt(c.d5)?((radiance===10)?x.mul(c.d0_4):Decimal.convergentSoftcap(x.mul(c.d0_4),c.d10,study13.rewards.radiance.eff(radiance).lim,2)).recip():c.d1.sub(x.div(c.d10))
		},
		format:function(x){return g.lumens[7].mul(study13.rewards.radiance.eff().mul).gte(c.d25)?x.recip().noLeadFormat(3):c.d1.sub(x).mul(c.e2).noLeadFormat(3)},
		formula:function(){
			let mult = study13.rewards.radiance.eff().mul
			if (g.lumens[7].mul(mult).lt(c.d5)) return mult.mul(c.d10).noLeadFormat(2)+" × L"
			if (g.lumens[7].mul(mult).lt(c.d25)) return "100 - "+c.d250.div(mult).noLeadFormat(3)+" ÷ L"
			return (study13.rewardLevels.radiance===10)?("L"+formulaFormat.mult(mult.mul(c.d0_4))):"Ξ<sup>[2]</sup>"+formulaFormat.convSoftcap("log<sup>[2]</sup>(L"+formulaFormat.mult(mult.mul(c.d0_4))+")",c.d0,study13.rewards.radiance.eff().lim.log10().log10(),true)+"</sup></sup>"
		}
	},
	{
		base:function(){
			let out = c.e5
			if (g.wormholeUpgrades[7]) {out = out.mul(wormholeUpgrades[7].eff())}
			if (study13.rewardLevels.sacredNumber>2) {out = out.mul(1.034)}
			return out
		},
		softcap:function(zemer=study13.rewardLevels.zemer){
			let out = c.e2
			out = out.add(study13.rewards.zemer.eff(zemer))
			return out
		},
		value:function(x=g.lumens[8],zemer=study13.rewardLevels.zemer){
			let divisor = x.div(this.softcap(zemer)).max(c.d1).log10().pow(c.d2).add(c.d1)
			return this.base().pow(x.div(divisor))
		},
		format:function(x){return x.format()},
		formula:function(){return this.base().format()+"<sup>L"+(g.lumens[8].gte(c.e2)?"÷ (log(L ÷ "+this.softcap().format()+")<sup>2</sup> + 1)":"")+"</sup>"}
	}
]
function toggleChromaGen(x){
	g.activeChroma = (g.activeChroma===x)?null:x
}
function chromaCostFactor(x) {
	if (!(lightComponents(x) instanceof Array)) return
	return c.d1.div(lightComponents(x).length).mul(stat.chromaCostMultiplier)
}
function reviewYellowLight(mode){    // 0 = next, 1 = all effects
	let shownAchievements,out=[]
	if (mode===0) {shownAchievements = yellowLight.affected.filter(x=>achievement(x).yellowBreakpoints[0].lt(g.lumens[5].add(c.d1))&&achievement(x).yellowBreakpoints[1].gt(g.lumens[5]))}
	else if (mode===1) {shownAchievements = yellowLight.affected.filter(x=>achievement(x).yellowBreakpoints[0].lt(g.lumens[5]))}
	else {functionError("reviewYellowLight",arguments)}
	function achPriority(ach) {return (g.achievement[ach]&&Decimal.neq(achievement(ach).effect(c.d0),achievement(ach).effect(c.d1)))?1:0} // how high up the list an achievement is shown
	shownAchievements = shownAchievements.sort((a,b)=>achPriority(b)-achPriority(a))
	for (let x of shownAchievements) {
		let colors = achievement.tierColors[achievement.tierOf(x)]
		out.push("<div style=\"background-color:"+colors.dark+";color:"+colors.light+";height:60px;width:calc(60vw - 16px);border-style:solid;border-color:"+colors.light+";border-width:2px;border-radius:10px;margin:4px"+((achPriority(x)===0)?";filter:opacity(33%)":"")+"\">"+(achievement.visible(x)?("<table><tr><td style=\"width:225px;height:60px;\">"+x+"<br>"+achievement(x).name+"</td><td style=\"width:calc(60vw - 241px);height:60px;\">"+achievement(x).reward.replaceAll("{}",yellowLight.effectHTML(x,(mode===1||g.showLightEffectsFrom0)?c.d0:achievement(x).yellowValue,(mode===1||g.showLightEffectsFrom0)?achievement(x).yellowValue:achievement(x).nextYellowValue))+"</td></tr></table>"):("<table><tr><td style=\"height:60px\">[This achievement has not yet been revealed]</td></tr></table>"))+"</div>")
	}
	popup({
		text:out.join(""),
		buttons:[["Close",""]]
	})
}

// Galaxies
function effectiveGalaxies(effNum,isBoost,gal=g.galaxies) {
	gal = N(gal).add(effectiveGalaxies.add(isBoost))
	return (gal.gte(galaxyEffects[effNum].req-1))?N(gal.sub(galaxyEffects[effNum].req-1)):c.d0
}
effectiveGalaxies.add = function(isBoost){
	if (![0,1,true,false].includes(isBoost)) {functionError("effectiveGalaxies.add",arguments)}
	let out = c.d0
	if ((!isBoost)&&study13.bound(315)) {out = out.add(study13.bindingEff(315))}
	return out
}
function effectiveGalaxyFormulaText(effNum,isBoost,data={}) {
	let add = [c.d1,data.add??c.d0,effectiveGalaxies.add(isBoost),Decimal.FC_NN(-1,0,galaxyEffects[effNum].req)].sumDecimals()
	let max = Decimal.add(data.add??c.d0,data.max??c.d0)
	return add.gte(max)?("G"+formulaFormat.add(add)):("max(G"+formulaFormat.add(add)+", "+max.format()+")")
}
const galaxyEffects = [
	null,
	{
		req:1,
		boost:{
			value:function(n=g.galaxies){return Decimal.mul(effectiveGalaxies(1,1,n).div(c.e2).add(c.d1),c.d2.sub(N(82/101).pow(effectiveGalaxies(1,1,n))))},
			text:function(){return "Row 1 stars are "+(this.value().gt(c.d10)?"{}×":"{}%")+" stronger"},
			format:function(e){return this.value().gte(c.d10)?e.noLeadFormat(3):e.sub(c.d1).mul(c.e2).noLeadFormat(2)},
			formula:function(){
				let out = "(1 + "+effectiveGalaxyFormulaText(1,1)+" ÷ 100) × (2 - (82 ÷ 101)<sup>"+effectiveGalaxyFormulaText(1,1)+"</sup>)"
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
			exp:function(){return g.wormholeUpgrades[3]?c.d1_5:c.d0_9},
			value:function(n=g.galaxies){return [c.d1_15,effectiveGalaxies(2,1,n),this.exp()].decimalPowerTower()},
			text:function(){
				function eff(gal){let s = affordableStars(gal);return Decimal.mul(galaxyEffects[2].boost.value(gal).pow(s),stat.chromaGainBase.pow(s-60))}
				return (this.value().gt(c.d10)?"{}×":"+{}%")+" chroma gain per star<br><span class=\"small\">(this is currently a "+arrowJoin(eff(g.galaxies).noLeadFormat(2),eff(g.galaxies+1).noLeadFormat(2)+"× multiplier overall from stars)")
			},
			format:function(e){return this.value().gte(c.d10)?e.noLeadFormat(3):e.sub(c.d1).mul(c.e2).noLeadFormat(2)},
			formula:function(){
				let out = "1.15<sup>"+effectiveGalaxyFormulaText(2,1)+"<sup>"+this.exp().noLeadFormat(3)+"</sup></sup>"
				if (galaxyEffects[2].boost.value().lt(c.d10)) out = "("+out+" - 1) × 100"
				return out
			}
		},
		penalty:{
			base:function(){
				let out = c.d0_99
				if (g.research.r13_5) {out = out.pow(researchEffect(13,5))}
				for (let i of [104,114]) {if (study13.bound(i)) {out = out.pow(study13.bindingEff(i))}}
				return out
			},
			value:function(n=g.galaxies){return this.base().pow(effectiveGalaxies(2,0,n))},
			text:function(){return "Stardust gain is raised to the power of {} per star below 40 (currently: ^"+((g.stars<40)?this.value().pow(40-g.stars).format(3):"1")+")"},
			format:function(e){return e.noLeadFormat(3)},
			formula:function(){return this.base().formatFrom1(3)+"<sup>"+effectiveGalaxyFormulaText(2,0)+"</sup>"}
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
				out = out.pow(luckUpgrades.duofolium.star.eff())
				return out
			},
			value:function(n=g.galaxies){return [this.base(),effectiveGalaxies(3,0,n),c.d3].decimalPowerTower()},
			text:function(){return "Each star multiplies the star cost by {} (applied before the first penalty)"},
			format:function(e){return e.format()},
			formula:function(){return this.base().format()+"<sup>"+effectiveGalaxyFormulaText(3,0)+"<sup>3</sup></sup>"}
		}
	},
	{
		req:6,
		boost:{
			exp:function(){return g.wormholeUpgrades[3]?c.d0_6:c.d0_5},
			value:function(n=g.galaxies){return effectiveGalaxies(4,1,n).add(c.d1).pow(this.exp())},
			text:function(){return "The base gain of prismatic is increased to <i>((x + 1)<sup>{}</sup> - 1)</i>"},
			format:function(e){return e.noLeadFormat(4)},
			formula:function(){return effectiveGalaxyFormulaText(4,1,{add:1})+"<sup>"+this.exp().noLeadFormat(3)+"</sup>"}
		},
		penalty:{
			value:function(n=g.galaxies){return effectiveGalaxies(4,0,n).mul(c.d10).max(c.d1).log10().pow(c.d1_5).div(c.e2)},
			text:function(){return "Star Scaling is {}% stronger per star above 40"},
			format:function(e){return e.mul(c.e2).noLeadFormat(2)},
			formula:function(){return "(log("+effectiveGalaxyFormulaText(4,0,{max:0.1})+") + 1)<sup>1.5</sup>"}
		}
	},
	{
		req:10,
		boost:{
			value:function(n=g.galaxies){return Decimal.FC_NN(1,0,0.5+0.02*effectiveGalaxies(5,1,n))},
			text:function(){return "Assigned stars act on the third reward of Study II with {}% efficiency"},
			format:function(e){return e.mul(c.e2).format()},
			formula:function(){return effectiveGalaxyFormulaText(5,1,{add:25})+" × 2"}
		},
		penalty:{
			value:function(n=g.galaxies){let e = effectiveGalaxies(5,0,n);return Decimal.fracDecibel_arithmetic(e.add(c.d5).mul(e).div(c.d2))},
			text:function(){return "The game runs {}× slower per unassigned star below 20 (currently: "+this.value().pow(Math.max(0,20-unspentStars())).noLeadFormat(3)+"×)"},
			format:function(e){return e.noLeadFormat(3)},
			formula:function(){return "dB("+effectiveGalaxyFormulaText(5,0)+" × "+effectiveGalaxyFormulaText(5,0,{add:5})+" ÷ 2)"}
		}
	}
]
function gainGalaxy() {
	if (g.stars===starCap()) {
		g.galaxies++
		if (g.galaxies>g.highestGalaxies) g.highestGalaxies=g.galaxies
		if (g.galaxies>g.highestGalaxiesSpacetime) g.highestGalaxiesSpacetime=g.galaxies
		addAchievements("galaxyGain");
		wormholeReset()
	}
}
function loseGalaxy(num=1) {
	if (g.galaxies===0) {notify("You have no galaxies to lose!","#999900","#000000")}
	else if (num===0) {notify("No galaxies lost","#999900","#000000")}
	else if (num<0) {notify("Cannot lose negative galaxies","#999900","#000000")}
	else if (num%1!==0) {notify("Cannot lose fractional galaxies","#999900","#000000")}
	else {
		g.galaxies = Math.max(g.galaxies-num,0)
		wormholeReset()
	}
}
function formatGalaxyEffect(num,type,gal=g.galaxies) {
	return textFormat(galaxyEffects[num][type].format(galaxyEffects[num][type].value(gal)),"_galaxies")
}

// Luck
function runeTypeNum(type) {return ["mono","duo","tri","quatre","cinque"].indexOf(type.substring(0,type.length-6))+1}
function runeTypeUnlocked(type) {
	if (["unifolium","duofolium"].includes(type)) {return g.studyCompletions[13]>23}
	if (type==="trifolium") return g.research.r24_5
	if (type==="quatrefolium") return g.research.r24_3
	if (type==="cinquefolium") return g.research.r25_3
	functionError("runeTypeUnlocked",arguments)
}
function affordableLuckRunes(type) {
	if (!runeTypeUnlocked(type)) return c.d0
	if (g.luckShardSpendFactor.eq(c.d0)) return g.luckShards.gte(luckRuneCost(type,c.d1))?c.d1:c.d0
	return Decimal.affordGeometricSeries(g.luckShards.mul(g.luckShardSpendFactor),luckRunes[type].baseCost,luckRunes[type].scale,g.totalLuckRunes[type]).max(g.luckShards.gte(luckRuneCost(type,c.d1))?c.d1:c.d0)
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
	return Decimal.affordGeometricSeries(unspentLuckRunes(type).mul(g.luckRuneSpendFactor),luckRunes[type].upgBaseCost,luckRunes[type].upgScale,g.luckUpgrades[type][upg]).max(unspentLuckRunes(type).gte(luckUpgradeCost(type,upg,c.d1))?c.d1:c.d0)
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
	if (luckUpgradeUnlocked(type,upg)) {
		let amount = affordableLuckUpgrades(type,upg)
		g.spentLuckRunes[type] = g.spentLuckRunes[type].add(luckUpgradeCost(type,upg,amount))
		g.luckUpgrades[type][upg] = g.luckUpgrades[type][upg].add(amount)
		addAchievements("buyLuckUpgrade");
	}
}
function respecLuckUpgrades() {
	for (let type of luckRuneTypes) {
		g.spentLuckRunes[type] = c.d0
		for (let upg of luckUpgradeList[type]) g.luckUpgrades[type][upg] = c.d0
	}
	wormholeReset()
}
function respecLuckUpgradeRow(type) {
	g.spentLuckRunes[type] = c.d0
	for (let upg of luckUpgradeList[type]) g.luckUpgrades[type][upg] = c.d0
	wormholeReset()
}
function luckUpgradeUnlocked(type,upg) {
	let func = luckUpgrades[type][upg].unlocked
	return (func===undefined)?true:func()
}
function luckShardEffect1(x=g.luckShards) {return x.add(c.d1).log10().add(c.d10).log10().pow(c.d2_3).sub(c.d1).mul(c.e2).mul(prismaticUpgrades.prismRune.eff.y())}
function luckShardEffect2(x=g.luckShards) {
	x = x.pow(studies[11].reward(2)).max(x)
	return (x.gt(c.ee10)?N(5/9).pow(x.quad_slog(10)).mul(6561/1250):c.d1.sub(x.add(c.d10).log10().log10().div(c.e2)))
}
function luckShardEffect1Formula() {return prismaticUpgrades.prismRune.eff.y().mul(c.e2).noLeadFormat(4)+" × (log<sup>[2]</sup>((LS + 1) × "+c.e10.format()+")<sup>2.3</sup> - 1)"}
// the formula for effect 2 uses linear super-logarithms rather than the regular quadratic, so simply slog(LS) cannot be used
function luckShardEffect2Formula(x=g.luckShards) {
	let ls = "LS"+formulaFormat.exp(studies[11].reward(2))
	if (x.gte(c.ee10)) {
		let height = x.quad_slog(10).floor().format()
		let out = "0.5556<sup>log<sup>["+height+"]</sup>("+ls+") + "+height+"</sup> × 5.2488"
		return luckShardEffect2().gt(c.d0_1)?("100 × (1 - "+out+")"):out
	}
	return "log<sup>[2]</sup>("+ls+" + 10)"
}

// Prismatic
function affordablePrismaticUpgrades(upg) {
	let data = prismaticUpgrades[upg]
	let owned = g.prismaticUpgrades[upg]
	let available = g.prismaticSpendFactor.eq(c.d0)?g.prismatic:g.prismatic.mul(g.prismaticSpendFactor)
	if (data.max === undefined) { // unlimited
		if (g.prismaticSpendFactor.eq(c.d0)) return available.gt(data.scale.pow(owned).mul(data.baseCost))?c.d1:c.d0
		return Decimal.affordGeometricSeries(available,data.baseCost,data.scale,owned)
	} else { // limited
		if (g.prismaticSpendFactor.eq(c.d0)) return (available.gt(data.cost())&&Decimal.lt(owned,data.max))?c.d1:c.d0
		if (singlePrismaticUpgradeCost(upg).gt(g.prismatic)) return c.d0 // avoid laggy binary search
		// binary search to find the highest buyable level
		let lower = c.d0
		let upper = data.max
		let middle
		do {
			middle = lower.add(upper).div(c.d2).ceil()
			if (available.gt(data.cost(middle))) lower = middle
			else upper = middle
		} while (upper.sub(lower).gt(c.d1))
		middle = upper
		function canAfford(levels) {
			let spent = c.d0
			for (let i=levels.toNumber()-1;i>=owned.toNumber();i--) {
				let diff = data.cost(N(i))
				if (spent.div(diff).gt(c.e16)) {break}
				spent = spent.add(diff)
			}
			return available.gte(spent)
		}
		while (middle.gt(owned)&&(!canAfford(middle))) {middle = middle.sub(c.d1)}
		return Decimal.min(middle,data.max).sub(owned)
	}
}
function prismaticUpgradeCost(upg,amount){
	let data = prismaticUpgrades[upg]
	let owned = g.prismaticUpgrades[upg]
	if (data.max === undefined) { // unlimited
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
function singlePrismaticUpgradeCost(upg) {
	let data = prismaticUpgrades[upg]
	return (data.max === undefined) ? data.scale.pow(g.prismaticUpgrades[upg]).mul(data.baseCost) : data.cost()
}
function buyPrismaticUpgrade(upg) {
	if ((prismaticUpgrades[upg].unlockReq??(()=>true))()) {
		let affordable = affordablePrismaticUpgrades(upg)
		let cost = prismaticUpgradeCost(upg,affordable)
		g.prismatic = g.prismatic.sub(cost).fix(c.d0)
		g.prismaticUpgrades[upg] = g.prismaticUpgrades[upg].add(affordable.fix(c.d0)).fix(c.d0)
		addAchievements("prismaticUpgradeBuy")
	}
}
function buyMaxPrismaticUpgrades() {for (let i of nonRefundablePrismaticUpgrades) buyPrismaticUpgrade(i)}
function refundPrismaticUpgrade(upg) {
	if (g.prismaticUpgrades[upg].eq(c.d0)) {notify("There is nothing to refund!",achievement.tierColors[8].dark,achievement.tierColors[8].light)}
	else {
		g.prismaticUpgrades[upg] = g.prismaticUpgrades[upg].sub(c.d1).fix(c.d0)
		o.add("prismatic",prismaticUpgradeCost(upg,c.d1))
	}
}
function refundAllPrismaticUpgrades(upg) {
	let amt = g.prismaticUpgrades[upg]
	if (amt.eq(c.d0)) {notify("There is nothing to refund!",achievement.tierColors[8].dark,achievement.tierColors[8].light)}
	else {
		g.prismaticUpgrades[upg] = c.d0
		o.add("prismatic",prismaticUpgradeCost(upg,amt))
	}
}
function prismaticUpgradeEffectHTML(upg) {
	let out = prismaticUpgrades[upg].desc
	for (let i of prismaticUpgrades[upg].variables) out = out.replace("{"+i+"}","<span id=\"span_prismaticUpgrade_"+upg+"_"+i+"\"></span>")
	return out
}
function prismaticUpgradeUnlocked(upg) {
	let func = prismaticUpgrades[upg].unlockReq
	return (func===undefined)?true:func()
}

// Antimatter
const antimatterVariables = ["antimatter","antimatterThisSpacetimeReset","totalantimatter"]
function incrementAntimatter(x) {
	x=x.fix(c.d0);
	for (let i of antimatterVariables) o.add(i,x)
}
function antiAxisActive(type) {
	if (g.studyCompletions[9]===0) return false
	if ((type==="V")&&(!g.research.r24_11)) return false
	if ((type==="U")&&(!g.research.r24_13)) return false
	if ((type==="T")&&(!g.research.r25_13)) return false
	if ((type==="S")&&(!g.research.r26_13)) return false
	return 4+g.stardustUpgrades[0]>axisCodes.indexOf(type)
}
function antiAxisUnlocked(type){return antiAxisActive(type)||"RQPO".slice(0,study13.rewardLevels.slabdrill).includes(type)}
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
	if (type==="Z") {out = out.mul(c.d2)}
	else if (type==="W") {out = out.mul(c.d1_5)}
	else if (type==="U") {out = out.mul(c.d3)}
	else if (type==="S") {out = out.mul(c.d1_5)}
	else if (type==="Q") {out = out.mul(c.d1_5)}
	else if (type==="O") {out = out.mul(c.d4)}
	return out
}
function realAntiAxisSuperscalePower(type){
	let out=stat.antiAxisSuperscalingPower
	if (type==="Y") {out = out.mul(c.d3)}
	else if (type==="Z") {out = out.mul(c.d1_5)}
	else if (type==="W") {out = out.mul(c.d1_25)}
	else if (type==="U") {out = out.mul(c.d2)}
	else if (type==="S") {out = out.mul(c.d5)}
	else if (type==="Q") {out = out.mul(c.d4)}
	else if (type==="O") {out = out.mul(c.d9)}
	return out
}
function antiAxisCost(type,axis) {
	axis = (axis === undefined)?g["anti"+type+"Axis"]:N(axis);
	let cost;
	axis = Decimal.semiexpScaling(axis,stat.antiAxisSuperscalingStart,realAntiAxisSuperscalePower(type));
	axis = Decimal.linearScaling(axis,stat.antiAxisScalingStart,realAntiAxisScalePower(type));
	if (type==="X") cost = axis.add(c.d9).pow10();
	else if (type==="Y") cost = axis.mul(c.d2).add(c.d12).pow10();
	else if (type==="Z") cost = axis.div(c.d3).add(c.d3).pow(c.d3).pow10();
	else if (type==="W") cost = axis.add(c.d2).pow(c.d2).mul(c.d7_5).pow10();
	else if (type==="V") cost = axis.mul(c.d3).add(c.d25).pow10();
	else if (type==="U") cost = axis.div(c.d7_5).add(c.d2).pow(c.d7_5).pow10();
	else if (type==="T") cost = axis.mul(c.d250).add(c.e3).pow10();
	else if (type==="S") cost = c.inf.pow(c.d1_3.pow(axis).mul(c.d100div9));
	else if (type==="R") cost = axis.add(c.d25).pow(c.d3).pow10();
	else if (type==="Q") cost = axis.div(c.d10).pow10().mul(6e4).pow10();
	else if (type==="P") cost = c.d1_2.pow(axis).mul(2e6/9).pow10()
	else if (type==="O") cost = axis.add(23).div(c.d30).layerplus(3)
	else functionError("axisCost",type)
	cost = corruption.value("antiAxis",cost)
	cost = cost.pow(realAntiAxisCostExponent(type));
	cost = cost.div(realAntiAxisCostDivisor(type));
	return cost;
}
function maxAffordableAntiAxis(type,am=g.antimatter) {
	if (antiAxisCost(type).gte(am)&&am.eq(g.antimatter)) return g["anti"+type+"Axis"];
	let effective_AM = corruption.invertValue("antiAxis",am.mul(realAntiAxisCostDivisor(type)).root(realAntiAxisCostExponent(type)));
	let axis;			 // prevent "lexical declaration cannot appear in single-statement context"
	if (type==="X") {axis = effective_AM.lte(c.e9)?c.dm1:effective_AM.log10().sub(c.d9);}
	else if (type==="Y") {axis = effective_AM.lte(c.e12)?c.dm1:effective_AM.log10().sub(c.d12).div(c.d2);}
	else if (type==="Z") {axis = effective_AM.lte(1e27)?c.dm1:effective_AM.log10().pow(c.d1div3).sub(c.d3).mul(c.d3);}
	else if (type==="W") {axis = effective_AM.lte(c.e30)?c.dm1:effective_AM.log10().div(c.d7_5).pow(c.d0_5).sub(c.d2);}
	else if (type==="V") {axis = effective_AM.lte(c.e25)?c.dm1:effective_AM.log10().sub(c.d25).div(c.d3);}
	else if (type==="U") {axis = effective_AM.lte(1e256)?c.dm1:effective_AM.log10().root(c.d7_5).sub(c.d2).mul(c.d7_5);}
	else if (type==="T") {axis = effective_AM.lte(c.ee3)?c.dm1:effective_AM.log10().sub(c.e3).div(c.d250);}
	else if (type==="S") {axis = effective_AM.lte(c.inf.pow(c.d12))?c.dm1:effective_AM.log(c.d2).div(c.d102400div9).log(c.d1_3);}
	else if (type==="R") {axis = effective_AM.lte("e15625")?c.dm1:effective_AM.log10().root(c.d3).sub(c.d25);}
	else if (type==="Q") {axis = effective_AM.lte("e6e4")?c.dm1:effective_AM.log10().div(6e4).log10().mul(c.d10);}
	else if (type==="P") {axis = effective_AM.lte("e2.5e5")?c.dm1:effective_AM.log10().div(2e6/9).log(c.d1_2);}
	else if (type==="O") {axis = effective_AM.lte(N(23/30).layerplus(3))?c.dm1:effective_AM.layerplus(-3).mul(c.d30).sub(23);}
	else functionError("maxAffordableAxis",arguments);
	axis = Decimal.linearSoftcap(axis,stat.antiAxisScalingStart,realAntiAxisScalePower(type));
	axis = Decimal.semilogSoftcap(axis,stat.antiAxisSuperscalingStart,realAntiAxisSuperscalePower(type));
	return axis.floor().add(c.d1);
}
function buyAntiAxis(x,manual=false) {
	if (Decimal.eq(maxAxisForAchievement(x),g["anti"+x+"Axis"])) {if (manual) {achievement.lockPopup()};return}
	if (g.antimatter.gte(antiAxisCost(x))&&antiAxisUnlocked(x)) {
		o.sub("antimatter",antiAxisCost(x));
		o.add("anti"+x+"Axis",c.d1);
	}
	if (g.antiSAxis.gt(c.d0)) g.ach525possible=false;
	addAchievements("axisBuy");
}
function buyMaxAntiAxis(caps,manual=false) {
	let total = axisCodes.map(x=>g["anti"+x+"Axis"]).sumDecimals()
	for (let j=0;j<8+study13.rewardLevels.slabdrill;j++) {
		let type = axisCodes[j]
		if (!antiAxisUnlocked(type)) continue
		let amount = caps[j]==="u"?maxAffordableAntiAxis(axisCodes[j]):Decimal.min(maxAffordableAntiAxis(axisCodes[j]),N(caps[j]).fix(c.d0,false));
		if (amount==="NA") continue;
		if (amount.lte(g["anti"+axisCodes[j]+"Axis"])) continue;
		amount = amount.min(maxAxisForAchievement("anti"+axisCodes[j]))
		if (antiAxisCost(axisCodes[j],amount.sub(c.d1)).lt(g.antimatter)) o.sub("antimatter",antiAxisCost(axisCodes[j],amount.sub(c.d1)));
		g["anti"+axisCodes[j]+"Axis"]=amount;
	}
	if (g.antiSAxis.gt(c.d0)) g.ach525possible=false;
	addAchievements("axisBuy");
	if (manual&&(achievement.maxForLocks.axis[g.achOnProgressBar]!==undefined)&&achievement.locking(g.achOnProgressBar)&&axisCodes.map(x=>g["anti"+x+"Axis"]).sumDecimals().eq(total)) {achievement.lockPopup();}
}
function antiAxisDimBoostPower(type){
	let out = c.d1
	if ((type==="S")&&g.research.r26_14) {out = out.mul(researchEffect(26,14))}
	let res = researchList.antimatter[type+"1"]
	if (g.research[res]) {out = out.mul(researchEffect(researchRow(res),researchCol(res)))}
	if (study13.bound(244)) {out = out.div(study13.bindingEff(244))}
	return out
}
function antiAxisDimBoost(type,next=false) {
	let x = g["anti"+type+"Axis"]
	if (next) {x = x.add(c.d1)}
	return x.mul(antiAxisDimBoostPower(type)).div(c.e3).add(c.d1).ln().add(c.d1).pow(c.d0_9)
}
function antiAxisDimBoostFormula(type){
	let out = "(ln("+type+formulaFormat.mult(antiAxisDimBoostPower(type).div(c.e3))+" + 1) + 1)<sup>0.9</sup>"
	let boost = antiAxisDimBoost(type)
	if (boost.lt(c.d10)) {out = "("+out+" - 1) × 100"}
	return "<i>"+out+"</i>"+(boost.lt(c.d10)?"%":"×")
}
const antimatterGalaxy = {
	costs:{
		base:function(){return N("1e5000")},
		scale:function(){return c.d1_2}
	},
	req:function(x=g.antimatterGalaxies){return [this.costs.base(),this.costs.scale(),x].decimalPowerTower()},
	affordable:function(x=g.antimatter){return x.lt(this.costs.base())?c.d0:x.log(this.costs.base()).log(this.costs.scale()).floor().add(c.d1)},
	reqFormula:function(){return formulaFormat("10<sup>"+this.costs.base().log10().noLeadFormat(3)+" × "+this.costs.scale().noLeadFormat(4)+"<sup>G</sup></sup>")},
	effect1:function(x=stat.realAntimatterGalaxies){return x},
	effect1Formula:function(){return formulaFormat("G")},
	effect2:function(x=stat.realAntimatterGalaxies){return x.div(c.e3).add(c.d1).pow(c.d10)},
	effect2Formula:function(){return formulaFormat("(1 + G ÷ 1,000)<sup>10</sup>")},
	effect3:function(x=stat.realAntimatterGalaxies){return x.div(c.d500)},
	effect3Formula:function(){return formulaFormat("G × 0.2")},
	effectHTML:function(){
		let v1 = stat.realAntimatterGalaxies;
		let v2 = calcStatWithDifferentBase("realAntimatterGalaxies",stat.maxAffordableAntimatterGalaxies.max(g.antimatterGalaxies.add(c.d1)));
		return [
			"Gain "+(showFormulas?this.effect1Formula():arrowJoin(this.effect1(v1).noLeadFormat(3),this.effect1(v2).noLeadFormat(3)))+" free dark stars",
			"Antimatter gain is raised to the power of "+(showFormulas?this.effect2Formula():arrowJoin(this.effect2(v1).noLeadFormat(4),this.effect2(v2).noLeadFormat(4))),
			"The game runs "+(showFormulas?this.effect3Formula():arrowJoin(this.effect3(v1).mul(c.e2).noLeadFormat(3),this.effect3(v2).mul(c.e2).noLeadFormat(3)))+"% faster per normal galaxy"
		].join("<br>");
	},
	gain:function(cap) {
		cap = (cap==="u")?c.maxvalue:N(cap)
		if (!(cap instanceof Decimal)) {functionError("antimatterGalaxy.gain",arguments)}
		let gain = stat.maxAffordableAntimatterGalaxies.min(cap);
		if (!g.antimatterGalaxyBulk) gain = gain.min(g.antimatterGalaxies.add(c.d1))
		if (gain.gt(g.antimatterGalaxies)) {g.antimatterGalaxies=gain}
	}
}

// Wormhole Upgrades
function buyWormholeUpg(x) {
	if ((g.wormholeUpgrades[x]<wormholeUpgrades[x].max)&&g.hawkingradiation.gte(wormholeUpgrades[x].cost)) {
		o.sub("hawkingradiation",wormholeUpgrades[x].cost)
		g.wormholeUpgrades[x]++
	}
}
function wormholeUpgName(x) {return "Wormhole Upgrade "+x+" \""+wormholeUpgrades[x].name+"\""}
function repeatableWormholeUpgradeCost(baseExp,maxExp,max,owned){return [Decimal.decibel(owned),baseExp,Decimal.pow(maxExp.div(Decimal.decibel(max-1).mul(baseExp)),N(Math.max(1.25*owned/(max-1)-0.25,0)**3))].productDecimals().pow10()}

// Extra
function showFooter(){return (g.footerDisplay==="All tabs")?true:(g.footerDisplay==="Only Axis tab")?(g.activeTab==="main"&&g.activeSubtabs.main==="axis"):(g.footerDisplay==="None")?false:undefined}
const topResources = [
	{
		text:function(){return "<span class=\"_exoticmatter\">"+g.exoticmatter.format()+"</span> exotic matter"+((g.exoticmatter.lt(c.ee9)||g.exoticmatter.gt_tolerance(stat.exoticmatterPerSec,1e-4))?(" (<span class=\"_exoticmatter\">"+stat.exoticmatterPerSec.noLeadFormat(2)+"</span> / s)"):"");},
		condition:function(){return g.topResourcesShown.exoticmatter;}
	},
	{
		text:function(){return "<span class=\"_mastery\">"+g.masteryPower.format()+"</span> mastery power"+((g.masteryPower.lt(c.ee9)||g.masteryPower.gt_tolerance(stat.masteryPowerPerSec,1e-4))?(" (<span class=\"_mastery\">"+stat.masteryPowerPerSec.format(2)+"</span> / s)"):"");},
		condition:function(){return g.topResourcesShown.masteryPower&&unlocked("Masteries");},
	},
	{
		text:function(){return "<span class=\"_stardust\">"+g.stardust.format()+"</span> stardust";},
		condition:function(){return g.topResourcesShown.stardust&&unlocked("Stardust");},
	},
	{
		text:function(){return g.stardustUpgrades[4]>0?("<span class=\"_darkmatter\">"+g.darkmatter.format()+"</span> dark matter"+((g.darkmatter.lt(c.ee9)||g.darkmatter.gt_tolerance(stat.darkmatterPerSec,1e-4))?(" (<span class=\"_darkmatter\">"+stat.darkmatterPerSec.format(2)+"</span> / s)"):"")):"";},
		condition:function(){return g.topResourcesShown.darkmatter&&unlocked("Dark Matter");}
	},
	{
		text:function(){return "<span class=\"_wormhole\">"+g.hawkingradiation.format()+"</span> Hawking radiation";},
		condition:function(){return g.topResourcesShown.hr&&unlocked("Hawking Radiation");}
	},
	{
		text:function(){return g.studyCompletions[9]>0?("<span class=\"_antimatter\">"+g.antimatter.format()+"</span> antimatter"+((g.antimatter.lt(c.ee9)||g.antimatter.gt_tolerance(stat.antimatterPerSec,1e-4))?(" (<span class=\"_antimatter\">"+stat.antimatterPerSec.format(2)+"</span> / s)"):"")):"";},
		condition:function(){return g.topResourcesShown.antimatter&&unlocked("Antimatter");}
	},
	{
		condition:function(){return g.dilatedTime>0;},
		text:function(){return "<span class=\"_time\">"+timeFormat(g.dilatedTime)+"</span> dilated time "+["","<span class=\"_time2\">("+N(stat.baseOverclockSpeedup).noLeadFormat(3)+"× Overclock)</span>","<span class=\"blue\">(Frozen)</span>","<span class=\"yellow\">(Equalized)</span>"][timeState];},
	},
	{
		text:function(){let t = stat.tickspeed, out = (t.eq(c.d0)||t.gt(c.d1))?[t,"×"]:[t.recip(),"÷"];return "<span class=\"_time\">"+out[0].noLeadFormat(3)+"</span>"+out[1]+" tickspeed";},
		condition:function(){return stat.tickspeed.neq(c.d1);}
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
		text:function(){return studies[6].name+": ÷<span class=\"red\">"+studies[6].effect().noLeadFormat(3)+"</span>"},
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
		text:function(){return studies[8].name+" limit: <span class=\"red\">"+studies[8].darkAxisMaxCost().format()+"</span>"},
		condition:function(){return StudyE(8);}
	},
	{
		text:function(){return "<span class=\"_exp\">"+g.study9.xp.format()+"</span> experientia (^<span class=\"red\">"+studies[9].experientiaEffect().noLeadFormat(4)+"</span>)"},
		condition:function(){return StudyE(9);}
	},
	{
		text:function(){return "<span class=\"_exp\">"+(9-g.timeThisWormholeReset).toFixed(1)+"s</span> left until reset (<span class=\"_exp\">"+studies[9].formatChange()+" XP</span>)"},
		condition:function(){return StudyE(9);}
	},
	{
		text:function(){return studies[11].name+": <span class=\"red\">"+String(studies[11].lunarMinutes()).padStart(2,"0")+"</span> past <span style=\"font-family:monospace\" class=\"red\">"+studies[11].active()+"</span>"},
		condition:function(){return StudyE(11);}
	},
	{
		text:function(){return "Binding 236: <span style=\"color:var(--binding)\">"+timeFormat(study13.bindingEff(236)-g.timeThisWormholeReset)+"</span> left"},
		condition:function(){return study13.bound(236)&&(!showFooter())}
	}
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
		text:"<span style=\"text-decoration:underline\">Here is a list of "+label+" options:</span><br>"+buttons.filter(x=>x.visible??true).map(x=>"<button class=\"genericbutton size2\" onClick=\""+x.onClick+";openConfig['"+label+"']()\">"+x.text+"</button>").join("")+"<br>",
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
			{text:"Mastery tab layout: "+g.masteryContainerStyle,onClick:"g.masteryContainerStyle=(g.masteryContainerStyle==='Modern'?'Legacy':'Modern')"},
			{text:(g.masteryIdsShown?"Show":"Hid")+"ing Mastery IDs",onClick:"toggle('masteryIdsShown')"},
			{text:(g.masteryBoostsShown?"Show":"Hid")+"ing Mastery boost percentages",onClick:"toggle('masteryBoostsShown')"},
			{text:(g.masteryActivityShown?"Show":"Hid")+"ing Mastery activity states",onClick:"toggle('masteryActivityShown')"},
			{text:"Order of Mastery rows "+(g.masteryRowsReversed?"":"not ")+"reversed",onClick:"toggle('masteryRowsReversed');d.innerHTML('masteryContainerLegacy',masteryTableLegacy());d.innerHTML('masteryContainerModern',masteryTableModern())"}
		])},
		"Offline Time":function(){showConfigModal("Offline Time",[
			{text:(g.glowOptions.overclock?"G":"No g")+"low during Overclock",onClick:toggle("g.glowOptions.overclock")}
		])},
		"Achievement":function(){updateAchievementsTab();showConfigModal("Achievement",[
			{text:"Achievement ID "+(g.achievementIDShown?"":"not ")+" shown",onClick:"toggle('achievementIDShown');for (let i of achievement.all){d.display('span_ach'+i+'ID',g.achievementIDShown?'inline-block':'none')}"},
			{text:(g.completedAchievementTiersShown?"Show":"Hid")+"ing completed achievement tiers",onClick:"toggle('completedAchievementTiersShown')"},
			{text:"Order of Achievement tiers "+(g.achievementTiersReversed?"":"not ")+"reversed",onClick:"toggle('achievementTiersReversed');d.innerHTML('achievementContainer',achievementContainer());",visible:unlocked("Stardust")}
		])},
		"Stardust Boost":function(){showConfigModal("Stardust Boost",[
			{text:"Stardust amount shown "+(g.topResourcesShown.stardust?"on top of screen":"in Stardust tab"),onClick:toggle("g.topResourcesShown.stardust")},
			{text:"Stardust reset confirmation "+(g.confirmations.stardustReset?"en":"dis")+"abled",onClick:toggle("g.confirmations.stardustReset")},
			{text:"Stardust reset confirmation "+(g.confirmations.ironWillStardustReset?"en":"dis")+"abled in Iron Will",onClick:toggle("g.confirmations.ironWillStardustReset"),visible:g.achievement[502]},
			{text:(g.glowOptions.buyStardustUpgrade?"G":"No g")+"low if Stardust Upgrade can be purchased",onClick:toggle("g.glowOptions.buyStardustUpgrade")},
			{text:(g.showingCappedStardustUpgrades?"Show":"Hid")+"ing capped Stardust Upgrades",onClick:"toggle('showingCappedStardustUpgrades')"}
		])},
		"Star":function(){updateStarLayout();showConfigModal("Star",[
			{text:"Star tab layout: "+g.starContainerStyle,onClick:"g.starContainerStyle=(g.starContainerStyle==='Modern'?'Legacy':'Modern')"},
			{text:(g.glowOptions.buyStar?"G":"No g")+"low if star can be purchased",onClick:toggle("g.glowOptions.buyStar")},
			{text:(g.glowOptions.assignStar?"G":"No g")+"low if star can be assigned",onClick:toggle("g.glowOptions.assignStar")}
		])},
		"Dark Matter":function(){showConfigModal("Dark Matter",[
			{text:"Dark matter amount shown "+(g.topResourcesShown.darkmatter?"on top of screen":"in Dark Matter subtab"),onClick:toggle("g.topResourcesShown.darkmatter")},
			{text:(g.glowOptions.buyDarkAxis?"G":"No g")+"low if dark axis can be purchased",onClick:toggle("g.glowOptions.buyDarkAxis")},
			{text:(g.glowOptions.buyDarkStar?"G":"No g")+"low if dark stars can be gained",onClick:toggle("g.glowOptions.gainDarkStar")},
			{text:"Dark star bulk buy "+(g.darkstarBulk?"en":"dis")+"abled",onClick:"toggle('darkstarBulk')"},
			{text:(g.glowOptions.study12?"G":"No g")+"low if Titanium Empowerments can be gained",onClick:toggle("g.glowOptions.study12"),visible:visibleStudies().includes(12)||unlocked("Matrix")},
		])},
		"Research":function(){showConfigModal("Research",[
			{text:"Hawking radiation amount shown "+(g.topResourcesShown.hr?"on top of screen":"in Wormhole tab"),onClick:toggle("g.topResourcesShown.hr")},
			{text:"Wormhole reset confirmation "+(g.confirmations.wormholeReset?"en":"dis")+"abled",onClick:toggle("g.confirmations.wormholeReset")},
			{text:"Separate button to buy research "+(g.confirmations.researchDoubleClick?"en":"dis")+"abled",onClick:toggle("g.confirmations.researchDoubleClick")},
			{text:(g.glowOptions.observe?"G":"No g")+"low if can observe",onClick:toggle("g.glowOptions.observe")},
			{text:(g.glowOptions.buyPermanentResearch?"G":"No g")+"low if can buy permanent research",onClick:toggle("g.glowOptions.buyPermanentResearch"),visible:(g.studyCompletions[1]+g.studyCompletions[2])>5}
		])},
		"Study":function(){showConfigModal("Study",[
			{text:"Study container style: "+g.studyContainerStyle,onClick:"g.studyContainerStyle=(g.studyContainerStyle==='Compact')?'Detailed':'Compact'"},
			{text:(g.completedStudiesShown?"Show":"Hid")+"ing Studies with max completions",onClick:"toggle('completedStudiesShown')",visible:g.studyContainerStyle==="Detailed"},
			{text:"Automatic research respec on Study completion "+(g.restoreResearchAfterStudy?"dis":"en")+"abled",onClick:"toggle('restoreResearchAfterStudy')"}
		])},
		"Light":function(){showConfigModal("Light",[
			{text:(g.glowOptions.noChromaGeneration?"G":"No g")+"low if no chroma is being generated",onClick:toggle("g.glowOptions.noChromaGeneration")},
			{text:"If out of a component chroma, "+(g.haltChromaIfLacking?"halt generation":"switch to generate limiting component"),onClick:"toggle('haltChromaIfLacking')",visible:lightTiersUnlocked()>1},
			{text:"Lumen effects shown from "+(g.showLightEffectsFrom0?"zero":"previous lumen"),onClick:"toggle('showLightEffectsFrom0')"},
			{text:achievement.label(815)+" reward "+(g.ach815RewardActive?"":"in")+"active",onClick:toggle("g.ach815RewardActive"),visible:g.achievement[815]}
		])},
		"Galaxy":function(){showConfigModal("Galaxy",[
			{text:(g.glowOptions.createGalaxy?"G":"No g")+"low if a galaxy can be created",onClick:toggle("g.glowOptions.createGalaxy")}
		])},
		"Luck":function(){showConfigModal("Luck",[
			{text:(g.glowOptions.buyLuckRune?"G":"No g")+"low if enough luck runes can be purchased for an upgrade",onClick:toggle("g.glowOptions.buyLuckRune")},
			{text:(g.glowOptions.buyLuckUpgrade?"G":"No g")+"low if luck upgrades can be purchased",onClick:toggle("g.glowOptions.buyLuckUpgrade")}
		])},
		"Prismatic":function(){showConfigModal("Prismatic",[
			{text:(g.glowOptions.buyPrismaticUpgrade?"G":"No g")+"low if non-refundable prismatic upgrades can be purchased",onClick:toggle("g.glowOptions.buyPrismaticUpgrade")},
			{text:(g.glowOptions.buyRefundablePrismaticUpgrade?"G":"No g")+"low if refundable prismatic upgrades can be purchased",onClick:toggle("g.glowOptions.buyRefundablePrismaticUpgrade")}
		])},
		"Antimatter":function(){showConfigModal("Antimatter",[
			{text:"Antimatter amount shown "+(g.topResourcesShown.antimatter?"on top of screen":"in Antimatter subtab"),onClick:toggle("g.topResourcesShown.antimatter")},
			{text:(g.glowOptions.buyAntiAxis?"G":"No g")+"low if anti-axis can be purchased",onClick:toggle("g.glowOptions.buyAntiAxis")},
		])},
		"Wormhole Upgrades":function(){showConfigModal("Wormhole Upgrades",[
			{text:(g.glowOptions.buyAntiAxis?"G":"No g")+"low if Wormhole Upgrade can be purchased",onClick:toggle("g.glowOptions.buyWormholeUpgrade")},
		])},
		"Study XIII":function(){showConfigModal("Study XIII",[
			{text:"Parent bindings "+(g.study13ShowParentBindings?"show":"hidde")+"n in Binding viewer",onClick:toggle("g.study13ShowParentBindings")}
		])}
	}
})()
function endgameColor() {
	return "hsl("+((Date.now()/1e4)%360)+","+(90+Math.sin(Date.now()/1e6)*10)+"%,"+(40+Math.cos(Date.now()/1e8)*10)+"%)";				// random color that slowly changes over time
}
const progressMilestones = [
	{
		type:1,
		get label(){return achievement.label(g.achOnProgressBar)+(g.achievement[g.achOnProgressBar]?(" milestone "+(achievement(g.achOnProgressBar).milestones()+1)):"")},
		percent:function(){let p = achievement(g.achOnProgressBar).progress();return Array.isArray(p)?(p[0]/100):((typeof p)==="object")?((((typeof p.percent)==="number")?p.percent:p.percent[0])/100):undefined},
		req:function(){let p = achievement(g.achOnProgressBar).progress();return ((typeof p)==="string")?p:Array.isArray(p)?(p[1].noLeadFormat(3)+" / "+p[2].noLeadFormat(3)):((typeof p)==="object")?((Array.isArray(p)?(p.percent[1].noLeadFormat(2)+" / "+p.percent[2].noLeadFormat(2)+"; "):"")+p.text):""},
		get color(){return g.achievement[g.achOnProgressBar]?"#00cccc":"var(--achievements)"},
		condition:function(){return g.achOnProgressBar==="N"}
	},
	{
		type:1,
		label:"Masteries",
		percent:function(){return Decimal.div(g.exoticmatter,axisCost("X",0));},
		req:function(){return "Need 1 X Axis";},
		color:"var(--mastery)",
		condition:function(){return unlocked("Masteries");}
	},
	{
		type:1,
		label:"the next row of Masteries",
		percent:function(){return Decimal.div(g.exoticmatter,axisCost("Z",0));},
		req:function(){return "Need 1 Z Axis";},
		color:"var(--mastery)",
		condition:function(){return stat.masteryRow2Unlocked}
	},
	{
		type:1,
		label:"the next row of Masteries",
		percent:function(){return stat.totalNormalAxis.div(c.d40);},
		req:function(){return "Need 40 total axis";},
		color:"var(--mastery)",
		condition:function(){return stat.masteryRow3Unlocked}
	},
	{
		type:1,
		label:"the next row of Masteries",
		percent:function(){return stat.totalNormalAxis.div(c.d50);},
		req:function(){return "Need 50 total axis";},
		color:"var(--mastery)",
		condition:function(){return stat.masteryRow4Unlocked}
	},
	{
		type:1,
		label:"Stardust and another Row 4 Mastery",
		percent:function(){return g.exoticmatter.div(stat.stardustExoticMatterReq);},
		req:function(){return "Need "+stat.stardustExoticMatterReq+" total exotic matter produced";},
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
		req:function(){return "Need "+stat.wormholeDarkAxisReq.format(0)+" dark axis";},
		color:"linear-gradient(90deg,#0000ff,#9900ff)",
		condition:function(){return unlocked("Hawking Radiation");}
	},
	{
		type:1,
		label:"Study completion",
		percent:function(){return stat.totalDarkAxis.div(stat.wormholeDarkAxisReq);},
		req:function(){return "Need "+stat.wormholeDarkAxisReq.format(0)+" dark axis"+(study13.bound(236)?("; "+timeFormat(study13.bindingEff(236)-g.timeThisWormholeReset)+" left"):"");},
		get color(){return (study13.bound(236)?("linear-gradient(90deg,rgba(143,112,51,0.5),rgba(143,112,51,0.5) "+(100*g.timeThisWormholeReset/study13.bindingEff(236))+"%,rgba(0,0,0,0) "+(100*g.timeThisWormholeReset/study13.bindingEff(236))+"%,rgba(0,0,0,0)),"):"")+"#000066"},
		condition:function(){return g.activeStudy===0;}
	},
	{
		type:1,
		label:"unlock the first Dilation upgrade",
		percent:function(){return stat.tickspeed.log(dilationUpgrades[1].tickspeedNeeded)},
		req:function(){return "Need "+dilationUpgrades[1].tickspeedNeeded.format()+"× tickspeed"},
		color:"var(--time)",
		condition:function(){return g.dilationUpgradesUnlocked>0}
	},
	{
		type:1,
		label:"unlock the second Dilation upgrade",
		percent:function(){return stat.tickspeed.log(dilationUpgrades[2].tickspeedNeeded)},
		req:function(){return "Need "+dilationUpgrades[2].tickspeedNeeded.format()+"× tickspeed"},
		color:"var(--time)",
		condition:function(){return g.dilationUpgradesUnlocked>1}
	},
	{
		type:2,
		condition:function(){return achievement.ownedInTier(8)!==0;}
	},
	{
		type:1,
		label:"Luck Shards",
		percent:function(){return 0},
		req:function(){return "Need Study VII completion"},
		color:"var(--luck)",
		condition:function(){return g.studyCompletions[7]>0}
	},
	{
		type:1,
		label:"Antimatter",
		percent:function(){return 0},
		req:function(){return "Need Study IX completion"},
		color:"var(--antimatter)",
		condition:function(){return g.studyCompletions[9]>0}
	},
	{
		type:2,
		condition:function(){return g.achievement[810];}
	},
	{
		type:1,
		label:"unlock the third Dilation upgrade",
		percent:function(){return stat.tickspeed.log(dilationUpgrades[3].tickspeedNeeded)},
		req:function(){return "Need "+dilationUpgrades[3].tickspeedNeeded.format()+"× tickspeed"},
		color:"var(--time)",
		condition:function(){return g.dilationUpgradesUnlocked>2}
	},
	{
		type:2,
		condition:function(){return g.achievement[905];}
	},
	{
		type:1,
		label:"current endgame",
		percent:function(){return g.studyCompletions[13]/200},
		req:function(){return "Need 200 Study XIII completions"},
		color:"endgame",
		condition:function(){return g.studyCompletions[13]>199}
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
	if (data.type===1) {
		let progressText = data.req()
		if (data.percent()!==undefined) {progressText = N(data.percent()).max(c.d0).min(c.d1).mul(c.e2).toNumber().toFixed(2)+"%"+((progressText!==undefined)?(" ("+progressText+")"):"")}
		label = "Progress to "+data.label+": "+progressText;
		filled = (data.percent===undefined)?0:N(data.percent()).max(c.d0).min(c.d1).mul(c.e2).toNumber();
		color = data.color==="endgame"?endgameColor():data.color;
	} else if (data.type===2) {
		label = "No new aspects detected. <span style=\"font-weight:700\">Perhaps you need something else.</span>";
		filled = 0;
		color = "#666666"; // same as unfilled
	} else if (data.type===3) {
		label = "You are at the current endgame. Click for a clue of what and when the next update will bring";
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
	if (data.type===3) notify(version.nextUpdateHint+" "+version.percentage(),endgameColor(),"#ffffff")
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
			if (typeof baseValue === "undefined") continue
      if (baseValue instanceof Decimal) {
				if (baseValue instanceof Decimal) game[prop] = (Decimal.valid(savedValue)?N(savedValue):baseValue)
			} else if (typeof savedValue === 'object' && !Array.isArray(savedValue)) {
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
	if ((typeof savegame === "object") && (savegame !== null)) {
		// game load
		g = decimalStructuredClone(basesave);
		getSavedGame(savegame,g)
		// previous version continuity
		if (typeof g.stardustAutomatorMode !== "number") {g.stardustAutomatorMode = ["amount","time","mult","pow"].indexOf(g.stardustAutomatorMode)}
		if (typeof g.wormholeAutomatorMode !== "number") {g.wormholeAutomatorMode = ["amount","time","mult","pow"].indexOf(g.wormholeAutomatorMode)}
		if ((savegame.achievement===undefined)&&(savegame.ownedAchievements!==undefined)) {g.achievement = Object.fromEntries(achievement.all.map(x=>[x,savegame.ownedAchievements.map(x=>String(x)).includes(String(x))]))}
		if ((savegame.secretAchievement===undefined)&&(savegame.ownedSecretAchievements!==undefined)) {g.secretAchievement = Object.fromEntries(Object.keys(secretAchievementList).map(x=>[x,savegame.ownedSecretAchievements.map(x=>String(x)).includes(String(x))]))}
		totalAchievements = Object.values(g.achievement).map(x=>x?1:0).sum()
		totalSecretAchievements = Object.values(g.secretAchievement).map(x=>x?1:0).sum()
		if ((savegame.star===undefined)&&(savegame.ownedStars!==undefined)) {g.star = Object.fromEntries(starList.map(x=>[x,savegame.ownedStars.includes(x)]))}
		if ((savegame.research===undefined)&&(savegame.ownedResearch!==undefined)&&(savegame.permanentResearch!==undefined)) {g.research = Object.fromEntries(Object.keys(research).map(x=>[x,savegame.ownedResearch.includes(x)||savegame.permanentResearch.includes(x)]))}
		if (savegame.lumens===undefined) {for (let i=0;i<9;i++) addLumens(i)}
		totalStars = Object.values(g.star).map(x=>x?1:0).sum()
		totalResearch.temporary = researchList.nonPermanent.filter(x=>research[x].type==="normal").map(x=>(g.research[x])?1:0).sum() // filter study research
		totalResearch.permanent = researchList.permanent.map(x=>g.research[x]?1:0).sum()
		fixMasteryArrays();
		for (let i=0; i<4; i++) g.observations[i]=N(g.observations[i]).fix(c.d0);
		if (g.chroma.length===8) g.chroma.push(c.d0)
		if (g.lumens.length===8) g.lumens.push(c.d0)
		for (let i=0; i<9; i++) g.chroma[i]=N(g.chroma[i]).fix(c.d0);
		g.TotalStardustResets=Math.max(g.StardustResets,g.TotalStardustResets);
		g.TotalWormholeResets=Math.max(g.WormholeResets,g.TotalWormholeResets);
		if (((typeof g.version) !== "number")&&(g.EMDLevelDisplayInFooter===0)) {g.version = 1;g.EMDLevelDisplayInFooter = 1} // make "level only" the default
		// savefixer
		if (typeof g.galaxies !== "number") g.galaxies = 0             // < 1.3.2
		// initialize
		olddelta = Date.now()
		g.dilatedTime += (olddelta-g.timeLeft)/1000
		updateOverclockScrollbar()
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
function processImport(string,bypassWarning=false) {
	if (string.substring(0,34)==="AntimatterDimensionsSavefileFormat"&&string.substring(string.length-13)==="EndOfSavefile") {
		addSecretAchievement(34)
	} else {
		let save = JSON.parse(atob(string))
		if (!bypassWarning) {
			let flag
			try {
				let checkVariables = ["exoticmatter","XAxis","SAxis","stardust","stardustUpgrades","masteryPower","timePlayed","stars","darkmatter","darkSAxis"]
				let flag = false
				for (let i of checkVariables) if (save[i]===undefined) {flag = true}
			} catch {flag = true}
			if (flag) {
				popup({
					text:"This doesn't look like a valid EMD save, are you sure you want to import this?<br><br><i style=\"color:#ff0000;\">Your progress could be wiped if you import this.</i>",
					buttons:[["Import anyway","processImport('"+string+"',true)"],["Cancel",""]]
				})
				return 
			}
		}
		load(save)
		for (let i=0;i<initSteps.length;i++) if (initSteps[i].onImport??false) initSteps[i].function()
	}
}
const promoCodeList = (()=>{
	function sach(x) {return {
		action:()=>addSecretAchievement(x),
		condition:()=>!g.secretAchievement[x]
	}}
	return {    // key = code, value = function
		"XNu35M0qc7KzBcgW":sach(7),
		"RsNU8rznMqhPdFjg":sach(8),
		"GEtJEyjWuFB1oNSA":sach(30),
		"YVAn4tknrVD5NcBB":{
			action:()=>{
				newsSupport.newsletter.spamStart=Infinity
				addSecretAchievement(33)
			},
			condition:()=>(!g.secretAchievement[33])&&(newsSupport.newsletter.remaining.length===0)
		},
	}
})()
function inputPromo() {
	popup({
		text:"Input your code here:",
		input:"",
		buttons:[
			["Confirm","processPromo(stringSimplify(popupInput()))"],
			["Close",""]
		]
	})
}
function processPromo(str) {
	let hash = alemanicHash(str,16)
	if (promoCodeList[hash] !== undefined) {
		if (promoCodeList[hash].condition()) {
			promoCodeList[hash].action()
		} else {
			notify("Code has already been used. Try again!","#0000cc")
		}
	} else {
		notify("Invalid code. Try again!","#990000")
	}
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
	} else if (stringSimplify(password)===stringSimplify(wipeSavePassword)) {
		g = decimalStructuredClone(basesave);
		openTab("main")
		openSubTab("main","axis")
		updateAchievementsTab()
		d.display("span_noAchievements","inline-block")
		updateYellowLightCache();
		updateStats()
	} else {
		popup({text:"Incorrect answer, wiping did not proceed.",buttons:[["Close",""]]});
	}
}