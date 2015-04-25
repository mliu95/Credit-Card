$(document).ready(function() {
	$(".creditcard-number").on("keyup", function() {
		console.log("cc number change detected");

		// GET THE FIRST 4 DIGITS
		var cc_number = $(this).val();
		var cc_name   = "";

		var ccf2 = cc_number.substring(0,2);
		var ccf3 = cc_number.substring(0,3); 
		var ccf4 = cc_number.substring(0,4);

		// VISA
		if(cc_number.substring(0,1) == "4") 
			cc_name = "visa";

		// MASTERCARD
		else if(ccf2 == "51" || ccf2 == "52" || ccf2 == "53" || ccf2 == "54" || ccf2 == "55") 
			cc_name = "mastercard";

		// AMERICAN EXPRESS
		else if(ccf2 == "34" || ccf2 == "37")
			cc_name = "americanexpress";

		// DISCOVER
		else if(ccf4 == "6011") {
			cc_name = "discover";
		}

		// DISABLE ALL OTHER CLASSES
		$($(this).parent()).toggleClass("visa", false);
		$($(this).parent()).toggleClass("mastercard", false);
		$($(this).parent()).toggleClass("americanexpress", false);
		$($(this).parent()).toggleClass("discover", false);
		// ENABLE CURRENT CLASS
		$($(this).parent()).toggleClass(cc_name, true);

	});
});