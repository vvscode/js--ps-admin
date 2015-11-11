export default Ember.Route.extend({
  model: function (params) {
    return this.API.getGroup(params.general_permission_id);
  }
});
