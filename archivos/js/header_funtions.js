/* 
======================================
File: header_funtions.js
Description: Essential functions for the operation of drop-down panels
Autor: Samuel Felipe Ovalle Rodriguez
<<<<<<< HEAD
Last modification: 24/2/2025
=======
Last modification: 25/2/2025
>>>>>>> master
======================================
*/

/**
<<<<<<< HEAD
 * Creates or removes a blur effect on the header when a dropdown panel is active.
 * @param {boolean} dropdown_status - If `true`, adds a blur effect; if `false`, removes it.
 */
export const blur_effect = (dropdown_status) => {
    const header = document.querySelector("header");
    let header_blur = document.querySelector(".header_blur");

    if (dropdown_status) {
        if (!header_blur) {
            header_blur = document.createElement("div");
            header_blur.classList.add("header_blur");
            header.insertAdjacentElement("afterbegin", header_blur);

            requestAnimationFrame(() => {header_blur.style.opacity = "1";});
        }
    } else if (header_blur) {
        header_blur.style.opacity = "0";
        setTimeout(() => {header_blur.remove();}, 1000);
    }
};

/**
 * verify and traslate panels
 * @param {Element} panel - This parameter indicates which panel is activated.
 * @param {string} movement - When the user activates a panel, this parameter will indicate the final position of the panel.
 * @param {boolean} dropdown_status - Panel status: true if any panel is active, false if all panels are inactive.
 * @returns {boolean} - This value indicates a panel's status: "true" represents active, "false" represents inactive.
 */
export const dropdown_panels = (panel, movement, dropdown_status)=>{
    const panel_element = document.querySelector(panel)
    const dropdown_active = document.querySelector(".dropdown_active");
    
    if (!panel_element) return dropdown_status; // Avoid errors if the panel does not exist.

    // Function to hide a panel
    const hidePanel = (panel) => {
        panel.classList.remove("dropdown_active");
        panel.style.left = "100vw";
        setTimeout(() => {
            panel.style.visibility = "hidden";
        }, 1000);
    };

    // If there is no active panel, we show the new one.
    if (!dropdown_status) {
        panel_element.classList.add("dropdown_active");
        panel_element.style.visibility = "visible";
        panel_element.style.left = movement;
        return true;
    }

    // If the active panel is the same, it is closed.
    if (dropdown_active === panel_element) {
        hidePanel(panel_element);
        return false;
    }

    // If another panel is active, close it before opening the new one.
    if (dropdown_active) hidePanel(dropdown_active);

    // Activate the new panel
    panel_element.classList.add("dropdown_active");
    panel_element.style.visibility = "visible";
    panel_element.style.left = movement;

    return true;
}

/**
 * Determines whether scrolling should be allowed based on dropdown panel status and mouse position.
 * @param {boolean} dropdown_status - Status of the dropdown panel: `true` if active, `false` if inactive.
 * @param {string} panel - CSS selector for the dropdown panel where scrolling should be restricted.
 * @returns {boolean} - `true` if scrolling is allowed, `false` if disabled.
 */
export const scroll_dropdown_panels = (dropdown_status, panel) => {
    if (!dropdown_status) return true; // If dropdown is inactive, allow scrolling

    const isCursorOnPanel = document.querySelector(panel)?.matches(":hover");
    const isCursorOnIcon = document.querySelector(".icon_container")?.matches(":hover");

    return !(isCursorOnPanel || isCursorOnIcon);
};
=======
 * Manages the behavior of dropdown panels, including activation, deactivation, 
 * transition animations, and background blur effects.
 * 
 * @param {string} panel - The ID of the panel to be toggled.
 * @param {string} movement - The final position of the panel when activated.
 * @param {number} time_animation - The duration (in milliseconds) of the animation effects.
 */
export const dropdown = (panel, movement, time_animation) => {
    document.querySelector(`.icon_${panel}`).addEventListener("click", () => {
        const panel_element = document.getElementById(panel);
        const dropdown_active = document.querySelector(".dropdown_active");
        const header = document.querySelector("header");

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
         * Manages the blur effect on the header when a dropdown panel is active.
         * It creates a blur element when a panel is open and removes it when no panels are active.
         */
        const blur_effect = () => {
            let header_blur = document.querySelector(".header_blur");

            if (document.querySelector(".dropdown_active")) {
                if (!header_blur) {
                    header_blur = document.createElement("div");
                    header_blur.classList.add("header_blur");
                    header.insertAdjacentElement("afterbegin", header_blur);
                    requestAnimationFrame(() => { header_blur.style.opacity = "1"; });
                }
            } else if (header_blur) {
                header_blur.style.opacity = "0";
                setTimeout(() => { header_blur.remove(); }, time_animation);
            }
        };

        // If no panel is active, activate the selected panel
        if (!dropdown_active) {
            panel_element.classList.add("dropdown_active");
            panel_element.style.visibility = "visible";
            panel_element.style.left = movement;
            blur_effect();
        } 
        // If the active panel is the same, deactivate it
        else if (dropdown_active === panel_element) {
            hide_panel(panel_element);
            blur_effect();
        } 
        // If another panel is active, deactivate it and activate the new one
        else {
            if (dropdown_active) hide_panel(dropdown_active);
            panel_element.classList.add("dropdown_active");
            panel_element.style.visibility = "visible";
            panel_element.style.left = movement;
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
>>>>>>> master
