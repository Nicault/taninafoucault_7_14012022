
const recipesSection = document.querySelector("main")
const searchBar = document.querySelector("#searchBar")


let arrayOfFilters = [listeIngredients, listeAppareils, listeUstensiles]


// on tri tous les elements par ordre alphabatique puis on les ajoute dans un nouveau tableau
// qui regroupera les elements triés != des listes de bases qui ne sont pas triées 

let orderedRecipes = [] //tableau de recettes ordonnées AZ
for (let i = 0 ; i < recipes.length ; i++) {
    orderedRecipes.push(recipes[i])
}
orderedRecipes = orderRecipes(orderedRecipes)


// fonction qui permet de dupliquer les listes
function fillOrderedArrays(arrayToFill, model) {
    arrayToFill = []
    for (let i = 0 ; i < model.length ; i++) {
        arrayToFill.push(model[i])
    }

    arrayToFill = order(arrayToFill)
    return arrayToFill
}

let orderedIngredients = [] //tableau d'ingredients ordonnés AZ
orderedIngredients = fillOrderedArrays(orderedIngredients, listeIngredients)
let orderedAppareils = [] //tableau d'appareils ordonnés AZ
orderedAppareils = fillOrderedArrays(orderedAppareils, listeAppareils)
let orderedUstensiles = [] //tableau d'ustensiles ordonnés AZ
orderedUstensiles = fillOrderedArrays(orderedUstensiles, listeUstensiles)

let arrayOfOrderedFilters = [orderedIngredients, orderedAppareils, orderedUstensiles] // tableau regroupant les listes ordonées afin d'y acceder via une boucle



// fonctions qui permettent de trier les listes qui ont été dupliquées
function orderRecipes(data) {
    let orderedData = data.sort((a,b) => {
        if (pureString(a.name) < pureString(b.name)) {
            return -1

        } else if (pureString(a.name) > pureString(b.name)) {
            return 1

        } else {
            return 0
        }
    })
    return orderedData
}

function order(data) {
    let orderedData = data.sort((a,b) => {
        if (pureString(a) < pureString(b)) {
            return -1

        } else if (pureString(a) > pureString(b)) {
            return 1

        } else {
            return 0
        }
    })
    return orderedData
}



// on crée les variables de tableaux triés
// "element"ToDisplay sera amené à evoluer, on supprimera des elements au fur et à mesure des filtres
// tandis que ordered"Element" sera toujours le même
let recipesToDisplay = orderedRecipes

let ingredientsToDisplay = orderedIngredients
let applianceToDisplay = orderedAppareils
let ustensilesToDisplay = orderedUstensiles

let arrayOfFiltersToDisplay = [ingredientsToDisplay, applianceToDisplay, ustensilesToDisplay]




// filtre les filtres proposés par rapport aux recettes deja affichées
// ici on filtre les liste d'ingredients, appareils et ustensiles par rapport aux recette qui on été diplayed
// on filtrera les tableaux apliance, ingredients et ustensiles To Display pour qu'ils n'affichent
// que les elements présents dans recipesToDisplay (la liste mise en parametre)

// on base le filtre sur ordered"Element" pour que le filtre soit effectif à l'ajout d'un nouveau filtre mais aussi à la suppression
// voir si on peut modifer ça (pas sur qu'on utlise cette fonction dans l'autre sens donc peut etre
// remplacer orderedMachin par resultsMachin)


function filterIngredients(recipesToDisplay) {
    let resultsIngredient = orderedIngredients.filter(ingredient => recipesToDisplay.some(recipe => recipe.ingredients.some(element => pureString(element.ingredient) == pureString(ingredient))))

    for (let i = 0 ; i < listOfTags.length ; i++) {
        removeItemOnce(resultsIngredient, listOfTags[i].textContent)
        // ici on supprime l'element sur lequel on a cliqué de la liste, pour ne pas faire de doublon avec le tag crée
    }

    return resultsIngredient
}

function filterAppliances(recipesToDisplay) {
    let resultsAppareils = orderedAppareils.filter(appareil => recipesToDisplay.some(element => pureString(element.appliance) == pureString(appareil)))

    for (let i = 0 ; i < listOfTags.length ; i++) {
        removeItemOnce(resultsAppareils, listOfTags[i].textContent)        
    }

    return resultsAppareils
}

function filterUstensils(recipesToDisplay) {
    let resultsUstensils = orderedUstensiles.filter(ustensil => recipesToDisplay.some(recipe => recipe.ustensils.some(element => pureString(element) == pureString(ustensil))))

    for (let i = 0 ; i < listOfTags.length ; i++) {
        removeItemOnce(resultsUstensils, listOfTags[i].textContent)        
    }

    return resultsUstensils
}

// filtre les recettes via searchbar

function filterRecipesSearchBar(currentOrderedRecipes) {
    let resultsArray = currentOrderedRecipes
  
    // via la barre de reherche (si on tape dans la barre de recherche une partie du nom, des ingredients, ou de la description, on garde)
     resultsArray = resultsArray.filter(element => pureString(element.name).includes(pureString(searchBar.value)) ||
                                                   pureString(element.description).includes(pureString(searchBar.value)) || 
                                                   element.ingredients.some(el => pureString(el.ingredient).includes(pureString(searchBar.value))))  

    return resultsArray   
}

// filtre les recettes via les tags (en fonction de la catégorie des tags, si une recette correspond, on garde)
  
function filterRecipesTags(currentOrderedRecipes) {
    let resultsArray = currentOrderedRecipes

    for (let i = 0 ; i < listOfTags.length ; i++) {
        if (listOfTags[i].classList.contains("blue")) {
            resultsArray = resultsArray.filter(element => element.ingredients.some(el => pureString(el.ingredient).includes(pureString(listOfTags[i].textContent))))
        } else if (listOfTags[i].classList.contains("green")) {
            resultsArray = resultsArray.filter(element => pureString(element.appliance).includes(pureString(listOfTags[i].textContent)))
        } else if (listOfTags[i].classList.contains("red")){
            resultsArray = resultsArray.filter(element => element.ustensils.some(ele => pureString(ele).includes(pureString(listOfTags[i].textContent))))
        }

    } 

    return resultsArray   
}


// filtre les listes par rapport à l'input
function filterInputs(i) { 
    let resultsArray = arrayOfFiltersToDisplay[i] 
    console.log(resultsArray)      
    resultsArray = resultsArray.filter(element => pureString(element).includes(pureString(inputButtons[i].value)))
    console.log(resultsArray)      

    return resultsArray
}

