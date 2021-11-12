const express = require("express")
const fs = require("fs")
const geoip = require("geoip-lite")
var bodyParser = require("body-parser")

const server = express()
var urlEncodedParser = bodyParser.urlencoded({extended : false})

//console.log(geoip.lookup("49.37.74.243"))

server.use(express.static('public'))

server.all("/", (req, res)=>{
    console.log(req.ip)
    res.redirect("index")
})

server.all("/index", (req, res)=>{
    res.send(fs.readFileSync("index.html").toString())
})

server.all("/script.js", (req, res)=>{
    res.send(String(fs.readFileSync("script.js")))
})

server.all("/style.css", (req, res)=>{
    res.send(String(fs.readFileSync("style.css")))
})

server.all("/favicon.png", (req, res)=>{
    res.send(fs.readFileSync("favicon.png"))
})

server.all("/thankyou", (req, res)=>{
    res.send(String(fs.readFileSync("thankyou.html")))
})

server.all("/thankyou.js", (req, res)=>{
    res.send(String(fs.readFileSync("thankyou.js")))
})


server.post("/feedback", urlEncodedParser,  (req, res)=>{
        var a = req.body.ChosenSite
        var b = req.body.ChosenPage
        var c = req.body.Feedback
        var d = req.body.Range
    res.redirect("/thankyou")
    res.end()
    //Store data
    var e
    switch(d){
        case 1:
            e = "🤬"
            break;
        case 2:
            e = "😞"
            break;
        case 3:
            e = "🙂"
            break;
        case 4:
            e = "😊"
            break;
        case 5:
            e = "❤"
            break;
    }

    var feedbackContent = fs.readFileSync("feedback.json")
    var feedbackContentJson = JSON.parse(feedbackContent)
    var feedbackCount = parseInt(fs.readFileSync("feedbackCount.txt"))
    console.log(feedbackContentJson);
    feedbackContentJson["feedback"][String(feedbackCount + 1)]  = {
        "IP" : req.headers['x-forwarded-for'],
        "Chosen Site" : a,
        "Chosen Page" : b,
        "Feedback" : c,
        "Experience" : String(e + "(" + d + ")")
    }
    fs.writeFileSync("feedback.json", JSON.stringify(feedbackContentJson))
    fs.writeFileSync("feedbackCount.txt", String(parseInt(feedbackCount + 1)))
})

// Make a page to view all feedback beautifully
server.all("/view", (req, res)=>{
    res.send(JSON.parse(fs.readFileSync("feedback.json")))
})

server.listen(8080, ()=>{console.log("Server is ready");})