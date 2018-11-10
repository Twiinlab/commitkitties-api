const controller = require('./controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.getTotalBlockNumbers )
router.get('/transactionhash/:transactionhash', controller.getBlockByTransactionHash )
router.get('/userid/:userid', controller.getBlockByUserId )
router.get('/userid/:userid/totals', controller.getTotalBlockNumbersByUserId )
router.post('/', controller.addBlock );
router.get('/ranking', controller.getRanking )

export default router;