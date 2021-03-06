import { SceneEvent } from '../models/sceneEvent.enum';
import * as petriNetLoader from '../modules/petriNetLoader.mjs';
import PetriNet from '../modules/petriNet.mjs';
import * as serverLogger from '../modules/serverLogger.mjs';

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
      '../assets/petriNetFile/28032022_net_exhibition.pnml'
    );
    var net = (this.petriNet = new PetriNet(loadedNet));
    console.log(net);
    serverLogger.createParseSession(1, new Date(), new Date());

    this.transitionEventHandler = () => {
      if (net.isEnabled(data.message)) {
        net.fire(data.message);
        console.log('Transition Enabled');
        this.playConfirmationSuccessSound(data.message);
        this.updateVisualProgress(data.message);
        if (net.getMarking(data.finalPlace) === data.taskCount) {
          this.showFinalMessage();
          this.playVictorySound();
        }
        serverLogger.createParseFiringAttempt(
          1,
          data.message,
          true,
          new Date(),
          1
        );
      } else {
        this.playConfirmationUnsuccessSound(data.message);
        console.log('Transition Not Enabled');
        serverLogger.createParseFiringAttempt(
          1,
          data.message,
          false,
          new Date(),
          1
        );
      }
      console.log(net);
    };

    this.changePlaceEventHandler = () => {
      var taskPanel = document.querySelector(`#task${data.message}`);
      var prevTaskPanel = document.querySelector(`#task${data.activePlace}`);
      if (taskPanel) {
        taskPanel.setAttribute('visible', !taskPanel.getAttribute('visible'));
        taskPanel.children.item(2).classList.toggle('interactible');
      } else if (prevTaskPanel) {
        prevTaskPanel.setAttribute(
          'visible',
          !prevTaskPanel.getAttribute('visible')
        );
        prevTaskPanel.children.item(2).classList.toggle('interactible');
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
  },

  playConfirmationSuccessSound: function (elementId) {
    if (elementId.includes('confirm')) {
      var confirmationEntity = document.querySelector(`#${elementId}`);
      confirmationEntity.setAttribute('material', 'color: #36c991;');
      confirmationEntity.setAttribute('text', 'value: Spr??vna odpove??');
      confirmationEntity.emit('success');
    }
  },

  playConfirmationUnsuccessSound: function (elementId) {
    if (elementId.includes('confirm')) {
      var confirmationEntity = document.querySelector(`#${elementId}`);
      confirmationEntity.emit('unsuccess');
    }
  },

  playVictorySound: function () {
    var environmentEntity = document.querySelector('#player');
    setTimeout(() => {
      environmentEntity.emit('win');
    }, 2000);
  },

  updateVisualProgress: function (elementId) {
    if (elementId.includes('confirm')) {
      var progressEntity = document.querySelector(`#${elementId}Progress`);
      progressEntity.setAttribute(
        'material',
        'color: green; side: double; shader: flat'
      );
    }
  },

  showFinalMessage: function () {
    var finalMsgEntity = document.querySelector('#gratulationMsg');
    finalMsgEntity.setAttribute('visible', 'true');
  }
});
