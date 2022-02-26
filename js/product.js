//Modifier l'URL de l'API

const param = new URLSearchParams(document.location.search);        //je demande au DOM où on se trouve
let id = param.get("id");                                           //je récupére le paramètre ID de l'url
console.log(id);                                                    //récupération de l'id pour chaque canapé

fetch(`http://localhost:3000/api/products/${id}`)                   //récupération des éléments descriptif d'un canapé
    .then(res => res.json())
    .then(k => {
        console.log (k);
        document.querySelector (".item__img").innerHTML=
        `<img src="${k.imageUrl}" alt="${k.altTxt}">`;
        document.getElementById ("title").innerHTML=
        `<h1 id="title">${k.name}</h1>`
        document.getElementById ("price").innerHTML=
        `<span id="price">${k.price}</span>`
        document.getElementById ("description").innerHTML=
        `<p id="description">${k.description}</p>`
        let colors=k.colors;
        colors.forEach((c => {
            c = document.getElementById ("colors").innerHTML+=
            `<option value="${c}">${c}</option>`
        }))
      }
    );
    
    document.getElementById ("colors").addEventListener(
        "change", (event) =>
        colors = event.target.value)
    
    document.getElementById ("quantity").addEventListener(
        "change", (event) => {
        quantity = parseInt(event.target.value);
        console.log(quantity);
        }
        )