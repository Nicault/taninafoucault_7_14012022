








for (let i = 0 ; i < arrayOfFiltersToDisplay.length ; i++) { // si il y a des element dans les differents tableaux d'ing app ou us, on les affiche et on masque le message d'erreur
    if (arrayOfFiltersToDisplay[i].length > 0) {
        createListOfCheckboxes(arrayOfFiltersToDisplay[i], i)
        messageListe[i].classList.remove("block")
        
    } else { // si non on affiche le message d'erreur
        messageListe[i].classList.add("block")
    }
}




// fonction qui permet d'afficher tous les elements (aucun filtre)

// function displayAllElements() {
//     console.log("all")

//     // on efface tout 
//     recipesSection.innerHTML = "" //la section recettes
//     for (let i = 0 ; i < listOfCheckboxes.length ; i++) { // et les tableaux de filtres
//         listOfCheckboxes[i].innerHTML = ""
//     }    
//     // listOfIngAppUs = [] //et on réinitialise la liste des filtres qu'on vient d'effacer car on la rerempli à chaque fois
//     clickableIng = []
//     clickableApp = []
//     clickableUs = []

//     listOfIngAppUs = [clickableIng, clickableApp, clickableUs]
//    //  on affiche tout
//    displayData(recipes) //on display les données initiales des recettes

//    arrayOfFiltersToDisplay = arrayOfOrderedFilters 
//    for (let i = 0 ; i < inputButtons.length ; i++) { // et des filtres
//         if (inputButtons[i].value) {
//             createListOfCheckboxes(filterInputs(i), i)
//         } else {
//             createListOfCheckboxes(arrayOfFiltersToDisplay[i], i) // on crée les listes on rempli listOfIngAppUs
//         }
//    }
//    createAndDeleteFilters(0, triElement.length)
//  // on active la création des tags sur les nouvelles listes
//  displayOnClick()
// }





// function displayFilteredElements() {
//     console.log("fil")
//     // on efface tout
//     recipesSection.innerHTML = ""
//     for (let i = 0 ; i < listOfCheckboxes.length ; i++) {
//         listOfCheckboxes[i].innerHTML = ""
//     } 
 
//      clickableIng = []// important de vider les tableaux
//      clickableApp = []
//      clickableUs = []
 
//      listOfIngAppUs = [clickableIng, clickableApp, clickableUs]
   
//     // on filtre les tableaux de tags par rapport à recipesToDisplay : on ne garde que les ingredients, appareils et ustensiles présents dans la liste
//     applianceToDisplay = filterAppliances(recipesToDisplay)
//     ingredientsToDisplay = filterIngredients(recipesToDisplay)
//     ustensilesToDisplay = filterUstensils(recipesToDisplay)
 
//     // on met à jour le tableau avec les nouvelles listes
//     arrayOfFiltersToDisplay = [ingredientsToDisplay, applianceToDisplay, ustensilesToDisplay]
    
    
 
//     // on affiche les recettes
//     if (recipesToDisplay.length > 0) { // si il y a des element dans le tableau recipesToDisplay, on les affiche
//         displayData(recipesToDisplay)
//     } else { //si non on affiche le message d'erreur
//         let message = document.createElement("div")
//         message.classList.add("message")
//         message.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc."
//         recipesSection.appendChild(message)
//     }
 
//     // on créé les listes de filtres
//     for (let i = 0 ; i < inputButtons.length ; i++) { // si il y a des element dans les differents tableaux d'ing app ou us, on les affiche et on masque le message d'erreur
//         if (inputButtons[i].value) {
//             // console.log("avant" + arrayOfFiltersToDisplay[i])
//             arrayOfFiltersToDisplay[i] = filterInputs(i)
//             // console.log("apres" + arrayOfFiltersToDisplay[i])
            
//         }       
//     }

//     arrayOfFiltersToDisplay = [ingredientsToDisplay, applianceToDisplay, ustensilesToDisplay]

//     for (let i = 0 ; i < inputButtons.length ; i++) { // et des filtres
//         createListOfCheckboxes(arrayOfFiltersToDisplay[i], i) // on crée les listes on rempli listOfIngAppUs
//     }
   
 
//     createAndDeleteFilters(0, triElement.length)
//   // on active la création des tags sur les nouvelles listes
//     displayOnClick() // et on reactive la fonction qui affiche a click car les elemnts ont été supprimés et recréés

//  } 






