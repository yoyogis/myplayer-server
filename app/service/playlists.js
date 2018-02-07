'use strict'

const Service = require('egg').Service;

class Playlists extends Service{
    async list(){
        return [{s:14}]
    }
}
module.exports = Playlists;