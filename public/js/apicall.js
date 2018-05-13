var filters = [{
        name: "cuisines",
        filters: ["african", "chinese", "japanese", "korean", "vietnamese", "thai", "indian", "british", "irish", "french", "italian", "mexican", "middle eastern", "jewish", "american", "cajun", "indian", "greek", "german", "nordic", "eastern european", "caribbean", "latin american"]
    },
    {
        name: "diets",
        filters: ["pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "paleo, primal", "and vegetarian"]
    },
    {
        name: "intolerances",
        filters: ["dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"]
    }
];

var chosenFilters = [];
var chosenIngredients = [];


//function to show the returned recipes from the API in the results area using Jquery
function renderResults(res) {
    for (var i = 0; i < res.matches.length; i++) {
        var matches = res.matches[i];

        var div = $("<div>");
        div.addClass("result");

        var ul = $("<ul>");

        var liImage = $("<li>");
        var image = $("<img>");
        image.attr("src", matches.smallImageUrls);
        liImage.append(image);

        var liName = $("<li>");
        liName.text("Name: " + matches.recipeName);

        var liRating = $("<li>");
        liRating.text("Rating: " + matches.rating);

        var liTime = $("<li>");
        liTime.text("Preparation Time: " + matches.totalTimeInSeconds + " minutes.");

        ul.append(liImage, liName, liRating, liTime);
        div.append(ul);
        $("#results-area").append(div);
    }
}