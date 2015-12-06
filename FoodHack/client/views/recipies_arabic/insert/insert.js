var pageSession = new ReactiveDict();

Template.RecipiesArabicInsert.rendered = function() {
	
};

Template.RecipiesArabicInsert.events({
	
});

Template.RecipiesArabicInsert.helpers({
	
});

Template.RecipiesArabicInsertAddFile.rendered = function() {
	

	pageSession.set("recipiesArabicInsertAddFileInfoMessage", "");
	pageSession.set("recipiesArabicInsertAddFileErrorMessage", "");

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

Template.RecipiesArabicInsertAddFile.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("recipiesArabicInsertAddFileInfoMessage", "");
		pageSession.set("recipiesArabicInsertAddFileErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var recipiesArabicInsertAddFileMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(recipiesArabicInsertAddFileMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("recipiesArabicInsertAddFileInfoMessage", message);
					}; break;
				}
			}

			Router.go("recipies_arabic", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("recipiesArabicInsertAddFileErrorMessage", message);
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

		

		Router.go("recipies_arabic", {});
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

Template.RecipiesArabicInsertAddFile.helpers({
	"infoMessage": function() {
		return pageSession.get("recipiesArabicInsertAddFileInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("recipiesArabicInsertAddFileErrorMessage");
	}
	
});
