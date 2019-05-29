const express=require('express');

const bodyparser=require('body-parser');

const mongoose=require('mongoose');

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://viki:vignesh1@ds155313.mlab.com:55313/book_stores_db');

const {BookDetails}=require('./models/books');

const {StoreDetails}=require('./models/stores');

const app=express();

app.use(express.static(__dirname+"/../public"));

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:false}));



app.get('/api/books',(req,res)=>{

    console.log(req.method);
    console.log(req.url);

    console.log(req.query.limitdata);
    let limitNoofBooks=parseInt(req.query.limitdata);
    let OrderofBooks=req.query.booksorder;
    BookDetails.find().sort({_id:OrderofBooks}).limit(limitNoofBooks).exec((err,doc)=>{
        if(err){
           res.status(400).send(err);
        }
        else{
            console.log(doc);
            res.status(200).send(doc);
        }
    });

});

app.get('/api/stores',(req,res)=>{

    console.log(req.method);
    console.log(req.url);
  
    

   StoreDetails.find((err,doc)=>{
       if(err){
           console.log(err);
           res.status(400).send(err);
       }
       else{
          console.log(doc);
          res.status(200).send(doc);
       }
   });
});


app.post('/api/add/store',(req,res)=>{

    console.log(req.method);
    console.log(req.url);

    StoreDetails.create(req.body,(err,doc)=>{
        if(err){
           console.log(err);
           res.status(400).send(err);
        }
        else{
            console.log(doc);
            res.status(200).send();
        }
    });
});


app.post('/api/add/books',(req,res)=>{
    console.log(req.method);
    console.log(req.url);
    
    console.log('Book hello');
    BookDetails.create(req.body,(err,doc)=>{
        if(err){
           console.log(err);
           res.status(400).send(err);
        }
        else{
            console.log(doc);
            res.status(200).send();
        }
    });

});


app.get('/api/books/:bookid',(req,res)=>{
    
    console.log(req.method);
    console.log(req.url);
    console.log(req.params.bookid);

    BookDetails.findById(req.params.bookid,(err,doc)=>{
        if(err){
           res.status(400).send(err);
        }
        else{
            console.log(doc);
            res.status(200).send(doc);
        }
    });
});


app.patch('/api/add/books/:id',(req,res)=>{
    console.log(req.method);
    console.log(req.url);
    console.log(req.params.id);

   BookDetails.findByIdAndUpdate(req.params.id,{
       $set:req.body
   },{new:true},(err,doc)=>{
       if(err){
          res.status(400).send(err);
       }
       else{
           console.log(doc);
           res.status(200).send(doc);
       }
   });
   
});


app.delete('/api/delete/books/:id',(req,res)=>{
    
    console.log(req.method);
    console.log(req.url);
    console.log("delete Request");
    BookDetails.findByIdAndRemove(req.params.id,(err,doc)=>{
           if(err){
              res.status(400).send(err);
            }
            else{
                console.log(doc);
                res.status(200).send();
            }
    });
});


const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server started at port:${port}`);
});