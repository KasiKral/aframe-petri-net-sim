let mix = require('laravel-mix');

mix.disableNotifications();

mix.copyDirectory('src/assets/', 'dist/assets');
mix.copyDirectory('src/views/', 'dist/views');

mix
  .js(
    [
      'src/js/components/petriNetSim.component.js',
      'src/js/components/clkSingleEventHandler.component.js',
      'src/js/components/clkMultiEventHandler.component.js',
      'src/js/components/collisionDetector.component.js',
      'src/js/components/toggleInfo.component.js',
      'src/js/modules/petriNetLoader.mjs',
      'src/js/modules/petriNet.mjs',
      'src/js/models/sceneEvent.enum.js'
    ],
    'dist/js/bundle.js'
  )
  .sass('src/css/styles.scss', 'dist/css');

mix.js('src/index.js', 'dist/index.js');

mix.browserSync({
  injectChanges: false,
  proxy: 'http://localhost:8080',
  files: ['dist/**/*']
});

if (mix.inProduction()) {
  mix.version();
  mix.sourceMaps();
}
