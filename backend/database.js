const {createPool} = require('mysql')

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database: "test",
    connectionLimit: 10,
    



}) 
pool.query('select * from users where password=1234',(err,result,fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})