const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  chainWebpack: (config) => {
    // Use cache-loader
    config.module
      .rule('vue')
      .use('cache-loader')
      .loader('cache-loader')
      .options({
        cacheDirectory: path.resolve(__dirname, '.cache-loader'),
      });

    config.module
      .rule('js')
      .use('cache-loader')
      .loader('cache-loader')
      .options({
        cacheDirectory: path.resolve(__dirname, '.cache-loader'),
      });

    // Use thread-loader
    config.module
      .rule('js')
      .use('babel-loader')
      .loader('thread-loader')
      .before('babel-loader')
      .options({
        workers: require('os').cpus().length - 1, // Use one less than the number of CPUs
      });
  },
});
