
async function init(){
    const download = await fetch("qa-quiz-2.json");
    const donnees = await download.json();
    return donnees
}


function afficher(donnees){

    
    const score = localStorage.getItem("score");
    const score_id  = document.getElementById("score_id") ;
    const index = localStorage.getItem("index");

    const animal = donnees[index];

    score_id.innerHTML = score;
    let riddle = document.getElementById("riddle");
    riddle.innerHTML = "Riddle #" + index;

    //image..........................
    const img_id = document.getElementById("photo-animal");
    img_id.src = animal["img_src"];

    //nom animal......................
    const nom_animal = donnees[index]["name"];
    const nom_animal_id = document.getElementById("nom-animal");
    nom_animal_id.innerHTML = nom_animal


    const emojis = Array(6).fill("🟩");
    for(let i = 0; i < score; i++) emojis[i] = "🟥";
    document.getElementById("emojis").innerHTML = emojis.join("");

        //facts..........................................

    const faits = document.getElementById("faits");
    for (el of animal["facts"]){
        let p = document.createElement("p")
        p.innerHTML = "🌎"+ el
        faits.appendChild(p)
    }

    
}



function afficher_defaite(donnees){


    const score = localStorage.getItem("score");
    const score_id  = document.getElementById("score_id") ;
    let index = localStorage.getItem("index");

    const animal = donnees[index];

    score_id.innerHTML = score;
    let riddle = document.getElementById("riddle");
    riddle.innerHTML = "Riddle #" + String(parseInt(index) + 1);

    //image..........................
    const img_id = document.getElementById("photo-animal");
    img_id.src = animal["img_src"];

    //nom animal......................
    const nom_animal = donnees[index]["name"];
    const nom_animal_id = document.getElementById("nom-animal");
    nom_animal_id.innerHTML = nom_animal


    const emojis = Array(6).fill("🟥");
    document.getElementById("emojis").innerHTML = emojis.join("");

    const score_title = document.getElementById("score-title");
    score_title.style.color = "rgb(230, 63, 63)";
    score_title.innerHTML = "You didn't find the country of the day"

    //facts..........................................

    const faits = document.getElementById("faits");
    for (el of animal["facts"]){
        let p = document.createElement("p")
        p.innerHTML = "🌍"+ el
        faits.appendChild(p)
    }


}


function partager() {
    let score = localStorage.getItem("score");
    const emojis = Array(6).fill("🟥");
    for(let i = 0; i < score; i= i +1) emojis[i] = "🟩";
    
    const texte = `🐾 Knowrangutan #${localStorage.getItem("index")}\nFound it in ${score}/6 hints!\n${emojis.join("")}\nbeastleday.com`;
    
    navigator.clipboard.writeText(texte);
    
    document.getElementById("share-btn").innerHTML = "Copied! ✓";
}

document.getElementById("play-again").onclick = function(){
    window.location.href = "index.html";
}

async function main() {
    let victoire = localStorage.getItem("victoire");
    const donnees = await init();
    
    if (victoire === "1"){
        afficher(donnees)
    }else{
        afficher_defaite(donnees)
    }
}
main()