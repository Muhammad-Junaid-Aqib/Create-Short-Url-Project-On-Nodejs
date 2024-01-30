const { default: mongoose } = require("mongoose");


const urlScheme = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    // createdShortLink: {
    //    type: String, 
    // },
    visitHistory: [{
        timestamp : {type: Number},
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true })


const URL = mongoose.model('url', urlScheme)

module.exports = URL