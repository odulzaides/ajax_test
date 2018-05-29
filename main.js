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
        var brands = $('.brands:checked');
        var products = $('.products:checked');
        var prices = $('.prices:checked');
        // See what is checked and form search part of url
        var brandsChecked = format(brands);
        var productsChecked = format(products);
        var pricesChecked = format(prices);
        var searchUrl = brandsChecked + productsChecked + pricesChecked;
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
    getData: function () {
        $.ajax({
            url: 'https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&ndbno=45202763&ndbno=35193&type=f&format=json&api_key=' + 'LCq7LLOBaxJCQLuNE6YcTTmBmv0wfCcKsU2sPdSC'
        })
            .then(function (response) {
                console.log(response.foods[0].food.nutrients);
                View.prototype.displayResults(response.foods[0].food);
            }); // AJAX
    }
}// Controller prototypes


View();
Controller();

