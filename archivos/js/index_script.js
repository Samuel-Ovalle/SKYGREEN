/* 
======================================
File: opening_creen.js
Description: 
Autor: Samuel Felipe Ovalle Rodriguez
Last modification: 24/2/2025
======================================
*/

import {blur_effect, dropdown_panels, scroll_dropdown_panels} from "./header_funtions.js";
window.addEventListener("load", ()=>{
    const opening_screen = document.getElementById("opening_screen");
    opening_screen.scrollIntoView({ behavior: "auto" });
    history.scrollRestoration = "manual";
    
    const icon_menu = document.querySelector(".icon_menu");
    const icon_shopping = document.querySelector(".icon_shopping");
    let dropdown_acrive;
    let dropdown_status = false;
    icon_menu.addEventListener("click", ()=>{
        dropdown_acrive = ".menu";
        dropdown_status = dropdown_panels(dropdown_acrive, "73vw", dropdown_status);
        blur_effect(dropdown_status);        
    })
    icon_shopping.addEventListener("click", ()=>{
        dropdown_acrive = ".shopping";
        dropdown_status = dropdown_panels(dropdown_acrive,"60vw", dropdown_status);
        blur_effect(dropdown_status);
    })

    let screen_position = 0;
    window.addEventListener("wheel", (e) => {  
        let cursor_status = scroll_dropdown_panels(dropdown_status, dropdown_acrive);        
        if (e.deltaY > 0) {
            // down
            if (screen_position < 100 &&  cursor_status == true) {opening_screen.style.bottom = `${screen_position = screen_position + 10}%`}
        } else{
            // up
            if (screen_position !== 0 &&  cursor_status == true) {opening_screen.style.bottom = `${screen_position = screen_position - 10}%`}
        }
    });
})