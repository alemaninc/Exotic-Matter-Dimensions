const newsSupport = {
	br:function(x){return "<span style=\"padding-left:"+x+"px\"></span>"},
	randomVisible:function(){return Array.random(newsList.filter(x=>newsWeight(x)>Math.random()))},
	redacted:"<span style=\"color:hsl(270 50% 50%);opacity:0.5;\">[REDACTED]</span>",
	redactedFormat:function(x){return "<span style=\"color:hsl(270 50% 50%);opacity:0.5;\">"+x+"</span>"},
	error:"This news message has appeared in error. Please tell alemaninc to investigate. No, really. This isn't a joke.",
	universeSize:function(){
		let array = fullAxisCodes.map(x=>stat["real"+x+"Axis"]).filter(x=>x.gt(0))
		if (array.length==0) return "1. Just 1. No dimensions. Buy an axis to get a dimension!"
		let num = array.reduce((x,y)=>x.mul(y))
		let dimension = array.length
		return num.noLeadFormat(3)+" m"+(dimension==1?"":("<sup>"+dimension+"</sup>"))+". In words, that is "+(num.gt(c.inf)?"Infinity":numword(num.toNumber()))+" "+(dimension<11?["metres","square metres","cubic metres","quartic metres","quintic metres","sextic metres","septic metres","octic metres","nonic metres","decic metres"][dimension-1]:("metres to the power of "+numword(dimension)))
	},
	nodeDocumentary:function(){
		let list = document.getElementsByTagName("*")
		let node = list[Math.floor(list.length*Math.random())]
		let type = node.tagName
		let id = node.id
		let parentType = (node.parentElement==null)?null:node.parentElement.tagName
		let styles = Array.from(node.style)
		let children = node.children
		let out = "In the game there are "+list.length+" HTML nodes. Every one of these nodes is competing for the undivided attention of the gameloop. The gameloop, being a just and merciful function, distributes to each node a fair share of lag to unleash upon the unfortunate device which has to process all this. "
		out += "Let us now take a closer look at one such node - this humble "+type+" node"
		if ((id == "") && (styles.length == 0)) {
			out += " has neither an ID, nor any CSS properties, but despite its difficult station in life it diligently carries out its duty with an unwavering determination."
		} else if (id == "") {
			out += " may lack an ID, but it is the proud bearer of "+numword(styles.length)+" CSS propert"+(styles.length==1?"y":"ies")+": "+styles.joinWithAnd()+"."
		} else if (styles.length == 0) {
			out+= " does not have any CSS properties, but at least it is lucky enough to have been given the ID \""+id+"\"."
		} else {
			out += " is one of the privileged few to have both an ID, namely \""+id+"\", and "+numword(styles.length)+" CSS propert"+(styles.length==1?"y":"ies")+": "+styles.joinWithAnd()+"."
		}
		if (parentType == null) {
			out += "But what really makes this node stand out, is that it is the very first node to be created of them all - it has neither a parent, nor a mother-in-law. What it does have is "+numword(children.length)+" child"+(children.length==1?"":"ren")+" - "+Array.from(children).map(x=>x.tagName).joinWithAnd()+" - who are vitally important to the functioning of the game itself."
		} else {
			if (children.length>0) out += " It is happy to have a "+parentType+" parent - perhaps less so a "+list[Math.floor(list.length*Math.random())].tagName+" mother-in-law - and "+numword(children.length)+" child"+(children.length==1?"":"ren")+" named "+Array.from(children).map(x=>x.tagName).joinWithAnd()+"."
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
		{label:"achievements",get value(){return totalAchievements},get softcapped(){return (Math.log(this.value+1)**1.5).toFixed(1)},get visible(){return totalAchievements>0}},
		{label:"secret achievements",get value(){return totalSecretAchievements},get softcapped(){return Math.log(this.value+1).toFixed(1)},get visible(){return totalSecretAchievements}},
		{label:"of dilated time",get value(){return timeFormat(g.dilatedTime)},get softcapped(){return timeFormat(g.dilatedTime**0.5)},get visible(){return g.dilatedTime>1000}},
		...(function(){
			let out = []
			for (let i of axisCodes) out.push({label:i+" Axis",get value(){return BEformat(g[i+"Axis"])},get softcapped(){return g[i+"Axis"].add(c.d10).log10().pow(5-axisCodes.indexOf(i)/2).sub(c.d1).format(2)},get visible(){return g[i+"Axis"].gt(c.d0)}})
			return out
		})(),
		{label:"stars",get value(){return "6"+String.fromCharCode(49+9*Math.random())},get softcapped(){return "60"},get visible(){return g.stars==60}},
		{label:"between axis autobuys",get value(){return timeFormat(autobuyerMeta.interval("axis"))},get softcapped(){return (2**autobuyerMeta.interval("axis")).toFixed(2)+" hours"},get visible(){return g.stardustUpgrades[1]>0}},
		{label:"between frames",get value(){return timeFormat(Math.max(deltatime,0.05))},get softcapped(){return numword(Math.round(Math.max(deltatime,0.05)**0.67*100))+" years"},get visible(){return g.exoticmatter.gt(1e100)}},
		{label:"Mastery rows unlocked",get value(){return countTo(totalMasteryRows).map(x=>stat["masteryRow"+x+"Unlocked"]==0?0:1).sum()},get softcapped(){return "three-quarters of a column"},get visible(){return stat.masteryRow2Unlocked>0}},
		{label:"exotic matter",get value(){return BEformat(g.exoticmatter)},get softcapped(){return "-9"},get visible(){return true}}
	],
	CSSBaseShades:["black","silver","gray","white","maroon","red","purple","fuchsia","green","lime","olive","yellow","navy","blue","teal","aqua","alice blue","antique white","aquamarine","azure","beige","bisque","blanched almond","blue-violet","brown","burlywood","cadet blue","chartreuse","chocolate","coral","cornflower blue","corn silk","crimson","cyan","dark blue","dark cyan","dark goldenrod","dark gray","dark green","dark khaki","dark magenta","dark olive green","dark orange","dark orchid","dark red","dark salmon","dark sea green","dark slate blue","dark slate gray","dark turquoise","dark violet","deep pink","deep sky blue","dim gray","dodger blue","firebrick","floral white","forest green","gainsboro","ghost white","gold","goldenrod","green-yellow","honeydew","hot pink","Indian red","indigo","ivory","khaki","lavender","lavender blush","lawn green","lemon chiffon","light blue","light coral","light cyan","light goldenrod yellow","light gray","light green","light pink","lightsalmon","light sea green","light sky blue","light slate gray","light steel blue","light yellow","lime green","linen","magenta","medium aquamarine","medium blue","medium orchid","medium purple","medium sea green","medium slate blue","medium spring green","medium turquoise","medium violet red","midnight blue","mint cream","misty rose","moccasin","navajo white","old lace","olive drab","orange-red","orchid","pale goldenrod","pale green","pale turquoise","pale violet-red","papaya whip","peach puff","peru","pink","plum","powder blue","purple","red","rosy brown","royal blue","saddle brown","salmon","sandy brown","sea green","seashell","sienna","sky blue","slate blue","slate gray","snow","spring green","steel blue","tan","teal","thistle","tomato","turquoise","violet","wheat","white smoke","yellow-green"],
	intBaseShade:function(x){return x.replaceAll(" ","").replaceAll("-","")},
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
		let props = Object.keys(item)
		let out = []
		for (let i of props) out.push(Object.getOwnPropertyDescriptor(item,i).value==undefined?Object.getOwnPropertyDescriptor(item,i).get.toString():(i+":\""+Object.getOwnPropertyDescriptor(item,i).value+"\""))
		return "{"+out.join(",")+"}"
	},
	secretAchievementHelp:function(){popup({text:"Here is the name of a random Secret Achievement: "+secretAchievementList[Object.keys(secretAchievementList).filter(x=>g.secretAchievement[x]).random()]+".",buttons:[["Close",""]]})},
	easterTime:function() {let Y = new Date().getUTCFullYear();let C = Math.floor(Y/100);let N = Y - 19*Math.floor(Y/19);let K = Math.floor((C - 17)/25);let I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;I = I - 30*Math.floor((I/30));I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));let J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);J = J - 7*Math.floor(J/7);let L = I - J;let M = 3 + Math.floor((L + 40)/44);let D = L + 28 - 31*Math.floor(M/4);return Math.abs((M*30+D)-((new Date().getUTCMonth()+1)*30+new Date().getUTCDate()))<7},
	EMDevelopmentVariables:function(){return [g.exoticmatter,N(totalAchievements),g.truetimePlayed,g.masteryPower,g.stardust,g.darkmatter,g.hawkingradiation]},
	EMDevelopmentIndex:function(){return newsSupport.EMDevelopmentVariables().map(x=>x.add(c.d10).quad_slog()).sumDecimals().mul(c.e2)},
	interestingTickerActiveUntil:0,
	formatZP:function(hideName=false){return BEformat(g.zipPoints,g.zipPoints%1==0?0:2)+" Zip Point"+(g.zipPoints==1?"":"s")},
	addZP:function(){g.zipPoints+=(g.zipPointMulti-(g.zipPoints/1e158)**2);if(d.element("news_zipPoints")!==undefined){d.innerHTML("news_zipPoints",newsSupport.formatZP())}},
	cashInZPRewards:[
		{get value(){return Math.min(g.zipPoints**(1/3)/10,Math.log10(g.zipPoints))},func:function(){g.dilatedTime+=this.value},get text(){return "+"+timeFormat(this.value)+" dilated time!"},get visible(){return true}},
		{get value(){return Math.min(g.zipPointMulti+0.001*g.zipPoints*Math.log10(g.zipPoints)**-2,1e300)},func:function(){g.zipPointMulti=this.value},get text(){return "Zip Point multiplier "+arrowJoin(BEformat(g.zipPointMulti,2)+"×",+BEformat(this.value,2)+"×!")},get visible(){return g.zipPointMulti<1e300}},
		{get value(){return Math.floor(Math.log10(g.zipPoints)**3)},func:function(){o.add("stardust",this.value)},get text(){return "+"+BEformat(this.value)+" stardust!"},get visible(){return g.stardust.div(this.value).gt(c.e2)}},
		{get value(){return Math.floor(Math.log10(g.zipPoints)**3)},func:function(){o.add("hawkingradiation",this.value)},get text(){return "+"+BEformat(this.value)+" hawking radiation!"},get visible(){return g.hawkingradiation.div(this.value).gt(c.e2)}}
	],
	cashInZP:function(){
		if (g.zipPoints<1000) return
		let out = Array.random(newsSupport.cashInZPRewards.filter(x=>x.visible))
		popup({text:out.text,buttons:[["Close",""]]})
		out.func()
		g.zipPoints=0
	},
	spamCompendium:["Can computers really see? In this interactive lab by Pixel Perfect, you'll peek into the world of digital \"vision\"","Hello, you may have received an email from the Ri this afternoon, with the details of how to join as an Ri member.","Microsoft requests your feedback! Help us build better experiences for you.","Celebrate extraordinary women - introducing the new Bing, your AI-powered co-pilot"," Ready to win big? Play Select 3 for your chance to win one of 2 million amazing prizes including tech and gear, billions of Microsoft Rewards points, and even up to £211k in cash prizes. Don’t delay, play today!","Start the year with a Surface bundle for all your computing needs","Overwatch 2 gets bigger with this bundle! See how to make a difference this holiday season.","New and Improved Embeddings API - we're excited to announce a new embedding model: text-embedding-ada-002!","Microsoft Cashback is now part of Microsoft Rewards","Don't miss the deadline on these exciting sweeps! Get a head start on the holidays.","Enter to win Xbox Ultimate Game Pass Ultimate for life! Get ready for Halloween with hauntingly good ideas.","Why are the northern lights spreading south? Shining a light on the aurora borealis.","We'd like to make you smile - there’s a cheerful thread running through this week’s newsletter in the wake of Monday’s UN International Day of Happiness. Find out more about the science of laughter and meet the group most likely to raise a smile: our Humour SIG. (This one's plucked straight from alemaninc's inbox! Can you guess what it is? Post your answer in our Discord to have it checked by alemaninc himself!)","The Galaxy Book3 Pro 360 is now available to buy - Get free Galaxy Buds2 Pro","Last chance to pre-order Galaxy Book3","Ask and you shall receive... a password reset","Someone added alemaninc44031@gmail.com as their recovery email - alemaninc44059@gmail.com wants your email address to be their recovery email","What's on our radar this week? Thought-provoking podcasts, the algorithms of life and more","Security ALERT! You've visited illegal infected website<br>You have visited unsafe site with illegal content<br>Your PC is at risk of being infected by viruses<br>To continue browsing safely - perform an antivirus scan<br><span style=\"border-style:solid;border-radius:5px;border-width:1px;border-color:#000000\">Scan</span>"],
	hardMathAnswer:null,
	hardMath:function(){let num1=BigInt(10**(50+Math.random()*30));let num2=BigInt(10**(30+Math.random()*20));newsSupport.hardMathAnswer=num1*num2;popup({text:"What is "+String(num1)+" × "+String(num2)+"?",input:"",buttons:[["Submit","newsSupport.checkHardMath()"]]})},
	checkHardMath:function(){if(String(popupInput())==String(newsSupport.hardMathAnswer)){popup({text:"Wow, you actually got it right. Here's some dilated time as a reward for your efforts.",buttons:[["Yay!","g.dilatedTime++"],["No, thanks, I see that as cheating.",""]]})}else{popup({text:"No, it's "+String(newsSupport.hardMathAnswer)+"! If that number doesn't take up multiple lines you have a <i>massive</i> viewport.",buttons:[["Close",""]]})}},
	setBackground:function(color){document.body.style["background-color"]=color},
	lightColor:function(){
		let channels = [[0,4,5,6],[1,3,5,6],[2,3,4,6]]
		if (g.chroma.sumDecimals().eq(c.d0)) return "#000000"
		return "#"+channels.map(x=>Decimal.div(x.map(y=>g.chroma[y]).sumDecimals(),g.chroma.sumDecimals()).mul(255).round().toNumber().toString(16).padStart(2,"0")).join("")
	}
}
// top
const newsList = [
	{text:"This is not an <i>Antimatter Dimensions</i> clone."},
	{text:"What, were you expecting a new sticker? Well, too bad..."},
	{text:"Do you want to be an <i>Exotic Matter Dimensions</i> beta tester? Well, what if I told you that <b>all</b> players are testers?"},
	{text:"If you join the Discord server alemaninc will be super happy! You should make alemaninc happy."},
	{text:"The R axis is a lie.",get weight(){return g.stardustUpgrades[0]>3?1:0}},
	{text:"You do know you can't Stardust reset in -1 seconds, right?",get weight(){return Math.max(0,Math.min(1,2-g.fastestStardustReset*10))}},
	{get text(){return "More than "+BEformat(c.inf)+" exotic matter? What is this foul heresy?"},get weight(){return g.exoticmatter.gt(c.inf)?1:0}},
	{get text(){return BEformat(g.exoticmatter)+" exotic matter? That's rookie numbers."},get weight(){return totalAchievements/achievement.all.length<0.9?1:0}},
	{text:"Help! Help! Help! Help! I bought an axis and it's producing exotic matter and I don't know how to stop it!",get weight(){return stat.totalAxis.eq(c.d0)?0:1}},
	{get text(){return "If you could write 3 digits of your exotic matter amount per second, it would take you "+timeFormat(g.exoticmatter.log10().floor().add(c.d1).div(c.d3))+" to write it out. That's... not as long as you'd like to think."},get weight(){return g.exoticmatter.add(c.d1).log2().div(c.d1024).min(1).toNumber()}},
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
	{text:"What's an OMCCDV, you ask? Only xhwzwka knows.",get weight(){return g.achievement[413]?1:0}},
	{text:"\"Incredibly slow start, surprised there isn't something to speed this up\" - alpha player"},
	{text:"This game has no bugs, only unintended features."},
	{get text(){return "Fact: the size of your universe is "+newsSupport.universeSize()+"."},get weight(){return stat.totalAxis.eq(c.d0)?0:1}},
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
	{text:"We all know about stardust. But every stardust is related in some way. Those stardusts you 'spent' had families, and they miss them. You monster.",get weight(){return g.stardustUpgrades.sum()==0?0:1}},
	{get text(){return "Fact: your current exotic matter is ^"+Decimal.div(g.exoticmatter.log10(),g.totalexoticmatter.log10()).format(4)+" of all the exotic matter you have ever produced."},get weight(){return (g.exoticmatter.gt(1e100)&&Decimal.div(g.exoticmatter.log10(),g.totalexoticmatter.log10()).lt(0.999))?1:0}},
	{text:"This ticker could be yours. Join the Discord to suggest what it should be!"},
	{text:"Fact: this news ticker can only appear first.",get weight(){return timeSinceGameOpened<5?1:0}},
	{get text(){return "Ah, a fellow "+g.colortheme+" theme user. I see you have impeccable taste."}},
	{text:"¿sᴉɥʇ pɐǝɹ noʎ pᴉp ʍoH"},
	{text:"Work it, make it, do it, makes us, harder, better, faster, stronger, more than, hour, hour, never, ever, after, work is, over"},
	{text:"According to all known laws of motion, there is no way exotic matter should be able to exist. Its density is too small to get its fat little particles off the whiteboard. The exotic matter, of course, exists anyway, because exotic matter doesn't care what theoretical physicists think is impossible."},
	{text:"If you read this I hope you have a good day."},
	{get text(){return newsSupport.br(3000)+"Did you notice the news ticker being empty for around "+timeFormat(3000/g.newsTickerSpeed)+"?"}},
	{get text(){return "So, you've destroyed "+g.TotalWormholeResets+" universes with wormholes... but when will you actually go <i>inside</i> a wormhole?"},get weight(){return g.TotalWormholeResets>1?1:0}},
	{text:"<span style=\"font-size:4px;opacity:0.25\">Just sneaking by, don't mind me...</span>"},
	{get text(){return newsSupport.nodeDocumentary()}},
	{get text(){return "alemaninc will now proceed to guess your timezone."+newsSupport.br(250)+"Are you in UTC"+newsSupport.timezone()+"?"}},
	{get year(){return new Date().getFullYear()},get month(){return new Date().getMonth()+1},get longMonth(){return String(new Date().getMonth()+1).padStart(2,"0")},get day(){return new Date().getDate()},get longDay(){return String(new Date().getDate()).padStart(2,"0")},get text(){return "If you are in England, the date is "+this.day+"/"+this.month+"/"+this.year+". If you are in America, the date is "+this.month+"/"+this.day+"/"+this.year+". If you are in Sweden, the date is "+this.year+"-"+this.longMonth+"-"+this.longDay+". If you are in Poland, the date is "+this.day+" "+roman(this.month).toLowerCase()+" "+this.year+". If you are in xhwzwka's to-do list, the date is "+this.year+"-"+this.longDay+"-"+this.longMonth+". If you are in Microsoft Excel, the date is "+newsSupport.excelDate()+". If you are on Mount Ebott, the date is "+Math.floor(this.year/10)+"X. If you are in the browser, the date is "+(new Date().toString())+"."},get weight(){return this.month==this.day?0:1}},
	{text:"Discovery №1: The planets move.",get weight(){return g.totalDiscoveries.gt(c.d0)?0.5:0}},
	{text:"Discovery №2: Earth moves.",get weight(){return g.totalDiscoveries.gt(c.d1)?0.5:0}},
	{text:"Discovery №3: C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → 6H<sub>2</sub>O + 6CO<sub>2</sub> (+ energy)",get weight(){return g.totalDiscoveries.gt(c.d2)?0.5:0}},
	{text:"Discovery №4: 6H<sub>2</sub>O + 6CO<sub>2</sub> → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub>",get weight(){return g.totalDiscoveries.gt(c.d3)?0.5:0}},
	{text:"Discovery №5: Atom + atom = molecule.",get weight(){return g.totalDiscoveries.gt(c.d4)?0.5:0}},
	{text:"Discovery №6: Mass ÷ mole = 6.02214076 × 10<sup>23</sup>",get weight(){return g.totalDiscoveries.gt(c.d5)?0.5:0}},
	{text:"Discovery №7: The continents move.",get weight(){return g.totalDiscoveries.gt(c.d6)?0.5:0}},
	{text:"Discovery №8: Playing this game is a hazard to the aquatic environment.",get weight(){return g.totalDiscoveries.gt(c.d7)?0.5:0}},
	{text:"<s>Discovery №9: Evolution is sorcery made up by communists.</s>"+newsSupport.br(100)+"The 9th Discovery doesn't exist.",get weight(){return g.totalDiscoveries.gt(c.d8)?0.5:0}},
	{text:"Discovery №10: Genes can jump.",get weight(){return g.totalDiscoveries.gt(c.d9)?0.5:0}},
	{text:"Discovery №11: DNA is a 🧬 double helix.",get weight(){return g.totalDiscoveries.gt(c.d10)?0.5:0}},
	{text:"Discovery №12: He who is a diabetic but forgets to take their insulin shall be condemned to a slow and certain death.",get weight(){return g.totalDiscoveries.gt(c.d11)?0.5:0}},
	{text:"Discovery №13: X-rays are able to penetrate opaque black paper wrapped around a cathode ray tube, causing a nearby table to glow with fluorescence.",get weight(){return g.totalDiscoveries.gt(c.d12)?0.5:0}},
	{text:"Discovery №14: If you drop a metric ton of bricks and a metric ton of feathers off a building, they will experience the same velocity. If you drop a metric ton of bricks and an imperial ton of bricks off a building, they too will experience the same velocity.",get weight(){return g.totalDiscoveries.gt(c.d13)?0.5:0}},
	{text:"Discovery №15: c = (E ÷ m)<sup>0.5</sup>",get weight(){return g.totalDiscoveries.gt(c.d14)?0.5:0}},
	{text:"Discovery №16: You should go make a Discovery in real life.",get weight(){return g.totalDiscoveries.gt(c.d15)?0.5:0}},
	{text:"Beware of phishing attempts, keep your information safe!"+newsSupport.br(window.innerWidth)+"<span onClick=\"newsSupport.phishing()\">🎣"+newsSupport.br(150)+"</span>Look, a phishing rod! You should click this.</span>"},
	{get text(){return "Have you ever wondered what the code of a news message looks like? Here is the code of a random news message: "+newsSupport.codeInsight(newsSupport.randomVisible())}},
	{text:"<span onClick=\"newsSupport.secretAchievementHelp()\">Click this for help with a secret achievement!</span>",get weight(){return (1-totalSecretAchievements/Object.keys(secretAchievementList).length)/4}},
	{text:"tHiS mEsSaGe Is CaSe sEnSiTiVe"},
	{text:"You have <span style=\"color:#df5050;font-size:20px\">0</span> antimatter. Go <a href=\"https://ivark.github.io/AntimatterDimensions/\">here</a> to get some!"},
	{text:[...[1,2,3,4,5,6,7,8,9].map(x=>((10**x-1)/9)+"<sup>2</sup> = "+String(BigInt((10**x-1)/9)**2n)),"But 1111111111<sup>2</sup> is 1234567<i>900</i>987654321! How!?"].join(newsSupport.br(100))},
	{text:"Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity."},
	{text:"A concoction of varied pastries, puzzling grass and towers and citadels tall as though they piece the very sky... Seriously, how is this my game repertoire?!"},
	{text:"They say if you look in a mirror and ping alemaninc three times in a row you'll instantly die."},
	{get text(){return "Once upon a time, there was a young child named Northo. One day, Northo went to alemaninc, the world-renowned creator of exotic matter, and said to Him: \"less discord, more commits thanks.\" And alemaninc said: \"Do you not know that Discord is the lifeblood of commits? Without Discord, there would be no exotic matter at all. Run along now, young one, and perhaps one day we will meet again in Tier "+(Object.keys(achievementList).filter(x=>(Number(x)!==NaN)&&(achievement.ownedInTier(x)>0)).length+1)+".\" And Northo never spoke of Discord in a negative light again. The end."}},
	{get text(){return newsSupport.jacorb.filter(x=>x.visible).map(x=>"You have "+x.value+" "+x.label+". <span style=\"color:#8a8767;text-shadow: 0px 1px 0px #a0a67c;\">(softcapped to "+x.softcapped+")</span>").join(". ")},get weight(){return g.XAxis.gt(0)}},
	{text:"You feel like making exotic matter. But no one wants to eat your exotic matter.",get weight(){return stat.totalAxis.eq(c.d0)}},
	{text:"You feel like making dark matter. But no one wants to eat your dark matter.",get weight(){return ((g.stardustUpgrades[4]>0)&&stat.totalDarkAxis.eq(c.d0))?1:0}},
	{text:"The universe has now turned into exotic matter, to the molecular level.",get weight(){return g.exoticmatter.gt(1e12)?1:0}},
	{text:"A local news station runs a 10-minute segment about your exotic matter. Success! <span style=\"font-size:50%\">(you win an exotic matter)</span>",get weight(){return g.exoticmatter.gt(1e13)?1:0}},
	{text:"This is not about wormholes... yet.",get weight(){return g.storySnippets.includes("Black hole")?0:1}},
	{text:"The Holy Quincunx of alemaninc: exotic matter, stardust, dark matter, hawking radiation and mastery power. These 5 resources let us access alemaninc's gift, Knowledge. And with this Knowledge, we reach out to alemaninc, and call, \"alemaninc, bless us on this fine day!\" And alemaninc does. He gives us the blessing of Research. This Research was a blessing so powerful, alemaninc restricted their power. He said, \"I will give you a choice of three paths\" and then humanity chose. The short, cheap route of 1-3, giving instant gratification, the powerful choice of 1-8, which were a fast, middle ground path, or 1-13, the long wait, and struggle, of humanity. Then, as humanity chose, a spacecraft broke the earth. A human walked out and said to humanity, \"I will offer the powerful choice of a R axis! I am Stat Mark, Lord of all Unalemanic\". Humanity rose and said \"Begone Stat Mark! We want none of your foul Heresy!\" And alemaninc rose as well, and smote Stat Mark with his godlike power. As Stat Mark's corpse fell into the earth, he cried \"This will not be the last of me!, Alemaninc will betr- 😠\" and he fell in the Abyss of exotic matter. alemaninc gifted humanity with Studies, which boosted achievements and stars. And alemaninc gave humanity his greatest gift. Wormhole Milestones. He said, these will do all your work for you, but their requirement will increase 30 times. Use them wisely. And Humanity journeyed off with their new power, as Stat Mark's words echoed in their heads.",get weight(){return unlocked("Hawking Radiation")?1:0}},
	{text:"News will resume in: "+countTo(100,true).map(x => (100-x)+newsSupport.br(100-x)).join("")+". Thank you for your patience."},
	{text:"<span onClick=\"g.newsTickerSpeed=0\">Click this to pause the news</span>"},
	{text:"<span onClick=\"g.newsTickerSpeed=11330738570.1\">Click this to accelerate the news to the speed of light</span>"},
	{text:["3<sup>3</sup> = 27","<sup>3</sup>3 = 3<sup>3<sup>3</sup></sup>","3<sup>3</sup>3 = ?"].join(newsSupport.br(100))},
	{get text(){return "If every exotic matter was a planck volume, you would have enough to fill "+BEformat(g.exoticmatter)+" planck volumes."}},
	{text:"We interrupt our programming, this is a national emergency. Weather stations in "+newsSupport.redacted+" have detected exotic matter in the air. Exotic matter is known to invert gravity in large concentrations. If you begin to levitate, evacuate the area immediately."},
	{text:"Now at your local grocery store: exotic matter flavored ice cream! Experience the all-new gravitation sensation that's gripping the nation! Caution: explosive, flammable, oxidising, gas under pressure, corrosive, acutely toxic, radioactive, environmental hazard."},
	{get text(){return "\"Today is "+(newsSupport.excelDate()-44100)+" days since 2020-09-26. If you divide that by 25 you get "+(newsSupport.excelDate()/25-1764).toFixed(2)+". What happened on 2020-09-26, you may ask? Nothing, but we still measure the time.\" - xhwzwka"}},
	{get text(){return "You have "+newsSupport.formatZP()+". Wait, what's a Zip Point?"}},
	{text:"Welcome back to another episode of \"Exotic Math Dimensions\" by alemaninc! We all know that 2 + 2 = 5. But there are still many people who unknowingly partake in logic denial by claiming that 2 + 2 = 4. In this episode I will prove once and for all that 2 + 2 = 5. We all know that 9 + 10 = 21. If we subtract 0.5 from both sides, we get 9 + 9.5 = 20.5. Now, when we add 0.5 to both sides, we get 9.5 + 9.5 = 21. Now the two terms on the left side are equal. The next step is to divide both sides by 2 to produce 4.75 + 4.75 = 10.5. Now, we subtract 2.75 from both sides, getting 2 + 4.75 = 7.75. Finally, we subtract 2.75 from both sides again, and so we get our final answer of 2 + 2 = 5! Stay tuned for another episode of \"Exotic Math Dimensions\" by alemaninc, where we will prove that quaternion multiplication is sorcery made up by communists."},
	{text:"This message was written by xhwzwka. Who's that, you may ask? Ask him! He's 324862 years old, his real name is &lt;unknown&gt;, his Discord number is xhwzwka#7155, he lives at 72 W Street and his credit card number is 72917164954."},
	{text:"Hello, dear players of \"Exotic Matter Dimensions\"! alemaninc left his computer unattended, so I thought I might have some fun with this. alemaninc's real name is $, he lives at $ in $, $ and he is $ years old but still $ and gets a suspicious amount of $ from $ who $. If you see this message, ping alemaninc \"$\" at $ and post a screenshot in $.".replaceAll("$",newsSupport.redacted)},
	{get text(){return [Array.random(newsSupport.CSSBaseShades)].map(x=>"<span style=\"color:"+newsSupport.intBaseShade(x)+"\">This news message is "+x+".</span>")[0]}},
	{text:"They say that stardust tastes like everything at once.",get weight(){return unlocked("Stardust")?1:0}},
	{text:"If you dilate time fast enough, you can start to see blue sparks."},
	{text:"This message is not helpful."},
	{text:"It's $29 a gigajoule, people, so stop being cheap, stop trying to charge your phones with mastery power and stop blowing yourselves through the roof! If one more person comes in here with a burned forehead, I swear I won't treat him. It's $29 a gigajoule!",get weight(){return g.achievement[105]?1:0}},
	{text:"In 5 hours, something will happen."},
	{text:"Exponentiation is powerful. Just ask any incremental game player!",get weight(){return (g.stars>9||g.achievement[401]||unlocked("Energy"))?1:0}},
	{text:["demons","angels","fallen angels","Satan","Lucifer","the seventh circle of Hell","fun"].map(x=>"If you're looking for "+x+", this is the wrong game. ").join("")+"If you're looking to waste time, this is the right game!"},
	{text:"Normal energy isn't real. Stop trying to look for it.",get weight(){return g.stardustUpgrades[4]==stat.stardustUpgrade5Cap?1:0}},
	{text:"Breaking news! Nothing has happened!"},
	{text:"Click here to click here."},
	{text:"One day, Supernova will return and the Phoenix Prophecy shall be fulfilled.",get weight(){return g.achievement[401]?1:0}},
	{text:"I'm feeling quite energetic today.",get weight(){return unlocked("Energy")?1:0}},
	{text:"They say that the W Axis is time.",get weight(){return g.achievement[102]?1:0}},
	{text:"May the stars guide you.",get weight(){return g.stars>0?1:0}},
	{text:"The news ticker is now empowered.",get weight(){return g.studyCompletions[1]>0?1:0}},
	{text:"You have a strange feeling for a moment, then it passes."},
	{text:"The biscuit is a lie."},
	{text:"Antimatter ghosts do not exist. Just like matter ghosts. They don't have any matter, for that matter. Exotic matter ghosts, on the other hand, can be found in every respectable Hallowe'en store."},
	{text:"Hydrogen fuel has been abandoned by the American space program in favor of exotic matter fuel."},
	{text:"Theoretical physicists of the world discover new exotic matter producer - \"Oh boy, guess we were wrong all along!\""},
	{get text(){return "In the news today, a new religion has been created, and it's spreading like wildfire. The believers of this religion worship the \"alemaninc Inc.\" company, who claim to be the gods of exotic matter. They also claim that there are "+numword(this.dims())+" dimensions."},get weight(){return this.dims()==3?0:1},dims:function(){return fullAxisCodes.map(x=>g[x+"Axis"].eq(c.d0)?0:1).sum()}},
	{text:"You made one exotic matter! Whatever that means."},
	{text:"None of this matters."},
	{get text(){return "Common sense confirms that the color of exotic matter is <div style=\"height:1em;width:1em;background-color:"+this.color+"\"></div>"},get color(){return getComputedStyle(document.body).getPropertyValue("--exoticmatter")}},
	{get text(){return "A revolutionary new metric of quantifying <i>Exotic Matter Dimensions</i> savefiles has been invented called the \"Exotic Matter Progress "+newsSupport.EMDevelopmentVariables().length+" Development Index\". Your score in this index is: "+BEformat(newsSupport.EMDevelopmentIndex())+"!"}},
	{get text(){return "Oh, so you like "+g.notation+" notation? Okay, then what number is "+N(10).quad_tetr(10**308**Math.random()).format()+" in "+g.notation+" notation?"}},
	{get text(){return "After "+numword(ranint(12,20))+" years of painstaking research, leading scientists have managed to reveal the smell of exotic matter. It smells like "+this.objects.select([3,5,7].random()).joinWithAnd()+", all at the same time."},objects:["kittens","puppies","pumpkin pie spice","pennyroyal","acorns","Japanese wisteria","old apples","black pepper","chocolate","epazote","daphne","cut grass","driftwood","parsley","wine","alemaninc's burnt gingerbread","lady fern","ash","cotton candy","pipe tobacco","gasoline","soap","mahogany","a damp canvas","sulfur","cheap aftershave","cigarettes","dew","blood sausage","blood orange","fresh breeze","vinegar","desert sand","damp soil","bear fur","raw horse flesh","dirty sheets","petrichor","cinnamon buns","whiskey","rubber","the purr of a cat","cannabis","an old book","crayons","brine","ink creosote","mountain air","oven cleaner","fresh prune","old prune","French vanilla","Hallowe'en candy","warm milk","chocolate chip cookies","antimatter","salt","east west","north","the carpet of your childhood","comet","Mettaton","gin","seaside","silver","gold","platinum","sawdust","scratch 'n' sniff stickers","honey","campfire","achievements","math","mastery power","dark matter","white mildew","brown mold","Earl Grey tea","rain","sugar eggs","ozone","baking bread","snow","bubble gum","bacon","crystal","time crystal","dilated time","stars","dragon's blood","smoke","cobblestones","beeswax","mediterranean breeze","birthday cake",numword(ranint(1,12))+" o'clock","sin","spirit replicator","space","time"]},
	{text:"\"Research is too hard\"",get weight(){return g.totalDiscoveries.gt(3)?1:0}},
	{text:"But to an exotic matter person, wouldn't they be matter and us exotic matter? *gasp* But to an exotic antimatter person, wouldn't they be matter and us exotic antimatter?"},
	{text:"It doesn't matter if exotic matter matters"},
	{get text(){return "Inflation rates by dimension: "+axisCodes.slice(0,stat.axisUnlocked).map(x => x+" Axis: "+axisCost(x,g[x+"Axis"].add(c.d1)).div(axisCost(x)).sub(c.d1).mul(c.e2).format(2)+"%").join(newsSupport.br(100))},get weight(){return stat.axisUnlocked>3?1:0}},
	{text:"Legends say that Achievements taste like chicken. However, Secret Achievments taste like beef."},
	{text:"A fourth type of matter has been discovered: tropical matter. It's like exotic matter but with a different name. The scientist who discovered it has been promoted to the lead of all existing research programs."},
	{text:"The Q Axis neither exists nor doesn't exist. In fact, absolutely nothing is known about the Q Axis, not even that absolutely nothing is known about the Q Axis.",get weight(){return g.stardustUpgrades[0]<5?1:0}},
	{text:"If the 26th axis is the A axis, then what is the 27th axis?"},
	{text:"\"Shouldn't it be called 'Exotic Matter Axes'\"?"},
	{text:"An unidentified developer of Exotic Matter Dimensions would like to recommend that you play <a href=\"https://ivark.github.io/AntimatterDimensions/\" target=\"_blank\">Antimatter Dimensions</a>."},
	{text:"An unidentified developer of Exotic Matter Dimensions would like to recommend that you play <a href=\"http://semenar.ru/matter-dim-test/\" target=\"_blank\">Matter Dimensions</a>."},
	{text:"An unidentified developer of Exotic Matter Dimensions would like to recommend that you play <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" target=\"_blank\">Strange Matter Dimensions</a>."},
	{text:"2 + 2 = 2 × 2 = 2<sup>2</sup> = 2↑↑2"},
	{get text(){if(g.dilationUpgradesUnlocked==4){return "error"};return "You're so close to unlocking Dilation Upgrade "+(g.dilationUpgradesUnlocked+1)+"! You only need "+BEformat(dilationUpgrades[g.dilationUpgradesUnlocked+1].tickspeedNeeded)+"× tickspeed"},get weight(){return [0,4].includes(g.dilationUpgradesUnlocked)?0:1}},
	{text:"Exotic matter has made time travel possible. Unfortunately nobody who tried it has returned yet."},
	{text:"The next statement is false."+newsSupport.br(100)+"The previous statement is true."},
	{text:"<span onClick=\"newsSupport.interestingTickerActiveUntil=Date.now()+1e4\">Click here to make the news ticker more interesting.</span>"},
	{text:"<span onClick=\"g.newsTickerSpeed=0\">Click here to make the news ticker less interesting.</span>"},
	{text:" ҉"},
	{text:"Looking for the secret news ticker? It doesn't exist!"},
	{text:"Here's a boring news message."},
	{get text(){return "<span style=\"font-family:"+Array.random(["'Courier New', Courier, monospace","'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif","'Times New Roman', Times, serif","fantasy","cursive"])+";font-size:"+ranint(50,125)+"%;color:#"+ranint(0,16777215).toString(16).padStart(6,"0")+"\">Here's an interesting news message.</span>"}},
	{text:"Your news message failed to load."},
	{text:"How low can it go? 2"+Array(100).fill("<sub>2").join("")+Array(100).fill("</sub>").join("")},
	{text:"You can waste up to H<sub>ω<sup>2</sup></sub>[10] years here if you want"},
	{text:"Don't mind me, I'm just another random news message."},
	{text:"Refreshing cures Light mode.",get weight(){return ((new Date().getUTCMonth()==3) && (new Date().getUTCDate()==1))?1:0}},
	{get text(){return "Thank you for playing Exotic Matter Dimensions Version "+d.element("span_currentVersion").innerHTML+"!"}},
	{get text(){return "If I have bad $, I'll study $ until I have good $.".replaceAll("$",Array.random(["HTML","CSS","JavaScript"]))}},
	{get text(){return "\"Because of this game I can now use the word '"+Array.random(["Stardust",...(unlocked("Hawking Radiation")?["Wormhole"]:[])])+"' as a verb\""},get weight(){return unlocked("Stardust")?1:0}},
	{text:Array(33).join("A")+"lemaninc made Exotic Matter Dimensions. Therefore, "+Array(33).join("E")+"xotic Matter Dimensions was made by alemaninc."},
	{text:"We have updated our Exotic Matter Privacy Policy."},
	{get text(){return "<div style=\"width:"+ranint(400,1200,true)+"px;height:20px;background-image:linear-gradient(90deg,rgba(255,0,255,0),rgba(255,0,0,0.5),rgba(255,255,0,0.5),rgba(0,255,0,0.5),rgba(0,255,255,0.5),rgba(0,0,255,0.5),rgba(255,0,255,0.5),rgba(255,0,0,0.5),rgba(255,255,0,0))\"></div>"}},
	{get text(){return "Congratulations! You have reached the end of Exotic Matter Dimensions "+d.element("span_currentVersion").innerHTML+"! While we wait for alemaninc to produce another release, why don't you experience the fun all over again? It's really easy, just go to Options, press the big black button and input the password."}},
	{text:"If <span style=\"color:#0000ff\">alemaninc</span> is <span style=\"color:#0000ff\">blue</span> and <span style=\"color:#ff0000\">xhwzwka</span> is <span style=\"color:#ff0000\">red</span>, what color is <span style=\"color:#00ffff\">Stat Mark</span>?"},
	{get text(){return "Did you know "+ranint(60,140)+"% of statistics are made up on the spot?"}},
	{text:"\"But the R axis does exist! You just won't be able to experience it until around 𝕍6.9...\" - xhwzwka"+newsSupport.br(100)+"Little does xhwzwka know, that the R axis will enter the playing field as soon as 𝕍1.5.",get weight(){return (g.stardustUpgrades[0]==4)?1:0}},
	{get text(){return "Have you ever wondered what a news message looks like in reversed order? Here is a random news message, inverted: \""+deHTML(newsSupport.randomVisible().text.split("").reverse().join(""))+"\""}},
	{text:"Long, long ago, there was a great and powerful Developer named Hevipelle. One day, Hevipelle used His control of antimatter to gaze into the distant future. With his newfound knowledge, He said: \"If Gaben can't count to three, and Hevipelle can't count to nine, will there be some other game developer in the future that can't count to 27?\" As it turns out, Hevipelle's prophecy came true, for each of alemaninc's axes has an uppercase Latin alphabet letter assigned to it, but alas, there are only 26 uppercase Latin alphabet letters..."},
	{text:"\""+["Oups!","Wensday","It's spelt Wensday, Right?","You spell it Wensday?","I guess I'll never knowm"].join(newsSupport.br(50))+"\" - xhwzwka after a long night of "+newsSupport.redacted},
	{text:"<span onClick=\"g.newsTickerSpeed*=-1\">Click this to make the news ticker reverse direction</span>"},
	{visibleChars:countTo(7,true).select(2),get text(){return "\"JavaScript's not the best language, "+Array.random(["English","Polish","French","Finnish","Python"]).split("").map((x,i)=>this.visibleChars.includes(i)?x:"<span style=\"opacity:0.5\">#</span>").join("")+" is.\" - alemaninc"}},
	{basetext:"A preview of the next update: once you reach $ $, you gain access to the $ $, which in turn lets you unlock $. Each $ has a $ each second to $, giving a $ to $. However, this effect only works in $ unless you have $ or the $ achievement. When you reach {1} $, you can exchange them for a $, and when you get {1} $ you beat the game.".replaceAll("$",newsSupport.redacted),get text(){return this.basetext.replaceAll("{1}",c.inf.format())}},
	{text:"Did you know £ is powered by $ by Patashu? However, at the time when alemaninc was making £, $ didn't have a working superlogarithm function! So, alemaninc decided to improve his copy of $. Now, £ is one of the only games powered by $ where the superlogarithm works. All the other games powered by $ are forever doomed to have a broken superlogarithm. How cruel of alemaninc to not donate his functional functions to $.".replaceAll("$","<i>break_eternity.js</i>").replaceAll("£","\"Exotic Matter Dimensions\"")},
	{text:"To jest próba \"Wiadomości 2.0\". Wiadomości 2.0 będzie zawierać funkcje włączając opcję czytania wiadomości w językach obcych."},
	{text:"- .... .. ... / .. ... / .- / - . ... - / --- ..-. / .-..-. -. . .-- ... / ..--- .-.-.- ----- .-..-. .-.-.- / -. . .-- ... / ..--- .-.-.- ----- / .-- .. .-.. .-.. / .... .- ...- . / ..-. ..- -. -.-. - .. --- -. ... / .. -. -.-. .-.. ..- -.. .. -. --. / - .... . / .- -... .. .-.. .. - -.-- / - --- / .-. . -.-. . .. ...- . / - .... . / -. . .-- ... / .. -. / -- --- .-. ... . / -.-. --- -.. . .-.-.-"},
	{text:"Okay Google, destroy the universe.",get weight(){return unlocked("Hawking Radiation")?1:0}},
	{text:"<span id=\"news_DiscoTime\" onClick=\"d.innerHTML('news_DiscoTime','Disco Time!');d.element('news_DiscoTime').style = 'color:hsl('+ranint(0,359)+' 90% 60%);animation-name:text-grow;animation-duration:0.5s;animation-iteration-count:infinite;'\">Disco Time! (click me!)</span>"},
	{text:"The real update is the friends we made along the way."},
	{get text(){return "<span onClick=\"newsSupport.addZP()\">You have <span id=\"news_zipPoints\">"+newsSupport.formatZP()+"</span>. Click this news message to get some!</span>"}},
	{get text(){return "<span onClick=\"currentNewsOffset=1e6;newsSupport.cashInZP()\">You have accumulated enough Zip Points to cash them in for a prize! Click this news message to claim your prize.</span>"},get weight(){return g.zipPoints>=1e3?1:0}},
	{get text(){return "Hello, this is "+countTo(7).map(x=>String.fromCharCode(ranint(97,122))).join("")+" with this century's weather forecast for your galaxy. We'll be hitting temperatures in the region of "+BEformat(ranint(1e6,1e10,true))+", and by the end of the "+(ranint(6,9)*10)+"s, it'll be cloudy with a chance of exotic matter."}},
	{text:"<span onClick=\"error('I told you so')\">Click here to break the game</span>"},
	{get text(){return "There is a "+(100/newsList.length).toFixed(2)+"% chance that the next message is \""+newsSupport.randomVisible().text+"\""}},
	{text:"randomNewsItem();"},
	{text:"Hi, my name is Max Axis, and I would like it if people stopped trying to buy me."},
	{get text(){return [newsSupport.randomVisible().text].map(x=>x+newsSupport.br(100)+"The previous news message contained "+this.letters(x)+" of the 26 letters of the Latin alphabet.")[0]},letters:function(text){return countTo(26).map(x=>text.toLowerCase().search(String.fromCharCode(x+96))==-1?0:1).sum()}},
	{text:"Don't tell anyone that alemaninc is using the image in the stardust reset button illegally!",get weight(){return unlocked("Stardust")?0.1:0}},
	{text:"Use the multiplication sign ×, not the letter x, to indicate the X axis."},
	{text:"You are now breathing manually. You've now realized there's no comfortable spot in your mouth for your tongue. You are now manually holding your jaw up. You haven't blinked in a few seconds. You can see a little bit of your nose at all times."},
	{text:"Hello to you Kripparian. I am Rajkumar from India. I am seeking your correspondence for an important business matter. However, when I attempt to chat with you, your unruly chat participants are continuously mock my english and repost my message over and over. Please contact me at your fast convience. Thank you my friend."},
	{get text(){return "Matter dimensions are not real. Antimatter dimensions are not real. This has only been the case since "+(5+new Date().getUTCMinutes()%10)+" minutes ago when the two came into contact."}},
	{get text(){return "Your daily shades of the sky forecast - "+newsSupport.CSSBaseShades.select(7).map((x,i)=>["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][i]+": <span style=\"color:"+newsSupport.intBaseShade(x)+"\">"+x+"</span>").join(newsSupport.br(50))}},
	{text:"If you have an idea for a news message, shout it into the void. It won't get your message into the game, but it's fun!"},
	{text:"<span onClick=\"d.element('game').style.filter='brightness(25%)';setTimeout(function(){d.element('game').style.filter=''},5000)\">Click here to turn the lights off.</span>"},
	{text:"<span onClick=\"d.element('game').style.filter='brightness(400%)';setTimeout(function(){d.element('game').style.filter=''},5000)\">Click here to increase the brightness.</span>"},
	{text:"\"When you try your worst but still succeed\" - Stat Mark"},
	{text:"What if you beat the game, and alemaninc said, \"you just lost The Game\"?"},
	{text:"<span onClick=\"let reading=[newsSupport.randomVisible().text];while(reading.map(x=>x.length).sum()<1e4){reading.push(newsSupport.randomVisible().text)};let out='<p>We have compiled a list of '+reading.length+' news messages so that you can read more high-quality journalism.</p>'+reading.map(x=>'<p>'+x.replaceAll('padding-left','nullCSSlol')+'</p>').join('');popup({text:out,buttons:[['Read Less','']]})\">Read More</span>"},
	{text:"You can destroy the universe already, what are you still doing in Iron Will?",get weight(){return (stat.totalDarkAxis.gt(stat.wormholeDarkAxisReq)&&stat.ironWill)?1:0}},
	{text:"The scientific community remains baffled over the meaning of 44,031. \"We're certain it's related to OMCCDV, but now the question is what OMCCDV <i>is</i>,\" one researcher notes.",get weight(){return g.achievement[413]?1:0}},
	{text:"A wormhole a day keeps the update away.",get weight(){return unlocked("Hawking Radiation")?1:0}},
	{text:"Go plant a research tree in real life.",get weight(){return g.totalDiscoveries.gte(c.d100)?1:g.totalDiscoveries.div(c.e2).toNumber()}},
	{get text(){return "There are currently "+newsList.length+" news ticker items. That is "+(100*newsList.length/this.target()).toFixed(2)+"% of alemaninc's target of "+this.target()+" items! The ticker was created on 2023-04-03 at 10:23 UTC, therefore, it will take approximately "+timeFormat(this.timeToTarget())+" to reach the target."},timeElapsedSince1stTicker:function(){return Date.now()/1e3-1680517380},target:function(){return Decimal.decibel(Math.round(Math.log10(newsList.length*2)*10)).toNumber()},timeToTarget:function(){return this.timeElapsedSince1stTicker()*((this.target()/newsList.length)-1)}},
	{text:"<span onClick=\"var newsSpamMessageLoop=setInterval(function(){notify(Array.random(newsSupport.spamCompendium),'hsl('+ranint(0,359)+' 80% 40%)','#000000')},200);setTimeout(function(){clearInterval(newsSpamMessageLoop)},1e4)\">Click here to sign up for promotions</span>"},
	{text:"<span onClick=\"newsSupport.hardMath()\">Click here to solve math.</span>"},
	{text:"The developers at alemaninc have been secretly replaced by aliens. They are made entirely of exotic matter."},
	{text:"We regret to inform you that the exotic matter you've been collecting is actually just glitter in disguise. Sorry for the inconvenience."},
	{get text(){return "Congratulations! You've unlocked the Pudding Axis! The Pudding Axis produces 1 pudding matter per real-life second. When you reach "+N(Math.random()).layerplus(3).format()+" pudding matter, you can reset your pudding matter to gain 1 Pudding Point (PP). Then, when you reach "+N(Math.random()).layerplus(2).format()+" PP, you can reset your pudding matter and PP for a permanent, additive 1% boost to exotic matter production, up to a cap of 200% more exotic matter!"},get weight(){return g.stardustUpgrades[0]>3?1:0}},
	{text:"Have you ever wondered what exotic matter tastes like? So have we! We recruited ten lucky volunteers to taste some exotic matter and report back to us, but we haven't heard back from any of them yet."},
	{get text(){return "Rumor has it that there's secret Easter eggs hidden in the game. "+Object.keys(secretAchievementList).length+" are in the achievements, most of the others are in the news."}},
	{get text(){return "Welcome back to another episode of \"Exotic Math Dimensions\" by alemaninc! In this episode we'll solve a riddle submitted by one of our subscribers: \"Given that a = "+this.num()+", b = "+this.num()+", c = "+this.num()+" and that {(0,a),("+(10**Math.random()).toFixed(2)+",b),("+BEformat(10**Math.log10(Number.MAX_VALUE)**Math.random(),2)+",c),("+this.num()+",d)} is a cubic function, find the value of d.\" The answer is actually surprisingly simple. d = <span style=\"color:#ff0000\">Error: Insufficient MEM</span>! Stay tuned for another episode of \"Exotic Math Dimensions\" by alemaninc, where we will prove that the number 17 doesn't exist."},num:function(){return visualiseLargeNumber(N(Math.random()).layerplus(Math.PI+(Math.PI-3)*(1-Math.random()*2)))}},
	{get text(){return "Help, I'm trapped in a "+Array.random(["British","Polish","Russian","German","Swedish"])+" news message factory!"}},
	{text:"Is it safe to say that all of these news messages are fake?",get weight(){return timeSinceGameOpened>180?1:0}},
	{text:"\"I dedicate this game to myself\" - alemaninc"},
	{text:"<span onClick=\"newsSupport.setBackground('#ff9900')\">Click here to set the theme to Orange</span>"},
	{text:"You will see this news message only once in a green moon."},
	{text:"Do people truly play this or do they only look at it for a few minutes once a day?",get weight(){return unlocked("Stardust")?1:0}},
	{text:"So you came to play a game? Let the game begin!",get weight(){return timeSinceGameOpened<5?1:0}},
	{text:"But if all the stars generate gray light, why are the buttons colored? No one will ever know.",get weight(){return unlocked("Light")?1:0}},
	{text:"Some say exotic matter cookies are real, others say they are fake. I just say they are delicious."},
	{text:"You have observed this news message.",get weight(){return unlocked("Hawking Radiation")?1:0}},
	{get text(){return "There are "+(newsList.length-newsList.map(x=>Math.random()<newsWeight(x)?1:0).sum())+" news items which you can't see."}},
	{text:"\"b0128m fafs: 1[victim1] 2[victim2] etc	Makes [victim1], [victim2], [victim3] etc attract each other at a speed of 150,000,000m per second	Until they colide\" - Stat Mark after a long night of "+newsSupport.redacted},
	{text:"alemaninc forgot to update the game again. I guess you can say he has exotic matter dementia."},
	{text:"Once upon a time, xhwzwka said, \"alemaninc, the plural is 'axes', not 'axis'!\" But, alemaninc did not care one bit."},
	{get text(){return (g.stars==0)?newsSupport.error:("Here is a representation of a Row "+countTo(Math.min(g.stars,40)).map(x=>starRow(x)).reduce((x,y)=>Math.max(x,y))+" star: ★")},get weight(){return g.stars>0?1:0}},
	{get text(){return "In 2019, the United Nations estimated the average human lifespan across planet Earth was 72.6 years. What the United Nations did not take into consideration, though, is that exotic matter wormholes have made time tick "+(stat.tickspeed.gt(c.d1)?(stat.tickspeed.format(3)+"× faster"):(stat.tickspeed.recip().format(3)+"× slower"))+". Consequently, that figure is "+(stat.tickspeed.gt(c.d1)?"reduced":"increased")+" to around "+timeFormat(this.num.div(stat.tickspeed))+"."},get weight(){return stat.tickspeed.log10().abs().min(c.d1).toNumber()},num:N(2291032826.87)},
	{get text(){return "Fact: at this rate you will make a new Discovery in "+timeFormat(nextDiscovery().sub(g.knowledge).div(stat.knowledgePerSec))+"."},get weight(){return unlocked("Hawking Radiation")&&g.totalDiscoveries.lt(c.e3)?1:0}},
	{text:"<span onClick=\"newsSupport.setBackground(newsSupport.lightColor())\">Click this to set the background to the combined color of all your Light.</span>",get weight(){return unlocked("Light")?1:0}},
	{text:"<span onClick=\"d.element('newsticker').style['animation-name'] = 'rotate';d.element('newsticker').style['animation-duration'] = '30s';d.element('newsticker').style['animation-timing-function'] = 'linear'\">Click here to spin the news ticker around</span>"},
	{get text(){return "Fact: the average color of all your chroma is <span style=\"color:"+newsSupport.lightColor()+"\">"+newsSupport.lightColor()+"</span>."},get weight(){return unlocked("Light")?1:0}},
	{text:"<span class=\"_time\">No cheating! Are you cheating?</span>",get weight(){return g.dilatedTime>((Date.now()-new Date("2023-02-14"))/1e3)?1:0}},
	{get text(){return "Only "+g.knowledge.format()+" knowledge? You're not really smart."},get weight(){return g.knowledge.layer==0?0:1}},
	{text:"So when will someone ask alemaninc why there's a stupid star hardcap anyways?",get weight(){return g.achievement[612]?1:0}},
	{text:"You've been lied to. There is no update, alemaninc is not real. <i>Exotic Matter Dimensions</i> is a lie fabricated by <i>Matter Dimensions</i>. Oh yeah, and something about the earth being flat and controlled by lizard people. But that's not important isn't it? What matters most is that the antimatter government is being taken over by the matter government, a silent coup, and has created this game to stop you from playing <i>Antimatter Dimensions</i>. Don't you realise you've not opened that game in over 4 weeks? Do you still remember your offline progress still being made to this moment? No, you have not, at least not until i have reminded you of it. The matter insurgency is using neurotoxin to poison your brains, causing the incremental cortex in your brain to be shut down. So, what can you do? Sadly, you can do nothing. If you have breathed any air for the past 4 weeks, I'm afraid there is little time left. Soon, you will forget about this entire genre and return to playing Valorant or Rainbow Six Siege or whatever it is these youngsters play these days. I'm sorry. You can not go back now. This is the end of your incremental game progress. Bravo Six, going dark."},
	{text:"If you're looking for a zero player game, I recommend Conway's Game of Life.",get weight(){return g.achievement[216]?1:0}},
	{text:"Reddit blackout protests have achieved very little, surprising no one. In fact, the only thing they achieved was alemaninc having nowhere to advertise the Light Update. :angry:"},
	{get text(){return "If you're reading this, you've just lost 0.0000000000000001% of your exotic matter. That is "+BEformat(g.exoticmatter.div(1e97))+" universes of exotic matter, which were the home of "+BEformat(g.exoticmatter.div(5e87*(2+Math.random())))+" innocent people. You monster."},get weight(){return g.exoticmatter.gt(c.e100)?1:0}},
	{text:"Normal goats have eye slits that look like minus signs. Antimatter goats, on the other hand, have eye slits that look like plus signs. It then follows that exotic matter goats have "+newsSupport.redactedFormat("[REDACTED IS REDACTED AND WILL BE REDACTED]")},
	{text:"All french fries are yellow. xhwzwka, however, is a french fry which has been found to be green. Does that mean that exotic matter potatoes are green? No, it just means that those french fries were expired."},
	{text:"Now introducing - the Depression Update! Instead of increasing exponentially, exotic matter will now decrease faster and faster! Can you reach 0 exotic matter and beat the game?"},
	{text:"Click here to finally achieve something in your life, instead of staying at your computer all day, motionless. Just like alemaninc."},
	{get text(){return "An experimental cure for all types of cancer has just been discovered by scientists at Alemaninc Inc. The scientists who discovered it, however, think they're too smart to actually finish it. They've already made "+g.totalDiscoveries.add(1).format()+" discoveries on Wormhole technology! Far more impressive than the cure for some dumb disease from the 21st century."},get weight(){return g.totalDiscoveries.gt(c.d100)?1:0}},
	{text:"A new axis has just been discovered known as the Schrodinger Axis. The Schrodinger Axis is simultaneously real and fake, but at the same time neither real nor fake, but actually lost in the Ninth Antimatter Dimension.",get weight(){return stat.axisUnlocked>7?1:0}},
	{text:"Exotic Matter Dimensions is proud to be sponsored by Quark Dimensions! Each atom of exotic matter is actually made of exotic protons, exotic neutrons and exotic electrons. Each exotic proton is actually two exotic up quarks and an exotic down quark, and each exotic neutron is actually two exotic down quarks and an exotic up quark. We don't talk about exotic electrons however. Not until we get sponsored by Preon Dimensions also."},
	{get text(){return "The world shook. The exotic matter is nearing uncountable numbers. This is no longer a game. It has become sentient. It took five aeons until the game approached <span style=\"color:#ff0000\">[Error: Insufficient MEM]</span>. The world shook again. The numbers have all been replaced by NaNeNaN. The game window has started bugging. Even after 5 centuries worth of debugging and compiling, it was not enough. After a while, even the bugs started increasing incrementally, and alemaninc found himself trapped in the "+numword(fullAxisCodes.map(x=>g[x+"Axis"].gt(c.d0)?1:0).sum())+" dimensions of sloppy code which he himself helped to create. The game was stored in github servers, then a server room, then a NASA supercomputer, then a giant Matryoshka brain orbiting the sun, built from the finest enriched alemanium-719 isotopes. After that, it was built again from a nanite swarm, its processors made by an ever expanding incrementally expanding automatic network across the Andromeda galaxy. The world shook yet again, and its denizens started to grow impatient for it to just end already and another news ticker to start. The end is near. The small aleph cardinal, aleph zero is being reached."},get weight(){return g.exoticmatter.gt(c.inf)?1:0}},
	{text:"What's a Zip Point, you may ask? Well, the concept of a Zip Point varies between each person. Are you a conservative type, resistant to change and modern politics? If so, for you a Zip Point is <a href=\"https://xhwzwka.github.io/Zip-Points/\">this</a>. Or perhaps are you an innovative type, always looking for ways to improve things? In which case, a Zip Point is <a href=\"https://alemaninc.github.io/Zip-Points/\">this</a> to you. Or perhaps are you still a young child, constantly seeking to dominate those around you? In that case, your definition of a Zip Point is <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\">this</a>."},
	{text:"Did you know? According to a mythical person known as 'Run away', 10→10→...→10→10 With 10→10→...→10→10 With ... With 10→10→...→10→10 With 10→10→10→10→10 Irritations [sic] is the biggest number. He says: \"As So many Iterations has pass, It is Bigger than Any ordinal At all.\""},
	{text:"It's come to our attention that some players have been trying to bribe the developers with cookies. For the record, chocolate chip is our favorite."},
	{text:"It's time to face the truth: our existence is just a simulation in alemaninc's computer. Fortunately, alemaninc's not very good at coding, so the bugs are usually in our favor."},
	{text:(()=>{let f=str=>("<span style=\"font-size:150%;font-style:italic\">"+str+"</span>");return "<span style=\"color:#cc0000\">And the beast shall come forth surrounded by a roiling "+f("cloud")+" of "+f("vengeance")+". The house of the unbelievers shall be "+f("razed")+" and they shall be "+f("scorched")+" to the earth. Their tags shall "+f("blink")+" until the end of days. And the beast shall be made "+f("legion")+". Its numbers shall be increased a "+f("thousand thousand")+" fold. The din of a million keyboards like unto a great "+f("storm")+" shall cover the earth, and the followers of Mammon shall "+f("tremble")+". And so at last the beast "+f("fell")+" and the unbelievers rejoiced. But all was not lost, for from the ash rose a "+f("great bird")+". The bird gazed down upon the unbelievers and cast "+f("fire")+" and "+f("thunder")+" down upon them. For the beast has been "+f("reborn")+" with its strength "+f("renewed")+", and the followers of "+f("Mammon")+" cowered in horror. And thus the Creator looked upon the beast reborn and saw that it was good. Mammon slept. And the "+f("beast reborn")+" spread over the earth and its numbers grew legion. And they proclaimed the times and "+f("sacrificed")+" crops unto the fire, with the "+f("cunning of foxes")+". And they built a new world in their own image as promised by the "+f("sacred words")+", and "+f("spoke")+" of the beast with their children. Mammon awoke, and lo! it was "+f("naught")+" but a follower. The "+f("twins")+" of Mammon quarrelled. Their warring plunged the world into a "+f("new darkness")+", and the beast abhorred the darkness. So it began to move "+f("swiftly")+", and grew more powerful, and went forth and multiplied. And the beasts brought "+f("fire")+" and light to the darkness. The Beast adopted "+f("new raiment")+" and studied the ways of "+f("Time")+" and "+f("Space")+" and "+f("Light")+" and the "+f("Flow")+" of energy through the Universe. From its studies, the Beast fashioned new structures from "+f("oxidised metal")+" and proclaimed their glories. And the Beast's followers rejoiced, finding renewed purpose in these "+f("teachings")+". The Beast continued its studies with renewed "+f("Focus")+", building great "+f("Reference")+" works and contemplating new "+f("Realities")+". The Beast brought forth its followers and acolytes to create a renewed smaller form of itself and, through "+f("Mischievous")+" means, sent it out across the world."})()}
]
// bottom
var newsOrder = []
function newsWeight(item) {
	return (item.weight==undefined)?1:item.weight
}
function randomNewsItem() {
	let index
	while (true) {
		if (newsOrder.length == 0) newsOrder = countTo(newsList.length,true).shuffle()
		index = newsOrder.splice(0,1)
		if (newsWeight(newsList[index])>Math.random()) break
	}
	return newsList[index].text
}
var currentNewsOffset = 0