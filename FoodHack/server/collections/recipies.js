Recipies.allow({
	insert: function (userId, doc) {
		return Recipies.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Recipies.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Recipies.userCanRemove(userId, doc);
	}
});

Recipies.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Recipies.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Recipies.before.remove(function(userId, doc) {
	
});

Recipies.after.insert(function(userId, doc) {
	
});

Recipies.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Recipies.after.remove(function(userId, doc) {
	
});
