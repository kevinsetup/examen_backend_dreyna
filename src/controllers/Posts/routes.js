const express = require('express');
const router = express.Router();
const postsController = require('./controller');
const {verifyToken} = require('../../middleware/authorization');


router.post('/posts', verifyToken,  postsController.insert)
router.get('/posts', verifyToken,  postsController.readAll)
router.get('/posts/:id', verifyToken,  postsController.readFindById)
router.delete('/posts/:id', verifyToken,  postsController.delete)
router.put('/posts/:id', verifyToken,  postsController.update)





module.exports = router;