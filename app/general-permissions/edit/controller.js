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
  },

  actions: {
    addPermission() {
      var newPermissionKey = `New_permission_${Date.now()}`;
      this.API.createPermission({
        group_id: get(this, 'model.id'),
        key: newPermissionKey,
        field: newPermissionKey,
        for_custom_field: false,
        for_sharing: false,
        resources: [],
        routes: [],
        create: 0,
        read: 0,
        update: 0,
        delete: 0
      }).then((permission) => {
        get(this, 'model.permissions').addObject(permission);
      });
    },

    remove(permission) {
      get(this, 'model.permissions').removeObject(permission);
      this.API.deletePermission(get(permission, 'id')).always(() => {
        this.transitionTo('general-permissions.edit', get(this, 'model.id'));
      })
    }
  }
});
