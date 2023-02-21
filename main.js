"use strict"
const basesave = {
  exoticmatter: N(0),
  exoticmatterThisStardustReset: N(0),
  exoticmatterThisWormholeReset: N(0),
	exoticmatterThisSpacetimeReset: N(0),
  totalexoticmatter: N(0),
  XAxis: N(0),
  YAxis: N(0),
  ZAxis: N(0),
  WAxis: N(0),
  VAxis: N(0),
  UAxis: N(0),
  TAxis: N(0),
  SAxis: N(0),
  masteryPower: N(0),
  baseMasteryPowerGain: N(1),
  activeMasteries: [null,0,0,0,0,0,0,0,0,0,0],
  timePlayed: 0,
  truetimePlayed: N(0),
  HTPshown: ["Exotic Matter"],
  featuresUnlocked: [],
  colortheme: "Default",
  timeThisStardustReset: 0,
  truetimeThisStardustReset: N(0),
  fastestStardustReset: N(9e15),
  timeThisWormholeReset: 0,
  truetimeThisWormholeReset: N(0),
  fastestWormholeReset: N(9e15),
	timeThisSpacetimeReset: 0,
	truetimeThisSpacetimeReset: N(0),
	fastestSpacetimeReset: N(9e15),
  storySnippets: [],
  timeLeft: 0,
  offlineSpeedupLength: 30,
  offlineSpeedupOn: "On",
  notation: "Mixed scientific",
  ownedAchievements: [],
	completedAchievementTiersShown: true,
  StardustResets: 0,
	last10StardustRuns: [],
  stardust: N(0),
  autosaveIsOn: true,
  stardustUpgrades: [0,0,0,0,0],
  axisAutobuyerOn: false,
  axisAutobuyerUpgrades: 0,
  axisAutobuyerCaps:["u","u","u","u","u","u","u","u","u","u","u","u"],
  stars: 0,
  ownedStars: [],
  darkmatter: N(0),
  darkXAxis: N(0),
  darkYAxis: N(0),
  darkZAxis: N(0),
  darkWAxis: N(0),
  darkVAxis: N(0),
  darkUAxis: N(0),
  darkTAxis: N(0),
  darkSAxis: N(0),
  darkstars: N(0),
  darkstarBulk: true,
  darkEnergy: N(1),
  stelliferousEnergy: N(1),
  gravitationalEnergy: N(1),
  spatialEnergy: N(1),
  neuralEnergy: N(1),
  metaEnergy: N(1),
  hawkingradiation: N(0),
  WormholeResets: 0,
	last10WormholeRuns: [],
  ach505Progress: N(0),
  shiningBrightTonight: true,
  ach519possible: true,
  ach524possible: true,
  ach525possible: true,
  ach526possible: true,
  darkAxisAutobuyerOn: false,
  darkAxisAutobuyerUpgrades: 0,
  darkAxisAutobuyerCaps:["u","u","u","u","u","u","u","u","u","u","u","u","u"],  // 13th item = dark stars
  stardustUpgradeAutobuyerOn: false,
  stardustUpgradeAutobuyerUpgrades: 0,
  starAutobuyerOn: false,
  starAutobuyerUpgrades: 0,
  starAutobuyerCap: "u",
  starAllocatorOn: false,
	starAllocatorBuild: [],
	wormholeAutomatorOn: false,
	wormholeAutomatorMode: "amount",
	wormholeAutomatorValue: "1",
	stardustAutomatorOn: false,
	stardustAutomatorMode: "amount",
	stardustAutomatorValue: "1",
  ownedResearch: [],
  permanentResearch: [],
  researchVisibility:["r1_3","r1_8","r1_13"],
	researchRespec: false,
  totalDiscoveries: N(0),
  spentDiscoveries: N(0),
  permanentSpentDiscoveries: N(0),
  observations: [N(0),N(0),N(0),N(0)],
  knowledge: N(0),
  activeStudy: 0,
  studyCompletions: [null,0,0,0,0,0,0,0,0,0,0,0,0,0],
}
var g = Object.assign({},basesave) // "game"
var timeSinceGameOpened = 0                 // "halted" achievements were being awarded randomly on load
var screen = 1    // 1: game      2: story
var offlineSpeedup = 0
var baseOfflineSpeedup = 1
var offlineTime = 0
const axisCodes = ["X","Y","Z","W","V","U","T","S"]
const masteryCodes = [11,12,21,22,31,32,41,42,43,51,52,61,62,63,71,72,81,82,83,84,85,91,92,101,102,103]
// Returns the sub-group of a mastery within a row
function masterySubGroup(id) {
	if (id==42) return 2
	return 1
}
const totalMasteryRows = Math.floor(masteryCodes.reduce((x,y) => Math.max(x,y))/10)
function fixMasteryArrays() {
  let masteryArrays = ["activeMasteries"]
  for (let i=0;i<masteryArrays.length;i++) while (g[masteryArrays[i]].length<=totalMasteryRows) g[masteryArrays[i]].push(0)
}
fixMasteryArrays()
var savecounter = 0 // will prevent save before load
var oldframetime = new Date().getTime()
var newframetime = new Date().getTime()
const stardustExoticMatterReq = N(1e25)
var axisAutobuyerProgress = 0
var energyTypes = ["dark","stelliferous","gravitational","spatial","neural","meta"]
var energyResources = ["Exotic matter gain","Stardust gain","Dark matter gain","Free X axis","Mastery power gain","Energy gain"]
var energyDeterminers = ["exotic matter","stardust","dark matter","X axis","mastery power","all energies"]
var energyHyper = [3,3,3,2,3,3]
function HRDarkAxisReq() {
	if (g.activeStudy==0) return N(1000)
	return N(studies[g.activeStudy].goal())
}
var wormholeAnimationActive = false
var wormholeAnimationStart = 0
var darkAxisAutobuyerProgress = 0
var stardustUpgradeAutobuyerProgress = 0
var starAutobuyerProgress = 0
var deltatime = 0
var lagAchievementTicks = 0
var fpsAchievementTicks = 0
var themeAchievementCount = 0
function tabGlow(tab) {
	if (tab=="Axis") {
		if (autobuyerMeta.interval("axis")==0.1&&g.axisAutobuyerOn) return false
		for (let i=0;i<8;i++) if (g.exoticmatter.gt(axisCost(axisCodes[i]))&&(axisUnlocked()>i)) return true
	}
	if (tab=="Masteries") for (let i=1;i<=totalMasteryRows;i++) if (MasteryE(10*i)&&masteryRowsUnlocked(i)&&!masteredRow(i)) return true
	if (tab=="Stardust Boosts") for (let i=1;i<6;i++) if (stardustUpgradeCost(i).lt(g.stardust)&&g.stardustUpgrades[i-1]<stardustUpgradeCap(i)) return true
	if (tab=="Stars") return ((unspentStars()>0)||(g.stardust.gt(starCost())))&&g.ownedStars.length<40
	if (tab=="Dark Matter") {
		if (autobuyerMeta.interval("darkAxis")==0.1&&g.darkAxisAutobuyerOn) return false
		for (let i=0;i<8;i++) if (g.darkmatter.gt(darkAxisCost(axisCodes[i]))) return true
		return totalAxis("dark").gte(darkStarReq())
	}
	if (tab=="Automation") {
		let data = Object.entries(autobuyers)
		for (let i=0;i<data.length;i++) if (data[i][1].unlockReq()&&g[data[i][0]+"AutobuyerUpgrades"]!==autobuyerMeta.cap(data[i][0])&&g[data[i][1].resource].gt(autobuyerMeta.cost(data[i][0]))) return true
	}
	if (tab=="Research") for (let i=0;i<4;i++) if (g[observationResources[i]].gt(observationCost(i+1))) return true
	return false
}
const formattags = {
  i: document.querySelectorAll('[data-i]'),     // innerHTML
  d: document.querySelectorAll('[data-d]'),     // display
  v: document.querySelectorAll('[data-v]'),     // visibility
  c: document.querySelectorAll('[data-c]'),     // class
  s: document.querySelectorAll('[data-s]')      // src
}
// Takes an array consisting of a tab ID and parent tab IDs and determines if a tab is open or not. Used to only update HTML which is currently being viewed.
function tabOpen(array) {
  if (d.element("game").style.display == "none") return false
  for (let i=0;i<array.length;i++) if (d.element(array[i]).style.display == "none") return false
  return true
}

var stardustUpgrade2Tooltip = ["Unlock axis autobuyer","Keep 10% of X Axis on reset","Keep 10% of Y Axis on reset","Keep 10% of Z Axis on reset","Keep 10% of W Axis on reset","Keep 10% of V Axis on reset","Keep 10% of U Axis on reset","Keep 10% of T Axis on reset","Keep 10% of S Axis on reset","Maxed!"]
var stardustUpgrade5Tooltip = ["Unlock Dark Matter","Unlock Energy","Unlock Stelliferous Energy","Unlock Gravitational Energy","Unlock Spatial Energy","Unlock Neural Energy","Unlock Meta Energy","Maxed!"]
function stardustUpgradeCap(x) {
	if (x==1) return 4
	if (x==2) return 9
	if (x==3) return achievement.ownedInTier(5)>=11?10:6
	if (x==4) return 5
	if (x==5) return 7
}
function stardustUpgradeCost(x) {
  let cost = [[1.5e6,4.5e10,1e14,1e20,c.maxvalue],
              [50,100,1e4,1e6,1e8,1e12,1e16,1e24,1e100,c.maxvalue],
              [3.3333e9,1.5e16,1e43,1e75,1e140,c.inf,"ee4","ee5","ee6","ee7",c.maxvalue],
              [125,2e7,5e18,1e60,1e115,c.maxvalue],
              [5e11,1e60,1e96,1e175,2.2222e222,1e270,c.inf,c.maxvalue]][x-1][g.stardustUpgrades[x-1]]
  if (achievement.ownedInTier(5) >= 9) cost = N(cost).dilate(wormholeMilestone9Effect())
	if (AchievementE(520)&&g.stardustUpgrades[x-1]==0) cost = cost.sqrt()
	if (AchievementE(519)) cost = cost.div(2**g.stars)
  return N(cost)
}
function axisEmpowerment(axis) {                                       // percentage of an axis which is empowered
  let output = N(0)
  if (axis=="Y"&&stat("YAxisEffect").gt(1)) output = output.add(realAxis("Y").mul(studies[1].reward(1).div(100)))
  return output.min(eval(g[axis+"Axis"]))
}
function unempoweredAxis(axis) {
  return realAxis(axis).sub(axisEmpowerment(axis))
}
function fullStudyName(x) {
  return "Study "+roman(x)+": "+studies[x].name
}
function studyRewardHTML(studyNum,rewardNum,precision,completions) {
	if (completions == undefined) completions = g.studyCompletions[studyNum]
	if (completions == 4) return BEformat(studies[studyNum].reward(rewardNum,4),precision)
	return BEformat(studies[studyNum].reward(rewardNum,completions),precision)+" → "+BEformat(studies[studyNum].reward(rewardNum,completions+1),precision)
}
const studies = {
  1: {
    name: "Autonomy",
    description: function() {
      return "You can't enter the Main, Stardust or Automation tabs, but everything inside them still works normally."
    },
    research: "r5_7",
    goal: function() {
      return g.studyCompletions[1]==4?c.maxvalue:research.r5_7.constant()
    },
    reward: function(num,comp) {
			if (comp == undefined) comp = g.studyCompletions[1]
      if (num==1) return N([0,0.2,0.33,0.42,0.5][comp])
      if (num==2) return Decimal.convergentSoftcap(achievement.owned()**((5+comp)/6)/4,comp*5,comp*10)
      if (num==3) return N([1,4,20,125,1000][comp])
    },
    reward_desc: function() {
      return ["Empower "+studyRewardHTML(1,1,1)+"% of your Y axis",
       	      "Keep an additional "+studyRewardHTML(1,2,2)+"% of each axis on Stardust reset (based on achievements)",
              "Multiply hawking radiation gain by "+studyRewardHTML(1,3,0)].join("<br><br>")
    }
  },
  2: {
    name: "Big Bang Theory",
    description: function() {
      return "Star costs increase much faster and stars must be purchased in a different order, but each unspent star acts as a free dark star"
    },
    research: "r5_9",
    goal: function() {
      return [N(800),N(950),N(1100),N(1e100),c.maxvalue][g.studyCompletions[2]]
    },
    reward: function(num,comp) {
			if (comp == undefined) comp = g.studyCompletions[2]
      if (num==1) return N([0,9,16,21,25][comp])
      if (num==2) return N([1,1.07,1.12,1.16,1.20][comp])
      if (num==3) return N([0,0.25,0.45,0.6,0.75][comp])
    },
    reward_desc: function() {
      return ["The post-25 star cost scaling is "+studyRewardHTML(2,1,0)+"% weaker",
              "Row 9 star effects are raised to the power of "+studyRewardHTML(2,2,2),
              "Each unspent star acts as "+studyRewardHTML(2,3,1)+" free dark stars. Allocated stars count as half of this value. Does not work in Study II."].join("<br><br>")
    }
  }
}
function researchPower(row,col) {
  let out = N(1)
  if (achievement.ownedInTier(5)>=21&&row==1) out = out.mul(achievement.owned()/1000+1)
  if (achievement.ownedInTier(5)>=24&&row==2) out = out.mul(achievement.owned()/500+1)
  if (ResearchE("r8_11")&&row==1) out = out.mul(researchEffect(8,11).mul(g.stars).div(100).add(1))
  return out
}
function researchEffect(row,col) {
  return research["r"+row+"_"+col].effect(researchPower(row,col))
}

