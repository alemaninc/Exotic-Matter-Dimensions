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
  if (x>=33 || (notation=="Scientific" && x>=3)) {                          // Scientific notation is used past 1e33. Number is rounded to 3 sf so that it can be read
    return Math.floor(100*10**(x%1))/100+"e"+Math.floor(x)
  } else if (x>=3) {                    // Standard notation is used for numbers between 1e3 and 1e33 if Scientific notation is off
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
  if (x<1) {
    return Math.floor(x*10000)/10+" milliseconds"
  } else if (x<10) {
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
function openStatisticsTab(name) {
  var i;
  var x = document.getElementsByClassName("statisticsTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(name).style.display = "inline-block";  
}





var exoticmatter = 0; // InfOperator         // All variables start empty and are updated automatically
var exoticmatterThisTributeReset = 0; // InfOperator
var exoticmatterThisWormholeReset = 0; // InfOperator
var totalexoticmatter = 0; // InfOperator
var exoticmatterPerSec = 0; // InfOperator
var XAxis = 0;
var YAxis = 0;
var ZAxis = 0;
var WAxis = 0;
var VAxis = 0;
var UAxis = 0;
var TAxis = 0;
var SAxis = 0;
var freeXAxis = 0;
var freeYAxis = 0;
var freeZAxis = 0;
var freeWAxis = 0;
var freeVAxis = 0;
var freeUAxis = 0;
var freeTAxis = 0;
var freeSAxis = 0;
var axisCostDivisor = 0; // InfOperator
var axisCostExponent = 1;
var XAxisCost = 0; // InfOperator
var XAxisEffect = 2;
var YAxisCost = 0; // InfOperator
var YAxisEffect = 0.125;
var ZAxisCost = 0; // InfOperator
var ZAxisEffect = 0; // InfOperator
var WAxisCost = 0; // InfOperator
var WAxisEffect = 1;
var VAxisCost = 0; // InfOperator
var VAxisEffect = 0; // InfOperator
var UAxisCost = 0; // InfOperator
var UAxisEffect = 0; // InfOperator
var TAxisCost = 0; // InfOperator
var TAxisEffect = 0; // InfOperator
var SAxisCost = 0; // InfOperator
var SAxisEffect = 1;
var axisScalingStart = 10
var totalAxis = 0;
var axisUnlocked = 0;
var timePlayed = 0;
var timeThisTributeReset = 0;
var fastestTributeReset = 9e15;
var timeThisWormholeReset = 0;
var fastestWormholeReset = 9e15;
var tributes = -100; // InfOperator
var tributeMultiplier = 0; // InfOperator
var tributeExponent = 1; // InfOperator
var pendingTributes = 0; // InfOperator
var tributeExoticMatterReq = 25; //InfOperator
var tributeExoticMatterReqText = ""
var notation = "Mixed scientific"
var autosaveIsOn = "On"
var baseOfflineSpeedup = 1
var offlineSpeedup = 1
var offlineTime = 0
var progressbarvalue = 0
var tributeBoostOne = 0 // InfOperator
var tributeBoostTwo = 0
var tributeBoostThree = 0
var tributeBoostFour = 0 // InfOperator
var tributeBoostFive = 0 // InfOperator
var tributeBoostSix = 0 // InfOperator
var tributeBoostSeven = 0
var tributeBoostEight = 0
const tributeUpgradeOne = {
  purchased: 0,
  cost: [3,5.30103,8,15.698971,1e300], // 1 K, 200 K, 100 M, 5 Qa
  costtooltip: [infFormat(3)+" tributes",infFormat(5.30103)+" tributes",infFormat(8)+" tributes",infFormat(15.698971)+" tributes","Maxed!"]
}
const tributeUpgradeTwo = {
  purchased: 0,
  tooltip: ["Unlock X axis autobuyer","Unlock Y axis autobuyer","Unlock Z axis autobuyer","Unlock W axis autobuyer","Unlock V axis autobuyer","Unlock U axis autobuyer","Unlock T axis autobuyer","Unlock S axis autobuyer","Maxed!"],
  cost: [3.47713,3.8451,4.30103,5,6,7.20412,8.698971,20,1e300], // 3 K, 7 K, 20 K, 100 K, 1 M, 16 M, 500 M, 100 Qt
  costtooltip: [infFormat(3.47713)+" tributes",infFormat(3.8451)+" tributes",infFormat(4.30103)+" tributes",infFormat(5)+" tributes",infFormat(6)+" tributes",infFormat(7.20412)+" tributes",infFormat(8.698971)+" tributes",infFormat(20)+" tributes","Maxed!"]
}
const tributeUpgradeThree = {
  purchased: 0,
  cost: [6.698971,14.20412,1e300,1e300,1e300,1e300,1e300], // 5 M, 160 T, ?, ?, ?, ?
  costtooltip: [infFormat(6.698971)+" tributes",infFormat(14.20412)+" tributes","Infinite tributes","Infinite tributes","Infinite tributes","Infinite tributes","Maxed!"]
}
var axisAutobuyerOn = false
var axisAutobuyerUpgrades = 0;
var axisAutobuyerInterval = 5;
var axisAutobuyerProgress = 0
var axisAutobuyerCost = 0; // InfOperator
var enhancers = 0
var unspentEnhancers = 0
var enhancerCost = 3.30103; // InfOperator
var enhancerRow = [1,1,2,1,2,3,1,2,3,4,2,3,4,3,4,4] // Which row the next enhancer is in. For those who don't know, Enhancers have to be bought in a pyramid-like fashion which is laid out in this variable.
var ownedEnhancers = {
  OneOne: 0,
  OneTwo: 0,
  OneThree: 0,
  OneFour: 0,
  TwoOne: 0,
  TwoTwo: 0,
  TwoThree: 0,
  TwoFour: 0,
  ThreeOne: 0,
  ThreeTwo: 0,
  ThreeThree: 0,
  ThreeFour: 0,
  FourOne: 0,
  FourTwo: 0,
  FourThree: 0,
  FourFour: 0
}
var Enhancer11Effect = 0; // InfOperator
var Enhancer12Effect = 3; // InfOperator
var Enhancer13Effect = 0; // InfOperator
var Enhancer14Effect = 3; // InfOperator

document.getElementById("notationButton").innerHTML = notation
document.getElementById("toggleAutosave").innerHTML = autosaveIsOn;

function incrementExoticMatter(x) {
  exoticmatter = infAdd(exoticmatter,x)
  document.getElementById("exoticmatter").innerHTML = infFormat(exoticmatter,false);            // Replaces the green 0 with the amount of exotic matter the player has
  document.getElementById("exoticmatterPerSec").innerHTML = infFormat(exoticmatterPerSec,true);
  totalexoticmatter = infAdd(totalexoticmatter,x)
  document.getElementById("totalExoticMatter").innerHTML = infFormat(totalexoticmatter,false);
  exoticmatterThisTributeReset = infAdd(exoticmatterThisTributeReset,x)
  document.getElementById("exoticMatterThisTributeReset").innerHTML = infFormat(exoticmatterThisTributeReset,false);
  exoticmatterThisWormholeReset = infAdd(exoticmatterThisWormholeReset,x)
  document.getElementById("exoticMatterThisWormholeReset").innerHTML = infFormat(exoticmatterThisWormholeReset,false);
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
function buyVAxis() {
  if (exoticmatter>VAxisCost) {
    exoticmatter=infSubtract(exoticmatter,VAxisCost)
    VAxis++
  }
}
function buyUAxis() {
  if (exoticmatter>UAxisCost) {
    exoticmatter=infSubtract(exoticmatter,UAxisCost)
    UAxis++
  }
}
function buyTAxis() {
  if (exoticmatter>TAxisCost) {
    exoticmatter=infSubtract(exoticmatter,TAxisCost)
    TAxis++
  }
}
function buySAxis() {
  if (exoticmatter>SAxisCost) {
    exoticmatter=infSubtract(exoticmatter,SAxisCost)
    SAxis++
  }
}
function updateAxisCosts() {
  XAxisCost = (1+Math.log10(5+0.05*Math.max(0,XAxis-axisScalingStart)**3)*XAxis-tributeBoostFive*XAxis-axisCostDivisor)*axisCostExponent
  YAxisCost = (2*1.07**Math.max(0,YAxis-axisScalingStart)+0.113623*YAxis+0.062469*YAxis**2-axisCostDivisor)*axisCostExponent
  ZAxisCost = (4+ZAxis**(1.379654224+0.002*Math.max(0,ZAxis-axisScalingStart)**2)-axisCostDivisor)*axisCostExponent
  WAxisCost = (5.875+(WAxis+2.5*1.03**Math.max(0,WAxis-axisScalingStart)-2)**2/2-axisCostDivisor)*axisCostExponent
  VAxisCost = (20+4.5*VAxis+0.5*VAxis**2+0.01*Math.max(0,VAxis-axisScalingStart)**5-axisCostDivisor)*axisCostExponent
  UAxisCost = ((35+10*UAxis+UAxis**2)*1.002**Math.max(0,UAxis-axisScalingStart)**2-axisCostDivisor)*axisCostExponent
  TAxisCost = (50+(9+1.1**Math.max(0,TAxis-axisScalingStart))*TAxis-axisCostDivisor)*axisCostExponent
  SAxisCost = (120*1.5**SAxis*1.05**Math.max(0,SAxis-axisScalingStart)**2-axisCostDivisor)*axisCostExponent
}
function tributeReset() {
  if (pendingTributes>tributes) {
    exoticmatter=0
    XAxis=0
    YAxis=0
    ZAxis=0
    WAxis=0
    VAxis=0
    UAxis=0
    TAxis=0
    SAxis=0
    fastestTributeReset=Math.min(fastestTributeReset,timeThisTributeReset)
    timeThisTributeReset=0
    tributes=pendingTributes
  }
}
function forceTributeReset() {
  exoticmatter=0
  XAxis=0
  YAxis=0
  ZAxis=0
  WAxis=0
  VAxis=0
  UAxis=0
  TAxis=0
  SAxis=0
  timeThisTributeReset=0
}
function buyTributeUpgradeOne() {
  if ((tributes>=tributeUpgradeOne.cost[tributeUpgradeOne.purchased]) && (tributeUpgradeOne.purchased < 4)) {
    tributes=infSubtract(tributes,tributeUpgradeOne.cost[tributeUpgradeOne.purchased])
    tributeUpgradeOne.purchased++
  }
}
function buyTributeUpgradeTwo() {
  if ((tributes>=tributeUpgradeTwo.cost[tributeUpgradeTwo.purchased]) && (tributeUpgradeTwo.purchased < 8)) {
    tributes=infSubtract(tributes,tributeUpgradeTwo.cost[tributeUpgradeTwo.purchased])
    tributeUpgradeTwo.purchased++
  }
}
function buyTributeUpgradeThree() {
  if ((tributes>=tributeUpgradeThree.cost[tributeUpgradeThree.purchased]) && (tributeUpgradeThree.purchased < 6)) {
    tributes=infSubtract(tributes,tributeUpgradeThree.cost[tributeUpgradeThree.purchased])
    tributeUpgradeThree.purchased++
  }
}
function toggleAxisAutobuyer() {
  if (axisAutobuyerOn == true) {
    axisAutobuyerOn = false
  } else {
    axisAutobuyerOn = true
  }
}
function upgradeAxisAutobuyer() {
  if ((exoticmatter>=axisAutobuyerCost) && (axisAutobuyerUpgrades < 167)) {
    exoticmatter=infSubtract(exoticmatter,axisAutobuyerCost)
    axisAutobuyerUpgrades++
  }
}
function buyEnhancer() {
  if ((tributes>=enhancerCost) && (enhancers < 16)) {
    tributes=infSubtract(tributes,enhancerCost)
    enhancers++
    unspentEnhancers++
    enhancerCost=enhancerCost*1.05+0.1359785*enhancers**1.6338
  }
}
function buyEnhancerUpgrade(x) {
  if ((unspentEnhancers > 0) && (Math.floor(x/10) == enhancerRow[enhancers-unspentEnhancers])) {
    if ((x==11) && (ownedEnhancers.OneOne == 0)) {
      ownedEnhancers.OneOne=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==12) && (ownedEnhancers.OneTwo == 0)) {
      ownedEnhancers.OneTwo=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==13) && (ownedEnhancers.OneThree == 0)) {
      ownedEnhancers.OneThree=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==14) && (ownedEnhancers.OneFour == 0)) {
      ownedEnhancers.OneFour=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==21) && (ownedEnhancers.TwoOne == 0)) {
      ownedEnhancers.TwoOne=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==22) && (ownedEnhancers.TwoTwo == 0)) {
      ownedEnhancers.TwoTwo=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==23) && (ownedEnhancers.TwoThree == 0)) {
      ownedEnhancers.TwoThree=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==24) && (ownedEnhancers.TwoFour == 0)) {
      ownedEnhancers.TwoFour=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==31) && (ownedEnhancers.ThreeOne == 0)) {
      ownedEnhancers.ThreeOne=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==32) && (ownedEnhancers.ThreeTwo == 0)) {
      ownedEnhancers.ThreeTwo=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==33) && (ownedEnhancers.ThreeThree == 0)) {
      ownedEnhancers.ThreeThree=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==34) && (ownedEnhancers.ThreeFour == 0)) {
      ownedEnhancers.ThreeFour=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==41) && (ownedEnhancers.FourOne == 0)) {
      ownedEnhancers.FourOne=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==42) && (ownedEnhancers.FourTwo == 0)) {
      ownedEnhancers.FourTwo=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==43) && (ownedEnhancers.FourThree == 0)) {
      ownedEnhancers.FourThree=1
      unspentEnhancers=unspentEnhancers-1
    } else if ((x==44) && (ownedEnhancers.FourFour == 0)) {
      ownedEnhancers.FourFour=1
      unspentEnhancers=unspentEnhancers-1
    }
  }
}
function respecEnhancers() {
  ownedEnhancers.OneOne=0
  ownedEnhancers.OneTwo=0
  ownedEnhancers.OneThree=0
  ownedEnhancers.OneFour=0
  ownedEnhancers.TwoOne=0
  ownedEnhancers.TwoTwo=0
  ownedEnhancers.TwoThree=0
  ownedEnhancers.TwoFour=0
  ownedEnhancers.ThreeOne=0
  ownedEnhancers.ThreeTwo=0
  ownedEnhancers.ThreeThree=0
  ownedEnhancers.ThreeFour=0
  ownedEnhancers.FourOne=0
  ownedEnhancers.FourTwo=0
  ownedEnhancers.FourThree=0
  ownedEnhancers.FourFour=0
  unspentEnhancers=enhancers
  forceTributeReset()
}

