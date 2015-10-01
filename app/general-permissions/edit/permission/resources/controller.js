import Ember from 'ember';

var get = Ember.get;

export default Ember.Controller.extend({
  actions: {
    addResource: function() {
      get(this, 'model').addObject({});
    }
  }
});
