const newsSupport = {
  universeSize:function(){
    let array = axisCodes.map(x=>[x,"dark"+x]).flat().map(x=>realAxis(x))
    let num = array.map(x => x.max(1)).reduce((x,y)=>x.mul(y))
    let dimension = array.map(x=>x.eq(0)?0:1).reduce((x,y)=>x+y)
    if (dimension == 0) return "1. Just 1. No dimensions. Buy an axis to get a dimension!"
    return num.format(0)+" m"+(dimension==1?"":("<sup>"+dimension+"</sup>"))+(num.gt(c.inf)?"":(". As an ordinary number, that is "+numword(num.toNumber())+" metres"+(dimension==1?".":dimension==2?" squared.":dimension==3?"cubed.":(" to the power of "+numword(dimension)))))
  },
  nodeDocumentary(){
    let list = document.getElementsByTagName("*")
    let node = list[Math.floor(list.length*Math.random())]
    let type = node.tagName
    let id = node.id
    let parentType = (node.parentElement==null)?null:node.parentElement.tagName
    let styles = Array.from(node.style)
    let children = node.children
    let out = "In the game there are "+numword(list.length)+" HTML nodes. Every one of these nodes is competing for the undivided attention of the gameloop. The gameloop, being a just and merciful function, distributes to each node a fair share of lag to unleash upon the unfortunate device which has to process all this. "
    out += "Let us now take a closer look at one such node - this humble "+type+" node"
    if ((id == "") && (styles.length == 0)) {
      out += " has neither an ID, nor any CSS properties, but despite its difficult station in life it diligently carries out its duty with an unwavering determination."
    } else if (id == "") {
      out += " may lack an ID, but it is the proud bearer of "+numword(styles.length)+" CSS propert"+(styles.length==1?"y":"ies")+": "+Array.joinWithAnd(styles)+"."
    } else if (styles.length == 0) {
      out+= " does not have any CSS properties, but at least it is lucky enough to have been given the ID \""+id+"\"."
    } else {
      out += " is one of the privileged few to have both an ID, namely \""+id+"\", and "+numword(styles.length)+" CSS propert"+(styles.length==1?"y":"ies")+": "+Array.joinWithAnd(styles)+"."
    }
    if (parentType == null) {
      out += "But what really makes this node stand out, is that it is the very first node to be created of them all - it has neither a parent, nor a mother-in-law. What it does have is "+numword(children.length)+" child"+(children==1?"":"ren")+" - "+Array.joinWithAnd(Array.from(children).map(x=>x.tagName))+" - who are vitally important to the functioning of the game itself."
    } else {
      if (children.length>0) out += " It is happy to have a "+parentType+" parent - perhaps less so a "+list[Math.floor(list.length*Math.random())].tagName+" mother-in-law - and "+numword(children.length)+" child"+(children==1?"":"ren")+" named "+Array.joinWithAnd(Array.from(children).map(x=>x.tagName))+"."
      else out += " Although it never did create any children, it is happy to at least have a "+parentType+" parent - ther"
    }
    out += " So, now you know more about the ecosystem of nodes upon which the game is reliant. More documentaries by Davy Atombra only at UTQP!"
    return out
  },
  timezone() {
    let offset = new Date().getTimezoneOffset()
    if (offset == 0) return ""
    return (offset<0?"+":"-")+Math.floor(Math.abs(offset)/60)+((offset%60==0)?"":(":"+String(Math.abs(offset)%60).padStart(2,"0")))
  },
  phishing(){popup({text:"alemaninc needs your help! Will you help alemaninc?",buttons:[["Yes","newsSupport.phishing1()"],["No",""]]})},
  phishing1(){popup({text:"To help alemaninc, answer the following five questions:<br>[1] How old are you?",input:"",buttons:[["Submit","newsSupport.phishing2()"]]})},
  phishing2(){popup({text:"[2] What is your full legal name?",input:"",buttons:[["Submit","newsSupport.phishing3()"]]})},
  phishing3(){popup({text:"[3] What is your Discord username?",input:"",buttons:[["Submit","newsSupport.phishing4()"]]})},
  phishing4(){popup({text:"[4] What is your house address?",input:"",buttons:[["Submit","newsSupport.phishing5()"]]})},
  phishing5(){popup({text:"[5] And finally, what is your credit card number?",input:"",buttons:[["Submit","popup({text:'Thank you for helping alemaninc!',buttons:[['Close','']]});addSecretAchievement(26)"]]})}
}
const newsList = [
  {text:"This is not an <i>Antimatter Dimensions</i> clone."},
  {text:"What, were you expecting a new sticker? Well, too bad..."},
  {text:"Do you want to be an <i>Exotic Matter Dimensions</i> beta tester? Well, what if I told you that <b>all</b> players are testers?"},
  {text:"If you join the Discord server alemaninc will be super happy! You should make alemaninc happy."},
  {text:"The R axis is a lie.",get weight(){return axisUnlocked()>7?1:0}},
  {text:"You do know you can't Stardust reset in -1 seconds, right?",get weight(){return Math.max(0,Math.min(1,2-g.fastestStardustReset*10))}},
  {get text(){return "More than "+BEformat(c.inf)+" exotic matter? What is this foul heresy?"},get weight(){return g.exoticmatter.gt(c.inf)?1:0}},
  {get text(){return BEformat(g.exoticmatter)+" exotic matter? That's rookie numbers."},get weight(){return g.ownedAchievements.length/achievement.all.length<0.9?1:0}},
  {text:"Help! Help! Help! Help! I bought an axis and it's producing exotic matter and I don't know how to stop it!",get weight(){return totalAxis("normal").eq(0)?0:1}},
  {get text(){return "If you could write 3 digits of your exotic matter amount per second, it would take you "+timeFormat(g.exoticmatter.log10().floor().add(1).div(3))+" to write it out. That's... not as long as you'd like to think."},get weight(){return g.exoticmatter.add(1).log2().div(1024).min(1).toNumber()}},
  {text:"This news message is 1000× rarer than the others.",weight:1e-3},
  {text:"You just won a small prize in the lottery.",weight:1e-4},
  {text:"You just won a medium prize in the lottery.",weight:1e-5},
  {text:"You just won a large prize in the lottery.",weight:1e-6},
  {text:"You just won a very large prize in the lottery.",weight:1e-7},
  {text:"You just won a very extremely large prize in the lottery.",weight:1e-8},
  {text:"You just won a huge prize in the lottery.",weight:1e-9},
  {text:"You just won a massive prize in the lottery.",weight:1e-10},
  {text:"You just won the lottery.",weight:1e-11},
  {text:"This news message is 1,000,000,000,000× rarer than the others.",weight:1e-12},
  {text:"<a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" target=\"_blank\" onClick=\"addSecretAchievement(25)\" style=\"color:inherit;text-decoration:none\">Click this for a secret achievement.</a>"},
  {text:"What is a Microphone? (1 point) <span style=\"margin-left:30px\">[A] true</span> <span style=\"margin-left:30px\">[B] false</span>"},
  {text:"If I should die, think only this of me, that 𝕍4.0 will never come to be. But if I should take a break temporarily, don't think very much of me, really."},
  {text:"What's an OMCCDV, you ask? Only xhwzwka knows.",get weight(){return AchievementE(413)?1:0}},
  {text:"\"Incredibly slow start, surprised there isn't something to speed this up\" - alpha tester"},
  {text:"This game has no bugs, only unintended features.",get weight(){return g.version%1000==0?0:1}},  // if there have been bugfixes in the current release
  {get text(){return "Fact: the size of your universe is "+newsSupport.universeSize()+"."},get weight(){return totalAxis("normal").eq(0)?0:1}},
  {text:"How dare Hevipelle copy us."},
  {get text(){return "Your randomly generated number is: "+(ranint(10,1008,true)-9)+"! If it is greater than 1000 you are very lucky."}},
  {text:"This is just a theory, a game theory."},
  {get text(){return "With this release we are happy to bring you the last release of "+(new Date().getUTCFullYear()+(Math.random()<0.5?1:-1))}},
  {get text(){return "There are "+numword(newsList.length)+" news items in the current release. Can you catch them all?"}},
  {get text(){return "alemaninc can still see you. alemaninc can still hear you. alemaninc knows you opened the game exactly "+timeFormat(timeSinceGameOpened)+" ago."},get weight(){return Math.min(1,timeSinceGameOpened/1000)}},
  {text:"Le Fishe au Chocolat. *cue French music*"},
  {text:"<span onClick=\"g.newsTickerActive=false;randomNewsItem();addSecretAchievement(27)\">Click this if you read too much news.</span>"},
  {text:"The first study's always free",get weight(){return StudyE(1)||g.studyCompletions[1]>0?1:0}},
  {text:"Click the next message if you can travel through time."},
  {text:"We all know about stardust. But every stardust is related in some way. Those stardusts you 'spent' had families. You monster.",get weight(){return g.stardustUpgrades.reduce((x,y)=>x+y)==0?0:1}},
  {get text(){return "Fact: your current exotic matter is ^"+Decimal.div(g.exoticmatter.log10(),g.totalexoticmatter.log10()).toFixed(5)+" of all the exotic matter you have ever produced."},get weight(){return g.exoticmatter.gt(1e100)?1:0}},
  {text:"This ticker could be yours. Join the Discord to suggest what it should be!"},
  {text:"Fact: this news ticker can only appear first.",get weight(){return timeSinceGameOpened<5?1:0}},
  {get text(){return "Ah, a fellow "+g.colortheme+" theme user. I see you have impeccable taste."}},
  {text:"¿sᴉɥʇ pɐǝɹ noʎ pᴉp ʍoH"},
  {text:"Work it, make it, do it, makes us, harder, better, faster, stronger, more than, hour, hour, never, ever, after, work is, over"},
  {text:"According to all known laws of motion, there is no way exotic matter should be able to exist. Its density is too small to get its fat little particles off the whiteboard. The exotic matter, of course, exists anyway, because exotic matter doesn't care what theoretical physicists think is impossible."},
  {text:"If you read this I hope you have a good day."},
  {get text(){return "<span style=\"padding-left:3000px\">Did you notice the news ticker being empty for around "+timeFormat(3000/g.newsTickerSpeed)+"?</span>"}},
  {get text(){return "So, you've destroyed "+g.TotalWormholeResets+" universes with wormholes... but when will you actually go <i>inside</i> one?"},get weight(){return g.TotalWormholeResets>1?1:0}},
  {text:"<span style=\"font-size:4px;opacity:0.25\">Just sneaking by, don't mind me...</span>"},
  {get text(){return newsSupport.nodeDocumentary()}},
  {get text(){return "alemaninc will now proceed to guess your timezone.<span style=\"padding-left:250px\"></span>Are you in UTC"+newsSupport.timezone()+"?"}},
  {get year(){return new Date().getFullYear()},get month(){return new Date().getMonth()+1},get longMonth(){return String(new Date().getMonth()+1).padStart(2,"0")},get day(){return new Date().getDate()},get longDay(){return String(new Date().getDate()).padStart(2,"0")},get text(){return "If you are in England, the date is "+this.day+"/"+this.month+"/"+this.year+". If you are in America, the date is "+this.month+"/"+this.day+"/"+this.year+". If you are in Sweden, the date is "+this.year+"-"+this.longMonth+"-"+this.longDay+". If you are in Poland, the date is "+this.day+" "+roman(this.month).toLowerCase()+" "+this.year+". If you are in xhwzwka's to-do list, the date is "+this.year+"-"+this.longDay+"-"+this.longMonth+". If you are in Microsoft Excel, the date is "+(Math.floor(Math.floor(Date.now()/86400000))+25569)+". If you are on Mount Ebott, the date is "+Math.floor(this.year/10)+"X. If you are in the browser, the date is "+(new Date().toString())+"."}},
  {text:"Discovery №1: The planets move.",get weight(){return g.totalDiscoveries.gt(0)?0.1:0}},
  {text:"Discovery №2: Earth moves.",get weight(){return g.totalDiscoveries.gt(1)?0.1:0}},
  {text:"Discovery №3: C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → 6H<sub>2</sub>O + 6CO<sub>2</sub> (+ energy)",get weight(){return g.totalDiscoveries.gt(2)?0.1:0}},
  {text:"Discovery №4: 6H<sub>2</sub>O + 6CO<sub>2</sub> → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub>",get weight(){return g.totalDiscoveries.gt(3)?0.1:0}},
  {text:"Discovery №5: Atom + atom = molecule.",get weight(){return g.totalDiscoveries.gt(4)?0.1:0}},
  {text:"Discovery №6: Mass ÷ mole = 6.02214076 × 10<sup>23</sup>",get weight(){return g.totalDiscoveries.gt(5)?0.1:0}},
  {text:"Discovery №7: The continents move.",get weight(){return g.totalDiscoveries.gt(6)?0.1:0}},
  {text:"Discovery №8: Playing this game is a hazard to the aquatic environment.",get weight(){return g.totalDiscoveries.gt(7)?0.1:0}},
  {text:"<s>Discovery №9: Evolution is sorcery made up by communists.</s><span style=\"padding-left:100px\"></span>The 9th Discovery doesn't exist.",get weight(){return g.totalDiscoveries.gt(8)?0.1:0}},
  {text:"Discovery №10: Genes can jump.",get weight(){return g.totalDiscoveries.gt(9)?0.1:0}},
  {text:"Discovery №11: DNA is a 🧬 double helix.",get weight(){return g.totalDiscoveries.gt(10)?0.1:0}},
  {text:"Discovery №12: He who is a diabetic but forgets to take their insulin shall be condemned to a slow and certain death.",get weight(){return g.totalDiscoveries.gt(11)?0.1:0}},
  {text:"Discovery №13: X-rays are able to penetrate opaque black paper wrapped around a cathode ray tube, causing a nearby table to glow with fluorescence.",get weight(){return g.totalDiscoveries.gt(12)?0.1:0}},
  {text:"Discovery №14: If you drop a metric ton of bricks and a metric ton of feathers off a building, they will experience the same velocity. If you drop a metric ton of bricks and an imperial ton of bricks off a building, they too will experience the same velocity.",get weight(){return g.totalDiscoveries.gt(13)?0.1:0}},
  {text:"Discovery №15: c = (E ÷ m)<sup>0.5</sup>",get weight(){return g.totalDiscoveries.gt(14)?0.1:0}},
  {text:"Discovery №16: You should go make a Discovery in real life.",get weight(){return g.totalDiscoveries.gt(15)?0.1:0}},
  {text:"<span onClick=\"newsSupport.phishing()\">🎣<span style=\"padding-left:150px\"></span>Look, a phishing rod! You should click it.</span>"},
]
var newsOrder = []
function randomNewsItem() {
  if (newsOrder.length == 0) newsOrder = shuffle(countTo(newsList.length,true))
  let index
  while (true) {
    index = newsOrder.splice(0,1)
    if (newsList[index].weight == undefined) break
    if (newsList[index].weight>Math.random()) break
  }
  return newsList[index].text
}
var currentNewsOffset = -100