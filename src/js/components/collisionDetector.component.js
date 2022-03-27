import { SceneEvent } from '../models/sceneEvent.enum';

AFRAME.registerComponent('collision-detector', {
  schema: {
    target: { type: 'string' },
    collisionEvent: { type: 'string' },
    clearedCollisionEvent: { type: 'string' },
    placeColliderType: { type: 'boolean', default: true }
  },

  init: function () {
    // Do something when component first attached.
    let el = this.el;
    var data = this.data;
    var scene = document.querySelector('a-scene');

    // listen for collisions
    el.addEventListener('collisions', (e) => {
      var collided = e.detail.els.length;
      if (collided === 1 && (e.detail.els[0].id || e.detail.els[0].className)) {
        el.setAttribute('material', 'color: green');
        scene.setAttribute('petri-net-sim', {
          event: data.placeColliderType
            ? SceneEvent.enteredPlace
            : SceneEvent.firedTransition,
          message: data.collisionEvent
        });
        scene.emit(data.collisionEvent);
      } else {
        el.setAttribute('material', 'color: red');
        scene.setAttribute('petri-net-sim', {
          event: data.placeColliderType
            ? SceneEvent.leftPlace
            : SceneEvent.firedTransition,
          message: data.clearedCollisionEvent
        });
        scene.emit(data.clearedCollisionEvent);
      }
    });
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  // eslint-disable-next-line no-unused-vars
  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});
