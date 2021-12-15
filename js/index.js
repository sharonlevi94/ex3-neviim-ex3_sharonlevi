'use strict';
import functions from './functions.js'
import elementsCreator from './createElements.js'
//-------------------------------------------------------------------
let cameraList = ['FHAZ','RHAZ','MAST','CHEMCAM','MAHLI','MARDI','NAVCAM','PANCAM','MINITES']
let roversList = ['Curiosity','Opportunity','Spirit']

let date = document.getElementById('date-input')
let rover = document.getElementById('rover-input')
let camera = document.getElementById('camera-input')

//-------------define all event listeners---------------------------------------------------
document.getElementById('search-images').addEventListener('submit', (e) => {
    functions.searchImages(e,{date: date.value, rover: rover.value, camera: camera.value})
});
document.getElementById("clear-search").addEventListener('click', () => {
    functions.clearSearch()
    date.value = ''
    rover.value = 'Choose a Rover'
    camera.value = 'Choose a Camera'
});
document.getElementById("start-slide").addEventListener('click', () => {
    functions.startSlide()
});
document.getElementById("stop-slide").addEventListener('click', () => {
    functions.stopSlide()
});
document.addEventListener('DOMContentLoaded', () => {
    elementsCreator.createSelectLists(roversList, cameraList)
    functions.getData()
});
//-------------------------------------------------------------------
