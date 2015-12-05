var pageSession = new ReactiveDict();

Template.Recipies.rendered = function() {
	
};

Template.Recipies.events({
	
});

Template.Recipies.helpers({
	
});

var RecipiesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("RecipiesViewSearchString");
	var sortBy = pageSession.get("RecipiesViewSortBy");
	var sortAscending = pageSession.get("RecipiesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "country", "language", "ingredients", "note", "Steps"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var RecipiesViewExport = function(cursor, fileType) {
	var data = RecipiesViewItems(cursor);
	var exportFields = ["name", "country", "ingredients", "note", "Steps"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.RecipiesView.rendered = function() {
	pageSession.set("RecipiesViewStyle", "table");
	
};

Template.RecipiesView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("RecipiesViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("RecipiesViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("RecipiesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("recipies.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		RecipiesViewExport(this.recipies, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		RecipiesViewExport(this.recipies, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		RecipiesViewExport(this.recipies, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		RecipiesViewExport(this.recipies, "json");
	}

	
});

Template.RecipiesView.helpers({

	

	"isEmpty": function() {
		return !this.recipies || this.recipies.count() == 0;
	},
	"isNotEmpty": function() {
		return this.recipies && this.recipies.count() > 0;
	},
	"isNotFound": function() {
		return this.recipies && pageSession.get("RecipiesViewSearchString") && RecipiesViewItems(this.recipies).length == 0;
	},
	"searchString": function() {
		return pageSession.get("RecipiesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("RecipiesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("RecipiesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("RecipiesViewStyle") == "gallery";
	}

	
});


Template.RecipiesViewTable.rendered = function() {
	
};

Template.RecipiesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("RecipiesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("RecipiesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("RecipiesViewSortAscending") || false;
			pageSession.set("RecipiesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("RecipiesViewSortAscending", true);
		}
	}
});

Template.RecipiesViewTable.helpers({
	"tableItems": function() {
		return RecipiesViewItems(this.recipies);
	}
});


Template.RecipiesViewTableItems.rendered = function() {
	
};

Template.RecipiesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("recipies.details", {recipeId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Recipies.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Recipies.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("recipies.edit", {recipeId: this._id});
		return false;
	}
});

Template.RecipiesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	

	
});
