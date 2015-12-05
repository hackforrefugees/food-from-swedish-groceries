var pageSession = new ReactiveDict();

Template.RecipiesInsert.rendered = function() {
	
};

Template.RecipiesInsert.events({
	
});

Template.RecipiesInsert.helpers({
	
});

Template.RecipiesInsertAddFile.rendered = function() {
	

	pageSession.set("recipiesInsertAddFileInfoMessage", "");
	pageSession.set("recipiesInsertAddFileErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.RecipiesInsertAddFile.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("recipiesInsertAddFileInfoMessage", "");
		pageSession.set("recipiesInsertAddFileErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var recipiesInsertAddFileMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(recipiesInsertAddFileMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("recipiesInsertAddFileInfoMessage", message);
					}; break;
				}
			}

			Router.go("recipies", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("recipiesInsertAddFileErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Recipies.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("recipies", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.RecipiesInsertAddFile.helpers({
	"infoMessage": function() {
		return pageSession.get("recipiesInsertAddFileInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("recipiesInsertAddFileErrorMessage");
	}
	
});
