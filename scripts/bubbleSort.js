
// fonction pour enlever les accents, et carateres speciaux de la saisie et de la recherche
function pureString(string) {
    return string.toLowerCase().normalize('NFD').replace(new RegExp("[^(a-zA-Z)]", "g"), '')
}

const recipesSection = document.querySelector("main")
const searchBar = document.querySelector("#searchBar")


let arrayOfFilters = [listeIngredients, listeAppareils, listeUstensiles]


// on tri tous les elements par ordre alphabatique maintenent 

let orderedRecipes = []
for (let i = 0 ; i < recipes.length ; i++) {
    orderedRecipes.push(recipes[i])
}
orderedRecipes = orderRecipes(orderedRecipes)



function fillOrderedArrays(arrayToFill, model) {
    arrayToFill = []
    for (let i = 0 ; i < model.length ; i++) {
        arrayToFill.push(model[i])
    }

    arrayToFill = order(arrayToFill)
    return arrayToFill
}

let orderedIngredients = []
orderedIngredients = fillOrderedArrays(orderedIngredients, listeIngredients)
let orderedAppareils = []
orderedAppareils = fillOrderedArrays(orderedAppareils, listeAppareils)
let orderedUstensiles = []
orderedUstensiles = fillOrderedArrays(orderedUstensiles, listeUstensiles)

let arrayOfOrderedFilters = [orderedIngredients, orderedAppareils, orderedUstensiles]




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
let recipesToDisplay = orderedRecipes

let ingredientsToDisplay = listeIngredients
let applianceToDisplay = listeAppareils
let ustensilesToDisplay = listeUstensiles

let arrayOfFiltersToDisplay = [ingredientsToDisplay, applianceToDisplay, ustensilesToDisplay]






// affiche tous les elements

function displayAllElements() {
     // on efface tout
     recipesSection.innerHTML = ""
     for (let i = 0 ; i < listOfCheckboxes.length ; i++) {
         listOfCheckboxes[i].innerHTML = ""
     }    

    //  on affiche tout
    displayData(recipes)
    for (let i = 0 ; i < arrayOfFilters.length ; i++) {
        createListOfCheckboxes(arrayOfFilters[i], i)
    }
    createAndDeleteFilters()
}



// affiche les elements apres les avoir filtré

function displayFilteredElements() {
    // on efface tout
    recipesSection.innerHTML = ""
    for (let i = 0 ; i < listOfCheckboxes.length ; i++) {
        listOfCheckboxes[i].innerHTML = ""
    }   

    
   
    // on filtre les tableaux de tags par rapport aux recettes affichées
    applianceToDisplay = filterAppliances(recipesToDisplay)
    ingredientsToDisplay = filterIngredients(recipesToDisplay)
    ustensilesToDisplay = filterUstensils(recipesToDisplay)


    // on les met à jour
    arrayOfFiltersToDisplay = [ingredientsToDisplay, applianceToDisplay, ustensilesToDisplay]

    // on les affiche
    if (recipesToDisplay.length > 0) {
        displayData(recipesToDisplay)
    } else {
        let message = document.createElement("div")
        message.classList.add("message")
        message.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc."
        recipesSection.appendChild(message)
    }


    for (let i = 0 ; i < arrayOfFiltersToDisplay.length ; i++) {
        if (arrayOfFiltersToDisplay[i].length > 0) {
            createListOfCheckboxes(arrayOfFiltersToDisplay[i], i)
            messageListe[i].classList.remove("block")
            
        } else {
            messageListe[i].classList.add("block")
        }
    }

    createAndDeleteFilters()


    for (let i = 0 ; i < listOfIngAppUs.length ; i++) {
        listOfIngAppUs[i].addEventListener("click", function() {
            console.log("click element")
            filterListe(i)
            recipesToDisplay = filterRecipesTags(filterRecipesSearchBar(recipesToDisplay))
            displayFilteredElements()
        })
    }
} 


// filtre les recettes 
function filterRecipesSearchBar(currentOrderedRecipes) {
    let resultsArray = currentOrderedRecipes
  
    // via la barre de reherche (si on tape dans la barre de recherche une partie du nom, des ingredients, ou de la description, on garde)
     resultsArray = resultsArray.filter(element => pureString(element.name).includes(pureString(searchBar.value)) ||
                                                   pureString(element.description).includes(pureString(searchBar.value)) || 
                                                   element.ingredients.some(el => pureString(el.ingredient).includes(pureString(searchBar.value))))  

    return resultsArray   
}
    // via les tags (en fonction de la catégorie des tags, si une recette correspond, on garde)
  
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


