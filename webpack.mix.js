let mix = require("laravel-mix");

mix
    .js(
        [
            "src/js/components/petriNetSim.component.js",
            "src/js/components/map.component.js",
            "src/js/components/clickHandler.component.js",
            "src/js/components/collisionDetector.component.js",
            "src/js/modules/petriNetLoader.mjs",
        ],
        "dist/bundle.js"
    )
    .setPublicPath("dist");