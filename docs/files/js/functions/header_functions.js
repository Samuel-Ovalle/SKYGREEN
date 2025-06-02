let menu_status = false;
const menu = document.querySelector("#mobile_devices_menu");

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