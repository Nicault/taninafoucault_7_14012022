
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

    if (searchBar.value.length > 2) {
        filterRecipes()
    } else {
        displayData(recipes)
    }
})

// filtre les recettes et les affiche
function filterRecipes() {
    let resultsArray = orderedRecipes.filter(element => pureString(element.name).includes(pureString(searchBar.value)) ||
                                                        pureString(element.description).includes(pureString(searchBar.value)) || 
                                                        element.ingredients.some(el => pureString(el.ingredient).includes(pureString(searchBar.value))))    
    displayData(resultsArray)
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

            // if (inputButtons[i].classList.contains("inputWidth")) {
            //     divOfCheckboxes[i].classList.add("block")
            //     openChevron[i].classList.add("rotate")    
            // }

            // changeButtonStatut(i)
            // l'element se deselectionne sans ça et c'est en décalé mais ce n'est pas la solution car autre probleme
            // oneButtonAtATime()
            // createFiltre(i)
            // probleme avec le parent element de la fonction de base
            
        } else {
            createListOfCheckboxes (listOfLists[i], i)
            // créé un bug
            // divOfCheckboxes[i].classList.remove("block")

            openChevron[i].classList.remove("rotate")
        }
    })

}

function filterListe(i) {
    let resultsArray = listOfLists[i].filter(element => pureString(element).includes(pureString(inputButtons[i].value)))
    createListOfCheckboxes (resultsArray, i)
}



for (let i = 0 ; i < inputButtons.length ; i++) {
    inputButtons[i].addEventListener("input", function() {

        if (inputButtons[i].classList.contains("inputWidth") && inputButtons[i].value.length >= 3) {
            // createListOfCheckboxes (listOfLists[i], i)
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
