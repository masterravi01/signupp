const express = require("express");
const bodyParser = require("body-parser");
const request =require("request");
const https=require("https");
app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const fname =req.body.fname;
  const lname =req.body.lname;
  const email =req.body.email;
  const data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };

app.post("/failure",function(req,res){
  res.redirect("/");
});

  const jsonData=JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/49ebd6b173" ;
  const options={
    method:"POST",
    auth:"ravi:2afa49d1e45b3531a1cf92d46c0948cf-us20"

  }
  const request=  https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/Success.html");

    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();


});


app.listen(process.env.PORT || 3000,function(){
  console.log("server is started at port 3000. ");
})

// 2afa49d1e45b3531a1cf92d46c0948cf-us20
