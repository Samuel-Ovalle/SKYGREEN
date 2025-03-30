/* 
======================================
File: index_script.js
Description: 
Author: Samuel Felipe Ovalle Rodriguez
Last modification: 26/3/2025
======================================
*/

import {dropdown, scroll_dropdown_panels, products_in_cart} from "../functions/header_functions.js";
window.addEventListener("load", ()=>{
    document.getElementById("opening_screen").scrollIntoView({ behavior: "auto" });
    history.scrollRestoration = "manual";
    
    dropdown("menu", "73vw", 500)
    dropdown("shopping", "60vw", 500)
    products_in_cart(500)


    let screen_position = 0;
    window.addEventListener("wheel", (e) => {  
        let cursor_status = scroll_dropdown_panels();  
        opening_screen.style.transition = "bottom 0.35s ease-out"      
        if (e.deltaY > 0) {
            // down
            if (screen_position < 100 &&  cursor_status == true) {opening_screen.style.bottom = `${screen_position = screen_position + 10}%`}
        } else{
            // up
            if (screen_position !== 0 &&  cursor_status == true) {opening_screen.style.bottom = `${screen_position = screen_position - 10}%`}
        }
    });
    const scroll_arrow = document.querySelector(".scroll_arrow").addEventListener("click", ()=>{
        opening_screen.style.transition = "bottom .7s ease-out"
        opening_screen.style.bottom = `${screen_position = 100}%`
    })
})