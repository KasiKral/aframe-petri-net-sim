import * as petriNetLoader from "../modules/petriNetLoader.mjs";
import { petriNetController } from "../modules/petriNetSimController.mjs";
import { SceneEvent } from "../models/sceneEvent.enum";

AFRAME.registerComponent("petri-net-sim", {
    schema: {
        currentPlace: { type: "string", default: "Roaming" },
        places: { type: "array", default: [] },
        transitions: { type: "array", default: [] },
        arcs: { type: "array", default: [] },
        event: { type: "string", default: "Scene Loaded" },
        message: { type: "string", default: SceneEvent.petriNetLoaded },
    },
    // Do something when component first attached.
    init: function() {
        var data = this.data;
        petriNetLoader.loadXMLDoc(data);

        this.transitionEventHandler = function() {
            var netController = new petriNetController(
                data.currentPlace,
                data.message
            );
            console.log(netController._activePlace);
            console.log(netController._firedTransition);
            findNextPlace(data);
            console.log(data);
        };

        this.changePlaceHandler = function() {
            data.currentPlace = data.message;
            console.log(data);
        };
    },

    update: function(oldData) {
        // Do something when component's data is updated.
        var data = this.data;
        var el = this.el;

        // `event` updated. Remove the previous event listener if it exists.
        if (
            oldData.event &&
            oldData.event === SceneEvent.firedTransition &&
            data.event !== oldData.event
        ) {
            el.removeEventListener(oldData.event, this.transitionEventHandler);
        } else {
            el.removeEventListener(oldData.event, this.changePlaceHandler);
        }

        if (data.event === SceneEvent.firedTransition) {
            // el.addEventListener(data.message, this.transitionEventHandler);
            resolveSceneEvent(el, data, this.transitionEventHandler);
        } else {
            resolveSceneEvent(el, data, this.changePlaceHandler);
        }
    },

    remove: function() {
        // Do something the component or its entity is detached.
        // var data = this.data;
        // var el = this.el;
        // Remove event listener.
        // if (data.event) {
        //     el.removeEventListener(data.event, this.transitionEventHandler);
        // }
    },

    // eslint-disable-next-line no-unused-vars
    tick: function(time, timeDelta) {
        // Do something on every scene tick or frame.
    },
});

function findNextPlace(data) {
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
    if (data.currentPlace !== nextState.name) {
        console.log(data);
        openNextDoor(nextState.name);
    }
}

function openNextDoor(nextState) {
    var nextDoorEl = document.getElementById(nextState);
    nextDoorEl.setAttribute("material", "color: green; shader: flat");
    nextDoorEl.setAttribute("light", "type: point; color: green; intensity: 0.1");
}

function resolveSceneEvent(element, data, handler) {
    switch (data.event) {
        case SceneEvent.enteredPlace:
            // data.currentPlace = data.message;
            element.addEventListener(data.message, handler);
            console.log(SceneEvent.enteredPlace + " " + data.message);
            break;
        case SceneEvent.leftPlace:
            // data.currentPlace = data.message;
            element.addEventListener(data.message, handler);
            console.log(SceneEvent.leftPlace + " " + data.message);
            break;
        case SceneEvent.firedTransition:
            element.addEventListener(data.message, handler);
            console.log(SceneEvent.firedTransition + " " + data.message);
            break;
        default:
            console.log(SceneEvent.petriNetLoaded);
            data.currentPlace = "Roaming";
    }
}