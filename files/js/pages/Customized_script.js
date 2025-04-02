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
                    <button class="green_button custom_button">CUSTOM</button>
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

    //custom product
    document.querySelectorAll(".custom_button").forEach((custom_button) => {
        custom_button.addEventListener("click", ()=>{
            document.querySelector("main").insertAdjacentHTML("afterbegin",
                `
                <form id="data_customized_product">
                    <div class="escape_button">
                        <svg class="esc_icon" role="img" aria-label="menu icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 48.07 45.61" style="enable-background:new 0 0 48.07 45.61;" xml:space="preserve">
                            <style type="text/css">
                                .st3{fill:none;stroke:#757575;stroke-width:7;stroke-linecap:round;stroke-miterlimit:10;}
                            </style>
                            <line class="st3 line1" x1="10" y1="35" x2="37" y2="10"/>
                            <line class="st3 line2" x1="10" y1="10" x2="37" y2="35"/>
                        </svg>
                    </div>
                    <div class="product_customized_img"></div>
                    <input id="dimensions" class="input_customized" type="text" placeholder="Dimensions">
                    <input id="orientation" class="input_customized" type="text" placeholder="Orientation">
                    <input id="frame_color" class="input_customized" type="text" placeholder="Frame color">
                    <input id="confirm_custom" type="submit" value="CONFIRM">
                </form>
                `
            )

            /**
             * cancel customized
             */
            document.addEventListener("keydown", (e) => {if (e.key === "Escape") {document.getElementById("data_customized_product").remove();}})
            document.querySelector(".escape_button").addEventListener("click", ()=>{document.getElementById("data_customized_product").remove();})

            /**
             * change text in placeholder on inputs
             */
            const text_placeholder = [
                "Dimensions",
                "30 x 30 in",
                "Orientation",
                "Horizontal",
                "Frame color",
                "Black"
            ]
            document.querySelectorAll(".input_customized").forEach((input_customized, index) => {           
                input_customized.addEventListener("focus", ()=>{input_customized.attributes.placeholder.value = text_placeholder[(index * 2)+1]})
                input_customized.addEventListener("blur", ()=>{input_customized.attributes.placeholder.value = text_placeholder[index * 2]})
            })
        

            document.getElementById("confirm_custom").addEventListener("click", (e)=>{
                e.preventDefault();
                const dimensions = document.getElementById("dimensions").value;
                const orientation = document.getElementById("orientation").value;
                const frame_color = document.getElementById("frame_color").value;

                if (dimensions === "" || orientation === "" || frame_color === "") {
                    
                }else{
                    document.getElementById("data_customized_product").remove();
                }

            })
        })
    })

    /**
     * delete element in sopping
     */
    document.querySelectorAll(".delete_button").forEach((delete_button, index)=>{
        delete_button.addEventListener("click", ()=>{
            localStorage.removeItem(delete_button.parentElement.id)
            products.splice(index, 1)
            delete_button.parentElement.remove();
        })
    })

    /**
     * move to purchase subpage
     */
    document.getElementById("accept_products_button").addEventListener("click", ()=>{window.location.href = "../../php/pages/Purchase.php"})
})