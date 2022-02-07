//Etape 3 - Insérer les produits de l'API

//Dans index.html, l. 117, le code source du script a été changé "/js/index.js"
const URL = 'http://localhost:3000/api/products';       
var section = document.getElementById('items'); 
var html = "";

fetch(URL)                                                                      //j'exécute des requêtes HTTP
    .then(res => res.json())                                                    //je récupére le résultat de la requête au format json
    .then(function(getkanap) {                                                  //get=récupérer des données    
        getkanap.forEach((kanap => {                                            //j'exécute une fonction sur chaque élément du tableau
            html =                                                              //je reprends les éléments de l'HTML en commentaire et j'ajoute les différents types de données issues du ppt "spécifications fonctionnelles" 
            `<a href="./product.html?id=${kanap.id}">                          
                <article>                                 
                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">     
                    <h3 class="productName">${kanap.name}</h3>
                    <p class="productDescription">${kanap.description}</p>
                </article>
            </a>`;
        section.insertAdjacentHTML("beforeend", html);}))                       // insertAdjacentHTML : Alternative à innerHTML, plus rapide et directe / beforeend : chaine de caractère juste à l'intérieur de l'élément, après son premier enfant
    })    
    .catch(function(err) {                                                      //Si erreur
    });
