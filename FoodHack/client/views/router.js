Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading",
	title: "Cooking with Swedish groceries",
	route: "home"
});

var freeRoutes = [
	"home",
	"recipies",
	"recipies.insert",
	"recipies.details",
	"recipies.edit",
	"recipies.insert"
];

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.map(function () {

	this.route("home", {path: "/", controller: "HomeController"});
	this.route("recipies", {path: "/recipies", controller: "RecipiesController"});
	this.route("recipies.insert", {path: "/recipies/insert", controller: "RecipiesInsertController"});
	this.route("recipies.details", {path: "/recipies/details/:recipeId", controller: "RecipiesDetailsController"});
	this.route("recipies.edit", {path: "/recipies/edit/:recipeId", controller: "RecipiesEditController"});
	this.route("recipies.insert", {path: "/recipies/insert", controller: "RecipiesInsertController"});
});
