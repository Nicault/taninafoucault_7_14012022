function recipeFactory(data) {
    const { id, name, servings, ingredients, ingredient, quantity, unit, time, description, appliance, ustensils } = data

    function getRecipeCardDOM() {

        const article = document.createElement("article")
        const a = document.createElement("a")
        a.href = "#"

        const img = document.createElement("img")
        img.setAttribute("src", "img/img.png")
        img.setAttribute("alt", "Apperçu du plat")

        const txt = document.createElement("div")
        txt.classList.add("txt")

        const header = document.createElement("div")
        header.classList.add("header")

        const nom = document.createElement("h2")
        nom.textContent = name
        nom.classList.add("nom")

        const temps = document.createElement("div")
        temps.innerHTML = "<i class='far fa-clock'></i>" + " " + time + " min"
        temps.classList.add("temps")

        const content = document.createElement("div")
        content.classList.add("content")

        const ingredientsListe = document.createElement("ul")
        ingredientsListe.classList.add("ingredientsListe")


        createIngredientList(ingredients, ingredientsListe)
            

        // ingredientsListe.textContent = ingredients


        const recette = document.createElement("div")
        recette.classList.add("recette")
        recette.textContent = description

        article.appendChild(a)
        a.appendChild(img)
        a.appendChild(txt)
        txt.appendChild(header)
        header.appendChild(nom)
        header.appendChild(temps)
        txt.appendChild(content)
        content.appendChild(ingredientsListe)
        content.appendChild(recette)

        return (article)
            
    }
    
    return { id, name, servings, ingredients, ingredient, quantity, unit, time, description, appliance, ustensils, getRecipeCardDOM }
}

async function getRecipes() {    
    return ({recipes})
}
// async function getIngredients() {    
//     return ({ingredients})
// }


async function displayData(recipes) {
    const recipesSection = document.querySelector("main")

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM()
        recipesSection.appendChild(recipeCardDOM);
    })
}

async function init() {
    const { recipes } = await getRecipes()
    displayData(recipes)
    // const { ingredients } = await getIngredients()
    // displayData(ingredients)
}

init()

function createIngredientList(ingredients, ingredientsListe) {
    for (let i = 0 ; i < ingredients.length ; i++) {
        let ingredientLi = document.createElement("li")
        ingredientLi.classList.add("ingredientLi")

        if (ingredients[i].ingredient && ingredients[i].quantity && ingredients[i].unit) {
            ingredientLi.innerHTML = "<span class='ingredientNom'>" + ingredients[i].ingredient + ": </span>" 
                                        + ingredients[i].quantity + " " 
                                        + ingredients[i].unit.replace('grammes', 'g')
        } else if (ingredients[i].ingredient && ingredients[i].quantity && !ingredients[i].unit){
            ingredientLi.innerHTML = "<span class='ingredientNom'>" + ingredients[i].ingredient + ": </span>" 
                                        + ingredients[i].quantity
        } else if (ingredients[i].ingredient && !ingredients[i].quantity && !ingredients[i].unit){
            ingredientLi.innerHTML = "<span class='ingredientNom'>" + ingredients[i].ingredient + "</span>"
        }
        ingredientsListe.appendChild(ingredientLi)
    }
}



