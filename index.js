const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sf1e5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const tasksCollection = client.db('daily-tasks').collection('task');
        const completedTasksCollection = client.db('daily-tasks').collection('completedTask');
        //post api for daily task
        app.post('/task', async (req, res) =>{
            const task = req.body;
            const result= await tasksCollection.insertOne(task);
            res.send(result);
         });

 // get api for daily task 
 app.get("/task", async (req, res) => {
    const query = {};
    const cursor = tasksCollection.find(query);
    const tasks = await cursor.toArray();
    res.send(tasks);
  });
   //post api for single task
  app.post('/tasks', async(req, res) =>{
    const tasks = req.body;
    const result = await completedTasksCollection.insertOne(tasks);
    res.send(result);
});

    }
    finally{

    }

}
run().catch(console.dir);






app.get('/', (req, res) =>{
    res.send('Running my node CRUD server')
})

app.listen(port, () => {
    console.log('crud server is running ');
})