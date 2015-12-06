Meteor.publish("recipies", function() {
	return Recipies.publishJoinedCursors(Recipies.find({}, {}));
});

Meteor.publish("get_recipe", function() {
	return Recipies.publishJoinedCursors(Recipies.find({}, {}));
});

Meteor.publish("recipe", function(recipeId) {
	return Recipies.publishJoinedCursors(Recipies.find({_id:recipeId}, {}));
});

