'use strict';

const os = require("os");

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517924159580_9284';

  // add your config here
  config.middleware = [];

  config.meidaFolder = os.homedir()+"/yyplayerdata"
  config.supportedFileTypes = [".mp3"]

  return config;
};
