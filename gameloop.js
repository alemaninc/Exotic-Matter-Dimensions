"use strict";
function updateHTML() {
	if (wormholeAnimationActive) {
		if (Date.now()-wormholeAnimationStart>16000) {
			wormholeReset();
			d.display("wormholeAnimation","none");
			wormholeAnimationActive=false;
		} else if (Date.now()-wormholeAnimationStart>8000) {
			unlockFeature("Hawking Radiation",true);
			d.display("wormholeAnimation","inline-block");
			d.element("wormholeAnimation").style.opacity = 2-(Date.now()-wormholeAnimationStart)/8000;
		} else {
			d.display("wormholeAnimation","inline-block");
			d.element("wormholeAnimation").style.opacity = (Date.now()-wormholeAnimationStart)/8000;
		}
	}
	updateTopResourceModal();
	d.innerHTML("span_pendingstardust",stat.pendingstardust.sub(g.stardust).max(0).floor().format());
	d.class("span_pendingstardust",stat.pendingstardust.gt(g.stardust)?"big _stardust":"big _stardust_dark");
	d.innerHTML("span_stardustExoticMatterReq",stardustExoticMatterReqText());
	d.class("button_stardustReset",stat.pendingstardust.gt(g.stardust)?"stardustResetButton":"lockedStardustResetButton");
	d.element("button_stardustReset").style.visibility=(masteryData[42].req()?"visible":"hidden");
	d.class("button_wormholeReset",stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)?"wormholeResetButton":"lockedStardustResetButton");
	d.element("button_wormholeReset").style.visibility=(unlocked("Hawking Radiation")||stat.totalDarkAxis.gte(1000))?"visible":"hidden";
	d.innerHTML("button_wormholeReset",wormholeResetButtonText());
	let showFooter = (g.footerDisplay=="All tabs")?true:(g.footerDisplay=="Only Axis tab")?(activeTab=="main"&&activeSubtabs.main=="axis"):(g.footerDisplay=="None")?false:undefined
	d.display("footer",showFooter?"inline-block":"none")
	if (showFooter) ProgressBar()
	for (let tab of tabList) {
		if (tabVisibility[tab]()) {
			d.display("button_bigtab_"+tab,"inline-block")
			let tabGlow = false
			for (let subtab of subtabList[tab]) {
				let subtabButton = "button_subtab_"+tab+"_"+subtab
				d.display(subtabButton,subtabProperties[tab][subtab].visible()?"inline-block":"none")
				if (subtabProperties[tab][subtab].glow()) {
					tabGlow = true
					d.glow(subtabButton,true)
				} else {
					d.glow(subtabButton,false)
				}
			}
			d.glow("button_bigtab_"+tab,tabGlow)
		} else {
			d.display("button_bigtab_"+tab,"none")
		}
	}
	if (activeTab=="main") {
		if (StudyE(1)) {if (activeSubtabs.main!=="offlineTime") openSubTab("main","offlineTime")};
		if (activeSubtabs.main=="axis") {
			d.display("div_exoticmatter_disabledTop",g.topResourcesShown.exoticmatter?"none":"inline-block")
			if (!g.topResourcesShown.exoticmatter) {
				d.innerHTML("span_exoticmatter_disabledTop",g.exoticmatter.format())
				d.innerHTML("span_exoticmatterPerSec_disabledTop",stat.exoticmatterPerSec.noLeadFormat(2))
			}
			d.innerHTML("span_affordableAxis",axisCodes.slice(0,g.stardustUpgrades[0]+4).map(x=>maxAffordableAxis(x).sub(g[x+"Axis"])).sumDecimals().format())
			for (let i=0;i<8;i++) {
				let type = axisCodes[i];
				d.display("button_"+type+"Axis",(stat.axisUnlocked>i)?"inline-block":"none");
				if (stat.axisUnlocked>i) {
					d.class("button_"+type+"Axis",g.exoticmatter.gt(stat[type+"AxisCost"])?"axisbutton":"lockedaxisbutton");
					if (Decimal.eq(g[type+"Axis"],stat["real"+type+"Axis"])) {
						d.display("span_real"+type+"Axis","none")
					} else {
						d.display("span_real"+type+"Axis","inline-block")
						d.innerHTML("span_real"+type+"Axis","Effective: "+stat["real"+type+"Axis"].noLeadFormat(2));
					}
					d.innerHTML("span_"+type+"AxisAmount",BEformat(g[type+"Axis"])+((stat["free"+type+"Axis"].gt(c.d0))?(" + "+stat["free"+type+"Axis"].noLeadFormat(2)):""));
					d.innerHTML("span_"+type+"AxisEffect",stat[type+"AxisEffect"].noLeadFormat([2,2,2,2,2,2,2,4][i]));
					d.innerHTML("span_"+type+"AxisCost",BEformat(stat[type+"AxisCost"]));
				}
			}
			for (let name of empowerableAxis) {
				d.display("button_empowered"+name+"Axis",stat["empowered"+name+"Axis"].gt(c.d0)?"inline-block":"none");
				d.innerHTML("span_empowered"+name+"AxisAmount",stat["empowered"+name+"Axis"].noLeadFormat(2));
			}
		} else if (activeSubtabs.main=="masteries") {
			showMasteryInfo(shownMastery,1)
			for (let i of ["div","br"]) d.display(i+"_masteryPower_disabledTop",g.topResourcesShown.masteryPower?"none":"inline-block")
			if (!g.topResourcesShown.masteryPower) {
				d.innerHTML("span_masteryPower_disabledTop",g.masteryPower.format())
				d.innerHTML("span_masteryPowerPerSec_disabledTop",stat.masteryPowerPerSec.format(2))
			}
			for (let i=1;i<=totalMasteryRows;i++) d.tr("masteryRow"+i+g.masteryContainerStyle,stat["masteryRow"+i+"Unlocked"]>0)
			let list = Object.keys(masteryData)
			if (g.masteryContainerStyle == "Legacy") {
				for (let i of list) {
					d.display("button_mastery"+i+"Legacy",(stat["masteryRow"+Math.floor(i/10)+"Unlocked"]&&((masteryData[i].req==undefined)?true:masteryData[i].req()))?"inline-block":"none")
					d.element("button_mastery"+i+"Legacy").style["background-color"] = MasteryE(i)?"rgba(0,255,0,0.9)":"rgba(204,204,204,0.9)"
					d.innerHTML("span_mastery"+i+"BoostLegacy",masteryBoost(i).eq(c.d1)?"":(masteryBoost(i).mul(c.e2).noLeadFormat(3)+"%"))
					d.innerHTML("span_mastery"+i+"ActiveLegacy",MasteryE(i)?"Active":"Inactive")
					d.innerHTML("span_mastery"+i+"TextLegacy",masteryText(i))
				}
			} else if (g.masteryContainerStyle == "Modern") {
				for (let i of list) {
					d.display("button_mastery"+i+"Modern",(stat["masteryRow"+Math.floor(i/10)+"Unlocked"]&&((masteryData[i].req==undefined)?true:masteryData[i].req()))?"inline-block":"none")
					d.element("button_mastery"+i+"Modern").style["background-color"] = MasteryE(i)?"rgba(0,255,0,0.3)":"rgba(128,128,128,0.2)"
					d.innerHTML("span_mastery"+i+"BoostModern",masteryBoost(i).eq(c.d1)?"":(masteryBoost(i).mul(c.e2).noLeadFormat(3)+"%"))
					d.innerHTML("span_mastery"+i+"ActiveModern",MasteryE(i)?"Active":"Inactive")
				}
				d.element("masteryContainerModern").style["padding-bottom"] = d.element("masteryPanel").clientHeight+"px"
			} else {
				g.masteryContainerStyle = "Legacy"
			}
		} else if (activeSubtabs.main=="offlineTime") {
			g.dilationPower = Number(d.element('dilationSpeedupFactor').value)
			d.innerHTML("span_dilatedTime",timeFormat(g.dilatedTime))
			d.innerHTML("span_overclockSpeedupFactor",N(stat.baseOverclockSpeedup).noLeadFormat(3))
			d.innerHTML("span_overclockCost",N(stat.overclockCost).noLeadFormat(3))
			d.class("span_overclockCost",stat.baseOverclockSpeedup>stat.overclockSoftcap?"big _time2":"big _time")
			d.innerHTML("span_overclockCostScaling",(stat.baseOverclockSpeedup>stat.overclockSoftcap)?("Overclock costs are much higher above "+N(stat.overclockSoftcap).noLeadFormat(3)+"×"):"")
			d.innerHTML("button_overclockActive",overclockActive?"Disable Overclock":"Enable Overclock")
			d.element("button_overclockActive").style["background-color"] = overclockActive?"#000000":""
			d.display("button_overclockToSoftcap",dilationUpgrades[1].effect()>stat.overclockSoftcap?"inline-block":"none")
			d.innerHTML("button_freezeGame",gameFrozen?"Unfreeze time":"Freeze time")
			d.element("button_freezeGame").style["background-color"] = gameFrozen?"#000033":""
			d.element("button_freezeGame").style["color"] = gameFrozen?"#00ffff":""
			d.element("button_freezeGame").style["border-color"] = gameFrozen?"#00ffff":""
			if (g.dilationUpgradesUnlocked>0) {
				d.display("div_dilationUpgrades","inline-block")
				for (let i=1;i<5;i++) {
					if (g.dilationUpgradesUnlocked>=i) {
						d.display("div_dilationUpgrade"+i,"inline-block")
						d.innerHTML("span_dilationUpgrade"+i+"Effect",(g.dilationUpgrades[i]<dilationUpgrades[i].cap)?arrowJoin(dilationUpgrades[i].effectFormat(g.dilationUpgrades[i]),dilationUpgrades[i].effectFormat(g.dilationUpgrades[i]+1)):dilationUpgrades[i].effectFormat(g.dilationUpgrades[i]))
						d.innerHTML("span_dilationUpgrade"+i+"Cost",(g.dilationUpgrades[i]==dilationUpgrades[i].cap)?"Maxed":("Cost: "+timeFormat(dilationUpgrades[i].cost())+" of dilated time"))
						d.element("div_dilationUpgrade"+i).style["filter"] = "brightness("+((g.dilationUpgrades[i]==dilationUpgrades[i].cap)?50:(dilationUpgrades[i].cost()<g.dilatedTime)?100:80)+"%)"
					} else {
						d.display("div_dilationUpgrade"+i,"none")
					}
				}
			} else {
				d.display("div_dilationUpgrades","none")
			}
			if (achievement.ownedInTier(5)>19) {
				d.display("div_timeLoop","inline-block")
				d.innerHTML("span_wormholeAmplificationMult",wormholeAmplificationMultiplier())
				d.innerHTML("span_wormholeAmplificationCost",BEformat(N(wormholeAmplificationCost()),2))
			} else {
				d.display("div_timeLoop","none")
			}
		}
	} else if (activeTab=="options") {
		if (activeSubtabs.options=="options") {
			d.innerHTML("colortheme",g.colortheme);
			d.innerHTML("notation",g.notation);
			d.innerHTML("toggleAutosave",g.autosaveIsOn?"On":"Off");
			d.innerHTML("button_footerDisplay",dictionary(g.footerDisplay,[["All tabs","Showing footer in all tabs"],["Only Axis tab","Only showing footer in Axis tab"],["None","Hiding footer"]]))
			d.innerHTML("span_newsTickerActive",g.newsTickerActive?"en":"dis")
			d.innerHTML("span_newsTickerSpeed",g.newsTickerSpeed)
		} else if (activeSubtabs.options=="hotkeys") {
			for (let name in hotkeys.hotkeyList) {
				let hotkey = hotkeys.hotkeyList[name]
				if (hotkey.visible()) {
					d.display("button_hotkey_"+name,"inline-block")
					d.innerHTML("span_hotkey_"+name,formatHotkey(g.hotkeys[name]))
				} else {
					d.display("button_hotkey_"+name,"none")
				}
			}
		}
	} else if (activeTab=="statistics") {
		d.display("button_subtab_statistics_previousPrestiges",unlocked("Stardust")?"inline-block":"none");
		if (activeSubtabs.statistics=="mainStatistics") {
			for (let i=0;i<mainStatistics.length;i++) {
				if (mainStatistics[i].condition()) {
					d.tr("mainStatRow"+i,true);
					d.innerHTML("mainStatValue"+i,mainStatistics[i].value());
				} else {
					d.tr("mainStatRow"+i,false);
				}
			}
		} else if (activeSubtabs.statistics=="hiddenStatistics") {
			for (let i=0;i<hiddenStatistics.length;i++) {
				if (hiddenStatistics[i].condition()) {
					d.tr("hiddenStatRow"+i,true);
					d.innerHTML("hiddenStatValue"+i,hiddenStatistics[i].value());
				} else {
					d.tr("hiddenStatRow"+i,false);
				}
			}
		} else if (activeSubtabs.statistics=="largeNumberVisualization") {
			d.innerHTML("span_largeNumberVisualizationRequirement",BEformat(c.e10))
			for (let i=0;i<largeNumberVisualizationVariables.length;i++) {
				if (largeNumberVisualizationVariables[i].value().gt(c.e10)) {
					d.display("div_largeNumberVisualization"+i,"inline-block")
					d.innerHTML("span_largeNumberVisualization"+i+"Value",largeNumberVisualizationVariables[i].value().format(2))
					d.innerHTML("span_largeNumberVisualization"+i+"Comparison",visualiseLargeNumber(largeNumberVisualizationVariables[i].value()))
				} else {
					d.display("div_largeNumberVisualization"+i,"none")
				}
			}
		} else if (activeSubtabs.statistics=="statBreakdown") {
			let categories = Object.keys(breakdownCategories)
			for (let i of categories) {
				let display = breakdownCategories[i].contents.map(x => miscStats[x].visible()).reduce((x,y)=>x||y)
				d.display("button_SSBnav1_"+i,display?"inline-block":"none")
			}
			if (breakdownCategories[activeBreakdownSection].contents.length>1) for (let i of breakdownCategories[activeBreakdownSection].contents) {
				d.display("button_SSBnav2_"+i,miscStats[i].visible()?"inline-block":"none")
			}
			let value
			let data = miscStats[activeBreakdownTab]
			for (let i=0;i<maximumSSBModifierLength;i++) {
				if (i>=activeBreakdownTabModifierLength) {
					d.tr("SSBtable_row"+i,false)
				} else {
					let next = data.modifiers[i];
					let oldvalue = value;
					value = next.func(oldvalue);
					let display = true;
					if (i>0) if (value.eq(oldvalue)) display = false;
					if (i==0&&(value.eq(c.d0)||value.eq(c.d1))) display = false;
					if (next.show !== undefined) display = next.show()
					d.tr("SSBtable_row"+i,display)
					if (display) {
						d.innerHTML("SSBtable_label"+i,next.label)
						d.innerHTML("SSBtable_text"+i,next.text(oldvalue))
						d.innerHTML("SSBtable_total"+i,value.format(data.precision))
					}
				}
			}
		} else if (activeSubtabs.statistics=="previousPrestiges") {
			d.display("button_previousPrestige_wormholeTab",unlocked("Hawking Radiation")?"inline-block":"none")
			for (let i=1;i<11;i++) {
				let stardustExists = i<=g.previousStardustRuns.last10.length
				d.tr("last10StardustRuns_row"+i,stardustExists)
				if (stardustExists) {
					d.innerHTML("span_last10StardustRuns_time"+i,timeFormat(g.previousStardustRuns.last10[i-1].time))
					d.innerHTML("span_last10StardustRuns_gain"+i,BEformat(g.previousStardustRuns.last10[i-1].gain))
				}
				let wormholeExists = i<=g.previousWormholeRuns.last10.length
				d.tr("last10WormholeRuns_row"+i,wormholeExists)
				if (wormholeExists) {
					d.innerHTML("span_last10WormholeRuns_time"+i,timeFormat(g.previousWormholeRuns.last10[i-1].time))
					d.innerHTML("span_last10WormholeRuns_gain"+i,BEformat(g.previousWormholeRuns.last10[i-1].gain))
				}
			}
			for (let i of previousPrestige.buildListNodes) i.innerHTML = previousPrestige.shownBuilds().join("/")+" builds"
			let stardustRuns = previousPrestige.stardustRunsStored
			for (let i=0;i<stardustRuns.length;i++) {
				if (stardustRuns[i].visibility()) {
					d.display("div_previousStardustRun"+i,"inline-block")
					d.innerHTML("span_previousStardustRun"+i+"_gain",BEformat(stardustRuns[i].location().gain))
					d.innerHTML("span_previousStardustRun"+i+"_time",timeFormat(stardustRuns[i].location().time))
				} else {
					d.display("div_previousStardustRun"+i,"none")
				}
			}
			let wormholeRuns = previousPrestige.wormholeRunsStored
			for (let i=0;i<wormholeRuns.length;i++) {
				if (wormholeRuns[i].visibility()) {
					d.display("div_previousWormholeRun"+i,"inline-block")
					d.innerHTML("span_previousWormholeRun"+i+"_gain",BEformat(wormholeRuns[i].location().gain))
					d.innerHTML("span_previousWormholeRun"+i+"_time",timeFormat(wormholeRuns[i].location().time))
					d.innerHTML("span_previousWormholeRun"+i+"_efficiency",rateFormat(wormholeRuns[i].location().efficiency))
				} else {
					d.display("div_previousWormholeRun"+i,"none")
				}
			}
		}
	}
	if (activeTab=="achievements") {
		d.display("button_subtab_achievements_secretAchievements",(totalSecretAchievements>0)?"inline-block":"none");
		d.display("button_subtab_achievements_wormholeMilestones",achievement.ownedInTier(5)>0?"inline-block":"none");
		if (activeSubtabs.achievements=="mainAchievements") {
			for (let i of Object.keys(achievementList)) d.innerHTML("span_perTier"+i+"AchievementReward",achievement.perAchievementReward[i].value())
		} else if (activeSubtabs.achievements=="wormholeMilestones") {
			d.innerHTML("span_wormholeMilestoneT5Achievements",achievement.ownedInTier(5))
			let tier5achs = achievement.ownedInTier(5)
			let nextMilestoneNum = achievement.ownedInTier(5)==30?undefined:Object.keys(wormholeMilestoneList).filter(x=>x>tier5achs)[0]
			let nextMilestone = achievement.ownedInTier(5)==30?undefined:wormholeMilestoneList[nextMilestoneNum]
			for (let i in wormholeMilestoneList) {
				d.display("div_wormholeMilestone"+i,tier5achs>=Number(i)?"inline-block":"none")
			}
			d.innerHTML("span_wormholeMilestone9Effect",stat.wormholeMilestone9Effect.format(4))
			d.innerHTML("span_wormholeMilestone18Effect",timeFormat(wormholeMilestone18Effect()))
			d.innerHTML("span_wormholeMilestone27Effect",wormholeMilestone27Effect().format(2))
			d.innerHTML("span_nextWormholeMilestone",(achievement.ownedInTier(5)==30)?"":("At "+nextMilestoneNum+" achievements: "+(nextMilestone.text??nextMilestone.static)))
		}
	}
	if (activeTab=="stardust") {
		if (StudyE(1)) openTab("wormhole");
		d.display("div_stardust_disabledTop",g.topResourcesShown.stardust?"none":"inline-block")
		if (!g.topResourcesShown.stardust) d.innerHTML("span_stardust_disabledTop",g.stardust.format())
		if (activeSubtabs.stardust=="stardustBoosts") {
			for (let i=1;i<3+g.stardustUpgrades[2];i++) d.innerHTML("span_stardustBoost"+i+"Value",showFormulas?showStardustBoostFormula[i]():formatStardustBoost(i))
			for (let i of [2,3,6,8]) d.innerHTML("span_stardustBoost"+i+"Tooltip",(stat["stardustBoost"+i].gte(c.d10)||showFormulas)?"×":"%")
			d.innerHTML("span_stardustBoost4Tooltip",g.masteryPower.add(c.d1).pow(stat.stardustBoost4).format(2));
			d.innerHTML("span_stardustBoost5Tooltip",stat.stardustBoost5.pow(g.XAxis).format(2));
			d.innerHTML("span_stardustBoost7Tooltip",stat.stardustBoost7.pow(stardustBoost7Exp()).format(2))
			d.innerHTML("span_stardustBoost7FakeExp",stardustBoost7IsSoftcapped()?Decimal.log(stardustBoost7Exp(),g.truetimeThisStardustReset).format(4):"0.5");
			/* Stardust boost table */ for (let i=3;i<13;i++) d.display("div_stardustBoost"+i,((g.stardustUpgrades[2]>(i-3))?"inline-block":"none"));
			/* Stardust upgrade buttons */
			for (let i=1;i<6;i++) {
				d.class("button_stardustUpgrade"+i,((g.stardustUpgrades[i-1]==stat["stardustUpgrade"+i+"Cap"])||g.confirmations.buyStardustUpgrade)?"maxedstardustupgradebutton":stat["stardustUpgrade"+i+"Cost"].lte(g.stardust)?"stardustupgradebutton":"lockedaxisbutton")
				d.innerHTML("span_stardustUpgrade"+i+"Tooltip",(g.stardustUpgrades[i-1]==stat["stardustUpgrade"+i+"Cap"])?(stardustUpgradeNames[i]+" Path has been maxed"):(stardustUpgradeTooltip[i]()+"<br><br>Cost: "+stat["stardustUpgrade"+i+"Cost"].format(0)+" stardust"))
				d.innerHTML("span_stardustUpgrade"+i+"Level",g.stardustUpgrades[i-1])
				d.display("button_stardustUpgrade"+i,((g.stardustUpgrades[i-1]<stat["stardustUpgrade"+i+"Cap"])||g.showingCappedStardustUpgrades)?"inline-block":"none")
			}
		} else if (activeSubtabs.stardust=="stars") {
			d.display("starContainerLegacy",g.starContainerStyle=="Legacy"?"inline-block":"none")
			d.display("starContainerModern",g.starContainerStyle=="Modern"?"inline-block":"none")
			d.innerHTML("span_starCost",BEformat(starCost()));
			let rowsShown = starRowsShown()
			if (g.starContainerStyle=="Legacy") {
				for (let i of dynamicStars) {if (rowsShown.includes(Math.floor(i/10))) {d.innerHTML("span_star"+i+"EffectLegacy",showFormulas?formulaFormat(showStarEffectFormula(i)):formatStarEffect(i))}}
			}
			for (let row=1;row<11;row++) {
				d.tr("starRow"+row+g.starContainerStyle,rowsShown.includes(row))
				d.innerHTML("span_row"+row+"StarsAvailable"+g.starContainerStyle,maxStars(row)-[1,2,3,4].map(x=>g.star[x+10*row]?1:0).sum())
				for (let col=1;col<5;col++) {
					let num = row*10+col
					let classname = g.star[num]?("ownedstarbutton"+row):availableStarRow(row)?"availablestarbutton":"lockedstarbutton"
					d.class("button_star"+num+g.starContainerStyle,["starbutton",classname,g.starContainerStyle.toLowerCase()].join(" "))
					if (g.starActivityShown) d.innerHTML("span_star"+num+"Active"+g.starContainerStyle,g.star[num]?"Active":"Inactive")
				}
			}
			d.innerHTML("span_unspentStars",unspentStars()+" / "+g.stars);
			d.display("button_maxFullStarRows",[1,2,3,4,5,6,7,8,9,10].map(x => maxStars(x)).includes(4)?"inline-block":"none");
			d.innerHTML("span_nextStarRow",g.stars>=40?"":("The next star you buy will go in row <span class=\"big _stars\">"+starRow(g.stars+1)+"</span>"));
			d.element("starContainerModern").style["padding-bottom"] = d.element("starPanel").clientHeight+"px"
		} else if (activeSubtabs.stardust=="darkMatter") {
			d.display("div_darkMatterUnlocked",g.stardustUpgrades[4]==0?"none":"inline-block")
			d.display("div_darkMatterLocked",g.stardustUpgrades[4]==0?"inline-block":"none")
			if (g.stardustUpgrades[4]!==0) {
				for (let i of ["div","br"]) d.display(i+"_darkmatter_disabledTop",g.topResourcesShown.darkmatter?"none":"inline-block")
				if (!g.topResourcesShown.darkmatter) {
					d.innerHTML("span_darkmatter_disabledTop",g.darkmatter.format())
					d.innerHTML("span_darkmatterPerSec_disabledTop",stat.darkmatterPerSec.format(2))
				}
				d.innerHTML("span_affordableDarkAxis",axisCodes.slice(0,g.stardustUpgrades[0]+4).map(x=>maxAffordableDarkAxis(x).sub(g["dark"+x+"Axis"])).sumDecimals().format())
				d.innerHTML("span_baseDarkMatterGain",miscStats.darkmatterPerSec.modifiers[1].func(miscStats.darkmatterPerSec.modifiers[0].func()).format(2));
				d.innerHTML("span_darkMatterFreeAxis1",stat.darkMatterFreeAxis.gt(1)?"1":BEformat(stat.darkMatterFreeAxis.pow(-1).max(1),2));
				d.innerHTML("span_darkMatterFreeAxis2",stat.darkMatterFreeAxis.lt(1)?"1":BEformat(stat.darkMatterFreeAxis.max(1),2));
				d.class("button_darkstar",stat.totalDarkAxis.gte(stat.darkStarReq)?"darkstarbutton":"lockeddarkstarbutton");
				let effect3diff = darkStarEffect3(stat.realDarkStars.add(c.d1)).sub(stat.darkStarEffect3);
				let darkStarButtonText = (achievement.ownedInTier(5)<7?"Reset dark matter to gain ":"Gain ")+((stat.totalDarkAxis.gte(stat.darkStarReq)&&g.darkstarBulk)?(stat.maxAffordableDarkStars.sub(g.darkstars).format(0)+" dark stars"):"a dark star");
				if (showFormulas) darkStarButtonText += " (Need "+darkStarReqFormula()+" total dark axis)"
				else darkStarButtonText += "<br>(Progress"+(stat.totalDarkAxis.gte(stat.darkStarReq)?" to next":"")+": "+stat.totalDarkAxis.format(0)+" / "+darkStarReq(stat.maxAffordableDarkStars.max(g.darkstars)).format(0)+" dark axis)"
				darkStarButtonText += "<br><br>"+darkStarEffectHTML();
				d.innerHTML("span_darkstars",BEformat(g.darkstars)+((stat.realDarkStars.neq(g.darkstars))?("<span class=\"small\"> (effective "+stat.realDarkStars.noLeadFormat(3)+")</span>"):""));
				d.innerHTML("button_darkstar",darkStarButtonText);
				for (let i=0;i<8;i++) {
					let type = axisCodes[i];
					d.display("button_dark"+type+"Axis",(4+g.stardustUpgrades[0]>i)?"inline-block":"none")
					if (4+g.stardustUpgrades[0]>i) {
						d.class("button_dark"+type+"Axis",g.darkmatter.gt(stat["dark"+type+"AxisCost"])?"darkaxisbutton":"lockedaxisbutton");
						if (Decimal.eq(g["dark"+type+"Axis"],stat["realdark"+type+"Axis"])) {
							d.display("span_realdark"+type+"Axis","none")
						} else {
							d.display("span_realdark"+type+"Axis","inline-block")
							d.innerHTML("span_realdark"+type+"Axis","Effective: "+stat["realdark"+type+"Axis"].noLeadFormat(2));
						}
						d.innerHTML("span_dark"+type+"AxisAmount",BEformat(g["dark"+type+"Axis"])+((stat["freedark"+type+"Axis"].gt(0))?(" + "+BEformat(stat["freedark"+type+"Axis"],2)):""));
						d.innerHTML("span_dark"+type+"AxisEffect",stat["dark"+type+"AxisEffect"].noLeadFormat([2,2,2,3,2,3,2,4][i]));
						d.innerHTML("span_dark"+type+"AxisCost",BEformat(stat["dark"+type+"AxisCost"]));
					}
					let v1 = stat.realDarkStars;
					let v2 = realDarkStars(stat.maxAffordableDarkStars.max(g.darkstars.add(c.d1)));
					d.innerHTML("span_darkStarEffect2"+type,showFormulas?darkStarEffect2LevelFormula(type):(Decimal.eq(darkStarEffect2Level(type,v1),darkStarEffect2Level(type,v2))?(darkStarEffect2Level(type,v1).mul(c.d10).noLeadFormat(4)+"%"):arrowJoin(darkStarEffect2Level(type,v1).mul(c.d10).noLeadFormat(4)+"%",+darkStarEffect2Level(type,v2).mul(c.d10).noLeadFormat(4)+"%")));
				}
				d.innerHTML("span_darkUAxisEffectAlt",stat.darkUAxisEffect.pow(stat.totalDarkAxis).format(3))
				for (let name of empowerableDarkAxis) {
					d.display("button_empoweredDark"+name+"Axis",stat["empoweredDark"+name+"Axis"].gt(0)?"inline-block":"none");
					d.innerHTML("span_empoweredDark"+name+"AxisAmount",BEformat(stat["empoweredDark"+name+"Axis"],2));
				}
			}
		} else if (activeSubtabs.stardust=="energy") {
			for (let i=0;i<energyTypes.length;i++) {
				if (energyTypesUnlocked()>i) {
					d.display(energyTypes[i]+"EnergyDiv","inline-block");
					d.innerHTML(energyTypes[i]+"EnergyAmount",g[energyTypes[i]+"Energy"].format(2));
					d.innerHTML(energyTypes[i]+"EnergyPerSec",energyPerSec(i).format(2));
					d.innerHTML(energyTypes[i]+"EnergyEffect",energyEffect(i).format(4));
					if (i<6) {d.display("span_"+energyTypes[i]+"EnergyResetLayer",g.studyCompletions[3]>0?"inline-block":"none")}
				} else {
					d.display(energyTypes[i]+"EnergyDiv","none");
				}
			}
			d.display("div_energyLocked",energyTypesUnlocked()==0?"inline-block":"none")
		}
	}
	if (activeTab=="automation") {
		if (StudyE(1)) openTab("wormhole")
		for (let id of Object.keys(autobuyers)) { // Autobuyer stuff
			d.display(id+"Autobuyer",autobuyers[id].unlockReq()?"inline-block":"none");
			d.class("button_"+id+"AutobuyerToggle",g[id+"AutobuyerOn"]?"automatortoggleon":"automatortoggleoff");
			d.innerHTML("button_"+id+"AutobuyerToggle",g[id+"AutobuyerOn"]?"On":"Off");
			d.innerHTML("span_"+id+"AutobuyerInterval",timeFormat(autobuyerMeta.interval(id)));
			d.display("button_"+id+"AutobuyerUpgrade",g[id+"AutobuyerUpgrades"]>=autobuyerMeta.cap(id)?"none":"inline-block");
			d.element("button_"+id+"AutobuyerUpgrade").style["background-color"]=autobuyerMeta.cost(id).gt(g[autobuyers[id].resource])?"#b2b2b2":"#cccccc";
			d.innerHTML("span_"+id+"AutobuyerCost",autobuyerMeta.cost(id).format(2));
		}
		d.tr("tr_darkAxisAutobuyerMaxStars",achievement.ownedInTier(5)>=2);
		d.display("wormholeMilestone5",achievement.ownedInTier(5)>=5?"inline-block":"none");
		if (achievement.ownedInTier(5)>=6) {d.display("button_lockManualStardustUpgrades","inline-block");d.innerHTML("button_lockManualStardustUpgrades","Manual buying of stardust upgrades "+(g.confirmations.buyStardustUpgrade?"dis":"en")+"abled")}
		else {d.display("button_lockManualStardustUpgrades","none")}
		d.display("stardustAutomator",achievement.ownedInTier(5)>=8?"inline-block":"none");
		d.display("wormholeAutomator",achievement.ownedInTier(5)>=12?"inline-block":"none");
		d.innerHTML("button_stardustAutomatorMode",stardustAutomatorModes[g.stardustAutomatorMode]??"Amount of stardust");
		d.innerHTML("button_wormholeAutomatorMode",wormholeAutomatorModes[g.wormholeAutomatorMode]??"Amount of HR");
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
		for (let i=0;i<5;i++) g.stardustUpgradeAutobuyerCaps[i]=d.element("stardustUpgradeAutobuyerMax"+(i+1)).value
		g.starAutobuyerCap=d.element("starAutobuyerMax").value;
	}
	if (activeTab=="wormhole") {
		d.display("div_hr_disabledTop",g.topResourcesShown.hr?"none":"inline-block")
		if (!g.topResourcesShown.hr) d.innerHTML("span_hr_disabledTop",g.hawkingradiation.format())
		if (activeSubtabs.wormhole=="research") {
			d.innerHTML("span_discoveryDisplay",unspentDiscoveries().format()+" / "+g.totalDiscoveries.format());
			d.innerHTML("span_discoveryKnowledgeReq",showFormulas?formulaFormat("10<sup>(D + 1)"+formulaFormat.mult(stat.extraDiscoveries_mul.recip())+formulaFormat.add(stat.extraDiscoveries_add.neg())+"</sup>"):nextDiscovery().format());
			d.innerHTML("span_knowledge",g.knowledge.format());
			d.innerHTML("span_knowledgeEffect",showFormulas?formulaFormat(formulaFormat.convSoftcap("log<sup>[2]</sup>(K + 10) × 10",stat.knowledgeEffectCap.mul(c.d0_75),stat.knowledgeEffectCap,Decimal.div(stat.knowledgeEffect,stat.knowledgeEffectCap).gt(c.d0_75))):stat.knowledgeEffect.format(3));
			d.innerHTML("span_knowledgePerSec",stat.knowledgePerSec.format(2));
			d.element("researchContainer").style["padding-bottom"] = d.element("discoveryPanel").clientHeight+"px"
			for (let i=0;i<4;i++) {
				d.element("button_observation"+i).style["background-color"] = g[observationResources[i]].gte(observationCost(i))?"rgba(179,204,255,0.75)":"rgba(128,153,204,0.75)"
				d.innerHTML("span_observeCost"+i,BEformat(observationCost(i)));
			}
			d.element("button_researchRespec").style["background-color"] = g.researchRespec?"rgba(128,255,204,0.75)":"rgba(179,204,255,0.75)";
			d.element("button_buyMaxResearch").style["background-color"] = g.buyMaxResearch?"rgba(255,204,128,0.75)":"rgba(179,204,255,0.75)";
			if (showingResearchLoadouts) {
				for (let i=0;i<9;i++) d.class("div_researchLoadout"+(i+1),researchLoadoutSelected==(i+1)?"researchLoadoutSelected":"researchLoadout")
			}
			let visible = visibleResearch()
			for (let i of buyableResearch) d.element("button_research_"+i+"_visible").style.filter = "brightness("+(darkenResearch(i,visible)?50:100)+"%)"
		} else if (activeSubtabs.wormhole=="studies") {
			for (let i of visibleStudies()) {
				d.innerHTML("span_study"+i+"Description",studies[i].description())
				d.innerHTML("button_study"+i,studyButtons.text(i))
				d.class("button_study"+i,"studyButton "+studyButtons.class(i))
				d.innerHTML("span_study"+i+"Reward",studies[i].reward_desc().join("<br><br>"));
			}
		} else if (activeSubtabs.wormhole=="light") {
			d.innerHTML("span_chromaPerSec",stat.chromaPerSec.format(2))
			d.innerHTML("span_unspentStarsLight",g.stars)
			d.innerHTML("span_baseChroma",stat.chromaGainBase.pow(g.stars-60).noLeadFormat(2))
			d.display("lightContainer2",lightTiersUnlocked()>1?"inline-block":"none")
			d.display("lightContainer3",lightTiersUnlocked()>2?"inline-block":"none")
			for (let i=0;i<[0,3,6,8,9][lightTiersUnlocked()];i++) {
				let name = lightNames[i]
				d.innerHTML("span_"+name+"Chroma",g.chroma[i].format())
				d.innerHTML("span_"+name+"Lumens",g.lumens[i].format())
				d.innerHTML("span_"+name+"LumenReq",lumenReq(i).format())
				d.innerHTML("span_"+lightNames[i]+"LightEffect",showFormulas?formulaFormat(lightEffect[i].formula()):i==5?lightCache.currentEffect[5].length:g.showLightEffectsFrom0?lightEffect[i].format(lightCache.currentEffect[i]):arrowJoin(lightEffect[i].format(lightCache.currentEffect[i]),lightEffect[i].format(lightCache.nextEffect[i])))
				d.element("button_"+name+"ChromaGen").style["background-color"]=(g.activeChroma==i)?"#000000":""
				if (i>2) {
					d.innerHTML("button_"+name+"ChromaGen",((g.activeChroma==i)?"Stop converting":"Convert")+" "+stat.chromaPerSec.mul(chromaCostFactor(i)).format(2)+" "+lightComponents[i].map(x=>lightNames[x]).joinWithAnd()+" chroma to "+stat.chromaPerSec.format(2)+" "+lightNames[i]+" chroma per second")
				} else {
					d.innerHTML("button_"+name+"ChromaGen",((g.activeChroma==i)?"Stop generating":"Generate")+" "+stat.chromaPerSec.format(2)+" "+lightNames[i]+" chroma per second")
				}
			}
			d.innerHTML("span_greenLightBoost",arrowJoin(lightCache.currentEffect[1].pow(g.SAxis).format(2),lightCache.nextEffect[1].pow(g.SAxis).format(2)))
			if (lightTiersUnlocked()>1) {
				d.innerHTML("span_cyanLightBoost",arrowJoin(researchEffect(7,5).mul(totalAchievements).add(c.d1).pow(lightCache.currentEffect[3].mul(stat.observationEffect)).format(2),researchEffect(7,5).mul(totalAchievements).add(c.d1).pow(lightCache.nextEffect[3].mul(stat.observationEffect)).format(2)))
				d.innerHTML("span_magentaLightBoost",arrowJoin(stat.masteryTimer.pow(lightCache.currentEffect[4]).format(2),stat.masteryTimer.pow(lightCache.nextEffect[4]).format(2)))
				d.innerHTML("button_reviewYellowLight0",g.lumens[5].gte(c.d200)?"See currently affected":"See next effect")
				d.innerHTML("span_cyanLightSign",lightCache.currentEffect[3].gte(c.d10)?"×":"%")
			}
			if (lightTiersUnlocked()>2) {
				d.innerHTML("span_blackLightSign",g.lumens[7].gte(c.d25)?"×":"%")
			}
		} else if (activeSubtabs.wormhole=="galaxies") {
			d.innerHTML("span_galaxies",g.galaxies)
			d.innerHTML("span_galaxyPlural",g.galaxies==1?"y":"ies")
			d.innerHTML("span_highestGalaxies",g.highestGalaxies)
			d.innerHTML("span_currentGalaxyStarCost",starCost(59).format())
			d.innerHTML("span_nextGalaxyStarCost",starCost(59,g.galaxies+1).format())
			d.innerHTML("span_currentGalaxyAffordableStars",affordableStars())
			d.innerHTML("span_nextGalaxyAffordableStars",affordableStars(g.galaxies+1))
			d.class("button_gainGalaxy","galaxyButton "+(g.stars==60?"active":"locked"))
			d.class("button_destroyGalaxies","galaxyButton "+(g.galaxies==0?"locked":"active"))
			for (let i=1;i<galaxyEffects.length;i++) {
				if (g.highestGalaxies+1>=galaxyEffects[i].req) {
					d.tr("tr_galaxyEffects"+i,true)
					d.innerHTML("span_galaxyBoost"+i,galaxyEffects[i].boost.text().replace("{}",showFormulas?textFormat(galaxyEffects[i].boost.formula(),"_galaxies"):arrowJoin(formatGalaxyEffect(i,"boost"),formatGalaxyEffect(i,"boost",g.galaxies+1))))
					d.innerHTML("span_galaxyPenalty"+i,galaxyEffects[i].penalty.text().replace("{}",showFormulas?textFormat(galaxyEffects[i].penalty.formula(),"_galaxies"):arrowJoin(formatGalaxyEffect(i,"penalty"),formatGalaxyEffect(i,"penalty",g.galaxies+1))))
				} else {
					d.tr("tr_galaxyEffects"+i,false)
				}
			}
			let tooltip = "All effects unlocked."
			for (let i=1;i<galaxyEffects.length;i++) if (g.highestGalaxies+1<galaxyEffects[i].req) {
				tooltip = "Next pair of effects at "+(galaxyEffects[i].req-1)+" galaxies"
				break
			}
			d.innerHTML("span_galaxyEffectTooltip",tooltip)
		} else if (activeSubtabs.wormhole=="luck") {
			d.innerHTML("span_luckShards",g.luckShards.format(2))
			d.innerHTML("span_luckShardsPerSec",stat.luckShardsPerSec.format(2))
			d.innerHTML("span_luckShardEff1",showFormulas?luckShardEffect1Formula():luckShardEffect1().format(2))
			d.innerHTML("span_luckShardEff2",showFormulas?luckShardEffect2Formula():luckShardEffect2().gt(c.d0_1)?c.d1.sub(luckShardEffect2()).mul(c.e2).format(2):luckShardEffect2().format(3))
			d.innerHTML("span_luckShardEff2Sign",luckShardEffect2().gt(c.d0_1)?"%":"×")
			for (let type of luckRuneTypes) {
				if (runeTypeUnlocked(type)) {
					d.tr("tr_"+type+"Runes",true)
					d.innerHTML("span_"+type+"Runes",unspentLuckRunes(type).format()+" / "+g.totalLuckRunes[type].format())
					d.innerHTML("span_affordable"+type+"Runes",affordableLuckRunes(type).max(c.d1).format())
					d.innerHTML("span_"+type+"RuneCost",luckRuneCost(type,affordableLuckRunes(type).max(c.d1)).noLeadFormat(2))
					for (let upg of luckUpgradeList[type]) {
						d.innerHTML("span_luckUpg_"+type+upg+"_Purchased",g.luckUpgrades[type][upg].format()+"<br>(+"+affordableLuckUpgrades(type,upg).format()+")")
						d.innerHTML("span_luckUpg_"+type+upg+"_Cost",luckUpgradeCost(type,upg).format())
						d.innerHTML("span_luckUpg_"+type+upg+"_Effect",showFormulas?luckUpgrades[type][upg].formula():arrowJoin(luckUpgrades[type][upg].format(luckUpgrades[type][upg].eff()),luckUpgrades[type][upg].format(luckUpgrades[type][upg].eff(Decimal.add(g.luckUpgrades[type][upg],affordableLuckUpgrades(type,upg).max(c.d1))))))
					}
				} else {
					d.tr("tr_"+type+"Runes",false)
				}
			}
		}
	}
	if (d.element("storyTitle")!==null) d.element("storyTitle").style = "background:-webkit-repeating-linear-gradient("+(45*Math.sin(Number(new Date()/1e4)))+"deg,#f00,#ff0 4%,#0f0 8.5%,#0ff 12.5%,#00f 16.5%,#f0f 21%,#f00 25%);-webkit-background-clip:text;";
}
function tick(time) {																																		 // The game loop, which consists of functions that run automatically. Frame rate is 20fps
	if (time==0) return // no point causing lag
	if (StudyE(3)&&(!overclockActive)) {
		let diff = time-0.05
		g.dilatedTime += diff
		time -= diff
	}
	for (let i=0;i<8;i++) if (g.chroma[i].gt(lumenReq(i))) {addLumens(i)}
	updateStats()

	// Dilation section
	if (g.dilationUpgradesUnlocked<4) if (stat.tickspeed.gt(dilationUpgrades[g.dilationUpgradesUnlocked+1].tickspeedNeeded)) unlockDilationUpgrade()


	// Mastery section


	// Options & Display section
	unlockFeature("Masteries",g.XAxis.gt(0));
	unlockFeature("Dark Matter",g.stardustUpgrades[4]>0);
	unlockFeature("Energy",g.stardustUpgrades[4]>1);
	if (stat.totalDarkAxis.gte(1000)&&!g.storySnippets.includes("Black hole")) openStory("Black hole");
	unlockFeature("Light",g.research.r8_8)
	unlockFeature("Galaxies",g.research.r12_8)
	g.timePlayed+=time;
	o.add("truetimePlayed",stat.tickspeed.mul(time));
	g.timeThisStardustReset+=time;
	o.add("truetimeThisStardustReset",stat.tickspeed.mul(time));
	g.timeThisWormholeReset+=time;
	o.add("truetimeThisWormholeReset",stat.tickspeed.mul(time));
	g.timeThisSpacetimeReset+=time;
	o.add("truetimeThisSpacetimeReset",stat.tickspeed.mul(time));


	// Achievement section
	for (let ach of achievementEvents.gameloop) addAchievement(ach);
	for (let ach of secretAchievementEvents.gameloop) addSecretAchievement(ach);
	for (let ach of secretAchievementEvents.luckyGameloop) if (Math.random()<secretAchievementList[ach].chance(time)) addSecretAchievement(ach);
	lagAchievementTicks = (deltatime>1)?(lagAchievementTicks+1):0;
	fpsAchievementTicks = ((deltatime==0.05)&&(!StudyE(3)))?(fpsAchievementTicks+1):0;
	if (stat.ironWill) g.ach505Progress = g.ach505Progress.max(stat.totalDarkAxis);
	if (stat.chromaPerSec.gte(c.d1)) g.ach711Progress = Math.min(g.ach711Progress,g.stars)
	
	
	// Dark Matter section


	// Research section
	g.totalDiscoveries=discoveriesFromKnowledge().floor().max(g.totalDiscoveries).fix(c.d0);


	// Study section
	if (g.activeStudy !== 0) if (!g.research[studies[g.activeStudy].research]) {
		popup({text:"You have been forcefully removed from Study "+g.activeStudy+" due to the presence of a bug. Sorry!",buttons:[["Close",""]]})
		g.activeStudy=0
	}


	// Incrementer section - this comes last because otherwise resets don't work properly
	for (let i=0;i<energyTypes.length;i++) {   // energy comes first to make Study III harder :D
		if (energyTypesUnlocked()>i) o.mul(energyTypes[i]+"Energy",energyPerSec(i).pow(time));
		else g[energyTypes[i]+"Energy"]=c.d1;
	}
	incrementExoticMatter(stat.exoticmatterPerSec.mul(time));
	g.exoticmatter = g.exoticmatter.max(stat.exoticmatterPerSec.mul(g.achievement[112]?c.d60:g.achievement[111]?c.d30:g.achievement[110]?c.d15:0)).fix(c.d0);
	if (unlocked("Masteries")) {
		o.add("baseMasteryPowerGain",deltaBaseMasteryPowerGain().mul(time));
		o.add("masteryPower",stat.masteryPowerPerSec.mul(time));
	}
	if (achievement.ownedInTier(5)==30&&g.activeStudy==0) incrementStardust(stat.pendingstardust.sub(g.stardust).max(0));
	if (achievement.ownedInTier(5)>=10) incrementStardust(stat.tickspeed.mul(time));
	if (g.stardustUpgrades[4]>0) o.add("darkmatter",stat.darkmatterPerSec.mul(time));
	if (unlocked("Hawking Radiation")) o.add("knowledge",stat.knowledgePerSec.mul(time));
	if (typeof g.activeChroma == "number") {
		if (lightComponents[g.activeChroma]==null) {
			g.chroma[g.activeChroma] = g.chroma[g.activeChroma].add(stat.chromaPerSec.mul(time)).fix(c.d0)
		} else {
			let spendFactor = lightComponents[g.activeChroma].map(i=>g.chroma[i]).reduce((x,y)=>x.min(y)).div([stat.chromaPerSec,N(time),chromaCostFactor(g.activeChroma)].productDecimals()).min(c.d1)
			if (spendFactor.eq(c.d0)) {
				g.activeChroma=null
			} else {
				for (let i of lightComponents[g.activeChroma]) g.chroma[i]=g.chroma[i].sub([stat.chromaPerSec,N(time),chromaCostFactor(g.activeChroma),spendFactor].productDecimals()).fix(c.d0)
				g.chroma[g.activeChroma] = g.chroma[g.activeChroma].add([stat.chromaPerSec,N(time),spendFactor].productDecimals()).fix(c.d0)
			}
		}
	}

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
		for (let i=1;i<=g.stardustUpgrades.length;i++) while ((g.stardustUpgrades[i-1]<(g.stardustUpgradeAutobuyerCaps[i-1]=="u"?stat["stardustUpgrade"+i+"Cap"]:Math.min(stat["stardustUpgrade"+i+"Cap"],g.stardustUpgradeAutobuyerCaps[i-1])))&&(g.stardust.gte(stat["stardustUpgrade"+i+"Cost"]))) buyStardustUpgrade(i)
		stardustUpgradeAutobuyerProgress%=1;
	}
	if (achievement.ownedInTier(5)>=4 && (g.starAutobuyerOn || g.starAllocatorOn)) starAutobuyerProgress+=time/autobuyerMeta.interval("star");
	if (starAutobuyerProgress > 1) {
		if (g.starAutobuyerOn) {while (starCost().lt(g.stardust)&&g.stars<(g.starAutobuyerCap=="u"?Infinity:Number(g.starAutobuyerCap))) buyStar();}
		if (unspentStars()>0&&g.starAllocatorOn&&(totalStars<g.starAllocatorBuild.length)) for (let i of g.starAllocatorBuild) buyStarUpgrade(i);
		starAutobuyerProgress%=1;
	}
	if (achievement.ownedInTier(5)>=8 && g.stardustAutomatorOn) {
		let doReset = false;
		let mode = g.stardustAutomatorMode
		if (mode == 0) {doReset = stat.pendingstardust.gte(g.stardustAutomatorValue)}
		else if (mode == 1) {doReset = g.timeThisStardustReset>=Number(g.stardustAutomatorValue)}
		else if (mode == 2) {doReset = stat.pendingstardust.gte(g.stardust.mul(g.stardustAutomatorValue))}
		else if (mode == 3) {doReset = stat.pendingstardust.gte(g.stardust.pow(g.stardustAutomatorValue))}
		else {
			if (achievement.ownedInTier(5)>=8) {popup({text:"Due to an error, stardust automator mode was reverted to the default value of amount of stardust."})}
			g.stardustAutomatorMode = 0
		}
		if (doReset) attemptStardustReset();
	}
	g.stardustAutomatorValue=d.element("stardustAutomatorValue").value;
	if (achievement.ownedInTier(5)>=12 && g.wormholeAutomatorOn) {
		let doReset = false;
		let mode = g.wormholeAutomatorMode
		if (mode == 0) {doReset = stat.pendinghr.gte(g.wormholeAutomatorValue)}
		else if (mode == 1) {doReset = g.timeThisWormholeReset>=Number(g.wormholeAutomatorValue)}
		else if (mode == 2) {doReset = stat.pendinghr.gte(g.hawkingradiation.mul(g.wormholeAutomatorValue))}
		else if (mode == 3) {doReset = stat.pendinghr.gte(g.hawkingradiation.pow(g.wormholeAutomatorValue))}
		else {
			if (achievement.ownedInTier(5)>=12) {popup({text:"Due to an error, wormhole automator mode was reverted to the default value of amount of HR."})}
			g.wormholeAutomatorMode = 0
		}
		if (doReset) attemptWormholeReset(false);
	}
	g.wormholeAutomatorValue=d.element("wormholeAutomatorValue").value;

	if (g.autosaveIsOn && savecounter > 0) save();
}
function auto_tick() {
	deltatime=Math.max(0,(Date.now()-olddelta)/1000);
	olddelta+=deltatime*1000
	getRealOverclockSpeedup()
	tick(deltatime*overclockSpeedupFactor);
	updateHTML();
	timeSinceGameOpened+=deltatime;
	g.timeLeft=Number(new Date());
}
var lastFineGrainFrame = Date.now()
var fineGrainDelta = 0
function fineGrainTick() {
	fineGrainDelta = Date.now()-lastFineGrainFrame
	lastFineGrainFrame += fineGrainDelta
	if (g.newsTickerActive) {
		d.display("newsticker","inline-block")
		d.element("newsticker").style["background-color"] = (Date.now()<newsSupport.interestingTickerActiveUntil)?("hsl("+((Date.now()*0.06)%360)+" 100% "+(Math.min(newsSupport.interestingTickerActiveUntil-Date.now(),1e4-(newsSupport.interestingTickerActiveUntil-Date.now()))/100)+"%)"):""
		d.element("newsline").style["color"] = (Date.now()<newsSupport.interestingTickerActiveUntil)?("hsl("+((Date.now()*0.06+180)%360)+" 100% 50%)"):""
		let transitionProgress = currentNewsOffset/(window.innerWidth+d.element("newsline").offsetWidth)
		if ((transitionProgress > 1)||(transitionProgress < 0)) {
			d.innerHTML("newsline",randomNewsItem())
			currentNewsOffset = transitionProgress>1?0:(window.innerWidth+d.element("newsline").offsetWidth)
			d.element("newsline").style.left = "calc(100vw - "+currentNewsOffset+"px)"
		} else {
			currentNewsOffset += g.newsTickerSpeed*fineGrainDelta*0.001*((Date.now()<newsSupport.interestingTickerActiveUntil)?Math.max((3*Math.sin(Date.now()/500)-1)*Math.tan(Date.now()/3000),-2):1)
			d.element("newsline").style.left = (currentNewsOffset<0)?"100vw":("calc(100vw - "+currentNewsOffset+"px)")
		}
	} else {
		d.display("newsticker","none")
	}
	let activeNotifications = document.getElementsByClassName("notification")
	for (let i=activeNotifications.length-1;i>=0;i--) {
		let element = activeNotifications[i]
		let timeSinceIn = Date.now()-element.dataset.in
		let timeSinceOut = Date.now()-element.dataset.out
		element.style.left = (timeSinceIn<500)?(((1-4.8e-3*timeSinceIn+5.6e-6*timeSinceIn**2)*element.offsetWidth)+"px"):(timeSinceOut>0)?((element.offsetWidth*(timeSinceOut/500)**2)+"px"):"0px"
		if (timeSinceOut>500) element.remove()
	}
}