const previousPrestige = {
	masteries: function() {return g.activeMasteries.map((x,index) => (x===0)?null:(x+index*10)).filter(x => typeof x === "number")},
	stars: function() {return starList.filter(x=>g.star[x])},
	research: function() {return Object.keys(research).filter(x=>g.research[x])},
	luck: function() {return [
		[c.d0],
		[c.d0,c.d0],
		luckUpgradeList.trifolium.map(x=>g.luckUpgrades[x]),
		luckUpgradeList.quatrefolium.map(x=>g.luckUpgrades[x]),
		luckUpgradeList.cinquefolium.map(x=>g.luckUpgrades[x])
	]},
	generate: function(resLayer,inLayer,base) {
		if ((arguments.length<3)||Object.values(arguments).includes(undefined)) functionError("previousPrestige.generate",arguments)
		let out = {};
		if (resLayer===1) {
			out.time = base?Number.MAX_VALUE:g.timeThisStardustReset;
			out.truetime = base?c.maxvalue:g.truetimeThisStardustReset;
			out.gain = base?c.d0:stat.pendingstardust.floor();
		} else if (resLayer===2) {
			out.time = base?Number.MAX_VALUE:g.timeThisWormholeReset;
			out.truetime = base?c.maxvalue:g.truetimeThisWormholeReset;
			out.gain = base?c.d0:stat.pendinghr.floor();
			out.efficiency = base?c.d0:stat.pendinghr.floor().div(g.timeThisWormholeReset);
			out.study = base?0:g.activeStudy
		} else {
			functionError("previousPrestige.generate",arguments)
		}
		if (inLayer>=1) {
			out.masteries = base?[]:this.masteries()
			if (inLayer>=2) {
				out.stars = base?[]:this.stars()
				if (inLayer>=3) {
					out.research = base?[]:this.research()
					out.luck = base?[[c.d0],[c.d0,c.d0],[c.d0,c.d0,c.d0],[c.d0,c.d0,c.d0,c.d0],[c.d0,c.d0,c.d0,c.d0,c.d0]]:this.luck()
				}
			}
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
			label:"Most rewarding run this Matrix",
			layer:3,
			location:function(){return g.previousStardustRuns.spacetime.highest},
			visibility:function(){return unlocked("Matrix")}
		},
		{
			label:"Fastest run this Matrix",
			layer:3,
			location:function(){return g.previousStardustRuns.spacetime.fastest},
			visibility:function(){return unlocked("Matrix")}
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
			label:"Most rewarding run this Matrix",
			layer:3,
			location:function(){return g.previousWormholeRuns.spacetime.highest},
			visibility:function(){return unlocked("Matrix")}
		},
		{
			label:"Fastest run this Matrix",
			layer:3,
			location:function(){return g.previousWormholeRuns.spacetime.fastest},
			visibility:function(){return unlocked("Matrix")}
		},
		{
			label:"Most efficient run this Matrix",
			layer:3,
			location:function(){return g.previousWormholeRuns.spacetime.efficientest},
			visibility:function(){return unlocked("Matrix")}
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
		if (layer==="stardust") {
			if (type==="last") {
				location = g.previousStardustRuns.last10[index-1]
			} else if (type==="record") {
				location = previousPrestige.stardustRunsStored[index].location()
			} else {
				functionError("previousPrestige.showBuild",arguments)
			}
		} else if (layer==="wormhole") {
			if (type==="last") {
				location = g.previousWormholeRuns.last10[index-1]
			} else if (type==="record") {
				location = previousPrestige.wormholeRunsStored[index].location()
			} else {
				functionError("previousPrestige.showBuild",arguments)
			}
		} else {
			functionError("previousPrestige.showBuild",arguments)
		}
		let out = []
		if (location.masteries!==undefined) {out.push(["Masteries",location.masteries.filter(x=>x%10>0).join(",")])}
		if (location.stars!==undefined) {out.push(["Stars",location.stars.join(",")])}
		if ((location.research!==undefined)&&unlocked("Hawking Radiation")) {out.push(["Research",location.research.join(",")])}
		if ((location.luck!==undefined)&&unlocked("Luck")) {out.push(["Luck",location.luck.filter(x=>x.map(i=>N(i).sign).includes(1)).map((x,i)=>(i+1)+":"+x.join(",")).join("\n")])}
		popup({
			text:out.filter(x=>x[1]!=="").map(x => "<p>"+x[0]+"<br><textarea style=\"width:90%;height:40px\">"+x[1]+"</textarea></p>").join(""),
			buttons:[["Close",""]]
		})
	}
}