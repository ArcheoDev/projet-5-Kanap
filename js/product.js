//Modifier l'URL de l'API

const param = new URLSearchParams(document.location.search);        //je demande au DOM où on se trouve
let id = param.get("id");                                           //je récupére le paramètre ID de l'url
console.log(id);                                                    //récupération de l'id pour chaque canapé

let Canap = new Object();


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
        colors.map((c => {
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
        })

    document.getElementById ("addToCart").addEventListener(
        "click", (event) => {
        event.preventDefault();
        if (quantity > 0 && quantity <=100 && colors != undefined && colors != "none" ) {
            const param = new URLSearchParams(document.location.search); 
            let id = param.get("id");  
            Canap.id = id;
            Canap.quantity = quantity;
            Canap.colors = colors;
            addPanier(Canap);
            } else {
                alert(" il n'y a rien dans le panier");
            }

        }
    )

    function getPanier () {
        let panier = localStorage.getItem("panier");
         return  panier < 1 ? [] : JSON.parse(panier);
            // if (panier < 1) {
            //    return [];         
            // }
            // else {
            //     return JSON.parse(panier)
            // }
    }

      function setPanier (p) {
        localStorage.setItem('panier', JSON.stringify(p));
    } 

    function addPanier (produit) {
        let panier = getPanier();
        let check = false;
        panier.map(item => {
            if(item.id == produit.id && item.colors == produit.colors) {
                // Si il y a un kanap (id + couleur) identique alors on incrémente le localstorage
                check = true;
                item.quantity += parseInt(produit.quantity);
            }  
        });
        // Si il n'y a pas de kanap (id + couleur) identique alors on ajoute un clé 
        if (check == false) {
            panier.push(produit);  
        }
        setPanier(panier);
    }

  
    
