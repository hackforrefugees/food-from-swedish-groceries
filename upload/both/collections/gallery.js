this.Gallery = new Mongo.Collection("gallery");

this.Gallery.userCanInsert = function(userId, doc) {
	return true;
}

this.Gallery.userCanUpdate = function(userId, doc) {
	return true;
}

this.Gallery.userCanRemove = function(userId, doc) {
	return true;
}
