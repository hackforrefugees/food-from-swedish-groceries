this.Recipies = new Mongo.Collection("recipies");

this.Recipies.userCanInsert = function(userId, doc) {
	return true;
}

this.Recipies.userCanUpdate = function(userId, doc) {
	return true;
}

this.Recipies.userCanRemove = function(userId, doc) {
	return true;
}
