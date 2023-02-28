var allIngredientNames = []
var ingredientTypesList = [];
var ingredientOptions = "";
var ingredientTypesOptions = "";
var itemsCount = 0;
window.onload = function () {
    getAllRecipes();
    getAllIngredients();
    getAllIngredientTypes();
}

function getAllRecipes() {
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
                    if (ingredientItem.ingredient != null)
                        drinkContent += `<li>${ingredientItem.quant + " " + ingredientItem.quantType + " de " + ingredientItem.ingredient.name}</li>`;
                }
                drinkContent += `</ul></td></tr>`;
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
        console.log("ingredient log: " + item.name);
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


function populateIngredientTypeOptions(body) {
    for (let item of body) {
        ingredientTypesList.push(item);
        console.log("IngredientTypes log: " + item);
    }
    ingredientTypesForm();
}
function newIngredient() {
    var ingredients = window.document.getElementById("newIngredients");
    
    ingredients.innerHTML +=
        `
    <br>
    <label for="ingredient${itemsCount}" >${itemsCount}° Ingrediente</lable>
    <select name="ingredient${itemsCount}" id="ingredient${itemsCount}">${ingredientOptions}</select>
    <label for="quant${itemsCount}" >
    <input name="quant${itemsCount}" min="0" id="quant${itemsCount}" type="number" >
    <select name="quantType${itemsCount}" id="quantType${itemsCount}" >
    ${ingredientTypesOptions}
    </select>
    <br>
    `;
    itemsCount++
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

/* Deprecated
function sendForm() {
    var ingredients = [];
    var count = 0;
    var checkbox = "";
    var x = document.getElementById("newIngredients");
    do {
        let ingredient = window.document.getElementById("ingredient" + count);
        
        checkbox += `<input type="checkbox" form="newRecipeForm" name="recipeItems" value="${ingredient}" checked style="display: none;">`
        
        console.log("--Checkbox"+count+": "+`<input type="checkbox" form="newRecipeForm" name="recipeItems" value="${ingredient}" checked >`);
        count++
    } while (window.document.getElementById("ingredient" + count));
    x.innerHTML = checkbox;
    /*sendButton = window.document.getElementById("subButton");
    sendButton.click();
} */
function openForm() {
    document.getElementById("formContainer").style.display = "block";
    /*document.getElementById("recipeTable").style.display = "none";*/
}
function closeForm() {
    document.getElementById("formContainer").style.display = "none";
    /*document.getElementById("recipeTable").style.display = "block";*/
}

function sendForm() {
    var itemsRecipe = [];
    var itemAux = {};
    
    console.log("Adding "+itemsCount+" items");
    for (let i = 0; i < itemsCount; i++){
        console.log("Adding item n°"+i);
        itemAux.quant  = document.getElementById("quant"+i).value;
        

        itemAux.quantType = document.getElementById("quantType"+i).value;
        
        
        itemAux.ingredient = {
                "name":document.getElementById("ingredient"+i).value
        }

        console.log("Adding item n°"+i+": Item:"+JSON.stringify(itemAux));
        /*adding a copy of ItemAux, because the array store the object reference*/
        itemsRecipe.push(JSON.parse(JSON.stringify(itemAux)));
    }
    console.log("itemsRecipe: "+JSON.stringify(itemsRecipe));
    recipe = {
        "name": document.getElementById("name").value,
        "prepare": document.getElementById("prepare").value,
        "temperature": document.getElementById("temperature").value,
        "backgroundColor": document.getElementById("backgroundColor").value,
        "recipeItems":itemsRecipe,
    }

       /* ----Deprecated----

       const newRecipeForm = document.querySelector('form');
    var formData = new FormData(newRecipeForm);

        formData.recipeItems = itemsRecipe;
        
        const res = Object.fromEntries(formData);
        const payload = JSON.stringify(res);
        console.log("FORMDATA: "+JSON.stringify(formData)) 
        console.log("PAYLOAD: "+payload)
        console.log("RECIPE: "+JSON.stringify(recipe))

        const file = document.querySelector('#file');

        for (item of formData) {
            console.log(item[0], item[1]);
        }
*/
        fetch("http://127.0.0.1:8080/recipe/new", {
            method: "POST",
            body: JSON.stringify(recipe),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => console.log(res));

  
}