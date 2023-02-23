//insert a new recipe
/*
const insertRecipe = fetch("localhost:8080/recipe/new", {
    method:"POST",
    head:{
        'Content-type': 'application/json'
    },
    body: JSON.stringfy({
        'name':'drinkExample',
        'type':'gelada',
        'prepare': "1. Bata tudo no liquidificador.  \n 2. Coloque o conteúdo no copo para servir",
        'recipeItems': [{
            'quant':'15',
            'quantType':'ml',
            'ingredient':{
                'name':'limão'
            }
        },{
            'quant':'100',
            'quantType':'ml',
            'ingredient':{
                'name':'água com gás'
            }
        }
    ]

    })

})
*/
//get all recipes


/*
var configs = fetch("configs.json").then(res => res.json())
if(configs.level_debug === "DEBUG") */

window.onload = function () {
    var items;
    const getAllRecipes = fetch("http://localhost:8080/recipe/all");
    var a = window.document.getElementById("drinks_list");
    var drinkContent;
    getAllRecipes.then(res => { return res.json() })
        .then(body => {
            /*items = JSON.stringify(body)*/
            console.log(body);
            
            for (let item of body) {

                drinkContent += `<div class="drink" style=" background-image: linear-gradient(to bottom,  rgba(67, 67, 73, 0.562) , ${item.backgroundColor}" >
                <div class="drink_img"  >
                <img src="images/drinks-images/${item.imageUrl}">
                </div>
                <div class="drink_text" >
                <h2>${item.name}</h2>
                <div class="drink_description">
                <h3>Ingredientes:</h3>
                <ul class="ingredients">`
                for (let ingredientItem of item["recipeItems"]) {
                    drinkContent += `<li>${ingredientItem.ingredient.name}</li>`
                }
                    
                drinkContent +=`</ul></div></div></div>`;
            }
                a.innerHTML = drinkContent;
                console.log("drinkContent"+drinkContent);
            
        })
        .catch(err => { console.log(err) })
 



}