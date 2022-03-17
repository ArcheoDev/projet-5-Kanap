//Insérer les produits de l'API

//Dans index.html, l. 117, le code source du script a été changé "/js/index.js"
const URL = 'http://localhost:3000/api/products';                               //constante pour l'URL de l'API car lien unique   
let section = document.getElementById('items');                                 //permet de récupérer l'ID dans l'HTML
let html = "";                                                                  //déclaration de la variable html

fetch(URL)                                                                      //je récupére les éléments et j'exécute des requêtes HTTP
    .then(res => res.json())                                                    //je récupére le résultat de la requête au format json
    .then(function(kanaps) {       
        console.log(kanaps);                                                    //récupération des éléments dans un tableau, 8 lignes car 8 canapés                                        
        kanaps.map((kanap => {                                                  //j'exécute une fonction sur chaque élément du tableau
            html =                                                              //boucle, je reprends les éléments de l'HTML en commentaire et j'ajoute les différents types de données issues du pdf "spécifications fonctionnelles" 
            `<a href="./product.html?id=${kanap._id}">                          
                <article>                                 
                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">     
                    <h3 class="productName">${kanap.name}</h3>
                    <p class="productDescription">${kanap.description}</p>
                </article>
            </a>`;
        section.insertAdjacentHTML("beforeend", html);}))                       // incère les noeuds dans le DOM/ insertAdjacentHTML : Alternative à innerHTML, plus rapide et directe / beforeend : position, chaine de caractère juste à l'intérieur de l'élément, après son premier enfant
    })                                                                          //insertion de l'HTML dans la section  /  une boucle, il va créer autant d'HTML qu'il y a de canapé
    .catch(err => console.log('Une erreur est survenue : ' + err))              //Si erreur, l'API ne fonctionne plus, console log alert
