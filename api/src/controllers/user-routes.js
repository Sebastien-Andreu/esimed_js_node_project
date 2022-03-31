const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const authenticated = require('../models/authenticated');
const authorization = require('../models/authorization');

const { body, validationResult } = require('express-validator');

router.get('/', authenticated, (req, res) => {
  res.send(req.user)
});
//
// router.get('/:firstName', (req, res) => {
//   const foundUser = userRepository.getUserByFirstName(req.params.firstName);
//
//   if (!foundUser) {
//     throw new Error('User not found');
//   }
//
//   res.send(foundUser);
// });
//
// router.post('/',
//     body('firstName').exists().withMessage('firstName is require'),
//     body('lastName').exists().withMessage('lastName is require'),
//     body('password').isLength({ min: 8 }).withMessage('8 length minimum'), (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//
//   userRepository.createUser(req.body);
//   res.status(201).end();
// });
//
// router.put('/:id', authorization, (req, res) => {
//   userRepository.updateUser(req.params.id, req.body);
//   res.status(204).end();
// });
//
// router.delete('/:id', authorization, (req, res) => {
//   userRepository.deleteUser(req.params.id);
//   res.status(204).end();
// });

exports.initializeRoutes = () => {
  return router;
}
