const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

const uri =
  "mongodb+srv://admin:5fXQyOdTlXEIWPgW@cluster0.4gua2yk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// app.get("/api", (req, res) => {
//   res.json({ users: ["userOne", "userTwo", "userThree"] });
// });

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  database = client.db("youtube-summarizer");
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);

app.get("/api/database", async (req, res) => {
  database
    .collection("userdetails")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});
