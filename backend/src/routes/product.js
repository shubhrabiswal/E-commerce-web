const express = require('express');
const Category = require('../models/category');
const Product = require('../models/product');
const slugify = require('slugify');
const router = express.Router();

const multer = require('multer');

const shortid = require('shortid'); 
const path = require('path');

const { createProduct, getProductBySlug } = require('../controller/product');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' +file.originalname)
    }
  })
   
const upload = multer( { storage } );
router.post('/product/create', upload.array('productPicture'), createProduct);

router.get('/product/:slug', getProductBySlug);


module.exports = router;