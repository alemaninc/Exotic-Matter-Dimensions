const newsSupport = {
  universeSize:function(){
    let array = fullAxisCodes.map(x=>realAxis(x))
    let num = array.map(x => x.max(1)).reduce((x,y)=>x.mul(y))
    let dimension = array.map(x=>x.eq(0)?0:1).reduce((x,y)=>x+y)
    if (dimension == 0) return "1. Just 1. No dimensions. Buy an axis to get a dimension!"
    return num.format(0)+" m"+(dimension==1?"":("<sup>"+dimension+"</sup>"))+". In words, that is "+(num.gt(c.inf)?"Infinity":numword(num.toNumber()))+" "+(dimension<11?["metres","square metres","cubic metres","quartic metres","quintic metres","sextic metres","septic metres","octic metres","nonic metres","decic metres"][dimension-1]:("metres to the power of "+numword(dimension)))
  },
  nodeDocumentary:function(){
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
      else out += " Although it never did create any children, it is happy to at least have a "+parentType+" parent - all too often it hears the horror stories of orphaned nodes forced to fend for themselves in the most hostile environment of them all - the World Wide Web."
    }
    out += " Anyways, now you know more about the ecosystem of nodes upon which the game is reliant. More documentaries by Davy Atombra only at UTQP!"
    return out
  },
  timezone:function() {
    let offset = new Date().getTimezoneOffset()
    if (offset == 0) return ""
    return (offset<0?"+":"-")+Math.floor(Math.abs(offset)/60)+((offset%60==0)?"":(":"+String(Math.abs(offset)%60).padStart(2,"0")))
  },
  excelDate:function(){return (Math.floor(Math.floor(Date.now()/86400000))+25569)},
  jacorb:[
    {label:"achievements",get value(){return g.ownedAchievements.length},get softcapped(){return (Math.log(this.value+1)**1.5).toFixed(1)},get visible(){return g.ownedAchievements.length>0}},
    {label:"secret achievements",get value(){return g.ownedSecretAchievements.length},get softcapped(){return Math.log(this.value+1).toFixed(1)},get visible(){return g.ownedSecretAchievements.length>0}},
    {label:"of dilated time",get value(){return timeFormat(g.dilatedTime)},get softcapped(){return timeFormat(g.dilatedTime**0.5)},get visible(){return g.dilatedTime>1000}},
    ...(function(){
      let out = []
      for (let i of axisCodes) out.push({label:i+" Axis",get value(){return BEformat(g[i+"Axis"])},get softcapped(){return g[i+"Axis"].add(10).log10().pow(5-axisCodes.indexOf(i)/2).sub(1).format(2)},get visible(){return g[i+"Axis"].gt(0)}})
      return out
    })(),
    {label:"between axis autobuys",get value(){return timeFormat(autobuyerMeta.interval("axis"))},get softcapped(){return (2**autobuyerMeta.interval("axis")).toFixed(2)+" hours"},get visible(){return g.stardustUpgrades[1]>0}},
    {label:"between frames",get value(){return timeFormat(deltatime)},get softcapped(){return numword(Math.round(deltatime**0.67*100))+" years"},get visible(){return g.exoticmatter.gt(1e100)}},
    {label:"Mastery rows unlocked",get value(){return countTo(totalMasteryRows).map(x=>masteryRowsUnlocked(x)==0?0:1).reduce((x,y)=>x+y)},get softcapped(){return "three-quarters of a column"},get visible(){return masteryRowsUnlocked(2)>0}},
    {label:"exotic matter",get value(){return BEformat(g.exoticmatter)},get softcapped(){return "-9"},get visible(){return true}}
  ],
  xhwzwkaPhishing:0,
  phishing:function(){popup({text:"alemaninc needs your help! Will you help alemaninc?",buttons:[["Yes","newsSupport.phishing1()"],["No",""]]})},
  phishing1:function(){
    newsSupport.xhwzwkaPhishing=0
    popup({text:"To help alemaninc, answer the following five questions:<br>[1] How old are you?",input:"",buttons:[["Submit","newsSupport.phishing2()"]]})
  },
  phishing2:function(){
    if (alemanicHash(popupInput())=="Jzh2ZvfKNy5TvnC4k1KE+gguJFvB0ziGIjCQMsrH35v6bBmeUg/8FQz3LlwbDQWXApab0j0cPuYsgDQPutXFqdoyDnsYzsg5fWhnM9Ou08Ph97RxZYXfjrDqzaIHbONdjUMZOtxzXKuT9z8zHG6k+4GuDSzdkmkO+jMkkwCsQSf2AnPp98nKlKq+HAy3cknjCyTdy6lW7ZzS3UuVFdaffgrXq5FgDEJhcXGbXGt/v/jCHVF+lNc+9vqHEz8Q5rBO7rtgvbGp/3iBPdqUtA8mzcTExKpuf0IM8/GwB/JCfIlyHrlFtBZ9k/Xrlu9FuqebU5OOjl5jvMO0e/ir8oAVpIr+aPQg1EVhDD3iDFe26Qfk+EwwVnHc91huoAJ5PtwBdFsodRM/+27JJPjyW0sgJa8FF3yWp+FBtcFW2nfxkQ/Ap2w0jxX3GBHjzII9y/uD0LVinZGpPCyye6YV9AXGB2JIRqNB9f+DE53PhoIqznT79CIPl8Ft5ZDIc+fePaXU") newsSupport.xhwzwkaPhishing++
    popup({text:"[2] What is your full legal name?",input:"",buttons:[["Submit","newsSupport.phishing3()"],["Exit","newsSupport.xhwzwkaPhishing=0"]]})
  },
  phishing3:function(){
    if (alemanicHash(popupInput())=="YumF343yCwPNdVYX3P2bZslfERBdMuguOP4eCEmuhDchclYzU6Fx/ajt5qNDe8hDR3Rz1S50QU5gYVN1+wLpK4alJmYb3wHGTezlxTZXf6BQt9RvZvDeCniM6bYt5WJsVmWIxYz+3/8ZEvW7c7LDFveXztfENrnEa4HJTX7RZ8HcAyPN5W5Ct0fTAJN5yW2zKxYsa1vyfsOnE6Kf9+JGh5goVz8BnNfBInRyzhSSWTozIn10nbJePocOPP04qCV+P+kbdDi1/dOEW7jRcPAmBpQUSpQ6hyfzbNm/ILzA3U2RWBVZMo3d5dl1hL7bRtNKUUULQSRNJToHgQfOse6H8Hw1D5NQYvdvz6rlF+FFFAcv4uXw50GTBe12qF00GUFHSPUbHzjCgO9zpxP/C45o//QIvTuIaAq0BgtQpDAV+ND7DkA/X0z9qPLHrFp3WClsj+XSvZ18n+mMMgfiqfG0H74ByV3WoTcjaFE2lKFJhMZKeI0zPbE90oZbu1f47xK6") newsSupport.xhwzwkaPhishing++;
    popup({text:"[3] What is your Discord username?",input:"",buttons:[["Submit","newsSupport.phishing4()"],["Exit","newsSupport.xhwzwkaPhishing=0"]]})
  },
  phishing4:function(){
    if (["Q1HkAdmVgm2ToS4YArCff8v+r7kjAxdVmJGdOT5E1c+eyymHFv33lUr1h9+9QhLOC0NA213x/lmSwTZbtGbJxWP9Kb2kyQx76Qmf9H9aBI0M4Ns2uMtBWw4Tt65SUZGrdwVIo2XGxiWRmBlbEB8NQrCQ2hQzQ5KQJ0LOJxfF2unPN6rmIZEoJYMvkvPmVKsxbyIXp6J5ogtXfcjJpb5mKLDa/dG0DxV4g16zfxOtz/RFloCQ/Z8J6kJ9VC6ScVm2HYYrrm0SVQUPLJBy5ddD0cqdvNplhXt4JM1PaEZPSgJJO0yTKWJxUzbIT44+uzgXwhapH51Hi77Dkxg+o7UpSPr23g+h4OV2h8gnlNIQ7ANYeiW9XL2lJu4BxSKpWuPIXmUIukyJJhGDbVUwq07bVTM8nLqKFr57GjKb/2jxLX3aE84gVgl8L8ZMFmtvP5J3kSB6sDs2RAuGrrn2iyWmJM4Nk9HZiIszYPjDX2XasnwJGR/RGcIH+sqaJVm+yUi/","SGfBY5zx12bAh/+BYTJ9+GGHizfTjoErzdcxlGChiLJkza733Bi1oPxuOrX9zNq757+QORdcOS+TDrPp6X4tkDtifL14Ql7wFPr18QvaAf4Yn+6fZXcRCwzPPItfr6tHL0qoVTryQVRkrcUkciR1Bic3SGcvhCh4H39FB2NUNpjiIHKC1iLMFHtsdZo6ZKuUgNimL+Epf/pxZwXpwZ7iFMmivGZm2bvgG9y+Apue0NiTGrxWbgOgUuLaW5ChhqLKfrSaEaf3wfQ3Ohoe11lwsxC44B1YCvDYGBmAbmaL6000kxsnN08icTtMZQqEPFTHMyFDL8omhCp0x0PBbZbWlo9NzqG7V8QhTjYzNEtgYS5A4HLxzRqh6ajgDiEuMFpfdG4vHUfyxMhD/gPphSY1qm91Y5TtUGJ5PF+V30xCvSO9icNurUSRIazE84TsDgnIWOxFY5BpfRPXShCk/X/eUDOzW8AtszcybFG1mrydryU44Udbv4259747mzhGNVme"].includes(alemanicHash(popupInput()))) newsSupport.xhwzwkaPhishing++
    popup({text:"[4] What is your house address?",input:"",buttons:[["Submit","newsSupport.phishing5()"],["Exit","newsSupport.xhwzwkaPhishing=0"]]})
  },
  phishing5:function(){
    if (alemanicHash(popupInput())=="PgOyj5M0L+tkOJODW4a6v9n5V5+ju1gIErvXvC7ogpykzPmpfu7kDjsht8fnDU9mBhvE2fd8A/724/BY4h/DSzGQmJrJqmCPAFjoBy5BRbgNTFIqOOaOxsmU3PbPlQCsan292ZukHzR/XDLuE8UFYNJM0ljiU0s12IFwMVCFy0MLKIviRcd22sJpxy6KsPUA/hR+xOCjk8FL6vcJVTtGqGTSJvPxM842x4crnFN5+d578BUfe2BM7UaK5BY9Q+jMctwsOiKNve1ToclT4EuxvRFEnKAvCikKaA0JqGTZ1q0fDg82xqcdkKZ3+4jYnJAXcW/GSIu1zkh9KzBBj8sOJjE/hPbW07w2B9o1Ak5GQ5dPDIfLvBcfxmA25rUPYCwyoXg+KODYWV9mi4CGOXJ9Qraom+FO9m1h4qanAbzD1zqcvCUYYUtEMtU8UZ15WJ4LLkRvT5CqVAVCr8mqdzoz7iC++ir6+NpeGsi9s3P5UbLO6xmjj4ipCRLlWFbzKLW1") newsSupport.xhwzwkaPhishing++
    popup({text:"[5] And finally, what is your credit card number?",input:"",buttons:[["Submit","newsSupport.submitPhishing()"],["Exit","newsSupport.xhwzwkaPhishing=0"]]})
  },
  submitPhishing:function(){
    if (alemanicHash(popupInput())=="XNllS6xHLVS+BMZYExjmHzr+l9RY4WESX04XMZPBwwYqJw4SQODeGuiq1TR6/iZl6ZR/aJ+Cpw8A33SLLEb6d3DksTuM9J8O2xLpihuKexG11++J/Kx7LPNIjzk4svET66ux0tRNA/cPH4pLQnNkrHo3S9v9MW2sV2/UlzpM+Y1Rx4n+iOzK0GlTQh37nriNjLrFscdKLAloTnZCW09L6Ju7YgnaJ+WOe121Yt1wgFIbKi526eYXQJyqyKhrO5mq/Xnr9f6x4K9gJcux4EmOE0IS+WRNMLrzw6AyOPrS0rzK9V1Z1oQNDdlvFvd24cODP6XZxquMuCATArCFp7/eXpaF9jQ/yOupyUXVqnDQ5D6lI1f6xA0iffNI9DNh/d17Yg7NjmJpSw1GvEO4CM9fLj6RLDCfc2SRNdApzujeuLfHui48dQffYv9Ko4cc3/H/PmIIfpW9UWXaV/2ZsMlLu+IK74lAbLGDhcJZx+M4aBH3axMLavyt5Q3ppw0xBeL5") newsSupport.xhwzwkaPhishing++
    for (let i of [26,28]) addSecretAchievement(i)
    newsSupport.xhwzwkaPhishing=0
    popup({text:'Thank you for helping alemaninc!',buttons:[["Exit","newsSupport.xhwzwkaPhishing=0"]]})
  },
  codeInsight:function(item){
    let text = Object.getOwnPropertyDescriptor(item,"text").value==undefined?Object.getOwnPropertyDescriptor(item,"text").get.toString():("text:\""+Object.getOwnPropertyDescriptor(item,"text").value+"\"")
    let weight = item.weight==undefined?undefined:Object.getOwnPropertyDescriptor(item,"weight").value==undefined?Object.getOwnPropertyDescriptor(item,"weight").get.toString():("weight:\""+Object.getOwnPropertyDescriptor(item,"weight").value+"\"")
    return (weight==undefined)?("{"+text+"}"):("{"+text+","+weight+"}")
  },
  secretAchievementHelp:function(){popup({text:"Here is the name of a Secret Achievement: "+secretAchievementList[Object.keys(secretAchievementList).filter(x=>!Object.keys(secretAchievementList).includes(Number(x)))[0]].name+".",buttons:[["Close",""]]})},
  easterTime:function() {let Y = new Date().getUTCFullYear();let C = Math.floor(Y/100);let N = Y - 19*Math.floor(Y/19);let K = Math.floor((C - 17)/25);let I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;I = I - 30*Math.floor((I/30));I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));let J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);J = J - 7*Math.floor(J/7);let L = I - J;let M = 3 + Math.floor((L + 40)/44);let D = L + 28 - 31*Math.floor(M/4);return Math.abs((M*30+D)-((new Date().getUTCMonth()+1)*30+new Date().getUTCDate()))<7},
  EMDevelopmentFactor:function(x){return N(x).add(10).quad_slog(10).mul(100)},
  EMDevelopmentVariables:function(){return [g.exoticmatter,g.ownedAchievements.length,g.truetimePlayed,g.masteryPower,g.stardust,g.darkmatter,g.hawkingradiation]},
  EMDevelopmentIndex:function(){return Decimal.sum(...newsSupport.EMDevelopmentVariables().map(x=>newsSupport.EMDevelopmentFactor(x)))}
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
  {text:"\"Incredibly slow start, surprised there isn't something to speed this up\" - alpha player"},
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
  {text:"We all know about stardust. But every stardust is related in some way. Those stardusts you 'spent' had families, and they miss them. You monster.",get weight(){return g.stardustUpgrades.reduce((x,y)=>x+y)==0?0:1}},
  {get text(){return "Fact: your current exotic matter is ^"+Decimal.div(g.exoticmatter.log10(),g.totalexoticmatter.log10()).format(4)+" of all the exotic matter you have ever produced."},get weight(){return (g.exoticmatter.gt(1e100)&&Decimal.div(g.exoticmatter.log10(),g.totalexoticmatter.log10()).lt(0.999))?1:0}},
  {text:"This ticker could be yours. Join the Discord to suggest what it should be!"},
  {text:"Fact: this news ticker can only appear first.",get weight(){return timeSinceGameOpened<5?1:0}},
  {get text(){return "Ah, a fellow "+g.colortheme+" theme user. I see you have impeccable taste."}},
  {text:"¿sᴉɥʇ pɐǝɹ noʎ pᴉp ʍoH"},
  {text:"Work it, make it, do it, makes us, harder, better, faster, stronger, more than, hour, hour, never, ever, after, work is, over"},
  {text:"According to all known laws of motion, there is no way exotic matter should be able to exist. Its density is too small to get its fat little particles off the whiteboard. The exotic matter, of course, exists anyway, because exotic matter doesn't care what theoretical physicists think is impossible."},
  {text:"If you read this I hope you have a good day."},
  {get text(){return "<span style=\"padding-left:3000px\">Did you notice the news ticker being empty for around "+timeFormat(3000/g.newsTickerSpeed)+"?</span>"}},
  {get text(){return "So, you've destroyed "+g.TotalWormholeResets+" universes with wormholes... but when will you actually go <i>inside</i> a wormhole?"},get weight(){return g.TotalWormholeResets>1?1:0}},
  {text:"<span style=\"font-size:4px;opacity:0.25\">Just sneaking by, don't mind me...</span>"},
  {get text(){return newsSupport.nodeDocumentary()}},
  {get text(){return "alemaninc will now proceed to guess your timezone.<span style=\"padding-left:250px\"></span>Are you in UTC"+newsSupport.timezone()+"?"}},
  {get year(){return new Date().getFullYear()},get month(){return new Date().getMonth()+1},get longMonth(){return String(new Date().getMonth()+1).padStart(2,"0")},get day(){return new Date().getDate()},get longDay(){return String(new Date().getDate()).padStart(2,"0")},get text(){return "If you are in England, the date is "+this.day+"/"+this.month+"/"+this.year+". If you are in America, the date is "+this.month+"/"+this.day+"/"+this.year+". If you are in Sweden, the date is "+this.year+"-"+this.longMonth+"-"+this.longDay+". If you are in Poland, the date is "+this.day+" "+roman(this.month).toLowerCase()+" "+this.year+". If you are in xhwzwka's to-do list, the date is "+this.year+"-"+this.longDay+"-"+this.longMonth+". If you are in Microsoft Excel, the date is "+newsSupport.excelDate()+". If you are on Mount Ebott, the date is "+Math.floor(this.year/10)+"X. If you are in the browser, the date is "+(new Date().toString())+"."},get weight(){return this.month==this.day?0:1}},
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
  {text:"Beware of phishing attempts, keep your information safe!<span style=\"padding-left:100vw\"></span><span onClick=\"newsSupport.phishing()\">🎣<span style=\"padding-left:150px\"></span>Look, a phishing rod! You should click this.</span>"},
  {get text(){return "Have you ever wondered what the code of a news message looks like? Here is the code of a random news message: "+JSON.stringify(Array.random(newsList.filter(x=>newsWeight(x)>Math.random())))}},
  {text:"<span onClick=\"newsSupport.secretAchievementHelp()\">Click this for help with a secret achievement</span>",get weight(){return (1-g.ownedSecretAchievements/Object.keys(secretAchievementList).length)**2}},
  {text:"tHiS mEsSaGe Is CaSe sEnSiTiVe"},
  {text:"You have <span style=\"color:#df5050;font-size:20px\">0</span> antimatter. Go <a href=\"https://ivark.github.io/AntimatterDimensions/\">here</a> to get some!"},
  {text:[...[1,2,3,4,5,6,7,8,9].map(x=>((10**x-1)/9)+"<sup>2</sup> = "+String(BigInt((10**x-1)/9)**2n)),"But 1111111111<sup>2</sup> is 1234567<i>900</i>987654321! How!?"].join("<span style=\"padding-left:100px\"></span>")},
  {text:"Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity."},
  {text:"A concoction of varied pastries, puzzling grass and towers and citadels tall as though they piece the very sky... Seriously, how is this my game repertoire?!"},
  {text:"They say if you look in a mirror and ping alemaninc three times in a row you'll instantly die."},
  {get text(){return "Once upon a time, there was a young child named Northo. One day, Northo went to alemaninc, the world-renowned creator of exotic matter, and said to Him: \"less discord, more commits thanks.\" And alemaninc said: \"Do you not know that Discord is the lifeblood of commits? Without Discord, there would be no exotic matter at all. Run along now, young one, and perhaps one day we will meet again in Tier "+(Object.keys(achievementList).filter(x=>(Number(x)!==NaN)&&(achievement.ownedInTier(x)>0)).length+1)+".\" And Northo never spoke of Discord in a negative light again. The end."}},
  {get text(){return newsSupport.jacorb.filter(x=>x.visible).map(x=>"You have "+x.value+" "+x.label+". <span style=\"color:#8a8767;text-shadow: 0px 1px 0px #a0a67c;\">(softcapped to "+x.softcapped+")</span>").join(". ")},get weight(){return newsSupport.jacorb.map(x=>x.visible).includes(true)}},
  {text:"You feel like making exotic matter. But no one wants to eat your exotic matter.",get weight(){return totalAxis("normal").eq(0)}},
  {text:"You feel like making dark matter. But no one wants to eat your dark matter.",get weight(){return ((g.stardustUpgrades[4]>0)&&totalAxis("dark").eq(0))?1:0}},
  {text:"The universe has now turned into exotic matter, to the molecular level.",get weight(){return g.exoticmatter.gt(1e12)?1:0}},
  {text:"A local news station runs a 10-minute segment about your exotic matter. Success! <span style=\"font-size:50%\">(you win an exotic matter)</span>",get weight(){return g.exoticmatter.gt(1e13)?1:0}},
  {text:"This is not about wormholes... yet.",get weight(){return g.storySnippets.includes("Black hole")?0:1}},
  {text:"The Holy Quincunx of alemaninc: exotic matter, stardust, dark matter, hawking radiation and mastery power. These 5 resources let us access alemaninc's gift, Knowledge. And with this Knowledge, we reach out to alemaninc, and call, \"alemaninc, bless us on this fine day!\" And alemaninc does. He gives us the blessing of Research. This Research was a blessing so powerful, alemaninc restricted their power. He said, \"I will give you a choice of three paths\" and then humanity chose. The short, cheap route of 1-3, giving instant gratification, the powerful choice of 1-8, which were a fast, middle ground path, or 1-13, the long wait, and struggle, of humanity. Then, as humanity chose, a spacecraft broke the earth. A human walked out and said to humanity, \"I will offer the powerful choice of a R axis! I am Statmark, Lord of all Unalemanic\". Humanity rose and said \"Begone Statmark! We want none of your foul Heresy!\" And alemaninc rose as well, and smote Statmark with his godlike power. As Statmark's corpse fell into the earth, he cried \"This will not be the last of me!, Alemaninc will betr- 😠\" and he fell in the Abyss of exotic matter. alemaninc gifted humanity with Studies, which boosted achievements and stars. And alemaninc gave humanity his greatest gift. Wormhole Milestones. He said, these will do all your work for you, but their requirement will increase 30 times. Use them wisely. And Humanity journeyed off with their new power, as Statmark's words echoed in their heads.",get weight(){return unlocked("Hawking Radiation")?1:0}},
  {text:"News will resume in: "+countTo(100,true).map(x => (100-x)+"<span style=\"padding-left:"+(100-x)+"px\"></span>").join("")+". Thank you for your patience."},
  {text:"<span onClick=\"g.newsTickerSpeed=0\">Click this to pause the news</span>"},
  {text:"<span onClick=\"g.newsTickerSpeed=11330738570.1\">Click this to accelerate the news to the speed of light</span>"},
  {text:["3<sup>3</sup> = 27","<sup>3</sup>3 = 3<sup>3<sup>3</sup></sup>","3<sup>3</sup>3 = ?"].join("<span style=\"padding-left:100px\"></span>")},
  {get text(){return "If every exotic matter was a planck volume, you would have enough to fill "+BEformat(g.exoticmatter)+" planck volumes."}},
  {text:"We interrupt our programming, this is a national emergency. Weather stations in [REDACTED] have detected exotic matter in the air. Exotic matter is known to invert gravity in large concentrations. If you begin to levitate, evacuate the area immediately."},
  {text:"Now at your local grocery store: exotic matter flavored ice cream! Experience the all-new gravitation sensation that's gripping the nation! Caution: explosive, flammable, oxidising, gas under pressure, corrosive, acutely toxic, radioactive, environmental hazard."},
  {get text(){return "\"Today is "+(newsSupport.excelDate()-44100)+" days since 2020-09-26. If you divide that by 25 you get "+(newsSupport.excelDate()/25-1764).toFixed(2)+". What happened on 2020-09-26, you may ask? Nothing, but we still measure the time.\" - xhwzwka"}},
  {text:"You have 0 Zip Points. Wait, what's a Zip Point?"},
  {text:"Welcome back to another episode of \"Exotic Math Dimensions\" by alemaninc! We all know that 2 + 2 = 5. But thereare still many people who unknowingly partake in logic denial by claiming that 2 + 2 = 4. In this episode I will prove onceand for all that 2 + 2 = 5. We all know that 9 + 10 = 21. If we subtract 0.5 from both sides, we get 9 + 9.5 = 20.5. Now,when we add 0.5 to both sides, we get 9.5 + 9.5 = 21. Now the two terms on the left side are equal. The next step is todivide both sides by 2 to produce 4.75 + 4.75 = 10.5. Now, we subtract 2.75 from both sides, getting 2 + 4.75 = 7.75.Finally, we subtract 2.75 from both sides again, and so we get our final answer of 2 + 2 = 5. Stay tuned for anotherepisode of \"Exotic Math Dimensions\" by alemaninc, where we will prove that quaternion multiplication is sorcery made up by communists."},
  {text:"This message was written by xhwzwka. Who's that, you may ask? Ask him! He's 324862 years old, his real name is <unknown>, his Discord number is xhwzwka#7155, he lives at 72 W Street and his credit card number is 72917164954."},
  {text:"Hello, dear players of \"Exotic Matter Dimensions\"! alemaninc left his computer unattended, so I thought I might have some fun with this. alemaninc's real name is [REDACTED], he lives at [REDACTED] in [REDACTED], [REDACTED] and he is [REDACTED] years old but still [REDACTED] and gets a suspicious amount of [REDACTED] from [REDACTED] who [REDACTED]. If you see this message, ping alemaninc [REDACTED] at [REDACTED] and post a screenshot in [REDACTED]."},
  {get text(){return [Array.random(["black","silver","gray","white","maroon","red","purple","fuchsia","green","lime","olive","yellow","navy","blue","teal","aqua"])].map(x=>"<span style=\"color:"+x+"\">This news message is "+x+".</span>")[0]}},
  {text:"They say that stardust tastes like everything at once.",get weight(){return unlocked("Stardust")?1:0}},
  {text:"If you dilate time fast enough, you can start to see blue sparks."},
  {text:"This message is not helpful."},
  {text:"It's $29 a gigajoule, people, so stop being cheap, stop trying to charge your phones with mastery power and stop blowing yourselves through the roof! If one more person comes in here with a burned forehead, I swear I won't treat him. It's $29 a gigajoule!",get weight(){return AchievementE(105)?1:0}},
  {text:"In 5 hours, something will happen."},
  {text:"Exponentiation is powerful. Just ask any incremental game player!",get weight(){return (g.stars>9||AchievementE(401)||unlocked("Energy"))?1:0}},
  {text:["demons","angels","fallen angels","Satan","Lucifer","the seventh circle of Hell","fun"].map(x=>"If you're looking for "+x+", this is the wrong game. ").join("")+"If you're looking to waste time, this is the right game!"},
  {text:"Normal energy isn't real. Stop trying to look for it.",get weight(){return g.stardustUpgrades[4]==stardustUpgradeCap(5)?1:0}},
  {text:"Breaking news! Nothing has happened!"},
  {text:"Click here to click here."},
  {text:"One day, Supernova will return and the Phoenix Prophecy shall be fulfilled.",get weight(){return AchievementE(401)?1:0}},
  {text:"I'm feeling quite energetic today.",get weight(){return unlocked("Energy")?1:0}},
  {text:"They say that the W Axis is time.",get weight(){return AchievementE(102)?1:0}},
  {text:"May the stars guide you.",get weight(){return g.stars>0?1:0}},
  {text:"The news ticker is now empowered.",get weight(){return g.studyCompletions[1]>0?1:0}},
  {text:"You have a strange feeling for a moment, then it passes."},
  {text:"The biscuit is a lie."},
  {text:"Antimatter ghosts do not exist. Just like matter ghosts. They don't have any matter, for that matter. Exotic matter ghosts, on the other hand, can be found in every respectable Hallowe'en store."},
  {text:"Hydrogen fuel has been abandoned by the American space program in favor of exotic matter fuel."},
  {text:"Theoretical physicists of the world discover new exotic matter producer - \"Oh boy, guess we were wrong all along!\""},
  {get text(){return "In the news today, a new religion has been created, and it's spreading like wildfire. The believers of this religion worship the AleMan Incorporated Company, who claim to be the gods of exotic matter. They also claim that there are "+numword(this.dims)+" dimensions."},get weight(){return this.dims>3?1:0},get dims(){return fullAxisCodes.map(x=>g[x+"Axis"].eq(0)?0:1).reduce((x,y)=>x+y)}},
  {text:"You made one exotic matter! Whatever that means."},
  {text:"None of this matters."},
  {get text(){return "Common sense confirms that the color of exotic matter is <div style=\"height:1em;width:1em;background-color:"+this.color+"\"></div>"},get color(){return getComputedStyle(document.body).getPropertyValue("--exoticmatter")}},
  {get text(){return "A revolutionary new metric of quantifying <i>Exotic Matter Dimensions</i> savefiles has been invented called the \"Exotic Matter Progress "+newsSupport.EMDevelopmentVariables().length+" Development Index\". Your score in this index is: "+BEformat(newsSupport.EMDevelopmentIndex())+"!"}},
  {get text(){return "Oh, so you like "+g.notation+" notation? Okay, then what number is "+N(10).quad_tetr(10**308**Math.random()).format()+" in "+g.notation+" notation?"}}
]
var newsOrder = []
function newsWeight(item) {
  return (item.weight==undefined)?1:item.weight
}
function randomNewsItem() {
  if (newsOrder.length == 0) newsOrder = Array.shuffle(countTo(newsList.length,true))
  let index
  while (true) {
    index = newsOrder.splice(0,1)
    if (newsWeight(newsList[index])>Math.random()) break
  }
  return newsList[index].text
}
var currentNewsOffset = 0