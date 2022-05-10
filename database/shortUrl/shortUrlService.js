const shortUrlModel = require('./shortUrlModel');
const {nanoid} = require('nanoid');

let getLongUrl = async(shortUrl)=>{
    try{
        let result =  await shortUrlModel.getShortUrl(shortUrl);
        return result.longUrl;
    }
    catch(err){
        throw err;
    }
        
};

let saveShortUrl = async(longUrl)=>{
    try{
        let shortUrl = nanoid();
        await shortUrlModel.saveShortUrl(shortUrl,longUrl);
        return shortUrl;
    }
    catch(err){
        throw err;
    }
        
};

exports.getLongUrl = getLongUrl;
exports.saveShortUrl = saveShortUrl;