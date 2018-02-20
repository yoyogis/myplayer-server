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
    async listAllMusic() {
        return (await this.app.getMusics()).list.map((item)=>{
            return {
                md5: item.md5,
                fileName: item.fileName,
                fileType:item.fileType
            }
        });
    }

    async listMusic(playlistId) {
        return (await this.app.getMusics()).list.map((item)=>{
            return {
                md5: item.md5,
                fileName: item.fileName,
                fileType:item.fileType
            }
        });
    }

   
}

module.exports = Playlists;
