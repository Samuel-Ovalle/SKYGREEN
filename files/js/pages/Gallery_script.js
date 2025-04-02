/* 
======================================
File: Gallery_script.js
Description: 
Author: Samuel Felipe Ovalle Rodriguez
Last modification: 2/4/2025
======================================
*/

import {dropdown, scroll_dropdown_panels, server_response, products_in_cart, order_products} from "../functions/header_functions.js";

const gallery_designs = async () => {  
    /**
     * Generates a tree structure with all the data and operations to define the space each object will have
     * @param {Number} height_container - height container
     * @param {Number} space - Total space for objects 
     * @param {Number} objects - Objects in which the space should be divided
     * @param {number} index - Position in tree structure
     * @returns data in tree structure
     */
    const node_generator_space = (height_container, space, objects, index = 0)=>{
        let space_for_object = space/objects;
        let mid_space = space/2;
        let ceil_objects = Math.ceil(objects/2);
        let floor_objects = Math.floor(objects/2);
        let usable = true;
        index++;
        
        let node = {
            space,
            objects,
            space_for_object,
            usable,
            sub_space_object: []
        }
        if (height_container !== 1) {
            if (!Number.isInteger(space_for_object)) {
                node.usable = false;
                node.sub_space_object.push(node_generator_space(height_container, mid_space, ceil_objects, index));
                node.sub_space_object.push(node_generator_space(height_container, mid_space, floor_objects, index));
            }else if (space_for_object % 2 !== 0) {
                if (index === 1) {
                    node.usable = false;
                    node.sub_space_object.push(node_generator_space(height_container, mid_space, ceil_objects, index));
                    node.sub_space_object.push(node_generator_space(height_container, mid_space, floor_objects, index));
                }else{
                    let mid_objects = objects/2;
                    let ceil_space = mid_space+2;
                    let floor_space = mid_space-2;
                    if (mid_space%2 !== 0) {
                        ceil_space = mid_space+1;
                        floor_space = mid_space-1;
                    }

                    node.usable = false;
                    node.sub_space_object.push(node_generator_space(height_container, ceil_space, mid_objects, index));
                    node.sub_space_object.push(node_generator_space(height_container, floor_space, mid_objects, index));
                }
            }
        }
        
        return node;
    }

    /**
     * Retrieves data from specific nodes based on a key/value condition
     * @param {*} node - Data in tree structure 
     * @param {*} key - Specific key that determines whether the data should be returned or not
     * @param {*} value - Specific value that must be inside the key to retrieve the data from that node
     * @param {*} data - All data in node
     * @returns - Array with all the data from the nodes that match the key/value
     */
    const get_data_node = (node, key, value, data = [])=>{
        if (node[key] == value) data.push(node);
        for (let child of node.sub_space_object) get_data_node(child, key, value, data);
        return data;
    }

    /**
     * Organize all images within the defined space
     * @param {*} node - Tree structure with all the data of the space division
     * @param {*} width_container
     * @param {*} height_container
     * @param {*} objects - Objects to organize
     */
    const space_assembler = (node, width_container, height_container, objects)=>{       
        let data = get_data_node(node, "usable", true);      

        let y_space = 1;
        let x_space = 1;
        let y_status = 0;
        let x_status = 0;
        let space_data_x = [x_space];
        let space_data_y = [y_space];
        let image_id = 0;

        for (let i = 0; i < data.length; i++) {                
            let mid_section_count = 0;
            
            if (height_container === 1) y_space = 1;
            else if (data[i].space_for_object-height_container >= height_container) y_space = height_container;
            else if (data[i].space_for_object-(height_container/2) >= (height_container/2)) y_space = height_container/2;
            else y_space = (height_container/2)/2;
            x_space = data[i].space_for_object/y_space;            

            space_data_x = [space_data_x[x_status]];
            if (y_space !== 1) space_data_y = [space_data_y[y_status]];
            else if (i !== 0) space_data_y = [space_data_y[y_status-1]];
            x_status = 0;
            y_status = 0;

            for (let j = 0; j < data[i].objects; j++) { 
                if (j === 0 && space_data_x[x_status] < 7) {                    
                    space_data_x.push(space_data_x[x_status]+x_space);
                    space_data_y.push(space_data_y[y_status]+y_space);
                    x_status++;
                    y_status++;
                    
                }else if (space_data_x[x_status] >= 7 && y_space !== 1) {                    
                    space_data_y.push(space_data_y[y_status]+y_space);
                    space_data_x.push(1);
                    x_status++;
                    space_data_x.push(space_data_x[x_status]+x_space);
                    x_status++;
                    y_status++;
                }else{
                    space_data_x.push(space_data_x[x_status]+x_space);
                    x_status++;
                }
                
                if (height_container !== 1) {
                    if (y_space === 1 && mid_section_count > 0) {     
                        space_data_y.push(space_data_y[y_status]+y_space);               
                        space_data_x.splice(-1);
                        x_status--;
                        y_status++;
                    }else if (x_space === 1 || y_space === 1) mid_section_count++; 
                }               
                
                objects[image_id].style.gridArea = ` ${space_data_y[y_status-1]}/ ${space_data_x[x_status-1]}/ ${space_data_y[y_status]}/ ${space_data_x[x_status]}`;
                image_id++;
            }             
            // log array data x & y            
            mid_section_count == 0                       
        }
    }
    
    // Get designs & inventory on db
    let designs = await server_response("get_designs");
    const inventory = await server_response("get_inventory");  
    
    for (let i = designs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [designs[i], designs[j]] = [designs[j], designs[i]];
    }

    let array_all_designs = []
    for (let i = 0; i < designs.length; i+=3) array_all_designs.push(designs.slice(i, i+3))

    // Generate images of the designs
    let width_container = 3;
    let height_container = 1;
    let full_space = height_container * width_container;
    let main_space = array_all_designs.length*100
    document.querySelector("main").style.width = `${main_space}%`;

    array_all_designs.forEach((element, index) =>{
        document.querySelector("main").insertAdjacentHTML("beforeend",`
            <section id="gallery_section_${index+1}">
                <div class="wall"></div>
                <div class="floor"></div>
            </section>
            `
        )

        document.querySelector(`#gallery_section_${index+1} .floor`).style.backgroundImage = `url(../../../assets/background_img/floor_${index+1}.jpg)`

        for (let i = 0; i < element.length; i++) {
            document.querySelector(`#gallery_section_${index+1} .wall`).insertAdjacentHTML("afterbegin",`
                <figure id="${element[i].Id_design}" class="img_container">
                    <img src="../../../img/${element[i].Image}" alt="${element[i].Product_name}">
                </figure>
                `
            )
        }

        const spacer_for_image = node_generator_space(height_container, full_space, element.length);
        let images = document.getElementById(`gallery_section_${index+1}`).querySelectorAll("figure")
        space_assembler(spacer_for_image, width_container, height_container, images);
    })

    // center the user screen
    document.getElementById("gallery_section_1").scrollIntoView({ behavior: "auto" });
    history.scrollRestoration = "manual";

    let screen = document.querySelector("main");
    let screen_position = 0;    
    window.addEventListener("wheel", (e) => {  
        let cursor_status = scroll_dropdown_panels();          
        if (e.deltaY > 0) {
            // right            
            if (screen_position > (-main_space + 103) &&  cursor_status == true) screen.style.left = `${screen_position = screen_position - 10}vw`
            else if (cursor_status === true) screen.style.left = `${-main_space + 100}%`
        } else{
            // left
            if (screen_position !== 0 &&  cursor_status == true) screen.style.left = `${screen_position = screen_position + 10}vw`
        }
    });
 
    designs.sort((a, b) => a.Id_design - b.Id_design);    
    document.querySelectorAll(".img_container").forEach(element => {element.addEventListener("click", ()=>{
        let product =  designs[element.id-1]
        
        let products_in_inventory = inventory.filter(obj => obj.Id_design === product.Id_design);       
        
        let product_options = `<h3 class="product_name">${product.Product_name}</h3>`;

        if (products_in_inventory.length !== 0) {
            let product_data = `
            <ul class="product_data">
                <li class="product_info" id="dimensions">Dimensions: ${products_in_inventory[0].Width} x ${products_in_inventory[0].Height}</li>
                <li class="product_info" id="frame_color">Frame color: ${products_in_inventory[0].Frame_color}</li>
                <li class="product_info" id="shape">Shape: ${product.Shape}</li>
                <li class="product_info" id="price">Price: $${products_in_inventory[0].Price}</li>
            </ul>`;
            if (products_in_inventory.length > 1) {
                product_options = `<select name="product_units" id="product_units">`;
                let option = 0;
                products_in_inventory.forEach(element => {
                    product_options = product_options + `<option value="${element.Id_product}">${product.Product_name} ${option = option + 1}</option>`
                })
                product_options = product_options + `</select>`;
                product_options = product_options + product_data;
            }else if (products_in_inventory.length == 1) product_options = product_options + product_data;
        }
        document.querySelector("main").insertAdjacentHTML("afterend",
            `
            <form action="" class="design_data">
                <div class="escape_button">
                    <svg class="esc_icon" role="img" aria-label="menu icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 48.07 45.61" style="enable-background:new 0 0 48.07 45.61;" xml:space="preserve">
                        <style type="text/css">
                            .st3{fill:none;stroke:#757575;stroke-width:7;stroke-linecap:round;stroke-miterlimit:10;}
                        </style>
                        <line class="st3 line1" x1="10" y1="35" x2="37" y2="10"/>
                        <line class="st3 line2" x1="10" y1="10" x2="37" y2="35"/>
                    </svg>
                </div>
                <figure class="design_img">
                    <img src="../../../img/${product.Image}" alt="${product.Product_name}">
                </figure>
                ${product_options}
                <button class="green_button" id="custom_button">CUSTOM</button>
                <button class="green_button" id="add_to_cart_button">ADD TO CART</button>
            </form>
            `
        )
        if (document.querySelector("#product_units")) {
            document.querySelector("#product_units").addEventListener("change", ()=>{
                let option_value = parseInt(document.querySelector("#product_units").value);
                let product_in_inventory = inventory.find(obj => obj.Id_product === option_value);
                let design_product = designs.find(obj => obj.Id_design === product_in_inventory.Id_design);

                document.querySelector("#dimensions").textContent = `Dimensions: ${product_in_inventory.Width} x ${product_in_inventory.Height}`;
                document.querySelector("#frame_color").textContent = `Frame color: ${product_in_inventory.Frame_color}`;
                document.querySelector("#shape").textContent = `Shape: ${design_product.Shape}`;
                document.querySelector("#price").textContent = `Price: $${product_in_inventory.Price}`;
            })
        }
        document.addEventListener("keydown", (e) => {if (e.key === "Escape" && document.querySelector(".design_data")) document.querySelector(".design_data").remove();})
        document.querySelector(".escape_button").addEventListener("click", ()=>{document.querySelector(".design_data").remove();})

        let dimensions_data = document.querySelector("#dimensions").textContent;
        let frame_color_data = document.querySelector("#frame_color").textContent;
        document.querySelector("#custom_button").addEventListener("click", (e)=>{
            e.preventDefault();
            if (document.querySelector("#custom_button").textContent === "CUSTOM") {
                document.querySelector("#custom_button").textContent = "ACCEPT"
                document.querySelectorAll(".product_info").forEach((element, index) =>{if(index<2){element.style.display = "none"}}) 
                
                console.log(document.querySelector(".product_data"));
                
                document.querySelector(".product_data").insertAdjacentHTML("afterbegin",
                `
                    <input class="product_custom_info" id="dimensions" type="text" placeholder="Dimensions">
                    <input class="product_custom_info" id="frame_color" type="text" placeholder="Frame color">
                `)

                const text_placeholder = ["Dimensions", "30 x 30 in", "Frame color", "Black"]
                document.querySelectorAll(".product_custom_info").forEach((input_customized, index) => {           
                    input_customized.addEventListener("focus", ()=>{input_customized.attributes.placeholder.value = text_placeholder[(index * 2)+1]})
                    input_customized.addEventListener("blur", ()=>{input_customized.attributes.placeholder.value = text_placeholder[index * 2]})
                })
            } else {                
                if (document.querySelector("#dimensions").value.trim() !== "") dimensions_data = `Dimensions: ${document.querySelector("#dimensions").value}`;
                if (document.querySelector("#frame_color").value.trim() !== "") frame_color_data = `Frame color: ${document.querySelector("#frame_color").value}`;               
                document.querySelector("#custom_button").textContent = "CUSTOM"
                document.querySelectorAll(".product_custom_info").forEach(element =>{element.remove()})
                document.querySelectorAll(".product_info").forEach(element =>{element.style.display = "block";})
                document.querySelector("#dimensions").textContent = dimensions_data;
                document.querySelector("#frame_color").textContent = frame_color_data;
            }
        })
        document.querySelector("#add_to_cart_button").addEventListener("click", (e)=>{
            e.preventDefault();
            let product_data;
            let products_in_cart = [];
            order_products(products_in_cart);
            let product_identification = products_in_cart[products_in_cart.length-1];
            if (product_identification !== undefined) product_identification = parseInt(product_identification.split("_")[1]);
            else product_identification = 0;
            
            if (document.querySelector("#product_units")) product_data = {
                Id_design: product.Id_design,
                Product_name: product.Product_name,
                Dimension: document.querySelector("#dimensions").textContent.split("Dimensions: ")[1],
                Frame_color: document.querySelector("#frame_color").textContent.split("Frame color: ")[1],
                Shape: document.querySelector("#shape").textContent.split("Shape: ")[1],
                Price: document.querySelector("#price").textContent.split("Price: $")[1],
                Image: product.Image,
                Specific_product: document.querySelector("#product_units").value
            }
            else product_data = {
                Id_design: product.Id_design,
                Product_name: product.Product_name,
                Dimension: document.querySelector("#dimensions").textContent.split("Dimensions: ")[1],
                Frame_color: document.querySelector("#frame_color").textContent.split("Frame color: ")[1],
                Shape: document.querySelector("#shape").textContent.split("Shape: ")[1],
                Price: document.querySelector("#price").textContent.split("Price: $")[1],
                Image: product.Image,
            }
            
            localStorage.setItem(`product_${product_identification+1}`, JSON.stringify(product_data));
            document.querySelector(".design_data").remove();          
        })
    })});
}

window.addEventListener("load", ()=>{
    dropdown("menu", "73vw", 500);
    dropdown("shopping", "60vw", 500);   
    products_in_cart(500);
    gallery_designs();
})