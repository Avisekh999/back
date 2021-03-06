import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js"
import slugify from "slugify";

// function createCategories(categories, parentId = null){
//     const categoryList = [];
//     if(parentId == null) {
//       category =  categories.filter(cat => cat.parentId == undefined);
//     }else{
//         category = categories.filter(cat => cat.parentId == parentId);
//     }
//     for(let cate of category){
//         categoryList.push({
//             _id: cate._id,
//             name:cate.name,
//             slug: cate.slug,
//             children: (createCategories , cate._id)
//         })
//     }
//     return categoryList;
// }




const createCategory = asyncHandler(async (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug:slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error,category) => {
        if(error) return res.status(400).json({error});
        if(category){
            return res.status(201).json({category});
        }
    })

})


const getCategories =asyncHandler(async(req,res)=>{
    Category.find({})
    .exec((error, categories) => {
        if(error) return res.status(400).json({error});
        if(categories){
            
            res.status(200).json({categories})
        }
    })
})

export{
    createCategory,
    getCategories,
}