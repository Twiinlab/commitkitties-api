const controller = require('./controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.getBlocks )
router.get('/transactionhash/:transactionhash', controller.getBlockByTransactionHash )
router.get('/userid/:userid', controller.getBlockByUserId )
router.post('/', controller.addBlock );

export default router;