'use strict';
import validate from './validations.js'
import elementsCreator from './createElements.js'

const APIKEY = '9GRY3CnSoCrsBwyJQlZMNGq3t28Icw2SJjXFkrbv'
let photos = []
let savedPhotos = []
let rovers = {
    Curiosity: {},
    Opportunity: {},
    Spirit: {}
}

export default {
    getData: () => {
        for (let rover in rovers) {
            fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${APIKEY}`)
                .then((res) => {
                    if(!res.ok){
                        elementsCreator.serverNotAvailableMessage()
                        return
                    }
                    res.json()
                        .then((data) => {
                            let roverDetails = data.photo_manifest
                            let details = {}
                            details.landing_date = roverDetails.landing_date
                            details.max_date = roverDetails.max_date
                            details.max_sol = roverDetails.max_sol
                            rovers[rover] = details
                        })
                })
        }
    },

    searchImages: (e, searchParams) => {
        e.preventDefault()
        validate.clearErrorMessages()
        if(!validate.validateAll(searchParams, rovers)){
            return
        }

        let url = ''
        if (validate.isDate(searchParams.date))
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${searchParams.rover}/photos?earth_date=${searchParams.date}&camera=${searchParams.camera}&api_key=${APIKEY}`
        else
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${searchParams.rover}/photos?sol=${searchParams.date}&camera=${searchParams.camera}&api_key=${APIKEY}`

        let loader = `<div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status"></div>
                        </div>`
        document.getElementById('loading').innerHTML = loader
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    elementsCreator.serverNotAvailableMessage()
                    document.getElementById('loading').innerHTML = ''
                    return
                }
                res.json().then((data) => {
                    photos = data.photos
                    elementsCreator.createResults(data.photos)
                    document.getElementById('loading').innerHTML = ''
                })
            }).catch(error => {
            console.log(error)
            elementsCreator.serverNotAvailableMessage()
        })
    },

    clearSearch: () => {
        validate.clearErrorMessages()
        document.getElementById('search-results').innerHTML = ''
    },

    startSlide: () => {
        console.log('startSlide working')
    },

    stopSlide: () => {
        document.getElementById('slide-show').innerHTML = ''
    },

    saveImage: (e) => {
        let savedImage = {
            id: '',
            date: '',
            sol: '',
            camera: '',
            imageSrc: ''
        }
        const id = e.target.id
        if (!savedPhotos.find(x => x.id === id)) {
            savedImage.id = id
            savedImage.date = e.target.parentElement.parentElement.getElementsByClassName('date')[0].textContent
            savedImage.sol = e.target.parentElement.parentElement.getElementsByClassName('sol')[0].textContent
            savedImage.camera = e.target.parentElement.parentElement.getElementsByClassName('camera')[0].textContent
            savedImage.imageSrc = e.target.parentElement.parentElement.getElementsByTagName('img')[0].src
            savedPhotos.push(savedImage)
            elementsCreator.saveImage(savedImage)
        }
    }
}