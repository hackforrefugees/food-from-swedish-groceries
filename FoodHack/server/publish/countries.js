Meteor.publish("country_list", function() {
	return Countries.find({}, {sort:["name"]});
});

