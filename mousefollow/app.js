'use strict';

const body = document.getElementsByTagName('body');
const circle = document.querySelector('.circle');

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
})
