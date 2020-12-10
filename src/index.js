const express = require('express')
const app = express()
const port = 8080

const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { newsArticleModel } = require('./connector')
let offset = 0;
app.get("/newFeeds", async (req, res)=>{
    let limit = 0;
    
    if(!isNaN(req.query.offset)){
        offset += parseInt(req.query.offset);
    }else if(isNaN(req.query.offset)){
        offset = 0;
    }
    if(!isNaN(req.query.limit)){
        limit = parseInt(req.query.limit);
    }else if(isNaN(req.query.limit)){
        limit = 10;
        offset = 0;
    }
    let arr = [];

    if(await newsArticleModel.countDocuments({}) > offset){
        arr = await newsArticleModel.find().skip(offset).limit(limit);
        
        res.send(arr);
    }else{
        res.send([]);
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;