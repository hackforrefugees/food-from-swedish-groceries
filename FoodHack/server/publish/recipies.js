Meteor.publish("recipies", function() {
	return Recipies.publishJoinedCursors(Recipies.find({}, {}));
});

Meteor.publish("recipies_empty", function() {
	return Recipies.publishJoinedCursors(Recipies.find({_id:"null"}, {}));
});

Meteor.publish("recipe", function(recipeId) {
	return Recipies.publishJoinedCursors(Recipies.find({_id:recipeId}, {}));
});

Meteor.publish("recipies_find_one", function() {
	return Recipies.publishJoinedCursors(Recipies.find({}, {}));
});

