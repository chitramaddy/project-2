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
    $("#results-area").empty();
    for (var i = 0; i < res.matches.length; i++) {
        var matches = res.matches[i];

        var div = $("<div>");
        div.addClass("result");

        var ul = $("<ul>");
        ul.attr("recipe-id", matches.id);

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

function renderRecipe(res){
    var recipeName = res.name;
    var sourceRecipe = res.source.sourceRecipeUrl;
    var image = res.images[0].hostedLargeUrl;
    var type = res.attributes.course[0];
    var ingredients = res.ingredientLines;
    var servings = res.numberOfServings;
    var rating = res.rating;
    var totalTime = res.totalTime;

    //console.log(res);
    $("#recipe-section").empty();

    var nameDiv = $("<div>");
    var nameP = $("<p>");
    nameP.text(recipeName);
    nameDiv.append(nameP);

    var sourceDiv = $("<div>");
    var sourceA = $("<a>");
    sourceA.attr("href", sourceRecipe).attr("target", "_blank").text("Link to the recipe.");
    sourceDiv.append(sourceA);

    var imageDiv = $("<div>");
    var img = $("<img>");
    img.attr("src", image);
    imageDiv.append(img);

    var typeDiv = $("<div>");
    var typeP = $("<p>");
    typeP.text("Type: " + type);
    typeDiv.append(typeP);

    var ingredientsDiv = $("<div>");
    var ingredientsUl = $("<ul>");
    for (var i = 0; i < ingredients.length; i++){
        var ingredientLi = $("<li>");
        ingredientLi.text(ingredients[i]);
        ingredientsUl.append(ingredientLi);
    }
    ingredientsDiv.append(ingredientsUl);

    var servingsDiv = $("<div>");
    var servingsP = $("<p>");
    servingsP.text("Serves " + servings);
    servingsDiv.append(servingsP);

    var ratingDiv = $("<div>");
    var ratingP = $("<p>");
    ratingP.text("Rating: " + rating);
    ratingDiv.append(ratingP);

    var timeDiv = $("<div>");
    var timeP = $("<p>");
    timeP.text("Takes about " + totalTime);
    timeDiv.append(timeP);


    $("#recipe-section").append(nameDiv, sourceDiv, imageDiv, typeDiv, ingredientsDiv, servingsDiv, ratingDiv, timeDiv);
    $("#recipes-modal").show();
}