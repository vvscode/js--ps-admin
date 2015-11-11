const { get, set } = Ember;

export default Ember.Route.extend({
  flagPermissions: null,

  model(params) {
    return this.API.getFlagPermissions()
      .then((permissions) => {
        set(this, 'flagPermissions', permissions);
        return permissions.findBy('flag', params.type_name);
      });
  },

  setupController(controller, model, transition) {
    set(controller, 'flagPermissions', get(this, 'flagPermissions'));
    return this._super(controller, model, transition);
  }
});
