//Insérer les produits de l'API

//Dans index.html, l. 117, le code source du script a été changé "/js/index.js"
const URL = 'http://localhost:3000/api/products';       
let section = document.getElementById('items'); 
let html = "";

fetch(URL)                                                                      //j'exécute des requêtes HTTP
    .then(res => res.json())                                                    //je récupére le résultat de la requête au format json
    .then(function(kanaps) {                                                  
        kanaps.map((kanap => {                                                  //j'exécute une fonction sur chaque élément du tableau
            html =                                                              //je reprends les éléments de l'HTML en commentaire et j'ajoute les différents types de données issues du pdf "spécifications fonctionnelles" 
            `<a href="./product.html?id=${kanap._id}">                          
                <article>                                 
                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">     
                    <h3 class="productName">${kanap.name}</h3>
                    <p class="productDescription">${kanap.description}</p>
                </article>
            </a>`;
        section.insertAdjacentHTML("beforeend", html);}))                       // insertAdjacentHTML : Alternative à innerHTML, plus rapide et directe / beforeend : position, chaine de caractère juste à l'intérieur de l'élément, après son premier enfant
    })                                                                          //insertion de l'HTML dans la section  /  une boucle, il va créer autant d'HTML qu'il y a de canapé
    .catch(err => console.log('Une erreur est survenue : ' + err))              //Si erreur, l'API ne fonctionne plus, console log alert
    ;
