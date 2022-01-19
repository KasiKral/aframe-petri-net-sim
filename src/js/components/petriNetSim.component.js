import * as petriNetLoader from "../modules/petriNetLoader.mjs";

AFRAME.registerComponent("petri-net-sim", {
    schema: {
        currentState: { type: "string", default: "ST1" },
        places: { type: "array", default: [] },
        transitions: { type: "array", default: [] },
        arcs: { type: "array", default: [] },
        event: { type: "string", default: "" },
        message: { type: "string", default: "" },
    },
    // Do something when component first attached.
    init: function() {
        var data = this.data;
        this.eventHandlerFn = function() {
            findNextState(data);
        };
        petriNetLoader.loadXMLDoc(data);
    },

    update: function(oldData) {
        // Do something when component's data is updated.
        var data = this.data;
        var el = this.el;

        // `event` updated. Remove the previous event listener if it exists.
        if (oldData.event && data.event !== oldData.event) {
            el.removeEventListener(oldData.event, this.eventHandlerFn);
        }

        if (data.event) {
            el.addEventListener(data.event, this.eventHandlerFn);
        } else {
            console.log(data.message);
        }
    },

    remove: function() {
        // Do something the component or its entity is detached.
    },

    // eslint-disable-next-line no-unused-vars
    tick: function(time, timeDelta) {
        // Do something on every scene tick or frame.
    },
});

function findNextState(data) {
    console.log("------FindingNextState-----");
    console.log(data);
    var choosedTransition = data.transitions.find(
        (el) => el.name === data.message
    );
    console.log(choosedTransition);
    var sourceTargetObj = data.arcs.find(
        (el) => el.source === choosedTransition.id
    );
    console.log(sourceTargetObj);
    var nextState = data.places.find((el) => el.id === sourceTargetObj.target);
    console.log(nextState);
    if (data.currentState !== nextState.name) {
        data.currentState = nextState.name;
        console.log(data);
        openNextDoor(data.currentState);
    }
}

function openNextDoor(nextState) {
    var nextDoorEl = document.getElementById(nextState);
    nextDoorEl.setAttribute("material", "color: green; shader: flat");
    nextDoorEl.setAttribute("light", "type: point; color: green; intensity: 0.1");
}