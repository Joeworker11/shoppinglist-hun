/*
    1. DOM segítségével készítsetek egy bevásárlólista projektet.
        a. hozzatok létre DOM segítségével az oldalon egy bevitelő mezőt, egy "Hozzáad", és egy "Törlés" felíratú gombot.
        b. hozzatok létre ugyancsak DOM segítségéevel egy UL listát is az oldalon.
        c. A "Hozzáad" gombra klikkelve, adjátok hozzá ehez a listához azt a szöveget, amelyet, a beviteli mezőbe írtatok.
          (bevitelő mező egy input type text)
        d. A listalemekre klikkelve pedig, kapcsolgassátok a lisaelemen a "teljesitve" css classt.
            - a "teljesitve" css class hatására legyen az elem áthúzva. (eg css sor) Ez fogja jelölni, hogy az adott tételt a listából
              a bevásárló kosarunkba tettük már.
        c. A "Törlés" gombra kattibtva, pedig töröljétek ki a listából azokat az elemeket, amelyek teljesítve lettek, azaz át vannak húzva
​
    2. Az egyes feladathoz, írjatok egy kiegészítő függvényt, melynek a neve getListValue(listSelector, teljesitve)
       A függvény egy tömbbe térítse vissza, a selectorban megadott lista azon elemeit, amelyek nincsenek áthúzva, ha a "teljesitve".
       praméter false. Ha true, akkor azokat térítse vissza, amelyek már teljesítve vannak, azaz át vannak húzva.
*/

console.log(".............BEVÁSÁRLÓLISTA.......................");
/*funkció, amivel HTML elementet lehet készíteni */
function renderElement(tagName, className, textPar) {
    const el = document.createElement(tagName);
    el.classList.add(className);
    el.textContent = textPar;
    return el;
};

const content = document.querySelector("#content");
let inputField = renderElement("input", "[input:type='text']", "");
content.appendChild(inputField);
let ul = renderElement("ul", ".dotted", "");
content.appendChild(ul);
/*gombok létrehozása + content elementhez való hozzáadás */
let addButton = renderElement("button", "btn", "Hozzáad");
let deleteButton = renderElement("button", "btn", "Törlés");

content.appendChild(addButton);
content.appendChild(deleteButton);

/*hibaüzenet */
const errorMessage = () => {
        let errorDiv = document.createElement("div");
        let message = document.createTextNode("Hiba! Ne hagyd üresen a mezőt!");
        errorDiv.appendChild(message);
        errorDiv.classList.add("error");
        return errorDiv;
}
/*lementjük egy változóba a hibaüzenet funkciót */
var errorBox = errorMessage();
/*hozzáad gomb belső funkciója, ami új <li> elemet kreál, kitörli a hibaüzenetet ha az inputField nem üres, hozzáadja, hogyha az */
addButton.onclick = () => {
    
    if(!inputField.value == ""){
        
        let newLi = renderElement("li");
        newLi.textContent = inputField.value.trim();
    
        ul.appendChild(newLi);
    
        inputField.value = "";

        if (errorBox.parentNode) { 
            content.removeChild(errorBox); 
          }
 
    } else {
        content.appendChild(errorBox);
    } 
}

/*Kijelölés beállítása */

  ul.addEventListener("click", (event) => {
    if (ul.contains(event.target) && event.target.matches("li")) {
      event.target.classList.toggle("teljesitve");
    }
  });

/*törlés gomb funkciója */
  deleteButton.onclick = () => {
    let itemsToDelete = document.querySelectorAll("li.teljesitve");
    itemsToDelete.forEach(item => item.remove());
  };

/*funkció, ami visszaadja külön listában az elemeket */
function getListValue(listSelector, teljesitve) {

    let ul = document.querySelector(listSelector);
    let result = [];
// /*végigiterálunk az ul összes li elemén, megnézzük, hogy melyik van teljesítve és melyik nincs. Eszerint adjuk hozzá őket két külön tömbhöz */
    ul.querySelectorAll("li").forEach((el => {
        if(teljesitve && el.classList.contains("teljesitve")){
            result.push(el.textContent);
            
        } else if (!teljesitve && !el.classList.contains("teljesitve")) {
          result.push(el.textContent);
        }
    }));
    return result;
}

//Itt elakadtam, mert a false paraméterrel a getListValue("ul", "false") ugyanazt téríti vissza mintha a második paraméter true lenne....