function availableThemes() {
	let out = ["Default","Red","Green","Blue","Cyan","Magenta","Yellow","Light Gray","Dark Gray","Black"]
	if (AchievementE("s16")) out.push("Wormhole")
	return out
}
function theme() {
  let scheme = "color: #39f;background: #190033"           // Default theme
  if (g.colortheme == "Red") scheme = "color: #f00;background: #300"
  if (g.colortheme == "Green") scheme = "color: #0f0;background: #030"
  if (g.colortheme == "Blue") scheme = "color: #00f;background: #003"
  if (g.colortheme == "Cyan") scheme = "color: #0ff;background: #033"
  if (g.colortheme == "Magenta") scheme = "color: #f0f;background: #303"
  if (g.colortheme == "Yellow") scheme = "color: #ff0;background: #330"
  if (g.colortheme == "Light Gray") scheme = "color: #ccc;background: #666"
  if (g.colortheme == "Dark Gray") scheme = "color: #666;background: #333"
  if (g.colortheme == "Black") scheme = "color: #fff;background: #000"
	if (g.colortheme == "Wormhole") scheme = "color: #39f;background-image: repeating-radial-gradient(circle, #190033, #330066 10%, #190033 20%); background-size: cover"
	
  document.getElementsByTagName("body")[0].style = scheme+";min-height:100vh;font-size: 15px;font-family:verdana;text-align:center;"
	if (g.colortheme == "Default") themeAchievementCount++
	addAchievement("s16")
}
theme()

function incrementExoticMatter(x) {
  x=x.fix(0)
  let emtypes = ["exoticmatter","totalexoticmatter","exoticmatterThisStardustReset","exoticmatterThisWormholeReset","exoticmatterThisSpacetimeReset"]
  for (let i=0;i<emtypes.length;i++) g[emtypes[i]]=g[emtypes[i]].add(x)
}
function unlockFeature(x,condition) {
  if (!g.featuresUnlocked.includes(x)&&eval(condition)) {
    g.featuresUnlocked.push(x)
    openStory(x)
  }
  generateAchievementsTab()
}
function unlocked(x) {
  return g.featuresUnlocked.includes(x)
}
function openStory(x) {
  let snippets = {
    'Stardust': "<p>The universe has collapsed due to negative mass, yielding "+BEformat(g.stardust)+" atoms of <span class=\"stardustlayertext\">Stardust</span>. This powerful resource will allow your exotic matter to increase faster than before - however, its creation has consumed all of your exotic matter and Stardust.</p><p>Due to radioactive decay, all your Stardust is destroyed each time you create more. As a result, you need more exotic matter to gain Stardust each time.</p><p><b>Note that Masteries persist on all resets.</b></p>",
    'Dark Matter': "<p>You have just condensed 500 billion Stardust atoms into a <span class=\"darkmattertext\">particle with positive mass</span>.</p><p>It seems useless at first glance, but like your sprawling galaxies of fundamentally inert exotic matter, it can probably be formed into an Axis.</p>",
    'Energy': "<p>Well, you have a universe<sup>"+BEformat(g.totalexoticmatter.log(1e80).floor())+"</sup> filled with exotic matter. But, you realise that all those particles have virtually no <span class=\"energytext\">Energy</span>!</p><p>The laws of physics in your omniverse allow for energy to grow exponentially - unfortunately, you feel that you'll need a <i>lot</i> of it before you get a noteworthy outcome.",
    'Black hole': "<p>The large quantities of dark matter in your universe have resulted in the formation of a black hole.</p><p>At its current size it is of no use to you... but what if you add some dark matter to it? You feel tempted to try it 'in the name of <span class=\"researchtext\">science</span>'.</p>",
    'Hawking Radiation': "<p>Perhaps you acted too soon. The black hole grew in size until it consumed all the particles in your universe.</p><p>As the black hole evaporated, it created a wave of <span class=\"wormholelayertext\">Hawking radiation</span>.</p><p>For the first time since you started, you have no idea why you need this new resource. Perhaps it is time to conduct some <span class=\"researchtext\">research</span>?</p>",
		'Studies': "<p>You decide that, for some Wormhole soon, you'll create a universe "+(visibleStudies().includes(1)?"and not interfere with it at all":visibleStudies().includes(2)?"in which stars don't form easily":"<span style=\"color:#ff0000\">error</span>")+". In theory this is a harmful idea, but you feel like doing this will give you enlightenment.</p>"
  }
  if (snippets[x]!==undefined) {
    d.innerHTML("storyTitle",x)
    d.innerHTML("storyText",snippets[x])
    if (!g.storySnippets.includes(x)) g.storySnippets.push(x)
    d.display("game","none")
    d.display("story","inline-block")
  }
}
const axisEffectHTML = {
	X:"Exotic matter gain is multiplied by {e}",
	darkX:"Dark matter gain is multiplied by {e}",
	Y:"Increase X axis effect by +{e}×",
	darkY:"All dark axis are {e}× cheaper",
	YEmpowered:"Empowered Y axis multiply the X axis effect instead of adding to it",
	Z:"Exotic matter gain is multiplied by {e} (based on exotic matter)",
	darkZ:"Dark matter gain is multiplied by {e} (based on exotic matter)",
	W:"Exotic matter gain is multiplied by {e} (increases over time)",
	darkW:"Mastery power gain is multiplied by {e}",
	V:"All normal axis are {e}× cheaper",
	darkV:"Normal V axis is {e}% stronger",
	U:"Stardust gain is multiplied by {e} (based on unspent stardust)",
	darkU:"Dark matter gain is multiplied by {e} per dark axis owned",
	T:"Exotic matter gain is multiplied by {e} (based on total normal axis)",
	darkT:"Dark matter gain is multiplied by {e} (based on time this stardust reset)",
	S:"Exotic matter gain is raised to the power of {e}",
	darkS:"Dark matter gain is raised to the power of {e}"
}
const empowerableAxis = ["Y"]
function generateAxisTable() {
	let out = ""
	for (let i=0;i<8;i++) {
		out+="<button class=\"lockedaxisbutton\" onClick=\"buyAxis('"+axisCodes[i]+"')\" id=\"button_"+axisCodes[i]+"Axis\" style=\"display:none\">"+axisCodes[i]+" Axis (<span id=\"span_"+axisCodes[i]+"AxisAmount\"></span>)<br>"+axisEffectHTML[axisCodes[i]].replace("{e}","<span id=\"span_"+axisCodes[i]+"AxisEffect\"></span>")+"<br>Cost: <span id=\"span_"+axisCodes[i]+"AxisCost\"></span></button>"
	}
	for (let i=0;i<empowerableAxis.length;i++) {
		out+="<button class=\"empoweredaxis\" id=\"button_empowered"+empowerableAxis[i]+"Axis\" onClick=\"buyEmpoweredAxis()\" style=\"display:none\">Empowered "+empowerableAxis[i]+" Axis (<span id=\"span_empowered"+empowerableAxis[i]+"AxisAmount\"></span>)<br>"+axisEffectHTML[empowerableAxis[i]+"Empowered"]+"</button>"
	}
	d.innerHTML("div_normalAxisContainer",out)
}
generateAxisTable()
function axisArray(type) {
  if (type=="normal") return [g.XAxis,g.YAxis,g.ZAxis,g.WAxis,g.VAxis,g.UAxis,g.TAxis,g.SAxis]
  if (type=="dark") return [g.darkXAxis,g.darkYAxis,g.darkZAxis,g.darkWAxis,g.darkVAxis,g.darkUAxis,g.darkTAxis,g.darkSAxis]
}
function axisScaling(type,tier,x) {
  let out
  if (type=="normal") {
    if (tier=="normal") {
      if (x=="start") {
        out = N(8)
      }
      if (x=="power") {
        out = N(1)
        if (AchievementE(502)) out = out.mul(0.95)
      }
    }
    if (tier=="super") {
      if (x=="start") {
        out = N(256)
      }
      if (x=="power") {
        out = N(1)
      }
    }
  }
  if (type=="dark") {
    if (tier=="normal") {
      if (x=="start") {
        out = N(8)
      }
      if (x=="power") {
        out = N(1)
        if (AchievementE(530)) out = out.mul(0.99)
        if (AchievementE(503)) out = out.mul(0.95)
      }
    }
    if (tier=="super") {
      if (x=="start") {
        out = N(256)
      }
      if (x=="power") {
        out = N(1)
      }
    }
  }
  return out
}
function realAxisCostDivisor(type) {
  let output = stat("axisCostDivisor")
  if (type=="X") output=output.mul(stardustBoost(5).pow(g.XAxis))
  if (type=="Y"&&AchievementE(312)) output=output.mul(stardustBoost(5).pow(g.YAxis.mul(0.04)))
  return output
}
function realAxisCostExponent(type) {
  let output = stat("axisCostExponent")
	if (type=="S"&&ResearchE("r3_5")) output = output.mul(researchEffect(3,5))
  return output
}
function realAxisScalePower(type,tier,letter) {
  let output=axisScaling(type,tier,"power")
  if ([type,tier,letter].toString()==["normal","super","S"].toString()) output=output.mul(5)
  if ([type,tier,letter].toString()==["dark","super","W"].toString()) output=output.mul(3)
  if ([type,tier,letter].toString()==["dark","normal","S"].toString()) output=output.mul(2)
  if ([type,tier,letter].toString()==["dark","super","S"].toString()) output=output.mul(5)
  return output
}
function axisCost(type,axis) {
  axis = (axis == undefined)?g[type+"Axis"]:N(axis)
  let cost = null
  let scale1start = axisScaling("normal","normal","start")
  let scale1power = realAxisScalePower("normal","normal",type)
  let scale2start = axisScaling("normal","super","start")
  let scale2power = realAxisScalePower("normal","super",type)
  axis = Decimal.semiexpScaling(axis,scale2start,scale2power)
  axis = Decimal.linearScaling(axis,scale1start,scale1power)
  if (type=="X") cost = N(6).pow(axis).mul(5)
  if (type=="Y") cost = N(1.5).pow(axis.simplex(2)).mul(100)
  if (type=="Z") cost = N(10).pow(axis.pow(1.379654224)).mul(1e6)
  if (type=="W") cost = N(10).pow(axis.simplex(2)).mul(5e7)
  if (type=="V") cost = N(10).pow(axis).mul(1e20)
  if (type=="U") cost = N(10).pow(axis.pow(1.5)).mul(1e100)
  if (type=="T") cost = N(1e10).pow(axis).mul(1e180)
  if (type=="S") cost = N("2^1024").pow(N(1.25).pow(axis))
  cost = cost.div(realAxisCostDivisor(type))
  cost = cost.pow(realAxisCostExponent(type))
  return cost
}
function maxAffordableAxis(type) {
	if (axisCost(type).gte(g.exoticmatter)) return g[type+"Axis"]
  let effective_EM = g.exoticmatter.root(realAxisCostExponent(type)).mul(realAxisCostDivisor(type))
  let axis       // prevent "lexical declaration cannot appear in single-statement context"
  if (type=="X") axis = effective_EM.lte(5)?N(-1):effective_EM.div(5).log(6)
  if (type=="Y") axis = effective_EM.lte(100)?N(-1):effective_EM.div(100).log(1.5).mul(2).add(0.25).sqrt().sub(0.5)
  if (type=="Z") axis = effective_EM.lte(1e6)?N(-1):effective_EM.log10().sub(6).pow(0.7248191884897692)
  if (type=="W") axis = effective_EM.lte(5e7)?N(-1):effective_EM.div(5e7).log10().mul(2).add(0.25).sqrt().sub(0.5)
  if (type=="V") axis = effective_EM.lte(1e20)?N(-1):effective_EM.log10().sub(20)
  if (type=="U") axis = effective_EM.lte(1e100)?N(-1):effective_EM.log10().sub(100).pow(2/3)
  if (type=="T") axis = effective_EM.lte(1e180)?N(-1):effective_EM.log10().sub(180).div(10)
  if (type=="S") axis = effective_EM.lte(c.inf)?N(-1):effective_EM.log(2).div(1024).log(1.25)
  axis = Decimal.linearSoftcap(axis,axisScaling("normal","normal","start"),realAxisScalePower("normal","normal",type))
  axis = Decimal.semilogSoftcap(axis,axisScaling("normal","super","start"),realAxisScalePower("normal","super",type))
  return axis.floor().add(1)
}
function buyAxis(x) {
  if ((g.exoticmatter.gte(axisCost(x)))&&(axisUnlocked()>axisCodes.indexOf(x))) {
    o.sub("exoticmatter",axisCost(x))
    o.add(x+"Axis",1)
  }
  for (let i=0;i<axisBuyAchievements.length;i++) addAchievement(axisBuyAchievements[i])
  if (g.SAxis.gt(0)) g.ach525possible=false
  if (axisCodes.map(x => g[x+"Axis"].eq(0)).includes(false)) g.ach526possible=false
}

