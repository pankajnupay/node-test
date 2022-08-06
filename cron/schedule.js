const cron = require('node-schedule')
const config = require('./config')
const job = require('./job')

exports.initialize = () =>{
    cron.scheduleJob(config.cronRule.every1Minutes,function(){
        job.processOutwardTxn()
    })
   
}

