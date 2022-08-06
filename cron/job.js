const fs = require('fs')
const axios = require('axios')
const paynetModel = require('../models/mongodb/paynet.model')
var FormData = require('form-data')

const processOutwardTxn = async ()=>{
    paynetModel.find({isScheduled:0})
    .then(async(paynetObj)=>{
       const paynetProcess= await paynetObj.map(obj=>{
           //NEFT
            if(obj.paymentType=="1"){
                    console.log("NEFT")
                    var data = new FormData();
                    data.append('tranRefNo',  Math.floor(Math.random()*100000000000).toString()+Date.now().toString());
                    data.append('amount', obj.amount);
                    data.append('senderAcctNo', '000451000301');
                    data.append('beneName',obj.account_holder_name);
                    data.append('beneAccNo', obj.account_number);
                    data.append('beneIFSC', obj.ifsc_code);
                    data.append('amount', obj.amount);
                    data.append('narration1', 'Test');
                    data.append('crpId', 'PRACHICIB1');
                    data.append('crpUsr', 'USER3');
                    data.append('aggrId', 'AGGRID');
                    data.append('urn', 'URN');
                    data.append('aggrName', 'AGGRNAME');
                    data.append('txnType', 'TPA');
                    axios.post('https://uat.nupaybiz.com/UPIresponse/index.php/api/ICICICollect/neftCompositPayment',data,
                    {
                        headers:{
                            'api-key':"R3JhbUNvdmVyTnVwYXk=",
                            "Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InBhbmthaiJ9.tvOARTNy9A9a5NHo1GMwIxh1P1VjUrJE31lcF08CyT8",
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                        }
                    }).then(IMPSObj=>{
                        console.log(IMPSObj.data)
                        paynetModel.findOneAndUpdate({_id:obj._id,account_number:obj.account_number}
                            ,{
                                $set:{
                                    isScheduled:1,
                                    status:IMPSObj.data.status,
                                    statusCode:IMPSObj.data.StatusCode,
                                    statusDesc:IMPSObj.data.statusDesc
                                }
                            }).then(IMPSUpdateObj=>{
                                console.log(IMPSUpdateObj)
                            }).catch(err=>console.log(err))
                    }).catch(err=>console.log(err))
            }
            else if(obj.paymentType=="2"){
                console.log("IMPS")
                //IMPS
                var data = new FormData();
                    data.append('localTxnDtTime', Date.now().toString());
                    data.append('beneAccNo', obj.account_number);
                    data.append('beneIFSC', obj.ifsc_code);
                    data.append('amount', obj.amount);
                    data.append('tranRefNo', Math.floor(Math.random()*100000000000).toString()+Date.now().toString());
                    data.append('paymentRef', 'FTTransferP2A');
                    data.append('senderName', 'Paynet System');
                    data.append('mobile', '7588215033');
                    data.append('retailerCode', 'rcode');
                    data.append('passCode', 'a65c1ea7fc454203a66cdb7005396bc5');
                    data.append('bcID', 'IBCSin00030');
                    data.append('crpId', 'PRACHICIB1');
                    data.append('crpUsr', 'USER3');
                    axios.post('https://uat.nupaybiz.com/UPIresponse/index.php/api/ICICICollect/impsCompositPayment',data,
                    {
                        headers:{
                            'api-key':"R3JhbUNvdmVyTnVwYXk=",
                            "Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InBhbmthaiJ9.tvOARTNy9A9a5NHo1GMwIxh1P1VjUrJE31lcF08CyT8",
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                        }
                    }).then(IMPSObj=>{
                        console.log(IMPSObj.data)
                        paynetModel.findOneAndUpdate({_id:obj._id,account_number:obj.account_number}
                            ,{
                                $set:{
                                    isScheduled:1,
                                    status:IMPSObj.data.status,
                                    statusCode:IMPSObj.data.StatusCode,
                                    statusDesc:IMPSObj.data.statusDesc
                                }
                            }).then(IMPSUpdateObj=>{
                                console.log(IMPSUpdateObj)
                            }).catch(err=>console.log(err))
                    }).catch(err=>console.log(err))

            }else if(obj.paymentType=="3"){
                console.log("RTGS")
                //RTGS
                var data = new FormData();
                data.append('AGGRID', 'AGGRID');
                data.append('CORPID', 'PRACHICIB1');
                data.append('USERID', 'USER3');
                data.append('URN', 'URN');
                data.append('AGGRNAME', 'AGGRNAME');
                data.append('DEBITACC', '000451000301');
                data.append('CREDITACC', obj.account_number);
                data.append('IFSC', obj.ifsc_code);
                data.append('AMOUNT',  obj.amount);
                data.append('CURRENCY', 'INR');
                data.append('TXNTYPE', 'RTG');
                data.append('PAYEENAME', 'ASDAS');
                data.append('REMARKS', 'Nupay Payments');
                axios.post('https://uat.nupaybiz.com/UPIresponse/index.php/api/ICICICollect/rtgsCompositPayment',data,
                    {
                        headers:{
                            'api-key':"R3JhbUNvdmVyTnVwYXk=",
                            "Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InBhbmthaiJ9.tvOARTNy9A9a5NHo1GMwIxh1P1VjUrJE31lcF08CyT8",
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                        }
                    }).then(IMPSObj=>{
                        console.log(IMPSObj.data)
                        paynetModel.findOneAndUpdate({_id:obj._id,account_number:obj.account_number}
                            ,{
                                $set:{
                                    isScheduled:1,
                                    status:IMPSObj.data.status,
                                    statusCode:IMPSObj.data.StatusCode,
                                    statusDesc:IMPSObj.data.statusDesc
                                }
                            }).then(IMPSUpdateObj=>{
                                console.log(IMPSUpdateObj)
                            }).catch(err=>console.log(err))
                    }).catch(err=>console.log(err))

            }else{
                console.log("Wrong Payment Type")
            }
        })
    })
}


module.exports = {
  processOutwardTxn:processOutwardTxn

}