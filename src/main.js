const express=require('express');
const app=express();
const mongo=require('mongodb').Mongo();

app.get('/',(req,res)=>{
    res.send("Hello World");
});
app.post('/',(req,res)=>{
   res.send("Hello World!");
});
app.listen(8081,()=>{
    console.log('Läuft diggi');
});