class product {
    constructor(name, img, nutritional_facts, price){
        this.name = name;
        this.img = img;
        this.nutritional_facts = nutritional_facts;
        this.price = price;
    }
}

let products = []

products.push(new product("Mini-arepas (12ud)", "mini-arepas.png", "", 12))
products.push(new product("Arepa rellena de queso", "arepa_queso.png","arepa_queso.jpeg", 12))
products.push(new product("Arepa de queso con arequipe", "arepa_queso_arequipe.png","arepa_queso_arequipe.jpeg", 15))
products.push(new product("Arepa de queso con bacon", "arepa_queso_bacon.png","arepa_queso_bacon.jpeg", 18))
products.push(new product("Arepa de queso con bocadillo", "arepa_queso_bocadillo.png","arepa_queso_bocadillo.jpeg", 15))

for (let i = 0; i < products.length; i++) {
    document.querySelector(".products_container").insertAdjacentHTML("beforeend", 
        `
        <div class="product" id="${products[i].name.replace(/ /g, "_")}">
            <p>${products[i].name}</p>
            <img src="assets/img/kitchen/arepas/${products[i].img}" alt="">
            <div class="price">$${products[i].price}USD</div>
            <button id="buy_product">¡Quiero probarla!</button>
        </div>
        `
    )
}

let number = "17866020877";

document.querySelectorAll("#buy_product").forEach(element => {
    element.addEventListener("click", ()=>{
        let message = encodeURIComponent(`Hola, me gustaria hacer un pedido de ${element.parentElement.id.replace(/_/g, " ")}`);
        
        let urlWeb = `https://web.whatsapp.com/send?phone=${number}&text=${message}`;
        let urlApp = `https://wa.me/${number}?text=${message}`; 
        
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) window.open(urlApp, "_blank");
        else window.open(urlWeb, "_blank");
    })
});