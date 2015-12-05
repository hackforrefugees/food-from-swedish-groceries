this.Files = new FS.Collection("files", {
	stores: [new FS.Store.GridFS("files")]
});

this.Files.userCanInsert = function(userId, doc) {
	return true;
};

this.Files.userCanUpdate = function(userId, doc) {
	return true;
};

this.Files.userCanRemove = function(userId, doc) {
	return true;
};

this.Files.userCanDownload = function(userId, doc) {
	return true;
};
