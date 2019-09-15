const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const nodemailer = require('nodemailer');
const md5 = require('md5');
const nodecron = require('node-cron');
const formidable = require('formidable');
const fs = require('fs');
mongoose.connect('mongodb://localhost:27017/projectDB',{useNewUrlParser:true});
const user_schema=new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String
});
const driuser_schema=new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  Phone_no:String
});
const rider_schema=new mongoose.Schema({
    _id:String,
  Username: String,
  Name:String,
  Entry_no: String,
  Phone_no: String,
  Vstatus:{
    type: Boolean,
    default: false
},
  substart: Date,
  subend: Date,
  Monday:[{
    ploc:String,
    dloc:String,
    ptime:String
  }],
  Tuesday:[{
    ploc:String,
    dloc:String,
    ptime:String
  }],
  Wednesday:[{
    ploc:String,
    dloc:String,
    ptime:String
  }],
  Thursday:[{
    ploc:String,
    dloc:String,
    ptime:String
  }],
  Friday:[{
    ploc:String,
    dloc:String,
    ptime:String
  }]
});
const loc_schema=new mongoose.Schema({
  _id:String,
  Name:String,
  Lstatus:{
    type: Boolean,
    default: false
  },
  lat:Number,
  long:Number,
});
const today_schema=new mongoose.Schema({
  _id:String,
  Name:String,
  Lupdt:Date,
  Dcontact:String,
  Booked:[],
  Regular:[]
});
const ruser=mongoose.model("Rider",user_schema);
const duser=mongoose.model("Driver",driuser_schema);
const psng=mongoose.model("Passenger",rider_schema);
const driloc=mongoose.model("Driloc",loc_schema);
const riday=mongoose.model("Today",today_schema);
const app=express();
app.use(cookie());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function(req,res){
  res.render('home');
});
app.get("/sign_in_Rider", function(req,res){
  res.render('sign_in',{user:"Rider",message:""});
  console.log(req.cookies);
});
app.post("/sign_in_Rider",function(req,res){
  var email=req.body.username;
  var password=md5(req.body.passwrd);
  ruser.find({Email:email,Password:password}, function(err,docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      if(docs.length==0){
          res.render('sign_in',{user:"Rider",message:"Email or Password incorrect"});
      }
      else{
        console.log("User exists");
        if(req.cookies.ID==undefined&&req.cookies.EMAIL==undefined){
          console.log("No cookie");
          res.cookie("ID",docs[0].id);
          res.cookie("EMAIL",email);
          res.redirect('rider_dashboard');
        }
        else if (req.cookies.ID==docs[0].id&&req.cookies.EMAIL==docs[0].Email) {
          res.redirect('rider_dashboard');
          console.log("cookie");
        }
        else{
          res.clearCookie("ID");
          res.clearCookie("EMAIL");
          res.cookie("ID",docs[0].id);
          res.cookie("EMAIL",email);
        res.redirect('rider_dashboard');
      }
      }
    }
  });
});
app.get("/sign_in_Driver", function(req,res){
  res.render('sign_in',{user:"Driver",message:""});

});
app.post("/sign_in_Driver",function(req,res){
  var email=req.body.username;
  var password=md5(req.body.passwrd);
  duser.find({Email:email,Password:password}, function(err,docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      if(docs.length==0){
          res.render('sign_in',{user:"Driver",message:"Email or Password incorrect"});
      }
      else{
        console.log("User exists");
        if(req.cookies.ID==undefined&&req.cookies.EMAIL==undefined){
          console.log("No cookie");
          res.cookie("ID",docs[0].id);
          res.cookie("EMAIL",email);
          res.redirect('driver_dashboard');
        }
        else if (req.cookies.ID==docs[0].id&&req.cookies.EMAIL==docs[0].Email) {
          res.redirect('driver_dashboard');
          console.log("cookie");
        }
        else{
          res.clearCookie("ID");
          res.clearCookie("EMAIL");
          res.cookie("ID",docs[0].id);
          res.cookie("EMAIL",email);
        res.redirect('driver_dashboard');
      }
      }
    }
  });
});
app.get("/sign_up_Rider", function(req,res){
  res.render('sign_up',{user:"Rider",message:""});
});
app.post("/sign_up_Rider",function(req,res){
  var name=req.body.nm;
  var email=req.body.eml;
  var password=md5(req.body.pswd);
  console.log(password);
  ruser.find({Email:email}, function(err,docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
    if(docs.length==0){
      console.log(docs);
      const rider=new ruser({
        Name:name,
        Email:email,
        Password:password
      });
      rider.save(function(err,doc){
        if(err){
          console.log(err);
          res.status(500).send();
        }
        else{
        res.cookie("ID",doc.id,{ httpOnly: false});
        res.cookie("EMAIL",email,{ httpOnly: false});
        const passenger=new psng({
          _id:doc.id,
          Username:email
        });
        passenger.save();
        res.redirect('rider_dashboard');
        }
      });
    }
    else{
      res.render('sign_up',{user:"Rider",message:"It appears this email is already taken"});
    }
  }
  });

});
app.get("/sign_up_Driver", function(req,res){
  res.render('sign_up',{user:"Driver",message:""});
});
app.post("/sign_up_Driver",function(req,res){
  var name=req.body.nm;
  var email=req.body.eml;
  var password=md5(req.body.pswd);
  var number=req.body.number;
  console.log(password);
  duser.find({Email:email}, function(err,docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
    if(docs.length==0){
      console.log(docs);
      const driver=new duser({
        Name:name,
        Email:email,
        Password:password,
        Phone_no:number
      });
      driver.save(function(err,doc){
        if(err){
          console.log(err);
          res.status(500).send();
        }
        else{
          const drloc=new driloc({
            _id:doc.id,
            Name:name
          });
          drloc.save();
        res.cookie("ID",doc.id,{ httpOnly: false});
        res.cookie("EMAIL",email,{ httpOnly: false});
        res.redirect('driver_dashboard');
        const t_ride=new riday({
          _id:doc.id,
          Name:name,
          Dcontact:number
        });
        t_ride.save();
        }
      });
    }
    else{
  res.render('sign_up',{user:"Driver",message:"It appears this email is already taken"});
    }
  }
  });

});
app.get("/rider_dashboard", function(req,res){
  if(req.cookies.ID==undefined&&req.cookies.EMAIL==undefined){
    res.redirect("/sign_in_Rider");
  }
  else{
    res.render('rider_dashboard');
  }
});
app.get("/driver_dashboard", function(req,res){
  if(req.cookies.ID==undefined&&req.cookies.EMAIL==undefined){
    res.redirect("/sign_in_Driver");
  }
  else{
    var d = new Date();
    var week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var day=week[d.getDay()];
    psng.find({subend:{$gte : d}},function(err,docs){
      //console.log(docs);
      var i;
      var j;
      var farr=[];
      for(i=0;i<docs.length;i++){
        switch (day) {
          case "Monday":
              for(j=0;j<docs[i].Monday.length;j++){
                //var obj=docs[i].Monday[j];
              //  obj["rcontact"]=docs[i].Phone_no;
                var obj={
                  _id:docs[i].Monday[j].id,
                  ploc:docs[i].Monday[j].ploc,
                  dloc:docs[i].Monday[j].dloc,
                  ptime:docs[i].Monday[j].ptime,
                  rcontact:docs[i].Phone_no
                }
                //console.log(obj);
                farr.push(obj);
              }
            break;
          case "Tuesday":
              for(j=0;j<docs[i].Tuesday.length;j++){
                var obj={
                  _id:docs[i].Tuesday[j].id,
                  ploc:docs[i].Tuesday[j].ploc,
                  dloc:docs[i].Tuesday[j].dloc,
                  ptime:docs[i].Tuesday[j].ptime,
                  rcontact:docs[i].Phone_no
                }
                farr.push(obj);
              }
            break;
            case "Wednesday":
                for(j=0;j<docs[i].Wednesday.length;j++){
                  var obj={
                    _id:docs[i].Wednesday[j].id,
                    ploc:docs[i].Wednesday[j].ploc,
                    dloc:docs[i].Wednesday[j].dloc,
                    ptime:docs[i].Wednesday[j].ptime,
                    rcontact:docs[i].Phone_no
                  }
                  farr.push(obj);
                }
              break;
            case "Thursday":
                for(j=0;j<docs[i].Thursday.length;j++){
                  var obj={
                    _id:docs[i].Thursday[j].id,
                    ploc:docs[i].Thursday[j].ploc,
                    dloc:docs[i].Thursday[j].dloc,
                    ptime:docs[i].Thursday[j].ptime,
                    rcontact:docs[i].Phone_no
                  }
                  farr.push(obj);
                }
              break;
            case "Friday":
                for(j=0;j<docs[i].Friday.length;j++){
                  var obj={
                    _id:docs[i].Friday[j].id,
                    ploc:docs[i].Friday[j].ploc,
                    dloc:docs[i].Friday[j].dloc,
                    ptime:docs[i].Friday[j].ptime,
                    rcontact:docs[i].Phone_no
                  }
                  farr.push(obj);
                }
              break;
          default:

        }
      }
      farr.sort(function(a, b){
        return a.ptime-b.ptime
    });
    var bk1=[];
    var bk2=[];
    var boys=["Kumaon Hostel","Karakoram Hostel","Shivalik Hostel","Jwalamukhi Hostel",
    "Vindhyachal Hostel","Zanskar Hostel","Aravali Hostel","Satpura Hostel",
    "Nilgiri Hostel","Udaigiri Hostel","Girnar Hostel"];
    var girls=["Himadri Hostel","Kailash Hostel"];
    var time=800;
    var len=0;
    //console.log(farr);
    while (len<farr.length) {
      var gh=[];
      var bh=[];
      var ex=[];
      var g=len;
      //console.log(farr);
      while((g<farr.length)&&(farr[g].ptime)<time){

        if(boys.includes(farr[g].ploc)||boys.includes(farr[g].dloc)){
          bh.push(farr[g]);
        }
        else if(girls.includes(farr[g].ploc)||girls.includes(farr[g].dloc)){
          gh.push(farr[g]);
        }
        else{
          ex.push(farr[g]);
        }
        g++;
        len++;
      }
      if(gh.length==0){
        var h;
        for(h=0;h<Math.floor(bh.length/2);h++){
          bk1.push(bh[h]);
        }
        for(h=Math.floor(bh.length/2);h<bh.length;h++){
          bk2.push(bh[h]);
        }
      }
      else if(bh.length==0){
        var h;
        for(h=0;h<Math.floor(gh.length/2);h++){
          bk1.push(gh[h]);
        }
        for(h=Math.floor(gh.length/2);h<gh.length;h++){
          bk2.push(gh[h]);
        }
      }
      else{
        var h;
        for(h=0;h<bh.length;h++){
          bk1.push(bh[h]);
        }
        for(h=0;h<gh.length;h++){
          bk2.push(gh[h]);
        }
      }
      if(bk1.length>bk2.length){
        for(h=0;h<ex.length;h++){
          bk2.push(ex[h]);
        }
      }
      else{
        for(h=0;h<ex.length;h++){
          bk1.push(ex[h]);
        }
      }
      time=time+100;
    }
    riday.find(function(err,docs){
      if(docs.length<2){
        ;
      }
      else{
      riday.updateOne({_id:docs[0].id},{Booked:bk1,Lupdt:d},function(err,numaffect){
        ;
      });
      riday.updateOne({_id:docs[1].id},{Booked:bk2,Lupdt:d},function(err,numaffect){
        ;
      });
    }
    });
    console.log(bk1);
    console.log('running every minute');
    console.log(bk2);
    riday.find({_id:req.cookies.ID},function(err,docs){
        res.render('driver_dashboard',{farr:docs[0].Booked});
    });

    });
  }
});
app.post("/driver_dashboard",function(req,res){
  driloc.updateOne({_id:req.cookies.ID},{lat:req.headers.lat,long:req.headers.long,Lstatus:true},function(err,numaffect){
    ;
  });
  console.log(req.headers.lat);
  console.log(req.headers.long);
  res.send("You are live");
});
app.get("/req_form", function(req,res){
  if(req.cookies.ID==undefined&&req.cookies.EMAIL==undefined){
    res.redirect("/sign_in_Rider");
  }
  else{
  res.render('req_form');
}
});
app.get("/my_ride", function(req,res){
  if(req.cookies.ID==undefined&&req.cookies.EMAIL==undefined){
    res.redirect("/sign_in_Rider");
  }
  else {
var d=new Date();
var week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var day=week[d.getDay()];
var farr=[];
psng.find({_id:req.cookies.ID,Username:req.cookies.EMAIL},function(err,docs){
  if(err){
    res.render("error");
  }
  else{
    var i;
    switch (day) {
      case "Monday":
        for(i=0;i<docs[0].Monday.length;i++){
          farr.push(docs[0].Monday[i]);
        }
        farr.sort(function(a, b){
          return a.ptime-b.ptime
      });
        break;
      case "Tuesday":
      for(i=0;i<docs[0].Tuesday.length;i++){
        farr.push(docs[0].Tuesday[i]);
      }
      farr.sort(function(a, b){
        return a.ptime-b.ptime
    });
        break;
      case "Wednesday":
      for(i=0;i<docs[0].Wednesday.length;i++){
        farr.push(docs[0].Wednesday[i]);
      }
      farr.sort(function(a, b){
        return a.ptime-b.ptime
    });
        break;
      case "Thursday":
      for(i=0;i<docs[0].Thursday.length;i++){
        farr.push(docs[0].Thursday[i]);
      }
      farr.sort(function(a, b){
        return a.ptime-b.ptime
    });
        break;
      case "Friday":
      for(i=0;i<docs[0].Friday.length;i++){
        farr.push(docs[0].Friday[i]);
      }
      farr.sort(function(a, b){
        return a.ptime-b.ptime
    });
        break;
    }
    res.render('my_ride',{day:day,farr:farr});
  }
});
}
});
app.post("/req_form" , function(req,res){
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    if(err){
      res.render("error");
    }
    else{
      console.log(files);
      var oldpath1 = files.idfile.path;
      var oldpath2 = files.mcfile.path;
      var i;
     var monarr=[];
     if(fields.mon.length!=0){
         var arr1=JSON.parse(fields.mon);
         console.log(arr1);
         for(i=0;i<arr1.length;i++){
           monarr.push(JSON.parse(arr1[i]));
         }
     }
     var tuearr=[];
     if(fields.tue.length!=0){
       var arr2=JSON.parse(fields.tue);
       console.log(arr2);

       for(i=0;i<arr2.length;i++){
           tuearr.push(JSON.parse(arr2[i]));
         }
     }
     var wedarr=[];
     if(fields.wed.length!=0){
       var arr3=JSON.parse(fields.wed);
       console.log(arr3);
       for(i=0;i<arr3.length;i++){
           wedarr.push(JSON.parse(arr3[i]));
         }
     }
     var thurarr=[];
     if(fields.thurs.length!=0){
       var arr4=JSON.parse(fields.thurs);
       console.log(arr4);
       for(i=0;i<arr4.length;i++){
         thurarr.push(JSON.parse(arr4[i]));
       }
     }
     var friarr=[];
     if(fields.fri.length!=0){
     var arr5=JSON.parse(fields.fri);
     console.log(arr5);
     for(i=0;i<arr5.length;i++){
       friarr.push(JSON.parse(arr5[i]));
     }
     }
     psng.updateOne({_id:req.cookies.ID},{Vstatus:false,Name:fields.field1,Entry_no:fields.field2,Phone_no:fields.field3,substart:fields.field4,subend:fields.field5,Monday:monarr,Tuesday:tuearr,Wednesday:wedarr,Thursday:thurarr,Friday:friarr},function(err,numaffect){
       if(err){
         res.render("error");
       }
       else{
         ;
       }
     });
     var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'transportationcampus@gmail.com',
        pass: 'user@admin1234'
      }
    });
    var mailOptions = {
    from: 'transportationcampus@gmail.com',
    to: 'transportationcampus@gmail.com',
    subject: 'Filed Request for booking rides',
    html: '<p><b>Name: </b>'+fields.field1+"</p></br>"
          +'<p><b>Entry No.: </b>'+fields.field2+"</p></br>"
          +'<p><b>Phone No.: </b>'+fields.field3+"</p></br>"
          +'<p><b>Subscription Start: </b>'+fields.field4+"</p></br>"
          +'<p><b>Subscription End: </b>'+fields.field5+"</p></br>"
          +"<p>Attached Identity proof and medical condition proof</p>"
          +"<p><b>Add this route to home page : </b></p>"+"/v_status"+"?"+"id"
          +"="+req.cookies.ID+"&"+"eno"+"="+fields.field2
    ,
    attachments: [
      { filename: files.idfile.name,
         path:oldpath1
      },
      { filename: files.mcfile.name,
            path:oldpath2
      }
        ]
    };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.render("error");
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect("/my_ride");
    }
    });
    }
    });

});
app.get("/logout", function(req,res){
  res.clearCookie("ID");
res.clearCookie("EMAIL");
console.log(req.cookies.ID);
  res.redirect("/");
});
app.get("/mapcord",function(req,res){
  driloc.find(function(err,docs){
    if(err){
      console.log(err);
      res.status(500).send();
    }
    else{
      if(docs.length<2){
        var lat=[28.4402076,28.4402076];
        var long=[77.0716362,77.0716362];
        res.send({lat:JSON.stringify(lat),long:JSON.stringify(long)});
      }
      else{
        var lat=[docs[0].lat,docs[1].lat];
        var long=[docs[0].long,docs[1].long];
        console.log(docs);
        res.send({lat:JSON.stringify(lat),long:JSON.stringify(long)});
      }
    }
  });
});
app.get("/v_status",function(req,res){
  console.log(req.query.id);
  if(req.query.id==undefined&&req.query.eno==undefined){
    res.send("Access Denied");
  }
  else{
  psng.find({_id:req.query.id,Entry_no:req.query.eno},function(err,docs){
    if(err){
      console.log(err);
      res.render("error");
    }
    else{
      if(docs.length==0){
        res.send("No such Passenger")
      }
      else{
        psng.updateOne({_id:req.query.id,Entry_no:req.query.eno},{Vstatus:true},function(err,numaffect){
          if(err){
            res.render("error");
          }
          else{
              res.send("Passenger Verification Status Updated");
          }
        });
      }
    }
  });
}
});
app.get("/error",function(req,res){
  res.render("error");
});
app.get("/caution",function(req,res){
  res.render("caution");
});
nodecron.schedule('00 20 * * *', function() {
  var d = new Date();
  psng.find({subend:{$gte : d}},function(err,docs){
    var i;
    var j;
    var farr=[];
    for(i=0;i<docs.length;i++){
      for(j=0;j<docs[i].Tuesday.length;j++){
        farr.push(docs[i].Tuesday[j]);
      }
    }
    farr.sort(function(a, b){
      return a.ptime-b.ptime
  });
  var bk1=[];
  var bk2=[];
  var boys=["Kumaon Hostel","Karakoram Hostel","Shivalik Hostel","Jwalamukhi Hostel",
  "Vindhyachal Hostel","Zanskar Hostel","Aravali Hostel","Satpura Hostel",
  "Nilgiri Hostel","Udaigiri Hostel","Girnar Hostel"];
  var girls=["Himadri Hostel","Kailash Hostel"];
  var time=800;
  var len=0;
  //console.log(farr);
  while (len<farr.length) {
    var gh=[];
    var bh=[];
    var ex=[];
    var g=len;
    //console.log(farr);
    while((g<farr.length)&&(farr[g].ptime)<time){

      if(boys.includes(farr[g].ploc)||boys.includes(farr[g].dloc)){
        bh.push(farr[g]);
      }
      else if(girls.includes(farr[g].ploc)||girls.includes(farr[g].dloc)){
        gh.push(farr[g]);
      }
      else{
        ex.push(farr[g]);
      }
      g++;
      len++;
    }
    if(gh.length==0){
      var h;
      for(h=0;h<Math.floor(bh.length/2);h++){
        bk1.push(bh[h]);
      }
      for(h=Math.floor(bh.length/2);h<bh.length;h++){
        bk2.push(bh[h]);
      }
    }
    else if(bh.length==0){
      var h;
      for(h=0;h<Math.floor(gh.length/2);h++){
        bk1.push(gh[h]);
      }
      for(h=Math.floor(gh.length/2);h<gh.length;h++){
        bk2.push(gh[h]);
      }
    }
    else{
      var h;
      for(h=0;h<bh.length;h++){
        bk1.push(bh[h]);
      }
      for(h=0;h<gh.length;h++){
        bk2.push(gh[h]);
      }
    }
    if(bk1.length>bk2.length){
      for(h=0;h<ex.length;h++){
        bk2.push(ex[h]);
      }
    }
    else{
      for(h=0;h<ex.length;h++){
        bk1.push(ex[h]);
      }
    }
    time=time+100;
  }
  console.log(bk1);
  console.log('running every minute');
  console.log(bk2);
  });
},{
  scheduled: true,
    timezone: "Asia/Kolkata"
});
app.listen(3000,function(){
  console.log("Server Started on port 3000");
});
