'use strict'
import functions from './functions.js'

export default {
    createSelectLists: (roverList, cameraList) => {
        let selectRover = ''
        let selectCamera = ''

        selectRover = `<option selected>Choose a Rover</option>`
        for (let rover of roverList) {
            selectRover += `<option>${rover}</option>`
        }

        selectCamera = `<option selected>Choose a Camera</option>`
        for (let camera of cameraList) {
            selectCamera += `<option>${camera}</option>`
        }
        document.getElementById('rover-input').innerHTML = selectRover
        document.getElementById('camera-input').innerHTML = selectCamera
    },

    createResults: (images) => {
        console.log(images)
        let results = ``
        if(images.length === 0){
            results = `
            <div class="alert alert-warning h2" role="alert">
                <strong>No image found!</strong> 
            </div>`
            document.getElementById('search-results').innerHTML = results
        }
        else{
            results += `<div class="row">`
            for (let image of images) {
                results += `

            <div class="card-block col-lg-2" style="width: 18rem;">
              <img class="img-fluid card-img-top" src="${image.img_src}" alt="Card image cap">
              <ul class="list-group list-group-flush">
                <li class="date list-group-item">Earth date: ${image.earth_date}</li>
                <li class="sol list-group-item">Sol: ${image.sol}</li>
                <li class="camera list-group-item">Camera: ${image.camera.name}</li>
                <li class="mission list-group-item">Mission: ${image.rover.name}</li>
              </ul>
              <div class="card-body">
                <button type="button" id="${image.id}" class="save-image btn btn-outline-info">Save</button>
                <button type="button" id="full-size" class="btn btn-outline-info">Full Size</button>
              </div>
            </div>`
            }
            results += `</div>`
            document.getElementById('search-results').innerHTML = results

            const btns = document.getElementsByClassName('save-image')
            for(let btn of btns){
                btn.addEventListener('click', functions.saveImage)
            }
        }
    },

    saveImage: (image)=>{
        console.log(image)
        let savedImage = ``
        let node = document.createElement("li");

        savedImage += `
        <a href="${image.imageSrc}" class="text-reset">Image id: ${image.id}</a><br>
        ${image.date},${image.sol},${image.camera}`

        node.innerHTML = savedImage

        document.getElementById('saved-images-list').appendChild(node)
    }
}