"use strict";
function openTopLevelDiv(id) {
	let siblings = d.class("topleveldiv");
	for (let i of siblings) i.style.display="none";
	d.display(id,"inline-block");
}
var activeTab = "main"
const tabVisibility = {
	main:function(){return true},
	options:function(){return true},
	statistics:function(){return true},
	achievements:function(){return true},
	stardust:function(){return unlocked("Stardust")},
	automation:function(){return g.stardustUpgrades[1]!==0},
	wormhole:function(){return unlocked("Hawking Radiation")}
}
function openTab(id) {
	if (debugActive) {if (!tabList.includes(id)) {error("Could not open tab \""+id+"\"")}}
	if (StudyE(1)) {
		if (id=="main") {
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
	activeTab=id
	updateHTML()
}
// visible defaults to true if undefined, glow defaults to false if undefined
const subtabProperties = {
	main:{
		axis:{
			glow:function(){
				if (autobuyerMeta.interval("axis")==0.1&&g.axisAutobuyerOn) return false;
				if (g.glowOptions.buyAxis) {for (let i=0;i<8;i++) {if (g.exoticmatter.gt(axisCost(axisCodes[i]))&&(stat.axisUnlocked>i)) {return true}}};
			}
		},
		masteries:{
			visible:function(){return unlocked("Masteries")},
			glow:function(){if (g.glowOptions.emptyMasteryRow) {for (let i=1;i<=totalMasteryRows;i++) {if ((g.activeMasteries[i]==0)&&(stat["masteryRow"+i+"Unlocked"])) {return true}}};}
		},
		offlineTime:{
			glow:function(){return (overclockActive&&g.glowOptions.overclock)}
		}
	},
	options:{
		options:{},
		hotkeys:{}
	},
	statistics:{
		mainStatistics:{},
		hiddenStatistics:{},
		largeNumberVisualization:{},
		statBreakdown:{},
		previousPrestiges:{
			visible:function(){return unlocked("Stardust")}
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
	stardust:{
		stardustBoosts:{
			glow:function(){if (g.glowOptions.buyStardustUpgrade) {for (let i=1;i<6;i++) {if (stat["stardustUpgrade"+i+"Cost"].lt(g.stardust)&&g.stardustUpgrades[i-1]<stat["stardustUpgrade"+i+"Cap"]) {return true}}}}
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
				if (autobuyerMeta.interval("darkAxis")==0.1&&g.darkAxisAutobuyerOn) return false;
				if (g.glowOptions.buyDarkAxis) {for (let i=0;i<4+g.stardustUpgrades[0];i++) {if (g.darkmatter.gt(darkAxisCost(axisCodes[i]))) {return true}}};
				if (g.glowOptions.gainDarkStar&&stat.totalDarkAxis.gte(stat.darkStarReq)) {return true};
			}
		},
		energy:{
			visible:function(){return unlocked("Energy")}
		}
	},
	automation:{
		automation:{
			glow:function(){
				let data = Object.entries(autobuyers);
				for (let auto of data) if (auto[1].unlockReq()&&g[auto[0]+"AutobuyerUpgrades"]!==autobuyerMeta.cap(auto[0])&&g[auto[1].resource].gt(autobuyerMeta.cost(auto[0]))) return true;
			}
		}
	},
	wormhole:{
		research:{
			glow:function(){
				if (g.glowOptions.observe) {for (let i=0;i<4;i++) {if (g[observationResources[i]].gte(observationCost(i))) {return true}}}
				if (g.glowOptions.buyPermanentResearch) {for (let i of buyablePermanentResearch) if (researchConditionsMet(i)&&g.totalDiscoveries.gte(researchCost(i))) {return true}}
			}
		},
		studies:{
			visible:function(){return unlocked("Studies")}
		},
		light:{
			visible:function(){return unlocked("Light")},
			glow:function(){
				if (lightTiersUnlocked()==0) {return false}
				if (g.glowOptions.noChromaGeneration&&(typeof g.activeChroma!=="number")) {return true}
			}
		}
	}
}
const tabList = Object.keys(subtabProperties)
const subtabList = Object.fromEntries(Object.entries(subtabProperties).map(x=>[x[0],Object.keys(x[1])]))
var activeSubtabs = Object.fromEntries(Object.entries(subtabList).map(x=>[x[0],x[1][0]]))
function openSubTab(parentTab,id) {
	if (debugActive) {
		if (!Object.keys(subtabList).includes(parentTab)) {error("Could not open subtab of tab \""+parentTab+"\"")}
		if (!subtabList[parentTab].includes(id)) {error("Could not open subtab \""+id+"\" of tab \""+parentTab+"\"")}
	}
	if (StudyE(1)&&(parentTab=="main")&&(id!=="offlineTime")) {
		notify("This subtab is disabled in Study I","#990000","#ffffff")
		return
	}
	for (let i of d.class("subtab "+parentTab)) i.style.display="none";
	d.display("subtab_"+parentTab+"_"+id,"inline-block");
	for (let i of d.class("tier2"+parentTab)) i.style.filter = "brightness(60%)"
	d.element("button_subtab_"+parentTab+"_"+id).style.filter = "brightness(100%)"
	activeSubtabs[parentTab]=id
	updateHTML()
}
const hotkeys = {
	tryOpenSubTab:function(num){
		if (subtabList[activeTab].length>=num) {if (subtabProperties[activeTab][subtabList[activeTab][num-1]].visible()) {openSubTab(activeTab,subtabList[activeTab][num-1])}}
	},
	hotkeyList:{
		...Object.fromEntries(tabList.map((x,i)=>["Open "+toTitleCase(x)+" tab",{baseKey:"Digit"+((i+1)%10),action:()=>openTab(x),visible:function(){return tabVisibility[x]()}}])),
		...Object.fromEntries(countTo(Object.values(subtabList).map(x=>x.length).reduce((x,y)=>Math.max(x,y))).map(x=>["Open "+x+(x==1?"st":x==2?"nd":x==3?"rd":"th")+" subtab",Object.fromEntries([["baseKey","shift+Digit"+(x%10)],["action",()=>hotkeys.tryOpenSubTab(x)],["visible",function(){return true}]])]))
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
		text:"We're sorry to hear that you hate "+formatHotkey(g.hotkeys[name])+". Press the key you would you like to try on next for \""+name+"\".<br>You can use the Shift key.",
		buttons:[["Disable","g.hotkeys['"+name+"']=null"],["Cancel",""]]
	})
}
function formatHotkey(key) {
	if ((typeof key) !== "string") return "<span style=\"opacity:0.5\">(disabled)</span>"
	let parts = key.split("+")
	let mainKey = parts[parts.length-1]
	let out = mainKey
	if (mainKey.substring(0,5)=="Digit") {out = mainKey.substring(5)}
	else if (mainKey.substring(0,3)=="Key") {out = mainKey.substring(3)}
	parts[parts.length-1] = out
	return parts.join("+")
}
document.addEventListener("keypress",function(e){
	if (e.ctrlKey) return // if switching tab or whatever
	if (["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { // if inputting something
		if (["value","innerHTML"].map(x=>document.activeElement[x]).includes("6")&&e.key=="9") addSecretAchievement(10)
		return
	}
	if (StudyE(1)) {	
		notify("Hotkeys are disabled in Study I","#990000","#ffffff")
		return
	}
	let key = (e.shiftKey?"shift+":"")+e.code
	if (hotkeys.isChanging) {
		d.display("div_fancyPopupScreen","none")
		g.hotkeys[hotkeys.toBeChanged]=key
		hotkeys.isChanging=false
	} else {
		for (let i of Object.keys(g.hotkeys)) {if (g.hotkeys[i]==key) {if (hotkeys.hotkeyList[i].visible()) {hotkeys.hotkeyList[i].action()}}}
	}
})