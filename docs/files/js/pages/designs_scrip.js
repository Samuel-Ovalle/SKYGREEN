class product {
    constructor(name, img, price){
        this.name = name;
        this.img = img;
        this.price = price;
    }
}

let products = []

products.push(new product("Baby sal", "Baby_sal.png"))
products.push(new product("Butterfly", "Butterflys.png"))
products.push(new product("Cora", "Cora.png"))
products.push(new product("Flat moon", "Flat_moon.png"))
products.push(new product("Magic forest", "Magic_forest.png"))
products.push(new product("Mini cactus", "Mini_cactus.png"))
products.push(new product("Paradise drawers", "Paradise_drawers.png"))

for (let i = 0; i < products.length; i++) {
    document.querySelector(".products_container").insertAdjacentHTML("beforeend", 
        `
        <div class="product" id="${products[i].name.replace(/ /g, "_")}">
            <div class="img_product">
                <img src="assets/img/designs/used/${products[i].img}" alt="">
            </div>
            <p>${products[i].name}</p>
        </div>
        `
    )
}

let number = "17866020877";
let message = encodeURIComponent(`Hello`);

let urlWeb = `https://web.whatsapp.com/send?phone=${number}&text=${message}`;
let urlApp = `https://wa.me/${number}?text=${message}`; 

// document.querySelectorAll(".product").forEach(element => {
//     element.addEventListener("click", ()=>{
//         if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) window.open(urlApp, "_blank");
//         else window.open(urlWeb, "_blank");
//     })
// });