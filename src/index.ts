import data from './data.js' ; // parce que le fichier exécuté sera index.js et 
// index.js se trouve dans le même dossier que data.js

//Le fichier data.js n’a pas besoin d’être un .json pour contenir des données au format JSON.
//Si data.js exporte une chaîne de caractères JSON (au lieu d'un objet directement), il faut
// // utiliser JSON.parse(data) pour la convertir en objet JavaScript.

//data est une chaîne de caractères, donc JSON.parse(data)
// est nécessaire pour le transformer en objet utilisable
const students = JSON.parse(data);



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
    if (student.dateRegistrationSuspended){
        status.appendChild(document.createTextNode("Active"));
    } else {
        status.appendChild(document.createTextNode("Inactive"));
    }
    
}

// select HTML table
function selectTable() {
    return <HTMLTableElement>document.querySelector("#students-table"); // si on fait pas l'assertion
    // Typescript ne peut pas savoir si on va sélectionner une table ou autre dans le HTML"
}

// Filter Students

function filterStudents() {
    const input = <HTMLInputElement>document.querySelector("#myInput");
    const filter = input.value.toLowerCase(); // Convertir en minuscule pour un filtrage insensible à la casse
    
    // Filtrer les étudiants en fonction du nom, de l'âge, de la spécialisation ou du statut d'inscription
    const filteredStudents = students.filter(student => {
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        const age = (new Date().getFullYear() - parseInt(student.birthYear)).toString();
        const focusArea = student.focusArea 
            ? (typeof student.focusArea === "string" ? student.focusArea : student.focusArea.join(", ")).toLowerCase()
            : "";
        const status = student.dateRegistrationSuspended ? "active" : "inactive";

        return fullName.includes(filter) || 
               age.includes(filter) || 
               focusArea.includes(filter) ||
               status.includes(filter);
    });
     // remplace le contenu du tableau avec seulement les étudiants qui correspondent à la recherche.
     refreshTable(selectTable(), filteredStudents);
    }

// Add all the students
function refreshTable(table : HTMLTableElement, students : Student[]){
    table.querySelector("tbody")!.innerHTML = "";
    students.forEach(student=>{
        // add a row
        addRow(table, student);
    })
}

//window.onload ne s'exécute qu'une fois tout le contenu de la page (y compris le HTML et les ressources 
// associées comme les images et les styles CSS) est complètement chargé.
// Cela garantit que #students-table est présent dans le DOM lorsque selectTable() est appelé.
window.onload = function(){
    refreshTable(selectTable(), students);
    document.querySelector("#myInput")!.addEventListener("input", filterStudents);

}
