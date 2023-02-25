var allIngredientNames = []
var ingredientList = [];
var ingredientTypesList = [];
var ingredientOptions = "";
var ingredientTypesOptions="";
var count = 0;
window.onload = function () {
    getAllRecipes();
    getAllIngredients();
    getAllIngredientTypes();
}

function getAllRecipes() {
    var items;
    getRecipes = fetch("http://localhost:8080/recipe/all");
    var a = window.document.getElementById("receitasTableBody");
    var drinkContent = "";
    getRecipes.then(res => { return res.json() })
        .then(body => {
            /*items = JSON.stringify(body)*/
            console.log(body);

            for (let item of body) {

                drinkContent += `
                <tr>
                <td><img style="width:50px" src="images/drinks-images/${item.imageUrl}"></td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.prepare}</td>
                <td>${item.imageUrl}</td>
                <td>${item.backgroundColor}</td>
                <td>`+
                    `<ul>`;
                for (let ingredientItem of item["recipeItems"]) {
                    drinkContent += `<li>${ingredientItem.quant + " " + ingredientItem.quantType + " de " + ingredientItem.ingredient.name}</li>`;
                }
                drinkContent += `</ul><td></tr>`;
            }
            a.innerHTML = drinkContent;
            console.log("drinkContent: " + drinkContent + "lll");

        })
        .catch(err => { console.log(err) })
}

function getAllIngredients() {
    getIngredients = fetch("http://localhost:8080/ingredient/all");
    getIngredients.then(res => res.json())
        .then(body => {
            populateIngredientOptions(body);

        })
        .catch(err => { console.log(err) });
}
function populateIngredientOptions(body) {
    for (let item of body) {
        console.log("ingredient log: "+item.name);
        allIngredientNames.push(item.name);
    }
    ingredientForm();
}
function getAllIngredientTypes() {
fetch("http://localhost:8080/ingredient/allMeasureTypes").then(res => res.json())
.then(body => {
    populateIngredientTypeOptions(body);

}).catch(err => { console.log(err) })

}


function populateIngredientTypeOptions(body){
    for(let item of body){
        ingredientTypesList.push(item);
        console.log("IngredientTypes log: "+item);
    }
    ingredientTypesForm();
}
function newIngredient() {
    var ingredients = window.document.getElementById("newIngredients");
    count++
    ingredients.innerHTML +=
        `
    <br>
    <label for="ingredient${count}" >${count}° Ingrediente</lable>
    <select name="ingredient${count}" id="ingredient${count}">${ingredientOptions}</select>
    <label for="quant${count}" >
    <input name="quant" min="0" id="quant${count}" type="number" >
    <select  >
    ${ingredientTypesOptions}
    </select>
    <br>
    `;
}
function ingredientForm() {
    for (let i = 0; i < allIngredientNames.length; i++) {
        ingredientOptions += `<option value="${allIngredientNames[i]}">${allIngredientNames[i]}</option>`
    }
    /*
    for (let ingredientItem of allIngredients) {
        ingredientOptions += `<option value="quente">${allIngredients[i]}</option>`;
    }*/
}

function ingredientTypesForm() {
    for (let i = 0; i < ingredientTypesList.length; i++) {
        ingredientTypesOptions += `<option value="${ingredientTypesList[i]}">${ingredientTypesList[i]}</option>`
    }
    /*
    for (let ingredientItem of allIngredients) {
        ingredientOptions += `<option value="quente">${allIngredients[i]}</option>`;
    }*/
}

function sendForm() {
    const ingredients = [];
    const count = 0;
    do {
        let ingredient = ingredients.push(window.document.getElementById("ingredient" + count));
        checkbox += `<input type="checkbox" form="newRecipeForm" name="ingredients" value="${ingredient}" checked style="display: none;">`
        count++
    } while (window.document.getElementById("ingredient" + count));
    subButton = window.document.getElementById("subButton");
    sendButton.click();
}
function closeForm(){
    let form = window.document.getElementById("newIngredients");
    form.setAttribute();
}