const classie = require('./classie');

let body:HTMLElement;
let openButton:HTMLElement;
let container:HTMLElement;
let canvas:HTMLElement;
let isOpen = false;

// this is the entry point for the ui logic
export default function initUI () {
    body = document.body;
    openButton = document.getElementById('open-button');
    container = document.querySelector('.container-fluid');
    canvas = document.getElementById('mainCanvas');
    initEvents();
}

function initEvents () {
    openButton.addEventListener('click', toggleMenu);

    // close the menu element if the target it´s not the menu element or one of its descendants..
    container.addEventListener('click', function (event) {
        const target = event.target;
        if (isOpen && target === canvas) {
            toggleMenu();
        }
    });
}

function toggleMenu() {
    if (isOpen) {
        classie.remove( body, 'show-menu' );
    } else {
        classie.add( body, 'show-menu' );
    }
    isOpen = !isOpen;
}