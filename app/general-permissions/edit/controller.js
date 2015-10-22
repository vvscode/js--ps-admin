import API from 'ps-admin/utils/api';
var get = Ember.get;

export default Ember.Controller.extend({
  observeChanges: function() {
    Ember.run.debounce(this, this.saveModel, 500);
  }.observes('model.name'),

  saveModel: function() {
    API.saveGroup(get(this, 'model'));
  },

  actions: {
    removeGeneralPermission: function (generalPermission) {
      var settings = get(this, 'container').lookup('settings:main');
      var generalPermissions = get(settings, 'generalPermissions');
      generalPermissions.removeObject(generalPermission);
      this.transitionToRoute('general-permissions');
    },

    addPermission: function () {
      var model = get(this, 'model');
      model.permissions.addObject({
        field: 'New Permission',
        key: "" + Date.now(),
        id: "" + Date.now(),
        resources: [],
        routes: [],
        is_custom_field: false,
        for_sharing: false,
        create: 0,
        read: 0,
        update: 0,
        delete: 0
      });
    }
  }
});
