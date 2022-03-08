function order() {                                            
    if (localStorage.getItem("orderId") == null) {          //si dans le localStorage on n'a pas stocker d'ID (=null) ça renvoie à index.html
        document.location.href = `index.html`;
    }
    const NumCommande = document.getElementById("orderId");     //on a récupéré orderId dans la page confirmation.html
    NumCommande.innerText =localStorage.getItem("orderId");     // on a rajouté la valeur
    localStorage.clear();                                        // localStorage vidé suite à la finalisation de la commande
}
order();