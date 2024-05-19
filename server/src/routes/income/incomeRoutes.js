const express = require('express');
const { createIncCtrl,
  fetchAllIncCtrl,
  fetchIncDetailsCtrl, 
  updateIncCtrl,
  deleteIncCtrl,
} = require('../../controllers/income/incomeCtrl');
const authMiddleware = require('../../middlewares/authMiddleware');


const incomeRoutes = express.Router();


incomeRoutes.post('/',authMiddleware, createIncCtrl);
incomeRoutes.get('/',authMiddleware, fetchAllIncCtrl);
incomeRoutes.get('/:id', authMiddleware,fetchIncDetailsCtrl);//api/income/someid jknbcvs
incomeRoutes.put('/:id',authMiddleware, updateIncCtrl);
incomeRoutes.delete('/:id',authMiddleware,  deleteIncCtrl);
module.exports = incomeRoutes;