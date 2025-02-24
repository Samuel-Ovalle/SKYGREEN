export const blur_efect = () => {
    const header = document.querySelector("header");
    const header_blur = document.querySelector(".header_blur");
    let header_blur_status = false;

    if (!header_blur) {
        header_blur = document.createElement("div");
        header_blur.classList.add("header_blur");
        header.insertAdjacentElement("afterbegin", header_blur);
        header_blur_status = true;
    } else{
        header_blur = document.querySelector(".header_blur").remove();
        header_blur_status = false;
    }
}

export const dropdown_menu = (blur_status) => {
    const header = document.querySelector("header");
    const icon_menu = document.querySelector(".icon_menu");
    const menu = document.querySelector(".menu");
    const header_blur = document.querySelector(".header_blur")

    if (blur_status == false) {
        header_blur.style.opacity = "1";
        menu.style.visibility = "visible";
        menu.style.left = "73vw";
    }else if(blur_status == true){
        menu.style.left = "100vw";
        header_blur = document.querySelector(".header_blur").style.opacity = "0"
        menu.style.visibility = "hidden";
    }
}


export const dropdown_panels = () => {
    const header_blur = document.querySelector(".header_blur")
    const icon_container = document.querySelector(".icon_container")
    let cursor_status;
    if (header_blur) {
        icon_container.addEventListener("mouseenter", () => cursor_status = false);
        icon_container.addEventListener("mouseleave", () => cursor_status = true);
        menu.addEventListener("mouseenter", () => cursor_status = false);
        menu.addEventListener("mouseleave", () => cursor_status = true);
    }
    return cursor_status
}