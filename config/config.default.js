'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517924159580_9284';

  // add your config here
  config.middleware = [];

  config.meidaFolder = "/Users/yuanyu/Music/xiqu"
  config.supportedFileTypes = [".mp3"]

  return config;
};
