/*
Anderson Nouv
Created: 10/29/22
Edited: 11/26/22
File: multiplicationTable.js (FOR PART 2)
*/ 

// Display error message if min or max values are not compliant
/*
    Bugs?:
    - Error messages don't go away automatically once user fixes input with slider,
    would have to click into the field then out of the field for it to go away

    Missing Features:
    - Couldn't get multiplication table to appear under saved tab
    - Didn't prevent invalid tables to not be saved
    - Didn't allow for multiple tabs to be selected and deleted all at once
*/
var tabIndex = 1;

/* Display error messages if user doesn't input min/max values correctly */ 
function errorMessage() {
    var minCol = parseInt(document.getElementById("minColumn").value);
    var minRow = parseInt(document.getElementById("minRow").value);

    // Causes fields to require user input with the below ranges for each field
    $("#form-horizontal").validate({
        rules: {
            
            minColumn: {
                required: true,
                range: [-50, 50]
            },

            maxColumn: {
                required: true,
                range: [minCol, 50]
            },

            minRow: {
                required: true,
                range: [-50, 50]
            },

            maxRow: {
                required: true,
                range: [minRow, 50]
            }
        },

        // Error messages if user input doesn't fit with the ranges of a field
        messages: {
            minColumn: {
                required: "Minimum Column Value Required",
                range: "Minimum value must be greater than or equal to -50 and less than or equal to 50"
            },

            maxColumn: {
                required: "Maximum Column Value Required",
                range: "Maximum value must be greater than or equal to the Minimum Column value and less than or equal to 50"
            },

            minRow: {
                required: "Minimum Row Value Required",
                range: "Minimum value must be greater than or equal to -50 and less than or equal to 50"
            },

            maxRow: {
                required: "Maximum Row Value Required",
                range: "Maximum value must be greater than or equal to the Minimum Row value and less than or equal to 50"
            }
        }
    });

    // Testing to make sure minCol's and minRow's values
    // are correct and used in the range
    console.log("MinCol:");
    console.log(minCol);
    console.log("MinRow:");
    console.log(minRow);
}

/* Related to Sliders */
$(function sliders() {

    // Details for minColSlider
    // Two-way binding for minColumn input field and minColSlider
    // Dynamically updates table when slider's position is updated
    var sliderOpts1 = {
        animate: true,
        value: 0,
        min: -50,
        max: 50,
        step: 1,
        slide: function(event, ui) {
            $("#minColumn").val(ui.value);
            multiply();
        }
    };

    // Details for maxColSlider
    // Two-way binding for maxColumn input field and maxColSlider
    // Dynamically updates table when slider's position is updated
    var sliderOpts2 = {
        animate: true,
        value: 0,
        min: -50,
        max: 50,
        step: 1,
        slide: function(event, ui) {
            $("#maxColumn").val(ui.value);
            multiply();
        }
    };

    // Details for minRowSlider
    // Two-way binding for minRow input field and minRowSlider
    // Dynamically updates table when slider's position is updated
    var sliderOpts3 = {
        animate: true,
        value: 0,
        min: -50,
        max: 50,
        step: 1,
        slide: function(event, ui) {
            $("#minRow").val(ui.value);
            multiply();
        }
    };

    // Details for maxRowSlider
    // Two-way binding for maxRow input field and maxRowSlider
    // Dynamically updates table when slider's position is updated
    var sliderOpts4 = {
        animate: true,
        value: 0,
        min: -50,
        max: 50,
        step: 1,
        slide: function(event, ui) {
            $("#maxRow").val(ui.value);
            multiply();
        }
    };

    $("#minColSlider").slider(sliderOpts1);
    $("#maxColSlider").slider(sliderOpts2);
    $("#minRowSlider").slider(sliderOpts3);
    $("#maxRowSlider").slider(sliderOpts4);

    var initalValue1 = $("#minColSlider").slider("option", "value");
    var initalValue2 = $("#maxColSlider").slider("option", "value");
    var initalValue3 = $("#minRowSlider").slider("option", "value");
    var initalValue4 = $("#maxRowSlider").slider("option", "value");

    // Two-way binding between sliders and their respective input fields

    // Two-way binding for minColumn input field and minColSlider
    // Dynamically updates table once input field is updated
    $("#minColumn").val(initalValue1);
    $("#minColumn").change(function() {
        var oldVal = $("#minColSlider").slider("option", "value");
        var newVal = $(this).val();
        if (isNaN(newVal) || newVal < -50 || newVal > 50) {
            $("#minColumn").val(oldVal);
        }
        else {
            $("#minColSlider").slider("option", "value", newVal);
            multiply();
        }
    });

    // Details for maxColSlider
    // Two-way binding for maxColumn input field and maxColSlider
    $("#maxColumn").val(initalValue2);
    $("#maxColumn").change(function() {
        var oldVal = $("#maxColSlider").slider("option", "value");
        var newVal = $(this).val();
        if (isNaN(newVal) || newVal < -50 || newVal > 50) {
            $("#maxColumn").val(oldVal);
        }
        else {
            $("#maxColSlider").slider("option", "value", newVal);
            multiply();
        }
    });

    // Details for minRowSlider
    // Two-way binding for minRow input field and minRowSlider
    $("#minRow").val(initalValue3);
    $("#minRow").change(function() {
        var oldVal = $("#minRowSlider").slider("option", "value");
        var newVal = $(this).val();
        if (isNaN(newVal) || newVal < -50 || newVal > 50) {
            $("#minRow").val(oldVal);
        }
        else {
            $("#minRowSlider").slider("option", "value", newVal);
            multiply();
        }
    });

    // Details for maxRowSlider
    // Two-way binding for maxRow input field and maxRowSlider
    $("#maxRow").val(initalValue4);
    $("#maxRow").change(function() {
        var oldVal = $("#maxRowSlider").slider("option", "value");
        var newVal = $(this).val();
        if (isNaN(newVal) || newVal < -50 || newVal > 50) {
            $("#maxRow").val(oldVal);
        }
        else {
            $("#maxRowSlider").slider("option", "value", newVal);
            multiply();
        }
    });
});

