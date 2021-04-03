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
// require("dotenv").config();
//environment variable or you can say constants
env.config();

// mongodb connection
//mongodb+srv://root:<password>@cluster0.8pl1w.mongodb.net/<dbname>?retryWrites=true&w=majority
// const connection_string = process.env.CONNECTION_STRING;

// mongoose.connect(process.env.CONNECTION_STRING,{
//         useNewUrlParser: true, 
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     }
// ).then(() => {
//     console.log('Database connected');
// });


//extra
// mongodb+srv://shubhra08:<password>@cluster0.kit9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongoose
  // .connect( ${process.env.CONNECTION_STR},
mongoose.connect(`mongodb+srv://shubhra08:shubhra08@cluster0.56ii0.mongodb.net/todo?retryWrites=true&w=majority`,
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

// d9GN3Cjhaygt6nvf
// mongodb+srv://shubhra08:d9GN3Cjhaygt6nvf@cluster0.uq7xx.mongodb.net/ecommerce?retryWrites=true&w=majority
app.use(express.json());
// app.use('/api', authRoutes);
// app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

const port = process.env.PORT||5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



