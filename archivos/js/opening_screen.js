import {blur_efect, dropdown_menu, dropdown_panels} from "./header_module.js";

window.addEventListener("load", ()=>{
    const opening_screen = document.getElementById("opening_screen");
    opening_screen.scrollIntoView({ behavior: "auto" });
    history.scrollRestoration = "manual";

    let screen_position = 0;        
    window.addEventListener("wheel", (e) => {
        console.log(Dropdown_panels());
        
        if (e.deltaY > 0) {
            // down
            if (screen_position < 100 &&  cursor_status == true) {opening_screen.style.bottom = `${screen_position = screen_position + 10}%`}
        } else{
            // up
            if (screen_position !== 0 &&  cursor_status == true) {opening_screen.style.bottom = `${screen_position = screen_position - 10}%`}
        }
    });
})

icon_menu.addEventListener("click", ()=>{})