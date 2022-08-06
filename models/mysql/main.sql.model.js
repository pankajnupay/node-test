
var sqldb=require('../../config/dbconfig/sqldb.config')

sequelize = sqldb.sequelize,
Sequelize = sqldb.Sequelize;
module.exports=sequelize.define( 
'customers',{
id:{
type:Sequelize.INTEGER,
primaryKey:true,
autoIncrement:true
},
name:{
type:Sequelize.STRING
},
email:{
    type:Sequelize.STRING
},
phone_number:{
    type:Sequelize.STRING
}

}, {
    timestamps: false,
    tableName: 'customers'
});

