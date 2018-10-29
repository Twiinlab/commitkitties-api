const controller = require('./controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.getKitties )
router.get('/:id', controller.getKittyById )
router.post('/', controller.addKitty );
router.put('/:id', controller.updateKitty );
router.delete('/:id', controller.deleteKitty );

export default router;