const express = require('express');
const router = express.Router();
const { 
  registerDog, 
  adoptDog, 
  getRegisteredDogs 
} = require('../controllers/dogController');

router.post('/', registerDog);
router.get('/registered', getRegisteredDogs);
router.patch('/:id/adopt', adoptDog);
module.exports = router;