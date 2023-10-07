const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

const ProductController = require('../controllers/products');

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
}
);   // destination multer will store all incoming files



//Get routing 1
router.get('/', ProductController.products_get_all);


//Post routing 2
router.post('/', checkAuth, upload.single('productImage'),ProductController.products_create_products);



//3
//getting individual product by ID
router.get('/:productId',ProductController.products_get_product );





//4
//patched route
router.patch('/:productId', checkAuth,ProductController.products_update_product );




//5
//delete route
router.delete('/:productId', checkAuth,ProductController.delete_product);



module.exports=router;