import express from "express"
import mongoose from "mongoose"
import Messages from "./dbMessages.js"
import Pusher from "pusher"

const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
   appId: "1707021",
   key: "0549dd38d53330346487",
   secret: "7c963efe1da4a30d10d1",
   cluster: "ap1",
   useTLS: true,
})

app.use(express.json())

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*")
   res.setHeader("Access-Control-Allow-Headers", "*")
   next()
})

const connection_url =
   "mongodb+srv://vicolee1363:sCXi1aFU59567PdB@cluster0.c0yyh6f.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(connection_url)

const db = mongoose.connection

db.once("open", () => {
   console.log("DB Connected")

   const msgCollection = db.collection("messagecontents")
   const changeStream = msgCollection.watch()

   changeStream.on("change", (change) => {
      console.log("A change occured", change)
      if (change.operationType === "insert") {
         const messageDetails = change.fullDocument
         pusher.trigger("messages", "inserted", {
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp: messageDetails.timestamp,
            received: messageDetails.received,
         })
      } else {
         console.log("error triggering pusher")
      }
   })
})

app.get("/", (req, res) => res.status(200).send("hello world"))

app.get("/messages/sync", async (req, res) => {
   try {
      const data = await Messages.find()
      res.status(200).send(data)
   } catch (err) {
      res.status(500).send(err)
   }
})

app.post("/messages/new", (req, res) => {
   const dbMessage = req.body

   Messages.create(dbMessage)
      .then((data) => {
         res.status(201).send(data)
      })
      .catch((err) => {
         res.status(500).send(err)
      })
})

app.listen(port, () => console.log(`listening on localhost:${port}`))
