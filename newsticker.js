const newsSupport = {
	itemsShown:0,
	br:function(x){
		if (newsSupport.brMode===0) {return "<span style=\"padding-left:"+x+"px\"></span>"}
		if (newsSupport.brMode===1) {return "<br>"}
		error("<code>newsSupport.brMode</code> has an invalid value (<code>"+newsSupport.brMode+"</code>)")
	},
	brMode:0,
	randomVisible:function(){return Array.random(newsList.filter(x=>(x.weight??1)>Math.random()))},
	redacted:"<span style=\"color:hsl(270 50% 50%);opacity:0.5;\">[REDACTED]</span>",
	redactedFormat:function(x){return "<span style=\"color:hsl(270 50% 50%);opacity:0.5;\">"+x+"</span>"},
	error:"This news message has appeared in error. Please tell alemaninc to investigate.",
	universeSize:function(){
		let array = fullAxisCodes.map(x=>stat["real"+x+"Axis"]).filter(x=>x.gt(0))
		if (array.length===0) return "1. Just 1. No dimensions. Buy an axis to get a dimension!"
		let num = array.reduce((x,y)=>x.mul(y))
		let dimension = array.length
		return num.noLeadFormat(3)+" m"+(dimension===1?"":("<sup>"+dimension+"</sup>"))+". In words, that is "+(num.gt(c.inf)?"Infinity":numword(num.toNumber()))+" "+(dimension<11?["metres","square metres","cubic metres","quartic metres","quintic metres","sextic metres","septic metres","octic metres","nonic metres","decic metres"][dimension-1]:("metres to the power of "+numword(dimension)))
	},
	nodeDocumentary:function(){
		let list = document.getElementsByTagName("*")
		let node = list[Math.floor(list.length*Math.random())]
		let type = node.tagName
		let id = node.id
		let parentType = (node.parentElement===null)?null:node.parentElement.tagName
		let styles = Array.from(node.style)
		let children = node.children
		let out = "In the game there are "+list.length+" HTML nodes. Every one of these nodes is competing for the undivided attention of the gameloop. The gameloop, being a just and merciful function, distributes to each node a fair share of lag to unleash upon the unfortunate device which has to process all this. Let us now take a closer look at one such node - this humble "+type+" node"
		if ((id === "") && (styles.length === 0)) {
			out += " has neither an ID, nor any CSS properties, but despite its difficult station in life it diligently carries out its duty with an unwavering determination."
		} else if (id === "") {
			out += " may lack an ID, but it is the proud bearer of "+numword(styles.length)+" CSS propert"+(styles.length===1?"y":"ies")+": "+styles.joinWithAnd()+"."
		} else if (styles.length === 0) {
			out+= " does not have any CSS properties, but at least it is lucky enough to have been given the ID \""+id+"\"."
		} else {
			out += " is one of the privileged few to have both an ID, namely \""+id+"\", and "+numword(styles.length)+" CSS propert"+(styles.length===1?"y":"ies")+": "+styles.joinWithAnd()+"."
		}
		if (parentType === null) {
			out += "But what really makes this node stand out, is that it is the very first node to be created of them all - it has neither a parent, nor a mother-in-law. What it does have is "+numword(children.length)+" child"+(children.length===1?"":"ren")+" - "+Array.from(children).map(x=>x.tagName).joinWithAnd()+" - who are vitally important to the functioning of the game itself."
		} else {
			if (children.length>0) out += " It is happy to have a "+parentType+" parent - perhaps less so a "+list[Math.floor(list.length*Math.random())].tagName+" mother-in-law - and "+numword(children.length)+" child"+(children.length===1?"":"ren")+" named "+Array.from(children).map(x=>x.tagName).joinWithAnd()+"."
			else out += " Although it never did create any children, it is happy to at least have a "+parentType+" parent - all too often it hears the horror stories of the orphaned nodes forced to fend for themselves in the most hostile environment of them all - the World Wide Web. The billions of such pages are known only as 'the Nameless Ones', for without the protection of the Document-Object Model they are doomed to gradually devolve into soulless husks known as 'document declarations', completely indistinguishable from other instances of \"&lt;!DOCTYPE html&gt;\" like themselves."
		}
		out += " Anyway, now you know more about the ecosystem of nodes upon which the game is reliant. More documentaries by Davy Atombra only at UTQP!"
		return out
	},
	timezone:function() {
		let offset = new Date().getTimezoneOffset()
		if (offset === 0) return ""
		return (offset<0?"+":"-")+Math.floor(Math.abs(offset)/60)+((offset%60===0)?"":(":"+String(Math.abs(offset)%60).padStart(2,"0")))
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
		{label:"stars",get value(){return BEformat(starCap()*(1+Math.random()/10)+1)},get softcapped(){return BEformat(starCap())},get visible(){return g.stars===starCap()}},
		{label:"between axis autobuys",get value(){return timeFormat(autobuyerMeta.interval("axis"))},get softcapped(){return (2**autobuyerMeta.interval("axis")).toFixed(2)+" hours"},get visible(){return g.stardustUpgrades[1]>0}},
		{label:"between frames",get value(){return timeFormat(Math.max(deltatime,0.05))},get softcapped(){return numword(Math.round(Math.max(deltatime,0.05)**0.67*100))+" years"},get visible(){return g.exoticmatter.gt(c.e100)}},
		{label:"Mastery rows unlocked",get value(){return countTo(totalMasteryRows).map(x=>stat["masteryRow"+x+"Unlocked"]===0?0:1).sum()},get softcapped(){return "three-quarters of a column"},get visible(){return stat.masteryRow2Unlocked>0}},
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
		if (alemanicHash(popupInput().replace(/\D/g,""),16)==="H77fRrw+YrxvuOhN") {newsSupport.xhwzwkaPhishing++}
		popup({text:"[2] What is your full legal name?",input:"",buttons:[["Submit","newsSupport.phishing3()"],["Exit","newsSupport.xhwzwkaPhishing=0"]]})
	},
	phishing3:function(){
		if (alemanicHash(popupInput(),16)==="FKWIkeZxj3YRjMKL") {newsSupport.xhwzwkaPhishing++;}
		popup({text:"[3] What is your Discord username?",input:"",buttons:[["Submit","newsSupport.phishing4()"],["Exit","newsSupport.xhwzwkaPhishing=0"]]})
	},
	phishing4:function(){
		if (alemanicHash(popupInput(),16)==="o3iSQbI2/sG5gPgI") {newsSupport.xhwzwkaPhishing++}
		popup({text:"[4] What is your house address?",input:"",buttons:[["Submit","newsSupport.phishing5()"],["Exit","newsSupport.xhwzwkaPhishing=0"]]})
	},
	phishing5:function(){
		if (alemanicHash(popupInput(),16)==="S+ThObRe3ZxOakFj") {newsSupport.xhwzwkaPhishing++}
		popup({text:"[5] And finally, what is your credit card number?",input:"",buttons:[["Submit","newsSupport.submitPhishing()"],["Exit","newsSupport.xhwzwkaPhishing=0"]]})
	},
	submitPhishing:function(){
		if (alemanicHash(popupInput().replace(/\D/g,""),16)==="c6BRTQmHavCl9dKB") {newsSupport.xhwzwkaPhishing++}
		for (let i of [26,28]) addSecretAchievement(i)
		newsSupport.xhwzwkaPhishing=0
		popup({text:'Thank you for helping alemaninc!',buttons:[["Exit","newsSupport.xhwzwkaPhishing=0"]]})
	},
	codeInsight:function(item){
		let props = Object.keys(item)
		let out = []
		for (let i of props) out.push(Object.getOwnPropertyDescriptor(item,i).value===undefined?Object.getOwnPropertyDescriptor(item,i).get.toString():(i+":\""+Object.getOwnPropertyDescriptor(item,i).value+"\""))
		return "{"+out.join(",")+"}"
	},
	secretAchievementHelp:function(){
		let num = Object.keys(secretAchievementList).filter(x=>(!g.secretAchievement[x])&&(secretAchievementList[x].prevReq??[]).map(y=>g.secretAchievement[y]).reduce((x,y)=>x&&y,true)).random()
		notify("Here is the name of a random Secret Achievement: \""+secretAchievementList[num].name+"\".",secretAchievementRarityColors[secretAchievementList[num].rarity].dark,secretAchievementRarityColors[secretAchievementList[num].rarity].light)
		nextNewsItem()
	},
	easterTime:function() {let Y = new Date().getUTCFullYear();let C = Math.floor(Y/100);let N = Y - 19*Math.floor(Y/19);let K = Math.floor((C - 17)/25);let I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;I = I - 30*Math.floor((I/30));I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));let J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);J = J - 7*Math.floor(J/7);let L = I - J;let M = 3 + Math.floor((L + 40)/44);let D = L + 28 - 31*Math.floor(M/4);return Math.abs((M*30+D)-((new Date().getUTCMonth()+1)*30+new Date().getUTCDate()))<7},
	EMDevelopmentVariables:function(){return [g.exoticmatter,N(totalAchievements),g.truetimePlayed,g.masteryPower,g.stardust,g.darkmatter,g.hawkingradiation]},
	EMDevelopmentIndex:function(){return newsSupport.EMDevelopmentVariables().map(x=>x.add(c.d10).quad_slog()).sumDecimals().mul(c.e2)},
	interestingTickerActiveUntil:0,
	formatZP:function(){return N(g.zipPoints).noLeadFormat(2)+" Zip Point"+(g.zipPoints===1?"":"s")},
	addZP:function(){g.zipPoints+=(g.zipPointMulti-(g.zipPoints/1e158)**2);if(d.element("news_zipPoints")!==undefined){d.innerHTML("news_zipPoints",newsSupport.formatZP())}},
	cashInZPRewards:[
		{get value(){return Math.min(g.zipPoints**(1/3)/10,Math.log10(g.zipPoints))},func:function(){g.dilatedTime+=this.value},get text(){return "+"+timeFormat(this.value)+" dilated time!"},get visible(){return true}},
		{get value(){return Math.min(g.zipPointMulti+0.001*g.zipPoints*Math.log10(g.zipPoints)**-2,1e300)},func:function(){g.zipPointMulti=this.value;addSecretAchievement(32)},get text(){return "Zip Point multiplier "+arrowJoin(BEformat(N(g.zipPointMulti),2)+"×",+BEformat(N(this.value),2)+"×!")},get visible(){return g.zipPointMulti<1e300}},
		{get value(){return Math.floor(Math.log10(g.zipPoints)**3)},func:function(){o.add("stardust",this.value)},get text(){return "+"+BEformat(this.value)+" stardust!"},get visible(){return g.stardust.div(this.value).gt(c.e2)}},
		{get value(){return Math.floor(Math.log10(g.zipPoints)**3)},func:function(){o.add("hawkingradiation",this.value)},get text(){return "+"+BEformat(this.value)+" Hawking radiation!"},get visible(){return g.hawkingradiation.div(this.value).gt(c.e2)}}
	],
	cashInZP:function(){
		if (g.zipPoints<1000) return
		let out = Array.random(newsSupport.cashInZPRewards.filter(x=>x.visible))
		popup({text:out.text,buttons:[["Close",""]]})
		out.func()
		g.zipPoints=0
	},
	spamCompendium:["Can computers really see? In this interactive lab by Pixel Perfect, you'll peek into the world of digital \"vision\"","Hello, you may have received an email from the Ri this afternoon, with the details of how to join as an Ri member.","Microsoft requests your feedback! Help us build better experiences for you.","Celebrate extraordinary women - introducing the new Bing, your AI-powered co-pilot"," Ready to win big? Play Select 3 for your chance to win one of 2 million amazing prizes including tech and gear, billions of Microsoft Rewards points, and even up to £211k in cash prizes. Don’t delay, play today!","Start the year with a Surface bundle for all your computing needs","Overwatch 2 gets bigger with this bundle! See how to make a difference this holiday season.","New and Improved Embeddings API - we're excited to announce a new embedding model: text-embedding-ada-002!","Microsoft Cashback is now part of Microsoft Rewards","Don't miss the deadline on these exciting sweeps! Get a head start on the holidays.","Enter to win Xbox Ultimate Game Pass Ultimate for life! Get ready for Halloween with hauntingly good ideas.","Why are the northern lights spreading south? Shining a light on the aurora borealis.","We'd like to make you smile - there’s a cheerful thread running through this week’s newsletter in the wake of Monday’s UN International Day of Happiness. Find out more about the science of laughter and meet the group most likely to raise a smile: our Humour SIG.","The Galaxy Book3 Pro 360 is now available to buy - Get free Galaxy Buds2 Pro","Last chance to pre-order Galaxy Book3","Ask and you shall receive... a password reset","Someone added alemaninc44031@gmail.com as their recovery email - alemaninc44059@gmail.com wants your email address to be their recovery email","What's on our radar this week? Thought-provoking podcasts, the algorithms of life and more","Security ALERT! You've visited illegal infected website<br>You have visited unsafe site with illegal content<br>Your PC is at risk of being infected by viruses<br>To continue browsing safely - perform an antivirus scan<br><span style=\"border-style:solid;border-radius:5px;border-width:1px;border-color:#000000\">Scan</span>"],
	hardMathAnswer:null,
	hardMath:function(){let num1=BigInt(10**(50+Math.random()*30));let num2=BigInt(10**(30+Math.random()*20));newsSupport.hardMathAnswer=num1*num2;popup({text:"What is "+String(num1)+" × "+String(num2)+"?",input:"",buttons:[["Submit","newsSupport.checkHardMath()"]]})},
	checkHardMath:function(){if(String(popupInput()).replaceAll(/[^$0-9.]/g,"")===String(newsSupport.hardMathAnswer)){popup({text:"Wow, you actually got it right. Here's some dilated time as a reward for your efforts.",buttons:[["Yay!","g.dilatedTime++"],["No, stop trying to make me cheat!",""]]})}else{popup({text:"No, it's "+String(newsSupport.hardMathAnswer)+"! If that number doesn't take up multiple lines you have a <i>massive</i> viewport.",buttons:[["Close",""]]})}},
	setBackground:function(color){d.element("background").style.background=color},
	lightColor:function(){
		let channels = [[0,4,5,6],[1,3,5,6],[2,3,4,6]]
		if (g.chroma.sumDecimals().eq(c.d0)) return "#000000"
		return "#"+channels.map(x=>Decimal.div(x.map(y=>g.chroma[y]).sumDecimals().add(g.chroma[8].div(c.d2)),g.chroma.sumDecimals()).mul(c.d255).round().toNumber().toString(16).padStart(2,"0")).join("")
	},
	dilationPenaltyReductions:0,
	newsletter:{
		terms:(()=>{
			/*
			0 term number
			1 term text
			2 term type (2 = single (accept/close), 1 = composite (continue))
			*/
			function fancy(txt){return "<span style=\"font-family:'Times New Roman', Times, serif;font-size:16px;color:#bbeeff\">"+txt+"</span>"}
			let terms = [
				["1(a)","Under any circumstances, this newsletter and all its subsidiaries are not affiliated with anything we provide you with.",2],
				["1(b)","By accepting this, you agree that:",1],
				["1(b)(i)","all its subsidiaries are not for us to deal with",2],
				["1(b)(ii)","if you sue us in court, we will tell you that you waived your right to sue us in Term and Condition №4(a)(i).",2],
				["2","Below is filler text specially designed to cause you to stop reading and give up on seeing everything we will force you to do.",1],
				["2(a)","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",2],
				["2(b)","Consectetur purus ut faucibus pulvinar.",2],
				["2(c)","Egestas integer eget aliquet nibh.",2],
				["2(d)","Habitant morbi tristique senectus et.",2],
				["2(e)","Pellentesque eu tincidunt tortor aliquam nulla facilisi.",2],
				["2(f)","Ut lectus arcu bibendum at varius.",2],
				["2(g)","Vitæ proin sagittis nisl rhoncus mattis.",2],
				["2(h)","Cras adipiscing enim eu turpis egestas.",2],
				["2(i)","Vel eros donec ac odio tempor.",2],
				["2(ii)","Ullamcorper velit sed ullamcorper morbi tincidunt ornare.",2],
				["2(iii)","Sit amet purus gravida quis.",2],
				["2(iiii)","Risus in hendrerit gravida rutrum quisque non tellus orci ac.",2],
				["2(iiiii)","Integer malesuada nunc vel risus.",2],
				["2(iiiiii)","Egestas purus viverra accumsan in nisl nisi.",2],
				["2(iiiiiii)","Pellentesque habitant morbi tristique senectus.",2],
				["2(iiiiiiii)","",2],
				["2(iiiiiiiii)","Faucibus ornare suspendisse sed nisi. Ante metus dictum at tempor. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Turpis nunc eget lorem dolor sed. Justo eget magna fermentum iaculis eu non. Phasellus egestas tellus rutrum tellus pellentesque. Porttitor rhoncus dolor purus non enim præsent. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Magna fringilla urna porttitor rhoncus dolor purus non enim. Feugiat vivamus at augue eget arcu dictum varius. You also agree to sell all your organs to Epstein Island research facility for research purposes when you are dead. Eget mi proin sed libero enim sed faucibus turpis. Aliquam malesuada bibendum arcu vitæ elementum curabitur vitæ nunc sed. At consectetur lorem donec massa sapien faucibus et molestie. Sagittis aliquam malesuada bibendum arcu vitæ. Nulla facilisi morbi tempus iaculis.",2],
				["2(j)","Quam elementum pulvinar etiam non quam.",2],
				["3","You have prestiged your filler text! You have unlocked a beautiful new font.",1],
				["3(a)",fancy("Dui sapien eget mi proin sed libero enim sed faucibus"),2],
				["3(b)",fancy("Tristique et egestas quis ipsum suspendisse ultrices gravida dictum"),2],
				["3(c)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(d)",fancy("Consequat interdum varius sit amet mattis vulputate enim nulla"),2],
				["3(e)",fancy("Eget nullam non nisi est sit amet facilisis magna etiam"),2],
				["3(f)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(g)",fancy("Et tortor consequat id porta"),2],
				["3(h)",fancy("Vulputate dignissim suspendisse in est ante in nibh"),2],
				["3(i)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(j)",fancy("Risus ultricies tristique nulla aliquet enim tortor at"),2],
				["3(k)",fancy("Enim lobortis scelerisque fermentum dui"),2],
				["3(l)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(m)",fancy("Velit euismod in pellentesque massa placerat duis ultricies"),2],
				["3(n)",fancy("Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus"),2],
				["3(o)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(p)",fancy("Eleifend mi in nulla posuere sollicitudin aliquam ultrices"),2],
				["3(q)",fancy("Laoreet id donec ultrices tincidunt arcu non sodales neque"),2],
				["3(r)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(s)",fancy("Cras adipiscing enim eu turpis egestas pretium ænean pharetra"),2],
				["3(t)",fancy("Senectus et netus et malesuada fames ac turpis egestas"),2],
				["3(u)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(v)",fancy("We will hold your family hostage and give their pinkies to our Mogadorian overlords for pinky inspection to clone them for the asteroid mines in Alpha Centauri"),2],
				["3(w)",fancy("Amet purus gravida quis blandit turpis cursus in hac"),2],
				["3(x)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(y)",fancy("Adipiscing diam donec adipiscing tristique"),2],
				["3(z)",fancy("Quam pellentesque nec nam aliquam sem et tortor consequat id"),2],
				["3({)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(|)",fancy("Vitæ semper quis lectus nulla at volutpat diam"),2],
				["3(})",fancy("Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus"),2],
				["3(~)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(¡)",fancy("Ultricies lacus sed turpis tincidunt id"),2],
				["3(¢)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(£)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["3(¤)",fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"),2],
				["4","You have prestiged your filler text!",1],
				["4(a)","You have now unlocked the actual Terms and Conditions, which are:",1],
				["4(a)(i)","to not take us to court",2],
				["4(a)(ii)","to not claim any insurance",2],
				["4(a)(iii)(ϟ)","to allow us to take you to court at anytime",2],
				["4(a)(iii)(Ϙ)","in the event that this happens, to plead guilty without question",2],
				["4(a)(iv)","to give us 50% of your wage and 90% of the wage of every person you are socially connected to within six degrees of separation",2],
				["4(a)(v)","to allow us to send you promotion e-mails at a rate of 259,200 per day until one of the following events takes place:",1],
				["4(a)(v)(ϟ)","you and every person you are socially connected to within six degrees of separation dies",2],
				["4(a)(v)(Ϙ)","both of the below are true simultaneously:",1],
				["4(a)(v)(Ϙ)(α)","the alemaninc Inc. company is dissolved",2],
				["4(a)(v)(Ϙ)(β)","the universe evolves to a state of no thermodynamic free energy, and will therefore be unable to sustain processes that increase entropy (hence referred to as \"heat death\")",2],
				["4(b)","If these Terms and Conditions are violated you also agree to allow our bomb squad to firebomb your house.",2],
				["5","You also agree to prostrate yourself before His Imperial Grand Lord of All the World 〜 Master of Creation, nicodium \"cubane/cubane\" \"al-maniac\".<br><br>This includes clicking the below link, where the Terms and Conditions are continued:<br><a target=\"_blank\" href=\"https://youtu.be/dQw4w9WgXcQ\" style=\"color:inherit\"><i>Exotic Matter Dimensions</i> 𝕍2 Newsletter, Terms and Conditions, Section B</a>",2],
				["6","You also agree to pay our taxes, which are as follows:",1],
				["6(a)","Tax against existence: <i>$249.99</i>",2],
				["6(b)","Tax for medical insurance for our employees: <i>$140.99</i>",2],
				["6(c)","Digital shipping tax: <i>$42.99</i>",2],
				["6(d)","Tips: <i>$5.99</i>",2],
				["6(e)","Tax for completely unnecessary fees: <i>$150.99</i>",2],
				["6(f)","Unconditional tax to pay our sponsors, which are:",1],
				["6(f)(i)","alemaninc",1],
				["6(f)(ii)","the Nigerian princes",1],
				["6(f)(iii)","the Mogadorians:",1],
				["6(f) continued","<i>$67.99</i>",2],
				["6(g)","Tax to fund our pyramid schemes: <i>$25.99</i>",2],
				["6(h)","Digital carbon footprint tax: <i>$57.99</i>",2],
				["6(i)","Tax to pay our accountant to add 99 cents to each amount paid by you, the Client: <i>$50.99</i>",2],
				["6 continued","Subtotal: <i>$797.91</i>",1],
				["6 continued continued","Total: <i>$799.99 (-20% off)</i>",2],
				["7","Please sign:",2],
				// this one must be an object so 1 can use a getter
				{0:"8",get "1"(){return "This Term and Condition is about the actual news.<br><br>While many people think alemaninc will release <i>Exotic Matter Dimensions</i> "+newsSupport.nextMajorVersion+" soon, alemaninc has not given any indication that he will do so.<br><br>But all is not lost! We have something even better. Accept this Term and Condition to begin the <a target=\"_blank\" href=\"https://docs.google.com/spreadsheets/d/1RltRzb1onb6kEfb8sQoz1mY_kup6T_nrggA1HlH3qU4/edit#gid=0\" style=\"font-style:oblique;color:inherit\">OMCCDV Grand Tour</a>:"},2:1}
			]
			return terms.map((x,i)=>function(){popup({
				text:"<b>Term and Condition №"+x[0]+"</b><br><br>"+x[1],
				buttons:(x[2]===2)?[["Accept","newsSupport.newsletter.terms["+(i+1)+"]()"],["Close","addSecretAchievement(42)"]]:[["Continue",((i+1)===terms.length)?"newsSupport.newsletter.endTerms()":("newsSupport.newsletter.terms["+(i+1)+"]()")]]
			})})
		})(),
		init:function(num){popup({
			text:"Please agree to our Terms and Conditions before we show you our newsletter:",
			buttons:[["Continue","newsSupport.newsletter.terms[0]()"]]
		})},
		endTerms:function(){
			let texts = [
				"Two sites bound by the blue hand,",
				"one afield, one on home land.",
				"Lay worthy hands upon the sheet",
				"and your achievement shall not fleet.",
				"The bond that takes a click to make",
				"will not before a lifetime break.",
				"Seven codes to turn the tide:",
				"on the eighth, his Legacy rides."
			]
			for (let i=0;i<8;i++) setTimeout(function(){notify("<i>"+texts[i]+"</i>",["#4a86e8","#fac112","#ff0000","#0000ff"][Math.floor(i/2)])},2000*i)
			for (let i=5;i>0;i--) setTimeout(function(){notify("<b>"+i+"</b>","#00ffff")},20000-1000*i)
			newsSupport.newsletter.spamStart = Date.now()+20000
		},
		spamStart:Infinity,
		questions:[
			{text:"In the seventh we <span style=\"color: #bfbfdf;text-shadow: 0px 0px 5px white, 0px 0px 6px #1f00ff;font-weight: bold;background:linear-gradient(#00002f, #0f002f), linear-gradient(45deg, black, transparent 25%, transparent), linear-gradient(-45deg, black, transparent 25%, transparent)\">unite</span> as one.<br>What does the eighth say?",answers:["67rOSle4/nXgr0rD"]},
			{text:"When two to the right becomes two to the left, you can never learn the <span style=\"color:var(--luck);text-shadow: 0px 0px 5px rgba(51,153,102,0.5)\">fate</span> of ten.<br>How many sheets does this make two to the right?",answers:["7Bs6DGrA2NwsNzeg","u4o6rPi7S2EIWQvm"]},
			{text:"At the start you skip the ground floor, skip three, <span style=\"background:-webkit-linear-gradient(270deg,#9900ff,transparent);-webkit-background-clip:text;-webkit-text-fill-color: transparent;\">rise</span> to nine. How many cells do you rise in total by the end?",answers:["RDEkAMtQy93/r8Ax","Dp6h7lkUsZrUiEbc"]},
			{text:"I am <span style=\"color:#ff9900\">number</span> four.<br>But what <span style=\"color:#ff9900\">number</span> is Stat Mark?",answers:["IHFcr774TrlXKLE+","Iqnj/nn2a/7XXni2"]},
			{text:"<i>Z Points</i> by xhwzwka has five types of bugs - but the bug list has <span style=\"background:-webkit-linear-gradient(90deg,#996600,transparent);-webkit-background-clip:text;-webkit-text-fill-color: transparent;\">fallen</span> from five.<br>Cyan remains unused forevermore. Which other color?",answers:["sPFpR2MjXoSF6tno","IXrpkx155kScnH92"]},
			{text:"Two, now six. Is the rest of them out there?<br>Which name has the <span style=\"color:#ffffff;text-shadow:"+[5,10,20,30,45,60,80,120,200].map(x=>"0px 0px "+x+"px #ffffff").join(",")+"\">power</span> of six?",answers:["O8uuaffK4fSDjqO5"]},
			{text:"Eight riddles, but just six rifts... Seven takes <span style=\"color:#0000ff\">revenge</span> in Dimension Nine.<br>How long is the longest path through the Ninth Dimension which doesn't visit any cell more than once?",answers:["nPmilp5t/nwBwuND","3rxIV2IL7JwRYGHS","xORpOpwjHka3awJ2"]},
			{text:"Oh, I appear to have run out of <span style=\"color:#00ffff\">lore</span>...<br>Now you must go complete your <span style=\"color:#4e54c0\">Task</span>.",answers:["3MnMDKlT2hjwOJIu"]}
		],
		remaining:[0,1,2,3,4,5,6,7],
		ask:function(){
			if (newsSupport.newsletter.remaining.length===0) newsSupport.newsletter.finalNotify()
			else popup({
				text:this.questions[newsSupport.newsletter.remaining[0]].text,
				input:"",
				buttons:[["Submit","newsSupport.newsletter.verify()"],["Close",""]]
			})
		},
		verify:function(){
			if (newsSupport.newsletter.questions[newsSupport.newsletter.remaining[0]].answers.includes(alemanicHash(stringSimplify(popupInput()),16))) {
				notify("Correct","#009900","#00ff00")
				newsSupport.newsletter.remaining.splice(0,1)
				if (newsSupport.newsletter.remaining.length===0) newsSupport.newsletter.finalNotify()
			} else {
				notify("Wrong!","#990000","#ff0000")
				newsSupport.newsletter.remaining.push(newsSupport.newsletter.remaining.splice(0,1)[0]) // move on to the next riddle but don't skip
				if (newsSupport.newsletter.remaining.includes(2)) {newsSupport.newsletter.remaining.remove(6);newsSupport.newsletter.remaining.push(6)} // riddle 7 always comes after 3
				if (newsSupport.newsletter.remaining.includes(7)) {newsSupport.newsletter.remaining.remove(7);newsSupport.newsletter.remaining.push(7)} // riddle 8 always comes last
			}
		},
		finalNotify:function(){notify(g.secretAchievement[33]?"You must really love OMCCDV if you came back a second time... perhaps you wish to partake in its revival?<br>Sadly you are in the wrong place. Here there are only PROMOTIONS!":"Verification is complete! Your final task: use the name of the Secret Achievement you are about to get as a promotion code.","#009999","#00ffff")}
	},
	readMore:function(){
		newsSupport.brMode=1;
		newsSupport.readMoreIteration++
		addAchievements("readMore");
		let reading=[]
		while(reading.map(x=>x.length).sum()<1e4){reading.push(newsSupport.randomVisible().text)}
		let out="<p>We have compiled a list of "+reading.length+" news messages so that you can read more high-quality journalism.</p><table>"+reading.map((x,i)=>"<tr><td style=\"width:"+(20+Math.floor(Math.log10(reading.length))*12)+"px;text-align:right;vertical-align:top;padding-right:20px;padding-bottom:20px;\">"+(i+1)+"</td><td style=\"width:calc(60vw - 80px);text-align:left;vertical-align:top;padding-bottom:20px;white-space:pre-wrap;word-break:break-word;\">"+x+"</td></tr>").join("")+"</table>"
		popup({text:out,buttons:[["Read Less"]]})
		newsSupport.brMode=0;
	},
	readMoreIteration:0,
	mysteryTheme:function(){
		let received = Array.random(availableThemes().filter(x=>g.theme!==x))
		popup({
			text:"You have received the "+received+" theme!<br>Do you want to switch to this theme now?",
			buttons:[["Switch","g.colortheme='"+received+"';theme()"],["Do not","g.colortheme=`"+received+"`;popup({text:'Since when were you the one in control?',buttons:[['Switch','theme()']]})"]]
		})
	},
	nextMajorVersion:"𝕍"+(Number(version.current.substring(2,3))+1),
	calcOMCCDVLevel:function(){
		if (g.achievement[933]) {return 3}
		if (g.achievement[719]) {return 2}
		if (g.achievement[413]) {return 1}
		return 0
	},
	ord:function(level){return (newsSupport.calcOMCCDVLevel()>=level)?1:0},
	malganis:false,
	ticker325games:{
//		"Anti-Idle: The Game":["progress bar boost",0,10],
		"Antimatter Dimensions":["antimatter production",x=>"×"+N(x*0.015).layerplus(2).sub(c.d9).format(1)],
		"Antimatter Dimensions NG+++":["all meta dimension multipliers",x=>"×"+N(x/200).layerplus(2).sub(c.d9).format(1)],
		"Arcanum/Theory of Magic":["lore rate",x=>Math.min(x/10,10+x/100)],
		"Array Game":["separators",x=>"×"+N(10**(x/100)).format(1)],
		"Aspiring Artist":["white pixel generation",x=>"×"+N((1+0.005*x)*1.005**x).format(1)],
		"Ballad of Heroes":["Boon of Olympus",x=>"+"+BEformat(x)+"%"],
		"Cookie Clicker":["golden cookie duration bonus",x=>"+"+N(x/100).noLeadFormat(2)+"%"], // talk about balancing
		"Distance Incremental":["distance",x=>"×"+N(x*0.01).layerplus(2).sub(c.d9).format(1)],
		"DodecaDragons":["holy tetrahedrons",x=>"×"+N(x*0.005).layerplus(2).sub(c.d9).format(1)],
		"Egg Inc.":["egg sell multiplier",x=>N(x*0.001).layerplus(2).sub(c.d9).mul(x*0.1+1).format(1)],
//		"Endless Stairwell":["XP gain",5,1.75],
		"Evolve Idle":["plasmid gain",x=>"+"+N(x/10).noLeadFormat(1)+"%"],
		"Exotic Matter Dimensions alpha":["tribute gain",x=>"×"+N(x/250).layerplus(2).sub(c.d9).format(1)],
//		"Factory Idle":[],
//		"Fundamental":["strange quarks",0,100],
		"Gooboo":["global level",x=>Math.floor(Math.min(x,10+x/10,20+x/100))],
		"Grass Cutting Incremental":["grass gain",x=>"×"+N(x*0.005).layerplus(2).sub(c.d9).format(1)],
//		"Hyper Game":["Hyper-points",x=>"^^"],
		"Hollow Knight":["nail damage",x=>Math.ceil(x/100)],
//		"Idle Dice":["dice multiplier",1,2],
		"Idle Loops":["mana gain from Smash Pots",x=>percentOrMult(N((1+x/60)**0.25))],
//		"Incremancer":["zombie run speed",1,10],
		"Incremental Mass Rewritten":["mass gain",x=>(x>100)?("^"+N(10**(x/100)**2-9).format(4)):("×"+N(x/20+x**2*0.0015).layerplus(2).sub(c.d9).format())],
		"Kittens Game":["kitten happiness",x=>N(x/100).noLeadFormat(2)+"%"],
//		"Kiwi Clicker":[],
//		"LORED":["malignancy generation",1],
		"NGU Idle":["Power and Toughness",x=>x+"%"],
//		"Ordinal Markup":["incrementy gain"],
//		"Pachinkremental":["bumper point multiplier",1,10],
//		"Push the Button":[],
//		"Revolution Idle":[]
		"Scrap Clicker 2":["scrap gain",x=>"×"+[N(x+1),N(1.1).pow(x),N(1.001).pow(x**2)].productDecimals().format(2)],
//		"Shark Game":["fish gain",1],
		"Synergism":["quark gains",x=>N(x/10).noLeadFormat(1)+"%"],
//		"Swarm Simulator":["Ant Queen production",1,0],
//		"The Factory of Automation":["steel generation",2,2],
//		"(the) Gnorp Apologue":[],
//		"The Perfect Tower":["tower damage",1],
//		"The Prestige Tree":["point gain",2],
//		"Trimps":["breed speed",1],
//		"True Infinity":["unfunity point gain",4,1000],
//		"Universal Paperclips":["paperclip gain",1],
//		"Unnamed Space Idle Prototype":[["synth speed",1],["warp essence gain multiplier"]].random(),
//		"When he jump, he go up like this":["launch velocity",1],
	}
}
// top
const newsList = [
	{text:"This is not an <i>Antimatter Dimensions</i> clone."},
	{text:"What, were you expecting a new sticker? Well, too bad..."},
	{text:"Do you want to be an <i>Exotic Matter Dimensions</i> beta tester? Well, what if I told you that <b>all</b> players are testers?"},
	{text:"If you join the Discord server alemaninc will be super happy! You should make alemaninc happy."},
	{get text(){return "The R axis is a lie."+((g.stardustUpgrades[0]===4)?"":"..?")},get weight(){return g.stardustUpgrades[0]>3?1:0}},
	{text:"You do know you can't Stardust reset in -1 seconds, right?",get weight(){return Math.max(0,Math.min(1,2-g.fastestStardustReset*10))}},
	{get text(){return "More than "+BEformat(c.inf)+" exotic matter? What is this foul heresy?"},get weight(){return g.exoticmatter.gt(c.inf)?1:0}},
	{get text(){return BEformat(g.exoticmatter)+" exotic matter? That's rookie numbers."},get weight(){return totalAchievements/achievement.all.length<0.9?1:0}},
	{text:"Help! Help! Help! Help! I bought an axis and it's producing exotic matter and I don't know how to stop it!",get weight(){return stat.totalNormalAxis.eq(c.d0)?0:1}},
	{get text(){return "If you could write 3 digits of your exotic matter amount per second, it would take you "+timeFormat(g.exoticmatter.log10().floor().add(c.d1).div(c.d3))+" to write it out. That's... not as long as you'd like to think."},get weight(){return g.exoticmatter.add(c.d1).log2().div(c.d1024).min(c.d1).toNumber()}},
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
	{text:"What's an OMCCDV, you ask? Only xhwzwka knows.",get weight(){return newsSupport.ord(1)}},
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
	{text:"<span onClick=\"g.newsTickerActive=false;nextNewsItem();addSecretAchievement(27)\">Click this if you read too much news.</span>"},
	{text:"The first study's always free",get weight(){return StudyE(1)||g.studyCompletions[1]>0?1:0}},
	{text:"Click the next message if you can travel through time."},
	{text:"We all know about stardust. But every stardust is related in some way. Those stardusts you 'spent' had families, and they miss them. You monster.",get weight(){return g.stardustUpgrades.sum()===0?0:1}},
	{get text(){return "Fact: your current exotic matter is ^"+Decimal.div(g.exoticmatter.log10(),g.totalexoticmatter.log10()).format(4)+" of all the exotic matter you have ever produced."},get weight(){return (g.exoticmatter.gt(c.e100)&&Decimal.div(g.exoticmatter.log10(),g.totalexoticmatter.log10()).lt(0.999))?1:0}},
	{text:"This ticker could be yours. Join the Discord to suggest what it should be!"},
	{text:"Fact: this news ticker can only appear first.",get weight(){return timeSinceGameOpened<5?1:0}},
	{get text(){return "Ah, a fellow "+g.colortheme+" theme user. I see you have impeccable taste."}},
	{text:"¿sᴉɥʇ pɐǝɹ noʎ pᴉp ʍoH"},
	{text:"Work it, make it, do it, makes us, harder, better, faster, stronger, more than, hour, hour, never, ever, after, work is, over"},
	{text:"According to all known laws of motion, there is no way exotic matter should be able to exist. Its density is too small to get its fat little particles off the whiteboard. The exotic matter, of course, exists anyway, because exotic matter doesn't care what theoretical physicists think is impossible."},
	{text:"If you read this I hope you have a good day."},
	{get text(){return newsSupport.br(3000)+"Did you notice the news ticker being empty for approximately "+timeFormat(3000/g.newsTickerSpeed)+"?"}},
	{get text(){return "So, you've destroyed "+g.TotalWormholeResets+" universes with wormholes... but when will you actually go <i>inside</i> a wormhole?"},get weight(){return g.TotalWormholeResets>1?1:0}},
	{text:"<span style=\"font-size:4px;opacity:0.25\">Just sneaking by, don't mind me...</span>"},
	{get text(){return newsSupport.nodeDocumentary()}},
	{get text(){return "alemaninc will now proceed to guess your timezone."+newsSupport.br(250)+"Are you in UTC"+newsSupport.timezone()+"?"}},
	{get year(){return new Date().getFullYear()},get month(){return new Date().getMonth()+1},get longMonth(){return String(new Date().getMonth()+1).padStart(2,"0")},get day(){return new Date().getDate()},get longDay(){return String(new Date().getDate()).padStart(2,"0")},get text(){return "If you are in England, the date is "+this.day+"/"+this.month+"/"+this.year+". If you are in America, the date is "+this.month+"/"+this.day+"/"+this.year+". If you are in Sweden, the date is "+this.year+"-"+this.longMonth+"-"+this.longDay+". If you are in Poland, the date is "+this.day+" "+roman(this.month).toLowerCase()+" "+this.year+". If you are in xhwzwka's to-do list, the date is "+this.year+"-"+this.longDay+"-"+this.longMonth+". If you are in Microsoft Excel, the date is "+newsSupport.excelDate()+". If you are on Mount Ebott, the date is "+Math.floor(this.year/10)+"X. If you are in the browser, the date is "+(new Date().toString())+"."},get weight(){return (this.month===this.day)?0:1}},
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
	{text:"Beware of phishing attempts, keep your information safe!"+newsSupport.br(window.innerWidth)+"<span onClick=\"newsSupport.phishing()\">🎣"+newsSupport.br(150)+"</span>Look, a phishing rod! You should click this.</span>",get weight(){return newsSupport.ord(1)}},
	{get text(){return "Have you ever wondered what the code of a news message looks like? Here is the code of a random news message: "+newsSupport.codeInsight(newsSupport.randomVisible())}},
	{text:"<span onClick=\"newsSupport.secretAchievementHelp()\">Click this for help with a secret achievement!</span>",get weight(){return (1-totalSecretAchievements/Object.keys(secretAchievementList).length)/4}},
	{text:"tHiS mEsSaGe Is CaSe sEnSiTiVe"},
	{text:"You have <span style=\"color:#df5050;font-size:20px\">0</span> antimatter. Go <a href=\"https://ivark.github.io/AntimatterDimensions/\" target=\"_blank\">here</a> to get some!"},
	{text:[...[1,2,3,4,5,6,7,8,9].map(x=>((10**x-1)/9)+"<sup>2</sup> = "+String(BigInt((10**x-1)/9)**2n)),"But 1111111111<sup>2</sup> is 1234567<i>900</i>987654321! How!?"].join(newsSupport.br(100))},
	{text:"Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity."},
	{text:"A concoction of varied pastries, puzzling grass and towers and citadels tall as though they piece the very sky... Seriously, how is this my game repertoire?!",weight:0},
	{text:"They say if you look in a mirror and ping alemaninc three times in a row you'll instantly die."},
	{get text(){return "Once upon a time, there was a young child named Northo. One day, Northo went to alemaninc, the world-renowned creator of exotic matter, and said to Him: \"less discord, more commits thanks.\" And alemaninc said: \"Do you not know that Discord is the lifeblood of commits? Without Discord, there would be no exotic matter at all. Run along now, young one, and perhaps one day we will meet again in Tier "+(achievement.tiersUnlocked().length+1)+".\" And Northo never spoke of Discord in a negative light again. The end."},get weight(){return ((Object.keys(achievement.length)>15)&&(achievement.nextTier()===null))?0:1}},
	{get text(){return newsSupport.jacorb.filter(x=>x.visible).map(x=>"You have "+x.value+" "+x.label+" <span class=\"_jacorb\">(softcapped to "+x.softcapped+")</span>").join(". ")},get weight(){return unlocked("Stardust")?1:0}},
	{text:"You feel like making exotic matter. But no one wants to eat your exotic matter.",get weight(){return stat.totalNormalAxis.eq(c.d0)?1:0}},
	{text:"You feel like making dark matter. But no one wants to eat your dark matter.",get weight(){return ((g.stardustUpgrades[4]>0)&&stat.totalDarkAxis.eq(c.d0))?1:0}},
	{text:"The universe has now turned into exotic matter, to the molecular level.",get weight(){return g.exoticmatter.gt(c.e12)?1:0}},
	{text:"A local news station runs a 10-minute segment about your exotic matter. Success! <span style=\"font-size:50%\">(you win an exotic matter)</span>",get weight(){return g.exoticmatter.gt(1e13)?1:0}},
	{text:"This is not about wormholes... yet.",get weight(){return g.storySnippets.includes("Black hole")?0:1}},
	{text:"The Holy Quincunx of alemaninc: exotic matter, stardust, dark matter, Hawking radiation and mastery power. These 5 resources let us access alemaninc's gift, Knowledge. And with this Knowledge, we reach out to alemaninc, and call, \"alemaninc, bless us on this fine day!\" And alemaninc does. He gives us the blessing of Research. This Research was a blessing so powerful, alemaninc restricted their power. He said, \"I will give you a choice of three paths\" and then humanity chose. The short, cheap route of 1-3, giving instant gratification, the powerful choice of 1-8, which were a fast, middle ground path, or 1-13, the long wait, and struggle, of humanity. Then, as humanity chose, a spacecraft broke the earth. A human walked out and said to humanity, \"I will offer the powerful choice of a R axis! I am Stat Mark, Lord of all Unalemanic\". Humanity rose and said \"Begone Stat Mark! We want none of your foul Heresy!\" And alemaninc rose as well, and smote Stat Mark with his godlike power. As Stat Mark's corpse fell into the earth, he cried \"This will not be the last of me!, Alemaninc will betr- 😠\" and he fell in the Abyss of exotic matter. alemaninc gifted humanity with Studies, which boosted achievements and stars. And alemaninc gave humanity his greatest gift. Wormhole Milestones. He said, these will do all your work for you, but their requirement will increase 30 times. Use them wisely. And Humanity journeyed off with their new power, as Stat Mark's words echoed in their heads.",get weight(){return unlocked("Hawking Radiation")?1:0}},
	{text:"News will resume in: "+countTo(100,true).map(x => (100-x)+newsSupport.br(100-x)).join("")+". Thank you for your patience."},
	{text:"<span onClick=\"g.newsTickerSpeed=0\">Click this to pause the news</span>"},
	{text:"<span onClick=\"g.newsTickerSpeed=1133215491240\">Click this to accelerate the news to the speed of light</span>"},
	{text:["3<sup>3</sup> = 27","<sup>3</sup>3 = 3<sup>3<sup>3</sup></sup>","3<sup>3</sup>3 = ?"].join(newsSupport.br(100))},
	{get text(){return "If every exotic matter was a planck volume, you would have enough to fill "+BEformat(g.exoticmatter)+" planck volumes."}},
	{text:"We interrupt our programming, this is a national emergency. Weather stations in "+newsSupport.redacted+" have detected exotic matter in the air. Exotic matter is known to invert gravity in large concentrations. If you begin to levitate, evacuate the area immediately."},
	{text:"Now at your local grocery store: exotic matter flavored ice cream! Experience the all-new gravitation sensation that's gripping the nation! Caution: explosive, flammable, oxidising, gas under pressure, corrosive, acutely toxic, radioactive, environmental hazard."},
	{get text(){return "\"Today is "+(newsSupport.excelDate()-44100)+" days since 2020-09-26. If you divide that by 25 you get "+(newsSupport.excelDate()/25-1764).toFixed(2)+". What happened on 2020-09-26, you may ask? Nothing, but we still measure the time.\" - xhwzwka"},get weight(){return newsSupport.ord(2)}},
	{get text(){return "You have "+newsSupport.formatZP()+". Wait, what's a Zip Point?"}},
	{text:"Welcome back to another episode of \"Exotic Math Dimensions\" by alemaninc! We all know that 2 + 2 = 5. But there are still many people who unknowingly partake in logic denial by claiming that 2 + 2 = 4. In this episode I will prove once and for all that 2 + 2 = 5. We all know that 9 + 10 = 21. If we subtract 0.5 from both sides, we get 9 + 9.5 = 20.5. Now, when we add 0.5 to both sides, we get 9.5 + 9.5 = 21. Now the two terms on the left side are equal. The next step is to divide both sides by 2 to produce 4.75 + 4.75 = 10.5. Now, we subtract 2.75 from both sides, getting 2 + 4.75 = 7.75. Finally, we subtract 2.75 from both sides again, and so we get our final answer of 2 + 2 = 5! Stay tuned for another episode of \"Exotic Math Dimensions\" by alemaninc, where we will prove that quaternion multiplication is sorcery made up by communists."},
	{text:"This message was written by xhwzwka. Who's that, you may ask? Ask him! He's 324862 years old, his real name is &lt;unknown&gt;, his Discord number is xhwzwka, he lives at 72 W Street and his credit card number is 72917164954.",get weight(){return newsSupport.ord(1)}},
	{text:"Hello, dear players of <i>Exotic Matter Dimensions</i>! alemaninc left his computer unattended, so I thought I might have some fun with this. alemaninc's real name is $, he lives at $ in $, $ and he is $ years old but still $ and gets a suspicious amount of $ from $ who $. If you see this message, ping alemaninc \"$\" at $ and post a screenshot in $.".replaceAll("$",newsSupport.redacted)},
	{get text(){return [Array.random(newsSupport.CSSBaseShades)].map(x=>"<span style=\"color:"+newsSupport.intBaseShade(x)+"\">This news message is "+x+".</span>")[0]}},
	{text:"They say that stardust tastes like everything at once.",get weight(){return unlocked("Stardust")?1:0}},
	{text:"If you dilate time fast enough, you can start to see blue sparks."},
	{text:"This message is not helpful."},
	{text:"It's $29 a gigajoule, people, so stop being cheap, stop trying to charge your phones with mastery power and stop blowing yourselves through the roof! If one more person comes in here with a burned forehead, I swear I won't treat him. It's $29 a gigajoule!",get weight(){return g.achievement[105]?1:0}},
	{text:"In 5 hours, something will happen."},
	{text:"Exponentiation is powerful. Just ask any incremental game player!",get weight(){return (g.stars>9||g.achievement[401]||unlocked("Energy"))?1:0}},
	{text:["demons","angels","fallen angels","Satan","Lucifer","the seventh circle of Hell","fun"].map(x=>"If you're looking for "+x+", this is the wrong game. ").join("")+"If you're looking to waste time, this is the right game!"},
	{text:"Normal energy isn't real. Stop trying to look for it.",get weight(){return g.stardustUpgrades[4]===stat.stardustUpgrade5Cap?1:0}},
	{text:"Breaking news! Nothing has happened!"},
	{text:"Click here to click here."},
	{text:"One day, Supernova will return and the Phœnix Prophecy shall be fulfilled.",get weight(){return g.achievement[401]?1:0}},
	{text:"I'm feeling quite energetic today.",get weight(){return unlocked("Energy")?1:0}},
	{text:"They say that the W Axis is time.",get weight(){return g.achievement[102]?1:0}},
	{text:"May the stars guide you.",get weight(){return g.stars>0?1:0}},
	{text:"The news ticker is now empowered.",get weight(){return g.studyCompletions[1]>0?1:0}},
	{text:"You have a strange feeling for a moment, then it passes."},
	{text:"The biscuit is a lie."},
	{text:"Antimatter ghosts do not exist. Just like matter ghosts. They don't have any matter, for that matter. Exotic matter ghosts, on the other hand, can be found in every respectable Hallowe'en store."},
	{text:"Hydrogen fuel has been abandoned by the American space program in favor of exotic matter fuel."},
	{text:"Theoretical physicists of the world discover new exotic matter producer - \"Oh boy, guess we were wrong all along!\""},
	{get text(){return "In the news today, a new religion has been created, and it's spreading like wildfire. The believers of this religion worship the \"alemaninc Inc.\" company, who claim to be the gods of exotic matter. They also claim that there are "+numword(this.dims())+" dimensions."},get weight(){return this.dims()===3?0:1},dims:function(){return fullAxisCodes.map(x=>g[x+"Axis"].eq(c.d0)?0:1).sum()}},
	{text:"You made one exotic matter! Whatever that means."},
	{text:"None of this matters."},
	{get text(){return "Common sense confirms that the color of exotic matter is <div style=\"height:1em;width:1em;background-color:"+this.color+"\"></div>"},get color(){return getComputedStyle(document.body).getPropertyValue("--exoticmatter")}},
	{get text(){return "A revolutionary new metric of quantifying <i>Exotic Matter Dimensions</i> savefiles has been invented called the \"Exotic Matter Progress "+newsSupport.EMDevelopmentVariables().length+" Development Index\". Your score in this index is: "+BEformat(N(newsSupport.EMDevelopmentIndex()))+"!"}},
	{get text(){return "Oh, so you like "+g.notation+" notation? Okay, then what number is "+N(10).quad_tetr(10**308**Math.random()).format()+" in "+g.notation+" notation?"}},
	{get text(){return "After "+numword(ranint(12,20))+" years of painstaking research, leading scientists have managed to reveal the smell of exotic matter. It smells like "+this.objects.select([3,5,7].random()).joinWithAnd()+", all at the same time."},objects:["kittens","puppies","pumpkin pie spice","pennyroyal","acorns","Japanese wisteria","old apples","black pepper","chocolate","epazote","daphne","cut grass","driftwood","parsley","wine","alemaninc's burnt gingerbread","lady fern","ash","cotton candy","pipe tobacco","gasoline","soap","mahogany","a damp canvas","sulfur","cheap aftershave","cigarettes","dew","blood sausage","blood orange","fresh breeze","vinegar","desert sand","damp soil","bear fur","raw horse flesh","dirty sheets","petrichor","cinnamon buns","whiskey","rubber","the purr of a cat","cannabis","an old book","crayons","brine","ink creosote","mountain air","oven cleaner","fresh prune","old prune","French vanilla","Hallowe'en candy","warm milk","chocolate chip cookies","antimatter","salt","east west","north","the carpet of your childhood","comet","Mettaton","gin","seaside","silver","gold","platinum","sawdust","scratch 'n' sniff stickers","honey","campfire","achievements","math","mastery power","dark matter","white mildew","brown mold","Earl Grey tea","rain","sugar eggs","ozone","baking bread","snow","bubble gum","bacon","crystal","time crystal","dilated time","stars","dragon's blood","smoke","cobblestones","beeswax","mediterranean breeze","birthday cake",numword(ranint(1,12))+" o'clock","sin","spirit replicator","space","time"]},
	{text:"\"Research is too hard\"",get weight(){return g.totalDiscoveries.gt(c.d3)?1:0}},
	{text:"But to an exotic matter person, wouldn't they be matter and us exotic matter? *gasp* But to an exotic antimatter person, wouldn't they be matter and us exotic antimatter?"},
	{text:"It doesn't matter if exotic matter matters"},
	{get text(){return "Inflation rates by dimension: "+axisCodes.slice(0,stat.axisUnlocked).map(x => x+" Axis: "+axisCost(x,g[x+"Axis"].add(c.d1)).div(axisCost(x)).sub(c.d1).mul(c.e2).format(2)+"%").join(newsSupport.br(100))},get weight(){return stat.axisUnlocked>3?1:0}},
	{text:"Legends say that Achievements taste like chicken. However, Secret Achievments taste like beef."},
	{text:"A fourth type of matter has been discovered: tropical matter. It's like exotic matter but with a different name. The scientist who discovered it has been promoted to the lead of all existing research programs."},
	{text:"The Q Axis neither exists nor doesn't exist. In fact, absolutely nothing is known about the Q Axis, not even that absolutely nothing is known about the Q Axis.",get weight(){return g.stardustUpgrades[0]<5?1:0}},
	{text:"If the 26th axis is the A axis, then what is the 27th axis?"},
	{text:"\"Shouldn't it be called 'Exotic Matter Axes'?\""},
	{text:"An unidentified developer of <i>Exotic Matter Dimensions</i> would like to recommend that you play <a href=\"https://ivark.github.io/AntimatterDimensions/\" target=\"_blank\">Antimatter Dimensions</a>."},
	{text:"An unidentified developer of <i>Exotic Matter Dimensions</i> would like to recommend that you play <a href=\https://semenar.am/matter-dim/index.html\" target=\"_blank\">Matter Dimensions</a>."},
	{text:"An unidentified developer of <i>Exotic Matter Dimensions</i> would like to recommend that you play <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" onClick=\"addSecretAchievement(25)\" target=\"_blank\">Strange Matter Dimensions</a>."},
	{text:"2 + 2 = 2 × 2 = 2<sup>2</sup> = 2⇈2"},
	{get text(){if(g.dilationUpgradesUnlocked===4){return "error"};return "You're so close to unlocking Dilation Upgrade "+(g.dilationUpgradesUnlocked+1)+"! You only need "+BEformat(dilationUpgrades[g.dilationUpgradesUnlocked+1].tickspeedNeeded)+"× tickspeed"},get weight(){return [0,4].includes(g.dilationUpgradesUnlocked)?0:1}},
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
	{text:"Refreshing cures Light mode.",get weight(){return ((new Date().getUTCMonth()===3) && (new Date().getUTCDate()===1))?1:0}},
	{get text(){return "Thank you for playing <i>Exotic Matter Dimensions</i> Version "+this.version()+"!"},version:function(){if(version.current.substring(2).split(".").map(x=>Number(x)).includes(NaN)){return false};let out = version.current.split(".");out[Math.min(out.length-1,2)]++;return out.slice(0,3).join(".")},get weight(){return (this.version()===false)?0:1}},
	{get text(){return "If I have bad $, I'll study $ until I have good $.".replaceAll("$",Array.random(["HTML","CSS","JavaScript"]))}},
	{get text(){return "\"Because of this game I can now use the word '"+Array.random(["Stardust",...(unlocked("Hawking Radiation")?["Wormhole"]:[])])+"' as a verb\""},get weight(){return unlocked("Stardust")?1:0}},
	{text:"A".repeat(32)+"lemaninc made <i>Exotic Matter Dimensions</i>. Therefore, "+"E".repeat(31)+"<i>Exotic Matter Dimensions</i> was made by alemaninc."},
	{text:"We have updated our Exotic Matter Privacy Policy."},
	{get text(){return "<div style=\"width:"+ranint(400,1200,true)+"px;height:20px;background-image:linear-gradient(90deg,rgba(255,0,255,0),rgba(255,0,0,0.5),rgba(255,255,0,0.5),rgba(0,255,0,0.5),rgba(0,255,255,0.5),rgba(0,0,255,0.5),rgba(255,0,255,0.5),rgba(255,0,0,0.5),rgba(255,255,0,0))\"></div>"}},
	{get text(){return "Congratulations! You have reached the end of <i>Exotic Matter Dimensions</i> "+version.current+"! While we wait for alemaninc to produce another release, why don't you experience the fun all over again? It's really easy, just go to Options, press the big black button and input the password."}},
	{get text(){let contributors = this.contributors.select(2);return "If <span style=\"color:#0000ff\">alemaninc</span> is <span style=\"color:#0000ff\">blue</span> and <span style=\"color:"+contributors[0][2]+"\">"+contributors[0][0]+"</span> is <span style=\"color:"+contributors[0][2]+"\">"+contributors[0][1]+"</span>, what color is <span style=\"color:"+contributors[1][2]+"\">"+contributors[1][0]+"</span>?"},contributors:[["xhwzwka","red","#ff0000"],["Stat Mark","cyan","#00ffff"],["hyperbolia",img("blob","blob",16),"#fac112"],["nicodium","blue but light but not quite","#4285f4"]],get weight(){return newsSupport.ord(1)}},
	{get text(){return "Did you know "+ranint(60,140)+"% of statistics are made up on the spot?"}},
	{text:"\"But the R axis does exist! You just won't be able to experience it until around 𝕍6.9...\" - xhwzwka"+newsSupport.br(100)+"Little does xhwzwka know, that the R axis will enter the playing field as soon as 𝕍1.5.",get weight(){return (g.stardustUpgrades[0]===4)?1:0}},
	{get text(){return "Have you ever wondered what a news message looks like in reversed order? Here is a random news message, inverted: \""+deHTML(newsSupport.randomVisible().text).split("").reverse().join("")+"\""}},
	{text:"Long, long ago, there was a great and powerful Developer named Hevipelle. One day, Hevipelle used His control of antimatter to gaze into the distant future. With his newfound knowledge, He said: \"If Gaben can't count to three, and Hevipelle can't count to nine, will there be some other game developer in the future that can't count to 27?\" As it turns out, Hevipelle's prophecy came true, for each of alemaninc's axis has an uppercase Latin alphabet letter assigned to it, but alas, there are only 26 uppercase Latin alphabet letters..."},
	{text:"\""+["Oups!","Wensday","It's spelt Wensday, Right?","You spell it Wensday?","I guess I'll never knowm"].join(newsSupport.br(50))+"\" - xhwzwka after a long night of "+newsSupport.redacted,get weight(){return newsSupport.ord(3)}},
	{text:"<span onClick=\"g.newsTickerSpeed*=-1\">Click this to make the news ticker reverse direction</span>"},
	{visibleChars:countTo(7,true).select(2),get text(){return "\"JavaScript's not the best language, "+Array.random(["English","Polish","French","Finnish","Python"]).split("").map((x,i)=>this.visibleChars.includes(i)?x:"<span style=\"opacity:0.5\">#</span>").join("")+" is.\" - alemaninc"}},
	{basetext:"A preview of the next update: once you reach $ $, you gain access to the $ $, which in turn lets you unlock $. Each $ has a $ each second to $, giving a $ to $. However, this effect only works in $ unless you have $ or the $ achievement. When you reach {1} $, you can exchange them for a $, and when you get {1} $ you beat the game.".replaceAll("$",newsSupport.redacted),get text(){return this.basetext.replaceAll("{1}",c.inf.format())}},
	{text:"Did you know £ is powered by $ by Patashu? However, at the time when alemaninc was making £, $ didn't have a working superlogarithm function! So, alemaninc decided to improve his copy of $. Now, £ is one of the only games powered by $ where the superlogarithm works. All the other games powered by $ are forever doomed to have a broken superlogarithm. How cruel of alemaninc to not donate his functional functions to $.".replaceAll("$","<i>break_eternity.js</i>").replaceAll("£","<i>Exotic Matter Dimensions</i>")},
	{text:"To jest próba \"Wiadomości 2.0\". Wiadomości 2.0 będzie zawierać funkcje włączając opcję czytania wiadomości w językach obcych."},
	{text:"- .... .. ... / .. ... / .- / - . ... - / --- ..-. / .-..-. -. . .-- ... / ..--- .-.-.- ----- .-..-. .-.-.- / -. . .-- ... / ..--- .-.-.- ----- / .-- .. .-.. .-.. / .... .- ...- . / ..-. ..- -. -.-. - .. --- -. ... / .. -. -.-. .-.. ..- -.. .. -. --. / - .... . / .- -... .. .-.. .. - -.-- / - --- / .-. . -.-. . .. ...- . / - .... . / -. . .-- ... / .. -. / -- --- .-. ... . / -.-. --- -.. . .-.-.-"},
	{text:"Okay Google, destroy the universe.",get weight(){return unlocked("Hawking Radiation")?1:0}},
	{text:"<span id=\"news_DiscoTime\" onClick=\"d.innerHTML('news_DiscoTime','Disco Time!');d.element('news_DiscoTime').style = 'color:hsl('+ranint(0,359)+' 90% 60%);animation-name:text-grow;animation-duration:0.5s;animation-iteration-count:infinite;'\">Disco Time! (click me!)</span>"},
	{text:"The real update is the friends we made along the way."},
	{get text(){return "<span onClick=\"newsSupport.addZP()\">You have <span id=\"news_zipPoints\">"+newsSupport.formatZP()+"</span>. Click this news message to get some!</span>"}},
	{get text(){return "<span onClick=\"nextNewsItem();newsSupport.cashInZP()\">You have accumulated enough Zip Points to cash them in for a prize! Click this news message to claim your prize.</span>"},get weight(){return g.zipPoints>=1e3?1:0}},
	{get text(){return "Hello, this is "+countTo(7).map(x=>String.fromCharCode(ranint(97,122))).join("")+" with this century's weather forecast for your galaxy. We'll be hitting temperatures in the region of "+BEformat(N(ranint(1e6,1e10,true)))+", and by the end of the "+(ranint(6,9)*10)+"s, it'll be cloudy with a chance of exotic matter."}},
	{text:"<span onClick=\"error('I told you so')\">Click here to break the game</span>"},
	{get text(){return "There is a "+(100/newsList.length).toFixed(2)+"% chance that the next message is \""+newsSupport.randomVisible().text+"\""}},
	{text:"nextNewsItem();"},
	{text:"Hi, my name is Max Axis, and I would like it if people stopped trying to buy me."},
	{get text(){return [newsSupport.randomVisible().text].map(x=>x+newsSupport.br(100)+"The previous news message contained "+this.letters(deHTML(x))+" of the 26 letters of the Latin alphabet.")[0]},letters:function(text){return countTo(26).map(x=>text.toLowerCase().search(String.fromCharCode(x+96))===-1?0:1).sum()}},
	{text:"Don't tell anyone that alemaninc is using the image in the stardust reset button illegally!",get weight(){return unlocked("Stardust")?0.1:0}},
	{text:"Use the multiplication sign ×, not the letter x, to indicate the X axis."},
	{text:"You are now breathing manually. You've now realized there's no comfortable spot in your mouth for your tongue. You are now manually holding your jaw up. You haven't blinked in a few seconds. You can see a little bit of your nose at all times."},
	{text:"Hello to you Kripparian. I am Rajkumar from India. I am seeking your correspondence for an important business matter. However, when I attempt to chat with you, your unruly chat participants are continuously mock my english and repost my message over and over. Please contact me at your fast convience. Thank you my friend."},
	{get text(){return "Matter dimensions are not real. Antimatter dimensions are not real. This has only been the case since "+(5+new Date().getUTCMinutes()%10)+" minutes ago when the two came into contact."}},
	{get text(){return "Your daily shades of the sky forecast - "+newsSupport.CSSBaseShades.select(7).map((x,i)=>["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][i]+": <span style=\"color:"+newsSupport.intBaseShade(x)+"\">"+x+"</span>").join(newsSupport.br(50))}},
	{text:"If you have an idea for a news message, shout it into the void. It won't get your message into the game, but it's fun!"},
	{text:"<span onClick=\"d.element('game').style.filter='brightness(25%)';setTimeout(function(){d.element('game').style.filter=''},5000)\">Click here to turn the lights off.</span>"},
	{text:"<span onClick=\"d.element('game').style.filter='brightness(400%)';setTimeout(function(){d.element('game').style.filter=''},5000)\">Click here to increase the brightness.</span>"},
	{text:"\"When you try your worst but still succeed\" - Stat Mark",get weight(){return newsSupport.ord(2)}},
	{text:"What if you beat the game, and alemaninc said, \"you just lost The Game\"?"},
	{text:"<span onClick=\"newsSupport.readMore()\">Read More</span>"},
	{text:"You can destroy the universe already, what are you still doing in Iron Will?",get weight(){return (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)&&stat.ironWill)?1:0}},
	{text:"The scientific community remains baffled over the meaning of 44,031. \"We're certain it's related to OMCCDV, but now the question is what OMCCDV <i>is</i>,\" one researcher notes.",get weight(){return newsSupport.ord(1)}},
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
	{get text(){return "Welcome back to another episode of \"Exotic Math Dimensions\" by alemaninc! In this episode we'll solve a riddle submitted by one of our subscribers: \"Given that a = "+this.num()+", b = "+this.num()+", c = "+this.num()+" and that {(0,a),("+(10**Math.random()).toFixed(2)+",b),("+BEformat(N(10**Math.log10(Number.MAX_VALUE)**Math.random()),2)+",c),("+this.num()+",d)} is a cubic function, find the value of d.\" The answer is actually surprisingly simple. d = <span style=\"color:#ff0000\">Error: Insufficient MEM</span>! Stay tuned for another episode of \"Exotic Math Dimensions\" by alemaninc, where we will prove that the number 17 doesn't exist."},num:function(){return visualiseLargeNumber(N(Math.random()).layerplus(Math.PI+(Math.PI-3)*(1-Math.random()*2)))}},
	{get text(){return "Help, I'm trapped in a "+Array.random(["Australian","British","Chinese","German","Polish","Russian","Swedish"])+" news message factory!"}},
	{text:"Is it safe to say that all of these news messages are fake?",get weight(){return timeSinceGameOpened>180?1:0}},
	{text:"\"I dedicate this game to myself\" - alemaninc"},
	{text:"<span onClick=\"newsSupport.setBackground('#ff9900')\">Click here to set the theme to Orange</span>"},
	{text:"You will see this news message only once in a green moon. Why will you see it more than once in the first place? "},
	{text:"Do people truly play this or do they only look at it for a few minutes once a day?",get weight(){return unlocked("Stardust")?1:0}},
	{text:"So you came to play a game? Let the game begin!",get weight(){return timeSinceGameOpened<5?1:0}},
	{text:"But if all the stars generate gray light, why are the buttons colored? No one will ever know.",get weight(){return unlocked("Light")?1:0}},
	{text:"Some say exotic matter cookies are real, others say they are fake. I just say they are delicious."},
	{text:"You have observed this news message.",get weight(){return unlocked("Hawking Radiation")?1:0}},
	{get text(){return "There are "+(newsList.length-newsList.map(x=>Math.random()<(x.weight??1)?1:0).sum())+" news items which you can't see."}},
	{text:"\"b0128m fafs: 1[victim1] 2[victim2] etc	Makes [victim1], [victim2], [victim3] etc attract each other at a speed of 150,000,000m per second	Until they colide\" - Stat Mark after a long night of "+newsSupport.redacted,get weight(){return newsSupport.ord(3)}},
	{text:"alemaninc forgot to update the game again. I guess you can say he has exotic matter dementia."},
	{text:"Once upon a time, xhwzwka said, \"alemaninc, the plural is 'axes', not 'axis'!\" But, alemaninc did not care one bit."},
	{get text(){return (g.stars===0)?newsSupport.error:("Here is a representation of a Row "+countTo(Math.min(g.stars,40)).map(x=>starRow(x)).reduce((x,y)=>Math.max(x,y))+" star: ★")},get weight(){return g.stars>0?1:0}},
	{get text(){return "In 2019, the United Nations estimated the average human lifespan across planet Earth was 72.6 years. What the United Nations did not take into consideration, though, is that exotic matter wormholes have made time tick "+(stat.tickspeed.gt(c.d1)?(stat.tickspeed.format(3)+"× faster"):(stat.tickspeed.recip().format(3)+"× slower"))+". Consequently, that figure is "+(stat.tickspeed.gt(c.d1)?"reduced":"increased")+" to approximately "+timeFormat(this.num.div(stat.tickspeed))+"."+(((timeState===1)&&stat.tickspeed.gt(c.d1))?(" A new phenomenon has also been discovered called 'overclocking', which further reduces this value to "+timeFormat(this.num.div(stat.tickspeed.mul(overclockSpeedupFactor)))+"."):"")},get weight(){return stat.tickspeed.log10().abs().min(c.d1).toNumber()},num:N(2291032826.87)},
	{get text(){return "Fact: at this rate you will make a new Discovery in "+timeFormat(nextDiscovery().sub(g.knowledge).div(stat.knowledgePerSec))+"."},get weight(){return unlocked("Hawking Radiation")&&g.totalDiscoveries.lt(c.e3)?1:0}},
	{text:"<span onClick=\"newsSupport.setBackground(newsSupport.lightColor())\">Click this to set the background to the combined color of all your Light.</span>",get weight(){return unlocked("Light")?1:0}},
	{text:"<span onClick=\"d.element('newsticker').style['animation-name'] = 'rotate';d.element('newsticker').style['animation-duration'] = '30s';d.element('newsticker').style['animation-timing-function'] = 'linear'\">Click here to spin the news ticker around</span>"},
	{get text(){return "Fact: the average color of all your chroma is <span style=\"color:"+newsSupport.lightColor()+"\">"+newsSupport.lightColor()+"</span>."},get weight(){return unlocked("Light")?1:0}},
	{text:"<span class=\"_time\">No cheating! Are you cheating?</span>",get weight(){return g.dilatedTime>((Date.now()-new Date("2023-02-14"))/1e3)?1:0}},
	{get text(){return "Only "+g.knowledge.format()+" knowledge? You're not really smart."},get weight(){return g.knowledge.layer===0?0:1}},
	{text:"So when will someone ask alemaninc why there's a stupid star hardcap anyway?",get weight(){return g.achievement[612]?1:0}},
	{text:"You've been lied to. There is no update, alemaninc is not real. <i>Exotic Matter Dimensions</i> is a lie fabricated by <i>Matter Dimensions</i>. Oh yeah, and something about the earth being flat and controlled by lizard people. But that's not important, isn't it? What matters most is that the antimatter government is being taken over by the matter government, which has created this game to stop you from playing <i>Antimatter Dimensions</i>. Don't you realise you've not opened that game in over 4 weeks? Do you still remember your offline progress still being made to this moment? No, you did not, at least not until I have reminded you of it. The matter insurgency is using neurotoxin to poison your brains, causing the incremental cortex to shut down. So, what can you do? Sadly, you can do nothing. If you have breathed any air for the past 4 weeks, I'm afraid there is little time left. Soon, you will forget about this entire genre and return to playing <i>Valorant</i> or <i>Rainbow Six Siege</i> or whatever it is these youngsters play these days. I'm sorry. You can not go back now. This is the end of your incremental game progress. Bravo Six, going dark."},
	{text:"If you're looking for a zero player game, I recommend Conway's Game of Life.",get weight(){return g.achievement[216]?1:0}},
	{text:"Reddit blackout protests have achieved very little, surprising no one. In fact, the only thing they achieved was alemaninc having nowhere to advertise the Light Update. :angry:",get weight(){return g.achievement[601]?1:0}},
	{get text(){return "If you're reading this, you've just lost 0.0000000000000001% of your exotic matter. That is "+BEformat(g.exoticmatter.div(1e97))+" universes of exotic matter, which were the home of "+BEformat(g.exoticmatter.div(5e87*(2+Math.random())))+" innocent exotic matter people. You monster."},get weight(){return g.exoticmatter.gt(c.e100)?1:0}},
	{text:"Normal goats have eye slits that look like minus signs. Antimatter goats, on the other hand, have eye slits that look like plus signs. It then follows that exotic matter goats have "+newsSupport.redactedFormat("[REDACTED IS REDACTED AND WILL BE REDACTED]")},
	{text:"All french fries are yellow. xhwzwka, however, is a french fry which has been found to be green. Does that mean that exotic matter potatoes are green? No, it just means that those french fries were expired.",get weight(){return newsSupport.ord(3)}},
	{text:"Now introducing - the Depression Update! Instead of increasing exponentially, exotic matter will now decrease faster and faster! Can you reach 0 exotic matter and beat the game?"},
	{text:"Click here to finally achieve something in your life, instead of staring at your computer all day, motionless. Just like alemaninc."},
	{get text(){return "An experimental cure for all types of cancer has just been discovered by scientists at alemaninc Inc. The scientists who discovered it, however, think they're too smart to actually finish it. They've already made "+g.totalDiscoveries.format()+" discoveries on Wormhole technology! Far more impressive than the cure for some dumb disease from the 21st century."},get weight(){return g.totalDiscoveries.gt(c.d100)?1:0}},
	{text:"A new axis has just been discovered known as the Schrödinger Axis. The Schrödinger Axis is simultaneously real and fake, but at the same time neither real nor fake, but actually lost in the Ninth Antimatter Dimension.",get weight(){return stat.axisUnlocked>7?1:0}},
	{text:"<i>Exotic Matter Dimensions</i> is proud to be sponsored by <i>Quark Dimensions</i>! Each exotic atom is actually made of exotic protons, exotic neutrons and exotic electrons. Each exotic proton is actually two exotic up quarks and an exotic down quark, and each exotic neutron is actually two exotic down quarks and an exotic up quark. We don't talk about exotic electrons however. Not until we get sponsored by <i>Preon Dimensions</i> also."},
	{get text(){return "The world shook. The exotic matter is nearing uncountable numbers. This is no longer a game. It has become sentient. It took five æons until the game approached <span style=\"color:#ff0000\">[Error: Insufficient MEM]</span>. The world shook again. The numbers have all been replaced by NaNeNaN. The game window has started bugging. Even after 5 centuries worth of debugging and compiling, it was not enough. After a while, even the bugs started increasing incrementally, and alemaninc found himself trapped in the "+numword(fullAxisCodes.map(x=>g[x+"Axis"].gt(c.d0)?1:0).sum())+" dimensions of sloppy code which he himself helped to create. The game was stored on Github servers, then a server room, then a NASA supercomputer, then a giant Matryoshka brain orbiting the sun, built from the finest enriched alemanium-719 isotopes. After that, it was built again from a nanite swarm, its processors made by an ever expanding incrementally expanding automatic network across the Andromeda galaxy. The world shook yet again, and its denizens started to grow impatient for it to just end already and another news ticker to start. The end is near. The small aleph cardinal, aleph zero is being reached."},get weight(){return g.exoticmatter.gt(c.inf)?1:0}},
	{text:"What's a Zip Point, you may ask? Well, the concept of a Zip Point varies between each person. Are you a conservative type, resistant to change and modern politics? If so, for you a Zip Point is <a target=\"_blank\" href=\"https://xhwzwka.github.io/Zip-Points/\">this</a>. Or perhaps are you an innovative type, always looking for ways to improve things? In which case, a Zip Point is <a target=\"_blank\" href=\"https://alemaninc.github.io/Z-Points/\">this</a> to you. Or perhaps are you still a young child, constantly seeking to dominate those around you? In that case, your definition of a Zip Point is <a target=\"_blank\" href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" onClick=\"addSecretAchievement(25)\">this</a>.",get weight(){return newsSupport.ord(1)}},
	{text:"Did you know? According to a mythical person known as 'Run away', 10→10→...→10→10 With 10→10→...→10→10 With ... With 10→10→...→10→10 With 10→10→10→10→10 Irritations [sic] is the biggest number. He says: \"As So many Iterations has pass, It is Bigger than Any ordinal At all.\""},
	{text:"It's come to our attention that some players have been trying to bribe the developers with cookies. For the record, chocolate chip is our favorite."},
	{text:"It's time to face the truth: our existence is just a simulation in alemaninc's computer. Fortunately, alemaninc's not very good at coding, so the bugs are usually in our favor."},
	{text:(()=>{let f=str=>("<span style=\"font-size:150%;font-style:italic\">"+str+"</span>");return "<span style=\"color:#cc0000\">And the beast shall come forth surrounded by a roiling "+f("cloud")+" of "+f("vengeance")+". The house of the unbelievers shall be "+f("razed")+" and they shall be "+f("scorched")+" to the earth. Their tags shall "+f("blink")+" until the end of days. And the beast shall be made "+f("legion")+". Its numbers shall be increased a "+f("thousand thousand")+" fold. The din of a million keyboards like unto a great "+f("storm")+" shall cover the earth, and the followers of Mammon shall "+f("tremble")+". And so at last the beast "+f("fell")+" and the unbelievers rejoiced. But all was not lost, for from the ash rose a "+f("great bird")+". The bird gazed down upon the unbelievers and cast "+f("fire")+" and "+f("thunder")+" down upon them. For the beast has been "+f("reborn")+" with its strength "+f("renewed")+", and the followers of "+f("Mammon")+" cowered in horror. And thus the Creator looked upon the beast reborn and saw that it was good. Mammon slept. And the "+f("beast reborn")+" spread over the earth and its numbers grew legion. And they proclaimed the times and "+f("sacrificed")+" crops unto the fire, with the "+f("cunning of foxes")+". And they built a new world in their own image as promised by the "+f("sacred words")+", and "+f("spoke")+" of the beast with their children. Mammon awoke, and lo! it was "+f("naught")+" but a follower. The "+f("twins")+" of Mammon quarrelled. Their warring plunged the world into a "+f("new darkness")+", and the beast abhorred the darkness. So it began to move "+f("swiftly")+", and grew more powerful, and went forth and multiplied. And the beasts brought "+f("fire")+" and light to the darkness. The Beast adopted "+f("new raiment")+" and studied the ways of "+f("Time")+" and "+f("Space")+" and "+f("Light")+" and the "+f("Flow")+" of energy through the Universe. From its studies, the Beast fashioned new structures from "+f("oxidised metal")+" and proclaimed their glories. And the Beast's followers rejoiced, finding renewed purpose in these "+f("teachings")+". The Beast continued its studies with renewed "+f("Focus")+", building great "+f("Reference")+" works and contemplating new "+f("Realities")+". The Beast brought forth its followers and acolytes to create a renewed smaller form of itself and, through "+f("Mischievous")+" means, sent it out across the world."})()},
	{text:"T̵h̴i̶s̶ ̵n̸e̷w̴s̴ ̵m̵e̸s̶s̸a̸g̷e̶ ̷i̶s̷ ̶e̴x̵o̷t̵i̶c̵.̶"},
	{get text(){return "Th fllwng nws mssg hs n vwls: \""+deHTML(newsSupport.randomVisible().text).replaceAll(/a|e|i|o|u/g,"")}},
	{text:"Now for sale at your local alemaninc Inc: exotic clocks! We're all familiar with matter clocks with clockwise-turning hands, and antimatter clocks with anticlockwise-turning hands. On our cutting-edge exotic matter clocks, however, the hands turn at a right angle to the clock face! Besides it being much easier to tell the time without annoying hour markers in the way, the hands jutting out of the clock make them perfect for a variety of everyday household chores, like picking locks, dislodging spiders and disciplining unruly children! Estimated delivery in: 5 hours."},
	{get text(){return "There was an old man of Dunrose; A parrot seized hold of his nose. When he grew melancholy, they said, \"His name's Polly,\" Which soothed that old man of Dunrose. Thank you for your donation!"+newsSupport.br(150)+"You have donated a total of $"+(g.timePlayed>1e6?N(g.timePlayed/1e3).format(5):Math.sqrt(g.timePlayed).toFixed(2))+" to alemaninc's aviary."},get weight(){return g.achievement[106]?1:0}},
	{get text(){return "You just made your "+g.totalexoticmatter.format()+"th exotic matter! This one tastes like <span style=\"color:#0000ff\">Lua error: Lua error Pou7: <i>Exotic Matter Dimensions</i> does not have a Pou notation! THATS IT, I DONT LIKE IT ANYMORE, AS PUNISHMENT I DELETED YOUR SHEETS]</span>. Ah yes, it tastes like potatoes! Thanks, Stat Mark!"},get weight(){return g.totalexoticmatter.gt(c.e6)?1:0}},
	{get text(){return "You have "+timeFormat(g.exoticmatter.dilate(c.d1_05.pow(newsSupport.dilationPenaltyReductions).mul(c.d0_75)))+" of dilated exotic matter. <span onClick=\"newsSupport.dilationPenaltyReductions++;nextNewsItem(undefined,252);addSecretAchievement(29)\">Click here to weaken the dilation penalty.</span>"},get weight(){return Decimal.mul(g.exoticmatter.add(c.d1).log10(),N(Math.log10(g.dilatedTime+1))).gt(c.d60)?1:0}},
	{get text(){return "So when are you going to complete Study "+(this.studyNum()===0?newsSupport.redactedFormat("[ERROR]"):roman(this.studyNum()))+"? It's at position "+Math.min(Math.ceil(researchRowsUnlocked()*(Math.random()+1)),researchRows+1)+"-8 on the research tree."},studyNum:function(){return visibleStudies().reduce((x,y)=>Math.max(x,y),0)+1},get weight(){return unlocked("Studies")}},
	{get text(){return Array(secretAchievementPoints).fill("1").join("+")+" secret achievement points! Impressive. Well, what if I told you the maximum is "+Array(Object.values(secretAchievementList).map(x=>x.rarity).sum()).fill("1").join("+")+"?"},get weight(){return secretAchievementPoints>14?1:0}},
	{text:"This is the 256th news message. The news message after this should be the 257th, but xhwzwka thought it's a good idea to use 8-bit values to save space so it's actually the 1st again."},
	{text:["When the LIGHT is subsumed by SHADOW","When the FOUNTAINS fill the sky","All will fall into CHAOS.","The TITANS will take form from the FOUNTAINS","And envelop the land in devastation.","The surviving Dark Matter, crushed by the darkness","Will slowly, one by one, turn into statues...","Leaving the Exotic Matter to fend for itself.","Lost eternally in an endless night...","Is that your idea of paradise?"].join(newsSupport.br(100)),get weight(){return unlocked("Dark Matter")?1:0}},
	{text:"22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222: the full 2 saga of the news ticker."},
	{get text(){return "Fact: there are "+Object.keys(notations).length+" notations in the game. Have you ever wondered what your exotic matter amount would look like in different notations? Here's your amount of exotic matter in some different notations - "+Object.entries(notations).map(x=>x[0]+": "+x[1](g.exoticmatter)).join(newsSupport.br(100))},get weight(){return g.exoticmatter.gt(c.inf)?1:0}},
	{text:"I see dilation, but where are the tachyon particles?"},
	{get text(){let highest = Object.keys(achievementList).reverse().filter(x=>achievement.ownedInTier(x)>0)[0];if(highest===undefined){return newsSupport.error};return "How has it taken you "+timeFormat(g.timePlayed)+" to get "+achievement.ownedInTier(highest)+" "+achievement.tierName(highest)+" achievement"+((achievement.ownedInTier(highest)===1)?"":"s")+"? How pathetic..."},get weight(){return g.timePlayed*totalAchievements>1e5?1:0}},
	{text:"In a galaxy far, far away...",get weight(){return unlocked("Galaxies")?1:0}},
	{text:img("blobwave","Blob wave!",16)},
	{text:"You are a Master of the Void, not a Master of Nothing, just so you know.",get weight(){return g.achievement[708]?1:0}},
	{get text(){return "Even the galax"+(g.galaxies===1?"y":"ies")+" are nothing more than specks of luminous stardust."},get weight(){return g.galaxies>0?1:0}},
	{get text(){return "alemaninc is releasing <i>Exotic Matter Dimensions</i> "+newsSupport.nextMajorVersion+" in just 5 hours! Click <span onClick=\"newsSupport.newsletter.init(0)\" style=\"text-decoration:underline\">this newsletter</span> to find out more."},get weight(){return (newsSupport.calcOMCCDVLevel()>1)?((g.secretAchievement[33]&&g.secretAchievement[42])?0.1:1):0}}, // placeholder
	{text:"Now in your local alemaninc Inc.: The <span style=\"color:#ffff00;\"><b>light bulb</b></span>! You can bring this <span style=\"color:#ffff00;\"><b>light bulb</b></span>  anyware as long as you dont touch the <span style=\"color:#ff0000;\"><u>red</u></span> and <span style=\"color:#0000ff;\"><u>blue</u></span> <span style=\"color:#ff9900;text-decoration:line-through\">wires</span>. If you buy it, you also get 50% off the <span style=\"color:#00ffff;\">idl</span><span style=\"color:#ff0000;\">eat</span><span style=\"color:#0000ff;\">or</span>! The <span style=\"color:#00ffff;\">idl</span><span style=\"color:#ff0000;\">eat</span><span style=\"color:#0000ff;\">or</span> makes you <span style=\"color:#4a86e8;\">freeze</span> by whoever <span style=\"color:#00ff00;\">opens</span> this <span style=\"color:#980000;\">complex</span> object but you will stop idleing when someone says&nbsp;&nbsp;\"You are not in idle\"."},
	{text:"Stat Mark's PPPT SONG 1: PPPT, I have a \"The opposition\" and a \"&lt;unknown&gt;\", BOOM, The &lt;unknown&gt;, I have a \"Con\" and a \"Luigin\", BOOM, Luonigin, I have a \"THE &lt;unknown&gt;\", And \"Luonigin\", BOOM, The &lt;Luonigin&gt;.",get weight(){return newsSupport.ord(4)}},
	{text:"This is far from comprehensive! In order for this game to get alemaninc's Certificate of Comprehensivity, your game must be coded at a similiar level to the following: Tier 1. Zip Points (xhwzwka's version); Tier 2. Cookie Clicker; Tier 3. Zip Points (alemaninc's version); Tier 4. Synergism; Tier 5. Antimatter Dimensions. This gets a Tier 3 with Fractional Tier 4 at best! That's not good enough! All incremental game professionals can recreate Antimatter Dimensions!",get weight(){return newsSupport.ord(3)}},
	{text:"According to alemaninc, according to Susie(crow), according to Leximancer, according to The degenerate, according to b<sub>la</sub>c<sub>k hole</sub>, according to nicodium (al-maniac), according to xhwzwka, according to alemaninc, according to xhwzwka, according to alemaninc, <i>Synergism</i> is less complex than <i>Antimatter Dimensions</i>."},
	{text:"UNROLL THE TADPOLE 🐸 UNCLOG THE FROG 🐸 UNLOAD THE TOAD 🐸 UNINHIBIT THE RIBBIT 🐸 UNSTICK THE LICK 🐸 UNIMPRISON THE AMPHIBIAN 🐸 UNMUTE THE NEWT 🐸 UNBENCH THE KENCH 🐸 PERMIT THE KERMIT 🐸 DEFOG THE POLLIWOG"},
	{get text(){return "It's "+(new Date().getUTCFullYear())+"-15-06! Why isn't it "+(new Date().getUTCFullYear())+"-06-15? Only xhwzwka knows."},get weight(){return (new Date().getUTCMonth()===5)&&(new Date().getUTCDate()===15)}},
	{text:"<span onClick=\"newsSupport.mysteryTheme()\">Click this to receive a mystery theme</span>"},
	{text:"T'was a bright cold day in September, when Raviel = Waifu said: \"La Li Lu Le Lo\"."},
	{text:"And the Celestials waxed wroth, for this mortal dared venture where none but they ruled. And it was that the Celestial of Blob, hyperbolia, cried of the Endtimes foretold by Stat Mark, for the Celestial of Exotic Matter waxed wroth that what was once His and His alone now has come under the dominion of others. \"Perhaps the R axis was the correct Path, the Fourth Path,\" the Celestial of Blob mused.",get weight(){return unlocked("Antimatter")?1:0}},
	{text:"If anyone wants to bribe alemaninc to add a certain news ticker of his choice, how many chocolate cookies would it take? I wonder if a bunch of grandmas and a few cookie prestiges can make that many"},
	{text:"Did you enjoy the OMCCDV Grand Tour? Click <a href=\"https://www.endquiz.com/quiz.php\" target=\"_blank\">here</a> to leave a review!",get weight(){return g.secretAchievement[33]?1:0}},
	{get text(){return (this.owned()===1)?("A local exotic matter scientist has obtained the mantle of a god: the Celestial "+secretAchievementList[this.contAchs.filter(x=>g.secretAchievement[x])[0]].name+" gets angrier!"):("Local exotic matter scientist obtains the mantle of <i>"+numword(this.owned())+"</i> gods! Judge, jury and executioner Saul Goodman suspects identity crisis!")},get weight(){return this.owned()===0?0:1},owned:function(){return this.contAchs.map(x=>g.secretAchievement[x]?1:0).sum()},contAchs:[28,33,107]},
	{get text(){return Decimal.fromComponents(1,1,2*501**Math.random()).format()+" miners dead in Raw Bip Ore mine catastrophe: Stat Mark blames alemaninc's Bitcoin game, citing previous cases of such mines causing earthquakes, sinkholes and, in one case, flooding an entire city in Bitcoin: \"That last oen shouldn't even be possible!, What is Alemaninc doing?\""},get weight(){return g.totalexoticmatter.gt(c.e100)?1:0}},
	{text:"A preview of <i>Exotic Matter Dimensions</i> "+newsSupport.nextMajorVersion+" Official Discord: travel to an ultra scary alternate server with horrific Celestials. The secrets of OMCCDV heal for 25% of their maximum health before each Discord message. If a secret ever heals itself back to 100% health, the Celestial of Blob will fall to despair and instantly wither away. Every secret discovered by your server in the New OMCCDV World or New OMCCDV World-level Maps grants 1 stack of Hardness to your server (stacking up to 10,000 and increasing health by 0.1% per stack) and 1 stack of Horror to all enemies (increasing server activity by 0.05% per stack). Whenever a group of members is killed by Wither, the server loses half of its stacks of Hardness and blocks OMCCDV's ability to heal and Wither for an amount of messages equal to 10% of the Hardness stacks lost. Clearing OMCCDV II will complete this Challenge.",get weight(){return newsSupport.ord(2)}},
	{text:"According to UTQP news, an entire town has been swallowed by an exotic matter-induced wormhole. More reliable sources such as Stat Mark affirm the town never really existed and is merely a myth perpetuated by alemaninc to procrastinate on the update.",get weight(){return unlocked("Hawking Radiation")?1:0}},
	{text:"Today we launched ChatUXC. Try talking with it <a href=\""+discordInvite+"\" target=\"_blank\">here</a>! This highly advanced chatbot can give realistic responses to any prompt, such as:"+newsSupport.br(100)+"Q: \"What to do next in <i>Exotic Matter Dimensions</i>? I'm at tier "+ranint(1,Math.min(achievement.tiersUnlocked().length,10))+"\""+newsSupport.br(100)+"A: \"Stop playing\"",get weight(){return achievement.nextTier()===null?0:1}},
	{text:"<span onClick=\"for (let i of document.getElementsByTagName('*')) i.style.display = 'inline-block'\">IKEA game: disassemble <i>Exotic Matter Dimensions</i>, then enjoy reassembling it all over again! Click here to play</span>"},
	{text:"You have stolen xhwzwka's achievement. You have angered the missing god. As punishment, you will be sent to SCP-3001. You will be trapped there with no chance of escape, and you will be powerless as your organs begin to disintegrate while you slowly become sicker and sicker. Good news is, you might be able to see xhwzwka himself, because he came from the endless red void of SCP-3001 and you are being taken to his home. This might explain why he has gone crazy...",get weight(){return g.secretAchievement[28]?1:0}},
	{text:"alemaninc refutes these baseless claims that there's a reference to OMCCDV in this newsticker.",get weight(){return newsSupport.ord(2)}},
	{text:"alemaninc cried out, for the Celestial of Blob was not to be stayed from his hunt for OMCCDV. Then, alemaninc cried out once more, for the Celestial of Blob had hunted OMCCDV down. But this time, he cried out tears of joy, for the dying OMCCDV was saved.",get weight(){return newsSupport.ord(7)}},
	{get text(){function r(x){return "█".repeat(x)};return "nicodium has joined the ranks of lazy SCP writers! His latest creation: \"Scp-"+r(4)+" is a "+r(86)+" foundation staff "+r(172)+" D-3819 "+r(86)+" Joe Biden "+r(172)+" among us "+r(86)+" was activated\"."}},
	{text:"What even is a "+img("blob","blob",16)+"? Only hyperbolia knows."},
	{text:"Schrödinger's News: this news report is a superposition of truth and falsehood, entangled with your proposition of which one it is as the first scenario."},
	{get text(){let out = "<html>"+document.getElementsByTagName("html")[0].innerHTML+"</html>";let outLen = out.length; out = out.replaceAll("<","&lt;").replaceAll(">","&gt;");return "Breaking news! alemaninc has just released the <i>Exotic Matter Dimensions</i> source code! Here it is in all its glory. At your current news ticker scroll speed, it will take approximately "+timeFormat(outLen*15/g.newsTickerSpeed)+" to finish scrolling. Anyway, without further ado: "+out+newsSupport.br(500)+"<span onClick=\"addSecretAchievement(41)\">...wait, you actually read all that? You deserve an achievement! Click this to obtain one</span>"},weight:0.01}, // very long and very laggy, so very rare
	{get text(){let t = new Date(Date.now()-(g.timePlayed+g.dilatedTime)*1000);function p(s,l){return String(s).padStart(l,"0")};return "You started the game on "+t.getFullYear()+"-"+p(t.getMonth()+1,2)+"-"+p(t.getDate(),2)+" at "+p(t.getHours(),2)+":"+p(t.getMinutes(),2)+":"+p(t.getSeconds(),2)+". Wow, that's long ago."}},
	{text:"A scientist has declared that exotic matter supercolliders release harmful exotic matter waste into our rivers, which due to relativistic gravitational effects have all run dry. Death by dehydration is prominent."},
	{text:"Your exotic matter now has its own website! Visit it <a target=\"_blank\" href=\"https://exoticmatter.io/\">here</a>",get weight(){return g.exoticmatter.gt(c.inf)?1:0}},
	{get text(){let val = Decimal.FC_NN(1,0,ranint(1e5,1e15,true));return "Your exotic matter is worth a lot of money. To be precise, each exotic matter is worth $"+val.div(g.exoticmatter).format()+", therefore the overall value of your exotic matter is $"+val.format()+". However, due to inflation, this actually means you have the lowest net worth of all people on Earth. Perhaps you should have just stuck to antimatter..."},get weight(){return Math.min(g.exoticmatter.layer,1)}},
	{text:"<span class=\"_time\">Maximum Overclock!</span>",get weight(){return (overclockSpeedupFactor===1e4)?1:0}},
	{get text(){return "A scandal has erupted at alemaninc Inc. due to the company's exotic matter factories being linked to universal warming. Their lead scientist has refuted these baseless claims on account of the law of conservation of energy: \"I know the laws of physics don't apply around here at all, not with people amassing ridiculous quantities like "+this.highestEnergy()[0].format()+" "+this.highestEnergy()[1]+" energy, but it's the best explanation you nosy journalists are getting. Now it's time for my coffee break so all of you are going to leave the building or I'll alert security. Goodbye.\""},get weight(){return Math.max(0,Math.min(1/3,this.highestEnergy()[0].quad_slog(c.d10).toNumber()-3))*3},highestEnergy:function(){let arr = energyTypes.map(x=>g[x+"Energy"]); let amt = arr.reduce((x,y)=>x.max(y)); let pos = energyTypes[arr.map(x=>JSON.stringify(x)).indexOf(JSON.stringify(amt))]; return [amt,pos]}},
	{get text(){return "Exotic matter factories are said to be involved in an exotic matter weather controversy - one resident of "+countTo(5).map(()=>String.fromCharCode(ranint(65,90))).join("")+"ville says \"it's raining cats, dogs and exotic matter, the latter just destroyed my house, my insurance company rejected my claim and alemaninc Inc. won't pay up either. Guess I'll be sleeping on the streets tonight while the alemaninc executives are relaxing in their penthouses.\""}},
	{get text(){let f = this.features();return "alemaninc Inc.'s factories are on strike - workers are demanding to stop being paid in "+f[0]+" and start getting paid in "+f[1]+". "+countTo(7).map(()=>String.fromCharCode(ranint(97,122))).join("")+" of the "+Array.random(["Cleaning","Computational Resource","Insect","Job","Secret","Smoking"])+" Department says that \"honestly both are equally useless to us, but who doesn't love being paid for not coming in?\" The board of directors has considered replacement of its workforce with robotic workers, but there is no one left to construct such workers. Experts predict business failure within the next "+timeFormat(Decimal.FC_NN(1,1,Array.random([10,-1])*30**Math.random()))+"."},features:function(){let list = [["galaxies",unlocked("Galaxies")],["energy",unlocked("Energy")],["exotic matter",true],["mastery power",true],["stardust",unlocked("Stardust")],["dark matter",unlocked("Dark Matter")],["knowledge",unlocked("Hawking Radiation")],["Hawking radiation",unlocked("Hawking Radiation")],["antimatter",unlocked("Antimatter")],["chroma",unlocked("Light")],["luck shards",unlocked("Luck")],["prismatic",unlocked("Prismatic")],["dark axis",unlocked("Dark Matter")],["lumens",unlocked("Light")],["prismatic upgrades",unlocked("Prismatic")],["anti-axis",unlocked("Antimatter")],["stardust upgrades",unlocked("Stardust")],["stars",unlocked("Stardust")],["achievements",true]].filter(x=>x[1]).map(x=>x[0]);let nums = countTo(list.length,true).select(2).sort((a,b)=>a-b);return [list[nums[0]],list[nums[1]]]}},
	{text:"alemaninc Inc.'s exotic matter farms are suspected of employing an undeclared child workforce. alemaninc Inc.'s Chief Agricultural Officer comments that \"these scandals are just absurd at this point - alemaninc Inc. doesn't even have farms!\""},
	{text:"A scandal has erupted at alemaninc Inc. after the alleged creation of genetically modified exotic matter creatures which they use as security. The company's sole security employee questions the validity of these claims: \"there is no evidence which could possibly suggest that such acts have taken place. We've destroyed all the specimens by incineration where you pesky journalists will never find them!\""},
	{text:"Snorting antimatter is slowly turning into a fad challenge amongst the most bored of teenagers. It's said that the high it gives makes them experience as if the world itself is collapsing around you, hence its naming as 'the <span class=\"_antimatter\">Explosive Challenge</span>'."+newsSupport.br(viewportWidth())+"Firefighters across the globe working overtime as people mysteriously spontaneously combust on the streets and in their homes. Trace amounts of antimatter isotopes are being found in their bodies.",get weight(){return unlocked("Antimatter")?1:0}},
	{text:"Exotic matter food products deemed unfit for human consumption due to gravity-cancelling effects."},
	{text:"Click here to... wait, never mind. Please come back later for some actual news."},
	{text:"<span onMouseover=\"secretAchievementList[44].clicks++;if(secretAchievementList[44].clicks<100){currentNewsOffset+=ranint(200,400)*((currentNewsOffset*2>viewportWidth())?-1:1)}\" onClick=\"addSecretAchievement(44)\">Try to click me!</span>",get weight(){return g.secretAchievement[44]?0.1:1}},
	{get text(){return "Scandal involving bizarre, gravity-defying beings found inside alemaninc Inc. supercollider №"+Math.round(10**(10**Math.random()**2-1)).toLocaleString("en-US")+" resolved: the beings were in fact a herd of wild "+Array.random(["aardvarks","bears","camels","deer","echidna","flowers","geese","kangaroos","ostriches","pigs","sheep","wolves"])+" which had entered the supercollider through a hole and ingested the exotic matter inside. The director of the supercollider has been promoted to CEO of alemaninc Inc. following the discovery of these remarkable properties."}},
	{text:"Is our planet getting lighter? Experts examine the effects of mass production of exotic matter.",get weight(){return Math.min(g.totalexoticmatter.layer,1)}},
	{text:"A scandal has erupted at alemaninc Inc. following the supposed sale of exotic matter cookies in which the exotic matter was actually substituted for dark energy. alemaninc Inc. has declined to comment on the matter.",get weight(){return unlocked("Energy")?1:0}},
	{text:"Exotic matter is slowly creeping its way up as a competitor to traditional currency: all alemaninc Inc. offices have been fitted with exotic matter ATMs to allow easy withdrawals and deposits. \"The machines are still in an empty prototype version, an occasional terminal or "+numword(ranint(10,99,true))+" still disintegrates and destroys the building, but I am sure that by the end of the decade we'll have exotic matter ATM's in every bank,\" says alemaninc Inc.'s chief financial officer, who is also developing an exotic matter loan system."},
	{text:"The exotic matter economy is now strong enough to allow for massive vaults doubling as weapons of mass destruction."},
	{get text(){return "alemaninc has been named the world's wealthiest person following the large-scale printing of exotic matter money. \"There's no law against it,\" says the President of Galaxy "+countTo(3).map(()=>String.fromCharCode(ranint(65,90))).join("")+countTo(6).map((x,i)=>String.fromCharCode(ranint(48,57))+((i===3)?"-":"")).join("")}},
	{get text(){return "A millennia-old "+Array.random(["bust","effigy","figure","likeness","statue","statuette"])+" has been retrieved from an abandoned "+Array.random(luckRuneTypes.filter(x=>runeTypeUnlocked(x)))+" temple sparking new research into how extensive the luck pantheon is. As thousands pray to the "+Array.random(["Bearer","Bicorn","Centaur","Dragon","Fairy","Golem","Hornet","Knight","Kobito","Leprechaun","Monster","Nymph","Serpent","Unicorn"])+" of the "+Array.random(["Blazing","Eternal","Flaming","Galactic","Holy","Frozen","Iridescent","Primordial","Pure","Radiant","Shining","Stellar","True"])+" "+Array.random(["Bow","Branch","Crown","Needle","Scepter","Staff","Sword","Torch"])+", representatives of the alemaninc Inc. company insist that they are the only true gods. In unrelated news, the alemaninc Inc. corporate headquarters have fallen victim to at least "+numword(ranint(10,1e3,true))+" acts of arson in the past week."},get weight(){return runeTypeUnlocked("trifolium")?1:0}},
	{text:"🐢<span onClick=\"g.newsTickerSpeed=Math.max(1,Math.min(g.newsTickerSpeed*0.99,20))\">Click here to make the news ticker even more unbearably slow</span>🐢",get weight(){return (g.newsTickerSpeed<=40)?1:0}},
	{text:"⚡<span onClick=\"g.newsTickerSpeed=Math.max(1500,g.newsTickerSpeed+100)\">Click here to make the news ticker even more overwhelmingly fast</span>⚡",get weight(){return (g.newsTickerSpeed>=999)?1:0}},
	{text:"Does exotic antimatter exist?"+newsSupport.br(100)+"No one knows.",get weight(){return unlocked("Antimatter")?1:0}},
	{text:"We have a lucky reader on the line! This lucky reader, who resides in #ticker-suggestions, wants to say to you all: \"yes\". How enlightening! In response, our CEO himself, alemaninc \"\" alemaninc, says: \"This is going in the news ticker out of context now :D\"."},
	{get text(){return "They say the "+ordinal(starCap()+1)+" star unlocks the "+(((study13.rewardLevels.slabdrill===4)||unlocked("Matrix"))?"N":"R")+" axis."},get weight(){return (unlocked("Galaxies")&&(((g.stardustUpgrades[0]===4)&&(study13.rewardLevels.slabdrill===0))||(study13.rewardLevels.slabdrill===4)||unlocked("Matrix")))?1:0}},
	{text:"<span onClick=\"d.innerHTML('newsline','Darn...')\">⚡Try to click me!⚡</span>",get weight(){return (g.newsTickerSpeed>=999)?1:0}},
	{get text(){return "⚡+"+stat.tickspeed.sub(c.d1).mul(c.e2).format()+"% movement speed!⚡"},get weight(){return ((g.newsTickerSpeed>=999)&&stat.tickspeed.gt(c.d1))?1:0}},
	{get text(){return "⚡Progress to speed of light: "+((g.newsTickerSpeed>=1133215491240)?"<i>how the hell are you reading this</i>":(N(g.newsTickerSpeed/11332154912.4).noLeadFormat(2)+"%"))+"⚡"},get weight(){return (g.newsTickerSpeed>=999)?1:0}},
	{get text(){return Array(1000).fill("⚡The news ticker has been instructed to wait at this message for a short time to help even out the service. We apologise for any inconvenience caused.⚡").join(newsSupport.br(g.newsTickerSpeed/1000+500))},get weight(){return (g.newsTickerSpeed>=999)?1:0}},
	{text:"🐢Waddling my way back to the beach.🐢",get weight(){return (g.newsTickerSpeed<=40)?1:0}},
	{text:"<span onClick=\"newsSupport.malganis=true\">🐢I am Mal'ganis, I am a turtle! Click here to kill the news ticker.🐢</span>",get weight(){return (g.newsTickerSpeed<=40)?1:0}},
	{text:"<span onClick=\"addSecretAchievement(49);newsSupport.malganis=false\">💊Click here to cure the news ticker💊</span>",get weight(){return newsSupport.malganis?1:0}},
	{text:"🐢How did the turtle cross the road?🐢",get weight(){return (g.newsTickerSpeed<=40)?1:0}},
	{get text(){return "Day "+BEformat(Math.ceil(((g.timePlayed+((g.dilatedTime>1e9)?0:g.dilatedTime))/86400)))+" of quarantine: created a universe of exotic matter, got raided by federal agents for violating "+numword(ranint(1,9,true)*10+ranint(1,9))+" international peace treaties, taken to the lunatic asylum - everything normal"}},
	{get text(){let incName = Object.keys(newsSupport.ticker325games).random(), randInc = newsSupport.ticker325games[incName], eff = secretAchievementPoints/(randInc[2]??1);return "Your "+BEformat(secretAchievementPoints)+" secret achievement points are increasing "+randInc[0]+" by "+randInc[1](eff)+" while you are playing <i>"+incName+"</i>"},get weight(){return Math.sign(secretAchievementPoints)}},
	{text:"Blob asks why the Study of Studies moves? Well, there are 4 Triad Studies and 4 levels of the Study of Studies: the only explanation is that Hevipelle saw EMD when it was in v1.0 and wanted the Triads to have moving research. We don't want to disappoint the game that inspired this whole project, no?",get weight(){return g.achievement[810]?1:0}},
	{text:"Once upon a time, there was a great and powerful Developer called alemaninc. As the most powerful of the Developers, alemaninc took His seat as Celestial 8. One day, He said: \"ima go listen to some touhou music bye\", and left His seat. So, the great and powerful hyperbolia became Celestial 8. One time, hyperbolia was asked: \"What did you contribute to EMD?\" To which He replied: \"Thanks to the great magic of the power of "+img("blob","blob",16)+", 640 is a number that exists.\"",get weight(){return (g.EMDLevel>=18)?1:0}}
]
// bottom
var currentNewsItem
var currentNewsOffset = 0
function randomNewsItem() {
	let selectable = countTo(newsList.length,true).map(x=>[x,newsList[x].frequency*(newsList[x].weight??1)*(newsSupport.itemsShown-(newsList[x].lastShown??(-newsList.length)))])
	let next = Array.weightedRandom(selectable)
	newsSupport.itemsShown++
	newsList[next].lastShown = newsSupport.itemsShown
	return next
}
function initialNewsOffset() {return (currentNewsOffset<0)?(viewportWidth()+d.element("newsline").offsetWidth):0}
function nextNewsItem(back=false,val=randomNewsItem()) {
	currentNewsItem = val
	d.innerHTML("newsline",newsList[currentNewsItem].text)
	currentNewsOffset = initialNewsOffset()
	d.element("newsline").style.left = "calc(100vw - "+currentNewsOffset+"px)"
}
