'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const util = require('util');

class Playlists extends Service {
    async list() {
        let readdir = util.promisify(fs.readdir);
        const files = await readdir(this.app.config.meidaFolder);
        return files;
    }
}
module.exports = Playlists;
