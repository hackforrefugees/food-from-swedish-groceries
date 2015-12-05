Gallery.allow({
	insert: function (userId, doc) {
		return Gallery.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Gallery.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Gallery.userCanRemove(userId, doc);
	}
});

Gallery.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Gallery.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Gallery.before.remove(function(userId, doc) {
	
});

Gallery.after.insert(function(userId, doc) {
	
});

Gallery.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Gallery.after.remove(function(userId, doc) {
	
});
