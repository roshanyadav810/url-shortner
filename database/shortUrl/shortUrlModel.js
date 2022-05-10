const {getDatabaseConnection} = require('../dbConnection'); 
const config = require('config');

let dbName = config.get('dbConfig').dbName;
let database = null;
(async ()=>{
    let dbConn = await getDatabaseConnection();
    database = await dbConn.db(dbName);
})();

const COLLECTION_NAME = 'short-url';

const saveShortUrl = async(shortUrl , longUrl)=>{
    try{
        let obj = {
            shortUrl : shortUrl,
            longUrl : longUrl
        };
        let result = await database.collection(COLLECTION_NAME).insertOne(obj);
        return result;
    }
    catch(err){
        throw err;
    }
};

const getShortUrl = async(shortUrl)=>{
    try{
        let query = {shortUrl : shortUrl};
        let result = await database.collection(COLLECTION_NAME).findOne(query);
        console.log("find result : ",result);
        // let data = [];
        // await cursur.forEach(element => data.push(element));
        return result;
    }
    catch(err){
        throw err;
    }
};

exports.saveShortUrl = saveShortUrl;
exports.getShortUrl = getShortUrl;