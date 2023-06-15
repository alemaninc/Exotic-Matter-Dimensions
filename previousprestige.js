const previousPrestige = {
	masteries: function() {
		return g.activeMasteries.map((x,index) => (x==null)?null:(x+index*10)).filter(x => typeof x == "number")
	},
	stars: function() {
		return starList.filter(x=>g.star[x])
	},
	research: function() {
		return Object.keys(research).filter(x=>g.research[x])
	},
	baseStardust: function() {
		return {masteries:[],stars:[],research:[],time:Number.MAX_VALUE,truetime:c.maxvalue,gain:N(0)}
	},
	baseWormhole: function() {
		return {masteries:[],stars:[],research:[],time:Number.MAX_VALUE,truetime:c.maxvalue,gain:N(0),efficiency:N(0),study:0}
	},
	generate: function(layer) {
		let out = {masteries:this.masteries(),stars:this.stars(),research:this.research()};
		switch (layer) {
			case 1:
				out.time = g.timeThisStardustReset;
				out.truetime = g.truetimeThisStardustReset;
				out.gain = stat.pendingstardust.floor();
				break;
			case 2:
				out.time = g.timeThisWormholeReset;
				out.truetime = g.truetimeThisWormholeReset;
				out.gain = stat.pendinghr.floor();
				out.efficiency = stat.pendinghr.floor().div(g.timeThisWormholeReset);
				out.study = g.activeStudy
				break;
			default:
				error("Cannot access previousPrestige.generate("+layer+")")
		}
		return out;
	},
	stardustRunsStored:[
		{
			label:"Most rewarding run ever",
			layer:4,
			location:function(){return g.previousStardustRuns.eternity.highest},
			visibility:function(){return unlocked("Stardust")}
		},
		{
			label:"Fastest run ever",
			layer:4,
			location:function(){return g.previousStardustRuns.eternity.fastest},
			visibility:function(){return unlocked("Stardust")}
		},
		{
			label:"Most rewarding run this Spacetime",
			layer:3,
			location:function(){return g.previousStardustRuns.spacetime.highest},
			visibility:function(){return unlocked("Spacetime")}
		},
		{
			label:"Fastest run this Spacetime",
			layer:3,
			location:function(){return g.previousStardustRuns.spacetime.fastest},
			visibility:function(){return unlocked("Spacetime")}
		},
		{
			label:"Most rewarding run this Wormhole",
			layer:2,
			location:function(){return g.previousStardustRuns.wormhole.highest},
			visibility:function(){return unlocked("Hawking Radiation")}
		},
		{
			label:"Fastest run this Wormhole",
			layer:2,
			location:function(){return g.previousStardustRuns.wormhole.fastest},
			visibility:function(){return unlocked("Hawking Radiation")}
		}
	],
	wormholeRunsStored:[
		{
			label:"Most rewarding run ever",
			layer:4,
			location:function(){return g.previousWormholeRuns.eternity.highest},
			visibility:function(){return unlocked("Hawking Radiation")}
		},
		{
			label:"Fastest run ever",
			layer:4,
			location:function(){return g.previousWormholeRuns.eternity.fastest},
			visibility:function(){return unlocked("Hawking Radiation")}
		},
		{
			label:"Most efficient run ever",
			layer:4,
			location:function(){return g.previousWormholeRuns.eternity.efficientest},
			visibility:function(){return unlocked("Hawking Radiation")}
		},
		{
			label:"Most rewarding run this Spacetime",
			layer:3,
			location:function(){return g.previousWormholeRuns.spacetime.highest},
			visibility:function(){return unlocked("Spacetime")}
		},
		{
			label:"Fastest run this Spacetime",
			layer:3,
			location:function(){return g.previousWormholeRuns.spacetime.fastest},
			visibility:function(){return unlocked("Spacetime")}
		},
		{
			label:"Most efficient run this Spacetime",
			layer:3,
			location:function(){return g.previousWormholeRuns.spacetime.efficientest},
			visibility:function(){return unlocked("Spacetime")}
		}
	],
	buildListNodes: document.getElementsByClassName("previousPrestigeBuildList"),
	shownBuilds:function(){
		let out = ["Star","Mastery"]
		if (unlocked("Hawking Radiation")) out.push("Research")
		return out
	},
	showTab:function(id){
		for (let i of d.class("previousPrestigeTab")) i.style.display = "none";
		d.display(id,"inline-block");
		for (let i of d.class("previousPrestigeTabButton")) i.style.filter = "brightness(60%)"
		event.currentTarget.style.filter = "brightness(100%)"
	},
	showBuild:function(layer,type,index){
		let location
		if (layer=="stardust") {
			if (type=="last") {
				location = g.previousStardustRuns.last10[index]
			} else if (type=="record") {
				location = previousPrestige.stardustRunsStored[index].location()
			} else {
				error("Cannot access previousPrestige.showBuild("+layer+","+type+","+index+")")
			}
		} else if (layer=="wormhole") {
			if (type=="last") {
				location = g.previousWormholeRuns.last10[index]
			} else if (type=="record") {
				location = previousPrestige.wormholeRunsStored[index].location()
			} else {
				error("Cannot access previousPrestige.showBuild("+layer+","+type+","+index+")")
			}
		} else {
			error("Cannot access previousPrestige.showBuild("+layer+","+type+","+index+")")
		}
		popup({
			text:[
				["Stars",location.stars.join(","),true],
				["Masteries",location.masteries.join(","),true],
				["Research",location.research.join(","),unlocked("Hawking Radiation")]
			].filter(x => x[2]).map(x => "<p>"+x[0]+"<br><textarea style=\"width:90%;height:40px\">"+x[1]+"</textarea></p>").join(""),
			buttons:[["Close",""]]
		})
	}
}