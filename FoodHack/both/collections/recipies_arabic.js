this.RecipiesArabic = new Mongo.Collection("recipies_arabic");

this.RecipiesArabic.userCanInsert = function(userId, doc) {
	return true;
}

this.RecipiesArabic.userCanUpdate = function(userId, doc) {
	return true;
}

this.RecipiesArabic.userCanRemove = function(userId, doc) {
	return true;
}
