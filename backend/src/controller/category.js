const Category = require('../models/category');
const slugify = require('slugify');


function createCategories(categories, parentId = null){
    // exports.createCategories = (categories, parentId) => {

    const categoryList = [];
    let category = Object.values(categories).filter(cat => cat.parentId == parentId)
    if(parentId == null){
        category = Object.values(categories).filter(cat => cat.parentId == undefined);
    }
    else{
        category = Object.values(categories).filter(cat => cat.parentId == parentId);
    }


    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children:createCategories(categories, cate._id)
        });
    }
    return categoryList;
}


exports.addCategory =  (req, res) =>{

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if(error) return res.status(400).json({ error });
        if(category){
            return res.status(201).json({ category }); //if category added display the cat

        }
    });
};

exports.getCategories = (req,res) => {
    Category.find({})
    .exec((error, categories) => {
        if(error) return res.status(400).json({ error });

        if(categories){
            const categoryList = createCategories(categories);
                // res.send(categories);
            res.status(200).json({ categoryList });
        }
    });
}


exports.updateCategories = async (req, res) => {
    const updatedCategories = [];
    const{name, parentId } = req.body; //add type

    if(name instanceof Array) {
        for(let i=0; i<name.length; i++){
            const category = {
                name: name[i],
                type: type[i]
            };
            if(parentId !== ""){
                category.parentId = parentId[i];
            }

            const updateCategory =  awaitcategory.findOneAndUpdate({_id}, category, {new: true});
            updatedCategories.push(updtaedCategory);
            return res.status(201).json({ updatedCategories });
        }
    }
    else{
        const category ={
            name,
            type
        };
        if(parentId !== "" ){
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate({_id}, category, { new: true});
        return res.status(201).json(updatedCategory)
    }
    // res.status(200).json({ body: req.body });
}