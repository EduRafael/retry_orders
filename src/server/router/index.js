const router = require('express').Router();
const order = require('./order-state.router');

router.use('/order', order);

//default, mover a otro archivo
router.use('*', (req, res, next) => {
  console.log({ message: 'router not found', statusCode: 404 });
  return res.status(404).json({ message: 'router not found' });
});

module.exports = router;
