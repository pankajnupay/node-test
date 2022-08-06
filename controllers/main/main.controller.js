const Sequelize = require('sequelize')
const sqldb = require('../../config/dbconfig/sqldb.config')
const sqlQueries = require('../../helpers/sqlQueries')
const emandateModel = require('../../models/mongodb/emandate.model')
const crypto = require('crypto');
const axios = require('axios');
const { response } = require('express');



exports.createEmandate = async (req,res,next) =>{
    const body = req.body
    axios.post('https://uat.emandate.in/api/v1/customers',body,{
        headers:{
            'Content-Type': 'application/json',
            'Accept':'application/json',
            "Authorization":"M2RhYzZiMjB8fDE0Y2Y0NTM5MDRhMzliYjhiNjJj"
        }
    }).then(response=>{
        for(let i=0;i<categories.length;i++){
            if(categories[i].id==body.category_id){
                body.cat_code = categories[i].cat_code
                body.cat_description = categories[i].description
                break
            }
        }
        for(let i=0;i<body.bank_accounts_attributes.length;i++){
            for(let j=0;j<banks.length;j++){
                if(banks[j].id==body.bank_accounts_attributes[i].bank_id){
                    body.bank_accounts_attributes[i].bank_name =banks[j].name
                    body.bank_accounts_attributes[i].bank_mode = banks[j].mode
                    body.bank_accounts_attributes[i].bank_code = banks[j].bank_code
                    break
                }

            }
            
        }
        body.id = response.data.customer.id
        body.submitted_on=response.data.customer.submitted_on
        body.accptd = response.data.customer.accptd
        body.expires_at = response.data.customer.expires_at
        body.bank_accounts = response.data.customer.bank_accounts
        body.url = response.data.url
        body.notice = response.data.notice
        emandateModel.create(body)
        .then(resObj=>res.status(200).send(response.data))
        .catch(err=>res.status(400).send(err))
    }).catch(err=>res.status(400).send(err))
    

}

exports.getEmandateStatusById = async (req,res,next)=>{
    const id = req.params.id
    emandateModel.find({id:id},`-createdAt -updatedAt -__v -bank_accounts_attributes -_id -category_id 
    -cat_code -cat_description -url -notice
    `).then(response=>{
        if(response.length==0){
            res.status(200).send({message:"No Emandate With This Customer"})
        }else{
            res.status(200).send({customer:response[0]})
        }
    }).catch(err=>res.status(400).send({message:"No Emandate With This Customer"}))
}

const categories = [
    {
        "id": 1,
        "cat_code": "C001",
        "description": "B2B Corporate"
    },
    {
        "id": 2,
        "cat_code": "B001",
        "description": "Bill Payment Credit Card"
    },
    {
        "id": 3,
        "cat_code": "U001",
        "description": "Utility Bill Payment Electricity"
    },
    {
        "id": 4,
        "cat_code": "U003",
        "description": "Utility Bill Payment Gas Supply Cos"
    },
    {
        "id": 5,
        "cat_code": "U005",
        "description": "Utility Bill Payment Mobile Telephone BroadBand"
    },
    {
        "id": 6,
        "cat_code": "U006",
        "description": "Utility Bill Payment Water"
    },
    {
        "id": 7,
        "cat_code": "L001",
        "description": "Loan instalment payment"
    },
    {
        "id": 8,
        "cat_code": "I002",
        "description": "Insurance Other Payment"
    },
    {
        "id": 9,
        "cat_code": "I001",
        "description": "Insurance Premium"
    },
    {
        "id": 10,
        "cat_code": "M001",
        "description": "Mutual Fund Payment"
    },
    {
        "id": 11,
        "cat_code": "F001",
        "description": "Subscription Fees"
    },
    {
        "id": 12,
        "cat_code": "T001",
        "description": "Tax Payment"
    },
    {
        "id": 13,
        "cat_code": "L002",
        "description": "Loan Amount Security"
    },
    {
        "id": 14,
        "cat_code": "E001",
        "description": "Education Fees"
    },
    {
        "id": 15,
        "cat_code": "U099",
        "description": "Others"
    }
]

