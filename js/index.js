'use strict';
import functions from './functions.js'

//-------------------------------------------------------------------
const APIKEY = '9GRY3CnSoCrsBwyJQlZMNGq3t28Icw2SJjXFkrbv'

let savedImages = []
let results = []
let roverList = []
let cameraList = []

let date = document.getElementById('date-input')
let rover = document.getElementById('rover-input')
let camera = document.getElementById('camera-input')

const errorMessage = {
    appearance: false,
}

//-------------define all event listeners---------------------------------------------------
document.getElementById("search-images").addEventListener('click', () => {
    functions.searchImages({date: date.value, rover: rover.value, camera: camera.value})
});
document.getElementById("clear-search").addEventListener('click', () => {
    functions.clearSearch()
    date.value = rover.value = camera.value = ''
});
document.getElementById("start-slide").addEventListener('click', () => {
    functions.startSlide()
});
document.getElementById("stop-slide").addEventListener('click', () => {
    functions.stopSlide()
});
/*document.getElementById('save-image').addEventListener('click', () => {
    functions.saveImage()
});*/
document.addEventListener('DOMContentLoaded', () => {
    functions.getData()
});
//-------------------------------------------------------------------
