const Product = require('../models/product');
const Category = require('../models/category');
const shortid = require('shortid');
const slugify = require('slugify');

exports.createProduct =  (req, res) => {

    // res.status(200).json({ file: req.files, body: req.body});
    const {
        name, price, description, quantity, category
    } = req.body;

    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img: file.filename} ;
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        quantity,
        productPictures,
        category
        // createdBy: req.user._id
    })

    product.save( (error, product) => {
        if(error) return res.status(400).json( {error} );
        if(product){
            res.status(201).json( { product});
        }
    });
};

exports.getProductBySlug = (req, res) => {
    const { slug } = req.params;
    console.log(slug);
    Category.findOne({slug: slug})
    .select('_id')
    .exec((error, category) => {
        if(error){
            return res.status(400).json(error);    
        }
        if(category){
            Product.find({category: category})
            .exec((error, products) => {
                res.status(200).json({
                    products,
                    productByPrice: {
                        under5k: products.filter(product => product.price <= 5000),
                        under10k: products.filter(product => product.price >= 5000 && product.price <= 10000)
                    }
                });
            })
        }
    });
};