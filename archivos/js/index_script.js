/* 
======================================
File: index_script.js
Description: 
Autor: Samuel Felipe Ovalle Rodriguez
Last modification: 25/2/2025
======================================
*/

import {dropdown, scroll_dropdown_panels} from "./header_funtions.js";
window.addEventListener("load", ()=>{
    const opening_screen = document.getElementById("opening_screen");
    opening_screen.scrollIntoView({ behavior: "auto" });
    history.scrollRestoration = "manual";
    
    dropdown("menu", "73vw", 500)
    dropdown("shopping", "60vw", 500)

    let screen_position = 0;
    window.addEventListener("wheel", (e) => {  
        let cursor_status = scroll_dropdown_panels();        
        if (e.deltaY > 0) {
            // down
            if (screen_position < 100 &&  cursor_status == true) {opening_screen.style.bottom = `${screen_position = screen_position + 10}%`}
        } else{
            // up
            if (screen_position !== 0 &&  cursor_status == true) {opening_screen.style.bottom = `${screen_position = screen_position - 10}%`}
        }
    });
})