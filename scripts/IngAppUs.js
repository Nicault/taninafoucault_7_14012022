// ellipsis à la dernière ponctuation

const recette = document.querySelectorAll(".recette")


for (let i = 0 ; i < recette.length ; i++ ) {
    let textBase = recette[i].textContent
    recette[i].textContent = ""
    textCutted = textBase.split("", 210)
    if (textCutted.length < 210) {
        recette[i].textContent = textCutted.join('')
    }
    else {
        let lastComma = textCutted.lastIndexOf(",")
        let lastPoint = textCutted.lastIndexOf(".")
        
        if (lastComma < lastPoint) {
            let newText = textCutted.slice(0, lastPoint +1)
            recette[i].textContent = newText.join('') + " ..."
        } else {
            let newText = textCutted.slice(0, lastComma +1)
            recette[i].textContent = newText.join('') + " ..."

        }
    }
}



//  créer et remplir les tableaux d'ingredients, appareil et ustensiles


let listeIngredients = [] 
let listeAppareils = []
let listeUstensiles = []


for (let recipe of recipes) {
    let ingredients = recipe.ingredients
    let ustensiles = recipe.ustensils

    //get ingredients
    for (let ing of ingredients){
        let newIng = ing.ingredient
        let ingredientToAdd = true

        fillList(listeIngredients, ingredientToAdd, newIng)
    }

    //get appareils
    let newApp = recipe.appliance
    let appareilToAdd = true
    
    
    fillList(listeAppareils, appareilToAdd, newApp)
    
    // get ustensiles
    for (let newUst of ustensiles){
        let ustensileToAdd = true
        
        fillList(listeUstensiles, ustensileToAdd, newUst)
    }


}


function fillList(listName, elementToAdd, newElement) {

    for (let i = 0 ; i < listName.length ; i++) {
        if (newElement.toLowerCase() == listName[i].toLowerCase()) {
            elementToAdd = false
            break
        }
    }

    if (elementToAdd) {
        listName.push(newElement)
    }
}


// ouverture des menus bouttons

const openButtons = document.querySelectorAll(".openButton")
const openChevron = document.querySelectorAll(".fa-chevron-down")
const inputButtons = document.querySelectorAll(".element")
const triForm = document.querySelectorAll(".tri")

const ingButton = document.querySelector("#ingButton")
const appButton = document.querySelector("#appButton")
const ustButton = document.querySelector("#ustButton")

for (let i = 0 ; i < openButtons.length ; i++) {
    openButtons[i].addEventListener("click", function(e) {
        e.preventDefault()
        openChevron[i].classList.toggle("rotate")
        triForm[i].classList.toggle("boutonOuvert")
    })
}


