"use strict";
var gameloop
var initComplete = false
/* This is necessary for the loading animation to update.*/
const initSteps = [
  function(){load("normal");},
  function(){
    let versionName = "𝕍1.1.7"
    d.innerHTML("span_currentVersion",versionName)
    document.title="Exotic Matter Dimensions "+versionName+" by alemaninc"
    g.version = 1000507
  },
  function(){for (let i of Object.keys(statGenerations)) statGeneration(i)},
  function(){statOrder = Object.keys(statGenerations).sort((a,b)=>statGenerations[a]-statGenerations[b])},
  function(){updateStats()},
  function(){HTMLGenerator.topResourceModal();},
  function(){HTMLGenerator.axisTable();},
  function(){HTMLGenerator.darkAxisTable();},
  function(){HTMLGenerator.masteries();},
  function(){HTMLGenerator.achievements();},
  function(){updateAchievementsTab();},
  function(){HTMLGenerator.secretAchievements();},
  function(){updateSecretAchievementsTab();},
  function(){
    for (let i=g.ownedAchievements.length-1;i>=0;i--) {
      try {
        achievement(g.ownedAchievements[i])
      }
      catch {
        g.ownedAchievements.splice(i,1)
      }
    }
    g.ownedSecretAchievements = g.ownedSecretAchievements.filter(x => secretAchievementList[x] !== undefined)
  },
  function(){HTMLGenerator.dilationUpgrades();},
  function(){HTMLGenerator.previousPrestiges();},
  function(){HTMLGenerator.stardustBoosts();},
  function(){HTMLGenerator.stardustUpgrades();},
  function(){showingCappedStardustUpgradesOptionHTML();},
  function(){HTMLGenerator.stars();},
  function(){HTMLGenerator.energy();},
  function(){if (StudyE(1)) openTab("Wormhole");},
  function(){theme();},
  function(){HTMLGenerator.wormholeMilestones();},
  function(){HTMLGenerator.research();},
  function(){updateResearchTree()},
  function(){generateResearchCanvas();},
  function(){HTMLGenerator.studies();},
  function(){updateAllStudyDivs();},
  function(){for (let i=0;i<8;i++) {
    d.element("axisAutobuyerMax"+axisCodes[i]).value=g.axisAutobuyerCaps[i];
    d.element("darkAxisAutobuyerMax"+axisCodes[i]).value=g.darkAxisAutobuyerCaps[i];
  };},
  function(){d.element("darkAxisAutobuyerMaxStars").value=g.darkAxisAutobuyerCaps[12];},
  function(){d.element("starAutobuyerMax").value=g.starAutobuyerCap;},
  function(){d.element("wormholeAutomatorValue").value=g.wormholeAutomatorValue;},
  function(){d.element("stardustAutomatorValue").value=g.stardustAutomatorValue;},
  function(){addSecretAchievement(2);},
  function(){statBreakdownCategories();},
  function(){
    updateHTML();
    gameloop = window.setInterval(auto_tick,50);
    openTopLevelDiv("game");
    initComplete = true;
  },
]
var loadProgress = 0;
var initTick = Date.now();
function initp() {
	d.innerHTML("span_loadPercentage",(loadProgress/initSteps.length*100).toFixed(1));
  d.element("loadprogress").style.background = "linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0) "+(loadProgress/initSteps.length*100)+"%,rgba(102,102,102,0.9) "+(loadProgress/initSteps.length*100)+"%,rgba(102,102,102,0.9)),rgba(0,255,0,1)";
}
function init() {
  if (loadProgress==initSteps.length) return
  initSteps[loadProgress]();
	loadProgress++;
  if (Date.now()-initTick>50) {
    initTick = Date.now();
    initp();
    setTimeout(init,0);
  } else {
    init();
  }
}
init();