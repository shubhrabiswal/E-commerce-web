const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

// require('')
//routes
// const authRoutes = require('./routes/auth');
// const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('../src/routes/category');
const productRoutes = require('../src/routes/product');
//productRoutes

app.get("/", (req, res) =>{
        res.send('working');
        console.log("Working.....");
})
require("dotenv").config();
//environment variable or you can say constants
env.config();

mongoose.connect( 
        ${process.env.CONNECTION_STR},
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    console.log("Database connected");
  });
//

app.use(express.json());
// app.use('/api', authRoutes);
// app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

const port = process.env.PORT||5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



