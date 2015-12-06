Languages.allow({
	insert: function (userId, doc) {
		return Languages.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Languages.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Languages.userCanRemove(userId, doc);
	}
});

Languages.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Languages.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Languages.before.remove(function(userId, doc) {
	
});

Languages.after.insert(function(userId, doc) {
	
});

Languages.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Languages.after.remove(function(userId, doc) {
	
});
