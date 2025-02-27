/* 
======================================
File: Gallery_script.js
Description: Global styles for the entire website
Autor: Samuel Felipe Ovalle Rodriguez
Last modification: 26/2/2025
======================================
*/

import {dropdown, scroll_dropdown_panels} from "../js/funtions/header_funtions.js";

window.addEventListener("load", ()=>{
    document.getElementById("galery_section_1").scrollIntoView({ behavior: "auto" });
    history.scrollRestoration = "manual";

    dropdown("menu", "73vw", 500)
    dropdown("shopping", "60vw", 500)
})