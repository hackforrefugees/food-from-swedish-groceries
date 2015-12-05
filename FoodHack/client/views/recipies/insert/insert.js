var pageSession = new ReactiveDict();

Template.RecipiesInsert.rendered = function() {
	
};

Template.RecipiesInsert.events({
	
});

Template.RecipiesInsert.helpers({
	
});

Template.RecipiesInsertInsertForm.rendered = function() {
	

	pageSession.set("recipiesInsertInsertFormInfoMessage", "");
	pageSession.set("recipiesInsertInsertFormErrorMessage", "");

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

Template.RecipiesInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("recipiesInsertInsertFormInfoMessage", "");
		pageSession.set("recipiesInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var recipiesInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(recipiesInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("recipiesInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("recipies", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("recipiesInsertInsertFormErrorMessage", message);
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

Template.RecipiesInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("recipiesInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("recipiesInsertInsertFormErrorMessage");
	}
	
});
