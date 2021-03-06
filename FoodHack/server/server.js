Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	

                            Languages.remove({});
			    Languages.insert({ name: 'Danska'});
                            Languages.insert({ name: 'Arabiska'}); 
                            Languages.insert({ name: 'Franska'});
			    Countries.remove({});
                            Countries.insert({ name: 'Sverige'});
                            Countries.insert({ name: 'Tunisien'});
});

Meteor.methods({
	"sendMail": function(options) {
		this.unblock();

		Email.send(options);
	}
});