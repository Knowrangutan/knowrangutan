let liste_div  = [];
let index = 0;
let index_interne = 0;
let answer = "";
let liste_criteres = ["gdpcapita","forest","highest","democracy","neighbour","area"];
let liste_criteres_affichees = ["GDP per capita", "Forest cover", "Highest point", "Democracy index (out of 10)", "Neighboring countries (land borders only)", "Area"];
let liste_emojis = ["💲", "🌳 ", "⛰️ ","⚖️ ","🤝🏻 ","📐"]
const div = document.getElementById("grille-quiz");



let a = document.querySelector(".one");
let b = document.querySelector(".two");
let c = document.querySelector(".three");
let d = document.querySelector(".four");
let e = document.querySelector(".five");
let f = document.querySelector(".six");

liste_div.push(a)
liste_div.push(b)
liste_div.push(c)
liste_div.push(d)
liste_div.push(e)
liste_div.push(f)




async function init(){
    const download = await fetch("qa-quiz-2.json");

    
    const donnees = await download.json();
    return donnees
}


function verifier(classe){

    let v = document.querySelector(classe);
    let z =v.querySelector("button");
    z.style.color ="white";
    z.style.backgroundColor ="#5DBB3F";

    
    let local_div = liste_div[index_interne];
    let liste_masque = document.querySelectorAll(".masqué");
    let input = local_div.querySelector("input");
    index_interne = index_interne + 1;
    let victoire = "0";

    if(input.value === answer){
        victoire = "1";
        localStorage.setItem("victoire", victoire)
        localStorage.setItem( "score",index_interne);
        localStorage.setItem("index", index)
        
        window.location.href="qa-score.html";
        

    }else if (index_interne > 5){
        localStorage.setItem("victoire", victoire)
        localStorage.setItem("score", index_interne);
        localStorage.setItem("index", index)
        window.location.href="qa-score.html";

    }else{
        liste_div[index_interne].style.display = "grid";
        if(index_interne  -1< liste_masque.length){
        liste_masque[index_interne -1].style.display = "none";
        }



        let button_del = liste_div[index_interne-1].querySelector(".buttondiv");
        button_del.onclick = null;
    }


}

function presentation(index,donnees, index_interne, liste_criteres, div, liste_div){
    let hint = document.getElementById("hint");
    hint.innerHTML = "Bonus hint : "+donnees[index]["hint"];
    let riddle = document.getElementById("riddle");
    riddle.innerHTML = "Riddle #" + String(parseInt(index+1));
    for (let el of  liste_div){
        let provisoire = liste_div.indexOf(el);
        el.querySelector(".p1").innerHTML = liste_emojis[provisoire] + liste_criteres_affichees[provisoire];
        el.querySelector(".p2").innerHTML = donnees[index][liste_criteres[provisoire]];  
    }

    answer = donnees[index]["name"];

}



async function main() {
    console.log(new Date())
    
    
    for (el of liste_div){
        el.style.display = "none";
    }
    let masqué = document.querySelectorAll(".masqué");
    masqué.forEach(m => m.style.display = "grid");
    index_interne = 0;
    liste_div.forEach(el => {
        el.style.display = "none";
        el.querySelector("input").value = "";  
        let btn = el.querySelector("button");
        btn.style.backgroundColor = "var(--couleur-pop)";  
        btn.onclick = function(){ verifier(`.${el.className}`); };
    });
    let one = document.querySelector(".one");
    one.style.display = "grid"

    const donnees = await init();
    const debut = new Date("2026-07-22");
    const aujourdhui = new Date();
    const diff = Math.floor((aujourdhui - debut) / (1000 * 60 * 60 * 24));
    index = ((diff % donnees.length) + donnees.length) % donnees.length;

    presentation(index,donnees, index_interne, liste_criteres, div, liste_div)
   
}


main()
