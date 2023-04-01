"use strict";
function updateHTML() {
	if (wormholeAnimationActive) {
		if (Date.now()-wormholeAnimationStart>16000) {
			wormholeReset("normal");
			d.display("wormholeAnimation","none");
			wormholeAnimationActive=false;
		} else if (Date.now()-wormholeAnimationStart>8000) {
			d.display("wormholeAnimation","inline-block");
			unlockFeature("Hawking Radiation",true);
			d.element("wormholeAnimation").style.opacity = 2-(Date.now()-wormholeAnimationStart)/8000;
		} else {
			d.display("wormholeAnimation","inline-block");
			d.element("wormholeAnimation").style.opacity = (Date.now()-wormholeAnimationStart)/8000;
		}
	}
	updateTopResourceModal();
	d.display("button_automation",(g.stardustUpgrades[1]>0)?"inline-block":"none");
	d.innerHTML("span_pendingstardust",stat.pendingstardust.sub(g.stardust).max(0).format(0));
	d.class("span_pendingstardust",stat.pendingstardust.gt(g.stardust)?"big _stardust":"big _stardust_dark");
	d.display("button_stardust",unlocked("Stardust")?"inline-block":"none");
	d.innerHTML("span_stardustExoticMatterReq",stardustExoticMatterReqText());
	d.class("button_stardustReset",stat.pendingstardust.gt(g.stardust)?"stardustResetButton":"lockedStardustResetButton");
	d.element("button_stardustReset").style.visibility=masteryRowsUnlocked(4)==2?"visible":"hidden";
	d.display("button_wormhole",unlocked("Hawking Radiation")?"inline-block":"none");
	d.class("button_wormholeReset",totalAxis("dark").gte((g.activeStudy==0)?1000:studies[g.activeStudy].goal())?"wormholeResetButton":"lockedStardustResetButton");
	d.element("button_wormholeReset").style.visibility=(unlocked("Hawking Radiation")||totalAxis("dark").gte(1000))?"visible":"hidden";
	d.innerHTML("button_wormholeReset",wormholeResetButtonText());
	if (tabOpen(["Main"])) {
		d.display("button_masteries",unlocked("Masteries")?"inline-block":"none");
	}
	if (tabOpen(["Main","tabAxis"])) {
		for (let i=0;i<8;i++) {
			let type = axisCodes[i];
			d.display("button_"+type+"Axis",(axisUnlocked()>i)?"inline-block":"none");
			d.class("button_"+type+"Axis",g.exoticmatter.gt(axisCost(type))?"axisbutton":"lockedaxisbutton");
			d.innerHTML("span_"+type+"AxisAmount",BEformat(g[type+"Axis"])+((stat["free"+type+"Axis"].gt(0))?(" + "+BEformat(stat["free"+type+"Axis"],2)):""));
			d.innerHTML("span_"+type+"AxisEffect",BEformat(stat[type+"AxisEffect"],[2,2,2,2,2,2,2,4][i]));
			d.innerHTML("span_"+type+"AxisCost",BEformat(axisCost(type)));
		}
		for (let name of empowerableAxis) {
			d.display("button_empowered"+name+"Axis",axisEmpowerment(name).gt(0)?"inline-block":"none");
			d.innerHTML("span_empowered"+name+"AxisAmount",BEformat(axisEmpowerment(name),2));
		}
		ProgressBar();
	}
	if (tabOpen(["Main","tabMasteries"])) {
		showMasteryInfo(shownMastery,1)
		d.innerHTML("span_masteryPower",BEformat(g.masteryPower));
		d.innerHTML("span_masteryPowerPerSec",BEformat(stat.masteryPowerPerSec));
		d.element("masteryContainer").style["padding-bottom"] = d.element("masteryPanel").clientHeight+"px"
		let list = Object.keys(masteryData)
		for (let num of list) {
			d.element("button_mastery"+num).style["background-color"] = MasteryE(num)?"rgba(0,255,0,0.3)":"rgba(128,128,128,0.2)"
			d.innerHTML("span_mastery"+num+"Boost",masteryBoost(num).eq(1)?"":(masteryBoost(num).mul(100).format(3)+"%"))
			d.innerHTML("span_mastery"+num+"Active",MasteryE(num)?"Active":"None")
		}
	}
	if (tabOpen(["Main","tabOfflineTime"])) {
		d.innerHTML("span_dilatedTime",timeFormat(g.dilatedTime))
		d.innerHTML("span_overclockSpeedupFactor",baseOverclockSpeedup().toPrecision(4))
		d.innerHTML("span_overclockCost",(baseOverclockSpeedup()>overclockSoftcap())?("<span class=\"big _time\">"+BEformat(baseOverclockSpeedup()-1,2)+"</span> → <span class=\"big _time2\">"+BEformat(overclockCost(),2)+"</span>"):("<span class=\"big _time\">"+BEformat(baseOverclockSpeedup()-1,2)+"</span>"))
		d.innerHTML("span_overclockCostScaling",(baseOverclockSpeedup()>overclockSoftcap())?("Overclock costs are much higher above "+overclockSoftcap().toPrecision(4)+"×"):"")
		d.innerHTML("button_overclockActive",overclockActive?"Disable Overclock":"Enable Overclock")
		d.element("button_overclockActive").style["background-color"] = overclockActive?"#000000":"#009900"
	}
	if (tabOpen(["Options","tabOptions"])) {
		d.innerHTML("colortheme",g.colortheme);
		d.innerHTML("darkstarBulk",g.darkstarBulk?"On":"Off");
		d.innerHTML("notation",g.notation);
		d.innerHTML("toggleAutosave",g.autosaveIsOn?"On":"Off");
		d.innerHTML("span_completedAchievementTiersShown",g.completedAchievementTiersShown?"Showing":"Hiding");
	}
	if (tabOpen(["Statistics"])) {
		d.display("button_previousPrestiges",unlocked("Stardust")?"inline-block":"none");
	}
	if (tabOpen(["Statistics","Main Statistics"])) {
		for (let i=0;i<mainStatistics.length;i++) {
			if (mainStatistics[i].condition()) {
				d.tr("mainStatRow"+i,true);
				d.innerHTML("mainStatValue"+i,mainStatistics[i].value());
			} else {
				d.tr("mainStatRow"+i,false);
			}
		}
	}
	if (tabOpen(["Statistics","Hidden Statistics"])) {
		for (let i=0;i<hiddenStatistics.length;i++) {
			if (hiddenStatistics[i].condition()) {
				d.tr("hiddenStatRow"+i,true);
				d.innerHTML("hiddenStatValue"+i,hiddenStatistics[i].value());
			} else {
				d.tr("hiddenStatRow"+i,false);
			}
		}
	}
	if (tabOpen(["Statistics","Stat Breakdown"])) {
		let categories = Object.keys(breakdownCategories)
		for (let i=0;i<categories.length;i++) {
			let display = breakdownCategories[categories[i]].contents.map(x => breakdownStats[x].visible()).reduce((x,y)=>x||y)
			d.display("button_SSBnav1_"+categories[i],display?"inline-block":"none")
		}
		let value
		let data = breakdownStats[activeBreakdownTab]
		for (let i=0;i<maximumSSBModifierLength;i++) {
			if (i>=activeBreakdownTabModifierLength) {
				d.tr("SSBtable_row"+i,false)
			} else {
				let next = data.modifiers[i];
				let oldvalue = value;
				value = next.func(value);
				let alwaysShow = (next.alwaysShow==undefined)?false:next.alwaysShow();
				let display = true;
				if (value.eq(oldvalue)&&!alwaysShow) display = false;
				if (i==0&&(value.eq(0)||value.eq(1))) display = false;
				if (i>=activeBreakdownTabModifierLength) display = false;
				d.tr("SSBtable_row"+i,display)
				if (display) {
					d.innerHTML("SSBtable_label"+i,next.label)
					d.innerHTML("SSBtable_text"+i,next.text())
					d.innerHTML("SSBtable_total"+i,value.format(data.precision))
				}
			}
		}
	}
	if (tabOpen(["Statistics","Previous Prestiges"])) {
		d.display("button_previousPrestige_wormholeTab",unlocked("Hawking Radiation")?"inline-block":"none")
		for (let i=1;i<11;i++) {
			let stardustExists = i<=g.previousStardustRuns.last10.length
			d.tr("last10StardustRuns_row"+i,stardustExists)
			if (stardustExists) {
				d.innerHTML("span_last10StardustRuns_time"+i,timeFormat(g.previousStardustRuns.last10[i-1].time))
				d.innerHTML("span_last10StardustRuns_gain"+i,BEformat(g.previousStardustRuns.last10[i-1].gain,2))
			}
			let wormholeExists = i<=g.previousWormholeRuns.last10.length
			d.tr("last10WormholeRuns_row"+i,wormholeExists)
			if (wormholeExists) {
				d.innerHTML("span_last10WormholeRuns_time"+i,timeFormat(g.previousWormholeRuns.last10[i-1].time))
				d.innerHTML("span_last10WormholeRuns_gain"+i,BEformat(g.previousWormholeRuns.last10[i-1].gain,2))
			}
		}
		let buildNodes = previousPrestige.buildListNodes
		for (let i=0;i<buildNodes.length;i++) buildNodes[i].innerHTML = previousPrestige.shownBuilds().join("/")+" builds"
		let stardustRuns = previousPrestige.stardustRunsStored
		for (let i=0;i<stardustRuns.length;i++) {
			if (stardustRuns[i].visibility()) {
				d.display("div_previousStardustRun"+i,"inline-block")
				d.innerHTML("span_previousStardustRun"+i+"_gain",BEformat(stardustRuns[i].location().gain,2))
				d.innerHTML("span_previousStardustRun"+i+"_time",timeFormat(stardustRuns[i].location().time))
			} else {
				d.display("div_previousStardustRun"+i,"none")
			}
		}
		let wormholeRuns = previousPrestige.wormholeRunsStored
		for (let i=0;i<wormholeRuns.length;i++) {
			if (wormholeRuns[i].visibility()) {
				d.display("div_previousWormholeRun"+i,"inline-block")
				d.innerHTML("span_previousWormholeRun"+i+"_gain",BEformat(wormholeRuns[i].location().gain,2))
				d.innerHTML("span_previousWormholeRun"+i+"_time",timeFormat(wormholeRuns[i].location().time))
				d.innerHTML("span_previousWormholeRun"+i+"_efficiency",rateFormat(wormholeRuns[i].location().efficiency))
			} else {
				d.display("div_previousWormholeRun"+i,"none")
			}
		}
	}
	if (tabOpen(["Stardust"])) {
		d.display("button_darkmatter",(g.stardustUpgrades[4]>0)?"inline-block":"none");
		d.display("button_energy",(g.stardustUpgrades[4]>1)?"inline-block":"none");
	}
	if (tabOpen(["Stardust","Stardust Boosts"])) {
		d.innerHTML("span_stardustBoost1Value",stardustBoost(1).format(2));
		d.innerHTML("span_stardustBoost2Value",stardustBoost(2).sub(1).mul(100).format(2));
		d.innerHTML("span_stardustBoost3Value",stardustBoost(3).sub(1).mul(100).format(2));
		d.innerHTML("span_stardustBoost4Value",stardustBoost(4).format(3));
		d.innerHTML("span_stardustBoost5Value",stardustBoost(5).format(2));
		d.innerHTML("span_stardustBoost6Value",stardustBoost(6).sub(1).mul(100).format(2));
		d.innerHTML("span_stardustBoost7Value",stardustBoost(7).format(4));
		d.innerHTML("span_stardustBoost8Value",stardustBoost(8).sub(1).mul(100).format(2));
		d.innerHTML("span_stardustBoost9Value",stardustBoost(9).format(3));
		d.innerHTML("span_stardustBoost10Value",stardustBoost(10).format(4));
		d.innerHTML("span_stardustBoost11Value",stardustBoost(11).format(2));
		d.innerHTML("span_stardustBoost12Value",stardustBoost(12).format(4));
		d.innerHTML("span_stardustBoost4Tooltip",g.masteryPower.add(1).pow(stardustBoost(4)).format(2));
		d.innerHTML("span_stardustBoost5Tooltip",stardustBoost(5).pow(g.XAxis).format(2));
		d.innerHTML("span_stardustBoost7Tooltip",stardustBoost(7).pow(stardustBoost7Exp()).format(2))
		d.innerHTML("span_stardustBoost7FakeExp",g.truetimeThisStardustReset.gt(1e6)?Decimal.log(stardustBoost7Exp(),g.truetimeThisStardustReset).format(4):"0.5");
		/* Stardust boost table */ for (let i=3;i<13;i++) d.display("div_stardustBoost"+i,((g.stardustUpgrades[2]>(i-3))?"inline-block":"none"));
		/* Stardust upgrade buttons */
		for (let i=1;i<6;i++) {
			d.class("button_stardustUpgrade"+i,(g.stardustUpgrades[i-1]==stardustUpgradeCap(i))?"maxedstardustupgradebutton":stardustUpgradeCost(i).lte(g.stardust)?"stardustupgradebutton":"lockedaxisbutton")
			d.innerHTML("span_stardustUpgrade"+i+"Tooltip",(g.stardustUpgrades[i-1]==stardustUpgradeCap(i))?(stardustUpgradeNames[i]+" Path has been maxed"):(stardustUpgradeTooltip[i]()+"<br><br>Cost: "+stardustUpgradeCost(i).format(0)+" stardust"))
			d.innerHTML("span_stardustUpgrade"+i+"Level",g.stardustUpgrades[i-1])
			d.display("button_stardustUpgrade"+i,((g.stardustUpgrades[i-1]<stardustUpgradeCap(i))||g.showingCappedStardustUpgrades)?"inline-block":"none")
		}
	}
	if (tabOpen(["Achievements"])) {
		d.display("button_wormholeMilestones",achievement.ownedInTier(5)>0?"inline-block":"none");
	}
	if (tabOpen(["Achievements","Wormhole Milestones"])) {
		let owned = wormholeMilestoneList.map(x => achievement.ownedInTier(5)>=x[0]?1:0).reduce((x,y)=>x+y)
		for (let i=0;i<wormholeMilestoneList.length;i++) {
			d.display("div_wormholeMilestone"+wormholeMilestoneList[i][0],i<owned?"inline-block":"none")
		}
		d.innerHTML("span_wormholeMilestone9Effect",wormholeMilestone9Effect().format(4))
		d.innerHTML("span_wormholeMilestone18Effect",timeFormat(wormholeMilestone18Effect()))
		d.innerHTML("span_wormholeMilestone27Effect",wormholeMilestone27Effect().format(2))
		d.innerHTML("span_nextWormholeMilestone",(owned<wormholeMilestoneList.length)?("At "+wormholeMilestoneList[owned][0]+" achievements: "+wormholeMilestoneText(wormholeMilestoneList[owned][0])):"")
	}
	if (tabOpen(["Stardust","Stars"])) {
		d.innerHTML("span_starCost",BEformat(starCost()));
		for (let i=11;i<15;i++) d.innerHTML("span_star"+i+"Effect",starEffect(i).format(2))
		for (let i=61;i<64;i++) d.innerHTML("span_star"+i+"Effect",starEffect(60).format(2))
		d.innerHTML("span_star64Effect",starEffect(64).format(3))
		for (let i=71;i<75;i++) d.innerHTML("span_star"+i+"Effect",starEffect(i).format(2))
		for (let i=91;i<95;i++) d.innerHTML("span_star"+i+"Effect",starEffect(90).format(2))
		d.innerHTML("span_unspentStars",BEformat(unspentStars())+" / "+BEformat(g.stars));
		d.display("button_maxFullStarRows",[1,2,3,4,5,6,7,8,9,10].map(x => maxStars(x)).includes(4)?"inline-block":"none");
		d.innerHTML("span_nextStarRow",g.stars>=40?"":("The next star you buy will go in row <span class=\"big _stars\">"+starRow(g.stars+1)+"</span>"));
		let starRowsShown = Array.from(new Set(Array(40).fill(0).map((x,index) => starRow(index+1)))).slice(0,Math.min(g.stars+1,40)).sort(function(a,b){return a-b})
		for (let row=1;row<11;row++) {
			d.tr("starRow"+row,starRowsShown.includes(row))
			for (let col=1;col<5;col++) {
				let num = row*10+col
				let classname = StarE(num)?("ownedstarbutton"+row):availableStarRow(row)?"availablestarbutton":"lockedstarbutton"
				d.class("button_star"+num,"starbutton "+classname)
			}
		}
	}
	if (tabOpen(["Stardust","Dark Matter"])) {
		d.innerHTML("span_darkmatter",BEformat(g.darkmatter));
		d.innerHTML("span_baseDarkMatterGain",breakdownStats.darkmatterPerSec.modifiers[1].func(breakdownStats.darkmatterPerSec.modifiers[0].func()).format(2));
		d.innerHTML("span_darkMatterFreeAxis1",BEformat(darkMatterFreeAxis(1).pow(-1).max(1),2));
		d.innerHTML("span_darkMatterFreeAxis2",BEformat(darkMatterFreeAxis(1).max(1),2));
		d.innerHTML("span_darkmatterPerSec",BEformat(stat.darkmatterPerSec));
		d.class("button_darkstar",totalAxis("dark").gte(darkStarReq())?"darkstarbutton":"lockeddarkstarbutton");
		let effect3diff = darkStarEffect3(realDarkStars().add(1)).sub(darkStarEffect3());
		let darkStarButtonText = (achievement.ownedInTier(5)<7?"Reset dark matter to gain ":"Gain ")+((totalAxis("dark").gte(darkStarReq()))?(maxAffordableDarkStars().sub(g.darkstars).format(0)+" dark stars"):"a dark star");
		darkStarButtonText += "<br>(Progress"+(totalAxis("dark").gte(darkStarReq())?" to next":"")+": "+totalAxis("dark").format(0)+" / "+darkStarReq(maxAffordableDarkStars().max(g.darkstars)).format(0)+" dark axis)<br><br>"+darkStarEffectHTML();
		d.innerHTML("span_darkstars",BEformat(g.darkstars)+((realDarkStars().neq(g.darkstars))?("<span class=\"small\"> (effective "+BEformat(realDarkStars(),3)+")</span>"):""));
		d.innerHTML("button_darkstar",darkStarButtonText);
		for (let i=0;i<8;i++) {
			let type = axisCodes[i];
			d.class("button_dark"+type+"Axis",g.darkmatter.gt(darkAxisCost(type))?"darkaxisbutton":"lockedaxisbutton");
			d.innerHTML("span_dark"+type+"AxisAmount",BEformat(g["dark"+type+"Axis"])+((stat["freedark"+type+"Axis"].gt(0))?(" + "+BEformat(stat["freedark"+type+"Axis"],2)):""));
			d.innerHTML("span_dark"+type+"AxisEffect",BEformat(stat["dark"+type+"AxisEffect"],[2,2,2,3,2,3,2,4][i]));
			d.innerHTML("span_dark"+type+"AxisCost",BEformat(darkAxisCost(type)));
			let v1 = realDarkStars();
			let v2 = realDarkStars(maxAffordableDarkStars().max(g.darkstars.add(1)));
			d.innerHTML("span_darkStarEffect2"+type,Decimal.eq(darkStarEffect2Level(type,v1),darkStarEffect2Level(type,v2))?(darkStarEffect2Level(type,v1).mul(10).format(4)+"%"):(darkStarEffect2Level(type,v1).mul(10).format(4)+"% → "+darkStarEffect2Level(type,v2).mul(10).format(4)+"%"));
		}
		d.innerHTML("span_darkUAxisEffectAlt",stat.darkUAxisEffect.pow(totalAxis("dark")).format(3))
		for (let name of empowerableDarkAxis) {
			d.display("button_empoweredDark"+name+"Axis",axisEmpowerment("dark"+name).gt(0)?"inline-block":"none");
			d.innerHTML("span_empoweredDark"+name+"AxisAmount",BEformat(axisEmpowerment("dark"+name),2));
		}
	}
	if (tabOpen(["Stardust","Energy"])) {
		energyHTML();
	}
	if (tabOpen(["Automation"])) {
		for (let id of Object.keys(autobuyers)) { // Autobuyer stuff
			d.display(id+"Autobuyer",autobuyers[id].unlockReq()?"inline-block":"none");
			d.class("button_"+id+"AutobuyerToggle",g[id+"AutobuyerOn"]?"automatortoggleon":"automatortoggleoff");
			d.innerHTML("button_"+id+"AutobuyerToggle",g[id+"AutobuyerOn"]?"On":"Off");
			d.innerHTML("span_"+id+"AutobuyerInterval",timeFormat(autobuyerMeta.interval(id)));
			d.display("button_"+id+"AutobuyerUpgrade",g[id+"AutobuyerUpgrades"]==autobuyerMeta.cap(id)?"none":"inline-block");
			d.innerHTML("span_"+id+"AutobuyerCost",autobuyerMeta.cost(id).format(2));
		}
		d.tr("span_wormholeMilestone2",achievement.ownedInTier(5)>=2);
		d.display("wormholeMilestone5",achievement.ownedInTier(5)>=5?"inline-block":"none");
		d.display("stardustAutomator",achievement.ownedInTier(5)>=8?"inline-block":"none");
		d.display("wormholeAutomator",achievement.ownedInTier(5)>=12?"inline-block":"none");
		d.innerHTML("button_stardustAutomatorMode",g.stardustAutomatorMode);
		d.innerHTML("button_wormholeAutomatorMode",g.wormholeAutomatorMode);
		d.class("button_starAllocatorToggle",g.starAllocatorOn?"automatortoggleon":"automatortoggleoff");
		d.innerHTML("button_starAllocatorToggle",g.starAllocatorOn?"On":"Off");
		d.class("button_stardustAutomatorToggle",g.stardustAutomatorOn?"automatortoggleon":"automatortoggleoff");
		d.innerHTML("button_stardustAutomatorToggle",g.stardustAutomatorOn?"On":"Off");
		d.class("button_wormholeAutomatorToggle",g.wormholeAutomatorOn?"automatortoggleon":"automatortoggleoff");
		d.innerHTML("button_wormholeAutomatorToggle",g.wormholeAutomatorOn?"On":"Off");
		// input storage
		for (let i=0;i<8;i++) {
			g.axisAutobuyerCaps[i]=d.element("axisAutobuyerMax"+axisCodes[i]).value;
			g.darkAxisAutobuyerCaps[i]=d.element("darkAxisAutobuyerMax"+axisCodes[i]).value;
		}
		g.darkAxisAutobuyerCaps[12]=d.element("darkAxisAutobuyerMaxStars").value;
		g.starAutobuyerCap=d.element("starAutobuyerMax").value;
	}
	if (tabOpen(["Wormhole"])) {
		d.display("button_studiesTab",unlocked("Studies")?"inline-block":"none");
	}
	if (tabOpen(["Wormhole","Research"])) {
		d.innerHTML("span_discoveryDisplay",BEformat(unspentDiscoveries())+" / "+BEformat(g.totalDiscoveries));
		d.innerHTML("span_discoveryKnowledgeReq",BEformat(nextDiscovery()));
		d.innerHTML("span_knowledge",BEformat(g.knowledge));
		d.innerHTML("span_knowledgeEffect",BEformat(knowledgeEffect(),3));
		d.innerHTML("span_knowledgePerSec",BEformat(stat.knowledgePerSec,2));
		d.element("researchContainer").style["padding-bottom"] = d.element("discoveryPanel").clientHeight+"px"
		d.element("button_researchRespec").style["background-color"] = g.researchRespec?"rgba(128,255,204,0.75)":"rgba(179,204,255,0.75)";
		d.element("button_buyMaxResearch").style["background-color"] = g.buyMaxResearch?"rgba(255,204,128,0.75)":"rgba(179,204,255,0.75)";
		if (showingResearchLoadouts) {
			for (let i=0;i<9;i++) d.class("div_researchLoadout"+(i+1),researchLoadoutSelected==(i+1)?"researchLoadoutSelected":"researchLoadout")
		}
		for (let i=1;i<5;i++) d.innerHTML("span_observeCost"+i,BEformat(observationCost(i)));
	}
}
function tick(time) {                                                                     // The game loop, which consists of functions that run automatically. Frame rate is 20fps
	updateStats()


	// Mastery section


	// Options & Display section
	d.element("storyTitle").style = "text-decoration:underline;font-size:100px;background:-webkit-repeating-linear-gradient("+(45*Math.sin(Number(new Date()/1e4)))+"deg,#f00,#ff0 4%,#0f0 8.5%,#0ff 12.5%,#00f 16.5%,#f0f 21%,#f00 25%);-webkit-background-clip:text;-webkit-text-fill-color: transparent;";
	unlockFeature("Masteries",g.XAxis.gt(0));
	unlockFeature("Dark Matter",g.stardustUpgrades[4]>0);
	unlockFeature("Energy",g.stardustUpgrades[4]>1);
	if (totalAxis("dark").gte(1000)&&!g.storySnippets.includes("Black hole")) openStory("Black hole");
	g.timePlayed+=time;
	o.add("truetimePlayed",stat.tickspeed.mul(time));
	g.timeThisStardustReset+=time;
	o.add("truetimeThisStardustReset",stat.tickspeed.mul(time));
	g.timeThisWormholeReset+=time;
	o.add("truetimeThisWormholeReset",stat.tickspeed.mul(time));
	g.timeThisSpacetimeReset+=time;
	o.add("truetimeThisSpacetimeReset",stat.tickspeed.mul(time));
	g.timeLeft=Number(new Date());

	d.glow("button_mainaxis",tabGlow("Axis"));
	d.glow("button_masteries",tabGlow("Masteries"));
	d.glow("button_stardustBoosts",tabGlow("Stardust Boosts"));
	d.glow("button_stars",tabGlow("Stars"));
	d.glow("button_darkmatter",tabGlow("Dark Matter"));
	d.glow("button_research",tabGlow("Research"));
	d.glow("button_main",["Axis","Masteries"].map(x => tabGlow(x)).includes(true));
	d.glow("button_automation",tabGlow("Automation"));
	d.glow("button_stardust",["Stardust Boosts","Stars","Dark Matter"].map(x => tabGlow(x)).includes(true));
	d.glow("button_wormhole",["Research"].map(x => tabGlow(x)).includes(true));
	
	d.element("notify").style.opacity = Math.max(0,Math.min(1,1-(Number(new Date())-notify_fade)/1e3));
	if (d.element("notify").style.opacity == 0) d.innerHTML("notify","");


	// Achievement section
	for (let ach of gameloopAchievements) addAchievement(ach);
	for (let ach of luckyGameloopAchievements) if (Math.random()<achievement(ach).chance(time)) addAchievement(ach);
	lagAchievementTicks = (deltatime>1)?(lagAchievementTicks+1):0;
	fpsAchievementTicks = (deltatime==0.05)?(fpsAchievementTicks+1):0;


	// Automation section
	if ((g.stardustUpgrades[1] > 0) && (g.axisAutobuyerOn)) axisAutobuyerProgress+=time/autobuyerMeta.interval("axis");
	if (axisAutobuyerProgress > 1) {
		buyMaxAxis(g.axisAutobuyerCaps);
		axisAutobuyerProgress%=1;
	}
	if (achievement.ownedInTier(5)>=1 && (g.darkAxisAutobuyerOn)) darkAxisAutobuyerProgress+=time/autobuyerMeta.interval("darkAxis");
	if (darkAxisAutobuyerProgress > 1) {
		buyMaxDarkAxis(g.darkAxisAutobuyerCaps);
		if (achievement.ownedInTier(5)>=2) gainDarkStar(g.darkAxisAutobuyerCaps[12]);
		darkAxisAutobuyerProgress%=1;
	}
	if (achievement.ownedInTier(5)>=3 && g.stardustUpgradeAutobuyerOn) stardustUpgradeAutobuyerProgress+=time/autobuyerMeta.interval("stardustUpgrade");
	if (stardustUpgradeAutobuyerProgress > 1) {
		for (let i=0;i<g.stardustUpgrades.length;i++) if (g.stardustUpgrades[i]<stardustUpgradeCap(i+1)) buyStardustUpgrade(i+1)
		stardustUpgradeAutobuyerProgress%=1;
	}
	if (achievement.ownedInTier(5)>=4 && (g.starAutobuyerOn || g.starAllocatorOn)) starAutobuyerProgress+=time/autobuyerMeta.interval("star");
	if (starAutobuyerProgress > 1) {
		if (g.starAutobuyerOn) {while (starCost().lt(g.stardust)&&g.stars<(g.starAutobuyerCap=="u"?Infinity:Number(g.starAutobuyerCap))) buyStar();}
		if (unspentStars()>0&&g.starAllocatorOn&&(g.ownedStars.length<g.starAllocatorBuild.length)) for (let i of g.starAllocatorBuild) buyStarUpgrade(i);
		starAutobuyerProgress%=1;
	}
	if (achievement.ownedInTier(5)>=8 && g.stardustAutomatorOn) {
		let doReset = false;
		let mode = stardustAutomatorModes.indexOf(g.stardustAutomatorMode)
		if (mode == 0) doReset = stat.pendingstardust.gte(g.stardustAutomatorValue);
		else if (mode == 1) doReset = g.timeThisStardustReset>=Number(g.stardustAutomatorValue);
		else if (mode == 2) doReset = stat.pendingstardust.gte(g.stardust.mul(g.stardustAutomatorValue));
		else if (mode == 3) doReset = stat.pendingstardust.gte(g.stardust.pow(g.stardustAutomatorValue));
		else throw "g.wormholeAutomatorModes has invalid value \""+g.stardustAutomatorMode+"\""
		if (doReset) stardustReset("normal");
	}
	g.stardustAutomatorValue=d.element("stardustAutomatorValue").value;
	if (achievement.ownedInTier(5)>=12 && g.wormholeAutomatorOn) {
		let doReset = false;
		let mode = wormholeAutomatorModes.indexOf(g.wormholeAutomatorMode)
		if (mode == 0) doReset = stat.pendinghr.gte(g.wormholeAutomatorValue);
		else if (mode == 1) doReset = g.timeThisWormholeReset>=Number(g.wormholeAutomatorValue);
		else if (mode == 2) doReset = stat.pendinghr.gte(g.hawkingradiation.mul(g.wormholeAutomatorValue));
		else if (mode == 3) doReset = stat.pendinghr.gte(g.hawkingradiation.pow(g.wormholeAutomatorValue));
		else throw "g.wormholeAutomatorModes has invalid value \""+g.wormholeAutomatorMode+"\""
		if (doReset) wormholeReset("normal");
	}
	g.wormholeAutomatorValue=d.element("wormholeAutomatorValue").value;
	
	
	// Dark Matter section
	if (ironWill()) g.ach505Progress = g.ach505Progress.max(totalAxis("dark"));


	// Research section
	g.totalDiscoveries=discoveriesFromKnowledge().floor().max(g.totalDiscoveries);


	// Incrementer section - this comes last because otherwise resets don't work properly
	incrementExoticMatter(stat.exoticmatterPerSec.mul(time));
	g.exoticmatter = g.exoticmatter.max(stat.exoticmatterPerSec.mul(AchievementE(112)?60:AchievementE(111)?30:AchievementE(110)?15:0));
	if (unlocked("Masteries")) {
		o.add("baseMasteryPowerGain",deltaBaseMasteryPowerGain().mul(time));
		o.add("masteryPower",stat.masteryPowerPerSec.mul(time));
	}
	if (achievement.ownedInTier(5)==30&&g.activeStudy==0) incrementStardust(stat.pendingstardust.sub(g.stardust).max(0));
	if (achievement.ownedInTier(5)>=10) incrementStardust(stat.tickspeed.mul(time));
	if (g.stardustUpgrades[4]>0) o.add("darkmatter",stat.darkmatterPerSec.mul(time));
	for (let i=0;i<6;i++) {
		if (energyTypesUnlocked()>i) o.mul(energyTypes[i]+"Energy",energyPerSec(i).pow(time));
		else g[energyTypes[i]+"Energy"]=N(1);
	}
	if (unlocked("Hawking Radiation")) o.add("knowledge",stat.knowledgePerSec.mul(time));

	if (g.autosaveIsOn && savecounter > 0) save();
}
function auto_tick() {
	oldframetime=newframetime;
	newframetime=new Date().getTime();
	deltatime=Math.max(0,(newframetime-oldframetime)/1000);
	getRealOverclockSpeedup()
	tick(deltatime*overclockSpeedupFactor);
	updateHTML();
	timeSinceGameOpened+=deltatime;
}