'use strict';

/**
 * @param {Egg.Application} ctx - egg application
 */
module.exports = ctx => {
  debugger
  const { router, controller, service } = ctx;
  ctx.router.resources('/playlists', 'playlists');
  console.log(ctx);
};