'use strict'

export default {
    isDate:(date)=>{
        let regDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
        return date.match(regDate)
    }
}