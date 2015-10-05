var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function () {
    var gp = this.modelFor('static-permissions');
    var routes = get(gp, 'routes') || [];
    set(gp, 'routes', routes);
    return routes;
  }
});
