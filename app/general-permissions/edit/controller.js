import Ember from 'ember';

var get = Ember.get;

export default Ember.Controller.extend({
  actions: {
    removeGeneralPermission: function(generalPermission) {
      var settings = get(this, 'container').lookup('settings:main');
      var generalPermissions = get(settings, 'generalPermissions');
      generalPermissions.removeObject(generalPermission);
      this.transitionToRoute('general-permissions');
    },

    addPermission: function() {
      var model = get(this, 'model');
      model.permissions.addObject({
        name: 'New Permission',
        id: "" + Date.now()
      });
    }
  }
});
