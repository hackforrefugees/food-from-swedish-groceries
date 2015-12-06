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
	"recipies.details",
	"recipies.edit",
	"recipies.insert",
	"recipies_arabic",
	"recipies_arabic.insert",
	"recipies_arabic.details",
	"recipies_arabic.edit",
	"recipies_arabic.insert"
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
	this.route("recipies.details", {path: "/recipies/details/:recipeId", controller: "RecipiesDetailsController"});
	this.route("recipies.edit", {path: "/recipies/edit/:recipeId", controller: "RecipiesEditController"});
	this.route("recipies.insert", {path: "/recipies/insert", controller: "RecipiesInsertController"});
	this.route("recipies_arabic", {path: "/recipies_arabic", controller: "RecipiesArabicController"});
	this.route("recipies_arabic.insert", {path: "/recipies_arabic/insert", controller: "RecipiesArabicInsertController"});
	this.route("recipies_arabic.details", {path: "/recipies_arabic/details/:recipeId", controller: "RecipiesArabicDetailsController"});
	this.route("recipies_arabic.edit", {path: "/recipies_arabic/edit/:recipeId", controller: "RecipiesArabicEditController"});
	this.route("recipies_arabic.insert", {path: "/recipies_arabic/insert", controller: "RecipiesArabicInsertController"});
});
