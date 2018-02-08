'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const util = require('util');
const path = require('path');
const md5 = require('md5');
const crypto = require('crypto');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);

class Playlists extends Service {
    async list() {
        return (await this.app.getMusics()).map((item)=>{
            return {
                md5: item.md5,
                fileName: item.fileName,
                fileType:item.fileType
            }
        });
    }
}

module.exports = Playlists;