const banks=[
    {
        "id": 50,
        "name": "KARNATAKA BANK LTD",
        "bank_code": "KARB",
        "mode": "netbanking, debit card"
    },
    {
        "id": 100,
        "name": "STATE BANK OF INDIA",
        "bank_code": "SBIN",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 39,
        "name": "DHANALAXMI BANK",
        "bank_code": "DLXB",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 3,
        "name": "BANK OF INDIA",
        "bank_code": "BKID",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 61,
        "name": "ORIENTAL BANK OF COMMERCE",
        "bank_code": "ORBC",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 14,
        "name": "UCO BANK",
        "bank_code": "UCBA",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 99,
        "name": "VIJAYA BANK",
        "bank_code": "VIJB",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 13,
        "name": "UNION BANK OF INDIA",
        "bank_code": "UBIN",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 76,
        "name": "SYNDICATE BANK",
        "bank_code": "SYNB",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 19,
        "name": "ALLAHABAD BANK",
        "bank_code": "ALLA",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 38,
        "name": "DCB BANK LTD",
        "bank_code": "DCBL",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 44,
        "name": "INDUSIND BANK",
        "bank_code": "INDB",
        "mode": "netbanking, debit card"
    },
    {
        "id": 7,
        "name": "ICICI BANK LTD",
        "bank_code": "ICIC",
        "mode": "netbanking, debit card"
    },
    {
        "id": 37,
        "name": "DEUTSCHE BANK AG",
        "bank_code": "DEUT",
        "mode": "netbanking, debit card"
    },
    {
        "id": 82,
        "name": "FEDERAL BANK",
        "bank_code": "FDRL",
        "mode": "netbanking, debit card"
    },
    {
        "id": 1,
        "name": "AXIS BANK",
        "bank_code": "UTIB",
        "mode": "netbanking"
    },
    {
        "id": 69,
        "name": "SOUTH INDIAN BANK",
        "bank_code": "SIBL",
        "mode": "debit card"
    },
    {
        "id": 4,
        "name": "CENTRAL BANK OF INDIA",
        "bank_code": "CBIN",
        "mode": "netbanking"
    },
    {
        "id": 20,
        "name": "ANDHRA BANK",
        "bank_code": "ANDB",
        "mode": "netbanking, debit card"
    },
    {
        "id": 11,
        "name": "PUNJAB NATIONAL BANK",
        "bank_code": "PUNB",
        "mode": "netbanking, debit card"
    },
    {
        "id": 77,
        "name": "TAMILNAD MERCANTILE BANK LTD",
        "bank_code": "TMBL",
        "mode": "netbanking"
    },
    {
        "id": 10,
        "name": "INDIAN OVERSEAS BANK",
        "bank_code": "IOBA",
        "mode": "netbanking"
    },
    {
        "id": 91,
        "name": "RBL BANK LTD",
        "bank_code": "RATN",
        "mode": "netbanking"
    },
    {
        "id": 33,
        "name": "CITY UNION BANK LTD",
        "bank_code": "CIUB",
        "mode": "netbanking"
    },
    {
        "id": 29,
        "name": "CANARA BANK",
        "bank_code": "CNRB",
        "mode": "netbanking"
    },
    {
        "id": 52,
        "name": "KOTAK MAHINDRA BANK LTD",
        "bank_code": "KKBK",
        "mode": "netbanking, debit card"
    },
    {
        "id": 81,
        "name": "THE COSMOS CO-OPERATIVE BANK LTD",
        "bank_code": "COSB",
        "mode": "E-mandate facility not available for this bank"
    },
    {
        "id": 15,
        "name": "YES BANK",
        "bank_code": "YESB",
        "mode": "netbanking, debit card"
    },
    {
        "id": 616,
        "name": "UJJIVAN SMALL FINANCE BANK LTD",
        "bank_code": "USFB",
        "mode": "netbanking, debit card"
    },
    {
        "id": 247,
        "name": "IDFC FIRST BANK LTD",
        "bank_code": "IDFB",
        "mode": "netbanking, debit card"
    },
    {
        "id": 6,
        "name": "HDFC BANK LTD",
        "bank_code": "HDFC",
        "mode": "netbanking, debit card"
    },
    {
        "id": 284,
        "name": "EQUITAS SMALL FINANCE BANK LTD",
        "bank_code": "ESFB",
        "mode": "netbanking, debit card"
    },
    {
        "id": 328,
        "name": "PAYTM PAYMENTS BANK LTD",
        "bank_code": "PYTM",
        "mode": "netbanking"
    },
    {
        "id": 8,
        "name": "IDBI BANK",
        "bank_code": "IBKL",
        "mode": "netbanking"
    },
    {
        "id": 347,
        "name": "AU SMALL FINANCE BANK LTD",
        "bank_code": "AUBL",
        "mode": "debit card"
    },
    {
        "id": 24,
        "name": "BANK OF MAHARASHTRA",
        "bank_code": "MAHB",
        "mode": "netbanking, debit card"
    },
    {
        "id": 106,
        "name": "UNITED BANK OF INDIA",
        "bank_code": "UTBI",
        "mode": "netbanking, debit card"
    },
    {
        "id": 2,
        "name": "BANK OF BARODA",
        "bank_code": "BARB",
        "mode": "netbanking"
    },
    {
        "id": 70,
        "name": "STANDARD CHARTERED BANK",
        "bank_code": "SCBL",
        "mode": "netbanking"
    }
]
