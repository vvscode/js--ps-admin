const { get } = Ember;

export default Ember.Controller.extend({
  onModelChange: function() {
    this.saveFlagPermissions();
  }.observes('model.routes.length', 'model.resources.length'),

  saveFlagPermissions() {
    Ember.run.debounce(this, this.sendPermissionsToServer, 1000);
  },

  sendPermissionsToServer() {
    return this.API.updateFlagPermissions(get(this, 'flagPermissions'));
  },

  actions: {
    removeResource() {
      debugger;
    }
  }
});
