"use strict"
function updateHTML() {
	if (wormholeAnimationActive) {
		if (Date.now()-wormholeAnimationStart>16000) {
			wormholeReset("normal")
			d.display("wormholeAnimation","none")
			wormholeAnimationActive=false
		} else if (Date.now()-wormholeAnimationStart>8000) {
			d.display("wormholeAnimation","inline-block")
			unlockFeature("Hawking Radiation","true")
			d.element("wormholeAnimation").style.opacity = 2-(Date.now()-wormholeAnimationStart)/8000
		} else {
			d.display("wormholeAnimation","inline-block")
			d.element("wormholeAnimation").style.opacity = (Date.now()-wormholeAnimationStart)/8000
		}
	}
	let resourceModal = ""
	for (let i=0;i<topResources.length;i++) {
		if (!topResources[i].condition()) continue
		resourceModal += "<div class=\"resource\">"+[topResources[i].before(),topResources[i].label,topResources[i].after()].join(" ")+"</div>"
	}
	d.innerHTML("resourceModal",resourceModal)
  d.display("button_automation",(g.stardustUpgrades[1]>0)?"inline-block":"none")
  d.innerHTML("span_pendingstardust",stat("pendingstardust").max(0).format(0))
	d.class("span_pendingstardust",stat("pendingstardust").gt(0)?"stardustlayertext":"darkstardustlayertext")
  d.display("button_stardust",unlocked("Stardust")?"inline-block":"none")
  d.innerHTML("span_stardustExoticMatterReq",stardustExoticMatterReqText())
  d.class("button_stardustReset",stat("pendingstardust").gt(0)?"stardustResetButton":"lockedStardustResetButton")
  d.element("button_stardustReset").style.visibility=masteryRowsUnlocked(4)==2?"visible":"hidden"
  d.display("button_wormhole",unlocked("Hawking Radiation")?"inline-block":"none")
  d.class("button_wormholeReset",totalAxis("dark").gte((g.activeStudy==0)?1000:studies[g.activeStudy].goal())?"wormholeResetButton":"lockedStardustResetButton")
  d.element("button_wormholeReset").style.visibility=(unlocked("Hawking Radiation")||totalAxis("dark").gte(1000))?"visible":"hidden"
  d.innerHTML("button_wormholeReset",wormholeResetButtonText())
  if (tabOpen(["Main"])) {
    d.display("button_masteries",unlocked("Masteries")?"inline-block":"none")
  }
  if (tabOpen(["Main","tabAxis"])) {
    for (let i=0;i<8;i++) {
      let type = axisCodes[i]
      d.display("button_"+type+"Axis",(axisUnlocked()>i)?"inline-block":"none")
      d.class("button_"+type+"Axis",g.exoticmatter.gt(axisCost(type))?"axisbutton":"lockedaxisbutton")
      d.innerHTML("span_"+type+"AxisAmount",BEformat(g[type+"Axis"])+((stat("free"+type+"Axis").gt(0))?(" + "+BEformat(stat("free"+type+"Axis"),2)):""))
      d.innerHTML("span_"+type+"AxisEffect",BEformat(stat(type+"AxisEffect"),[2,2,2,2,2,2,2,4][i]))
      d.innerHTML("span_"+type+"AxisCost",BEformat(axisCost(type)))
    }
		for (let i=0;i<empowerableAxis.length;i++) {
			d.display("button_empowered"+empowerableAxis[i]+"Axis",axisEmpowerment(empowerableAxis[i]).gt(0)?"inline-block":"none")
			d.innerHTML("span_empowered"+empowerableAxis[i]+"AxisAmount",BEformat(axisEmpowerment(empowerableAxis[i]),2))
		}
    ProgressBar()
  }
  if (tabOpen(["Main","tabMasteries"])&&updateMasteryHTML) {
    d.innerHTML("span_masteryPower",BEformat(g.masteryPower))
    d.innerHTML("span_masteryPowerPerSec",BEformat(stat("masteryPowerPerSec")))
    for (let i=0;i<shownMasteries.length;i++) {
      d.innerHTML("masteryButton"+shownMasteries[i],fullMasteryText(shownMasteries[i]))
      d.class("masteryButton"+shownMasteries[i],MasteryE(shownMasteries[i])?"masterybuttonon":"masterybuttonoff")
    }
  }
  if (tabOpen(["Options","tabOptions"])) {
    d.innerHTML("colortheme",g.colortheme)
    d.innerHTML("darkstarBulk",g.darkstarBulk?"On":"Off")
		d.innerHTML("notation",g.notation)
    d.innerHTML("offlineSpeedupLength",timeFormat(g.offlineSpeedupLength))
    d.innerHTML("offlineSpeedupOn",g.offlineSpeedupOn)
    d.innerHTML("toggleAutosave",g.autosaveIsOn?"On":"Off")
		d.innerHTML("span_completedAchievementTiersShown",g.completedAchievementTiersShown?"Showing":"Hiding")
  }
  if (tabOpen(["Statistics","Main Statistics"])) {
    mainStats()
  }
	if (tabOpen(["Statistics","Hidden Statistics"])) {
		hiddenStats()
	}
  if (tabOpen(["Statistics","Stat Breakdown"])) {
		for (let i=0;i<breakdownTabList.length;i++) {
			d.display("SSB-"+breakdownTabList[i],breakdownStats[breakdownTabList[i]].visible()?"inline-block":"none")
		}
		d.innerHTML("SSBtable",breakdownTable(activeBreakdownTab))
  }
  if (tabOpen(["Stardust"])) {
    d.display("button_darkmatter",(g.stardustUpgrades[4]>0)?"inline-block":"none")
    d.display("button_energy",(g.stardustUpgrades[4]>1)?"inline-block":"none")
  }
  if (tabOpen(["Stardust","Stardust Boosts"])) {
    d.innerHTML("span_stardustBoost1",stardustBoost(1).format(2))
    d.innerHTML("span_stardustBoost2",stardustBoost(2).sub(1).mul(100).format(2))
    d.innerHTML("span_stardustBoost3",stardustBoost(3).sub(1).mul(100).format(2))
    d.innerHTML("span_stardustBoost4",stardustBoost(4).format(3))
    d.innerHTML("span_stardustBoost5",stardustBoost(5).format(2))
    d.innerHTML("span_stardustBoost6",stardustBoost(6).sub(1).mul(100).format(2))
    d.innerHTML("span_stardustBoost7",stardustBoost(7).format(4))
    d.innerHTML("span_stardustBoost8",stardustBoost(8).sub(1).mul(100).format(2))
    d.innerHTML("span_stardustBoost9",stardustBoost(9).format(3))
		d.innerHTML("span_stardustBoost10",stardustBoost(10).format(4))
		d.innerHTML("span_stardustBoost11",stardustBoost(11).format(2))
		d.innerHTML("span_stardustBoost12",stardustBoost(12).format(4))
    /* Stardust boost table */ for (let i=3;i<13;i++) d.display("span_stardustBoost"+i+"Cell",((g.stardustUpgrades[2]>(i-3))?"inline-block":"none"))
    /* Stardust upgrade buttons */
    for (let i=1;i<6;i++) {
      d.display("button_stardustUpgrade"+i,(g.stardustUpgrades[i-1]<stardustUpgradeCap(i))?"inline-block":"none")
      d.class("button_stardustUpgrade"+i,stardustUpgradeCost(i).lte(g.stardust)?"stardustupgradebutton":"lockedaxisbutton")
    }
    /* Stardust upgrade costs */ for (let i=1;i<6;i++) d.innerHTML("span_stardustUpgrade"+i+"Cost",BEformat(stardustUpgradeCost(i)))
    d.innerHTML("span_stardustUpgrade2Tooltip",(g.stardustUpgrades[1]>0)?("Keep 10% of the "+axisCodes[g.stardustUpgrades[1]-1]+" Axis on reset"):"Unlock the axis autobuyer")
    d.innerHTML("span_stardustUpgrade4Tooltip",(g.stardustUpgrades[3]==0)?"You can activate both first row Masteries simultaneously":(g.stardustUpgrades[3]==4)?"Unlock 2 new rows of Masteries":"Unlock a new row of Masteries")
    d.innerHTML("span_stardustUpgrade5Tooltip",["Unlock Dark Matter","Unlock Dark Energy","Unlock Stelliferous Energy","Unlock Gravitational Energy","Unlock Spatial Energy","Unlock Neural Energy","Unlock Meta Energy"][g.stardustUpgrades[4]])
  }
	if (tabOpen(["Achievements"])) {
		d.display("button_wormholeMilestones",achievement.ownedInTier(5)>0?"inline-block":"none")
	}
	if (tabOpen(["Achievements","Wormhole Milestones"])) {
		wormholeMilestoneHTML()
	}
  if (tabOpen(["Stardust","Stars"])&&updateStarHTML) {
    d.innerHTML("span_starCost",BEformat(starCost()))
    for (let i=0;i<dynamicStars.length;i++) if (starRowsShown.includes(Math.floor(dynamicStars[i]/10))) d.innerHTML("starButton"+dynamicStars[i],starText(dynamicStars[i]))
    d.innerHTML("span_unspentStars",BEformat(unspentStars())+" / "+BEformat(g.stars))
		d.display("button_maxFullStarRows",[1,2,3,4,5,6,7,8,9,10].map(x => maxStars(x)).includes(4)?"inline-block":"none")
		d.innerHTML("span_nextStarRow",g.stars>=40?"":("The next star you buy will go in row <span class=\"startext\">"+starRow(g.stars+1)+"</span>"))
  }
  if (tabOpen(["Stardust","Dark Matter"])) {
    d.innerHTML("span_darkmatter",BEformat(g.darkmatter))
		d.innerHTML("span_baseDarkMatterGain",breakdownStats.darkmatterPerSec.modifiers[1].func(breakdownStats.darkmatterPerSec.modifiers[0].func()).format(2))
    d.innerHTML("span_darkMatterFreeAxis1",BEformat(darkMatterFreeAxis(1).pow(-1).max(1),2))
    d.innerHTML("span_darkMatterFreeAxis2",BEformat(darkMatterFreeAxis(1).max(1),2))
    d.innerHTML("span_darkmatterPerSec",BEformat(stat("darkmatterPerSec")))
    d.class("button_darkstar",totalAxis("dark").gte(darkStarReq())?"darkstarbutton":"lockeddarkstarbutton")
		let effect3diff = darkStarEffect3(realDarkStars().add(1)).sub(darkStarEffect3())
		let darkStarButtonText = (achievement.ownedInTier(5)<7?"Reset dark matter to gain ":"Gain ")+((totalAxis("dark").gte(darkStarReq()))?(maxAffordableDarkStars().sub(g.darkstars).format(0)+" dark stars"):"a dark star")
		darkStarButtonText += "<br>(Progress"+(totalAxis("dark").gte(darkStarReq())?" to next":"")+": "+totalAxis("dark").format(0)+" / "+darkStarReq(maxAffordableDarkStars().max(g.darkstars)).format(0)+" dark axis)<br><br>"+darkStarEffectHTML()
    d.innerHTML("span_darkstars",BEformat(g.darkstars)+((realDarkStars().neq(g.darkstars))?("<span class=\"small\"> (effective "+BEformat(realDarkStars(),3)+")</span>"):""))
		d.innerHTML("button_darkstar",darkStarButtonText)
    for (let i=0;i<8;i++) {
      let type = axisCodes[i]
      d.class("button_dark"+type+"Axis",g.darkmatter.gt(darkAxisCost(type))?"darkaxisbutton":"lockedaxisbutton")
      d.innerHTML("span_dark"+type+"AxisAmount",BEformat(g["dark"+type+"Axis"])+((stat("freedark"+type+"Axis").gt(0))?(" + "+BEformat(stat("freedark"+type+"Axis"),2)):""))
      d.innerHTML("span_dark"+type+"AxisEffect",BEformat(stat("dark"+type+"AxisEffect"),[2,2,2,3,2,3,2,4][i]))
      d.innerHTML("span_dark"+type+"AxisCost",BEformat(darkAxisCost(type)))
			let v1 = realDarkStars()
			let v2 = realDarkStars(maxAffordableDarkStars().max(g.darkstars.add(1)))
			d.innerHTML("span_darkStarEffect2"+type,Decimal.eq(darkStarEffect2Level(type,v1),darkStarEffect2Level(type,v2))?(darkStarEffect2Level(type,v1).mul(10).format(4)+"%"):(darkStarEffect2Level(type,v1).mul(10).format(4)+"% → "+darkStarEffect2Level(type,v2).mul(10).format(4)+"%"))
    }
		for (let i=0;i<empowerableDarkAxis.length;i++) {
			d.display("button_empoweredDark"+empowerableDarkAxis[i]+"Axis",axisEmpowerment("dark"+empowerableDarkAxis[i]).gt(0)?"inline-block":"none")
			d.innerHTML("span_empoweredDark"+empowerableDarkAxis[i]+"AxisAmount",BEformat(axisEmpowerment("dark"+empowerableDarkAxis[i]),2))
		}
  }
  if (tabOpen(["Stardust","Energy"])) {
    energyHTML()
  }
  if (tabOpen(["Automation"])) {
    for (let i=0;i<Object.keys(autobuyers).length;i++) { // Autobuyer stuff
      let next = Object.keys(autobuyers)[i]
      d.display(next+"Autobuyer",autobuyers[next].unlockReq()?"inline-block":"none")
      d.class("button_"+next+"AutobuyerToggle",g[next+"AutobuyerOn"]?"automatortoggleon":"automatortoggleoff")
      d.innerHTML("span_"+next+"AutobuyerInterval",timeFormat(autobuyerMeta.interval(next)))
      d.display("button_"+next+"AutobuyerUpgrade",g[next+"AutobuyerUpgrades"]==autobuyerMeta.cap(next)?"none":"inline-block")
      d.innerHTML("span_"+next+"AutobuyerCost",autobuyerMeta.cost(next).format(2))
    }
		d.tr("span_wormholeMilestone2",achievement.ownedInTier(5)>=2)
		d.display("wormholeMilestone5",achievement.ownedInTier(5)>=5?"inline-block":"none")
		d.display("wormholeAutomator",achievement.ownedInTier(5)>=20?"inline-block":"none")
		d.display("stardustAutomator",achievement.ownedInTier(5)>=25?"inline-block":"none")
		d.innerHTML("button_wormholeAutomatorMode",dictionary(g.wormholeAutomatorMode,[["amount","X HR"],["time","After X real seconds"],["mult","(current HR) times X"],["pow","(current HR)<sup>X</sup>"]]))
		d.innerHTML("button_stardustAutomatorMode",dictionary(g.stardustAutomatorMode,[["amount","X stardust"],["time","After X real seconds"],["mult","(current stardust) times X"],["pow","(current stardust)<sup>X</sup>"]]))
    d.class("button_starAllocatorToggle",g.starAllocatorOn?"automatortoggleon":"automatortoggleoff")
		d.class("button_wormholeAutomatorToggle",g.wormholeAutomatorOn?"automatortoggleon":"automatortoggleoff")
		d.class("button_stardustAutomatorToggle",g.stardustAutomatorOn?"automatortoggleon":"automatortoggleoff")
    // input storage
    for (let i=0;i<8;i++) {
      g.axisAutobuyerCaps[i]=d.element("axisAutobuyerMax"+axisCodes[i]).value
      g.darkAxisAutobuyerCaps[i]=d.element("darkAxisAutobuyerMax"+axisCodes[i]).value
    }
    g.darkAxisAutobuyerCaps[12]=d.element("darkAxisAutobuyerMaxStars").value
    g.starAutobuyerCap=d.element("starAutobuyerMax").value
  }
  if (tabOpen(["Wormhole"])) {
    d.display("button_studiesTab",unlocked("Studies")?"inline-block":"none")
  }
  if (tabOpen(["Wormhole","Research"])) {
    d.innerHTML("span_discoveryDisplay",BEformat(unspentDiscoveries())+" / "+BEformat(g.totalDiscoveries))
    d.innerHTML("span_discoveryKnowledgeReq",BEformat(nextDiscovery()))
    d.innerHTML("span_knowledge",BEformat(g.knowledge))
    d.innerHTML("span_knowledgeEffect",BEformat(knowledgeEffect(),3))
    d.innerHTML("span_knowledgePerSec",BEformat(stat("knowledgePerSec"),2))
		d.element("button_researchRespec").style["background-color"] = g.researchRespec?"rgba(128,255,204,0.75)":"rgba(179,204,255,0.75)"
    for (let i=1;i<5;i++) d.innerHTML("span_observeCost"+i,BEformat(observationCost(i)))
  }
}
function tick(time) {                                                                     // The game loop, which consists of functions that run automatically. Frame rate is 20fps


  // QoL section
  if ((baseOfflineSpeedup>1)&&(offlineTime>0)) {
    offlineSpeedup = Math.max(1,1+(baseOfflineSpeedup-1)*Math.min(Math.max(offlineTime,0.001)/deltatime,1))
    offlineTime-=deltatime
  } else {
    offlineSpeedup = 1
  }


  // Mastery section


  // Options & Display section
  for (let num=0;num<formattags.i.length;num++) formattags.i[num].innerHTML = eval(formattags.i[num].getAttribute("data-i"))
  for (let num=0;num<formattags.d.length;num++) formattags.d[num].style.display = eval(formattags.d[num].getAttribute("data-d"))?"inline-block":"none"
  for (let num=0;num<formattags.v.length;num++) formattags.v[num].style.visibility = eval(formattags.v[num].getAttribute("data-v"))?"visible":"hidden"
  for (let num=0;num<formattags.c.length;num++) formattags.c[num].className = eval(formattags.c[num].getAttribute("data-c"))
  for (let num=0;num<formattags.s.length;num++) formattags.s[num].src = eval(formattags.s[num].getAttribute("data-s"))
  d.element("storyTitle").style = "text-decoration:underline;font-size:100px;background:-webkit-repeating-linear-gradient("+(45*Math.sin(Number(new Date()/1e4)))+"deg,#f00,#ff0 4%,#0f0 8.5%,#0ff 12.5%,#00f 16.5%,#f0f 21%,#f00 25%);-webkit-background-clip:text;-webkit-text-fill-color: transparent;"
  unlockFeature("Masteries","g.XAxis.gt(0)")
  unlockFeature("Stardust","g.StardustResets>0")
  unlockFeature("Stars","g.StardustResets>0")
  unlockFeature("Dark Matter","g.stardustUpgrades[4]>0")
  unlockFeature("Energy","g.stardustUpgrades[4]>1")
  unlockFeature("Supernova","g.stars>=24")
  if (totalAxis("dark").gte(1000)&&!g.storySnippets.includes("Black hole")) openStory("Black hole")
  g.timePlayed+=time
  o.add("truetimePlayed",stat("tickspeed").mul(time))
  g.timeThisStardustReset+=time
  o.add("truetimeThisStardustReset",stat("tickspeed").mul(time))
  g.timeThisWormholeReset+=time
  o.add("truetimeThisWormholeReset",stat("tickspeed").mul(time))
	g.timeThisSpacetimeReset+=time
  o.add("truetimeThisSpacetimeReset",stat("tickspeed").mul(time))
  g.timeLeft=Number(new Date())

  d.glow("button_mainaxis",tabGlow("Axis"))
  d.glow("button_masteries",tabGlow("Masteries"))
  d.glow("button_stardustBoosts",tabGlow("Stardust Boosts"))
  d.glow("button_stars",tabGlow("Stars"))
  d.glow("button_darkmatter",tabGlow("Dark Matter"))
	d.glow("button_research",tabGlow("Research"))
  d.glow("button_main",["Axis","Masteries"].map(x => tabGlow(x)).includes(true))
  d.glow("button_automation",tabGlow("Automation"))
  d.glow("button_stardust",["Stardust Boosts","Stars","Dark Matter"].map(x => tabGlow(x)).includes(true))
	d.glow("button_wormhole",["Research"].map(x => tabGlow(x)).includes(true))
	
  d.element("notify").style.opacity = Math.max(0,Math.min(1,1-(Number(new Date())-notify_fade)/1e3))
  if (d.element("notify").style.opacity == 0) d.innerHTML("notify","")


  // Achievement section
  for (let i=0;i<gameloopAchievements.length;i++) addAchievement(gameloopAchievements[i])
  if (Math.random()<achievement.get("s13").chance(time)) addAchievement("s13")
  if (Math.random()<achievement.get("s14").chance(time)) addAchievement("s14")
  if (Math.random()<achievement.get("s15").chance(time)) addAchievement("s15")
	lagAchievementTicks = (deltatime>1)?(lagAchievementTicks+1):0
	fpsAchievementTicks = (deltatime==0.05)?(fpsAchievementTicks+1):0


  // Automation section
  if ((g.stardustUpgrades[1] > 0) && (g.axisAutobuyerOn)) axisAutobuyerProgress+=time/autobuyerMeta.interval("axis")
  if (axisAutobuyerProgress > 1) {
    buyMaxAxis(g.axisAutobuyerCaps)
    axisAutobuyerProgress%=1
  }
  if (achievement.ownedInTier(5)>=1 && (g.darkAxisAutobuyerOn)) darkAxisAutobuyerProgress+=time/autobuyerMeta.interval("darkAxis")
  if (darkAxisAutobuyerProgress > 1) {
    buyMaxDarkAxis(g.darkAxisAutobuyerCaps)
    if (achievement.ownedInTier(5)>=2) gainDarkStar(g.darkAxisAutobuyerCaps[12])
    darkAxisAutobuyerProgress%=1
  }
  if (achievement.ownedInTier(5)>=3 && g.stardustUpgradeAutobuyerOn) stardustUpgradeAutobuyerProgress+=time/autobuyerMeta.interval("stardustUpgrade")
  if (stardustUpgradeAutobuyerProgress > 1) {
    if (g.stardustUpgrades[0]<4) buyStardustUpgrade(1)
    if (g.stardustUpgrades[1]<9) buyStardustUpgrade(2)
    if (g.stardustUpgrades[2]<(achievement.ownedInTier(5)>=11?10:6)) buyStardustUpgrade(3)
    if (g.stardustUpgrades[3]<5) buyStardustUpgrade(4)
    if (g.stardustUpgrades[4]<7) buyStardustUpgrade(5)
    stardustUpgradeAutobuyerProgress%=1
  }
  if (achievement.ownedInTier(5)>=4 && (g.starAutobuyerOn || g.starAllocatorOn)) starAutobuyerProgress+=time/autobuyerMeta.interval("star")
  if (starAutobuyerProgress > 1) {
    if (g.starAutobuyerOn) {while (starCost().lt(g.stardust)&&g.stars<(g.starAutobuyerCap=="u"?Infinity:Number(g.starAutobuyerCap))) buyStar()}
		if (unspentStars()>0&&g.starAllocatorOn&&(g.ownedStars.length<g.starAllocatorBuild.length)) for (let i=0;i<g.starAllocatorBuild.length;i++) buyStarUpgrade(g.starAllocatorBuild[i])
		starAutobuyerProgress%=1
  }
	if (achievement.ownedInTier(5)>=20 && g.wormholeAutomatorOn) {
		let doReset = false
		if (g.wormholeAutomatorMode == "amount") doReset = stat("pendinghr").gte(g.wormholeAutomatorValue)
		if (g.wormholeAutomatorMode == "time") doReset = g.timeThisWormholeReset>=Number(g.wormholeAutomatorValue)
		if (g.wormholeAutomatorMode == "mult") doReset = stat("pendinghr").gte(g.hawkingradiation.mul(g.wormholeAutomatorValue))
		if (g.wormholeAutomatorMode == "pow") doReset = stat("pendinghr").gte(g.hawkingradiation.pow(g.wormholeAutomatorValue))
		if (doReset) wormholeReset("normal")
	}
	g.wormholeAutomatorValue=d.element("wormholeAutomatorValue").value
	if (achievement.ownedInTier(5)>=25 && g.stardustAutomatorOn) {
		let doReset = false
		if (g.stardustAutomatorMode == "amount") doReset = stat("pendingstardust").gte(g.stardustAutomatorValue)
		if (g.stardustAutomatorMode == "time") doReset = g.timeThisStardustReset>=Number(g.stardustAutomatorValue)
		if (g.stardustAutomatorMode == "mult") doReset = stat("pendingstardust").gte(g.stardust.mul(g.stardustAutomatorValue))
		if (g.stardustAutomatorMode == "pow") doReset = stat("pendingstardust").gte(g.stardust.pow(g.stardustAutomatorValue))
		if (doReset) stardustReset("normal")
	}
	g.stardustAutomatorValue=d.element("stardustAutomatorValue").value
	
	
	// Dark Matter section
	if (ironWill()) g.ach505Progress = g.ach505Progress.max(totalAxis("dark"))


  // Research section
  g.totalDiscoveries=discoveriesFromKnowledge().floor().max(g.totalDiscoveries)


  // Incrementer section - this comes last because otherwise resets don't work properly
  incrementExoticMatter(stat("exoticmatterPerSec").mul(time))
  g.exoticmatter = g.exoticmatter.max(stat("exoticmatterPerSec").mul(AchievementE(112)?60:AchievementE(111)?30:AchievementE(110)?15:0))
  if (unlocked("Masteries")) {
    o.add("baseMasteryPowerGain",deltaBaseMasteryPowerGain().mul(time))
    o.add("masteryPower",stat("masteryPowerPerSec").mul(time))
  }
  if (achievement.ownedInTier(5)==30&&g.activeStudy==0) o.add("stardust",stat("pendingstardust"))
  if (achievement.ownedInTier(5)>=10) o.add("stardust",stat("tickspeed").mul(time))
  if (g.stardustUpgrades[4]>0) o.add("darkmatter",stat("darkmatterPerSec").mul(time))
  for (let i=0;i<6;i++) {
    if (energyTypesUnlocked()>i) o.mul(energyTypes[i]+"Energy",energyPerSec(i).pow(time))
    else g[energyTypes[i]+"Energy"]=N(1)
  }
  if (unlocked("Hawking Radiation")) o.add("knowledge",stat("knowledgePerSec").mul(time))

  if (g.autosaveIsOn && savecounter > 0) save()
  updateHTML()
}
function auto_tick() {
  oldframetime=newframetime
  newframetime=new Date().getTime()
  deltatime=Math.max(0,(newframetime-oldframetime)/1000)
  tick(deltatime*offlineSpeedup)
	timeSinceGameOpened+=deltatime
}
var gameloop = window.setInterval(auto_tick,50)