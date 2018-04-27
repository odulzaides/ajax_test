'use strict';
//Events
(function () {
    // Search button
    var $searchBtn = $('#lookUpData');
    $searchBtn.on('click', function () {
        View.prototype.getInput();
    });

})();

/* Utitlites
*/
var format = function (selection) {
    var arr = [];
    selection.each(function () {
        arr.push($(this).val());
    });
    var formatted = arr.join('');
    console.log(formatted);
    return formatted;
}

// View
//////////
var View = function () {
    console.log("View");
    var me = "me";
}

View.prototype = {
    // Get what to search for
    getInput: function () {
        // Checkboxes available
        var products = $('.products:checked');
        var prices = $('.prices:checked');
        // See what is checked and form search part of url
        var productsChecked = format(products);
        var pricesChecked = format(prices);
        var searchUrl = productsChecked + pricesChecked;
        console.log("This is the search criteria " + searchUrl);
        Controller.prototype.getData(searchUrl);
    },
    // Display results in table
    displayResults: function (data) {
        $.each(data, function (index, item) {
            var brand, model, product, price;
            var results = $('#results-table');
            var tr = $('<tr>').append(
                $('<td>').text(item.brand),
                $('<td>').text(item.model),
                $('<td>').text(item.product),
                $('<td>').text(item.price)
            ).appendTo(results);
        });
    }
}// View prototypes


/******
    Controller
******/
var Controller = function () {
    console.log("Controller");
}

Controller.prototype = {
    getData: function (searchCriteria) {
        $.ajax({
            url: 'http://localhost:3001/products?' + searchCriteria
        })
            .then(function (response) {
                View.prototype.displayResults(response);
            }); // AJAX
    }
}// Controller prototypes


View();
Controller();

