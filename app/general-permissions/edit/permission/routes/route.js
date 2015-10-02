var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function () {
    var permissionModel = this.modelFor('general-permissions.edit.permission');
    var routes = get(permissionModel, 'routes') || [];
    set(permissionModel, 'routes', routes);
    return routes;
  }
});
