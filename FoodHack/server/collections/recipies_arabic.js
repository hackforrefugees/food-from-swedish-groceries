RecipiesArabic.allow({
	insert: function (userId, doc) {
		return RecipiesArabic.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return RecipiesArabic.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return RecipiesArabic.userCanRemove(userId, doc);
	}
});

RecipiesArabic.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

RecipiesArabic.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

RecipiesArabic.before.remove(function(userId, doc) {
	
});

RecipiesArabic.after.insert(function(userId, doc) {
	
});

RecipiesArabic.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

RecipiesArabic.after.remove(function(userId, doc) {
	
});
