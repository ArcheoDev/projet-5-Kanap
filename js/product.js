//Modifier l'URL de l'API

const param = new URLSearchParams(document.location.search);        //je demande au DOM où on se trouve
let id = param.get("id");                                           //récupérer le paramètre ID de l'url
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .then(kanap => 
    console.log (kanap));