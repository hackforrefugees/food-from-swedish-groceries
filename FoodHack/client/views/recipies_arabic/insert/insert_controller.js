this.RecipiesArabicInsertController = RouteController.extend({
	template: "RecipiesArabicInsert",
	

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
			Meteor.subscribe("get_recipe_arabic")
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
			get_recipe_arabic: RecipiesArabic.findOne({}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});