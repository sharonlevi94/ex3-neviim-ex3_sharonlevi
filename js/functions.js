'use strict';
export default {
    getData: () => {

    },
    searchImages: (searchParams) => {
        console.log(searchParams)
    },
    clearSearch: () => {
        console.log('clearSearch working')
        document.getElementById('show-saved-images').innerHTML = ''
    },
    startSlide: () => {
        console.log('startSlide working')
    },
    stopSlide: () => {
        console.log('stopSlide working')
    },
    saveImage: () => {
        console.log('saveImage working')
    }
}