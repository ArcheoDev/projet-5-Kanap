//Insérer les produits de l'API


// On a un lien API qu'on a mis dans une constante URL. Ce lien nous donne les données du produit
// Le document.getElementById va récuperer les éléments avec un ID. On l'a mis dans une variable qui s'appelle let section
// Déclare la variable de html, de type string ("")

const URL = 'http://localhost:3000/api/products';
let section = document.getElementById('items');
let html = "";

// On utilise Fetch, qui fait appel à l'URL pour récupérer les ressources et pour manipuler les requêtes et les réponses 
// Les résultats de la requête sont récupérés en format json
// On récupére les éléments dans un tableau, puis on exécute une fonction sur chaque élément du tableau, au moyen d'une boucle (map)
// La variable HTML de type string, on a fait des concatations et les backtic ${}, ce qui permet de travailler sur chaque variable de produit 
// Les éléments de l'HTML en commentaire ont été repris, et on a ajouté les différents types de données issues du pdf "spécifications fonctionnelles"  
// L'inserAdjacentHTML a été utilisé pour incérer les données de l'HTML dans le DOM. Ceci est un alternative à innerHTML, car il est plus rapide et direct
// Grace à la boucle, il y aura la création d'autant d'HTML qu'il y a de canapé
// Si erreur, l'API ne fonctionne plus et un message d'alerte apparait

const getProductList = async () => {
    const result = await fetch(URL);
    const productList = await result.json();
    for (let productItem of productList) {
        const itemElement = document.createElement("a");
        const itemImageElement = document.createElement("img");
        const itemTitleElement = document.createElement("h3");
        const itemTextElement = document.createElement("p");
        const itemArticle = document.createElement("article");
    
    //    itemElement.setAttribute("class", "item-product");
    
        itemImageElement.setAttribute("src", productItem.imageUrl);
        itemTitleElement.textContent = productItem.name;
        itemTextElement.textContent = productItem.description;
        itemElement.href = `./product.html?id=${productItem._id}`;
    
        itemElement.appendChild(itemArticle);
        itemArticle.appendChild(itemImageElement);
        itemArticle.appendChild(itemTitleElement);
        itemArticle.appendChild(itemTextElement);
        
    
        section.appendChild(itemElement);
      }
  };

  getProductList();

/*fetch(URL)
    .then(res => res.json())
    .then(function(kanaps) {
        // console.log(kanaps);
        kanaps.map((kanap => {
            html =
            `<a href="./product.html?id=${kanap._id}">                          
                <article>                                 
                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">     
                    <h3 class="productName">${kanap.name}</h3>
                    <p class="productDescription">${kanap.description}</p>
                </article>
            </a>`;
        section.insertAdjacentHTML("beforeend", html);}))
    })
    .catch(err => console.log('Une erreur est survenue : ' + err)) */
