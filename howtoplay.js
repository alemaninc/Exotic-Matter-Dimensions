function howToPlay(x) {
	let htp = HTPtexts[HTPtexts.map(x => x.name).indexOf(x)]
	let text = "<h1>"+htp.name+"</h1>"+htp.paragraphs.map(x => "<p>"+x+"</p>").join("")
	if (htp.dynamics !== undefined) for (let i=0;i<htp.dynamics.length;i++) text = text.replace("{"+i+"}",htp.dynamics[i]())
	popup({
		text:text,
		buttons:[["Close",""]]
	})
}
function htpNavigation() {
	popup({
		text:"What do you want to learn how to play?",
		buttons:HTPtexts.filter(x => x.visibility()).map(x => [x.name,"howToPlay('"+x.name+"')"])
	})
}
const HTPtexts = [
	{
		name:"Exotic Matter",
		visibility:function(){return true},
		paragraphs:[
			"Exotic matter is the core currency of the game. You passively generate exotic matter at a rate of 1 per second.",
			"Exotic matter can be used to buy Axis, which improve {0} in different ways.</p>"
		],
		dynamics:[
			()=>(g.stardustUpgrades[1]>1||unlocked("Hawking Radiation"))?"various game mechanics":"exotic matter generation"
		]
	},
	{
		name:"Masteries",
		visibility:function(){return unlocked("Masteries")},
		paragraphs:[
			"Masteries are a special type of upgrade. They are free to use, but you can{0}only activate one Mastery from each row at any time.",
			"The bonus provided by Masteries increases based on mastery power, the production of which increases over time based on how much exotic matter you have."
		],
		dynamics:[
			()=>unlocked("Stardust")?" initially ":" "
		]
	},
	{
		name:"Offline Time",
		visibility:function(){return true},
		paragraphs:[
			"While not playing, you gain dilated time at a rate of 1 second of dilated time per second spent offline.",
			"Dilated time can be used to Overclock the game. Overclock uses dilated time to accelerate production.{0}",
			"Below a multiplier of {1}×, Overclock is equally efficient to playing online. However, above this threshold, the Overclock cost increases much quicker than the multiplier given, causing some dilated time to be wasted.",
			"{2}"
		],
		dynamics:[
			()=>(g.stars>21||unlocked("Hawking Radiation"))?" Unlike tickspeed, the Overclock multiplier affects things like the 'real' time played.":"",
			()=>dilationUpgrades[1].effect().toFixed(0),
			()=>g.dilationUpgradesUnlocked==0?"":"Later in the game, dilated time can also be spent on Dilation Upgrades, which improve Overclock in different ways."
		]
	},
	{
		name:"Achievements",
		visibility:function(){return totalAchievements>0},
		paragraphs:[
			"Achievements are awarded for reaching specific goals within the game.",
			"Achievements are grouped into 'tiers' - each tier gives a bonus to a part of the game based on achievements within that tier owned. Many achievements also have their own unique rewards.",
			"Some achievements can be obtained through natural gameplay, but others can only be earned under specific conditions - it's a good idea to check the Achievements tab often to see which achievements you can get easily."
		]
	},
	{
		name:"Stardust",
		visibility:function(){return unlocked("Stardust")||g.exoticmatter.gt(c.e25)},
		paragraphs:[
			"Upon reaching {0} exotic matter, you unlock the ability to gain Stardust.",
			"Gaining stardust resets your exotic matter and Axis - however, you can use this stardust to unlock entirely new features of the game. In addition, your unspent stardust provides a variety of bonuses that make progression even faster than before.",
			"The amount of stardust that you gain on reset is proportional to unspent exotic matter at the time of reset."
		],
		dynamics:[
			()=>stat.stardustExoticMatterReq.format()
		]
	},
	{
		name:"Stardust Boosts",
		visibility:function(){return unlocked("Stardust")},
		paragraphs:[
			"Stardust Boosts are bonuses which increase based on the amount of unspent Stardust you have.",
			"You start with just two unlocked initially, but you can unlock more through Stardust Upgrades, up to a maximum of {0}."
		],
		dynamics:[
			()=>numword(stat.stardustUpgrade3Cap+2)
		]
	},
	{
		name:"Stardust Upgrades",
		visibility:function(){return unlocked("Stardust")},
		paragraphs:[
			"Stardust Upgrades are one-time upgrades which can be purchased using stardust.",
			"Each of the five Stardust Upgrades has a number of levels, each level providing a different effect.",
			"The stardust spent on a Stardust Upgrade is lost permanently, but the exotic matter requirement decreases accordingly."
		]
	},
	{
		name:"Stars",
		visibility:function(){return unlocked("Stardust")},
		paragraphs:[
			"Stars can be bought for increasing amounts of stardust.",
			"You can assign stars to star upgrades, which are grouped into rows like Masteries. Each row of star upgrades contains four upgrades.",
			"Unlike Masteries, there is no limit to how many star upgrades you can have per row. However, each star can only be allocated to a specific row - for example, the 1st and 2nd stars can only be allocated to row 1, and the 3rd star can only be allocated to row 2.",
			"{0}"
		],
		dynamics:[
			()=>(unlocked("Light")||g.stars==60)?"It is impossible to have more than 60 stars.":""
		]
	},
	{
		name:"Dark Matter",
		visibility:function(){return unlocked("Dark Matter")},
		paragraphs:[
			"Dark matter is passively generated over time based on your stardust.",
			"Like exotic matter, it can be used to buy axis - however, you cannot use dark matter to buy normal axis. Instead, dark matter must be used to buy dark axis, which have different effects to normal axis.",
			"In addition to their primary effect, each dark axis also increases the level of the corresponding normal axis by a fixed amount."
		]
	},
	{
		name:"Automation",
		visibility:function(){return g.stardustUpgrades[1]>0},
		paragraphs:[
			"Automation allows you to automate certain parts of the game, such as buying normal axis.",
			"Most automators have intervals, and activate once every time the interval elapses. The interval can be reduced for increasing amounts of a resource, usually a resource relevant to what is being automated. There are certain late-game automators which have no interval and always activate.",
			"Your automation is never reset."
		]
	},
	{
		name:"Dark Stars",
		visibility:function(){return unlocked("Dark Matter")},
		paragraphs:[
			"Upon reaching a certain amount of total dark axis, you can gain a dark star.",
			"This does a Stardust reset, and in addition it resets your dark matter and dark axis. However, each dark star gives three bonuses, namely:",
			"[1] a power effect on the base gain of dark matter",
			"[2] a boost to the effect of a specific dark axis (the 1st dark star boosts dark X axis, the 2nd boosts Y, the 3rd boosts Z ... the 8th boosts S, then the 9th boosts X again and so on)",
			"[3] an increase to the normal axis boost given by dark axis."
		]
	},
	{
		name:"Energy",
		visibility:function(){return unlocked("Energy")},
		paragraphs:[
			"Energies are a group of resources unlocked by the fifth Stardust Upgrade.",
			"Energy increases exponentially - i.e. it is multiplied by a certain number every second rather than being added to.",
			"When the amount of a particular Energy exceeds a specific resource, the production of that resource is raised to a power.",
			"{0}"
		],
		dynamics:[
			()=>g.studyCompletions[3]>0?"Most energies reset on Stardust reset, but a few persist until Wormhole":"Energies reset to 1 on Stardust reset."
		]
	},
	{
		name:"Wormhole",
		visibility:function(){return unlocked("Hawking Radiation")||stat.totalDarkAxis.gt(c.e3)},
		paragraphs:[
			"Wormhole is the second reset option unlocked in the game. Wormhole resets everything that Stardust resets, as well as everything in the Stardust tab. In exchange, you get hawking radiation.",
			"Unlike stardust, hawking radiation has no innate effect. However, it can be used to gain observations in the 'Research' tab. In addition, some Wormhole Milestones have effects which increase based on how much hawking radiation you have."
		]
	},
	{
		name:"Wormhole Milestones",
		visibility:function(){return unlocked("Hawking Radiation")},
		paragraphs:[
			"Completing Tier 5 achievements unlocks Wormhole Milestones.",
			"Wormhole Milestones make the game less tedious, for r by unlocking new automators and allowing some things to persist on Stardust and Wormhole reset. A few milestones also provide production boosts."
		]
	},
	{
		name:"Research",
		visibility:function(){return unlocked("Hawking Radiation")},
		paragraphs:[
			"After destroying the universe (Wormhole resetting) for the first time, you begin to generate knowledge.",
			"Knowledge provides a boost to all Masteries (up to {0}%), but more importantly it enables you to gain Discoveries.",
			"Discoveries can be spent on Research, powerful upgrades which are arranged in a tree.",
			"Initially you only have access to row 1 Research. In order to buy research from later rows, you must have at least 1 research which is connected to it.",
			"Research can be respecced on Wormhole. This removes all your Research, but returns the Discoveries spent on them.",
			"{1}"
		],
		dynamics:[
			()=>stat.knowledgeEffectCap.noLeadFormat(1),
			()=>g.research.r8_8?"Some Researches are permanent, and are unaffected by respec. These are distinguished with a white border around them.":""
		]
	},
	{
		name:"Studies",
		visibility:function(){return unlocked("Studies")},
		paragraphs:[
			"Studies are unlocked by buying special red-bordered Researches.",
			"When a Study is started, a Wormhole reset takes place and special restrictions are applied.",
			"If you can reach a certain number of total dark axis in a Study, you can complete it. This removes the Study's restrictions, as well as giving 3 bonuses.",
			"Each Study can be completed up to 4 times - each completion has harsher restrictions and a higher goal.",
			"Most Studies also unlock new research when completed."
		]
	},
	{
		name:"Light",
		visibility:function(){return unlocked("Light")},
		paragraphs:[
			"In Light, you can generate different colors of chroma. The amount of chroma gained is based on how many stars you have: if you have 60 stars (the maximum), a base of 1 chroma per second is gained. However, if you have less than 60 stars, chroma gain is divided by 3 for every star below 60.",
			"If you gain sufficient chroma of a type, you gain a lumen, giving one of a variety of boosts. The requirement to gain lumens grows exponentially, but the factor by which it increases varies between colors.",
			"Red, green and blue chroma can be generated for free. However, other colors of chroma must instead be created from other colors, using their chroma in the process."
		]
	}
].sort((a,b)=>(a.name>b.name)?1:-1)