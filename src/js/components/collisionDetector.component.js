import { SceneEvent } from "../models/sceneEvent.enum";

AFRAME.registerComponent("collision-detector", {
    schema: {
        name: { type: "string" },
        element: { type: "string" },
    },

    init: function() {
        // Do something when component first attached.
        let el = this.el;
        var data = this.data;
        var scene = document.querySelector("a-scene");

        // listen for collisions
        el.addEventListener("collisions", (e) => {
            var collided = e.detail.els.length;
            if (collided === 1 && e.detail.els[0].id === "player") {
                el.setAttribute("material", "color: green");
                scene.setAttribute("petri-net-sim", {
                    event: SceneEvent.enteredPlace,
                    message: data.name,
                });
                scene.emit(data.name);
            } else {
                el.setAttribute("material", "color: red");
                scene.setAttribute("petri-net-sim", {
                    event: SceneEvent.leftPlace,
                    message: "Roaming",
                });
                scene.emit(data.name);
            }
        });
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
});