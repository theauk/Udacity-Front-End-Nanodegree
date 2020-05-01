/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let navElems = document.querySelectorAll('[data-nav]');
let navBar = document.getElementById('navbar__list');
let sections = document.querySelectorAll('section');
let scrollButton = document.getElementById('scrollButton');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Function to check if a section is in the viewport
function inViewport(elem) {

    // Get the size on the element and its position relative to the viewport
    let bounding = elem.getBoundingClientRect();

    // Return true if the section is in the viewport.
    return (
        bounding.left >= 0 &&
        bounding.top >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Function for building the nav and the scroll to functionality
function navBarBuild() {

    let navFragment = document.createDocumentFragment();

    for (let i = 0; i < navElems.length; i++) {

        // Create a list node and link
        let li = document.createElement('li');
        let a = document.createElement('a');

        // Find the current section name
        let sectionName = document.querySelectorAll('section h2')[i].textContent;

        // Create a link with section anchor and a class
        a.appendChild(document.createTextNode(sectionName));
        a.href = `#${navElems[i].id}`
        a.classList.add('menu__link');

        // Append the a to the li and then the li to the fragment
        navFragment.appendChild(li).appendChild(a);
    }

    // Appending the final navbar to the fragment
    navBar.appendChild(navFragment);

    // Removing the event listener after the navbar has been built
    window.removeEventListener('DOMContentLoaded', navBarBuild);
}

// Add class 'active' to section and navigation when near top of viewport
function changeActive() {

    // Find the active section.
    for (let i = 0; i < sections.length; i++) {

        // If the section is in the viewport we change the state to active. Otherwise we remove it
        if (inViewport(sections[i])) {
            sections[i].classList.add('your-active-class');
            navBar.childNodes[i].classList.add('active-nav');
        } else {
            sections[i].classList.remove('your-active-class');
            navBar.childNodes[i].classList.remove('active-nav');
        }
    }
}

// Scroll to top function
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Function to display/hide the scroll button
function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build the navigation bar when the DOM content is loaded
window.addEventListener('DOMContentLoaded', navBarBuild);

// Event listener for scroll which fires the scroll button and active state function
window.addEventListener('scroll', () => { scrollFunction(); changeActive(); });

// Listening for clicks on the scroll button
scrollButton.addEventListener('click', scrollToTop);