AFRAME.registerComponent('clickhandler', {
    schema: {
      name: {type: 'string', default:''}
    },

    // Do something when component first attached.
    init: function () {
      var el = this.el;
      var scene = document.querySelector('a-scene');
      el.addEventListener('click', function () {
        scene.setAttribute('state-machine', {event: 'anotherEvent', message: el.id});
        scene.emit('anotherEvent');
      });
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
  });