var pageSession = new ReactiveDict();

Template.RecipiesArabic.rendered = function() {
	
};

Template.RecipiesArabic.events({
	
});

Template.RecipiesArabic.helpers({
	
});

var RecipiesArabicViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("RecipiesArabicViewSearchString");
	var sortBy = pageSession.get("RecipiesArabicViewSortBy");
	var sortAscending = pageSession.get("RecipiesArabicViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "country", "language", "ingredients", "note", "Steps", "fileId"];
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

var RecipiesArabicViewExport = function(cursor, fileType) {
	var data = RecipiesArabicViewItems(cursor);
	var exportFields = ["name", "country", "ingredients", "note", "Steps", "fileId"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.RecipiesArabicView.rendered = function() {
	pageSession.set("RecipiesArabicViewStyle", "table");
	
};

Template.RecipiesArabicView.events({
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
				pageSession.set("RecipiesArabicViewSearchString", searchString);
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
					pageSession.set("RecipiesArabicViewSearchString", searchString);
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
					pageSession.set("RecipiesArabicViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("recipies_arabic.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		RecipiesArabicViewExport(this.recipies_arabic, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		RecipiesArabicViewExport(this.recipies_arabic, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		RecipiesArabicViewExport(this.recipies_arabic, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		RecipiesArabicViewExport(this.recipies_arabic, "json");
	}

	
});

Template.RecipiesArabicView.helpers({

	

	"isEmpty": function() {
		return !this.recipies_arabic || this.recipies_arabic.count() == 0;
	},
	"isNotEmpty": function() {
		return this.recipies_arabic && this.recipies_arabic.count() > 0;
	},
	"isNotFound": function() {
		return this.recipies_arabic && pageSession.get("RecipiesArabicViewSearchString") && RecipiesArabicViewItems(this.recipies_arabic).length == 0;
	},
	"searchString": function() {
		return pageSession.get("RecipiesArabicViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("RecipiesArabicViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("RecipiesArabicViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("RecipiesArabicViewStyle") == "gallery";
	}

	
});


Template.RecipiesArabicViewTable.rendered = function() {
	
};

Template.RecipiesArabicViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("RecipiesArabicViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("RecipiesArabicViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("RecipiesArabicViewSortAscending") || false;
			pageSession.set("RecipiesArabicViewSortAscending", !sortAscending);
		} else {
			pageSession.set("RecipiesArabicViewSortAscending", true);
		}
	}
});

Template.RecipiesArabicViewTable.helpers({
	"tableItems": function() {
		return RecipiesArabicViewItems(this.recipies_arabic);
	}
});


Template.RecipiesArabicViewTableItems.rendered = function() {
	
};

Template.RecipiesArabicViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("recipies_arabic.details", {recipeId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		RecipiesArabic.update({ _id: this._id }, { $set: values });

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
						RecipiesArabic.remove({ _id: me._id });
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
		Router.go("recipies_arabic.edit", {recipeId: this._id});
		return false;
	}
});

Template.RecipiesArabicViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	

	
});
