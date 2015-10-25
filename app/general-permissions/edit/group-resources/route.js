var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function () {
    return get(this.modelFor('general-permissions.edit'), 'resources');
  }
});
