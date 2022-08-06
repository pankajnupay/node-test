const paynetModel = require('../../models/mongodb/paynet.model')
const multiparty = require('multiparty');
const Sequelize = require('sequelize')
const sqldb = require('../../config/dbconfig/sqldb.config')
const sqlQueries = require('../../helpers/sqlQueries')
const Beneficiary = require('../../models/mongodb/beneficiary.model');
const beneficiaryModel = require('../../models/mongodb/beneficiary.model');
const UsersLog = require('../../models/mongodb/userLogs.model')

var FormData = require('form-data')
const axios = require('axios')
count = 0
exports.create = async (req,res,next) =>{
    // let form = new multiparty.Form();

    // form.parse(req, function(err, fields, files) {
    //     Object.keys(fields).forEach(function(name) {
    //          console.log(fields)
    //          req.body[fields] ="1"
    //      });
    //  });
    console.log("------------------->y")
    const body = JSON.parse(JSON.stringify(req.body))
    const audittrails = {
        tableName: `ProcessOutwardTxn`,
        log: JSON.stringify(body),
        description: 'ProcessOutwardTxn',
        ip:req.header('x-forwarded-for') || req.connection.remoteAddress,
        headers:JSON.stringify(req.headers),
        path:req.originalUrl
      };
      UsersLog.create(audittrails).then(audit=>audit).catch(err=>err)
    const checkBalanceCall =await checkBalance(body.v_account)
    if(checkBalanceCall.length==0){
        return res.status(200).send({ "StatusDesc":"User Id and User Virtual Account did not match in our system or User Suspended." ,"StatusCode": "NP005"})
     }
    const total_balance = parseFloat(checkBalanceCall[0].total_balance)
    const reqAmount = parseFloat(body.amount)
    
 // console.log(total_balance)
 if(reqAmount>total_balance){
    console.log(count,":","Not Updated")
    return res.status(400).send({StatusDesc:"Insufficient balance in user's account.","StatusCode": "NP013"})
}else{
    const checkBeneficiaryCall =await checkBeneficiary(body.account_number,body.ifsc_code,body.account_holder_name,body.v_account)
    if(checkBeneficiaryCall && checkBeneficiaryCall.status==1){
        if(body.paymentType=="1"){
            const amountLeft = total_balance-reqAmount
            await paynetModel.create(body)
            .then(async(resObj) =>{
                count++;
                console.log(count,":","Updated")
                const updateBalanceCall = await updateBalance(amountLeft,body.v_account)
                return res.status(200).send({message:"Added To Queue"})
            })
            .catch(err => console.log(err))
        }else if(body.paymentType=="2" && reqAmount<100000){
            const amountLeft = total_balance-reqAmount
            await paynetModel.create(body)
        .then(async(resObj) =>{
            count++;
            console.log(count,":","Updated")
            const updateBalanceCall = await updateBalance(amountLeft,body.v_account)
            return res.status(200).send({message:"Added To Queue"})
        })
        .catch(err => console.log(err))

        }else if(body.paymentType=="2" && reqAmount>100000){
           
            return res.status(200).send({"StatusDesc":"Txn Amount should not be greater than 100000 for IMPS" ,"StatusCode":"NP011"})

        }else if(body.paymentType=="3" && reqAmount>200000){
            const amountLeft = total_balance-reqAmount
            await paynetModel.create(body)
        .then(async(resObj) =>{
            count++;
            console.log(count,":","Updated")
            const updateBalanceCall = await updateBalance(amountLeft,body.v_account)

            return res.status(200).send({message:"Added To Queue"})
        })
        .catch(err => console.log(err))

        }else if(body.paymentType=="3" && reqAmount<200000){
            return res.status(200).send({"StatusDesc":"Txn Amount should not be less than 200000 for RTGS","StatusCode":"NP011"})

        }else{
            return res.status(200).send({message:"Wrong Payment Type!"})

        }
    }else if(checkBeneficiaryCall && checkBeneficiaryCall.status==0){
        return res.status(400).send({StatusDesc:"Issue Is Adding Benefeciary",StatusCode:"NP018"})
    }else{
        //TODO: Check Beneficiary API Will Get Hit Here
        const checkBeneficiaryFromBankCall= await checkBeneficiaryFromBank(body.account_number,body.ifsc_code,body.account_holder_name,body.v_account)
        if(checkBeneficiaryFromBankCall.status){
            
            const createBeneficiaryCall = await createBeneficiary(body.account_number,body.ifsc_code,body.account_holder_name,body.v_account,1);
            if(createBeneficiaryCall.hasError){
                return res.status(200).send({StatusDesc:"Issue Is Adding Benefeciary",StatusCode:"NP018"})

            }
            if(body.paymentType=="1"){
                const amountLeft = total_balance-reqAmount


                await paynetModel.create(body)
                .then(async(resObj) =>{
                    count++;
                    console.log(count,":","Updated")
                    const updateBalanceCall = await updateBalance(amountLeft,body.v_account)

                    return res.status(200).send({message:"Added To Queue"})
                })
                .catch(err => console.log(err))
            }else if(body.paymentType=="2" && reqAmount<100000){
                const amountLeft = total_balance-reqAmount


               await paynetModel.create(body)
            .then(async(resObj) =>{
                count++;
                console.log(count,":","Updated")
                const updateBalanceCall = await updateBalance(amountLeft,body.v_account)

                return res.status(200).send({message:"Added To Queue"})
            })
            .catch(err => console.log(err))
    
            }else if(body.paymentType=="3" && reqAmount>200000){
                const amountLeft = total_balance-reqAmount


               await paynetModel.create(body)
            .then(async(resObj) =>{
                count++;
                console.log(count,":","Updated")
                const updateBalanceCall = await updateBalance(amountLeft,body.v_account)

                return res.status(200).send({message:"Added To Queue"})
            })
            .catch(err => console.log(err))
    
            }else{
                return res.status(200).send({message:"Wrong Payment Type!"})
    
            }
        }else{
            const createBeneficiaryCall = await createBeneficiary(body.account_number,body.ifsc_code,body.account_holder_name,body.v_account);
            return res.status(200).send({message:"Beneficiary Not Verified"})
        }
    }
    
} 
    
     

}

