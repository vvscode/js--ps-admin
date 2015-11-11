export default Ember.Route.extend({
  model: function () {
    return this.modelFor('general-permissions.edit.permission');
  }
});
