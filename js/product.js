//Modifier l'URL de l'API

const param = new URLSearchParams(document.location.search);
let id = param.get("id");
let Canap = new Object();


//Récupération des éléments des produits dans l'API

const getProduct = async (id) => {
    const result = await fetch(`http://localhost:3000/api/products/${id}`);
    const product = await result.json();
        const itemImageElement = document.createElement("img");
        itemImageElement.setAttribute("src", product.imageUrl);
        const itemTitleElement = document.createElement("h1");
        itemTitleElement.textContent = product.name;
        const itemPriceElement = document.createElement("span");
        itemPriceElement.textContent = product.price;
        const itemDescriptionElement = document.createElement("p");
        itemDescriptionElement.textContent = product.description;
        document.querySelector (".item__img").appendChild(itemImageElement);
        document.getElementById ("title").appendChild(itemTitleElement);
        document.getElementById ("price").appendChild(itemPriceElement);
        document.getElementById ("description").appendChild(itemDescriptionElement);
        let colors=product.colors;
        colors.map((c => {
            const optionElement = document.createElement("option");
                     optionElement.value = c;
                     optionElement.text = c;
            c = document.getElementById ("colors").appendChild(optionElement);
        }))
  };

  getProduct(id);


//Choix des couleurs, quantité des articles

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
            alert("Le canapé a été ajouté dans le panier");
            } else {
                alert("Le panier est vide");
            }

        }
    )
//En cas de panier vide

    function getPanier () {
        let panier = localStorage.getItem("panier");
         return  panier < 1 ? [] : JSON.parse(panier);
    }

      function setPanier (p) {
        localStorage.setItem('panier', JSON.stringify(p));
    } 

//Ajout d'un produit
    
    function addPanier (produit) {
        let panier = getPanier();
        let check = false;
        panier.map(item => {
            if(item.id == produit.id && item.colors == produit.colors) {
                check = true;
                item.quantity += parseInt(produit.quantity);
            }  
        });
            if (check == false) {
            panier.push(produit);  
        }
        setPanier(panier);
    }

  
    