window.setInterval(function(){                                                                     // The game loop, which consists of functions that run automatically. Frame rate is 20fps
  if ((offlineTime > 0) && (baseOfflineSpeedup > 1.1)) {
    offlineSpeedup = baseOfflineSpeedup
    offlineTime = offlineTime-0.05
    document.getElementById("offlineSpeedupDisplay").innerHTML = "Offline speedup: "+normFormat(offlineSpeedup)+"x     Offline time left: "+normFormat(offlineTime)+"s"
  } else {
    offlineSpeedup = 1
    document.getElementById("offlineSpeedupDisplay").innerHTML = ""
  }
  exoticmatterPerSec=(XAxisEffect*(XAxis+freeXAxis)+ZAxisEffect*(ZAxis+freeZAxis)+Math.log10(WAxisEffect)*(WAxis+freeWAxis)+TAxisEffect*(TAxis+freeTAxis)+tributeBoostOne+Enhancer11Effect*ownedEnhancers.OneOne+Enhancer12Effect*ownedEnhancers.OneTwo+Enhancer13Effect*ownedEnhancers.OneThree+Enhancer14Effect*ownedEnhancers.OneFour+10*ownedEnhancers.FourTwo+tributeBoostSix*YAxis)*(SAxisEffect**(SAxis+freeSAxis))*1.1**ownedEnhancers.FourOne+Math.log10(offlineSpeedup)
  incrementExoticMatter(exoticmatterPerSec-1.30103);
  axisCostDivisor = VAxisEffect*(VAxis+freeVAxis)
  axisCostExponent = 1
  axisScalingStart = 10+tributeBoostSeven
  freeXAxis = Math.min(2*XAxis,2*ownedEnhancers.TwoOne)
  XAxisEffect = Math.log10(2+(YAxis+freeYAxis)*YAxisEffect);
  freeYAxis = Math.min(2*YAxis,2*ownedEnhancers.TwoTwo)
  YAxisEffect = 0.125*(1+tributeBoostTwo/100);
  freeZAxis = Math.min(2*ZAxis,2*ownedEnhancers.TwoThree)
  ZAxisEffect = (Math.log10(Math.log10(Math.max(exoticmatter,0)+1)+1)+1)**(Math.log10(Math.log10(Math.max(exoticmatter,0)+1)+1)+1)**2-1
  freeWAxis = Math.min(2*WAxis,2*ownedEnhancers.TwoFour)
  WAxisEffect = Math.log10(timeThisTributeReset/10+100)*tributeBoostThree
  freeVAxis = Math.min(2*VAxis,0)
  VAxisEffect = 0.3010299957
  freeUAxis = Math.min(2*UAxis,0)
  UAxisEffect = 0.07918124605
  freeTAxis = Math.min(2*TAxis,0)
  TAxisEffect = Math.log10(totalAxis+1)**(1+Math.log10(totalAxis+1))/5
  freeSAxis = Math.min(2*SAxis,0)
  SAxisEffect = 1.025
  updateAxisCosts()
  totalAxis = XAxis+YAxis+ZAxis+WAxis+VAxis+UAxis+TAxis+SAxis
  axisUnlocked = Math.min(1+Math.sign(XAxis)+Math.sign(YAxis)+Math.sign(ZAxis)+Math.sign(WAxis)+Math.sign(VAxis)+Math.sign(UAxis)+Math.sign(TAxis)+Math.sign(SAxis),4+tributeUpgradeOne.purchased)
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
  if (axisUnlocked < 5) {
    document.getElementById("VAxisButton").style.visibility="hidden"
  } else {
    document.getElementById("VAxisButton").style.visibility="visible"
  }
  if (axisUnlocked < 6) {
    document.getElementById("UAxisButton").style.visibility="hidden"
  } else {
    document.getElementById("UAxisButton").style.visibility="visible"
  }
  if (axisUnlocked < 7) {
    document.getElementById("TAxisButton").style.visibility="hidden"
  } else {
    document.getElementById("TAxisButton").style.visibility="visible"
  }
  if (axisUnlocked < 8) {
    document.getElementById("SAxisButton").style.visibility="hidden"
  } else {
    document.getElementById("SAxisButton").style.visibility="visible"
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
  if (exoticmatter < VAxisCost) {
    document.getElementById("VAxisButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("VAxisButton").className = "axisbutton";
  }
  if (exoticmatter < UAxisCost) {
    document.getElementById("UAxisButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("UAxisButton").className = "axisbutton";
  }
  if (exoticmatter < TAxisCost) {
    document.getElementById("TAxisButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("TAxisButton").className = "axisbutton";
  }
  if (exoticmatter < SAxisCost) {
    document.getElementById("SAxisButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("SAxisButton").className = "axisbutton";
  }
  if ((fastestTributeReset < 1e12) || (fastestWormholeReset < 1e12)) {
    document.getElementById("tributesbigtab").style.visibility="visible"
    document.getElementById("tributeDisplay").style.visibility="visible"
    document.getElementById("tributeStatistics").style.visibility="visible"
  } else {
    document.getElementById("tributesbigtab").style.visibility="hidden"
    document.getElementById("tributeDisplay").style.visibility="hidden"
    document.getElementById("tributeStatistics").style.visibility="hidden"
  }
  if (fastestWormholeReset < 1e12) {
    document.getElementById("wormholeStatistics").style.visibility="visible"
  } else {
    document.getElementById("wormholeStatistics").style.visibility="hidden"
  }
  if (tributeUpgradeTwo.purchased == 0) {
    document.getElementById("automationbigtab").style.visibility="hidden"
  } else {
    document.getElementById("automationbigtab").style.visibility="visible"
  }
  if (exoticmatter<25) {
    document.getElementById("tributeResetButton").style.visibility="hidden"
  } else if (pendingTributes<infAdd(tributes,1)) {
    document.getElementById("tributeResetButton").style.visibility="visible"
    document.getElementById("tributeResetButton").className = "lockedtributeResetButton"
  } else {
    document.getElementById("tributeResetButton").style.visibility="visible"
    document.getElementById("tributeResetButton").className = "tributeResetButton"
  }
  timePlayed+=0.05*offlineSpeedup
  timeThisTributeReset+=0.05*offlineSpeedup
  timeThisWormholeReset+=0.05*offlineSpeedup
  document.getElementById("timePlayed").innerHTML = timeFormat(timePlayed);
  document.getElementById("timeThisTributeReset").innerHTML = timeFormat(timeThisTributeReset);
  document.getElementById("timeThisWormholeReset").innerHTML = timeFormat(timeThisWormholeReset);
  document.getElementById("fastestTributeReset").innerHTML = timeFormat(fastestTributeReset);
  document.getElementById("fastestWormholeReset").innerHTML = timeFormat(fastestWormholeReset);
  tributeMultiplier=UAxisEffect*(UAxis+freeUAxis)+ownedEnhancers.FourFour+tributeBoostFour
  tributeExponent=1.1**ownedEnhancers.FourThree
  pendingTributes=(Math.max(0,exoticmatter-24)**0.5+tributeMultiplier)*tributeExponent
  if (pendingTributes<infAdd(tributes,0)) {
    tributeExoticMatterReq=((infAdd(tributes,0)/tributeExponent)-tributeMultiplier)**2+24
    tributeExoticMatterReqText="(Need "+infFormat(tributeExoticMatterReq)+" exotic matter)"
  } else {
    tributeExoticMatterReqText=""
  }
  document.getElementById("tributeExoticMatterRequirement").innerHTML = tributeExoticMatterReqText
  document.getElementById("XAxisEffect").innerHTML = infFormat(XAxisEffect,true);
  document.getElementById("XAxisCost").innerHTML = infFormat(XAxisCost,false);
  document.getElementById("XAxisAmount").innerHTML = (freeXAxis > 0) ? XAxis+" + "+normFormat(freeXAxis) : XAxis;
  document.getElementById("YAxisEffect").innerHTML = normFormat(YAxisEffect);
  document.getElementById("YAxisCost").innerHTML = infFormat(YAxisCost,false);
  document.getElementById("YAxisAmount").innerHTML = (freeYAxis > 0) ? YAxis+" + "+normFormat(freeYAxis) : YAxis;
  document.getElementById("ZAxisEffect").innerHTML = infFormat(ZAxisEffect,true);
  document.getElementById("ZAxisCost").innerHTML = infFormat(ZAxisCost,false);
  document.getElementById("ZAxisAmount").innerHTML = (freeZAxis > 0) ? ZAxis+" + "+normFormat(freeZAxis) : ZAxis;
  document.getElementById("WAxisEffect").innerHTML = normFormat(WAxisEffect);
  document.getElementById("WAxisCost").innerHTML = infFormat(WAxisCost,false);
  document.getElementById("WAxisAmount").innerHTML = (freeWAxis > 0) ? WAxis+" + "+normFormat(freeWAxis) : WAxis;
  document.getElementById("VAxisEffect").innerHTML = infFormat(VAxisEffect,true);
  document.getElementById("VAxisCost").innerHTML = infFormat(VAxisCost,false);
  document.getElementById("VAxisAmount").innerHTML = (freeVAxis > 0) ? VAxis+" + "+normFormat(freeVAxis) : VAxis;
  document.getElementById("UAxisEffect").innerHTML = infFormat(UAxisEffect,true);
  document.getElementById("UAxisCost").innerHTML = infFormat(UAxisCost,false);
  document.getElementById("UAxisAmount").innerHTML = (freeUAxis > 0) ? UAxis+" + "+normFormat(freeUAxis) : UAxis;
  document.getElementById("TAxisEffect").innerHTML = infFormat(TAxisEffect,true);
  document.getElementById("TAxisCost").innerHTML = infFormat(TAxisCost,false);
  document.getElementById("TAxisAmount").innerHTML = (freeTAxis > 0) ? TAxis+" + "+normFormat(freeTAxis) : TAxis;
  document.getElementById("SAxisEffect").innerHTML = Math.floor(SAxisEffect*10000)/10000;
  document.getElementById("SAxisCost").innerHTML = infFormat(SAxisCost,false);
  document.getElementById("SAxisAmount").innerHTML = (freeSAxis > 0) ? SAxis+" + "+normFormat(freeSAxis) : SAxis;
  document.getElementById("currentTributes").innerHTML = infFormat(tributes,false);
  if (autosaveIsOn == "On") {
    save()
  }
  document.getElementById("pendingTributes").innerHTML = infFormat(infSubtract(Math.max(pendingTributes,tributes),tributes),false)
  tributeBoostOne=Math.max(0,tributes)*0.5+Math.max(0,tributes)**1.5/100
  document.getElementById("TributeBoostOne").innerHTML = infFormat(tributeBoostOne,true)
  tributeBoostTwo=Math.min(Math.max(0,tributes),5*Math.max(0,tributes/5)**0.33)*20
  document.getElementById("TributeBoostTwo").innerHTML = normFormat(tributeBoostTwo)
  tributeBoostThree=(Math.max(tributes,6)-5)**((tributeUpgradeThree.purchased>0)?1:0)
  document.getElementById("TributeBoostThree").innerHTML = normFormat(tributeBoostThree)
  tributeBoostFour=(Math.max(tributes-5.7,8)**(2/3)-4)*((tributeUpgradeThree.purchased>1)?1:0)
  document.getElementById("TributeBoostFour").innerHTML = infFormat(tributeBoostFour,true)
  tributeBoostFive=(Math.max(tributes,10)**0.30103-2)*0.1*((tributeUpgradeThree.purchased>2)?1:0)
  document.getElementById("TributeBoostFive").innerHTML = infFormat(tributeBoostFive,true)
  tributeBoostSix=Math.max(tributes-13,0)**0.8*0.2*((tributeUpgradeThree.purchased>3)?1:0)
  document.getElementById("TributeBoostSix").innerHTML = infFormat(tributeBoostSix,true)
  tributeBoostSeven=Math.log10(Math.max(tributes-15,1)**1.67)*((tributeUpgradeThree.purchased>4)?1:0)
  document.getElementById("TributeBoostSeven").innerHTML = normFormat(tributeBoostSeven)
  tributeBoostEight=Math.max(tributes-20,0)**0.85*20*((tributeUpgradeThree.purchased>5)?1:0)
  document.getElementById("TributeBoostEight").innerHTML = normFormat(tributeBoostEight)
  if (tributeUpgradeThree.purchased>0) {
    document.getElementById("TributeBoostThreeDisplay").style.visibility="visible"
  } else {
    document.getElementById("TributeBoostThreeDisplay").style.visibility="hidden"
  }
  if (tributeUpgradeThree.purchased>1) {
    document.getElementById("TributeBoostFourDisplay").style.visibility="visible"
  } else {
    document.getElementById("TributeBoostFourDisplay").style.visibility="hidden"
  }
  if (tributeUpgradeThree.purchased>2) {
    document.getElementById("TributeBoostFiveDisplay").style.visibility="visible"
  } else {
    document.getElementById("TributeBoostFiveDisplay").style.visibility="hidden"
  }
  if (tributeUpgradeThree.purchased>3) {
    document.getElementById("TributeBoostSixDisplay").style.visibility="visible"
  } else {
    document.getElementById("TributeBoostSixDisplay").style.visibility="hidden"
  }
  if (tributeUpgradeThree.purchased>4) {
    document.getElementById("TributeBoostSevenDisplay").style.visibility="visible"
  } else {
    document.getElementById("TributeBoostSevenDisplay").style.visibility="hidden"
  }
  if (tributeUpgradeThree.purchased>5) {
    document.getElementById("TributeBoostEightDisplay").style.visibility="visible"
  } else {
    document.getElementById("TributeBoostEightDisplay").style.visibility="hidden"
  }
  document.getElementById("TributeUpgradeOneCost").innerHTML = tributeUpgradeOne.costtooltip[tributeUpgradeOne.purchased]
  if (tributes < tributeUpgradeOne.cost[tributeUpgradeOne.purchased]) {
    document.getElementById("TributeUpgradeOneButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("TributeUpgradeOneButton").className = "tributeupgradebutton";
  }
  if (tributes < tributeUpgradeTwo.cost[tributeUpgradeTwo.purchased]) {
    document.getElementById("TributeUpgradeTwoButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("TributeUpgradeTwoButton").className = "tributeupgradebutton";
  }
  document.getElementById("TributeUpgradeTwoTooltip").innerHTML = tributeUpgradeTwo.tooltip[tributeUpgradeTwo.purchased]
  document.getElementById("TributeUpgradeTwoCost").innerHTML = tributeUpgradeTwo.costtooltip[tributeUpgradeTwo.purchased]
  if (tributes < tributeUpgradeThree.cost[tributeUpgradeThree.purchased]) {
    document.getElementById("TributeUpgradeThreeButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("TributeUpgradeThreeButton").className = "tributeupgradebutton";
  }
  document.getElementById("TributeUpgradeThreeCost").innerHTML = tributeUpgradeThree.costtooltip[tributeUpgradeThree.purchased]
  if (axisAutobuyerOn == true) {
    document.getElementById("axisAutobuyerToggle").className = "automatortoggleon"
  } else {
    document.getElementById("axisAutobuyerToggle").className = "automatortoggleoff"
  }
  axisAutobuyerInterval=Math.max(0.001,5*0.95**axisAutobuyerUpgrades/offlineSpeedup)
  if ((tributeUpgradeTwo.purchased > 0) && (axisAutobuyerOn)) {
    axisAutobuyerProgress+=0.05/axisAutobuyerInterval
  }
  while (axisAutobuyerProgress > 1) {
    if ((tributeUpgradeTwo.purchased >= 1) && (axisUnlocked >= 1)) {
      buyXAxis()
    }
    if ((tributeUpgradeTwo.purchased >= 2) && (axisUnlocked >= 2)) {
      buyYAxis()
    }
    if ((tributeUpgradeTwo.purchased >= 3) && (axisUnlocked >= 3)) {
      buyZAxis()
    }
    if ((tributeUpgradeTwo.purchased >= 4) && (axisUnlocked >= 4)) {
      buyWAxis()
    }
    if ((tributeUpgradeTwo.purchased >= 5) && (axisUnlocked >= 5)) {
      buyVAxis()
    }
    if ((tributeUpgradeTwo.purchased >= 6) && (axisUnlocked >= 6)) {
      buyUAxis()
    }
    if ((tributeUpgradeTwo.purchased >= 7) && (axisUnlocked >= 7)) {
      buyTAxis()
    }
    if ((tributeUpgradeTwo.purchased >= 8) && (axisUnlocked >= 8)) {
      buySAxis()
    }
    axisAutobuyerProgress--
    updateAxisCosts()
  }
  document.getElementById("axisAutobuyerInterval").innerHTML = timeFormat(axisAutobuyerInterval)
  if (tributeUpgradeOne.purchased == 4) {
    document.getElementById("TributeUpgradeOneButton").style="display:none"
  } else {
    document.getElementById("TributeUpgradeOneButton").style="display:inline-block"
  }
  if (tributeUpgradeTwo.purchased == 8) {
    document.getElementById("TributeUpgradeTwoButton").style="display:none"
  } else {
    document.getElementById("TributeUpgradeTwoButton").style="display:inline-block"
  }
  if (tributeUpgradeThree.purchased == 2) {
    document.getElementById("TributeUpgradeThreeButton").style="display:none"
  } else {
    document.getElementById("TributeUpgradeThreeButton").style="display:inline-block"
  }
  axisAutobuyerCost = 250000*1.05**Math.max(0,axisAutobuyerUpgrades-89)+10*axisAutobuyerUpgrades+Math.max(0,axisAutobuyerUpgrades-10)**2+Math.max(0,axisAutobuyerUpgrades-40)**3-249950
  document.getElementById("axisAutobuyerUpgradeCost").innerHTML = infFormat(axisAutobuyerCost,false)
  document.getElementById("unspentEnhancers").innerHTML = unspentEnhancers
  document.getElementById("enhancerCost").innerHTML = infFormat(enhancerCost,false)
  if (ownedEnhancers.OneOne == 1) {
    document.getElementById("Enhancer11").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 1)) {
    document.getElementById("Enhancer11").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer11").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.OneTwo == 1) {
    document.getElementById("Enhancer12").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 1)) {
    document.getElementById("Enhancer12").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer12").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.OneThree == 1) {
    document.getElementById("Enhancer13").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 1)) {
    document.getElementById("Enhancer13").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer13").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.OneFour == 1) {
    document.getElementById("Enhancer14").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 1)) {
    document.getElementById("Enhancer14").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer14").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.TwoOne == 1) {
    document.getElementById("Enhancer21").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 2)) {
    document.getElementById("Enhancer21").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer21").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.TwoTwo == 1) {
    document.getElementById("Enhancer22").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 2)) {
    document.getElementById("Enhancer22").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer22").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.TwoThree == 1) {
    document.getElementById("Enhancer23").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 2)) {
    document.getElementById("Enhancer23").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer23").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.TwoFour == 1) {
    document.getElementById("Enhancer24").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 2)) {
    document.getElementById("Enhancer24").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer24").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.ThreeOne == 1) {
    document.getElementById("Enhancer31").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 3)) {
    document.getElementById("Enhancer31").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer31").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.ThreeTwo == 1) {
    document.getElementById("Enhancer32").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 3)) {
    document.getElementById("Enhancer32").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer32").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.ThreeThree == 1) {
    document.getElementById("Enhancer33").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 3)) {
    document.getElementById("Enhancer33").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer33").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.ThreeFour == 1) {
    document.getElementById("Enhancer34").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 3)) {
    document.getElementById("Enhancer34").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer34").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.FourOne == 1) {
    document.getElementById("Enhancer41").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 4)) {
    document.getElementById("Enhancer41").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer41").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.FourTwo == 1) {
    document.getElementById("Enhancer42").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 4)) {
    document.getElementById("Enhancer42").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer42").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.FourThree == 1) {
    document.getElementById("Enhancer43").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 4)) {
    document.getElementById("Enhancer43").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer43").className = "lockedenhancerbutton"
  }
  if (ownedEnhancers.FourFour == 1) {
    document.getElementById("Enhancer44").className = "ownedenhancerbutton"
  } else if ((unspentEnhancers > 0) && (enhancerRow[enhancers-unspentEnhancers] == 4)) {
    document.getElementById("Enhancer44").className = "enhancerbutton"
  } else {
    document.getElementById("Enhancer44").className = "lockedenhancerbutton"
  }
  Enhancer11Effect = 3*(1-1/Math.log10(Math.max(10,exoticmatter)))*(3**ownedEnhancers.ThreeOne)
  document.getElementById("Enhancer11Effect").innerHTML = infFormat(Enhancer11Effect,true)
  Enhancer12Effect = 3/Math.log10(Math.max(10,exoticmatter))*(3**ownedEnhancers.ThreeTwo)
  document.getElementById("Enhancer12Effect").innerHTML = infFormat(Enhancer12Effect,true)
  Enhancer13Effect = 3*(1-1/(1+timeThisTributeReset/1000))*(3**ownedEnhancers.ThreeThree)
  document.getElementById("Enhancer13Effect").innerHTML = infFormat(Enhancer13Effect,true)
  Enhancer14Effect = 3/(1+timeThisTributeReset/1000)*(3**ownedEnhancers.ThreeFour)
  document.getElementById("Enhancer14Effect").innerHTML = infFormat(Enhancer14Effect,true)
}, 50);

