let mix = require("laravel-mix");

mix.disableNotifications();

mix.copyDirectory("src/css/", "dist/css");
mix.copyDirectory("src/img/", "dist/img");
mix.copyDirectory("src/petriNetFile/", "dist/petriNetFile");
mix.copy("src/js/splash.js", "dist/js");
mix.copy("src/index.html", "dist/");

mix.js(
    [
        "src/js/components/petriNetSim.component.js",
        "src/js/components/map.component.js",
        "src/js/components/clickHandler.component.js",
        "src/js/components/collisionDetector.component.js",
        "src/js/modules/petriNetLoader.mjs",
        "src/js/modules/petriNetSimController.mjs",
        "src/js/models/sceneEvent.enum.js",
    ],
    "dist/js/bundle.js"
);

mix.browserSync({
    injectChanges: false,
    proxy: 'http://localhost:8080',
    files: [
        'dist/**/*'
    ],
});