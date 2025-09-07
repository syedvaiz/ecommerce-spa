const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/cart', require('./routes/cart'));

const Item = require('./models/Item');
(async function seed() {
  try {
    const c = await Item.countDocuments();
    if (c === 0) {
      await Item.insertMany([
        { name: 'Modern Chair', description: 'Comfortable modern chair', price: 49.99, category: 'furniture', image: 'https://images.unsplash.com/photo-1617582907226-c49e2d8200d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNoYWlyfGVufDB8fDB8fHww' },
        { name: 'Modern Chair', description: 'Comfortable modern chair', price: 49.99, category: 'furniture', image: 'https://images.unsplash.com/photo-1617582907226-c49e2d8200d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNoYWlyfGVufDB8fDB8fHww' },
        { name: 'Modern Chair', description: 'Comfortable modern chair', price: 49.99, category: 'furniture', image: 'https://images.unsplash.com/photo-1617582907226-c49e2d8200d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNoYWlyfGVufDB8fDB8fHww' },
        { name: 'Modern Chair', description: 'Comfortable modern chair', price: 49.99, category: 'furniture', image: 'https://images.unsplash.com/photo-1617582907226-c49e2d8200d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNoYWlyfGVufDB8fDB8fHww' },
        { name: 'Office Desk', description: 'Wooden office desk', price: 129.99, category: 'furniture', image: 'https://unsplash.com/photos/gray-leather-office-rolling-armchair-beside-white-wooden-computer-desk-3d4sSUChunA' },
        { name: 'Running Shoes', description: 'Lightweight shoes', price: 79.99, category: 'shoes', image: 'https://unsplash.com/photos/green-and-black-nike-athletic-shoe-kP6knT7tjn4' },
        { name: 'T-Shirt', description: '100% cotton', price: 19.99, category: 'apparel', image: 'https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww' }
      ]);
      console.log('Seeded items');
    }
  } catch (err) {
    console.error('Seed error', err);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
