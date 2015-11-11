const { get, setProperties } = Ember;

export default Ember.Route.extend({
  model: function(params) {
    const id = parseInt(params.permission_id);
    const model = this.modelFor('general-permissions.edit').permissions.findBy('id', id);
    return this.API.getPermission(id).then((data) => {
      delete data.id;
      setProperties(model, data);
      return model;
    });
  },

  actions: {
    savePermission() {
      const controller = get(this, 'controller');
      Ember.run.debounce(controller, controller.saveModel, 500);
    }
  }
});
