const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let Appt = new Schema({
    requestor_name:{
        type: String
    },
    appt_date:{
        type: Date
    },
    appt_status:{
        type: String
    },
    appt_price:{
        type: Number
    }
});
// creating and exporting a model based on schema above
module.exports = mongoose.model('Appt', Appt);