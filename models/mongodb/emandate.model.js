// Load Bills model
const mongoose = require('mongoose');
const moment = require('moment')


const emandateSchema = new mongoose.Schema({ 
    id:{
        type:String
    },   
    seq_type:{
        type:String
    },
    frqcy:{
        type:String
    },
    frst_colltn_dt:{
        type:String
    },
    fnl_colltn_dt:{
        type:String
    },
    colltn_until_cncl:{
        type:String
    },
    colltn_amt:{
        type:String
    },
    submitted_on:{
        type:String
    },
    accptd:{
        type:String
    },
    debit_type:{
        type:String
    },
    name:{
        type:String
    },
    mobile_no:{
        type:String
    },
    tel_no:{
        type:String
    },
    email:{
        type:String
    },
    category_id:{
        type:String
    },
    cat_description:{
        type:String
    },
    cat_code:{
        type:String
    },
    expires_at:{
        type:String
    },
    bank_accounts_attributes:[{
        type:Object
    }],
    bank_accounts:[{
        type:Object
    }],
    url:{
        type:String
    },
    notice:{
        type:String
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


module.exports = Emandate = mongoose.model('emandate',emandateSchema)