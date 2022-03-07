function order() {
    if (localStorage.getItem("orderId") == null) {
        document.location.href = `index.html`;
    }
    const NumCommande = document.getElementById("orderId");
    NumCommande.innerText =localStorage.getItem("orderId");
    localStorage.clear();
}
order();