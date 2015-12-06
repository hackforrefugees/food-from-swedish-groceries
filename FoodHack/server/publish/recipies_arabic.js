Meteor.publish("recipies_arabic", function() {
	return RecipiesArabic.publishJoinedCursors(RecipiesArabic.find({}, {}));
});

Meteor.publish("get_recipe_arabic", function() {
	return RecipiesArabic.publishJoinedCursors(RecipiesArabic.find({}, {}));
});

Meteor.publish("recipies_empty_arabic", function() {
	return RecipiesArabic.publishJoinedCursors(RecipiesArabic.find({_id:null}, {}));
});

Meteor.publish("recipe_arabic", function(recipeId) {
	return RecipiesArabic.publishJoinedCursors(RecipiesArabic.find({_id:recipeId}, {}));
});

