const express = require('express');
const httpErrors = require('http-errors');
const config = require('config');
const {getDatabaseConnection} = require('./database/dbConnection');
const {getLongUrl,saveShortUrl} = require('./database/shortUrl/shortUrlService');

const app = express();

const port = config.get('server.port');

const PORT = port || 5001;

// app.use(logger('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());



app.get('/',(req,res)=>{
    // res.send(httpErrors(500,"Internal server error"));
    res.send("hello world");
});

app.get('/shortUrl',async(req,res)=>{
    try{
        let longUrl = req.query.longUrl;
        console.log("long url : ",longUrl);
        let shortUrl = await saveShortUrl(longUrl);
        res.json({shortUrl:shortUrl});
    }
    catch(err){
        console.error("error while generating short url : ",err);
        res.send(httpErrors(500,"something went wrong"));
    }
});

app.get('/serve/:shortUrl',async(req,res)=>{
    console.log( "serve short url : ",req.params.shortUrl);
    let shortUrl = req.params.shortUrl;
    let longUrl = await getLongUrl(shortUrl);
    console.log("logurl : ",longUrl);
    res.redirect(301,longUrl);
});

process.on('uncaughtException', err => {
    console.error('Uncaught Exception thrown',err);
    process.exit(1);
  });

app.listen(PORT,async()=>{
    try{
        await getDatabaseConnection();
        console.log("successfully connected database");
        console.log(`Server is running on ${PORT}`);
    }
    catch(err){
        console.error("Unable to start server : ",err);
        process.exit(1);
    }
});