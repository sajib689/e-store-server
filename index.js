const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());
app.use(cors());

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
    const productsCollection = client.db('e-store').collection('products');

    app.get('/products', async (req, res) => {
      const { page = 1, limit = 6, search = '', sort = '', category = '', price = '' } = req.query;
      
      const skip = (page - 1) * limit;

      // Create a query object to filter products
      const query = {};
      if (search) query.productName = { $regex: search, $options: 'i' };
      if (category) query.category = category;
      if (price) {
        const [min, max] = price.split('-');
        query.price = { $gte: parseInt(min), $lte: parseInt(max) };
      }

      // Define sorting options
      const sortOptions = {};
      if (sort === 'price_asc') sortOptions.price = 1;
      if (sort === 'price_desc') sortOptions.price = -1;
      if (sort === 'date_desc') sortOptions.createdAt = -1;
      const total = await productsCollection.countDocuments(query);
       const products = await productsCollection.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();

      res.send({ products, total });
    });

  } finally {
    // Keeping this empty as you don't need to close the connection manually in this case.
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Welcome to the e-store server');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
