// infOP III-1, produced by alemaninc
function infAdd(x,y) {                 // Adds two infNumbers - for example, infAdd(1,0) returns 1.0414 (log(10+1)) 
  if (Math.abs(x-y)>16) {              // If the quotient of x and y is more than 1e+16, the addition is negligible
    return Math.max(x,y)
  } else {
    z = Math.min(x,y)
    return z+Math.log10(10**(x-z)+10**(y-z))
  }
}
function infSubtract(x,y) {            // Subtracts two infNumbers - if y is greater than x an error message is output. For example, infSubtract(1,0) returns 0.9542 (log(10-1))
  if (x-y>16) {                        // If y is less than 1/1e+16 of x, the subtraction is negligible
    return x
  } else if (x==y) {                   // If x and y are equal, 1/1e+100 is output instead of -Infinite.
    return -100
  } else if (y>x) {                    // If a negative value would be output, 0 is output instead as the library can't support negative numbers. However, the game has controls in place to make sure negative values never occur
    return -100
  } else {
    return x+Math.log10(1-10**(y-x))
  }
}
var notation="Mixed scientific"
function infFormat(x,y) {
  if (x<3) {
    return (10**x).toFixed(y ? Math.max(0,Math.min(5,2-Math.floor(x))) : 0)
  } else if (notation=="Alemaninc Ordinal") {
    output="α"+(Math.floor(((x<10) ? 10*x : 100*(1+Math.log(x/10)*0.2)**5)-30).toLocaleString('en-US'))
    for (i=0; i<output.length; i++) {
      output = output.replace("0","₀").replace("1","₁").replace("2","₂").replace("3","₃").replace("4","₄").replace("5","₅").replace("6","₆").replace("7","₇").replace("8","₈").replace("9","₉")
    }
    return output
  } else if (notation=="Double Logarithm") {
    return "ee"+Math.log10(x).toFixed(3)
  } else if (notation=="Engineering") {
    function preE_length(z) { // funxction to calculate length of Characters in front of floating point
      return (10 ** (z % 3) - ((10 ** (z % 3) % 1)) % 1).toString().length
    }
    var t = Math.log10(x) // t only in use for (x>1e9)
    return (x < 1e9)
      ? (10 ** (x % 3)).toFixed((preE_length(x) == 3) ? 1 : (preE_length(x) == 2) ? 2 : 3) // dynamic float
      + "e" + (x - (x % 3)).toLocaleString("en-US")
      : "e" + (10 ** (t % 3)).toFixed((preE_length(t) == 3) ? 1 : (preE_length(t) == 2) ? 2 : 3) // dynamic float
      + "e" + (t - (t % 3)).toLocaleString("en-US");
  } else if (notation=="Infinity") {
    return (Math.log(x)/Math.log(1.79e308)).toFixed(6)+"∞"
  } else if (notation=="Logarithm") {
    return (x<1e9) ? "e"+(Math.floor((x<100000?100:1)*x)/(x<100000?100:1)).toLocaleString('en-US') : "e"+Math.floor(100*10**(x%1))/100+"e"+Math.floor(Math.log10(x))
  } else if (notation=="Mixed scientific") {
    const endings=["K","M","B","T","Qa","Qt","Sx","Sp","Oc","No"]
    return (x<33) ? (10**(x%3)).toFixed(2)+" "+endings[Math.floor(x/3)-1]                       // 3.5 = 3.16 K
    : (x<1e9) ? (10**(x%1)).toFixed(2)+"e"+Math.floor(x).toLocaleString("en-US")                // 38462.25 = 1.77e38,462
    : (x<1e33) ? "e"+(10**(Math.log10(x)%3)).toFixed(2)+" "+endings[Math.floor(Math.log10(x)/3)-1]  // 1.23e21 = e1.23 Sx
    : "e"+(x/10**Math.floor(Math.log10(x))).toFixed(2)+"e"+Math.floor(Math.log10(x))                   // 2.34e56 = e2.34e56
  } else if (notation=="Scientific") {
    return (x<1e9) ? (10**(x%1)).toFixed(2)+"e"+Math.floor(x).toLocaleString("en-US") : "e"+(x/10**Math.floor(Math.log10(x))).toFixed(2)+"e"+Math.floor(Math.log10(x))
  } else {
    return "Notation Error!"
  }
}
function normFormat(x) {               // Formats a regular number the same way infNumbers would be formatted
  if (x>=10000) {
    return infFormat(Math.log10(x))
  } else if (x>=100) {
    return Math.floor(x)
  } else {
    return Math.floor(x*100)/100
  }
}
function twoDigits(x) {                // Formats a one-digit number as two digits. For example, twoDigits(7) returns 07. Used in timeFormat
  return (x<10) ? "0"+Math.floor(x) : Math.floor(x)
}
function timeFormat(x) {               // Formats an amount of seconds as a time. For example, timeFormat(73) returns 1:13 and timeFormat(90123) returns 1 day 1:02:03
  return (x<1) ? Math.floor(x*1000)+" milliseconds" : (x<10) ? Math.floor(x*1000)/1000+" seconds" : (x<60) ? Math.floor(x)+" seconds" : (x<3600) ? Math.floor(x/60)+":"+twoDigits(Math.floor(x%60)) : (x<86400) ? Math.floor(x/3600)+":"+twoDigits(Math.floor(x/60)%60)+":"+twoDigits(Math.floor(x%60)) : Math.floor(x/86400)+" days "+Math.floor(x/3600)%24+":"+twoDigits(Math.floor(x/60)%60)+":"+twoDigits(Math.floor(x%60))
}

