
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
        newElement = newElement.charAt(0).toUpperCase() + newElement.slice(1)
        listName.push(newElement)
    }
}


// ouverture des menus bouttons (un seul à la fois) au click sur le chevron



const sectionBoutons = document.querySelector(".sectionBoutons")

const openButtons = document.querySelectorAll(".openButton")
const openChevron = document.querySelectorAll(".fa-chevron-down")
const inputButtons = document.querySelectorAll(".element")
const triForm = document.querySelectorAll(".tri")


function oneButtonAtATime() {
    for (let i = 0 ; i < openButtons.length ; i++) {
        openButtons[i].addEventListener("click", function(e) {
            e.preventDefault()
    
            if (openChevron[i].classList.contains("rotate")) {
                // si le bouton est ouvert, on le ferme et on s'arrete là
                changeButtonStatut(i)  
                return
            }
    
            for (let i = 0 ; i < inputButtons.length ; i++) {
                if (openChevron[i].classList.contains("rotate")){
                    // si un autre bouton est ouvert, on le ferme
                    changeButtonStatut(i)  
                } 
            }
            changeButtonStatut(i) 
            // on ouvre le bouton 
        })
    }
}

oneButtonAtATime()

function changeButtonStatut(i) {
    for (let i = 0 ; i < inputButtons.length ; i++) {
        if (inputButtons[i].classList.contains("inputWidth")) {
            // si une zone de texte est selectionnée, on la deselectionne
            inputButtons[i].classList.toggle("inputWidth")
        }
    }
   

    divOfCheckboxes[i].classList.toggle("block")
    inputButtons[i].classList.toggle("boutonOuvert")
    openChevron[i].classList.toggle("rotate")
    sectionBoutons.classList.toggle("marginBottom")
    // inputButtons[i].classList.toggle("inputWidth")
    modifyPlaceholder(i)  
}

// modification du bouton au click sur la zone de saisie
// ATTENTION VOIR POUR RAJOUTER DES BACKGROUND POUR UN CLICK EXTERIEUR


for (let i = 0 ; i < inputButtons.length ; i++) {
    inputButtons[i].addEventListener("click", function() {
        for (let i = 0 ; i < inputButtons.length ; i++) {
            if (inputButtons[i].classList.contains("inputWidth")) {
                // si une zone de texte est selectionnée, on la deselctionne
                inputButtons[i].classList.toggle("inputWidth")
            }
        }
    if ( inputButtons[i].classList.contains("boutonOuvert")) {
        // si le bouton est deja ouvert, on ne fait rien
        return
    }
        // on selectionne la zone de texte
        inputButtons[i].classList.toggle("inputWidth")
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






let newLiElement = []
let newLabel = []
let newInput = []
let listOfCheckboxes = []
let divOfCheckboxes = []

// crée les checkboxes par bloc de 10

function createListOfCheckboxes (listeName, triFormNumber){
    divOfCheckboxes[triFormNumber] = document.createElement("div")
    divOfCheckboxes[triFormNumber].classList.add("divOfCheckboxes")


    listOfCheckboxes[triFormNumber] = document.createElement("ul")
    listOfCheckboxes[triFormNumber].classList.add("listOfCheckboxes")

    divOfCheckboxes[triFormNumber].appendChild(listOfCheckboxes[triFormNumber])


    if (listeName.length > 29) {
        for (let i = 0 ; i <= 29 ; i++) {

            createCheckboxes(i, listeName, triFormNumber)

        }
    } else if (listeName.length > 19 && listeName.length < 29) {
        for (let i = 0 ; i <= 19 ; i++) {

            createCheckboxes(i, listeName, triFormNumber)

        }
    } else {
        for (let i = 0 ; i <= 9 ; i++) {

            createCheckboxes(i, listeName, triFormNumber)

        }

    }
    triForm[triFormNumber].appendChild(divOfCheckboxes[triFormNumber])
}

function createCheckboxes(i, listeName, triFormNumber) {
    newLiElement[i] = document.createElement("li")
    newLabel[i] = document.createElement("label")
    newInput[i] = document.createElement("input")
    newInput[i].classList.add("checkbox")
    newInput[i].setAttribute("type", "checkbox")
    newLabel[i].textContent = listeName[i]
    newLiElement[i].appendChild(newLabel[i])
    newLabel[i].appendChild(newInput[i])


    listOfCheckboxes[triFormNumber].appendChild(newLiElement[i])
}


createListOfCheckboxes(listeIngredients, 0)
createListOfCheckboxes(listeAppareils, 1)
createListOfCheckboxes(listeUstensiles, 2)


// crée la zone des filtres



const sectionRecherche = document.querySelector(".sectionRecherche")
const sectionFiltres = document.createElement("div")
sectionFiltres.classList.add("sectionFiltres")

sectionRecherche.insertBefore(sectionFiltres, sectionBoutons)

// ajouter les elements de tri

let deleteFiltre
let newFiltre

const triElement = document.querySelectorAll("li label")
// delete filters
for (let i = 0 ; i < triElement.length ; i++) {
    triElement[i].addEventListener("click", function(e) {
        e.preventDefault() // pour ne pas créer l'element en double

        createFiltre(i)    

        // on recherche et supprime les element ici car c'est là qu'on les a créés
        deleteFiltre = document.querySelectorAll(".deleteFiltre") 
        newFiltre = document.querySelectorAll(".newFiltre")
        for (let i = 0 ; i < deleteFiltre.length ; i++) {
            deleteFiltre[i].addEventListener("click", function(e) {
                e.preventDefault
                newFiltre[i].classList.add("none")
            })
        }   
    })
}

// crée les filtres et ajoute la classe couleur du parent du parent du parent..
function createFiltre(i) {

    newFiltre = document.createElement("div")
    newFiltre.classList.add("newFiltre")
    newFiltre.textContent = triElement[i].textContent
    if (triElement[i].parentElement.parentElement.parentElement.parentElement.classList.contains("red")) {
        newFiltre.classList.add("red")
    } else if (triElement[i].parentElement.parentElement.parentElement.parentElement.classList.contains("blue")) {
        newFiltre.classList.add("blue")
    } else {
        newFiltre.classList.add("green")
    }
    deleteFiltre = document.createElement("i")
    deleteFiltre.classList.add("far")
    deleteFiltre.classList.add("fa-times-circle")
    deleteFiltre.classList.add("deleteFiltre")



    newFiltre.appendChild(deleteFiltre)
    sectionFiltres.appendChild(newFiltre)


}




