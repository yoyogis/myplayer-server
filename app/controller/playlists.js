'use strict';

const Controller = require('egg').Controller;

class PlaylistsController extends Controller {
  async index(ctx) {
    ctx.response.body = await ctx.service.playlists.list();
  }
}

module.exports = PlaylistsController;
