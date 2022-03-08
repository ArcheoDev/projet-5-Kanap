//Récupérer les données du localStorage
let panier = JSON.parse(localStorage.getItem('panier'));    //il va récupérer les valeurs qu'il y a dans le localstorage 
let html = "";                                              //pour afficher les produits dans le panier, string vide
let section = document.getElementById('cart__items');       //variable, va récupérer dans le html où se trouve la carte "cart items"

let kanap = new Object();                                   //création d'une variable de type objet, pour stocker des données à l'intérieur
let canapQuantite = document.getElementsByClassName("itemQuantity");  //variable qui va récupérer dans le html la class itemQuantity
let compteurPrix = 0;         // 0 car c'est le minimum
let prixTotal = 0;  
let compteur = 0;

const promises = panier.map(i => {                                  //on a mapper sur le panier / récupération des valeurs dans le localstorage
    return fetch(`http://localhost:3000/api/products/` + i.id)      //pour récupérer les données de chaque produit
    .then(resp => {                                                 //réponse : donne les données d'un produit
      return resp.json();
    });  
});

Promise.all(promises)             //chronologie de l'appel
  .then(kanaps => {               //a récupéré les données de la promesse
    kanaps.forEach(kanap => {     //données des produits mis dans le panier, itinéré par forEach 
    displayCanap(kanap);          //les données d'un produit ont été utilisées comme un paramètre à l'interieur d'une fonction displayCanap
    updateQuantity();             //si mise à jour de la quantité, la promesse va être déclenchée, boucle
    deleteCanap();
    totalQuantite();
    totalPrix(kanap);
    compteur++;   
  });
});


// Afficher les données de chaque produit dans le panier
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

// Afficher une alerte pour retourner à la page d'accueil
function backPageHome() {
    alert('Le panier est vide ! retour à la case départ : accueil ');
    location.href = 'index.html';
}


//Supprimer un produit
function deleteCanap() {                                
  const supprKanap = document.querySelectorAll('.deleteItem');    //va récupérer la localisation de tous les delateItem  
  for (let i = 0; i < supprKanap.length; i++) {                   //boucle for sur le nombre total de la selection
    
    supprKanap[i].addEventListener('click', (event) => {          //avec l'évenement click on peut récupérer la selection du canapé [i] qu'on souhaite supprimer
      event.preventDefault();                                     //pour ne pas avoir d'effets indésirables
      panier.splice(i, 1);                                        //on supprime le produit [i] une fois
      localStorage.setItem('panier',JSON.stringify(panier));      //on modifie et on enregistre les item du panier
      !panier.length ? backPageHome() : displayAlert();           //deux conditions : Si nombre supérieur à 1, il va afficher le displayAlert (mise à jour de la page), si 0, affichage du backPageHome
    })
  } 
}

function displayAlert() {                                         // mise à jour de la page
  alert("Suppression de votre Kanap !");
  location.reload();
}

// Changement de la quantité par le client, page panier
function updateQuantity() {
  const kanapQuantity = document.querySelectorAll('.itemQuantity');   //va récupérer toutes les selections de quantité .itemQuantity
  for (let i = 0; i < kanapQuantity.length; i++) {                    //boucle for pour itiner le nombre qui représente kanapQuantity.length
    kanapQuantity[i].addEventListener('change', (event) => {          //on récupére l'index du bouton qui va changer la quantité, en utilisant evenement change
      event.preventDefault();                                         //pour ne pas avoir d'effet indésirable
      const kanapNewQuantity = event.target.value;                    //pour récupérer la valeur de chaque événement
      const newPanier = {                                             //quantity : kanapNewQuantity pour remplacer la nouvelle quantité
        id: panier[i].id,
        colors: panier[i].colors,
        quantity: kanapNewQuantity,
        price: panier[i].price,
      };
      panier[i] = newPanier;                                          //résultat : panier mis à jour [i] panier qu'on a récupéré après l'évenement
      localStorage.setItem('panier',JSON.stringify(panier));          // setItem, pour modifier le localStorage
    });
  }
}

//quantité total 
function totalQuantite() {              //calcule la quantité totale des articles
  let kanapTotal = 0;                   //intensié à 0 / pas de produit = 0 

  for(let k = 0; k < canapQuantite.length; k++) {     //boucle for / pour récuperer le nombre de kanap
    kanapTotal += canapQuantite[k].valueAsNumber;     // on incrémente chaque produit ajouté
  }  
  let kanapTotalQuantite = document.getElementById("totalQuantity");  //kanapTotalQuantite de l'HTML, 
  kanapTotalQuantite.innerHTML = kanapTotal;                          //ajout de "totalQuantité" 
}

//prix total
function totalPrix(kanap) {           //calcule le prix total des articles à partir du paramètre Kanap
  
  prixTotal += canapQuantite[compteurPrix].valueAsNumber * kanap.price;  //le prix total va être récupérer et mis à jour / quantité x prix

  let prixTotalKanap = document.getElementById("totalPrice");     //on a chercher dans le html l'id totalPrice
  prixTotalKanap.innerHTML = prixTotal;                           // ajout du prix calculé
  compteurPrix++;                                                 //promesse : il va ajouter chaque produit selectionné
}

//Formulaire
const formulaire = document.querySelector('.cart__order__form');  //on a récupérer la selection .cart.... pour le formulaire
let regex = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{2,}$/;                        //test pour vérifier s'il y a au moins 2 caractéres dans un mot
let regexLocal= /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{2,}$/;                 //idem
let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;   //test type mail
let prenomValide = false;                                         //on les a instencié avec false, si le test est valide, ça passe à true
let nomValide = false;
let adresseValide = false;
let villeValide = false;
let emailValide = false;

//Contrôler le formulaire
formulaire.firstName.addEventListener('input', function(){            //evenement type input avec id firstName
    this.nextElementSibling.innerHTML = regex.test(this.value) ? "" : "Saisissez au moins deux caractères";  //fonction JS pour tester regex.test / this.value : valeur input / 2 conditions : si test accepté "", si pas accepté message d'erreur
    prenomValide = regex.test(this.value);             //deux conditions : il va nous retourner true ou false
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
function verifForm() {          //si tout est valide = true / sinon affiche une alert
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
let orderDetail = {                 //pour récupérer toutes les données du formulaire
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
const commander = document.getElementById('order');     //récupérer de l'id order

commander.addEventListener("click", (event) => {        //avec un évenement click sur le bouton id "order"
                event.preventDefault();                 //retirer l'événement
                if (verifForm()) {                      //si tous les champs sont valides : true
                        let post = {                  //une api peut avoir 4 méthodes, dont post
                            method: 'POST',             //post = 
                            headers: {                  //entête et contenu du message (body)
                                'content-Type': 'application/json'}, //on envoie des données de type Json
                            body: JSON.stringify(orderDetail),  //ce qu'on a récupéré est transformé en Json
                            };
                        fetch("http://localhost:3000/api/products/order", post)   //adresse ou on doit envoyer le post
                            .then((response) => response.json())                   //réponse de la demande
                            .then(data => {
                                // console.log(data);
                                localStorage.setItem("orderId", data.orderId);    //après l'enregistrement de la commande, création d'un id de commande
                                document.location.href = `confirmation.html`;     //renvoie à la page confirmation.html
                            });
                } else {
                    alert("Veuillez corriger le formulaire");  //si le verifForm n'est pas valide, demande de correction
                }
});






