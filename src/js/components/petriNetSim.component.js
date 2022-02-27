import { SceneEvent } from "../models/sceneEvent.enum";
import * as petriNetLoader from "../modules/petriNetLoader.mjs";
import PetriNet from "../modules/petriNet.mjs";

AFRAME.registerComponent("petri-net-sim", {
    schema: {
        currentPlace: { type: "string", default: "Roaming" },
        event: { type: "string", default: "Scene Loaded" },
        message: { type: "string", default: SceneEvent.petriNetLoaded },
    },
    // Do something when component first attached.
    init: function() {
        var data = this.data;
        var loadedNet = petriNetLoader.loadXMLDoc("petriNetFile/050222_cpn.pnml");
        var net = this.petriNet = new PetriNet(loadedNet);
        console.log(net);
        this.transitionEventHandler = function() {
            net.fire(data.message);
            console.log(net);
            // if (netController.isPlaceActive(data.places)) {
            //     netController.fireTransition(data.places, data.transitions, data.arcs);
            // }
            // console.log(data);
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
            resolveSceneEvent(el, data, this.transitionEventHandler);
        } else {
            resolveSceneEvent(el, data, this.changePlaceHandler);
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

// function openNextDoor(nextState) {
//     var nextDoorEl = document.getElementById(nextState);
//     nextDoorEl.setAttribute("material", "color: green; shader: flat");
//     nextDoorEl.setAttribute("light", "type: point; color: green; intensity: 0.1");
// }

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