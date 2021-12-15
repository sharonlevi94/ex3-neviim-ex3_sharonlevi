'use strict'

const isDate = (date) => {
    let regDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    return date.match(regDate)
}
const validateSol = (rover, sol) => {
    return sol >= 0 && sol <= rover.max_sol
}
const validateDate = (rover, date) => {
    let inputDate = date.split('-')
    let landingDate = rover.landing_date.split('-')
    let maxDate = rover.max_date.split('-')
    for (let i = 0; i < inputDate.length; i++) {
        if (inputDate[i] > maxDate[i] || inputDate[i] < landingDate[i])
            return false
    }
    return true
}
const isCameraEmpty = (camera) => {
    return camera === 'Choose a Camera'
}
const isDateEmpty = (date) => {
    return date === ''
}
const isRoverEmpty = (rover) => {
    return rover === 'Choose a Rover'
}
const validateAll = (searchParams, rovers) => {
    let isParamsOK = true
    if (isDateEmpty(searchParams.date)) {
        isParamsOK = false
        document.getElementById('date-error').innerText = 'please provide a date or sol'
    } else if (isDate(searchParams.date)) {
        if (!isRoverEmpty(searchParams.rover) && !validateDate(rovers[searchParams.rover],searchParams.date)) {
            isParamsOK = false
            document.getElementById('date-error').innerText =
                `the mission you've selected requires a date from ${rovers[searchParams.rover].landing_date} to ${rovers[searchParams.rover].max_date}`
        }
    } else {
        if (!isRoverEmpty(searchParams.rover)) {
            if (!validateSol(rovers[searchParams.rover], searchParams.date)) {
                isParamsOK = false
                document.getElementById('date-error').innerText =
                    `the mission you've selected requires a sol until ${rovers[searchParams.rover].max_sol}`
            }
        }
    }
    if (isRoverEmpty(searchParams.rover)) {
        isParamsOK = false
        document.getElementById('rover-error').innerText = 'please provide a rover'
    }
    if (isCameraEmpty(searchParams.camera)) {
        isParamsOK = false
        document.getElementById('camera-error').innerText = 'please provide a camera'
    }
    return isParamsOK
}
const clearErrorMessages = () => {
    document.getElementById('date-error').innerText = ''
    document.getElementById('rover-error').innerText = ''
    document.getElementById('camera-error').innerText = ''
}

export default {
    isDate,
    validateSol,
    validateDate,
    isCameraEmpty,
    isDateEmpty,
    isRoverEmpty,
    validateAll,
    clearErrorMessages
}
