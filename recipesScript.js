window.onload = function () {
    var items;
    const getAllRecipes = fetch("http://localhost:8080/recipe/all");
    var a = window.document.getElementById("receitasTableBody");
    var drinkContent = "";
    getAllRecipes.then(res => { return res.json() })
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
                    drinkContent += `<li>${ingredientItem.quant+" "+ingredientItem.quantType+" de "+ingredientItem.ingredient.name}</li>`;
                }
                    
                drinkContent +=`</ul><td></tr>`;
            }
                a.innerHTML = drinkContent;
                console.log("drinkContent: "+drinkContent+ "lll");
            
        })
        .catch(err => { console.log(err) })
 



}