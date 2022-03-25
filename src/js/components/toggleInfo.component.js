AFRAME.registerComponent('toggle-info', {
  schema: {},

  init: function () {
    // Do something when component first attached.
    let el = this.el;
    var childEl = el.firstElementChild;
    this.el.addEventListener('click', () => {
      childEl.setAttribute('visible', !childEl.getAttribute('visible'));
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
