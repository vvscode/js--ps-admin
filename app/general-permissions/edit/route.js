var get = Ember.get, set = Ember.set;

export default Ember.Route.extend({
  model: function (params) {
    var settings = get(this, 'container').lookup('settings:main');
    var generalPermissions = get(settings, 'generalPermissions');
    var model = generalPermissions.findBy('id', params.general_permission_id);
    var permissions = get(model, 'permissions') || [];
    set(model, 'permissions', permissions);
    return model;
  }
});
