const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({

    name:{
        type:String
    },
    last:{
        type:String
    },
    sell:{
        type:String
    },
    buy:{
        type:String
    },
    volume:{
        type:String
    },
    base_unit:{
        type:String
    }
})

module.exports = mongoose.model('Data', dataSchema);