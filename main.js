// infOP VI, produced by alemaninc
function infAdd(x,y) {                 // Adds two infNumbers - for example, infAdd(1,0) returns 1.0414 (log(10+1)) 
  if (Math.abs(x-y)>16) {              // If the quotient of x and y is more than 1e+16, the addition is negligible
    return Math.max(x,y)
  } else {
    z = Math.min(x,y)
    return z+Math.log10(10**(x-z)+10**(y-z))
  }
}
function infSubtract(x,y) {            // Subtracts two infNumbers - if y is greater than x 0 is output. For example, infSubtract(1,0) returns 0.9542 (log(10-1))
  if (x-y>16) {                        // If y is less than 1/1e+16 of x, the subtraction is negligible
    return x
  } else if (x==y) {                   // If x and y are equal, 1/1e+100 is output instead of -Infinite.
    return -100
  } else if (y>x) {                    // If a negative value would be infoutput, 0 is infoutput instead as the library can't support negative numbers. However, the game has controls in place to make sure negative values never occur
    return -100
  } else {
    return x+Math.log10(1-10**(y-x))
  }
}
var notation="Mixed scientific"
function infFormat(x,y) {
  if (isNaN(x)) return "NaN"
  if (Math.abs(x)<3) return Math.round((y ? 10**Math.max(0,Math.min(5,2-Math.floor(x))) : 1)*10**x)/(y ? 10**Math.max(0,Math.min(5,2-Math.floor(x))) : 1)
  if (Math.abs(x)<6) return Math.round(10**x).toLocaleString('en-US')
  else if ((x<-99)&&(x>-101)) return 0
  m=(x>0)?"":"1 / "
  x=Math.abs(x)
  if (notation=="Alemaninc Ordinal") {
    infoutput="α<sub>"+(Math.floor(((x<10) ? 10*x : 100*(1+Math.log(x/10)*0.2)**5)-30).toLocaleString('en-US'))+"</sub>"
    return m+infoutput
  } else if (notation=="Double Logarithm") {
    return m+"ee"+Math.log10(x).toFixed(5)
  } else if (notation=="Engineering") {
    function preE_length(z) { // funxction to calculate length of Characters in front of floating point
      z=Math.abs(z)
      return m+(10 ** (z % 3) - ((10 ** (z % 3) % 1)) % 1).toString().length
    }
    var t = Math.log10(Math.abs(x)) // t only in use for (x>1e9)
    return m+((Math.abs(x) < 1e9)
      ? (10 ** (x % 3)).toFixed((preE_length(x) == 3) ? 1 : (preE_length(x) == 2) ? 2 : 3) // dynamic float
      + "e" + (x - (x % 3)).toLocaleString("en-US")
      : "e" + (10 ** (x % 3)).toFixed((preE_length(t) == 3) ? 1 : (preE_length(t) == 2) ? 2 : 3) // dynamic float
      + "e" + (t - (t % 3)).toLocaleString("en-US"));
  } else if (notation=="Infinity") {
    infoutput=Math.log(x)/308.25471555991675
    return m+(((infoutput>1e6)?((10**(x%1)).toFixed(2)+"e"+Math.floor(x).toLocaleString("en-US")):infoutput.toFixed(6))+"∞")
  } else if (notation=="Logarithm") {
    return m+((x<1e9) ? "e"+(x.toFixed((x>100000)?0:2)).toLocaleString('en-US') : "e"+Math.floor(100*10**(x%1))/100+"e"+Math.floor(Math.log10(x)))
  } else if (notation=="Mixed scientific") {
    const endings=["K","M","B","T","Qa","Qt","Sx","Sp","Oc","No"]
    return m+((x<0?"1 / ":"")+((x<33) ? (10**(x%3)).toFixed(2)+" "+endings[Math.floor(x/3)-1]                    // 3.5 = 3.16 K
    : (x<1e9) ? (10**(x%1)).toFixed(2)+"e"+Math.floor(x).toLocaleString("en-US")                                 // 38462.25 = 1.77e38,462
    : (x<1e33) ? "e"+(10**(Math.log10(x)%3)).toFixed(2)+" "+endings[Math.floor(Math.log10(x)/3)-1]               // 1.23e21 = e1.23 Sx
    : "e"+(x/10**Math.floor(Math.log10(x))).toFixed(2)+"e"+Math.floor(Math.log10(x))))                           // 2.34e56 = e2.34e56
  } else if (notation=="Scientific") {
    return m+((x<1e9) ? (10**(x%1)).toFixed(2)+"e"+Math.floor(x).toLocaleString("en-US") : "e"+(x/10**Math.floor(Math.log10(x))).toFixed(2)+"e"+Math.floor(Math.log10(x)))
  } else if (notation=="Tetration") {
    infoutput = 0
    while ((x>0.4342944819)&&(infoutput<5)) {
      x=(Math.log(x*Math.log(10))/Math.log(10))
      infoutput++
    }
    return m+"e ⇈ "+(infoutput+(x*Math.log(10))).toFixed(6)
  } else {
    return "Notation Error!"
  }
}
function normFormat(x) {               // Formats a regular number the same way infNumbers would be formatted
  if (x==0) return 0
  else if ((x>=1e6)||(x<=1e-6)) return infFormat(Math.log10(x))
  else if (x>=1000) return Math.round(x).toLocaleString("en-US")
  else if (Math.abs(x)>=100) return Math.round(x)
  else {
    precision=2+Math.max(0,-Math.floor(Math.log10(x)))
    return Math.round(x*10**precision)/10**precision
  }
}
function twoDigits(x) {                // Formats a one-digit number as two digits. For example, twoDigits(7) returns 07. Used in timeFormat
  return (x<10) ? "0"+Math.floor(x) : Math.floor(x)
}
function timeFormat(x) {               // Formats an amount of seconds as a time. For example, timeFormat(73) returns 1:13 and timeFormat(90123) returns 1 day 1:02:03
  return (x<1) ? Math.floor(x*1000)+" milliseconds" : (x<10) ? Math.floor(x*1000)/1000+" seconds" : (x<60) ? Math.floor(x)+" seconds" : (x<3600) ? Math.floor(x/60)+":"+twoDigits(Math.floor(x%60)) : (x<86400) ? Math.floor(x/3600)+":"+twoDigits(Math.floor(x/60)%60)+":"+twoDigits(Math.floor(x%60)) : (x<1e15) ? Math.floor(x/86400)+" days "+Math.floor(x/3600)%24+":"+twoDigits(Math.floor(x/60)%60)+":"+twoDigits(Math.floor(x%60)) : normFormat(x/31556926)+" years"
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
  if (c=="Infinity") c=1.79e308
  multiplier=(c<Math.exp(1)) ? 1+Math.log(c) : (c<Math.exp(Math.exp(1))) ? 2+Math.log(Math.log(c)) : (c<Math.exp(Math.exp(Math.exp(1)))) ? 3+Math.log(Math.log(Math.log(c))) : 4+Math.log(Math.log(Math.log(Math.log(c))))
  return start*multiplier**(1/power)
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
function ExponentialScaling(value,start,power) {
  return (value<start) ? value : start*Math.exp(((value/start)**power-1)/power)
}
function SuperexpScaling(value,start,power) {
    if (value<start) return value
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
function safeExponent(x,y) {
  return Math.sign(x)*Math.abs(x)**y
}
function choosei(n,k){
    var result = 1;
    for(var i=1; i <= k; i++){
        result *= (n+1-i)/i;
    }
    return result;
}
function normSimplex(x,y) {
  return choosei(x+y-1,y)
}
function infSimplex(x,y) {
  if (x<16) {
    return Math.log10(normSimplex(10**x,y))
  } else {
    infOutput=x*y
    for (i=2;i<=y;i++) infOutput-=Math.log10(i)
    return infOutput
  }
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
function openStardustTab(name) {
  var i;
  var x = document.getElementsByClassName("stardustTab");
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
function openMainTab(name) {
  var i;
  var x = document.getElementsByClassName("mainTab");
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
function toggleGlow(tab,type) {
  if (type) {
    document.getElementById(tab).classList.add("glownotify")
  } else {
    document.getElementById(tab).classList.remove("glownotify")
  }
}
function fix(x) {
  return isNaN(x)?0:x
}





var g = {
  exoticmatter: 0, // InfNumber
  exoticmatterThisStardustReset: 0, // InfNumber
  exoticmatterThisWormholeReset: 0, // InfNumber
  totalexoticmatter: 0, // InfNumber
  exoticmatterPerSec: 0, // InfNumber
  XAxis: 0,
  YAxis: 0,
  ZAxis: 0,
  WAxis: 0,
  VAxis: 0,
  UAxis: 0,
  TAxis: 0,
  SAxis: 0,
  freeXAxis: 0,
  freeYAxis: 0,
  freeZAxis: 0,
  freeWAxis: 0,
  freeVAxis: 0,
  freeUAxis: 0,
  freeTAxis: 0,
  freeSAxis: 0,
  realXAxis: 0,
  realYAxis: 0,
  realZAxis: 0,
  realWAxis: 0,
  realVAxis: 0,
  realUAxis: 0,
  realTAxis: 0,
  realSAxis: 0,
  axisCostDivisor: 0, // InfNumber
  axisCostExponent: 1,
  XAxisCost: 0, // InfNumber
  XAxisEffect: 0,
  YAxisCost: 0, // InfNumber
  YAxisEffect: -3, // InfNumber
  ZAxisCost: 0, // InfNumber
  ZAxisEffect: 0, // InfNumber
  WAxisCost: 0, // InfNumber
  WAxisEffect: 0, // InfNumber
  VAxisCost: 0, // InfNumber
  VAxisEffect: 0, // InfNumber
  UAxisCost: 0, // InfNumber
  UAxisEffect: 0, // InfNumber
  TAxisCost: 0, // InfNumber
  TAxisEffect: 0, // InfNumber
  SAxisCost: 0, // InfNumber
  SAxisEffect: 0,
  axisScalingStart: 8,
  axisSuperscalingStart: 128,
  totalAxis: 0,
  axisUnlocked: 0,
  masteryPower: -100,
  masteryPowerPerSec: -100,
  baseMasteryPowerGain: 0, // InfNumber
  baseMasteryPowerExponent: 0,
  masteryRowsUnlocked: [0,0,0,0,0,0,0,0,0,0],
  activeMasteries: [0,0,0,0,0,0,0,0,0,0],
  Mastery11Effect: 0, // InfNumber
  Mastery12Effect: 0, // InfNumber
  Mastery21Effect: 0, // InfNumber
  Mastery22Effect: 0, // InfNumber
  Mastery31Effect: 0,
  Mastery32Effect: 0,
  Mastery41Effect: 0,
  Mastery42Effect: 0, // InfNumber
  Mastery43Effect: 0,
  Mastery51Effect: 0,
  Mastery52Effect: 0,
  Mastery61Effect: 0,
  Mastery62Effect: 0,
  Mastery63Effect: 0,
  Mastery71Effect: 0,
  Mastery72Effect: 0,
  Mastery81Effect: 0, // InfNumber
  Mastery82Effect: 0, // InfNumber
  Mastery83Effect: 0, // InfNumber
  Mastery84Effect: 0, // InfNumber
  Mastery85Effect: 0, // InfNumber
  Mastery91Effect: 0,
  Mastery92Effect: 0,
  timePlayed: 0,
  truetimePlayed: -100, // InfNumber
  HTPshown: 1,
  tickspeed: 0, // infNumber
  colortheme: "Default",
  timeThisStardustReset: 0,
  truetimeThisStardustReset: -100, // InfNumber
  fastestStardustReset: 9e15,
  timeThisWormholeReset: 0,
  truetimeThisWormholeReset: -100, // InfNUmber
  fastestWormholeReset: 9e15,
  storySnippets: [],
  timeLeft: 0,
  offlineSpeedupLength: 30,
  offlineSpeedupOn: true,
  notation: "Mixed scientific",
  StardustResets: 0,
  stardust: -100, // InfNumber
  StardustMultiplier: 0, // InfNumber
  StardustExponent: 1,
  pendingstardust: 0, // InfNumber
  autosaveIsOn: true,
  StardustBoost1: 0, // InfNumber
  StardustBoost2: 0,
  StardustBoost3: 0,
  StardustBoost4: 0,
  StardustBoost5: 0, // InfNumber
  StardustBoost6: 0, // InfNumber
  StardustBoost7: 0,
  StardustBoost8: 0,
  stardustUpgrades: [0,0,0,0,0],
  axisAutobuyerOn: false,
  axisAutobuyerUpgrades: 0,
  axisAutobuyerInterval: 5,
  axisAutobuyerProgress: 0,
  axisAutobuyerCost: 0, // InfNumber
  stars: 0,
  unspentStars: 0,
  starCost: 3.60205999134, // InfNumber
  starRow: [1,1,2,1,2,3,1,2,3,4,2,3,4,5,3,4,5,6,4,5,6,7,5,6,7,8,6,7,8,9,7,8,9,10,8,9,10,9,10,10], // Which row the next star is in. For those who don't know, Stars have to be bought in a pyramid-like fashion which is laid out in this variable.
  ownedStars: [],
  Star11Effect: 0,
  Star12Effect: 0,
  Star13Effect: 0,
  Star14Effect: 0,
  Star71Effect: 0,
  Star72Effect: 0,
  Star73Effect: 0,
  Star74Effect: 0,
  Row9StarEffect: 0,
  darkmatter: 0, // InfNumber
  darkmatterPerSec: 0, // InfNumber
  darkXAxis: 0,
  darkYAxis: 0,
  darkZAxis: 0,
  darkWAxis: 0,
  darkVAxis: 0,
  darkUAxis: 0,
  darkTAxis: 0,
  darkSAxis: 0,
  freedarkXAxis: 0,
  freedarkYAxis: 0,
  freedarkZAxis: 0,
  freedarkWAxis: 0,
  freedarkVAxis: 0,
  freedarkUAxis: 0,
  freedarkTAxis: 0,
  freedarkSAxis: 0,
  realdarkXAxis: 0,
  realdarkYAxis: 0,
  realdarkZAxis: 0,
  realdarkWAxis: 0,
  realdarkVAxis: 0,
  realdarkUAxis: 0,
  realdarkTAxis: 0,
  realdarkSAxis: 0,
  darkaxisCostDivisor: 0, // InfNumber
  darkaxisCostExponent: 1,
  darkXAxisCost: 0, // InfNumber
  darkXAxisEffect: 0, // InfNumber
  darkYAxisCost: 0, // InfNumber
  darkYAxisEffect: 0, // InfNumber
  darkZAxisCost: 0, // InfNumber
  darkZAxisEffect: 0, // InfNumber
  darkWAxisCost: 0, // InfNumber
  darkWAxisEffect: 0, // InfNumber
  darkVAxisCost: 0, // InfNumber
  darkVAxisEffect: 0, 
  darkUAxisCost: 0, // InfNumber
  darkUAxisEffect: 0, // InfNumber
  darkTAxisCost: 0, // InfNumber
  darkTAxisEffect: 0, // InfNumber
  darkSAxisCost: 0, // InfNumber
  darkSAxisEffect: 0, // InfNumber
  darkaxisScalingStart: 8,
  darkaxisSuperscalingStart: 100,
  totaldarkAxis: 0,
  darkMatterFreeAxis: 1/3,
  darkstars: 0,
  darkstarScalingStart: 48,
  darkstarRequirement: 0,
  darkstarBulk: true,
  energyTypesUnlocked: 0,
  darkEnergy: 0,       // InfNumber
  darkEnergyPerSec: 0, // InfNumber
  darkEnergyEffect: 0, // InfNumber
  stelliferousEnergy: 0,          // InfNumber
  stelliferousEnergyPerSec: 0,    // InfNumber
  stelliferousEnergyEffect: 0,    // InfNumber
  gravitationalEnergy: 0,            // InfNumber
  gravitationalEnergyPerSec: 0,      // InfNumber
  gravitationalEnergyEffect: 0,      // InfNumber
  spatialEnergy: 0,            // InfNumber
  spatialEnergyPerSec: 0,      // InfNumber
  spatialEnergyEffect: 0,      // InfNumber
  neuralEnergy: 0,            // InfNumber
  neuralEnergyPerSec: 0,      // InfNumber
  neuralEnergyEffect: 0,      // InfNumber
  metaEnergy: 0,            // InfNumber
  metaEnergyPerSec: 0,      // InfNumber
  metaEnergyEffect: 0,      // InfNumber
  energySpeedMult: 0, // InfNumber
  energyEffectBoost: 1,
  supernovaUnlocked: false,
  EMSupernova: {
    charges: 1,
    maxCharges: 1,
    power: 1.05,
    upgrade1: 0,
    upgrade2: 0
  },
  KnowledgeSupernova: {
    unlocked: false,
    charges: 1,
    maxCharges: 1,
    power: 1.05,
    upgrade1: 0,
    upgrade2: 0
  }
}
var screen = 1    // 1: game      2: story
var axisCodes = ["X","Y","Z","W","V","U","T","S"]
var savecounter = 0 // will prevent save before load
var oldframetime = new Date().getTime()
var newframetime = new Date().getTime()
const masteryBoosts = {            // This contains the effect multipliers for individual Masteries and is updated automatically by the game loop
  b11: 1,
  b12: 1,
  b21: 1,
  b22: 1,
  b31: 1,
  b32: 1,
  b41: 1,
  b42: 1,
  b43: 1,
  b51: 1,
  b52: 1,
  b61: 1,
  b62: 1,
  b63: 1,
  b71: 1,
  b72: 1,
  b81: 1,
  b82: 1,
  b83: 1,
  b84: 1,
  b85: 1,
  b91: 1,
  b92: 1
}
var stardustExoticMatterReq = 22 // InfNumber
var stardustExoticMatterReqText = "";
var progressbarvalue = 0
var progressbartooltip = ""
var deltatime = 0
var baseOfflineSpeedup = 1
var offlineSpeedup = 1
var offlineTime = 0
var glowtabs = [[0,0,0],[0,0,0]]
var stardustUpgrade1Cost = [6.3010299957,10.54406804435,14,20,1e300] // 2 M, 35 B, 100 T, 100 Qt
var stardustUpgrade2Tooltip = ["Unlock axis autobuyer","Keep 10% of X Axis on reset","Keep 10% of Y Axis on reset","Keep 10% of Z Axis on reset","Keep 10% of W Axis on reset","Keep 10% of V Axis on reset","Keep 10% of U Axis on reset","Keep 10% of T Axis on reset","Keep 10% of S Axis on reset","Maxed!"]
var stardustUpgrade2Cost = [1.6989700044,2,4,6,8,12,16,24,100] // 50, 100, 10 K, 1 M, 100 M, 1 T, 10 Qa, 1 Sp, 1e100
var stardustUpgrade3Cost = [9.6989700043,15,22,70,115,308.25471556,1e300] // 5 B, 1 Qa, 10 Sx, 1e70, 1e115, 1.8e308
var stardustUpgrade4Cost = [1.8750612634,8,16,60,115,1e300] // 75, 100 M, 10 Qa, 1e60, 1e115
var stardustUpgrade5Cost = [11.6989700043,55,90,200,250,345.3010299957,375,1e300] // 500 B, 1e55, 1e90, 1e200, 1e250, 2e345, 1e375
var stardustUpgrade5Tooltip = ["Unlock Dark Matter","Unlock Energy","Unlock Stelliferous Energy","Unlock Gravitational Energy","Unlock Spatial Energy","Unlock Neural Energy","Unlock Meta Energy","Maxed!"]
var SupernovaCosts = [[0,0]]

function incrementExoticMatter(x) {
  if (isNaN(x)) x=-100
  g.exoticmatter = infAdd(g.exoticmatter,x)
  document.getElementById("exoticmatter").innerHTML = infFormat(g.exoticmatter,false);            // Replaces the green 0 with the amount of exotic matter the player has
  document.getElementById("exoticmatterPerSec").innerHTML = infFormat(g.exoticmatterPerSec,true);
  g.totalexoticmatter = infAdd(g.totalexoticmatter,x)
  document.getElementById("totalExoticMatter").innerHTML = infFormat(g.totalexoticmatter,false);
  g.exoticmatterThisStardustReset = infAdd(g.exoticmatterThisStardustReset,x)
  document.getElementById("exoticMatterThisStardustReset").innerHTML = infFormat(g.exoticmatterThisStardustReset,false);
  g.exoticmatterThisWormholeReset = infAdd(g.exoticmatterThisWormholeReset,x)
  document.getElementById("exoticMatterThisWormholeReset").innerHTML = infFormat(g.exoticmatterThisWormholeReset,false);
}
function infIncrement(res,x) {
  g[res]=infAdd(g[res],x)
}
function infDeduct(res,x) {
  g[res]=infSubtract(g[res],x)
}
function openStory(x) {
  let snippets = {
    'Stardust': "<p>The universe has collapsed due to negative mass, yielding "+infFormat(g.stardust,false)+" atoms of <span class='stardustlayertext'>Stardust</span>. This powerful resource will allow your exotic matter to increase faster than before - however, its creation has consumed all of your exotic matter and Stardust.</p><p>Due to radioactive decay, all your Stardust is destroyed each time you create more. As a result, you need more exotic matter to gain Stardust each time.</p><p><b>Note that Masteries persist on all resets.</b></p>",
    'Dark Matter': "<p>You have just condensed 500 billion Stardust atoms into a <span class='darkmattertext'>particle with positive mass</span>.</p><p>It seems useless at first glance, but like your sprawling galaxies of fundamentally inert exotic matter, it can probably be formed into an Axis.</p>",
    'Energy': "<p>Well, you have a universe<sup>"+Math.floor(g.totalexoticmatter/80)+"</sup> filled with exotic matter. But, you realise that all those particles have virtually no <span class='energytext'>Energy</span>!</p><p>The laws of physics in your omniverse allow for energy to grow exponentially - unfortunately, you feel that you'll need a <i>lot</i> of it before you get a noteworthy outcome.",
    'Supernova': "<p>By harnessing the power of energy, you've managed to accumulate ludicrous amounts of stardust - a universe<sup>"+Math.floor(g.stardust/80)+"</sup> of it to be precise.</p><p>And yet, for some reason, you are desperate for more.</p><p>You have spent many minutes searching for a new, powerful source of energy and matter and you found it. The largest outbursts of matter are created by <span style='text-shadow:0 0 5px #fff,0 0 10px #fff,0 0 15px #fff,0 0 20px #fff,0 0 25px #fff,0 0 30px #fff,0 0 40px #fff,0 0 50px #fff,0 0 60px #fff,0 0 80px #fff,0 0 100px #fff,0 0 120px #fff,0 0 160px #fff,0 0 200px #fff,0 0 240px #fff,0 0 300px #fff,0 0 400px #fff'>supernovas</span> - massive, galaxy-shaking explosions created by a dying star on its last day.</p><p>However, due to the sheer quantities of energy needed to trigger a Supernova, they are inherently unsustainable - you have no hope of benefitting from their power if you squander them willy-nilly.</p>"
  }
  if (snippets[x]!==undefined) document.getElementById("storyTitle").innerHTML = x
  if (snippets[x]!==undefined) document.getElementById("storyText").innerHTML = snippets[x]
  if ((snippets[x]!==undefined)&&!(g.storySnippets.includes(x))) g.storySnippets.push(x)
  screen = 2
}
function buyAxis(x) {
  if ((g.exoticmatter>g[x+"AxisCost"])&&(g.axisUnlocked>axisCodes.indexOf(x))) {
    infDeduct("exoticmatter",g[x+"AxisCost"])
    g[x+"Axis"]++
  }
}

function buyMaxAxis() {
  for (i=0; i<8; i++) {
    while ((g.exoticmatter>g[axisCodes[i]+"AxisCost"])&&(g.axisUnlocked>i)) {
      buyAxis(axisCodes[i])
      updateAxisCosts()
    }
  }
}
function updateAxisCosts() {
  g.XAxisCost = (0.6989700043+0.77815125038*normLinearScaling(normSemiexpScaling(g.XAxis,g.axisSuperscalingStart,1),g.axisScalingStart,1)-g.StardustBoost5*g.XAxis-g.axisCostDivisor)*g.axisCostExponent
  g.YAxisCost = (2+0.113623*g.YAxis+0.062469*normLinearScaling(normSemiexpScaling(g.YAxis,g.axisSuperscalingStart,1),g.axisScalingStart,1)**2-g.axisCostDivisor)*g.axisCostExponent
  g.ZAxisCost = (6+normLinearScaling(normSemiexpScaling(g.ZAxis,g.axisSuperscalingStart,1),g.axisScalingStart,1)**1.379654224-g.axisCostDivisor)*g.axisCostExponent
  g.WAxisCost = (7.57397000434+(normLinearScaling(normSemiexpScaling(g.WAxis,g.axisSuperscalingStart,1),g.axisScalingStart,1)+0.5)**2/2-g.axisCostDivisor)*g.axisCostExponent
  g.VAxisCost = (20+normLinearScaling(normSemiexpScaling(g.VAxis,g.axisSuperscalingStart,1),g.axisScalingStart,1)-g.axisCostDivisor)*g.axisCostExponent
  g.UAxisCost = (100+normLinearScaling(normSemiexpScaling(g.UAxis,g.axisSuperscalingStart,1),g.axisScalingStart,1)**1.5-g.axisCostDivisor)*g.axisCostExponent
  g.TAxisCost = (160+10*normLinearScaling(normSemiexpScaling(g.TAxis,g.axisSuperscalingStart,1),g.axisScalingStart,1)-g.axisCostDivisor)*g.axisCostExponent
  g.SAxisCost = (308.2547155599167*1.25**normLinearScaling(normSemiexpScaling(g.SAxis,g.axisSuperscalingStart,1),g.axisScalingStart,1)-g.axisCostDivisor)*g.axisCostExponent
}
function MasteryE(x) {
  return ((g.activeMasteries[Math.floor(x/10)-1]==(x%10))||(g.activeMasteries[Math.floor(x/10)-1]==9))?1:0        // A value of 9 signifies that the row is "mastered" and all of its Masteries are active simultaneously. No row can have more than 8 Masteries for this reason.
}
function toggleMastery(x) {
  if (!(x==g.activeMasteries[Math.floor(x/10)-1])) {
    if ((g.activeMasteries[Math.floor(x/10)-1]!==0)&&(g.activeMasteries[Math.floor(x/10)-1]!==(x%10)&&(g.activeMasteries[Math.floor(x/10)-1]!==9))) {
      g.baseMasteryPowerGain=0
      g.masteryPowerPerSec=-100
      g.masteryPower=0
    }
    g.activeMasteries[Math.floor(x/10)-1]=x%10
  }
}
function updateMasteryBoosts() {
  for (i=0;i<Object.keys(masteryBoosts).length;i++) {
    x=Object.keys(masteryBoosts)[i]
    masteryBoosts[x]=1
    if ((["b11","b21","b31"].includes(x))&&MasteryE(41)) masteryBoosts[x]*=g.Mastery41Effect
    if ((["b12","b22","b32"].includes(x))&&MasteryE(43)) masteryBoosts[x]*=g.Mastery43Effect
    if ((["b11","b12"].includes(x))&&MasteryE(52)) masteryBoosts[x]*=g.Mastery52Effect
    if ((["b81","b82","b83","b84","b85"].includes(x))&&MasteryE(91)) masteryBoosts[x]*=g.Mastery91Effect
    if ((["b81","b82","b83","b84","b85"].includes(x))&&MasteryE(92)) masteryBoosts[x]*=g.Mastery92Effect
    masteryBoosts[x]=fix(masteryBoosts[x])
  }
}
function updateStat(x) {
  if (x==1) {
    document.getElementById("StatBreakdown1XAxis").innerHTML = "× "+infFormat(g.XAxisEffect*g.realXAxis,true)+"<span class='small'> ("+infFormat(g.XAxisEffect,true)+" ^ "+normFormat(g.realXAxis)+")</span>"
    output=g.XAxisEffect*g.realXAxis
    document.getElementById("StatBreakdown1XAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RXAxis",((g.realXAxis>0)&&(g.XAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown1ZAxis").innerHTML = "× "+infFormat(g.ZAxisEffect*g.realZAxis,true)+"<span class='small'> ("+infFormat(g.ZAxisEffect,true)+" ^ "+normFormat(g.realZAxis)+")</span>"
    output+=g.ZAxisEffect*g.realZAxis
    document.getElementById("StatBreakdown1ZAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RZAxis",((g.realZAxis>0)&&(g.ZAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown1WAxis").innerHTML = "× "+infFormat(g.WAxisEffect*g.realWAxis,true)+"<span class='small'> ("+infFormat(g.WAxisEffect,true)+" ^ "+normFormat(g.realWAxis)+")</span>"
    output+=g.WAxisEffect*g.realWAxis
    document.getElementById("StatBreakdown1WAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RWAxis",((g.realWAxis>0)&&(g.WAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown1TAxis").innerHTML = "× "+infFormat(g.TAxisEffect*g.realTAxis,true)+"<span class='small'> ("+infFormat(g.TAxisEffect,true)+" ^ "+normFormat(g.realTAxis)+")</span>"
    output+=g.TAxisEffect*g.realTAxis
    document.getElementById("StatBreakdown1TAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RTAxis",((g.realTAxis>0)&&(g.TAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown1Mastery11").innerHTML = "× "+infFormat((MasteryE(11))?g.Mastery11Effect:0,true)
    output+=g.Mastery11Effect*MasteryE(11)
    document.getElementById("StatBreakdown1Mastery11T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RMastery11",MasteryE(11)?"show":"hide")
    document.getElementById("StatBreakdown1StardustBoost1").innerHTML = "× "+infFormat(g.StardustBoost1,true)
    output+=g.StardustBoost1
    document.getElementById("StatBreakdown1StardustBoost1T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RStardustBoost1",(g.StardustBoost1!=0)?"show":"hide")
    document.getElementById("StatBreakdown1Star11").innerHTML = "× "+infFormat(g.Star11Effect*StarE(11),true)
    output+=g.Star11Effect*StarE(11)
    document.getElementById("StatBreakdown1Star11T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RStar11",StarE(11)?"show":"hide")
    document.getElementById("StatBreakdown1Star12").innerHTML = "× "+infFormat(g.Star12Effect*StarE(12),true)
    output+=g.Star12Effect*StarE(12)
    document.getElementById("StatBreakdown1Star12T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RStar12",StarE(12)?"show":"hide")
    document.getElementById("StatBreakdown1Star13").innerHTML = "× "+infFormat(g.Star13Effect*StarE(13),true)
    output+=g.Star13Effect*StarE(13)
    document.getElementById("StatBreakdown1Star13T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RStar13",StarE(13)?"show":"hide")
    document.getElementById("StatBreakdown1Star14").innerHTML = "× "+infFormat(g.Star14Effect*StarE(14),true)
    output+=g.Star14Effect*StarE(14)
    document.getElementById("StatBreakdown1Star14T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RStar14",StarE(14)?"show":"hide")
    document.getElementById("StatBreakdown1Star42").innerHTML = "× "+infFormat(50*StarE(42),true)
    output+=50*StarE(42)
    document.getElementById("StatBreakdown1Star42T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RStar42",StarE(42)?"show":"hide")
    document.getElementById("StatBreakdown1SAxis").innerHTML = "^ "+normFormat(g.SAxisEffect*g.realSAxis,true)+"<span class='small'> ("+normFormat(g.SAxisEffect,true)+" ^ "+normFormat(g.realSAxis)+")</span>"
    output*=g.SAxisEffect**(g.realSAxis)
    document.getElementById("StatBreakdown1SAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RSAxis",((g.realSAxis>0)&&(g.SAxisEffect!=1))?"show":"hide")
    document.getElementById("StatBreakdown1Star41").innerHTML = "^ "+(StarE(41)==1?1.1:1)
    output*=((StarE(41)==1)?1.1:1)
    document.getElementById("StatBreakdown1Star41T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RStar41",(StarE(41)==1)?"show":"hide")
    document.getElementById("StatBreakdown1DarkEnergy").innerHTML = "^ "+normFormat(g.darkEnergyEffect)
    output*=g.darkEnergyEffect
    document.getElementById("StatBreakdown1DarkEnergyT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RDarkEnergy",(g.darkEnergyEffect==1)?"hide":"show")
    document.getElementById("StatBreakdown1OfflineSpeedup").innerHTML = "× "+normFormat(offlineSpeedup)
    output+=Math.log10(offlineSpeedup)
    document.getElementById("StatBreakdown1OfflineSpeedupT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1ROfflineSpeedup",(offlineSpeedup>1)?"show":"hide")
    document.getElementById("StatBreakdown1Tickspeed").innerHTML = "× "+infFormat(g.tickspeed,true)
    output+=fix(g.tickspeed)
    document.getElementById("StatBreakdown1TickspeedT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown1RTickspeed",(g.tickspeed!==0)?"show":"hide")
    g.exoticmatterPerSec=output
  } else if (x==2) {
    document.getElementById("StatBreakdown2BaseGain").innerHTML = (g.exoticmatter<21)?0:"("+infFormat(g.exoticmatter,false)+" / "+infFormat(21)+") dilate 0.5",false
    output=(g.exoticmatter<21)?-100:Math.max(0,(g.exoticmatter-21))**0.5
    document.getElementById("StatBreakdown2BaseGainT").innerHTML = infFormat(output,false)
    nextvl=0
    document.getElementById("StatBreakdown2Mastery42").innerHTML = "× "+infFormat(g.Mastery42Effect*MasteryE(42),true)
    output+=g.Mastery42Effect*MasteryE(42)
    nextvl+=g.Mastery42Effect*MasteryE(42)
    document.getElementById("StatBreakdown2Mastery42T").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2RMastery42",MasteryE(42)?"show":"hide")
    document.getElementById("StatBreakdown2UAxis").innerHTML = "× "+infFormat(g.UAxisEffect*g.realUAxis,true)+"<span class='small'> ("+infFormat(g.UAxisEffect,true)+" ^ "+normFormat(g.realUAxis)+")</span>"
    output+=g.UAxisEffect*g.realUAxis
    nextvl+=g.UAxisEffect*(g.realUAxis)
    document.getElementById("StatBreakdown2UAxisT").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2RUAxis",((g.realUAxis>0)&&(g.UAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown2StardustBoost4").innerHTML = "× "+infFormat(g.masteryPower*g.StardustBoost4,true)+"<span class='small'> ("+infFormat(g.masteryPower,true)+" ^ "+(g.StardustBoost4>10?normFormat(g.StardustBoost4):g.StardustBoost4.toFixed(4))+")</span>"
    output+=g.masteryPower*g.StardustBoost4
    nextvl+=g.masteryPower*g.StardustBoost4
    document.getElementById("StatBreakdown2StardustBoost4T").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2RStardustBoost4",(g.stardustUpgrades[2]>1)?"show":"hide")
    document.getElementById("StatBreakdown2Star44").innerHTML = "× "+infFormat(5*StarE(44),true)
    output+=5*StarE(44)
    nextvl+=5*StarE(44)
    document.getElementById("StatBreakdown2Star44T").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2RStar44",StarE(44)?"show":"hide")
    g.StardustMultiplier=nextvl
    nextvl=1
    document.getElementById("StatBreakdown2Star43").innerHTML = "^ "+(StarE(43)?1.1:1)
    output*=StarE(43)?1.1:1
    nextvl*=StarE(43)?1.1:1
    document.getElementById("StatBreakdown2Star43T").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2RStar43",StarE(43)?"show":"hide")
    document.getElementById("StatBreakdown2StelliferousEnergy").innerHTML = "^ "+normFormat(g.stelliferousEnergyEffect)
    output*=g.stelliferousEnergyEffect
    nextvl*=g.stelliferousEnergyEffect
    document.getElementById("StatBreakdown2StelliferousEnergyT").innerHTML = infFormat(output,false)
    toggleTableRow("StatBreakdown2RStelliferousEnergy",(g.stelliferousEnergyEffect==1)?"hide":"show")
    g.StardustExponent=nextvl
    g.pendingstardust=output
    document.getElementById("StatBreakdown2UnspentStardust").innerHTML = "- "+infFormat(g.stardust,false)
    output=infSubtract(output,g.stardust)
    document.getElementById("StatBreakdown2UnspentStardustT").innerHTML = infFormat(output,false)
    document.getElementById("SSBBStardust").style = g.storySnippets.includes("Stardust")?"display:inline-block":"display:none"
  } else if (x==3) {
    document.getElementById("StatBreakdown3BaseGain").innerHTML = "((10 + "+infFormat(g.stardust,true)+" / "+infFormat(12)+") dilate 0.5 / 10)"+((g.darkstars>0)?("^ "+normFormat(1+g.darkstars/20)):"")
    output=(infAdd(g.stardust-12,1)**0.5-1)*(1+0.05*g.darkstars)
    document.getElementById("StatBreakdown3BaseGainT").innerHTML = infFormat(output,true)
    document.getElementById("baseDarkMatterGain").innerHTML = infFormat(output,true)
    document.getElementById("StatBreakdown3DarkXAxis").innerHTML = "× "+infFormat(g.darkXAxisEffect*g.realdarkXAxis,true)+"<span class='small'> ("+infFormat(g.darkXAxisEffect,true)+" ^ "+normFormat(g.realdarkXAxis)+")</span>"
    output+=g.darkXAxisEffect*g.realdarkXAxis
    document.getElementById("StatBreakdown3DarkXAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkXAxis",((g.realdarkXAxis>0)&&(g.darkXAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown3DarkZAxis").innerHTML = "× "+infFormat(g.darkZAxisEffect*g.realdarkZAxis,true)+"<span class='small'> ("+infFormat(g.darkZAxisEffect,true)+" ^ "+normFormat(g.realdarkZAxis)+")</span>"
    output+=g.darkZAxisEffect*g.realdarkZAxis
    document.getElementById("StatBreakdown3DarkZAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkZAxis",((g.realdarkZAxis>0)&&(g.darkZAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown3DarkUAxis").innerHTML = "× "+infFormat(g.darkUAxisEffect*g.realdarkUAxis*g.totaldarkAxis,true)+"<span class='small'> ("+infFormat(g.darkUAxisEffect,true)+" ^ ("+normFormat(g.realdarkUAxis)+" × "+normFormat(g.totaldarkAxis)+"))</span>"
    output+=g.darkUAxisEffect*g.realdarkUAxis*g.totaldarkAxis
    document.getElementById("StatBreakdown3DarkUAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkUAxis",((g.realdarkUAxis>0)&&(g.darkUAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown3DarkTAxis").innerHTML = "× "+infFormat(g.darkTAxisEffect*g.realdarkTAxis,true)+"<span class='small'> ("+infFormat(g.darkTAxisEffect,true)+" ^ "+normFormat(g.realdarkTAxis)+")</span>"
    output+=g.darkTAxisEffect*g.realdarkTAxis
    document.getElementById("StatBreakdown3DarkTAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkTAxis",((g.realdarkTAxis>0)&&(g.darkTAxisEffect!=0))?"show":"hide")
    document.getElementById("StatBreakdown3DarkSAxis").innerHTML = "^ "+g.darkSAxisEffect.toFixed(4)+" ^ "+normFormat(g.realdarkSAxis)
    output*=g.darkSAxisEffect**g.realdarkSAxis
    document.getElementById("StatBreakdown3DarkSAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RDarkSAxis",((g.realdarkSAxis>0)&&(g.darkSAxisEffect!=1))?"show":"hide")
    document.getElementById("StatBreakdown3GravitationalEnergy").innerHTML = "^ "+normFormat(g.gravitationalEnergyEffect)
    output*=g.gravitationalEnergyEffect
    document.getElementById("StatBreakdown3GravitationalEnergyT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RGravitationalEnergy",(g.gravitationalEnergyEffect==1)?"hide":"show")
    document.getElementById("StatBreakdown3OfflineSpeedup").innerHTML = "× "+normFormat(offlineSpeedup)
    output+=Math.log10(offlineSpeedup)
    document.getElementById("StatBreakdown3OfflineSpeedupT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3ROfflineSpeedup",(offlineSpeedup>1)?"show":"hide")
    document.getElementById("StatBreakdown3Tickspeed").innerHTML = "× "+infFormat(g.tickspeed,true)
    output+=g.tickspeed
    document.getElementById("StatBreakdown3TickspeedT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown3RTickspeed",(g.tickspeed!==0)?"show":"hide")
    g.darkmatterPerSec=output
    document.getElementById("SSBBDarkMatter").style = g.storySnippets.includes("Dark Matter")?"display:inline-block":"display:none"
  } else if (x==4) {
    // Power table
    document.getElementById("StatBreakdown4BaseGain").innerHTML = infFormat(g.baseMasteryPowerGain,true)+" ^ "+((g.baseMasteryPowerExponent>100)?normFormat(g.baseMasteryPowerExponent):Math.floor(g.baseMasteryPowerExponent*1e4)/1e4)
    output=g.baseMasteryPowerGain*g.baseMasteryPowerExponent
    document.getElementById("StatBreakdown4BaseGainT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4RBaseGain",((g.baseMasteryPowerGain>0)&&(g.baseMasteryPowerExponent>0))?"show":"hide")
    document.getElementById("StatBreakdown4DarkWAxis").innerHTML = "× "+infFormat(g.darkWAxisEffect*g.realdarkWAxis,true)+"<span class='small'> ("+infFormat(g.darkWAxisEffect,true)+" ^ "+normFormat(g.realdarkWAxis)+")</span>"
    output+=g.darkWAxisEffect*g.realdarkWAxis
    document.getElementById("StatBreakdown4DarkWAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4RDarkWAxis",((g.darkWAxisEffect!==0)&&(g.darkWAxis>0))?"show":"hide")
    document.getElementById("StatBreakdown4StardustBoost7").innerHTML = "× "+infFormat(g.StardustBoost7*(10**LogarithmicSoftcap(g.truetimeThisStardustReset/2,3,4)))+"<span class='small'>"+infFormat(g.StardustBoost7,true)+" ^ "+normFormat(10**LogarithmicSoftcap(g.truetimeThisStardustReset/2,3,4))+")</span>"
    output+=g.StardustBoost7*(10**LogarithmicSoftcap(g.truetimeThisStardustReset/2,3,4))
    document.getElementById("StatBreakdown4StardustBoost7T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4RStardustBoost7",(g.StardustBoost7>0)?"show":"hide")
    document.getElementById("StatBreakdown4Mastery81").innerHTML = "× "+infFormat(g.Mastery81Effect,true)
    output+=g.Mastery81Effect*MasteryE(81)
    document.getElementById("StatBreakdown4Mastery81T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4RMastery81",MasteryE(81)?"show":"hide")
    document.getElementById("StatBreakdown4Mastery82").innerHTML = "× "+infFormat(g.Mastery82Effect,true)
    output+=g.Mastery82Effect*MasteryE(82)
    document.getElementById("StatBreakdown4Mastery82T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4RMastery82",MasteryE(82)?"show":"hide")
    document.getElementById("StatBreakdown4Mastery83").innerHTML = "× "+infFormat(g.Mastery83Effect,true)
    output+=g.Mastery83Effect*MasteryE(83)
    document.getElementById("StatBreakdown4Mastery83T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4RMastery83",MasteryE(83)?"show":"hide")
    document.getElementById("StatBreakdown4Mastery84").innerHTML = "× "+infFormat(g.Mastery84Effect,true)
    output+=g.Mastery84Effect*MasteryE(84)
    document.getElementById("StatBreakdown4Mastery84T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4RMastery84",MasteryE(84)?"show":"hide")
    document.getElementById("StatBreakdown4NeuralEnergy").innerHTML = "^ "+normFormat(g.neuralEnergyEffect)
    output*=g.neuralEnergyEffect
    document.getElementById("StatBreakdown4NeuralEnergyT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4RNeuralEnergy",(g.neuralEnergyEffect==1)?"hide":"show")
    document.getElementById("StatBreakdown4OfflineSpeedup").innerHTML = "× "+normFormat(offlineSpeedup)
    output+=Math.log10(offlineSpeedup)
    document.getElementById("StatBreakdown4OfflineSpeedupT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4ROfflineSpeedup",(offlineSpeedup>1)?"show":"hide")
    document.getElementById("StatBreakdown4Tickspeed").innerHTML = "× "+infFormat(g.tickspeed,true)
    output+=g.tickspeed
    document.getElementById("StatBreakdown4TickspeedT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown4RTickspeed",(g.tickspeed!==0)?"show":"hide")
    g.masteryPowerPerSec=output
    // Exponent table
    document.getElementById("StatBreakdown4.1Base").innerHTML = "(log(log(10 + "+infFormat(g.exoticmatter,false)+" ^ 0.1)) + 1) ^ 1.2"
    output=(Math.log10(infAdd(g.exoticmatter/10,1))+1)**1.2
    document.getElementById("StatBreakdown4.1BaseT").innerHTML = normFormat(output,true)
    document.getElementById("StatBreakdown4.1Mastery85").innerHTML = "+ "+normFormat(g.Mastery85Effect)
    output+=g.Mastery85Effect*MasteryE(85)
    document.getElementById("StatBreakdown4.1Mastery85T").innerHTML = normFormat(output,true)
    toggleTableRow("StatBreakdown4.1RMastery85",MasteryE(85)?"show":"hide")
    g.baseMasteryPowerExponent=(Math.log10(infAdd(g.exoticmatter/10,1))+1)**1.2+g.Mastery85Effect*MasteryE(85)
    document.getElementById("SSBBMasteryPower").style = (g.masteryRowsUnlocked[0]==1)?"display:inline-block":"display:none"
  } else if (x==5) {
    // X table
    document.getElementById("StatBreakdown5XYAxis").innerHTML = "+ "+infFormat(infAdd(0.30102999566,g.YAxisEffect+Math.log10(1e-100+g.realYAxis)),true)+"<span class='small'> ("+infFormat(g.YAxisEffect,true)+" × "+normFormat(g.realYAxis)+")</span>"
    output=infAdd(0.30102999566,g.YAxisEffect+Math.log10(1e-100+g.realYAxis))
    document.getElementById("StatBreakdown5XYAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown5XRYAxis",(g.YAxis>0)?"show":"hide")
    document.getElementById("StatBreakdown5XMastery21").innerHTML = "× "+infFormat(g.Mastery21Effect*MasteryE(21),true)
    output+=g.Mastery21Effect*MasteryE(21)
    document.getElementById("StatBreakdown5XMastery21T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown5XRMastery21",MasteryE(21)?"show":"hide")
    g.XAxisEffect=output
    // Y table
    output=-1
    document.getElementById("StatBreakdown5YStardustBoost2").innerHTML = "× "+infFormat(g.StardustBoost2,true)
    output+=g.StardustBoost2
    document.getElementById("StatBreakdown5YStardustBoost2T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown5YRStardustBoost2",(g.StardustBoost2>0)?"show":"hide")
    document.getElementById("StatBreakdown5YMastery22").innerHTML = "× "+infFormat(g.Mastery22Effect*MasteryE(22),true)
    output+=g.Mastery22Effect*MasteryE(22)
    document.getElementById("StatBreakdown5YMastery22T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown5YRMastery22",MasteryE(22)?"show":"hide")
    g.YAxisEffect=output
    document.getElementById("SSB5YTable").style = (g.axisUnlocked>=2)?"display:inline-block":"display:none"
    // Z table
    output=(Math.log10(Math.log10(infAdd(fix(g.exoticmatter),1))+1)+1)**(Math.log10(Math.log10(infAdd(fix(g.exoticmatter),1))+1)+1)**1.5-1
    document.getElementById("StatBreakdown5ZBaseEffect").innerHTML = infFormat(output,true)
    document.getElementById("StatBreakdown5ZBaseEffectT").innerHTML = infFormat(output,true)
    g.ZAxisEffect=output
    document.getElementById("SSB5ZTable").style = (g.axisUnlocked>=3)?"display:inline-block":"display:none"
    // W table
    output=Math.log10(infAdd(2,g.truetimeThisStardustReset*0.67))
    document.getElementById("StatBreakdown5WBaseEffect").innerHTML = infFormat(output,true)
    document.getElementById("StatBreakdown5WBaseEffectT").innerHTML = infFormat(output,true)
    document.getElementById("StatBreakdown5WStardustBoost3").innerHTML = "^ "+normFormat(1+g.StardustBoost3/100)
    output*=1+g.StardustBoost3/100
    document.getElementById("StatBreakdown5WStardustBoost3T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown5WRStardustBoost3",(g.StardustBoost3>0)?"show":"hide")
    g.WAxisEffect=output
    document.getElementById("SSB5WTable").style = (g.axisUnlocked>=4)?"display:inline-block":"display:none"
    // V table
    output=Math.log10(3)
    document.getElementById("StatBreakdown5VStardustBoost8").innerHTML = "^ "+normFormat(g.StardustBoost8)
    output*=g.StardustBoost8
    document.getElementById("StatBreakdown5VStardustBoost8T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown5VRStardustBoost8",(g.StardustBoost8>1)?"show":"hide")
    document.getElementById("StatBreakdown5VStar82").innerHTML = " ^ 5"
    output*=StarE(82)?5:1
    document.getElementById("StatBreakdown5VStar82T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown5VRStar82",StarE(82)?"show":"hide")
    document.getElementById("StatBreakdown5VDarkVAxis").innerHTML = " ^ (1 + "+normFormat(g.realdarkVAxis)+" × "+(g.darkVAxisEffect.toFixed(4))+")"
    output*=1+g.realdarkVAxis*g.darkVAxisEffect
    document.getElementById("StatBreakdown5VDarkVAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown5VRDarkVAxis",(g.darkVAxis>0)?"show":"hide")
    g.VAxisEffect=output
    document.getElementById("SSB5VTable").style = (g.axisUnlocked>=5)?"display:inline-block":"display:none"
    // U table
    output=Math.log10(infAdd(g.stardust,10))**2/10
    document.getElementById("StatBreakdown5UBaseEffect").innerHTML = infFormat(output,true)
    document.getElementById("StatBreakdown5UBaseEffectT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown5URBaseEffect",(g.UAxis>0)?"show":"hide")
    g.UAxisEffect=output
    document.getElementById("SSB5UTable").style = (g.axisUnlocked>=6)?"display:inline-block":"display:none"
    // T table
    output=Math.log10(g.totalAxis+1)**(Math.log10(g.totalAxis+1))/2
    document.getElementById("StatBreakdown5TBaseEffect").innerHTML = "10 ^ (log("+normFormat(g.totalAxis)+" + 1) ^ log("+normFormat(g.totalAxis)+" + 1) / 2)"
    document.getElementById("StatBreakdown5TBaseEffectT").innerHTML = infFormat(output,true)
    g.TAxisEffect=output
    document.getElementById("SSB5TTable").style = (g.axisUnlocked>=7)?"display:inline-block":"display:none"
    // S table
    document.getElementById("SSB5STable").style = (g.axisUnlocked>=8)?"display:inline-block":"display:none"
    g.SAxisEffect=1.025
  } else if (x==6) {
    // X table
    document.getElementById("StatBreakdown6XStar21").innerHTML = "+ "+(StarE(21)*3)
    output=StarE(21)*3
    document.getElementById("StatBreakdown6XStar21T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6XRStar21",StarE(21)?"show":"hide")
    document.getElementById("StatBreakdown6XMastery51").innerHTML = "+ "+normFormat(g.Mastery51Effect*MasteryE(51))
    output+=g.Mastery51Effect*MasteryE(51)
    document.getElementById("StatBreakdown6XMastery51T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6XRMastery51",MasteryE(51)?"show":"hide")
    document.getElementById("StatBreakdown6XDarkMatter").innerHTML = "+ "+normFormat(g.darkMatterFreeAxis*g.darkXAxis)+"<span class='small'> ("+normFormat(g.darkMatterFreeAxis)+" × "+normFormat(g.darkXAxis)+")</span>"
    output+=g.darkMatterFreeAxis*g.darkXAxis
    document.getElementById("StatBreakdown6XDarkMatterT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6XRDarkMatter",(g.darkXAxis>0)?"show":"hide")
    document.getElementById("StatBreakdown6XSpatialEnergy").innerHTML = "× "+normFormat(g.spatialEnergyEffect)
    output*=g.spatialEnergyEffect
    document.getElementById("StatBreakdown6XSpatialEnergyT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6XRSpatialEnergy",(g.spatialEnergyEffect==1)?"hide":"show")
    document.getElementById("StatBreakdown6XSoftcap").innerHTML = "convergent, start "+g.XAxis+", limit "+(g.XAxis*2)
    output=ConvergentSoftcap(output,g.XAxis,g.XAxis*2)
    document.getElementById("StatBreakdown6XSoftcapT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6XRSoftcap",(g.freeXAxis>g.XAxis)?"show":"hide")
    g.freeXAxis=output
    document.getElementById("SSB6XTable").style = (g.freeXAxis>0)?"display:inline-block":"display:none"
    // Y table
    document.getElementById("StatBreakdown6YStar22").innerHTML = "+ "+(StarE(22)*3)
    output=StarE(22)*3
    document.getElementById("StatBreakdown6YStar22T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6YRStar22",StarE(22)?"show":"hide")
    document.getElementById("StatBreakdown6YDarkMatter").innerHTML = "+ "+normFormat(g.darkMatterFreeAxis*g.darkYAxis)+"<span class='small'> ("+normFormat(g.darkMatterFreeAxis)+" × "+normFormat(g.darkYAxis)+")</span>"
    output+=g.darkMatterFreeAxis*g.darkYAxis
    document.getElementById("StatBreakdown6YDarkMatterT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6YRDarkMatter",(g.darkYAxis>0)?"show":"hide")
    document.getElementById("StatBreakdown6YSoftcap").innerHTML = "convergent, start "+g.YAxis+", limit "+(g.YAxis*2)
    output=ConvergentSoftcap(output,g.YAxis,g.YAxis*2)
    document.getElementById("StatBreakdown6YSoftcapT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6YRSoftcap",(g.freeYAxis>g.YAxis)?"show":"hide")
    g.freeYAxis=output
    document.getElementById("SSB6YTable").style = (g.freeYAxis>0)?"display:inline-block":"display:none"
    // Z table
    document.getElementById("StatBreakdown6ZMastery31").innerHTML = "+ "+normFormat(g.Mastery31Effect*MasteryE(31))
    output=g.Mastery31Effect*MasteryE(31)
    document.getElementById("StatBreakdown6ZMastery31T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6ZRMastery31",MasteryE(31)?"show":"hide")
    document.getElementById("StatBreakdown6ZStar23").innerHTML = "+ "+(StarE(23)*3)
    output+=StarE(23)*3
    document.getElementById("StatBreakdown6ZStar23T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6ZRStar23",StarE(23)?"show":"hide")
    document.getElementById("StatBreakdown6ZDarkMatter").innerHTML = "+ "+normFormat(g.darkMatterFreeAxis*g.darkZAxis)+"<span class='small'> ("+normFormat(g.darkMatterFreeAxis)+" × "+normFormat(g.darkZAxis)+")</span>"
    output+=g.darkMatterFreeAxis*g.darkZAxis
    document.getElementById("StatBreakdown6ZDarkMatterT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6ZRDarkMatter",(g.darkZAxis>0)?"show":"hide")
    document.getElementById("StatBreakdown6ZSoftcap").innerHTML = "convergent, start "+g.ZAxis+", limit "+(g.ZAxis*2)
    output=ConvergentSoftcap(output,g.ZAxis,g.ZAxis*2)
    document.getElementById("StatBreakdown6ZSoftcapT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6ZRSoftcap",(g.freeZAxis>g.ZAxis)?"show":"hide")
    g.freeZAxis=output
    document.getElementById("SSB6ZTable").style = (g.freeZAxis>0)?"display:inline-block":"display:none"
    // W table
    document.getElementById("StatBreakdown6WMastery32").innerHTML = "+ "+normFormat(g.Mastery32Effect*MasteryE(32))
    output=g.Mastery32Effect*MasteryE(32)
    document.getElementById("StatBreakdown6WMastery32T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6WRMastery32",MasteryE(32)?"show":"hide")
    document.getElementById("StatBreakdown6WStar24").innerHTML = "+ "+(StarE(24)*3)
    output+=StarE(24)*3
    document.getElementById("StatBreakdown6WStar24T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6WRStar24",StarE(24)?"show":"hide")
    document.getElementById("StatBreakdown6WDarkMatter").innerHTML = "+ "+normFormat(g.darkMatterFreeAxis*g.darkWAxis)+"<span class='small'> ("+normFormat(g.darkMatterFreeAxis)+" × "+normFormat(g.darkWAxis)+")</span>"
    output+=g.darkMatterFreeAxis*g.darkWAxis
    document.getElementById("StatBreakdown6WDarkMatterT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6WRDarkMatter",(g.darkWAxis>0)?"show":"hide")
    document.getElementById("StatBreakdown6WSoftcap").innerHTML = "convergent, start "+g.WAxis+", limit "+(g.WAxis*2)
    output=ConvergentSoftcap(output,g.WAxis,g.WAxis*2)
    document.getElementById("StatBreakdown6WSoftcapT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6WRSoftcap",(g.freeWAxis>g.WAxis)?"show":"hide")
    g.freeWAxis=output
    document.getElementById("SSB6WTable").style = (g.freeWAxis>0)?"display:inline-block":"display:none"
    // V table
    document.getElementById("StatBreakdown6VStarUpgrade61").innerHTML = "+ "+normFormat(g.Star61Effect*StarE(61))
    output=g.Star61Effect*StarE(61)
    document.getElementById("StatBreakdown6VStarUpgrade61T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6VRStarUpgrade61",StarE(61)?"show":"hide")
    document.getElementById("StatBreakdown6VDarkMatter").innerHTML = "+ "+normFormat(g.darkMatterFreeAxis*g.darkVAxis)+"<span class='small'> ("+normFormat(g.darkMatterFreeAxis)+" × "+normFormat(g.darkVAxis)+")</span>"
    output+=g.darkMatterFreeAxis*g.darkVAxis
    document.getElementById("StatBreakdown6VDarkMatterT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6VRDarkMatter",(g.darkVAxis>0)?"show":"hide")
    document.getElementById("StatBreakdown6VSoftcap").innerHTML = "convergent, start "+g.WAxis+", limit "+(g.VAxis*2)
    output=ConvergentSoftcap(output,g.VAxis,g.VAxis*2)
    document.getElementById("StatBreakdown6VSoftcapT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6VRSoftcap",(g.freeVAxis>g.VAxis)?"show":"hide")
    g.freeVAxis=output
    document.getElementById("SSB6VTable").style = (g.freeVAxis>0)?"display:inline-block":"display:none"
    // U table
    document.getElementById("StatBreakdown6UStarUpgrade62").innerHTML = "+ "+normFormat(g.Star62Effect*StarE(62))
    output=g.Star62Effect*StarE(62)
    document.getElementById("StatBreakdown6UStarUpgrade62T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6URStarUpgrade62",StarE(62)?"show":"hide")
    document.getElementById("StatBreakdown6UDarkMatter").innerHTML = "+ "+normFormat(g.darkMatterFreeAxis*g.darkUAxis)+"<span class='small'> ("+normFormat(g.darkMatterFreeAxis)+" × "+normFormat(g.darkUAxis)+")</span>"
    output+=g.darkMatterFreeAxis*g.darkUAxis
    document.getElementById("StatBreakdown6UDarkMatterT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6URDarkMatter",(g.darkUAxis>0)?"show":"hide")
    document.getElementById("StatBreakdown6USoftcap").innerHTML = "convergent, start "+g.UAxis+", limit "+(g.UAxis*2)
    output=ConvergentSoftcap(output,g.UAxis,g.UAxis*2)
    document.getElementById("StatBreakdown6VSoftcapT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6URSoftcap",(g.freeVAxis>g.VAxis)?"show":"hide")
    g.freeUAxis=output
    document.getElementById("SSB6UTable").style = (g.freeUAxis>0)?"display:inline-block":"display:none"
    // T table
    document.getElementById("StatBreakdown6TStarUpgrade63").innerHTML = "+ "+normFormat(g.Star63Effect*StarE(63))
    output=g.Star63Effect*StarE(63)
    document.getElementById("StatBreakdown6TStarUpgrade63T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6TRStarUpgrade63",StarE(63)?"show":"hide")
    document.getElementById("StatBreakdown6TDarkMatter").innerHTML = "+ "+normFormat(g.darkMatterFreeAxis*g.darkTAxis)+"<span class='small'> ("+normFormat(g.darkMatterFreeAxis)+" × "+normFormat(g.darkTAxis)+")</span>"
    output+=g.darkMatterFreeAxis*g.darkTAxis
    document.getElementById("StatBreakdown6TDarkMatterT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6TRDarkMatter",(g.darkTAxis>0)?"show":"hide")
    document.getElementById("StatBreakdown6TSoftcap").innerHTML = "convergent, start "+g.TAxis+", limit "+(g.TAxis*2)
    output=ConvergentSoftcap(output,g.TAxis,g.TAxis*2)
    document.getElementById("StatBreakdown6TSoftcapT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6TRSoftcap",(g.freeTAxis>g.TAxis)?"show":"hide")
    g.freeTAxis=output
    document.getElementById("SSB6TTable").style = (g.freeTAxis>0)?"display:inline-block":"display:none"
    // S table
    document.getElementById("StatBreakdown6SStarUpgrade64").innerHTML = "+ "+normFormat(StarE(64))
    output=StarE(64)
    document.getElementById("StatBreakdown6SStarUpgrade64T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6SRStarUpgrade64",StarE(64)?"show":"hide")
    document.getElementById("StatBreakdown6SDarkMatter").innerHTML = "+ "+normFormat(g.darkMatterFreeAxis*g.darkSAxis)+"<span class='small'> ("+normFormat(g.darkMatterFreeAxis)+" × "+normFormat(g.darkSAxis)+")</span>"
    output+=g.darkMatterFreeAxis*g.darkSAxis
    document.getElementById("StatBreakdown6SDarkMatterT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6SRDarkMatter",(g.darkSAxis>0)?"show":"hide")
    document.getElementById("StatBreakdown6SSoftcap").innerHTML = "convergent, start "+g.WAxis+", limit "+(g.SAxis*2)
    output=ConvergentSoftcap(output,g.SAxis,g.SAxis*2)
    document.getElementById("StatBreakdown6SSoftcapT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown6SRSoftcap",(g.freeSAxis>g.SAxis)?"show":"hide")
    g.freeSAxis=output
    document.getElementById("SSB6STable").style = (g.freeSAxis>0)?"display:inline-block":"display:none"
    document.getElementById("SSBBFreeAxis").style = (g.totalAxis>0)?"display:inline-block":"display:none"
  } else if (x==7) {
    // X table
    output=Math.log10(3)
    document.getElementById("StatBreakdown7XDarkStars").innerHTML = "^ "+normFormat(1+Math.floor((g.darkstars+7)/8)/10)
    output*=1+Math.floor((g.darkstars+7)/8)/10
    document.getElementById("StatBreakdown7XDarkStarsT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown7XRDarkStars",(g.darkstars>0)?"show":"hide")
    document.getElementById("StatBreakdown7XMastery61").innerHTML = "^ "+normFormat(g.Mastery61Effect**MasteryE(61))
    output*=g.Mastery61Effect**MasteryE(61)
    document.getElementById("StatBreakdown7XMastery61T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown7XRMastery61",MasteryE(61)?"show":"hide")
    g.darkXAxisEffect=output
    // Y table
    output=Math.log10(4)
    document.getElementById("StatBreakdown7YDarkStars").innerHTML = "^ "+normFormat(1+Math.floor((g.darkstars+6)/8)/10)
    output*=1+Math.floor((g.darkstars+6)/8)/10
    document.getElementById("StatBreakdown7YDarkStarsT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown7YRDarkStars",(g.darkstars>0)?"show":"hide")
    document.getElementById("StatBreakdown7YStar84").innerHTML = "^ 5"
    output*=StarE(84)?5:1
    document.getElementById("StatBreakdown7YStar84T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown7YRStar84",StarE(84)?"show":"hide")
    g.darkYAxisEffect=output
    // Z table
    output=(infAdd(g.exoticmatter/200,1)-1)**0.2/5
    document.getElementById("StatBreakdown7ZBaseEffect").innerHTML = "(("+infFormat(g.exoticmatter,true)+" ^ 0.005 / 10 + 1) dilate 0.2) ^ 0.2"
    document.getElementById("StatBreakdown7ZBaseEffectT").innerHTML = infFormat(output,true)
    document.getElementById("StatBreakdown7ZDarkStars").innerHTML = "^ "+normFormat(1+Math.floor((g.darkstars+5)/8)/10)
    output*=1+Math.floor((g.darkstars+5)/8)/10
    document.getElementById("StatBreakdown7ZDarkStarsT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown7ZRDarkStars",(g.darkstars>0)?"show":"hide")
    document.getElementById("StatBreakdown7ZStardustBoost6").innerHTML = "^ "+normFormat(g.StardustBoost6)
    output*=g.StardustBoost6
    document.getElementById("StatBreakdown7ZStardustBoost6T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown7ZRStardustBoost6",(g.StardustBoost6==1)?"hide":"show")
    g.darkZAxisEffect=output
    // W table
    output=Math.log10(1.15)
    document.getElementById("StatBreakdown7WDarkStars").innerHTML = "^ "+normFormat(1+Math.floor((g.darkstars+4)/8)/10)
    output*=1+Math.floor((g.darkstars+4)/8)/10
    document.getElementById("StatBreakdown7WDarkStarsT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown7WRDarkStars",(g.darkstars>0)?"show":"hide")
    g.darkWAxisEffect=output
    // V table
    output=10
    document.getElementById("StatBreakdown7VDarkStars").innerHTML = "× "+normFormat(1+Math.floor((g.darkstars+3)/8)/10)
    output*=1+Math.floor((g.darkstars+3)/8)/10
    document.getElementById("StatBreakdown7VDarkStarsT").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown7VRDarkStars",(g.darkstars>0)?"show":"hide")
    output/=100
    g.darkVAxisEffect=output
    // U table
    output=Math.log10(1.02)
    document.getElementById("StatBreakdown7UDarkStars").innerHTML = "^ "+normFormat(1+Math.floor((g.darkstars+2)/8)/10)
    output*=1+Math.floor((g.darkstars+2)/8)/10
    document.getElementById("StatBreakdown7UDarkStarsT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown7URDarkStars",(g.darkstars>0)?"show":"hide")
    g.darkUAxisEffect=output
    // T table
    output=infAdd(g.truetimeThisStardustReset-3,0)**0.5
    document.getElementById("StatBreakdown7TBaseEffect").innerHTML = "(1 + "+infFormat(g.truetimeThisStardustReset,false)+" / 1000) dilate 0.5"
    document.getElementById("StatBreakdown7TBaseEffectT").innerHTML = infFormat(output,true)
    document.getElementById("StatBreakdown7TDarkStars").innerHTML = "^ "+normFormat(1+Math.floor((g.darkstars+1)/8)/10)
    output*=1+Math.floor((g.darkstars+1)/8)/10
    document.getElementById("StatBreakdown7TDarkStarsT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown7TRDarkStars",(g.darkstars>0)?"show":"hide")
    g.darkTAxisEffect=output
    // S table
    output=1.01
    document.getElementById("StatBreakdown7SDarkStars").innerHTML = "^ "+normFormat(1+Math.floor(g.darkstars/8)/10)+((g.darkstars>90)?" (softcapped to "+normFormat(LogarithmicSoftcap(1+Math.floor(g.darkstars/8)/10,10,10))+")":"")
    output**=LogarithmicSoftcap(1+Math.floor(g.darkstars/8)/10,10,10)
    document.getElementById("StatBreakdown7SDarkStarsT").innerHTML = normFormat(output,)
    toggleTableRow("StatBreakdown7SRDarkStars",(g.darkstars>0)?"show":"hide")
    g.darkSAxisEffect=output
    document.getElementById("SSBBDarkAxisEffects").style = (g.stardustUpgrades[4]>0)?"display:inline-block":"display:none"
  } else if (x==8) {
    // Divisor table
    document.getElementById("StatBreakdown8DiMastery12").innerHTML = "× "+infFormat(g.Mastery12Effect*MasteryE(12),true)
    output=g.Mastery12Effect*MasteryE(12)
    document.getElementById("StatBreakdown8DiMastery12T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown8DiRMastery12",MasteryE(12)?"show":"hide")
    document.getElementById("StatBreakdown8DiVAxis").innerHTML = "× "+infFormat(g.VAxisEffect*g.realVAxis)+"<span class='small'> ("+infFormat(g.VAxisEffect)+" ^ "+normFormat(g.realVAxis)+")</span>"
    output+=g.VAxisEffect*g.realVAxis
    document.getElementById("StatBreakdown8DiVAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown8DiRVAxis",((g.VAxisEffect!==0)&&(g.realVAxis!==0))?"show":"hide")
    g.axisCostDivisor=output
    document.getElementById("SSB8DivisorTable").style = (g.axisCostDivisor==0)?"display:none":"display:inline-block"
    // Exponent table
    document.getElementById("StatBreakdown8ExStar81").innerHTML = "× 0.5"
    output=StarE(81)?0.5:1
    document.getElementById("StatBreakdown8ExStar81T").innerHTML = normFormat(output)
    toggleTableRow("StatBreakdown8ExRStar81",StarE(81)?"show":"hide")
    g.axisCostExponent=output
    document.getElementById("SSB8ExponentTable").style = (g.axisCostExponent==1)?"display:none":"display:inline-block"
    document.getElementById("SSBBAxisCostReduction").style = ((g.axisCostDivisor==0)&&(g.axisCostExponent==1))?"display:none":"display:inline-block"
  } else if (x==9) {
    // Divisor table
    document.getElementById("StatBreakdown9DiDarkYAxis").innerHTML = "× "+infFormat(g.darkYAxisEffect*g.realdarkYAxis)+"<span class='small'> ("+infFormat(g.darkYAxisEffect)+" ^ "+normFormat(g.realdarkYAxis)+")</span>"
    output=g.darkYAxisEffect*g.realdarkYAxis
    document.getElementById("StatBreakdown9DiDarkYAxisT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown9DiRDarkYAxis",((g.darkYAxisEffect!==0)&&(g.realdarkYAxis!==0))?"show":"hide")
    g.darkaxisCostDivisor=output
    document.getElementById("SSB9DivisorTable").style = (g.darkaxisCostDivisor==0)?"display:none":"display:inline-block"
    // Exponent table
    document.getElementById("StatBreakdown9ExMastery62").innerHTML = "× "+normFormat(g.Mastery62Effect**MasteryE(62))
    output=g.Mastery62Effect**MasteryE(62)
    document.getElementById("StatBreakdown9ExMastery62T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown9ExRMastery62",MasteryE(62)?"show":"hide")
    document.getElementById("StatBreakdown9ExStar83").innerHTML = "× 0.5"
    output*=StarE(83)?0.5:1
    document.getElementById("StatBreakdown9ExStar83T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown9ExRStar83",StarE(83)?"show":"hide")
    g.darkaxisCostExponent=output
    document.getElementById("SSB9ExponentTable").style = (g.darkaxisCostExponent==1)?"display:none":"display:inline-block"
    document.getElementById("SSBBDarkAxisCostReduction").style = ((g.darkaxisCostDivisor==0)&&(g.darkaxisCostExponent==1))?"display:none":"display:inline-block"
  } else if (x==10) {
    // Speed table
    document.getElementById("StatBreakdown10SpMastery71").innerHTML = "× "+normFormat(g.Mastery71Effect*MasteryE(71),true)
    output=Math.log10(g.Mastery71Effect)*MasteryE(71)
    document.getElementById("StatBreakdown10SpMastery71T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown10SpRMastery71",MasteryE(71)?"show":"hide")
    document.getElementById("StatBreakdown10SpMetaEnergy").innerHTML = "× "+normFormat(g.metaEnergyEffect)
    output+=Math.log10(g.metaEnergyEffect)
    document.getElementById("StatBreakdown10SpMetaEnergyT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown10SpRMetaEnergy",(g.metaEnergyEffect==1)?"hide":"show")
    document.getElementById("StatBreakdown10SpTickspeed").innerHTML = "× "+infFormat(g.tickspeed,true)
    output+=g.tickspeed
    document.getElementById("StatBreakdown10SpTickspeedT").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown10SpRTickspeed",(g.tickspeed==0)?"hide":"show")
    g.energySpeedMult=output
    document.getElementById("SSB10SpeedTable").style = (g.energySpeedMult==0)?"display:none":"display:inline-block"
    // Effect table
    document.getElementById("StatBreakdown10EfMastery72").innerHTML = "× "+normFormat(g.Mastery72Effect**MasteryE(72))
    output=g.Mastery72Effect**MasteryE(72)
    document.getElementById("StatBreakdown10EfMastery72T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown10EfRMastery72",((g.darkVAxisEffect!==0)&&(g.realdarkVAxis!==0))?"show":"hide")
    g.energyEffectBoost=output
    document.getElementById("SSB10EffectTable").style = (g.energyEffectBoost==1)?"display:none":"display:inline-block"
    document.getElementById("SSBBEnergy").style = ((g.energySpeedMult==0)&&(g.energyEffectBoost==1))?"display:none":"display:inline-block"
  } else if (x==11) {
    document.getElementById("StatBreakdown11Star71").innerHTML = "× "+normFormat(1+g.Star71Effect/100)
    output=Math.log10(1+g.Star71Effect/100)*StarE(71)
    document.getElementById("StatBreakdown11Star71T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown11RStar71",StarE(71)?"show":"hide")
    document.getElementById("StatBreakdown11Star72").innerHTML = "× "+normFormat(1+g.Star72Effect/100)
    output+=Math.log10(1+g.Star72Effect/100)*StarE(72)
    document.getElementById("StatBreakdown11Star72T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown11RStar72",StarE(72)?"show":"hide")
    document.getElementById("StatBreakdown11Star73").innerHTML = "× "+normFormat(1+g.Star73Effect/100)
    output+=Math.log10(1+g.Star73Effect/100)*StarE(73)
    document.getElementById("StatBreakdown11Star73T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown11RStar73",StarE(73)?"show":"hide")
    document.getElementById("StatBreakdown11Star74").innerHTML = "× "+normFormat(1+g.Star74Effect/100)
    output+=Math.log10(1+g.Star74Effect/100)*StarE(74)
    document.getElementById("StatBreakdown11Star74T").innerHTML = infFormat(output,true)
    toggleTableRow("StatBreakdown11RStar74",StarE(74)?"show":"hide")
    g.tickspeed=output
    document.getElementById("SSBBTickspeed").style = (g.tickspeed==0)?"display:none":"display:inline-block"
  }
}
function stardustReset(x) {
  if ((g.pendingstardust>g.stardust)||(x=="force")) {
    g.stardust=infFloor(Math.max(g.stardust,g.pendingstardust))
    g.fastestStardustReset=Math.min(g.fastestStardustReset,g.timeThisStardustReset)
    g.StardustResets++
    g.exoticmatter=0
    g.exoticmatterPerSec=0
    g.XAxis=(g.stardustUpgrades[1]>=2)?Math.floor(g.XAxis/10):0
    g.YAxis=(g.stardustUpgrades[1]>=3)?Math.floor(g.YAxis/10):0
    g.ZAxis=(g.stardustUpgrades[1]>=4)?Math.floor(g.ZAxis/10):0
    g.WAxis=(g.stardustUpgrades[1]>=5)?Math.floor(g.WAxis/10):0
    g.VAxis=(g.stardustUpgrades[1]>=6)?Math.floor(g.VAxis/10):0
    g.UAxis=(g.stardustUpgrades[1]>=7)?Math.floor(g.UAxis/10):0
    g.TAxis=(g.stardustUpgrades[1]>=8)?Math.floor(g.TAxis/10):0
    g.SAxis=(g.stardustUpgrades[1]>=9)?Math.floor(g.SAxis/10):0
    g.masteryPower=-100
    g.baseMasteryPowerGain=0
    g.exoticmatterThisStardustReset=0
    g.timeThisStardustReset=0
    g.truetimeThisStardustReset=-100
    g.darkEnergy=0
    g.stelliferousEnergy=0
    g.gravitationalEnergy=0
    g.spatialEnergy=0
    g.neuralEnergy=0
    g.metaEnergy=0
    g.EMSupernova.charges=g.EMSupernova.maxCharges
    g.KnowledgeSupernova.charges=g.KnowledgeSupernova.maxCharges
  }
}
function buyStardustUpgrade1() {
  if ((g.stardust>=stardustUpgrade1Cost[g.stardustUpgrades[0]]) && (g.stardustUpgrades[0] < 4)) {
    infDeduct("stardust",stardustUpgrade1Cost[g.stardustUpgrades[0]])
    g.stardustUpgrades[0]++
  }
}
function buyStardustUpgrade2() {
  if ((g.stardust>=stardustUpgrade2Cost[g.stardustUpgrades[1]]) && (g.stardustUpgrades[1] < 9)) {
    infDeduct("stardust",stardustUpgrade2Cost[g.stardustUpgrades[1]])
    g.stardustUpgrades[1]++
  }
}
function buyStardustUpgrade3() {
  if ((g.stardust>=stardustUpgrade3Cost[g.stardustUpgrades[2]]) && (g.stardustUpgrades[2] < 6)) {
    infDeduct("stardust",stardustUpgrade3Cost[g.stardustUpgrades[2]])
    g.stardustUpgrades[2]++
  }
}
function buyStardustUpgrade4() {
  if ((g.stardust>=stardustUpgrade4Cost[g.stardustUpgrades[3]]) && (g.stardustUpgrades[3] < 5)) {
    infDeduct("stardust",stardustUpgrade4Cost[g.stardustUpgrades[3]])
    g.stardustUpgrades[3]++
  }
}
function buyStardustUpgrade5() {
  if ((g.stardust>=stardustUpgrade5Cost[g.stardustUpgrades[4]]) && (g.stardustUpgrades[4] < 7)) {
    infDeduct("stardust",stardustUpgrade5Cost[g.stardustUpgrades[4]])
    g.stardustUpgrades[4]++
  }
}
function upgradeAxisAutobuyer() {
  while ((g.exoticmatter>=g.axisAutobuyerCost) && (g.axisAutobuyerInterval>0.1)) {
    infDeduct("exoticmatter",g.axisAutobuyerCost)
    g.axisAutobuyerUpgrades++
    g.axisAutobuyerCost = Math.round(50*1.05**g.axisAutobuyerUpgrades)
  }
}
function buyStar() {
  if ((g.stardust>=g.starCost) && (g.stars < 40)) {
    infDeduct("stardust",g.starCost)
    g.stars++
    g.unspentStars++
  }
}
function buyStarUpgrade(x) {
  if ((g.unspentStars > 0) && (Math.floor(x/10) == g.starRow[g.stars-g.unspentStars])) {
    if (!(g.ownedStars.includes(x))) {
      g.ownedStars.push(x)
      g.unspentStars--
    }
  }
}
function respecStars() {
  g.ownedStars=[]
  g.unspentStars=g.stars
  stardustReset("force")
}
function StarE(x) {
  return g.ownedStars.includes(x)
}
function buyDarkAxis(x) {
  if (g.darkmatter>g["dark"+x+"AxisCost"]) {
    infDeduct("darkmatter",g["dark"+x+"AxisCost"])
    g["dark"+x+"Axis"]++
  }
}

function buyMaxDarkAxis() {
  for (i=0; i<8; i++) {
    while (g.darkmatter>g["dark"+axisCodes[i]+"AxisCost"]) {
      buyDarkAxis(axisCodes[i])
      updateDarkAxisCosts()
    }
  }
}
function updateDarkAxisCosts() {
  g.darkXAxisCost = (1+normLinearScaling(normSemiexpScaling(g.darkXAxis,g.darkaxisSuperscalingStart,1),g.darkaxisScalingStart,1)**1.2-g.darkaxisCostDivisor)*g.darkaxisCostExponent
  g.darkYAxisCost = (2+2*normLinearScaling(normSemiexpScaling(g.darkYAxis,g.darkaxisSuperscalingStart,1),g.darkaxisScalingStart,1)-g.darkaxisCostDivisor)*g.darkaxisCostExponent
  g.darkZAxisCost = (10+normLinearScaling(normSemiexpScaling(g.darkZAxis,g.darkaxisSuperscalingStart,1),g.darkaxisScalingStart,1)-g.darkaxisCostDivisor)*g.darkaxisCostExponent
  g.darkWAxisCost = (15+normLinearScaling(normSemiexpScaling(g.darkWAxis,g.darkaxisSuperscalingStart,1),g.darkaxisScalingStart,1)**1.5-g.darkaxisCostDivisor)*g.darkaxisCostExponent
  g.darkVAxisCost = (30+normLinearScaling(normSemiexpScaling(g.darkVAxis,g.darkaxisSuperscalingStart,1),g.darkaxisScalingStart,1)**1.25-g.darkaxisCostDivisor)*g.darkaxisCostExponent
  g.darkUAxisCost = (45+normLinearScaling(normSemiexpScaling(g.darkUAxis,g.darkaxisSuperscalingStart,1),g.darkaxisScalingStart,1)**2-g.darkaxisCostDivisor)*g.darkaxisCostExponent
  g.darkTAxisCost = (100+4*normLinearScaling(normSemiexpScaling(g.darkTAxis,g.darkaxisSuperscalingStart,1),g.darkaxisScalingStart,1)-g.darkaxisCostDivisor)*g.darkaxisCostExponent
  g.darkSAxisCost = (308.2547155599167*1.2**normLinearScaling(normSemiexpScaling(g.darkSAxis,g.darkaxisSuperscalingStart,5),g.darkaxisScalingStart,2)-g.darkaxisCostDivisor)*g.darkaxisCostExponent
}
function updateDarkStarCost() {
  g.darkstarRequirement=24+3*g.darkstars
  g.darkstarRequirement+=Math.floor(g.darkstars/4)*(g.darkstars%4)+4*normSimplex(Math.max(0,Math.floor(g.darkstars/4-1)),2)
  g.darkstarRequirement*=1.05**Math.max(0,g.darkstars-g.darkstarScalingStart)                                                                               // Scaling
  g.darkstarRequirement=Math.ceil(g.darkstarRequirement-g.Mastery63Effect*MasteryE(63))
}
function gainDarkStar() {
  more=true
  while ((g.totaldarkAxis >= g.darkstarRequirement)&&more) {
    g.darkmatter=0
    g.darkmatterPerSec=0
    g.darkXAxis=0
    g.darkYAxis=0
    g.darkZAxis=0
    g.darkWAxis=0
    g.darkVAxis=0
    g.darkUAxis=0
    g.darkTAxis=0
    g.darkSAxis=0
    g.darkstars++
    updateDarkStarCost()
    stardustReset((g.pendingstardust > g.stardust)?"normal":"force")
    more=g.darkstarBulk
  }
}
function supernova(x) {
  if (x==1) {
    if (g.EMSupernova.charges>0) {
      g.EMSupernova.charges--
      incrementExoticMatter(g.exoticmatterPerSec*g.EMSupernova.power)
    }
  } else if (x==2) {
    if (g.KnowledgeSupernova.charges>0) {
      g.KnowledgeSupernova.charges--
      infIncrement("masteryPower",g.masteryPowerPerSec*g.KnowledgeSupernova.power)
    }
  }
}
function unlockSupernova(x) {
  if ((x==2)&&(g.KnowledgeSupernova.unlocked==false)&&(g.masteryPower>65)) {
    infDeduct("masteryPower",65)
    g.KnowledgeSupernova.unlocked=true
  }
}
function upgradeSupernova(x,y) {
  let resource=["exoticmatter","masteryPower"]
  let types=["EMSupernova","KnowledgeSupernova"]
  if (g[resource[x]]>SupernovaCosts[x][y]) {
    g[types[x]]["upgrade"+(y+1)]++
    infDeduct(resource[x],SupernovaCosts[x][y])
  }
}





window.setInterval(function(){                                                                     // The game loop, which consists of functions that run automatically. Frame rate is 20fps


  // QoL section
  if ((baseOfflineSpeedup>1)&&(offlineTime>0)) {
    offlineSpeedup = 1+(baseOfflineSpeedup-1)*Math.min(deltatime/Math.max(offlineTime,0.001),1)
    offlineTime = offlineTime-deltatime
    document.getElementById("offlineSpeedupDisplay").innerHTML = "Offline speedup: "+normFormat(offlineSpeedup)+"x     Offline time left: "+normFormat(offlineTime)+"s"
  } else {
    offlineSpeedup = 1
    document.getElementById("offlineSpeedupDisplay").innerHTML = ""
  }
  document.getElementById("offlineSpeedupLength").innerHTML = g.offlineSpeedupLength+"s"
  document.getElementById("offlineSpeedupOn").innerHTML = g.offlineSpeedupOn?"On":"Off"
  ProgressBar()
  oldframetime=newframetime
  newframetime=new Date().getTime()
  deltatime=(newframetime-oldframetime)/1000


  // Exotic matter section
  g.axisCostDivisor = g.VAxisEffect*g.realVAxis+g.Mastery12Effect*MasteryE(12)
  g.axisScalingStart = 8
  g.axisSuperscalingStart = 128
  updateAxisCosts()
  g.realXAxis=g.XAxis+g.freeXAxis
  g.realYAxis=g.YAxis+g.freeYAxis
  g.realZAxis=g.ZAxis+g.freeZAxis
  g.realWAxis=g.WAxis+g.freeWAxis
  g.realVAxis=g.VAxis+g.freeVAxis
  g.realUAxis=g.UAxis+g.freeUAxis
  g.realTAxis=g.TAxis+g.freeTAxis
  g.realSAxis=g.SAxis+g.freeSAxis
  g.totalAxis = g.XAxis+g.YAxis+g.ZAxis+g.WAxis+g.VAxis+g.UAxis+g.TAxis+g.SAxis
  g.axisUnlocked = Math.min(1+Math.sign(g.XAxis)+Math.sign(g.YAxis)+Math.sign(g.ZAxis)+Math.sign(g.WAxis)+Math.sign(g.VAxis)+Math.sign(g.UAxis)+Math.sign(g.TAxis)+Math.sign(g.SAxis),4+g.stardustUpgrades[0])
  document.getElementById("XAxisButton").style.display=(g.axisUnlocked<1)?"none":"inline-block"
  document.getElementById("YAxisButton").style.display=(g.axisUnlocked<2)?"none":"inline-block"
  document.getElementById("ZAxisButton").style.display=(g.axisUnlocked<3)?"none":"inline-block"
  document.getElementById("WAxisButton").style.display=(g.axisUnlocked<4)?"none":"inline-block"
  document.getElementById("VAxisButton").style.display=(g.axisUnlocked<5)?"none":"inline-block"
  document.getElementById("UAxisButton").style.display=(g.axisUnlocked<6)?"none":"inline-block"
  document.getElementById("TAxisButton").style.display=(g.axisUnlocked<7)?"none":"inline-block"
  document.getElementById("SAxisButton").style.display=(g.axisUnlocked<8)?"none":"inline-block"
  document.getElementById("XAxisButton").className=(g.exoticmatter<g.XAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("YAxisButton").className=(g.exoticmatter<g.YAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("ZAxisButton").className=(g.exoticmatter<g.ZAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("WAxisButton").className=(g.exoticmatter<g.WAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("VAxisButton").className=(g.exoticmatter<g.VAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("UAxisButton").className=(g.exoticmatter<g.UAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("TAxisButton").className=(g.exoticmatter<g.TAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("SAxisButton").className=(g.exoticmatter<g.SAxisCost)?"lockedaxisbutton":"axisbutton"
  document.getElementById("XAxisEffect").innerHTML = infFormat(g.XAxisEffect,true);
  document.getElementById("XAxisCost").innerHTML = infFormat(g.XAxisCost,false);
  document.getElementById("XAxisAmount").innerHTML = (g.freeXAxis > 0) ? g.XAxis+" + "+normFormat(g.freeXAxis) : g.XAxis;
  document.getElementById("YAxisEffect").innerHTML = infFormat(g.YAxisEffect,true);
  document.getElementById("YAxisCost").innerHTML = infFormat(g.YAxisCost,false);
  document.getElementById("YAxisAmount").innerHTML = (g.freeYAxis > 0) ? g.YAxis+" + "+normFormat(g.freeYAxis) : g.YAxis;
  document.getElementById("ZAxisEffect").innerHTML = infFormat(g.ZAxisEffect,true);
  document.getElementById("ZAxisCost").innerHTML = infFormat(g.ZAxisCost,false);
  document.getElementById("ZAxisAmount").innerHTML = (g.freeZAxis > 0) ? g.ZAxis+" + "+normFormat(g.freeZAxis) : g.ZAxis;
  document.getElementById("WAxisEffect").innerHTML = infFormat(g.WAxisEffect,true);
  document.getElementById("WAxisCost").innerHTML = infFormat(g.WAxisCost,false);
  document.getElementById("WAxisAmount").innerHTML = (g.freeWAxis > 0) ? g.WAxis+" + "+normFormat(g.freeWAxis) : g.WAxis;
  document.getElementById("VAxisEffect").innerHTML = infFormat(g.VAxisEffect,true);
  document.getElementById("VAxisCost").innerHTML = infFormat(g.VAxisCost,false);
  document.getElementById("VAxisAmount").innerHTML = (g.freeVAxis > 0) ? g.VAxis+" + "+normFormat(g.freeVAxis) : g.VAxis;
  document.getElementById("UAxisEffect").innerHTML = infFormat(g.UAxisEffect,true);
  document.getElementById("UAxisCost").innerHTML = infFormat(g.UAxisCost,false);
  document.getElementById("UAxisAmount").innerHTML = (g.freeUAxis > 0) ? g.UAxis+" + "+normFormat(g.freeUAxis) : g.UAxis;
  document.getElementById("TAxisEffect").innerHTML = infFormat(g.TAxisEffect,true);
  document.getElementById("TAxisCost").innerHTML = infFormat(g.TAxisCost,false);
  document.getElementById("TAxisAmount").innerHTML = (g.freeTAxis > 0) ? g.TAxis+" + "+normFormat(g.freeTAxis) : g.TAxis;
  document.getElementById("SAxisEffect").innerHTML = Math.floor(g.SAxisEffect*10000)/10000;
  document.getElementById("SAxisCost").innerHTML = infFormat(g.SAxisCost,false);
  document.getElementById("SAxisAmount").innerHTML = (g.freeSAxis > 0) ? g.SAxis+" + "+normFormat(g.freeSAxis) : g.SAxis;


  // Mastery section
  if (g.masteryRowsUnlocked.includes(1)) {
    document.getElementById("masteriesButton").style="display:inline-block"
    g.baseMasteryPowerGain=infAdd(g.baseMasteryPowerGain,Math.log10(deltatime*offlineSpeedup)+g.tickspeed)
  } else {
    document.getElementById("masteriesButton").style="display:none"
  }
  document.getElementById("masteryPowerDisplay").innerHTML = infFormat(g.masteryPower,false)
  document.getElementById("masteryPowerPerSec").innerHTML = infFormat(g.masteryPowerPerSec,true)
  g.masteryRowsUnlocked[0]=(g.XAxis>0 || g.masteryRowsUnlocked[0]==1)?1:0
  g.masteryRowsUnlocked[1]=(g.exoticmatter>6 || g.masteryRowsUnlocked[1]==1)?1:0
  g.masteryRowsUnlocked[2]=(g.exoticmatter>17 || g.masteryRowsUnlocked[2]==1)?1:0
  g.masteryRowsUnlocked[3]=(g.exoticmatter>22 || g.masteryRowsUnlocked[3]==1)?1:0
  g.masteryRowsUnlocked[4]=(g.stardustUpgrades[3]>=2 || g.masteryRowsUnlocked[4]==1)?1:0
  g.masteryRowsUnlocked[5]=(g.stardustUpgrades[3]>=3 || g.masteryRowsUnlocked[5]==1)?1:0
  g.masteryRowsUnlocked[6]=(g.stardustUpgrades[3]>=4 || g.masteryRowsUnlocked[6]==1)?1:0
  g.masteryRowsUnlocked[7]=(g.stardustUpgrades[3]==5 || g.masteryRowsUnlocked[7]==1)?1:0
  g.masteryRowsUnlocked[8]=g.masteryRowsUnlocked[7]
  if (g.stardustUpgrades[3]>0) g.activeMasteries[0]=9
  if ((g.stardustUpgrades[3]==0)&&(g.activeMasteries[0]==9)) g.activeMasteries[0]=0
  if (StarE(51)) g.activeMasteries[1]=9
  if ((!StarE(51))&&(g.activeMasteries[1]==9)) g.activeMasteries[1]=0
  if (StarE(52)) g.activeMasteries[2]=9
  if ((!StarE(52))&&(g.activeMasteries[2]==9)) g.activeMasteries[2]=0
  if (StarE(53)) g.activeMasteries[3]=9
  if ((!StarE(53))&&(g.activeMasteries[3]==9)) g.activeMasteries[3]=0
  if (StarE(54)) g.activeMasteries[4]=9
  if ((!StarE(54))&&(g.activeMasteries[4]==9)) g.activeMasteries[4]=0
  if (StarE(101)) g.activeMasteries[5]=9
  if ((!StarE(101))&&(g.activeMasteries[5]==9)) g.activeMasteries[5]=0
  if (StarE(102)) g.activeMasteries[6]=9
  if ((!StarE(102))&&(g.activeMasteries[6]==9)) g.activeMasteries[6]=0
  if (StarE(103)) g.activeMasteries[7]=9
  if ((!StarE(103))&&(g.activeMasteries[7]==9)) g.activeMasteries[7]=0
  if (StarE(104)) g.activeMasteries[8]=9
  if ((!StarE(104))&&(g.activeMasteries[8]==9)) g.activeMasteries[8]=0
  updateMasteryBoosts()
  g.Mastery11Effect=infAdd(0,g.masteryPower)*0.1*masteryBoosts.b11
  g.Mastery12Effect=infAdd(0,g.masteryPower)*0.15*masteryBoosts.b12
  g.Mastery21Effect=infAdd(0,g.masteryPower)**0.6*0.0175*masteryBoosts.b21
  g.Mastery22Effect=infAdd(0,g.masteryPower)**0.6*0.035*masteryBoosts.b22
  g.Mastery31Effect=infAdd(0,g.masteryPower)**0.5*0.5*masteryBoosts.b31
  g.Mastery32Effect=infAdd(0,g.masteryPower)**0.5*0.8*masteryBoosts.b32
  g.Mastery41Effect=1+LogarithmicSoftcap(infAdd(0,g.masteryPower)/15,1,2)*masteryBoosts.b41
  g.Mastery42Effect=(infAdd(g.masteryPower-1,4)**0.5-2)*masteryBoosts.b42
  g.Mastery43Effect=1+LogarithmicSoftcap(infAdd(0,g.masteryPower)/15,1,2)*masteryBoosts.b43
  g.Mastery51Effect=infAdd(g.masteryPower,0)**0.5*2*masteryBoosts.b51
  g.Mastery52Effect=1+infAdd(g.masteryPower,0)**0.33*2*masteryBoosts.b52
  g.Mastery61Effect=1+LogarithmicSoftcap(infAdd(g.masteryPower,1)**0.1-1,9,2)*masteryBoosts.b61
  g.Mastery62Effect=1/LogarithmicSoftcap(infAdd(g.masteryPower,1)**0.04,2,1)**masteryBoosts.b62
  g.Mastery63Effect=infAdd(g.masteryPower,0)**0.8*masteryBoosts.b63
  g.Mastery71Effect=Math.log10(infAdd(g.masteryPower*1.25,10))**masteryBoosts.b71
  g.Mastery72Effect=1+LogarithmicSoftcap(Math.log10(infAdd(g.masteryPower*1.25,10))**0.5-1,1,5)*masteryBoosts.b72
  g.Mastery81Effect=infAdd(g.masteryPower,0)**0.5*g.XAxis**0.5*0.05*masteryBoosts.b81
  g.Mastery82Effect=infAdd(g.masteryPower,0)**0.5*Math.log10(infAdd(g.exoticmatter,1))*0.25*masteryBoosts.b82
  g.Mastery83Effect=infAdd(g.masteryPower,0)**0.5*Math.log10(infAdd(g.darkmatter,1))**0.75*0.6*masteryBoosts.b83
  g.Mastery84Effect=infAdd(g.masteryPower,0)**0.5*Math.log10(infAdd(g.stardust,1))**0.5*0.7*masteryBoosts.b84
  g.Mastery85Effect=Math.log10(infAdd(g.masteryPower,1))*masteryBoosts.b85
  g.Mastery91Effect=1+Math.log10(infAdd(g.masteryPower,1))*0.1*(0.3*infAdd(g.truetimeThisStardustReset,1))*masteryBoosts.b91
  g.Mastery92Effect=1+Math.log10(infAdd(g.masteryPower,1))*0.1/(0.3*infAdd(g.truetimeThisStardustReset,1))*masteryBoosts.b92
  document.getElementById("Mastery11Effect").innerHTML = infFormat(g.Mastery11Effect,true)
  document.getElementById("Mastery12Effect").innerHTML = infFormat(g.Mastery12Effect,true)
  document.getElementById("Mastery11Button").className = (MasteryE(11)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery12Button").className = (MasteryE(12)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery21Effect").innerHTML = infFormat(g.Mastery21Effect,true)
  document.getElementById("Mastery22Effect").innerHTML = infFormat(g.Mastery22Effect,true)
  document.getElementById("Mastery21Button").className = (MasteryE(21)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery22Button").className = (MasteryE(22)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery31Effect").innerHTML = normFormat(g.Mastery31Effect)
  document.getElementById("Mastery32Effect").innerHTML = normFormat(g.Mastery32Effect)
  document.getElementById("Mastery31Button").className = (MasteryE(31)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery32Button").className = (MasteryE(32)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery41Effect").innerHTML = normFormat(100*g.Mastery41Effect-100)
  document.getElementById("Mastery42Effect").innerHTML = infFormat(g.Mastery42Effect,true)
  document.getElementById("Mastery43Effect").innerHTML = normFormat(100*g.Mastery43Effect-100)
  document.getElementById("Mastery41Button").className = (MasteryE(41)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery42Button").className = (MasteryE(42)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery43Button").className = (MasteryE(43)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery51Effect").innerHTML = normFormat(g.Mastery51Effect)
  document.getElementById("Mastery52Effect").innerHTML = normFormat(g.Mastery52Effect)
  document.getElementById("Mastery51Button").className = (MasteryE(51)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery52Button").className = (MasteryE(52)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery61Effect").innerHTML = normFormat(100*g.Mastery61Effect-100)
  document.getElementById("Mastery62Effect").innerHTML = g.Mastery62Effect.toFixed(4)
  document.getElementById("Mastery63Effect").innerHTML = normFormat(g.Mastery63Effect)
  document.getElementById("Mastery61Button").className = (MasteryE(61)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery62Button").className = (MasteryE(62)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery63Button").className = (MasteryE(63)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery71Effect").innerHTML = normFormat(g.Mastery71Effect)
  document.getElementById("Mastery72Effect").innerHTML = normFormat(g.Mastery72Effect)
  document.getElementById("Mastery71Button").className = (MasteryE(71)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery72Button").className = (MasteryE(72)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery81Effect").innerHTML = infFormat(g.Mastery81Effect,true)
  document.getElementById("Mastery82Effect").innerHTML = infFormat(g.Mastery82Effect,true)
  document.getElementById("Mastery83Effect").innerHTML = infFormat(g.Mastery83Effect,true)
  document.getElementById("Mastery84Effect").innerHTML = infFormat(g.Mastery84Effect,true)
  document.getElementById("Mastery85Effect").innerHTML = normFormat(g.Mastery85Effect)
  document.getElementById("Mastery85Approx").innerHTML = "(this is currently a "+infFormat(g.baseMasteryPowerGain*g.Mastery85Effect,true)+"x boost)"
  document.getElementById("Mastery81Button").className = (MasteryE(81)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery82Button").className = (MasteryE(82)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery83Button").className = (MasteryE(83)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery84Button").className = (MasteryE(84)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery85Button").className = (MasteryE(85)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery91Effect").innerHTML = normFormat(100*(g.Mastery91Effect-1))
  document.getElementById("Mastery92Effect").innerHTML = normFormat(100*(g.Mastery92Effect-1))
  document.getElementById("Mastery91Button").className = (MasteryE(91)==1)?"masterybuttonon":"masterybuttonoff"
  document.getElementById("Mastery92Button").className = (MasteryE(92)==1)?"masterybuttonon":"masterybuttonoff"
  for (i=2;i<=9;i++) document.getElementById("MasteryRow"+i).style = (g.masteryRowsUnlocked[i-1]==1)?"display:inline-block":"display:none"


  // Options & Display section
  if (g.colortheme == "Default") document.getElementById("bodytheme").style = "color: #39f;background-color: #190033;font-size: 15px;font-family:verdana;text-align: center;"
  if (g.colortheme == "Red") document.getElementById("bodytheme").style = "color: #f00;background-color: #300;font-size: 15px;font-family:verdana;text-align: center;"
  if (g.colortheme == "Green") document.getElementById("bodytheme").style = "color: #0f0;background-color: #030;font-size: 15px;font-family:verdana;text-align: center;"
  if (g.colortheme == "Blue") document.getElementById("bodytheme").style = "color: #00f;background-color: #003;font-size: 15px;font-family:verdana;text-align: center;"
  if (g.colortheme == "Cyan") document.getElementById("bodytheme").style = "color: #0ff;background-color: #033;font-size: 15px;font-family:verdana;text-align: center;"
  if (g.colortheme == "Magenta") document.getElementById("bodytheme").style = "color: #f0f;background-color: #303;font-size: 15px;font-family:verdana;text-align: center;"
  if (g.colortheme == "Yellow") document.getElementById("bodytheme").style = "color: #ff0;background-color: #330;font-size: 15px;font-family:verdana;text-align: center;"
  if (g.colortheme == "Light Gray") document.getElementById("bodytheme").style = "color: #ccc;background-color: #666;font-size: 15px;font-family:verdana;text-align: center;"
  if (g.colortheme == "Dark Gray") document.getElementById("bodytheme").style = "color: #666;background-color: #333;font-size: 15px;font-family:verdana;text-align: center;"
  if (g.colortheme == "Black") document.getElementById("bodytheme").style = "color: #fff;background-color: #000;font-size: 15px;font-family:verdana;text-align: center;"
  document.getElementById("colortheme").innerHTML = g.colortheme
  document.getElementById("game").style.display = (screen==1)?"inline-block":"none"
  document.getElementById("story").style.display = (screen==2)?"inline-block":"none"
  document.getElementById("storyTitle").style = "text-decoration:underline;font-size:100px;background:-webkit-repeating-linear-gradient("+(45*Math.sin(Number(new Date()/1e4)))+"deg,#f00,#ff0 4%,#0f0 8.5%,#0ff 12.5%,#00f 16.5%,#f0f 21%,#f00 25%);-webkit-background-clip:text;-webkit-text-fill-color: transparent;"
  if ((g.stardust>0)&&!g.storySnippets.includes("Stardust")) openStory("Stardust")
  if ((g.stardustUpgrades[4]>0)&&!g.storySnippets.includes("Dark Matter")) openStory("Dark Matter")
  if ((g.stardustUpgrades[4]>1)&&!g.storySnippets.includes("Energy")) openStory("Energy")
  if ((g.stars>=24)&&!g.storySnippets.includes("Supernova")) openStory("Supernova")

  document.getElementById("hiddenstatAxisAutobuyerUpgrades").innerHTML = g.axisAutobuyerUpgrades
  toggleTableRow("hiddenstatrowAxisAutobuyerUpgrades",(g.axisAutobuyerUpgrades==0)?"hide":"show")
  document.getElementById("hiddenstatAxisScalingStart").innerHTML = normFormat(g.axisScalingStart)
  toggleTableRow("hiddenstatrowAxisScalingStart",(Math.max(g.XAxis,g.YAxis,g.ZAxis,g.WAxis,g.VAxis,g.UAxis,g.TAxis,g.SAxis)>g.axisScalingStart)?"show":"hide")
  document.getElementById("hiddenstatAxisSuperscalingStart").innerHTML = normFormat(g.axisSuperscalingStart)
  toggleTableRow("hiddenstatrowAxisSuperscalingStart",(Math.max(g.XAxis,g.YAxis,g.ZAxis,g.WAxis,g.VAxis,g.UAxis,g.TAxis,g.SAxis)>g.axisSuperscalingStart)?"show":"hide")
  document.getElementById("hiddenstatDarkAxisScalingStart").innerHTML = normFormat(g.darkaxisScalingStart)
  toggleTableRow("hiddenstatrowDarkAxisScalingStart",(Math.max(g.darkXAxis,g.darkYAxis,g.darkZAxis,g.darkWAxis,g.darkVAxis,g.darkUAxis,g.darkTAxis,g.darkSAxis)>g.darkaxisScalingStart)?"show":"hide")
  document.getElementById("hiddenstatDarkAxisSuperscalingStart").innerHTML = normFormat(g.darkaxisSuperscalingStart)
  toggleTableRow("hiddenstatrowDarkAxisSuperscalingStart",(Math.max(g.darkXAxis,g.darkYAxis,g.darkZAxis,g.darkWAxis,g.darkVAxis,g.darkUAxis,g.darkTAxis,g.darkSAxis)>g.darkaxisSuperscalingStart)?"show":"hide")
  document.getElementById("hiddenstatDeltaTime").innerHTML = deltatime*1000+"ms ("+Math.round(10/deltatime)/10+"fps)"
  document.getElementById("hiddenstatStardustResets").innerHTML = g.StardustResets
  toggleTableRow("hiddenstatrowStardustResets",(g.fastestStardustReset>1e12)?"hide":"show")
  document.getElementById("hiddenstatTotalAxis").innerHTML = g.totalAxis
  document.getElementById("hiddenstatTotalDarkAxis").innerHTML = g.totaldarkAxis
  toggleTableRow("hiddenstatrowTotalDarkAxis",(g.stardustUpgrades[4]>0)?"show":"hide")
  notation=g.notation     // infOP doesn't work without this
  document.getElementById("notationButton").innerHTML = g.notation
  document.getElementById("toggleAutosave").innerHTML = g.autosaveIsOn?"On":"Off";
  document.getElementById("darkstarBulkButton").style.display = (g.storySnippets.includes("Dark Matter"))?"inline-block":"none"
  document.getElementById("darkstarBulk").innerHTML = (g.darkstarBulk)?"On":"Off"
  document.getElementById("tickspeedDisplay").innerHTML = (g.tickspeed==0)?"":"Tickspeed: "+infFormat(g.tickspeed,true)+"x"
  for (i=0;i<document.getElementsByClassName("inf").length;i++) {
    next=document.getElementsByClassName("inf")[i]
    document.getElementsByClassName("inf")[i].innerHTML = infFormat(next.className.split(' ').pop("inf").substr(3,100),true)
  }
  g.HTPshown = ((g.HTPshown==1) && (g.masteryRowsUnlocked[0] == 1)) ? 2 : g.HTPshown
  g.HTPshown = ((g.HTPshown==2) && (g.fastestStardustReset < 1e12)) ? 4 : g.HTPshown
  g.HTPshown = ((g.HTPshown==4) && (g.stardustUpgrades[4]>0)) ? 5 : g.HTPshown
  g.HTPshown = ((g.HTPshown==5) && (g.energyTypesUnlocked > 0)) ? 6 : g.HTPshown
  g.HTPshown = ((g.HTPshown==6) && (g.stars > 24)) ? 7 : g.HTPshown
  document.getElementById("HTPBMasteries").style = (g.HTPshown>=2) ? "display:inline-block" : "display:none"
  document.getElementById("HTPBStardust").style = (g.HTPshown>=3) ? "display:inline-block" : "display:none"
  document.getElementById("HTPBStars").style = (g.HTPshown>=4) ? "display:inline-block" : "display:none"
  document.getElementById("HTPBDarkMatter").style = (g.HTPshown>=5) ? "display:inline-block" : "display:none"
  document.getElementById("HTPBEnergy").style = (g.HTPshown>=6) ? "display:inline-block" : "display:none"
  document.getElementById("HTPBSupernova").style = (g.HTPshown>=7) ? "display:inline-block" : "display:none"
  if ((g.fastestStardustReset < 1e12) || (g.fastestWormholeReset < 1e12)) {
    document.getElementById("stardustbigtab").style="display:inline-block"
    document.getElementById("stardustDisplay").style="display:inline-block"
    document.getElementById("stardustStatistics").style="display:inline-block"
  } else {
    document.getElementById("stardustbigtab").style="display:none"
    document.getElementById("stardustDisplay").style="display:none"
    document.getElementById("stardustStatistics").style="display:none"
  }
  if (g.fastestWormholeReset < 1e12) {
    document.getElementById("wormholeStatistics").style.visibility="visible"
  } else {
    document.getElementById("wormholeStatistics").style.visibility="hidden"
  }
  g.timePlayed+=deltatime*offlineSpeedup
  g.truetimePlayed=infAdd(g.truetimePlayed,Math.log10(deltatime*offlineSpeedup)+g.tickspeed)
  g.timeThisStardustReset+=deltatime*offlineSpeedup
  g.truetimeThisStardustReset=infAdd(g.truetimeThisStardustReset,Math.log10(deltatime*offlineSpeedup)+g.tickspeed)
  g.timeThisWormholeReset+=deltatime*offlineSpeedup
  g.timeLeft=Number(new Date())
  document.getElementById("timePlayed").innerHTML = timeFormat(g.timePlayed);
  document.getElementById("truetimePlayed").innerHTML = (g.truetimePlayed>300)?infFormat(g.truetimePlayed-7.49909469142)+" years":timeFormat(10**g.truetimePlayed)
  document.getElementById("timeThisStardustReset").innerHTML = timeFormat(g.timeThisStardustReset);
  document.getElementById("truetimeThisStardustReset").innerHTML = (g.truetimeThisStardustReset>300)?infFormat(g.truetimeThisStardustReset-7.49909469142)+" years":timeFormat(10**g.truetimeThisStardustReset)
  document.getElementById("timeThisWormholeReset").innerHTML = timeFormat(g.timeThisWormholeReset);
  document.getElementById("truetimeThisWormholeReset").innerHTML = (g.truetimeThisWormholeReset>300)?infFormat(g.truetimeThisWormholeReset-7.49909469142)+" years":timeFormat(10**g.truetimeThisWormholeReset)
  document.getElementById("fastestStardustReset").innerHTML = timeFormat(g.fastestStardustReset);
  document.getElementById("fastestWormholeReset").innerHTML = timeFormat(g.fastestWormholeReset);

  glowtabs[0][0]=(((g.XAxisCost<g.exoticmatter)&&(g.axisUnlocked>0))||((g.YAxisCost<g.exoticmatter)&&(g.axisUnlocked>1))||((g.ZAxisCost<g.exoticmatter)&&(g.axisUnlocked>2))||((g.WAxisCost<g.exoticmatter)&&(g.axisUnlocked>3))||((g.VAxisCost<g.exoticmatter)&&(g.axisUnlocked>4))||((g.UAxisCost<g.exoticmatter)&&(g.axisUnlocked>5))||((g.TAxisCost<g.exoticmatter)&&(g.axisUnlocked>6))||((g.SAxisCost<g.exoticmatter)&&(g.axisUnlocked>7)))
  glowtabs[0][1]=0
  for (i=0; i<10; i++) if (MasteryE(10+10*i)&&g.masteryRowsUnlocked[i]&&(g.activeMasteries[i]!==9)) glowtabs[0][1]=1
  glowtabs[0][2]=((g.EMSupernova.charges>0)||(Math.min(SupernovaCosts[0][0],SupernovaCosts[0][1])<g.exoticmatter)||(g.KnowledgeSupernova.charges>0)||(Math.min(SupernovaCosts[1][0],SupernovaCosts[1][1])<g.masteryPower))&&g.supernovaUnlocked
  glowtabs[1][0]=((stardustUpgrade1Cost[g.stardustUpgrades[0]]<g.stardust)||(stardustUpgrade2Cost[g.stardustUpgrades[1]]<g.stardust)||(stardustUpgrade3Cost[g.stardustUpgrades[2]]<g.stardust)||(stardustUpgrade4Cost[g.stardustUpgrades[3]]<g.stardust)||(stardustUpgrade5Cost[g.stardustUpgrades[4]]<g.stardust))
  glowtabs[1][1]=(((g.unspentStars>0)||(g.stardust>g.starCost))&&(!(StarE(101)&&StarE(102)&&StarE(103)&&StarE(104))))
  glowtabs[1][2]=((g.darkXAxisCost<g.darkmatter)||(g.darkYAxisCost<g.darkmatter)||(g.darkZAxisCost<g.darkmatter)||(g.darkWAxisCost<g.darkmatter)||(g.darkVAxisCost<g.darkmatter)||(g.darkUAxisCost<g.darkmatter)||(g.darkTAxisCost<g.darkmatter)||(g.darkSAxisCost<g.darkmatter)||(g.darkstarRequirement<g.totaldarkAxis))
  glowtabs[2]=((g.exoticmatter>g.axisAutobuyerCost)&&(g.axisAutobuyerInterval>0.1))
  toggleGlow("mainaxisButton",glowtabs[0][0])
  toggleGlow("masteriesButton",glowtabs[0][1])
  toggleGlow("supernovaButton",glowtabs[0][2])
  toggleGlow("StardustBoostButton",glowtabs[1][0])
  toggleGlow("StarTabButton",glowtabs[1][1])
  toggleGlow("DarkMatterButton",glowtabs[1][2])
  toggleGlow("mainbigtab",glowtabs[0].includes(true))
  toggleGlow("stardustbigtab",glowtabs[1].includes(true))
  toggleGlow("automationbigtab",glowtabs[2])


  // Stardust section
  if (g.stardustUpgrades[1] == 0) {
    document.getElementById("automationbigtab").style="display:none"
  } else {
    document.getElementById("automationbigtab").style="display:inline-block"
  }
  if (g.fastestStardustReset>1e12 && g.exoticmatter<22) {
    document.getElementById("stardustResetButton").style.visibility="hidden"
  } else if (g.pendingstardust<infAdd(g.stardust,0)) {
    document.getElementById("stardustResetButton").style.visibility="visible"
    document.getElementById("stardustResetButton").className = "lockedstardustResetButton"
  } else {
    document.getElementById("stardustResetButton").style.visibility="visible"
    document.getElementById("stardustResetButton").className = "stardustResetButton"
  }
  if (g.pendingstardust<infAdd(g.stardust,0)) {
    stardustExoticMatterReq=((infAdd(infFloor(g.stardust),0)/g.StardustExponent)-g.StardustMultiplier)**2+21
    stardustExoticMatterReqText="(Need "+infFormat(stardustExoticMatterReq,false)+" exotic matter)"
  } else if ((g.pendingstardust>g.stardust)&&(g.pendingstardust<2)) {
    stardustExoticMatterReq=((infAdd(infFloor(g.pendingstardust),0)/g.StardustExponent)-g.StardustMultiplier)**2+21
    stardustExoticMatterReqText="(Next at "+infFormat(stardustExoticMatterReq,false)+" exotic matter)"
  } else {
    stardustExoticMatterReqText=""
  }
  document.getElementById("stardustExoticMatterRequirement").innerHTML = stardustExoticMatterReqText
  document.getElementById("currentStardust").innerHTML = infFormat(g.stardust,false);
  if (g.autosaveIsOn && savecounter > 0) {
    save()
  }
  document.getElementById("pendingStardust").innerHTML = infFormat(infSubtract(Math.max(g.pendingstardust,g.stardust),g.stardust),false)
  g.StardustBoost1=infAdd(0,g.stardust-1)*0.5+infAdd(0,g.stardust)**1.5/10
  document.getElementById("StardustBoost1").innerHTML = infFormat(g.StardustBoost1,true)
  g.StardustBoost2=infAdd(0,Math.log10(normLinearSoftcap(infAdd(g.stardust,0),5,2))-1.12493873661)
  document.getElementById("StardustBoost2").innerHTML = infFormat(infSubtract(g.StardustBoost2,0)+2,true)
  g.StardustBoost3=normLinearSoftcap(infAdd(g.stardust-7,0)**0.7*50*((g.stardustUpgrades[2]>0)?1:0),1000,1)
  document.getElementById("StardustBoost3").innerHTML = normFormat(g.StardustBoost3)
  g.StardustBoost4=(infAdd(g.stardust/20,1)**0.33-1)*((g.stardustUpgrades[2]>1)?1:0)
  document.getElementById("StardustBoost4").innerHTML = (g.StardustBoost4>10?normFormat(g.StardustBoost4):g.StardustBoost4.toFixed(4))
  g.StardustBoost5=(infAdd(g.stardust+6,27)**(2/3)-9)*((g.stardustUpgrades[2]>2)?1:0)
  document.getElementById("StardustBoost5").innerHTML = infFormat(g.StardustBoost5,true)
  g.StardustBoost6=Math.log10(infAdd(g.stardust/5.6,10))**((g.stardustUpgrades[2]>3)?1:0)
  document.getElementById("StardustBoost6").innerHTML = normFormat((g.StardustBoost6-1)*100)
  g.StardustBoost7=Math.log10(infAdd(g.stardust,1))*0.01*((g.stardustUpgrades[2]>4)?1:0)
  document.getElementById("StardustBoost7").innerHTML = infFormat(g.StardustBoost7,true)
  g.StardustBoost8=(Math.log10(infAdd(g.stardust/2,100))**5/32)**((g.stardustUpgrades[2]>5)?1:0)
  document.getElementById("StardustBoost8").innerHTML = normFormat(100*(g.StardustBoost8-1))
  for (i=3;i<=8;i++) toggleTableRow("StardustBoost"+i+"Display",(g.stardustUpgrades[2]>(i-3))?"show":"hide")
  document.getElementById("StardustUpgrade1Cost").innerHTML = infFormat(stardustUpgrade1Cost[g.stardustUpgrades[0]],false)
  document.getElementById("StardustUpgrade1Button").className = (g.stardust < stardustUpgrade1Cost[g.stardustUpgrades[0]])?"lockedaxisbutton":"stardustupgradebutton"
  document.getElementById("StardustUpgrade2Button").className = (g.stardust < stardustUpgrade2Cost[g.stardustUpgrades[1]])?"lockedaxisbutton":"stardustupgradebutton"
  document.getElementById("StardustUpgrade2Tooltip").innerHTML = stardustUpgrade2Tooltip[g.stardustUpgrades[1]]
  document.getElementById("StardustUpgrade2Cost").innerHTML = infFormat(stardustUpgrade2Cost[g.stardustUpgrades[1]],false)
  document.getElementById("StardustUpgrade3Button").className = (g.stardust < stardustUpgrade3Cost[g.stardustUpgrades[2]])?"lockedaxisbutton":"stardustupgradebutton"
  document.getElementById("StardustUpgrade3Cost").innerHTML = infFormat(stardustUpgrade3Cost[g.stardustUpgrades[2]],false)
  document.getElementById("StardustUpgrade4Button").className = (g.stardust < stardustUpgrade4Cost[g.stardustUpgrades[3]])?"lockedaxisbutton":"stardustupgradebutton"
  document.getElementById("StardustUpgrade4Cost").innerHTML = infFormat(stardustUpgrade4Cost[g.stardustUpgrades[3]],false)
  document.getElementById("StardustUpgrade4Tooltip").innerHTML = (g.stardustUpgrades[3]==0)?"You can activate both first row Masteries":(g.stardustUpgrades[3]==4)?"Unlock 2 new rows of Masteries":"Unlock a new row of Masteries"
  document.getElementById("StardustUpgrade5Button").className = (g.stardust < stardustUpgrade5Cost[g.stardustUpgrades[4]])?"lockedaxisbutton":"stardustupgradebutton"
  document.getElementById("StardustUpgrade5Cost").innerHTML = infFormat(stardustUpgrade5Cost[g.stardustUpgrades[4]],false)
  document.getElementById("StardustUpgrade5Tooltip").innerHTML = stardustUpgrade5Tooltip[g.stardustUpgrades[4]]
  document.getElementById("axisAutobuyerToggle").className = (g.axisAutobuyerOn==true)?"automatortoggleon":"automatortoggleoff"
  g.axisAutobuyerCost = Math.round(50*1.05**g.axisAutobuyerUpgrades)
  document.getElementById("axisAutobuyerUpgradeCost").innerHTML = infFormat(g.axisAutobuyerCost,false)
  g.axisAutobuyerInterval=Math.max(0.1,5*0.95**g.axisAutobuyerUpgrades/offlineSpeedup)
  if ((g.stardustUpgrades[1] > 0) && (g.axisAutobuyerOn)) {
    g.axisAutobuyerProgress+=deltatime/g.axisAutobuyerInterval
  }
  if (g.axisAutobuyerProgress > 1) {
    buyMaxAxis()
    g.axisAutobuyerProgress%=1
  }
  document.getElementById("axisAutobuyerInterval").innerHTML = timeFormat(g.axisAutobuyerInterval)
  document.getElementById("axisAutobuyerUpgrade").style = (g.axisAutobuyerInterval>0.1)?"display:inline-block":"display:none"
  document.getElementById("StardustUpgrade1Button").style=(g.stardustUpgrades[0]==4)?"display:none":"display:inline-block"
  document.getElementById("StardustUpgrade2Button").style=(g.stardustUpgrades[1]==9)?"display:none":"display:inline-block"
  document.getElementById("StardustUpgrade3Button").style=(g.stardustUpgrades[2]==6)?"display:none":"display:inline-block"
  document.getElementById("StardustUpgrade4Button").style=(g.stardustUpgrades[3]==5)?"display:none":"display:inline-block"
  document.getElementById("StardustUpgrade5Button").style=(g.stardustUpgrades[4]==7)?"display:none":"display:inline-block"


  // Star section
  g.starCost=(0.30102999566*(12+ExponentialScaling(SuperexpScaling(g.stars,25,2.5),10,0.5)**2))*1.5**Math.floor(g.stars/10)
  document.getElementById("unspentStars").innerHTML = g.unspentStars
  document.getElementById("starCost").innerHTML = infFormat(g.starCost,false)
  for (i=0;i<40;i++) {
    j=11+i+6*Math.floor(i/4)
    if (StarE(j)) {
      document.getElementById("Star"+j).className = "ownedstarbutton"+Math.floor(j/10)
    } else if ((g.unspentStars > 0) && (g.starRow[g.stars-g.unspentStars] == Math.floor(j/10))) {
      document.getElementById("Star"+j).className = "starbutton"
    } else {
      document.getElementById("Star"+j).className = "lockedstarbutton"
    }
  }
  toggleTableRow("StarRow2",(StarE(11)||StarE(12)||StarE(13)||StarE(14))?"show":"hide")
  toggleTableRow("StarRow3",(StarE(21)||StarE(22)||StarE(23)||StarE(24))?"show":"hide")
  toggleTableRow("StarRow4",(StarE(31)||StarE(32)||StarE(33)||StarE(34))?"show":"hide")
  toggleTableRow("StarRow5",(StarE(41)||StarE(42)||StarE(43)||StarE(44))?"show":"hide")
  toggleTableRow("StarRow6",(StarE(51)||StarE(52)||StarE(53)||StarE(54))?"show":"hide")
  toggleTableRow("StarRow7",(StarE(61)||StarE(62)||StarE(63)||StarE(64))?"show":"hide")
  toggleTableRow("StarRow8",(StarE(71)||StarE(72)||StarE(73)||StarE(74))?"show":"hide")
  toggleTableRow("StarRow9",(StarE(81)||StarE(82)||StarE(83)||StarE(84))?"show":"hide")
  toggleTableRow("StarRow10",(StarE(91)||StarE(92)||StarE(93)||StarE(94))?"show":"hide")
  g.Star11Effect = 3*(1-1/Math.log10(infAdd(10,g.exoticmatter)))*(3**StarE(31))*(g.Row9StarEffect**StarE(91))
  document.getElementById("Star11Effect").innerHTML = infFormat(g.Star11Effect,true)
  g.Star12Effect = 3/Math.log10(infAdd(10,g.exoticmatter))*(3**StarE(32))*(g.Row9StarEffect**StarE(92))
  document.getElementById("Star12Effect").innerHTML = infFormat(g.Star12Effect,true)
  g.Star13Effect = 3*(1-1/(1+10**ConvergentSoftcap(g.truetimeThisStardustReset,15,16)/1000))*(3**StarE(33))*(g.Row9StarEffect**StarE(93))
  document.getElementById("Star13Effect").innerHTML = infFormat(g.Star13Effect,true)
  g.Star14Effect = 3/(1+10**ConvergentSoftcap(g.truetimeThisStardustReset,15,16)/1000)*(3**StarE(34))*(g.Row9StarEffect**StarE(94))
  document.getElementById("Star14Effect").innerHTML = infFormat(g.Star14Effect,true)
  g.Star61Effect = LogarithmicSoftcap(infAdd(g.exoticmatter/50,1)**0.6,1000,0.5)
  document.getElementById("Star61Effect").innerHTML = normFormat(g.Star61Effect)
  g.Star62Effect = LogarithmicSoftcap(infAdd(g.exoticmatter/50,1)**0.6,1000,0.5)
  document.getElementById("Star62Effect").innerHTML = normFormat(g.Star62Effect)
  g.Star63Effect = LogarithmicSoftcap(infAdd(g.exoticmatter/50,1)**0.6,1000,0.5)
  document.getElementById("Star63Effect").innerHTML = normFormat(g.Star63Effect)
  g.Star71Effect = 22.5*Math.log10(infAdd(g.masteryPower/Math.sqrt(10),1))
  document.getElementById("Star71Effect").innerHTML = normFormat(g.Star71Effect)
  g.Star72Effect = 1.5*Math.log10(infAdd(fix(g.exoticmatter),1))**2
  document.getElementById("Star72Effect").innerHTML = normFormat(g.Star72Effect)
  g.Star73Effect = 8*Math.log10(infAdd(g.stardust,1))
  document.getElementById("Star73Effect").innerHTML = normFormat(g.Star73Effect)
  g.Star74Effect = 7.5*g.truetimeThisStardustReset
  document.getElementById("Star74Effect").innerHTML = normFormat(g.Star74Effect)
  g.Row9StarEffect = 1+infAdd(g.exoticmatter,1)**0.75/10
  for (i=1;i<5;i++) document.getElementById("Star9"+i+"Effect").innerHTML = normFormat(g.Row9StarEffect)

  // Dark Matter section
  document.getElementById("DarkMatterButton").style=(g.stardustUpgrades[4]>0)?"display:inline-block":"display:none"
  g.darkaxisScalingStart = 8
  g.darkaxisSuperscalingStart = 64
  g.darkMatterFreeAxis=(1+g.darkstars/100)/3
  updateDarkAxisCosts()
  g.totaldarkAxis = g.darkXAxis+g.darkYAxis+g.darkZAxis+g.darkWAxis+g.darkVAxis+g.darkUAxis+g.darkTAxis+g.darkSAxis
  g.realdarkXAxis=g.darkXAxis+g.freedarkXAxis
  g.realdarkYAxis=g.darkYAxis+g.freedarkYAxis
  g.realdarkZAxis=g.darkZAxis+g.freedarkZAxis
  g.realdarkWAxis=g.darkWAxis+g.freedarkWAxis
  g.realdarkVAxis=g.darkVAxis+g.freedarkVAxis
  g.realdarkUAxis=g.darkUAxis+g.freedarkUAxis
  g.realdarkTAxis=g.darkTAxis+g.freedarkTAxis
  g.realdarkSAxis=g.darkSAxis+g.freedarkSAxis
  document.getElementById("darkMatterDisplay").innerHTML = infFormat(g.darkmatter,false);
  document.getElementById("darkMatterPerSec").innerHTML = infFormat(g.darkmatterPerSec,false)
  document.getElementById("darkMatterFreeAxis1").innerHTML = normFormat(Math.max(1,1/g.darkMatterFreeAxis))
  document.getElementById("darkMatterFreeAxis2").innerHTML = normFormat(Math.max(1,g.darkMatterFreeAxis))
  document.getElementById("DarkXAxisEffect").innerHTML = infFormat(g.darkXAxisEffect,true);
  document.getElementById("DarkXAxisCost").innerHTML = infFormat(g.darkXAxisCost,false);
  document.getElementById("DarkXAxisAmount").innerHTML = (g.freedarkXAxis > 0) ? g.darkXAxis+" + "+normFormat(g.freedarkXAxis) : g.darkXAxis;
  document.getElementById("DarkYAxisEffect").innerHTML = infFormat(g.darkYAxisEffect,true);
  document.getElementById("DarkYAxisCost").innerHTML = infFormat(g.darkYAxisCost,false);
  document.getElementById("DarkYAxisAmount").innerHTML = (g.freedarkYAxis > 0) ? g.darkYAxis+" + "+normFormat(g.freedarkYAxis) : g.darkYAxis;
  document.getElementById("DarkZAxisEffect").innerHTML = infFormat(g.darkZAxisEffect,true);
  document.getElementById("DarkZAxisCost").innerHTML = infFormat(g.darkZAxisCost,false);
  document.getElementById("DarkZAxisAmount").innerHTML = (g.freedarkZAxis > 0) ? g.darkZAxis+" + "+normFormat(g.freedarkZAxis) : g.darkZAxis;
  document.getElementById("DarkWAxisEffect").innerHTML = infFormat(g.darkWAxisEffect,true);
  document.getElementById("DarkWAxisCost").innerHTML = infFormat(g.darkWAxisCost,false);
  document.getElementById("DarkWAxisAmount").innerHTML = (g.freedarkWAxis > 0) ? g.darkWAxis+" + "+normFormat(g.freedarkWAxis) : g.darkWAxis;
  document.getElementById("DarkVAxisEffect").innerHTML = normFormat(g.darkVAxisEffect*100);
  document.getElementById("DarkVAxisCost").innerHTML = infFormat(g.darkVAxisCost,false);
  document.getElementById("DarkVAxisAmount").innerHTML = (g.freedarkVAxis > 0) ? g.darkVAxis+" + "+normFormat(g.freedarkVAxis) : g.darkVAxis;
  document.getElementById("DarkUAxisEffect").innerHTML = infFormat(g.darkUAxisEffect,true);
  document.getElementById("DarkUAxisCost").innerHTML = infFormat(g.darkUAxisCost,false);
  document.getElementById("DarkUAxisAmount").innerHTML = (g.freedarkUAxis > 0) ? g.darkUAxis+" + "+normFormat(g.freedarkUAxis) : g.darkUAxis;
  document.getElementById("DarkTAxisEffect").innerHTML = infFormat(g.darkTAxisEffect,true);
  document.getElementById("DarkTAxisCost").innerHTML = infFormat(g.darkTAxisCost,false);
  document.getElementById("DarkTAxisAmount").innerHTML = (g.freedarkTAxis > 0) ? g.darkTAxis+" + "+normFormat(g.freedarkTAxis) : g.darkTAxis;
  document.getElementById("DarkSAxisEffect").innerHTML = Math.floor(g.darkSAxisEffect*10000)/10000;
  document.getElementById("DarkSAxisCost").innerHTML = infFormat(g.darkSAxisCost,false);
  document.getElementById("DarkSAxisAmount").innerHTML = (g.freedarkSAxis > 0) ? g.darkSAxis+" + "+normFormat(g.freedarkSAxis) : g.darkSAxis;
  document.getElementById("DarkXAxisButton").className=(g.darkmatter<g.darkXAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkYAxisButton").className=(g.darkmatter<g.darkYAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkZAxisButton").className=(g.darkmatter<g.darkZAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkWAxisButton").className=(g.darkmatter<g.darkWAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkVAxisButton").className=(g.darkmatter<g.darkVAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkUAxisButton").className=(g.darkmatter<g.darkUAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkTAxisButton").className=(g.darkmatter<g.darkTAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  document.getElementById("DarkSAxisButton").className=(g.darkmatter<g.darkSAxisCost)?"lockedaxisbutton":"darkaxisbutton"
  g.darkstarScalingStart=48
  updateDarkStarCost()
  document.getElementById("darkstarButton").className = (g.totaldarkAxis>=g.darkstarRequirement)?"darkstarbutton":"lockeddarkstarbutton"
  document.getElementById("darkstarDisplay").innerHTML = g.darkstars
  document.getElementById("nextDarkStarAxis").innerHTML = axisCodes[g.darkstars%8]
  document.getElementById("darkstarProgress").innerHTML = g.totaldarkAxis
  document.getElementById("darkstarRequirement").innerHTML = normFormat(g.darkstarRequirement)


  // Energy section
  g.energyTypesUnlocked=Math.max(0,Math.min(6,g.stardustUpgrades[4]-1))
  if (g.energyTypesUnlocked>0) {
    document.getElementById("EnergyButton").style="display:inline-block"
    g.darkEnergy+=g.darkEnergyPerSec*deltatime
  } else {
    document.getElementById("EnergyButton").style="display:none"
  }
  if (isNaN(g.darkEnergy)) {
    g.darkEnergy=0
    g.darkEnergyPerSec=0
  }
  g.darkEnergyPerSec=Math.log10(infAdd(g.exoticmatter,1))*0.9+g.energySpeedMult-Math.log10(200)
  g.darkEnergyPerSec=10**ConvergentSoftcap(g.darkEnergyPerSec,275,300)*offlineSpeedup
  g.darkEnergyEffect=((g.darkEnergy>g.exoticmatter) && (g.exoticmatter>0)) ? 1+Math.log10(g.darkEnergy/g.exoticmatter)*g.energyEffectBoost/3 : 1
  document.getElementById("darkEnergyDisplay").innerHTML = infFormat(g.darkEnergy,false)
  document.getElementById("darkEnergyPerSec").innerHTML = infFormat(g.darkEnergyPerSec,true)
  document.getElementById("darkEnergyEffect").innerHTML = g.darkEnergyEffect.toFixed(4)
  if (g.energyTypesUnlocked>1) {
    document.getElementById("StelliferousEnergy").style.visibility="visible"
    g.stelliferousEnergy+=g.stelliferousEnergyPerSec*deltatime
  } else {
    document.getElementById("StelliferousEnergy").style.visibility="hidden"
  }
  if (isNaN(g.stelliferousEnergy)) {
    g.stelliferousEnergy=0
    g.stelliferousEnergyPerSec=0
  }
  g.stelliferousEnergyPerSec=Math.log10(infAdd(g.stardust,1))*0.9+g.energySpeedMult-Math.log10(350)
  g.stelliferousEnergyPerSec=10**ConvergentSoftcap(g.stelliferousEnergyPerSec,275,300)*offlineSpeedup
  g.stelliferousEnergyEffect=((g.stelliferousEnergy>g.stardust) && (g.stardust>0)) ? 1+Math.log10(g.stelliferousEnergy/g.stardust)*g.energyEffectBoost/3 : 1
  document.getElementById("stelliferousEnergyDisplay").innerHTML = infFormat(g.stelliferousEnergy,false)
  document.getElementById("stelliferousEnergyPerSec").innerHTML = infFormat(g.stelliferousEnergyPerSec,true)
  document.getElementById("stelliferousEnergyEffect").innerHTML = g.stelliferousEnergyEffect.toFixed(4)
  if (g.energyTypesUnlocked>2) {
    document.getElementById("GravitationalEnergy").style.visibility="visible"
    g.gravitationalEnergy+=g.gravitationalEnergyPerSec*deltatime
  } else {
    document.getElementById("GravitationalEnergy").style.visibility="hidden"
  }
  if (isNaN(g.gravitationalEnergy)) {
    g.gravitationalEnergy=0
    g.gravitationalEnergyPerSec=0
  }
  g.gravitationalEnergyPerSec=Math.log10(infAdd(g.darkmatter,1))*0.9+g.energySpeedMult-Math.log10(500)
  g.gravitationalEnergyPerSec=10**ConvergentSoftcap(g.gravitationalEnergyPerSec,275,300)*offlineSpeedup
  g.gravitationalEnergyEffect=((g.gravitationalEnergy>g.darkmatter) && (g.darkmatter>0)) ? 1+Math.log10(g.gravitationalEnergy/g.darkmatter)*g.energyEffectBoost/3 : 1
  document.getElementById("gravitationalEnergyDisplay").innerHTML = infFormat(g.gravitationalEnergy,false)
  document.getElementById("gravitationalEnergyPerSec").innerHTML = infFormat(g.gravitationalEnergyPerSec,true)
  document.getElementById("gravitationalEnergyEffect").innerHTML = g.gravitationalEnergyEffect.toFixed(4)
  if (g.energyTypesUnlocked>3) {
    document.getElementById("SpatialEnergy").style.visibility="visible"
    g.spatialEnergy+=g.spatialEnergyPerSec*deltatime
  } else {
    document.getElementById("SpatialEnergy").style.visibility="hidden"
  }
  if (isNaN(g.spatialEnergy)) {
    g.spatialEnergy=0
    g.spatialEnergyPerSec=0
  }
  g.spatialEnergyPerSec=Math.log10(infAdd(g.XAxis,1))*0.9+g.energySpeedMult-Math.log10(5e4)
  g.spatialEnergyPerSec=10**ConvergentSoftcap(g.spatialEnergyPerSec,275,300)*offlineSpeedup
  g.spatialEnergyEffect=((g.spatialEnergy>Math.log10(Math.max(g.XAxis,2))) && (g.XAxis>1)) ? 1+Math.log10(g.spatialEnergy/Math.log10(g.XAxis))*g.energyEffectBoost*2 : 1
  document.getElementById("spatialEnergyDisplay").innerHTML = infFormat(g.spatialEnergy,true)
  document.getElementById("spatialEnergyPerSec").innerHTML = infFormat(g.spatialEnergyPerSec,true)
  document.getElementById("spatialEnergyEffect").innerHTML = g.spatialEnergyEffect.toFixed(4)
  if (g.energyTypesUnlocked>4) {
    document.getElementById("NeuralEnergy").style.visibility="visible"
    g.neuralEnergy+=g.neuralEnergyPerSec*deltatime
  } else {
    document.getElementById("NeuralEnergy").style.visibility="hidden"
  }
  if (isNaN(g.neuralEnergy)) {
    g.neuralEnergy=0
    g.neuralEnergyPerSec=0
  }
  g.neuralEnergyPerSec=Math.log10(infAdd(g.masteryPower,1))*0.9+g.energySpeedMult-Math.log10(250)
  g.neuralEnergyPerSec=10**ConvergentSoftcap(g.neuralEnergyPerSec,275,300)*offlineSpeedup
  g.neuralEnergyEffect=((g.neuralEnergy>g.masteryPower) && (g.masteryPower>0)) ? 1+Math.log10(g.neuralEnergy/g.masteryPower)*g.energyEffectBoost/3 : 1
  document.getElementById("neuralEnergyDisplay").innerHTML = infFormat(g.neuralEnergy,false)
  document.getElementById("neuralEnergyPerSec").innerHTML = infFormat(g.neuralEnergyPerSec,true)
  document.getElementById("neuralEnergyEffect").innerHTML = g.neuralEnergyEffect.toFixed(4)
  if (g.energyTypesUnlocked>5) {
    document.getElementById("MetaEnergy").style.visibility="visible"
    g.metaEnergy+=g.metaEnergyPerSec*deltatime
  } else {
    document.getElementById("MetaEnergy").style.visibility="hidden"
  }
  if (isNaN(g.metaEnergy)) {
    g.metaEnergy=0
    g.metaEnergyPerSec=0
  }
  g.metaEnergyPerSec=Math.log10(infAdd(g.darkEnergy,1))+Math.log10(infAdd(g.stelliferousEnergy,1))+Math.log10(infAdd(g.gravitationalEnergy,1))+Math.log10(infAdd(g.spatialEnergy,1))+Math.log10(infAdd(g.neuralEnergy,1))+Math.log10(infAdd(g.metaEnergy,1))
  g.metaEnergyPerSec=g.metaEnergyPerSec*0.1+g.energySpeedMult-Math.log10(25)
  g.metaEnergyPerSec=10**ConvergentSoftcap(g.metaEnergyPerSec,275,300)*offlineSpeedup
  g.metaEnergyEffect=1+Math.log10(infAdd(g.metaEnergy,1))*g.energyEffectBoost/3*(g.energyTypesUnlocked>5)
  document.getElementById("metaEnergyDisplay").innerHTML = infFormat(g.metaEnergy,false)
  document.getElementById("metaEnergyPerSec").innerHTML = infFormat(g.metaEnergyPerSec,true)
  document.getElementById("metaEnergyEffect").innerHTML = g.metaEnergyEffect.toFixed(4)
  for (i=0;i<6;i++) {
    type=["dark","stelliferous","gravitational","spatial","neural","meta"]
    if (g.energyTypesUnlocked<i) g[type[i]+"Energy"]=0
  }


  // Supernova section
  if (g.stars>=24) g.supernovaUnlocked = true
  document.getElementById("supernovaButton").style.display = (g.supernovaUnlocked)?"inline-block":"none"

  document.getElementById("EMSupernovaCharges").innerHTML = g.EMSupernova.charges+" / "+g.EMSupernova.maxCharges
  fillpercentage = 100*g.EMSupernova.charges/g.EMSupernova.maxCharges
  document.getElementById("EMSupernovaCharges").style = "width:130px;height:130px;border-radius:20px;background-image:linear-gradient(0deg,#00ff00 0%,#00ff00 "+fillpercentage+"%,#999999 0%,#999999)"
  g.EMSupernova.maxCharges=1+g.EMSupernova.upgrade1
  g.EMSupernova.power=1.05+0.01*g.EMSupernova.upgrade2
  SupernovaCosts[0] = [50000*2**normSimplex(g.EMSupernova.upgrade1,2),25000*Math.floor(2**g.EMSupernova.upgrade2**1.3)]
  document.getElementById("EMSupernovaReward").innerHTML = infFormat(g.exoticmatterPerSec*g.EMSupernova.power,false)
  for (i=1;i<3;i++) document.getElementById("EMSupernovaCost"+i).innerHTML = infFormat(SupernovaCosts[0][i-1],false)

  document.getElementById("Supernova2Locked").style.display = (g.KnowledgeSupernova.unlocked)?"none":"inline-block"
  document.getElementById("Supernova2Unlocked").style.display = (g.KnowledgeSupernova.unlocked)?"inline-block":"none"
  document.getElementById("UnlockSupernova2").innerHTML = "Unlock this Supernova for "+infFormat(65,false)+" mastery power"
  document.getElementById("KnowledgeSupernovaCharges").innerHTML = g.KnowledgeSupernova.charges+" / "+g.KnowledgeSupernova.maxCharges
  fillpercentage = 100*g.KnowledgeSupernova.charges/g.KnowledgeSupernova.maxCharges
  document.getElementById("KnowledgeSupernovaCharges").style = "width:130px;height:130px;border-radius:20px;background-image:linear-gradient(0deg,#ff0099 0%,#ff0099 "+fillpercentage+"%,#999999 0%,#999999)"
  g.KnowledgeSupernova.maxCharges=1+g.KnowledgeSupernova.upgrade1
  g.KnowledgeSupernova.power=1.05+0.01*g.KnowledgeSupernova.upgrade2
  SupernovaCosts[1] = [Math.floor(75*1.1**normSimplex(g.KnowledgeSupernova.upgrade1,3)),Math.floor(70*1.1**g.KnowledgeSupernova.upgrade2**2)]
  document.getElementById("KnowledgeSupernovaReward").innerHTML = infFormat(g.masteryPower*g.KnowledgeSupernova.power,false)
  for (i=1;i<3;i++) document.getElementById("KnowledgeSupernovaCost"+i).innerHTML = infFormat(SupernovaCosts[1][i-1],false)


  // Incrementer section - this comes last because otherwise resets don't work properly
  for (i=1; i<=11; i++) {
    updateStat(i)
  }
  incrementExoticMatter(g.exoticmatterPerSec+Math.log10(deltatime))
  if (g.masteryRowsUnlocked[0]==1) g.masteryPower=infAdd(g.masteryPower,g.masteryPowerPerSec+Math.log10(deltatime))
  if (g.stardustUpgrades[4]>0) g.darkmatter=infAdd(g.darkmatter,g.darkmatterPerSec+Math.log10(deltatime))

  for (i=0; i<g.length; i++) {
    fixable=Object.keys(g)[i]
    if (isNaN(fixable)) Object.keys(g)[i] = fixable
  }
}, 50);

function ProgressBar() {
  if (g.masteryRowsUnlocked[0]==0) {
    progressbarvalue = 10**Math.min(g.exoticmatter-g.XAxisCost,0)
    g.progressbartooltip = "Progress to Masteries: "+normFormat(progressbarvalue*100)+"% (Need an X Axis)"
  } else if (g.masteryRowsUnlocked[1]==0) {
    progressbarvalue = 10**Math.min(g.exoticmatter-6,0)
    g.progressbartooltip = "Progress to the next row of Masteries: "+normFormat(progressbarvalue*100)+"% (Need "+infFormat(6)+" exotic matter)"
  } else if (g.masteryRowsUnlocked[2]==0) {
    progressbarvalue = Math.max(0,g.exoticmatter)/17
    g.progressbartooltip = "Progress to the next row of Masteries: "+normFormat(progressbarvalue*100)+"% (Need "+infFormat(17)+" exotic matter)"
  } else if (g.masteryRowsUnlocked[3]==0) {
    progressbarvalue = Math.max(0,g.exoticmatter)/22
    g.progressbartooltip = "Progress to Stardust and the next row of Masteries: "+normFormat(progressbarvalue*100)+"% (Need "+infFormat(22)+" exotic matter)"
  } else if (g.stardustUpgrades[4] < 2) {
    progressbarvalue = 0
    g.progressbartooltip = "No new aspects detected. "+"Perhaps you need something else.".bold().fontcolor("#00ffff")
  } else if (g.supernovaUnlocked == false) {
    progressbarvalue = g.stars/24
    g.progressbartooltip = "Progress to Supernova: "+normFormat(progressbarvalue*100)+"% (Need 24 stars)"
  } else {
    progressbarvalue = 1
    g.progressbartooltip = "All features unlocked!"
  }
  document.getElementById("progress").innerHTML = g.progressbartooltip
  document.getElementById("progressBar").value = fix(progressbarvalue)
}
function save() {
  localStorage.setItem("save",JSON.stringify(g)); 
}
function load(type) {
  if (type=="normal") {
    var savegame = JSON.parse(localStorage.getItem("save"));
  } else if (type=="import") {
    var savegame = JSON.parse(atob(prompt("Copy and paste your save file here:")))
  }
  if ((typeof savegame == "object") && (savegame !== null) && (savegame.stardust !== undefined)) {
    vars=Object.keys(g)
    for (i=0; i<vars.length; i++) {
      if (savegame[vars[i]] !== undefined) g[vars[i]] = savegame[vars[i]]
    }
    var timeSpentOffline = Number(new Date())-g.timeLeft
    if ((timeSpentOffline>1000)&&(g.offlineSpeedupOn)) {
      offlineTime=g.offlineSpeedupLength
      baseOfflineSpeedup=1+(timeSpentOffline/g.offlineSpeedupLength/1000)
    }
  }
  savecounter++
}
function exportSave() {
  save()
  navigator.clipboard.writeText(btoa(localStorage.getItem("save")))
  prompt("Your save has automatically been copied to the clipboard, but if that did not work you can copy it from here:",btoa(localStorage.getItem("save")))
}
function wipeSave() {
  let numa = Math.floor(50*3**Math.random())
  let numb = Math.floor(50*3**Math.random())
  let answer = numa*numb
  let confirm = prompt("To confirm that you want to wipe your save, answer this question: What is "+numa+"× "+numb+"?")
  if (confirm==answer) {
    g.autosaveIsOn=false
    localStorage.removeItem("save")
    location.reload()
  } else {
    alert("Incorrect answer, wiping did not proceed.")
  }
}
function toggle(x) {
   g[x]=!g[x]
}
function multitoggle(variable,options) {
  g[variable]=options[(options.indexOf(g[variable])+1)%options.length]
}
