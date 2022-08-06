const sqldb=require('./dbconfig/sqldb.config')
const sqldbtest=require('./dbconfig/sqldbtest.config')
const postgresdb=require('./dbconfig/postgresdb.config')
const connectDB=require('./dbconfig/mongodb.config')


sql = sqldb.sequelize;
postgres = postgresdb.postgressequelize;   
     
sql.authenticate()
.then(() =>console.log('MySqlDataBase is Connected'))
.catch(err =>console.log('Error:'+err))

sqltest = sqldbtest.sequelize;
postgres = postgresdb.postgressequelize;   
     
sqltest.authenticate()
.then(() =>console.log('MySqlDataBase test is Connected'))
.catch(err =>console.log('Error:'+err))
/*
postgres.authenticate()
.then(() =>console.log('postgresDataBase Connected'))
.catch(err =>console.log('Error:'+err))
*/

connectDB()

