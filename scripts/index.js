const homeSection = document.querySelector("section.home");
const aboutUsSection = document.querySelector("section.about-us");
const contactSection = document.querySelector("section.contact");

const searchContainer = document.querySelector(".header__search");

const homeButton = document.getElementById("header__home-btn");
const aboutUsButton = document.getElementById("header__about-us-btn");
const contactButton = document.getElementById("header__contact-btn");

(function init() {
    onHomeClick()

    homeButton.addEventListener("click", onHomeClick);
    aboutUsButton.addEventListener("click", onAboutUsClick);
    contactButton.addEventListener("click", onContactClick);
})();

function onHomeClick() {
    homeSection.removeAttribute("style");
    searchContainer.removeAttribute("style");

    aboutUsSection.style.display = "none";
    contactSection.style.display = "none";
}

function onAboutUsClick() {
    aboutUsSection.removeAttribute("style");
    
    searchContainer.style.visibility = "hidden";
    homeSection.style.display = "none";
    contactSection.style.display = "none";
}

function onContactClick() {
    contactSection.removeAttribute("style");

    searchContainer.style.visibility = "hidden";
    homeSection.style.display = "none";
    aboutUsSection.style.display = "none";
}
