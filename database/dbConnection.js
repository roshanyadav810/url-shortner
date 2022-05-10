const {MongoClient} = require('mongodb');
const config = require('config');

let getDatabaseConnection  = (()=>{
    let dbConn = null;
    let dbConnection = async()=>{
        try{
            let dbConfig = config.get('dbConfig');
            const dbUrl = "mongodb://"+dbConfig.host+":"+dbConfig.port;
            dbConn = await MongoClient.connect(dbUrl);
            return dbConn;
        }
        catch(err){
            throw err;
        }
    };

    let get = async()=>{
        try{
            if(dbConn == null){
                dbConn = await dbConnection();
            }
            return dbConn;            
        }
        catch(err){
            throw err;
        }
    };
    return get;

})();


exports.getDatabaseConnection = getDatabaseConnection;