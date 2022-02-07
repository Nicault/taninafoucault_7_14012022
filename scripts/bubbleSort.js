
// fonction pour enlever les accents, et carateres speciaux de la saisie et de la recherche
function pureString(string) {
    return string.toLowerCase().normalize('NFD').replace(new RegExp("[^(a-zA-Z)]", "g"), '')
}

const recipesSection = document.querySelector("main")
const searchBar = document.querySelector("#searchBar")


let arrayOfFilters = [listeIngredients, listeAppareils, listeUstensiles]

// on tri les elements maintenent ou apres ? plutot apres non ? à voir...
let orderedRecipes = orderRecipes(recipes)
let orderedIngredients = order(listeIngredients)
let orderedAppareils = order(listeAppareils)
let orderedUstensiles = order(listeUstensiles)




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
let recipesToDisplay = recipes
// let resultsArray = recipesToDisplay

let ingredientsToDisplay = listeIngredients
let applianceToDisplay = listeAppareils
let ustensilesToDisplay = listeUstensiles

let arrayOfFiltersToDisplay = [ingredientsToDisplay, applianceToDisplay, ustensilesToDisplay]
let arrayOfOrderedFilters = [orderedIngredients, orderedAppareils, orderedUstensiles]






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
    displayData(recipesToDisplay)

    for (let i = 0 ; i < arrayOfFiltersToDisplay.length ; i++) {
        createListOfCheckboxes(arrayOfFiltersToDisplay[i], i)
    }

    createAndDeleteFilters()

    for (let i = 0 ; i < listOfIngAppUs.length ; i++) {
        listOfIngAppUs[i].addEventListener("click", function() {
            console.log("coco")
            recipesToDisplay = filterRecipesTags(recipesToDisplay)
            displayFilteredElements()
        })
    }

    for (let i = 0 ; i < deleteTags.length ; i++) {
        deleteTags[i].addEventListener("click", function() {
            recipesToDisplay = orderedRecipes
            displayFilteredElements()
        })
    }

    // listOfTags = document.querySelectorAll(".newFiltre")
    // console.log(listOfTags)
    // deleteTags = document.querySelectorAll(".deleteFiltre")
    // triElement = document.querySelectorAll(".listOfCheckboxes li")
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
    // newFiltre = document.querySelectorAll(".newFiltre")
    // console.log(newFiltre.length)
function filterRecipesTags(currentOrderedRecipes) {
    let resultsArray = currentOrderedRecipes
    for (let i = 0 ; i < listOfTags.length ; i++) {

        if (listOfTags[i].classList.contains("blue")) {
            resultsArray = currentOrderedRecipes.filter(element => element.ingredients.some(el => pureString(el.ingredient).includes(pureString(listOfTags[i].textContent))))
        }else if (listOfTags[i].classList.contains("green")) {
            resultsArray = currentOrderedRecipes.filter(element => pureString(element.appliance).includes(pureString(listOfTags[i].textContent)))
        } else if (listOfTags[i].classList.contains("red")){
            resultsArray = currentOrderedRecipes.filter(element => element.ustensils.some(ele => pureString(ele).includes(pureString(listOfTags[i].textContent))))
        }
    } 

    return resultsArray   
}


// filtre les filtres proposés par rapport aux recettes deja affichées

function filterIngredients(recipesToDisplay) {
    let resultsIngredient = orderedIngredients.filter(ingredient => recipesToDisplay.some(recipe => recipe.ingredients.some(element => pureString(element.ingredient)  == pureString(ingredient))))

    return resultsIngredient
}

function filterAppliances(recipesToDisplay) {
    let resultsAppareils = orderedAppareils.filter(appareil => recipesToDisplay.some(element => pureString(element.appliance) == pureString(appareil)))

    return resultsAppareils
}

function filterUstensils(recipesToDisplay) {
    let resultsUstensils = orderedUstensiles.filter(ustensil => recipesToDisplay.some(recipe => recipe.ustensils.some(element => pureString(element) == pureString(ustensil))))

    return resultsUstensils
}












//  filtre de la barre de recherche principale : à l'input on affiche unqiquement les recettes contenant le terme saisi
//  puis, en fonction des recettes affichées on filtre les filtres à afficher (on supprime les filtres absents des recettes déjà affichées)

searchBar.addEventListener("input", function() {
    console.log("input")
    if (searchBar.value.length > 2) {
         // on filtre les recettes à afficher par rapport aux données de recherche
        recipesToDisplay = filterRecipesSearchBar(recipesToDisplay)
        displayFilteredElements()    

    } else {
        displayAllElements()
    }
})

// ajout d'un event listener sur le declenchement de la création d'un filtre tag

for (let i = 0 ; i < listOfIngAppUs.length ; i++) {
    listOfIngAppUs[i].addEventListener("click", function() {
        console.log("coco")
        recipesToDisplay = filterRecipesTags(recipesToDisplay)
        displayFilteredElements()
    })
}

for (let i = 0 ; i < deleteTags.length ; i++) {
    deleteTags[i].addEventListener("click", function() {
        displayFilteredElements()
    })
}

 

// rappel
// createListOfCheckboxes (listeName, triFormNumber)
// createCheckboxes(i, listeName, triFormNumber)

for (let i = 0 ; i < inputButtons.length ; i++ ) {
    inputButtons[i].addEventListener("input", function(e) {
        e.preventDefault()

        // oneButtonAtATime()
        if (!inputButtons[i].value.length) {
            listOfCheckboxes[i].innerHTML = ""
            filterListe(i)
            
        } else if (inputButtons[i].value.length){
            listOfCheckboxes[i].innerHTML = ""
            filterListe(i)

            // si le bouton de saisie est ouvert, on block la div of checkboxes
            if (inputButtons[i].classList.contains("boutonOuvert")) {
                divOfCheckboxes[i].classList.add("block")
            }

        } else {
            createListOfCheckboxes (arrayOfOrderedFilters[i], i)
          
            openChevron[i].classList.remove("rotate")
        }
    })

}

function filterListe(i) {
    let resultsArray = arrayOfOrderedFilters[i].filter(element => pureString(element).includes(pureString(inputButtons[i].value)))
    createListOfCheckboxes (resultsArray, i)
    createAndDeleteFilters()
}



for (let i = 0 ; i < inputButtons.length ; i++) {
    inputButtons[i].addEventListener("input", function() {

        if (inputButtons[i].classList.contains("inputWidth") && inputButtons[i].value.length >= 3) {
            divOfCheckboxes[i].classList.add("block")
            divOfCheckboxes[i].classList.add("inputWidth")
            inputButtons[i].classList.add("borderRadius")
            openChevron[i].classList.add("rotate")
  

        } else if (inputButtons[i].classList.contains("inputWidth") && inputButtons[i].value.length < 3) {
            divOfCheckboxes[i].classList.remove("block")
            divOfCheckboxes[i].classList.remove("inputWidth")
            inputButtons[i].classList.remove("borderRadius")
            openChevron[i].classList.remove("rotate")

        }
    })

}
