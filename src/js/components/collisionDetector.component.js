AFRAME.registerComponent("collision-detector", {
    schema: {
        element: { type: "string" },
    },

    init: function() {
        // Do something when component first attached.
        let el = this.el;
        console.log("collision detector");

        // listen for collisions
        el.addEventListener("collisions", (e) => {
            var collided = e.detail.els.length;
            if (collided === 1 && e.detail.els[0].id === "player") {
                el.setAttribute("material", "color: green");
            } else {
                el.setAttribute("material", "color: red");
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