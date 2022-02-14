


// fonction pour enlever les accents, et carateres speciaux de la saisie et de la recherche
function pureString(string) {
    return string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}


//  créer et remplir les tableaux d'ingredients, appareil et ustensiles

// ici on aurait pu utiliser new Set()

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

// function fillList remplie les listes avec les données de data
// une seule occurence !
function fillList(listName, elementToAdd, newElement) {

    for (let i = 0 ; i < listName.length ; i++) {
        if (pureString(newElement) == pureString(listName[i])) {
            elementToAdd = false
            break
        }
    }

    if (elementToAdd) {
        listName.push(newElement)
    }
}





// ouverture des menus bouttons (un seul à la fois) au click sur le chevron

const sectionBoutons = document.querySelector(".sectionBoutons")

const openButtons = document.querySelectorAll(".openButton")
const openChevron = document.querySelectorAll(".fa-chevron-down")
const inputButtons = document.querySelectorAll(".element")
const triForm = document.querySelectorAll(".tri")


for (let i = 0 ; i < openButtons.length ; i++) {
    openButtons[i].addEventListener("click", function(e) {
        e.preventDefault()
        // si chevron bouton ouvert, on le ferme et c'est tout
        if (openChevron[i].classList.contains("rotate") ) {
            closeAllButtonsAndInputs() 
            return
       
        }
        // autrement on ouvre le bouton selectionné et on ferme les autres
        openButton(i)

    })
}


function closeAllButtonsAndInputs() {
     for (let i = 0 ; i < inputButtons.length ; i++) {
            if (inputButtons[i].classList.contains("boutonOuvert")){
                // si un autre bouton est ouvert, on le ferme
                inputButtons[i].classList.remove("boutonOuvert")
              
            } else if (inputButtons[i].classList.contains("inputWidth")) {
                // si une zone de texte est selectionnée, on la deselectionne
                inputButtons[i].classList.remove("inputWidth")
            }
            divOfCheckboxes[i].classList.remove("block")
            divOfCheckboxes[i].classList.remove("inputWidth")
            openChevron[i].classList.remove("rotate")
            sectionBoutons.classList.remove("marginBottom")
            inputButtons[i].classList.remove("borderRadius")

            modifyPlaceholder(i)
    }
}

function openInput(i) {
    closeAllButtonsAndInputs()
    inputButtons[i].classList.add("inputWidth")
    
}

// specificicité de l'ouverture des listes à l'input avec bouton fermé
for (let i = 0 ; i < inputButtons.length ; i++) {
    inputButtons[i].addEventListener("input", function() {

        if (inputButtons[i].classList.contains("inputWidth") && inputButtons[i].value.length) {
            divOfCheckboxes[i].classList.add("block")
            divOfCheckboxes[i].classList.add("inputWidth")
            inputButtons[i].classList.add("borderRadius")
            openChevron[i].classList.add("rotate")


        } else if (inputButtons[i].classList.contains("inputWidth") && !inputButtons[i].value.length) {
            divOfCheckboxes[i].classList.remove("block")
            divOfCheckboxes[i].classList.remove("inputWidth")
            inputButtons[i].classList.remove("borderRadius")
            openChevron[i].classList.remove("rotate")

        }
    })
}


function openButton(i) {
    closeAllButtonsAndInputs()
    divOfCheckboxes[i].classList.add("block")
    inputButtons[i].classList.add("boutonOuvert")
    openChevron[i].classList.add("rotate")
    sectionBoutons.classList.add("marginBottom")
    modifyPlaceholder(i)  
}







// modification du bouton au click sur la zone de saisie
// ATTENTION VOIR POUR RAJOUTER DES BACKGROUND POUR UN CLICK EXTERIEUR

for (let i = 0 ; i < inputButtons.length ; i++) {
    inputButtons[i].addEventListener("click", function() {
        if (inputButtons[i].classList.contains("boutonOuvert") ||
            inputButtons[i].classList.contains("inputWidth")) {
            return
        }

        closeAllButtonsAndInputs()

        for (let i = 0 ; i < inputButtons.length ; i++) {
            if (inputButtons[i].classList.contains("inputWidth")) {
                // si une zone de texte est selectionnée, on la deselctionne
                inputButtons[i].classList.remove("inputWidth")
            }
            // si un bouton est ouvert, on le ferme
            // if (inputButtons[i].classList.contains("boutonOuvert")){
            //     changeButtonStatut(i)

            // }
        }
        if ( inputButtons[i].classList.contains("boutonOuvert")) {
        // si le bouton est deja ouvert, on ne fait rien
        return
    }
        // on selectionne la zone de texte
        inputButtons[i].classList.add("inputWidth")
    })
    
}


// modifie la valeur du placeholder au click sur le chevron

let placeholders = ["Ingredients", "Appareil", "Ustensiles"]
let placeholdersSelected = ["ingredient", "appareil", "ustensile"]


function modifyPlaceholder(i) {

    if (inputButtons[i].classList.contains("boutonOuvert")) {

        inputButtons[i].classList.add("opacityPH")
        inputButtons[i].placeholder = "Rechercher un " + placeholdersSelected[i]

    } else {
        
        inputButtons[i].classList.remove("opacityPH")
        inputButtons[i].placeholder = placeholders[i]
    }
}




// let newLiElements = []
// let newLabels = []
// let newInputs = []
let listOfCheckboxes = []
let divOfCheckboxes = []

// crée les elements de liste par bloc de 10 pour adapter la taille de la hauteur

