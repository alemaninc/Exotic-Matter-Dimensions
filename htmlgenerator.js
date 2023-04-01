const HTMLGenerator = {
  topResourceModal: function() {
    let out = "";
    for (let i=0;i<topResources.length;i++) out+="<div id=\"div_topResource"+i+"\" class=\"resource\"><span id=\"span_topResource"+i+"Before\"></span> "+topResources[i].label+" <span id=\"span_topResource"+i+"After\"></span></div>";
    d.innerHTML("resourceModal",out);
  },
  axisTable: function() {
    let out = "";
    for (let name of axisCodes) {
      out+="<button class=\"lockedaxisbutton\" onClick=\"buyAxis('"+name+"')\" id=\"button_"+name+"Axis\" style=\"display:none\">"+name+" Axis (<span id=\"span_"+name+"AxisAmount\"></span>)<br>"+axisEffectHTML[name].replace("{e}","<span id=\"span_"+name+"AxisEffect\"></span>")+"<br>Cost: <span id=\"span_"+name+"AxisCost\"></span></button>";
    }
    for (let name of empowerableAxis) {
      out+="<button class=\"empoweredaxis\" id=\"button_empowered"+name+"Axis\" onClick=\"buyEmpoweredAxis()\" style=\"display:none\">Empowered "+name+" Axis (<span id=\"span_empowered"+name+"AxisAmount\"></span>)<br>"+axisEffectHTML[name+"Empowered"]+"</button>";
    }
    d.innerHTML("div_normalAxisContainer",out);
  },
  darkAxisTable: function() {
    let out = "";
    for (let name of axisCodes) {
      out+="<button class=\"lockedaxisbutton\" onClick=\"buyDarkAxis('"+name+"')\" id=\"button_dark"+name+"Axis\">Dark "+name+" Axis (<span id=\"span_dark"+name+"AxisAmount\"></span>)<br>"+axisEffectHTML["dark"+name].replace("{e}","<span id=\"span_dark"+name+"AxisEffect\"></span>").replace("{e2}","<span id=\"span_dark"+name+"AxisEffectAlt\"></span>")+"<br>Cost: <span id=\"span_dark"+name+"AxisCost\"></span><div style=\"position:absolute;top:5px;right:7px;color:rgba(0,0,0,0.5);font-size:7px\">Dark star boost: <span id=\"span_darkStarEffect2"+name+"\"></span></div></button>";
    }
    for (let name of empowerableDarkAxis) {
      out+="<button class=\"empoweredaxis\" id=\"button_empoweredDark"+name+"Axis\" onClick=\"buyEmpoweredAxis()\" style=\"display:none\">Empowered Dark "+name+" Axis (<span id=\"span_empoweredDark"+name+"AxisAmount\"></span>)<br>"+axisEffectHTML["dark"+name+"Empowered"]+"</button>";
    }
    d.innerHTML("div_darkAxisContainer",out);
  },
  masteries: function() {
    d.innerHTML("masteryContainer","<table>"+Array(totalMasteryRows+1).fill(0).map((x,row)=>(row==0)?"":("<tr id=\"masteryRow"+row+"\"><td style=\"width:180px\"><h3 class=\"_mastery\">Row "+row+"</h3></td><td style=\"width:160px\"><button style=\"height:18px;width:150px;border-radius:9px\" onClick=\"g.activeMasteries["+row+"]=0;masteryReset()\">Unassign Row "+row+" Mastery</button></td><td style=\"width:calc(100vw - 400px)\">"+Object.keys(masteryData).filter(code => Math.floor(code/10)==row).map(code => "<button class=\"masterybutton\" id=\"button_mastery"+code+"\" onClick=\"showMasteryInfo("+code+",3);shownMastery="+code+"\"><div style=\"position:absolute;font-size:8px;top:3px;left:3px;text-align:center;color:rgba(255,255,255,0.4)\">"+code+"</div><div id=\"span_mastery"+code+"Boost\" style=\"position:absolute;font-size:8px;top:3px;right:3px;text-align:center;color:rgba(255,255,255,0.4)\"></div><div id=\"span_mastery"+code+"Active\" style=\"position:absolute;font-size:8px;bottom:3px;left:3px;width:70px;text-align:center;color:rgba(255,255,255,0.4)\"></div>"+masteryData[code].icon+"</button>").join("")+"</td></tr>")).join("")+"</table>")
  },
  achievements: function() {
    let out = "";
    let tiers = Object.keys(achievementList);
    for (let tier of tiers) {
      out+="<div class=\"achievementtiercontainer\" style=\"background-color:"+achievement.tierColors[tier][0]+";border-color:"+achievement.tierColors[tier][1]+"\" id=\"div_achievementTier"+tier+"\">";
      out+="<table style=\"table-layout:fixed\"><tr><td style=\"width:49vw\"><h3 style=\"text-decoration:underline;color:"+achievement.tierColors[tier][1]+"\">"+achievement.tierName(tier)+" (<span id=\"span_ownedTier"+tier+"Achievements\"></span>"+(tier=="s"?"":("/"+Object.keys(achievementList[tier]).length))+")</h3></td><td style=\"width:49vw;color:#ffffff\">"+achievement.perAchievementReward[tier]+"</td></tr></table><br>";
      for (let ach of Object.keys(achievementList[tier])) {
        let next = achievement(ach);
        out+="<button class=\"achievement\" id=\"div_achievement"+ach+"\" onMouseover=\"showAchievementInfo('"+ach+"')\">"+next.name+"</button>";
      }
      out+="</div>";
    }
    d.innerHTML("achievementContainer",out);
    if (g.ownedAchievements.length==0) d.display("span_noAchievements","inline-block")
  },
  previousPrestiges() {
    for (let i=1;i<11;i++) {
      d.element("table_last10StardustRuns").innerHTML += "<tr id=\"last10StardustRuns_row"+i+"\"><td style=\"width:30px\" class=\"tablecell\">"+i+"</td><td id=\"span_last10StardustRuns_time"+i+"\" style=\"width:calc(33vw - 30px)\" class=\"tablecell\"></td><td id=\"span_last10StardustRuns_gain"+i+"\" style=\"width:calc(33vw - 30px)\" class=\"tablecell\"></td><td style=\"width:calc(33vw - 30px)\" class=\"tablecell\"><button id=\"button_last10StardustRuns_build"+i+"\" onClick=\"previousPrestige.showBuild('stardust','last',"+i+")\">Show <span class=\"previousPrestigeBuildList\"></span> builds</button></td></tr>"
      d.element("table_last10WormholeRuns").innerHTML += "<tr id=\"last10WormholeRuns_row"+i+"\"><td style=\"width:30px\" class=\"tablecell\">"+i+"</td><td id=\"span_last10WormholeRuns_time"+i+"\" style=\"width:calc(33vw - 30px)\" class=\"tablecell\"></td><td id=\"span_last10WormholeRuns_gain"+i+"\" style=\"width:calc(33vw - 30px)\" class=\"tablecell\"></td><td style=\"width:calc(33vw - 30px)\" class=\"tablecell\"><button id=\"button_last10WormholeRuns_build"+i+"\" onClick=\"previousPrestige.showBuild('wormhole','last',"+i+")\">Show <span class=\"previousPrestigeBuildList\"></span> builds</button></td></tr>"
    }
    let stardustRuns = previousPrestige.stardustRunsStored
    let wormholeRuns = previousPrestige.wormholeRunsStored
    for (let i=0;i<stardustRuns.length;i++) {
      d.element("div_previousStardustRuns").innerHTML += "<div id=\"div_previousStardustRun"+i+"\" class=\"previousPrestige previousPrestige_"+["wormhole","spacetime","eternity"][stardustRuns[i].layer-2]+"\"><h1 style=\"font-size:20px\">"+stardustRuns[i].label+"</h1><br><span id=\"span_previousStardustRun"+i+"_gain\" class=\"big _stardust\"></span> stardust gained in <span id=\"span_previousStardustRun"+i+"_time\" class=\"big _time\"></span><br><button class=\"narrowbar\" id=\"button_previousStardustRun"+i+"\" onClick=\"previousPrestige.showBuild('stardust','record',"+i+")\"><span class=\"previousPrestigeBuildList\"></span> build</button></div>"
    }
    for (let i=0;i<wormholeRuns.length;i++) {
      d.element("div_previousWormholeRuns").innerHTML += "<div id=\"div_previousWormholeRun"+i+"\" class=\"previousPrestige previousPrestige_"+["spacetime","eternity"][wormholeRuns[i].layer-3]+"\"><h1 style=\"font-size:20px\">"+wormholeRuns[i].label+"</h1><br><span id=\"span_previousWormholeRun"+i+"_gain\" class=\"big _wormhole\"></span> HR gained in <span id=\"span_previousWormholeRun"+i+"_time\" class=\"big _time\"></span> (<span id=\"span_previousWormholeRun"+i+"_efficiency\" class=\"big _wormhole\"></span>)<br><button class=\"narrowbar\" id=\"button_previousWormholeRun"+i+"\" onClick=\"previousPrestige.showBuild('wormhole','record',"+i+")\"><span class=\"previousPrestigeBuildList\"></span> build</button></div>"
    }
  },
  stardustBoosts: function() {
    let out = "";
    for (let i=1;i<13;i++) {
      out+="<div class=\"stardustboost\" id=\"div_stardustBoost"+i+"\"><span class=\"huge _stardust\">#"+i+"</span><br>"+stardustBoostText[i].replace("{v}","<span id=\"span_stardustBoost"+i+"Value\" class=\"big _stardust\"></span>").replace("{t}","<span id=\"span_stardustBoost"+i+"Tooltip\"></span>")+"</div>"
    }
    d.innerHTML("div_stardustBoostContainer",out)
  },
  stardustUpgrades: function() {
    let out = ""
    for (let i=1;i<6;i++) {
      out+="<button id=\"button_stardustUpgrade"+i+"\" class=\"lockedaxisbutton\" onClick=\"buyStardustUpgrade("+i+")\"><div style=\"position:absolute;font-size:8px;top:3px;left:3px\">#"+i+" ("+stardustUpgradeNames[i]+" Path)</div><div style=\"position:absolute;font-size:8px;top:3px;right:3px\"><span id=\"span_stardustUpgrade"+i+"Level\"></span> purchased</div><span id=\"span_stardustUpgrade"+i+"Tooltip\"></span></button>"
    }
    d.innerHTML("div_stardustUpgradeContainer",out)
  },
  stars: function() {
    let out = "<table>"
    for (let row=1;row<11;row++) {
      out+="<tr id=\"starRow"+row+"\"><td style=\"width:240px;color:#ffffff;font-size:10px\"><span style=\"font-weight:900\">Row "+row+"</span><br><span id=\"span_row"+row+"StarsAvailable\"></span> available</td>"
      for (let col=1;col<5;col++) {
        out+="<td><button class=\"starbutton\" id=\"button_star"+(row*10+col)+"\" onClick=\"buyStarUpgrade("+(row*10+col)+")\">"+starText(row*10+col).replace("{x}","<span id=\"span_star"+(row*10+col)+"Effect\"></span>")+"</button></td>"
      }
      out+="</tr>"
    }
    out+="</table>"
    d.innerHTML("starContainer",out)
  },
  energy: function() {
    for (let i=0;i<energyTypes.length;i++) {
      d.element("Energy").innerHTML += "<div class=\"energydivision\" id=\""+energyTypes[i]+"EnergyDiv\">You have <span class=\"big _energy\" id=\""+energyTypes[i]+"EnergyAmount\"></span> "+energyTypes[i]+" energy.<br>It is being multiplied by <span class=\"big _energy\" id=\""+energyTypes[i]+"EnergyPerSec\"></span> per second (based on "+energyDeterminers[i]+").<br>"+energyResources[i]+" is being "+[null,null,"multiplied by","raised to the power of"][energyHyper[i]]+" <span class=\"big _energy\" id=\""+energyTypes[i]+"EnergyEffect\"></span>"+(i==5?(" (need 10 "+energyTypes[i]+"energy)"):(" (need more "+energyTypes[i]+" energy than "+energyDeterminers[i]+")"))+".</div>";
    }
  },
  wormholeMilestones: function() {
    d.innerHTML("wormholeMilestoneContainer",wormholeMilestoneList.map(x => "<div class=\"wormholeMilestone\" id=\"div_wormholeMilestone"+x[0]+"\"><h3>"+x[0]+" achievement"+((x[0]==1)?"":"s")+"</h3><p>"+x[1].replace("{v}","<span id=\"span_wormholeMilestone"+x[0]+"Effect\"></span>")+"</p></div>").join(""))
  },
  research: function() {
    let table = "<table>";
    for (let row=1;row<=researchRows;row++) {
      table+="<tr id=\"researchRow"+row+"\">";
      for (let col=1;col<16;col++) {
        let id="r"+row+"_"+col;
        if (research[id]==undefined) {table+="<td style=\"height:72px;width:72px\"></td>";}
        else {table+="<td style=\"height:72px;width:72px\"><button id=\"button_research_"+id+"_visible\" class=\"researchButton "+research[id].type+"ResearchButton\" onClick=\"buyResearch("+row+","+col+")\" onMouseover=\"showResearchInfo("+row+","+col+")\">"+research[id].icon+"</button><button id=\"button_research_"+id+"_unknown\" class=\"researchButton unknownResearchButton\"></button></td>";}
      }
      table+="</tr>";
    }
    table+="</table>";
    d.innerHTML("researchTable",table);
  },
  studies: function() {
    let out = "";
    for (let index of Object.keys(studies)) {
      out+="<div id=\"div_study"+index+"\"><h2 style=\"text-decoration:underline\">Study "+roman(index)+": "+studies[index].name+"</h2><p>"+studies[index].description()+"</p>";
      out+="<button id=\"button_study"+index+"_0\" class=\"startStudyEnabled\" onClick=\"wormholeReset('force')\">Abort Study</button>";
      out+="<button id=\"button_study"+index+"_1\" class=\"startStudyTrapped\">Trapped in</button>";
      out+="<button id=\"button_study"+index+"_2\" class=\"startStudyEnabled\" onClick=\"enterStudy("+index+")\">Start</button>";
      out+="<button id=\"button_study"+index+"_3\" class=\"startStudyDisabled\">Already in Study <span id=\"span_study"+index+"_button3ActiveStudy\"></span></button>";
      out+="<button id=\"button_study"+index+"_4\" class=\"startStudyDisabled\">Need research "+researchOut(studies[index]["research"])+"</button>";
      out+="<hr><p>Goal: <span id=\"span_study"+index+"Goal\"></span> total dark axis</p><p><span id=\"span_study"+index+"Completions\"></span>/4 completions<hr><p>Reward:<br><span id=\"span_study"+index+"Reward\"></span></div>";
    }
    d.innerHTML("Studies",out);
  }
}