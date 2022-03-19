//Modifier l'URL de l'API


// L'interface URLSearchParams permet de demander au DOM où on se trouve la page. On récupére ensuite le paramètre ID de l'URL

const param = new URLSearchParams(document.location.search);
let id = param.get("id");

//variable de type objet
let Canap = new Object();


//Récupération des éléments des produits dans l'API

//Création de la fonction fléchée getProduct, async : temps d'attente / synchronisation
// On a récupérer le paramètre de l'ID dans l'URL, on va l'utiliser dans notre fonction comme un paramètre
// const result : await temps d'attente pour éviter les bug / fetch, utilisation d'une concatenation, pour récupérer les données d'un seul produits, il faut utiliser cette URL avec un ID unique
//Les données sont transformé en format .json()
//On a préparé les 4 variables
//querySelector = va chercher une class qui s'appelle .item_img / .appendChild = ajoute à l'intérieur la variable itemImageElement (variable qu'on a crée auparavent comme valeur source)
//getElementbyId = va chercher un ID (titre, prix, description)
//couleur : plusieurs options, puisqu'on a un tableau on peut mapper
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

// On appelle la fonction getProduct

  getProduct(id);


//Choix des couleurs, quantité des articles

//Evenements
//On recherche l'ID "color", type option car il y en a plusieurs / addEventListener  il va récupérer les valeur d'un événement "change"
//parseInt : transforme un string en nombre (ou mettre +())

    document.getElementById ("colors").addEventListener(
        "change", (event) =>
        colors = event.target.value)
    
    document.getElementById ("quantity").addEventListener(
        "change", (event) => {
        quantity = parseInt(event.target.value);
        })

//Click quantité

//preventDefault : prévenir des effets indésirables
//on a fait une condition if, le clique fonctionne quand la quantité est comprise entre 1 et 100, quand la couleur a été choisie
//on a récupéré l'ID, la quantité et la couleur
//Else : si les conditions ne sont pas remplis, pop up le panier est vide
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

// localStorage, petit espace de stockage
// Si on a dans le localStorage un panier, les valeurs sont converties en .json(), s'il y a rien, ça nous retourne un tableau vide

    function getPanier () {
        let panier = localStorage.getItem("panier");
         return  panier < 1 ? [] : JSON.parse(panier);
    }

//Set reprend un paramètre qui sera converti en .json() 

      function setPanier (p) {
        localStorage.setItem('panier', JSON.stringify(p));
    } 

//Ajout d'un produit
    
//add : on a récupérer le getPanier + variable check a qui on a assigné un booléen 
// on a mapper sur ce panier : si la canap est exactement pareil, on ajoute uniquement la quantité 
// si produit différent, panier push, on entre une nouvelle ligne dans la commande
// l'ensemble des produits sont mis dans le setPanier

    function addPanier (produit) {
        let panier = getPanier();
        let check = false;
        panier.map(item => {
            if(item.id == produit.id && item.colors == produit.colors) {
                // Si canap identique, incrémentation
                check = true;
                item.quantity += parseInt(produit.quantity);
            }  
        });
        // Ajout d'une clé 
        if (check == false) {
            panier.push(produit);  
        }
        setPanier(panier);
    }

  
    
