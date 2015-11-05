var get = Ember.get;

export default Ember.Route.extend({
  model: function (params) {
    return this.API.getPermission(params.permission_id);
  },

  actions: {
    savePermission() {
      const controller = get(this, 'controller');
      Ember.run.debounce(controller, controller.saveModel, 500);
    }
  }
});
