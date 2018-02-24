'use strict';

/**
 * @param {Egg.Application} ctx - egg application
 */
module.exports = ctx => {
  const { router } = ctx;
  router.resources('/playlists', 'playlists');
  router.resources('/play', 'play');
  router.resources('/images/:md5/', 'images');
};

