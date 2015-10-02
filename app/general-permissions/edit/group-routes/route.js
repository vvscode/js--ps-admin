var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function () {
    var gp = this.modelFor('general-permissions.edit');
    var routes = get(gp, 'routes') || [];
    set(gp, 'routes', routes);
    return routes;
  }
});
