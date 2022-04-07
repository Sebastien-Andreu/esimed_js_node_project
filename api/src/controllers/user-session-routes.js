const express = require('express');
const router = express.Router();
const authenticated = require('../models/authenticated');
const authorization = require('../models/authorization');
const userSession = require('../models/userSession');

const { body, validationResult } = require('express-validator');

router.post('/',
    body('name').exists(),
    body('surname').exists(),
    body('sexe').exists(),
    body('date').exists(),
    body('idSession').exists(),
    authenticated,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let result = await userSession.add(req.body)
      res.status(result.status).json(result.msg)
});


router.delete('/',
    body('idSession').exists(),
    authenticated,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let result = await userSession.delete(req.body.idSession)
        res.status(result.status).json(result.msg)
    });

router.get('/notMeet/:idSession',
    authenticated,
    async (req, res) => {
        let result = await userSession.get(req.params.idSession)
        console.log(result)
        res.status(result.status).json(result.msg)
    });

router.get('/meet/:idSession',
    authenticated,
    async (req, res) => {
        let result = await userSession.getMeet(req.params.idSession)
        res.status(result.status).json(result.msg)
    });

exports.initializeRoutes = () => {
  return router;
}
