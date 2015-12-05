this.Languages = new Mongo.Collection("languages");

this.Languages.userCanInsert = function(userId, doc) {
	return true;
}

this.Languages.userCanUpdate = function(userId, doc) {
	return true;
}

this.Languages.userCanRemove = function(userId, doc) {
	return true;
}
