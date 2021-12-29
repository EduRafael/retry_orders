const { _GET } = require("../utils/axios.utils");
const config = require("../../config");
const { parser_operator_vtex } = require("./mapper/operator.mapper");
const { TYPE, MESSAGE } = require("../constants");

const get_operator = async (email, orderId) => {
  const operator_vtex = await get_vtex(email, orderId);

  if (operator_vtex.error) {
    return operator_vtex;
  }

  const { userId } = operator_vtex.operator;

  const { error, type } = await getOperatorSO(userId, orderId);

  return { operator: operator_vtex.operator, error, type };
};

const get_vtex = async (email, orderId) => {
  const params = {
    url: `${config.vtex.base_url}/dataentities/CL/search?_fields=_all&_where=email=${email}`,
    headers: {
      "x-vtex-api-appkey": config.vtex.appkey,
      "x-vtex-api-apptoken": config.vtex.aptoken,
    },
    type: TYPE.OPERATOR,
  };

  const operator_vtex = await _GET(params);

  if (!operator_vtex || operator_vtex.length < 1) {
    console.log({ message: MESSAGE.ERROR.OPERATOR_VTEX_DNF, orderId });
    return {
      operator: null,
      error: true,
      type: MESSAGE.ERROR.OPERATOR_VTEX_DNF,
    };
  }

  const parsed = parser_operator_vtex(operator_vtex[0]);

  if (!parsed.firstName || !parsed.lastName || !parsed.document) {
    console.log({ message: MESSAGE.ERROR.OPERATOR_VTEX_FN, orderId });
    return {
      operator: parsed,
      error: true,
      type: MESSAGE.ERROR.OPERATOR_VTEX_FN,
    };
  }

  return { operator: parsed, error: false, type: "" };
};

const getOperatorSO = async (userId, orderId) => {
  const params = {
    url: `${config.so.base_url}/customers/${userId}?hostnameVtex=arcencohogareasy`,
    headers: {
      "x-api-key": config.so.appkey,
    },
    type: TYPE.OPERATOR,
  };

  const operator_so = await _GET(params);

  if (!operator_so) {
    console.log({ message: MESSAGE.ERROR.OPERATOR_SO_DNF, orderId });
    return { error: true, type: MESSAGE.ERROR.OPERATOR_SO_DNF };
  }

  return { error: false, type: "" };
};

module.exports = { get_operator, getOperatorSO };
