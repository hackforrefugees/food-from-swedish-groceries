this.RecipiesArabicController = RouteController.extend({
	template: "RecipiesArabic",
	

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
			Meteor.subscribe("recipies_arabic")
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
			recipies_arabic: RecipiesArabic.find({}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});