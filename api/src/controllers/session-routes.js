const express = require('express');
const router = express.Router();
const authenticated = require('../models/authenticated');
const authorization = require('../models/authorization');
const session = require('../models/session');

const { body, validationResult } = require('express-validator');

router.post('/',
    body('date').exists(),
    body('idUser').exists(),
    authenticated,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let result = await session.add(req.body)
      res.status(result.status).json(result.msg)
});


router.get('/:idUser',
    authenticated,
    async (req, res) => {
        let result = await session.find(req.params.idUser)
        res.status(result.status).json(result.msg)
    });

exports.initializeRoutes = () => {
  return router;
}