// The following code is for Advanced infOP only.
function normLinearSoftcap(value,start,power) {
  return (value<start) ? value : start*(1+(power+1)*(value/start-1))**(1/(power+1))
}
function infLinearSoftcap(value,start,power) {
  return (value<start) ? value : start+infAdd(0,Math.log10(power+1)+infSubtract(value-start,0))/(power+1)
}
function LogarithmicSoftcap(value,start,power) {
  return (value<start) ? value : start*(1+Math.log(value/start)*power)**(1/power)
}
function SuperlogSoftcap(value,start,power) {
  if (value<start) {
    return value
  }
  c=(value/start)**power
  multiplier=(c<Math.exp(1)) ? 1+Math.log(c) : (c<Math.exp(Math.exp(1))) ? 2+Math.log(Math.log(c)) : (c<Math.exp(Math.exp(Math.exp(1)))) ? 3+Math.log(Math.log(Math.log(c))) : 4+Math.log(Math.log(Math.log(Math.log(c))))
  return (multiplier=="Infinity" ? start : start*multiplier**(1/power))
}
function ConvergentSoftcap(value,start,end) {
  return (Math.sign(value-start)==Math.sign(start-end)) ? value : end-(end-start)/(1+(value-start)/(end-start))
}
function normLinearScaling(value,start,power) {
  return (value<start) ? value : start/(power+1)*(power+(value/start)**(power+1))
}
function infLinearScaling(value,start,power) {
  return (value<start) ? value : start-Math.log10(power+1)+infAdd(Math.log10(power),(value-start)*(power+1))
}
function normSemiexpScaling(value,start,power) {
  return (value<start) ? value : 10**(Math.log10(start)*(Math.log(value)/Math.log(start))**(power+1)-Math.log10(power+1))+start*(1-1/(power+1))
}
function infSemiexpScaling(value,start,power) {
  return (value<start) ? value : infAdd(start*(value/start)**(power+1)-Math.log10(power+1),start*(1-1/(power+1)))
}
function ExponentialScaling(value,start) {
  return (value<start) ? value : start*Math.exp(value/start-1)
}
function SuperexpScaling(value,start,power) {
    c=(value/start)**power
    multiplier=(c<2) ? Math.exp(c-1) : (c<3) ? Math.exp(Math.exp(c-2)) : (c<4) ? Math.exp(Math.exp(Math.exp(c-3))) : Math.exp(Math.exp(Math.exp(Math.exp(c-4))))
    return (multiplier=="Infinity" ? 1.79e308 : start*multiplier**(1/power))
}
function divergentScaling(value,start,end) {
  return (value>=end) ? 1e300 : ((value<start) ? value : start+(end-start)*((end-start)/(end-value)-1))
}
function infFloor(x) {
  return (x<0)?-100:(x>16)?x:Math.log10(Math.floor(10**x))
}
// End of infOP

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
function openOptionsTab(name) {
  var i;
  var x = document.getElementsByClassName("optionsTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(name).style.display = "inline-block";  
}
function openHTP(name) {
  var i;
  var x = document.getElementsByClassName("htpTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(name).style.display = "inline-block";  
}
function openSSB(name) {
  var i;
  var x = document.getElementsByClassName("ssbTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(name).style.display = "inline-block";  
}
function toggleTableRow(row,type) {
  if (type=="show") {
    document.getElementById(row).removeAttribute("hidden")
  } else {
    document.getElementById(row).setAttribute("hidden","hidden")
  }
}





var exoticmatter = 0; // InfNumber         // All variables start empty and are updated automatically
var exoticmatterThisTributeReset = 0; // InfNumber
var exoticmatterThisWormholeReset = 0; // InfNumber
var totalexoticmatter = 0; // InfNumber
var exoticmatterPerSec = 0; // InfNumber
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
var axisCostDivisor = 0; // InfNumber
var axisCostExponent = 1;
var XAxisCost = 0; // InfNumber
var XAxisEffect = 0;
var YAxisCost = 0; // InfNumber
var YAxisEffect = -3; // InfNumber
var ZAxisCost = 0; // InfNumber
var ZAxisEffect = 0; // InfNumber
var WAxisCost = 0; // InfNumber
var WAxisEffect = 0; // InfNumber
var VAxisCost = 0; // InfNumber
var VAxisEffect = 0; // InfNumber
var UAxisCost = 0; // InfNumber
var UAxisEffect = 0; // InfNumber
var TAxisCost = 0; // InfNumber
var TAxisEffect = 0; // InfNumber
var SAxisCost = 0; // InfNumber
var SAxisEffect = 0;
var axisScalingStart = 10
var axisSuperscalingStart = 200
var totalAxis = 0;
var axisUnlocked = 0;
var timePlayed = 0;
var HTPshown = 1;
var timeThisTributeReset = 0;
var fastestTributeReset = 9e15;
var timeThisWormholeReset = 0;
var fastestWormholeReset = 9e15;
var progressbarvalue = 0;
var progressbartooltip = ""
var tributeResets = 0
var tributes = -100; // InfNumber
var tributeMultiplier = 0; // InfNumber
var tributeExponent = 1;
var pendingTributes = 0; // InfNumber
var tributeExoticMatterReq = 25; // InfNumber
var tributeExoticMatterReqText = ""
var autosaveIsOn = "On"
var offlineSpeedupLength = 30
var baseOfflineSpeedup = 1
var offlineSpeedup = 1
var offlineTime = 0
var progressbarvalue = 0
var tributeBoostOne = 0 // InfNumber
var tributeBoostTwo = 0
var tributeBoostThree = 0
var tributeBoostFour = 0 // InfNumber
var tributeBoostFive = 0 // InfNumber
var tributeBoostSix = 0 // InfNumber
var tributeBoostSeven = 0
var tributeBoostEight = 0
const tributeUpgradeOne = {
  purchased: 0,
  cost: [3,6,8,17,1e300], // 1 K, 1 M, 100 M, 100 Qa
}
const tributeUpgradeTwo = {
  purchased: 0,
  tooltip: ["Unlock X axis autobuyer","Unlock Y axis autobuyer","Unlock Z axis autobuyer","Unlock W axis autobuyer","Unlock V axis autobuyer","Unlock U axis autobuyer","Unlock T axis autobuyer","Unlock S axis autobuyer","Maxed!"],
  cost: [3.47713,3.8451,4.30103,5,6,7.20412,8.698971,22,1e300], // 3 K, 7 K, 20 K, 100 K, 1 M, 16 M, 500 M, 10 Sx
}
const tributeUpgradeThree = {
  purchased: 0,
  cost: [6.698971,15,32,37.477121,61,80,1e300], // 5 M, 1 Qa, 100 No, 3e37, 1e61, 1e80
}
var axisAutobuyerOn = false
var axisAutobuyerUpgrades = 0;
var axisAutobuyerInterval = 5;
var axisAutobuyerProgress = 0
var axisAutobuyerCost = 0; // InfNumber
var enhancers = 0
var unspentEnhancers = 0
var enhancerCost = 3.30103; // InfNumber
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
var Enhancer11Effect = 0; // InfNumber
var Enhancer12Effect = 0; // InfNumber
var Enhancer13Effect = 0; // InfNumber
var Enhancer14Effect = 0; // InfNumber
var DarkMatterUnlocked = false
var darkmatter = 0; // InfNumber
var baseDarkMatterGain = 0; // InfNumber
var darkmatterPerSec = 0; // InfNumber
var darkXAxis = 0;
var darkYAxis = 0;
var darkZAxis = 0;
var darkWAxis = 0;
var darkVAxis = 0;
var darkUAxis = 0;
var darkTAxis = 0;
var darkSAxis = 0;
var darkfreeXAxis = 0;
var darkfreeYAxis = 0;
var darkfreeZAxis = 0;
var darkfreeWAxis = 0;
var darkfreeVAxis = 0;
var darkfreeUAxis = 0;
var darkfreeTAxis = 0;
var darkfreeSAxis = 0;
var darkaxisCostDivisor = 0; // InfNumber
var darkaxisCostExponent = 1;
var darkXAxisCost = 0; // InfNumber
var darkXAxisEffect = 0; // InfNumber
var darkYAxisCost = 0; // InfNumber
var darkYAxisEffect = 0; // InfNumber
var darkZAxisCost = 0; // InfNumber
var darkZAxisEffect = 0; // InfNumber
var darkWAxisCost = 0; // InfNumber
var darkWAxisEffect = 0; // InfNumber
var darkVAxisCost = 0; // InfNumber
var darkVAxisEffect = 0; 
var darkUAxisCost = 0; // InfNumber
var darkUAxisEffect = 0; // InfNumber
var darkTAxisCost = 0; // InfNumber
var darkTAxisEffect = 0; // InfNumber
var darkSAxisCost = 0; // InfNumber
var darkSAxisEffect = 0; // InfNumber
var darkaxisScalingStart = 10
var darkaxisSuperscalingStart = 200
var totaldarkAxis = 0;
var darkMatterFreeAxis = 0.25;
var axioms = 0;
var axiomRequirement = 0;
var energyTypesUnlocked = 0;
var expandingEnergy = 0;       // InfNumber
var expandingEnergyPerSec = 0; // InfNumber
var expandingEnergyEffect = 0; // InfNumber
var divineEnergy = 0;          // InfNumber
var divineEnergyPerSec = 0;    // InfNumber
var divineEnergyEffect = 0;    // InfNumber
var darkEnergy = 0;            // InfNumber
var darkEnergyPerSec = 0;      // InfNumber
var darkEnergyEffect = 0;      // InfNumber
var savecounter = 0; // will prevent save before load

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
  XAxisCost = (1+Math.log10(5+0.05*Math.max(0,XAxis-axisScalingStart)**3)**Math.max(1,XAxis/axisSuperscalingStart)*XAxis-tributeBoostFive*XAxis-axisCostDivisor)*axisCostExponent
  YAxisCost = (2*1.07**Math.max(0,YAxis-axisScalingStart)+0.113623*YAxis+0.062469*YAxis**(2**Math.max(YAxis/axisSuperscalingStart,1))-axisCostDivisor)*axisCostExponent
  ZAxisCost = (4+ZAxis**(1.379654224+0.002*Math.max(0,ZAxis-axisScalingStart)**2)*1.001**Math.max(ZAxis-axisSuperscalingStart,0)**2-axisCostDivisor)*axisCostExponent
  WAxisCost = (5.875+(WAxis+2.5*1.03**Math.max(0,WAxis-axisScalingStart)-2)**(2**Math.max(WAxis/axisSuperscalingStart,1))/2-axisCostDivisor)*axisCostExponent
  VAxisCost = (20+4.5*VAxis+0.5*VAxis**2+0.01*Math.max(0,VAxis-axisScalingStart)**(5*Math.max(VAxis/axisSuperscalingStart,1))-axisCostDivisor)*axisCostExponent
  UAxisCost = (35+10*UAxis+UAxis**(2*Math.max(UAxis/axisSuperscalingStart,1))*1.002**Math.max(0,UAxis-axisScalingStart)**2-axisCostDivisor)*axisCostExponent
  TAxisCost = (50+(9+1.1**Math.max(0,TAxis-axisScalingStart))*TAxis**Math.max(TAxis/axisSuperscalingStart,1)-axisCostDivisor)*axisCostExponent
  SAxisCost = (120*1.5**SAxis*1.05**Math.max(0,SAxis-axisScalingStart)**(2**Math.max(SAxis/axisSuperscalingStart,1))-axisCostDivisor)*axisCostExponent
}
function debugSave() {
  exoticmatter=0
  totalexoticmatter=0
  exoticmatterThisTributeReset=0
  exoticmatterThisWormholeReset=0
  exoticmatterPerSec=0
  ZAxisEffect=0
  Enhancer11Effect=0
  Enhancer12Effect=0
}
function statBreakdown(x) {
  if (x==1) {
    document.getElementById("StatBreakdown1XAxis").innerHTML = "× "+infFormat(XAxisEffect,true)+" ^ "+normFormat(XAxis+freeXAxis)
    output=XAxisEffect*(XAxis+freeXAxis)
    document.getElementById("StatBreakdown1XAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RXAxis",((XAxis+freeXAxis>0)&&(XAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown1ZAxis").innerHTML = "× "+infFormat(ZAxisEffect,true)+" ^ "+normFormat(ZAxis+freeZAxis)
    output+=ZAxisEffect*(ZAxis+freeZAxis)
    document.getElementById("StatBreakdown1ZAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RZAxis",((ZAxis+freeZAxis>0)&&(ZAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown1WAxis").innerHTML = "× "+infFormat(WAxisEffect,true)+" ^ "+normFormat(WAxis+freeWAxis)
    output+=WAxisEffect*(WAxis+freeWAxis)
    document.getElementById("StatBreakdown1WAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RWAxis",((WAxis+freeWAxis>0)&&(WAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown1TAxis").innerHTML = "× "+infFormat(TAxisEffect,true)+" ^ "+normFormat(TAxis+freeTAxis)
    output+=TAxisEffect*(TAxis+freeTAxis)
    document.getElementById("StatBreakdown1TAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RTAxis",((TAxis+freeTAxis>0)&&(TAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown1TributeBoost1").innerHTML = "× "+infFormat(tributeBoostOne,true)
    output+=tributeBoostOne
    document.getElementById("StatBreakdown1TributeBoost1T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RTributeBoost1",(tributeBoostOne!=0)?"show":"hide")
    document.getElementById("StatBreakdown1TributeBoost6").innerHTML = "× "+infFormat(tributeBoostSix,true)+" ^ "+normFormat(YAxis+freeYAxis)
    output+=tributeBoostSix*(YAxis+freeYAxis)
    document.getElementById("StatBreakdown1TributeBoost6T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RTributeBoost6",((YAxis+freeYAxis>0)&&(tributeBoostSix!=0))?"show":"hide")
    document.getElementById("StatBreakdown1Enhancer11").innerHTML = "× "+infFormat(Enhancer11Effect*ownedEnhancers.OneOne,true)
    output+=Enhancer11Effect*ownedEnhancers.OneOne
    document.getElementById("StatBreakdown1Enhancer11T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1REnhancer11",(ownedEnhancers.OneOne==0)?"hide":"show")
    document.getElementById("StatBreakdown1Enhancer12").innerHTML = "× "+infFormat(Enhancer12Effect*ownedEnhancers.OneTwo,true)
    output+=Enhancer12Effect*ownedEnhancers.OneTwo
    document.getElementById("StatBreakdown1Enhancer12T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1REnhancer12",(ownedEnhancers.OneTwo==0)?"hide":"show")
    document.getElementById("StatBreakdown1Enhancer13").innerHTML = "× "+infFormat(Enhancer13Effect*ownedEnhancers.OneThree,true)
    output+=Enhancer13Effect*ownedEnhancers.OneThree
    document.getElementById("StatBreakdown1Enhancer13T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1REnhancer13",(ownedEnhancers.OneThree==0)?"hide":"show")
    document.getElementById("StatBreakdown1Enhancer14").innerHTML = "× "+infFormat(Enhancer14Effect*ownedEnhancers.OneFour,true)
    output+=Enhancer14Effect*ownedEnhancers.OneFour
    document.getElementById("StatBreakdown1Enhancer14T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1REnhancer14",(ownedEnhancers.OneFour==0)?"hide":"show")
    document.getElementById("StatBreakdown1Enhancer42").innerHTML = "× "+infFormat(10*ownedEnhancers.FourTwo,true)
    output+=10*ownedEnhancers.FourTwo
    document.getElementById("StatBreakdown1Enhancer42T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1REnhancer42",(ownedEnhancers.FourTwo==1)?"show":"hide")
    document.getElementById("StatBreakdown1ExpandingEnergy").innerHTML = "× "+infFormat(expandingEnergyEffect,true)
    output+=expandingEnergyEffect
    document.getElementById("StatBreakdown1ExpandingEnergyT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RExpandingEnergy",(expandingEnergyEffect==0)?"hide":"show")
    document.getElementById("StatBreakdown1SAxis").innerHTML = "^ "+SAxisEffect.toFixed(4)+" ^ "+normFormat(SAxis+freeSAxis)
    output*=SAxisEffect**(SAxis+freeSAxis)
    document.getElementById("StatBreakdown1SAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RSAxis",((SAxis+freeSAxis>0)&&(SAxisEffect!=1))?"show":"hide")
    document.getElementById("StatBreakdown1Enhancer41").innerHTML = "^ "+(ownedEnhancers.FourOne==1?1.1:1)
    output*=(ownedEnhancers.FourOne==1?1.1:1)
    document.getElementById("StatBreakdown1Enhancer41T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1REnhancer41",(ownedEnhancers.FourOne==1)?"show":"hide")
    document.getElementById("StatBreakdown1OfflineSpeedup").innerHTML = "× "+normFormat(offlineSpeedup)
    output+=Math.log10(offlineSpeedup)
    document.getElementById("StatBreakdown1OfflineSpeedupT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1ROfflineSpeedup",(offlineSpeedup>1.001)?"show":"hide")
  } else if (x==2) {
    document.getElementById("StatBreakdown2BaseGain").innerHTML = (exoticmatter<24)?0:infFormat(Math.max(0,exoticmatter-24)**0.5,false)
    output=(exoticmatter<24)?-100:Math.max(0,exoticmatter-24)**0.5
    document.getElementById("StatBreakdown2BaseGainT").innerHTML = infFormat(output,false)
    document.getElementById("StatBreakdown2UAxis").innerHTML = "× "+infFormat(UAxisEffect,true)+" ^ "+normFormat(UAxis+freeUAxis)
    output+=UAxisEffect*(UAxis+freeUAxis)
    document.getElementById("StatBreakdown2UAxisT").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2RUAxis",((UAxis+freeUAxis>0)&&(UAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown2TributeBoost4").innerHTML = "× "+infFormat(tributeBoostFour,true)
    output+=tributeBoostFour
    document.getElementById("StatBreakdown2TributeBoost4T").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2RTributeBoost4",((UAxis+freeUAxis>0)&&(UAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown2Enhancer44").innerHTML = "× "+infFormat(ownedEnhancers.FourFour,true)
    output+=ownedEnhancers.FourFour
    document.getElementById("StatBreakdown2Enhancer44T").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2REnhancer44",(ownedEnhancers.FourFour==1)?"show":"hide")
    document.getElementById("StatBreakdown2DivineEnergy").innerHTML = "× "+infFormat(divineEnergyEffect,true)
    output+=divineEnergyEffect
    document.getElementById("StatBreakdown2DivineEnergyT").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2RDivineEnergy",(divineEnergyEffect==0)?"hide":"show")
    document.getElementById("StatBreakdown2Enhancer43").innerHTML = "^ "+((ownedEnhancers.FourThree==1)?1.1:1)
    output*=(ownedEnhancers.FourThree==1)?1.1:1
    document.getElementById("StatBreakdown2Enhancer43T").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2REnhancer43",(ownedEnhancers.FourThree)?"show":"hide")
    document.getElementById("StatBreakdown2UnspentTributes").innerHTML = "- "+infFormat(tributes,false)
    output=infSubtract(output,tributes)
    document.getElementById("StatBreakdown2UnspentTributesT").innerHTML = infFormat(output,false)
    document.getElementById("SSBBTributes").style = (fastestTributeReset<1e12)?"display:inline-block":"display:none"
  } else if (x==3) {
    document.getElementById("StatBreakdown3BaseGain").innerHTML = infFormat(baseDarkMatterGain,true)
    output=baseDarkMatterGain
    document.getElementById("StatBreakdown3BaseGainT").innerHTML = infFormat(output,true)
    document.getElementById("StatBreakdown3DarkXAxis").innerHTML = "× "+infFormat(darkXAxisEffect,true)+" ^ "+normFormat(darkXAxis+darkfreeXAxis)
    output+=darkXAxisEffect*(darkXAxis+darkfreeXAxis)
    document.getElementById("StatBreakdown3DarkXAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkXAxis",((darkXAxis+darkfreeXAxis>0)&&(darkXAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown3DarkZAxis").innerHTML = "× "+infFormat(darkZAxisEffect,true)+" ^ "+normFormat(darkZAxis+darkfreeZAxis)
    output+=darkZAxisEffect*(darkZAxis+darkfreeZAxis)
    document.getElementById("StatBreakdown3DarkZAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkZAxis",((darkZAxis+darkfreeZAxis>0)&&(darkZAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown3DarkUAxis").innerHTML = "× "+infFormat(darkUAxisEffect,true)+" ^ ("+normFormat(darkUAxis+darkfreeUAxis)+" × "+normFormat(totaldarkAxis)+")"
    output+=darkUAxisEffect*(darkUAxis+darkfreeUAxis)*totaldarkAxis
    document.getElementById("StatBreakdown3DarkUAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkUAxis",((darkUAxis+darkfreeUAxis>0)&&(darkUAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown3DarkTAxis").innerHTML = "× "+infFormat(darkTAxisEffect,true)+" ^ "+normFormat(darkTAxis+darkfreeTAxis)
    output+=darkTAxisEffect*(darkTAxis+darkfreeTAxis)
    document.getElementById("StatBreakdown3DarkTAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkTAxis",((darkTAxis+darkfreeTAxis>0)&&(darkTAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown3Axioms").innerHTML = "× "+infFormat(1,true)+" ^ "+normFormat(axioms)
    output+=axioms
    document.getElementById("StatBreakdown3AxiomsT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RAxioms",(axioms>0)?"show":"hide")
    document.getElementById("StatBreakdown3DarkEnergy").innerHTML = "× "+infFormat(darkEnergyEffect,true)
    output+=darkEnergyEffect
    document.getElementById("StatBreakdown3AxiomsT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkEnergy",(darkEnergyEffect!=0)?"show":"hide")
    document.getElementById("StatBreakdown3DarkSAxis").innerHTML = "^ "+darkSAxisEffect.toFixed(4)+" ^ "+normFormat(darkSAxis+darkfreeSAxis)
    output*=darkSAxisEffect**(darkSAxis+darkfreeSAxis)
    document.getElementById("StatBreakdown3DarkSAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkSAxis",((darkSAxis+darkfreeSAxis>0)&&(darkSAxisEffect!=1))?"show":"hide")
    document.getElementById("StatBreakdown3OfflineSpeedup").innerHTML = "× "+normFormat(offlineSpeedup)
    output+=Math.log10(offlineSpeedup)
    document.getElementById("StatBreakdown3OfflineSpeedupT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3ROfflineSpeedup",(offlineSpeedup>1.001)?"show":"hide")
    document.getElementById("SSBBDarkMatter").style = (DarkMatterUnlocked)?"display:inline-block":"display:none"
  }
}
function tributeReset() {
  if (pendingTributes>tributes) {
    exoticmatter=0
    exoticmatterPerSec=0
    XAxis=0
    YAxis=0
    ZAxis=0
    WAxis=0
    VAxis=0
    UAxis=0
    TAxis=0
    SAxis=0
    exoticmatterThisTributeReset=0
    fastestTributeReset=Math.min(fastestTributeReset,timeThisTributeReset)
    timeThisTributeReset=0
    tributes=pendingTributes
    tributeResets++
    expandingEnergy=0
    divineEnergy=0
    darkEnergy=0
  }
}
function forceTributeReset() {
  exoticmatter=0
  exoticmatterPerSec=0
  XAxis=0
  YAxis=0
  ZAxis=0
  WAxis=0
  VAxis=0
  UAxis=0
  TAxis=0
  SAxis=0
  exoticmatterThisTributeReset=0
  timeThisTributeReset=0
  expandingEnergy=0
  divineEnergy=0
  darkEnergy=0
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
function updateDarkAxisCosts() {
  darkXAxisCost = (1+darkXAxis**Math.max(1,darkXAxis/darkaxisScalingStart)**0.7-darkaxisCostDivisor)*darkaxisCostExponent
  darkYAxisCost = (2+(darkYAxis+darkYAxis**(1+Math.max(1,darkYAxis/darkaxisScalingStart)))*2-darkaxisCostDivisor)*darkaxisCostExponent
  darkZAxisCost = (4+2*darkZAxis**2*1.01**Math.max(0,darkZAxis-darkaxisScalingStart)**1.5-darkaxisCostDivisor)*darkaxisCostExponent
  darkWAxisCost = (8*1.375**darkWAxis**0.813352889*1.01**Math.max(0,darkWAxis-darkaxisScalingStart)**2-darkaxisCostDivisor)*darkaxisCostExponent
  darkVAxisCost = (16+darkVAxis*5+darkVAxis**2*2+darkVAxis**(2+Math.max(1,darkVAxis/darkaxisScalingStart))-darkaxisCostDivisor)*darkaxisCostExponent
  darkUAxisCost = (14+14*(0.25+Math.max(1,darkUAxis/darkaxisScalingStart))**darkUAxis-darkaxisCostDivisor)*darkaxisCostExponent
  darkTAxisCost = (36*1.1**Math.max(0,darkTAxis-darkaxisScalingStart)+20*darkTAxis-darkaxisCostDivisor)*darkaxisCostExponent
  darkSAxisCost = (40+(darkSAxis+1)**(3+Math.max(0,darkSAxis-darkaxisScalingStart))-darkaxisCostDivisor)*darkaxisCostExponent
}
function buyDarkXAxis() {
  if (darkmatter>darkXAxisCost) {
    darkmatter=infSubtract(darkmatter,darkXAxisCost)
    darkXAxis++
  }
}
function buyDarkYAxis() {
  if (darkmatter>darkYAxisCost) {
    darkmatter=infSubtract(darkmatter,darkYAxisCost)
    darkYAxis++
  }
}
function buyDarkZAxis() {
  if (darkmatter>darkZAxisCost) {
    darkmatter=infSubtract(darkmatter,darkZAxisCost)
    darkZAxis++
  }
}
function buyDarkWAxis() {
  if (darkmatter>darkWAxisCost) {
    darkmatter=infSubtract(darkmatter,darkWAxisCost)
    darkWAxis++
  }
}
function buyDarkVAxis() {
  if (darkmatter>darkVAxisCost) {
    darkmatter=infSubtract(darkmatter,darkVAxisCost)
    darkVAxis++
  }
}
function buyDarkUAxis() {
  if (darkmatter>darkUAxisCost) {
    darkmatter=infSubtract(darkmatter,darkUAxisCost)
    darkUAxis++
  }
}
function buyDarkTAxis() {
  if (darkmatter>darkTAxisCost) {
    darkmatter=infSubtract(darkmatter,darkTAxisCost)
    darkTAxis++
  }
}
function buyDarkSAxis() {
  if (darkmatter>darkSAxisCost) {
    darkmatter=infSubtract(darkmatter,darkSAxisCost)
    darkSAxis++
  }
}
function gainAxiom() {
  if (totaldarkAxis >= axiomRequirement) {
    darkmatter=0
    darkmatterPerSec=0
    darkXAxis=0
    darkYAxis=0
    darkZAxis=0
    darkWAxis=0
    darkVAxis=0
    darkUAxis=0
    darkTAxis=0
    darkSAxis=0
    axioms++
    if (exoticmatter > tributeExoticMatterReq) {
      tributeReset()
    } else {
      forceTributeReset()
    }
  }
}






window.setInterval(function(){                                                                     // The game loop, which consists of functions that run automatically. Frame rate is 20fps


  // QoL section
  if ((offlineTime > 0) && (baseOfflineSpeedup > 1+5/offlineSpeedupLength)) {
    offlineSpeedup = baseOfflineSpeedup
    offlineTime = offlineTime-0.05
    document.getElementById("offlineSpeedupDisplay").innerHTML = "Offline speedup: "+normFormat(offlineSpeedup)+"x     Offline time left: "+normFormat(offlineTime)+"s"
  } else {
    offlineSpeedup = 1
    document.getElementById("offlineSpeedupDisplay").innerHTML = ""
  }
  document.getElementById("offlineSpeedupLength").innerHTML = offlineSpeedupLength+"s"
  if (isNaN(exoticmatter)) {
    debugSave()
  }
  ProgressBar()


  // Exotic matter section
  axisCostDivisor = VAxisEffect*(VAxis+freeVAxis)
  axisCostExponent = 1
  axisScalingStart = 10+tributeBoostSeven
  axisSuperscalingStart
  freeXAxis = Math.min(2*XAxis,2*ownedEnhancers.TwoOne+(darkXAxis*darkMatterFreeAxis))
  XAxisEffect = infAdd(0.3010299957,Math.log10(Math.max(1e-100,YAxis+freeYAxis))+YAxisEffect);
  freeYAxis = Math.min(2*YAxis,2*ownedEnhancers.TwoTwo+(darkYAxis*darkMatterFreeAxis))
  YAxisEffect = -0.903089987+Math.log10(1+tributeBoostTwo/100);
  freeZAxis = Math.min(2*ZAxis,2*ownedEnhancers.TwoThree+(darkZAxis*darkMatterFreeAxis))
  ZAxisEffect = (Math.log10(Math.log10(Math.max(exoticmatter,0)+1)+1)+1)**(Math.log10(Math.log10(Math.max(exoticmatter,0)+1)+1)+1)**2-1
  freeWAxis = Math.min(2*WAxis,2*ownedEnhancers.TwoFour+(darkWAxis*darkMatterFreeAxis))
  WAxisEffect = Math.log10(Math.log10(timeThisTributeReset/10+100))+tributeBoostThree
  freeVAxis = Math.min(2*VAxis,(darkVAxis*darkMatterFreeAxis))
  VAxisEffect = 0.3010299957*(1+tributeBoostEight/100)*(1+(darkVAxis+darkfreeVAxis)*darkVAxisEffect/100)
  freeUAxis = Math.min(2*UAxis,(darkUAxis*darkMatterFreeAxis))
  UAxisEffect = 0.07918124605*(1+(darkWAxis+darkfreeWAxis)*darkWAxisEffect/100)
  freeTAxis = Math.min(2*TAxis,(darkTAxis*darkMatterFreeAxis))
  TAxisEffect = Math.log10(totalAxis+1)**(1+Math.log10(totalAxis+1))/5
  freeSAxis = Math.min(2*SAxis,(darkSAxis*darkMatterFreeAxis))
  SAxisEffect = 1.025
  updateAxisCosts()
  totalAxis = XAxis+YAxis+ZAxis+WAxis+VAxis+UAxis+TAxis+SAxis
  axisUnlocked = Math.min(1+Math.sign(XAxis)+Math.sign(YAxis)+Math.sign(ZAxis)+Math.sign(WAxis)+Math.sign(VAxis)+Math.sign(UAxis)+Math.sign(TAxis)+Math.sign(SAxis),4+tributeUpgradeOne.purchased)
  document.getElementById("XAxisButton").style=(axisUnlocked<1)?"display:none":"display:inline-block"
  document.getElementById("YAxisButton").style=(axisUnlocked<2)?"display:none":"display:inline-block"
  document.getElementById("ZAxisButton").style=(axisUnlocked<3)?"display:none":"display:inline-block"
  document.getElementById("WAxisButton").style=(axisUnlocked<4)?"display:none":"display:inline-block"
  document.getElementById("VAxisButton").style=(axisUnlocked<5)?"display:none":"display:inline-block"
  document.getElementById("UAxisButton").style=(axisUnlocked<6)?"display:none":"display:inline-block"
  document.getElementById("TAxisButton").style=(axisUnlocked<7)?"display:none":"display:inline-block"
  document.getElementById("SAxisButton").style=(axisUnlocked<8)?"display:none":"display:inline-block"
  document.getElementById("XAxisButton").className=(exoticmatter<XAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("YAxisButton").className=(exoticmatter<YAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("ZAxisButton").className=(exoticmatter<ZAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("WAxisButton").className=(exoticmatter<WAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("VAxisButton").className=(exoticmatter<VAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("UAxisButton").className=(exoticmatter<UAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("TAxisButton").className=(exoticmatter<TAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("SAxisButton").className=(exoticmatter<SAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("XAxisEffect").innerHTML = infFormat(XAxisEffect,true);
  document.getElementById("XAxisCost").innerHTML = infFormat(XAxisCost,false);
  document.getElementById("XAxisAmount").innerHTML = (freeXAxis > 0) ? XAxis+" + "+normFormat(freeXAxis) : XAxis;
  document.getElementById("YAxisEffect").innerHTML = infFormat(YAxisEffect,true);
  document.getElementById("YAxisCost").innerHTML = infFormat(YAxisCost,false);
  document.getElementById("YAxisAmount").innerHTML = (freeYAxis > 0) ? YAxis+" + "+normFormat(freeYAxis) : YAxis;
  document.getElementById("ZAxisEffect").innerHTML = infFormat(ZAxisEffect,true);
  document.getElementById("ZAxisCost").innerHTML = infFormat(ZAxisCost,false);
  document.getElementById("ZAxisAmount").innerHTML = (freeZAxis > 0) ? ZAxis+" + "+normFormat(freeZAxis) : ZAxis;
  document.getElementById("WAxisEffect").innerHTML = infFormat(WAxisEffect,true);
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


  // Options & Display section
  document.getElementById("hiddenstatAxisCostDivisor").innerHTML = infFormat(axisCostDivisor,true)
  document.getElementById("hiddenstatAxisCostExponent").innerHTML = (axisCostExponent>1e-4) ? axisCostExponent.toFixed(3-Math.floor(Math.log10(axisCostExponent))) : "1 / "&normFormat(1/axisCostExponent)
  document.getElementById("hiddenstatAxisScalingStart").innerHTML = normFormat(axisScalingStart)
  document.getElementById("hiddenstatAxisSuperscalingStart").innerHTML = normFormat(axisSuperscalingStart)
  document.getElementById("hiddenstatTotalAxis").innerHTML = totalAxis
  document.getElementById("hiddenstatProgressValue").innerHTML = Math.floor(10000*progressbarvalue)/100+"%"
  document.getElementById("hiddenstatTributeResets").innerHTML = tributeResets
  document.getElementById("hiddenstatTributeMultiplier").innerHTML = infFormat(tributeMultiplier,true)
  document.getElementById("hiddenstatTributeExponent").innerHTML = (tributeExponent<1e4) ? tributeExponent.toFixed(4+Math.floor(Math.log10(axisCostExponent))) : normFormat(tributeExponent)
  document.getElementById("hiddenstatAxisAutobuyerUpgrades").innerHTML = axisAutobuyerUpgrades
  document.getElementById("hiddenstatDarkAxisCostDivisor").innerHTML = infFormat(darkaxisCostDivisor,true)
  document.getElementById("hiddenstatDarkAxisCostExponent").innerHTML = (darkaxisCostExponent>1e-4) ? darkaxisCostExponent.toFixed(3-Math.floor(Math.log10(darkaxisCostExponent))) : "1 / "&normFormat(1/darkaxisCostExponent)
  document.getElementById("hiddenstatDarkAxisScalingStart").innerHTML = normFormat(darkaxisScalingStart)
  document.getElementById("hiddenstatDarkAxisSuperscalingStart").innerHTML = normFormat(darkaxisSuperscalingStart)
  document.getElementById("hiddenstatTotalDarkAxis").innerHTML = totaldarkAxis
  toggleTableRow("hiddenstatrowAxisCostDivisor",(axisCostDivisor==0)?"hide":"show")
  toggleTableRow("hiddenstatrowAxisCostExponent",(axisCostExponent==1)?"hide":"show")
  toggleTableRow("hiddenstatrowAxisScalingStart",(Math.max(XAxis,YAxis,ZAxis,WAxis,VAxis,UAxis,TAxis,SAxis)<axisScalingStart)?"hide":"show")
  toggleTableRow("hiddenstatrowAxisSuperscalingStart",(Math.max(XAxis,YAxis,ZAxis,WAxis,VAxis,UAxis,TAxis,SAxis)<axisSuperscalingStart)?"hide":"show")
  toggleTableRow("hiddenstatrowTributeResets",(fastestTributeReset>1e12)?"hide":"show")
  toggleTableRow("hiddenstatrowTributeMultiplier",(tributeMultiplier==0)?"hide":"show")
  toggleTableRow("hiddenstatrowTributeExponent",(tributeExponent==1)?"hide":"show")
  toggleTableRow("hiddenstatrowAxisAutobuyerUpgrades",(tributeUpgradeTwo.purchased==0)?"hide":"show")
  toggleTableRow("hiddenstatrowDarkAxisCostDivisor",(darkaxisCostDivisor==0)?"hide":"show")
  toggleTableRow("hiddenstatrowDarkAxisCostExponent",(darkaxisCostExponent==1)?"hide":"show")
  toggleTableRow("hiddenstatrowDarkAxisScalingStart",(Math.max(darkXAxis,darkYAxis,darkZAxis,darkWAxis,darkVAxis,darkUAxis,darkTAxis,darkSAxis)<darkaxisScalingStart)?"hide":"show")
  toggleTableRow("hiddenstatrowDarkAxisSuperscalingStart",(Math.max(darkXAxis,darkYAxis,darkZAxis,darkWAxis,darkVAxis,darkUAxis,darkTAxis,darkSAxis)<darkaxisSuperscalingStart)?"hide":"show")
  toggleTableRow("hiddenstatrowTotalDarkAxis",(DarkMatterUnlocked)?"show":"hide")
  statBreakdown(1)
  statBreakdown(2)
  statBreakdown(3)

  document.getElementById("notationButton").innerHTML = notation
  document.getElementById("toggleAutosave").innerHTML = autosaveIsOn;
  document.getElementById("HTPTributeReq").innerHTML = infFormat(25,false)
  HTPshown = ((HTPshown==1) && (fastestTributeReset < 1e12)) ? 3 : HTPshown
  HTPshown = ((HTPshown==3) && DarkMatterUnlocked) ? 4 : HTPshown
  HTPshown = ((HTPshown==4) && (energyTypesUnlocked > 0)) ? 5 : HTPshown
  document.getElementById("HTPBTributes").style = (HTPshown>=2) ? "display:inline-block" : "display:none"
  document.getElementById("HTPBEnhancers").style = (HTPshown>=3) ? "display:inline-block" : "display:none"
  document.getElementById("HTPBDarkMatter").style = (HTPshown>=4) ? "display:inline-block" : "display:none"
  document.getElementById("HTPBEnergy").style = (HTPshown>=5) ? "display:inline-block" : "display:none"
  if ((fastestTributeReset < 1e12) || (fastestWormholeReset < 1e12)) {
    document.getElementById("tributesbigtab").style="display:inline-block"
    document.getElementById("tributeDisplay").style="display:inline-block"
    document.getElementById("tributeStatistics").style="display:inline-block"
  } else {
    document.getElementById("tributesbigtab").style="display:none"
    document.getElementById("tributeDisplay").style="display:none"
    document.getElementById("tributeStatistics").style="display:none"
  }
  if (fastestWormholeReset < 1e12) {
    document.getElementById("wormholeStatistics").style.visibility="visible"
  } else {
    document.getElementById("wormholeStatistics").style.visibility="hidden"
  }
  timePlayed+=0.05*offlineSpeedup
  timeThisTributeReset+=0.05*offlineSpeedup
  timeThisWormholeReset+=0.05*offlineSpeedup
  document.getElementById("timePlayed").innerHTML = timeFormat(timePlayed);
  document.getElementById("timeThisTributeReset").innerHTML = timeFormat(timeThisTributeReset);
  document.getElementById("timeThisWormholeReset").innerHTML = timeFormat(timeThisWormholeReset);
  document.getElementById("fastestTributeReset").innerHTML = timeFormat(fastestTributeReset);
  document.getElementById("fastestWormholeReset").innerHTML = timeFormat(fastestWormholeReset);


  // Tribute section
  if (tributeUpgradeTwo.purchased == 0) {
    document.getElementById("automationbigtab").style="display:none"
  } else {
    document.getElementById("automationbigtab").style="display:inline-block"
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
  tributeMultiplier=UAxisEffect*(UAxis+freeUAxis)+tributeBoostFour+ownedEnhancers.FourFour+divineEnergyEffect
  tributeExponent=1.1**ownedEnhancers.FourThree
  pendingTributes=infFloor((Math.max(0,exoticmatter-24)**0.5+tributeMultiplier)*tributeExponent)
  if (pendingTributes<infAdd(tributes,0)) {
    tributeExoticMatterReq=((infAdd(tributes,0)/tributeExponent)-tributeMultiplier)**2+24
    tributeExoticMatterReqText="(Need "+infFormat(tributeExoticMatterReq)+" exotic matter)"
  } else {
    tributeExoticMatterReqText=""
  }
  document.getElementById("tributeExoticMatterRequirement").innerHTML = tributeExoticMatterReqText
  document.getElementById("currentTributes").innerHTML = infFormat(tributes,false);
  if (autosaveIsOn == "On" && savecounter > 0) {
    save()
  }
  document.getElementById("pendingTributes").innerHTML = infFormat(infSubtract(Math.max(pendingTributes,tributes),tributes),false)
  tributeBoostOne=Math.max(0,tributes)*0.5+Math.max(0,tributes)**1.5/100
  document.getElementById("TributeBoostOne").innerHTML = infFormat(tributeBoostOne,true)
  tributeBoostTwo=Math.max(0,normLinearSoftcap(tributes,5,2))*20
  document.getElementById("TributeBoostTwo").innerHTML = normFormat(tributeBoostTwo)
  tributeBoostThree=Math.log10(Math.max(tributes,6)-5)*((tributeUpgradeThree.purchased>0)?1:0)
  document.getElementById("TributeBoostThree").innerHTML = infFormat(tributeBoostThree,true)
  tributeBoostFour=(Math.max(tributes-5.7,8)**(2/3)-4)*((tributeUpgradeThree.purchased>1)?1:0)
  document.getElementById("TributeBoostFour").innerHTML = infFormat(tributeBoostFour,true)
  tributeBoostFive=(Math.max(tributes,10)**0.60206-4)*0.1*((tributeUpgradeThree.purchased>2)?1:0)
  document.getElementById("TributeBoostFive").innerHTML = infFormat(tributeBoostFive,true)
  tributeBoostSix=LogarithmicSoftcap(Math.max(tributes-34,0)**0.8*0.2*((tributeUpgradeThree.purchased>3)?1:0),2,0.5)
  document.getElementById("TributeBoostSix").innerHTML = infFormat(tributeBoostSix,true)
  tributeBoostSeven=(1+Math.log10(Math.max(tributes-59,1)))**3*((tributeUpgradeThree.purchased>4)?1:0)
  document.getElementById("TributeBoostSeven").innerHTML = normFormat(tributeBoostSeven)
  tributeBoostEight=Math.max(tributes-61,0)**1.1*130*((tributeUpgradeThree.purchased>5)?1:0)
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
  document.getElementById("TributeUpgradeOneCost").innerHTML = infFormat(tributeUpgradeOne.cost[tributeUpgradeOne.purchased],false)
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
  document.getElementById("TributeUpgradeTwoCost").innerHTML = infFormat(tributeUpgradeTwo.cost[tributeUpgradeTwo.purchased],false)
  if (tributes < tributeUpgradeThree.cost[tributeUpgradeThree.purchased]) {
    document.getElementById("TributeUpgradeThreeButton").className = "lockedaxisbutton";
  } else {
    document.getElementById("TributeUpgradeThreeButton").className = "tributeupgradebutton";
  }
  document.getElementById("TributeUpgradeThreeCost").innerHTML = infFormat(tributeUpgradeThree.cost[tributeUpgradeThree.purchased],false)
  if (axisAutobuyerOn == true) {
    document.getElementById("axisAutobuyerToggle").className = "automatortoggleon"
  } else {
    document.getElementById("axisAutobuyerToggle").className = "automatortoggleoff"
  }
  axisAutobuyerCost = Math.floor(50*1.02**axisAutobuyerUpgrades)
  document.getElementById("axisAutobuyerUpgradeCost").innerHTML = infFormat(axisAutobuyerCost,false)
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
  if (tributeUpgradeThree.purchased == 6) {
    document.getElementById("TributeUpgradeThreeButton").style="display:none"
  } else {
    document.getElementById("TributeUpgradeThreeButton").style="display:inline-block"
  }


  // Enhancer section
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


  // Dark Matter section
  if ((tributes > 27) && (DarkMatterUnlocked == false)) {
    DarkMatterUnlocked=true
  }
  if (DarkMatterUnlocked == true) {
    document.getElementById("DarkMatterButton").style="display:inline-block"
    darkmatter=infAdd(darkmatter,darkmatterPerSec-1.30103)
  } else {
    document.getElementById("DarkMatterButton").style="display:none"
  }
  if (isNaN(darkmatter)) {
    darkmatter=0
    darkmatterPerSec=0
  }
  baseDarkMatterGain=Math.max(tributes-26,1)**0.5-1
  darkmatterPerSec=(baseDarkMatterGain+darkXAxisEffect*(darkXAxis+darkfreeXAxis)+darkZAxisEffect*(darkZAxis+darkfreeZAxis)+darkUAxisEffect*(darkUAxis+darkfreeUAxis)*totaldarkAxis+darkTAxisEffect*(darkTAxis+darkfreeTAxis)+axioms+darkEnergyEffect)
  *darkSAxisEffect**(darkSAxis+darkfreeSAxis)+Math.log10(offlineSpeedup)
  darkaxisCostDivisor = darkYAxisEffect*(darkYAxis+darkfreeYAxis)
  darkaxisCostExponent = 1
  darkaxisScalingStart = 10
  darkaxisSuperscalingStart = 200
  darkfreeXAxis = Math.min(2*darkXAxis,0)
  darkXAxisEffect = 0.47712125472*(1+Math.floor((7+axioms)/8)*0.1)
  darkfreeYAxis = Math.min(2*darkYAxis,0)
  darkYAxisEffect = 0.60206*(1+Math.floor((6+axioms)/8)*0.1)
  darkfreeZAxis = Math.min(2*darkZAxis,0)
  darkZAxisEffect = Math.max(exoticmatter/500-1,0)**0.25*(1+Math.floor((5+axioms)/8)*0.1)
  darkfreeWAxis = Math.min(2*darkWAxis,0)
  darkWAxisEffect = 10*(1+Math.floor((4+axioms)/8)*0.1)
  darkfreeVAxis = Math.min(2*darkVAxis,0)
  darkVAxisEffect = 10*(1+Math.floor((3+axioms)/8)*0.1)
  darkfreeUAxis = Math.min(2*darkUAxis,0)
  darkUAxisEffect = 0.008600171762*(1+Math.floor((2+axioms)/8)*0.1)
  darkfreeTAxis = Math.min(2*darkTAxis,0)
  darkTAxisEffect = Math.log10(1+timeThisTributeReset/1000)**0.5*(1+Math.floor((1+axioms)/8)*0.1)
  darkfreeSAxis = Math.min(2*darkSAxis,0)
  darkSAxisEffect = 1+0.01*(1+Math.floor(axioms/8)*0.1)
  updateDarkAxisCosts()
  totaldarkAxis = darkXAxis+darkYAxis+darkZAxis+darkWAxis+darkVAxis+darkUAxis+darkTAxis+darkSAxis
  document.getElementById("darkMatterDisplay").innerHTML = infFormat(darkmatter,false);
  document.getElementById("darkMatterPerSec").innerHTML = infFormat(darkmatterPerSec,false)
  document.getElementById("baseDarkMatterGain").innerHTML = infFormat(baseDarkMatterGain,true)
  document.getElementById("darkMatterFreeAxis").innerHTML = normFormat(1/darkMatterFreeAxis)
  document.getElementById("DarkXAxisEffect").innerHTML = infFormat(darkXAxisEffect,true);
  document.getElementById("DarkXAxisCost").innerHTML = infFormat(darkXAxisCost,false);
  document.getElementById("DarkXAxisAmount").innerHTML = (darkfreeXAxis > 0) ? darkXAxis+" + "+normFormat(darkfreeXAxis) : darkXAxis;
  document.getElementById("DarkYAxisEffect").innerHTML = infFormat(darkYAxisEffect,true);
  document.getElementById("DarkYAxisCost").innerHTML = infFormat(darkYAxisCost,false);
  document.getElementById("DarkYAxisAmount").innerHTML = (darkfreeYAxis > 0) ? darkYAxis+" + "+normFormat(darkfreeYAxis) : darkYAxis;
  document.getElementById("DarkZAxisEffect").innerHTML = infFormat(darkZAxisEffect,true);
  document.getElementById("DarkZAxisCost").innerHTML = infFormat(darkZAxisCost,false);
  document.getElementById("DarkZAxisAmount").innerHTML = (darkfreeZAxis > 0) ? darkZAxis+" + "+normFormat(darkfreeZAxis) : darkZAxis;
  document.getElementById("DarkWAxisEffect").innerHTML = normFormat(darkWAxisEffect);
  document.getElementById("DarkWAxisCost").innerHTML = infFormat(darkWAxisCost,false);
  document.getElementById("DarkWAxisAmount").innerHTML = (darkfreeWAxis > 0) ? darkWAxis+" + "+normFormat(darkfreeWAxis) : darkWAxis;
  document.getElementById("DarkVAxisEffect").innerHTML = normFormat(darkVAxisEffect);
  document.getElementById("DarkVAxisCost").innerHTML = infFormat(darkVAxisCost,false);
  document.getElementById("DarkVAxisAmount").innerHTML = (darkfreeVAxis > 0) ? darkVAxis+" + "+normFormat(darkfreeVAxis) : darkVAxis;
  document.getElementById("DarkUAxisEffect").innerHTML = infFormat(darkUAxisEffect,true);
  document.getElementById("DarkUAxisCost").innerHTML = infFormat(darkUAxisCost,false);
  document.getElementById("DarkUAxisAmount").innerHTML = (darkfreeUAxis > 0) ? darkUAxis+" + "+normFormat(darkfreeUAxis) : darkUAxis;
  document.getElementById("DarkTAxisEffect").innerHTML = infFormat(darkTAxisEffect,true);
  document.getElementById("DarkTAxisCost").innerHTML = infFormat(darkTAxisCost,false);
  document.getElementById("DarkTAxisAmount").innerHTML = (darkfreeTAxis > 0) ? darkTAxis+" + "+normFormat(darkfreeTAxis) : darkTAxis;
  document.getElementById("DarkSAxisEffect").innerHTML = Math.floor(darkSAxisEffect*10000)/10000;
  document.getElementById("DarkSAxisCost").innerHTML = infFormat(darkSAxisCost,false);
  document.getElementById("DarkSAxisAmount").innerHTML = (darkfreeSAxis > 0) ? darkSAxis+" + "+normFormat(darkfreeSAxis) : darkSAxis;
  document.getElementById("DarkXAxisButton").className=(darkmatter<darkXAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkYAxisButton").className=(darkmatter<darkYAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkZAxisButton").className=(darkmatter<darkZAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkWAxisButton").className=(darkmatter<darkWAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkVAxisButton").className=(darkmatter<darkVAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkUAxisButton").className=(darkmatter<darkUAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkTAxisButton").className=(darkmatter<darkTAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkSAxisButton").className=(darkmatter<darkSAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  axiomRequirement=24+12*Math.floor(axioms/8)+4*Math.floor(axioms/8)**2+(2+Math.floor(axioms/8))*(axioms%8)
  document.getElementById("axiomButton").className = (totaldarkAxis>=axiomRequirement)?"axiombutton":"lockedaxiombutton"
  document.getElementById("axiomDisplay").innerHTML = axioms
  document.getElementById("nextAxiomAxis").innerHTML = "XYZWVUTS".substr(axioms%8,1)
  document.getElementById("axiomProgress").innerHTML = totaldarkAxis
  document.getElementById("axiomRequirement").innerHTML = axiomRequirement


  // Energy section
  if ((exoticmatter > 2400) && (energyTypesUnlocked == 0)) {
    energyTypesUnlocked=1
  }
  if (energyTypesUnlocked>0) {
    document.getElementById("EnergyButton").style="display:inline-block"
    expandingEnergy+=expandingEnergyPerSec/20
  } else {
    document.getElementById("EnergyButton").style="display:none"
  }
  if (isNaN(expandingEnergy)) {
    expandingEnergy=0
    expandingEnergyPerSec=0
  }
  expandingEnergyPerSec=Math.min(exoticmatter*20,(5+0.01*exoticmatter/Math.log(Math.max(0,exoticmatter)+1.001))*offlineSpeedup/10**Math.max(0,Math.max(1,expandingEnergy)/Math.max(1,exoticmatter)-1))
  expandingEnergyEffect=((expandingEnergy>exoticmatter) && (exoticmatter>0)) ? exoticmatter*((expandingEnergy/exoticmatter)**0.4-1)*0.5 : 0
  document.getElementById("expandingEnergyDisplay").innerHTML = infFormat(expandingEnergy,false)
  document.getElementById("expandingEnergyPerSec").innerHTML = infFormat(expandingEnergyPerSec,true)
  document.getElementById("expandingEnergyEffect").innerHTML = infFormat(expandingEnergyEffect,true)
  if ((exoticmatter > 4000) && (energyTypesUnlocked == 1)) {
    energyTypesUnlocked=2
  }
  if (energyTypesUnlocked>1) {
    document.getElementById("DivineEnergy").style.visibility="visible"
    divineEnergy+=divineEnergyPerSec/20
  } else {
    document.getElementById("DivineEnergy").style.visibility="hidden"
  }
  if (isNaN(divineEnergy)) {
    divineEnergy=0
    divineEnergyPerSec=0
  }
  divineEnergyPerSec=Math.min(tributes*20,(0.0025*tributes/Math.log(Math.max(0,tributes)+1.001))*offlineSpeedup/100**Math.max(0,Math.max(1,divineEnergy)/Math.max(1,tributes)-1))
  if (divineEnergyPerSec<0) divineEnergyPerSec = 0; // prevent -2000 value
  divineEnergyEffect=((divineEnergy>tributes) && (tributes>0)) ? tributes*((divineEnergy/tributes)**0.5-1)*0.25 : 0
  document.getElementById("divineEnergyDisplay").innerHTML = infFormat(divineEnergy,false)
  document.getElementById("divineEnergyPerSec").innerHTML = infFormat(divineEnergyPerSec,true)
  document.getElementById("divineEnergyEffect").innerHTML = infFormat(divineEnergyEffect,true)
  if ((exoticmatter > 5600) && (energyTypesUnlocked == 2)) {
    energyTypesUnlocked=3
  }
  if (energyTypesUnlocked>2) {
    document.getElementById("DarkEnergy").style.visibility="visible"
    darkEnergy+=darkEnergyPerSec/20
  } else {
    document.getElementById("DarkEnergy").style.visibility="hidden"
  }
  if (isNaN(darkEnergy)) {
    darkEnergy=0
    darkEnergyPerSec=0
  }
  darkEnergyPerSec=Math.min(darkmatter*20,(0.004*darkmatter/Math.log(Math.max(0,darkmatter)+1.001))*offlineSpeedup/100**Math.max(0,Math.max(1,darkEnergy)/Math.max(1,darkmatter)-1))
  if (Number.isNaN(darkEnergyPerSec)) darkEnergyPerSec=0; // it's getting NaN for whatever reason
  darkEnergyEffect=((darkEnergy>darkmatter) && (darkmatter>0)) ? darkmatter*((darkEnergy/darkmatter)**0.6-1)*0.2 : 0
  document.getElementById("darkEnergyDisplay").innerHTML = infFormat(darkEnergy,false)
  document.getElementById("darkEnergyPerSec").innerHTML = infFormat(darkEnergyPerSec,true)
  document.getElementById("darkEnergyEffect").innerHTML = infFormat(darkEnergyEffect,true)


  // Incrementer section - this comes last because otherwise ressets don't work properly
  exoticmatterPerSec=(XAxisEffect*(XAxis+freeXAxis)+ZAxisEffect*(ZAxis+freeZAxis)+WAxisEffect*(WAxis+freeWAxis)+TAxisEffect*(TAxis+freeTAxis)+tributeBoostOne+tributeBoostSix*(YAxis+freeYAxis)+Enhancer11Effect*ownedEnhancers.OneOne+Enhancer12Effect*ownedEnhancers.OneTwo+Enhancer13Effect*ownedEnhancers.OneThree+Enhancer14Effect*ownedEnhancers.OneFour+10*ownedEnhancers.FourTwo+expandingEnergyEffect)
  *(SAxisEffect**(SAxis+freeSAxis))*1.1**ownedEnhancers.FourOne+Math.log10(offlineSpeedup)
  incrementExoticMatter(exoticmatterPerSec-1.30103);
}, 50);

function ProgressBar() {
  if ((fastestTributeReset > 1e12) && (exoticmatter<25)) {
    progressbarvalue = Math.max(exoticmatter,0)/25
    progressbartooltip = "Progress to Tributes: (Need "+infFormat(25)+" exotic matter)"
  } else if (DarkMatterUnlocked == false) {
    progressbarvalue = Math.max(tributes,0)/27
    progressbartooltip = "Progress to Dark Matter (Need "+infFormat(27)+" tributes)"
  } else if (energyTypesUnlocked == 0) {
    progressbarvalue = Math.max(exoticmatter,0)/2400
    progressbartooltip = "Progress to Energy (Need "+infFormat(2400)+" exotic matter)"
  } else if (energyTypesUnlocked == 1) {
    progressbarvalue = Math.max(exoticmatter,0)/4000
    progressbartooltip = "Progress to Divine Energy (Need "+infFormat(4000)+" exotic matter)"
  } else if (energyTypesUnlocked == 2) {
    progressbarvalue = Math.max(exoticmatter,0)/5950
    progressbartooltip = "Progress to Dark Energy (Need "+infFormat(5950)+" exotic matter)"
  } else {
    progressbarvalue = 1
    progressbartooltip = "All features unlocked!"
  }
  document.getElementById("progress").innerHTML = progressbartooltip
  document.getElementById("progressBar").value = progressbarvalue
}
function toggleNotation() {
  if (notation == "Alemaninc Ordinal") {
    notation = "Double Logarithm"
  } else if (notation == "Double Logarithm") {
    notation = "Engineering"
  } else if (notation == "Engineering") {
    notation = "Infinity"
  } else if (notation == "Infinity") {
    notation = "Logarithm"
  } else if (notation == "Logarithm") {
    notation = "Mixed scientific"
  } else if (notation == "Mixed scientific") {
    notation = "Scientific"
  } else if (notation == "Scientific") {
    notation = "Alemaninc Ordinal"
  } else {
    notation = "Scientific"
  }
}
function save() {
  var save = {
    exoticmatter: exoticmatter,
    exoticmatterPerSec: exoticmatterPerSec,
    exoticmatterThisTributeReset: exoticmatterThisTributeReset,
    exoticmatterThisWormholeReset: exoticmatterThisWormholeReset,
    XAxis: XAxis,
    YAxis: YAxis,
    ZAxis: ZAxis,
    WAxis: WAxis,
    VAxis: VAxis,
    UAxis: UAxis,
    TAxis: TAxis,
    SAxis: SAxis,
    timePlayed: timePlayed,
    HTPshown: HTPshown,
    timeThisTributeReset: timeThisTributeReset,
    fastestTributeReset: fastestTributeReset,
    timeThisWormholeReset: timeThisWormholeReset,
    fastestWormholeReset: fastestWormholeReset,
    tributeResets: tributeResets,
    tributes: tributes,
    notation: notation,
    autosaveIsOn: autosaveIsOn,
    offlineSpeedupLength: offlineSpeedupLength,
    timeLeft: Number(new Date()),
    tributeUpgradeOneBought: tributeUpgradeOne.purchased,
    tributeUpgradeTwoBought: tributeUpgradeTwo.purchased,
    tributeUpgradeThreeBought: tributeUpgradeThree.purchased,
    axisAutobuyerOn: axisAutobuyerOn,
    axisAutobuyerUpgrades: axisAutobuyerUpgrades,
    enhancers: enhancers,
    unspentEnhancers: unspentEnhancers,
    enhancerCost: enhancerCost,
    ownedEnhancers: ownedEnhancers,
    darkmatter: darkmatter,
    darkXAxis: darkXAxis,
    darkYAxis: darkYAxis,
    darkZAxis: darkZAxis,
    darkWAxis: darkWAxis,
    darkVAxis: darkVAxis,
    darkUAxis: darkUAxis,
    darkTAxis: darkTAxis,
    darkSAxis: darkSAxis,
    axioms: axioms,
    energyTypesUnlocked: energyTypesUnlocked,
    expandingEnergy: expandingEnergy,
    divineEnergy: divineEnergy,
    darkEnergy: darkEnergy
  }
  localStorage.setItem("save",JSON.stringify(save)); 
}
function load(type) {
  savecounter++
  if (type=="normal") {
    var savegame = JSON.parse(localStorage.getItem("save"));
  } else if (type=="import") {
    var savegame = JSON.parse(atob(prompt("Copy and paste your save file here:")))
  }
  if ((typeof savegame.exoticmatter !== "undefined") && !Number.isNaN(savegame.exoticmatter)) exoticmatter = savegame.exoticmatter;
  if ((typeof savegame.exoticmatterPerSec !== "undefined") && !Number.isNaN(savegame.exoticmatterPerSec)) exoticmatterPerSec = savegame.exoticmatterPerSec;
  if ((typeof savegame.totalexoticmatter !== "undefined") && !Number.isNaN(savegame.totalexoticmatter)) totalexoticmatter = savegame.totalexoticmatter;
  if ((typeof savegame.exoticmatterThisTributeReset !== "undefined") && !Number.isNaN(savegame.exoticmatterThisTributeReset)) exoticmatterThisTributeReset = savegame.exoticmatterThisTributeReset;
  if ((typeof savegame.exoticmatterThisWormholeReset !== "undefined") && !Number.isNaN(savegame.exoticmatterThisWormholeReset)) exoticmatterThisWormholeReset = savegame.exoticmatterThisWormholeReset;
  if ((typeof savegame.XAxis !== "undefined") && !Number.isNaN(savegame.XAxis)) XAxis = savegame.XAxis;
  if ((typeof savegame.YAxis !== "undefined") && !Number.isNaN(savegame.YAxis)) YAxis = savegame.YAxis;
  if ((typeof savegame.ZAxis !== "undefined") && !Number.isNaN(savegame.ZAxis)) ZAxis = savegame.ZAxis;
  if ((typeof savegame.WAxis !== "undefined") && !Number.isNaN(savegame.WAxis)) WAxis = savegame.WAxis;
  if ((typeof savegame.VAxis !== "undefined") && !Number.isNaN(savegame.VAxis)) VAxis = savegame.VAxis;
  if ((typeof savegame.UAxis !== "undefined") && !Number.isNaN(savegame.UAxis)) UAxis = savegame.UAxis;
  if ((typeof savegame.TAxis !== "undefined") && !Number.isNaN(savegame.TAxis)) TAxis = savegame.TAxis;
  if ((typeof savegame.SAxis !== "undefined") && !Number.isNaN(savegame.SAxis)) SAxis = savegame.SAxis;
  if ((typeof savegame.timePlayed !== "undefined") && !Number.isNaN(savegame.timePlayed)) timePlayed = savegame.timePlayed;
  if ((typeof savegame.HTPshown !== "undefined") && !Number.isNaN(savegame.HTPshown)) HTPshown = savegame.HTPshown;
  if ((typeof savegame.timeThisTributeReset !== "undefined") && !Number.isNaN(savegame.timeThisTributeReset)) timeThisTributeReset = savegame.timeThisTributeReset;
  if ((typeof savegame.fastestTributeReset !== "undefined") && !Number.isNaN(savegame.fastestTributeReset)) fastestTributeReset = savegame.fastestTributeReset;
  if ((typeof savegame.timeThisWormholeReset !== "undefined") && !Number.isNaN(savegame.timeThisWormholeReset)) timeThisWormholeReset = savegame.timeThisWormholeReset;
  if ((typeof savegame.fastestWormholeReset !== "undefined") && !Number.isNaN(savegame.fastestWormholeReset)) fastestWormholeReset = savegame.fastestWormholeReset;
  if ((typeof savegame.tributeResets !== "undefined") && !Number.isNaN(savegame.tributeResets)) tributeResets = savegame.tributeResets;
  if ((typeof savegame.tributes !== "undefined") && !Number.isNaN(savegame.tributes)) tributes = savegame.tributes; 
  if (typeof savegame.notation !== "undefined") notation = savegame.notation;
  if (typeof savegame.autosaveIsOn !== "undefined") autosaveIsOn = savegame.autosaveIsOn;
  if ((typeof savegame.offlineSpeedupLength !== "undefined") && !Number.isNaN(savegame.offlineSpeedupLength)) offlineSpeedupLength = savegame.offlineSpeedupLength
  if ((typeof savegame.offlineSpeedupLength !== "undefined") && !Number.isNaN(savegame.offlineSpeedupLength)) offlineTime = savegame.offlineSpeedupLength
  if ((typeof savegame.timeLeft !== "undefined") && !Number.isNaN(savegame.timeLeft)) baseOfflineSpeedup = 1+(Number(new Date())-savegame.timeLeft)/(offlineSpeedupLength*1000)
  if ((typeof savegame.tributeUpgradeOneBought !=="undefined") && !Number.isNaN(savegame.tributeUpgradeOneBought)) tributeUpgradeOne.purchased = savegame.tributeUpgradeOneBought;
  if ((typeof savegame.tributeUpgradeTwoBought !=="undefined") && !Number.isNaN(savegame.tributeUpgradeTwoBought)) tributeUpgradeTwo.purchased = savegame.tributeUpgradeTwoBought;
  if ((typeof savegame.tributeUpgradeThreeBought !=="undefined") && !Number.isNaN(savegame.tributeUpgradeThreeBought)) tributeUpgradeThree.purchased = savegame.tributeUpgradeThreeBought;
  if ((typeof savegame.axisAutobuyerOn !== "undefined") && !Number.isNaN(savegame.axisAutobuyerOn)) axisAutobuyerOn = savegame.axisAutobuyerOn;
  if ((typeof savegame.axisAutobuyerUpgrades !== "undefined") && !Number.isNaN(savegame.axisAutobuyerUpgrades)) axisAutobuyerUpgrades = savegame.axisAutobuyerUpgrades;
  if ((typeof savegame.enhancers !=="undefined") && !Number.isNaN(savegame.enhancers)) enhancers = savegame.enhancers;
  if ((typeof savegame.unspentEnhancers !=="undefined") && !isNaN(savegame.unspentEnhancers)) unspentEnhancers = savegame.unspentEnhancers;
  if ((typeof savegame.enhancerCost !=="undefined") && !Number.isNaN(savegame.enhancerCost)) enhancerCost = savegame.enhancerCost;
  if (typeof savegame.ownedEnhancers !=="undefined") ownedEnhancers = savegame.ownedEnhancers;
  if ((typeof savegame.darkmatter !== "undefined") && !Number.isNaN(savegame.darkmatter)) darkmatter = savegame.darkmatter;
  if ((typeof savegame.darkXAxis !== "undefined") && !Number.isNaN(savegame.darkXAxis)) darkXAxis = savegame.darkXAxis;
  if ((typeof savegame.darkYAxis !== "undefined") && !Number.isNaN(savegame.darkYAxis)) darkYAxis = savegame.darkYAxis;
  if ((typeof savegame.darkZAxis !== "undefined") && !Number.isNaN(savegame.darkZAxis)) darkZAxis = savegame.darkZAxis;
  if ((typeof savegame.darkWAxis !== "undefined") && !Number.isNaN(savegame.darkWAxis)) darkWAxis = savegame.darkWAxis;
  if ((typeof savegame.darkVAxis !== "undefined") && !Number.isNaN(savegame.darkVAxis)) darkVAxis = savegame.darkVAxis;
  if ((typeof savegame.darkUAxis !== "undefined") && !Number.isNaN(savegame.darkUAxis)) darkUAxis = savegame.darkUAxis;
  if ((typeof savegame.darkTAxis !== "undefined") && !Number.isNaN(savegame.darkTAxis)) darkTAxis = savegame.darkTAxis;
  if ((typeof savegame.darkSAxis !== "undefined") && !Number.isNaN(savegame.darkSAxis)) darkSAxis = savegame.darkSAxis;
  if ((typeof savegame.axioms !== "undefined") && !Number.isNaN(savegame.axioms)) axioms = savegame.axioms;
  if ((typeof savegame.energyTypesUnlocked !== "undefined") && !Number.isNaN(savegame.energyTypesUnlocked)) energyTypesUnlocked = savegame.energyTypesUnlocked;
  if ((typeof savegame.expandingEnergy !== "undefined") && !Number.isNaN(savegame.expandingEnergy)) expandingEnergy = savegame.expandingEnergy;
  if ((typeof savegame.divineEnergy !== "undefined") && !Number.isNaN(savegame.divineEnergy)) divineEnergy = savegame.divineEnergy;
  if ((typeof savegame.darkEnergy !== "undefined") && !Number.isNaN(savegame.darkEnergy)) darkEnergy = savegame.darkEnergy;
}
function exportSave() {
  save()
  navigator.clipboard.writeText(btoa(localStorage.getItem("save")))
  alert("Copied to clipboard")
}
function wipeSave() {
  let numa = Math.floor(50*3**Math.random())
  let numb = Math.floor(50*3**Math.random())
  let answer = numa*numb
  let confirm = prompt("To confirm that you want to wipe your save, answer this question: What is "+numa+" × "+numb+"?")
  if (confirm==answer) {
    exoticmatter = 0;
    totalexoticmatter = 0;
    exoticmatterThisTributeReset = 0;
    exoticmatterThisWormholeReset = 0;
    exoticmatterPerSec = 0;
    XAxis = 0;
    YAxis = 0;
    ZAxis = 0;
    WAxis = 0;
    VAxis = 0;
    UAxis = 0;
    TAxis = 0;
    SAxis = 0;
    XAxisEffect=0
    YAxisEffect=-3
    ZAxisEffect=0
    WAxisEffect=0
    VAxisEffect=0
    UAxisEffect=0
    TAxisEffect=0
    SAxisEffect=0
    axisUnlocked = 0;
    timePlayed = 0;
    HTPshown = 1;
    timeThisTributeReset = 0;
    fastestTributeReset = 9e15;
    timeThisWormholeReset = 0;
    fastestWormholeReset = 9e15;
    tributeResets = 0
    tributes = -100;
    notation = "Mixed scientific"
    autosaveIsOn = "On"
    tributeUpgradeOne.purchased = 0
    tributeUpgradeTwo.purchased = 0
    axisAutobuyerUpgrades = 0
    axisAutobuyerOn = false
    tributeUpgradeThree.purchased = 0
    respecEnhancers()
    enhancers = 0
    unspentEnhancers = 0
    enhancerCost = 3.30103
    Enhancer11Effect=0
    Enhancer12Effect=0
    Enhancer13Effect=0
    Enhancer14Effect=0
    DarkMatterUnlocked = false
    darkmatter = 0
    darkXAxis = 0
    darkYAxis = 0
    darkZAxis = 0
    darkWAxis = 0
    darkVAxis = 0
    darkUAxis = 0
    darkTAxis = 0
    darkSAxis = 0
    axioms = 0
    energyTypesUnlocked = 0
    expandingEnergy = 0
    divineEnergy = 0
    darkEnergy = 0
  } else {
    alert("Incorrect answer, wiping did not proceed.")
  }
}
function toggleOfflineSpeedupLength() {
  if (offlineSpeedupLength==1) {
    offlineSpeedupLength=5
  } else if (offlineSpeedupLength==5) {
    offlineSpeedupLength=10
  } else if (offlineSpeedupLength==10) {
    offlineSpeedupLength=30
  } else if (offlineSpeedupLength==30) {
    offlineSpeedupLength=60
  } else if (offlineSpeedupLength==60) {
    offlineSpeedupLength=300
  } else if (offlineSpeedupLength==300) {
    offlineSpeedupLength=3600
  } else {
    offlineSpeedupLength=1
  }
}
function toggleAutosave() {
  if (autosaveIsOn == "On") {
    autosaveIsOn = "Off"
  } else if (autosaveIsOn =="Off") {
    autosaveIsOn = "On"
  }
}
