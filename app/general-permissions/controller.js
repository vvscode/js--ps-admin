

var get = Ember.get;

export default Ember.Controller.extend({
  actions: {
    addGeneralPermission: function() {
      get(this, 'model').addObject({
        name: 'New General Permission',
        id: "" + Date.now()
      });
    }
  }
});
