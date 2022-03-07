let panier = JSON.parse(localStorage.getItem('panier'));  

let html = "";
let section = document.getElementById('cart__items');

// Création des variables du produit kanap
let kanap = new Object();
// Variable liée au event 

let canapQuantite = document.getElementsByClassName("itemQuantity");

// variable pour la fonction prix
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


// Affichage produits
function displayCanap(kanap) {
  html = html + `
    <article class="cart__item" data-id="${kanap._id}" data-color="${panier[compteur].colors}">
      <div class="cart__item__img">
          <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      </div>
      <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${kanap.name}</h2>
              <p>${panier[compteur].colors}</p>
              <p>${kanap.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[compteur].quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
    </article>`; 
  section.innerHTML = html;
}

// Panier vide retour Accueil
function backPageHome() {
    alert('Le panier est vide ! retour accueil !');
    location.href = 'index.html';
}

// Changement quantité KANAP par utilisateur en direct sur le panier
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
      localStorage.clear();
      localStorage.setItem('panier',JSON.stringify(panier));
      location.reload();
    });
  }
}

//Supprimer un produit kanap
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

//Total des articles 
function totalQuantite() {    
  let kanapTotal = 0;  

  for(let k = 0; k < canapQuantite.length; k++) {
    kanapTotal += canapQuantite[k].valueAsNumber;
  }  
  let kanapTotalQuantite = document.getElementById("totalQuantity");
  kanapTotalQuantite.innerHTML = kanapTotal; 
}

//Total des prix
function totalPrix(kanap) {
  
  prixTotal += canapQuantite[compteurPrix].valueAsNumber * kanap.price;

  let prixTotalKanap = document.getElementById("totalPrice");
  prixTotalKanap.innerHTML = prixTotal;
  compteurPrix++;     
}

//Check de la saisie avec les expressions régulières REGEX
const formulaire = document.querySelector('.cart__order__form');
let regex = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/;
let regexLocal= /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/;
let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
let prenomValide = false;
let nomValide = false;
let adresseValide = false;
let villeValide = false;
let emailValide = false;

formulaire.firstName.addEventListener('input', function(){
    this.nextElementSibling.innerHTML = regex.test(this.value) ? "" : "Au moins 3 caractères !";
    prenomValide = regex.test(this.value);
});

formulaire.lastName.addEventListener('input', function() {
    this.nextElementSibling.innerHTML = regex.test(this.value) ? "" : "Au moins 3 caractères !";
    nomValide = regex.test(this.value);
});

formulaire.address.addEventListener('input', function() {
    this.nextElementSibling.innerHTML = regexLocal.test(this.value) ? "" : "Adresse non valide !";
    adresseValide = regexLocal.test(this.value);
});

formulaire.city.addEventListener('input', function(){
    this.nextElementSibling.innerHTML = regexLocal.test(this.value) ? "" : "Ville non valide !";
    villeValide = regexLocal.test(this.value);
});

formulaire.email.addEventListener('input', function() {
    this.nextElementSibling.innerHTML = regexEmail.test(this.value) ? "" : "Email non valide !";
    emailValide = regexEmail.test(this.value);
});

// Fonction pour vérifier que le remplissage du formulaire est conforme
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
        alert('Le formulaire contient des erreurs.');
        return false;
    }
}

// Objet defini pour les données de commande
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

//Commander!
const commander = document.getElementById('order');

commander.addEventListener("click", (event) => {
                event.preventDefault();
                if (verifForm()) {
                        const post = {
                            method: 'POST',
                            headers: {
                                'content-Type': 'application/json'},
                            body: JSON.stringify(orderDetail),
                            };
                        fetch("http://localhost:3000/api/products/order", post)
                            .then((response) => response.json())
                            .then(data => {
                                console.log(data);
                                // ok orderid bien récupéré !
                                localStorage.setItem("orderId", data.orderId);
                                document.location.href = `confirmation.html`;
                            });
                } else {
                    alert("Veuillez corriger celui-ci");
                }
});






