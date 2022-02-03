
// fonction pour enlever les espaces, accents, et carateres speciaux de la saisie et de la recherche
function pureString(string) {
    return string.toLowerCase().normalize('NFD').replace(new RegExp("[^(a-zA-Z)]", "g"), '')
}

const recipesSection = document.querySelector("main")
const searchBar = document.querySelector("#searchBar")

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

// voir pour mixer ces deux fonctions !!





//  filtre de la barre de recherche principale
searchBar.addEventListener("input", function() {
    recipesSection.innerHTML = ""
    listOfCheckboxes[1].innerHTML = ""

    let recipesToDisplay = recipes
    let applianceToDisplay = listeAppareils

    if (searchBar.value.length > 2) {
        recipesToDisplay = filterRecipes()
        applianceToDisplay = filterAppliances(recipesToDisplay)
        filterIngredients(recipes)
    } 

    displayData(recipesToDisplay)
    createListOfCheckboxes(applianceToDisplay, 1)
})

// filtre les recettes via la barre de reherche et les affiche
function filterRecipes() {
    let resultsArray = orderedRecipes.filter(element => pureString(element.name).includes(pureString(searchBar.value)) ||
                                                        pureString(element.description).includes(pureString(searchBar.value)) || 
                                                        element.ingredients.some(el => pureString(el.ingredient).includes(pureString(searchBar.value))))    

    return resultsArray    
}

function filterAppliances(recipes) {
    let resultsAppareils = orderedAppareils.filter(element => recipes.some(el => el.appliance == element))
    // console.log(resultsAppareils)

    return resultsAppareils
}

function filterIngredients(recipes) {
    let resultsIngredient = orderedIngredients.filter(element => recipes.ingredients.some(el => el.ingredient  == element))

    console.log(resultsIngredient)
}


// filtre les filtre

// createListOfCheckboxes (listeName, triFormNumber)
// function createCheckboxes(i, listeName, triFormNumber) {
//     newLiElement[i] = document.createElement("li")
//     newLabel[i] = document.createElement("label")
//     newInput[i] = document.createElement("input")
//     newInput[i].classList.add("checkbox")
//     newInput[i].setAttribute("type", "checkbox")
//     newLabel[i].textContent = listeName[i]
//     newLiElement[i].appendChild(newLabel[i])
//     newLabel[i].appendChild(newInput[i])


//     listOfCheckboxes[triFormNumber].appendChild(newLiElement[i])

    
// }

// function filtreFiltres() {

//     for (let i = 0 ; i < triFormNumber ; i++) {
//         for (let j = 0 ; j < )
//         let resultsArray = listOfLists[i].filter(element => pureString(element).includes(pureString(searchBar.value)) ||
//         pureString(element.description).includes(pureString(searchBar.value)) || 
//         element.ingredients.some(el => pureString(el.ingredient).includes(pureString(searchBar.value))))    
//     createListOfCheckboxes (resultsArray, i)

//     }

// }





// filtre les recettes via les tags et les affiche

function filterRecipesByTag() {
    let newFiltre = document.querySelectorAll(".newFiltre")

    let resultsArray = []
    // for (let i = 0 ; i < newFiltre.length ; i++) {

        if (newFiltre[0].classList.contains("blue")) {
            resultsArray = orderedRecipes.filter(element => element.ingredients.some(el => pureString(el.ingredient).includes(pureString(newFiltre[0].textContent))))
        } else if (newFiltre[0].classList.contains("green")) {
            resultsArray = orderedRecipes.filter(element => pureString(element.appliance).includes(pureString(newFiltre[0].textContent)))
        } else {
            resultsArray = orderedRecipes.filter(element => element.ustensils.some(ele => pureString(ele).includes(pureString(newFiltre[0].textContent))))
        }

        for (let i = 1 ; i < newFiltre.length ; i++) {

            if (newFiltre[i].classList.contains("blue")) {
                resultsArray = resultsArray.filter(element => element.ingredients.some(el => pureString(el.ingredient).includes(pureString(newFiltre[i].textContent))))
            } else if (newFiltre[i].classList.contains("green")) {
                resultsArray = resultsArray.filter(element => pureString(element.appliance).includes(pureString(newFiltre[i].textContent)))
            } else {
                resultsArray = resultsArray.filter(element => element.ustensils.some(ele => pureString(ele).includes(pureString(newFiltre[i].textContent))))
            }

        }

    //    console.log(resultsArray)
        // let resultsArray = orderedRecipes.filter(element => pureString(element.name).includes(pureString(newFiltre[i].textContent)) ||
        //                                                     pureString(element.description).includes(pureString(newFiltre[i].textContent)) || 
        //                                                     pureString(element.appliance).includes(pureString(newFiltre[i].textContent)) ||
        //                                                     element.ustensils.some(ele => pureString(ele).includes(pureString(newFiltre[i].textContent))) ||
        //                                                     element.ingredients.some(el => pureString(el.ingredient).includes(pureString(newFiltre[i].textContent)))) 
        
        // displayData(resultsArray)

    // }   
    displayData(resultsArray)
}

// ajout d'un event listener sur le declenchement de la création d'un filtre tag

let triElement = document.querySelectorAll("li")

for (let i = 0 ; i < triElement.length ; i++) {
    triElement[i].addEventListener("click", function() {
        recipesSection.innerHTML = ""
        filterRecipesByTag()
    })

}

 

let listOfLists = [orderedIngredients, orderedAppareils, orderedUstensiles]
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
            createListOfCheckboxes (listOfLists[i], i)
          
            openChevron[i].classList.remove("rotate")
        }
    })

}

function filterListe(i) {
    let resultsArray = listOfLists[i].filter(element => pureString(element).includes(pureString(inputButtons[i].value)))
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