function displayFilteredElements() {
    console.log("fil")
    // on efface tout
    recipesSection.innerHTML = ""
    for (let i = 0 ; i < listOfCheckboxes.length ; i++) {
        listOfCheckboxes[i].innerHTML = ""
    } 
 
     clickableIng = []// important de vider les tableaux
     clickableApp = []
     clickableUs = []
 
     listOfIngAppUs = [clickableIng, clickableApp, clickableUs]

     if (listOfTags.length || searchBar.value.length > 2){// si quelquechose à trier (tag ou searchbar)

        recipesToDisplay = filterRecipesTags(filterRecipesSearchBar(orderedRecipes))//on tri

        applianceToDisplay = filterAppliances(recipesToDisplay)// et on met à jour les listes
        ingredientsToDisplay = filterIngredients(recipesToDisplay)
        ustensilesToDisplay = filterUstensils(recipesToDisplay)
        arrayOfFiltersToDisplay = [ingredientsToDisplay, applianceToDisplay, ustensilesToDisplay]     
    } else { // si non on affiche tout
        recipesToDisplay = recipes
        arrayOfFiltersToDisplay = arrayOfOrderedFilters 
    }

    // on affiche les recettes
    if (recipesToDisplay.length > 0) { // si il y a des element dans le tableau recipesToDisplay, on les affiche
        displayData(recipesToDisplay)
    } else { //si non on affiche le message d'erreur
        let message = document.createElement("div")
        message.classList.add("message")
        message.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc."
        recipesSection.appendChild(message)
    }

    for (let i = 0 ; i < inputButtons.length ; i++) { // et des filtres
        if (inputButtons[i].value) {
                createListOfCheckboxes(filterInputs(i), i)
            } else {
                createListOfCheckboxes(arrayOfFiltersToDisplay[i], i) // on crée les listes on rempli listOfIngAppUs
        }
    }
    
    createAndDeleteFilters(0, triElement.length)   
    displayOnClick() 

 } 









// premier declenchement de tri : à l'input dans la search bar
function displayOnSearchbar() {
    searchBar.addEventListener("input", function(e) { // à l'input
        e.preventDefault()
        displayFilteredElements()
        
        for (let i = 0 ; i < divOfCheckboxes.length ; i++) {
            if (listOfIngAppUs[i].length == 0) {
                messageListe[i].classList.add("block")
            } else {
                messageListe[i].classList.remove("block")   
            }
        }           
        // displayOnClick()

    })
    
}

// function displayOnSearchbar() {
//     searchBar.addEventListener("input", function(e) { // à l'input
//         e.preventDefault()
//         if (listOfTags.length > 0){ // si il y a des tags, on tri les recettes par rapport aux tags
//             recipesToDisplay = filterRecipesTags(orderedRecipes)
//             if (searchBar.value.length > 2 ) { // si au moins 3 caracteres on retri les recipesToDisplay par rapport à la saisie dans la barre de recherche puis on affiche
//                 recipesToDisplay = filterRecipesSearchBar(recipesToDisplay)
//                 displayFilteredElements()
//             } else { // si non on affiche directement les recette triés par rapport au tags
//                 displayFilteredElements()
//             }
//         } else if (listOfTags.length == 0) { // si pas de tags
//             if (searchBar.value.length > 2 ) { // si au moins 3 caracteres on tri les recipesToDisplay par rapport à la saisie dans la barre de recherche puis on affiche
//                 recipesToDisplay = filterRecipesSearchBar(orderedRecipes)
//                 displayFilteredElements()
//             } else { // si non on affiche tout
//                 displayAllElements()
//             }
//         }
//         displayOnClick()

//     })
    
// }

displayOnSearchbar()





// deuxieme declenchement de tri : à la création d'un filtre (quand on clique sur un element de la liste)
// pas besoin ici de retrancher avec le tri de la barre de recherche car il y a deja eu un premier tri
// les elements qui sont affichés sont uniquement ceux qui correspondent aux recettes affichées
function displayOnClick() {
    for (let i = 0 ; i < listOfIngAppUs.length ; i++) {
        listOfIngAppUs[i].forEach(element => {
            element.addEventListener("click", function(e) {
                e.preventDefault()
                // recipesToDisplay = filterRecipesTags(recipesToDisplay)
                displayFilteredElements()
            })
        })
        if (listOfIngAppUs[i].length == 0) {
            messageListe[i].classList.add("block")
        } else {
            messageListe[i].classList.remove("block")   
        }
    }

}

displayOnClick()





// troisiement declenchement de tri : à la saisie dans l'input des boutons de filtre
// ATTENTION  ce filtre est differents des autres car il ne filtre PAS les recettes mais uniquement les liste d'ing app us


for (let i = 0 ; i < inputButtons.length ; i++ ) { // à la saisie dans un des input button
    inputButtons[i].addEventListener("input", function(e) {
        e.preventDefault()
        console.log("input")
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
        
        let elementToDisplay = filterInputs(i)
        if (elementToDisplay.length) { 
            createListOfCheckboxes(elementToDisplay, i)
            createAndDeleteFilters(i, i+1)            
            messageListe[i].classList.remove("block")
        } else {
            messageListe[i].classList.add("block")   
        }
        displayOnClick()
        displayOnSearchbar()
    })
}



