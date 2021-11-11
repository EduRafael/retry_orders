const { get_operator } = require('./get_operator.service');
const { get_order_vtex, get_sales_order, retry_order } = require('./get_order.service');
const { parse_arg } = require('./mapper/order.mapper');
const { MESSAGE } = require('./../constants');

const compare = async (data) => {
  const { country, orders } = data;
  const orders_compare = [];

  const orders_parsed = country === 'ARG' ? parse_arg(orders) : {};

  for (const item of orders_parsed) {
    const order_vtex = await get_order_vtex(item);

    const order = await validate_order_vtex(order_vtex, item);

    if (order) orders_compare.push(order);
  }

  return orders_compare;
};

const validate_order_vtex = async (order_vtex, item) => {
  if (order_vtex.status != 'payment-approved' || order_vtex.cancellationData != null) {
    return {
      orderId: item,
      status_vtex: 'cancelated',
      status_so: 'N/A',
      error_in_status: true,
    };
  }

  if (order_vtex.operator_email) {
    const { operator, error, type } = await get_operator(order_vtex.operator_email, item);

    if (error)
      return {
        orderId: item,
        status_vtex: order_vtex.status,
        status_so: 'N/A',
        operator,
        error_in_operator: type,
      };
  }

  const order_so = await get_sales_order(item);

  const status_ok = [
    'vtexPauseArStage',
    'invoiced',
    'vtexCompletedStage',
    'ingressBocAr',
    'vtexRegisterChange',
  ];
  let isRetry = false;

  if (!order_so && !status_ok.includes(order_so)) {
    const retry = await retry_order(item);
    console.log({ orderId: item, status: retry });
    isRetry = true;
  }

  return {
    orderId: item,
    status_vtex: order_vtex.status,
    status_so: order_so || 'No Ingresó',
    isRetry,
    error_in_so:
      order_so && status_ok.includes(order_so)
        ? MESSAGE.SUCCESS.OK_SO
        : order_so
        ? MESSAGE.ERROR.ERROR_SO
        : MESSAGE.ERROR.SO_NF,
  };
};

module.exports = { compare };
