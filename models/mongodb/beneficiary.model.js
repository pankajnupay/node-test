// Load Bills model
const mongoose = require('mongoose');
const moment = require('moment')


const beneficiarySchema = new mongoose.Schema({ 
    account_number:{
        type:String,
        index:true
    },
    account_holder_name:{
        type:String
    },
    ifsc_code:{
        type:String,
        index:true

    },
    v_account:{
        type:String
    },
    status:{
        type:Number,
        default:0
    },
    reason:{
        type:String
    },
    paymentType:{
        type:String
    },
    is_agent:{
        type:Number,
        default:0
    },
    createdAt:{
        type:String
    },
    updatedAt:{
        type:String
    }

},{
    timestamps: { currentTime: () => moment().utcOffset("+05:30").format() }
});


module.exports = Beneficiary = mongoose.model('beneficiary',beneficiarySchema)