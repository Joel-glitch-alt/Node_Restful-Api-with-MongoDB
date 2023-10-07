const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const  OrdersController = require('../controllers/orders')

//Order route
router.get('/',checkAuth,OrdersController.orders_get_all);


//2
//Post route
router.post('/', checkAuth,OrdersController.orders_create_order);


//3
//Getting individual order details
router.get('/:orderId',checkAuth, OrdersController.orders_get_order);


//Order delete
router.delete('/:orderId',checkAuth, OrdersController.orders_delete_order);




//exporting
module.exports=router;