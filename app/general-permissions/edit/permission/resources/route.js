var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function () {
    var permissionModel = this.modelFor('general-permissions.edit.permission');
    var resources = get(permissionModel, 'resources') || [];
    set(permissionModel, 'resources', resources);
    return resources;
  }
});
