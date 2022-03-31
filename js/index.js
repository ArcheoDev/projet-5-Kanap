const URL = 'http://localhost:3000/api/products';
let section = document.getElementById('items');
let html = "";

const getProductList = async () => {
    const result = await fetch(URL);
    const productList = await result.json();
    for (let productItem of productList) {
        const itemElement = document.createElement("a");
        const itemImageElement = document.createElement("img");
        const itemTitleElement = document.createElement("h3");
        const itemTextElement = document.createElement("p");
        const itemArticle = document.createElement("article");
        
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

