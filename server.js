var express = require('express')
var admin = require("firebase-admin");
var app = express()
var serviceAccount = require("./fire-bb43b-firebase-adminsdk-oegpb-0bff76fe92.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fire-bb43b.firebaseio.com"
});
var db = admin.database()
var iot=db.ref('iot')
app.get('/', function (req, res) {
    iot.push().set({
        value:req.query.value
    })
    res.json({
        value:req.query.value
    })
})

app.get('/clear',function(req,res){
    iot.set(null)
    res.json({
        success:true
    })
})
app.listen(8080, function () {
      console.log('App listening on port 8080!')
})
