'use strict';

const fs=require('fs');
const path = require('path');
const util = require('util');
const extname = path.extname;
const stat = util.promisify(fs.stat);

const Controller = require('egg').Controller;

class PlayController extends Controller {

  async show(){
    const file = await this.ctx.service.play.getFile(this.ctx.params.id);
    let rstream = await fs.createReadStream(file.path);
    this.ctx.type = extname(file.path);
    let fileStat = await stat(file.path);
    let size = fileStat.size;
    this.ctx.set('Content-length', size);
    this.ctx.set('Content-Range',`bytes */${size}`);
    this.ctx.set('Connection','keep-alive');
    console.log(file)
    this.ctx.set('Content-Disposition', 'inline; filename='+encodeURIComponent(file.fileName) );
    this.ctx.body = rstream;
  }
}

module.exports = PlayController;
