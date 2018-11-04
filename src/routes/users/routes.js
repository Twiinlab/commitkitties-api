const controller = require('./controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.getUsers )
router.get('/:id', controller.getUserById )
router.post('/', controller.addUser );
router.put('/:id', controller.updateUser );
router.delete('/:id', controller.deleteUser );

export default router;