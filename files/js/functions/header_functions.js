/* 
======================================
File: header_functions.js
Description: Essential functions for the operation of drop-down panels
Author: Samuel Felipe Ovalle Rodriguez
Last modification: 29/3/2025
======================================
*/

/**
 * Manages the behavior of dropdown panels, including activation, deactivation, 
 * transition animations, and background blur effects.
 * 
 * @param {string} panel - The ID of the panel to be toggled.
 * @param {string} movement - The final position of the panel when activated.
 * @param {number} time_animation - The duration (in milliseconds) of the animation effects.
 */
export const dropdown = (panel, movement, time_animation) => {
    /**
     * Changes the menu icon appearance based on the dropdown menu status.
     * If the menu is active, a class is added to modify the icon.
     * If the menu is inactive, the class is removed.
     */
    const change_menu_icon = () => {
        const menuIcon = document.querySelector(".icon_menu");
        const menu = document.getElementById("menu");

        if (document.getElementById("menu").classList.contains("dropdown_active")) menuIcon.classList.add("menu_active")// Add class when menu is active
        else if (!document.getElementById("menu").classList.contains("dropdown_active"))menuIcon.classList.remove("menu_active")// Remove class when menu is inactive
    };
    
    /**
     * Hides a dropdown panel by removing its active class, 
     * moving it out of view, and setting it to hidden after the animation duration.
     * 
     * @param {HTMLElement} element - The panel element to be hidden.
     */
    const hide_panel = (element) => {
        element.classList.remove("dropdown_active");
        element.style.left = "100vw";
        setTimeout(() => { element.style.visibility = "hidden"; }, time_animation);
    };

    /**
     * Manages the blur effect in the header and the entire screen when a dropdown panel is active.
     * It creates a blur element when a panel is open and removes it when no panels are active.
     */
    const blur_effect = () => {
        const header = document.querySelector("header");
        const main = document.querySelector("main")
        let header_blur = document.querySelector(".header_blur");

        if (document.querySelector(".dropdown_active")) {
            if (!header_blur) {
                header_blur = document.createElement("div");
                header_blur.classList.add("header_blur");
                header.insertAdjacentElement("afterbegin", header_blur);
                main.insertAdjacentHTML("afterbegin", `<div class="blur_screen"></div>`);
                requestAnimationFrame(() => {
                    header_blur.style.opacity = "1";
                    document.querySelector(".blur_screen").style.opacity = "1";
                });
            }
        } else if (header_blur) {
            header_blur.style.opacity = "0";
            document.querySelector(".blur_screen").style.opacity = "0";
            setTimeout(() => {
                header_blur.remove();
                document.querySelector(".blur_screen").remove();
            }, time_animation);
        }
    };

    document.querySelector(`.icon_${panel}`).addEventListener("click", () => {
        const panel_element = document.getElementById(panel);
        const dropdown_active = document.querySelector(".dropdown_active");

        // If no panel is active, activate the selected panel
        if (!dropdown_active) {
            panel_element.classList.add("dropdown_active");
            panel_element.style.visibility = "visible";
            panel_element.style.left = movement;
            change_menu_icon();
            blur_effect();
        } 
        // If the active panel is the same, deactivate it
        else if (dropdown_active === panel_element ) {
            hide_panel(panel_element);
            change_menu_icon();
            blur_effect();
        } 
        // If another panel is active, deactivate it and activate the new one
        else {
            if (dropdown_active) hide_panel(dropdown_active);
            panel_element.classList.add("dropdown_active");
            panel_element.style.visibility = "visible";
            panel_element.style.left = movement;
            change_menu_icon();
            blur_effect();
        }
        document.querySelector(".blur_screen").addEventListener("click", ()=>{
            hide_panel(document.querySelector(".dropdown_active"));
            change_menu_icon();
            blur_effect();
        })
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && document.querySelector(".dropdown_active")) {
            hide_panel(document.querySelector(".dropdown_active"));
            change_menu_icon();
            blur_effect();
        }
    });

};

/**
 * Determines whether scrolling should be allowed based on the status of an active dropdown panel 
 * and the user's cursor position.
 * 
 * @returns {boolean} - `true` if scrolling is allowed, `false` if scrolling is disabled.
 * 
 * Scrolling is disabled when a dropdown panel is active and the cursor is hovering over 
 * either the active panel or the dropdown icon container.
 */
export const scroll_dropdown_panels = () => {
    // Check if there is an active dropdown panel
    if (document.querySelector(".dropdown_active")) {
        const isCursorOnPanel = document.querySelector(".dropdown_active")?.matches(":hover");
        const isCursorOnIcon = document.querySelector(".icon_container")?.matches(":hover");

        // Prevent scrolling if the cursor is over the active panel or the dropdown icon
        return !(isCursorOnPanel || isCursorOnIcon);
    } 

    // Allow scrolling if no dropdown panel is active
    return true;
};

export const server_response = async (action) =>{
    try {
        const response = await fetch(`../../../backend/api/api.php?action=${action}`);
        const data = await response.json();
        return data; // Return the data obtained
    } catch (error) {
        return error; // If exist error case, return error
    }
};

export const order_products = (array)=>{
    let products = array
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("product_")) products.push(key);
    }
    
    products.sort((a, b) => {
        let numA = parseInt(a.split("_")[1]);
        let numB = parseInt(b.split("_")[1]);
        return numA - numB;
    });
    return products
}

export const products_in_cart = (time_animation)=>{
    document.querySelector(".icon_shopping").addEventListener("click", ()=>{
        let products = []
        products = order_products(products)
        if (document.querySelector(".dropdown_active")) {
            if (products.length !== 0) {
                for (let i = 0; i < products.length; i++) {
                    let product_data = JSON.parse(localStorage.getItem(products[i]))
                    document.querySelector(".products_container").insertAdjacentHTML("beforeend", 
                        `
                        <li class="product_to_buy">
                            <img src="../../../img/${product_data.Image}" alt="${product_data.Product_name}">
                            <ul class="product_data_to_buy">
                                <li>Dimensions: ${product_data.Dimension}</li>
                                <li>Frame color: ${product_data.Frame_color}</li>
                                <li>Price: $${product_data.Price}</li>
                            </ul>
                        </li>
                        `
                    )
                }
                document.querySelector("#shopping").insertAdjacentHTML("beforeend", `<button id="confirm_products" class="green_button">CONFIRM</button>`)
                document.querySelector("#confirm_products").addEventListener("click", ()=>{window.location.href = "../../php/pages/Customized.php"})
            }else document.querySelector(".products_container").insertAdjacentHTML("afterbegin", `<b class="no_products">No products to purchase</b>`)
        }else{
            setTimeout(()=>{
                if (document.querySelector(".product_to_buy")) {
                    document.querySelectorAll(".product_to_buy").forEach(element =>{element.remove()})
                    document.querySelector("#confirm_products").remove()
                }
                else if (document.querySelector(".no_products")) document.querySelector(".no_products").remove();   
            }, time_animation)
        }
    })       
}