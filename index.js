const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

require('dotenv').config()
// middleware
app.use(cors());
app.use(express.json());
app.get('/', (req, res) =>{
    res.send('Running my node CRUD server')
})

app.listen(port, () => {
    console.log('crud server is running ');
})