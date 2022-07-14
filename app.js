const express = require("express")
const notification = require("./notifications")

const db = require("./database")
const app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })




app.post('/result',urlencodedParser,async function(req,res){
  console.log(req.body)
res.send(await db.createResult(req.body))
})



app.post("/action", urlencodedParser,function(req,res){
  res.send("Sending notification to a topic...")
  const data = {
    topic: req.body.topic,
    titulo: req.body.title,
        mensaje:req.body.body,
        data:req.body.data

      }
      notification.sendPushToTopic(data)
    })

app.get('/level', async function(req,res){
  res.send(await db.getAll())
  
})


app.get('/level/:id', async function(req,res){
  res.send(await db.getLevel(req.params.id))
})

app.post('/level/:id', async function(req,res){
  await db.setRemember(req.params.id,req.body)
  res.send("level "+req.params+" updated")
})


app.get('/level/remember/:id', async function(req,res){
  res.send(await db.getRemember(req.params.id))
})



// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});