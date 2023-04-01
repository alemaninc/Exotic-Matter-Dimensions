"use strict";
function EMfix(x) {
	let vars = ["exoticmatter","totalexoticmatter","exoticmatterThisStardustReset","exoticmatterThisWormholeReset","exoticmatterThisSpacetimeReset"];
	for (let i of vars) g[i] = N(x);
}
function timeFix(x) {
	let vars = ["timePlayed","timeThisStardustReset","timeThisWormholeReset","timeThisSpacetimeReset"];
	for (let i of vars) {
		g[i] = x;
		g["true"+i] = N(x);
	}
}
const oldSaveLoaders = {
	v1_0: function(savegame) {
		console.log("v1.0 save loaded")
		g.stardustAutomatorMode = stardustAutomatorModes[["amount","time","mult","pow"].indexOf(g.stardustAutomatorMode)]
		g.wormholeAutomatorMode = wormholeAutomatorModes[["amount","time","mult","pow"].indexOf(g.wormholeAutomatorMode)]
	},
	beta: function(savegame) {
		console.log("Beta save loaded")
		g = Object.assign({},basesave);
		if (savegame.stardustUpgrades == undefined) {
			// alpha saves are beyond saving.
		} else if (axisCodes.map(x => savegame["dark"+x+"Axis"]).reduce((x,y)=>x+y)>=1000) {
			g.stardust=N("e1000");
			g.StardustResets=30;
			timeFix(86400);
			g.activeMasteries=[null,2,2,2,3,2,2,2,4,2,0];
			g.stardustUpgrades=[4,9,6,5,7];
			g.stars=23;
			g.ownedStars=[11,12,13,14,21,22,23,24,31,32,33,34,41,42,43,44,51,52,53,54,62,63,72];
			g.axisAutobuyerOn=true;
			g.axisAutobuyerUpgrades=77;
			g.darkXAxis=N(savegame.darkXAxis);
			g.darkYAxis=N(savegame.darkYAxis);
			g.darkZAxis=N(savegame.darkZAxis);
			g.darkWAxis=N(savegame.darkWAxis);
			g.darkVAxis=N(savegame.darkVAxis);
			g.darkUAxis=N(savegame.darkUAxis);
			g.darkTAxis=N(savegame.darkTAxis);
			g.darkSAxis=N(savegame.darkSAxis);
			g.ownedAchievements=[101,102,103,104,105,106,107,108,109,110,111,112,113,115,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,301,302,303,304,305,306,307,308,309,310,311,312,401,402,403,404,405,406,407,408,409,412,413];
		} else if (savegame.stardustUpgrades[4] == 7) {
			g.stardust=N("e315");
			g.StardustResets=20;
			timeFix(60000);
			g.activeMasteries=[null,2,2,2,3,2,2,2,4,2,0];
			g.stardustUpgrades=[4,9,6,5,7];
			g.stars=23;
			g.ownedStars=[11,12,13,14,21,22,23,24,31,32,33,34,41,42,43,44,51,52,53,54,62,63,72];
			g.axisAutobuyerOn=true;
			g.axisAutobuyerUpgrades=77;
			g.darkXAxis=N(41);
			g.darkYAxis=N(46);
			g.darkZAxis=N(64);
			g.darkWAxis=N(24);
			g.darkVAxis=N(35);
			g.darkUAxis=N(14);
			g.darkTAxis=N(25);
			g.darkstars=N(25);
			g.ownedAchievements=[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,301,302,303,304,305,306,307,308,309,310,311,312,401,402,403,404,405,406,407,408,409,412,413];
		} else if (savegame.stardustUpgrades[4] == 6) {
			g.stardust=N(1e275);
			g.StardustResets=18;
			timeFix(48000);
			g.activeMasteries=[null,2,2,2,3,2,2,2,4,2,0];
			g.stardustUpgrades=[4,9,5,5,6];
			g.stars=21;
			g.ownedStars=[11,12,13,14,21,22,23,24,31,32,33,34,41,42,43,44,51,53,54,62,63];
			g.axisAutobuyerOn=true;
			g.axisAutobuyerUpgrades=77;
			g.darkmatter=N(1e62);
			g.darkXAxis=N(36);
			g.darkYAxis=N(40);
			g.darkZAxis=N(56);
			g.darkWAxis=N(22);
			g.darkVAxis=N(31);
			g.darkUAxis=N(12);
			g.darkTAxis=N(19);
			g.darkstars=N(20);
			g.ownedAchievements=[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,301,302,307,308,309,310,311,312,402,403,404,405,406];
		} else if (savegame.stardustUpgrades[4] == 5) {
			g.stardust=N(1e225);
			g.StardustResets=17;
			timeFix(40000);
			g.activeMasteries=[null,2,2,2,3,2,2,2,4,2,0];
			g.stardustUpgrades=[4,9,5,5,5];
			g.stars=20;
			g.ownedStars=[11,12,13,14,21,22,23,24,31,32,33,34,41,42,43,44,51,53,54,63];
			g.axisAutobuyerOn=true;
			g.axisAutobuyerUpgrades=77;
			g.darkmatter=N(1e55);
			g.darkXAxis=N(22);
			g.darkYAxis=N(22);
			g.darkZAxis=N(29);
			g.darkWAxis=N(13);
			g.darkVAxis=N(15);
			g.darkUAxis=N(5);
			g.darkstars=N(11);
			g.ownedAchievements=[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,301,302,308,309,310,311,312,402,403,404,405];
		} else if (savegame.stardustUpgrades[4] == 4) {
			g.stardust=N(1e180);
			g.StardustResets=15;
			timeFix(36000);
			g.activeMasteries=[null,2,2,2,3,2,2,2,4,2,0];
			g.stardustUpgrades=[4,9,5,5,4];
			g.stars=18;
			g.ownedStars=[11,12,13,14,21,22,23,24,31,32,33,34,41,43,44,51,53,63];
			g.axisAutobuyerOn=true;
			g.axisAutobuyerUpgrades=77;
			g.darkmatter=N(1e49);
			g.darkXAxis=N(20);
			g.darkYAxis=N(20);
			g.darkZAxis=N(27);
			g.darkWAxis=N(12);
			g.darkVAxis=N(13);
			g.darkUAxis=N(4);
			g.darkstars=N(10);
			g.ownedAchievements=[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,301,302,308,309,310,311,312,402,403,404];
		} else if (savegame.stardustUpgrades[4] == 3) {
			g.stardust=N(1e99);
			g.StardustResets=13;
			timeFix(30000);
			g.activeMasteries=[null,2,2,2,3,2,2,2,0,0,0];
			g.stardustUpgrades=[4,8,4,4,3];
			g.stars=15;
			g.ownedStars=[11,12,13,14,21,22,23,24,31,32,33,34,41,43,53];
			g.axisAutobuyerOn=true;
			g.axisAutobuyerUpgrades=77;
			g.darkmatter=N(1e23);
			g.darkXAxis=N(15);
			g.darkYAxis=N(13);
			g.darkZAxis=N(17);
			g.darkWAxis=N(7);
			g.darkVAxis=N(2);
			g.darkstars=N(4);
			g.ownedAchievements=[101,102,103,104,105,107,108,109,110,111,112,113,114,115,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,301,302,308,309,311,312,402,403];
		} else if (savegame.stardustUpgrades[4] == 2) {
			g.stardust=N(1e62);
			g.StardustResets=10;
			timeFix(22500);
			g.activeMasteries=[null,2,2,2,3,2,2,2,0,0,0];
			g.stardustUpgrades=[4,8,3,4,2];
			g.stars=12;
			g.ownedStars=[11,12,13,14,21,22,23,24,31,33,34,43];
			g.axisAutobuyerOn=true;
			g.axisAutobuyerUpgrades=30;
			g.darkmatter=N(1e12);
			g.darkXAxis=N(10);
			g.darkYAxis=N(8);
			g.darkZAxis=N(7);
			g.darkWAxis=N(2);
			g.ownedAchievements=[101,102,103,104,105,107,108,109,110,111,112,113,114,115,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,301,302,308,311,312,402];
			g.featuresUnlocked=["Masteries","Stardust","Dark Matter","Energy"];
			g.storySnippets=["Stardust","Dark Matter","Energy"];
		} else if (savegame.stardustUpgrades[4] == 1) {
			g.stardust=N(1e12);
			g.StardustResets=4;
			timeFix(18000);
			g.activeMasteries=[null,2,2,2,3,2,0,0,0,0,0];
			g.stardustUpgrades=[2,5,1,2,1];
			g.stars=6;
			g.ownedStars=[11,12,14,21,24,34];
			g.axisAutobuyerOn=true;
			g.axisAutobuyerUpgrades=20;
			g.darkmatter=N(100);
			g.darkXAxis=N(2);
			g.ownedAchievements=[101,102,103,104,107,108,109,110,111,112,113,114,115,201,202,207,208,211,212,216,301];
			g.featuresUnlocked=["Masteries","Stardust","Dark Matter"];
			g.storySnippets=["Stardust","Dark Matter"];
		} else if (savegame.stardust > 0) {
			g.stardust=N(50);
			g.StardustResets=1;
			timeFix(13000);
			g.activeMasteries[null,2,2,2,3,0,0,0,0,0,0];
			g.stardustUpgrades=[0,1,0,1,0];
			g.ownedAchievements=[101,102,103,104,113,114,115,201];
			g.featuresUnlocked=["Masteries","Stardust"];
			g.storySnippets=["Stardust"];
		} else if (savegame.totalexoticmatter > 22) {
			EMfix(1e25);
			g.XAxis=N(21);
			g.YAxis=N(14);
			g.ZAxis=N(9);
			g.WAxis=N(6);
			timeFix(12000);
			g.baseMasteryPowerGain=N(1200);
			g.baseMasteryPowerGain=N(1e8);
			g.activeMasteries=[null,2,1,2,2,0,0,0,0,0,0];
			g.ownedAchievements=[101,102,103,104,113,114,115];
			g.featuresUnlocked=["Masteries"];
			g.storySnippets=[];
		} else if (savegame.totalexoticmatter > 17) {
			EMfix(1e16);
			g.XAxis=N(17);
			g.YAxis=N(12);
			g.ZAxis=N(6);
			g.WAxis=N(5);
			timeFix(7500);
			g.baseMasteryPowerGain=N(1200);
			g.masteryPower=N(1e7);
			g.activeMasteries=[null,2,1,1,0,0,0,0,0,0,0];
			g.ownedAchievements=[101,102,103,104,113,115];
			g.featuresUnlocked=["Masteries"];
			g.storySnippets=[];
		} else if (savegame.totalexoticmatter > 6) {
			EMfix(1e5);
			g.XAxis=N(7);
			g.YAxis=N(7);
			g.ZAxis=N(1);
			timeFix(2400);
			g.baseMasteryPowerGain=N(400);
			g.masteryPower=N(1e5);
			g.activeMasteries=[null,2,1,0,0,0,0,0,0,0,0];
			g.ownedAchievements=[101,102,103];
			g.featuresUnlocked=["Masteries"];
			g.storySnippets=[];
		} else {
			return;  // no progress skip
		}
		g.ownedAchievements = g.ownedAchievements.map(x => String(x));
	}
}