'use strict';

const Controller = require('egg').Controller;

class PlaylistsController extends Controller {
  async index(ctx) {
    ctx.response.body = await ctx.service.playlists.list();
  }

  async show(){
    this.ctx.response.body = await this.ctx.service.playlists.getFile(this.ctx.params.id);
  }
}

module.exports = PlaylistsController;
