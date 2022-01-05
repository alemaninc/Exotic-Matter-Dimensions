// Custom library for handling large numbers because I couldn't get break_infinity.js to work. If someone knows how to improve this that would be welcome
function infAdd(x,y) {                 // Adds two exponents - for example, infAdd(1,0) returns 1.0414 (log(10+1)) 
  if (Math.abs(x-y)>16) {              // If the quotient of x and y is more than 1e+16, the addition is negligible
    return Math.max(x,y)
  } else {
    z = Math.min(x,y)
    return z+Math.log10(10**(x-z)+10**(y-z))
  }
}
function infSubtract(x,y) {            // Subtracts two exponents - if y is greater than x an error message is output. For example, infSubtract(1,0) returns 0.9542 (log(10-1))
  if (x-y>16) {                        // If y is less than 1/1e+16 of x, the subtraction is negligible
    return x
  } else if (x==y) {                   // If x and y are equal, 1/1e+100 is output as if the program tried to compute it -Infinity would be output
    return -100
  } else if (y>x) {                    // If a negative value would be output, 0 is output instead as the library can't support negative numbers. However, the game has controls in place to make sure negative values never occur
    return 0
  } else {
    return x+Math.log10(1-10**(y-x))
  }
}
function infFormat(x,y) {                // Formats an exponent as a regular number. For example, infFormat(1.301) returns 20 while infFormat(100.602) returns 4e+100
  if (x>33 || (notation=="Scientific" && x>3)) {                          // Scientific notation is used past 1e33. Number is rounded to 3 sf so that it can be read
    return Math.floor(100*10**(x%1))/100+"e"+Math.floor(x)
  } else if (x>3) {                    // Standard notation is used for numbers between 1e3 and 1e33 if Scientific notation is off
    const endings=["K","M","B","T","Qa","Qt","Sx","Sp","Oc","No"]
    return Math.floor(100*10**(x%3))/100+" "+endings[Math.floor(x/3)-1]
  } else if ((x<1)&&y) {                 // If parameter y is true, 2 decimal digits are displayed if the number is less than 10. If not, the value is always an integer
    return Math.floor(10**x*100)/100
  } else {
    return Math.floor(10**x+0.00001)               // Decimals are rounded down
  }
}
function normFormat(x) {               // Formats a regular number the same way infOperators (exponents) would be formatted
  if (x>1000) {
    return infFormat(Math.log10(x))
  } else {
    return Math.floor(x*100)/100
  }
}
function twoDigits(x) {                // Formats a one-digit number as two digits. For example, twoDigits(7) returns 07
  x=Math.floor(x)
  if (x<10) {
    return "0"+x
  } else {
    return x
  }
}
function timeFormat(x) {               // Formats an amount of seconds as a time. For example, timeFormat(73) returns 1:13 and timeFormat(90123) returns 1 day 1:02:03
  if (x<10) {
    return Math.floor(x*1000)/1000+" seconds"
  } else if (x<60) {
    return Math.floor(x)+" seconds"
  } else if (x<3600) {
    return Math.floor(x/60)+":"+twoDigits(Math.floor(x%60))
  } else if (x<86400) {
    return Math.floor(x/3600)+":"+twoDigits(Math.floor(x/60)%60)+":"+twoDigits(Math.floor(x%60))
  } else {
    return Math.floor(x/86400)+" days "+Math.floor(x/3600)%24+":"+twoDigits(Math.floor(x/60)%60)+":"+twoDigits(Math.floor(x%60))
  }
}
// End of library, start of game

