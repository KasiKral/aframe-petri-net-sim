AFRAME.registerComponent("load-map", {
    schema: {},

    init: function() {
        // Do something when component first attached.
        this.genreateMap();
    },

    update: function() {
        // Do something when component's data is updated.
    },

    remove: function() {
        // Do something the component or its entity is detached.
    },

    // eslint-disable-next-line no-unused-vars
    tick: function(time, timeDelta) {
        // Do something on every scene tick or frame.
    },

    genreateMap: function() {
        const map = {
            data: [
                0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
                0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
                0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
                0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 8, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                0,
            ],
            height: 19,
            width: 19,
        };
        const WALL_SIZE = 3;
        const WALL_HEIGHT = 6;
        const el = document.querySelector("#walls");
        let playerPos;

        for (var x = 0; x < map.height; x++) {
            for (var y = 0; y < map.width; y++) {
                const i = y * map.width + x;
                const position = `${(x - map.width / 2) * WALL_SIZE} 0 ${
          (y - map.height / 2) * WALL_SIZE
        }`;

                // if the number is 1 - 4, create a wall
                if (
                    map.data[i] === 1 ||
                    map.data[i] == 2 ||
                    map.data[i] === 3 ||
                    map.data[i] === 4
                ) {
                    let wall = document.createElement("a-box");
                    el.appendChild(wall);

                    wall.setAttribute("width", WALL_SIZE);
                    wall.setAttribute("height", WALL_HEIGHT);
                    wall.setAttribute("depth", WALL_SIZE);
                    wall.setAttribute("position", position);

                    // black wall
                    if (map.data[i] === 2) {
                        wall.setAttribute("color", "#000");
                        wall.setAttribute("static-body", "");
                        wall.setAttribute("material", "side: double");
                    }

                    // secretwall
                    else if (map.data[i] === 3) {
                        wall.setAttribute("color", "#fff");
                        wall.setAttribute("material", "src: #wall-secret; repeat: 4 4;");
                    }

                    // brick wall
                    else if (map.data[i] === 4) {
                        wall.setAttribute("color", "#fff");
                        wall.setAttribute(
                            "material",
                            "src: #wall-brick; repeat: 2 2; side: double;"
                        );
                        wall.setAttribute("static-body", "");
                    } else {
                        // normal walls
                        wall.setAttribute("color", "#fff");
                        wall.setAttribute(
                            "material",
                            "src: #wall; repeat: 4 4; side: double;"
                        );
                        wall.setAttribute("static-body", "");
                    }
                }
                // set player position if the number is a 2
                if (map.data[i] === 8) {
                    playerPos = `${(x - map.width / 2) * WALL_SIZE} 0.5 ${
            (y - map.height / 2) * WALL_SIZE
          }`;
                }

                if (map.data[i] === 9) {
                    console.log(position);
                }
            }
        }
        document.querySelector("#player").setAttribute("position", playerPos);
    },
});