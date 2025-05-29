class product {
    constructor(name, img, price, id){
        this.name = name;
        this.img = img;
        this.price = price;
        this.id = id;
    }
}

let products = []

products.push(new product("Baby sal", "Baby_sal.png", 350, 0))
products.push(new product("Butterfly", "Butterflys.png", 200, 1))
products.push(new product("Cora", "Cora.png", 150, 2))
products.push(new product("Flat moon", "Flat_moon.png", 300, 3))
products.push(new product("Magic forest", "Magic_forest.png", 500, 4))
products.push(new product("Mini cactus", "Mini_cactus.png", 25, 5))
products.push(new product("Paradise drawers", "Paradise_drawers.png", 300, 6))

for (let i = 0; i < products.length; i++) {
    document.querySelector(".products_container").insertAdjacentHTML("beforeend", 
        `
        <div class="product ${products[i].name.replace(/ /g, "_")}" id="${products[i].id}">
            <div class="img_product">
                <img src="assets/img/designs/used/${products[i].img}" alt="">
            </div>
            <p>${products[i].name}</p>
        </div>
        `
    )
}

let products_status = false;
document.querySelectorAll(".product").forEach(element => {
    element.addEventListener("click", ()=>{
        if (products_status === false) {
            document.querySelector(".products_container").insertAdjacentHTML("beforeend", 
                `
                <div class="product" id="product_select">
                    <h4>${element.children[1].innerHTML}</h4>
                    <div class="img_product">
                        ${element.children[0].innerHTML}
                    </div>
                    <p>$${products[element.id].price} USD</p>
                    <button id="buy_product">
                        <svg class="icon icon_shopping" role="img" aria-label="shopping icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 48.04 48.26" style="enable-background:new 0 0 48.04 48.26;" xml:space="preserve">
                            <style type="text/css">
                                .st1{fill:none;stroke:var(--border-color-1);stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;}
                            </style>
                            <path class="st1" d="M44.31,17.64H3.69v14.5c0,6.81,5.52,12.33,12.33,12.33h15.97c6.81,0,12.33-5.52,12.33-12.33V17.64z"/>
                            <path class="st1" d="M13.33,24.81V12.36c0-4.81,4.77-8.71,10.67-8.71h0c5.89,0,10.67,3.9,10.67,8.71v12.45"/>
                        </svg>
                        Comprar
                    </button>
                </div>
                `
            )
            
            document.querySelector("#buy_product").addEventListener("click", ()=>{
                let number = "17866020877";
                let message = encodeURIComponent(`Hola, me gustaria adquirir el cuadro ${products[element.id].name}`);
                
                let urlWeb = `https://web.whatsapp.com/send?phone=${number}&text=${message}`;
                let urlApp = `https://wa.me/${number}?text=${message}`; 
                
                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) window.open(urlApp, "_blank");
                else window.open(urlWeb, "_blank");
            })
            
            setTimeout(() => {
                products_status = true;
            }, 1);
        }
    })
});

document.addEventListener("click", (event)=>{
    if (products_status === true) {
        if (!document.querySelector("#product_select").contains(event.target)) {
            document.querySelector("#product_select").remove();
            products_status = false;
        }
    }
});

window.addEventListener("keydown", (e)=>{
    if (e.key === "Escape") {
        if (document.querySelector("#product_select")) {
            document.querySelector("#product_select").remove();
            products_status = false;
        }
    }
})