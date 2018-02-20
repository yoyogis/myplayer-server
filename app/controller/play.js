'use strict';

const fs=require('fs');
const path = require('path');
const extname = path.extname;

const Controller = require('egg').Controller;

class PlayController extends Controller {

  async show(){
    const file = await this.ctx.service.play.getFile(this.ctx.params.id);
    let rstream = await fs.createReadStream(file.path);
    this.ctx.type = extname(file.path);
    this.ctx.body = rstream;
  }
}

module.exports = PlayController;
