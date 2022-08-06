
const mongoose = require('mongoose');
const moment = require('moment')


const userLogSchema = new mongoose.Schema({     
    log:{
        type:String
    },
    ip:{
        type:String
    },
    statusCode:{
        type:String,
        default:"NP000"
    },
    headers:{
        type:String
    },
    description:{
        type:String
    },
    path:{
        type:String
    },
    user:{
        type:String
    },
    tableName:{
        type:String
    }
    ,createdAt:{
        type:String
    },
    updatedAt:{
        type:String
    }

},{
    timestamps: { currentTime: () => moment().utcOffset("+05:30").format() }
});


module.exports = UsersLog = mongoose.model('userslog',userLogSchema)