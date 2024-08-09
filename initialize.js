"use strict";
var gameloop
var fineGrainLoop
var savePreLoad
/* This is necessary for the loading animation to update.*/
const initSteps = [
	{function:function(){savePreLoad = btoa(localStorage.getItem("save"))}},
	{function:function(){d.element("loadScreenExport").innerText = savePreLoad}},
	{function:function(){if(debugActive){
		for(let id of Object.keys(research)){validateResearch(id)}
		for(let stat of Object.keys(miscStats).filter(x=>miscStats[x].type==="breakdown")){for(let i=0;i<miscStats[stat].modifiers.length;i++){if(typeof miscStats[stat].modifiers[i].show!=="function"){error("miscStats."+stat+".modifiers["+i+"].show is undefined")}}}
	}}},
	{function:function(){load(JSON.parse(localStorage.getItem("save")));}},
	{function:function(){HTMLGenerator()}},
	{function:function(){
		d.innerHTML("span_currentVersion",version.current+(betaActive?(" "+version.percentage()):""))
		document.title="Exotic Matter Dimensions "+version.current+" by alemaninc"
	}},
	{function:function(){updateYellowLightCache();},onImport:true},
	{function:function(){for (let i=0;i<2;i++) study13.updateRewardLevels()},onImport:true},
	{function:function(){for (let tier of Object.keys(achievementList)) {achievement.perAchievementReward[tier].currentVal = achievement.perAchievementReward[tier].calc(achievement.ownedInTier(tier))}},onImport:true},
	{function:function(){if (debugActive) {for (let stat of Object.keys(miscStats).filter(x=>x.type==="breakdown")) {for (let i=0;i<miscStats[stat].modifiers.length;i++) {if (miscStats[stat].modifiers[i]) error("stat."+stat+" modifier "+i+" has no <samp>show</samp> property")}}}}},
	{function:function(){for (let i of Object.keys(miscStats)) statGeneration(i)}},
	{function:function(){statOrder = Object.keys(statGenerations).sort((a,b)=>statGenerations[a]-statGenerations[b])}},
	{function:function(){updateStats()},onImport:true},
	{function:function(){updateMasteryLayout()},onImport:true},
	{function:function(){updateStarLayout()},onImport:true},
	{function:function(){updateAchievementsTab();},onImport:true},
	{function:function(){updateSecretAchievementsTab();},onImport:true},
	{function:function(){
		for (let i of largeNumberVisualizationNumbers) i.value = N(i.value)
		largeNumberVisualizationNumbers.sort((a,b)=>a.value-b.value)
	}},
	{function:function(){
		if ((new Date().getUTCMonth()===3)&&(new Date().getUTCDate()===1)) {g.colortheme = "Light"}
		theme()
	},onImport:true},
	{function:function(){updateResearchTree()},onImport:true},
	{function:function(){for (let i of Object.keys(research)){resizeResearch(i)}}},
	{function:function(){generateResearchCanvas();},onImport:true},
	{function:function(){study13.renderTree()}},
	{function:function(){for (let i of study13.allBindings){study13.resizeBinding(i)}}},
	{function:function(){study13.updateBindingTree()},onImport:true},
	{function:function(){for (let i=0;i<12;i++) {
		d.element("axisAutobuyerMax"+axisCodes[i]).value=g.axisAutobuyerCaps[i];
		d.element("darkAxisAutobuyerMax"+axisCodes[i]).value=g.darkAxisAutobuyerCaps[i];
	};},onImport:true},
	{function:function(){d.element("darkAxisAutobuyerMaxStars").value=g.darkAxisAutobuyerCaps[12];},onImport:true},
	{function:function(){for (let i=0;i<5;i++) {d.element("stardustUpgradeAutobuyerMax"+(i+1)).value=g.stardustUpgradeAutobuyerCaps[i]}},onImport:true},
	{function:function(){d.element("starAutobuyerMax").value=g.starAutobuyerCap;},onImport:true},
	{function:function(){d.element("wormholeAutomatorValue").value=g.wormholeAutomatorValue;},onImport:true},
	{function:function(){d.element("stardustAutomatorValue").value=g.stardustAutomatorValue;},onImport:true},
	{function:function(){addSecretAchievement(2);},onImport:true},
	{function:function(){statBreakdownCategories();}},
	{function:function(){for (let i of Object.keys(subtabProperties)) {for (let j of Object.keys(subtabProperties[i])) {
		if (subtabProperties[i][j].visible===undefined) subtabProperties[i][j].visible = ()=>true
		if (subtabProperties[i][j].glow===undefined) subtabProperties[i][j].glow = ()=>false
	}}}},
	{function:function(){for (let i=0;i<newsList.length;i++) {try {if (typeof newsList[i].text!=="string") error("News item #"+i+" is undefined")} catch {error("News item #"+i+" is undefined")}}}},
	{function:function(){d.display("foo","none")}},
	{function:function(){
		openTab(g.activeTab)
		for (let i of Object.keys(g.activeSubtabs)) openSubTab(i,g.activeSubtabs[i])
	},onImport:true},
	{function:function(){
		openTopLevelDiv("game")
		for (let i=0;i<newsList.length;i++) {
			d.innerHTML("newsline",newsList[i].text)
			newsList[i].frequency = 1/(viewportWidth()+d.element("newsline").offsetWidth)
		}
		openTopLevelDiv("loadScreen")
	}},
	{function:function(){
		updateHTML();
		fineGrainTick();
		if (gameHalted) return
		gameloop = window.setInterval(auto_tick,50);
		fineGrainLoop = window.setInterval(fineGrainTick,10);
	}},
	{function:function(){
		d.element("span_footerDiscord").href = discordInvite
	}},
	{function:function(){
		nextNewsItem()
		openTopLevelDiv("game");
		window.onerror = (e,s,l,c,o)=>{error(e+" at "+s.substring(debugActive?149:53)+" "+l+":"+c+"<br>"+o)}
		initComplete = true;
	}},
	{function:function(){
		if (g.research.r8_8) unlockFeature("Light")
		if (g.research.r12_8) unlockFeature("Galaxies")
	},onImport:true}
]
var loadProgress = 0;
var initTick = Date.now();
function initp() {
	d.innerHTML("span_loadPercentage",(loadProgress/initSteps.length*100).toFixed(1));
	d.element("loadprogress").style.background = "linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0) "+(loadProgress/initSteps.length*100)+"%,rgba(102,102,102,0.9) "+(loadProgress/initSteps.length*100)+"%,rgba(102,102,102,0.9)),rgba(0,255,0,1)";
}
for (let i=0;i<initSteps.length;i++) {initSteps[i].function();loadProgress++;initp()}