var get = Ember.get;

export default Ember.Route.extend({
  model: function (params) {
    var gpModel = this.modelFor('general-permissions.edit');
    var model = get(gpModel, 'permissions').findBy('key', "" + params.permission_id);
    return model;
  }
});
