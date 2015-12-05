Meteor.publish("gallery", function() {
	return Gallery.publishJoinedCursors(Gallery.find({}, {}));
});

Meteor.publish("gallery_empty", function() {
	return Gallery.publishJoinedCursors(Gallery.find({_id:null}, {}));
});

