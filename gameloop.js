"use strict";
function updateHTML() {
	if (wormholeAnimationActive) {
		if (Date.now()-wormholeAnimationStart>16000) {
			wormholeReset();
			d.display("wormholeAnimation","none");
			wormholeAnimationActive=false;
		} else if (Date.now()-wormholeAnimationStart>8000) {
			unlockFeature("Hawking Radiation");
			d.display("wormholeAnimation","inline-block");
			d.element("wormholeAnimation").style.opacity = 2-(Date.now()-wormholeAnimationStart)/8000;
		} else {
			d.display("wormholeAnimation","inline-block");
			d.element("wormholeAnimation").style.opacity = (Date.now()-wormholeAnimationStart)/8000;
		}
	}
	updateTopResourceModal();
	d.innerHTML("span_pendingstardust",stat.pendingstardust.sub(g.stardust).max(c.d0).floor().format());
	d.class("span_pendingstardust",stat.pendingstardust.gt(g.stardust)?"big _stardust":"big _stardust_dark");
	d.innerHTML("span_stardustExoticMatterReq",stardustExoticMatterReqText());
	d.class("button_stardustReset",stat.pendingstardust.gt(g.stardust)?"stardustResetButton":"lockedStardustResetButton");
	d.element("button_stardustReset").style.visibility=(masteryData[42].req()?"visible":"hidden");
	d.class("button_wormholeReset",stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)?"wormholeResetButton":"lockedStardustResetButton");
	d.element("button_wormholeReset").style.visibility=(unlocked("Hawking Radiation")||stat.totalDarkAxis.gte(c.e3))?"visible":"hidden";
	d.innerHTML("button_wormholeReset",wormholeResetButtonText());
	let showFooter = (g.footerDisplay==="All tabs")?true:(g.footerDisplay==="Only Axis tab")?(g.activeTab==="main"&&g.activeSubtabs.main==="axis"):(g.footerDisplay==="None")?false:undefined
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
	if (g.activeTab==="main") {
		if (StudyE(1)) {if (g.activeSubtabs.main!=="offlineTime") openSubTab("main","offlineTime")};
		if (g.activeSubtabs.main==="axis") {
			d.display("div_exoticmatter_disabledTop",g.topResourcesShown.exoticmatter?"none":"inline-block")
			if (!g.topResourcesShown.exoticmatter) {
				d.innerHTML("span_exoticmatter_disabledTop",g.exoticmatter.format())
				d.innerHTML("span_exoticmatterPerSec_disabledTop",stat.exoticmatterPerSec.noLeadFormat(2))
			}
			d.innerHTML("span_affordableAxis",axisCodes.slice(0,g.stardustUpgrades[0]+4).map(x=>maxAffordableAxis(x).sub(g[x+"Axis"]).max(c.d0)).sumDecimals().format())
			for (let i=0;i<8;i++) {
				let type = axisCodes[i];
				d.display("button_"+type+"Axis",(stat.axisUnlocked>i)?"inline-block":"none");
				if (stat.axisUnlocked>i) {
					d.class("button_"+type+"Axis","axisbutton "+(corruption.list.axis.isCorrupted(type)?"corrupted":g.exoticmatter.gt(stat[type+"AxisCost"])?"available":"locked"));
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
		} else if (g.activeSubtabs.main==="masteries") {
			showMasteryInfo(shownMastery,1)
			for (let i of ["div","br"]) d.display(i+"_masteryPower_disabledTop",g.topResourcesShown.masteryPower?"none":"inline-block")
			if (!g.topResourcesShown.masteryPower) {
				d.innerHTML("span_masteryPower_disabledTop",g.masteryPower.format())
				d.innerHTML("span_masteryPowerPerSec_disabledTop",stat.masteryPowerPerSec.format(2))
			}
			for (let i=1;i<=totalMasteryRows;i++) d.tr("masteryRow"+i+g.masteryContainerStyle,stat["masteryRow"+i+"Unlocked"]>0)
			let list = Object.keys(masteryData)
			if (g.masteryContainerStyle === "Legacy") {
				for (let i of list) {
					d.display("button_mastery"+i+"Legacy",(stat["masteryRow"+Math.floor(i/10)+"Unlocked"]&&((masteryData[i].req===undefined)?true:masteryData[i].req()))?"inline-block":"none")
					d.element("button_mastery"+i+"Legacy").style["background-color"] = MasteryE(i)?"rgba(0,255,0,0.9)":"rgba(204,204,204,0.9)"
					d.innerHTML("span_mastery"+i+"BoostLegacy",masteryBoost(i).eq(c.d1)?"":(masteryBoost(i).mul(c.e2).noLeadFormat(3)+"%"))
					d.innerHTML("span_mastery"+i+"ActiveLegacy",MasteryE(i)?"Active":"Inactive")
					d.innerHTML("span_mastery"+i+"TextLegacy",masteryText(i))
				}
			} else if (g.masteryContainerStyle === "Modern") {
				for (let i of list) {
					d.display("button_mastery"+i+"Modern",(stat["masteryRow"+Math.floor(i/10)+"Unlocked"]&&((masteryData[i].req===undefined)?true:masteryData[i].req()))?"inline-block":"none")
					d.element("button_mastery"+i+"Modern").style["background-color"] = MasteryE(i)?"rgba(0,255,0,0.3)":"rgba(128,128,128,0.2)"
					d.innerHTML("span_mastery"+i+"BoostModern",masteryBoost(i).eq(c.d1)?"":(masteryBoost(i).mul(c.e2).noLeadFormat(3)+"%"))
					d.innerHTML("span_mastery"+i+"ActiveModern",MasteryE(i)?"Active":"Inactive")
				}
				d.element("masteryContainerModern").style["padding-bottom"] = d.element("masteryPanel").clientHeight+"px"
			} else {
				g.masteryContainerStyle = "Legacy"
			}
		} else if (g.activeSubtabs.main==="offlineTime") {
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
						d.innerHTML("span_dilationUpgrade"+i+"Cost",(g.dilationUpgrades[i]===dilationUpgrades[i].cap)?"Maxed":("Cost: "+timeFormat(dilationUpgrades[i].cost())+" of dilated time"))
						d.element("div_dilationUpgrade"+i).style["filter"] = "brightness("+((g.dilationUpgrades[i]===dilationUpgrades[i].cap)?50:(dilationUpgrades[i].cost()<g.dilatedTime)?100:80)+"%)"
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
		} else if (g.activeSubtabs.main==="corruption") {
			for (let i of corruption.all) {
				if (corruption.list[i].visible()) {
					d.display("div_corruption_"+i,"inline-block")
					d.innerHTML("span_corruption_"+i+"_start",corruption.list[i].start().format())
					d.innerHTML("span_corruption_"+i+"_power",corruption.list[i].power().mul(c.e2).noLeadFormat(3)+"%")
					d.innerHTML("span_corruption_"+i+"_formula",corruption.formula(i))
				} else {
					d.display("div_corruption_"+i,"none")
				}
			}
		}
	} else if (g.activeTab==="options") {
		if (g.activeSubtabs.options==="options") {
			d.innerHTML("colortheme",g.colortheme);
			d.innerHTML("notation",g.notation);
			d.innerHTML("toggleAutosave",g.autosaveIsOn?"On":"Off");
			d.innerHTML("button_footerDisplay",dictionary(g.footerDisplay,[["All tabs","Showing footer in all tabs"],["Only Axis tab","Only showing footer in Axis tab"],["None","Hiding footer"]]))
			d.innerHTML("span_newsTickerActive",g.newsTickerActive?"en":"dis")
			d.innerHTML("span_newsTickerSpeed",g.newsTickerSpeed)
		} else if (g.activeSubtabs.options==="hotkeys") {
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
	} else if (g.activeTab==="statistics") {
		if (g.activeSubtabs.statistics==="mainStatistics") {
			for (let i=0;i<mainStatistics.length;i++) {
				if (mainStatistics[i].condition()) {
					d.tr("mainStatRow"+i,true);
					d.innerHTML("mainStatValue"+i,mainStatistics[i].value());
				} else {
					d.tr("mainStatRow"+i,false);
				}
			}
		} else if (g.activeSubtabs.statistics==="hiddenStatistics") {
			for (let i=0;i<hiddenStatistics.length;i++) {
				if (hiddenStatistics[i].condition()) {
					d.tr("hiddenStatRow"+i,true);
					d.innerHTML("hiddenStatValue"+i,hiddenStatistics[i].value());
				} else {
					d.tr("hiddenStatRow"+i,false);
				}
			}
		} else if (g.activeSubtabs.statistics==="largeNumberVisualization") {
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
		} else if (g.activeSubtabs.statistics==="statBreakdown") {
			let categories = Object.keys(breakdownCategories)
			for (let i of categories) {
				let display = breakdownCategories[i].contents.map(x => miscStats[x].visible()).reduce((x,y)=>x||y)
				d.display("button_SSBnav1_"+i,display?"inline-block":"none")
			}
			if (breakdownCategories[activeBreakdownSection].contents.length>1) {
				let lineBreaks = []
				for (let i of breakdownCategories[activeBreakdownSection].contents) {
					if (miscStats[i].newRow) lineBreaks.push(false)
					d.display("button_SSBnav2_"+i,miscStats[i].visible()?"inline-block":"none")
					if (miscStats[i].visible()&&lineBreaks.length>0) lineBreaks[lineBreaks.length-1] = true
				}
				let breakList = d.class("SSBnav2_br")
				for (let i=0;i<lineBreaks.length;i++) breakList[i].style.display = lineBreaks[i]?"inline-block":"none"
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
					if (i===0&&(value.eq(c.d0)||value.eq(c.d1))) display = false;
					if (next.show !== undefined) display = next.show()
					d.tr("SSBtable_row"+i,display)
					if (display) {
						d.element("SSBtable_row"+i).style.color=next.color??""
						d.innerHTML("SSBtable_label"+i,next.label)
						d.innerHTML("SSBtable_text"+i,next.text(oldvalue))
						d.innerHTML("SSBtable_total"+i,value.noLeadFormat(data.precision))
					}
				}
			}
		} else if (g.activeSubtabs.statistics==="previousPrestiges") {
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
				if (i===1) {
					d.tr("last10StardustRuns_row0",!stardustExists)
					d.tr("last10WormholeRuns_row0",!wormholeExists)
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
	if (g.activeTab==="achievements") {
		d.display("button_subtab_achievements_secretAchievements",(totalSecretAchievements>0)?"inline-block":"none");
		d.display("button_subtab_achievements_wormholeMilestones",achievement.ownedInTier(5)>0?"inline-block":"none");
		if (g.activeSubtabs.achievements==="mainAchievements") {
			for (let i of Object.keys(achievementList)) d.innerHTML("span_perTier"+i+"AchievementReward",achievement.perAchievementReward[i].value())
			for (let i of achievement.withMilestones) if (g.achievement[i]) {
				let fullCompletion = achievement(i).milestones()===achievement(i).maxMilestones
				d.element("div_achievement"+i).style["background-color"] = "rgba(0,"+(fullCompletion?"255,0":"204,204")+",0.5)"
				d.element("div_achievement"+i).style["border-color"] = "#00"+(fullCompletion?"ff00":"cccc")
			}
		} else if (g.activeSubtabs.achievements==="wormholeMilestones") {
			d.innerHTML("span_wormholeMilestoneT5Achievements",achievement.ownedInTier(5))
			let tier5achs = achievement.ownedInTier(5)
			let nextMilestoneNum = achievement.ownedInTier(5)===30?undefined:Object.keys(wormholeMilestoneList).filter(x=>x>tier5achs)[0]
			let nextMilestone = achievement.ownedInTier(5)===30?undefined:wormholeMilestoneList[nextMilestoneNum]
			let allUnlocked = tier5achs===30
 			for (let i in wormholeMilestoneList) {
				d.display("div_wormholeMilestone"+i,allUnlocked?"inline-block":(Number(nextMilestoneNum)>=Number(i))?"inline-block":"none")
				d.element("div_wormholeMilestone"+i).style.filter = allUnlocked?"":(nextMilestoneNum===i)?"brightness(50%)":""
			}
			d.innerHTML("span_wormholeMilestone9Effect",stat.wormholeMilestone9Effect.format(4))
			d.innerHTML("span_wormholeMilestone18Effect",timeFormat(wormholeMilestone18Effect()))
			d.innerHTML("span_wormholeMilestone27Effect",wormholeMilestone27Effect().format(2))
		}
	}
	if (g.activeTab==="stardust") {
		if (StudyE(1)) openTab("wormhole");
		d.display("div_stardust_disabledTop",g.topResourcesShown.stardust?"none":"inline-block")
		if (!g.topResourcesShown.stardust) d.innerHTML("span_stardust_disabledTop",g.stardust.format())
		if (g.activeSubtabs.stardust==="stardustBoosts") {
			for (let i=1;i<3+g.stardustUpgrades[2];i++) d.innerHTML("span_stardustBoost"+i+"Value",showFormulas?showStardustBoostFormula[i]():formatStardustBoost(i))
			for (let i of [2,3,6,8,11]) d.innerHTML("span_stardustBoost"+i+"Tooltip",(stat["stardustBoost"+i].gte(c.d10)||showFormulas)?"×":"%")
			d.innerHTML("span_stardustBoost4Tooltip",g.masteryPower.add(c.d1).pow(stat.stardustBoost4).format(2));
			d.innerHTML("span_stardustBoost5Tooltip",stat.stardustBoost5.pow(g.XAxis).format(2));
			d.innerHTML("span_stardustBoost7Tooltip",stat.stardustBoost7.pow(stardustBoost7Exp()).format(2))
			d.innerHTML("span_stardustBoost7FakeExp",stardustBoost7IsSoftcapped()?Decimal.log(stardustBoost7Exp(),g.truetimeThisStardustReset).format(4):"0.5");
			/* Stardust boost table */ for (let i=3;i<13;i++) d.display("div_stardustBoost"+i,((g.stardustUpgrades[2]>(i-3))?"inline-block":"none"));
			/* Stardust upgrade buttons */
			for (let i=1;i<6;i++) {
				d.class("button_stardustUpgrade"+i,((g.stardustUpgrades[i-1]===stat["stardustUpgrade"+i+"Cap"])||g.confirmations.buyStardustUpgrade)?"axisbutton stardustupgrade maxed":stat["stardustUpgrade"+i+"Cost"].lte(g.stardust)?"axisbutton stardustupgrade":"axisbutton locked")
				d.innerHTML("span_stardustUpgrade"+i+"Tooltip",(g.stardustUpgrades[i-1]===stat["stardustUpgrade"+i+"Cap"])?(stardustUpgradeNames[i]+" Path has been maxed"):(stardustUpgradeTooltip[i]()+"<br><br>Cost: "+stat["stardustUpgrade"+i+"Cost"].format(0)+" stardust"))
				d.innerHTML("span_stardustUpgrade"+i+"Level",g.stardustUpgrades[i-1])
				d.display("button_stardustUpgrade"+i,((g.stardustUpgrades[i-1]<stat["stardustUpgrade"+i+"Cap"])||g.showingCappedStardustUpgrades)?"inline-block":"none")
			}
		} else if (g.activeSubtabs.stardust==="stars") {
			d.display("starContainerLegacy",g.starContainerStyle==="Legacy"?"inline-block":"none")
			d.display("starContainerModern",g.starContainerStyle==="Modern"?"inline-block":"none")
			d.innerHTML("span_starCost",BEformat(starCost()));
			let rowsShown = starRowsShown()
			if (g.starContainerStyle==="Legacy") {
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
		} else if (g.activeSubtabs.stardust==="darkMatter") {
			d.display("div_darkMatterUnlocked",g.stardustUpgrades[4]===0?"none":"inline-block")
			d.display("div_darkMatterLocked",g.stardustUpgrades[4]===0?"inline-block":"none")
			if (g.stardustUpgrades[4]!==0) {
				for (let i of ["div","br"]) d.display(i+"_darkmatter_disabledTop",g.topResourcesShown.darkmatter?"none":"inline-block")
				if (!g.topResourcesShown.darkmatter) {
					d.innerHTML("span_darkmatter_disabledTop",g.darkmatter.format())
					d.innerHTML("span_darkmatterPerSec_disabledTop",stat.darkmatterPerSec.format(2))
				}
				d.innerHTML("span_affordableDarkAxis",axisCodes.slice(0,g.stardustUpgrades[0]+4).map(x=>maxAffordableDarkAxis(x).sub(g["dark"+x+"Axis"]).max(c.d0)).sumDecimals().format())
				d.innerHTML("span_baseDarkMatterGain",calcStatUpTo("darkmatterPerSec","Dark X Axis").noLeadFormat(2)); // first non-"base" modifier
				d.innerHTML("span_darkMatterFreeAxis1",stat.darkMatterFreeAxis.gte(c.d1)?"1":stat.darkMatterFreeAxis.pow(c.d1).recip().noLeadFormat(2));
				d.innerHTML("span_darkMatterFreeAxis2",stat.darkMatterFreeAxis.lte(c.d1)?"1":stat.darkMatterFreeAxis.max(c.d1).noLeadFormat(2));
				d.class("button_darkstar",stat.totalDarkAxis.gte(stat.darkStarReq)?"darkstarbutton":"lockeddarkstarbutton");
				let darkStarButtonText = (achievement.ownedInTier(5)<7?"Reset dark matter to gain ":"Gain ")+((stat.totalDarkAxis.gte(stat.darkStarReq)&&g.darkstarBulk)?(stat.maxAffordableDarkStars.sub(g.darkstars).format(0)+" dark stars"):"a dark star");
				if (showFormulas) darkStarButtonText += " (Need "+darkStarReqFormula()+" total dark axis)"
				else darkStarButtonText += "<br>(Progress"+(stat.totalDarkAxis.gte(stat.darkStarReq)?" to next":"")+": "+stat.totalDarkAxis.format(0)+" / "+darkStarReq(stat.maxAffordableDarkStars.max(g.darkstars)).format(0)+" dark axis)"
				darkStarButtonText += "<br><br>"+darkStarEffectHTML();
				d.innerHTML("span_darkstars",BEformat(g.darkstars));
				d.innerHTML("span_realDarkStars",Decimal.eq(g.darkstars,stat.realDarkStars)?"":("Effective: "+stat.realDarkStars.noLeadFormat(3)))
				d.innerHTML("span_darkStarMainText",darkStarButtonText);
				for (let i=0;i<8;i++) {
					let type = axisCodes[i];
					d.display("button_dark"+type+"Axis",(4+g.stardustUpgrades[0]>i)?"inline-block":"none")
					if (4+g.stardustUpgrades[0]>i) {
						d.class("button_dark"+type+"Axis","axisbutton "+(corruption.list.darkAxis.isCorrupted(type)?"corrupted":g.darkmatter.gt(stat["dark"+type+"AxisCost"])?"dark":"locked"));
						if (Decimal.eq(g["dark"+type+"Axis"],stat["realdark"+type+"Axis"])) {
							d.display("span_realdark"+type+"Axis","none")
						} else {
							d.display("span_realdark"+type+"Axis","inline-block")
							d.innerHTML("span_realdark"+type+"Axis","Effective: "+stat["realdark"+type+"Axis"].noLeadFormat(2));
						}
						d.innerHTML("span_dark"+type+"AxisAmount",BEformat(g["dark"+type+"Axis"])+((stat["freedark"+type+"Axis"].gt(c.d0))?(" + "+stat["freedark"+type+"Axis"].noLeadFormat(2)):""));
						d.innerHTML("span_dark"+type+"AxisEffect",stat["dark"+type+"AxisEffect"].noLeadFormat([2,2,2,3,3,3,2,4][i]));
						d.innerHTML("span_dark"+type+"AxisCost",darkAxisCost(type,g["dark"+type+"Axis"],true).format());
					}
					let v1 = stat.realDarkStars;
					let v2 = realDarkStars(stat.maxAffordableDarkStars.max(g.darkstars.add(c.d1)));
					d.innerHTML("span_darkStarEffect2"+type,showFormulas?darkStarEffect2LevelFormula(type):(Decimal.eq(darkStarEffect2Level(type,v1),darkStarEffect2Level(type,v2))?(darkStarEffect2Level(type,v1).mul(c.d10).noLeadFormat(4)+"%"):arrowJoin(darkStarEffect2Level(type,v1).mul(c.d10).noLeadFormat(4)+"%",+darkStarEffect2Level(type,v2).mul(c.d10).noLeadFormat(4)+"%")));
				}
				d.innerHTML("span_darkUAxisEffectAlt",stat.darkUAxisEffect.pow(stat.totalDarkAxis).format(3))
				for (let name of empowerableDarkAxis) {
					d.display("button_empoweredDark"+name+"Axis",stat["empoweredDark"+name+"Axis"].gt(c.d0)?"inline-block":"none");
					d.innerHTML("span_empoweredDark"+name+"AxisAmount",BEformat(stat["empoweredDark"+name+"Axis"],2));
				}
			}
		} else if (g.activeSubtabs.stardust==="energy") {
			for (let i=0;i<energyTypes.length;i++) {
				let type = energyTypes[i]
				if (energyTypesUnlocked()>i) {
					d.display(type+"EnergyDiv","inline-block");
					d.innerHTML(type+"EnergyAmount",g[type+"Energy"].format(2));
					let perSec = stat[type+"EnergyPerSec"]
					let perSecPrecision = perSec.gt(1.1)?2:perSec.sub(c.d1).log10().neg().floor().add(c.d2).min(c.d12).toNumber()
					d.innerHTML(type+"EnergyPerSec",energyPerSec(i).format(perSecPrecision));
					d.innerHTML(type+"EnergyEffect",energyEffect(i).format(4));
					if (i<6) {d.display("span_"+type+"EnergyResetLayer",g.studyCompletions[3]>0?"inline-block":"none")}
				} else {
					d.display(type+"EnergyDiv","none");
				}
			}
			d.display("div_energyLocked",energyTypesUnlocked()===0?"inline-block":"none")
		}
	}
	if (g.activeTab==="automation") {
		if (StudyE(1)) openTab("wormhole")
		for (let id of Object.keys(autobuyers)) { // Autobuyer stuff
			d.display(id+"Autobuyer",autobuyers[id].unlockReq()?"inline-block":"none");
			d.class("button_"+id+"AutobuyerToggle",g[id+"AutobuyerOn"]?"automatortoggleon":"automatortoggleoff");
			d.innerHTML("button_"+id+"AutobuyerToggle",g[id+"AutobuyerOn"]?"On":"Off");
			d.innerHTML("span_"+id+"AutobuyerInterval",timeFormat(autobuyerMeta.interval(id)));
			d.display("button_"+id+"AutobuyerUpgrade",g[id+"AutobuyerUpgrades"]>=autobuyerMeta.cap(id)?"none":"inline-block");
			d.element("button_"+id+"AutobuyerUpgrade").style["background-color"]=autobuyerMeta.cost(id).gte(g[autobuyers[id].resource])?"#b2b2b2":"#cccccc";
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
		d.innerHTML("button_researchAutobuyerMode",researchAutobuyerModes[g.researchAutobuyerMode]??"All free research")
		// input storage
		for (let i=0;i<8;i++) {
			g.axisAutobuyerCaps[i]=d.element("axisAutobuyerMax"+axisCodes[i]).value;
			g.darkAxisAutobuyerCaps[i]=d.element("darkAxisAutobuyerMax"+axisCodes[i]).value;
		}
		g.darkAxisAutobuyerCaps[12]=d.element("darkAxisAutobuyerMaxStars").value;
		for (let i=0;i<5;i++) g.stardustUpgradeAutobuyerCaps[i]=d.element("stardustUpgradeAutobuyerMax"+(i+1)).value
		g.starAutobuyerCap=d.element("starAutobuyerMax").value;
	}
	if (g.activeTab==="wormhole") {
		d.display("div_hr_disabledTop",g.topResourcesShown.hr?"none":"inline-block")
		if (!g.topResourcesShown.hr) d.innerHTML("span_hr_disabledTop",g.hawkingradiation.format())
		if (g.activeSubtabs.wormhole==="research") {
			d.innerHTML("span_discoveryDisplay",unspentDiscoveries().format()+" / "+g.totalDiscoveries.format());
			d.innerHTML("span_discoveryKnowledgeReq",showFormulas?formulaFormat("10<sup>(D + 1)"+formulaFormat.mult(stat.extraDiscoveries_mul.recip())+formulaFormat.add(stat.extraDiscoveries_add.neg())+"</sup>"):nextDiscovery().format());
			d.innerHTML("span_knowledge",g.knowledge.format());
			d.innerHTML("span_knowledgeEffect",showFormulas?formulaFormat(formulaFormat.convSoftcap("log<sup>[2]</sup>(K + 10) × 10",stat.knowledgeEffectCap.mul(c.d0_75),stat.knowledgeEffectCap,Decimal.div(stat.knowledgeEffect,stat.knowledgeEffectCap).gt(c.d0_75))):stat.knowledgeEffect.format(3));
			d.innerHTML("span_knowledgePerSec",stat.knowledgePerSec.format(2));
			d.element("researchContainer").style["padding-bottom"] = d.element("discoveryPanel").clientHeight+"px"
			d.display("button_projectedResearchCost",unlocked("Light")?"inline-block":"none")
			for (let i=0;i<4;i++) {
				d.element("button_observation"+i).style["background-color"] = g[observationResources[i]].gte(observationCost(i))?"rgba(179,204,255,0.75)":"rgba(128,153,204,0.75)"
				d.innerHTML("span_observeCost"+i,BEformat(observationCost(i)));
			}
			d.element("button_researchRespec").style["background-color"] = g.researchRespec?"rgba(128,255,204,0.75)":"rgba(179,204,255,0.75)";
			d.element("button_buyMaxResearch").style["background-color"] = g.buyMaxResearch?"rgba(255,204,128,0.75)":"rgba(179,204,255,0.75)";
			if (showingResearchLoadouts) {
				for (let i=0;i<9;i++) d.class("div_researchLoadout"+(i+1),"researchLoadout"+(researchLoadoutSelected===(i+1)?" selected":""))
			}
			let visible = visibleResearch()
			for (let i of buyableResearch) d.element("button_research_"+i+"_visible").style.filter = "brightness("+(darkenResearch(i,visible)?50:100)+"%)"
			if (visibleStudies().includes(11)) d.innerHTML("button_research_r33_3_visible",research.r33_3.icon)
		} else if (g.activeSubtabs.wormhole==="studies") {
			let visible = visibleStudies()
			for (let i of visible) {
				d.innerHTML("span_study"+i+"Description",studies[i].description())
				d.innerHTML("button_study"+i,studyButtons.text(i))
				d.class("button_study"+i,"studyButton "+studyButtons.class(i))
				d.innerHTML("span_study"+i+"Reward",studies[i].reward_desc().join("<br><br>"));
			}
			if (visible.includes(10)) updateStudyDiv(10)
		} else if (g.activeSubtabs.wormhole==="light") {
			d.innerHTML("span_chromaPerSec",stat.chromaPerSec.format(2))
			d.innerHTML("span_unspentStarsLight",g.stars)
			d.innerHTML("span_baseChroma",stat.chromaGainBase.pow(g.stars-starCap()).noLeadFormat(2))
			d.display("lightContainer2",lightTiersUnlocked()>1?"inline-block":"none")
			d.display("lightContainer3",lightTiersUnlocked()>2?"inline-block":"none")
			for (let i=0;i<[0,3,6,8,9][lightTiersUnlocked()];i++) {
				let name = lightNames[i]
				d.innerHTML("span_"+name+"Chroma",g.chroma[i].format())
				d.innerHTML("span_"+name+"Lumens",g.lumens[i].format())
				d.innerHTML("span_"+name+"LumenReq",lumenReq(i).format())
				d.innerHTML("span_"+lightNames[i]+"LightEffect",showFormulas?formulaFormat(lightEffect[i].formula()):i===5?lightCache.currentEffect[5].length:g.showLightEffectsFrom0?lightEffect[i].format(lightCache.currentEffect[i]):arrowJoin(lightEffect[i].format(lightCache.currentEffect[i]),lightEffect[i].format(lightCache.nextEffect[i])))
				if (g.achievement[815]&&g.ach815RewardActive) {
					d.display("button_"+name+"ChromaGen","none")
					d.element("div_"+name+"Light").style.height = "175px"
				} else {
					d.display("button_"+name+"ChromaGen","inline-block")
					d.element("div_"+name+"Light").style.height = "225px"
					d.element("button_"+name+"ChromaGen").style["background-color"]=(g.activeChroma===i)?"#000000":""
					if (lightComponents(i)===null) {d.innerHTML("button_"+name+"ChromaGen",((g.activeChroma===i)?"Stop generating":"Generate")+" "+stat.chromaPerSec.format(2)+" "+lightNames[i]+" chroma per second")}
					else {d.innerHTML("button_"+name+"ChromaGen",((g.activeChroma===i)?"Stop converting":"Convert")+" "+stat.chromaPerSec.mul(chromaCostFactor(i)).format(2)+" "+lightComponents(i).map(x=>lightNames[x]).joinWithAnd()+" chroma to "+stat.chromaPerSec.format(2)+" "+lightNames[i]+" chroma per second")}
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
				d.display("div_grayLight",lightTiersUnlocked()===4?"inline-block":"none")
			}
			if (unlocked("Prismatic")) {
				d.display("span_chromaCostMultiplierDisplay","inline-block")
				d.innerHTML("span_chromaCostMultiplier",stat.chromaCostMultiplier.noLeadFormat(3))
			} else {
				d.display("span_chromaCostMultiplierDisplay","none")
			}
		} else if (g.activeSubtabs.wormhole==="galaxies") {
			d.innerHTML("span_galaxies",g.galaxies)
			d.innerHTML("span_galaxyPlural",g.galaxies===1?"y":"ies")
			d.innerHTML("span_highestGalaxies",g.highestGalaxies)
			d.innerHTML("span_galaxyFinalStarOrdinal",ordinal(starCap()))
			d.innerHTML("span_currentGalaxyStarCost",starCost(starCap()-1).format())
			d.innerHTML("span_nextGalaxyStarCost",starCost(starCap()-1,g.galaxies+1).format())
			d.innerHTML("span_currentGalaxyAffordableStars",affordableStars())
			d.innerHTML("span_nextGalaxyAffordableStars",affordableStars(g.galaxies+1))
			d.class("button_gainGalaxy","galaxyButton "+(g.stars===starCap()?"active":"locked"))
			d.innerHTML("span_galaxyStarRequirement",BEformat(starCap()))
			d.class("button_destroyGalaxies","galaxyButton "+(g.galaxies===0?"locked":"active"))
			for (let i=1;i<galaxyEffects.length;i++) {
				if (g.highestGalaxies+1>=galaxyEffects[i].req) {
					d.tr("tr_galaxyEffects"+i,true)
					d.innerHTML("span_galaxyBoost"+i,galaxyEffects[i].boost.text().replace("{}",showFormulas?textFormat(galaxyEffects[i].boost.formula(),"_galaxies"):Decimal.eq(galaxyEffects[i].boost.value(g.galaxies),galaxyEffects[i].boost.value(g.galaxies+1))?formatGalaxyEffect(i,"boost"):arrowJoin(formatGalaxyEffect(i,"boost"),formatGalaxyEffect(i,"boost",g.galaxies+1))))
					d.innerHTML("span_galaxyPenalty"+i,galaxyEffects[i].penalty.text().replace("{}",showFormulas?textFormat(galaxyEffects[i].penalty.formula(),"_galaxies"):Decimal.eq(galaxyEffects[i].penalty.value(g.galaxies),galaxyEffects[i].penalty.value(g.galaxies+1))?formatGalaxyEffect(i,"penalty"):arrowJoin(formatGalaxyEffect(i,"penalty"),formatGalaxyEffect(i,"penalty",g.galaxies+1))))
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
		} else if (g.activeSubtabs.wormhole==="luck") {
			d.innerHTML("span_luckShards",g.luckShards.format(2))
			d.innerHTML("span_luckShardsPerSec",stat.luckShardsPerSec.format(2))
			d.innerHTML("span_luckShardEff1",showFormulas?formulaFormat(luckShardEffect1Formula()):luckShardEffect1().format(2))
			d.innerHTML("span_luckShardEff2",showFormulas?formulaFormat(luckShardEffect2Formula()):luckShardEffect2().gt(c.d0_1)?c.d1.sub(luckShardEffect2()).mul(c.e2).format(2):luckShardEffect2().format(3))
			d.innerHTML("span_luckShardEff2Sign",luckShardEffect2().gt(c.d0_1)?"%":"×")
			for (let type of luckRuneTypes) {
				if (runeTypeUnlocked(type)) {
					d.tr("tr_"+type+"Runes",true)
					d.innerHTML("span_"+type+"Runes",unspentLuckRunes(type).format()+" / "+g.totalLuckRunes[type].format())
					d.innerHTML("span_affordable"+type+"Runes",affordableLuckRunes(type).max(c.d1).format())
					d.innerHTML("span_"+type+"RuneCost",luckRuneCost(type,affordableLuckRunes(type).max(c.d1)).noLeadFormat(2))
					for (let upg of luckUpgradeList[type]) {
						if (luckUpgradeUnlocked(type,upg)) {
							d.display("button_"+type+upg,"inline-block")
							let affordable = affordableLuckUpgrades(type,upg).max(c.d1)
							let bought = g.luckUpgrades[type][upg]
							let eff = effLuckUpgradeLevel(type,upg)
							d.innerHTML("span_luckUpg_"+type+upg+"_Purchased",(Decimal.eq(bought,eff)?bought.format():arrowJoin(bought.format(),eff.noLeadFormat(3)))+"<br>(+"+affordable.format()+")")
							d.innerHTML("span_luckUpg_"+type+upg+"_Cost",luckUpgradeCost(type,upg,affordable).format())
							d.innerHTML("span_luckUpg_"+type+upg+"_Effect",showFormulas?formulaFormat(luckUpgrades[type][upg].formula()):arrowJoin(luckUpgrades[type][upg].format(luckUpgrades[type][upg].eff()),luckUpgrades[type][upg].format(luckUpgrades[type][upg].eff(effLuckUpgradeLevel(type,upg,Decimal.add(bought,affordableLuckUpgrades(type,upg).max(c.d1)))))))
						} else {
							d.display("button_"+type+upg,"none")
						}
					}
				} else {
					d.tr("tr_"+type+"Runes",false)
				}
			}
			d.display("div_luckSpendOptions",g.research.r24_5?"inline-block":"none")
			d.display("button_respecLuckUpgrades",g.research.r24_5?"inline-block":"none")
			if (g.research.r24_5) for (let p of [0,1,10,25,50,100]) {
				d.class("button_luckShardPercentageOption"+p,"luckPercentageOption "+(g.luckShardSpendFactor.mul(c.e2).eq(p)?"":"in")+"active")
				d.class("button_luckRunePercentageOption"+p,"luckPercentageOption "+(g.luckRuneSpendFactor.mul(c.e2).eq(p)?"":"in")+"active")
			}
		} else if (g.activeSubtabs.wormhole==="prismatic") {
			d.innerHTML("span_prismatic",g.prismatic.format(2))
			d.innerHTML("span_prismaticPerSec",stat.prismaticPerSec.format(2))
			for (let upg of prismaticUpgradeList) {
				let data = prismaticUpgrades[upg]
				if (prismaticUpgradeUnlocked(upg)) {
					d.display("button_prismaticUpgrade_"+upg,"inline-block")
					let affordable = affordablePrismaticUpgrades(upg)
					let owned = g.prismaticUpgrades[upg]
					let unlimited = ((typeof data.max) === "undefined")
					d.innerHTML("span_prismaticUpgrade_"+upg+"_Purchased",(owned.format()+(unlimited?"":(" / "+data.max.format())))+"<br>(+"+affordable.max(c.d1).format()+")")
					d.innerHTML("span_prismaticUpgrade_"+upg+"_Cost","Cost: "+(showFormulas?formulaFormat(unlimited?(data.scale.noLeadFormat(2)+"<sup>λ</sup> × "+data.baseCost.format()):data.costFormula()):prismaticUpgradeCost(upg,affordable.max(c.d1)).format()))
					let maxed = unlimited?false:Decimal.eq(owned,data.max)
					for (let i of data.variables) d.innerHTML("span_prismaticUpgrade_"+upg+"_"+i,(showFormulas&&(typeof data.formula[i]==="function"))?formulaFormat(data.formula[i]()):(maxed||(typeof data.formula[i]!=="function"))?data.format[i]():arrowJoin(data.format[i](),data.format[i](((data.variables.length===1)?data.eff:data.eff[i])(owned.add(affordable.max(c.d1))))))
					let classList = ["prismaticUpgrade"]
					if (data.refundable) classList.push("refundable")
					if (maxed) {classList.push("maxed","unlocked")} else if (affordable.eq(c.d0)) {classList.push("locked")} else {classList.push("unlocked")}
					d.class("button_prismaticUpgrade_"+upg,classList.join(" "))
				} else {
					d.display("button_prismaticUpgrade_"+upg,"none")
				}
			}
			for (let p of [0,1,10,25,50,100]) d.class("button_prismaticPercentageOption"+p,"prismaticPercentageOption "+(g.prismaticSpendFactor.mul(c.e2).eq(p)?"":"in")+"active")
		} else if (g.activeSubtabs.wormhole==="antimatter") {
			for (let i of ["div","br"]) d.display(i+"_antimatter_disabledTop",g.topResourcesShown.antimatter?"none":"inline-block")
			if (!g.topResourcesShown.antimatter) {
				d.innerHTML("span_antimatter_disabledTop",g.antimatter.format())
				d.innerHTML("span_antimatterPerSec_disabledTop",stat.antimatterPerSec.format(2))
			}
			d.innerHTML("span_affordableAntiAxis",axisCodes.filter(x=>antiAxisUnlocked(x)).map(x=>maxAffordableAntiAxis(x).sub(g["anti"+x+"Axis"]).max(c.d0)).sumDecimals().format())
			for (let i=0;i<8;i++) {
				let type = axisCodes[i];
				let unlocked = antiAxisUnlocked(type)
				d.display("button_anti"+type+"Axis",unlocked?"inline-block":"none")
				if (unlocked) {
					d.class("button_anti"+type+"Axis","axisbutton "+(corruption.list.antiAxis.isCorrupted(type)?"corrupted":g.antimatter.gt(stat["anti"+type+"AxisCost"])?"anti":"locked"));
					if (Decimal.eq(g["anti"+type+"Axis"],stat["realanti"+type+"Axis"])) {
						d.display("span_realanti"+type+"Axis","none")
					} else {
						d.display("span_realanti"+type+"Axis","inline-block")
						d.innerHTML("span_realanti"+type+"Axis","Effective: "+stat["realanti"+type+"Axis"].noLeadFormat(2));
					}
					d.innerHTML("span_anti"+type+"AxisAmount",BEformat(g["anti"+type+"Axis"])+((stat["freeanti"+type+"Axis"].gt(c.d0))?(" + "+stat["freeanti"+type+"Axis"].noLeadFormat(2)):""));
					d.innerHTML("span_anti"+type+"AxisEffect",stat["anti"+type+"AxisEffect"].noLeadFormat([2,3,3,2,3,5,0,4][i]));
					d.innerHTML("span_anti"+type+"AxisCost",BEformat(stat["anti"+type+"AxisCost"]));
				}
				let v1 = antiAxisDimBoost(type);
				let v2 = antiAxisDimBoost(type,true);
				function formatBoost(x){return (x.gt(c.d2)?x.sub(c.d1).mul(c.e2).noLeadFormat(4):x.sub(c.d1).mul(c.e2).toFixed(2))+"%"}
				d.innerHTML("span_antiAxisBoost"+type,showFormulas?antiAxisDimBoostFormula(type):v1.gt(c.d3)?formatBoost(v1):arrowJoin(formatBoost(v1),formatBoost(v2)));
			}
			d.innerHTML("span_antiUAxisEffectAlt",stat.antiUAxisEffect.pow(stat.totalAntiAxis).noLeadFormat(4))
			d.innerHTML("span_antiTAxisEffectAlt",calcStatUpTo("knowledgePerSec","Observations").pow(stat.antiTAxisEffect).format(2))
			for (let name of empowerableAntiAxis) {
				d.display("button_empoweredAnti"+name+"Axis",stat["empoweredAnti"+name+"Axis"].gt(c.d0)?"inline-block":"none");
				d.innerHTML("span_empoweredAnti"+name+"AxisAmount",BEformat(stat["empoweredAnti"+name+"Axis"],2));
			}
		}
	}
	if (d.element("storyTitle")!==null) d.element("storyTitle").style = "background:-webkit-repeating-linear-gradient("+(45*Math.sin(Number(new Date()/1e4)))+"deg,#f00,#ff0 4%,#0f0 8.5%,#0ff 12.5%,#00f 16.5%,#f0f 21%,#f00 25%);-webkit-background-clip:text;";
}
function tick(time) {																																		 // The game loop, which consists of functions that run automatically. Frame rate is 20fps
	if (time<0) {
		error("An error has occurred which would have caused time to reverse by "+timeFormat(time)+"")
		return
	} else if (time===0) {return} // not an error but no point causing lag
	if ((StudyE(3)||StudyE(9))&&(!overclockActive)) {
		let diff = time-0.05
		g.dilatedTime += diff
		time -= diff
	}
	for (let i=0;i<9;i++) {if (lightData[i].updateEveryTick !== undefined) {if (lightData[i].updateEveryTick()) updateLightCache(i)}}
	g.timePlayed+=time;
	g.timeThisStardustReset+=time;
	g.timeThisWormholeReset+=time;
	g.timeThisSpacetimeReset+=time;
	if (StudyE(9)) if (g.timeThisWormholeReset>=9) studies[9].reset()
	updateStats()
	if (g.achievement[717]&&(!unlocked("Corruption"))) for (let i of corruption.all) if (corruption.list[i].visible()) unlockFeature("Corruption")


	// Time section
	if (stat.totalDarkAxis.gte(1000)&&!g.storySnippets.includes("Black hole")) openStory("Black hole");
	o.add("truetimePlayed",stat.tickspeed.mul(time));
	o.add("truetimeThisStardustReset",stat.tickspeed.mul(time));
	o.add("truetimeThisWormholeReset",stat.tickspeed.mul(time));
	o.add("truetimeThisSpacetimeReset",stat.tickspeed.mul(time));

	
	// Dilation section
	if (g.dilationUpgradesUnlocked<4) if (stat.tickspeed.gte(dilationUpgrades[g.dilationUpgradesUnlocked+1].tickspeedNeeded)) unlockDilationUpgrade()


	// Mastery section


	// Achievement section
	for (let ach of achievementEvents.gameloop) addAchievement(ach);
	for (let ach of secretAchievementEvents.gameloop) addSecretAchievement(ach);
	for (let ach of secretAchievementEvents.luckyGameloop) if (Math.random()<secretAchievementList[ach].chance(time)) addSecretAchievement(ach);
	lagAchievementTicks = (deltatime>1)?(lagAchievementTicks+1):0;
	fpsAchievementTicks = ((deltatime===0.05)&&(!StudyE(3)))?(fpsAchievementTicks+1):0;
	if (stat.ironWill) g.ach505Progress = g.ach505Progress.max(stat.totalDarkAxis);
	if (stat.chromaPerSec.gte(c.d1)) g.ach711Progress = Math.min(g.ach711Progress,g.stars)
	if (g.ach825possible) {for (let i of axisCodes) {
		if (Decimal.lt(stat["real"+i+"Axis"],g[i+"Axis"].mul(c.d2))) g.ach825possible = false
		if (Decimal.lt(stat["realdark"+i+"Axis"],g["dark"+i+"Axis"].mul(c.d2))) g.ach825possible = false
	}}
	if (newsSupport.newsletter.spamStart<Date.now()) { // Secret achievement 33 "Stat Mark"
		if (Math.random()<(deltatime/100)*(1+(Date.now()-newsSupport.newsletter.spamStart)/1000)) {
			(newsSupport.newsletter.remaining.length===0)?newsSupport.newsletter.finalNotify():notify("<span style=\"border-style:solid;border-radius:5px;border-width:1px;border-color:#000000\" onClick=\"newsSupport.newsletter.ask()\">VERIFICATION</span>","#009999","#00ffff")
			newsSupport.newsletter.spamStart=Date.now()+3000
		} else if (Math.random()<deltatime/(newsSupport.newsletter.remaining.length/8)) {notify(Array.random(newsSupport.spamCompendium),"hsl("+ranint(0,359)+" 80% 40%)","#000000")}
	}
	
	
	// Dark Matter section


	// Research section
	g.totalDiscoveries=discoveriesFromKnowledge().floor().max(g.totalDiscoveries).fix(c.d0);


	// Study section
	if (g.activeStudy !== 0) {
		let forceExit = false, exitText
		if (!g.research[studies[g.activeStudy].research]) {
			forceExit = true
			exitText = "Relevant study research not owned ("+researchOut(studies[g.activeStudy].research)+")"
		}
		if (studyPower(g.activeStudy)>=studies[0].effectiveMaxCompletions[g.activeStudy]) {
			forceExit = true
			exitText = "Placeholder level entered (current: "+(studyPower(g.activeStudy)+1)+", max: "+studies[0].effectiveMaxCompletions[g.activeStudy]+")"
		}
		if (forceExit) {
			popup({text:"You have been forcefully removed from Study "+roman(g.activeStudy)+" due to the presence of a bug. Sorry!<br>Details: "+exitText+"<br>Please tell alemaninc about this.",buttons:[["Close",""]]})
			wormholeReset()
			g.activeStudy=0
		}
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
	if (achievement.ownedInTier(5)===30&&g.activeStudy===0) incrementStardust(stat.pendingstardust.sub(g.stardust).max(c.d0));
	if (achievement.ownedInTier(5)>=10) incrementStardust(stat.tickspeed.mul(time));
	if (g.stardustUpgrades[4]>0) o.add("darkmatter",stat.darkmatterPerSec.mul(time));
	if (unlocked("Hawking Radiation")) o.add("knowledge",stat.knowledgePerSec.mul(time));
	let chromaToGet = stat.chromaPerSec.mul(time)
	if (g.achievement[815]&&g.ach815RewardActive) {
		for (let i=0;i<9;i++) g.chroma[i] = g.chroma[i].add(chromaToGet)
	} else if (typeof g.activeChroma === "number") {
		generateChroma(g.activeChroma,chromaToGet)
	}
	for (let i=0;i<9;i++) if (g.chroma[i].gte(lumenReq(i))) {addLumens(i)}
	if (g.studyCompletions[7]>0) o.add("luckShards",stat.luckShardsPerSec.mul(time))
	if (g.research.r20_8) o.add("prismatic",stat.prismaticPerSec.mul(time))
	if (g.studyCompletions[9]>0) o.add("antimatter",stat.antimatterPerSec.mul(time))


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
		for (let i=1;i<=g.stardustUpgrades.length;i++) while ((g.stardustUpgrades[i-1]<(g.stardustUpgradeAutobuyerCaps[i-1]==="u"?stat["stardustUpgrade"+i+"Cap"]:Math.min(stat["stardustUpgrade"+i+"Cap"],g.stardustUpgradeAutobuyerCaps[i-1])))&&(g.stardust.gte(stat["stardustUpgrade"+i+"Cost"]))) buyStardustUpgrade(i)
		stardustUpgradeAutobuyerProgress%=1;
	}
	if (achievement.ownedInTier(5)>=4 && (g.starAutobuyerOn || g.starAllocatorOn)) starAutobuyerProgress+=time/autobuyerMeta.interval("star");
	if (starAutobuyerProgress > 1) {
		if (g.starAutobuyerOn) {while (starCost().lt(g.stardust)&&g.stars<(g.starAutobuyerCap==="u"?Infinity:Number(g.starAutobuyerCap))) buyStar();}
		if (unspentStars()>0&&g.starAllocatorOn&&(totalStars<g.starAllocatorBuild.length)) for (let i of g.starAllocatorBuild) buyStarUpgrade(i);
		starAutobuyerProgress%=1;
	}
	if (achievement.ownedInTier(5)>=8 && g.stardustAutomatorOn) {
		let doReset = false;
		let mode = g.stardustAutomatorMode
		if (mode === 0) {doReset = stat.pendingstardust.gte(g.stardustAutomatorValue)} // at X stardust
		else if (mode === 1) {doReset = g.timeThisStardustReset>=Number(g.stardustAutomatorValue)} // at X seconds
		else if (mode === 2) {doReset = stat.pendingstardust.gte(g.stardust.mul(g.stardustAutomatorValue))} // multiply stardust by X
		else if (mode === 3) {doReset = stat.pendingstardust.gte(g.stardust.pow(g.stardustAutomatorValue))} // power stardust by X
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
		if (mode === 0) {doReset = stat.pendinghr.gte(g.wormholeAutomatorValue)} // at X HR
		else if (mode === 1) {doReset = g.timeThisWormholeReset>=Number(g.wormholeAutomatorValue)} // at X seconds
		else if (mode === 2) {doReset = stat.pendinghr.gte(g.hawkingradiation.mul(g.wormholeAutomatorValue))} // multiply HR by X
		else if (mode === 3) {doReset = stat.pendinghr.gte(g.hawkingradiation.pow(g.wormholeAutomatorValue))} // power HR by X
		else {
			if (achievement.ownedInTier(5)>=12) {popup({text:"Due to an error, wormhole automator mode was reverted to the default value of amount of HR."})}
			g.wormholeAutomatorMode = 0
		}
		if (doReset) attemptWormholeReset(false);
	}
	g.wormholeAutomatorValue=d.element("wormholeAutomatorValue").value;
	if (autobuyers.research.unlockReq() && g.researchAutobuyerOn) researchAutobuyerProgress+=time/autobuyerMeta.interval("research");
	if (researchAutobuyerProgress > 1) {
		let bought = false // check if anything was bought
		if ([0,1].includes(g.researchAutobuyerMode)) { // free research
			let clock = Date.now()+1000
			while (true) {
				let buyable = buyableResearch.filter(x=>(research[x].type==="normal")&&researchCost(x).eq(c.d0)&&availableResearch(researchRow(x),researchCol(x))&&researchConditionsMet(x)&&(x!=="r6_9")&&((research[x].group===undefined)||(g.researchAutobuyerMode===0)))
				if (buyable.length===0) {break} // if any free research are bought, the buyable research list will update so must repeat
				if (Date.now()>clock) {error("Infinite Loop");break}
				for (let i of buyable) {if (researchCost(i).eq(c.d0)) {buySingleResearch(researchRow(i),researchCol(i))}} // check again for research with changing costs
				updateBuyableResearch()
				bought=true
			}
		} else {g.researchAutobuyerMode=0} // error detection
		if (bought) {updateResearchTree();generateResearchCanvas()}
		researchAutobuyerProgress%=1;
	}

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