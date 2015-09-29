import Ember from 'ember';

export default Ember.Controller.extend({
  model: null,
  currentStaticPermission: Ember.computed.alias('model')
});