for (let i = 0 ; i < triForm.length ; i++) {
    divOfCheckboxes[i] = document.createElement("div")
    divOfCheckboxes[i].classList.add("divOfCheckboxes")


    listOfCheckboxes[i] = document.createElement("ul")
    listOfCheckboxes[i].classList.add("listOfCheckboxes")

    divOfCheckboxes[i].appendChild(listOfCheckboxes[i]) 
    
    triForm[i].appendChild(divOfCheckboxes[i])

}


// on limite le nombre d'elements à 30
function createListOfCheckboxes(listeName, triFormNumber){
    if (divOfCheckboxes[triFormNumber].classList.contains("inputWidth")) { // on cherche ici la format de la liste à afficher. si petit format on affiche max 10elements
        for (let i = 0 ; i < 10 && i < listeName.length ; i++) {
            createCheckboxes(i, listeName, triFormNumber)        } 
    } else {
        for (let i = 0 ; i < 30 && i < listeName.length ; i++) {//si non, on affiche max 30element
            createCheckboxes(i, listeName, triFormNumber)
        } 
    }     
}
// /!\ PROBLEME au dessus, cette fonction ne se declanche qu'au click ou a l'input, si non ça créé bien la liste mais la longueur n'est pas respectée. pourquoi ?


let clickableIng = []
let clickableApp = []
let clickableUs = []

let listOfIngAppUs = [clickableIng, clickableApp, clickableUs]
// créé les checkboxes et les append aux elements de liste
function createCheckboxes(i, listeName, triFormNumber) {
    let newLiElement = document.createElement("li")
    let newLabel = document.createElement("label")
    let newInput = document.createElement("input")
    newInput.classList.add("checkbox")
    newInput.setAttribute("type", "checkbox")
    newLabel.textContent = listeName[i]
    newLiElement.appendChild(newLabel)
    newLabel.appendChild(newInput)

    listOfCheckboxes[triFormNumber].appendChild(newLiElement) 
    // listOfIngAppUs.push(newLiElement[i])
    if (newLiElement.parentElement.parentElement.parentElement.classList.contains("blue")) {
        clickableIng.push(newLiElement)
    } else if (newLiElement.parentElement.parentElement.parentElement.classList.contains("green")) {
        clickableApp.push(newLiElement)
    } else {
        clickableUs.push(newLiElement)
    }
    listOfIngAppUs = [clickableIng, clickableApp, clickableUs]
}


createListOfCheckboxes(listeIngredients, 0)
createListOfCheckboxes(listeAppareils, 1)
createListOfCheckboxes(listeUstensiles, 2)


// crée la zone des tags

const sectionRecherche = document.querySelector(".sectionRecherche")
const sectionFiltres = document.createElement("div")
sectionFiltres.classList.add("sectionFiltres")

sectionRecherche.insertBefore(sectionFiltres, sectionBoutons)

// ajouter les elements de tri

// let deleteFiltre
// let newFiltre

// let triElement = []

let listOfTags = []
let deleteTags = []
let triIng = []
let triApp= []
let triUs = []
let triElement = [triIng, triApp, triUs]


function createAndDeleteFilters(first, last) {
    
    // triElement = []
    // console.log(triElement)
    triElement[0] = document.querySelectorAll(".blue .listOfCheckboxes li")
    triElement[1] = document.querySelectorAll(".green .listOfCheckboxes li")
    triElement[2] = document.querySelectorAll(".red .listOfCheckboxes li")

    // console.log(triElement[0])



    for (let i = first ; i < last ; i++) {
        // console.log(triElement[i].length)

        for (let j = 0 ; j < triElement[i].length ; j++) {
            // console.log(triElement[i][j])

            triElement[i][j].addEventListener("click", function(e) {

                e.preventDefault() //important
                // e.stopPropagation()
                // listOfIngAppUs = []
                deleteFiltre = createFiltre(i, j)  
                let selectedElement = triElement[i][j]
                triElement[i][j].classList.add("none")
        
                // on recherche et supprime les element ici car c'est là qu'on les a créés            
                deleteFiltre.addEventListener("click", function(e) {

                    removeItemOnce(listOfTags, e.target.parentElement)
                    removeItemOnce(deleteTags, e.target)

                    selectedElement.classList.add("block")
                    sectionFiltres.removeChild(e.target.parentElement)

                    recipesToDisplay = filterRecipesTags(filterRecipesSearchBar(orderedRecipes))
                    displayFilteredElements()
                })
            })
        }
        
        
    }
}

createAndDeleteFilters(0, triElement.length)

// crée les filtres et ajoute la classe couleur du parent du parent du parent.. modifier ça si possible!
function createFiltre(i, j) {

    newFiltre = document.createElement("div")
    newFiltre.classList.add("newFiltre")
    newFiltre.textContent = triElement[i][j].textContent
    deleteFiltre = document.createElement("i")

    if (triElement[i][j].parentElement.parentElement.parentElement.classList.contains("red")) {
        newFiltre.classList.add("red")
    
    } else if (triElement[i][j].parentElement.parentElement.parentElement.classList.contains("blue")) {
        newFiltre.classList.add("blue")

    } else {
        newFiltre.classList.add("green")

    }
    deleteFiltre.classList.add("far")
    deleteFiltre.classList.add("fa-times-circle")
    deleteFiltre.classList.add("deleteFiltre")


    sectionFiltres.appendChild(newFiltre)
    newFiltre.appendChild(deleteFiltre)

    listOfTags.push(newFiltre)
    deleteTags.push(deleteFiltre)

    return deleteFiltre
}





function removeItemOnce(array, value) {
    let index = array.indexOf(value)
    if (index > -1) {
      array.splice(index, 1)
    }
    return array
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


