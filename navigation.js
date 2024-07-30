"use strict";
function openTopLevelDiv(id) {
	let siblings = d.class("topleveldiv");
	for (let i of siblings) i.style.display="none";
	d.display(id,"inline-block");
}
const tabVisibility = {
	main:function(){return true},
	stardust:function(){return unlocked("Stardust")},
	wormhole:function(){return unlocked("Hawking Radiation")},
	achievements:function(){return true},
	automation:function(){return g.stardustUpgrades[1]!==0},
	options:function(){return true},
	statistics:function(){return true},
}
function openTab(id) {
	if (debugActive) {if (!tabList.includes(id)) {error("Could not open tab \""+id+"\"")}}
	if (StudyE(1)) {
		if (id==="main") {
			openSubTab("main","offlineTime")
		} else if (["stardust","automation"].includes(id)&&StudyE(1)) {
			notify("This tab is disabled in Study I","#990000","#ffffff")
			return
		}
	}
	for (let i of d.class("tab")) i.style.display="none";
	d.display("bigtab_"+id,"inline-block");
	for (let i of d.class("bigtab")) i.style.filter = "brightness(60%)"
	d.element("button_bigtab_"+id).style.filter = "brightness(100%)"
	g.activeTab=id
	updateHTML()
}
// visible defaults to true if undefined, glow defaults to false if undefined
const subtabProperties = {
	main:{
		axis:{
			glow:function(){
				if ((autobuyerMeta.interval("axis")<=0.1)&&g.axisAutobuyerOn) return false;
				if (g.glowOptions.buyAxis) {for (let i=0;i<12;i++) {if (g.exoticmatter.gt(axisCost(axisCodes[i]))&&(stat.axisUnlocked>i)&&Decimal.neq(g[axisCodes[i]+"Axis"],maxAxisForAchievement(i))) {return true}}};
			}
		},
		masteries:{
			visible:function(){return unlocked("Masteries")},
			glow:function(){if (g.glowOptions.emptyMasteryRow) {
				if (!(achievement.maxForLocks.mastery.includes(Number(g.achOnProgressBar))&&achievement.locking(g.achOnProgressBar))) {
					for (let i=1;i<=totalMasteryRows;i++) {if ((g.activeMasteries[i]===0)&&(stat["masteryRow"+i+"Unlocked"])) {return true}}};
				}
			}
		},
		offlineTime:{
			glow:function(){return ((timeState===1)&&g.glowOptions.overclock)}
		},
		corruption:{
			visible:function(){return unlocked("Corruption")}
		}
	},
	stardust:{
		stardustBoosts:{
			glow:function(){if (g.glowOptions.buyStardustUpgrade&&(!(((achievement.maxForLocks.totalStardustUpgrades[g.achOnProgressBar]??Infinity)===effectiveStardustUpgrades())&&achievement.locking(g.achOnProgressBar)))) {for (let i=1;i<6;i++) {if (stat["stardustUpgrade"+i+"Cost"].lt(g.stardust)&&g.stardustUpgrades[i-1]<stat["stardustUpgrade"+i+"Cap"]) {return true}}}}
		},
		stars:{
			glow:function(){
				if (g.glowOptions.buyStar&&g.stardust.gt(starCost())) {return true}
				if (g.glowOptions.assignStar&&(unspentStars()>0)&&(totalStars<40)) {return true}
			}
		},
		darkMatter:{
			visible:function(){return unlocked("Dark Matter")},
			glow:function(){
				if (g.stardustUpgrades[4]===0) {return false}
				if ((autobuyerMeta.interval("darkAxis")>0.1)||(!g.darkAxisAutobuyerOn)) {
					if (g.glowOptions.buyDarkAxis) {for (let i=0;i<4+g.stardustUpgrades[0];i++) {if (g.darkmatter.gt(darkAxisCost(axisCodes[i]))) {return true}}};
					if (g.glowOptions.gainDarkStar&&stat.totalDarkAxis.gte(stat.darkStarReq)) {return true};
				}
				if ((StudyE(12)||study13.bound(275))&&g.glowOptions.study12&&g.exoticmatter.gt(studies[12].empowerment.req())) {return true}
			}
		},
		energy:{
			visible:function(){return unlocked("Energy")}
		}
	},
	wormhole:{
		research:{
			glow:function(){
				if (g.glowOptions.observe) {for (let i=0;i<4;i++) {if (g[observationResources[i]].gte(observationCost(i))) {return true}}}
				if (g.glowOptions.buyPermanentResearch) {for (let i of buyablePermanentResearch) if (researchConditionsMet(i)&&g.totalDiscoveries.gte(researchCost(i))) {return true}}
				return false
			}
		},
		studies:{
			visible:function(){return unlocked("Studies")}
		},
		light:{
			visible:function(){return unlocked("Light")},
			glow:function(){
				if (lightTiersUnlocked()===0) {return false}
				if (g.glowOptions.noChromaGeneration&&(typeof g.activeChroma!=="number")) {return true}
				return false
			}
		},
		galaxies:{
			visible:function(){return unlocked("Galaxies")},
			glow:function(){
				if (g.glowOptions.createGalaxy&&g.stars===60) return true
				return false
			}
		},
		luck:{
			visible:function(){return unlocked("Luck")},
			glow:function(){
				for (let type of luckRuneTypes) {
					let unlockedUpgs = luckUpgradeList[type].filter(upg=>luckUpgradeUnlocked(type,upg))
					if (g.glowOptions.buyLuckRune) if (affordableLuckRunes(type).gte(unlockedUpgs.map(upg=>luckUpgradeCost(type,upg,c.d1)).reduce((x,y)=>x.min(y)))) return true
					if (g.glowOptions.buyLuckUpgrade) for (let upg of unlockedUpgs) if (affordableLuckUpgrades(type,upg).gt(c.d0)) return true
				}
				return false
			}
		},
		prismatic:{
			visible:function(){return unlocked("Prismatic")},
			glow:function(){
				if (g.glowOptions.buyPrismaticUpgrade) for (let upg of nonRefundablePrismaticUpgrades.filter(x=>prismaticUpgradeUnlocked(x))) if (singlePrismaticUpgradeCost(upg).lt(g.prismatic)) return true
				if (g.glowOptions.buyRefundablePrismaticUpgrade) for (let upg of refundablePrismaticUpgrades.filter(x=>prismaticUpgradeUnlocked(x))) if (singlePrismaticUpgradeCost(upg).lt(g.prismatic)) return true
				return false
			}
		},
		antimatter:{
			visible:function(){return unlocked("Antimatter")},
			glow:function(){
				if (g.glowOptions.buyAntiAxis) {for (let i of axisCodes.filter(x=>antiAxisUnlocked(x))) {if (g.antimatter.gt(antiAxisCost(i))) {return true}}};
				return false
			}
		},
		wormholeUpgrades:{
			visible:function(){return g.achievement[903]||unlocked("Matrix")},
			glow:function(){
				if (g.glowOptions.buyWormholeUpgrade) {for (let i=1;i<13;i++) {if ((g.wormholeUpgrades[i]<wormholeUpgrades[i].max)&&g.hawkingradiation.gte(wormholeUpgrades[i].cost)) {return true}}}
				return false
			}
		},
		study13:{
			visible:function(){return unlocked("Study XIII")}
		}
	},
	achievements:{
		mainAchievements:{},
		secretAchievements:{
			visible:function(){return totalSecretAchievements>0}
		},
		wormholeMilestones:{
			visible:function(){return unlocked("Hawking Radiation")}
		},
	},
	automation:{
		automation:{
			glow:function(){
				let data = Object.entries(autobuyers);
				for (let auto of data) if (auto[1].unlockReq()&&g[auto[0]+"AutobuyerUpgrades"]!==autobuyerMeta.cap(auto[0])&&g[auto[1].resource].gt(autobuyerMeta.cost(auto[0]))) return true;
			}
		}
	},
	options:{
		options:{},
		hotkeys:{},
		story:{
			visible:function(){return unlocked("Stardust")}
		}
	},
	statistics:{
		statistics:{},
		largeNumberVisualization:{},
		statBreakdown:{},
		previousPrestiges:{
			visible:function(){return unlocked("Stardust")}
		}
	},
}
const tabList = Object.keys(subtabProperties)
const subtabList = Object.fromEntries(Object.entries(subtabProperties).map(x=>[x[0],Object.keys(x[1])]))
function openSubTab(parentTab,id) {
	if (!Object.keys(subtabList).includes(parentTab)) {openTab("main");return}
	if (!subtabList[parentTab].includes(id)) {openSubTab(parentTab,subtabList[parentTab][0]);return}
	if (StudyE(1)&&(parentTab==="main")&&(id!=="offlineTime")) {
		notify("This subtab is disabled in Study I","#990000","#ffffff")
		return
	}
	if ((g.activeStudy===10)&&(studyPower(10)===0)&&(parentTab==="wormhole")&&(id!=="studies")) {
		notify("This subtab is disabled in the Stellar Triad","#990000","#ffffff")
		return
	}
	for (let i of d.class("subtab "+parentTab)) i.style.display="none";
	d.display("subtab_"+parentTab+"_"+id,"inline-block");
	for (let i of d.class("tier2"+parentTab)) i.style.filter = "brightness(60%)"
	d.element("button_subtab_"+parentTab+"_"+id).style.filter = "brightness(100%)"
	g.activeSubtabs[parentTab]=id
	updateHTML()
}
const hotkeys = {
	tryOpenTab:function(num){
		let count = 0
		for (let i of tabList) {
			if (tabVisibility[i]()) count++
			if (count===num) {
				openTab(i)
				return
			}
		}
	},
	tryOpenSubTab:function(num){
		if (subtabList[g.activeTab].length>=num) {if (subtabProperties[g.activeTab][subtabList[g.activeTab][num-1]].visible()) {openSubTab(g.activeTab,subtabList[g.activeTab][num-1])}}
	},
	hotkeyList:{
		...Object.fromEntries(countTo(tabList.length).map(x=>["Open "+ordinal(x)+" tab",Object.fromEntries([["baseKey","Digit"+(x%10)],["down",()=>hotkeys.tryOpenTab(x)],["visible",()=>true]])])),
		...Object.fromEntries(countTo(Object.values(subtabList).map(x=>x.length).reduce((x,y)=>Math.max(x,y))).map(x=>["Open "+ordinal(x)+" subtab",Object.fromEntries([["baseKey","shift+Digit"+(x%10)],["down",()=>hotkeys.tryOpenSubTab(x)],["visible",()=>true]])])),
		"Overclock":{baseKey:"KeyO",down:()=>setTimeState(1),visible:()=>true},
		"Freeze time":{baseKey:"shift+KeyO",down:()=>setTimeState(2),visible:()=>true},
		"Equalize time":{baseKey:"alt+KeyO",down:()=>setTimeState(3),visible:()=>true},
		"Stardust reset":{baseKey:"KeyS",down:()=>attemptStardustReset(true),visible:()=>unlocked("Stardust")||g.exoticmatter.gte(stat.stardustExoticMatterReq)},
		"Force Stardust reset":{baseKey:"shift+KeyS",down:()=>stardustReset(),visible:()=>unlocked("Stardust")},
		"Wormhole reset":{baseKey:"KeyW",down:()=>{if((g.activeStudy===0)||Decimal.gte(stat.totalDarkAxis,stat.wormholeDarkAxisReq)){attemptWormholeReset(true)}},visible:()=>unlocked("Hawking Radiation")||stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)},
		"Force Wormhole reset":{baseKey:"shift+KeyW",down:()=>wormholeReset(),visible:()=>unlocked("Hawking Radiation")},
		"Show/hide formulas":{baseKey:"KeyF",down:()=>showFormulas=!showFormulas,visible:()=>true}
	},
	toBeChanged:null,
	isChanging:false
}
function savefileHotkeyProperties() {
	return Object.fromEntries(Object.entries(hotkeys.hotkeyList).map(x=>[x[0],x[1].baseKey]))
}
function toggleHotkey(name) {
	hotkeys.toBeChanged=name
	hotkeys.isChanging=true
	popup({
		text:"We're sorry to hear that you hate "+formatHotkey(g.hotkeys[name])+". Press the key you would you like to try on next for \""+name+"\".<br>You can use the Shift and Alt keys as modifiers.",
		buttons:[["Disable","g.hotkeys['"+name+"']=null"],["Cancel",""]]
	})
}
function formatHotkey(key) {
	if ((typeof key) !== "string") return "<span style=\"opacity:0.5\">(disabled)</span>"
	let parts = key.split("+")
	let mainKey = parts[parts.length-1]
	let out = mainKey
	if (mainKey.substring(0,5)==="Digit") {out = mainKey.substring(5)}
	else if (mainKey.substring(0,3)==="Key") {out = mainKey.substring(3)}
	parts[parts.length-1] = out
	return parts.join("+")
}
function hotkeyHandler(isUp){
	return function(e) {
		if (e.ctrlKey) return // if switching tab or whatever
		if (["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { // if inputting something
			if (["value","innerHTML"].map(x=>document.activeElement[x]).includes("6")&&e.key==="9") addSecretAchievement(10)
			return
		}
		let key = (e.altKey?"alt+":"")+(e.shiftKey?"shift+":"")+e.code
		if (StudyE(1)) {	
			if (Object.values(g.hotkeys).includes(key)) notify("Hotkeys are disabled in Study I","#990000","#ffffff")
			return
		}
		if (hotkeys.isChanging) {
			if (["ctrl","alt","shift"].map(x=>e.code.toLowerCase().includes(x)).includes(true)) {return}
			d.display("div_fancyPopupScreen","none")
			g.hotkeys[hotkeys.toBeChanged]=key
			hotkeys.isChanging=false
		} else {
			for (let i of Object.keys(g.hotkeys)) if (g.hotkeys[i]===key) if (hotkeys.hotkeyList[i].visible()) {
				let data = hotkeys.hotkeyList[i]
				if (isUp) {if (data.up!==undefined) hotkeys.hotkeyList[i].up()}
				else {if (data.down!==undefined) hotkeys.hotkeyList[i].down()}
			}
		}
	}
}
document.addEventListener("keydown",hotkeyHandler(false))
document.addEventListener("keyup",hotkeyHandler(true))