const express = require('express')
const app = express()
const port = 8080

const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { newsArticleModel } = require('./connector')

app.get("/newFeeds", async (req, res)=>{
    let limit = 0;
    let offset = 0;
    const sizeOfPaper = await newsArticleModel.countDocuments({});
    
    if(isNaN(req.query.limit)){
        limit = 10;
    }
    else if(!isNaN(req.query.limit)){
        limit = parseInt(req.query.limit);
    }
    if(!isNaN(req.query.offset)){
        offset = parseInt(req.query.offset);

    }else if(isNaN(req.query.offset)){
        offset = 0;
    }
    let arr = [];

    if(sizeOfPaper > offset){
        arr = await newsArticleModel.find().skip(offset).limit(limit);
        res.send(arr);
    }else{
        res.send([]);
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;