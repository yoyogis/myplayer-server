'use strict';

const fs=require('fs');
const path = require('path');
const extname = path.extname;

const Controller = require('egg').Controller;

class PlaylistsController extends Controller {
  async index(ctx) {
    ctx.response.body = await ctx.service.playlists.list();
  }

  async show(){
    const file = await this.ctx.service.playlists.getFile(this.ctx.params.id);
    let rstream = await fs.createReadStream(file.path);
    this.ctx.type = extname(file.path);
    this.ctx.body = rstream;
  }


}

module.exports = PlaylistsController;