function buyMaxAxis(caps) {
  let totalBefore = totalAxis("normal")
  for (let j=0; j<axisUnlocked(); j++) {
    let amount = caps[j]=="u"?maxAffordableAxis(axisCodes[j]):Decimal.min(maxAffordableAxis(axisCodes[j]),N(caps[j]))
    if (amount=="NA") continue
    if (amount.lte(g[axisCodes[j]+"Axis"])) continue
    if (axisCost(axisCodes[j],amount.sub(1)).lt(g.exoticmatter)) o.sub("exoticmatter",axisCost(axisCodes[j],amount.sub(1)))
    g[axisCodes[j]+"Axis"]=amount
  }
	g.exoticmatter=g.exoticmatter.max(0) // maxAffordableAxis() doesn't seem to work properly because people are getting negative EM.
  for (let i=0;i<axisBuyAchievements.length;i++) addAchievement(axisBuyAchievements[i])
  if (g.SAxis.gt(0)) g.ach525possible=false
  if (axisCodes.map(x => g[x+"Axis"].eq(0)).includes(false)) g.ach526possible=false
  if (totalAxis("normal").sub(totalBefore).gte(5000)) addAchievement(530)
}
var empoweredAxisBought = 0
function buyEmpoweredAxis() {
	empoweredAxisBought++
	for (let i=0;i<5;i++) if (empoweredAxisBought>=10**i) addAchievement("s"+(18+i))
}
function realAxis(x) {
  return g[x+"Axis"].add(stat("free"+x+"Axis"))
}
function axisSoftcapStart() {
	let out = N(1)
	return Decimal.convergentSoftcap(out,axisSoftcapLimit().mul(0.75),axisSoftcapLimit())
}
function axisSoftcapLimit() {
	let out = N(2)
	return out
}
function axisUnlocked() {
  return Math.min(1+g.XAxis.sign+g.YAxis.sign+g.ZAxis.sign+g.WAxis.sign+g.VAxis.sign+g.UAxis.sign+g.TAxis.sign+g.SAxis.sign,4+g.stardustUpgrades[0])
}
function totalAxis(type) {
  return axisArray(type).reduce((x,y) => x.add(y))
}
function deltaBaseMasteryPowerGain(time) {
  let out = stat("tickspeed")
  if (ResearchE("r6_5")) out = out.mul(researchEffect(6,5).mul(achievement.owned()).add(1))
  return out
}

