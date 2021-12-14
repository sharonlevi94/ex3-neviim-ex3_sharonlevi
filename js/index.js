'use strict';
import functions from './functions.js'

//-------------------------------------------------------------------
let externalData = {
    roverList: [],
    cameraList: []
}
let searchParams = {
    date: document.getElementById('date-input').value,
    rover: document.getElementById('rover-input').value,
    camera: document.getElementById('camera-input').value
}
const errorMessage = {
    appearance: false,
}

//-------------define all event listeners---------------------------------------------------
document.getElementById("search-images").addEventListener('submit', () => {
    functions.searchImages()
});
document.getElementById("clear-search").addEventListener('click', () => {
    functions.clearSearch()
});
document.getElementById("start-slide").addEventListener('click', () => {
    functions.startSlide()
});
document.getElementById("stop-slide").addEventListener('click', () => {
    functions.stopSlide()
});
document.getElementById('save-image').addEventListener('click', () => {
    functions.saveImage()
});
document.addEventListener('DOMContentLoaded', () => {
    functions.getData()
});
//-------------------------------------------------------------------
