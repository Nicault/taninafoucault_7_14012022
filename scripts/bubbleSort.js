
// fonction pour enlever les accents, et carateres speciaux de la saisie et de la recherche
function pureString(string) {
    return string.toLowerCase().normalize('NFD').replace(new RegExp("[^(a-zA-Z)]", "g"), '')
}

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



// for (let i = 0 ; i < arrayOfFiltersToDisplay.length ; i++) { // si il y a des element dans les differents tableaux d'ing app ou us, on les affiche et on masque le message d'erreur
//     if (arrayOfFiltersToDisplay[i].length > 0) {
//         createListOfCheckboxes(arrayOfFiltersToDisplay[i], i)
//         messageListe[i].classList.remove("block")
        
//     } else { // si non on affiche le message d'erreur
//         messageListe[i].classList.add("block")
//     }
// }


// fonction qui permet d'afficher tous les elements (aucun filtre)

function displayAllElements() {
    // on efface tout 
    recipesSection.innerHTML = "" //la section recettes
    for (let i = 0 ; i < listOfCheckboxes.length ; i++) { // et les tableaux de filtres
        listOfCheckboxes[i].innerHTML = ""
    }    
    // listOfIngAppUs = [] //et on réinitialise la liste des filtres qu'on vient d'effacer car on la rerempli à chaque fois
    clickableIng = []
    clickableApp = []
    clickableUs = []

    listOfIngAppUs = [clickableIng, clickableApp, clickableUs]
   //  on affiche tout
   displayData(recipes) //on display les données initiales des recettes
   for (let i = 0 ; i < arrayOfFilters.length ; i++) { // et des filtres
       createListOfCheckboxes(arrayOfFilters[i], i) // on crée les listes on rempli listOfIngAppUs
   }
   createAndDeleteFilters(0, triElement.length)
 // on active la création des tags sur les nouvelles listes
}



// affiche les elements apres les avoir filtré

function displayFilteredElements() {
   // on efface tout
   recipesSection.innerHTML = ""
   for (let i = 0 ; i < listOfCheckboxes.length ; i++) {
       listOfCheckboxes[i].innerHTML = ""
   } 
//    listOfIngAppUs = [] // important

    clickableIng = []
    clickableApp = []
    clickableUs = []

    listOfIngAppUs = [clickableIng, clickableApp, clickableUs]
  
   // on filtre les tableaux de tags par rapport à recipesToDisplay : on ne garde que les ingredients, appareils et ustensiles présents dans la liste
   applianceToDisplay = filterAppliances(recipesToDisplay)
   ingredientsToDisplay = filterIngredients(recipesToDisplay)
   ustensilesToDisplay = filterUstensils(recipesToDisplay)

   // on met à jour le tableau avec les nouvelles listes
   arrayOfFiltersToDisplay = [ingredientsToDisplay, applianceToDisplay, ustensilesToDisplay]
   
   

   // on affiche les recettes
   if (recipesToDisplay.length > 0) { // si il y a des element dans le tableau recipesToDisplay, on les affiche
       displayData(recipesToDisplay)
   } else { //si non on affiche le message d'erreur
       let message = document.createElement("div")
       message.classList.add("message")
       message.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc."
       recipesSection.appendChild(message)
   }

   // on créé les listes de filtres
   for (let i = 0 ; i < arrayOfFiltersToDisplay.length ; i++) { // si il y a des element dans les differents tableaux d'ing app ou us, on les affiche et on masque le message d'erreur
       if (arrayOfFiltersToDisplay[i].length > 0) {
           createListOfCheckboxes(arrayOfFiltersToDisplay[i], i)
           messageListe[i].classList.remove("block")
           
       } else { // si non on affiche le message d'erreur
           messageListe[i].classList.add("block")
       }
   }

   createAndDeleteFilters(0, triElement.length)
 // on active la création des tags sur les nouvelles listes
   displayOnClick() // et on reactive la fonction qui affiche a click car les elemnts ont été supprimés et recréés
} 














// premier declenchement de tri : à l'input dans la search bar
function displayOnSearchbar() {
    searchBar.addEventListener("input", function(e) { // à l'input
        e.preventDefault()
        if (listOfTags.length > 0){ // si il y a des tags, on tri les recettes par rapport aux tags
            recipesToDisplay = filterRecipesTags(orderedRecipes)
            if (searchBar.value.length > 2 ) { // si au moins 3 caracteres on retri les recipesToDisplay par rapport à la saisie dans la barre de recherche puis on affiche
                recipesToDisplay = filterRecipesSearchBar(recipesToDisplay)
                displayFilteredElements()
            } else { // si non on affiche directement les recette triés par rapport au tags
                displayFilteredElements()
            }
        } else if (listOfTags.length == 0) { // si pas de tags
            if (searchBar.value.length > 2 ) { // si au moins 3 caracteres on tri les recipesToDisplay par rapport à la saisie dans la barre de recherche puis on affiche
                recipesToDisplay = filterRecipesSearchBar(orderedRecipes)
                displayFilteredElements()
            } else { // si non on affiche tout
                displayAllElements()
            }
        }

    })
    
}

displayOnSearchbar()





// deuxieme declenchement de tri : à la création d'un filtre (quand on clique sur un element de la liste)
// pas besoin ici de retrancher avec le tri de la barre de recherche car il y a deja eu un premier tri
// les elements qui sont affichés sont uniquement ceux qui correspondent aux recettes affichées
function displayOnClick() {
    for (let i = 0 ; i < listOfIngAppUs.length ; i++) {
        listOfIngAppUs[i].forEach(element => {
            element.addEventListener("click", function(e) {
                addEventToTag(e)
            })
        })
    }

}

displayOnClick()


function addEventToTag(e) {
    e.preventDefault()
    recipesToDisplay = filterRecipesTags(recipesToDisplay)
    displayFilteredElements()

}



// troisiement declenchement de tri : à la saisie dans l'input des boutons de filtre
// ATTENTION  ce filtre est differents des autres car il ne filtre PAS les recettes mais uniquement les liste d'ing app us

function displayInput() {
    for (let i = 0 ; i < inputButtons.length ; i++ ) { // à la saisie dans un des input button
        inputButtons[i].addEventListener("input", function(e) {
            e.preventDefault()
            listOfCheckboxes[i].innerHTML = ""
            // listOfIngAppUs = [] ça ne marche pas car si on efface tout ca ne recréera que les elemenet du tableau actif
            if (inputButtons[i].parentElement.classList.contains("blue")) {
                clickableIng = []
            } else if (inputButtons[i].parentElement.classList.contains("green")) {
                clickableApp = []
            } else {
                clickableUs = []
            }
            // console.log(listOfIngAppUs)
            listOfIngAppUs = [clickableIng, clickableApp, clickableUs]
            // console.log(listOfIngAppUs)
            
            let resultsArray = arrayOfFiltersToDisplay[i].filter(element => pureString(element).includes(pureString(inputButtons[i].value)))
            // console.log(resultsArray)
            
            if (resultsArray.length) { 
                createListOfCheckboxes(resultsArray, i)
                createAndDeleteFilters(i, i+1) 
                                  
                messageListe[i].classList.remove("block")
                
            } else {
                messageListe[i].classList.add("block")   
            }
            // console.log(listOfIngAppUs[i])
                // listOfIngAppUs[i].forEach(element => {
                //     element.removeEventListener("click", addEventToTag)
                // })
            

            displayOnClick()
            displayOnSearchbar()
        })

    }
}

displayInput()







