let panier = JSON.parse(localStorage.getItem('panier'));
let html = "";
let section = document.getElementById('cart__items');

let kanap = new Object();
let canapQuantite = document.getElementsByClassName("itemQuantity");
let compteurPrix = 0;
let prixTotal = 0;  
let compteur = 0;

const promises = panier.map(i => {
    return fetch(`http://localhost:3000/api/products/` + i.id)
    .then(resp => {
      return resp.json();
    });
});

Promise.all(promises)
  .then(kanaps => {
    kanaps.forEach(kanap => {
    displayCanap(kanap);
    updateQuantity();
    deleteCanap();
    totalQuantite();
    totalPrix(kanap);
    compteur++;   
  });
});


function displayCanap(kanap) {
  // Création de la balise "article" et insertion dans la section
  let productArticle = document.createElement("article");
  document.querySelector("#cart__items").appendChild(productArticle);
  productArticle.className = "cart__item";
  productArticle.setAttribute("data-id", kanap._id);

  // Insertion de l'élément "div" pour l'image produit
  let productDivImg = document.createElement("div");
  productArticle.appendChild(productDivImg);
  productDivImg.className = "cart__item__img";

  // Insertion de l'image
  let productImg = document.createElement("img");
  productDivImg.appendChild(productImg);
  productImg.src = kanap.imageUrl;
  
  // Insertion de l'élément "div" pour la description produit
  let productItemContent = document.createElement("div");
  productArticle.appendChild(productItemContent);
  productItemContent.className = "cart__item__content";

  // Insertion de l'élément "div"
  let productItemContentTitlePrice = document.createElement("div");
  productItemContent.appendChild(productItemContentTitlePrice);
  productItemContentTitlePrice.className = "cart__item__content__titlePrice";
  
  // Insertion du titre h2
  let productTitle = document.createElement("h2");
  productItemContentTitlePrice.appendChild(productTitle);
  productTitle.innerHTML = kanap.name;

  // Insertion de la couleur
  let productColor = document.createElement("p");
  productTitle.appendChild(productColor);
  productColor.innerHTML = panier[compteur].colors;
  productColor.style.fontSize = "20px";

  // Insertion du prix
  let productPrice = document.createElement("p");
  productItemContentTitlePrice.appendChild(productPrice);
  productPrice.innerHTML = kanap.price + " €";

  // Insertion de l'élément "div"
  let productItemContentSettings = document.createElement("div");
  productItemContent.appendChild(productItemContentSettings);
  productItemContentSettings.className = "cart__item__content__settings";

  // Insertion de l'élément "div"
  let productItemContentSettingsQuantity = document.createElement("div");
  productItemContentSettings.appendChild(productItemContentSettingsQuantity);
  productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
  
  // Insertion de "Qté" : "
  let productQty = document.createElement("p");
  productItemContentSettingsQuantity.appendChild(productQty);
  productQty.innerHTML = "Qté : ";

  // Insertion de la quantité
  let productQuantity = document.createElement("input");
  productItemContentSettingsQuantity.appendChild(productQuantity);
  productQuantity.value = panier[compteur].quantity;
  productQuantity.className = "itemQuantity";
  productQuantity.setAttribute("type", "number");
  productQuantity.setAttribute("min", "1");
  productQuantity.setAttribute("max", "100");
  productQuantity.setAttribute("name", "itemQuantity");

  // Insertion de l'élément "div"
  let productItemContentSettingsDelete = document.createElement("div");
  productItemContentSettings.appendChild(productItemContentSettingsDelete);
  productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

  // Insertion de "p" supprimer
  let productSupprimer = document.createElement("p");
  productItemContentSettingsDelete.appendChild(productSupprimer);
  productSupprimer.className = "deleteItem";
  productSupprimer.innerHTML = "Supprimer";

  section.appendChild(productArticle);
}

// Afficher une alerte pour retourner à la page d'accueil
function backPageHome() {
    alert('Le panier est vide ! retour à la case départ : accueil ');
    location.href = 'index.html';
}


