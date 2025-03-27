/* Navigation */

const homeSection = document.querySelector("section.home");
const aboutUsSection = document.querySelector("section.about-us");
const contactSection = document.querySelector("section.contact");

const searchContainer = document.querySelector(".header__search");

const homeButton = document.getElementById("header__home-btn");
const aboutUsButton = document.getElementById("header__about-us-btn");
const contactButton = document.getElementById("header__contact-btn");

(function init() {
    onHomeClick();

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

/* Search */

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("header__search-btn");
const clearButton = document.getElementById("header__clear-btn");

const searchResults = document.querySelector(".header__search-results");

(function init() {
    searchButton.addEventListener("click", onSearchClick);
    clearButton.addEventListener("click", onClearSearchResultsClick);
})();

async function onSearchClick() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        return;
    }

    fetch("../data/travel_recommendation_api.json")
        .then((response) => response.json())
        .then((data) => {
            let results;
            switch (query) {
                case "country":
                    results = data.countries.flatMap(
                        (country) => country.cities
                    );
                    break;

                case "temple":
                    results = data.temples;
                    break;

                case "beach":
                    results = data.beaches;
                    break;

                default:
                    console.log(`No results for query: ${query}`);
                    return;
            }

            displaySearchResults(results);
        })
        .catch((error) => {
            console.error(error);
        });
}

function displaySearchResults(results) {
    onClearSearchResultsClick();

    
    results.forEach((result) => {
        const searchResult = document.createElement("div");
        searchResult.classList.add("header__search-result");
        
        const image = document.createElement("img");
        image.setAttribute("src", result.imageUrl);
        image.setAttribute("alt", `${result.name} photo`);
        
        const resultContent = document.createElement("div");
        resultContent.classList.add("search-content");
        
        const name = document.createElement("p");
        name.textContent = result.name;
        
        const description = document.createElement("p");
        description.textContent = result.description;
        
        const visitButton = document.createElement("button");
        visitButton.textContent = "Visit";

        resultContent.appendChild(name);
        resultContent.appendChild(description);
        resultContent.appendChild(visitButton);

        searchResult.appendChild(image);
        searchResult.appendChild(resultContent);

        searchResults.appendChild(searchResult);
    });
}

function onClearSearchResultsClick() {
    searchResults.innerHTML = "";
}
