// Load Bills model
const mongoose = require('mongoose');
const moment = require('moment')


const paynetSchema = new mongoose.Schema({ 
    firstName:{
        type:String
    },
    uniqueId:{
        type:Number,
        default:0
    },
    lastName:{
        type:String
    },
    primaryBankAccNo:{
        type:Number
    },
    primaryBankName:{
        type:String
    },
    primaryBankIFSC:{
        type:String
    },
    primaryAccHolName:{
        type:String
    },
    contactNumber:{
        type:Number
    },
    businessName:{
        type:String
    },
    paymentType:{
        type:Number
    },
    transaction_limit:{
        type:String
    },
    beneficiary_type:{
        type:String
    },
    v_account:{
        type:String
    },
    txnRefNo:{
        type:String,
        unique:true,
        required:true
    },
    account_number:{
        type:String
    },
    account_holder_name:{
        type:String
    },
    ifsc_code:{
        type:String
    },
    amount:{
        type:String
    },
    isScheduled:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:"0"
    },
    statusCode:{
        type:String
    },
    statusDesc:{
        type:String
    },
    reason:{
        type:String
    },
    paymentType:{
        type:String
    },
    addParam1:{
        type:String
    },
    addParam2:{
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
paynetSchema.pre("save", function (next) {
    var docs = this;
    mongoose
      .model("paynet", paynetSchema)
      .countDocuments({ txnRefNo: docs.txnRefNo }, function (error, counter) {
        if (error) return next(error);
        docs.uniqueId = counter + 1;
        next();
      });
  });
  

module.exports = Paynet = mongoose.model('paynet',paynetSchema)