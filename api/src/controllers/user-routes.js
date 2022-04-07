const express = require('express');
const router = express.Router();
const authenticated = require('../models/authenticated');
const authorization = require('../models/authorization');

const { body, validationResult } = require('express-validator');

router.get('/', authenticated, (req, res) => {
  res.json(req.user)
});

exports.initializeRoutes = () => {
  return router;
}
