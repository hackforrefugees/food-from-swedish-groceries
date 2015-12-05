Meteor.publish("recipies", function() {
	return Recipies.find({}, {});
});

Meteor.publish("recipies_empty", function() {
	return Recipies.find({_id:"null"}, {});
});

Meteor.publish("recipe", function(recipeId) {
	return Recipies.find({_id:recipeId}, {});
});

