//Events
(function () {
    var $searchBtn = $('#lookUpData');
    $searchBtn.on('click', function () {
        View.prototype.getInput();
    })
})();

// View
//////////
var View = function () {
    console.log("View");
    var me = "me";
}

View.prototype = {
    getInput: function () {
        var productLineCheckbox = "refridgerators";
        Controller.prototype.getData(productLineCheckbox);
    },
    displayResults: function (data) {
        console.log(data);
        $.each(data, function (index, item) {
            var brand, model, product, price;
            var results = $('#results-table');
            var tr = $('<tr>').append(
                $('<td>').text(item.brand),
                $('<td>').text(item.model),
                $('<td>').text(item.product),
                $('<td>').text(item.price)
            ).appendTo(results)
            console.log(index, item.price)
        });
    }
}// View prototypes



//Controller
////////////
var Controller = function () {
    console.log("Controller");
}

Controller.prototype = {
    getData: function (productLine) {
        $.ajax({
            url: 'http://localhost:3001/' + productLine
        })
            .then(function (response) {
                View.prototype.displayResults(response);
            }); // AJAX
    }
}// Controller prototypes


View();
Controller();