exports.createUser = async (req,res,next) =>{
    
    req.body = JSON.parse(JSON.stringify(req.body))
    console.log('======================'+JSON.stringify(req.body));
    process.exit(1)
    const audittrails = {
        tableName: `CreateUser`,
        log: JSON.stringify(req.body),
        description: 'Create User',
        ip:req.header('x-forwarded-for') || req.connection.remoteAddress,
        headers:JSON.stringify(req.headers),
        path:req.originalUrl
      };
      UsersLog.create(audittrails).then(audit=>audit).catch(err=>err)
    const user_ref_no = "NP"+Date.now().toString()
    const nupay_ref_no = "NUPAY"+Math.floor(Math.random()*1000000000)
    const v_account = "NUPAY"+Math.floor(Math.random()*1000000000)
    const org_id = 115
    const checkInUserTable = await checkUser(req.body.primaryBankAccNo)
    if(checkInUserTable.length!=0){
        return res.status(200).send({"StatusDesc": "Primary Account Number Already Exists." ,"StatusCode": "NP008"})
    }else{
        if(req.body.beneficiary_type=="1"){
        user_id = 'B2';
         }else if (req.body.beneficiary_type=="2") {
            user_id = 'S2';
        }else{
            return res.status(400).send({"StatusDesc": "Invaild Beneficiary Type." ,"StatusCode": "NP001"})


         }
        const data=   await sqldb.sequelize.query(`INSERT INTO 
        agent_info(first_name,last_name,master_account_number,primary_acc_name,
            account_number1,
            primary_ifsc,primary_bank,contact_number,business_name,payment_type,
            transaction_limit,org_id,user_id,user_ref_no,nupay_ref_no,v_account)
         VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, { replacements:[req.body.firstName,req.body.lastName,
            req.body.primaryBankAccNo,req.body.primaryAccHolName, req.body.primaryBankAccNo,
            req.body.primaryBankIFSC,req.body.primaryBankName,req.body.contactNumber,
            req.body.businessName,req.body.paymentType,req.body.transaction_limit,org_id,
            user_id,user_ref_no,nupay_ref_no,v_account
        ],type: Sequelize.QueryTypes.INSERT}).then(async(responseSql) => {
     const data=   await sqldb.sequelize.query(`SELECT * FROM agent_info WHERE id="${responseSql[0]}" `, { type: Sequelize.QueryTypes.SELECT})
     .then(responseSql => {
        return res.status(200).send({StatusCode:"NP000",StatusDesc:"User Created",Userdata:{v_account:responseSql[0].v_account}})

     }).catch(err => err)

        }).catch(err => err)
    }
    
}

exports.pullAndPay = async (req,res,next) =>{
    const pullAllData = paynetModel.find({}).catch(err=>console.log(err))

    // console.log(pullAllData)
}

exports.getUserBalance  = async (req,res,next) =>{
    req.body = JSON.parse(JSON.stringify(req.body))
    const audittrails = {
        tableName: `getUserBalance`,
        log: JSON.stringify(req.body),
        description: 'getUserBalance',
        ip:req.header('x-forwarded-for') || req.connection.remoteAddress,
        headers:JSON.stringify(req.headers),
        path:req.originalUrl
      };
      UsersLog.create(audittrails).then(audit=>audit).catch(err=>err)
    const data=   await sqldb.sequelize.query(`SELECT total_balance,user_ref_no,v_account FROM agent_info WHERE user_ref_no="${req.body.RefNo}" and user_id="${req.body.userID}"`, { type: Sequelize.QueryTypes.SELECT}).then(responseSql =>
        {
            res.status(200).send({userData:responseSql[0]})
        }).catch(err => err)

}

exports.getTransactionStatus = async(req,res,next) =>{
    req.body = JSON.parse(JSON.stringify(req.body))
    const audittrails = {
        tableName: `getTransactionStatus`,
        log: JSON.stringify(req.body),
        description: 'getTransactionStatus',
        ip:req.header('x-forwarded-for') || req.connection.remoteAddress,
        headers:JSON.stringify(req.headers),
        path:req.originalUrl
      };
      UsersLog.create(audittrails).then(audit=>audit).catch(err=>err)
    paynetModel.findOne({txnRefNo:req.body.txnRefNumber},`-createdAt -updatedAt -__v -_id`)
    .then(resObj=>{
        if(resObj){
            res.status(200).send(resObj)
        }else{
            res.status(200).send({message:"No Transaction Found"})
        }
    })
    .catch(err=>res.status(400).send({err:err}))
}
async function checkBalance(v_account){
    return new Promise(async (resolve)=>{
    const data=   await sqldb.sequelize.query(`SELECT * FROM agent_info WHERE v_account="${v_account}"`, { type: Sequelize.QueryTypes.SELECT}).then(responseSql => responseSql).catch(err => err)
            resolve(data)
        })
}
async function checkBeneficiary(account_number,ifsc_code,account_holder_name,v_account){
    return new Promise(async (resolve)=>{
    const data=   await beneficiaryModel.findOne({account_number,ifsc_code}).catch(err=>console.log(err))
            resolve(data)
        })
}
async function createBeneficiary(account_number,ifsc_code,account_holder_name,v_account,status){
    return new Promise(async (resolve)=>{
        console.log(ifsc_code)
    var data = new FormData();
    data.append('URN',"URN");
	data.append('BnfNickName', account_holder_name)
    data.append('BnfAccNo',account_number.toString())
    data.append('PayeeType' , "O")
    data.append('AGGR_ID',"AGGRID")
    data.append('BnfName',account_holder_name)
	data.append('CrpId',"PRACHICIB1")
    data.append('CrpUsr',"USER3")
    data.append('IFSC',ifsc_code)
    axios.post('https://uat.nupaybiz.com/UPIresponse/index.php/api/ICICICollect/beneAddition',data,
    {
        headers:{
            'api-key':"R3JhbUNvdmVyTnVwYXk=",
            "Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InBhbmthaiJ9.tvOARTNy9A9a5NHo1GMwIxh1P1VjUrJE31lcF08CyT8",
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        }
    }).then(beneAddObj=>{
        console.log(beneAddObj.data)
        if(beneAddObj.data.status=="SUCCESS"){
            const createDataObj= beneficiaryModel.create({account_number,ifsc_code,account_holder_name,v_account,status})
        
            resolve(createDataObj)
        }else{
            status=0
            const createDataObj= beneficiaryModel.create({account_number,ifsc_code,account_holder_name,v_account,status})
        
            resolve({hasError:true})

        }
        
    }).catch(err=>console.log(err))
     
        })
}
async function checkBeneficiaryFromBank(account_number,ifsc_code,account_holder_name,v_account){
    return new Promise(async (resolve)=>{
        if(parseInt(account_number)%2==0){
            resolve({status:true})
        }
        else{
            resolve({status:false})
        }
        
        })
}
async function updateBalance(amountLeft,v_account){
    return new Promise(async (resolve)=>{
        
        const data = await sqldb.sequelize.query(`UPDATE agent_info SET total_balance =${amountLeft}  WHERE v_account="${v_account}"`);
        console.log(data)
        resolve(data)
        
        })
}

async function checkUser(account_number){
    return new Promise(async (resolve)=>{
    const data=   await sqldb.sequelize.query(`SELECT * FROM agent_info WHERE master_account_number="${account_number}" `, { type: Sequelize.QueryTypes.SELECT}).then(responseSql => responseSql).catch(err => err)
            resolve(data)
        })
}