
let menu_status = false;
const menu = document.querySelector("#menu");

document.querySelector(".icon_menu").addEventListener("click", ()=>{
  menu.style.display = "block"
  setTimeout(()=>{menu.style.left = "40vw";},1)
  menu_status = true;
})
document.querySelectorAll("#menu ul li a").forEach(element => {
  element.addEventListener("click", ()=>{
    if (menu_status === true) {
      menu.style.left = "100vw";
      setTimeout(()=>{menu.style.display = "none"}, 500)
      menu_status = false;
    }
  })
});

document.querySelector("main").addEventListener("click", ()=>{
  if (menu_status === true) {
    menu.style.left = "100vw";
    setTimeout(()=>{menu.style.display = "none"}, 500)
    menu_status = false;
  }
});

// let number = "17866020877";
// let message = encodeURIComponent(`Hello, I want to customize the frame ${product.Product_name}`);

// let urlWeb = `https://web.whatsapp.com/send?phone=${number}&text=${message}`;
// let urlApp = `https://wa.me/${number}?text=${message}`; 

// if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) window.open(urlApp, "_blank");
// else window.open(urlWeb, "_blank");