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
let navMenu = document.querySelectorAll('.navbar__menu');
let navBar = document.getElementById('navbar__list');
let section = document.querySelectorAll('section');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Build the navigation bar when the DOM content is loaded
window.addEventListener('DOMContentLoaded', navBarBuild);

// Function to check if a section is in the viewport
function inViewport(elem) {
    let bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bouding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bouding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
function navBarBuild() {

    let navFragment = document.createDocumentFragment();

    for (let i = 0; i < navElems.length; i++) {

        // Create a list node and link.
        let li = document.createElement('li');
        let a = document.createElement('a');

        // Find the current section name.
        let sectionName = document.querySelectorAll('section h2')[i].textContent;

        // Create a link.
        a.appendChild(document.createTextNode(sectionName));
        a.href = `#${navElems[i].id}`

        // Append the a to the li and then the li to the fragment.
        li.appendChild(a);
        navFragment.appendChild(li);
    }

    navBar.appendChild(navFragment);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active