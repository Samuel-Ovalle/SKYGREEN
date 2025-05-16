
document.addEventListener("DOMContentLoaded", ()=>{
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) ;
    else {
        document.querySelector("header").remove
        document.querySelector("body").insertAdjacentHTML("afterbegin", 
            `

            `
        )
    }
})

// let number = "17866020877";
// let message = encodeURIComponent(`Hello, I want to customize the frame ${product.Product_name}`);

// let urlWeb = `https://web.whatsapp.com/send?phone=${number}&text=${message}`;
// let urlApp = `https://wa.me/${number}?text=${message}`; 

// if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) window.open(urlApp, "_blank");
// else window.open(urlWeb, "_blank");