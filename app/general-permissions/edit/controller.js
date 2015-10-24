var get = Ember.get;

export default Ember.Controller.extend({
  onModelChange: function() {
    this.saveGroup();
  }.observes('model.title', 'model.routes.length', 'model.resources.length'),

  saveGroup() {
    Ember.run.debounce(this, this.sendGroupToServer, 1000);
  },

  sendGroupToServer() {
    var data  = get(this, 'model');
    return this.API.updateGroup(data.id, {
      title: data.title,
      resources: data.resources,
      routes: data.routes
    });
  }

  //actions: {
  //  removeGeneralPermission: function (generalPermission) {
  //    var settings = get(this, 'container').lookup('settings:main');
  //    var generalPermissions = get(settings, 'generalPermissions');
  //    generalPermissions.removeObject(generalPermission);
  //    this.transitionToRoute('general-permissions');
  //  },
  //
  //  addPermission: function () {
  //    var model = get(this, 'model');
  //    model.permissions.addObject({
  //      field: 'New Permission',
  //      key: "" + Date.now(),
  //      id: "" + Date.now(),
  //      resources: [],
  //      routes: [],
  //      is_custom_field: false,
  //      for_sharing: false,
  //      create: 0,
  //      read: 0,
  //      update: 0,
  //      delete: 0
  //    });
  //  }
  //}
});
