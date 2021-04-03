const express = require('express');

const Category = require('../models/category');
const slugify = require('slugify');

const router = express.Router();

// const { createCategories } =  require('../controller/category');
const { addCategory, getCategories, updateCategories } = require('../controller/category');



// router.post('/category/create', requireSignin, adminMiddleware, addCategory);

router.post('/category/create', addCategory);
router.get('/category/getcategory', getCategories);
// router.post('/category/update', updateCategories);
module.exports = router;