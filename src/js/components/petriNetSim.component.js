import { SceneEvent } from '../models/sceneEvent.enum';
import * as petriNetLoader from '../modules/petriNetLoader.mjs';
import PetriNet from '../modules/petriNet.mjs';

AFRAME.registerComponent('petri-net-sim', {
  schema: {
    event: { type: 'string', default: 'Scene Loaded' },
    message: { type: 'string', default: SceneEvent.petriNetLoaded },
    activePlace: { type: 'string', default: 'Roaming' },
    finalPlace: { type: 'string' },
    taskCount: { type: 'number', default: 1 }
  },
  // Do something when component first attached.
  init: function () {
    var data = this.data;
    var loadedNet = petriNetLoader.loadXMLDoc(
      'assets/petriNetFile/28032022_net_exhibition.pnml'
    );
    var net = (this.petriNet = new PetriNet(loadedNet));
    console.log(net);

    this.transitionEventHandler = function () {
      // if (net.isInputPlace(data.activePlace, data.message)) {
      // console.log('Place Activated');
      net.fire(data.message);
      // } else {
      // console.log('Place Not Activated');
      // }
      console.log(net);
    };

    this.changePlaceEventHandler = function () {
      var taskPanel = document.querySelector(`#task${data.message}`);
      var prevPanel = document.querySelector(`#task${data.activePlace}`);
      if (taskPanel) {
        taskPanel.setAttribute('visible', !taskPanel.getAttribute('visible'));
      } else if (prevPanel) {
        prevPanel.setAttribute('visible', !prevPanel.getAttribute('visible'));
      }
      data.activePlace = data.message;
      console.log(data);
    };
  },

  update: function (oldData) {
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
      el.removeEventListener(oldData.event, this.changePlaceEventHandler);
    }

    if (data.event === SceneEvent.firedTransition) {
      this.resolveSceneEvent(el, data, this.transitionEventHandler);
    } else {
      this.resolveSceneEvent(el, data, this.changePlaceEventHandler);
    }
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  // eslint-disable-next-line no-unused-vars
  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },

  resolveSceneEvent: function (element, data, handler) {
    switch (data.event) {
      case SceneEvent.enteredPlace:
        element.addEventListener(data.message, handler);
        console.log(SceneEvent.enteredPlace + ' ' + data.message);
        break;
      case SceneEvent.leftPlace:
        element.addEventListener(data.message, handler);
        console.log(SceneEvent.leftPlace + ' ' + data.message);
        break;
      case SceneEvent.firedTransition:
        element.addEventListener(data.message, handler);
        console.log(SceneEvent.firedTransition + ' ' + data.message);
        break;
      default:
        console.log(SceneEvent.petriNetLoaded);
        data.activePlace = 'Roaming';
    }
  }
});
