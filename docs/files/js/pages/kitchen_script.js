class product {
    constructor(name, img, nutritional_facts, price){
        this.name = name;
        this.img = img;
        this.nutritional_facts = nutritional_facts;
        this.price = price;
    }
}

let products = []

products.push(new product("Arepa rellena de queso", "arepa_queso.png","arepa_queso.jpeg"))
products.push(new product("Arepa rellena de queso con arequipe", "arepa_queso_arequipe.png","arepa_queso_arequipe.jpeg"))
products.push(new product("Arepa rellena de queso con bacon", "arepa_queso_bacon.png","arepa_queso_bacon.jpeg"))
products.push(new product("Arepa rellena de queso con bocadillo", "arepa_queso_bocadillo.png","arepa_queso_bocadillo.jpeg"))

for (let i = 0; i < products.length; i++) {
    document.querySelector(".products_container").insertAdjacentHTML("beforeend", 
        `
        <div class="product" id="${products[i].name.replace(/ /g, "_")}">
            <img src="assets/img/kitchen/arepas/${products[i].img}" alt="">
            <p>${products[i].name}</p>
            <button id="buy_product">Pedir</button>
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