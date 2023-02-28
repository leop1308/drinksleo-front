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
    var ItemRecipeFields = window.document.getElementById("newIngredients");

    let ingredientLabel = document.createElement("label");
    ingredientLabel.textContent = `${itemsCount+1}° ingredient`;
    ingredientLabel.setAttribute("for",`ingredient${itemsCount}`);
    ItemRecipeFields.appendChild(ingredientLabel);

    let quantInput = document.createElement("input");
    quantInput.setAttribute("type","number");
    quantInput.setAttribute("min","0");
    quantInput.setAttribute("value","0");
    ItemRecipeFields.appendChild(quantInput);

    let quantTypeSelect = document.createElement("select");
    appendMeasureTypeOptions(quantTypeSelect);
    ItemRecipeFields.appendChild(quantTypeSelect);

    let ingredientSelect = document.createElement("select");
    quantInput.setAttribute("id",`ingredient${itemsCount}`);
    appendIngredientOptions(ingredientSelect);
    ItemRecipeFields.appendChild(ingredientSelect);
    
    itemsCount++;
}

function appendIngredientOptions(select) {
    let option;
    for (let i = 0; i < allIngredientNames.length; i++) {
        option = document.createElement("option");
        option.text = `${allIngredientNames[i]}`;
        option.setAttribute("value", `${allIngredientNames[i]}`);
        select.appendChild(option);
    }
}
function appendMeasureTypeOptions(select) {
    let option;
    for (let i = 0; i < ingredientTypesList.length; i++) {
        option = document.createElement("option");
        option.text = `${ingredientTypesList[i]}`;
        option.setAttribute("value", `${ingredientTypesList[i]}`);
        select.appendChild(option);
    }
    
}



function openForm() {
    document.getElementById("formContainer").style.display = "block";
}
function closeForm() {
    document.getElementById("formContainer").style.display = "none";
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

        fetch("http://127.0.0.1:8080/recipe/new", {
            method: "POST",
            body: JSON.stringify(recipe),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => console.log(res));

  
}