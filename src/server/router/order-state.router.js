const router = require('express').Router();
const controller = require('./../controller/order-state.controller');

router.get('/state', controller.compare_state);

module.exports = router;
