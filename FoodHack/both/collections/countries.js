this.Countries = new Mongo.Collection("countries");

this.Countries.userCanInsert = function(userId, doc) {
	return true;
}

this.Countries.userCanUpdate = function(userId, doc) {
	return true;
}

this.Countries.userCanRemove = function(userId, doc) {
	return true;
}
