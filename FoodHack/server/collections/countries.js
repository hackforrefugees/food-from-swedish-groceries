Countries.allow({
	insert: function (userId, doc) {
		return Countries.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Countries.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Countries.userCanRemove(userId, doc);
	}
});

Countries.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Countries.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Countries.before.remove(function(userId, doc) {
	
});

Countries.after.insert(function(userId, doc) {
	
});

Countries.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Countries.after.remove(function(userId, doc) {
	
});
