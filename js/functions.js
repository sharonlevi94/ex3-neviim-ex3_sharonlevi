'use strict';
import validate from './validations.js'
import elementsCreator from './createElements.js'

const APIKEY = '9GRY3CnSoCrsBwyJQlZMNGq3t28Icw2SJjXFkrbv'
let photos = []
let savedPhotos = []
let rovers = {
    Curiosity:{},
    Opportunity:{},
    Spirit:{}
}

export default {
    getData: () => {
        for(let rover in rovers){
            fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${APIKEY}`)
                .then((res) => res.json()
                    .then((data)=>{
                        let roverDetails = data.photo_manifest
                        let details = {}
                        details.landing_date = roverDetails.landing_date
                        details.max_date = roverDetails.max_date
                        details.max_sol = roverDetails.max_sol
                        rovers[rover] = details
                    }))
        }
    },

    searchImages: (e, searchParams) => {
        e.preventDefault()
        console.log(searchParams)

        let url = ''
        if(validate.isDate(searchParams.date))
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${searchParams.rover}/photos?earth_date=${searchParams.date}&camera=${searchParams.camera}&api_key=${APIKEY}`
        else
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${searchParams.rover}/photos?sol=${searchParams.date}&camera=${searchParams.camera}&api_key=${APIKEY}`

        fetch(url)
            .then((res) => res.json()
                .then((data)=>{
                    console.log(data)
                    photos = data.photos
                    elementsCreator.createResults(data.photos)
                }))
    },

    clearSearch: () => {
        console.log('clearSearch working')
        document.getElementById('search-results').innerHTML = ''
    },

    startSlide: () => {
        console.log('startSlide working')
    },

    stopSlide: () => {
        console.log('stopSlide working')
    },

    saveImage: (e) => {
        console.log('saveImage working')
        let savedImage = {
            id:'',
            date:'',
            sol: '',
            camera:'',
            imageSrc:''
        }
        const id = e.target.id
        if(!savedPhotos.find(x=> x.id === id)){
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