/* Details for tabs */
function tabs() {
    // Initialize tabs
    $("#savedTabs").tabs();

    // Get dimensions of current table
    var minCol = parseInt(document.getElementById("minColumn").value);
    var maxCol = parseInt(document.getElementById("maxColumn").value);
    var minRow = parseInt(document.getElementById("minRow").value);
    var maxRow = parseInt(document.getElementById("maxRow").value);

    tabIndex++;

    // Creates the tab's title
    var tabTitle = "<li class='tab'><a href='#tab-" + tabIndex + "'>[" + minCol + " to " + maxCol + "] by [" + minRow + " to " + maxRow + "]</a>" + "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

    // Add new title to list
    $("#savedTabs ul").append(tabTitle);
    
    // Add current multiplication table
    $("#savedTabs").append('<div id="tab-' + tabIndex + '">' + $("#myTable").html() + '</div>');
    
    // Refresh tabs so new tab appears
    $("#savedTabs").tabs("refresh");
    
    // Make new tab active
    $("#savedTabs").tabs("option", "active", -1);
    
    // Allow tab to be removed
     $("#savedTabs").delegate("span.ui-icon-close", "click", function() {
        var panelID = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelID).remove();
    });
}

// Multiply the minCol to maxCol values with the minRow to maxRow values 
// and create table
function multiply() {
    var minCol = parseInt(document.getElementById("minColumn").value);
    var maxCol = parseInt(document.getElementById("maxColumn").value);
    var minRow = parseInt(document.getElementById("minRow").value);
    var maxRow = parseInt(document.getElementById("maxRow").value);

    var table = document.getElementById("myTable");
    var output = "";

    // If the user puts invalid values after already creating a table,
    // the current table on screen will stay up until user fixes input(s)
    if (minCol < -50 || minCol > 50) {
        return;
    }

    if (maxCol < minCol || maxCol > 50) {
        return;
    }

    if (minRow < -50 || minRow > 50) {
        return;
    }

    if (maxRow < minRow || maxRow > 50) {
        return;
    }

    // Makes the top row of table listing the user's min to max row values 
    for (var x = 0; x < 1; x++) {
        output += "<tr>";
        output += "<th>&times;</th>";
        for (var y = minRow; y <= maxRow; y++) {
            output += "<th>" + y + "</th>";
        }
        output += "</tr>";
    }

    // Makes the cells with output of multiplying
    for (var i = minCol; i <= maxCol; i++) {
        output += "<tr>";
        
        // Listing the next col value of the user's input values before doing
        // multiplication
        output += "<th>" + i + "</th>";
        for (var j = minRow; j <= maxRow; j++) {
            
            output += "<td>" + (i * j) + "</td>";
        }
        output += "</tr>";
    }
    table.innerHTML = output;
}