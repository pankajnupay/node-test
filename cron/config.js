var config = {
    cronRule: {
        everySec: '*/1 * * * * *',
        every30Minutes: '*/30 * * * *',   
        every1Minutes: '*/1 * * * *',   
        everyDay10_30:'30 10 * * *',
        everyDay19_30:'* 19 * * *',
        everyDay12AM:'0 0 * * *',
        everyDay11_50PM:'50 23 * * *',
        everyDay11_45PM:'45 23 * * *' ,
        everyDay11_30PM:'30 23 * * *',
        everyDay17_59PM:'18 23 * * *',
        everyDay20_00PM:'00 20 * * *' 
    }
}


module.exports=config;