function masteryRowsUnlocked(x) {
	if (x==1) return (g.XAxis.gt(0) || g.StardustResets>0 || g.WormholeResets>0)?1:0
	if (x==2) return (g.ZAxis.gt(0) || g.StardustResets>0 || g.WormholeResets>0)?1:0
	if (x==3) return (totalAxis("normal").gte(40) || g.StardustResets>0 || g.WormholeResets>0)?1:0
	if (x==4) return (g.exoticmatterThisSpacetimeReset.gte(stardustExoticMatterReq) || g.StardustResets>0 || g.WormholeResets>0)?2:totalAxis("normal").gte(50)?1:0
	if (x==5) return g.stardustUpgrades[3]>=2?1:0
	if (x==6) return g.stardustUpgrades[3]>=3?1:0
	if (x==7) return g.stardustUpgrades[3]>=4?1:0
	if ([8,9].includes(x)) return g.stardustUpgrades[3]>=5?1:0
	if (x==10) return AchievementE(524)?1:0
}
function MasteryE(x) {
  let row = Math.floor(x/10)
  return ((g.activeMasteries[row]==(x%10))||masteredRow(row))?1:0
}
function masteredRow(x) {
  if (g.activeMasteries[x]==0) return false
  if (x==1) return g.stardustUpgrades[3]>0
  if (x<=9) return StarE([51,52,53,54,101,102,103,104][x-2])
}
function toggleMastery(x) {
  let row = Math.floor(x/10)
  if (!(x==g.activeMasteries[row])) {
    if ((![0,x%10].includes(g.activeMasteries[row]))&&(!masteredRow(row))) {
      g.baseMasteryPowerGain=N(1)
      g.masteryPower=N(1)
    }
    g.activeMasteries[row]=x%10
  }
  g.ach524possible=g.ach524possible&&achievement.get(524).active()
}
function masteryEffect(x) {
  if (x==11) return g.masteryPower.add(1).pow(masteryBoost(11).mul(0.1))
  if (x==12) return g.masteryPower.add(1).pow(masteryBoost(12).mul(0.15))
  if (x==21) return g.masteryPower.add(1).dilate(0.6).pow(masteryBoost(21).mul(0.0175))
  if (x==22) return g.masteryPower.add(1).dilate(0.6).pow(masteryBoost(22).mul(0.035))
  if ([31,32].includes(x)) return g.masteryPower.add(1).log10().pow(0.5).mul(0.75).mul(masteryBoost(x))
  if ([41,43].includes(x)) return Decimal.logarithmicSoftcap(g.masteryPower.add(1).log10().div(15),1,2).mul(masteryBoost(x)).add(1)
  if (x==42) return g.masteryPower.add(1e4).dilate(0.5).div(100).pow(masteryBoost(42))
  if (x==51) return g.masteryPower.add(1).log10().pow(0.6).mul(2.5).mul(masteryBoost(51))
  if (x==52) return g.masteryPower.add(1).log10().pow(0.4).mul(2.5).mul(masteryBoost(51)).add(1)
  if (x==61) return Decimal.logarithmicSoftcap(g.masteryPower.add(10).log10().pow(0.1).sub(1),9,2).mul(masteryBoost(61)).add(1)
  if (x==62) return Decimal.logarithmicSoftcap(g.masteryPower.add(10).log10().pow(0.04),2,1).pow(masteryBoost(62).neg())
  if (x==63) return g.masteryPower.add(1).log10().pow(0.8).mul(masteryBoost(63))
  if (x==71) return g.masteryPower.pow(1.25).add(1e10).log10().log10().pow(masteryBoost(71))
  if (x==72) return Decimal.logarithmicSoftcap(g.masteryPower.pow(1.25).add(1e10).log10().log10().pow(0.5).sub(1),1,5).mul(masteryBoost(72)).add(1)
  if ([81,82,83,84].includes(x)) {
    let output = Decimal.product(g.masteryPower.add(1).log10().pow(0.5),[0.03,0.1,0.2,0.24][x-81],masteryBoost(x))
    if (x==81) output = output.mul(g.XAxis.pow(0.4))
    if (x==82) output = output.mul(g.exoticmatter.add(10).log10().log10())
    if (x==83) output = output.mul(g.darkmatter.add(10).log10().log10().pow(0.75))
    if (x==84) output = output.mul(g.stardust.add(10).log10().log10().pow(0.5))
    return Decimal.logarithmicSoftcap(output,100,1).pow10()
  }
  if (x==85) return Decimal.product(g.masteryPower.add(10).log10().log10(),masteryBoost(85),0.2
	)
  if (x==91) return g.masteryPower.add(10).log10().log10().mul(0.1).mul(Decimal.mul(0.3,g.truetimeThisStardustReset.add(10).log10())).mul(masteryBoost(91)).add(1)
  if (x==92) return g.masteryPower.add(10).log10().log10().mul(0.1).div(Decimal.mul(0.3,g.truetimeThisStardustReset.add(10).log10())).mul(masteryBoost(92)).add(1)
  if (x==101) return Decimal.logarithmicSoftcap(g.masteryPower.add(1).log10().add(1).pow(masteryBoost(101).div(2)),75,2)
  if (x==102) return g.masteryPower.add(1).dilate(2/3).pow(masteryBoost(102).mul(0.0175))
  if (x==103) return g.masteryPower.add(10).dilate(0.2).sub(9)
}
function masteryBoost(x) {
  let row = Math.floor(x/10)
  let b=N(1)
  if (row==1&&AchievementE(105)) b = b.mul(achievement.get(105).effect().div(100).add(1))
  if ([11,21,31].includes(x)&&MasteryE(41)) b = b.mul(masteryEffect(41))
  if ([12,22,32].includes(x)&&MasteryE(43)) b = b.mul(masteryEffect(43))
	if (row==4&&AchievementE(201)) b = b.mul(achievement.get(201).effect().div(100).add(1))
  if (row==1&&MasteryE(52)) b = b.mul(masteryEffect(52))
  if (row==8&&MasteryE(91)) b = b.mul(masteryEffect(91))
  if (row==8&&MasteryE(92)) b = b.mul(masteryEffect(92))
	if (x==52&&AchievementE(310)) b = b.mul(1.01)
	if (row==10) b = b.mul(stardustBoost(11).div(100).add(1))
  if (AchievementE(516)&&row>=2&&row<=9) if (StarE([51,52,53,54,101,102,103,104][row-2])) b = b.mul(1.01)
  b = b.mul(knowledgeEffect().div(100).add(1))
	if (achievement.ownedInTier(5)>=27&&row==10) b = b.mul(wormholeMilestone27Effect().div(100).add(1))
  if ((x==11)&&ResearchE("r4_6")) b = b.mul(researchEffect(4,6))
  if ((x==12)&&ResearchE("r4_10")) b = b.mul(researchEffect(4,10))
  if (row==2&&ResearchE("r5_14")) b = b.mul(energyEffect(3).pow(researchEffect(5,13)))
  if (ResearchE("r6_11")) {
    let row = Math.floor(x/10)
    let mult = 1
    for (let i=1;i<5;i++) mult+=Number(StarE(row*10+i)?researchEffect(6,11).div(100):0)
    b = b.mul(mult)
  }
  return b.fix(0)
}
function masteryText(x) {
  if (x==11) return "Multiply exotic matter gain by "+masteryEffect(11).format(2)
  if (x==12) return "All "+(unlocked("Dark Matter")?"normal axis":"axis")+" are "+masteryEffect(12).format(2)+"× cheaper"
  if ([21,22].includes(x)) return "Multiply the "+["X","Y"][x-21]+" axis effect by "+masteryEffect(x).format(2)
  if (x==31) return "Gain "+masteryEffect(31).format(2)+" free Z axis that do not increase the cost"
  if (x==32) return "Gain "+masteryEffect(32).format(2)+" free W axis that do not increase the cost"
  if (x==41) return "Increase the effect of masteries 11, 21 and 31 by "+masteryEffect(41).sub(1).mul(100).format(2)+"%"
  if (x==42) return "Multiply stardust gain by "+masteryEffect(42).format(2)
  if (x==43) return "Increase the effect of masteries 12, 22 and 32 by "+masteryEffect(43).sub(1).mul(100).format(2)+"%"
  if (x==51) return "Gain "+masteryEffect(51).format(2)+" free X axis"
  if (x==52) return "Raise the effects of the first row Masteries to the power of "+masteryEffect(52).format(3)
  if (x==61) return "Dark X axis are "+masteryEffect(61).sub(1).mul(100).format(2)+"% stronger"
  if (x==62) return "Dark axis costs are raised to the power of "+masteryEffect(62).format(4)
  if (x==63) return "Subtract "+masteryEffect(63).format(2)+" from the dark star cost"
  if (x==71) return "Multiply energy gain by "+masteryEffect(71).format(2)
  if (x==72) return "Energy effects are "+masteryEffect(72).sub(1).mul(100).format(2)+"% stronger"
  if ([81,82,83,84].includes(x)) return "Multiply mastery power gain by "+masteryEffect(x).format(2)+" (based on "+["X axis","exotic matter","dark matter","stardust"][x-81]+")"
  if (x==85) return "Add "+masteryEffect(85).format(2)+" to the base mastery power gain exponent<br><span class=\"small\">(currently a "+g.baseMasteryPowerGain.pow(masteryEffect(85)).format(2)+"× multiplier)</span>"
  if ([91,92].includes(x)) return "Row 8 masteries are "+masteryEffect(x).sub(1).mul(100).format(2)+"% stronger ("+["in","de"][x-91]+"creases over time)"
  if (x==101) return "The \"Wormhole to Somewhere\" achievement reward is raised to the power of "+masteryEffect(101).format(2)
  if (x==102) return "Multiply Hawking radiation gain by "+masteryEffect(102).format(2)
  if (x==103) return "Multiply knowledge gain by "+masteryEffect(103).format(2)
}
function fullMasteryText(x) {
  return "<div style=\"position:absolute;top:5px;left:7px;color:rgba(0,0,0,0.4)\">"+x+"</div>"+(masteryBoost(x).eq(1)?"":("<div style=\"position:absolute;top:5px;right:7px;color:rgba(0,0,0,0.4)\">"+masteryBoost(x).mul(100).format(2)+"%</div>"))+"<div style=\"position:absolute;top:5px;left:7px;width:211px;color:rgba(0,0,0,0.4)\">"+(MasteryE(x)?"Active":"Inactive")+"</div>"+masteryText(x)
}
function masteryReset() {
  g.masteryPower=N(0)
  g.baseMasteryPowerGain=N(1)
}
var shownMasteries = []
var updateMasteryHTML = true
function masteryHTML() {
  updateMasteryHTML = false
  let out = "<table>"
  shownMasteries = []
  for (let i=1;i<=totalMasteryRows;i++) {
    if (!masteryRowsUnlocked(i)) continue
    let masteriesInRow = masteryCodes.filter(x => Math.floor(x/10)==i)
		let visibleMasteriesInRow = []
		for (let j=0;j<masteriesInRow.length;j++) if (masteryRowsUnlocked(i)>=masterySubGroup(masteriesInRow[j])) visibleMasteriesInRow.push(masteriesInRow[j])
    shownMasteries.push(visibleMasteriesInRow)
    out+="<tr><td style=\"width:240px\"><h3 style=\"color:#ff0099\">Row "+i+"</h3><button style=\"height:18px;width:150px;border-radius:9px\" onClick=\"g.activeMasteries["+i+"]=0;masteryReset()\">Unassign Mastery</button></td><td style=\"width:calc(99vw - 240px)\">"
    for (let j=0;j<visibleMasteriesInRow.length;j++) out+="<button style=\"position:relative;margin:6px\" class=\""+(MasteryE(visibleMasteriesInRow[j])?"masterybuttonon":"masterybuttonoff")+"\" id=\"masteryButton"+visibleMasteriesInRow[j]+"\" onClick=\"toggleMastery("+visibleMasteriesInRow[j]+")\">"+fullMasteryText(visibleMasteriesInRow[j])+"</button>"
    out+="<td></tr>"
  }
  shownMasteries=shownMasteries.flat()
  d.innerHTML("masteryContainer",out)
  updateMasteryHTML = true
}
function SSBsmall(x,y,hyper) {
  let symbol=(hyper==2)?" × ":(hyper==3)?" ^ ":" ? "
  return " <span class='small'>("+x+" "+symbol+" "+y+")</span>"
}
function stardustExoticMatterReqText() {
  if (stat("pendingstardust").eq(0)||g.exoticmatter.lt(stardustExoticMatterReq)) return "(Need "+BEformat(g.stardust.floor().add(1).root(stat("stardustExponent")).div(stat("stardustMultiplier")).dilate(2).max(10).mul(stardustExoticMatterReq.div(10)))+" exotic matter)"
  else if (stat("pendingstardust").add(g.stardust).lt(1000)) return "(Next at "+BEformat(Decimal.sum(stat("pendingstardust"),g.stardust.floor(),1).floor().root(stat("stardustExponent")).div(stat("stardustMultiplier")).dilate(2).mul(stardustExoticMatterReq.div(10)))+" exotic matter)"
  return ""
}
function stardustReset(x) {
  if ((stat("pendingstardust").gt(0))||(x=="force")) {
		g.last10StardustRuns = [{gain:stat("pendingstardust"),realtime:g.timeThisStardustReset,gametime:g.truetimeThisStardustReset}].concat(g.last10StardustRuns)
		if (g.last10StardustRuns.length>10) g.last10StardustRuns.splice(0,1)
    addAchievement(201)
    addAchievement(511)
    o.add("stardust",stat("pendingstardust"))
    g.fastestStardustReset=Decimal.min(g.fastestStardustReset,g.timeThisStardustReset)
    g.exoticmatter=N(0)
    for (let i=0;i<8;i++) {
      let axis_retention = (g.stardustUpgrades[1]>=i+2)?0.1:0
      axis_retention += studies[1].reward(2)/100
      axis_retention = Decimal.convergentSoftcap(axis_retention,0.75,1)
      g[axisCodes[i]+"Axis"]=Decimal.mul(g[axisCodes[i]+"Axis"],axis_retention).floor()
    }
    g.masteryPower=N(1)
    g.baseMasteryPowerGain=N(1)
    g.exoticmatterThisStardustReset=N(0)
    g.timeThisStardustReset=0
    g.truetimeThisStardustReset=N(0)
    g.darkEnergy=N(1)
    g.stelliferousEnergy=N(1)
    g.gravitationalEnergy=N(1)
    g.spatialEnergy=N(1)
    g.neuralEnergy=N(1)
    g.metaEnergy=N(1)
  }
  g.StardustResets++
	addAchievement("s01")
}
function stardustBoostBoost(x) {
	let out = N(1)
	if (x==1) out=out.mul(AchievementE(507)?achievement.get(507).effect().div(100).add(1):1)
	if (x==4) out=out.mul(AchievementE(508)?achievement.get(508).effect().div(100).add(1):1)
	if (x==7) out=out.mul(AchievementE(509)?achievement.get(509).effect().div(100).add(1):1)
	if (x==7) out=out.mul(ResearchE("r5_14")?Decimal.pow(energyEffect(4),researchEffect(5,14)):1)
	return out
}
function stardustBoost(x) {
  if ((g.stardustUpgrades[2]<(x-2))||!unlocked("Stardust")) return N([1,1,1,0,1,1,1,1,1,0,0,0][x-1])
  if (x==1) return Decimal.convergentSoftcap(Decimal.mul(g.stardust.div(10).add(1).pow(0.5),Decimal.convergentSoftcap(g.stardust.add(1).dilate(1.5).pow(0.1),"ee9","ee12",2)).pow(stardustBoostBoost(1)),"ee12","ee15",2)
  if (x==2) return Decimal.product(g.stardust.add(1).log10(),0.075,stardustBoostBoost(2)).add(1)
  if (x==3) return Decimal.linearSoftcap(g.stardust.div(1e7).add(1).log10().pow(0.7).div(2).mul(stardustBoostBoost(3)),10,1).add(1)
  if (x==4) return g.stardust.pow(0.05).add(10).log10().root(3).sub(1).mul(stardustBoostBoost(4))
  if (x==5) return Decimal.linearSoftcap(g.stardust.mul(1e24).add(1e64).log10().root(1.5).sub(16).pow10(),c.inf,1).pow(stardustBoostBoost(5))
  if (x==6) return g.stardust.pow(0.15).add(1e10).log10().log10().sub(1).mul(stardustBoostBoost(6)).add(1)
  if (x==7) return g.stardust.add(10).log10().pow(stardustBoostBoost(7).div(100))
  if (x==8) return g.stardust.add(1e100).log10().log10().div(2).pow(stardustBoostBoost(8).mul(5))
	if (x==9) return g.stardust.pow(0.01).log10().pow(stardustBoostBoost(9).mul(0.4))
	if (x==10) return Decimal.convergentSoftcap(g.stardust.pow(1e-3).add(10).log10().log10().mul(stardustBoostBoost(10)).div(10),0.5,1)
	if (x==11) return Decimal.convergentSoftcap(g.stardust.pow(1e-4).add(10).log10().log10().mul(stardustBoostBoost(11)).mul(10),150,200)
  if (x==12) return Decimal.convergentSoftcap(Decimal.product(g.stardust.pow(1e-5).add(10).log10().log10(),0.01,stardustBoostBoost(9)),0,0.1)
}
function buyStardustUpgrade(x) {
  if (g.stardust.gt(stardustUpgradeCost(x))) {
    o.sub("stardust",stardustUpgradeCost(x))
    g.stardustUpgrades[x-1]++
  }
  for (let i=0;i<stardustUpgradeAchievements.length;i++) addAchievement(stardustUpgradeAchievements[i])
}
const autobuyers = {
  axis:{baseInterval:5,baseCost:"1e25",costGrowth:1.05,resource:"exoticmatter",unlockReq:function(){return g.stardustUpgrades[1]>0}},
  darkAxis:{baseInterval:5,baseCost:"1e25",costGrowth:1.05,resource:"darkmatter",unlockReq:function(){return achievement.ownedInTier(5)>=1}},
  stardustUpgrade:{baseInterval:30,baseCost:"1e100",costGrowth:1.1,resource:"stelliferousEnergy",unlockReq:function(){return achievement.ownedInTier(5)>=3}},
  star:{baseInterval:15,baseCost:"1e25",costGrowth:1.08,resource:"stardust",unlockReq:function(){return achievement.ownedInTier(5)>=4}}
}
const autobuyerMeta = {
  cost:function(id){return Decimal.powerTower(autobuyers[id].baseCost,autobuyers[id].costGrowth,g[id+"AutobuyerUpgrades"])},
  interval:function(id){return Math.max(0.1,autobuyers[id].baseInterval*0.95**g[id+"AutobuyerUpgrades"])},
  cap:function(id){return Math.ceil(Math.log(0.1/autobuyers[id].baseInterval)/Math.log(0.95))}
}
function upgradeAutobuyer(id) {
  while ((g[autobuyers[id].resource].gt(autobuyerMeta.cost(id))) && (g[id+"AutobuyerUpgrades"]<autobuyerMeta.cap(id))) {
    o.sub(autobuyers[id].resource,autobuyerMeta.cost(id))
    g[id+"AutobuyerUpgrades"]++
  }
}
function starCost(x) {
  x = N((x==undefined)?g.stars:x)
  if (ResearchE("r8_14")) x = x.sub(researchEffect(8,14))
  x = x.max(0)
  let formula_exponent = N((StudyE(2))?[3,4,5,6,7][g.studyCompletions[2]]:2)
  let scaling_power = N(2.5)
  scaling_power = scaling_power.mul(N(1).sub(studies[2].reward(1).div(100)))
  if (ResearchE("r7_8")) scaling_power = scaling_power.mul(researchEffect(7,8))
  let cost = Decimal.pow(2,Decimal.exponentialScaling(Decimal.superexpScaling(x,25,scaling_power),10,0.5).pow(formula_exponent).add(10)).pow(x>=10?1.5:1)
  if (achievement.ownedInTier(5) >= 9) cost = N(cost).dilate(wormholeMilestone9Effect())
  if (ResearchE("r6_2")) cost = cost.root(energyEffect(1).pow(researchEffect(6,2)))
  if (ResearchE("r7_11")) cost = cost.pow(researchEffect(7,11).pow(g.darkstars))
	if (AchievementE(519)) cost = cost.div(2**g.stardustUpgrades.reduce((x,y)=>x+y))
  return cost
}
function buyStar() {
  if (g.stardust.gt(starCost())) {
    o.sub("stardust",starCost())
    g.stars++
  }
  starHTML()
  addAchievement(401)
  addAchievement(519)
  addAchievement(528)
  if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false
}
function buyStarUpgrade(x) {
  if ((unspentStars() > 0) && availableStarRow(Math.floor(x/10)) && !(g.ownedStars.includes(x))) {
    g.ownedStars.push(x)
    g.ach519possible = false
  }
  starHTML()
  if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false
  addAchievement(412)
}
function respecStars() {
  stardustReset("force")
  g.ownedStars=[]
  starHTML()
}
function maxFullStarRows() {
	for (let i=1;i<11;i++) if (maxStars(i)==4) for (let j=1;j<5;j++) buyStarUpgrade(i*10+j)
	starHTML()
}
function starEffect(x) {
  if ([11,12,13,14].includes(x)) {
    let exp = null
    if (x==11) exp = Decimal.sub(1,g.exoticmatter.add(1).mul(1e10).log10().log10().pow(-1))
    if (x==12) exp = g.exoticmatter.add(1).mul(1e10).log10().log10().pow(-1)
    if (x==13) exp = Decimal.sub(1,g.truetimeThisStardustReset.div(1000).add(1).pow(-1))
    if (x==14) exp = g.truetimeThisStardustReset.div(1000).add(1).pow(-1)
    if (StarE(x+20)) exp = exp.mul(3)
    if (StarE(x+80)) exp = exp.mul(starEffect(90))
    exp = exp.mul(achievement.ownedInTier(2)/100+1)
    return Decimal.pow(1000,exp)
  }
  if (x==60) return Decimal.logarithmicSoftcap(g.exoticmatter.pow(0.02).add(10).log10().pow(0.7),1000,0.5)
	if (x==64) return Decimal.convergentSoftcap(g.exoticmatter.add(10).log10().pow(0.1),1,3)
  if ([71,72,73,74].includes(x)) {
    let ef
    if (x==71) ef = g.masteryPower.pow(10**-0.5).add(10).log10().log10().mul(22.5)
    if (x==72) ef = g.exoticmatter.fix(0).add(10).log10().log10().pow(2).mul(1.5)
    if (x==73) ef = g.stardust.add(10).log10().log10().mul(8)
    if (x==74) ef = g.truetimeThisStardustReset.add(1).log10().mul(7.5)
    if (ResearchE("r6_10")) ef=ef.mul(researchEffect(6,10).div(100).add(1))
    return Decimal.convergentSoftcap(ef,75,100)
  }
  if (x==90) return g.exoticmatter.add(1).log10().pow(0.75).div(100).add(1).pow(studies[2].reward(2))
}
function starText(x) {
	let out = "<div style=\"position:absolute;top:3px;left:0px;width:120px;text-align:center;color:rgba(0,0,0,0.4)\">"+x+"</div><div style=\"position:absolute;bottom:3px;left:0px;width:120px;text-align:center;color:rgba(0,0,0,0.4)\">"+(StarE(x)?"Active":"Inactive")+"</div>"
  if ([11,12,13,14].includes(x)) out += "Exotic matter gain is multiplied by "+starEffect(x).format(2)+" ("+["de","in"][x%2]+"creases with "+(x>12?"time in this stardust reset":"exotic matter")+")"
  if ([21,22,23,24].includes(x)) out += "Gain 3 free "+axisCodes[x-21]+" axis"
  if ([31,32,33,34].includes(x)) out += "Cube the effect of star "+(x-20)+" (two above this)"
	if (x==41) out += "Exotic matter gain is raised to the power of 1.05"
	if (x==42) out += "Exotic matter gain is multiplied by "+BEformat(1e18)
	if (x==43) out += "Stardust gain is raised to the power of 1.05"
  if (x==44) out += "Stardust gain is multiplied by 100"
  if ([51,52,53,54].includes(x)) out += "You can activate all "+["second","third","fourth","fifth"][x-51]+" row Masteries"
  if ([61,62,63].includes(x)) out += "Gain "+starEffect(60).format(2)+" free "+axisCodes[x-57]+" axis (based on exotic matter)"
  if (x==64) out += "Gain "+starEffect(64).format(3)+" free S axis (based on exotic matter)"
  if ([71,72,73,74].includes(x)) out += "The game runs "+starEffect(x).format(2)+"% faster (based on "+["mastery power","exotic matter","stardust","time in this stardust reset"][x-71]+")"
  if ([81,83].includes(x)) out += (x==83?"Dark":"Normal")+" axis costs are raised to the power of 0.8"
  if ([82,84].includes(x)) out += (x==84?"Dark Y":"Normal V")+" axis is 4 times stronger"
  if ([91,92,93,94].includes(x)) out += "The effect of star "+(x-80)+" is raised to the power of "+starEffect(90).format(2)+" (based on exotic matter)"
  if ([101,102,103,104].includes(x)) out += "You can activate all "+["sixth","seventh","eighth","ninth"][x-101]+" row Masteries"
	return out
}
const dynamicStars = [11,12,13,14,61,62,63,64,71,72,73,74,91,92,93,94]
var starRowsShown = []
var updateStarHTML = true
function starHTML() {
  updateStarHTML = false
  let out = "<table>"
  let rows = []
  for (let i=1;i<Math.min(g.stars+1,40);i++) if (!rows.includes(starRow(i))) rows.push(starRow(i))
  starRowsShown = Array.from(new Set(Array(40).fill(0).map((x,index) => starRow(index+1)))).slice(0,rows.length+1).sort(function(a,b){return a-b})
  for (let i=0;i<starRowsShown.length;i++) {
    out+="<tr><td style=\"width:240px;color:#ffffff;font-size:10px\"><span style=\"font-weight:900\">Row "+starRowsShown[i]+"</span><br>"+(maxStars(starRowsShown[i])-[1,2,3,4].map(x => StarE(starRowsShown[i]*10+x)?1:0).reduce((x,y)=>x+y))+" available</td>"
    for (let j=1;j<5;j++) {
      let style = StarE(starRowsShown[i]*10+j)?("ownedstarbutton"+starRowsShown[i]):availableStarRow(starRowsShown[i])?"availablestarbutton":"lockedstarbutton"
      out+="<td><button class=\"starbutton "+style+"\" id=\"starButton"+(starRowsShown[i]*10+j)+"\" onClick=\"buyStarUpgrade("+(starRowsShown[i]*10+j)+")\">"+starText(starRowsShown[i]*10+j)+"</button></td>"
    }
    out+="</tr>"
  }
  out+="</table>"
  d.innerHTML("starContainer",out)
  updateStarHTML = true
}
function StarE(x) {
  return g.ownedStars.includes(x)
}
function unspentStars() {
  return g.stars-g.ownedStars.length
}
function starRow(index) {
  if (!StudyE(2)) return [1,1,2,1,2,3,1,2,3,4,2,3,4,5,3,4,5,6,4,5,6,7,5,6,7,8,6,7,8,9,7,8,9,10,8,9,10,9,10,10][index-1]
	if (g.studyCompletions[2]==0) return [1,1,2,1,1,2,3,2,2,3,4,3,3,4,5,4,4,5,6,5,5,6,7,6,6,7,8,7,7,8,9,8,8,9,10,9,9,10,10,10][index-1]
	if (g.studyCompletions[2]==1) return [1,1,1,2,1,2,2,3,2,3,3,4,3,4,4,5,4,5,5,6,5,6,6,7,6,7,7,8,7,8,8,9,8,9,9,10,9,10,10,10][index-1]
	if (g.studyCompletions[2]==2) return Math.floor(index/4+0.75)
  return [3,3,9,3,9,2,3,9,2,4,9,2,4,5,2,4,5,6,4,5,6,7,5,6,7,8,6,7,8,1,7,8,1,10,8,1,10,1,10,10][index-1]
}
function maxStars(row) {
  let output=0
  for (let i=0;i<Math.min(g.stars,40);i++) if (starRow(i+1)==row) output++
  return output
}
function availableStarRow(row) {
  return (maxStars(row)>(StarE(row*10+1)+StarE(row*10+2)+StarE(row*10+3)+StarE(row*10+4)))
}
const empowerableDarkAxis = []
function generateDarkAxisTable() {
	let out = ""
	for (let i=0;i<8;i++) {
		out+="<button class=\"lockedaxisbutton\" onClick=\"buyDarkAxis('"+axisCodes[i]+"')\" id=\"button_dark"+axisCodes[i]+"Axis\">Dark "+axisCodes[i]+" Axis (<span id=\"span_dark"+axisCodes[i]+"AxisAmount\"></span>)<br>"+axisEffectHTML["dark"+axisCodes[i]].replace("{e}","<span id=\"span_dark"+axisCodes[i]+"AxisEffect\"></span>")+"<br>Cost: <span id=\"span_dark"+axisCodes[i]+"AxisCost\"></span><div style=\"position:absolute;top:5px;right:7px;color:rgba(0,0,0,0.5);font-size:7px\">Dark star boost: <span id=\"span_darkStarEffect2"+axisCodes[i]+"\"></span></div></button>"
	}
	for (let i=0;i<empowerableDarkAxis.length;i++) {
		out+="<button class=\"empoweredaxis\" id=\"button_empoweredDark"+empowerableAxis[i]+"Axis\" onClick=\"buyEmpoweredAxis()\" style=\"display:none\">Empowered Dark "+empowerableAxis[i]+" Axis (<span id=\"span_empoweredDark"+empowerableAxis[i]+"AxisAmount\"></span>)<br>"+axisEffectHTML["dark"+empowerableAxis[i]+"Empowered"]+"</button>"
	}
	d.innerHTML("div_darkAxisContainer",out)
}
generateDarkAxisTable()
generateAxisTable()
function buyDarkAxis(x) {
  if (g.darkmatter.gt(darkAxisCost(x))) {
    o.sub("darkmatter",darkAxisCost(x))
    o.add("dark"+x+"Axis",1)
  }
  if (g.darkSAxis.gt(0)) g.ach525possible=false
  if (axisCodes.map(x => g[x+"Axis"].eq(0)).includes(false)) g.ach526possible=false
  for (let i=0;i<axisBuyAchievements.length;i++) addAchievement(axisBuyAchievements[i])
}
function buyMaxDarkAxis(caps) {
  for (let j=0; j<8; j++) {
    let amount = caps[j]=="u"?maxAffordableDarkAxis(axisCodes[j]):Decimal.min(maxAffordableDarkAxis(axisCodes[j]),N(caps[j]))
    if (amount=="NA") continue
    if (amount.lte(g["dark"+axisCodes[j]+"Axis"])) continue
    if (darkAxisCost(axisCodes[j],amount.sub(1)).lt(g.darkmatter)) o.sub("darkmatter",darkAxisCost(axisCodes[j],amount.sub(1)))
    g["dark"+axisCodes[j]+"Axis"]=amount
  }
  for (let i=0;i<axisBuyAchievements.length;i++) addAchievement(axisBuyAchievements[i])
}
function darkStarEffect3(x) {
	x=(x==undefined)?realDarkStars():N(x)
	if (x.lte(100)) return x
	return Decimal.convergentSoftcap(x.div(10).sub(9).ln().mul(10).add(100),150,200)
}
function darkMatterFreeAxis(x) {     // Input 1 signifies the base ratio. Input of an axis code signifies the gain from that dark axis.
  let m=N(0.33)
  m=m.mul(1+achievement.ownedInTier(3)/100)
  m=m.mul(darkStarEffect3().div(100).add(1))
  if (x!==1) m=m.mul(g["dark"+x+"Axis"])
  return m
}
function darkAxisBoostedNextStar() {
	let v1 = realDarkStars()
	let v2 = realDarkStars(maxAffordableDarkStars().max(g.darkstars.add(1)))
	let out = []
	for (let i=0;i<8;i++) if (Decimal.neq(darkStarEffect2Level(axisCodes[i],v1),darkStarEffect2Level(axisCodes[i],v2))) out.push(axisCodes[i])
	return out
}
function darkStarEffectHTML() {
	let v1 = realDarkStars()
	let v2 = realDarkStars(maxAffordableDarkStars().max(g.darkstars.add(1)))
	return `The base gain of dark matter will become `+v1.mul(5).format(0)+` → `+v2.mul(5).format(0)+`% stronger
	   <br>`+(darkAxisBoostedNextStar().length==8?"All dark":("Dark "+Array.joinWithAnd(darkAxisBoostedNextStar())))+` axis will become stronger
		 <br>You will gain `+darkStarEffect3(v1).format(v1.gt(100)?4:0)+` → `+darkStarEffect3(v2).format(v2.gt(100)?4:0)+`% more free axis from dark matter`
}
function darkAxisCost(type,axis) {
  if (axis == undefined) axis = g["dark"+type+"Axis"]
  let cost = null
  let scale1start = axisScaling("dark","normal","start")
  let scale1power = realAxisScalePower("dark","normal",type)
  let scale2start = axisScaling("dark","super","start")
  let scale2power = realAxisScalePower("dark","super",type)
  axis = Decimal.semiexpScaling(axis,scale2start,scale2power)
  axis = Decimal.linearScaling(axis,scale1start,scale1power)
  if (type=="X") cost = axis.pow(1.2).add(1).pow10()
  if (type=="Y") cost = Decimal.pow(100,axis.add(1))
  if (type=="Z") cost = N(10).pow(axis).mul(1e10)
  if (type=="W") cost = axis.pow(1.5).add(15).pow10()
  if (type=="V") cost = axis.pow(1.25).add(30).pow10()
  if (type=="U") cost = axis.pow(2).add(45).pow10()
  if (type=="T") cost = N(1e4).pow(axis).mul(1e100)
  if (type=="S") cost = Decimal.powerTower("2^1024",1.2,axis)
  cost=cost.div(realDarkAxisCostDivisor(type))
  cost=cost.pow(realDarkAxisCostExponent(type))
  return cost
}
function realDarkAxisCostDivisor(type) {
  let output = stat("darkAxisCostDivisor")
  return output
}
function realDarkAxisCostExponent(type) {
  let output = stat("darkAxisCostExponent")
	if (type=="S"&&ResearchE("r3_11")) output = output.mul(researchEffect(3,11))
  return output
}
function maxAffordableDarkAxis(type) {
  if (darkAxisCost(type).gte(g.darkmatter)) return g["dark"+type+"Axis"]
  let effective_DM = g.darkmatter.root(realDarkAxisCostExponent(type)).mul(realDarkAxisCostDivisor(type))
  let axis       // prevent "lexical declaration cannot appear in single-statement context"
  if (type=="X") axis = effective_DM.lte(10)?N(-1):effective_DM.log10().sub(1).pow(5/6)
  if (type=="Y") axis = effective_DM.lte(100)?N(-1):effective_DM.log10().div(2).sub(1)
  if (type=="Z") axis = effective_DM.lte(1e10)?N(-1):effective_DM.log10().sub(10)
  if (type=="W") axis = effective_DM.lte(1e15)?N(-1):effective_DM.log10().sub(15).pow(2/3)
  if (type=="V") axis = effective_DM.lte(1e30)?N(-1):effective_DM.log10().sub(30).pow(0.8)
  if (type=="U") axis = effective_DM.lte(1e45)?N(-1):effective_DM.log10().sub(45).pow(0.5)
  if (type=="T") axis = effective_DM.lte(1e100)?N(-1):effective_DM.log10().sub(100).div(4)
  if (type=="S") axis = effective_DM.lte(c.inf)?N(-1):effective_DM.log(2).div(1024).log(1.2)
  axis = Decimal.linearSoftcap(axis,axisScaling("dark","normal","start"),realAxisScalePower("dark","normal",type))
  axis = Decimal.semilogSoftcap(axis,axisScaling("dark","super","start"),realAxisScalePower("dark","super",type))
  return axis.floor().add(1)
}
function darkStarScaling(x) {
	let out
  if (x=="start") {
    out = N(48)
    if (AchievementE(527)) out = out.add(4)
  }
  if (x=="power") {
    out = N(1)
  }
	return out
}
function darkStarPriceMod(type) {
  let output
  if (type=="sub") {
    output=N(0)
    if (MasteryE(63)) output=output.add(masteryEffect(63))
  }
  if (type=="div") {
    output=stardustBoost(9)
    if (AchievementE(512)) output=output.div(0.9975**g.stars)
    if (ResearchE("r6_3")) output=output.mul(energyEffect(2).pow(researchEffect(6,3)))
  }
  return output
}
function darkStarReq(x) {
  x=(x==undefined)?g.darkstars:N(x)
  if (x.gt(darkStarScaling("start"))) {
    let scalestart=darkStarScaling("start")
    let scalepower=darkStarScaling("power")
    x=x.sub(scalestart).mul(scalepower.add(1)).add(scalestart)
    x=Decimal.exponentialScaling(x,scalestart,scalepower)
  }
  let c=Decimal.sum(36,x.mul(5.5),x.pow(2).div(8))
  return c.div(darkStarPriceMod("div")).sub(darkStarPriceMod("sub")).ceil().max(0)
}
function realDarkStars(x) {
  x=(x==undefined)?g.darkstars:N(x)
  if (StudyE(2)) x=x.add(unspentStars())
  if (!StudyE(2)) x=x.add(studies[2].reward(3).mul(g.stars+unspentStars()).div(2))
  return x
}
function darkStarEffect2Level(axis,x) {
  x=(x==undefined)?realDarkStars():N(x)
  let cycles = x.div(8).floor()
  let over = x.sub(axisCodes.indexOf(axis)).sub(cycles.mul(8)).max(0).min(1)
  let out = Decimal.add(cycles,over)
	if (axis=="W") return Decimal.linearSoftcap(out,10,3)
	if (axis=="S") return Decimal.logarithmicSoftcap(out,10,9)
	return Decimal.linearSoftcap(out,40,1)
}
function maxAffordableDarkStars(x) {
  x=(x==undefined)?totalAxis("dark"):N(x)
  let effective_dark_axis = x.add(darkStarPriceMod("sub")).mul(darkStarPriceMod("div"))
  let out = (effective_dark_axis.lt(24))?N(-1):effective_dark_axis.mul(2).add(49).sqrt().mul(2).sub(22)
  if (out.gt(darkStarScaling("start"))) {
    let scalestart=darkStarScaling("start")
    let scalepower=darkStarScaling("power")
    out=Decimal.logarithmicSoftcap(out,scalestart,scalepower)
    out=out.sub(scalestart).div(scalepower.add(1)).add(scalestart)
  }
  return out.floor().add(1)
}
function gainDarkStar(cap) {
  let gain = (cap=="u")?maxAffordableDarkStars():maxAffordableDarkStars().min(N(cap))
	if (gain.lte(g.darkstars)) return
  if (gain.sub(g.darkstars).gte(20)) addAchievement(513)
  if (gain.sub(g.darkstars).gte(35)) addAchievement(514)
  if (gain.sub(g.darkstars).gte(50)) addAchievement(515)
	g.darkstars=gain
  if (achievement.ownedInTier(5)<7) {
		stardustReset("force")
    g.darkmatter=N(0)
    for (let i=0;i<8;i++) g["dark"+axisCodes[i]+"Axis"]=N(0)
  }
  if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false
  addAchievement(528)
}
function energyTypesUnlocked() {
  return Math.max(0,Math.min(6,g.stardustUpgrades[4]-1))
}
function energyEffect(x) {
  if (x+1>energyTypesUnlocked()) return N(1)
  let type=eval("g."+["dark","stelliferous","gravitational","spatial","neural","meta"][x]+"Energy")
  let resource=[g.exoticmatter,g.stardust,g.darkmatter,g.XAxis,g.masteryPower,N(10)][x]
  let softcap=N([0.25,0.25,0.25,4,0.25,c.inf][x])
  let inc=N([0.1,0.1,0.1,0.5,0.1,0.25][x])
  let eff=((type.gt(resource))&&(resource.gt(1))) ? type.log(resource).log10().mul(stat("energyEffectBoost")).mul(inc).add(1) : N(1)
  if (eff.gt(softcap.add(1))) eff=softcap.mul(eff.sub(1).div(softcap).ln().div(10).add(1)).add(1)
  return eff
}
function energyPerSec(x) {
  let resource = [g.exoticmatter,g.stardust,g.darkmatter,g.XAxis,g.masteryPower,Decimal.product(g.darkEnergy.add(10).log10(),g.stelliferousEnergy.add(10).log10(),g.gravitationalEnergy.add(10).log10(),g.spatialEnergy.add(10).log10(),g.neuralEnergy.add(10).log10(),g.metaEnergy.add(10).log10()).pow(0.1)][x]
  let divisor = [200,350,500,350,200,50][x]
  let mult = stat("tickspeed")
  if (x==0&&AchievementE(408)) mult = mult.mul(achievement.get(408).effect().div(100).add(1))
  if ([0,1].includes(x)&&AchievementE(521)) mult = mult.mul(1.5)
  if ([2,3].includes(x)&&AchievementE(522)) mult = mult.mul(1.5)
  if ([4,5].includes(x)&&AchievementE(523)) mult = mult.mul(1.5)
  let research4energy = [1,2,3,13,14,15][x]
  if (ResearchE("r4_"+research4energy)) mult = mult.mul(researchEffect(4,research4energy))
  let research7energy = [[13,15],[1,14],[13,14],[2,3],[2,15],[1,3]][x]
  for (let i=0;i<2;i++) if (ResearchE("r7_"+research7energy[i])) mult = mult.mul(researchEffect(7,research7energy[i]))
  if (ResearchE("r8_5")) mult = mult.mul(researchEffect(8,5).mul(achievement.owned()).div(100).add(1))
  return resource.add(10).dilate(0.9).pow(stat("energyGainSpeed")).root(divisor).pow(mult)
}
for (let i=0;i<energyTypes.length;i++) {
	d.element("Energy").innerHTML += "<div class=\"energydivision\" id=\""+energyTypes[i]+"EnergyDiv\">You have <span class=\"energytext\" id=\""+energyTypes[i]+"EnergyAmount\"></span> "+energyTypes[i]+" energy.<br>It is being multiplied by <span class=\"energytext\" id=\""+energyTypes[i]+"EnergyPerSec\"></span> per second (based on "+energyDeterminers[i]+").<br>"+energyResources[i]+" is being "+[null,null,"multiplied by","raised to the power of"][energyHyper[i]]+" <span class=\"energytext\" id=\""+energyTypes[i]+"EnergyEffect\"></span>"+(i==5?(" (need 10 "+energyTypes[i]+"energy)"):(" (need more "+energyTypes[i]+" energy than "+energyDeterminers[i]+")"))+".</div>"
}
function energyHTML() {
	for (let i=0;i<energyTypes.length;i++) {
		if (energyTypesUnlocked()>i) {
			d.display(energyTypes[i]+"EnergyDiv","inline-block")
			d.innerHTML(energyTypes[i]+"EnergyAmount",g[energyTypes[i]+"Energy"].format(2))
			d.innerHTML(energyTypes[i]+"EnergyPerSec",energyPerSec(i).format(i==3?4:2))
			d.innerHTML(energyTypes[i]+"EnergyEffect",energyEffect(i).format(4))
		} else {
			d.display(energyTypes[i]+"EnergyDiv","none")
		}
	}
}
function wormholeAnimation() {
	wormholeAnimationActive=true;wormholeAnimationStart=Date.now()
}
function wormholeReset(x) {
  if ((totalAxis("dark").gte((g.activeStudy==0)?1000:studies[g.activeStudy].goal()))||(x=="force")) {
		if (g.wormholeResets==0) {
			d.display("wormholeAnimation","inline-block")
			let start = Date.now()
			while (Date.now()-start<1e4) d.element("wormholeAnimation").style.opacity = (Date.now()-start)/1e4
		}
		g.last10StardustRuns=[]
		g.last10WormholeRuns = [{gain:stat("pendinghr"),realtime:g.timeThisWormholeReset,gametime:g.truetimeThisWormholeReset}].concat(g.last10WormholeRuns)
		if (g.last10WormholeRuns.length>10) g.last10WormholeRuns.splice(0,1)
    if (x!=="force") for (let i=0;i<wormholeResetAchievements.length;i++) addAchievement(wormholeResetAchievements[i])
    if (g.activeStudy!==0) {
      if (totalAxis("dark").gte(studies[g.activeStudy].goal())) {
				g.studyCompletions[g.activeStudy]++
				respecResearch()
				generateResearchCanvas()
			}		
			g.activeStudy=0
			generateStudyTable()
    }
    o.add("hawkingradiation",stat("pendinghr").floor())
    g.exoticmatter=N(0)
    for (let i=0;i<8;i++) {
      g[axisCodes[i]+"Axis"]=N(0)
      g["dark"+axisCodes[i]+"Axis"]=N(0)
    }
    g.masteryPower=N(1)
    g.baseMasteryPowerGain=N(0)
    g.exoticmatterThisStardustReset=N(0)
    g.timeThisStardustReset=0
    g.truetimeThisStardustReset=N(0)
    g.fastestStardustReset=N(9e15)
    g.exoticmatterThisWormholeReset=N(0)
    g.fastestWormholeReset=Decimal.min(g.fastestWormholeReset,g.timeThisWormholeReset)
    g.timeThisWormholeReset=0
    g.truetimeThisWormholeReset=N(0)
    g.stardust=N(0)
    g.stardustUpgrades=[0,1,0,5,0]
    g.stars=0
    g.ownedStars=[]
    g.darkmatter=N(0)
    g.darkstars=N(0)
    g.darkEnergy=N(0)
    g.stelliferousEnergy=N(0)
    g.gravitationalEnergy=N(0)
    g.spatialEnergy=N(0)
    g.neuralEnergy=N(0)
    g.metaEnergy=N(0)
    g.StardustResets=0
    g.WormholeResets++
    g.shiningBrightTonight=true
    g.ach519possible=true
    g.ach524possible=achievement.get(524).active()
    g.ach525possible=true
    g.ach526possible=true
		d.display("wormholeAnimation","none")
		unlockFeature("Hawking Radiation","g.hawkingradiation.gt(0)")
		if (g.researchRespec) {
			respecResearch()
			g.researchRespec = false
		}
		if (tabOpen(["Stardust","Dark Matter"])) openSubTab("stardust","Stardust Boosts")
		if (tabOpen(["Stardust","Energy"])) openSubTab("stardust","Stardust Boosts")
		if (AchievementE(506)&&g.ach505Progress.lt(1000)) g.ach505Progress=N(1000)
  }
}
function wormholeResetButtonText() {
  let out
  if (g.activeStudy==0) out = "Reset to gain <span class=\"wormholelayertext\">"+stat("pendinghr").floor().format(0)+"</span> hawking radiation"
  else out = "Complete this Study"
  out+="<br><span class=\"small\">"
  if (totalAxis("dark").lt(HRDarkAxisReq())) {
    out+="(Need "+BEformat(HRDarkAxisReq())+" total dark axis)"
  } else {
    if ((g.activeStudy==0)&&stat("pendinghr").lt(100)) {
      out+="(Next at "+BEformat(stat("pendinghr").floor().add(1).root(stat("HRExponent")).div(stat("HRMultiplier")).log(2).root(breakdownStats.pendinghr.modifiers[0].exp()).mul(1500).ceil())+" total dark axis)"
    }
  }
  out+="</span>"
  return out
}
function AchievementE(id) {
  return g.ownedAchievements.includes(String(id))
}
function addAchievement(x) {
  if (achievement.get(x).check()&&!AchievementE(x)) {
    g.ownedAchievements.push(String(x))
    g.ownedAchievements.sort(function(a,b){return a-b})
    notify("Achievement Get! \""+achievement.get(x).name+"\"",achievement.tierColors[String(x).substr(0,String(x).length-2)][1])
    generateAchievementsTab()
		generateResearchTree()
  }
}
const wormholeMilestoneList = [
  [1,"Unlock dark axis autobuyer"],
  [2,"Unlock dark star autobuyer"],
  [3,"Unlock stardust upgrade autobuyer"],
  [4,"Unlock star autobuyer"],
  [5,"Unlock automatic star allocation"],
  [7,"Dark stars no longer reset dark matter"],
  [9,function(){return "Stars and stardust upgrades cost less based on your hawking radiation<br>(formula: 10<sup>log(cost)<sup>"+wormholeMilestone9Effect().format(4)+"</sup></sup>)"}],
	[10,"Gain 1 stardust per second, unaffected by all multipliers"],
  [11,"The third Stardust Upgrade can be purchased 4 additional times"],
  [13,"The game runs 0.25% faster per achievement unlocked"],
  [15,"Unlock more research in row 4"],
  [18,function(){return "Add "+timeFormat(wormholeMilestone18Effect())+" to the dark T axis timer (based on hawking radiation)"}],
	[20,"Unlock automatic Wormhole resets"],
  [21,"Research in the first row is 0.1% stronger per achievement unlocked in all tiers"],
  [24,"Research in the second row is 0.2% stronger per achievement unlocked in all tiers"],
	[25,"Unlock automatic Stardust resets"],
  [27,function(){return "Row 10 Masteries are "+wormholeMilestone27Effect().format(2)+"% stronger (based on hawking radiation)"}],
  [30,"Gain all pending stardust immediately. Does not work in Studies."]
]
function wormholeMilestoneText(num) {
	let out = wormholeMilestoneList[wormholeMilestoneList.map(x => x[0]).indexOf(num)][1]
	return (typeof out == "function")?out():out
}
function wormholeMilestone9Effect(x) {
  x = (x==undefined)?g.hawkingradiation:N(x)
  return c.e.pow(x.div(10).add(1).quad_slog(10).mul(-0.1))
}
function wormholeMilestone18Effect(x) {
	x = (x==undefined)?g.hawkingradiation:N(x)
	return Decimal.convergentSoftcap(x.add(1).log10().pow(1.5).mul(200),86400,3155692599,1)
}
function wormholeMilestone27Effect(x) {
	x = (x==undefined)?g.hawkingradiation:N(x)
	let out = x.div(1000).add(1).log10().pow(0.3).mul(10)
	return Decimal.convergentSoftcap(Decimal.logarithmicSoftcap(out,25,1),50,100)
}
function wormholeMilestoneHTML() {
  let ach = achievement.ownedInTier(5)
  d.innerHTML("wormholeMilestoneT5Achievements",ach)
  let out = ""
  for (let i=0;i<wormholeMilestoneList.length;i++) {
    if (ach>=wormholeMilestoneList[i][0]) out += "<div class=\"wormholeMilestone\"><h3>"+wormholeMilestoneList[i][0]+" achievement"+((i==0)?"":"s")+"</h3><p>"+wormholeMilestoneText(wormholeMilestoneList[i][0])+"</p></div>"
    else {d.innerHTML("nextWormholeMilestone","At "+wormholeMilestoneList[i][0]+" achievements: "+wormholeMilestoneText(wormholeMilestoneList[i][0]));break}
  }
  d.innerHTML("unlockedWormholeMilestones",out)
}
function ach501Effect() {
  let out = g.truetimeThisWormholeReset.div(1e4).add(1)
  if (MasteryE(101)) out = out.pow(masteryEffect(101))
	return out
}
function ironWill() {
  return g.StardustResets==0&&g.ownedResearch.length==0
}
function ResearchE(x) {
  return [g.ownedResearch,g.permanentResearch].flat().includes(x)
}
function researchCost(x) {
  let output = N(research[x]["basecost"])
  return output.max(0).ceil()
}
const researchRows = Object.keys(research).map(x => researchRow(x)).reduce((x,y)=>Math.max(x,y))
function researchRowsUnlocked() {
	return unknownResearch().map(x => researchRow(x)).reduce((x,y)=>Math.max(x,y))
}
function researchBackground(id) {
	if (ResearchE(id)) return "#005500"
	if (!visibleResearch().includes(id)) return "#193333"
	if (research[id].type == "normal") return "#003333"
	if (research[id].type == "permanent") return "#333333"
	if (research[id].type == "study") return "#330000"
}
const researchCanvas = d.element("researchCanvas")
const researchContext = researchCanvas.getContext("2d")
function generateResearchTree() {
  let table = "<table>"
  let unknown_research = unknownResearch()
  for (let row=1;row<=researchRowsUnlocked();row++) {
    table+="<tr>"
    for (let col=1;col<16;col++) {
      let id = "r"+row+"_"+col
      if (research[id]==undefined) {table+="<td style=\"height:72px;width:72px\"></td>";continue}
      let research_state = (!research[id].visibility())?"hide":visibleResearch().includes(id)?(research[id].type+"ResearchButton"):unknownResearch().includes(id)?"unknownResearchButton":"hide"
      if (research_state=="hide") table+="<td style=\"height:72px;width:72px\"></td>"
      else table+="<td style=\"height:72px;width:72px\"><button style=\"font-size:16px;background-color:"+researchBackground("r"+row+"_"+col)+";opacity:"+((id=="r6_9"&&!ResearchE("r6_9"))?0:1)+";filter:brightness("+(availableResearch(row,col)?100:50)+"%)\" class=\"researchButton "+research_state+"\" onClick=\"buyResearch("+row+","+col+")\" onMouseover=\"showResearchInfo("+row+","+col+")\">"+(visibleResearch().includes(id)?research[id]["icon"]:"")+"</td>"
    }
    table+="</tr>"
  }
  table+="</table>"
  d.innerHTML("researchTable",table)
}
function generateResearchCanvas() {
	researchCanvas.style.height = (researchRowsUnlocked()*74)+"px"
	researchCanvas.height = researchRowsUnlocked()*74
	researchContext.clearRect(0, 0, researchCanvas.width, researchCanvas.height)
	let count = 0
	for (let i=0;i<unknownResearch().length;i++) {
		let res = unknownResearch()[i]
		if (res=="r6_9") continue
		for (let j=0;j<research[res].adjacent_req.length;j++) if (unknownResearch().includes(research[res].adjacent_req[j])) {
			let res2 = research[res].adjacent_req[j]
			if (res2=="r6_9") continue
			researchContext.moveTo(researchCol(res)*74-37,researchRow(res)*74-37)
			researchContext.lineTo(researchCol(res2)*74-37,researchRow(res2)*74-37)
			count++
		}
	}
	researchContext.strokeStyle = "#FFFFFF"
	researchContext.lineWidth = 2
	researchContext.stroke()
}
function visibleResearch() {
  let out = new Set(["r1_3","r1_8","r1_13"]) 
  let res = g.researchVisibility
  for (let i=0;i<Object.keys(research).length;i++) {
    let next = Object.entries(research)[i]
		if (!next[1].visibility()) continue
    if (res.includes(next[0])) out.add(next[0])
    for (let j=0;j<next[1].adjacent_req.length;j++) if (res.includes(next[1].adjacent_req[j])) out.add(next[0])
  }
  return Array.from(out)
}
function unknownResearch() {
  let out = new Set()
  let res = visibleResearch()
  for (let i=0;i<Object.keys(research).length;i++) {
    let next = Object.entries(research)[i]
		if (!next[1].visibility()) continue
    if (res.includes(next[0])) out.add(next[0])
    for (let j=0;j<next[1].adjacent_req.length;j++) if (res.includes(next[1].adjacent_req[j])) out.add(next[0])
  }
  return Array.from(out)
}
function showResearchInfo(row,col) {
  let res=research["r"+row+"_"+col]
	if (row==6&&col==9&&!ResearchE("r6_9")) return
  let out1 = []
	let out2 = []
  if (res.type=="normal") out1.push("<span style=\"font-size:10px;color:#00ff00\">Research "+row+"-"+col+"</span>")
  if (res.type=="permanent") out1.push("<span style=\"font-size:10px;color:#ffff00\">Research "+row+"-"+col+"<br>This research will not be refunded upon respec.</span>")
  if (res.type=="study") out1.push("<span style=\"font-size:10px;color:#ff0000\">Purchasing this will unlock a Study. If you can do a Wormhole reset under special restrictions, you will gain a permanent reward.</span>")
  out1.push(res.description())
  out2.push("Cost: "+researchCost("r"+row+"_"+col)+" Discover"+(researchCost("r"+row+"_"+col).eq(1)?"y":"ies"))
  if (res.condition_tooltip !== undefined) {
    let color = res.condition()?"#00cc00":"#cc0000"
    out2.push("<span style=\"font-size:12px;color:"+color+"\">Need "+res.condition_tooltip()+"</span>")
  }
	out2.push(ResearchE("r"+row+"_"+col)?"<span style=\"color:#66ff66\">(Owned)</span>":"<span style=\"color:#ff6666\">(Unowned)</span>")
  if (visibleResearch().includes("r"+row+"_"+col)) {
		d.innerHTML("researchInfo","<table style=\"table-layout:fixed\"><tr><td style=\"width:49vw;height:60px\">"+out1.join("<br>")+"</td><td style=\"width:49vw;height:60px\">"+out2.join("<br>")+"</td></tr></table>")
  } else {
		d.innerHTML("researchInfo","<p style=\"color:#999999\">Buy a Research adjacent to this to reveal this</p>")
	}
}
function respecResearch() {
	g.spentDiscoveries=N(0)
  g.ownedResearch=g.ownedResearch.filter(x => research[x].type == "permanent")
	generateResearchTree()
}
var observationCostRatios = [["ee5",0.1,4],
														 ["ee3",0.5,2],
														 ["ee3",0.2,3],
														 [2,1,1]]
