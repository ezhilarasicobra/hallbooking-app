const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
app.use(express.json());
const url="mongodb://localhost:27017"
app.post("/createroom",async (req,res)=>{
try{
  //connect to db
let client = await  mongoclient.connect(url);
//select the db
let db= await client.db("Hallbookingapp");
//select collection and perform operation
let data= await db.collection("RoomDetails").insertOne(req.body)
//close the connection
await client.close();
res.json({
 message:"Room created successfully"
})

 } catch (error) {
   res.status(500).json({
     message:"something went wrong"
   })
 }
})
app.post("/bookroom",async (req,res)=>{
  try{
    //connect to db
  let client = await  mongoclient.connect(url);
  //select the db
  let db= await client.db("Hallbookingapp");
  //select collection and perform operation
  let data= await db.collection("Booking_Details").insertOne(req.body)
  //close the connection
  await client.close();
  res.json({
   message:"Room Booked successfully"
  })
  
   } catch (error) {
     res.status(500).json({
       message:"something went wrong"
     })
   }
  })
app.get("/getbookingdetails",async (req,res)=>{

  try{
    //connect to db
  let client = await  mongoclient.connect(url);
  //select the db
  let db= await client.db("Hallbookingapp");
  //select collection and perform operation
  let data= await db.collection("Booking_Details").find();
  //close the connection
  await client.close();
  res.json({
   message:"got the entire customer and room booking details"
  })
  
   } catch (error) {
     res.status(500).json({
       message:"something went wrong"
     })
   } 
})
app.listen(5000, () => {
  console.log(`the port is listening in 5000`);
});