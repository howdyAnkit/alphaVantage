//jshint esversion:8

const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const { query } = require('express');
const app =express();

app.set("view engine", "ejs");                                                 //Ejs View Engine
app.use(bodyParser.urlencoded({extended:true}));

var Alpha = require('alpha_vantage_api_wrapper').Alpha;                       //Alpha Wrapper
var alpha = new Alpha('JK991YIUNZ14APGX');  
var stock_Dates = [];                                                         //Array Of Data      
var stock_opens = [];
var stock_highs = [];
var stock_lows = [];
var stock_closes = [];
var stock_volumes = [];

app.get('/', function(req,res){
    res.render('list', { query, stock_Dates, stock_opens, stock_highs, stock_lows, stock_closes, stock_volumes });
                                                                            //Injected in to views
});

app.post('/', function(req,res) {
        const query = req.body.stockName;
        alpha.stocks.intraday(query)                                        //Alpha Api-wrapper Function
            .then((data) => {
                // Do what you want with the data
                // const statics = JSON.stringify(res);
                const intraDay = (data['Time Series (5min)']);              
                // var intraDay_date = { intraday: stock_Dates };
                for(var update in intraDay){
                    var stock_Date = update;
                    var stock_open = intraDay[update]['1. open'];           //Narrowing the endpoints for accessing the req Data
                    var stock_high = intraDay[update]['2. high'];
                    var stock_low = intraDay[update]['3. low'];
                    var stock_close = intraDay[update]['4. close'];
                    var stock_volume = intraDay[update]['5. volume'];
                    stock_Dates.push(stock_Date);                           //Pushing the Data into the Array of Data
                    stock_opens.push(stock_open);       
                    stock_highs.push(stock_high);
                    stock_lows.push(stock_low);
                    stock_closes.push(stock_close);
                    stock_volumes.push(stock_volume);
                }
                res.redirect('/');                                          //Redirects To the hamepage
            })
            .catch((err) => {
                // Handle the error
                console.log(err);                                           //Logs error if any
            });
        
});

app.listen(3000, function() {
    console.log(`Server on 3000`);    
});
