const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

/*
app.post("/", function(req, res){

  let baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let finalUrl = baseUrl + crypto + fiat
   //console.log(req.body.crypto);
  request(finalUrl, function(error, response, body){
    //console.log(response.statusCode);
    //console.log(body);
    let data = JSON.parse(body);
    let price = data.last;
    let average =  data.averages.day;
    let currentDate =  data.display_timestamp;

    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(`<h2>The las Bitcoin price of ${crypto} is ${price} ${fiat}</h2>`);
    res.send();
  })
})
*/

app.post("/", function(req, res){

  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let amount = req.body.amount;

  let options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){
    //console.log(response.statusCode);
    //console.log(body);
    let data = JSON.parse(body);
    let price = data.price;
    let currentDate =  data.time;

    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(`<h2>${amount} ${crypto} is currently worth ${price} ${fiat}</h2>`);
    res.send();
  })
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
