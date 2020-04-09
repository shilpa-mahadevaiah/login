var express =require('express');
var bodyParser=require('body-parser');
var mongodb=require('mongodb');
var mongoClient=mongodb.MongoClient;
const url='mongodb://database:27017';
const dbName='nodedb';
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.post('/register',function(req,res){
    mongoClient.connect(url,function(err,client) {
        if(err){
            console.log('Unable to connect to mongodb Server');
          } else {
              console.log('Connected to mongo server Successfully!!!!');
              const db=client.db(dbName);
               db.collection('Users').insert({name:req.body.uname,password:req.body.password});
               res.send('Registered successfully!!!!');   
              client.close();
          }
      })
})
app.post('/login',function(req,res){
    mongoClient.connect(url,function(err,client) {
        if(err){
            console.log('Unable to connect to mongodb Server');
          } else {
              console.log('Connected to mongo server Successfully!!!!');
              const db=client.db(dbName);
              console.log(req.body.uname+' ' +req.body.password);
               db.collection('Users')
               .find({name:req.body.uname,password:req.body.password})
               .toArray(function(err,data){
                if(data.length==0){
                    res.send('Invalid User /password');
                   } else {
                    res.send('Logined sucessfully!!!!');
                   }
               })
            client.close();
          }
      })
})
app.listen(5000,function(){
    console.log("Express server is listening on port 4000!");
});