const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2m0rny5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const productsCollection = await client.db('e-store').collection('products');
    app.get('/products', async (req, res) => {
        const {page = 1, limit = 6, } = req.query
        const skip = (page - 1) * limit
        const total = await productsCollection.countDocuments()
        const products = await productsCollection.find().skip(skip).limit(parseInt(limit)).toArray()
        res.send({ products, total });

    })
    } finally {
   
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Welcome to the e-store server')
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