//Supprimer un produit
function deleteCanap() {
  const supprKanap = document.querySelectorAll('.deleteItem');
  for (let i = 0; i < supprKanap.length; i++) {
    
    supprKanap[i].addEventListener('click', (event) => {
      event.preventDefault();
      panier.splice(i, 1);
      localStorage.setItem('panier',JSON.stringify(panier));
      !panier.length ? backPageHome() : displayAlert();
    })
  } 
}

function displayAlert() {
  alert("Suppression de votre Kanap !");
  location.reload();
}

// Changement de la quantité par le client, page panier
function updateQuantity() {
  const kanapQuantity = document.querySelectorAll('.itemQuantity');
  for (let i = 0; i < kanapQuantity.length; i++) {
    kanapQuantity[i].addEventListener('change', (event) => {
      event.preventDefault();
      const kanapNewQuantity = event.target.value;
      const newPanier = {
        id: panier[i].id,
        colors: panier[i].colors,
        quantity: kanapNewQuantity,
        price: panier[i].price,
      };
      panier[i] = newPanier;
      localStorage.setItem('panier',JSON.stringify(panier));
      location.reload(); 
    });
  }
}

function totalQuantite() {              
  let kanapTotal = 0;                   

  for(let k = 0; k < canapQuantite.length; k++) {     
    kanapTotal += canapQuantite[k].valueAsNumber;    
  }  
  let kanapTotalQuantite = document.getElementById("totalQuantity");  
  kanapTotalQuantite.innerHTML = kanapTotal;                         
}

//prix total
function totalPrix(kanap) {
  
  prixTotal += canapQuantite[compteurPrix].valueAsNumber * kanap.price;

  let prixTotalKanap = document.getElementById("totalPrice");
  prixTotalKanap.innerHTML = prixTotal;
  compteurPrix++;
}


//Formulaire
const formulaire = document.querySelector('.cart__order__form');
let regex = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{2,}$/;
let regexLocal= /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{2,}$/;
let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
let prenomValide = false;
let nomValide = false;
let adresseValide = false;
let villeValide = false;
let emailValide = false;

//Contrôler le formulaire
formulaire.firstName.addEventListener('input', function(){
    this.nextElementSibling.innerHTML = regex.test(this.value) ? "" : "Saisissez au moins deux caractères";
    prenomValide = regex.test(this.value);
});

formulaire.lastName.addEventListener('input', function() {
    this.nextElementSibling.innerHTML = regex.test(this.value) ? "" : "Saisissez au moins deux caractères";
    nomValide = regex.test(this.value);
});

formulaire.address.addEventListener('input', function() {
    this.nextElementSibling.innerHTML = regexLocal.test(this.value) ? "" : "L'adresse n'est pas valide";
    adresseValide = regexLocal.test(this.value);
});

formulaire.city.addEventListener('input', function(){
    this.nextElementSibling.innerHTML = regexLocal.test(this.value) ? "" : "La ville n'est pas valide";
    villeValide = regexLocal.test(this.value);
});

formulaire.email.addEventListener('input', function() {
    this.nextElementSibling.innerHTML = regexEmail.test(this.value) ? "" : "L'Email n'est pas valide";
    emailValide = regexEmail.test(this.value);
});

// Envoie du formulaire
function verifForm() {
    if (
        prenomValide &&
        nomValide &&
        adresseValide &&
        villeValide &&
        emailValide
    ) {
        return true;
    } else {
        alert('Le formulaire contient des erreurs');
        return false;
    }
}

//Données d'une commande
let orderDetail = {
    contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
    },
    products: []
};

//Enregistrer une commande

const commander = document.getElementById('order');

commander.addEventListener("click", (event) => {
                event.preventDefault();
                if (verifForm()) {
                        let post = {
                            method: 'POST',
                            headers: {
                                'content-Type': 'application/json'},
                            body: JSON.stringify(orderDetail),
                            };
                        fetch("http://localhost:3000/api/products/order", post)
                            .then((response) => response.json())
                            .then(data => {
                                // console.log(data);
                                localStorage.setItem("orderId", data.orderId);
                                document.location.href = `confirmation.html`;
                            });
                } else {
                    alert("Veuillez corriger le formulaire");
                }
});






