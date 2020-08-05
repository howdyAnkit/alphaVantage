//jshint esversion:8

const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const fs = require('fs');
const app =express();
// const alpha = require('alphavantage')({ key: 'JK991YIUNZ14APGX' }); 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var Alpha = require('alpha_vantage_api_wrapper').Alpha;
var alpha = new Alpha('JK991YIUNZ14APGX');

app.get('/', function(req,res){
    // res.sendFile(__dirname + '/index.html');

    // const alphaFunction = alpha.data.intraday('IBM').then(data => {
    //     // var obj = JSON.stringify(data);
    //     // var parse = JSON.parse(obj);
    //     // console.log(parse[0]);
    //     const statics = data['Time Series (1min)'];
    //     res.render('list', { vantage : data['Time Series (1min)'] } );
    // });
    
    alpha.stocks.intraday('IBM')
        .then((data) => {
            // Do what you want with the data
            // const statics = JSON.stringify(res);
            const intraDay = JSON.stringify(data);
            // const metaData = intraDay;
            // console.log(metaData);
            var intraDay_data = { intraday : intraDay};
            res.render('list', {intraDay_data: intraDay_data} );
        })
        .catch((err) => {
            // Handle the error
            console.log(err);
        });

});

// app.post('/', function(req,res) {
//     // const query = req.body.stockName;
    
//     // const alphaFunction = alpha.data.intraday(query).then(data => {
//     //     // var obj = JSON.stringify(data);
//     //     // var parse = JSON.parse(obj);
//     //     // console.log(parse[0]);
//     //     res.write(data, function(err) {
//     //         res.end();
//     //     });

//     // });
//     // res.render('index', {vantage : alphaFunction});
//     console.log(data);
// });

app.listen(3000, function() {
    console.log(`Server on 3000`);    
});
