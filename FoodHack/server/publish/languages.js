Meteor.publish("language_list", function() {
	return Languages.find({}, {sort:["name"]});
});

