var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function () {
    var gp = this.modelFor('static-permissions');
    var resources = get(gp, 'resources') || [];
    set(gp, 'resources', resources);
    return resources;
  }
});
