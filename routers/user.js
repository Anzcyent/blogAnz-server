const express = require('express');
const router = express.Router()
const { getUser, getAllUsers } = require('../controllers/user');

router.get('', getAllUsers);
router.get('/:id', getUser);


module.exports = router;