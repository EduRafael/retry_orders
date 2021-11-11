const config = {
  server: {
    port: process.env.NODE_PORT,
    killTimeout: process.env.KILL_TIMEOUT,
  },
  vtex: {
    appkey: process.env.VTEX_APPKEY,
    aptoken: process.env.VTEX_TOKEN,
    base_url: process.env.URL_VTEX,
  },
  so: {
    appkey: process.env.SO_APPKEY,
    base_url: process.env.URL_SO,
  },
};

module.exports = config;
