Meteor.publish("recipies_arabic", function() {
	return RecipiesArabic.publishJoinedCursors(RecipiesArabic.find({}, {}));
});

Meteor.publish("get_recipe_arabic", function() {
	return RecipiesArabic.publishJoinedCursors(RecipiesArabic.find({}, {}));
});

Meteor.publish("move_recipe_arabic", function() {
	return RecipiesArabic.publishJoinedCursors(RecipiesArabic.find({}, {}));
});

Meteor.publish("move_recipe_arabic", function (recipeId) {                     // 9
	return RecipiesArabic.publishJoinedCursors(Recipies.find({ _id: recipeId }, {}));
});
