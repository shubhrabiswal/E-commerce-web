const express = require('express');

const Category = require('../models/category');
const slugify = require('slugify');

const router = express.Router();

const { createCategories } =  require('../controller/category');
const { addCategory } = require('../controller/category');

const { getCategory } = require('../controller/category');

// router.post('/category/create', requireSignin, adminMiddleware, addCategory);

router.post('/category/createCategories', createCategories);
router.post('/category/addCategory', addCategory);
router.post('/category/getCategory', getCategory);


module.exports = router;