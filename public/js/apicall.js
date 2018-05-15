var filters = [{
        name: "cuisines",
        filters: [
            "cuisine^cuisine-american", "cuisine^cuisine-kid-friendly", "cuisine^cuisine-italian", "cuisine^cuisine-asian", "cuisine^cuisine-mexican", "cuisine^cuisine-french", "cuisine^cuisine-southwestern", "cuisine^cuisine-barbecue-bbq", "cuisine^cuisine-indian", "cuisine^cuisine-chinese", "cuisine^cuisine-mediterranean", "cuisine^cuisine-greek", "cuisine^cuisine-english", "cuisine^cuisine-spanish", "cuisine^cuisine-thai", "cuisine^cuisine-german", "cuisine^cuisine-moroccan", "cuisine^cuisine-irish", "cuisine^cuisine-cuban", "cuisine^cuisine-hawaiian", "cuisine^cuisine-swedish", "cuisine^cuisine-hungarian", "cuisine^cuisine-portuguese"]
    },
    {
        name: "diets",
        filters: ["388^Lacto vegetarian", "389^Ovo vegetarian", "390^Pescetarian", "386^Vegan", "387^Lacto-ovo vegetarian", "403^Paleo"]
    },
    {
        name: "intolerances",
        filters: ["393^Gluten-Free", "394^Peanut-Free", "398^Seafood-Free", "399^Sesame-Free", "400^Soy-Free", "396^Dairy-Free", "397^Egg-Free", "401^Sulfite-Free", "395^Tree Nut-Free", "392^Wheat-Free"]
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