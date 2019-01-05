// global variables
var whichButton;
var checkArray;

function Menu(name, type, calories, ingredients) {
    this.name = name;
    this.type = type
    this.calories = calories;
    this.ingredients = ingredients;
};

var menuDayButtons = $(".menuDay");

var chipotleChix = new Menu("Chipotle Chicken", "dinner", 400, [
    "Chicken Breast",
    "Chipotle Salsa",
    "Rice",
    "Cilantro",
    "Lime",
]);

var orangeChix = new Menu("Orange Chicken", "dinner", 400, [
    "Chicken Breast",
    "Orange Sauce",
    "Rice",
    "Stir-fry Veggies",
]);

var turkeyWrap = new Menu("Turkey Wrap", "lunch", 250, [
    "Turkey Slices",
    "Wrap",
    "Cheese Slice",
    "Mustard",
    "Lettuce",
]);


var fullList = [chipotleChix, orangeChix, turkeyWrap];

var lunchList = [];

var dinnerList = [];

function sortMenu() {
    loadMealPlan();
    if (JSON.parse(localStorage.getItem("menu")) === null) {
        for (var i = 0; i < fullList.length; i++) {
            if (fullList[i].type === "lunch") {
                lunchList.push(fullList[i]);
            } else {
                dinnerList.push(fullList[i]);
            }
        }
    }
};

function displayDinnerMenu() {
    $(".outputArea").html("");
    for (var i = 0; i < dinnerList.length; i++) {
        var newDish = $("<div>").attr("class", "dish col-4")
            .attr("data-name", dinnerList[i].name);
        var dishName = $("<h3>").text("Name: " + dinnerList[i].name);
        var dishCal = $("<h3>").text("Calories: " + dinnerList[i].calories);
        var dishIng = $("<h4>").text("Ingredients: " + dinnerList[i].ingredients.join(", "));

        newDish.append(dishName).append(dishCal).append(dishIng);
        $(".outputArea").append(newDish);
    }
};

function displayLunchMenu() {
    $(".outputArea").html("");
    for (var i = 0; i < lunchList.length; i++) {
        var newDish = $("<div>").attr("class", "dish col-4")
            .attr("data-name", lunchList[i].name);
        var dishName = $("<h3>").text("Name: " + lunchList[i].name);
        var dishCal = $("<h3>").text("Calories: " + lunchList[i].calories);
        var dishIng = $("<h4>").text("Ingredients: " + lunchList[i].ingredients.join(", "));

        newDish.append(dishName).append(dishCal).append(dishIng);
        $(".outputArea").append(newDish);
    }
};

function saveMealPlan() {
    checkArray = [
        $("#monLunch").text(),
        $("#monDinner").text(),
        $("#tueLunch").text(),
        $("#tueDinner").text(),
        $("#wedLunch").text(),
        $("#wedDinner").text(),
        $("#thurLunch").text(),
        $("#thurDinner").text(),
        $("#friLunch").text(),
        $("#friDinner").text(),
        $("#satLunch").text(),
        $("#satDinner").text(),
        $("#sunLunch").text(),
        $("#sunDinner").text(),
    ];


    localStorage.setItem("mealPlan", JSON.stringify(checkArray));
    console.log("saveMealPlan ran");
};

function loadMealPlan() {
    if (JSON.parse(localStorage.getItem("mealPlan")) === null) {
        saveMealPlan();
    } else {
        var savedArray = JSON.parse(localStorage.getItem("mealPlan"));

        for (var i = 0; i < savedArray.length; i++) {
            menuDayButtons[i].innerText = savedArray[i];
        }
    }
}

function ingredientsList() {
    var allIngredients = [];
    var whichMeals = [];
    var allNames = [];
    var whereInNames = [];

    for (var i = 0; i < menuDayButtons.length; i++){
        if (menuDayButtons[i].innerText != "Lunch" && menuDayButtons[i].innerText != "Dinner"){
            whichMeals.push(menuDayButtons[i].innerText);
        }
    }
    console.log(whichMeals);
    for (var i = 0; i < fullList.length; i++) {
        allNames.push(fullList[i].name);
    }
    console.log(allNames);
    for (var i = 0; i < whichMeals.length; i++) {
        var here = allNames.indexOf(whichMeals[i]);
        whereInNames.push(here);
    }
    console.log(whereInNames);
    for (var i = 0; i < whereInNames.length; i++) {
        allIngredients.push(fullList[whereInNames[i]].ingredients);
    }
    console.log(allIngredients);

    allIngredients = allIngredients.join();
    allIngredients = allIngredients.split(",")
    console.log(allIngredients);
}

// Another function which will take allIngredients Array, take the 0 index set to var;
// check index of var against array, splice and push to temp array until index = -1
// the else is going to post array to page with title being temp[0], total = temp.length;
// in the else, going to check if allIngredients.length > 0;
// if true, reset tempArray, reset var, rerun function again;
// will only be able to run from serperate modal;




// event handlers and their functions

$(".lunchBtn").on("click", function () {
    console.log("lunch clicked");
    whichButton = $(this).attr("id");
    console.log(whichButton);
    $(".lunchMenu").fadeIn();
    displayLunchMenu();
});

$(".dinnerBtn").on("click", function () {
    console.log("dinner clicked");
    whichButton = $(this).attr("id");
    console.log(whichButton);
    $(".dinnerMenu").fadeIn();
    displayDinnerMenu();
});

$(".menu").on("click", ".dish", function () {
    $("#" + whichButton).text($(this).attr("data-name"));
    console.log($(this));
    $(".menu").fadeOut();
    saveMealPlan();
});

$(".mainTitle").on("click", ingredientsList);