function observationCost(type,amount) {
  if (amount == undefined) amount = g.observations[type-1]
  let ratios = observationCostRatios[type-1]
  return Decimal.powerTower(ratios[0],amount.mul(ratios[1]).add(1),ratios[2])
}
var observationResources = ["exoticmatter","stardust","darkmatter","hawkingradiation"]
function maxAffordableObservations(type) {
  let resource = observationResources[type-1]
  let ratios = observationCostRatios[type-1]
  if (g[resource].lt(ratios[0])) return N(0)
  return g[resource].log(ratios[0]).root(ratios[2]).sub(1).div(ratios[1]).add(1).floor()
}
function buyMaxObservations(type) {
  let resource = observationResources[type-1]
  let newvalue = maxAffordableObservations(type)
  if (newvalue.lte(g.observations[type-1])) return
  g.observations[type-1]=newvalue
}
function observationEffect(x) {
	if (x==0) return g.observations[0].mul(0.1).add(1)
	if (x==1) return g.observations[1].mul(0.1).add(1)
	if (x==2) return g.observations[2].mul(0.1).add(1)
	if (x==3) return g.observations[3].mul(0.2).add(1)
	return [0,1,2,3].map(i => observationEffect(i)).reduce((x,y)=>x.mul(y))
}
function knowledgeEffect() {
  return Decimal.convergentSoftcap(g.knowledge.add(10).log10().log10().mul(10),37.5,50)
}
function extraDiscoveries(op) {
  let out
  if (op=="add") {
    out = N(0)
  }
  if (op=="mul") {
    out = N(1)
		out = out.mul(AchievementE(504)?1.05:1)
  }
  return out
}
function discoveriesFromKnowledge(x) {
  x=(x==undefined)?g.knowledge:N(x)
  let base = g.knowledge.lt(1)?N(0):g.knowledge.log10()
  return base.add(extraDiscoveries("add")).mul(extraDiscoveries("mul"))
}
function nextDiscovery(x) {
  x=(x==undefined)?g.totalDiscoveries:N(x)
  let real = x.add(1).div(extraDiscoveries("mul")).sub(extraDiscoveries("add"))
  return real.pow10()
}
function unspentDiscoveries() {
  return g.totalDiscoveries.sub(g.spentDiscoveries).sub(g.permanentSpentDiscoveries)
}
function availableResearch(row,col) {
	if (row==1) return true
  let adjacents = research["r"+row+"_"+col]["adjacent_req"]
  let adjacent_test = false
  for (let i=0;i<adjacents.length;i++) if (ResearchE(adjacents[i])) adjacent_test = true
  if (!adjacent_test) return false
  return research["r"+row+"_"+col].condition()                                                                      // check if research purchase requirement is met
}
function buyResearch(row,col) {
  let id = "r"+row+"_"+col
  if (research[id]==undefined) return             // research does not exist
  if (!research[id].condition()) return           // special requirement not met
	if (!availableResearch(row,col)) return         // adjacent research not owned
  if (ResearchE(id)) return                       // research already owned
  let cost = researchCost(id)
  if (cost.gt(unspentDiscoveries())) return       // research too expensive
  if (research[id].type=="permanent") {
    g.permanentResearch.push(id)
    o.add("permanentSpentDiscoveries",cost)
  } else {
    g.ownedResearch.push(id)
    o.add("spentDiscoveries",cost)
  }
	if (research[id].type == "study") unlockFeature("Studies","true")
  if (!g.researchVisibility.includes(id)) {
		g.researchVisibility.push(id)
		generateResearchCanvas()
	}
  generateResearchTree()
	addAchievement("s17")
}
function researchRow(code) {                 // gets the row number of a research code, eg "r5_7" returns 5
  return Number(code.split("_")[0].substr(1))
}
function researchCol(code) {                 // gets the column number of a research code, eg "r5_7" returns 7
  return Number(code.split("_")[1])
}
function researchOut(code) {                 // converts an internal research code to an output code, eg "r5_7" returns "5-7"
  return researchRow(code)+"-"+researchCol(code)
}
function researchInt(code) {                 // converts an output research code to an internal code, eg "5-7" returns "r5_7"
  return "r"+code.replace("-","_")
}
function visibleStudies() {
  let out = []
  for (let i=1;i<=Object.keys(studies).length;i++) if ((g.studyCompletions[i]>0)||ResearchE(studies[i]["research"])) out.push(i)
  return out
}
function StudyE(x) {
	if (g.activeStudy==x) return true
	return false
}
function generateStudyHTML(index) {
  let out="<div class=\"study study"+g.studyCompletions[index]+"\">"
  out+="<h2 style=\"text-decoration:underline\">Study "+roman(index)+": "+studies[index].name+"</h2>"
  out+="<p>"+studies[index].description()+"</p>"
  if (g.activeStudy==index) {
		out+="<button class=\"startStudyEnabled\" onClick=\"wormholeReset('force')\">Abort Study</button>"
	} else if (StudyE(index)) {
		out+="<button class=\"startStudyEnabled\">Trapped in</button>"
	} else if (ResearchE(studies[index]["research"])) {
    out+="<button class=\"startStudyEnabled\" onClick=\"enterStudy("+index+")\">Start</button>"
	} else if (g.activeStudy!==0) {
		out+="<button class=\"startStudyDisabled\">Already in Study "+roman(g.activeStudy)+"</button>"
	} else {
    out+="<button class=\"startStudyDisabled\">Need research "+researchOut(studies[index]["research"])+"</button>"
  }
  out+="<hr><p>Goal: "+BEformat(studies[index].goal())+" total dark axis</p>"
  out+="<p>"+g.studyCompletions[index]+"/4 completions"
  out+="<hr><p>Reward:<br>"+studies[index].reward_desc()
  out+="</div>"
  return out
}
function generateStudyTable() {
  d.innerHTML("Studies",visibleStudies().map(x => generateStudyHTML(x)).join(""))
}
function enterStudy(x) {
  wormholeReset("force")
  g.activeStudy=x
	generateStudyTable()
}

