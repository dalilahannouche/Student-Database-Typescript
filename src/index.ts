import data from './data.js' ; // parce que le fichier exécuté sera index.js et 
// index.js se trouve dans le même dossier que data.js

//Le fichier data.js n’a pas besoin d’être un .json pour contenir des données au format JSON.
//Si data.js exporte une chaîne de caractères JSON (au lieu d'un objet directement), il faut
// // utiliser JSON.parse(data) pour la convertir en objet JavaScript.

//data est une chaîne de caractères, donc JSON.parse(data)
// est nécessaire pour le transformer en objet utilisable
const students = JSON.parse(data);
console.log(students);



interface Student{
    id:string,
    firstName:string,
    lastName:string,
    focusArea?:string | string[],
    dateAdmission:string,
    birthYear:string,
    dateRegistrationSuspended?:string
}


function addRow(table:HTMLTableElement, student:Student) {

     //  Insère une nouvelle ligne (<tr>) dans le <tbody> de la table
    let tr = table.querySelector("tbody")!.insertRow();

    //  Ajoute la première cellule (Nom) dans la ligne déjà crée
    const name = tr.insertCell();
    name.appendChild(document.createTextNode(`${student.firstName}  ${student.lastName}`));

    //  Ajoute la deuxième cellule (Âge)
    const age = tr.insertCell();
    //const d = new Date();
    //let year = d.getFullYear();
    age.appendChild(document.createTextNode((new Date().getFullYear() - parseInt(student.birthYear)).toString()));

    //  Ajoute la troisième cellule (Domaines d'étude)
    const majors = tr.insertCell();
    if (student.focusArea){
        if (typeof student.focusArea == "string"){
            majors.appendChild(document.createTextNode(`${student.focusArea}`));
        } else{
            let areas: string[] = [];
            student.focusArea.forEach(area => {
                areas.push(area)
            })
            //areas.join(", ") transforme le tableau en une chaîne de caractères, en séparant les éléments par une virgule et un espace.
            majors.appendChild(document.createTextNode(areas.join(", ")));
        }
    } else{
        majors.appendChild(document.createTextNode("--"));
    }
    
    

    //  Ajoute la quatrième cellule (Statut d'inscription)
    const status = tr.insertCell();
    status.appendChild(document.createTextNode(""));
}

// select HTML table
function selectTable() {
    return <HTMLTableElement>document.querySelector("#students-table"); // si on fait pas l'assertion
    // Typescript ne peut pas savoir si on va sélectionner une table ou autre dans le HTML"
}

// add a row
addRow(selectTable(), students[0]);