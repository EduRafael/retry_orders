const { _GET, _POST } = require("../utils/axios.utils");
const config = require("../../config");
const { parse_sales_order, parse_vtex } = require("./mapper/order.mapper");
const { TYPE } = require("../constants");

const get_sales_order = async (orderId) => {
  const params = {
    url: `${config.so.base_url}/orders/by-order-number/${orderId}`,
    headers: {
      "x-api-key": config.so.appkey,
    },
    type: TYPE.ORDER,
  };

  const result = await _GET(params);

  console.log({
    orderSO: orderId,
    result: (result && result.flow_stage) || null,
  });

  return (result && result.flow_stage) || null;
};

const get_order_vtex = async (orderId) => {
  const params = {
    url: `${config.vtex.base_url}/oms/pvt/orders/${orderId}`,
    headers: {
      "x-vtex-api-appkey": config.vtex.appkey,
      "x-vtex-api-apptoken": config.vtex.aptoken,
    },
    type: TYPE.ORDER,
  };

  const result = await _GET(params);

  console.log({ orderVTEX: orderId, result: (result && "Ok") || "NoOk" });
  return parse_vtex(result);
};

const retry_order = async (orderId) => {
  const params = {
    url: `${config.so.base_url}/orders/retry-stage/${orderId}`,
    headers: { "x-api-key": config.so.appkey },
    body: {},
  };

  const result = await _POST(params);

  return result;
};

const retry_order_hook = async (orderId) => {
  try {
    const { vtex } = config;

    const params = {
      url: vtex.hookUrl,
      headers: {
        apikey: vtex.hookApiKey,
        "Content-Type": "application/json",
      },
      body: {
        Domain: "Marketplace",
        OrderId: orderId,
        State: "payment-approved",
        LastState: "approve-payment",
        LastChange: new Date().toISOString(),
        CurrentChange: new Date().toISOString(),
        Origin: {
          Account: "arcencohogareasy",
          Key: vtex.appkey,
        },
      },
    };

    const result = await _POST(params);

    return result;
  } catch (error) {
    console.log({ ERROR_HOOK: error.message });

    return "no se pudo hacer retry";
  }
};

module.exports = {
  get_sales_order,
  get_order_vtex,
  retry_order,
  retry_order_hook,
};
