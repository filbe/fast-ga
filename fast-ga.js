/* fast-ga.js
 * Fast-GA - Fast Google Analytics implementation in HTML & JS -based websites and apps
 * (C) Ville-Pekka Lahti
 * v0.9 - 12 Aug 2020
 * TODO:
 * 
 * - version for tracking all clicks, 
 *   element-defined value collection (json?) OR 
 *   single pre-defined value OR default behavior and attribute-exceptions?
 * 
 * - insert GA code -> get minified full version of fast-ga from website
 * 
 * - tutorial video and some use-case
 * 
 */
window.onload = function() {
    if (window.jQuery) {  
        $(document).ready(function() {
        	var fastgaFunc = function(){console.log("No Google Analytics detected! Needed for Fast-GA", arguments)};
        	if (typeof ga === "function") {
				var fastgaFunc = (function(a,b,c) {
					ga('send','event',a,b,c);
				});
			}
        	$("[faga]").each(function() {
        		var el = $(this);
        		var tag = $(this).prop("tagName");
        		var event_cat = $(this).attr("faga-c");
        		var event_name = $(this).attr("faga-n");
        		switch(tag) {
        			case "INPUT":
        			case "SELECT":
	        				switch(el.attr("type")) {
	        					case "submit":
	        					case "button":
	        						el.on("pointerdown", function() {
	        							fastgaFunc('button-click-'+event_cat, event_name);
	        						});
	        					break;
	        					default:
	        					el.on("change", function() {
	        						var private = el.attr('faga-private');
	        						if (typeof private !== typeof undefined && private !== false) {
	        							fastgaFunc('input-'+event_cat, event_name);
	        						} else {
	        							fastgaFunc('input-'+event_cat, event_name, el.val());
	        						}
        						});
	        				}
        			break;
        			case "BUTTON":
        			el.on("pointerdown", function() {
						fastgaFunc('button-click-'+event_cat, event_name);
					});
					break;
					default:
					el.on("pointerdown", function() {
						fastgaFunc(event_cat, event_name);
					});
        		}
        	});
        });
    } else {
        console.log("Missing jQuery! Needed for Fast-GA!");
    }
}