function openTab(name) {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(name).style.display = "inline-block";  
}
function openTributeTab(name) {
  var i;
  var x = document.getElementsByClassName("tributeTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(name).style.display = "inline-block";  
}





var exoticmatter = 8; // InfOperator         // All variables start empty and are updated automatically
var exoticmatterPerSec = 0; // InfOperator
var XAxis = 0;
var YAxis = 0;
var ZAxis = 0;
var WAxis = 0;
var XAxisCost = 0; // InfOperator
var XAxisEffect = 2;
var YAxisCost = 0; // InfOperator
var YAxisEffect = 0.125;
var ZAxisCost = 0; // InfOperator
var ZAxisEffect = 1;
var WAxisCost = 0; // InfOperator
var WAxisEffect = 1;
var axisUnlocked = 0;
var timePlayed = 0;
var timeThisTributeReset = 0;
var fastestTributeReset = 9e15;
var timeThisWormholeReset = 0;
var fastestWormholeReset = 9e15;
var tributes = -100; // InfOperator
var pendingTributes = 0; // InfOperator
var notation = "Mixed scientific"
var autosaveIsOn = "On"
var tributeBoostOne = 0 // InfOperator
var tributeBoostTwo = 0
var tributeBoostThree = 0

document.getElementById("YAxisButton").style.visibility="hidden"
document.getElementById("ZAxisButton").style.visibility="hidden"
document.getElementById("WAxisButton").style.visibility="hidden"

function incrementExoticMatter(x) {
  exoticmatter = infAdd(exoticmatter,x)
  document.getElementById("exoticmatter").innerHTML = infFormat(exoticmatter,false);            // Replaces the green 0 with the amount of exotic matter the player has
  document.getElementById("exoticmatterPerSec").innerHTML = infFormat(exoticmatterPerSec,true);
}
function buyXAxis() {
  if (exoticmatter>XAxisCost) {
    exoticmatter=infSubtract(exoticmatter,XAxisCost)
    XAxis++
  }
}
function buyYAxis() {
  if (exoticmatter>YAxisCost) {
    exoticmatter=infSubtract(exoticmatter,YAxisCost)
    YAxis++
  }
}
function buyZAxis() {
  if (exoticmatter>ZAxisCost) {
    exoticmatter=infSubtract(exoticmatter,ZAxisCost)
    ZAxis++
  }
}
function buyWAxis() {
  if (exoticmatter>WAxisCost) {
    exoticmatter=infSubtract(exoticmatter,WAxisCost)
    WAxis++
  }
}
function tributeReset() {
  if (pendingTributes>tributes) {
    exoticmatter=0
    XAxis=0
    YAxis=0
    ZAxis=0
    WAxis=0
    fastestTributeReset=Math.min(fastestTributeReset,timeThisTributeReset)
    timeThisTributeReset=0
    tributes=pendingTributes
  }
}

window.setInterval(function(){                                                                     // The game loop, which consists of functions that run automatically. Frame rate is 20fps
  exoticmatterPerSec=Math.log10(XAxisEffect)*XAxis+ZAxisEffect*ZAxis+Math.log10(WAxisEffect)*WAxis+(tributeBoostOne);
  incrementExoticMatter(exoticmatterPerSec-1.30103);
  XAxisEffect = 2+YAxis*YAxisEffect;
  XAxisCost = 1+Math.log10(5+0.05*Math.max(0,XAxis-10)**3)*XAxis;
  YAxisEffect = 0.125*(1+tributeBoostTwo/100);
  YAxisCost = 2*1.07**Math.max(0,YAxis-10)+0.113623*YAxis+0.062469*YAxis**2;
  ZAxisEffect = (Math.log10(Math.log10(exoticmatter+1)+1)+1)**(Math.log10(Math.log10(exoticmatter+1)+1)+1)**2-1
  ZAxisCost = 4+ZAxis**(1.379654224+0.002*Math.max(0,ZAxis-10)**2)
  WAxisEffect = Math.log10(timeThisTributeReset/10+10)
  WAxisCost = 5.875+(WAxis+2.5*1.03**Math.max(0,WAxis-10)-2)**2/2
  axisUnlocked = 1+Math.sign(XAxis)+Math.sign(YAxis)+Math.sign(ZAxis)+Math.sign(WAxis)
  if (axisUnlocked < 1) {
    document.getElementById("XAxisButton").style.visibility="hidden"
  } else {
    document.getElementById("XAxisButton").style.visibility="visible"
  }
  if (axisUnlocked < 2) {
    document.getElementById("YAxisButton").style.visibility="hidden"
  } else {
    document.getElementById("YAxisButton").style.visibility="visible"
  }
  if (axisUnlocked < 3) {
    document.getElementById("ZAxisButton").style.visibility="hidden"
  } else {
    document.getElementById("ZAxisButton").style.visibility="visible"
  }
  if (axisUnlocked < 4) {
    document.getElementById("WAxisButton").style.visibility="hidden"
  } else {
    document.getElementById("WAxisButton").style.visibility="visible"
  }
  if (exoticmatter < XAxisCost) {
    document.getElementById("XAxisButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("XAxisButton").className = "axisbutton";
  }
  if (exoticmatter < YAxisCost) {
    document.getElementById("YAxisButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("YAxisButton").className = "axisbutton";
  }
  if (exoticmatter < ZAxisCost) {
    document.getElementById("ZAxisButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("ZAxisButton").className = "axisbutton";
  }
  if (exoticmatter < WAxisCost) {
    document.getElementById("WAxisButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("WAxisButton").className = "axisbutton";
  }
  if (fastestTributeReset < 1e12) {
    document.getElementById("tributesbigtab").style.visibility="visible"
    document.getElementById("tributeDisplay").style.visibility="visible"
  } else {
    document.getElementById("tributesbigtab").style.visibility="hidden"
    document.getElementById("tributeDisplay").style.visibility="hidden"
  }
  if (exoticmatter<25) {
    document.getElementById("tributeResetButton").style.visibility="hidden"
  } else if (pendingTributes<tributes) {
    document.getElementById("tributeResetButton").style.visibility="visible"
    document.getElementById("tributeResetButton").className = "lockedtributeResetButton"
  } else {
    document.getElementById("tributeResetButton").style.visibility="visible"
    document.getElementById("tributeResetButton").className = "tributeResetButton"
  }
  timePlayed+=0.05
  timeThisTributeReset+=0.05
  timeThisWormholeReset+=0.05
  pendingTributes=Math.max(0,exoticmatter-24)**0.5
  document.getElementById("XAxisEffect").innerHTML = normFormat(XAxisEffect);
  document.getElementById("XAxisCost").innerHTML = infFormat(XAxisCost,false);
  document.getElementById("XAxisAmount").innerHTML = XAxis;
  document.getElementById("YAxisEffect").innerHTML = normFormat(YAxisEffect);
  document.getElementById("YAxisCost").innerHTML = infFormat(YAxisCost,false);
  document.getElementById("YAxisAmount").innerHTML = YAxis;
  document.getElementById("ZAxisEffect").innerHTML = infFormat(ZAxisEffect,true);
  document.getElementById("ZAxisCost").innerHTML = infFormat(ZAxisCost,false);
  document.getElementById("ZAxisAmount").innerHTML = ZAxis;
  document.getElementById("WAxisEffect").innerHTML = normFormat(WAxisEffect);
  document.getElementById("WAxisCost").innerHTML = infFormat(WAxisCost,false);
  document.getElementById("WAxisAmount").innerHTML = WAxis;
  document.getElementById("timePlayed").innerHTML = timeFormat(timePlayed);
  document.getElementById("toggleAutosave").innerHTML = autosaveIsOn;
  document.getElementById("currentTributes").innerHTML = infFormat(tributes,false);
  if (autosaveIsOn == "On") {
    save()
  }
  document.getElementById("pendingTributes").innerHTML = infFormat(infSubtract(Math.max(pendingTributes,tributes),tributes),false)
  tributeBoostOne=tributes*0.5+tributes**1.5/100
  document.getElementById("TributeBoostOne").innerHTML = infFormat(tributeBoostOne,true)
  tributeBoostTwo=Math.min(tributes,50*(tributes/50)**0.2)*20
  document.getElementById("TributeBoostTwo").innerHTML = normFormat(tributeBoostTwo)
  tributeBoostThree=Math.log10(Math.max(tributes,0)+10)-1
  document.getElementById("TributeBoostThree").innerHTML = normFormat(tributeBoostThree)
  document.getElementById("debugValue").innerHTML = tributeBoostThree
}, 50);

function toggleNotation() {
  if (notation == "Mixed scientific") {
    notation = "Scientific"
  } else if (notation == "Scientific") {
    notation = "Mixed scientific"
  } else {
    notation = "Scientific"
  }
  document.getElementById("notationButton").innerHTML = notation
}
function save() {
  var save = {
    exoticmatter: exoticmatter,
    exoticmatterPerSec: exoticmatterPerSec,
    XAxis: XAxis,
    YAxis: YAxis,
    ZAxis: ZAxis,
    WAxis: WAxis,
    timePlayed: timePlayed,
    timeThisTributeReset: timeThisTributeReset,
    fastestTributeReset: fastestTributeReset,
    timeThisWormholeReset: timeThisWormholeReset,
    fasTestWormholeReset: fastestWormholeReset,
    tributes: tributes,
    notation: notation,
    autosaveIsOn: autosaveIsOn
  }
  localStorage.setItem("save",JSON.stringify(save)); 
}
function load() {
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (typeof savegame.exoticmatter !== "undefined") exoticmatter = savegame.exoticmatter;
  if (typeof savegame.exoticmatterPerSec !== "undefined") exoticmatterPerSec = savegame.exoticmatterPerSec;
  if (typeof savegame.XAxis !== "undefined") XAxis = savegame.XAxis;
  if (typeof savegame.YAxis !== "undefined") YAxis = savegame.YAxis;
  if (typeof savegame.ZAxis !== "undefined") ZAxis = savegame.ZAxis;
  if (typeof savegame.WAxis !== "undefined") WAxis = savegame.WAxis;
  if (typeof savegame.timePlayed !== "undefined") timePlayed = savegame.timePlayed;
  if (typeof savegame.timeThisTributeReset !== "undefined") timeThisTributeReset = savegame.timeThisTributeReset;
  if (typeof savegame.fastestTributeReset !== "undefined") fastestTributeReset = savegame.fastestTributeReset;
  if (typeof savegame.timeThisWormholeReset !== "undefined") timeThisWormholeReset = savegame.timeThisWormholeReset;
  if (typeof savegame.fastestWormholeReset !== "undefined") fastestWormholeReset = savegame.fastestWormholeReset;
  if (typeof savegame.tributes !== "undefined") tributes = savegame.tributes;
  if (typeof savegame.notation !== "undefined") notation = savegame.notation;
  if (typeof savegame.autosaveIsOn !== "undefined") autosaveIsOn = savegame.autosaveIsOn;
}
function wipeSave() {
  exoticmatter = 0; // InfOperator         // All variables start empty and are updated automatically
  exoticmatterPerSec = 0; // InfOperator
  XAxis = 0;
  YAxis = 0;
  ZAxis = 0;
  WAxis = 0;
  XAxisCost = 0; // InfOperator
  XAxisEffect = 2;
  YAxisCost = 0; // InfOperator
  YAxisEffect = 0.125;
  ZAxisCost = 0; // InfOperator
  ZAxisEffect = 1;
  WAxisCost = 0; // InfOperator
  WAxisEffect = 1;
  axisUnlocked = 0;
  timePlayed = 0;
  timeThisTributeReset = 0;
  fastestTributeReset = 9e15;
  timeThisWormholeReset = 0;
  fastestWormholeReset = 9e15;
  tributes = -100;
  notation = "Mixed scientific"
  autosaveIsOn = "On"
}
function toggleAutosave() {
  if (autosaveIsOn == "On") {
    autosaveIsOn = "Off"
  } else if (autosaveIsOn =="Off") {
    autosaveIsOn = "On"
  }
}