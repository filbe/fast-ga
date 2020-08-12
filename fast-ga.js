/* fast-ga.js
 * Fast-GA - Fast Google Analytics implementation in HTML & JS -based websites and apps
 * (C) Ville-Pekka Lahti
 * v0.9 - 12 Aug 2020
 */
window.onload = function() {
    if (window.jQuery) {  
        $(document).ready(function() {
        	var fastgaFunc = function(){console.log("No Google Analytics detected! Needed for Fast-GA", arguments)};
        	if (typeof ga === "function") {
				fastgaFunc = ga;
			}
        	$("[faga]").each(function() {
        		var el = $(this);
        		var tag = $(this).prop("tagName");
        		var event_cat = $(this).attr("faga-c");
        		var event_name = $(this).attr("faga-n");
        		switch(tag.toLowerCase()) {
        			case "input":
        			case "select":
	        				switch(el.attr("type")) {
	        					case "submit":
	        					case "button":
	        						el.on("pointerdown", function() {
	        							fastgaFunc('send', 'event', 'button-click-'+event_cat, event_name);
	        						});
	        					break;
	        					default:
	        					el.on("change", function() {
	        						var private = el.attr('faga-private');
	        						if (typeof private !== typeof undefined && private !== false) {
	        							fastgaFunc('send', 'event', 'input-'+event_cat, event_name);
	        						} else {
	        							fastgaFunc('send', 'event', 'input-'+event_cat, event_name, el.val());
	        						}
        						});
	        				}
        			break;
        			case "button":
        			el.on("pointerdown", function() {
						fastgaFunc('send', 'event', 'button-click-'+event_cat, event_name);
					});
					break;
					default:
					el.on("pointerdown", function() {
						fastgaFunc('send', 'event', event_cat, event_name);
					});
        		}
        	});
        });
    } else {
        console.log("Missing jQuery! Needed for Fast-GA!");
    }
}
