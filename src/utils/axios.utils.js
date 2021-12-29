const axios = require("axios");
const { MESSAGE, TYPE } = require("../constants");

const _GET = async (params) => {
  const { url, headers, type } = params;
  try {
    const result = await axios.get(url, {
      headers,
    });

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log({
        type,
        message:
          type === TYPE.ORDER
            ? MESSAGE.ERROR.ORDER_NF
            : MESSAGE.ERROR.OPERATOR_NF,
      });
      return null;
    }

    throw new Error(MESSAGE.ERROR.QUERY_AXIOS);
  }
};

const _POST = async (params) => {
  const { url, headers, body } = params;

  try {
    const result = await axios.post(url, body, {
      headers,
    });

    return result.data;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error("ERROR post");
  }
};

module.exports = {
  _GET,
  _POST,
};
