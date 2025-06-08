class product {
    constructor(name, img, price, id){
        this.name = name;
        this.img = img;
        this.price = price;
        this.id = id;
    }
}

let products = []

products.push(new product("Baby sal", 2, 350, 0))
products.push(new product("Butterflys", 2, 200, 1))
products.push(new product("Cora", 1, 150, 2))
products.push(new product("Flat moon", 1, 300, 3))
products.push(new product("Magic forest", 1, 550, 4))
products.push(new product("Mini cactus", 1, 25, 5))
products.push(new product("Paradise drawers", 1, 300, 6))

for (let i = 0; i < products.length; i++) {
    let product_back_name = products[i].name.replace(/ /g, "_")
    document.querySelector(".products_container").insertAdjacentHTML("beforeend", 
        `
        <div class="product ${product_back_name}" id="product-${products[i].id}">
            <div class="img_product">
                <img src="assets/img/designs/used/${product_back_name}-1.png" alt="">
            </div>
            <p>${products[i].name}</p>
        </div>
        `
    )
}

const change_img = (count_img, index_img, img, direction)=>{
    if (direction === "=>") index_img = (index_img < count_img) ? index_img + 1 : 1;
    else if (direction === "<=") index_img = (index_img > 1) ? index_img - 1 : count_img;
    img.style.opacity = 0;
    
    setTimeout(() => {
        img.src = img.src.replace(/-(\d+)\.png$/, `-${index_img}.png`);
        img.onload = ()=>{img.style.opacity = 1;}
    }, 400);

    return index_img
}

products.forEach((product, index) => {
    if (product.img > 1) {
        let img = document.querySelector(`#product-${index} .img_product img`)
        
        setInterval(()=>{
            change_img(product.img, parseInt(img.src.match(/-(\d+)\.png$/)[1]), img, "=>")
        }, 5000)
    }
});


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
                    <p>$${products[element.id.split("-")[1]].price} USD</p>
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
                    <svg class="esc_icon" role="img" aria-label="menu icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 48.07 45.61" style="enable-background:new 0 0 48.07 45.61;" xml:space="preserve">
                        <style type="text/css">
                            .st3{fill:none;stroke:var(--border-color-1);stroke-width:7;stroke-linecap:round;stroke-miterlimit:10;}
                        </style>
                        <line class="st3 line1" x1="10" y1="35" x2="37" y2="10"/>
                        <line class="st3 line2" x1="10" y1="10" x2="37" y2="35"/>
                    </svg>
                </div>
                `
            )
            if (products[element.id.split("-")[1]].img !== 1) {
                document.querySelector("#product_select .img_product").style.marginBottom = "2%"
                document.querySelector("#product_select").insertAdjacentHTML("beforeend",
                    `
                    <svg class="scroll_arrow arrow_img_right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125.36 125.36">
                        <defs>
                            <style>.cls-1{fill:none;stroke:var(--border-color-1);stroke-linecap:round;stroke-miterlimit:10;stroke-width:7px;}</style>
                        </defs>
                        <circle class="cls-1" cx="62.68" cy="62.68" r="59.18"/>
                        <polyline class="cls-1" points="94.03 48.26 78.36 67.77 62.68 87.27 47 67.77 31.33 48.26"/>
                    </svg>
                    <svg class="scroll_arrow arrow_img_left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125.36 125.36">
                        <defs>
                            <style>.cls-1{fill:none;stroke:var(--border-color-1);stroke-linecap:round;stroke-miterlimit:10;stroke-width:7px;}</style>
                        </defs>
                        <circle class="cls-1" cx="62.68" cy="62.68" r="59.18"/>
                        <polyline class="cls-1" points="94.03 48.26 78.36 67.77 62.68 87.27 47 67.77 31.33 48.26"/>
                    </svg>
                    <div id="img_list"></div>
                    `
                )
                for (let i = 0; i < products[element.id.split("-")[1]].img; i++) {
                    document.querySelector("#img_list").insertAdjacentHTML("beforeend", `<div class="selected_img"></div>`)
                }
                
                let img = document.querySelector("#product_select .img_product img");
                let index_img = parseInt(img.src.match(/-(\d+)\.png$/)[1])
                let list = document.querySelectorAll("#img_list .selected_img");
                list[index_img-1].style.opacity = "1"
                
                document.querySelector(".arrow_img_right").addEventListener("click", ()=>{
                    let index_img = change_img(products[element.id.split("-")[1]].img, parseInt(img.src.match(/-(\d+)\.png$/)[1]), img, "=>")
                    list.forEach(element => {element.style.opacity = ".5"});
                    list[index_img-1].style.opacity = "1"
                })
                document.querySelector(".arrow_img_left").addEventListener("click", ()=>{
                    let index_img = change_img(products[element.id.split("-")[1]].img, parseInt(img.src.match(/-(\d+)\.png$/)[1]), img, "<=")
                    list.forEach(element => {element.style.opacity = ".5"});
                    list[index_img-1].style.opacity = "1"
                })
            }
            
            document.querySelector("#buy_product").addEventListener("click", ()=>{
                let number = "17866020877";
                let message = encodeURIComponent(`Hola, me gustaria adquirir el cuadro ${products[element.id].name}`);
                
                let urlWeb = `https://web.whatsapp.com/send?phone=${number}&text=${message}`;
                let urlApp = `https://wa.me/${number}?text=${message}`; 
                
                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) window.open(urlApp, "_blank");
                else window.open(urlWeb, "_blank");
            })
            
            document.querySelector(".esc_icon").addEventListener("click", ()=>{
                document.querySelector("#product_select").remove()
                products_status = false
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