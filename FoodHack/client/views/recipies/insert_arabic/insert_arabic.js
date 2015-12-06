var pageSession = new ReactiveDict();

Template.RecipiesInsertArabic.rendered = function() {
	
};

Template.RecipiesInsertArabic.events({
	
});

Template.RecipiesInsertArabic.helpers({
	
});

Template.RecipiesInsertArabicInsertForm.rendered = function() {
	

	pageSession.set("recipiesInsertArabicInsertFormInfoMessage", "");
	pageSession.set("recipiesInsertArabicInsertFormErrorMessage", "");

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

Template.RecipiesInsertArabicInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("recipiesInsertArabicInsertFormInfoMessage", "");
		pageSession.set("recipiesInsertArabicInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var recipiesInsertArabicInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(recipiesInsertArabicInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("recipiesInsertArabicInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("recipies", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("recipiesInsertArabicInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = RecipiesArabic.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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
	}, 

	"change #field-file-id": function(e, t) {
	e.preventDefault();
	var fileInput = $(e.currentTarget);
	var dataField = fileInput.attr("data-field");
	var hiddenInput = fileInput.closest("form").find("input[name='" + dataField + "']");

	FS.Utility.eachFile(event, function(file) {
		Files.insert(file, function (err, fileObj) {
			if(err) {
				console.log(err);
			} else {
				hiddenInput.val(fileObj._id);
			}
		});
	});
}

});

Template.RecipiesInsertArabicInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("recipiesInsertArabicInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("recipiesInsertArabicInsertFormErrorMessage");
	}
	
});
