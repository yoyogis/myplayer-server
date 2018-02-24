'use strict';

const Controller = require('egg').Controller;
const util = require('util');
const fs = require('fs');
const path = require('path');

const stat = util.promisify(fs.stat);
const access =  util.promisify(fs.access);

class HomeController extends Controller {
  async show() {
    const file = await this.ctx.service.play.getFile(this.ctx.params.md5);
    const imgName = decodeURI(this.ctx.params.id);
    const img = file.images.filter((im)=>{
        return im==imgName;
    });
    const fullPath = path.join(file.dir,imgName);
    this.ctx.type = path.extname(fullPath);
    let rstream = await fs.createReadStream(fullPath);
    this.ctx.response.body = rstream;
  }
}
module.exports = HomeController;