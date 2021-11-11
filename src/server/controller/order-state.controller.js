const service = require('./../../services');

const compare_state = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await service.order.compare(body);

    return res.status(200).json(result);
  } catch (error) {
    console.error({ Error: error.message });

    res.status(error.statusCode || 400).json({ error: error.message });
  }
};

module.exports = {
  compare_state,
};