function ProgressBar() {
  if (fastestTributeReset > 1e12) {
    progressbarvalue = Math.max(exoticatter,0)/25
    progressbartooltip = "Progress to Tributes: "+progressbarvalue*100+"% (Need "+infFormat(25)+" exotic matter"
  } else if (tributeUpgradesUnlocked == false) {
    progressbarvalue = 10**(3-tributes)
    progressbartooltip = "Progress to Tribute Upgrades: "+progressbarvalue*100+"% (Need "+infFormat(3)+" tributes"
  } else {
    progressbarvalue = 1
    progressbartooltip = "All features unlocked!"
  }
}
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
    VAxis: VAxis,
    UAxis: UAxis,
    TAxis: TAxis,
    SAxis: SAxis,
    timePlayed: timePlayed,
    timeThisTributeReset: timeThisTributeReset,
    fastestTributeReset: fastestTributeReset,
    timeThisWormholeReset: timeThisWormholeReset,
    fasTestWormholeReset: fastestWormholeReset,
    tributes: tributes,
    notation: notation,
    autosaveIsOn: autosaveIsOn,
    timeLeft: Number(new Date()),
    tributeUpgradeOneBought: tributeUpgradeOne.purchased,
    tributeUpgradeTwoBought: tributeUpgradeTwo.purchased,
    tributeUpgradeThreeBought: tributeUpgradeThree.purchased,
    axisAutobuyerOn: axisAutobuyerOn,
    axisAutobuyerUpgrades: axisAutobuyerUpgrades,
    enhancers: enhancers,
    unspentEnhancers: unspentEnhancers,
    enhancerCost: enhancerCost,
    ownedEnhancers: ownedEnhancers
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
  if (typeof savegame.VAxis !== "undefined") VAxis = savegame.VAxis;
  if (typeof savegame.UAxis !== "undefined") UAxis = savegame.UAxis;
  if (typeof savegame.TAxis !== "undefined") TAxis = savegame.TAxis;
  if (typeof savegame.SAxis !== "undefined") SAxis = savegame.SAxis;
  if (typeof savegame.timePlayed !== "undefined") timePlayed = savegame.timePlayed;
  if (typeof savegame.timeThisTributeReset !== "undefined") timeThisTributeReset = savegame.timeThisTributeReset;
  if (typeof savegame.fastestTributeReset !== "undefined") fastestTributeReset = savegame.fastestTributeReset;
  if (typeof savegame.timeThisWormholeReset !== "undefined") timeThisWormholeReset = savegame.timeThisWormholeReset;
  if (typeof savegame.fastestWormholeReset !== "undefined") fastestWormholeReset = savegame.fastestWormholeReset;
  if (typeof savegame.tributes !== "undefined") tributes = savegame.tributes; 
  if (typeof savegame.notation !== "undefined") notation = savegame.notation;
  if (typeof savegame.autosaveIsOn !== "undefined") autosaveIsOn = savegame.autosaveIsOn;
  if (typeof savegame.timeLeft !== "undefined") baseOfflineSpeedup = 1+(Number(new Date())-savegame.timeLeft)/30000
  offlineTime = 30
  if (typeof savegame.tributeUpgradeOneBought !=="undefined") tributeUpgradeOne.purchased = savegame.tributeUpgradeOneBought;
  if (typeof savegame.tributeUpgradeTwoBought !=="undefined") tributeUpgradeTwo.purchased = savegame.tributeUpgradeTwoBought;
  if (typeof savegame.tributeUpgradeThreeBought !=="undefined") tributeUpgradeThree.purchased = savegame.tributeUpgradeThreeBought;
  if (typeof savegame.axisAutobuyerOn !== "undefined") axisAutobuyerOn = savegame.axisAutobuyerOn;
  if (typeof savegame.axisAutobuyerUpgrades !== "undefined") axisAutobuyerUpgrades = savegame.axisAutobuyerUpgrades;
  if (typeof savegame.enhancers !=="undefined") enhancers = savegame.enhancers;
  if (typeof savegame.unspentEnhancers !=="undefined") unspentEnhancers = savegame.unspentEnhancers;
  if (typeof savegame.enhancerCost !=="undefined") enhancerCost = savegame.enhancerCost;
  if (typeof savegame.ownedEnhancers !=="undefined") ownedEnhancers = savegame.ownedEnhancers;
}
function wipeSave() {
  exoticmatter = 0; // InfOperator         // All variables start empty and are updated automatically
  exoticmatterPerSec = 0; // InfOperator
  XAxis = 0;
  YAxis = 0;
  ZAxis = 0;
  WAxis = 0;
  VAxis = 0;
  UAxis = 0;
  TAxis = 0;
  SAxis = 0;
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
  tributeUpgradeOne.purchased = 0
  enhancers = 0
  unspentEnhancers = 0
}
function toggleAutosave() {
  if (autosaveIsOn == "On") {
    autosaveIsOn = "Off"
  } else if (autosaveIsOn =="Off") {
    autosaveIsOn = "On"
  }
  document.getElementById("toggleAutosave").innerHTML = autosaveIsOn;
}
