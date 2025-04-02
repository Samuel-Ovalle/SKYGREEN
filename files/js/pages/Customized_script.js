/* 
======================================
File: Customized_script.js
Description: 
Author: Samuel Felipe Ovalle Rodriguez
Last modification: 2/4/2025
======================================
*/
import {dropdown, order_products} from "../functions/header_functions.js";

window.addEventListener("load", ()=>{
    document.querySelector(".icon_shopping").remove();
    document.querySelector("#shopping").remove()
    dropdown("menu", "73vw", 500)
    
    let products = []
    products = order_products(products)    
    for (let i = 0; i < localStorage.length; i++) {       
        let product_data = JSON.parse(localStorage.getItem(products[i]))
        
        document.querySelector(".customized_container").insertAdjacentHTML("beforeend", 
            `
                <li id="${products[i]}" class="customized_product">
                    <img src="../../../img/${product_data.Image}" alt="${product_data.Product_name}">
                    <ul class="product_customized_data">
                        <li>dimensions: ${product_data.Dimension}</li>
                        <li>Frame color: ${product_data.Frame_color}</li>
                        <li>Price: $${product_data.Price}</li>
                    </ul>
                    <button class="green_button confirm_button">CONFIRM</button>
                    <button class="delete_button">
                        <svg class="trash_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.71 45.86">
                            <defs>
                                <style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:7px;}</style>
                            </defs>
                            <path class="cls-1" d="M34.75,11.27l-1.56,25a6,6,0,0,1-5.65,6.22h-12a6,6,0,0,1-5.65-6.22l-1.56-25" transform="translate(-1.17 -0.13)"/>
                            <line class="cls-1" y1="11.14" x2="40.71" y2="11.14"/>
                            <path class="cls-1" d="M14,8.69h0a5.15,5.15,0,0,1,5.22-5.06h4.7A5.15,5.15,0,0,1,29.1,8.69h0" transform="translate(-1.17 -0.13)"/>
                        </svg>
                    </button>
                </li>
            `
        )
    }

    /**
     * delete element in sopping
     */
    document.querySelectorAll(".delete_button").forEach((delete_button, index)=>{
        delete_button.addEventListener("click", ()=>{
            localStorage.removeItem(delete_button.parentElement.id)
            products.splice(index, 1)
            delete_button.parentElement.remove();
            if (!document.querySelector(".customized_product")) {
                document.querySelector(".customized_container").insertAdjacentHTML("afterbegin", `<b class="no_products">No products to purchase</b>`);
                document.querySelector("#accept_products_button").textContent = "Go back";
                document.getElementById("accept_products_button").addEventListener("click", ()=>{window.location.href = "../../php/pages/Gallery.php"})
            }
        })
    })

    /**
     * move to purchase subpage
     */
    document.getElementById("accept_products_button").addEventListener("click", ()=>{window.location.href = "../../php/pages/Purchase.php"})
})