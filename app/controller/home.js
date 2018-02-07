'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    debugger
    this.ctx.response.body = {
      s:1
    }
  }
}
module.exports = HomeController;