// filtre les filtres proposés par rapport aux recettes deja affichées

function filterIngredients(recipesToDisplay) {
    let resultsIngredient = orderedIngredients.filter(ingredient => recipesToDisplay.some(recipe => recipe.ingredients.some(element => pureString(element.ingredient)  == pureString(ingredient))))

    for (let i = 0 ; i < listOfTags.length ; i++) {
        removeItemOnce(resultsIngredient, listOfTags[i].textContent)        
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












//  filtre de la barre de recherche principale : à l'input on affiche unqiquement les recettes contenant le terme saisi
//  puis, en fonction des recettes affichées on filtre les filtres à afficher (on supprime les filtres absents des recettes déjà affichées)

searchBar.addEventListener("input", function() {
    if (searchBar.value.length > 2 ) {
        if (listOfTags.length == 0) { 
         // on filtre les recettes à afficher par rapport aux données de recherche
        recipesToDisplay = filterRecipesSearchBar(orderedRecipes)
        displayFilteredElements()  
        } else if (listOfTags.length > 0){
        // on tri via la searchbar ce qui a deja ete trié via les tags
        recipesToDisplay = filterRecipesSearchBar(filterRecipesTags(recipesToDisplay))
        displayFilteredElements()
        }    
    } else {
        if (listOfTags.length > 0){
            recipesToDisplay = filterRecipesSearchBar(filterRecipesTags(recipesToDisplay))
            displayFilteredElements()
        } else {
            displayAllElements()
        }
    }
})




// ajout d'un event listener sur le declenchement de la création d'un filtre tag

for (let i = 0 ; i < listOfIngAppUs.length ; i++) {
    listOfIngAppUs[i].addEventListener("click", function() {
        recipesToDisplay = filterRecipesTags(recipesToDisplay)
        // filterListe(i)
        displayFilteredElements()
    })
}

// for (let i = 0 ; i < deleteTags.length ; i++) {
//     deleteTags[i].addEventListener("click", function() {
//         recipesToDisplay = filterRecipesTags(orderedRecipes)
//         displayFilteredElements()
//     })
// }

 
// fonction de filtre pour la saisie dans l'input des boutons de filtre
// rappel
// createListOfCheckboxes (listeName, triFormNumber)

for (let i = 0 ; i < inputButtons.length ; i++ ) {
    inputButtons[i].addEventListener("input", function(e) {
        e.preventDefault()

        listOfCheckboxes[i].innerHTML = ""
        filterListe(i)

       

        if (inputButtons[i].value.length){
           
            // si le bouton de saisie est ouvert, on block la div of checkboxes
            if (inputButtons[i].classList.contains("boutonOuvert")) {
                divOfCheckboxes[i].classList.add("block")
            }

        } else {
            createListOfCheckboxes (arrayOfFiltersToDisplay[i], i)
            openChevron[i].classList.remove("rotate")
        }
// voir ou mettre cette fonction pour que ça marche correctement changer listofingappus remplacer par list d'elements triés
        for (let j = 0 ; j < listOfIngAppUs.length ; j++) {
            listOfIngAppUs[j].addEventListener("click", function() {
                console.log(j)
                filterListe(j)
                console.log("click element")
                recipesToDisplay = filterRecipesTags(recipesToDisplay)
                displayFilteredElements()
            })
        }
    })

}

function filterListe(i) {
    
    let resultsArray = arrayOfFiltersToDisplay[i].filter(element => pureString(element).includes(pureString(inputButtons[i].value)))
    createListOfCheckboxes (resultsArray, i)
    
    if (resultsArray.length) {
        messageListe[i].classList.remove("block")
        console.log(resultsArray[0])
        createAndDeleteFilters()
    } else {
        messageListe[i].classList.add("block")   
    }
    
    

}


// création du message "Aucun reusltat" integré dans les listes d'elements si celles ci sont vides

for (let i = 0 ; i < divOfCheckboxes.length ; i++ ) {
    let messageListe = document.createElement("div")
    messageListe.classList.add("messageListe")
    messageListe.classList.add("none")

    messageListe.textContent = "Aucun resultat.."
    divOfCheckboxes[i].appendChild(messageListe)
}

let messageListe = document.querySelectorAll(".messageListe")


