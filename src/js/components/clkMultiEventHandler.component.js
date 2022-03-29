import { SceneEvent } from '../models/sceneEvent.enum';

AFRAME.registerComponent('clk-multi-event-handler', {
  schema: {
    name: { type: 'string', default: '' },
    firstToggleEvent: { type: 'string', default: 'firstToggleEvent' },
    secondToggleEvent: { type: 'string', default: 'secondToggleEvent' },
    selected: { type: 'boolean', default: false }
  },

  // Do something when component first attached.
  init: function () {
    var el = this.el;
    var data = this.data;
    var scene = this.el.sceneEl;
    el.addEventListener('click', function () {
      if (data.selected === false) {
        scene.setAttribute('petri-net-sim', {
          event: SceneEvent.firedTransition,
          message: `${data.name}${data.firstToggleEvent}`
        });
        el.setAttribute(
          'material',
          'src: #selected; side: double; shader: flat'
        );
        // console.log(data.name + data.firstToggleEvent);
        scene.emit(`${data.name}${data.firstToggleEvent}`);
        data.selected = !data.selected;
      } else {
        scene.setAttribute('petri-net-sim', {
          event: SceneEvent.firedTransition,
          message: `${data.name}${data.secondToggleEvent}`
        });
        el.setAttribute(
          'material',
          'src: #unselected; side: double; shader: flat'
        );
        // console.log(data.name + data.secondToggleEvent);
        scene.emit(`${data.name}${data.secondToggleEvent}`);
        data.selected = !data.selected;
      }
    });
  },

  update: function () {},

  remove: function () {
    // Do something the component or its entity is detached.
  },

  // eslint-disable-next-line no-unused-vars
  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});