var notify_fade = 0
function notify(x,color) {
  document.getElementById("notify").innerHTML += "<br><span style=\"color:"+color+"\">"+x+"</span>"
  document.getElementById("notify").style.opacity = 1
  notify_fade = Number(new Date())+5000
}
const topResources = [
	{
		label:"Exotic Matter",
		before:function(){return "<span style=\"color:#00ff00\">"+g.exoticmatter.format(2)+"</span>"},
		after:function(){return "<span style=\"color:#00ff00\">("+stat("exoticmatterPerSec").format(2)+" / s)</span>"},
		condition:function(){return true}
	},
	{
		label:"Stardust",
		before:function(){return "<span class=\"stardusttextsmall\">"+g.stardust.format(0)+"</span>"},
		after:function(){return ""},
		condition:function(){return unlocked("Stardust")},
	},
	{
		label:"Hawking radiation",
		before:function(){return "<span class=\"wormholetextsmall\">"+g.hawkingradiation.format(0)+"</span>"},
		after:function(){return ""},
		condition:function(){return unlocked("Hawking Radiation")}
	},
	{
		label:"Offline Boost",
		before:function(){return "<span style=\"color:#00cc00\">"+BEformat(offlineSpeedup,2)+"× ("+offlineTime.toFixed(1)+"s)</span>"},
		after:function(){return ""},
		condition:function(){return offlineSpeedup!=1}
	},
	{
		label:"Tickspeed",
		before:function(){return "<span style=\"color:#00cc00\">"+stat("tickspeed").format(3)+"×</span>"},
		after:function(){return ""},
		condition:function(){return stat("tickspeed").neq(1)}
	},
	{
		label:"Total Dark Axis",
		before:function(){return "<span style=\"color:#990099\">"+totalAxis("dark").format(0)+"</span>"},
		after:function(){return ""},
		condition:function(){return StudyE(1)}
	}
]
function endgameColor() {
	return "hsl("+((Date.now()/1e4)%360)+","+(90+Math.sin(Date.now()/1e6)*10)+"%,"+(50+Math.cos(Date.now()/1e8)*10)+"%)"        // random color that slowly changes over time
}
const progressMilestones = [
	{
		type:1,
		label:"Masteries",
		percent:function(){return Decimal.div(g.exoticmatter,axisCost("X",0))},
		req:function(){return "1 X Axis"},
		color:"#ff0099",
		condition:function(){return unlocked("Masteries")}
	},
	{
		type:1,
		label:"the next row of Masteries",
		percent:function(){return Decimal.div(g.exoticmatter,axisCost("Z",0))},
		req:function(){return "1 Z Axis"},
		color:"#ff0099",
		condition:function(){return masteryRowsUnlocked(2)==1}
	},
	{
		type:1,
		label:"the next row of Masteries",
		percent:function(){return totalAxis("normal").div(40)},
		req:function(){return "40 total axis"},
		color:"#ff0099",
		condition:function(){return masteryRowsUnlocked(3)==1}
	},
	{
		type:1,
		label:"the next row of Masteries",
		percent:function(){return totalAxis("normal").div(50)},
		req:function(){return "50 total axis"},
		color:"#ff0099",
		condition:function(){return masteryRowsUnlocked(4)>0}
	},
	{
		type:1,
		label:"Stardust and another Row 4 Mastery",
		percent:function(){return g.exoticmatter.div(stardustExoticMatterReq)},
		req:function(){return BEformat(stardustExoticMatterReq)+" exotic matter"},
		color:"linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0) 50%,#ff0099 50%,#ff0099),linear-gradient(90deg,#ff0,#f60)",
		condition:function(){return masteryRowsUnlocked(4)==2}
	},
	{
		type:2,
		condition:function(){return g.stardustUpgrades[4]>0}
	},
	{
		type:1,
		label:"Wormhole",
		percent:function(){return totalAxis("dark").div(HRDarkAxisReq())},
		req:function(){return HRDarkAxisReq().format(0)+" dark axis"},
		color:"linear-gradient(90deg,#0000ff,#9900ff)",
		condition:function(){return unlocked("Hawking Radiation")}
	},
	{
		type:2,
		condition:function(){return unlocked("Studies")}
	},
	{
		type:1,
		label:"Study completion",
		percent:function(){return totalAxis("dark").div(HRDarkAxisReq())},
		req:function(){return HRDarkAxisReq().format(0)+" dark axis"},
		color:"#000066",
		condition:function(){return g.activeStudy==0}
	},
	{
		type:1,
		label:"current endgame",
		percent:function(){return g.studyCompletions.reduce((x,y)=>x+y)/4},
		req:function(){return "4 Study completions"},
		color:"endgame",
		condition:function(){return g.studyCompletions.reduce((x,y)=>x+y)>=4}
	},
	{
		type:3,
		condition:function(){return false}
	}
]
function ProgressBar() {
  let data,label,filled,color
	for (let i=0;i<progressMilestones.length;i++) {
		let next = progressMilestones[i]
		if (!next.condition()) {
			data = progressMilestones[i]
			break
		}
	}
	if (data.type==1) {
		label = "Progress to "+data.label+": "+N(data.percent()).max(0).min(1).mul(100).toNumber().toFixed(2)+"% (Need "+data.req()+")"
		filled = N(data.percent()).max(0).min(1).mul(100).toNumber()
		color = data.color=="endgame"?endgameColor():data.color
	} else if (data.type==2) {
		label = "No new aspects detected. <span style=\"font-weight:700\">Perhaps you need something else.</span>"
		filled = 0
		color = "#000000" // doesn't get used
	} else if (data.type==3) {
		label = "You are at the current endgame. Look out for the <b>Light</b> update..."
		filled = 100
		color =	endgameColor()
	}
	d.innerHTML("progress",label)
	d.element("progress").style.background = "linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0) "+filled+"%,rgba(102,102,102,0.9) "+filled+"%,rgba(102,102,102,0.9)),"+color
}
function save() {
  localStorage.setItem("save",JSON.stringify(g)); 
}
function load(type) {
  let savegame
  if (type=="normal") {
    savegame = JSON.parse(localStorage.getItem("save"));
  } else if (type=="import") {
		let imported = prompt("Copy and paste your save file here:")
		if (imported.toLowerCase() == "cat") addAchievement("s07")
		if (imported.toLowerCase() == "alemaninc") addAchievement("s08")
		imported = atob(imported)
		if (!JSON.valid(imported)) throw "Invalid save."
    savegame = JSON.parse(imported)
  } else {
    console.error("load("+type+") is not a valid loading mode")
  }
  if ((typeof savegame == "object") && (savegame !== null)) {
		if (typeof savegame.exoticmatter == "number") {
			loadOldSave(savegame)
		} else {
			let vars=Object.keys(g)
			for (let i=0; i<vars.length; i++) {
				if (savegame[vars[i]] !== undefined) {
					let value = savegame[vars[i]]
					g[vars[i]] = validDecimal(value)?N(value):value
				}
			}
			fixMasteryArrays()
			for (let i=0; i<4; i++) g.observations[i]=N(g.observations[i])
			let timeSpentOffline = Number(new Date())-g.timeLeft
			if ((timeSpentOffline>1000)&&(g.offlineSpeedupOn!=="Off")) {
				if (g.offlineSpeedupOn=="Weakened") timeSpentOffline = Decimal.linearSoftcap(timeSpentOffline,3.6e6,1).toNumber() // Starts at 1 hour
				offlineTime=g.offlineSpeedupLength
				baseOfflineSpeedup=1+(timeSpentOffline/g.offlineSpeedupLength/1000)
			}
		}
  }
	if (StudyE(1)) openTab("Wormhole")
	theme()
  generateResearchTree()
	generateResearchCanvas()
  generateAchievementsTab()
  for (let i=0;i<8;i++) {
    d.element("axisAutobuyerMax"+axisCodes[i]).value=g.axisAutobuyerCaps[i]
    d.element("darkAxisAutobuyerMax"+axisCodes[i]).value=g.darkAxisAutobuyerCaps[i]
  }
  d.element("darkAxisAutobuyerMaxStars").value=g.darkAxisAutobuyerCaps[12]
  d.element("starAutobuyerMax").value=g.starAutobuyerCap
	d.element("wormholeAutomatorValue").value=g.wormholeAutomatorValue
	d.element("stardustAutomatorValue").value=g.stardustAutomatorValue
	addAchievement("s02")
  savecounter++
}
function exportSave() {
	d.element("span_export").value = btoa(localStorage.getItem("save"))
}
const wipeSavePassword = Array.random(["Shrek is love, Shrek is life","To confirm that you want to wipe your save, input.","foo","YES","yes","96","g.exoticmatter++","AleManInc, this is the worst idea ever.","This is the worst game ever.","M > O > U","44031","X > Y > Z","Save Selector","This is a randomly generated phrase","Maya hee maya hoo","WIPE SAVE","Please don't delete me","CONFIRM","CORNFIRM","CRONFIRM","statrnark","zenrnoroni","Antimatter Dimensions is better.","Incredibly slow start","Surprised there isn't something to speed this up"])
function stringSimplify(x) {
	return String(x).replace(/[^A-Za-z0-9]/g,"").toLowerCase()
}
function wipeSave() {
  let query = prompt("To confirm that you want to wipe your save, input \""+wipeSavePassword+"\".")
  if ((typeof query) !== "string") {
		// do nothing
	} else if (stringSimplify(query)==stringSimplify(wipeSavePassword)) {
    g = Object.assign({},basesave)
	} else {
    alert("Incorrect answer, wiping did not proceed.")
  }
}
function toggle(x) {
   g[x]=!g[x]
}
function multitoggle(variable,options) {
  g[variable]=options[(options.indexOf(g[variable])+1)%options.length]
}
function halt() { // Terminates the game loop, used for debugging
  clearInterval(gameloop)
}