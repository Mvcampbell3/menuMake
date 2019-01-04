// global variables
var whichButton;

function Menu(name, calories, ingredients) {
    this.name = name;
    this.calories = calories;
    this.ingredients = ingredients;
};

var chipotleChix = new Menu("Chipotle Chicken", 400, [
    "Chicken Breast",
    "Chipotle Salsa",
    "Rice",
    "Cilantro",
    "Lime",
]);

var orangeChix = new Menu("Orange Chicken", 400, [
    "Chicken Breast",
    "Orange Sauce",
    "Rice",
    "Stir-fry Veggies",
])






var menuList = [chipotleChix, orangeChix];

function displayMenu() {
    for (var i = 0; i < menuList.length; i++) {
        var newDish = $("<div>").attr("class", "dish col-4");
        var dishName = $("<h3>").text("Name: " + menuList[i].name);
        var dishCal = $("<h3>").text("Calories: "+menuList[i].calories);
        var dishIng = $("<h4>").text("Ingredients: "+menuList[i].ingredients.join(", "));

        newDish.append(dishName).append(dishCal).append(dishIng);
        $(".outputArea").append(newDish);
    }
}


// event handlers and eh funtions

$(".lunchBtn").on("click", function(){
    console.log("lunch clicked");
    $(".menu").fadeIn();
    displayMenu();
})

$(".dinnerBtn").on("click", function(){
    console.log("dinner clicked");
    $(".menu").fadeIn();
    displayMenu();
})

$(".menu").on("click", ".dish", function(){

})

