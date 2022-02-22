
function displayFilteredElements() {
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

    for (let i = 0 ; i < divOfCheckboxes.length ; i++) { //on ajoute ou on eleve le message d'erreur si pas de resultat dans la liste
        if (listOfIngAppUs[i].length == 0) {
            messageListe[i].classList.add("block")
        } else {
            messageListe[i].classList.remove("block")   
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
        // displayOnClick()

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
                e.preventDefault()
                // recipesToDisplay = filterRecipesTags(recipesToDisplay)
                displayFilteredElements()
            })
        })
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
        if (inputButtons[i].parentElement.classList.contains("blue")) {
            clickableIng = []
        } else if (inputButtons[i].parentElement.classList.contains("green")) {
            clickableApp = []
        } else {
            clickableUs = []
        }
        listOfIngAppUs = [clickableIng, clickableApp, clickableUs]
        
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



