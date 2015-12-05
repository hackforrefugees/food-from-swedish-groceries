this.RecipiesInsertController = RouteController.extend({
	template: "RecipiesInsert",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("country_list"),
			Meteor.subscribe("language_list"),
			Meteor.subscribe("recipies_empty")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			country_list: Countries.find({}, {sort:["name"]}),
			language_list: Languages.find({}, {sort:["name"]}),
			recipies_empty: Recipies.findOne({_id:null}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});